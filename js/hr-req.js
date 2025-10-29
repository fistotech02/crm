// ==================== HR REQUESTS & HISTORY - COMPLETE JAVASCRIPT ====================

// ==================== FAKE DATA FOR REQUESTS ====================

// Leave Requests Data (Pending requests)
const leaveRequestsData = [
    {
        name: "RENGOKU",
        designation: "Team Head",
        jobRole: "On role",
        fromDate: "25 OCT 2025",
        toDate: "26 OCT 2025",
        reason: "Personal Work"
    },
    {
        name: "TANJIRO",
        designation: "Frontend Developer",
        jobRole: "On role",
        fromDate: "27 OCT 2025",
        toDate: "28 OCT 2025",
        reason: "Family Function"
    },
    {
        name: "ZENITSU",
        designation: "UI Designer",
        jobRole: "Intern",
        fromDate: "29 OCT 2025",
        toDate: "30 OCT 2025",
        reason: "Medical Emergency"
    },
    {
        name: "INOSUKE",
        designation: "Backend Developer",
        jobRole: "On role",
        fromDate: "01 NOV 2025",
        toDate: "03 NOV 2025",
        reason: "Vacation"
    },
    {
        name: "NEZUKO",
        designation: "QA Tester",
        jobRole: "Intern",
        fromDate: "05 NOV 2025",
        toDate: "06 NOV 2025",
        reason: "Wedding Ceremony"
    }
];

// Permission Requests Data (Pending requests)
const permissionRequestsData = [
    {
        name: "RENGOKU",
        designation: "Team Head",
        jobRole: "On role",
        date: "25 OCT 2025",
        fromTime: "10 AM",
        toTime: "11 AM",
        reason: "Doctor Appointment"
    },
    {
        name: "TANJIRO",
        designation: "Frontend Developer",
        jobRole: "On role",
        date: "25 OCT 2025",
        fromTime: "02 PM",
        toTime: "03 PM",
        reason: "Bank Work"
    },
    {
        name: "ZENITSU",
        designation: "UI Designer",
        jobRole: "Intern",
        date: "26 OCT 2025",
        fromTime: "11 AM",
        toTime: "12 PM",
        reason: "Personal Work"
    },
    {
        name: "INOSUKE",
        designation: "Backend Developer",
        jobRole: "On role",
        date: "26 OCT 2025",
        fromTime: "03 PM",
        toTime: "04 PM",
        reason: "Vehicle Service"
    },
    {
        name: "NEZUKO",
        designation: "QA Tester",
        jobRole: "Intern",
        date: "27 OCT 2025",
        fromTime: "01 PM",
        toTime: "02 PM",
        reason: "Shopping"
    },
    {
        name: "GIYU",
        designation: "Project Manager",
        jobRole: "On role",
        date: "27 OCT 2025",
        fromTime: "10 AM",
        toTime: "11 AM",
        reason: "Client Meeting"
    }
];

// Leave History Data (Accepted/Rejected requests)
const leaveHistoryData = [
    {
        name: "RENGOKU",
        designation: "Team Head",
        jobRole: "On role",
        fromDate: "20 OCT 2025",
        toDate: "21 OCT 2025",
        reason: "Personal Work",
        decision: "ACCEPTED"
    },
    {
        name: "TANJIRO",
        designation: "Frontend Developer",
        jobRole: "On role",
        fromDate: "18 OCT 2025",
        toDate: "19 OCT 2025",
        reason: "Family Function",
        decision: "REJECTED"
    },
    {
        name: "ZENITSU",
        designation: "UI Designer",
        jobRole: "Intern",
        fromDate: "15 OCT 2025",
        toDate: "16 OCT 2025",
        reason: "Medical Emergency",
        decision: "ACCEPTED"
    },
    {
        name: "INOSUKE",
        designation: "Backend Developer",
        jobRole: "On role",
        fromDate: "12 OCT 2025",
        toDate: "14 OCT 2025",
        reason: "Wedding Ceremony",
        decision: "REJECTED"
    },
    {
        name: "NEZUKO",
        designation: "QA Tester",
        jobRole: "Intern",
        fromDate: "10 OCT 2025",
        toDate: "11 OCT 2025",
        reason: "Vacation",
        decision: "ACCEPTED"
    },
    {
        name: "GIYU",
        designation: "Project Manager",
        jobRole: "On role",
        fromDate: "08 OCT 2025",
        toDate: "09 OCT 2025",
        reason: "Conference",
        decision: "ACCEPTED"
    }
];

