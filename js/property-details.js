/**
 * صَرح مصر - منطق صفحة تفاصيل العقار
 * Single Property Details & Gallery Engine
 */

let currentApt = null;
let currentImageIdx = 0;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id') || 'APT-101';
  
  loadProperty(id);
});

function loadProperty(id) {
  if (!window.DataStore) return;
  const apt = window.DataStore.getPropertyById(id);
  if (!apt) {
    // If not found, fallback to first available
    const list = window.DataStore.getProperties();
    if (list.length > 0) {
      loadProperty(list[0].id);
    }
    return;
  }

  currentApt = apt;
  currentImageIdx = 0;

  // Set document title
  document.title = `${apt.title} | صَرح مصر`;

  // Basic Details
  setText('pd-title', apt.title);
  setText('pd-price', window.DataStore.formatEgp(apt.price, apt.type));
  setText('pd-location', apt.fullAddress || apt.location);
  setText('pd-area', `${apt.area} م²`);
  setText('pd-beds', `${apt.bedrooms} غرف نوم`);
  setText('pd-baths', `${apt.bathrooms} حمامات`);
  setText('pd-floor', apt.floor);
  setText('pd-finishing', apt.finishing);
  setText('pd-payment', apt.payment);
  setText('pd-year', apt.year);
  setText('pd-desc', apt.description);
  setText('pd-code', apt.id);

  // Status Badge
  const statusBadge = document.getElementById('pd-status-badge');
  if (statusBadge) {
    statusBadge.innerText = apt.type;
    statusBadge.className = apt.type === 'للبيع'
      ? 'px-3.5 py-1.5 rounded-full text-xs font-black bg-brand-900 text-gold-400 border border-gold-500/30'
      : 'px-3.5 py-1.5 rounded-full text-xs font-black bg-blue-900 text-blue-200 border border-blue-400/30';
  }

  // Setup Gallery
  setupGallery(apt.images);

  // Setup Amenities
  setupAmenities(apt.amenities || [
    "أمن وحراسة 24/7", "مصعد مستورد", "موقف سيارات خاص (جراج)", "تكييف وتأسيس سبليت", "شرفة وبلكونة واسعة", "عداد كهرباء وغاز رسمي"
  ]);

  // Setup Advertiser Info & Links
  if (apt.advertiser) {
    setText('pd-adv-name', apt.advertiser.name);
    setText('pd-adv-role', apt.advertiser.role);
    const avatar = document.getElementById('pd-adv-avatar');
    if (avatar) avatar.src = apt.advertiser.avatar;

    const phoneClean = (apt.advertiser.whatsapp || apt.advertiser.phone || '201000000000').replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(`مرحباً ${apt.advertiser.name}، أنا مهتم بعقار كود (${apt.id}) بعنوان "${apt.title}" المعروض بسعر ${window.DataStore.formatEgp(apt.price, apt.type)}. أود الاستفسار عن تفاصيل المعاينة وأنظمة السداد.`);
    
    const waLink = document.getElementById('pd-whatsapp-link');
    if (waLink) waLink.href = `https://wa.me/${phoneClean}?text=${encodedMsg}`;

    const callLink = document.getElementById('pd-call-link');
    if (callLink) callLink.href = `tel:${apt.advertiser.phone}`;

    setText('pd-call-btn-text', `اتصال: ${apt.advertiser.phone}`);
  }

  // Setup Favorite Button State
  updateFavButton();

  // Setup Embedded Quick Mortgage Calculator for this Property
  setupPropertyMortgage(apt.price);

  // Load Similar Properties
  loadSimilarProperties(apt);

  if (window.lucide) lucide.createIcons();
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

function setupGallery(images) {
  if (!images || images.length === 0) return;
  const mainImg = document.getElementById('gallery-main-img');
  const counter = document.getElementById('gallery-counter');
  const thumbs = document.getElementById('gallery-thumbs');

  if (mainImg) mainImg.src = images[0];
  if (counter) counter.innerText = `1 / ${images.length}`;

  if (thumbs) {
    thumbs.innerHTML = images.map((url, i) => `
      <button onclick="changeGalleryImage(${i})" class="gallery-thumb-btn aspect-video rounded-xl overflow-hidden border-2 transition ${i === 0 ? 'border-brand-700 ring-2 ring-brand-700/30 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}">
        <img src="${url}" alt="Thumbnail ${i+1}" class="w-full h-full object-cover">
      </button>
    `).join('');
  }
}

function changeGalleryImage(idx) {
  if (!currentApt || !currentApt.images[idx]) return;
  currentImageIdx = idx;
  const mainImg = document.getElementById('gallery-main-img');
  const counter = document.getElementById('gallery-counter');

  if (mainImg) {
    mainImg.classList.add('opacity-40');
    setTimeout(() => {
      mainImg.src = currentApt.images[idx];
      mainImg.classList.remove('opacity-40');
    }, 120);
  }

  if (counter) {
    counter.innerText = `${idx + 1} / ${currentApt.images.length}`;
  }

  document.querySelectorAll('.gallery-thumb-btn').forEach((btn, i) => {
    if (i === idx) {
      btn.className = 'gallery-thumb-btn aspect-video rounded-xl overflow-hidden border-2 transition border-brand-700 ring-2 ring-brand-700/30 opacity-100';
    } else {
      btn.className = 'gallery-thumb-btn aspect-video rounded-xl overflow-hidden border-2 transition border-transparent opacity-70 hover:opacity-100';
    }
  });
}

function nextGalleryImage() {
  if (!currentApt) return;
  const nextIdx = (currentImageIdx + 1) % currentApt.images.length;
  changeGalleryImage(nextIdx);
}

function prevGalleryImage() {
  if (!currentApt) return;
  const prevIdx = (currentImageIdx - 1 + currentApt.images.length) % currentApt.images.length;
  changeGalleryImage(prevIdx);
}

function setupAmenities(amenities) {
  const container = document.getElementById('pd-amenities-container');
  if (!container) return;

  container.innerHTML = amenities.map(am => `
    <div class="flex items-center gap-2.5 p-3 rounded-2xl border border-slate-100 bg-white shadow-xs text-xs font-semibold text-slate-700">
      <i data-lucide="check-circle" class="w-4 h-4 text-brand-700 shrink-0"></i>
      <span>${am}</span>
    </div>
  `).join('');
}

function togglePropertyFavorite() {
  if (!currentApt) return;
  const res = window.DataStore.toggleFavorite(currentApt.id);
  updateFavoritesBadge();
  updateFavButton();

  if (res.added) {
    showToast("تمت إضافة هذا العقار إلى قائمتك المفضلة", "heart");
  } else {
    showToast("تمت إزالة هذا العقار من المفضلة", "info");
  }
}

function updateFavButton() {
  const btn = document.getElementById('pd-fav-btn');
  if (!btn || !currentApt) return;
  const isFav = window.DataStore.isFavorite(currentApt.id);
  btn.innerHTML = `<i data-lucide="heart" class="w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-slate-600'}"></i>`;
  if (window.lucide) lucide.createIcons({ root: btn });
}

function shareProperty() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    showToast("تم نسخ رابط العقار بنجاح!", "check");
  } else {
    showToast("الرابط متاح في شريط المتصفح للمشاركة", "info");
  }
}

