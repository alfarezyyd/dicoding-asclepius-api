# Step 1: Gunakan base image resmi Node.js
FROM node:22-alpine

# Step 2: Set working directory dalam container
WORKDIR /app

# Step 3: Copy file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --omit=dev

# Step 5: Copy seluruh kode aplikasi ke dalam container
COPY . .

# Step 6: Build aplikasi (opsional, jika menggunakan NestJS dengan build step)
RUN npm run build

# Step 7: Ekspos port (Cloud Run menggunakan port 8080 secara default)
EXPOSE 8080

# Step 8: Tentukan perintah untuk menjalankan aplikasi
CMD ["npm", "run", "start:prod"]
