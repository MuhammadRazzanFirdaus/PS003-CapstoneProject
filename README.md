# 💰 PS003 — Capstone Project (Backend API)

> **Aplikasi Manajemen Keuangan Pribadi** — Backend REST API yang dibangun dengan **Laravel 12** dan **Laravel Sanctum** untuk autentikasi berbasis token. Aplikasi ini menyediakan endpoint untuk mengelola _goals_ (target tabungan), _transactions_ (transaksi keuangan), _bills_ (tagihan), dan _notifications_ (notifikasi) secara per-user.

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Prasyarat / Prerequisites](#-prasyarat--prerequisites)
- [Instalasi & Setup](#-instalasi--setup)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Database Setup](#-database-setup)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Struktur Proyek](#-struktur-proyek)
- [API Endpoints](#-api-endpoints)
- [Akun Test / Seeder](#-akun-test--seeder)
- [Frontend](#-frontend)
- [Troubleshooting](#-troubleshooting)
- [Lisensi](#-lisensi)

---

## ✨ Fitur Utama

| Modul             | Deskripsi                                                                |
| ----------------- | ------------------------------------------------------------------------ |
| **Auth**          | Register, Login, Logout menggunakan Laravel Sanctum (token-based)        |
| **Goals**         | CRUD target tabungan dengan kategori, target amount, dan tracking harian |
| **Goal Savings**  | Catatan setoran tabungan untuk setiap goal                               |
| **Transactions**  | Pencatatan transaksi pemasukan & pengeluaran                             |
| **Bills**         | Pengelolaan tagihan dengan status pembayaran                             |
| **Notifications** | Sistem notifikasi in-app dengan fitur mark-as-read                       |

---

## 🛠 Tech Stack

| Teknologi       | Versi                                             |
| --------------- | ------------------------------------------------- |
| PHP             | >= 8.2                                            |
| Laravel         | 12.x                                              |
| Laravel Sanctum | 4.x                                               |
| Database        | MySQL (via XAMPP)                                 |
| Frontend        | React 19 + Vite + TailwindCSS 4 (folder terpisah) |

---

## 📦 Prasyarat / Prerequisites

Pastikan perangkat lunak berikut sudah terinstal di komputer kamu:

| Software          | Keterangan                                               | Link Download                                          |
| ----------------- | -------------------------------------------------------- | ------------------------------------------------------ |
| **PHP >= 8.2**    | Bisa didapatkan dari XAMPP                               | [Download XAMPP](https://www.apachefriends.org/)       |
| **Composer**      | Dependency manager PHP                                   | [Download Composer](https://getcomposer.org/download/) |
| **Node.js >= 18** | Untuk menjalankan Vite (opsional, untuk frontend assets) | [Download Node.js](https://nodejs.org/)                |
| **MySQL**         | Database server (sudah termasuk di XAMPP)                | —                                                      |
| **Git**           | Version control                                          | [Download Git](https://git-scm.com/)                   |

> **💡 Rekomendasi:** Gunakan [XAMPP](https://www.apachefriends.org/) karena sudah menyertakan PHP, MySQL, dan Apache sekaligus.

---

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/<username>/PS003-CapstoneProject.git
cd PS003-CapstoneProject/backend
```

> Ganti `<username>` dengan username GitHub yang sesuai.

### 2. Install Dependensi PHP

```bash
composer install
```

### 3. Salin File Environment

```bash
cp .env.example .env
```

> **Windows (CMD):**
>
> ```cmd
> copy .env.example .env
> ```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Install Dependensi Node.js (Opsional)

Hanya diperlukan jika kamu ingin compile frontend assets (Vite):

```bash
npm install
```

---

## ⚙ Konfigurasi Environment

Buka file `.env` dan sesuaikan konfigurasi berikut:

### Pengaturan Database

Secara default, proyek ini menggunakan **MySQL** melalui XAMPP. Sesuaikan konfigurasi berikut:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=capstone_project
DB_USERNAME=root
DB_PASSWORD=
```

| Variabel        | Keterangan                                   |
| --------------- | -------------------------------------------- |
| `DB_CONNECTION` | Tipe database, gunakan `mysql`               |
| `DB_HOST`       | Host database, biasanya `127.0.0.1`          |
| `DB_PORT`       | Port MySQL, default `3306`                   |
| `DB_DATABASE`   | Nama database, buat manual di phpMyAdmin     |
| `DB_USERNAME`   | Username database, default XAMPP: `root`     |
| `DB_PASSWORD`   | Password database, default XAMPP: _(kosong)_ |

### Pengaturan Aplikasi

```env
APP_NAME=CapstoneProject
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
```

---

## 🗄 Database Setup

### 1. Buat Database Baru

Buka **phpMyAdmin** di browser (`http://localhost/phpmyadmin`), lalu buat database baru dengan nama:

```
capstone_project
```

> Atau melalui terminal MySQL:
>
> ```sql
> CREATE DATABASE capstone_project;
> ```

### 2. Jalankan Migrasi

```bash
php artisan migrate
```

Perintah ini akan membuat semua tabel yang diperlukan:

| Tabel                                  | Keterangan                |
| -------------------------------------- | ------------------------- |
| `users`                                | Data pengguna             |
| `personal_access_tokens`               | Token autentikasi Sanctum |
| `goals`                                | Target tabungan           |
| `goal_savings`                         | Catatan setoran tabungan  |
| `transactions`                         | Transaksi keuangan        |
| `bills`                                | Tagihan                   |
| `notifications`                        | Notifikasi                |
| `cache`                                | Cache aplikasi            |
| `jobs` / `job_batches` / `failed_jobs` | Queue system              |
| `sessions`                             | Session data              |

### 3. Jalankan Seeder (Opsional)

Untuk membuat data dummy (akun test):

```bash
php artisan db:seed
```

---

## ▶ Menjalankan Aplikasi

### Pastikan XAMPP Berjalan

1. Buka **XAMPP Control Panel**
2. Start **Apache** dan **MySQL**

### Jalankan Laravel Development Server

```bash
php artisan serve
```

Server akan berjalan di: **http://localhost:8000**

### Jalankan Semua Service Sekaligus (Opsional)

Jika ingin menjalankan server + queue + Vite sekaligus:

```bash
composer dev
```

Perintah ini akan menjalankan:

- `php artisan serve` — Web server
- `php artisan queue:listen` — Queue worker
- `php artisan pail` — Log viewer
- `npm run dev` — Vite dev server

---

## 📁 Struktur Proyek

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       ├── AuthController.php         # Register, Login, Logout
│   │   │       ├── GoalController.php         # CRUD Goals
│   │   │       ├── GoalSavingController.php   # CRUD Goal Savings
│   │   │       ├── TransactionController.php  # Transaksi
│   │   │       ├── BillController.php         # Tagihan
│   │   │       └── NotificationController.php # Notifikasi
│   │   └── Requests/
│   │       ├── LoginRequest.php
│   │       └── RegisterRequest.php
│   └── Models/
│       ├── User.php
│       ├── Goal.php
│       ├── GoalSaving.php
│       ├── Transaction.php
│       ├── Bill.php
│       └── Notification.php
├── database/
│   ├── migrations/         # Definisi struktur tabel
│   └── seeders/            # Data dummy
├── routes/
│   ├── api.php             # Semua route API
│   └── web.php             # Route web (landing page)
├── .env.example            # Template konfigurasi environment
├── composer.json           # Dependensi PHP
└── package.json            # Dependensi Node.js
```

---

## 🔗 API Endpoints

Base URL: `http://localhost:8000/api`

### 🔓 Public (Tanpa Autentikasi)

| Method | Endpoint        | Deskripsi                   |
| ------ | --------------- | --------------------------- |
| `POST` | `/api/register` | Registrasi user baru        |
| `POST` | `/api/login`    | Login dan mendapatkan token |

### 🔒 Protected (Wajib Header `Authorization: Bearer {token}`)

#### User

| Method | Endpoint      | Deskripsi                               |
| ------ | ------------- | --------------------------------------- |
| `GET`  | `/api/user`   | Mendapatkan data user yang sedang login |
| `POST` | `/api/logout` | Logout (menghapus token)                |

#### Goals (Target Tabungan)

| Method   | Endpoint          | Deskripsi          |
| -------- | ----------------- | ------------------ |
| `GET`    | `/api/goals`      | Daftar semua goals |
| `POST`   | `/api/goals`      | Buat goal baru     |
| `GET`    | `/api/goals/{id}` | Detail goal        |
| `PUT`    | `/api/goals/{id}` | Update goal        |
| `DELETE` | `/api/goals/{id}` | Hapus goal         |

#### Goal Savings (Setoran Tabungan)

| Method   | Endpoint                    | Deskripsi              |
| -------- | --------------------------- | ---------------------- |
| `GET`    | `/api/savings/{id}`         | Detail saving          |
| `POST`   | `/api/goals/{goal}/savings` | Tambah setoran ke goal |
| `PUT`    | `/api/savings/{id}`         | Update setoran         |
| `DELETE` | `/api/savings/{id}`         | Hapus setoran          |

#### Transactions (Transaksi)

| Method | Endpoint            | Deskripsi            |
| ------ | ------------------- | -------------------- |
| `GET`  | `/api/transactions` | Daftar transaksi     |
| `POST` | `/api/transactions` | Catat transaksi baru |

#### Bills (Tagihan)

| Method  | Endpoint                 | Deskripsi           |
| ------- | ------------------------ | ------------------- |
| `GET`   | `/api/bills`             | Daftar tagihan      |
| `POST`  | `/api/bills`             | Buat tagihan baru   |
| `PATCH` | `/api/bills/{id}/status` | Update status bayar |

#### Notifications (Notifikasi)

| Method  | Endpoint                       | Deskripsi           |
| ------- | ------------------------------ | ------------------- |
| `GET`   | `/api/notifications`           | Daftar notifikasi   |
| `POST`  | `/api/notifications`           | Buat notifikasi     |
| `PATCH` | `/api/notifications/{id}/read` | Tandai sudah dibaca |

### Contoh Request (cURL)

**Register:**

```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Akses Endpoint Protected:**

```bash
curl -X GET http://localhost:8000/api/goals \
  -H "Authorization: Bearer {your_token_here}" \
  -H "Accept: application/json"
```

---

## 👤 Akun Test / Seeder

Setelah menjalankan `php artisan db:seed`, akun berikut akan tersedia:

| Field        | Value              |
| ------------ | ------------------ |
| **Name**     | Test User          |
| **Email**    | `test@example.com` |
| **Password** | `password`         |

---

## 🖥 Frontend

Frontend terletak di folder `frontend/` (di luar folder backend) dan dibangun menggunakan:

- **React 19** + **Vite 7**
- **TailwindCSS 4**
- **React Router DOM 7**
- **Axios** (HTTP client untuk komunikasi ke API)
- **Framer Motion** (animasi)

### Cara Menjalankan Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend akan berjalan di: **http://localhost:5173** (default Vite)

> **⚠ Catatan:** Pastikan backend API sudah berjalan di `http://localhost:8000` sebelum menjalankan frontend.

---

## ❓ Troubleshooting

### ❌ Error: `SQLSTATE[HY000] [1049] Unknown database`

**Solusi:** Pastikan database `capstone_project` sudah dibuat di phpMyAdmin atau MySQL.

### ❌ Error: `No application encryption key has been specified`

**Solusi:** Jalankan `php artisan key:generate`

### ❌ Error: `Class "..." not found`

**Solusi:** Jalankan `composer dump-autoload`

### ❌ Error: `XAMPP MySQL tidak mau start`

**Solusi:** Pastikan port 3306 tidak digunakan oleh proses lain. Cek di XAMPP Config atau ubah port.

### ❌ Error: `php artisan serve` tidak berjalan

**Solusi:** Pastikan PHP sudah terdaftar di PATH environment variable. Jika menggunakan XAMPP, tambahkan `C:\xampp\php` ke System PATH.

### ❌ Token tidak valid / 401 Unauthorized

**Solusi:** Pastikan mengirimkan header `Authorization: Bearer {token}` dan `Accept: application/json` di setiap request ke endpoint yang dilindungi.

---

## 📝 Ringkasan Langkah Cepat (Quick Start)

```bash
# 1. Clone repo
git clone https://github.com/<username>/PS003-CapstoneProject.git
cd PS003-CapstoneProject/backend

# 2. Install dependensi
composer install

# 3. Setup environment
cp .env.example .env        # (Windows: copy .env.example .env)
php artisan key:generate

# 4. Konfigurasi database di .env (sesuaikan DB_DATABASE, DB_USERNAME, dll)

# 5. Buat database "capstone_project" di phpMyAdmin

# 6. Jalankan migrasi & seeder
php artisan migrate
php artisan db:seed

# 7. Jalankan server
php artisan serve

# Server berjalan di → http://localhost:8000
```

---
