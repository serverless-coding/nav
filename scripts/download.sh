#!bin/bash

# Check if a markdown file path is provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <markdown_file>"
  exit 1
fi

markdown_file="$1"

# Get the directory of the script
script_dir=$(dirname "$0")

# Ensure the output directory exists
output_dir="$script_dir/../public/images/md"
mkdir -p "$output_dir"

# Loop through the URLs and download the images
for url in $(grep -oP 'https?://.*?\.(png|jpg|jpeg|gif)' "$markdown_file"); do
  filename=$(basename "$url")
  curl -o "$output_dir/$filename" "$url"
done

echo "download done"