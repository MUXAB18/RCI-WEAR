import sys
import glob
import os
from PIL import Image

def remove_background(image_path):
    print(f"Processing {image_path}...")
    try:
        img = Image.open(image_path).convert("RGBA")
        
        # Get data
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Change all white (also shades of whites)
            # to transparent
            if item[0] > 230 and item[1] > 230 and item[2] > 230:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        
        # Save as PNG
        new_path = image_path.replace(".jpg", ".png")
        img.save(new_path, "PNG")
        print(f"Saved {new_path}")
        
        # Remove original jpg
        if new_path != image_path:
            os.remove(image_path)
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

if __name__ == "__main__":
    files = glob.glob("public/studio/patch_*.jpg")
    for f in files:
        remove_background(f)
