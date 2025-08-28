#!/bin/bash

# Download attorney images from the live site
echo "Downloading attorney images..."

cd public/images/attorneys

# William Vasquez
curl -L "https://vasquezlawfirm.com/wp-content/uploads/2025/06/6.png" -o william-vasquez.jpg

# Kelly Vega
curl -L "https://vasquezlawfirm.com/wp-content/uploads/2025/06/Kelly-Vega.png" -o kelly-vega.jpg

# Rebecca Sommer
curl -L "https://vasquezlawfirm.com/wp-content/uploads/2025/06/Rebecca-Sommer.png" -o rebecca-sommer.jpg

# Jillian Baucom
curl -L "https://vasquezlawfirm.com/wp-content/uploads/2025/06/1w-1.jpg" -o jillian-baucom.jpg

# Adrianna Ingram
curl -L "https://vasquezlawfirm.com/wp-content/uploads/2025/06/5.png" -o adrianna-ingram.jpg

# Roselyn V. Torrellas
curl -L "https://vasquezlawfirm.com/wp-content/uploads/2025/06/3.png" -o roselyn-torrellas.jpg

# Christopher Afanador
curl -L "https://vasquezlawfirm.com/wp-content/uploads/2025/06/1q.png" -o christopher-afanador.jpg

echo "Attorney images downloaded successfully!"