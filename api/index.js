const express = require('express');
const connectDB = require('../DB/db');
const User = require('../DB/user');

const app = express();
app.use(express.json());

// Cek status API
app.get('/api/hello', (req, res) => {
  res.json({ message: "API MongoDB Berjalan!" });
});

// Endpoint untuk daftar/simpan email ke database
app.post('/api/login', async (req, res) => {
  try {
    await connectDB();
    const { email } = req.body;

    if (!email) {
      return.status(400).json({ error: "Email wajib diisi!" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return.json({ message: "Data sudah ada di database (aman tidak hilang).", user });
    }

    user = new User({ email });
    await user.save();
    
    res.status(201).json({ message: "Email berhasil disimpan secara permanen!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
