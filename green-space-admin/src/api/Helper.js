const API_URL = "http://localhost:8080";

export const uploadImage = async (file, folderId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folderId", folderId);

  const response = await fetch(`${API_URL}/upload-image`, {
    method: "POST",
    body: formData,
  });

  return response.text();
};

export const createFolder = async (folderName, parentFolderId) => {
  const response = await fetch(
    `${API_URL}/create-folder?folderName=${folderName}&folderIdParent=${parentFolderId}`,
    { method: "POST" }
  );

  return response.text();
};

export const listFolders = async () => {
  const response = await fetch(`${API_URL}/list-folders`);
  return response.json();
};

export const listFiles = async (folderId) => {
  const response = await fetch(`${API_URL}/list-folders/${folderId}`);
  return response.json();
};

export const deleteFolder = async (folderId) => {
  await fetch(`${API_URL}/delete/${folderId}`, { method: "DELETE" });
};

export const deleteSubFolder = async (subFolderId) => {
  await fetch(`${API_URL}/delete/subFolder/${subFolderId}`, { method: "DELETE" });
};
