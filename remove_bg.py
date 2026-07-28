import os
import glob
from rembg import remove
from PIL import Image

def process_images():
    directory = 'public/studio'
    images = glob.glob(os.path.join(directory, 'base_*.png'))
    for img_path in images:
        print(f"Processing {img_path}...")
        input_image = Image.open(img_path)
        # Use alpha matting for better edges
        output_image = remove(input_image, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=10, alpha_matting_erode_size=10)
        output_image.save(img_path)
        print(f"Saved {img_path}")

if __name__ == '__main__':
    process_images()
