function initializeClientDatabaseTabs() {
    console.log('Initializing client database tabs...');
    
    const tabButtons = document.querySelectorAll('.customer-tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('clientPageTitle');
    const addBtnText = document.getElementById('addBtnText');
    
    if (tabButtons.length === 0) {
        console.error('Tab buttons not found!');
        return;
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the tab data attribute
            const tabId = this.getAttribute('data-tab');
            const tabText = this.textContent.trim();
            
            console.log('Tab clicked:', tabText);
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active');
            } else {
                console.error('Tab content not found for:', tabId);
            }
            
            // Update page title
            if (pageTitle) {
                pageTitle.textContent = tabText;
            }
            
            // Update button text based on tab
            if (addBtnText) {
                switch(tabId) {
                    case 'meeting-details':
                        addBtnText.textContent = 'Add Meeting';
                        break;
                    case 'report-details':
                    case 'report-database':
                        addBtnText.textContent = 'Add Report';
                        break;
                    default:
                        addBtnText.textContent = 'Add customer';
                }
            }
        });
    });
    
    console.log('Client database tabs initialized successfully!');
}
