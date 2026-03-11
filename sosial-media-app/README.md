# 📱 Sosial Media App

> Aplikasi sosial media berbasis web yang dibangun dengan **React + TypeScript** dan **Firebase** — mencakup fitur autentikasi, posting konten, komentar, dan manajemen profil pengguna.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10.x-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-2.x-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)]()

---

## 📋 Table of Contents

- [Tentang Proyek](#-tentang-proyek)
- [Tech Stack](#-tech-stack)
- [Fitur](#-fitur)
- [Struktur Proyek](#-struktur-proyek)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi Firebase](#-konfigurasi-firebase)
- [Cara Menjalankan](#-cara-menjalankan)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🧩 Tentang Proyek

Proyek ini merupakan bagian dari seri **belajar TypeScript** — membangun aplikasi sosial media fullstack menggunakan **React + TypeScript** di sisi frontend dan **Firebase** sebagai backend-as-a-service (BaaS).

Tujuan utama proyek ini adalah:
- Memahami implementasi **TypeScript** dalam proyek React nyata
- Belajar integrasi **Firebase** (Auth, Firestore, Storage, Hosting)
- Menerapkan konsep **type safety** pada data Firestore
- Membangun UI yang interaktif dengan React Hooks

---

## 🛠 Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| [TypeScript](https://www.typescriptlang.org/) | ^5.x | Bahasa utama |
| [React](https://react.dev/) | ^18.x | UI Framework |
| [Firebase Auth](https://firebase.google.com/docs/auth) | ^10.x | Autentikasi pengguna |
| [Cloud Firestore](https://firebase.google.com/docs/firestore) | ^10.x | Database realtime |
| [Cloudinary](https://cloudinary.com/) | ^2.x | Upload & manajemen foto/media |
| [Firebase Hosting](https://firebase.google.com/docs/hosting) | ^10.x | Deployment & hosting |

---

## ✨ Fitur

- 🔐 **Autentikasi** — Register & Login dengan Firebase Auth (Email/Password / Google)
- 👤 **Profil Pengguna** — Lihat & update profil, upload foto profil via Cloudinary
- 📝 **Post** — Buat, edit, hapus, dan lihat post dengan gambar
- 💬 **Komentar** — Tambah dan hapus komentar pada post secara realtime
- ❤️ **Like** — Like/unlike post
- 👥 **Follow** — Follow/unfollow pengguna lain
- 🔴 **Realtime Update** — Data ter-update otomatis via Firestore listener

---

## 📁 Struktur Proyek

```
sosial-media-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/             # Gambar & icon statis
│   ├── components/         # Reusable UI components
│   │   ├── Post/
│   │   ├── Comment/
│   │   └── Navbar/
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Halaman utama (Home, Profile, Login)
│   ├── services/           # Firebase & Cloudinary service functions
│   │   ├── authService.ts
│   │   ├── postService.ts
│   │   └── cloudinaryService.ts
│   ├── types/              # TypeScript interfaces & types
│   │   └── index.ts
│   ├── firebase.ts         # Inisialisasi Firebase
│   └── main.tsx            # Entry point
├── .env.example            # Template environment variable
├── .firebaserc             # Konfigurasi project Firebase
├── firebase.json           # Konfigurasi Firebase Hosting
├── tsconfig.json           # Konfigurasi TypeScript
├── vite.config.ts          # Konfigurasi Vite
├── package.json
└── README.md
```

---

## ✅ Prasyarat

Pastikan kamu sudah menginstall dan menyiapkan:

- [Node.js](https://nodejs.org/) versi **18 atau lebih baru**
- [npm](https://www.npmjs.com/) versi **9 atau lebih baru**
- [Firebase CLI](https://firebase.google.com/docs/cli) — untuk deployment
- Akun [Firebase](https://firebase.google.com/) + project yang sudah dibuat

Cek versi yang terpasang:
```bash
node --version     # v18.x.x
npm --version      # 9.x.x
firebase --version # 13.x.x
```

Install Firebase CLI jika belum ada:
```bash
npm install -g firebase-tools
```

---

## 🚀 Instalasi

### 1. Clone repositori

```bash
git clone https://github.com/SukmaPutra/belajarTypescript.git
cd belajarTypescript/sosial-media-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Salin file environment

```bash
cp .env.example .env
```

---

## 🔥 Konfigurasi Firebase

### 1. Buat Firebase Project
Buka [Firebase Console](https://console.firebase.google.com/), buat project baru, lalu aktifkan layanan berikut:
- **Authentication** → Sign-in method → Email/Password & Google
- **Firestore Database** → Create database → Start in test mode

### 2. Ambil Firebase Config
Masuk ke **Project Settings → General → Your apps → Web app**, lalu salin konfigurasinya.

### 3. Buat Cloudinary Account
Buka [Cloudinary Console](https://console.cloudinary.com/), daftar akun gratis, lalu:
- Masuk ke **Dashboard** → salin **Cloud Name**, **API Key**, dan **API Secret**
- Buat **Upload Preset**: Settings → Upload → Add upload preset → pilih `Unsigned`

### 4. Isi file `.env`

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

| Variable | Wajib | Keterangan |
|----------|:-----:|------------|
| `VITE_FIREBASE_API_KEY` | ✅ | API key Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | ✅ | Domain autentikasi |
| `VITE_FIREBASE_PROJECT_ID` | ✅ | ID project Firebase |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ✅ | Sender ID |
| `VITE_FIREBASE_APP_ID` | ✅ | App ID Firebase |
| `VITE_CLOUDINARY_CLOUD_NAME` | ✅ | Cloud name Cloudinary |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | ✅ | Upload preset (unsigned) |

> ⚠️ **Jangan pernah commit file `.env` ke repository!** Pastikan `.env` sudah ada di `.gitignore`.

---

## ▶️ Cara Menjalankan

### Development

```bash
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

### Preview hasil build

```bash
npm run preview
```

---

## 🌐 Deployment

Proyek ini di-deploy menggunakan **Firebase Hosting**.

### 1. Login ke Firebase

```bash
firebase login
```

### 2. Inisialisasi Firebase (hanya pertama kali)

```bash
firebase init hosting
```

Pilih opsi berikut saat setup:
- **Public directory:** `dist`
- **Configure as single-page app:** `Yes`
- **Overwrite index.html:** `No`

### 3. Build & Deploy

```bash
npm run build
firebase deploy
```

Aplikasi akan live di: `https://your-project-id.web.app`

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Ikuti langkah berikut:

1. **Fork** repositori ini
2. Buat **branch** baru: `git checkout -b feature/nama-fitur`
3. **Commit** perubahanmu: `git commit -m 'feat: tambah fitur X'`
4. **Push** ke branch: `git push origin feature/nama-fitur`
5. Buat **Pull Request**

> Gunakan format commit message: `feat:`, `fix:`, `docs:`, `refactor:` ([Conventional Commits](https://www.conventionalcommits.org/))

---

## 📄 Lisensi

Proyek ini menggunakan lisensi [MIT](LICENSE).

---

<div align="center">

Dibuat dengan ❤️ oleh [Sukma Putra](https://github.com/SukmaPutra) — Bagian dari seri **Belajar TypeScript**

⭐ Jika proyek ini membantumu, jangan lupa beri bintang!

</div>