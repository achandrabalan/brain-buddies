export async function uploadFileToSupabase(file, fileName, folder, user) {
  const filePath = `uploads/${fileName}`;

  let { error } = await supabase.storage
    .from('your-bucket-name')
    .upload(filePath, file);

  if (error) {
    toastError('Failed to upload file.');
    console.error('Upload error:', error.message);
  } else {
    const fileUrl = `https://your-bucket-name.supabase.co/storage/v1/object/public/${filePath}`;
    console.log('File URL:', fileUrl);
  }
}
