/**
 * صَرح مصر - محرك تصفح وبحث العقارات المتقدم
 * Properties Catalog & Multi-Filter Logic
 */

let currentFilters = {
  type: 'all',
  location: 'all',
  category: 'all',
  minPrice: 0,
  maxPrice: Infinity,
  bedrooms: 'all',
  onlyFavorites: false,
  sortBy: 'featured'
};

document.addEventListener('DOMContentLoaded', () => {
  parseUrlParams();
  applyFiltersAndRender();
  setupFilterEventListeners();
});

// Parse GET Parameters from URL
function parseUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.has('type')) {
    const t = urlParams.get('type');
    if (t === 'للبيع' || t === 'sale') currentFilters.type = 'للبيع';
    else if (t === 'للإيجار' || t === 'rent') currentFilters.type = 'للإيجار';
  }

  if (urlParams.has('location')) {
    currentFilters.location = urlParams.get('location');
  }

  if (urlParams.has('category')) {
    currentFilters.category = urlParams.get('category');
  }

  if (urlParams.has('minPrice')) {
    currentFilters.minPrice = parseFloat(urlParams.get('minPrice')) || 0;
  }

  if (urlParams.has('maxPrice')) {
    currentFilters.maxPrice = parseFloat(urlParams.get('maxPrice')) || Infinity;
  }

  if (urlParams.has('bedrooms')) {
    currentFilters.bedrooms = urlParams.get('bedrooms');
  }

  if (urlParams.has('favorites')) {
    currentFilters.onlyFavorites = true;
  }

  syncControlsWithState();
}

// Sync Form Inputs with currentFilters State
function syncControlsWithState() {
  // Tabs
  ['all', 'sale', 'rent'].forEach(tab => {
    const el = document.getElementById(`tab-${tab}`);
    if (!el) return;
    const isMatched = 
      (tab === 'all' && currentFilters.type === 'all') ||
      (tab === 'sale' && currentFilters.type === 'للبيع') ||
      (tab === 'rent' && currentFilters.type === 'للإيجار');

    if (isMatched) {
      el.className = 'type-tab active px-5 py-2 rounded-xl text-sm font-bold transition text-navy-900 bg-white shadow-sm';
    } else {
      el.className = 'type-tab px-5 py-2 rounded-xl text-sm font-bold transition text-slate-600 hover:text-navy-900';
    }
  });

  // Location
  const locSelect = document.getElementById('filter-location');
  if (locSelect) locSelect.value = currentFilters.location;

  // Category
  const catSelect = document.getElementById('filter-category');
  if (catSelect) catSelect.value = currentFilters.category;

  // Prices
  const minInput = document.getElementById('filter-min-price');
  if (minInput && currentFilters.minPrice > 0) minInput.value = currentFilters.minPrice;

  const maxInput = document.getElementById('filter-max-price');
  if (maxInput && currentFilters.maxPrice < Infinity) maxInput.value = currentFilters.maxPrice;

  // Bedrooms
  const bedSelect = document.getElementById('filter-bedrooms');
  if (bedSelect) bedSelect.value = currentFilters.bedrooms;

  // Sort
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = currentFilters.sortBy;
}

function setupFilterEventListeners() {
  const loc = document.getElementById('filter-location');
  if (loc) loc.addEventListener('change', () => { currentFilters.location = loc.value; applyFiltersAndRender(); });

  const cat = document.getElementById('filter-category');
  if (cat) cat.addEventListener('change', () => { currentFilters.category = cat.value; applyFiltersAndRender(); });

  const bed = document.getElementById('filter-bedrooms');
  if (bed) bed.addEventListener('change', () => { currentFilters.bedrooms = bed.value; applyFiltersAndRender(); });

  const sort = document.getElementById('sort-select');
  if (sort) sort.addEventListener('change', () => { currentFilters.sortBy = sort.value; applyFiltersAndRender(); });
}

function setFilterType(type) {
  if (type === 'all') currentFilters.type = 'all';
  else if (type === 'sale') currentFilters.type = 'للبيع';
  else if (type === 'rent') currentFilters.type = 'للإيجار';
  
  syncControlsWithState();
  applyFiltersAndRender();
}

function validateAndApplyFilters() {
  const minInput = document.getElementById('filter-min-price');
  const maxInput = document.getElementById('filter-max-price');
  const errorEl = document.getElementById('price-validation-error');

  const min = parseFloat(minInput.value) || 0;
  const max = parseFloat(maxInput.value) || Infinity;

  if (min > 0 && max < Infinity && min > max) {
    if (errorEl) errorEl.classList.remove('hidden');
  } else {
    if (errorEl) errorEl.classList.add('hidden');
  }

  currentFilters.minPrice = min;
  currentFilters.maxPrice = max;
  applyFiltersAndRender();
}

function toggleFavoritesOnly() {
  currentFilters.onlyFavorites = !currentFilters.onlyFavorites;
  applyFiltersAndRender();
}

