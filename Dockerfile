# Use Node.js Alpine as base image
FROM node:22-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY vite.config.ts tsconfig.json svelte.config.js ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Pepare
RUN pnpm run prepare

# Build the application
RUN pnpm run build

# Production stage - use nginx to serve static files
FROM nginx:alpine AS production

# Copy built static files from build stage
COPY --from=base /app/build /usr/share/nginx/html

# Copy custom nginx configuration (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
