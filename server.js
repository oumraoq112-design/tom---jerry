const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Enable CORS for React frontend
app.use(cors());

// Serve static files from public directory
// Serve static files from public directory with no caching
app.use(express.static('public', {
  etag: false,
  lastModified: false,
  setHeaders: (res, path) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  }
}));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const publicDir = path.join(__dirname, 'public');
    // Create public directory if it doesn't exist
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    cb(null, publicDir);
  },
  filename: function (req, file, cb) {
    // Get character name from query parameter
    const characterName = req.query.name || 'unknown';
    // Get file extension from uploaded file
    const ext = path.extname(file.originalname) || '.jpg';
    // Save as characterName.jpg (e.g., tom.jpg, jerry.jpg)
    const filename = `${characterName}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// GET route: Return image filename based on query parameter
app.get('/api/getImage', (req, res) => {
  const characterName = req.query.name;

  if (!characterName) {
    return res.status(400).json({ error: 'Character name is required' });
  }

  // Check which image file exists for this character
  const possibleExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  let imageFile = null;

  for (const ext of possibleExtensions) {
    const filename = `${characterName}${ext}`;
    const filepath = path.join(__dirname, 'public', filename);
    if (fs.existsSync(filepath)) {
      imageFile = filename;
      break;
    }
  }

  if (!imageFile) {
    return res.status(404).json({ error: 'Image not found for this character' });
  }

  res.json({ filename: imageFile });
});

// POST route: Upload and replace character image
app.post('/api/upload', upload.single('image'), (req, res) => {
  const characterName = req.query.name;

  if (!characterName) {
    return res.status(400).json({ error: 'Character name is required in query parameter' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    success: true,
    message: `Image for ${characterName} uploaded successfully`,
    filename: req.file.filename
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Static files served from: ${path.join(__dirname, 'public')}`);
});
