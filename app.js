/**
 * Artisan Bakery Review Funnel Engine
 * Built for high-conversion, zero-friction 5-star Google Reviews.
 */

// Configuration
const CONFIG = {
  businessName: "Dakathz Amazing Cakes",
  tagline: "Handcrafted with Butter, Sugar & Love",
  // The Google Business Profile link provided
  googleReviewUrl: "https://share.google/agxZ8Q61Up1gNjKh7",
};

// Curated SEO-Optimized Review Templates
const TEMPLATES = [
  {
    id: "foodie",
    title: "The Gourmet Foodie",
    tag: "Most Popular",
    icon: "🌟",
    snippet: "Hands down the best Home Bakery in Pune! Everything tasted super fresh, rich...",
    text: "Hands down the best Home Bakery in Pune! Everything tasted incredibly fresh, rich, and made with genuine premium ingredients. The sweetness was perfectly balanced. You can truly taste the care and passion in every bite. Highly recommend to anyone looking for authentic home-baked treats!",
    style: "Gourmet Foodie"
  },
  {
    id: "celebration",
    title: "Special Occasion / Cake",
    tag: "Cakes & Events",
    icon: "🎂",
    snippet: "Ordered a custom celebration cake and it stole the show! Moist, stunning and delicious...",
    text: "Ordered a custom cake for our special celebration and it completely stole the show! Not only was the design stunning and artistic, but the sponge was super moist, flavorful, and decadent. All our guests couldn't stop praising it. On-time delivery and lovely warm service. Our new go-to bakery!",
    style: "Celebration Hero"
  },
  {
    id: "quick",
    title: "Short & Sweet",
    tag: "Quick 5★",
    icon: "⚡",
    snippet: "Absolutely delicious and fresh home-baked treats! Melt-in-your-mouth flavor, 10/10...",
    text: "Absolutely delicious and fresh home-baked treats! Melt-in-your-mouth flavor, great presentation, and wonderful friendly service. 10/10 will definitely be ordering again soon! ⭐⭐⭐⭐⭐",
    style: "Short & Punchy"
  },
  {
    id: "eggless",
    title: "Fresh & Wholesome",
    tag: "Fresh Ingredients",
    icon: "🌿",
    snippet: "Finding treats this fresh and moist is so rare. Tastes wholesome, gourmet and authentic...",
    text: "Finding baked treats this fresh, soft, and moist is so rare! It tastes wholesome, gourmet, and baked to pure perfection with top-notch ingredients. Thank you so much for accommodating our custom preferences with such care and warmth!",
    style: "Wholesome & Fresh"
  },
  {
    id: "chocolate",
    title: "Chocoholic's Dream",
    tag: "Rich & Fudgy",
    icon: "🍫",
    snippet: "Out of this world chocolate desserts! Rich, fudgy, decadent and heavenly aroma...",
    text: "The chocolate treats from this home bakery are out of this world! Rich, gooey, decadent, and had the most heavenly aroma. If you are a dessert lover, this is a must-try local home bakery. Five well-deserved stars!",
    style: "Choco Lover"
  },
  {
    id: "custom",
    title: "Write My Own",
    tag: "Custom",
    icon: "✍️",
    snippet: "Start with a blank canvas or combine chips below to write your heartfelt words...",
    text: "",
    style: "Personal Touch"
  }
];

// Interactive Item Chips (Boosts Specific Product Search Ranking)
const ITEM_CHIPS = [
  { icon: "🎂", label: "Custom Cake" },
  { icon: "🍫", label: "Chocolate Cake" },
  { icon: "🧁", label: "Gourmet Cake" },
  { icon: "🍪", label: "Fondant Art Cake" },
  { icon: "🍰", label: "Photo Cake" },
  { icon: "🍓", label: "Fruit Cake" },
];

// Experience Chips (Boosts Quality & Sentiment Keywords)
const FLAVOR_CHIPS = [
  { icon: "🌟", label: "Melt-in-mouth soft" },
  { icon: "🍯", label: "Balanced sweetness" },
  { icon: "✨", label: "Gorgeous design" },
  { icon: "🌿", label: "100% Fresh ingredients" },
  { icon: "🚀", label: "Punctual delivery" },
  { icon: "💖", label: "Made with love" },
  { icon: "🌱", label: "Eggless perfection" },
];

