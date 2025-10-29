// First Level Follow-up Functionality
function initializeFirstLevelFollowup() {
  console.log("Initializing first level follow-up...");

  const modal = document.getElementById("firstLevelModal");
  const viewModal = document.getElementById("firstLevelViewModal");
  const closeBtn = document.querySelector(".first-level-modal-close");
  const viewCloseBtn = document.querySelector(".first-level-view-modal-close");
  const saveBtn = document.getElementById("firstLevelSaveBtn");
  const form = document.getElementById("firstLevelForm");
  const tableBody = document.getElementById("first-levelTableBody");
  
  // Filter elements
  const filterBtn = document.getElementById("firstfilterBtn");
  const filterDropdown = document.getElementById("firstLevelFilterDropdown");
  const applyFilterBtn = document.getElementById("firstLevelApplyFilter");
  const clearFilterBtn = document.getElementById("firstLevelClearFilter");

  // Check if required elements exist
  if (!modal) {
    console.error("First level modal not found!");
    return;
  }

  if (!tableBody) {
    console.error("Table body not found!");
    return;
  }

  // FAKE DATA - Pre-populated first level follow-up records
  let firstLevelCustomers = [
    {
      status: "Not Picking",
      remarks: "Called 3 times, no response",
      updateDate: "2025-10-05",
      nextFollowupDate: "2025-10-20",
      customerId: "CUST001",
      initiatedDate: "2025-10-01",
      companyName: "TechVision Solutions",
      customerName: "Rajesh Kumar",
      fullCustomerData: {
        date: "2025-10-01",
        customerId: "CUST001",
        companyName: "TechVision Solutions",
        customerName: "Rajesh Kumar",
        industryType: "IT Services",
        website: "www.techvision.com",
        address: "123, Anna Salai, Chennai - 600002",
        reference: "LinkedIn",
        remarks: "Interested in CRM implementation",
        contactPerson: "Rajesh Kumar",
        phoneNumber: "+91 98765 43210",
        mailId: "rajesh@techvision.com",
        designation: "CTO",
      },
    },
    {
      status: "Not Interest",
      remarks: "Already using another CRM solution",
      updateDate: "2025-10-07",
      nextFollowupDate: "2025-11-01",
      customerId: "CUST002",
      initiatedDate: "2025-10-03",
      companyName: "Global Retail Corp",
      customerName: "Priya Sharma",
      fullCustomerData: {
        date: "2025-10-03",
        customerId: "CUST002",
        companyName: "Global Retail Corp",
        customerName: "Priya Sharma",
        industryType: "Retail",
        website: "www.globalretail.in",
        address: "45, MG Road, Bangalore - 560001",
        reference: "Trade Show",
        remarks: "Looking for inventory management system",
        contactPerson: "Priya Sharma",
        phoneNumber: "+91 98123 45678",
        mailId: "priya.sharma@globalretail.in",
        designation: "Operations Manager",
      },
    },
    {
      status: "None",
      remarks: "",
      updateDate: "",
      nextFollowupDate: "",
      customerId: "CUST003",
      initiatedDate: "2025-10-05",
      companyName: "Sunrise Manufacturing",
      customerName: "Arun Patel",
      fullCustomerData: {
        date: "2025-10-05",
        customerId: "CUST003",
        companyName: "Sunrise Manufacturing",
        customerName: "Arun Patel",
        industryType: "Manufacturing",
        website: "www.sunrisemfg.com",
        address: "78, Industrial Area, Pune - 411019",
        reference: "Email Campaign",
        remarks: "Needs production tracking software",
        contactPerson: "Arun Patel",
        phoneNumber: "+91 97654 32109",
        mailId: "arun.patel@sunrisemfg.com",
        designation: "Plant Manager",
      },
    },
    {
      status: "Not Reachable",
      remarks: "Phone switched off, email bounced",
      updateDate: "2025-10-10",
      nextFollowupDate: "2025-10-25",
      customerId: "CUST004",
      initiatedDate: "2025-10-08",
      companyName: "HealthCare Plus",
      customerName: "Dr. Meena Reddy",
      fullCustomerData: {
        date: "2025-10-08",
        customerId: "CUST004",
        companyName: "HealthCare Plus",
        customerName: "Dr. Meena Reddy",
        industryType: "Healthcare",
        website: "www.healthcareplus.in",
        address: "12, Hospital Road, Hyderabad - 500003",
        reference: "Referral",
        remarks: "Patient management system required",
        contactPerson: "Dr. Meena Reddy",
        phoneNumber: "+91 99887 76655",
        mailId: "meena@healthcareplus.in",
        designation: "Director",
      },
    },
    {
      status: "Not Picking",
      remarks: "Left voicemail, awaiting callback",
      updateDate: "2025-10-12",
      nextFollowupDate: "2025-10-18",
      customerId: "CUST005",
      initiatedDate: "2025-10-10",
      companyName: "EduTech Academy",
      customerName: "Vikram Singh",
      fullCustomerData: {
        date: "2025-10-10",
        customerId: "CUST005",
        companyName: "EduTech Academy",
        customerName: "Vikram Singh",
        industryType: "Education",
        website: "www.edutech.academy",
        address: "56, College Street, Kolkata - 700073",
        reference: "Google Search",
        remarks: "Online course management platform",
        contactPerson: "Vikram Singh",
        phoneNumber: "+91 98456 78901",
        mailId: "vikram@edutech.academy",
        designation: "Founder & CEO",
      },
    },
    {
      status: "None",
      remarks: "",
      updateDate: "",
      nextFollowupDate: "",
      customerId: "CUST006",
      initiatedDate: "2025-10-12",
      companyName: "FoodHub Logistics",
      customerName: "Anita Desai",
      fullCustomerData: {
        date: "2025-10-12",
        customerId: "CUST006",
        companyName: "FoodHub Logistics",
        customerName: "Anita Desai",
        industryType: "Food & Beverage",
        website: "www.foodhub.co.in",
        address: "89, Service Road, Mumbai - 400051",
        reference: "Partner Introduction",
        remarks: "Supply chain management solution needed",
        contactPerson: "Anita Desai",
        phoneNumber: "+91 97123 45678",
        mailId: "anita@foodhub.co.in",
        designation: "Supply Chain Head",
      },
    },
    {
      status: "Follow-Up Taken",
      remarks: "Meeting scheduled for next week",
      updateDate: "2025-10-15",
      nextFollowupDate: "2025-10-22",
      customerId: "CUST007",
      initiatedDate: "2025-10-14",
      companyName: "AutoParts India",
      customerName: "Suresh Iyer",
      fullCustomerData: {
        date: "2025-10-14",
        customerId: "CUST007",
        companyName: "AutoParts India",
        customerName: "Suresh Iyer",
        industryType: "Automotive",
        website: "www.autopartsindia.com",
        address: "34, Industrial Estate, Coimbatore - 641014",
        reference: "Cold Call",
        remarks: "Dealer management system",
        contactPerson: "Suresh Iyer",
        phoneNumber: "+91 96543 21098",
        mailId: "suresh@autopartsindia.com",
        designation: "Sales Director",
      },
    },
  ];

  let editingIndex = -1;
  let currentFilter = "All"; // Track current filter

  // Initial render
  renderTable();

  // ========================================
  // FILTER FUNCTIONALITY
  // ========================================

  // Toggle filter dropdown
  if (filterBtn && filterDropdown) {
    filterBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      filterDropdown.classList.toggle("active");
      console.log("Filter button clicked, dropdown active:", filterDropdown.classList.contains("active"));
    });
  } else {
    console.warn("Filter button or dropdown not found");
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function(e) {
    if (filterDropdown && 
        !filterDropdown.contains(e.target) && 
        filterBtn && 
        !filterBtn.contains(e.target)) {
      filterDropdown.classList.remove("active");
    }
  });

  // Apply Filter
  if (applyFilterBtn) {
    applyFilterBtn.addEventListener("click", function() {
      const selectedFilter = document.querySelector('input[name="firstLevelFilter"]:checked');
      if (selectedFilter) {
        currentFilter = selectedFilter.value;
        renderTable();
        if (filterDropdown) {
          filterDropdown.classList.remove("active");
        }
        console.log("Filter applied:", currentFilter);
      }
    });
  }

  // Clear Filter
  if (clearFilterBtn) {
    clearFilterBtn.addEventListener("click", function() {
      currentFilter = "All";
      const allFilterRadio = document.querySelector('input[name="firstLevelFilter"][value="All"]');
      if (allFilterRadio) {
        allFilterRadio.checked = true;
      }
      renderTable();
      if (filterDropdown) {
        filterDropdown.classList.remove("active");
      }
      console.log("Filter cleared");
    });
  }

  // ========================================
  // MODAL FUNCTIONALITY
  // ========================================

  // Close Edit Modal
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close View Modal
  if (viewCloseBtn) {
    viewCloseBtn.addEventListener("click", closeViewModal);
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  if (viewModal) {
    viewModal.addEventListener("click", function (e) {
      if (e.target === viewModal) {
        closeViewModal();
      }
    });
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
    }
    if (form) {
      form.reset();
    }

    if (editingIndex !== -1) {
      renderTable();
    }

    editingIndex = -1;
  }

  function closeViewModal() {
    if (viewModal) {
      viewModal.classList.remove("active");
    }
  }

  // ========================================
  // SAVE FUNCTIONALITY
  // ========================================

  // Save Button
  if (saveBtn && form) {
    saveBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (form.checkValidity() && editingIndex !== -1) {
        const formData = new FormData(form);
        const remarks = formData.get("remarks");
        const nextFollowupDate = formData.get("nextFollowupDate");

        const statusField = document.querySelector('[name="statusHidden"]');
        const status = statusField
          ? statusField.value
          : firstLevelCustomers[editingIndex].status;

        firstLevelCustomers[editingIndex].status = status;
        firstLevelCustomers[editingIndex].remarks = remarks;
        firstLevelCustomers[editingIndex].nextFollowupDate = nextFollowupDate;
        firstLevelCustomers[editingIndex].updateDate = new Date()
          .toISOString()
          .split("T")[0];

        if (status === "Follow-Up Taken") {
          moveToSecondLevel(editingIndex);
        }

        renderTable();
        closeModal();

        console.log("Follow-up updated successfully!");
      } else {
        form.reportValidity();
      }
    });
  }

  // Move record to second level
  function moveToSecondLevel(index) {
    const record = firstLevelCustomers[index];

    window.dispatchEvent(
      new CustomEvent("moveToSecondLevel", {
        detail: record,
      })
    );

    firstLevelCustomers.splice(index, 1);
  }

  // ========================================
  // EVENT LISTENERS
  // ========================================

  // Event delegation for view button
  if (tableBody) {
    tableBody.addEventListener("click", function (e) {
      const viewBtn = e.target.closest(".first-level-view-btn");

      if (viewBtn) {
        const index = parseInt(viewBtn.getAttribute("data-index"));
        openViewModal(index);
      }
    });

    // Handle status dropdown change
    tableBody.addEventListener("change", function (e) {
      if (e.target.classList.contains("first-level-status-select")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        const selectedStatus = e.target.value;

        if (selectedStatus !== "None") {
          openEditModal(index, selectedStatus);
        }
      }
    });
  }

  // ========================================
  // OPEN MODALS
  // ========================================

  // Open Edit Modal Function (when status dropdown changes)
  function openEditModal(index, selectedStatus) {
    editingIndex = index;
    const record = firstLevelCustomers[index];

    const companyNameField = document.querySelector('[name="companyNameDisplay"]');
    const customerNameField = document.querySelector('[name="customerNameDisplay"]');
    const statusHiddenField = document.querySelector('[name="statusHidden"]');
    const remarksField = document.querySelector('[name="remarks"]');
    const nextFollowupDateField = document.querySelector('[name="nextFollowupDate"]');
    const modalHeader = document.querySelector(".first-level-modal-header h2");

    if (companyNameField) companyNameField.value = record.companyName;
    if (customerNameField) customerNameField.value = record.customerName;
    if (statusHiddenField) statusHiddenField.value = selectedStatus;
    if (remarksField) remarksField.value = record.remarks;
    if (nextFollowupDateField) nextFollowupDateField.value = record.nextFollowupDate;

    if (modalHeader) {
      modalHeader.textContent = `Update Follow-up - ${selectedStatus}`;
    }

    if (modal) {
      modal.classList.add("active");
    }
  }

  // Open View Modal Function (when view button is clicked)
  function openViewModal(index) {
    const record = firstLevelCustomers[index];
    const customerData = record.fullCustomerData;

    // Helper function to safely set value
    const setFieldValue = (id, value) => {
      const field = document.getElementById(id);
      if (field) {
        field.value = value || "-";
      }
    };

    // Populate Customer Database Information
    setFieldValue("viewDbDate", customerData.date);
    setFieldValue("viewDbCustomerId", customerData.customerId);
    setFieldValue("viewDbCompanyName", customerData.companyName);
    setFieldValue("viewDbCustomerName", customerData.customerName);
    setFieldValue("viewDbIndustryType", customerData.industryType);
    setFieldValue("viewDbWebsite", customerData.website);
    setFieldValue("viewDbAddress", customerData.address);
    setFieldValue("viewDbReference", customerData.reference);
    setFieldValue("viewDbRemarks", customerData.remarks);

    // Populate Contact Details
    setFieldValue("viewDbContactPerson", customerData.contactPerson);
    setFieldValue("viewDbPhoneNumber", customerData.phoneNumber);
    setFieldValue("viewDbMailId", customerData.mailId);
    setFieldValue("viewDbDesignation", customerData.designation);

    // Populate 1st Level Follow-up Information
    setFieldValue("viewFollowupStatus", record.status);
    setFieldValue("viewFollowupInitiatedDate", record.initiatedDate);
    setFieldValue("viewFollowupUpdateDate", record.updateDate);
    setFieldValue("viewFollowupNextDate", record.nextFollowupDate);
    setFieldValue("viewFollowupRemarks", record.remarks || "No remarks yet");

    if (viewModal) {
      viewModal.classList.add("active");
    }
  }

  // ========================================
  // RENDER TABLE WITH FILTER
  // ========================================

  function renderTable() {
    if (!tableBody) return;

    // Filter data based on current filter
    let filteredData = firstLevelCustomers;
    
    if (currentFilter !== "All") {
      filteredData = firstLevelCustomers.filter(record => record.status === currentFilter);
    }

    if (filteredData.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 40px; color: #999">
            ${currentFilter === "All" ? "No customer's data available" : `No customers with status "${currentFilter}"`}
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filteredData
      .map((record) => {
        // Get original index for data binding
        const originalIndex = firstLevelCustomers.indexOf(record);
        
        return `
          <tr>
            <td>
              <select class="first-level-status-select" data-index="${originalIndex}">
                <option value="None" ${
                  record.status === "None" ? "selected" : ""
                }>None</option>
                <option value="Not Picking" ${
                  record.status === "Not Picking" ? "selected" : ""
                }>Not Picking</option>
                <option value="Not Interest" ${
                  record.status === "Not Interest" ? "selected" : ""
                }>Not Interest</option>
                <option value="Not Reachable" ${
                  record.status === "Not Reachable"
                    ? "selected"
                    : ""
                }>Not Reachable</option>
                <option value="Follow-Up Taken" ${
                  record.status === "Follow-Up Taken"
                    ? "selected"
                    : ""
                }>Follow-Up Taken</option>
              </select>
            </td>
            <td>${record.remarks || "-"}</td>
            <td>${record.updateDate || "-"}</td>
            <td>${record.nextFollowupDate || "-"}</td>
            <td>${record.customerId}</td>
            <td>${record.initiatedDate}</td>
            <td>${record.companyName}</td>
            <td>${record.customerName}</td>
            <td>
              <button class="first-level-view-btn" data-index="${originalIndex}">
                <img src="../assets/imgaes/table_eye.webp" alt="View" />
              </button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  console.log("First level follow-up initialized successfully!");
}
