# Video Feature Guide

## Overview
Both hero slides and property plots now support 12-25 second videos alongside images.

## How It Works

### Hero Section
- Videos in the hero section will:
  - Auto-play muted when displayed
  - Auto-advance to the next slide when the video ends
  - Have a 25-second safety cap (will advance even if video doesn't end)
  - Show a play icon (▶) on the dot indicator
  - Display navigation arrows and dot indicators for multiple slides

### Property Plots
- Videos in property listings will:
  - Show a play icon (▶) overlay on the card thumbnail
  - Display muted video preview in the property detail carousel
  - Have full controls when viewed in the detail page
  - Can be mixed with images in any order

## Adding Videos

### Via Admin Panel
1. Go to the Admin Panel (login required)
2. For Hero Section:
   - Select "🖼 Hero Section" tab
   - Under "Background Images", paste a video URL or upload a video file
   - Videos auto-detect based on file extension (.mp4, .mov, .webm, .ogg)
   
3. For Property Plots:
   - Select "🗺 Plots Manager" tab
   - Click "Edit" on a plot or "+ Add Plot"
   - Under "Plot Images", add video URLs or upload video files
   - First media item (image or video) becomes the cover thumbnail
   - Use ⬆ to reorder, ✕ to remove

### Supported Formats
- **Image formats**: JPG, PNG, WebP, GIF
- **Video formats**: MP4, MOV, WebM, OGG
- **Recommended**: MP4 (H.264) for best browser compatibility
- **Duration**: 12-25 seconds recommended

### Video Requirements
- Keep file size under 10MB for fast loading
- Use landscape orientation (16:9 ratio recommended)
- Ensure videos are optimized for web (use tools like HandBrake)
- Videos should be muted-friendly (no critical audio content)

## Data Structure

Videos and images are stored as objects in Firestore:

```javascript
// Hero Section
{
  images: [
    { url: "https://example.com/image.jpg", type: "image" },
    { url: "https://example.com/video.mp4", type: "video" }
  ]
}

// Property Plots
{
  images: [
    { url: "https://example.com/plot-video.mp4", type: "video" },
    { url: "https://example.com/plot1.jpg", type: "image" },
    { url: "https://example.com/plot2.jpg", type: "image" }
  ],
  image: "https://example.com/plot-video.mp4" // First item URL for backward compatibility
}
```

## Technical Notes
- Legacy string URLs in the `images` array are automatically treated as images
- Videos use the HTML5 `<video>` element with `autoPlay`, `muted`, and `playsInline` attributes
- Images use standard `<img>` elements with object-fit: cover
- Lightbox only supports images (videos show controls in the carousel)
- Cloudinary upload automatically detects video files and uses the video upload endpoint

## Tips
- Mix videos and images for visual variety
- Place videos strategically (first position for cover impact)
- Test on mobile devices to ensure smooth playback
- Keep videos short (12-25s) to maintain user engagement
