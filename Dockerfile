# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN NODE_ENV=development npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (need devDeps like drizzle-kit/tsx for migrations)
RUN npm ci

# Copy migration config and schema
COPY drizzle.config.ts ./
COPY shared ./shared

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start the application - Run DB push first
CMD ["sh", "-c", "npm run db:push && node dist/index.cjs"]
