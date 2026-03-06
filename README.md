# CustPort — Customizable Portfolio

Web portfolio yang fully customizable dengan **5 pilihan tema warna**, terintegrasi dengan **Supabase** sebagai backend database.

Owner mengatur semua konten dan tema melalui Supabase Dashboard — pengunjung hanya melihat hasil akhirnya.

## 🎨 Tema Tersedia

| Nilai di Database | Preview |
|---|---|
| `purple-phantom` | 🟣 Gelap, ungu misterius |
| `nature-breeze` | 🌿 Terang, hijau earthy |
| `rose-petal` | 🌸 Terang, pink lembut |
| `ocean-steel` | 🌊 Gelap, biru-teal profesional |
| `neon-crypto` | ⚡ Hitam + hijau neon |

## 🚀 Quick Start

### 1. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com)
2. Buka **SQL Editor**
3. Copy-paste isi file [`schema.sql`](schema.sql) dan jalankan
4. Isi data portfolio Anda di masing-masing tabel melalui **Table Editor**

### 2. Konfigurasi Lokal

```bash
git clone <repo-url>
cd custport
npm install
```

Buat file `.env`:

```env
PORT=3000
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
```

> Dapatkan URL dan Anon Key dari **Supabase Dashboard → Settings → API**

### 3. Jalankan

```bash
npm run dev
```

Buka `http://localhost:3000`

## 🚀 Deploy ke Vercel

Aplikasi ini sudah dikonfigurasi (`vercel.json`) agar siap di-deploy secara gratis di [Vercel](https://vercel.com):

1. Push kode Anda ke GitHub/GitLab.
2. Login ke Vercel dan buat project baru dari repository tersebut.
3. Di bagian **Environment Variables** sebelum deploy, tambahkan:
   - `SUPABASE_URL` = (isi URL Anda)
   - `SUPABASE_ANON_KEY` = (isi Anon Key Anda)
4. Klik **Deploy**. Vercel otomatis mengarahkan frontend statis dan backend `/api`.

*Catatan: Port atau script start khusus tidak diperlukan karena Vercel mengenali file `server.js` sebagai serverless function.*

## 📁 Struktur File

```
custport/
├── server.js          # Express server + Supabase API
├── package.json
├── schema.sql         # SQL schema untuk Supabase
├── .env               # Credentials (jangan commit!)
├── .gitignore
└── public/
    ├── index.html     # Halaman portfolio
    ├── style.css      # 5 tema warna via CSS variables
    └── script.js      # Render data + apply tema
```

## 🗄️ Tabel Supabase

| Tabel | Fungsi |
|-------|--------|
| `profile` | Nama, posisi, intro, alamat, CV, **tema** |
| `education` | Riwayat pendidikan |
| `skillset` | Daftar keahlian + ikon |
| `work_experience` | Pengalaman kerja |
| `internship` | Pengalaman magang |
| `projects` | Proyek portfolio |
| `certificates` | Sertifikat |
| `social_links` | Link sosial media |

## 🎯 Cara Ganti Tema

1. Buka **Supabase Dashboard** → tabel **`profile`**
2. Edit kolom **`theme`** dengan salah satu nilai: `purple-phantom`, `nature-breeze`, `rose-petal`, `ocean-steel`, atau `neon-crypto`
3. Refresh web → tema langsung berubah

## 📌 Fitur

- ✅ 5 tema warna premium
- ✅ Tema dikontrol owner via database
- ✅ Aurora gradient background effect
- ✅ Glassmorphism card design
- ✅ Scroll reveal animations
- ✅ Responsive (mobile-friendly)
- ✅ Quick navigation (up/down)
- ✅ Skill hover tooltip
- ✅ Project GIF preview
- ✅ CV download button
- ✅ Gmail compose link untuk email
# custport
