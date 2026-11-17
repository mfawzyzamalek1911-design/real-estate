/**
 * صَرح مصر - منطق إضافة إعلان عقاري جديد مع المعاينة الحية
 * Add Property & Real-time Live Preview Engine
 */

let previewData = {
  title: "عنوان الإعلان العقاري يظهر هنا في المعاينة الحية",
  type: "للبيع",
  category: "شقة",
  location: "التجمع الخامس",
  price: 4500000,
  area: 180,
  bedrooms: 3,
  bathrooms: 2,
  imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
};

document.addEventListener('DOMContentLoaded', () => {
  setupLivePreviewListeners();
  updateLiveCard();
});

function setupLivePreviewListeners() {
  const titleInput = document.getElementById('new-title');
  if (titleInput) {
    titleInput.addEventListener('input', (e) => {
      previewData.title = e.target.value.trim() || "عنوان الإعلان العقاري يظهر هنا في المعاينة الحية";
      updateLiveCard();
    });
  }

  const typeSelect = document.getElementById('new-type');
  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      previewData.type = e.target.value;
      updateLiveCard();
    });
  }

  const locSelect = document.getElementById('new-location');
  if (locSelect) {
    locSelect.addEventListener('change', (e) => {
      previewData.location = e.target.value;
      updateLiveCard();
    });
  }

  const priceInput = document.getElementById('new-price');
  if (priceInput) {
    priceInput.addEventListener('input', (e) => {
      previewData.price = parseFloat(e.target.value) || 0;
      updateLiveCard();
    });
  }

  const areaInput = document.getElementById('new-area');
  if (areaInput) {
    areaInput.addEventListener('input', (e) => {
      previewData.area = parseFloat(e.target.value) || 0;
      updateLiveCard();
    });
  }

  const bedsSelect = document.getElementById('new-beds');
  if (bedsSelect) {
    bedsSelect.addEventListener('change', (e) => {
      previewData.bedrooms = parseInt(e.target.value) || 1;
      previewData.bathrooms = Math.max(1, Math.floor(previewData.bedrooms * 0.75));
      updateLiveCard();
    });
  }

  const imgInput = document.getElementById('new-img');
  if (imgInput) {
    imgInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val) {
        previewData.imageUrl = val;
      } else {
        previewData.imageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";
      }
      updateLiveCard();
    });
  }

  // File upload input preview
  const fileInput = document.getElementById('new-file-img');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (re) => {
          previewData.imageUrl = re.target.result;
          updateLiveCard();
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function updateLiveCard() {
  const container = document.getElementById('live-card-container');
  if (!container) return;

  const mockProp = {
    id: "APT-PREVIEW",
    title: previewData.title,
    type: previewData.type,
    location: previewData.location,
    price: previewData.price,
    area: previewData.area,
    bedrooms: previewData.bedrooms,
    bathrooms: previewData.bathrooms,
    featured: true,
    images: [previewData.imageUrl],
    advertiser: {
      name: document.getElementById('adv-name')?.value.trim() || "أنت (معلن الإعلان)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
    }
  };

  container.innerHTML = createPropertyCardHtml(mockProp);
  if (window.lucide) lucide.createIcons({ root: container });
}

function handlePublishProperty(e) {
  e.preventDefault();

  const title = document.getElementById('new-title').value.trim();
  const type = document.getElementById('new-type').value;
  const category = document.getElementById('new-category').value;
  const location = document.getElementById('new-location').value;
  const fullAddress = document.getElementById('new-address').value.trim() || `${location}، القاهرة، مصر`;
  const price = parseFloat(document.getElementById('new-price').value);
  const area = parseFloat(document.getElementById('new-area').value);
  const bedrooms = parseInt(document.getElementById('new-beds').value);
  const bathrooms = parseInt(document.getElementById('new-baths').value) || Math.max(1, Math.floor(bedrooms * 0.75));
  const floor = document.getElementById('new-floor').value.trim() || "الدور الثاني";
  const finishing = document.getElementById('new-finishing').value;
  const payment = document.getElementById('new-payment').value;
  const year = parseInt(document.getElementById('new-year').value) || 2024;
  const desc = document.getElementById('new-desc').value.trim() || `عقار راقٍ ومميز تم إضافته حديثاً في ${location}. يتكون من ${bedrooms} غرف ومساحة ${area} متر مربع مع تشطيبات ${finishing} وموقع استراتيجي.`;

  const advName = document.getElementById('adv-name').value.trim() || "المالك مباشرة";
  const advPhone = document.getElementById('adv-phone').value.trim() || "+201000000000";
  const advRole = document.getElementById('adv-role').value;

  let imgUrl = previewData.imageUrl;
  if (!imgUrl || imgUrl.includes('placeholder')) {
    imgUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";
  }

  const newProperty = {
    title,
    type,
    category,
    featured: true,
    price,
    location,
    fullAddress,
    area,
    bedrooms,
    bathrooms,
    floor,
    finishing,
    payment,
    year,
    description: desc,
    amenities: ["أمن وحراسة 24/7", "مصعد", "موقف سيارات خاص (جراج)", "تكييف وتأسيس سبليت", "شرفة واسعة", "عداد كهرباء وغاز رسمي"],
    images: [
      imgUrl,
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
    ],
    advertiser: {
      name: advName,
      role: advRole,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
      phone: advPhone,
      whatsapp: advPhone.replace(/[^0-9]/g, ''),
      verified: true,
      rating: 5.0,
      reviewsCount: 1
    }
  };

  const created = window.DataStore.addProperty(newProperty);

  // Success alert and redirect
  showToast("تم نشر عقارك بنجاح في المنصة!", "check");
  
  setTimeout(() => {
    window.location.href = `property-details.html?id=${created.id}`;
  }, 1200);
}
