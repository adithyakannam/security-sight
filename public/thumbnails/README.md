# Thumbnail Images Directory

This directory should contain the following image files referenced in the seed data:

## Required Image Files:
- `unauthorized-access-1.jpg` - Image showing unauthorized access attempt
- `gun-threat-1.jpg` - Image showing weapon detection
- `face-recognised-1.jpg` - Image showing face recognition match
- `suspicious-activity-1.jpg` - Image showing suspicious behavior
- `perimeter-breach-1.jpg` - Image showing perimeter security breach
- `unattended-bag-1.jpg` - Image showing unattended baggage
- `facial-recognition-1.jpg` - Image showing facial recognition alert
- `smoke-detection-1.jpg` - Image showing smoke/fire detection
- `crowd-density-1.jpg` - Image showing crowd density alert
- `placeholder.jpg` - Fallback image for error cases

## Image Requirements:
- Format: JPG
- Recommended size: 640x360 pixels (16:9 aspect ratio)
- File size: Under 500KB each for optimal loading
- Content: Security camera footage style images

## Usage:
These images are used as thumbnails in the security incident dashboard. Each image should represent the type of security incident it's associated with.

You can:
1. Use stock security camera footage images
2. Create placeholder images with text labels
3. Use actual security footage (if available and appropriate)
4. Generate AI images that represent each incident type

The application will fallback to `placeholder.jpg` if any specific image fails to load.
