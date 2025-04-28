import { useState, useEffect } from "react";
import axios from "axios";

export default function GoogleDriveManager() {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [uploadFiles, setUploadFiles] = useState([]);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const response = await axios.get("/api/drive/list-folders");
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  const createFolder = async () => {
    if (!newFolderName) return;
    try {
      await axios.post("/api/drive/create-folder", null, { params: { folderName: newFolderName } });
      fetchFolders();
      setNewFolderName("");
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      await axios.delete(`/api/drive/delete-folder/${folderId}`);
      fetchFolders();
      setSelectedFolder(null);
      setFiles([]);
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const listFiles = async (folderId) => {
    try {
      setSelectedFolder(folderId);
      const response = await axios.get(`/api/drive/list-files/${folderId}`);
      setFiles(response.data);
    } catch (error) {
      console.error("Error listing files:", error);
    }
  };

  const uploadToFolder = async () => {
    if (!selectedFolder || uploadFiles.length === 0) return;
    try {
      const formData = new FormData();
      uploadFiles.forEach((file) => formData.append("files", file));
      await axios.post(`/api/drive/upload`, formData, { params: { folderId: selectedFolder } });
      listFiles(selectedFolder);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-5 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Google Drive Managerhhhhhhh</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="border p-2 rounded flex-1"
            placeholder="New folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={createFolder}>Create</button>
        </div>

        <h2 className="text-lg font-semibold">Folders</h2>
        <ul className="border p-2 rounded bg-gray-50">
          {folders.map((folder) => (
            <li key={folder.id} className="flex justify-between p-2 border-b">
              <span className="cursor-pointer text-blue-500" onClick={() => listFiles(folder.id)}>{folder.name}</span>
              <button className="text-red-500" onClick={() => deleteFolder(folder.id)}>Delete</button>
            </li>
          ))}
        </ul>

        {selectedFolder && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Files in Folder</h2>
            <ul className="border p-2 rounded bg-gray-50">
              {files.map((file, index) => (
                <li key={index} className="p-2 border-b">{file}</li>
              ))}
            </ul>
            <div className="mt-3">
              <input type="file" multiple onChange={(e) => setUploadFiles([...e.target.files])} />
              <button className="bg-green-500 text-white px-4 py-2 rounded ml-2" onClick={uploadToFolder}>Upload</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}