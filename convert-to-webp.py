from PIL import Image
import os

public_dir = "./public"
converted = []

for fname in os.listdir(public_dir):
    if not fname.lower().endswith(".png"):
        continue

    input_path = os.path.join(public_dir, fname)
    output_name = os.path.splitext(fname)[0] + ".webp"
    output_path = os.path.join(public_dir, output_name)

    original_size = os.path.getsize(input_path)

    img = Image.open(input_path)
    img.save(output_path, "WEBP", quality=88, method=6)

    new_size = os.path.getsize(output_path)
    savings = (1 - new_size / original_size) * 100

    print(f"OK {fname} -> {output_name}  ({original_size//1024}KB -> {new_size//1024}KB, -{savings:.1f}%)")
    converted.append(output_name)

print(f"\nDone. {len(converted)} images converted to WebP.")
