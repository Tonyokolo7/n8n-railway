# Use official n8n image as base
FROM n8nio/n8n

# Set working directory
WORKDIR /data

# Copy package.json and package-lock.json
COPY package*.json ./

# Install custom dependencies (like google-auth-library)
RUN npm install

# Copy all project files (workflows, credentials, etc.)
COPY . .

# Expose default n8n port
EXPOSE 5678

# Start n8n
CMD ["n8n"]
