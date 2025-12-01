---
description: Create demo video for image management workflow
---
```yaml
1. Ensure the server is running (`node server.js`).
// turbo
2. Open the client page in a headless browser and perform an upload for "tom".
3. Capture a screenshot after upload.
4. Perform a second upload to replace the image.
5. Capture another screenshot.
6. Fetch the image URLs and verify they return `200`.
7. Use `ffmpeg` to combine screenshots into a short video (`demo.mp4`).
8. Save `demo.mp4` in the project root.
```
