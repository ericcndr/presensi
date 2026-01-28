# Absensi SMKN1MEJAYAN — Prototype Web (Face ID + Lokasi + SVG Map)
Perubahan & fitur utama
- Login NIS/password sebelum absensi; contoh akun siswa otomatis di-seed saat pertama kali membuka aplikasi (3 akun demo).
- Enroll wajah per-akun (disimpan di localStorage).
- Absensi: verifikasi wajah + geolocation — disimpan lokal.
- Peta SVG interaktif:
  - Titik sekolah (merah) di pusat (koordinat: -7.62786, 111.70006).
  - Lingkaran biru = radius jangkauan (default 200 m, dapat diubah dengan slider).
  - Marker lokasi Anda (biru) muncul bila GPS diizinkan.
  - Menampilkan koordinat lengkap & jarak ke sekolah.
- Jam real-time berjalan.

Catatan penting
- Butuh HTTPS agar akses kamera & lokasi bekerja (GitHub Pages, Netlify, Vercel).
- Ini prototype: biometrik (face descriptors) dan akun tersimpan di localStorage. Untuk penggunaan sekolah, buat backend terpusat, enkripsi, dan kebijakan privasi/izin.
- Face recognition berbasis face-api.js (client-side). Akurasi tergantung kamera & pencahayaan.

Cara pakai cepat
1. Deploy file `index.html`, `styles.css`, `app.js` ke hosting HTTPS.
2. Buka halaman:
   - Jika pertama kali, tiga akun demo sudah tersedia:
     - NIS 12001 / password 1234 (Siti Aisyah)
     - NIS 12002 / password 1234 (Rudianto)
     - NIS 12003 / password 1234 (Nur Fajar)
   - Masuk (Login) menggunakan salah satu NIS di atas.
   - Tekan "Simpan Wajah (Enroll)" untuk rekam face descriptor (izin kamera diperlukan).
   - Tekan "Cek & Absensi" untuk verifikasi dan merekam absensi. Izinkan lokasi bila diminta untuk menampilkan posisi Anda di peta.
   - Atur radius jangkauan dengan slider jika ingin menguji "di dalam area" / "di luar area".

Opsi lanjutan yang bisa saya bantu
- Menambahkan backend contoh (Node.js + Express + SQLite) untuk menyimpan akun & absensi terpusat.
- Menyimpan foto snapshot saat absen (dengan persetujuan) untuk audit.
- Menambahkan verifikasi geofence yang memblokir absensi bila di luar area sekolah.
- Menyiapkan deployment otomatis ke GitHub Pages / Netlify.
