/**
 * صَرح مصر - حاسبة التمويل العقاري الذكية
 * Smart Egyptian Mortgage Calculator Engine
 */

let mcState = {
  price: 3500000,
  downPercent: 20,
  downPayment: 700000,
  years: 20,
  annualRate: 8
};

function formatEgpNum(num) {
  return new Intl.NumberFormat('ar-EG').format(Math.round(num));
}

function recalculateMortgage() {
  const principal = Math.max(0, mcState.price - mcState.downPayment);
  const months = mcState.years * 12;
  const monthlyRate = (mcState.annualRate / 100) / 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = principal / months;
  } else {
    monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  }

  if (isNaN(monthlyPayment) || !isFinite(monthlyPayment)) {
    monthlyPayment = 0;
  }

  const totalRepayment = monthlyPayment * months;
  const totalInterest = Math.max(0, totalRepayment - principal);
  const minIncome = monthlyPayment / 0.40; // 40% DBR (Debt Burden Ratio according to CBE)

  // Update DOM elements if present
  const elMonthly = document.getElementById('mc-result-monthly');
  if (elMonthly) elMonthly.innerText = formatEgpNum(monthlyPayment);

  const elIncome = document.getElementById('mc-result-income');
  if (elIncome) elIncome.innerText = formatEgpNum(minIncome) + ' ج.م';

  const elPrice = document.getElementById('mc-result-price');
  if (elPrice) elPrice.innerText = formatEgpNum(mcState.price) + ' ج.م';

  const elDown = document.getElementById('mc-result-down');
  if (elDown) elDown.innerText = formatEgpNum(mcState.downPayment) + ' ج.م';

  const elPrincipal = document.getElementById('mc-result-principal');
  if (elPrincipal) elPrincipal.innerText = formatEgpNum(principal) + ' ج.م';

  const elInterest = document.getElementById('mc-result-interest');
  if (elInterest) elInterest.innerText = formatEgpNum(totalInterest) + ' ج.م';

  const elTotal = document.getElementById('mc-result-total');
  if (elTotal) elTotal.innerText = formatEgpNum(totalRepayment) + ' ج.م';

  // Visual distribution bar
  const sum = principal + totalInterest;
  const principalPct = sum > 0 ? Math.round((principal / sum) * 100) : 50;
  const interestPct = 100 - principalPct;

  const barPrincipal = document.getElementById('mc-bar-principal');
  if (barPrincipal) barPrincipal.style.width = principalPct + '%';

  const barInterest = document.getElementById('mc-bar-interest');
  if (barInterest) barInterest.style.width = interestPct + '%';

  const labelPrincipalPct = document.getElementById('mc-bar-principal-pct');
  if (labelPrincipalPct) labelPrincipalPct.innerText = principalPct + '%';

  const labelInterestPct = document.getElementById('mc-bar-interest-pct');
  if (labelInterestPct) labelInterestPct.innerText = interestPct + '%';
}

function updatePrice(val) {
  mcState.price = Math.max(100000, parseFloat(val) || 0);
  const input = document.getElementById('mc-price-input');
  const slider = document.getElementById('mc-price-slider');
  if (input) input.value = mcState.price;
  if (slider) slider.value = mcState.price;

  // Re-calculate down payment amount with current percentage
  mcState.downPayment = Math.round(mcState.price * (mcState.downPercent / 100));
  const downInput = document.getElementById('mc-down-input');
  if (downInput) downInput.value = mcState.downPayment;

  const downLabel = document.getElementById('mc-down-percent-label');
  if (downLabel) downLabel.innerText = `(${mcState.downPercent}% من السعر الإجمالي)`;

  recalculateMortgage();
}

