import React, { useState, useEffect } from 'react';
import { 
  Building2, Heart, PlusCircle, Search, MapPin, Bed, Tag, Star, 
  ChevronLeft, ChevronRight, Phone, MessageCircle, Calculator, 
  RotateCcw, ShieldCheck, Banknote, PieChart, Calendar, X, 
  Sparkles, Send, CheckCircle, Info, Lock
} from 'lucide-react';
import { INITIAL_PROPERTIES, formatEgp } from './data/properties';

export default function App() {
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('react_sarh_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('react_sarh_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'catalog' | 'calculator' | 'favorites'
  const [filterType, setFilterType] = useState('all'); // 'all' | 'للبيع' | 'للإيجار'
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [filterBedrooms, setFilterBedrooms] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Mortgage Calculator State
  const [mcPrice, setMcPrice] = useState(3500000);
  const [mcDownPct, setMcDownPct] = useState(20);
  const [mcYears, setMcYears] = useState(20);
  const [mcRate, setMcRate] = useState(8);

  useEffect(() => {
    localStorage.setItem('react_sarh_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('react_sarh_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
      showToast('تمت إزالة العقار من المفضلة');
    } else {
      setFavorites([...favorites, id]);
      showToast('تمت إضافة العقار إلى المفضلة');
    }
  };

  // Filter logic
  const filteredProperties = properties.filter(apt => {
    if (activeTab === 'favorites' && !favorites.includes(apt.id)) return false;
    if (filterType !== 'all' && apt.type !== filterType) return false;
    if (filterLocation !== 'all' && apt.location !== filterLocation) return false;
    const minP = parseFloat(filterMinPrice) || 0;
    const maxP = parseFloat(filterMaxPrice) || Infinity;
    if (apt.price < minP || apt.price > maxP) return false;
    if (filterBedrooms === '1' && apt.bedrooms !== 1) return false;
    if (filterBedrooms === '2' && apt.bedrooms !== 2) return false;
    if (filterBedrooms === '3' && apt.bedrooms !== 3) return false;
    if (filterBedrooms === '4+' && apt.bedrooms < 4) return false;
    return true;
  });

  // Mortgage calculations
  const downPayment = Math.round(mcPrice * (mcDownPct / 100));
  const principal = Math.max(0, mcPrice - downPayment);
  const months = mcYears * 12;
  const monthlyRate = (mcRate / 100) / 12;
  const monthlyPayment = monthlyRate === 0 
    ? principal / months 
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalRepayment = monthlyPayment * months;
  const totalInterest = Math.max(0, totalRepayment - principal);
  const minRequiredIncome = monthlyPayment / 0.40;

  // Add Property Handler
  const handleAddPropertySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newApt = {
      id: 'APT-' + (properties.length + 101),
      title: formData.get('title'),
      type: formData.get('type'),
      category: 'شقة',
      featured: true,
      price: parseFloat(formData.get('price')),
      location: formData.get('location'),
      fullAddress: `${formData.get('location')}، مصر`,
      area: parseFloat(formData.get('area')),
      bedrooms: parseInt(formData.get('bedrooms')),
      bathrooms: 2,
      floor: 'الدور الثاني',
      finishing: 'سوبر لوكس',
      payment: 'كاش أو تقسيط',
      year: 2024,
      description: 'عقار تم نشره حديثاً ومتاح للمعاينة المباشرة.',
      amenities: ['أمن 24/7', 'مصعد', 'جراج خاص', 'تكييفات'],
      images: [
        formData.get('imgUrl') || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop'
      ],
      advertiser: {
        name: formData.get('advName') || 'المالك مباشرة',
        role: 'معلن معتمد',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
        phone: formData.get('advPhone') || '+201000000000',
        whatsapp: (formData.get('advPhone') || '201000000000').replace(/[^0-9]/g, ''),
        verified: true
      }
    };

    setProperties([newApt, ...properties]);
    setIsAddModalOpen(false);
    showToast('تم نشر عقارك بنجاح في المنصة!');
  };

  return (
    <div className="min-h-screen flex flex-col font-cairo bg-[#F8FAFC]">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold border border-slate-700 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              بوابة صَرح مصر العقارية - نسخة React الحديثة
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              الخط الساخن: <strong className="text-white">19955</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Nav */}
            <div className="flex items-center gap-8">
              <div 
                onClick={() => { setActiveTab('home'); setFilterType('all'); }} 
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-slate-900 flex items-center justify-center text-amber-400 shadow-md">
                  <Building2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    صَرح <span className="text-amber-500 font-light text-xl">مصر</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 -mt-1">منصة العقارات الفاخرة (React)</span>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
                <button 
                  onClick={() => { setActiveTab('home'); setFilterType('all'); }} 
                  className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'home' ? 'text-emerald-900 bg-emerald-50 font-bold' : 'hover:bg-slate-100'}`}
                >
                  الرئيسية
                </button>
                <button 
                  onClick={() => { setActiveTab('catalog'); setFilterType('للبيع'); }} 
                  className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'catalog' && filterType === 'للبيع' ? 'text-emerald-900 bg-emerald-50 font-bold' : 'hover:bg-slate-100'}`}
                >
                  شقق للبيع
                </button>
                <button 
                  onClick={() => { setActiveTab('catalog'); setFilterType('للإيجار'); }} 
                  className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'catalog' && filterType === 'للإيجار' ? 'text-emerald-900 bg-emerald-50 font-bold' : 'hover:bg-slate-100'}`}
                >
                  شقق للإيجار
                </button>
                <button 
                  onClick={() => { setActiveTab('catalog'); setFilterType('all'); }} 
                  className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'catalog' && filterType === 'all' ? 'text-emerald-900 bg-emerald-50 font-bold' : 'hover:bg-slate-100'}`}
                >
                  كل العقارات
                </button>
                <button 
                  onClick={() => setActiveTab('calculator')} 
                  className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'calculator' ? 'text-amber-800 bg-amber-50 border border-amber-200 font-bold' : 'hover:bg-slate-100'}`}
                >
                  <Calculator className="w-4 h-4 text-amber-600" />
                  <span>حاسبة التمويل</span>
                </button>
              </nav>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveTab('favorites')}
                className="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition"
                title="المفضلة"
              >
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-red-500 fill-current' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1.5 -left-1.5 bg-red-500 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-amber-600/25 transition"
              >
                <PlusCircle className="w-5 h-5" />
                <span>أضف عقارك مجاناً</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Hero Section (shown on Home) */}
      {activeTab === 'home' && (
        <section className="relative hero-bg py-20 lg:py-24 text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-blur text-amber-400 border border-amber-500/30 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>أكثر من 15,000 عقار سكني واستثماري موثق في مصر</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
              ابحث عن <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 via-amber-300 to-yellow-200">بيتك المستقبلي</span> في أرقى أحياء مصر
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              شقق وفلل فاخرة في التجمع الخامس، الشيخ زايد، العاصمة الإدارية الجديدة والمعادي بدون عمولات خفية.
            </p>
          </div>
        </section>
      )}

      {/* Filters Card */}
      {(activeTab === 'home' || activeTab === 'catalog') && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 w-full -mt-8 z-30 mb-10">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-5 sm:p-7">
            
            {/* Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl">
                <button 
                  onClick={() => setFilterType('all')} 
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition ${filterType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
                >
                  الكل
                </button>
                <button 
                  onClick={() => setFilterType('للبيع')} 
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition ${filterType === 'للبيع' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
                >
                  للبيع
                </button>
                <button 
                  onClick={() => setFilterType('للإيجار')} 
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition ${filterType === 'للإيجار' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
                >
                  للإيجار
                </button>
              </div>

              <button 
                onClick={() => {
                  setFilterType('all');
                  setFilterLocation('all');
                  setFilterMinPrice('');
                  setFilterMaxPrice('');
                  setFilterBedrooms('all');
                }} 
                className="flex items-center gap-1.5 text-slate-500 hover:text-red-600 font-semibold text-xs px-3 py-1.5 rounded-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة ضبط الفلاتر</span>
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">المكان / المنطقة</label>
                <select 
                  value={filterLocation} 
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="all">كل المناطق</option>
                  <option value="التجمع الخامس">التجمع الخامس</option>
                  <option value="الشيخ زايد">الشيخ زايد</option>
                  <option value="العاصمة الإدارية">العاصمة الإدارية</option>
                  <option value="المعادي">المعادي</option>
                  <option value="مدينة نصر">مدينة نصر</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">نطاق السعر (ج.م)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="number" 
                    placeholder="الأدنى" 
                    value={filterMinPrice} 
                    onChange={(e) => setFilterMinPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-mono"
                  />
                  <input 
                    type="number" 
                    placeholder="الأقصى" 
                    value={filterMaxPrice} 
                    onChange={(e) => setFilterMaxPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">عدد الغرف</label>
                <select 
                  value={filterBedrooms} 
                  onChange={(e) => setFilterBedrooms(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="all">أي عدد غرف</option>
                  <option value="1">غرفة (1)</option>
                  <option value="2">غرفتان (2)</option>
                  <option value="3">3 غرف نوم</option>
                  <option value="4+">4 غرف أو أكثر</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                >
                  <Search className="w-4 h-4 text-amber-400" />
                  <span>تطبيق الفلترة ({filteredProperties.length})</span>
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Main Properties Grid */}
      {(activeTab === 'home' || activeTab === 'catalog' || activeTab === 'favorites') && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                {activeTab === 'favorites' ? 'العقارات المفضلة لديك' : 'أحدث العقارات والشقق المتاحة'}
              </h2>
              <p className="text-slate-500 text-xs mt-1">وحدات موثقة ومعاينة مجانية</p>
            </div>
            <span className="bg-emerald-100 text-emerald-900 text-xs font-black px-3.5 py-1 rounded-full font-mono">
              {filteredProperties.length} عقار
            </span>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
              <Search className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-lg">لم يتم العثور على عقارات مطابقة</h3>
              <p className="text-xs text-slate-500 mt-1">جرب تغيير المنطقة أو مراجعة نطاق السعر.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(apt => (
                <div 
                  key={apt.id} 
                  onClick={() => { setSelectedProperty(apt); setSelectedGalleryIdx(0); }}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img 
                      src={apt.images[0]} 
                      alt={apt.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 right-3 left-3 flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${apt.type === 'للبيع' ? 'bg-emerald-900 text-amber-400' : 'bg-blue-900 text-blue-200'}`}>
                        {apt.type}
                      </span>
                      <button 
                        onClick={(e) => toggleFavorite(apt.id, e)} 
                        className="p-2.5 rounded-full badge-blur text-white hover:text-red-500 transition shadow"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(apt.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-3 right-3 badge-blur px-3 py-1.5 rounded-xl text-white font-mono font-black text-sm border border-white/10 flex items-center gap-1.5 shadow">
                      <Tag className="w-3.5 h-3.5 text-amber-400" />
                      <span>{formatEgp(apt.price, apt.type)}</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 mb-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{apt.location}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-900 transition line-clamp-2 mb-3">
                        {apt.title}
                      </h3>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-2">
                      <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-600 mb-4 bg-slate-50 py-2.5 px-2 rounded-xl">
                        <div>
                          <span className="text-[10px] text-slate-400 block">المساحة</span>
                          <span className="font-bold font-mono text-slate-900">{apt.area} م²</span>
                        </div>
                        <div className="border-r border-slate-200">
                          <span className="text-[10px] text-slate-400 block">الغرف</span>
                          <span className="font-bold font-mono text-slate-900">{apt.bedrooms} غرف</span>
                        </div>
                        <div className="border-r border-slate-200">
                          <span className="text-[10px] text-slate-400 block">الحمامات</span>
                          <span className="font-bold font-mono text-slate-900">{apt.bathrooms} حمام</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 truncate max-w-[140px]">{apt.advertiser.name}</span>
                        <span className="bg-slate-100 group-hover:bg-emerald-900 group-hover:text-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1">
                          <span>عرض التفاصيل</span>
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* Mortgage Calculator Tab */}
      {activeTab === 'calculator' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              حاسبة التمويل العقاري الذكية في مصر
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-2">احسب قسطك الشهري بدقة</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Inputs */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">سعر العقار الإجمالي (ج.م)</label>
                <div className="flex items-center gap-2 mb-2">
                  <input 
                    type="number" 
                    value={mcPrice} 
                    onChange={(e) => setMcPrice(Math.max(100000, parseFloat(e.target.value) || 0))} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-bold"
                  />
                </div>
                <input 
                  type="range" 
                  min="200000" 
                  max="20000000" 
                  step="50000" 
                  value={mcPrice} 
                  onChange={(e) => setMcPrice(parseFloat(e.target.value))} 
                  className="w-full accent-emerald-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">الدفعة المقدمة ({mcDownPct}%) = {formatEgp(downPayment)}</label>
                <div className="flex gap-2 mb-2">
                  {[10, 15, 20, 30, 50].map(pct => (
                    <button 
                      key={pct} 
                      onClick={() => setMcDownPct(pct)} 
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${mcDownPct === pct ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white text-slate-700 border-slate-200'}`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="80" 
                  step="1" 
                  value={mcDownPct} 
                  onChange={(e) => setMcDownPct(parseFloat(e.target.value))} 
                  className="w-full accent-emerald-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">مدة السداد بالسنوات ({mcYears} سنة)</label>
                <div className="grid grid-cols-6 gap-2">
                  {[5, 10, 15, 20, 25, 30].map(yr => (
                    <button 
                      key={yr} 
                      onClick={() => setMcYears(yr)} 
                      className={`py-2 rounded-xl text-xs font-bold border ${mcYears === yr ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white text-slate-700 border-slate-200'}`}
                    >
                      {yr} سنين
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">معدل الفائدة السنوية المتناقصة</label>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setMcRate(3)} 
                    className={`p-3 rounded-xl border text-right ${mcRate === 3 ? 'bg-emerald-50 border-emerald-700' : 'border-slate-200'}`}
                  >
                    <span className="block text-xs font-bold text-emerald-900">مبادرة 3%</span>
                    <span className="text-[10px] text-slate-400">محدودي الدخل</span>
                  </button>
                  <button 
                    onClick={() => setMcRate(8)} 
                    className={`p-3 rounded-xl border text-right ${mcRate === 8 ? 'bg-emerald-50 border-emerald-700' : 'border-slate-200'}`}
                  >
                    <span className="block text-xs font-bold text-emerald-900">مبادرة 8%</span>
                    <span className="text-[10px] text-slate-400">متوسطي الدخل</span>
                  </button>
                  <button 
                    onClick={() => setMcRate(16)} 
                    className={`p-3 rounded-xl border text-right ${mcRate === 16 ? 'bg-emerald-50 border-emerald-700' : 'border-slate-200'}`}
                  >
                    <span className="block text-xs font-bold text-slate-900">تجاري 16%</span>
                    <span className="text-[10px] text-slate-400">بدون قيود</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs text-slate-400 block mb-1">القسط الشهري المتوقع</span>
                <span className="text-3xl font-black text-amber-400 font-mono">{formatEgp(monthlyPayment)}</span>
                <span className="text-xs text-slate-400 block mt-2">
                  الحد الأدنى للدخل الشهري المطلوب: <strong className="text-white font-mono">{formatEgp(minRequiredIncome)}</strong>
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">سعر العقار:</span>
                  <span className="font-mono font-bold">{formatEgp(mcPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">المقدم المدفوع:</span>
                  <span className="font-mono font-bold text-amber-400">{formatEgp(downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">مبلغ القرض:</span>
                  <span className="font-mono font-bold">{formatEgp(principal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">إجمالي الفوائد:</span>
                  <span className="font-mono font-bold text-emerald-400">{formatEgp(totalInterest)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-amber-300">
                  <span>إجمالي السداد الكلي:</span>
                  <span className="font-mono">{formatEgp(totalRepayment)}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setFilterMinPrice(String(Math.round(mcPrice * 0.75)));
                  setFilterMaxPrice(String(Math.round(mcPrice * 1.25)));
                  setActiveTab('catalog');
                }}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 text-white font-bold py-3 rounded-xl transition text-xs flex items-center justify-center gap-2"
              >
                <span>تصفية الشقق المناسبة لهذا السعر</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

          </div>
        </main>
      )}

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-black ${selectedProperty.type === 'للبيع' ? 'bg-emerald-900 text-amber-400' : 'bg-blue-900 text-blue-200'}`}>
                  {selectedProperty.type}
                </span>
                <span className="font-mono text-xs font-bold text-slate-500">{selectedProperty.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleFavorite(selectedProperty.id)} 
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700"
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(selectedProperty.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button 
                  onClick={() => setSelectedProperty(null)} 
                  className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Gallery */}
              <div className="space-y-3">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900">
                  <img 
                    src={selectedProperty.images[selectedGalleryIdx] || selectedProperty.images[0]} 
                    alt="Property" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 badge-blur px-3 py-1 rounded-xl text-white text-xs font-mono">
                    {selectedGalleryIdx + 1} / {selectedProperty.images.length}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {selectedProperty.images.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedGalleryIdx(idx)}
                      className={`aspect-video rounded-xl overflow-hidden border-2 transition ${selectedGalleryIdx === idx ? 'border-emerald-700' : 'border-transparent opacity-70'}`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Price */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{selectedProperty.title}</h2>
                  <span className="text-2xl font-black text-emerald-900 font-mono">{formatEgp(selectedProperty.price, selectedProperty.type)}</span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{selectedProperty.fullAddress || selectedProperty.location}</span>
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl text-center text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">المساحة</span>
                  <span className="font-bold font-mono text-slate-900 text-sm">{selectedProperty.area} م²</span>
                </div>
                <div className="border-r border-slate-200">
                  <span className="text-slate-400 block mb-0.5">الغرف</span>
                  <span className="font-bold font-mono text-slate-900 text-sm">{selectedProperty.bedrooms}</span>
                </div>
                <div className="border-r border-slate-200">
                  <span className="text-slate-400 block mb-0.5">الحمامات</span>
                  <span className="font-bold font-mono text-slate-900 text-sm">{selectedProperty.bathrooms}</span>
                </div>
                <div className="border-r border-slate-200 col-span-3 sm:col-span-1">
                  <span className="text-slate-400 block mb-0.5">الدور</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedProperty.floor}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">وصف العقار</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{selectedProperty.description}</p>
              </div>

              {/* Advertiser Contact Actions */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={selectedProperty.advertiser.avatar} alt="Adv" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{selectedProperty.advertiser.name}</h5>
                    <span className="text-[11px] text-slate-500">{selectedProperty.advertiser.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a 
                    href={`https://wa.me/${selectedProperty.advertiser.whatsapp}?text=${encodeURIComponent(`مرحباً، أنا مهتم بعقار كود ${selectedProperty.id}`)}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>محادثة واتساب</span>
                  </a>
                  <a 
                    href={`tel:${selectedProperty.advertiser.phone}`}
                    className="flex-1 sm:flex-initial bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>اتصال بالمعلن</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-black text-slate-900 text-base">نشر إعلان عقار جديد مجاناً</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPropertySubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">عنوان الإعلان المختصر *</label>
                <input name="title" required placeholder="مثال: شقة مودرن بفيو مفتوح في التجمع الخامس" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">نوع المعاملة *</label>
                  <select name="type" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
                    <option value="للبيع">للبيع</option>
                    <option value="للإيجار">للإيجار</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">المنطقة *</label>
                  <select name="location" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
                    <option value="التجمع الخامس">التجمع الخامس</option>
                    <option value="الشيخ زايد">الشيخ زايد</option>
                    <option value="العاصمة الإدارية">العاصمة الإدارية</option>
                    <option value="المعادي">المعادي</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">السعر (ج.م) *</label>
                  <input name="price" type="number" required placeholder="4500000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">المساحة (م²) *</label>
                  <input name="area" type="number" required placeholder="180" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">الغرف *</label>
                  <select name="bedrooms" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3" selected>3</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">رابط صورة العقار (أو اتركه للاختيار التلقائي)</label>
                <input name="imgUrl" type="url" placeholder="https://images.unsplash.com/..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" dir="ltr" />
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">اسمك أو اسم الشركة</label>
                  <input name="advName" defaultValue="المالك مباشرة" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">رقم الهاتف للتواصل</label>
                  <input name="advPhone" defaultValue="+201000000000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" dir="ltr" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600">إلغاء</button>
                <button type="submit" className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-6 py-2 rounded-xl text-xs shadow">نشر الإعلان</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-auto text-center text-xs text-slate-500">
        © 2026 صرح مصر للعقارات. جميع الحقوق محفوظة ومسجلة قانونياً (نسخة React).
      </footer>

    </div>
  );
}
