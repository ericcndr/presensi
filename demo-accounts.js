// demo-accounts.js
// Menambahkan akun demo ke localStorage untuk aplikasi Absensi SMKN1MEJAYAN.
// Cara pakai:
// 1) Letakkan file ini di repo / hosting Anda (satu level dengan app.js).
// 2) Sertakan sebelum app.js di index.html:
//    <script src="demo-accounts.js"></script>
//    <script src="app.js"></script>
// 3) Saat file dimuat, jika tidak ada data 'students' di localStorage,
//    file ini akan otomatis menambahkan akun demo.
// 4) Untuk memaksa overwrite (mengganti akun yang ada), panggil di konsol:
//    seedDemoAccounts(true)

(function () {
  const DEMO_KEY = 'students';
  const demoAccounts = [
    { name: 'Siti Aisyah', nis: '12001', pass: '1234', faceDescriptor: null },
    { name: 'Rudianto',   nis: '12002', pass: '1234', faceDescriptor: null },
    { name: 'Nur Fajar',  nis: '12003', pass: '1234', faceDescriptor: null }
  ];

  function seedDemoAccounts(force = false) {
    try {
      const existing = localStorage.getItem(DEMO_KEY);
      if (existing && !force) {
        console.log('Demo accounts already present in localStorage. Use seedDemoAccounts(true) to overwrite.');
        return { status: 'skipped', message: 'existing', accounts: JSON.parse(existing) };
      }
      localStorage.setItem(DEMO_KEY, JSON.stringify(demoAccounts));
      console.log('Demo accounts written to localStorage under key:', DEMO_KEY);
      console.table(demoAccounts.map(a => ({ name: a.name, nis: a.nis, pass: a.pass })));
      return { status: 'ok', accounts: demoAccounts };
    } catch (err) {
      console.error('Gagal menulis demo accounts:', err);
      return { status: 'error', error: String(err) };
    }
  }

  // Expose to global so developer/user dapat memanggil dari console
  window.seedDemoAccounts = seedDemoAccounts;

  // Auto-run if no students yet
  (function autoSeedIfEmpty() {
    try {
      const existing = localStorage.getItem(DEMO_KEY);
      if (!existing) {
        const res = seedDemoAccounts(false);
        if (res.status === 'ok') {
          // Inform user (non-intrusive)
          const message = [
            'Akun demo telah dibuat:',
            ...demoAccounts.map(a => `• ${a.name} — NIS ${a.nis} — pwd ${a.pass}`)
          ].join('\n');
          // small delay to avoid blocking page load
          setTimeout(() => {
            // alert may be intrusive on mobile; use console + small in-page notice if available
            console.info(message);
            // Try to show a temporary non-blocking on-screen toast if a container exists
            try {
              if (typeof createDemoNotice === 'function') {
                createDemoNotice(message);
              } else if (document && document.body) {
                const div = document.createElement('div');
                div.style.position = 'fixed';
                div.style.right = '16px';
                div.style.bottom = '16px';
                div.style.zIndex = 99999;
                div.style.maxWidth = '320px';
                div.style.background = 'linear-gradient(90deg,#60a5fa,#7c3aed)';
                div.style.color = '#012';
                div.style.padding = '12px';
                div.style.borderRadius = '10px';
                div.style.boxShadow = '0 6px 18px rgba(0,0,0,0.3)';
                div.style.fontSize = '13px';
                div.style.fontFamily = 'sans-serif';
                div.innerText = 'Akun demo dibuat. Buka console untuk daftar (NIS / password).';
                document.body.appendChild(div);
                setTimeout(() => div.remove(), 8000);
              }
            } catch (e) {
              /* ignore */
            }
          }, 600);
        }
      } else {
        console.log('Demo accounts present already. Use seedDemoAccounts(true) to overwrite.');
      }
    } catch (e) {
      console.error('Auto-seed error', e);
    }
  })();
})();