// Permission History Data (Accepted/Rejected requests)
const permissionHistoryData = [
    {
        name: "RENGOKU",
        designation: "Team Head",
        jobRole: "On role",
        date: "23 OCT 2025",
        fromTime: "10 AM",
        toTime: "11 AM",
        reason: "Doctor Appointment",
        decision: "ACCEPTED"
    },
    {
        name: "TANJIRO",
        designation: "Frontend Developer",
        jobRole: "On role",
        date: "22 OCT 2025",
        fromTime: "02 PM",
        toTime: "03 PM",
        reason: "Bank Work",
        decision: "REJECTED"
    },
    {
        name: "ZENITSU",
        designation: "UI Designer",
        jobRole: "Intern",
        date: "21 OCT 2025",
        fromTime: "11 AM",
        toTime: "12 PM",
        reason: "Personal Work",
        decision: "ACCEPTED"
    },
    {
        name: "INOSUKE",
        designation: "Backend Developer",
        jobRole: "On role",
        date: "20 OCT 2025",
        fromTime: "03 PM",
        toTime: "04 PM",
        reason: "Vehicle Service",
        decision: "ACCEPTED"
    },
    {
        name: "NEZUKO",
        designation: "QA Tester",
        jobRole: "Intern",
        date: "19 OCT 2025",
        fromTime: "01 PM",
        toTime: "02 PM",
        reason: "Shopping",
        decision: "REJECTED"
    },
    {
        name: "GIYU",
        designation: "Project Manager",
        jobRole: "On role",
        date: "18 OCT 2025",
        fromTime: "10 AM",
        toTime: "11 AM",
        reason: "Client Meeting",
        decision: "ACCEPTED"
    }
];


// ==================== POPULATE REQUESTS TABLES ====================

