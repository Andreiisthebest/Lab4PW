const fallbackPriceData = {
  hifu: { en: 'HIFU', ro: 'HIFU', cover: '/images/HIFO.jpg', photos: ['/images/1.jpeg', '/images/2.jpeg'] },
  femei: { en: 'For Women', ro: 'Pentru Femei', cover: '/images/for_women.jpg', photos: ['/images/3.jpeg', '/images/4.jpeg'] }
};

const priceData = window.__PRICE_DATA__ || fallbackPriceData;

let currentLang = 'en';

window.setLang = function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
  });

  document.querySelectorAll('[data-en]').forEach((el) => {
    const v = el.getAttribute(`data-${lang}`);
    if (v) {
      el.innerHTML = v;
    }
  });

  document.querySelectorAll('[data-en-placeholder]').forEach((el) => {
    const v = el.getAttribute(`data-${lang}-placeholder`);
    if (v) {
      el.placeholder = v;
    }
  });
};

window.toggleMobileNav = function toggleMobileNav() {
  document.body.classList.toggle('mobile-nav-open');
  const closeItem = document.querySelector('.mobile-close-nav');
  if (closeItem) {
    closeItem.classList.toggle('hidden', !document.body.classList.contains('mobile-nav-open'));
  }
};

window.openPricePanel = function openPricePanel(key) {
  const data = priceData[key];
  if (!data) return;
  const panel = document.getElementById('price-panel');
  const backdrop = document.getElementById('price-backdrop');
  const title = document.getElementById('pp-title');
  const cover = document.getElementById('pp-cover');
  const photos = document.getElementById('pp-photos');
  if (!panel || !backdrop || !title || !cover || !photos) return;

  title.textContent = data[currentLang] || data.en;
  cover.src = data.cover;
  photos.innerHTML = data.photos
    .map((src) => `<img src="${src}" alt="Price list" onclick="openPriceZoom('${src}')" class="w-full rounded-[10px] block shadow-[0_2px_12px_rgba(0,0,0,0.08)] cursor-zoom-in" />`)
    .join('');

  panel.classList.add('open');
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closePricePanel = function closePricePanel() {
  const panel = document.getElementById('price-panel');
  const backdrop = document.getElementById('price-backdrop');
  if (panel) panel.classList.remove('open');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
};

window.openPriceZoom = function openPriceZoom(src) {
  const img = document.getElementById('price-zoom-img');
  const zoom = document.getElementById('price-zoom');
  if (img) img.src = src;
  if (zoom) zoom.classList.add('active');
};

window.closePriceZoom = function closePriceZoom() {
  const img = document.getElementById('price-zoom-img');
  const zoom = document.getElementById('price-zoom');
  if (img) img.src = '';
  if (zoom) zoom.classList.remove('active');
};

window.openVideoLightbox = function openVideoLightbox(src) {
  const modal = document.getElementById('video-lightbox');
  const video = document.getElementById('lightbox-video');
  if (!modal || !video) return;
  video.src = src;
  video.load();
  video.play();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeVideoLightbox = function closeVideoLightbox() {
  const modal = document.getElementById('video-lightbox');
  const video = document.getElementById('lightbox-video');
  if (video) {
    video.pause();
    video.src = '';
  }
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.closeVideoLightboxOnBg = function closeVideoLightboxOnBg(event) {
  if (event.target && event.target.id === 'video-lightbox') {
    window.closeVideoLightbox();
  }
};

setTimeout(() => {
  const mascot = document.getElementById('mascot');
  if (mascot) mascot.classList.add('mascot-visible');
}, 3000);


// ── PHOTO LIGHTBOX ─────────────────────────────────────────────
const galleries = {
    hifu:    ['/images/1.jpeg', '/images/2.jpeg'],
    femei:   ['/images/3.jpeg', '/images/4.jpeg'],
    ems:     ['/images/5.jpeg'],
    barbati: ['/images/6.jpeg', '/images/7.jpeg']
};

let currentGallery = [];
let currentIndex   = 0;

window.openLightbox = function openLightbox(category, index) {
    currentGallery = galleries[category];
    currentIndex   = index;
    window.updateLightbox();
    const lightbox = document.getElementById('lightbox');
    if(lightbox) lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeLightbox = function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if(lightbox) lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

window.closeLightboxOnBg = function closeLightboxOnBg(e) {
    if (e.target === document.getElementById('lightbox')) window.closeLightbox();
}

window.lightboxNav = function lightboxNav(dir) {
    currentIndex = (currentIndex + dir + currentGallery.length) % currentGallery.length;
    window.updateLightbox();
}

window.updateLightbox = function updateLightbox() {
    const imgId = document.getElementById('lightbox-img');
    const countId = document.getElementById('lightbox-counter');
    if(imgId) imgId.src = currentGallery[currentIndex];
    if(countId) countId.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
    
    const arrows = document.querySelectorAll('.lightbox-arrow');
    arrows.forEach(a => { a.style.display = currentGallery.length > 1 ? 'flex' : 'none'; });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const pz = document.getElementById('price-zoom');
        if (pz && pz.classList.contains('active')) { window.closePriceZoom(); return; }
        const pp = document.getElementById('price-panel');
        if (pp && pp.classList.contains('open')) { window.closePricePanel(); return; }
        const vl = document.getElementById('video-lightbox');
        if (vl && vl.classList.contains('active')) { window.closeVideoLightbox(); return; }
        window.closeLightbox();
        return;
    }
    const vl2 = document.getElementById('video-lightbox');
    if (vl2 && vl2.classList.contains('active')) return;
    const lb = document.getElementById('lightbox');
    if (lb && !lb.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') window.lightboxNav(1);
    if (e.key === 'ArrowLeft')  window.lightboxNav(-1);
});

// ── MASCOT ─────────────────────────────────────────────
const mascotMessages = [
    { en: { title: "Hi, I\'m Stella! ✨",   body: "Welcome to SVET MEDICAL &mdash; where beauty meets science." },
      ro: { title: "Bună, sunt Stella! ✨", body: "Bine ai venit la SVET MEDICAL &mdash; unde frumusețea întâlnește știința." } },
    { en: { title: "Ready to glow? 💫",    body: "Book an appointment today and treat yourself to something special." },
      ro: { title: "Pregătit să strălucești? 💫", body: "Fă o programare azi și răsfață-te cu ceva special." } },
    { en: { title: "Did you know? 🌿",     body: "Our medical-grade treatments are carried out by certified specialists." },
      ro: { title: "Știai că? 🌿",          body: "Tratamentele noastre medicale sunt efectuate de specialiști certificați." } },
    { en: { title: "Special offer! 🎁",    body: "Book online and receive a free skin consultation on your first visit." },
      ro: { title: "Ofertă specială! 🎁",   body: "Programează-te online și primești o consultație gratuită la prima vizită." } },
    { en: { title: "We miss you! 💛",      body: "Haven\'t visited yet? Come meet the SVET MEDICAL team &mdash; you\'ll love it." },
      ro: { title: "Ne-ai lipsit! 💛",      body: "Nu ai vizitat încă? Vino să cunoști echipa SVET MEDICAL &mdash; o să îți placă." } },
    { en: { title: "Looking radiant! ✨",  body: "From HIFU to EMS Shape, we have a treatment perfectly tailored for you." },
      ro: { title: "Arăți radiant! ✨",     body: "De la HIFU la EMS Shape, avem un tratament creat special pentru tine." } },
];
let mascotMsgIndex = 0;

setTimeout(() => {
    const mascot = document.getElementById('mascot');
    const bubble = document.getElementById('mascot-bubble');
    if (!mascot || !bubble) return;

    mascot.addEventListener('mouseenter', function() {
        const entry = mascotMessages[mascotMsgIndex % mascotMessages.length];
        const msg = entry[currentLang] || entry['en'];
        bubble.innerHTML = '<strong>' + msg.title + '</strong> ' + msg.body;
        mascotMsgIndex++;
    });
}, 0);
