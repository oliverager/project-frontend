# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all project files
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Run
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from the builder stage
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./package.json

# Copy node_modules from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copy the built Next.js application
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Set correct permissions
USER nextjs

# Expose the port
EXPOSE 3001

# Start the app
CMD ["npm", "start"]