function populateLeaveRequests() {
    const tableBody = document.getElementById('leaveRequestsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (leaveRequestsData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: #999;">
                    No pending leave requests
                </td>
            </tr>
        `;
        return;
    }
    
    leaveRequestsData.forEach((request, index) => {
        const row = document.createElement('tr');
        const jobRoleBadgeClass = request.jobRole === 'On role' ? 'hr-job-role-onrole' : 'hr-job-role-intern';
        const initial = request.name.charAt(0).toUpperCase();
        
        row.innerHTML = `
            <td data-label="Employee Name">
                <div class="hr-employee-name-cell">
                    <div class="hr-employee-avatar">
                        <div class="hr-avatar-placeholder">${initial}</div>
                    </div>
                    <span>${request.name}</span>
                </div>
            </td>
            <td data-label="Designation">${request.designation}</td>
            <td data-label="Job Role">
                <span class="hr-job-role-badge ${jobRoleBadgeClass}">${request.jobRole}</span>
            </td>
            <td data-label="From Date">${request.fromDate}</td>
            <td data-label="To Date">${request.toDate}</td>
            <td data-label="Reason">${request.reason}</td>
            <td data-label="Decision">
                <div class="hr-decision-buttons">
                    <button class="hr-btn-accept" onclick="handleLeaveRequest(this, 'accept', ${index})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        ACCEPT
                    </button>
                    <button class="hr-btn-reject" onclick="handleLeaveRequest(this, 'reject', ${index})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        REJECT
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    console.log(`✓ Populated ${leaveRequestsData.length} leave requests`);
}

function populatePermissionRequests() {
    const tableBody = document.getElementById('permissionRequestsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (permissionRequestsData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #999;">
                    No pending permission requests
                </td>
            </tr>
        `;
        return;
    }
    
    permissionRequestsData.forEach((request, index) => {
        const row = document.createElement('tr');
        const jobRoleBadgeClass = request.jobRole === 'On role' ? 'hr-job-role-onrole' : 'hr-job-role-intern';
        const initial = request.name.charAt(0).toUpperCase();
        
        row.innerHTML = `
            <td data-label="Employee Name">
                <div class="hr-employee-name-cell">
                    <div class="hr-employee-avatar">
                        <div class="hr-avatar-placeholder">${initial}</div>
                    </div>
                    <span>${request.name}</span>
                </div>
            </td>
            <td data-label="Designation">${request.designation}</td>
            <td data-label="Job Role">
                <span class="hr-job-role-badge ${jobRoleBadgeClass}">${request.jobRole}</span>
            </td>
            <td data-label="Date">${request.date}</td>
            <td data-label="From Time">${request.fromTime}</td>
            <td data-label="To Time">${request.toTime}</td>
            <td data-label="Reason">${request.reason}</td>
            <td data-label="Decision">
                <div class="hr-decision-buttons">
                    <button class="hr-btn-accept" onclick="handlePermissionRequest(this, 'accept', ${index})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        ACCEPT
                    </button>
                    <button class="hr-btn-reject" onclick="handlePermissionRequest(this, 'reject', ${index})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        REJECT
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    console.log(`✓ Populated ${permissionRequestsData.length} permission requests`);
}


// ==================== HANDLE REQUEST ACTIONS ====================

function handleLeaveRequest(button, action, index) {
    const row = button.closest('tr');
    const request = leaveRequestsData[index];
    
    if (action === 'accept') {
        row.style.background = '#d4f4dd';
        leaveHistoryData.unshift({ ...request, decision: "ACCEPTED" });
        alert(`✓ Leave request ACCEPTED for ${request.name}\nFrom: ${request.fromDate}\nTo: ${request.toDate}`);
        
        setTimeout(() => {
            leaveRequestsData.splice(index, 1);
            populateLeaveRequests();
        }, 1000);
        
    } else {
        row.style.background = '#fee2e2';
        leaveHistoryData.unshift({ ...request, decision: "REJECTED" });
        alert(`✗ Leave request REJECTED for ${request.name}\nFrom: ${request.fromDate}\nTo: ${request.toDate}`);
        
        setTimeout(() => {
            leaveRequestsData.splice(index, 1);
            populateLeaveRequests();
        }, 1000);
    }
}

function handlePermissionRequest(button, action, index) {
    const row = button.closest('tr');
    const request = permissionRequestsData[index];
    
    if (action === 'accept') {
        row.style.background = '#d4f4dd';
        permissionHistoryData.unshift({ ...request, decision: "ACCEPTED" });
        alert(`✓ Permission request ACCEPTED for ${request.name}\nDate: ${request.date}\nTime: ${request.fromTime} - ${request.toTime}`);
        
        setTimeout(() => {
            permissionRequestsData.splice(index, 1);
            populatePermissionRequests();
        }, 1000);
        
    } else {
        row.style.background = '#fee2e2';
        permissionHistoryData.unshift({ ...request, decision: "REJECTED" });
        alert(`✗ Permission request REJECTED for ${request.name}\nDate: ${request.date}\nTime: ${request.fromTime} - ${request.toTime}`);
        
        setTimeout(() => {
            permissionRequestsData.splice(index, 1);
            populatePermissionRequests();
        }, 1000);
    }
}


// ==================== CREATE HISTORY VIEW DYNAMICALLY ====================

let currentHistoryView = 'leave';

function createHistoryHTML() {
    return `
        <div class="hr-history-container">
            <!-- TOP NAVIGATION BAR -->
            <div class="hr-history-nav">
                <button id="backToRequestBtn" class="btn-back">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Back To Request
                </button>

                <button id="historyToggleBtn" class="btn-toggle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span id="historyToggleBtnText">Permission History</span>
                </button>
            </div>

            <!-- LEAVE HISTORY SECTION -->
            <div id="leaveHistorySection" class="hr-history-section active">
                <h3 class="hr-section-title">Leave Requests</h3>
                <div class="hr-requests-table-container">
                    <table class="hr-requests-table">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Designation</th>
                                <th>Job Role</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Reason</th>
                                <th>Decision</th>
                            </tr>
                        </thead>
                        <tbody id="leaveHistoryTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- PERMISSION HISTORY SECTION -->
            <div id="permissionHistorySection" class="hr-history-section">
                <h3 class="hr-section-title">Permission Requests</h3>
                <div class="hr-requests-table-container">
                    <table class="hr-requests-table">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Designation</th>
                                <th>Job Role</th>
                                <th>Date</th>
                                <th>From Time</th>
                                <th>To Time</th>
                                <th>Reason</th>
                                <th>Decision</th>
                            </tr>
                        </thead>
                        <tbody id="permissionHistoryTableBody"></tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function showHistoryPage() {
    console.log('📜 Showing history page...');
    
    const requestsContainer = document.querySelector('.hr-requests-container');
    if (!requestsContainer) {
        console.error('❌ Requests container not found');
        return;
    }
    
    // Save original content
    if (!window.originalRequestsHTML) {
        window.originalRequestsHTML = requestsContainer.innerHTML;
    }
    
    // Replace with history view
    requestsContainer.innerHTML = createHistoryHTML();
    
    // Populate history tables
    populateLeaveHistory();
    populatePermissionHistory();
    
    // Attach event listeners
    setupHistoryEventListeners();
    
    console.log('✅ History page displayed');
}

function showRequestsPage() {
    console.log('📋 Showing requests page...');
    
    const requestsContainer = document.querySelector('.hr-requests-container');
    if (!requestsContainer) {
        console.error('❌ Requests container not found');
        return;
    }
    
    // Restore original content
    if (window.originalRequestsHTML) {
        requestsContainer.innerHTML = window.originalRequestsHTML;
        
        // Re-populate request tables
        populateLeaveRequests();
        populatePermissionRequests();
        
        // Re-attach history button event
        initializeHistoryButton();
    }
    
    console.log('✅ Requests page displayed');
}

function setupHistoryEventListeners() {
    // Back button
    const backBtn = document.getElementById('backToRequestBtn');
    if (backBtn) {
        backBtn.addEventListener('click', showRequestsPage);
    }
    
    // Toggle button
    const toggleBtn = document.getElementById('historyToggleBtn');
    const toggleBtnText = document.getElementById('historyToggleBtnText');
    const leaveSection = document.getElementById('leaveHistorySection');
    const permissionSection = document.getElementById('permissionHistorySection');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            if (currentHistoryView === 'leave') {
                leaveSection.classList.remove('active');
                permissionSection.classList.add('active');
                toggleBtnText.textContent = 'Leave History';
                currentHistoryView = 'permission';
                console.log('✓ Switched to Permission History');
            } else {
                permissionSection.classList.remove('active');
                leaveSection.classList.add('active');
                toggleBtnText.textContent = 'Permission History';
                currentHistoryView = 'leave';
                console.log('✓ Switched to Leave History');
            }
        });
    }
}


// ==================== POPULATE HISTORY TABLES ====================

function populateLeaveHistory() {
    const tableBody = document.getElementById('leaveHistoryTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (leaveHistoryData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: #999;">
                    No leave request history
                </td>
            </tr>
        `;
        return;
    }
    
    leaveHistoryData.forEach((request) => {
        const row = document.createElement('tr');
        const jobRoleBadgeClass = request.jobRole === 'On role' ? 'hr-job-role-onrole' : 'hr-job-role-intern';
        const decisionClass = request.decision === 'ACCEPTED' ? 'hr-decision-accepted' : 'hr-decision-rejected';
        const decisionIcon = request.decision === 'ACCEPTED'
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        const initial = request.name.charAt(0).toUpperCase();
        
        row.innerHTML = `
            <td data-label="Employee Name">
                <div class="hr-employee-name-cell">
                    <div class="hr-employee-avatar">
                        <div class="hr-avatar-placeholder">${initial}</div>
                    </div>
                    <span>${request.name}</span>
                </div>
            </td>
            <td data-label="Designation">${request.designation}</td>
            <td data-label="Job Role">
                <span class="hr-job-role-badge ${jobRoleBadgeClass}">${request.jobRole}</span>
            </td>
            <td data-label="From Date">${request.fromDate}</td>
            <td data-label="To Date">${request.toDate}</td>
            <td data-label="Reason">${request.reason}</td>
            <td data-label="Decision">
                <span class="hr-decision-status ${decisionClass}">
                    ${decisionIcon}
                    ${request.decision}
                </span>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    console.log(`✓ Populated ${leaveHistoryData.length} leave history records`);
}

function populatePermissionHistory() {
    const tableBody = document.getElementById('permissionHistoryTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (permissionHistoryData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #999;">
                    No permission request history
                </td>
            </tr>
        `;
        return;
    }
    
    permissionHistoryData.forEach((request) => {
        const row = document.createElement('tr');
        const jobRoleBadgeClass = request.jobRole === 'On role' ? 'hr-job-role-onrole' : 'hr-job-role-intern';
        const decisionClass = request.decision === 'ACCEPTED' ? 'hr-decision-accepted' : 'hr-decision-rejected';
        const decisionIcon = request.decision === 'ACCEPTED'
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        const initial = request.name.charAt(0).toUpperCase();
        
        row.innerHTML = `
            <td data-label="Employee Name">
                <div class="hr-employee-name-cell">
                    <div class="hr-employee-avatar">
                        <div class="hr-avatar-placeholder">${initial}</div>
                    </div>
                    <span>${request.name}</span>
                </div>
            </td>
            <td data-label="Designation">${request.designation}</td>
            <td data-label="Job Role">
                <span class="hr-job-role-badge ${jobRoleBadgeClass}">${request.jobRole}</span>
            </td>
            <td data-label="Date">${request.date}</td>
            <td data-label="From Time">${request.fromTime}</td>
            <td data-label="To Time">${request.toTime}</td>
            <td data-label="Reason">${request.reason}</td>
            <td data-label="Decision">
                <span class="hr-decision-status ${decisionClass}">
                    ${decisionIcon}
                    ${request.decision}
                </span>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    console.log(`✓ Populated ${permissionHistoryData.length} permission history records`);
}


// ==================== INITIALIZE HISTORY BUTTON ====================

function initializeHistoryButton() {
    const historyBtn = document.getElementById('viewHistoryBtn');
    
    if (historyBtn) {
        historyBtn.addEventListener('click', showHistoryPage);
        console.log('✓ History button initialized');
    }
}


// ==================== MAIN INITIALIZATION ====================

function initializeHRRequests() {
    console.log('🚀 Initializing HR Requests and History...');
    
    // Populate request tables
    populateLeaveRequests();
    populatePermissionRequests();
    
    // Initialize history button
    initializeHistoryButton();
    
    console.log('✅ HR Requests and History fully initialized');
}
