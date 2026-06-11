// Mobile navigation drawer toggle
function toggleMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!toggleBtn || !drawer) return;
  
  toggleBtn.classList.toggle('open');
  drawer.classList.toggle('open');
}

// Toast Notification System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-root');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  // Icon select based on type
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg class="toast-icon" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg class="toast-icon" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`;
  } else {
    iconSvg = `<svg class="toast-icon" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  }

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation frame
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Auto remove after 3s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Add Dynamic Vault record animation
function addVisualRecord(text, typeLabel) {
  const activeVisual = document.querySelector('.space-panel.active .space-visual');
  if (!activeVisual) return;
  
  let displayText = text;
  if (displayText.length > 40) {
    displayText = displayText.substring(0, 38) + '...';
  }
  
  const fileRow = document.createElement('div');
  fileRow.className = 'file-row animate-fadeInUp';
  fileRow.style.background = 'rgba(244, 63, 94, 0.08)';
  fileRow.style.transition = 'background 1.5s ease';
  
  let iconSvg = `<svg class="file-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`;
  if (typeLabel.includes('LİNK')) {
    iconSvg = `<svg class="file-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 002.502-2.502m0 0l.228-.228m-2.228 2.228l-2.228 2.228m-1.414-1.414l2.228-2.228m0 0L14.657 5.343a4 4 0 015.656 5.656L18 13"/></svg>`;
  } else if (typeLabel.includes('KOMUT')) {
    iconSvg = `<svg class="file-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`;
  } else if (typeLabel.includes('OKUL') || typeLabel.includes('MATERYAL')) {
    iconSvg = `<svg class="file-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>`;
  }
  
  fileRow.innerHTML = `
    ${iconSvg}
    <span class="file-name">${escapeHTML(displayText)}</span>
    <span class="file-meta" style="color: var(--accent); font-weight: 600;">Eklendi ✓</span>
  `;
  
  const header = activeVisual.querySelector('.visual-header');
  if (header) {
    header.parentNode.insertBefore(fileRow, header.nextSibling);
  } else {
    activeVisual.appendChild(fileRow);
  }
  
  setTimeout(() => {
    fileRow.style.background = 'transparent';
    const meta = fileRow.querySelector('.file-meta');
    if (meta) {
      meta.textContent = 'SQLite Kasa';
      meta.style.color = 'var(--text-tertiary)';
      meta.style.fontWeight = '400';
    }
  }, 1500);
}

// SIMULATOR PRESETS DATA
const PRESETS = {
  link: {
    text: "https://github.com/bekircan/data-structures-notes",
    kind: "link",
    source: "clipboard",
    sourceLabel: "Kopyaladın",
    recLabel: "Link olarak önerilecek",
    tagLabel: "LİNK"
  },
  file: {
    text: "syllabus_database_systems_2026.pdf",
    kind: "academic_material_candidate",
    source: "folder_watcher",
    sourceLabel: "İndirilenler",
    recLabel: "Okul materyali olabilir",
    tagLabel: "OKUL MATERYALİ"
  },
  command: {
    text: "docker compose up -d",
    kind: "command",
    source: "clipboard",
    sourceLabel: "Kopyaladın",
    recLabel: "Komut olarak onay bekleyecek",
    tagLabel: "KOMUT"
  },
  task: {
    text: "Vize 2 ödev teslimini yükle",
    kind: "task",
    source: "quick_capture",
    sourceLabel: "Hızlı not",
    recLabel: "Görev olarak önerilecek",
    tagLabel: "GÖREV"
  }
};

// LOAD PRESET
function loadPreset(presetType) {
  const preset = PRESETS[presetType];
  if (!preset) return;
  
  const textarea = document.getElementById('custom-capture-text');
  textarea.value = preset.text;
  
  // Directly trigger capture to make the simulator instantly responsive
  triggerCapture(preset);
}

// HEURISTIC AUTOMATION CLASSIFICATION (Matches desktop app logic in uxCopy.ts)
function classifyInput(text) {
  const normalized = text.toLowerCase().trim();
  
  if (normalized.startsWith('http://') || normalized.startsWith('https://') || normalized.includes('www.')) {
    return {
      kind: "link",
      sourceLabel: "Kopyaladın",
      recLabel: "Link olarak önerilecek",
      tagLabel: "LİNK",
      tagClass: "tag-link"
    };
  }
  
  if (normalized.endsWith('.pdf') || normalized.endsWith('.docx') || normalized.endsWith('.pptx') || normalized.includes('syllabus') || normalized.includes('slayt') || normalized.includes('ders notu')) {
    return {
      kind: "academic_material_candidate",
      sourceLabel: "İndirilenler",
      recLabel: "Okul materyali olabilir",
      tagLabel: "OKUL MATERYALİ",
      tagClass: "tag-school"
    };
  }
  
  if (normalized.startsWith('docker') || normalized.startsWith('git ') || normalized.startsWith('npm ') || normalized.startsWith('cargo ') || normalized.includes('run ') || normalized.includes('sudo ')) {
    return {
      kind: "command",
      sourceLabel: "Kopyaladın",
      recLabel: "Komut olarak onay bekleyecek",
      tagLabel: "KOMUT",
      tagClass: "tag-note" // code block styling
    };
  }
  
  if (normalized.includes('ödev') || normalized.includes('vize') || normalized.includes('final') || normalized.includes('yapılacak') || normalized.includes('teslim') || normalized.includes('hazırla') || normalized.includes('tamamla')) {
    return {
      kind: "task",
      sourceLabel: "Hızlı not",
      recLabel: "Görev olarak önerilecek",
      tagLabel: "GÖREV",
      tagClass: "tag-task"
    };
  }
  
  return {
    kind: "note",
    sourceLabel: "Hızlı not",
    recLabel: "Not olarak önerilecek",
    tagLabel: "NOT",
    tagClass: "tag-note"
  };
}

