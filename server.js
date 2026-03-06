// Import library
require('dotenv').config();
const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Inisialisasi Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Inisialisasi Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Middleware untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint untuk mengambil semua data portfolio
app.get('/api/portfolio-data', async (req, res) => {
  try {
    const results = await Promise.all([
      supabase.from('profile').select('*').single(),
      supabase.from('education').select('*').order('start_date', { ascending: false }),
      supabase.from('skillset').select('*'),
      supabase.from('work_experience').select('*').order('start_date', { ascending: false }),
      supabase.from('internship').select('*').order('start_date', { ascending: false }),
      supabase.from('projects').select('*'),
      supabase.from('certificates').select('*'),
      supabase.from('social_links').select('*').order('id')
    ]);

    const [profile, education, skillset, work_experience, internship, projects, certificates, social_links] = results;

    // Log any errors for debugging
    const names = ['profile', 'education', 'skillset', 'work_experience', 'internship', 'projects', 'certificates', 'social_links'];
    results.forEach((r, i) => {
      if (r.error) console.error(`Error fetching ${names[i]}:`, r.error.message);
    });

    res.json({
      profile: profile.data,
      education: education.data,
      skillset: skillset.data,
      work_experience: work_experience.data,
      internship: internship.data,
      projects: projects.data,
      certificates: certificates.data,
      social_links: social_links.data
    });

  } catch (error) {
    console.error('Error fetching data from Supabase:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio data.' });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the Express API for Vercel
module.exports = app;
