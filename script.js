// --- 初期設定 ---
const bgm = document.getElementById('bgm');
const audioToggle = document.getElementById('audioToggle');
const audioIcon = audioToggle.querySelector('i');
const loadingFill = document.querySelector('.loading-fill');
const loadingPercentage = document.querySelector('.loading-percentage');

// --- 1. ローディング演出 ---
let progress = 0;
const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 2;
    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => document.getElementById('loading-screen').classList.add('loading-hidden'), 500);
    }
    loadingFill.style.width = progress + '%';
    loadingPercentage.textContent = progress + '%';
}, 50);

// --- 2. Gmail送信機能 ---
document.getElementById('mail-btn').addEventListener('click', () => {
    const email = "72meginfo@gmail.com";
    const subject = encodeURIComponent("プロフィールからの連絡");
    const body = encodeURIComponent("なつめぐさんへ\n\n");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
});

// --- 3. マトリックス背景 ---
function createMatrix() {
    const container = document.querySelector('.matrix-rain');
    const chars = "Natsumegu / kojiking";
    for(let i=0; i<50; i++) {
        const span = document.createElement('span');
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDelay = Math.random() * 5 + 's';
        span.style.position = 'absolute';
        span.style.top = '-20px';
        span.style.color = '#8b5cf6';
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
        container.appendChild(span);
        animateDrop(span);
    }
}
function animateDrop(el) {
    let top = -20;
    setInterval(() => {
        top += 2;
        if (top > window.innerHeight) top = -20;
        el.style.top = top + 'px';
    }, Math.random() * 30 + 20);
}
createMatrix();

// --- 4. BGM制御 & ビジュアル連動 ---
function playBGM() {
    bgm.muted = false;
    bgm.play().then(() => {
        document.body.classList.add('is-playing');
        updateAudioIcon(false);
    }).catch(err => console.log("Waiting for user interaction..."));
}

function pauseBGM() {
    bgm.pause();
    document.body.classList.remove('is-playing');
    updateAudioIcon(true);
}

// 画面の初回クリックで再生
document.addEventListener('click', () => {
    if (bgm.paused) playBGM();
}, { once: true });

// ボタンクリックでの切り替え
audioToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgm.paused) playBGM(); else pauseBGM();
});

function updateAudioIcon(isMuted) {
    audioIcon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
}

// --- 5. カスタムカーソル ---
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
document.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    outline.style.left = e.clientX + 'px';
    outline.style.top = e.clientY + 'px';
});

// --- 6. タイピング演出 ---
const typingEl = document.querySelector('.typing-text');
const phrases = ["こんにちは、なつめぐです。", "動画投稿してます！", "個人の乞食です。"];
let pIdx = 0, charIdx = 0, isEnd = false;

function typeEffect() {
    const current = phrases[pIdx];
    typingEl.textContent = current.substring(0, charIdx);
    if (!isEnd) charIdx++; else charIdx--;

    if (charIdx > current.length) { isEnd = true; setTimeout(typeEffect, 2000); return; }
    if (charIdx < 0) { isEnd = false; pIdx = (pIdx + 1) % phrases.length; charIdx = 0; }
    setTimeout(typeEffect, isEnd ? 50 : 100);
}
typeEffect();

// --- 7. 3Dチルト効果 (プロフィール枠) ---
// まとめて囲ったコンテナ(profile-container)に適用
const profileBox = document.querySelector('.profile-container');
if (profileBox) {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;
        profileBox.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
}