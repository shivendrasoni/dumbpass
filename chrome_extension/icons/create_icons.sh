#!/bin/bash

# This script creates simple placeholder SVG icons for the extension
# Note: In a production environment, you would want to create proper icons

# 16x16 icon
cat > icon16.svg << EOF
<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
  <rect width="16" height="16" fill="#4CAF50" />
  <text x="8" y="12" font-family="Arial" font-size="12" fill="white" text-anchor="middle">D</text>
</svg>
EOF

# 48x48 icon
cat > icon48.svg << EOF
<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" fill="#4CAF50" />
  <text x="24" y="34" font-family="Arial" font-size="30" fill="white" text-anchor="middle">D</text>
</svg>
EOF

# 128x128 icon
cat > icon128.svg << EOF
<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" fill="#4CAF50" />
  <text x="64" y="88" font-family="Arial" font-size="80" fill="white" text-anchor="middle">D</text>
</svg>
EOF

# Convert SVG to PNG if imagemagick is available
if command -v convert &> /dev/null; then
    convert icon16.svg icon16.png
    convert icon48.svg icon48.png
    convert icon128.svg icon128.png
    echo "PNG icons created successfully."
    # Clean up SVG files
    rm *.svg
else
    echo "ImageMagick not found. Keeping SVG files - you'll need to convert them to PNG manually."
    echo "You can use online tools or install ImageMagick to convert the SVG files to PNG."
fi 