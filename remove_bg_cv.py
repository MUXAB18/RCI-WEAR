import cv2
import numpy as np
import os
import glob

def remove_background(image_path):
    print(f"Processing {image_path}...")
    # Read image (with alpha if present, though we will replace it)
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    
    # If already has alpha and not 3 channels, let's just use BGR for processing
    if img.shape[2] == 4:
        img_bgr = img[:, :, :3]
    else:
        img_bgr = img
        
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    
    # Threshold: anything lighter than 240 is background (0).
    # Since these are AI generated with pure white backgrounds, this is robust.
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    
    # Clean up the mask using morphological operations to close small holes inside the garment
    kernel = np.ones((5,5), np.uint8)
    # Closing to fill small holes inside the garment
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=3)
    
    # Find contours
    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    mask = np.zeros_like(gray)
    if contours:
        # Sort contours by area, keeping the largest ones
        contours = sorted(contours, key=cv2.contourArea, reverse=True)
        # We might have multiple disconnected parts (e.g. sleeves), let's keep all significant ones
        max_area = cv2.contourArea(contours[0])
        for c in contours:
            if cv2.contourArea(c) > max_area * 0.05: # Keep if at least 5% of largest
                cv2.drawContours(mask, [c], 0, 255, -1)
    else:
        mask = thresh
        
    # Optional: Slightly blur the mask for anti-aliasing, then threshold again softly
    mask = cv2.GaussianBlur(mask, (3, 3), 0)
    
    # Extract original BGR
    b, g, r = cv2.split(img_bgr)
    
    # Create new image with alpha channel
    rgba = [b, g, r, mask]
    dst = cv2.merge(rgba, 4)
    
    # Save image
    cv2.imwrite(image_path, dst)
    print(f"Saved {image_path} with transparent background.")

if __name__ == '__main__':
    images = glob.glob('public/studio/base_*.png')
    for img in images:
        remove_background(img)
    print("Done!")