// TRIGGER CAPTURE ANIMATION & CARD CREATION
function triggerCapture(presetData = null) {
  const textarea = document.getElementById('custom-capture-text');
  const text = textarea.value.trim();
  
  if (!text) {
    showToast("Lütfen bir metin girin veya hazır butonları kullanın.", "error");
    return;
  }
  
  const inbox = document.getElementById('sim-inbox');
  const emptyState = document.getElementById('sim-empty');
  
  // Hide empty state
  if (emptyState) {
    emptyState.style.display = 'none';
  }
  
  // Classify
  let classification;
  if (presetData) {
    classification = {
      sourceLabel: presetData.sourceLabel,
      recLabel: presetData.recLabel,
      tagLabel: presetData.tagLabel,
      tagClass: presetData.kind === 'link' ? 'tag-link' : 
                 presetData.kind === 'academic_material_candidate' ? 'tag-school' :
                 presetData.kind === 'task' ? 'tag-task' : 'tag-note'
    };
  } else {
    classification = classifyInput(text);
  }
  
  // Clear textarea immediately
  textarea.value = '';
  
  // Create unique ID for loader and card
  const loaderId = 'loader-' + Date.now();
  const cardId = 'captured-card-' + Date.now();
  
  // Create Skeleton Loader
  const loader = document.createElement('div');
  loader.className = 'skeleton-loader';
  loader.id = loaderId;
  loader.innerHTML = `
    <div class="skeleton-header-row">
      <div class="skeleton-bar skeleton-bar-tag"></div>
      <div class="skeleton-bar skeleton-bar-source"></div>
    </div>
    <div class="skeleton-bar skeleton-bar-line1"></div>
    <div class="skeleton-bar skeleton-bar-line2"></div>
    <div class="skeleton-bar-status">AI Sınıflandırıyor...</div>
  `;
  
  // Insert loader at top of inbox
  inbox.insertBefore(loader, inbox.firstChild);
  
  // Toast alerting classification progress
  showToast(`Otomasyon algıladı: "${classification.sourceLabel}" verisi yapay zeka ile analiz ediliyor...`, 'info');
  
  // Simulated processing delay
  setTimeout(() => {
    // Remove loader
    const loaderElem = document.getElementById(loaderId);
    if (loaderElem) loaderElem.remove();
    
    // Create Card Element
    const card = document.createElement('div');
    card.className = 'captured-card';
    card.id = cardId;
    
    card.innerHTML = `
      <div class="card-top">
        <div class="card-meta">
          <span class="card-tag ${classification.tagClass}">${classification.tagLabel}</span>
          <span class="card-source">${classification.sourceLabel}</span>
        </div>
      </div>
      <div class="card-body">${escapeHTML(text)}</div>
      <div class="card-recommendation">
        <span class="rec-dot"></span>
        <span>${classification.recLabel}</span>
      </div>
      <div class="card-actions">
        <button class="action-btn action-btn-primary" onclick="saveToVault('${cardId}')">Kasaya Kaydet</button>
        <button class="action-btn action-btn-secondary" onclick="discardCaptured('${cardId}')">Yoksay</button>
      </div>
    `;
    
    // Insert card at top of inbox
    inbox.insertBefore(card, inbox.firstChild);
    
    // Success toast
    showToast(`Veri başarıyla sınıflandırıldı: ${classification.tagLabel}`, 'success');
  }, 750);
}

// SAVE TO VAULT SIMULATION
function saveToVault(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  
  card.style.transform = 'scale(0.95) translateY(-10px)';
  card.style.opacity = '0';
  card.style.transition = 'all 0.3s ease';
  
  setTimeout(() => {
    const textElem = card.querySelector('.card-body');
    const tagElem = card.querySelector('.card-tag');
    
    const text = textElem ? textElem.textContent : '';
    const tag = tagElem ? tagElem.textContent : 'NOT';
    
    card.remove();
    checkInboxEmpty();
    
    // Dynamic record addition
    addVisualRecord(text, tag);
  }, 300);
  
  showToast("Kayıt güvenli yerel SQLite veritabanına kaydedildi!", "success");
}

