// ==================== SIMPLE ATTENDANCE SYSTEM ====================

console.log('📝 Loading attendance.js...');

// Simple state
let attendanceState = {
    isLoggedIn: false,
    loginTime: null,
    loginTimestamp: null
};

// Load state
function loadState() {
    const saved = localStorage.getItem('attendanceState');
    if (saved) {
        try {
            attendanceState = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading:', e);
        }
    }
}

// Save state
function saveState() {
    localStorage.setItem('attendanceState', JSON.stringify(attendanceState));
}

// ==================== TIMER ====================

let timerInterval = null;

function startTimer() {
    stopTimer();
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimer() {
    const timer = document.getElementById('attendanceTimer');
    if (!timer) return;
    
    // Show current time with AM/PM
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    
    timer.textContent = `${h}:${m}:${s} ${ap}`;
}

// ==================== TIME HELPERS ====================

function getTime() {
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ap}`;
}

function getDate() {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const y = now.getFullYear();
    return `${d}-${m}-${y}`;
}

// ==================== UPDATE FIELDS ====================

function updateFields() {
    const date = document.getElementById('attendanceDate');
    const login = document.getElementById('loginTime');
    const actionIn = document.getElementById('actionIn');
    const actionOut = document.getElementById('actionOut');
    
    if (date) date.value = getDate();
    if (login) login.value = attendanceState.loginTime || '--:-- --';
    
    if (attendanceState.isLoggedIn) {
        if (actionOut) actionOut.checked = true;
    } else {
        if (actionIn) actionIn.checked = true;
    }
}

// ==================== SHOW SUCCESS ====================

function showSuccess(message) {
    const popup = document.getElementById('attendanceSuccessNotification');
    const text = document.getElementById('attendanceSuccessText');
    
    if (popup && text) {
        text.textContent = message;
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 3000);
    }
}

// ==================== SUBMIT ====================

function submit() {
    const actionIn = document.getElementById('actionIn');
    const actionOut = document.getElementById('actionOut');
    const type = document.getElementById('attendanceType');
    const login = document.getElementById('loginTime');
    
    if (!actionIn || !actionOut || !type) return;
    
    const time = getTime();
    const session = type.value;
    
    if (actionIn.checked) {
        // LOGIN
        attendanceState.isLoggedIn = true;
        attendanceState.loginTime = time;
        attendanceState.loginTimestamp = Date.now();
        
        if (login) login.value = time;
        saveState();
        closeModal();
        showSuccess(`${session} Login Successful`);
        
    } else if (actionOut.checked) {
        // LOGOUT
        attendanceState.isLoggedIn = false;
        saveState();
        closeModal();
        showSuccess(`${session} Logout Successful`);
    }
}

// ==================== MODAL ====================

function openModal() {
    const modal = document.getElementById('attendanceModal');
    if (modal) {
        modal.classList.add('active');
        updateFields();
        startTimer();
    }
}

function closeModal() {
    const modal = document.getElementById('attendanceModal');
    if (modal) {
        modal.classList.remove('active');
        stopTimer();
    }
}

// ==================== INIT ====================

function init() {
    console.log('🚀 Init attendance...');
    loadState();
    
    const btn = document.querySelector('.attendance-btn');
    const close = document.getElementById('attendanceCloseBtn');
    const cancel = document.getElementById('attendanceCancelBtn');
    const submitBtn = document.getElementById('attendanceSubmitBtn');
    const type = document.getElementById('attendanceType');
    const modal = document.getElementById('attendanceModal');

    if (btn) btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    if (close) close.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });
    
    if (cancel) cancel.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    if (submitBtn) submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        submit();
    });

    if (type) type.addEventListener('change', updateFields);

    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    console.log('✅ Attendance ready');
}

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
} else {
    setTimeout(init, 500);
}

console.log('✅ attendance.js loaded');
