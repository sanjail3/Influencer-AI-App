import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

export class AzureStorageClient {
  private blobServiceClient: BlobServiceClient;
  private containerClient: ContainerClient;

  constructor(containerName: string = process.env.AZURE_CONTAINER_NAME || 'media-uploads') {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!connectionString) {
      throw new Error('Azure Storage connection string not found in environment variables');
    }

    try {
      // Initialize the BlobServiceClient using the connection string
      this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      
      // Get a reference to the container
      this.containerClient = this.blobServiceClient.getContainerClient(containerName);
    } catch (error) {
      console.error('Error initializing Azure Storage client:', error);
      throw new Error('Failed to initialize Azure Storage client');
    }
  }

  // Ensure the container exists or create it if it doesn’t
  private async ensureContainerExists() {
    const containerExists = await this.containerClient.exists();
    if (!containerExists) {
      console.log('Creating container...');
      const createContainerResponse = await this.containerClient.create();
      console.log(`Container created successfully. Request ID: ${createContainerResponse.requestId}`);

      // Set container access policy to public (blob level)
      await this.containerClient.setAccessPolicy('blob');
    }
  }

  // Upload media file to Azure Blob Storage
  public async uploadMedia(file: Buffer, fileName: string, filePath: string): Promise<string> {
    try {
      await this.ensureContainerExists();

      // Generate a unique blob name with timestamp
      const timestamp = new Date().getTime();
      const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
      const blobName = `${filePath}/${timestamp}-${cleanFileName}`;

      // Get a block blob client for the blob
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

      console.log('Uploading blob...');
      const uploadBlobResponse = await blockBlobClient.upload(file, file.length, {
        blobHTTPHeaders: {
          blobContentType: this.getContentType(fileName),
        },
      });

      console.log(`Blob uploaded successfully. Request ID: ${uploadBlobResponse.requestId}`);
      return blockBlobClient.url;
    } catch (error: any) {
      console.error('Error uploading to Azure Storage:', error);
      throw new Error(`Failed to upload media: ${error.message}`);
    }
  }

  // Get the MIME type based on the file extension
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

  // Delete a blob from Azure Blob Storage
  public async deleteMedia(blobUrl: string): Promise<void> {
    try {
      const url = new URL(blobUrl);
      const blobName = decodeURIComponent(url.pathname.substring(1)); // Remove the leading "/"
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

      console.log('Deleting blob...');
      await blockBlobClient.delete();
      console.log('Blob deleted successfully.');
    } catch (error) {
      console.error('Error deleting from Azure Storage:', error);
      throw new Error('Failed to delete media from Azure Storage');
    }
  }
}
