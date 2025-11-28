# Tom & Jerry Image Management System

A full-stack image management application built with Express.js backend and React frontend. Users can search for character images and upload new images to replace existing ones dynamically without server restart.

## Features

- 🔍 **Image Search**: Search for character images by name (tom, jerry, dog)
- 📤 **Image Upload**: Upload and replace character images dynamically
- 🔄 **Live Updates**: See new images immediately without server restart
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## Technology Stack

### Backend
- Express.js - Web server framework
- Multer - File upload middleware
- CORS - Cross-origin resource sharing

### Frontend
- React - UI library
- Vite - Fast build tool
- Modern CSS with animations

## Setup Instructions

### Backend Server

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

### Frontend Application

1. Navigate to the client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The React app will typically run on `http://localhost:5173`

## API Documentation

### GET /api/getImage

Retrieve an image filename based on character name.

**Query Parameters:**
- `name` (required) - Character name (e.g., tom, jerry, dog)

**Response:**
```json
{
  "filename": "tom.jpg"
}
```

### POST /api/upload

Upload a new image for a character.

**Query Parameters:**
- `name` (required) - Character name

**Body:**
- FormData with `image` field containing the file

**Response:**
```json
{
  "success": true,
  "message": "Image for tom uploaded successfully",
  "filename": "tom.jpg"
}
```

## Usage Guide

### Searching for Images

1. Enter a character name (tom, jerry, or dog) in the search field
2. Click the "Search" button
3. The character image will be displayed below

### Uploading New Images

1. Enter the character name in the "Character Name" field
2. Click "Choose File" and select an image from your computer
3. Click the "Upload Image" button
4. A success message will appear confirming the upload
5. Search for the character again to see the new image

## Project Structure

```
tom and jerry/
├── server.js           # Express.js backend server
├── package.json        # Backend dependencies
├── public/             # Static image files
│   ├── tom.jpg
│   ├── jerry.jpg
│   └── dog.jpg
└── client/             # React frontend
    ├── src/
    │   ├── App.jsx     # Main React component
    │   └── App.css     # Styling
    └── package.json    # Frontend dependencies
```

## Demo

The application demonstrates:
1. Initial image display for tom, jerry, or dog
2. Upload functionality replacing existing images
3. Immediate reflection of changes without server restart
4. Clean error handling and user feedback

## Notes

- Uploaded images automatically overwrite existing files with the same character name
- Images are served from the `/public` folder
- File extensions are preserved from uploaded files
- CORS is enabled to allow frontend-backend communication
