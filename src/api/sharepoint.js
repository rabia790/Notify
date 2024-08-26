import { getToken } from "./sharepointapi";

const clientId = 'e6af3ca0-2d80-4bec-9797-f20f3d63c17a'; // Application (client) ID
const tenantId = 'c2883102-3f8d-4e6f-b65a-df3518b3b0f3'; // Directory (tenant) ID
const clientSecret = 'i3L8Q~1bfRsN8_5xVXLllm4z1TlNLdSHi3su9ady'; // Client Secret for your Azure AD app


export const uploadImageToSharePoint = async (imageUri) => {
    const accessToken = await getToken(); // Replace with your token fetching method
    console.log(accessToken);
    const fileName = imageUri.split('/').pop();
    const folderUrl = "/sites/Cygnispace/Shared Documents/cygnispace/documents/cygni project/mobile app/profile photo";
    const uploadUrl = `https://cygnisoft.sharepoint.com//_api/web/GetFolderByServerRelativeUrl('${folderUrl}')/Files/add(url='${fileName}', overwrite=true)`;
  
    try {
        const response = await fetch(imageUri);
      
        const blob = await response.blob();
        console.log('Upload URL:', uploadUrl); // Log the constructed upload URL
        const uploadResponse = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/octet-stream',
          },
          body: blob,
        });
    
        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text(); // Capture detailed error message
            throw new Error(`Error uploading image to SharePoint: ${errorText}`);
          }
      
    
        const data = await uploadResponse.json();
        console.log(data);
        return data.d.ServerRelativeUrl; // Return the relative URL of the uploaded file
      } catch (error) {
        console.error('Error uploading image to SharePoint:', error);
        throw error;
      }
    };