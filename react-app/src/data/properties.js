export const INITIAL_PROPERTIES = [
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
      verified: true
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
    amenities: ["أمن وحراسة 24/7", "حديقة خاصة", "مسبح خاص", "موقف سيارات خاص (جراج)", "تكييف وتأسيس سبليت", "كاميرات مراقبة"],
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
      verified: true
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
    fullAddress: "دجلة المعادي، بالقرب من المدرسة الأمريكية CAC",
    area: 165,
    bedrooms: 2,
    bathrooms: 2,
    floor: "الدور الثالث",
    finishing: "فرش مستورد بالكامل ألترا لوكس",
    payment: "إيجار شهري (شهر تأمين + شهر مقدم)",
    year: 2021,
    description: "شقة أنيقة في أرقى شوارع دجلة المعادي الهادئة، مجهزة بأحدث المفروشات والأجهزة الكهربائية وتكييفات مركزية في جميع الغرف. مناسبة جداً للدبلوماسيين وموظفي الشركات الأجنبية.",
    amenities: ["أمن وحراسة 24/7", "مصعد مستورد", "مفروشة بالكامل", "إنترنت فايبر سريع", "تكييف مركزي"],
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
      verified: true
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
    fullAddress: "الحي السكني السابع R7، كمبوند سيليا، العاصمة الإدارية",
    area: 155,
    bedrooms: 3,
    bathrooms: 2,
    floor: "الدور الثاني بلكونة مفتوحة",
    finishing: "نصف تشطيب (محارة وحلوق)",
    payment: "مقدم 10% وأقساط مريحة تصل لـ 7 سنوات",
    year: 2024,
    description: "فرصة استثمارية ذهبية في قلب العاصمة الإدارية بجوار حي الوزارات والحديقة المركزية والنهر الأخضر. تقسيم داخلي هندسي ممتاز يستغل المساحات بدون هدر.",
    amenities: ["أمن وحراسة 24/7", "مصعد", "جراج تحت الأرض", "مساحات خضراء شاسعة"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
    ],
    advertiser: {
      name: "كابيتال هومز للاستشارات",
      role: "مطور عقاري معتمد",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      phone: "+201012345678",
      whatsapp: "201012345678",
      verified: true
    }
  }
];

export function formatEgp(num, type) {
  const formatted = new Intl.NumberFormat('ar-EG').format(Math.round(num));
  if (type === 'للإيجار') return `${formatted} ج.م / شهرياً`;
  return `${formatted} ج.م`;
}
