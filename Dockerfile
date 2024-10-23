# Menggunakan Node.js versi 22 sebagai base image
FROM node:22

# Set working directory
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Bangun aplikasi NestJS
RUN npm run build

# Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "dist/main.js"]