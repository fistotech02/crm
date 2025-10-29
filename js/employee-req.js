// Function to initialize employee request page (called from script.js)
function initializeEmployeeRequestTabs() {
    console.log('Initializing employee request tabs...');
    
    // Tab switching functionality
    const empRequestTabButtons = document.querySelectorAll('.employee-request-tab-button');
    const empRequestFormSections = document.querySelectorAll('.employee-request-form-section');

    if (empRequestTabButtons.length === 0) {
        console.error('Tab buttons not found!');
        return;
    }

    console.log('Found tab buttons:', empRequestTabButtons.length);

    empRequestTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            empRequestTabButtons.forEach(btn => btn.classList.remove('employee-request-active'));
            empRequestFormSections.forEach(section => section.classList.remove('employee-request-active'));

            // Add active class to clicked button and corresponding section
            button.classList.add('employee-request-active');
            const tabId = button.getAttribute('data-tab');
            const targetSection = document.getElementById(tabId);
            if (targetSection) {
                targetSection.classList.add('employee-request-active');
            }
        });
    });

    // Calculate permission duration
    const permissionSection = document.getElementById('request-permission');
    
    if (permissionSection) {
        const fromTimeInput = permissionSection.querySelector('.employee-request-from-time');
        const toTimeInput = permissionSection.querySelector('.employee-request-to-time');
        const durationInput = permissionSection.querySelector('.employee-request-duration');

        function calculateEmpRequestDuration() {
            if (fromTimeInput && toTimeInput && durationInput) {
                if (fromTimeInput.value && toTimeInput.value) {
                    const from = fromTimeInput.value.split(':');
                    const to = toTimeInput.value.split(':');
                    
                    const fromMinutes = parseInt(from[0]) * 60 + parseInt(from[1]);
                    const toMinutes = parseInt(to[0]) * 60 + parseInt(to[1]);
                    
                    const diffMinutes = toMinutes - fromMinutes;
                    
                    if (diffMinutes > 0) {
                        const hours = Math.floor(diffMinutes / 60);
                        const minutes = diffMinutes % 60;
                        durationInput.value = `${hours}h ${minutes}m`;
                    } else {
                        durationInput.value = '';
                    }
                }
            }
        }

        if (fromTimeInput) {
            fromTimeInput.addEventListener('change', calculateEmpRequestDuration);
        }
        
        if (toTimeInput) {
            toTimeInput.addEventListener('change', calculateEmpRequestDuration);
        }
    }

    // Form submission handlers with success alerts
    const applyLeaveForm = document.getElementById('apply-leave-form');
    const requestPermissionForm = document.getElementById('request-permission-form');
    const scheduleMeetingForm = document.getElementById('schedule-meeting-form');

    console.log('Leave form:', applyLeaveForm);
    console.log('Permission form:', requestPermissionForm);
    console.log('Meeting form:', scheduleMeetingForm);

    // Apply Leave Form
    if (applyLeaveForm) {
        applyLeaveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Leave form submitted');
            
            if (this.checkValidity()) {
                alert('Leave application submitted successfully!');
                this.reset();
            } else {
                this.reportValidity();
            }
            
            return false;
        });
    }

    // Request Permission Form
    if (requestPermissionForm) {
        requestPermissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Permission form submitted');
            
            if (this.checkValidity()) {
                alert('Permission request submitted successfully!');
                this.reset();
                
                // Clear duration field
                const permissionSection = document.getElementById('request-permission');
                if (permissionSection) {
                    const durationInput = permissionSection.querySelector('.employee-request-duration');
                    if (durationInput) {
                        durationInput.value = '';
                    }
                }
            } else {
                this.reportValidity();
            }
            
            return false;
        });
    }

    // Schedule Meeting Form
    if (scheduleMeetingForm) {
        scheduleMeetingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Meeting form submitted');
            
            if (this.checkValidity()) {
                alert('Meeting scheduled successfully!');
                this.reset();
            } else {
                this.reportValidity();
            }
            
            return false;
        });
    }

    console.log('Employee request tabs initialized successfully!');
}
