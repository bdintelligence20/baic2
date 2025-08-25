# Multi-stage build optimized for Google Cloud Run
# Build stage
FROM node:19-alpine as build

# Set build-time environment variables for optimization
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
ENV INLINE_RUNTIME_CHUNK=false

# Create app directory
WORKDIR /app

# Copy package files for better Docker layer caching
COPY package*.json ./

# Install dependencies with cache optimization
RUN npm ci --only=production --silent && \
    npm cache clean --force

# Install sharp for image optimization
RUN npm install sharp --silent

# Copy source code
COPY . .

# Run our optimized build script
RUN node scripts/build-production.js

# Production stage - optimized nginx
FROM nginx:1.25-alpine as production

# Install additional tools for Cloud Run optimization
RUN apk add --no-cache \
    curl \
    tzdata && \
    rm -rf /var/cache/apk/*

# Copy optimized build from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy optimized nginx configuration
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy cache headers files for static serving
COPY --from=build /app/build/_headers /usr/share/nginx/html/_headers
COPY --from=build /app/build/.htaccess /usr/share/nginx/html/.htaccess

# Create nginx user for security
RUN addgroup -g 101 -S nginx && \
    adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chmod -R 755 /usr/share/nginx/html

# Create custom nginx.conf for Cloud Run
RUN echo 'user nginx;' > /etc/nginx/nginx.conf && \
    echo 'worker_processes auto;' >> /etc/nginx/nginx.conf && \
    echo 'error_log /var/log/nginx/error.log warn;' >> /etc/nginx/nginx.conf && \
    echo 'pid /var/run/nginx.pid;' >> /etc/nginx/nginx.conf && \
    echo 'events { worker_connections 1024; use epoll; multi_accept on; }' >> /etc/nginx/nginx.conf && \
    echo 'http {' >> /etc/nginx/nginx.conf && \
    echo '  include /etc/nginx/mime.types;' >> /etc/nginx/nginx.conf && \
    echo '  include /etc/nginx/conf.d/*.conf;' >> /etc/nginx/nginx.conf && \
    echo '}' >> /etc/nginx/nginx.conf

# Health check script for Cloud Run
RUN echo '#!/bin/sh' > /healthcheck.sh && \
    echo 'curl -f http://localhost:8080/health || exit 1' >> /healthcheck.sh && \
    chmod +x /healthcheck.sh

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD /healthcheck.sh

# Switch to nginx user for security
USER nginx

# Expose port 8080 (Cloud Run requirement)
EXPOSE 8080

# Add metadata labels for Cloud Run
LABEL org.opencontainers.image.title="BAIC Website - Performance Optimized"
LABEL org.opencontainers.image.description="Performance optimized BAIC automotive website"
LABEL org.opencontainers.image.version="1.0.0"

# Start nginx with daemon off for containerized deployment
CMD ["nginx", "-g", "daemon off;"]
