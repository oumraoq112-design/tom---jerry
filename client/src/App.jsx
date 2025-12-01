import React, { useState } from 'react'
import './App.css'

function App() {
    // State for image search section
    const [searchName, setSearchName] = useState('');
    const [displayedImage, setDisplayedImage] = useState('');
    const [searchError, setSearchError] = useState('');

    // State for image upload section
    const [uploadName, setUploadName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadError, setUploadError] = useState('');

    // API base URL
    const API_BASE_URL = 'http://localhost:3000';

    // Handle image search
    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchError('');
        setDisplayedImage('');

        if (!searchName.trim()) {
            setSearchError('Please enter a character name');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/getImage?name=${searchName.toLowerCase()}`);
            const data = await response.json();

            if (response.ok) {
                // Set the image URL with a timestamp to prevent caching
                setDisplayedImage(`${API_BASE_URL}/${data.filename}?t=${Date.now()}`);
            } else {
                setSearchError(data.error || 'Image not found');
            }
        } catch (error) {
            setSearchError('Error fetching image. Make sure the server is running.');
        }
    };

    // Handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setUploadMessage('');
        setUploadError('');
    };

    // Handle image upload
    const handleUpload = async (e) => {
        e.preventDefault();
        setUploadMessage('');
        setUploadError('');

        if (!uploadName.trim()) {
            setUploadError('Please enter a character name');
            return;
        }

        if (!selectedFile) {
            setUploadError('Please select an image file');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch(`${API_BASE_URL}/api/upload?name=${uploadName.toLowerCase()}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setUploadMessage(`✓ ${data.message}`);

                // If the uploaded character matches the currently searched character, refresh the image
                if (searchName && uploadName.toLowerCase() === searchName.toLowerCase()) {
                    setDisplayedImage(`${API_BASE_URL}/${data.filename}?t=${Date.now()}`);
                }

                // Clear the form
                setUploadName('');
                setSelectedFile(null);
                // Reset file input
                document.getElementById('fileInput').value = '';
            } else {
                setUploadError(data.error || 'Upload failed');
            }
        } catch (error) {
            setUploadError('Error uploading image. Make sure the server is running.');
        }
    };

    return (
        <div className="app">
            <header className="header">
                <h1>🎭 Tom & Jerry Image Manager</h1>
                <p>Search for character images or upload new ones</p>
            </header>

            <div className="container">
                {/* Section 1: Image Search */}
                <section className="card">
                    <h2>🔍 Search for Character</h2>
                    <form onSubmit={handleSearch} className="form">
                        <div className="input-group">
                            <input
                                type="text"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                placeholder="Enter character name (e.g., tom, jerry, dog)"
                                className="input"
                            />
                            <button type="submit" className="btn btn-primary">Search</button>
                        </div>
                    </form>

                    {searchError && (
                        <div className="message error">{searchError}</div>
                    )}

                    {displayedImage && (
                        <div className="image-display">
                            <img src={displayedImage} alt={searchName} className="character-image" />
                            <p className="image-caption">Character: {searchName}</p>
                        </div>
                    )}
                </section>

                {/* Section 2: Image Upload */}
                <section className="card">
                    <h2>📤 Upload New Character Image</h2>
                    <form onSubmit={handleUpload} className="form">
                        <div className="form-group">
                            <label htmlFor="characterName">Character Name:</label>
                            <input
                                id="characterName"
                                type="text"
                                value={uploadName}
                                onChange={(e) => setUploadName(e.target.value)}
                                placeholder="e.g., tom, jerry, dog"
                                className="input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fileInput">Select Image:</label>
                            <input
                                id="fileInput"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="file-input"
                            />
                            {selectedFile && (
                                <span className="file-name">Selected: {selectedFile.name}</span>
                            )}
                        </div>

                        <button type="submit" className="btn btn-success">Upload Image</button>
                    </form>

                    {uploadMessage && (
                        <div className="message success">{uploadMessage}</div>
                    )}

                    {uploadError && (
                        <div className="message error">{uploadError}</div>
                    )}
                </section>
            </div>

            <footer className="footer">
                <p>💡 Tip: After uploading a new image, search for the character to see the updated image!</p>
            </footer>
        </div>
    )
}

export default App