// Tone variations for quick shuffler
const TONE_VARIATIONS = [
  { name: "Gourmet Foodie", prefix: "As someone who loves good desserts: ", suffix: " A true artisanal gem in our area!" },
  { name: "Warm & Heartfelt", prefix: "Such a wonderful home bakery! ", suffix: " Thank you for baking with so much love and care." },
  { name: "Super Excited", prefix: "OMG, absolutely obsessed with these treats! ", suffix: " Can't wait for my next order!" },
  { name: "Short & Sweet", prefix: "Five stars all the way! ", suffix: " Highly recommended to everyone!" }
];

// Application State
let state = {
  activeTemplateId: "foodie",
  selectedItems: new Set(),
  selectedFlavors: new Set(),
  starRating: 5,
  currentToneIdx: 0,
};

// DOM Elements
const templateGrid = document.getElementById("templateGrid");
const itemChipsContainer = document.getElementById("itemChips");
const flavorChipsContainer = document.getElementById("flavorChips");
const reviewInput = document.getElementById("reviewInput");
const charCount = document.getElementById("charCount");
const seoScoreBadge = document.getElementById("seoScoreBadge");
const shuffleToneBtn = document.getElementById("shuffleToneBtn");
const toneName = document.getElementById("toneName");
const postReviewBtn = document.getElementById("postReviewBtn");
const starRatingContainer = document.getElementById("starRatingContainer");

// Modals & Popups
const successModal = document.getElementById("successModal");
const proceedToGoogleBtn = document.getElementById("proceedToGoogleBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const openQrModalBtn = document.getElementById("openQrModalBtn");
const qrModal = document.getElementById("qrModal");
const closeQrModalBtn = document.getElementById("closeQrModalBtn");
const qrCodeContainer = document.getElementById("qrCodeContainer");
const printCardBtn = document.getElementById("printCardBtn");
const copyPageLinkBtn = document.getElementById("copyPageLinkBtn");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");

// Accordion toggle
const tagSectionHeader = document.getElementById("tagSectionHeader");
const tagCustomizerSection = document.getElementById("tagCustomizerSection");

// Initialize Application
function init() {
  renderTemplates();
  renderChips();
  setupEventListeners();
  selectTemplate("foodie");
  updateCharCount();
  setupQrCode();
}

// Render Template Options
function renderTemplates() {
  templateGrid.innerHTML = TEMPLATES.map(tpl => `
    <div class="template-card ${tpl.id === state.activeTemplateId ? 'active' : ''}" data-id="${tpl.id}">
      <div class="template-icon">${tpl.icon}</div>
      <div class="template-details">
        <div class="template-top-row">
          <span class="template-title">${tpl.title}</span>
          <span class="template-tag">${tpl.tag}</span>
        </div>
        <p class="template-snippet">${tpl.snippet}</p>
      </div>
      <div class="template-radio"></div>
    </div>
  `).join("");
}

// Render Chips for Mix & Match
function renderChips() {
  itemChipsContainer.innerHTML = ITEM_CHIPS.map(chip => `
    <button type="button" class="chip" data-label="${chip.label}">
      <span class="chip-icon">${chip.icon}</span>
      <span>${chip.label}</span>
    </button>
  `).join("");

  flavorChipsContainer.innerHTML = FLAVOR_CHIPS.map(chip => `
    <button type="button" class="chip" data-label="${chip.label}">
      <span class="chip-icon">${chip.icon}</span>
      <span>${chip.label}</span>
    </button>
  `).join("");
}

// Setup Event Listeners
function setupEventListeners() {
  // Template Card Click
  templateGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".template-card");
    if (!card) return;
    const tplId = card.getAttribute("data-id");
    selectTemplate(tplId);
  });

  // Accordion Toggle for Step 2
  tagSectionHeader.addEventListener("click", () => {
    tagCustomizerSection.classList.toggle("collapsed");
  });

  // Item Chips Toggle
  itemChipsContainer.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const label = chip.getAttribute("data-label");
    chip.classList.toggle("active");
    if (state.selectedItems.has(label)) {
      state.selectedItems.delete(label);
    } else {
      state.selectedItems.add(label);
    }
    synthesizeFromChips();
  });

  // Flavor Chips Toggle
  flavorChipsContainer.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const label = chip.getAttribute("data-label");
    chip.classList.toggle("active");
    if (state.selectedFlavors.has(label)) {
      state.selectedFlavors.delete(label);
    } else {
      state.selectedFlavors.add(label);
    }
    synthesizeFromChips();
  });

  // Review Textarea Typing
  reviewInput.addEventListener("input", () => {
    updateCharCount();
  });

  // Interactive Stars Selection
  starRatingContainer.addEventListener("click", (e) => {
    const star = e.target.closest(".star");
    if (!star) return;
    const rating = parseInt(star.getAttribute("data-rating"), 10);
    setRating(rating);
  });

  // Tone Shuffler Button
  shuffleToneBtn.addEventListener("click", () => {
    cycleTone();
  });

  // Primary Copy & Redirect CTA Button
  postReviewBtn.addEventListener("click", () => {
    handleReviewAction();
  });

  // Modal Handlers
  proceedToGoogleBtn.addEventListener("click", () => {
    openGoogleBusinessLink();
  });

  closeModalBtn.addEventListener("click", () => {
    successModal.classList.remove("open");
  });

  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) successModal.classList.remove("open");
  });

  // QR Modal Handlers
  openQrModalBtn.addEventListener("click", () => {
    qrModal.classList.add("open");
  });

  closeQrModalBtn.addEventListener("click", () => {
    qrModal.classList.remove("open");
  });

  qrModal.addEventListener("click", (e) => {
    if (e.target === qrModal) qrModal.classList.remove("open");
  });

  // Print and Link copy
  printCardBtn.addEventListener("click", () => {
    window.print();
  });

  copyPageLinkBtn.addEventListener("click", () => {
    copyToClipboard(window.location.href);
    showToast("Page link copied! Share this with customers ✨");
  });

  // Global Escape key dismiss for modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      successModal.classList.remove("open");
      qrModal.classList.remove("open");
    }
  });
}

