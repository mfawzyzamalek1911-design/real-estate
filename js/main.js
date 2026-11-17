/**
 * صَرح مصر - الدوال والمنطق المشترك لكافة الصفحات
 * Shared UI & Utility Functions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Update Favorites Badge Counter
  updateFavoritesBadge();

  // 3. Highlight Current Nav Link
  highlightActiveNav();

  // 4. Setup Mobile Nav Toggle
  setupMobileNav();
});

// Update the Heart Badge in the Header
function updateFavoritesBadge() {
  const badge = document.getElementById('fav-count-pill');
  if (!badge) return;
  const count = window.DataStore ? window.DataStore.getFavorites().length : 0;
  if (count > 0) {
    badge.innerText = count;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

// Global Toast System
function showToast(message, type = 'info') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 left-6 z-50 bg-navy-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold border border-slate-700 transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none';
    document.body.appendChild(toast);
  }

  let iconHtml = '<i data-lucide="info" class="w-5 h-5 text-gold-400"></i>';
  if (type === 'success' || type === 'check') {
    iconHtml = '<i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i>';
  } else if (type === 'heart') {
    iconHtml = '<i data-lucide="heart" class="w-5 h-5 text-red-500 fill-current"></i>';
  } else if (type === 'alert') {
    iconHtml = '<i data-lucide="alert-circle" class="w-5 h-5 text-amber-400"></i>';
  }

  toast.innerHTML = `
    ${iconHtml}
    <span>${message}</span>
  `;

  if (window.lucide) lucide.createIcons({ root: toast });

  // Show
  toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  // Hide after 3.5s
  if (window._toastTimer) clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3500);
}

// Render a Property Card Component (Used in index.html, properties.html, favorites.html)
function createPropertyCardHtml(apt) {
  const isFav = window.DataStore ? window.DataStore.isFavorite(apt.id) : false;
  const isSale = apt.type === 'للبيع';
  const typeBadgeClass = isSale 
    ? 'bg-brand-900 text-gold-400 border border-gold-500/30' 
    : 'bg-blue-900 text-blue-200 border border-blue-400/30';

  return `
    <div class="property-card group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs flex flex-col justify-between cursor-pointer" onclick="goToDetails('${apt.id}')">
      
      <!-- Card Image & Overlay Badges -->
      <div class="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img src="${apt.images[0]}" alt="${apt.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        
        <!-- Dark gradient for badge contrast -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none"></div>

        <!-- Top Badges Row -->
        <div class="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-auto">
          <div class="flex items-center gap-1.5">
            <span class="px-3 py-1 rounded-full text-xs font-black shadow-md ${typeBadgeClass}">
              ${apt.type}
            </span>
            ${apt.featured ? `
              <span class="px-2.5 py-1 rounded-full text-[11px] font-black bg-gold-600 text-white shadow-md flex items-center gap-1">
                <i data-lucide="star" class="w-3 h-3 fill-current"></i>
                <span>مميز</span>
              </span>
            ` : ''}
          </div>

          <!-- Favorite Heart Button -->
          <button onclick="handleCardFavToggle(event, '${apt.id}')" class="p-2.5 rounded-full badge-blur text-white hover:text-red-500 hover:scale-110 active:scale-95 transition shadow-md" title="إضافة للمفضلة">
            <i data-lucide="heart" class="w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}"></i>
          </button>
        </div>

        <!-- Bottom Price Tag -->
        <div class="absolute bottom-3 right-3 badge-blur px-3 py-1.5 rounded-xl text-white font-mono font-black text-sm border border-white/10 flex items-center gap-1.5 shadow">
          <i data-lucide="tag" class="w-3.5 h-3.5 text-gold-400"></i>
          <span>${window.DataStore.formatEgp(apt.price, apt.type)}</span>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <!-- Location -->
          <div class="flex items-center gap-1.5 text-xs font-semibold text-brand-800 mb-1.5">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-brand-700"></i>
            <span>${apt.location}</span>
          </div>

          <!-- Title -->
          <h3 class="text-base font-bold text-navy-900 group-hover:text-brand-900 transition line-clamp-2 leading-relaxed mb-3">
            ${apt.title}
          </h3>
        </div>

        <!-- Specs Row -->
        <div class="border-t border-slate-100 pt-4 mt-2">
          <div class="grid grid-cols-3 gap-2 text-center text-xs text-slate-600 mb-4 bg-slate-50/80 py-2.5 px-2 rounded-xl">
            <div class="flex flex-col items-center">
              <span class="text-[10px] text-slate-400 mb-0.5">المساحة</span>
              <span class="font-bold font-mono text-navy-900">${apt.area} م²</span>
            </div>
            <div class="flex flex-col items-center border-r border-slate-200">
              <span class="text-[10px] text-slate-400 mb-0.5">الغرف</span>
              <span class="font-bold font-mono text-navy-900">${apt.bedrooms} غرف</span>
            </div>
            <div class="flex flex-col items-center border-r border-slate-200">
              <span class="text-[10px] text-slate-400 mb-0.5">الحمامات</span>
              <span class="font-bold font-mono text-navy-900">${apt.bathrooms} حمام</span>
            </div>
          </div>

          <!-- Footer of Card -->
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <img src="${apt.advertiser.avatar}" alt="${apt.advertiser.name}" class="w-7 h-7 rounded-full object-cover border border-slate-200">
              <span class="text-[11px] font-semibold text-slate-500 truncate max-w-[110px]">${apt.advertiser.name}</span>
            </div>

            <a href="property-details.html?id=${apt.id}" onclick="event.stopPropagation()" class="bg-slate-100 group-hover:bg-brand-900 group-hover:text-white text-navy-900 text-xs font-bold px-3.5 py-2 rounded-xl transition duration-200 flex items-center gap-1">
              <span>التفاصيل</span>
              <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>

      </div>

    </div>
  `;
}

function goToDetails(id) {
  window.location.href = `property-details.html?id=${id}`;
}

function handleCardFavToggle(event, id) {
  if (event) event.stopPropagation();
  const res = window.DataStore.toggleFavorite(id);
  updateFavoritesBadge();

  if (res.added) {
    showToast("تمت إضافة العقار للمفضلة", "heart");
  } else {
    showToast("تمت إزالة العقار من المفضلة", "info");
  }

  // Refresh heart icon on card
  const btn = event.currentTarget;
  if (btn) {
    const icon = btn.querySelector('svg') || btn.querySelector('i');
    if (icon) {
      if (res.added) {
        icon.classList.add('fill-red-500', 'text-red-500');
      } else {
        icon.classList.remove('fill-red-500', 'text-red-500');
      }
    }
  }

  // If on favorites page, trigger callback
  if (typeof onFavoritesUpdated === 'function') {
    onFavoritesUpdated();
  }
}

// Navigation active highlighting
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, #mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('nav-link-active');
    }
  });
}

// Mobile Nav Toggle
function setupMobileNav() {
  const btn = document.getElementById('mobile-nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}
