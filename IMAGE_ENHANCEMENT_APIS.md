# Image Enhancement API Configuration

## Overview

The Image Enhancement tool uses two different APIs depending on the enhancement type:

### 1. **Remove.bg API** (Background Removal)

- **Used for:** `remove-bg` enhancement type
- **API Key:** `REMOVEBG_API_KEY`
- **Get API Key:** https://www.remove.bg/api
- **Endpoint:** `https://api.remove.bg/v1.0/removebg`
- **Method:** POST with FormData
- **Request Format:**
  ```javascript
  const formData = new FormData()
  formData.append("image_file_b64", base64ImageString)
  formData.append("size", "auto")
  ```
- **Headers:**
  ```javascript
  {
    "X-Api-Key": REMOVEBG_API_KEY
  }
  ```
- **Response:** Binary image data (PNG with transparent background)

### 2. **Deep-Image.ai API** (Enhancement, Upscale, Restore)

- **Used for:** `enhance`, `upscale`, `restore` enhancement types
- **API Key:** `DEEPIMAGE_API_KEY`
- **Get API Key:** https://deep-image.ai/app/my-profile/api
- **Endpoint:** `https://deep-image.ai/rest_api/process_result`
- **Method:** POST with JSON
- **Request Format:**
  ```javascript
  {
    "url": "base64,<base64ImageString>",
    "enhancements": ["denoise", "deblur", "light"],
    "width": 2000
  }
  ```
- **Headers:**
  ```javascript
  {
    "Content-Type": "application/json",
    "x-api-key": DEEPIMAGE_API_KEY
  }
  ```
- **Response:** JSON with base64 encoded image

## Enhancement Types

### Enhance (`type: "enhance"`)

- **API:** Deep-Image.ai
- **Features:**
  - AI denoising
  - Deblurring
  - Light/color correction
  - Upscale to 2000px width
- **Request:**
  ```json
  {
  	"url": "base64,<image>",
  	"enhancements": ["denoise", "deblur", "light"],
  	"width": 2000
  }
  ```

### Upscale (`type: "upscale"`)

- **API:** Deep-Image.ai
- **Features:**
  - 4x resolution increase
  - AI denoising
  - Preserves quality
- **Request:**
  ```json
  {
  	"url": "base64,<image>",
  	"width": 4000,
  	"enhancements": ["denoise"]
  }
  ```

### Remove Background (`type: "remove-bg"`)

- **API:** Remove.bg
- **Features:**
  - AI-powered background removal
  - PNG with transparency
  - Auto size optimization
- **Request:**
  ```
  FormData with image_file_b64 and size=auto
  ```

### Restore (`type: "restore"`)

- **API:** Deep-Image.ai
- **Features:**
  - Photo restoration
  - Advanced denoising
  - Deblurring
  - Sharpening
  - Light correction
  - Upscale to 2000px
- **Request:**
  ```json
  {
  	"url": "base64,<image>",
  	"enhancements": ["denoise", "deblur", "sharpen", "light"],
  	"width": 2000
  }
  ```

## Configuration

### .env File

```properties
# For enhance, upscale, restore
DEEPIMAGE_API_KEY=your-deep-image-api-key

# For remove-bg only
REMOVEBG_API_KEY=your-removebg-api-key
```

### Mock Mode

If the required API key is not configured:

- Returns original image unchanged
- Adds `mock: true` flag to response
- Shows message indicating which API key is needed

## Error Handling

Both APIs have fallback to mock mode if:

- API key is missing
- API request fails
- Network error occurs

The app will return the original image with a mock flag and error message.

## API Limits & Pricing

### Remove.bg

- **Free tier:** 50 images/month
- **Paid plans:** Starting from $9/month for 500 images
- **Rate limits:** Varies by plan
- **Docs:** https://www.remove.bg/api#limits

### Deep-Image.ai

- **Free tier:** Limited credits
- **Paid plans:** Pay-as-you-go or subscription
- **Rate limits:** Depends on plan
- **Docs:** https://documentation.deep-image.ai/

## Testing

### Test Remove Background:

```bash
curl -X POST http://localhost:3002/api/image-enhance \
  -F "image=@test-image.jpg" \
  -F "type=remove-bg"
```

### Test Enhancement:

```bash
curl -X POST http://localhost:3002/api/image-enhance \
  -F "image=@test-image.jpg" \
  -F "type=enhance"
```

### Test Upscale:

```bash
curl -X POST http://localhost:3002/api/image-enhance \
  -F "image=@test-image.jpg" \
  -F "type=upscale"
```

### Test Restore:

```bash
curl -X POST http://localhost:3002/api/image-enhance \
  -F "image=@test-image.jpg" \
  -F "type=restore"
```
