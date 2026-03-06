-- ================================================
-- CUSTPORT - Portfolio Database Schema
-- Jalankan SQL ini di Supabase SQL Editor
-- ================================================

-- 1. PROFILE (Data utama profil pemilik portfolio)
CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT,
    introduction TEXT,
    address TEXT,
    cv_url TEXT,
    profile_image_url TEXT,
    web_name TEXT DEFAULT 'My Portfolio',
    web_icon TEXT DEFAULT '💼',
    footer_year TEXT DEFAULT '2026',
    footer_text TEXT DEFAULT 'All rights reserved.',
    theme TEXT DEFAULT 'purple-phantom'
    -- Nilai theme yang valid:
    -- 'purple-phantom'  → 🟣 Gelap, ungu misterius
    -- 'nature-breeze'   → 🌿 Terang, hijau earthy
    -- 'rose-petal'      → 🌸 Terang, pink lembut
    -- 'ocean-steel'     → 🌊 Gelap, biru-teal profesional
    -- 'neon-crypto'     → ⚡ Hitam + hijau neon
);

-- 2. EDUCATION (Riwayat pendidikan)
CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE
);

-- 3. SKILLSET (Daftar keahlian)
CREATE TABLE IF NOT EXISTS skillset (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    icon_class TEXT,          -- Kelas ikon (Font Awesome / Devicon), contoh: 'devicon-javascript-plain'
    icon_svg TEXT,            -- SVG ikon kustom (opsional, alternatif dari icon_class)
    description TEXT          -- Deskripsi keahlian (muncul saat hover)
);

-- 4. WORK EXPERIENCE (Pengalaman kerja)
CREATE TABLE IF NOT EXISTS work_experience (
    id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE             -- NULL = masih bekerja (tampil 'Present')
);

-- 5. INTERNSHIP (Pengalaman magang)
CREATE TABLE IF NOT EXISTS internship (
    id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE
);

-- 6. PROJECTS (Proyek portfolio)
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    url TEXT,                  -- Link ke proyek
    preview_gif_url TEXT       -- URL GIF preview (opsional)
);

-- 7. CERTIFICATES (Sertifikat)
CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    issuer TEXT NOT NULL,
    url TEXT                   -- Link ke sertifikat
);

-- 8. SOCIAL LINKS (Link media sosial)
CREATE TABLE IF NOT EXISTS social_links (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,        -- Contoh: 'GitHub', 'LinkedIn', 'Email'
    url TEXT NOT NULL,         -- URL atau alamat email
    icon_class TEXT NOT NULL,  -- Kelas ikon Font Awesome, contoh: 'fa-brands fa-github'
    email_subject TEXT,        -- Khusus untuk Email: subject otomatis
    email_body TEXT            -- Khusus untuk Email: body otomatis
);

-- ================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- Semua tabel bisa dibaca publik (portfolio = public)
-- ================================================

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skillset ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE internship ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa SELECT (baca)
CREATE POLICY "Public read access" ON profile FOR SELECT USING (true);
CREATE POLICY "Public read access" ON education FOR SELECT USING (true);
CREATE POLICY "Public read access" ON skillset FOR SELECT USING (true);
CREATE POLICY "Public read access" ON work_experience FOR SELECT USING (true);
CREATE POLICY "Public read access" ON internship FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public read access" ON social_links FOR SELECT USING (true);

-- ================================================
-- CONTOH DATA (Hapus atau ganti dengan data Anda)
-- ================================================

INSERT INTO profile (name, position, introduction, address, web_name, web_icon, footer_year, footer_text, theme)
VALUES (
    'John Doe',
    'Full Stack Developer',
    'Passionate developer creating beautiful web experiences.',
    'Jakarta, Indonesia',
    'John Portfolio',
    '🚀',
    '2026',
    'Built with ❤️',
    'purple-phantom'
);

INSERT INTO social_links (name, url, icon_class) VALUES
    ('GitHub', 'https://github.com/johndoe', 'fa-brands fa-github'),
    ('LinkedIn', 'https://linkedin.com/in/johndoe', 'fa-brands fa-linkedin');

INSERT INTO skillset (name, icon_class, description) VALUES
    ('JavaScript', 'devicon-javascript-plain', 'Modern ES6+ JavaScript development'),
    ('Node.js', 'devicon-nodejs-plain', 'Backend development with Express');
