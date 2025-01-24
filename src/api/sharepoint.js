import { getToken } from "./sharepointapi";

const clientId = 'e6af3ca0-2d80-4bec-9797-f20f3d63c17a'; // Application (client) ID
const tenantId = 'c2883102-3f8d-4e6f-b65a-df3518b3b0f3'; // Directory (tenant) ID
const clientSecret = 'i3L8Q~1bfRsN8_5xVXLllm4z1TlNLdSHi3su9ady'; // Client Secret for your Azure AD app

export const uploadImageToSharePoint = async (imageUri) => {
    try {
        const accessToken = await getToken(clientId, tenantId, clientSecret); // Ensure you pass the required parameters to getToken
        console.log('Access Token:', accessToken);

        const fileName = imageUri.split('/').pop(); // Extract file name from the URI
        const folderUrl = "/sites/Cygnispace/Shared Documents/cygnispace/documents/cygni project/mobile app/profile photo";
        const uploadUrl = `https://cygnisoft.sharepoint.com${folderUrl}/${fileName}:/content?@microsoft.graph.conflictBehavior=replace`;

        // Fetch the image as a blob
        const response = await fetch(imageUri);
        if (!response.ok) {
            throw new Error(`Error fetching image: ${response.statusText}`);
        }
        const blob = await response.blob();

        console.log('Upload URL:', uploadUrl); // Log the constructed upload URL

        // Upload the image to SharePoint
        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT', // Use PUT for uploading file content
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/octet-stream',
            },
            body: blob,
        });

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text(); // Capture detailed error message
            throw new Error(`Error uploading image SharePoint: ${errorText}`);
        }

        const data = await uploadResponse.json();
        console.log('Upload Response Data:', data);
        return data.ServerRelativeUrl; // Return the relative URL of the uploaded file
    } catch (error) {
        console.error('Error uploading image to SharePoint:', error);
        throw error;
    }
};