// Select a Template
function selectTemplate(tplId) {
  state.activeTemplateId = tplId;

  // Highlight active template card
  document.querySelectorAll(".template-card").forEach(card => {
    card.classList.toggle("active", card.getAttribute("data-id") === tplId);
  });

  const tpl = TEMPLATES.find(t => t.id === tplId);
  if (!tpl) return;

  if (tpl.id === "custom") {
    // If custom, keep existing text or provide gentle placeholder
    if (!reviewInput.value.trim()) {
      reviewInput.value = "";
      reviewInput.placeholder = "Write your heartfelt experience here... (e.g. The chocolate cake was phenomenal!)";
    }
  } else {
    reviewInput.value = tpl.text;
  }

  updateCharCount();
}

// Smart Review Synthesizer from Selected Chips
function synthesizeFromChips() {
  if (state.selectedItems.size === 0 && state.selectedFlavors.size === 0) {
    // Revert to selected template if chips are cleared
    const tpl = TEMPLATES.find(t => t.id === state.activeTemplateId);
    if (tpl && tpl.id !== "custom") {
      reviewInput.value = tpl.text;
      updateCharCount();
    }
    return;
  }

  const itemsArr = Array.from(state.selectedItems);
  const flavorsArr = Array.from(state.selectedFlavors);

  let sentence1 = "";
  if (itemsArr.length === 1) {
    sentence1 = `Recently ordered the ${itemsArr[0]} from this wonderful home bakery and it was absolutely delicious!`;
  } else if (itemsArr.length > 1) {
    const lastItem = itemsArr[itemsArr.length - 1];
    const firstItems = itemsArr.slice(0, -1).join(", ");
    sentence1 = `Recently tried their ${firstItems} and ${lastItem} — everything was exceptionally good!`;
  } else {
    sentence1 = `Hands down one of the best artisanal home bakeries I have tried!`;
  }

  let sentence2 = "";
  if (flavorsArr.length === 1) {
    sentence2 = ` What stood out the most was the ${flavorsArr[0].toLowerCase()}.`;
  } else if (flavorsArr.length > 1) {
    sentence2 = ` Loved the ${flavorsArr.slice(0, -1).join(", ").toLowerCase()} and ${flavorsArr[flavorsArr.length - 1].toLowerCase()}.`;
  }

  const conclusion = " Tastes super fresh and baked with genuine passion. Will definitely be a returning customer!";

  reviewInput.value = `${sentence1}${sentence2}${conclusion}`;
  updateCharCount();
}

// Cycle writing style / tone
function cycleTone() {
  state.currentToneIdx = (state.currentToneIdx + 1) % TONE_VARIATIONS.length;
  const currentTone = TONE_VARIATIONS[state.currentToneIdx];
  toneName.textContent = `Style: ${currentTone.name}`;

  let currentText = reviewInput.value.trim();
  if (!currentText) return;

  // Clean previous wrappers if any
  TONE_VARIATIONS.forEach(t => {
    if (currentText.startsWith(t.prefix)) {
      currentText = currentText.replace(t.prefix, "");
    }
    if (currentText.endsWith(t.suffix)) {
      currentText = currentText.replace(t.suffix, "");
    }
  });

  reviewInput.value = `${currentTone.prefix}${currentText}${currentTone.suffix}`;
  updateCharCount();
  showToast(`Applied ${currentTone.name} style!`);
}

