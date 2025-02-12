// import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

// export class AzureStorageClient {
//   private blobServiceClient: BlobServiceClient;
//   private containerClient: ContainerClient;

//   constructor(containerName: string = process.env.NEXT_PUBLIC_AZURE_CONTAINER_NAME || 'media-uploads') {
//     const connectionString = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONNECTION_STRING;

//     if (!connectionString) {
//       throw new Error('Azure Storage connection string not found in environment variables');
//     }

//     try {
//       // Initialize the BlobServiceClient using the connection string
//       this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      
//       // Get a reference to the container
//       this.containerClient = this.blobServiceClient.getContainerClient(containerName);
//     } catch (error) {
//       console.error('Error initializing Azure Storage client:', error);
//       throw new Error('Failed to initialize Azure Storage client');
//     }
//   }

//   // Ensure the container exists or create it if it doesn’t
//   private async ensureContainerExists() {
//     const containerExists = await this.containerClient.exists();
//     if (!containerExists) {
//       console.log('Creating container...');
//       const createContainerResponse = await this.containerClient.create();
//       console.log(`Container created successfully. Request ID: ${createContainerResponse.requestId}`);

//       // Set container access policy to public (blob level)
//       await this.containerClient.setAccessPolicy('blob');
//     }
//   }

//   // Upload media file to Azure Blob Storage
//   public async uploadMedia(file: Buffer, fileName: string, filePath: string): Promise<string> {
//     try {
//       await this.ensureContainerExists();

//       // Generate a unique blob name with timestamp
//       const timestamp = new Date().getTime();
//       const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
//       const blobName = `${filePath}/${timestamp}-${cleanFileName}`;

//       // Get a block blob client for the blob
//       const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

//       console.log('Uploading blob...');
//       const uploadBlobResponse = await blockBlobClient.upload(file, file.length, {
//         blobHTTPHeaders: {
//           blobContentType: this.getContentType(fileName),
//         },
//       });

//       console.log(`Blob uploaded successfully. Request ID: ${uploadBlobResponse.requestId}`);
//       return blockBlobClient.url;
//     } catch (error: any) {
//       console.error('Error uploading to Azure Storage:', error);
//       throw new Error(`Failed to upload media: ${error.message}`);
//     }
//   }

//   // Get the MIME type based on the file extension
//   private getContentType(fileName: string): string {
//     const extension = fileName.split('.').pop()?.toLowerCase();
//     const contentTypes: { [key: string]: string } = {
//       jpg: 'image/jpeg',
//       jpeg: 'image/jpeg',
//       png: 'image/png',
//       gif: 'image/gif',
//       webp: 'image/webp',
//       mp4: 'video/mp4',
//       webm: 'video/webm',
//     };

//     return contentTypes[extension || ''] || 'application/octet-stream';
//   }

//   // Delete a blob from Azure Blob Storage
//   public async deleteMedia(blobUrl: string): Promise<void> {
//     try {
//       const url = new URL(blobUrl);
//       const blobName = decodeURIComponent(url.pathname.substring(1)); // Remove the leading "/"
//       const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

//       console.log('Deleting blob...');
//       await blockBlobClient.delete();
//       console.log('Blob deleted successfully.');
//     } catch (error) {
//       console.error('Error deleting from Azure Storage:', error);
//       throw new Error('Failed to delete media from Azure Storage');
//     }
//   }
// }



// export const uploadFiles = async ( files: File[],projectId: string | null) => {
//   console.log("Ullai")
  
//   const ALLOWED_FILE_TYPES = [
//     'image/jpeg',
//     'image/png',
//     'image/gif',
//     'image/webp',
//     'video/mp4',
//     'video/webm',
//   ];
  
//   // Max file size (10MB)
//   const MAX_FILE_SIZE = 200 * 1024 * 1024;
  
  
//   try {
//     if (!files || files.length === 0) {
//       throw new Error('No files provided');
//     }

//     const uploadPromises = files.map(async (file) => {
//       // Validate file type
//       if (!ALLOWED_FILE_TYPES.includes(file.type)) {
//         throw new Error(`Invalid file type for file: ${file.name}`);
//       }

//       // Validate file size
//       if (file.size > MAX_FILE_SIZE) {
//         throw new Error(`File size exceeds the 10MB limit for file: ${file.name}`);
//       }

//       // Convert file to Buffer
//       const buffer = Buffer.from(await file.arrayBuffer());

//       // Upload to Azure Blob Storage
//       const azureStorageClient = new AzureStorageClient();
//       const filePath = `projects/${projectId}`;
//       const blobUrl = await azureStorageClient.uploadMedia(buffer, file.name, filePath);

//       console.log(blobUrl);

//       return { fileName: file.name, url: blobUrl };
//     });

//     // Wait for all uploads to complete
//     const uploadedFiles = await Promise.all(uploadPromises); 

//     return uploadedFiles;



//   } catch (error) {
//     console.error('Error uploading files:', error);
//   }
// };



import { BlobServiceClient } from '@azure/storage-blob';

export class AzureStorageClient {
  private blobServiceClient: BlobServiceClient;
  private containerName: string;

  constructor() {
    const sasUrl = process.env.NEXT_PUBLIC_AZURE_SAS_URL;
    if (!sasUrl) {
      throw new Error('Azure SAS URL is not configured');
    }

    this.containerName = process.env.NEXT_PUBLIC_CONTAINER_NAME || 'video-gpt';
    this.blobServiceClient = new BlobServiceClient(`${sasUrl}`);
    console.log(this.blobServiceClient);
  }

  async uploadMedia(buffer: Buffer, fileName: string, filePath: string): Promise<string> {
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blobName = `${filePath}/${Date.now()}-${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const options = {
      blobHTTPHeaders: {
        blobContentType: this.getContentType(fileName),
      },
      onUploadProgress: (progress: any) => {
        console.log(`Upload progress: ${progress.loadedBytes} bytes`);
      },
    };

    try {
      await blockBlobClient.uploadData(buffer, options);
      return blockBlobClient.url;
    } catch (error: any) {
      if (error.name === 'RestError' && error.statusCode === 403) {
        throw new Error('CORS or authentication error: Please check your SAS token permissions');
      }
      throw error;
    }
  }

  private getContentType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const contentTypes: { [key: string]: string } = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      mp4: 'video/mp4',
      webm: 'video/webm',
    };
    return contentTypes[extension || ''] || 'application/octet-stream';
  }
}

export const uploadFiles = async (files: File[], projectId: string | null) => {
  console.log("Starting upload with CORS handling");

  const ALLOWED_FILE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm',
  ];

  const MAX_FILE_SIZE = 200 * 1024 * 1024;

  try {
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }

    if (!projectId) {
      console.warn('Project ID is missing, using default project ID');
      projectId = "default-project";
    }

    const azureStorageClient = new AzureStorageClient();

    const uploadPromises = files.map(async (file) => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        throw new Error(`Invalid file type for file: ${file.name}`);
      }

      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds the 200MB limit for file: ${file.name}`);
      }

      const buffer = Buffer.from(new Uint8Array(await file.arrayBuffer()));
      const filePath = `projects/${projectId}`;
      
      try {
        const blobUrl = await azureStorageClient.uploadMedia(buffer, file.name, filePath);
        console.log(`Successfully uploaded: ${blobUrl}`);
        return { fileName: file.name, url: blobUrl };
      } catch (error: any) {
        console.error(`Error uploading ${file.name}:`, error);
        throw new Error(`Failed to upload ${file.name}: ${error.message}`);
      }
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    return uploadedFiles;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};