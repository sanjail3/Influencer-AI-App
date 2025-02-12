import { NextRequest, NextResponse } from 'next/server';
import { AzureStorageClient } from '@/lib/azure_storage_client';

// Allowed file types
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'video/mp4',
  'video/webm',
];

// Max file size (10MB)
const MAX_FILE_SIZE = 200 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const projectId = formData.get('projectId') as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        throw new Error(`Invalid file type for file: ${file.name}`);
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds the 10MB limit for file: ${file.name}`);
      }

      // Convert file to Buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Upload to Azure Blob Storage
      const azureStorageClient = new AzureStorageClient();
      const filePath = `projects/${projectId}`;
      const blobUrl = await azureStorageClient.uploadMedia(buffer, file.name, filePath);

      return { fileName: file.name, url: blobUrl };
    });

    // Wait for all uploads to complete
    const uploadedFiles = await Promise.all(uploadPromises);

    return NextResponse.json({ success: true, files: uploadedFiles });
  } catch (error: any) {
    console.error('Error during file upload:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// export async function DELETE(request: NextRequest) {
//   try {
//     const { url } = await request.json();

//     if (!url) {
//       return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
//     }

//     const azureStorageClient = new AzureStorageClient();
//     await azureStorageClient.deleteMedia(url);

//     return NextResponse.json({ success: true, message: 'File deleted successfully' });
//   } catch (error: any) {
//     console.error('Error during file deletion:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