// Star Rating Setter
function setRating(rating) {
  state.starRating = rating;
  const stars = starRatingContainer.querySelectorAll(".star");
  stars.forEach((star, index) => {
    star.classList.toggle("active", index < rating);
  });
  const label = starRatingContainer.querySelector(".stars-label");
  if (label) {
    label.textContent = `${rating}.0 Star Rating Selected`;
  }
}

// Update Character Count & SEO Score
function updateCharCount() {
  const text = reviewInput.value.trim();
  const count = text.length;
  charCount.textContent = `${count} characters`;

  // Keywords detector
  const keywords = ["fresh", "cake", "delicious", "bakery", "best", "sweet", "delivery", "eggless", "chocolate"];
  const matched = keywords.filter(kw => text.toLowerCase().includes(kw));

  if (matched.length >= 3) {
    seoScoreBadge.textContent = ``;
    seoScoreBadge.style.color = "#2E7D32";
    seoScoreBadge.style.background = "#E8F5E9";
  } else if (count > 20) {
    seoScoreBadge.textContent = "👍 Good Review Quality";
    seoScoreBadge.style.color = "#D97724";
    seoScoreBadge.style.background = "#FDE8D0";
  } else {
    seoScoreBadge.textContent = "✍️ Write a few words";
    seoScoreBadge.style.color = "#78685C";
    seoScoreBadge.style.background = "#EAE3D9";
  }
}

// Soft Audio Chime (Web Audio API - No external assets required)
function playGentleChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "triangle";

    // Pleasant chord (G5 & C6)
    osc1.frequency.setValueAtTime(783.99, ctx.currentTime);
    osc2.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.08);

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start(ctx.currentTime + 0.08);

    osc1.stop(ctx.currentTime + 0.6);
    osc2.stop(ctx.currentTime + 0.6);
  } catch (err) {
    // Ignore if audio permissions restricted
  }
}

// Confetti Blast Celebration
function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#D97724', '#F5A623', '#E07A5F', '#2C1E18', '#FFE0B2']
    });
  }
}

// Clipboard Copy Helper with robust fallbacks
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers or local test files
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      document.execCommand('copy') ? resolve() : reject();
      textArea.remove();
    });
  }
}

// Main Action: Copy & Open Google Review Flow
function handleReviewAction() {
  const text = reviewInput.value.trim();
  if (!text) {
    showToast("Please pick or write a review first! 🧁");
    reviewInput.focus();
    return;
  }

  // 1. Copy to Clipboard
  copyToClipboard(text)
    .then(() => {
      // 2. Play celebratory sounds & confetti
      playGentleChime();
      triggerConfetti();

      // 3. Open Success Modal
      successModal.classList.add("open");
      showToast("Review copied to clipboard! 📋");

      // 4. Automatically open Google Business page after a brief 1.2s delay so user sees guidance
      setTimeout(() => {
        openGoogleBusinessLink();
      }, 1200);
    })
    .catch(() => {
      // If clipboard failed, still allow redirect
      openGoogleBusinessLink();
    });
}

// Deep-link to Google Review Box
function openGoogleBusinessLink() {
  window.open(CONFIG.googleReviewUrl, "_blank", "noopener,noreferrer");
}

// Show Toast Notification
function showToast(message) {
  toastMsg.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// QR Code Generator
function setupQrCode() {
  const targetUrl = window.location.href;

  if (typeof QRCode !== "undefined" && qrCodeContainer) {
    qrCodeContainer.innerHTML = "";
    new QRCode(qrCodeContainer, {
      text: targetUrl,
      width: 150,
      height: 150,
      colorDark: "#2C1E18",
      colorLight: "#FFFFFF",
      correctLevel: QRCode.CorrectLevel.M
    });
  } else {
    // Fallback visually pleasing QR placeholder if offline
    qrCodeContainer.innerHTML = `
      <div style="font-size:0.75rem; text-align:center; padding: 20px; color:#78685C;">
        <span style="font-size:2rem; display:block;">📱</span>
        Point camera to open review link
      </div>
    `;
  }
}

// Start on DOM ready
document.addEventListener("DOMContentLoaded", init);
