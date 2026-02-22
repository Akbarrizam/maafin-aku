document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // BYPASS IDM: Panggil Audio Lewat JavaScript
    // ==========================================
    const welcomeScreen = document.getElementById('welcome-screen');
    const openMsgBtn = document.getElementById('open-msg-btn');
    
    // Pastikan file 'nuca.mp3' ada di folder yang sama
    const bgMusic = new Audio('nuca.mp3'); 
    bgMusic.loop = true;

    openMsgBtn.addEventListener('click', () => {
        // Mainkan musik saat tombol "Buka Pesan" diklik
        bgMusic.play().catch(error => {
            console.log("Autoplay dicegah", error);
        });
        // Hilangkan layar sampul
        welcomeScreen.classList.add('fade-out');
    });
    // ==========================================

    // 1. TANGGAL REAL-TIME
    const dateDisplay = document.getElementById('realtime-date');
    if (dateDisplay) {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.innerText = today.toLocaleDateString('id-ID', options);
    }

    // 2. LOGIKA TOMBOL KABUR
    const btnNo = document.getElementById('btn-no');
    
    const moveButton = (e) => {
        if (e.type === 'touchstart') e.preventDefault(); 
        
        const maxWidth = window.innerWidth - btnNo.offsetWidth - 20;
        const maxHeight = window.innerHeight - btnNo.offsetHeight - 20;

        const randomX = Math.floor(Math.random() * maxWidth);
        const randomY = Math.floor(Math.random() * maxHeight);

        btnNo.style.position = 'fixed';
        btnNo.style.left = randomX + 'px';
        btnNo.style.top = randomY + 'px';
    };

    btnNo.addEventListener('mouseover', moveButton);
    btnNo.addEventListener('touchstart', moveButton, { passive: false });

    // 3. LOGIKA TOMBOL "IYA"
    const btnYes = document.getElementById('btn-yes');
    const questionText = document.getElementById('final-question');
    const btnOptionsDiv = document.getElementById('btn-options');
    const mainGif = document.getElementById('main-gif');
    const finalCard = document.getElementById('final-action-card');

    btnYes.addEventListener('click', () => {
        questionText.innerHTML = "Yeayyy! Makasih sayanggg! 🥰<br><span style='font-size:0.95rem; color:#636E72; font-weight:400; display:block; margin-top:15px;'>Sekarang angkat telpon Wahyu lagi ya, kita lanjut ngobrol! Virtual hug! 🫂💖</span>";
        
        btnOptionsDiv.style.display = 'none';
        // Animasi peluk Giphy
        mainGif.src = "https://media.giphy.com/media/3oEdv4hwWTzBhWvaU0/giphy.gif";
        
        finalCard.style.transform = "scale(1.05)";

        startHeartRain();

        // ==========================================
        // FITUR BARU: REDIRECT KE WHATSAPP OTOMATIS
        // ==========================================
        
        // 1. MASUKKAN NOMOR WA KAMU DI SINI (Ganti 0 dengan 62)
        // Contoh: Jika nomor kamu 08123456789, tulis 628123456789
        const nomorWA = "6281336311425"; 
        
        // 2. PESAN YANG AKAN OTOMATIS TERKETIK DI HP MARINA
        const pesan = "Iya sayang, aku udah maafin kok. Jangan diulangin lagi ya telponnya ke-end tiba-tiba";
        
        // Buat link API WhatsApp
        const linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

        // Redirect otomatis setelah 3 detik (3000 milidetik)
        setTimeout(() => {
            window.location.href = linkWA;
        }, 3000);
        // ==========================================
    });

    function startHeartRain() {
        const heartInterval = setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '💖';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
            
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, 200);

        setTimeout(() => clearInterval(heartInterval), 10000);
    }
});