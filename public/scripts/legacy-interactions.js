const priceData = {
  hifu: { en: 'HIFU', ro: 'HIFU', cover: '/images/HIFO.jpg', photos: ['/images/1.jpeg', '/images/2.jpeg'] },
  femei: { en: 'For Women', ro: 'Pentru Femei', cover: '/images/for_women.jpg', photos: ['/images/3.jpeg', '/images/4.jpeg'] }
};

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
