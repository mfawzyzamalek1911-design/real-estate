/**
 * صَرح مصر - قاعدة البيانات والتهيئة المشتركة
 * Shared Data & Storage Management
 */

const INITIAL_PROPERTIES = [
  {
    id: "APT-101",
    title: "شقة بنتهاوس فاخرة مع روف خاص وإطلالة على حديقة بحيرة",
    type: "للبيع",
    category: "بنتهاوس",
    featured: true,
    price: 6850000,
    location: "التجمع الخامس",
    fullAddress: "كمبوند ميفيدا، شارع التسعين الجنوبي، التجمع الخامس، القاهرة الجديدة",
    area: 235,
    bedrooms: 3,
    bathrooms: 3,
    floor: "الرابع + روف خاص 80م²",
    finishing: "ألترا سوبر لوكس",
    payment: "كاش أو تقسيط على 5 سنوات",
    year: 2023,
    description: "شقة استثنائية بتشطيبات رخام إيطالي مستورد وأرضيات باركيه طبيعي. تتضمن روف مفتوح بمساحة 80 متر مربع مجهز بجلسة عائلية وشواية وبرجولة خشبية. فيو مفتوح تماماً على مساحات خضراء وبحيرات كريستالية مع نظام سمارت هوم للتحكم بالكامل في الإضاءة والتكييف.",
    amenities: ["أمن وحراسة 24/7", "مصعد مستورد", "موقف سيارات خاص (جراج)", "تكييف مركزي", "شرفة وبلكونة واسعة", "عداد كهرباء وغاز رسمي", "نادي صحي ورياضي", "سمارت هوم"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
    ],
    advertiser: {
      name: "شركة النخبة للاستثمار العقاري",
      role: "مطور عقاري معتمد",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
      phone: "+201099887766",
      whatsapp: "201099887766",
      verified: true,
      rating: 4.9,
      reviewsCount: 134
    }
  },
  {
    id: "APT-102",
    title: "شقة دوبلكس مودرن بحديقة خاصة وحمام سباحة مستقل",
    type: "للبيع",
    category: "دوبلكس",
    featured: true,
    price: 8900000,
    location: "الشيخ زايد",
    fullAddress: "كمبوند بفرلي هيلز، البوابة 2، الشيخ زايد، الجيزة",
    area: 290,
    bedrooms: 4,
    bathrooms: 4,
    floor: "أرضي + أول بحديقة 120م²",
    finishing: "سوبر لوكس مع المطبخ والأجهزة",
    payment: "مقدم 30% والباقي تسهيلات 4 سنوات",
    year: 2022,
    description: "دوبلكس راقٍ جداً بمساحة رحبة وحديقة مشجرة خاصة بحمام سباحة صغير للأطفال. غرفة ماستر رئيسية بدريسنج روم وحمام جاكوزي. مطبخ ألماني مجهز بجميع الأجهزة وموقفين لسيارتين تحت الأرض.",
    amenities: ["أمن وحراسة 24/7", "حديقة خاصة", "مسبح خاص", "موقف سيارات خاص (جراج)", "تكييف وتأسيس سبليت", "كاميرات مراقبة", "غرفة خادمة بحمام"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"
    ],
    advertiser: {
      name: "أ. محمود حسن",
      role: "المالك الأصلي مباشرة",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      phone: "+201222334455",
      whatsapp: "201222334455",
      verified: true,
      rating: 5.0,
      reviewsCount: 42
    }
  },
  {
    id: "APT-103",
    title: "شقة فندقية راقية مفروشة بالكامل للإيجار الشهري",
    type: "للإيجار",
    category: "شقة",
    featured: false,
    price: 45000,
    location: "المعادي",
    fullAddress: "دجلة المعادي، بالقرب من المدرسة الأمريكية CAC وميدان فيكتوريا",
    area: 165,
    bedrooms: 2,
    bathrooms: 2,
    floor: "الدور الثالث",
    finishing: "فرش مستورد بالكامل ألترا لوكس",
    payment: "إيجار شهري (شهر تأمين + شهر مقدم)",
    year: 2021,
    description: "شقة أنيقة في أرقى شوارع دجلة المعادي الهادئة، مجهزة بأحدث المفروشات والأجهزة الكهربائية وتكييفات مركزية في جميع الغرف. مناسبة جداً للدبلوماسيين وموظفي الشركات الأجنبية.",
    amenities: ["أمن وحراسة 24/7", "مصعد مستورد", "مفروشة بالكامل", "إنترنت فايبر سريع", "تكييف مركزي", "شرفة واسعة", "قريبة من المترو"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
    ],
    advertiser: {
      name: "رويال لإدارة الأصول والتأجير",
      role: "وسيط عقاري معتمد",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      phone: "+201111223344",
      whatsapp: "201111223344",
      verified: true,
      rating: 4.8,
      reviewsCount: 88
    }
  },
  {
    id: "APT-104",
    title: "شقة استثمارية واعدة بجوار النهر الأخضر والحي الدبلوماسي",
    type: "للبيع",
    category: "شقة",
    featured: true,
    price: 3450000,
    location: "العاصمة الإدارية",
    fullAddress: "الحي السكني السابع R7، كمبوند سيليا، العاصمة الإدارية الجديدة",
    area: 155,
    bedrooms: 3,
    bathrooms: 2,
    floor: "الدور الثاني بلكونة مفتوحة",
    finishing: "نصف تشطيب (محارة وحلوق)",
    payment: "مقدم 10% وأقساط مريحة تصل لـ 7 سنوات",
    year: 2024,
    description: "فرصة استثمارية ذهبية في قلب العاصمة الإدارية بجوار حي الوزارات والحديقة المركزية والنهر الأخضر. تقسيم داخلي هندسي ممتاز يستغل المساحات بدون هدر مع إطلالة بانورامية بحرية صريحة.",
    amenities: ["أمن وحراسة 24/7", "مصعد", "جراج تحت الأرض", "مساحات خضراء شاسعة", "مول تجاري بالكمبوند", "أقساط ميسرة"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop"
    ],
    advertiser: {
      name: "كابيتال هومز للاستشارات",
      role: "مطور عقاري معتمد",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      phone: "+201012345678",
      whatsapp: "201012345678",
      verified: true,
      rating: 4.9,
      reviewsCount: 210
    }
  },
  {
    id: "APT-105",
    title: "شقة واسعة على شارع رئيسي حيوي جاهزة للسكن الفوري",
    type: "للبيع",
    category: "شقة",
    featured: false,
    price: 2750000,
    location: "مدينة نصر",
    fullAddress: "شارع الطيران بالقرب من جنينة مول والمنطقة الأولى، مدينة نصر",
    area: 175,
    bedrooms: 3,
    bathrooms: 2,
    floor: "الدور الخامس (عمارة شيك بـ 2 أسانسير)",
    finishing: "سوبر لوكس حديث",
    payment: "كاش فقط (تسهيل بسيط للمشتري الجاد)",
    year: 2019,
    description: "شقة متكاملة مسجلة شهر عقاري بحصة في الأرض والجراج. موقع مركزي في قلب مدينة نصر بالقرب من كافة المدارس والخدمات الحيوية والمولات التجارية. غير مجروحة بتهوية ممتازة وواجهة بحرية.",
    amenities: ["أمن بالعقار", "2 مصعد", "حصة بالأرض", "غاز طبيعي", "تليفون أرضي وإنترنت", "قريبة من المواصلات"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
    ],
    advertiser: {
      name: "م. طارق عبد الحميد",
      role: "وسيط عقاري مستقل",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      phone: "+201098765432",
      whatsapp: "201098765432",
      verified: true,
      rating: 4.7,
      reviewsCount: 65
    }
  },
  {
    id: "APT-106",
    title: "استوديو مودرن مفروش بإطلالة ساحرة للإيجار السنوي",
    type: "للإيجار",
    category: "استوديو",
    featured: false,
    price: 22000,
    location: "التجمع الخامس",
    fullAddress: "شارع التسعين الشمالي، كمبوند تريفيو، القاهرة الجديدة",
    area: 75,
    bedrooms: 1,
    bathrooms: 1,
    floor: "الدور الثاني",
    finishing: "فرش فندقي سمارت",
    payment: "إيجار سنوي بشيكات ربع سنوية",
    year: 2023,
    description: "استوديو راقٍ وموفر للطاقة مجهز بالكامل بأثاث مودرن حديث، شاشة تلفاز 65 بوصة، إنترنت فايبر فائق السرعة، ومطبخ مدمج. خدمات أمن على مدار الساعة ونادي رياضي في الكمبوند.",
    amenities: ["أمن 24 ساعة", "أسانسير", "فرش فندقي متكامل", "تكييفات إنفرتر", "موقف سيارة", "صالة ألعاب رياضية (جيم)"],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop"
    ],
    advertiser: {
      name: "شركة نيو كايرو بروبرتيز",
      role: "إدارة أملاك وتأجير",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      phone: "+201555443322",
      whatsapp: "201555443322",
      verified: true,
      rating: 4.9,
      reviewsCount: 92
    }
  },
  {
    id: "APT-107",
    title: "شقة عائلية فاخرة تطل مباشرة على نادي الجزيرة والمساحات الخضراء",
    type: "للبيع",
    category: "شقة",
    featured: true,
    price: 7200000,
    location: "الشيخ زايد",
    fullAddress: "كمبوند كازا، بالقرب من هايبر وان، الشيخ زايد، الجيزة",
    area: 210,
    bedrooms: 3,
    bathrooms: 3,
    floor: "الدور الثالث بحري صريح",
    finishing: "ألترا سوبر لوكس",
    payment: "كاش مع إمكانية التمويل العقاري حتى 20 سنة",
    year: 2022,
    description: "تصميم فندقي متميز، صالة استقبال شاسعة 4 قطع من الرخام الإسباني، ريسبشن مفتوح على تراس كبير يتميز بالهدوء التام والخصوصية. جراج خاص تحت العمارة وحراسة على مدار اليوم.",
    amenities: ["أمن وحراسة", "مصعد أوتوماتيكي", "جراج خاص", "تراس بإطلالة مفتوحة", "متاح تمويل عقاري", "قريب من المولات"],
    images: [
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop"
    ],
    advertiser: {
      name: "الصفوة للوساطة والتسويق",
      role: "وسيط عقاري معتمد",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
      phone: "+201055667788",
      whatsapp: "201055667788",
      verified: true,
      rating: 4.8,
      reviewsCount: 115
    }
  },
  {
    id: "APT-108",
    title: "شقة كلاسيكية واسعة بفيو أشجار عريقة في قلب مصر الجديدة",
    type: "للبيع",
    category: "شقة",
    featured: false,
    price: 4800000,
    location: "مصر الجديدة",
    fullAddress: "ميدان الكوربة التاريخي، مصر الجديدة، القاهرة",
    area: 220,
    bedrooms: 4,
    bathrooms: 3,
    floor: "الدور الثاني بمدخل رخامي كلاسيكي",
    finishing: "مجددة بالكامل سوبر لوكس",
    payment: "كاش مع إمكانية التفاوض البسيط",
    year: 2020,
    description: "عقار أصيل بأسقف مرتفعة ونوافذ خشبية ضخمة تطل على طراز الكوربة العريق. تم تجديد شبكات السباكة والكهرباء بالكامل مع الحفاظ على الهوية المعمارية الكلاسيكية الراقية.",
    amenities: ["مدخل فندقي كلاسيكي", "مصعد", "أسقف مرتفعة", "غاز وكهرباء رسمي", "موقع تاريخي مميز", "قريب من المترو"],
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
    ],
    advertiser: {
      name: "أ. سامح رزق الله",
      role: "المالك",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      phone: "+201200998877",
      whatsapp: "201200998877",
      verified: true,
      rating: 4.9,
      reviewsCount: 38
    }
  }
];

