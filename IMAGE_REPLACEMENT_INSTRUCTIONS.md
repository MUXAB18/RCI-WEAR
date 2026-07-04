# Image Replacement Instructions

## Replace About Section Image

### Current Image
- **Location**: `public/about_img.jpg`
- **Used in**: About section (`src/components/About.jsx`)
- **Current image**: Shows RCI branding with products and "EST. 2017"

### New Image to Use
- **Description**: Luxurious store interior with:
  - Rasheed Clothing International logo on wall
  - Dark, moody lighting
  - Product displays and clothing racks
  - Sewing machine detail photo
  - Professional retail environment

### Steps to Replace:

1. **Save your new image** (the store interior photo) to your computer
2. **Rename it to**: `about_img.jpg`
3. **Replace the file** in the project:
   ```bash
   # From your project root directory
   cp /path/to/your/new/image.jpg public/about_img.jpg
   ```
4. **Optimize the image** (optional but recommended):
   - Recommended size: 1200px - 1600px width
   - Format: JPEG with 85% quality
   - This helps with loading speed

5. **Test locally**:
   ```bash
   npm run dev
   ```
   - Navigate to the About section
   - Verify the new image appears correctly

6. **Build and deploy**:
   ```bash
   npm run build
   git add public/about_img.jpg
   git commit -m "Update About section image to store interior"
   git push origin main
   ```

### Alternative: Using a Different Filename

If you want to keep both images, you can:

1. Save the new image as `public/store_interior.jpg`
2. Update the About component:
   ```jsx
   // In src/components/About.jsx, line 54
   <img src="/store_interior.jpg" alt="Rasheed Clothing International craftsmanship" />
   ```

### Image Requirements
- **Format**: JPG or WebP
- **Max file size**: < 500KB (recommended)
- **Dimensions**: 1200-1600px width
- **Aspect ratio**: 16:9 or 4:3 works well
- **Quality**: High quality, professional product photo

---

**Current file location**: `public/about_img.jpg` (181KB)  
**Component using it**: `src/components/About.jsx` (line 54)