function handleInquiryForm(e) {
  e.preventDefault();
  const name = document.getElementById('inq-name').value;
  const successEl = document.getElementById('inquiry-success');
  if (successEl) {
    successEl.innerHTML = `✓ شكراً أستاذ ${name}، تم إرسال استفسارك بنجاح! سيتواصل معك المعلن (${currentApt.advertiser.name}) هاتفياً أو عبر الواتساب في أقرب وقت.`;
    successEl.classList.remove('hidden');
  }
  showToast("تم إرسال طلبك للمعلن بنجاح", "check");
  document.getElementById('inquiry-form').reset();
}

function setupPropertyMortgage(price) {
  if (currentApt.type === 'للإيجار') {
    const section = document.getElementById('pd-mortgage-box');
    if (section) section.classList.add('hidden');
    return;
  }

  const down20 = Math.round(price * 0.20);
  const principal = price - down20;
  const months = 240; // 20 years
  const rate = (8 / 100) / 12; // 8% CBE initiative
  const monthly = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

  setText('pd-calc-price', window.DataStore.formatEgp(price));
  setText('pd-calc-down', window.DataStore.formatEgp(down20));
  setText('pd-calc-monthly', window.DataStore.formatEgp(monthly) + ' / شهرياً');
}

function loadSimilarProperties(apt) {
  const container = document.getElementById('similar-properties-grid');
  if (!container) return;

  const all = window.DataStore.getProperties();
  const similar = all.filter(p => p.id !== apt.id && (p.location === apt.location || p.type === apt.type)).slice(0, 3);

  if (similar.length > 0) {
    container.innerHTML = similar.map(createPropertyCardHtml).join('');
  } else {
    container.innerHTML = all.filter(p => p.id !== apt.id).slice(0, 3).map(createPropertyCardHtml).join('');
  }

  if (window.lucide) lucide.createIcons();
}