// Locations & Pricing Insights
const LOCATIONS_DATA = [
  { name: "التجمع الخامس", avgMeterPrice: 38000, description: "القاهرة الجديدة - كمبوندات راقية", tag: "الأكثر طلباً" },
  { name: "الشيخ زايد", avgMeterPrice: 42000, description: "غرب القاهرة - هدوء ومساحات خضراء", tag: "فاخر" },
  { name: "العاصمة الإدارية", avgMeterPrice: 32000, description: "مستقبل مصر الذكي والحي المالي", tag: "استثماري مميز" },
  { name: "المعادي", avgMeterPrice: 30000, description: "دجلة والسرايات - طابع كلاسيكي أنيق", tag: "طابع هادئ" },
  { name: "مدينة نصر", avgMeterPrice: 22000, description: "موقع مركزي وخدمات متكاملة", tag: "حيوي" },
  { name: "مصر الجديدة", avgMeterPrice: 28000, description: "الكوربة وهليوبوليس التراثية", tag: "عريق" }
];

// Storage Keys
const STORAGE_KEYS = {
  PROPERTIES: 'sarh_properties',
  FAVORITES: 'sarh_favorites'
};

// Data Store API
const DataStore = {
  getProperties() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to read properties from localStorage", e);
    }
    // Seed storage with initial data
    this.saveProperties(INITIAL_PROPERTIES);
    return INITIAL_PROPERTIES;
  },

  saveProperties(props) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(props));
    } catch (e) {
      console.error("Failed to save properties", e);
    }
  },

  getPropertyById(id) {
    const list = this.getProperties();
    return list.find(p => p.id === id) || null;
  },

  addProperty(newProp) {
    const list = this.getProperties();
    const id = "APT-" + (Date.now().toString().slice(-4));
    const created = { ...newProp, id };
    list.unshift(created);
    this.saveProperties(list);
    return created;
  },

  getFavorites() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  toggleFavorite(id) {
    const favs = this.getFavorites();
    const index = favs.indexOf(id);
    let added = false;
    if (index === -1) {
      favs.push(id);
      added = true;
    } else {
      favs.splice(index, 1);
      added = false;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    } catch (e) {}
    return { favorites: favs, added };
  },

  isFavorite(id) {
    return this.getFavorites().includes(id);
  },

  formatEgp(num, type) {
    const formatted = new Intl.NumberFormat('ar-EG').format(Math.round(num));
    if (type === 'للإيجار') {
      return `${formatted} ج.م / شهرياً`;
    }
    return `${formatted} ج.م`;
  }
};

window.DataStore = DataStore;
window.LOCATIONS_DATA = LOCATIONS_DATA;
