// ==================== HR TABS FUNCTIONALITY ====================
function initializeHRTabs() {
    console.log('Initializing HR tabs...');
    
    const tabButtons = document.querySelectorAll('.hr-tab-btn');
    const tabContents = document.querySelectorAll('.hr-tab-content');
    
    if (tabButtons.length === 0) {
        console.error('HR tab buttons not found!');
        return;
    }
    
    console.log(`Found ${tabButtons.length} tab buttons`);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Tab clicked:', this.textContent.trim());
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the tab data attribute
            const tabId = this.getAttribute('data-tab');
            console.log('Switching to tab:', tabId);
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected tab content
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active');
                console.log('Tab content shown:', tabId);
            } else {
                console.error('Tab content not found for:', tabId);
            }
        });
    });
    
    console.log('HR tabs initialized successfully!');
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeHRTabs();
});

// If you need to call it manually (for dynamic content)
if (typeof window !== 'undefined') {
    window.initializeHRTabs = initializeHRTabs;
}


