// Daily Reports JavaScript - Frontend Only

// Main initialization function
function initializeDailyReports() {
  console.log("🚀 Initializing Daily Reports...");
  
  const form = document.getElementById('dailyReportForm');
  
  if (!form) {
    console.error("❌ Form not found!");
    return;
  }
  
  // Create modal
  createSuccessModal();
  
  // Set today's date
  setCurrentDate();
  
  // Prevent duplicate initialization
  if (form.dataset.initialized === 'true') {
    return;
  }
  form.dataset.initialized = 'true';
  
  // Form submit handler
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      showSuccessModal();
      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        setCurrentDate();
      }, 2000);
    }
  });
  
  // Reset handler
  form.addEventListener('reset', function() {
    setTimeout(() => setCurrentDate(), 0);
  });
  
  console.log("✅ Daily Reports initialized");
}

// Create modal
function createSuccessModal() {
  const existingModal = document.getElementById('drSuccessModal');
  if (existingModal) existingModal.remove();
  
  const modalHTML = `
    <div id="drSuccessModal" class="dr-modal">
      <div class="dr-modal-overlay"></div>
      <div class="dr-modal-content">
        <div class="dr-success-icon">
          <svg width="60" height="60" viewBox="0 0 52 52">
            <circle class="dr-checkmark-circle" cx="26" cy="26" r="25" fill="none" stroke="#1abc9c" stroke-width="2"/>
            <path class="dr-checkmark-check" fill="none" stroke="#1abc9c" stroke-width="3" stroke-linecap="round" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h2>Success !</h2>
        <p>Daily Report Submitted Successfully</p>
        <button id="drBackToDashboard">← Back to Dashboard</button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Close modal handlers
  document.getElementById('drBackToDashboard').onclick = closeModal;
  document.querySelector('.dr-modal-overlay').onclick = closeModal;
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('drSuccessModal').classList.contains('dr-show')) {
      closeModal();
    }
  });
}

// Set today's date
function setCurrentDate() {
  const dateInput = document.getElementById('drDate');
  if (!dateInput) return;
  
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = today.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = today.getFullYear();
  
  dateInput.value = `${day}-${month}-${year}`;
}

// Validate form
function validateForm() {
  const projectName = document.getElementById('drProjectName')?.value?.trim();
  const hours = document.getElementById('drHours')?.value;
  const workDone = document.getElementById('drWorkDone')?.value?.trim();
  const section = document.querySelector('input[name="drSection"]:checked');
  
  if (!projectName) {
    alert('⚠️ Please enter a project name');
    return false;
  }
  
  if (!hours || hours <= 0) {
    alert('⚠️ Please enter valid hours');
    return false;
  }
  
  if (hours > 24) {
    alert('⚠️ Hours cannot exceed 24');
    return false;
  }
  
  if (!workDone) {
    alert('⚠️ Please describe the work done');
    return false;
  }
  
  if (!section) {
    alert('⚠️ Please select a section');
    return false;
  }
  
  return true;
}

// Show modal
function showSuccessModal() {
  const modal = document.getElementById('drSuccessModal');
  if (modal) {
    modal.classList.add('dr-show');
    document.body.style.overflow = 'hidden';
  }
}

// Close modal
function closeModal() {
  const modal = document.getElementById('drSuccessModal');
  if (modal) {
    modal.classList.remove('dr-show');
    document.body.style.overflow = '';
  }
}

// Export for global access
window.initializeDailyReports = initializeDailyReports;