function setDownPercent(pct) {
  mcState.downPercent = pct;
  const slider = document.getElementById('mc-down-slider');
  if (slider) slider.value = pct;

  mcState.downPayment = Math.round(mcState.price * (pct / 100));
  const downInput = document.getElementById('mc-down-input');
  if (downInput) downInput.value = mcState.downPayment;

  const downLabel = document.getElementById('mc-down-percent-label');
  if (downLabel) downLabel.innerText = `(${pct}% من السعر الإجمالي)`;

  // Update button visual states
  document.querySelectorAll('.mc-down-btn').forEach(btn => {
    if (btn.innerText.trim() === `${pct}%`) {
      btn.className = 'mc-down-btn text-xs font-bold px-3 py-1.5 rounded-lg border border-brand-700 bg-brand-900 text-white shadow-xs transition';
    } else {
      btn.className = 'mc-down-btn text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-brand-700 hover:text-brand-900 transition';
    }
  });

  recalculateMortgage();
}

function updateDownSlider(pct) {
  setDownPercent(parseFloat(pct));
}

function updateFromDownInput(val) {
  const down = parseFloat(val) || 0;
  mcState.downPayment = down;
  mcState.downPercent = Math.min(100, Math.max(5, Math.round((down / mcState.price) * 100)));
  
  const slider = document.getElementById('mc-down-slider');
  if (slider) slider.value = mcState.downPercent;

  const label = document.getElementById('mc-down-percent-label');
  if (label) label.innerText = `(${mcState.downPercent}% من السعر الإجمالي)`;

  recalculateMortgage();
}

function setLoanYears(yrs) {
  mcState.years = yrs;
  const display = document.getElementById('mc-years-display');
  if (display) display.innerText = `${yrs} سنة (${yrs * 12} شهراً)`;

  document.querySelectorAll('.mc-years-btn').forEach(btn => {
    if (btn.innerText.includes(`${yrs}`)) {
      btn.className = 'mc-years-btn text-xs font-bold py-2 rounded-xl border border-brand-700 bg-brand-900 text-white shadow-xs transition';
    } else {
      btn.className = 'mc-years-btn text-xs font-bold py-2 rounded-xl border border-slate-200 bg-white hover:border-brand-700 transition';
    }
  });

  recalculateMortgage();
}

function setInterestPreset(rate) {
  mcState.annualRate = rate;
  const input = document.getElementById('mc-rate-input');
  const slider = document.getElementById('mc-rate-slider');
  if (input) input.value = rate;
  if (slider) slider.value = rate;

  document.querySelectorAll('.mc-rate-btn').forEach(btn => {
    if (btn.dataset.rate === String(rate)) {
      btn.className = 'mc-rate-btn text-right p-3 rounded-xl border-2 border-brand-700 bg-brand-50/90 shadow-xs transition';
    } else {
      btn.className = 'mc-rate-btn text-right p-3 rounded-xl border border-slate-200 bg-white hover:border-brand-700 transition';
    }
  });

  recalculateMortgage();
}

function updateRateSlider(rate) {
  mcState.annualRate = parseFloat(rate);
  const input = document.getElementById('mc-rate-input');
  if (input) input.value = mcState.annualRate;
  recalculateMortgage();
}

function updateFromRateInput(rate) {
  mcState.annualRate = parseFloat(rate) || 1;
  const slider = document.getElementById('mc-rate-slider');
  if (slider) slider.value = mcState.annualRate;
  recalculateMortgage();
}

// Redirect to properties with price range based on calculated price
function applyMortgageToProperties() {
  const minP = Math.round(mcState.price * 0.75);
  const maxP = Math.round(mcState.price * 1.25);
  window.location.href = `properties.html?type=للبيع&minPrice=${minP}&maxPrice=${maxP}`;
}

// Mortgage Lead Submission
function handleMortgageLeadSubmit(e) {
  if (e) e.preventDefault();
  if (typeof showToast === 'function') {
    showToast('تم تقديم طلبك بنجاح! سيتواصل معك مستشار التمويل العقاري المعتمد خلال 24 ساعة.', 'check');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  recalculateMortgage();
});