// DISCARD CAPTURED SIMULATION
function discardCaptured(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  
  card.style.transform = 'scale(0.95) translateY(10px)';
  card.style.opacity = '0';
  card.style.transition = 'all 0.3s ease';
  
  setTimeout(() => {
    card.remove();
    checkInboxEmpty();
  }, 300);
  
  showToast("Kayıt otomasyon havuzundan silindi.", "info");
}

// CHECK IF INBOX IS EMPTY
function checkInboxEmpty() {
  const inbox = document.getElementById('sim-inbox');
  const emptyState = document.getElementById('sim-empty');
  
  // Check if any cards exist
  const cards = inbox.querySelectorAll('.captured-card');
  if (cards.length === 0 && emptyState) {
    emptyState.style.display = 'flex';
  }
}

// SWITCH SPACE PANELS
function switchSpace(spaceKey, triggerElement) {
  // Hide all panels
  const panels = document.querySelectorAll('.space-panel');
  panels.forEach(panel => panel.classList.remove('active'));
  
  // Deactivate all triggers
  const triggers = document.querySelectorAll('.tab-trigger');
  triggers.forEach(trigger => trigger.classList.remove('active'));
  
  // Activate selected panel
  const activePanel = document.getElementById(`space-${spaceKey}`);
  if (activePanel) activePanel.classList.add('active');
  
  // Activate clicked trigger
  if (triggerElement) triggerElement.classList.add('active');
}

// LICENSE KEY SIMULATOR VERIFICATION
function verifyLicenseKey() {
  const keyInput = document.getElementById('license-key-input');
  const licenseKey = keyInput.value.trim().toUpperCase();
  
  if (!licenseKey) {
    showToast("Lütfen lisans anahtarınızı girin.", "error");
    return;
  }
  
  // Pattern: PRO-XXXX-XXXX (Letters & Numbers)
  const pattern = /^PRO-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  
  if (pattern.test(licenseKey) || licenseKey === "PRO-2026-OKUL" || licenseKey === "PRO-DEMO-TEST") {
    // Pro card styling
    const proCard = document.getElementById('pro-card');
    if (proCard) {
      proCard.classList.add('pricing-card-pro-active');
      proCard.style.borderColor = '#10B981'; // Green accent
      proCard.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.3)';
      
      const proBadge = proCard.querySelector('.pricing-card-pro::before');
      if (proBadge) {
        proBadge.textContent = 'LİSANSLI';
        proBadge.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
      }
    }
    
    // Change price text
    const priceVal = document.getElementById('pro-price-val');
    if (priceVal) {
      priceVal.innerHTML = 'AKTİF <span style="color: #10B981">✓ Pro Sürüm</span>';
    }
    
    // Toast
    showToast("Tebrikler! Pusula Pro lisansınız başarıyla aktif edildi. Masaüstü otomasyon sınırları kaldırıldı.", "success");
    
    // Notice text
    const notice = document.querySelector('#license-simulator .verify-notice');
    if (notice) {
      notice.innerHTML = '<strong style="color: #10B981;">Lisans doğrulandı!</strong> Bu tarayıcıdaki deneme oturumunuz başarıyla Pro olarak eşleştirildi.';
    }
  } else {
    showToast("Lisans anahtarı doğrulanamadı. Lütfen 'PRO-XXXX-XXXX' formatında girin.", "error");
  }
}

// EARLY ACCESS FORM
function handleEarlyAccess(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('early-access-email');
  const email = emailInput.value.trim();
  
  if (!email) return;
  
  showToast("Kayıt oluşturuluyor...", "info");
  
  setTimeout(() => {
    showToast(`Teşekkürler! ${email} başarıyla erken erişim listesine eklendi.`, "success");
    emailInput.value = '';
  }, 1000);
}

// DOWNLOAD TRIGGER
function simulateDownload() {
  showToast("Pusula v1.0.0 (Windows x64 Installer) indirilmesi başlatılıyor...", "info");
  
  // Trigger download immediately within user gesture to bypass browser security blocks
  const link = document.createElement('a');
  link.href = 'downloads/Pusula_x64-setup.exe';
  link.download = 'Pusula_x64-setup.exe';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  setTimeout(() => {
    showToast("İndirme başladı! Lütfen kurulumdan sonra SQLite veritabanı kilit şifresini belirleyin.", "success");
  }, 1200);
}

// HTML ESCAPE HELPER
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Toggle FAQ item visibility (Accordion)
function toggleFaq(btnElement) {
  const faqItem = btnElement.parentElement;
  if (!faqItem) return;
  
  const faqAnswer = faqItem.querySelector('.faq-answer');
  if (!faqAnswer) return;
  
  const isActive = faqItem.classList.contains('active');
  
  // Close all other FAQ items first
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(item => {
    item.classList.remove('active');
    const answer = item.querySelector('.faq-answer');
    if (answer) answer.style.maxHeight = null;
  });
  
  // Toggle the clicked one
  if (!isActive) {
    faqItem.classList.add('active');
    faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
  }
}
