# Tahap 1: Build aplikasi dengan Node.js
FROM node:22 AS builder

# Set working directory
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Bangun aplikasi NestJS
RUN npm run build

# Tahap 2: Image TensorFlow sebagai runtime
FROM tensorflow/tensorflow:latest

# Update package list dan instal curl untuk menambahkan NodeSource
RUN apt-get update && apt-get install -y curl

# Tambahkan repository Node.js versi 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash -

# Instal Node.js dan npm
RUN apt-get install -y nodejs

# Verifikasi instalasi Node.js
RUN node -v && npm -v

# Set working directory
WORKDIR /usr/src/app

# Salin hasil build dari tahap 1
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Salin file .env jika ada
COPY .env ./

# Instal dependensi aplikasi
RUN npm install --production

# Expose port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "dist/main.js"]
