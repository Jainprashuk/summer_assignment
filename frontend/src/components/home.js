import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import useCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolders from "../hooks/useGetFileFolders";
import useUploadFile from "../hooks/useUploadFile";

const Home = () => {
  const inputRef = useRef(null);
  const [newFolder, setNewFolder] = useState("");
  const [folderStructure, setFolderStructure] = useState([{ _id: null, name: "Cloud Home" }]);
  const parentFolder = folderStructure[folderStructure.length - 1];
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const { createFolder } = useCreateFolder();
  const { getFileFolders, fileFolders } = useGetFileFolders();

  const handleAllowCreateFolder = () => {
    setShowCreateFolder(true);
  };

  const handleDoubleClick = (elem) => {
    if (elem.type === "folder") {
      setFolderStructure([...folderStructure, elem]);
    } else {
      window.open(elem.link);
    }
  };

  const handleCreateFolder = async () => {
    if (newFolder.length > 0) {
      await createFolder({
        name: newFolder,
        parentId: parentFolder._id,
      });

      getFileFolders(parentFolder._id);
      setNewFolder("");
    }
  };

  const handleBackClick = (clickIdx) => {
    const newFolderStructure = folderStructure.filter((elem, idx) => idx <= clickIdx);
    setFolderStructure(newFolderStructure);
  };

  const { isUploadAllowed, uploadFile } = useUploadFile();

  const handleFileUpload = async (e) => {
    if (isUploadAllowed) {
      const file = e.target.files;
      await uploadFile({ file: file[0], parentId: parentFolder._id });
      getFileFolders(parentFolder._id);
    } else {
      alert("Uploading is already in progress. Please wait...");
    }
  };

  useEffect(() => {
    getFileFolders(parentFolder._id);
  }, [folderStructure]);

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-content">
        <header className="home-header">
          <h1 className="home-title">My Cloud Storage</h1>
          <div className="home-actions">
            <button className="btn btn-primary" onClick={handleAllowCreateFolder}>
              + New Folder
            </button>
            <div className="file-upload">
              <label htmlFor="file-upload" className="btn btn-secondary">
                Upload File
              </label>
              <input
                id="file-upload"
                className="file-input"
                ref={inputRef}
                type="file"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </header>
        <nav className="breadcrumb">
          {folderStructure.map((elem, idx) => (
            <span key={idx} onClick={() => handleBackClick(idx)} className="breadcrumb-item">
              {elem.name}
            </span>
          ))}
        </nav>
        {showCreateFolder && (
          <div className="create-folder-modal">
            <input
              className="create-folder-input"
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
              placeholder="New Folder Name"
            />
            <button onClick={handleCreateFolder} className="btn btn-primary">
              Create
            </button>
            <button onClick={() => setShowCreateFolder(false)} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        )}
        <div className="file-list">
          {fileFolders.map((elem, index) => (
            <div
              key={index}
              className={`file-item ${elem.type}`}
              onDoubleClick={() => handleDoubleClick(elem)}
            >
              {elem.name}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .home-page {
          font-family: Arial, sans-serif;
        }

        .home-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background-color: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }

        .home-title {
          font-size: 24px;
          font-weight: bold;
        }

        .home-actions {
          display: flex;
          align-items: center;
        }

        .btn {
          padding: 10px 20px;
          margin: 0 5px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .btn-primary {
          background-color: #007bff;
          color: #fff;
        }

        .btn-secondary {
          background-color: #6c757d;
          color: #fff;
        }

        .file-upload {
          position: relative;
        }

        .file-input {
          display: none;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          background-color: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }

        .breadcrumb-item {
          margin-right: 5px;
          cursor: pointer;
          color: #007bff;
        }

        .create-folder-modal {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          margin: 20px;
        }

        .create-folder-input {
          padding: 10px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          margin-right: 10px;
          width: 200px;
        }

        .file-list {
          padding: 20px;
        }

        .file-item {
          padding: 10px;
          margin: 5px 0;
          border: 1px solid #ced4da;
          border-radius: 4px;
          cursor: pointer;
        }

        .file-item.folder {
          background-color: #e9ecef;
        }

        .file-item.file {
          background-color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Home;
