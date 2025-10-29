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
        // ... rest of your fake data with contacts array ...
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
        if (e.target.classList.contains('customer-contact-delete-btn')) {
            const contactId = e.target.getAttribute('data-contact-id');
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
                contacts: collectContactData() // Collect multiple contacts
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
            // Show first contact's name
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

    window.customerData = customers;
    
    console.log('Customer modal initialized successfully!');
}
