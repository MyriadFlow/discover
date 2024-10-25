# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Install pnpm globally
RUN npm install -g pnpm

# Step 3: Set the working directory inside the container
WORKDIR /app

# Step 4: Copy the package.json and pnpm-lock.yaml files to the container
COPY package.json pnpm-lock.yaml ./

# Step 5: Install the dependencies using pnpm
RUN pnpm install

# Step 6: Copy the rest of the application code to the container
COPY . .

# Step 7: Build the Next.js application
RUN pnpm run build

# Step 8: Expose the port the app runs on
EXPOSE 3000

# Step 9: Define the command to run the application using pnpm
CMD ["pnpm", "run", "start"]