function resetAllFilters() {
  currentFilters = {
    type: 'all',
    location: 'all',
    category: 'all',
    minPrice: 0,
    maxPrice: Infinity,
    bedrooms: 'all',
    onlyFavorites: false,
    sortBy: 'featured'
  };

  const minInput = document.getElementById('filter-min-price');
  if (minInput) minInput.value = '';
  const maxInput = document.getElementById('filter-max-price');
  if (maxInput) maxInput.value = '';
  const errorEl = document.getElementById('price-validation-error');
  if (errorEl) errorEl.classList.add('hidden');

  syncControlsWithState();
  applyFiltersAndRender();

  if (typeof showToast === 'function') {
    showToast('تمت إعادة ضبط جميع الفلاتر بنجاح', 'info');
  }
}

function applyFiltersAndRender() {
  const all = window.DataStore ? window.DataStore.getProperties() : [];
  const favs = window.DataStore ? window.DataStore.getFavorites() : [];

  let filtered = all.filter(item => {
    // 1. Transaction Type
    if (currentFilters.type !== 'all' && item.type !== currentFilters.type) return false;

    // 2. Location
    if (currentFilters.location !== 'all' && item.location !== currentFilters.location) return false;

    // 3. Category
    if (currentFilters.category !== 'all' && item.category !== currentFilters.category) return false;

    // 4. Price
    if (item.price < currentFilters.minPrice) return false;
    if (currentFilters.maxPrice < Infinity && item.price > currentFilters.maxPrice) return false;

    // 5. Bedrooms
    if (currentFilters.bedrooms === '1' && item.bedrooms !== 1) return false;
    if (currentFilters.bedrooms === '2' && item.bedrooms !== 2) return false;
    if (currentFilters.bedrooms === '3' && item.bedrooms !== 3) return false;
    if (currentFilters.bedrooms === '4+' && item.bedrooms < 4) return false;

    // 6. Only Favorites
    if (currentFilters.onlyFavorites && !favs.includes(item.id)) return false;

    return true;
  });

  // Sorting
  if (currentFilters.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sortBy === 'area-desc') {
    filtered.sort((a, b) => b.area - a.area);
  } else {
    // Featured first
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  // Update Count
  const countEl = document.getElementById('results-count');
  if (countEl) countEl.innerText = `${filtered.length} عقار`;

  // Render Grid
  const grid = document.getElementById('listings-grid');
  const emptyState = document.getElementById('empty-state');

  if (grid) {
    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      grid.innerHTML = filtered.map(createPropertyCardHtml).join('');
    }
  }

  renderChips();
  if (window.lucide) lucide.createIcons();
}

function renderChips() {
  const container = document.getElementById('chips-container');
  if (!container) return;

  const chips = [];

  if (currentFilters.type !== 'all') {
    chips.push({
      label: `المعاملة: ${currentFilters.type}`,
      remove: () => setFilterType('all')
    });
  }

  if (currentFilters.location !== 'all') {
    chips.push({
      label: `المنطقة: ${currentFilters.location}`,
      remove: () => {
        currentFilters.location = 'all';
        syncControlsWithState();
        applyFiltersAndRender();
      }
    });
  }

  if (currentFilters.category !== 'all') {
    chips.push({
      label: `النوع: ${currentFilters.category}`,
      remove: () => {
        currentFilters.category = 'all';
        syncControlsWithState();
        applyFiltersAndRender();
      }
    });
  }

  if (currentFilters.minPrice > 0) {
    chips.push({
      label: `أدنى: ${formatEgpNum(currentFilters.minPrice)} ج.م`,
      remove: () => {
        currentFilters.minPrice = 0;
        const input = document.getElementById('filter-min-price');
        if (input) input.value = '';
        applyFiltersAndRender();
      }
    });
  }

  if (currentFilters.maxPrice < Infinity) {
    chips.push({
      label: `أقصى: ${formatEgpNum(currentFilters.maxPrice)} ج.م`,
      remove: () => {
        currentFilters.maxPrice = Infinity;
        const input = document.getElementById('filter-max-price');
        if (input) input.value = '';
        applyFiltersAndRender();
      }
    });
  }

  if (currentFilters.bedrooms !== 'all') {
    chips.push({
      label: `غرف: ${currentFilters.bedrooms}`,
      remove: () => {
        currentFilters.bedrooms = 'all';
        syncControlsWithState();
        applyFiltersAndRender();
      }
    });
  }

  if (currentFilters.onlyFavorites) {
    chips.push({
      label: 'المفضلة فقط',
      remove: () => {
        currentFilters.onlyFavorites = false;
        applyFiltersAndRender();
      }
    });
  }

  if (chips.length === 0) {
    container.innerHTML = '<span class="text-slate-400 italic">عرض جميع العقارات المتاحة</span>';
  } else {
    container.innerHTML = chips.map((c, idx) => `
      <span class="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-200 text-brand-900 px-3 py-1 rounded-xl text-xs font-semibold">
        <span>${c.label}</span>
        <button onclick="removeFilterChip(${idx})" class="hover:text-red-600 transition"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
      </span>
    `).join('');
  }

  window._activeChips = chips;
}

function removeFilterChip(index) {
  if (window._activeChips && window._activeChips[index]) {
    window._activeChips[index].remove();
  }
}
