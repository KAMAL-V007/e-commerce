# Use Nginx image
FROM nginx:alpine

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend files to the Nginx root directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
