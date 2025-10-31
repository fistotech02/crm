// Customer Modal Functionality
function initializeCustomerModal() {
    console.log('Initializing customer modal...');
    
    const modal = document.getElementById('customerModal');
    const openBtn = document.getElementById('openCustomerModal');
    const closeBtn = document.querySelector('.customer-modal-close');
    const submitBtn = document.getElementById('customerSubmitBtn');
    const form = document.getElementById('customerForm');
    const tableBody = document.getElementById('customer-databaseTableBody');
    const addContactBtn = document.getElementById('addContactBtn');
    const contactsContainer = document.getElementById('customerContactsContainer');
    
    // Check if elements exist
    if (!modal || !openBtn) {
        console.error('Modal or button not found!');
        return;
    }
    
    // Contact row counter
    let contactRowCounter = 0;
    
    // FAKE DATA - Pre-populated customer records
    let customers = [
        {
            date: '2025-10-01',
            customerId: 'CUST001',
            companyName: 'TechVision Solutions',
            customerName: 'Rajesh Kumar',
            industryType: 'IT Services',
            website: 'www.techvision.com',
            address: '123, Anna Salai, Chennai - 600002',
            reference: 'LinkedIn',
            remarks: 'Interested in CRM implementation',
            contacts: [
                {
                    contactPerson: 'Rajesh Kumar',
                    phoneNumber: '+91 98765 43210',
                    mailId: 'rajesh@techvision.com',
                    designation: 'CTO'
                }
            ]
        },
        {
            date: '2025-10-05',
            customerId: 'CUST002',
            companyName: 'Global Innovations',
            customerName: 'Priya Sharma',
            industryType: 'Manufacturing',
            website: 'www.globalinnovations.com',
            address: '456, MG Road, Bangalore - 560001',
            reference: 'Referral',
            remarks: 'Looking for inventory management',
            contacts: [
                {
                    contactPerson: 'Priya Sharma',
                    phoneNumber: '+91 98765 12345',
                    mailId: 'priya@globalinnovations.com',
                    designation: 'Operations Manager'
                }
            ]
        },
        {
            date: '2025-10-10',
            customerId: 'CUST003',
            companyName: 'NextGen Technologies',
            customerName: 'Amit Patel',
            industryType: 'Software Development',
            website: 'www.nextgentech.com',
            address: '789, Park Street, Mumbai - 400001',
            reference: 'Website',
            remarks: 'Enterprise solution needed',
            contacts: [
                {
                    contactPerson: 'Amit Patel',
                    phoneNumber: '+91 98765 67890',
                    mailId: 'amit@nextgentech.com',
                    designation: 'CEO'
                }
            ]
        }
    ];
    
    let editingIndex = -1;

    // Initial render on page load
    renderTable();

    // Add Contact Row Function
    function addContactRow(contactData = null) {
        contactRowCounter++;
        const isFirst = contactsContainer.children.length === 0;
        
        const contactRow = document.createElement('div');
        contactRow.className = 'customer-contact-row';
        contactRow.dataset.contactId = contactRowCounter;
        
        contactRow.innerHTML = `
            <div class="customer-contact-row-header">
                <span class="customer-contact-row-title">Contact ${contactRowCounter}</span>
                ${!isFirst ? `
                    <button type="button" class="customer-contact-delete-btn" data-contact-id="${contactRowCounter}">
                        <img src="../assets/imgaes/preview_delete_btn.webp" alt="Delete" />
                    </button>
                ` : ''}
            </div>
            <div class="customer-form-row">
                <div class="customer-form-group">
                    <label class="customer-label">
                        Contact Person <span class="customer-required">*</span>
                    </label>
                    <input type="text" name="contactPerson[]" class="customer-input" 
                        placeholder="Enter Contact Person" value="${contactData?.contactPerson || ''}" required />
                </div>
                <div class="customer-form-group">
                    <label class="customer-label">
                        Phone Number <span class="customer-required">*</span>
                    </label>
                    <input type="tel" name="phoneNumber[]" class="customer-input" 
                        placeholder="+91 1234567890" value="${contactData?.phoneNumber || ''}" required />
                </div>
                <div class="customer-form-group">
                    <label class="customer-label">Mail ID</label>
                    <input type="email" name="mailId[]" class="customer-input" 
                        placeholder="example@email.com" value="${contactData?.mailId || ''}" required />
                </div>
            </div>
            <div class="customer-form-row">
                <div class="customer-form-group">
                    <label class="customer-label">Designation</label>
                    <input type="text" name="designation[]" class="customer-input" 
                        placeholder="Enter Designation" value="${contactData?.designation || ''}" required />
                </div>
            </div>
        `;
        
        contactsContainer.appendChild(contactRow);
    }

    // Delete Contact Row Function
    function deleteContactRow(contactId) {
        const rowToDelete = contactsContainer.querySelector(`[data-contact-id="${contactId}"]`);
        if (rowToDelete) {
            rowToDelete.remove();
        }
    }

    // Event delegation for delete buttons
    contactsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('customer-contact-delete-btn') || 
            e.target.closest('.customer-contact-delete-btn')) {
            const btn = e.target.closest('.customer-contact-delete-btn');
            const contactId = btn.getAttribute('data-contact-id');
            deleteContactRow(contactId);
        }
    });

    // Add Contact Button Click
    addContactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        addContactRow();
    });

    // Open Modal for Adding
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Open button clicked');
        modal.classList.add('active');
        document.getElementById('customerModalTitle').textContent = 'Add New Client';
        submitBtn.textContent = 'Submit';
        editingIndex = -1;
        form.reset();
        
        // Clear and add one contact row
        contactsContainer.innerHTML = '';
        contactRowCounter = 0;
        addContactRow();
    });

    // Close Modal
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        form.reset();
        contactsContainer.innerHTML = '';
        contactRowCounter = 0;
        editingIndex = -1;
    }

    // Collect Contact Data
    function collectContactData() {
        const contacts = [];
        const contactRows = contactsContainer.querySelectorAll('.customer-contact-row');
        
        contactRows.forEach(row => {
            const contact = {
                contactPerson: row.querySelector('[name="contactPerson[]"]').value,
                phoneNumber: row.querySelector('[name="phoneNumber[]"]').value,
                mailId: row.querySelector('[name="mailId[]"]').value,
                designation: row.querySelector('[name="designation[]"]').value
            };
            contacts.push(contact);
        });
        
        return contacts;
    }

    // Submit Form
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (form.checkValidity()) {
            const formData = new FormData(form);
            const customer = {
                date: formData.get('date'),
                customerId: formData.get('customerId'),
                companyName: formData.get('companyName'),
                customerName: formData.get('customerName'),
                industryType: formData.get('industryType'),
                website: formData.get('website'),
                address: formData.get('address'),
                reference: formData.get('reference'),
                remarks: formData.get('remarks'),
                contacts: collectContactData()
            };

            if (editingIndex === -1) {
                customers.push(customer);
            } else {
                customers[editingIndex] = customer;
            }

            renderTable();
            closeModal();
        } else {
            form.reportValidity();
        }
    });

    // Event delegation for table buttons
    tableBody.addEventListener('click', function(e) {
        const viewBtn = e.target.closest('.customer-table-view-btn');
        const deleteBtn = e.target.closest('.customer-table-delete-btn');
        
        if (viewBtn) {
            const index = parseInt(viewBtn.getAttribute('data-index'));
            editCustomer(index);
        } else if (deleteBtn) {
            const index = parseInt(deleteBtn.getAttribute('data-index'));
            deleteCustomer(index);
        }
    });

    // Render Table
    function renderTable() {
        if (customers.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px; color: #999">
                        No customers added yet. Click "Add Customer" to get started.
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = customers.map((customer, index) => {
            const firstContact = customer.contacts?.[0] || {};
            return `
                <tr>
                    <td>${customer.date}</td>
                    <td>${customer.customerId}</td>
                    <td>${customer.companyName}</td>
                    <td>${customer.customerName}</td>
                    <td>${customer.website}</td>
                    <td>${customer.reference}</td>
                    <td>
                        <button class="customer-table-view-btn" data-index="${index}">
                            <img src="../assets/imgaes/table_eye.webp" alt="View" />
                        </button>
                    </td>
                    <td>
                        <button class="customer-table-delete-btn" data-index="${index}">
                            <img src="../assets/imgaes/preview_delete_btn.webp" alt="Delete" />
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Edit Customer Function
    function editCustomer(index) {
        editingIndex = index;
        const customer = customers[index];
        
        document.querySelector('[name="date"]').value = customer.date;
        document.querySelector('[name="customerId"]').value = customer.customerId;
        document.querySelector('[name="companyName"]').value = customer.companyName;
        document.querySelector('[name="customerName"]').value = customer.customerName;
        document.querySelector('[name="industryType"]').value = customer.industryType;
        document.querySelector('[name="website"]').value = customer.website;
        document.querySelector('[name="address"]').value = customer.address;
        document.querySelector('[name="reference"]').value = customer.reference;
        document.querySelector('[name="remarks"]').value = customer.remarks;
        
        // Load contacts
        contactsContainer.innerHTML = '';
        contactRowCounter = 0;
        if (customer.contacts && customer.contacts.length > 0) {
            customer.contacts.forEach(contact => {
                addContactRow(contact);
            });
        } else {
            addContactRow();
        }
        
        document.getElementById('customerModalTitle').textContent = 'Edit Client';
        submitBtn.textContent = 'Save Changes';
        modal.classList.add('active');
    }

    // Delete Customer Function
    function deleteCustomer(index) {
        if (confirm('Are you sure you want to delete this customer?')) {
            customers.splice(index, 1);
            renderTable();
        }
    }

    // Make customers accessible globally
    window.customerData = customers;
    window.renderCustomerTable = renderTable;
    
    console.log('Customer modal initialized successfully!');
}


// Filter Modal Functionality
function initializeFilterModal() {
    console.log('Initializing filter modal...');
    
    const filterModal = document.getElementById('filterModal');
    const filterBtn = document.querySelector('.customer-database-filter-btn');
    const filterCloseBtn = document.querySelector('.filter-modal-close');
    const filterTypeSelect = document.getElementById('filterTypeSelect');
    const filterInputContainer = document.getElementById('filterInputContainer');
    const filterSubmitBtn = document.getElementById('filterSubmitBtn');
    const tableBody = document.getElementById('customer-databaseTableBody');
    
    // Check if elements exist
    if (!filterModal || !filterBtn) {
        console.error('Filter modal or button not found!');
        return;
    }
    
    // Open Filter Modal
    filterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Filter button clicked');
        filterModal.classList.add('active');
        filterTypeSelect.value = '';
        filterInputContainer.innerHTML = '';
    });
    
    // Close Filter Modal
    filterCloseBtn.addEventListener('click', closeFilterModal);
    
    filterModal.addEventListener('click', function(e) {
        if (e.target === filterModal) {
            closeFilterModal();
        }
    });
    
    function closeFilterModal() {
        filterModal.classList.remove('active');
        filterTypeSelect.value = '';
        filterInputContainer.innerHTML = '';
    }
    
    // Change input based on dropdown selection
    filterTypeSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        filterInputContainer.innerHTML = '';
        
        if (!selectedValue) return;
        
        let inputHTML = '';
        
        switch(selectedValue) {
            case 'companyName':
                inputHTML = `
                    <div class="customer-form-group">
                        <label class="customer-label">
                            Company Name <span class="customer-required">*</span>
                        </label>
                        <input
                            type="text"
                            id="filterInput"
                            class="customer-input"
                            placeholder="Search..."
                            required
                        />
                    </div>
                `;
                break;
                
            case 'phoneNumber':
                inputHTML = `
                    <div class="customer-form-group">
                        <label class="customer-label">
                            Phone Number <span class="customer-required">*</span>
                        </label>
                        <input
                            type="tel"
                            id="filterInput"
                            class="customer-input"
                            placeholder="Search..."
                            required
                        />
                    </div>
                `;
                break;
                
            case 'city':
                inputHTML = `
                    <div class="customer-form-group">
                        <label class="customer-label">
                            City <span class="customer-required">*</span>
                        </label>
                        <input
                            type="text"
                            id="filterInput"
                            class="customer-input"
                            placeholder="Search..."
                            required
                        />
                    </div>
                `;
                break;
        }
        
        filterInputContainer.innerHTML = inputHTML;
    });
    
    // Submit Filter
    filterSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const filterType = filterTypeSelect.value;
        const filterInput = document.getElementById('filterInput');
        
        if (!filterType) {
            alert('Please select a filter type');
            return;
        }
        
        if (!filterInput || !filterInput.value.trim()) {
            alert('Please enter a search value');
            return;
        }
        
        const searchValue = filterInput.value.trim().toLowerCase();
        
        // Filter the customers array based on selected filter
        let filteredCustomers = [];
        
        if (window.customerData && window.customerData.length > 0) {
            filteredCustomers = window.customerData.filter(customer => {
                switch(filterType) {
                    case 'companyName':
                        return customer.companyName.toLowerCase().includes(searchValue);
                    
                    case 'phoneNumber':
                        // Search in contacts array
                        return customer.contacts && customer.contacts.some(contact => 
                            contact.phoneNumber.toLowerCase().includes(searchValue)
                        );
                    
                    case 'city':
                        // Extract city from address
                        return customer.address.toLowerCase().includes(searchValue);
                    
                    default:
                        return false;
                }
            });
        }
        
        // Render filtered results
        renderFilteredTable(filteredCustomers);
        closeFilterModal();
        
        console.log(`Filtered by ${filterType}: ${searchValue}`, filteredCustomers);
    });
    
    // Render Filtered Table
    function renderFilteredTable(filteredCustomers) {
        if (filteredCustomers.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px; color: #999">
                        No customers found matching your filter criteria.
                        <br><br>
                        <button onclick="window.renderCustomerTable()" class="customer-btn-submit" style="padding: 10px 20px;">
                            Clear Filter
                        </button>
                    </td>
                </tr>
            `;
            return;
        }
        
        tableBody.innerHTML = filteredCustomers.map((customer, index) => {
            // Find original index in the full customers array
            const originalIndex = window.customerData.findIndex(c => 
                c.customerId === customer.customerId && 
                c.companyName === customer.companyName
            );
            
            return `
                <tr>
                    <td>${customer.date}</td>
                    <td>${customer.customerId}</td>
                    <td>${customer.companyName}</td>
                    <td>${customer.customerName}</td>
                    <td>${customer.website}</td>
                    <td>${customer.reference}</td>
                    <td>
                        <button class="customer-table-view-btn" data-index="${originalIndex}">
                            <img src="../assets/imgaes/table_eye.webp" alt="View" />
                        </button>
                    </td>
                    <td>
                        <button class="customer-table-delete-btn" data-index="${originalIndex}">
                            <img src="../assets/imgaes/preview_delete_btn.webp" alt="Delete" />
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
    
    console.log('Filter modal initialized successfully!');
}


// Initialize both modals on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCustomerModal();
    initializeFilterModal();
});
