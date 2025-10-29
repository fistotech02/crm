function initializeMeetingDetails() {
  console.log("Initializing meeting details...");

  const modal = document.getElementById("meetingModal");
  const viewModal = document.getElementById("meetingViewModal");
  const uploadMomModal = document.getElementById("uploadMomModal");
  const openBtn = document.querySelector(".meeting-details-add-btn");
  const closeBtn = document.querySelector(".meeting-modal-close");
  const viewCloseBtn = document.querySelector(".meeting-view-modal-close");
  const uploadMomCloseBtn = document.querySelector(".upload-mom-modal-close");
  const submitBtn = document.getElementById("meetingSubmitBtn");
  const uploadMomSubmitBtn = document.getElementById("uploadMomSubmitBtn");
  const form = document.getElementById("meetingForm");
  const uploadMomForm = document.getElementById("uploadMomForm");
  const tableBody = document.getElementById("meeting-detailsTableBody");

  // Check if required elements exist
  if (!modal) {
    console.error("Meeting modal not found!");
    return;
  }

  if (!viewModal) {
    console.error("View modal not found!");
    return;
  }

  if (!uploadMomModal) {
    console.error("Upload MoM modal not found!");
    return;
  }

  if (!openBtn) {
    console.error("Add Meeting button not found!");
    return;
  }

  const employeeIds = [
    "EMP001",
    "EMP002",
    "EMP003",
    "EMP004",
    "EMP005",
    "EMP101",
    "EMP102",
    "EMP103",
    "EMP104",
    "EMP105",
    "EMP201",
    "EMP202",
    "EMP203",
  ];

  let meetings = [
    {
      sNo: 1,
      dateOfMeeting: "01-09-2025",
      meetingDetails: "Quarterly Review Meeting",
      fromTime: "10:00 AM",
      toTime: "11:00 AM",
      meetingTitle: "Q3 Review",
      projectName: "CRM Development",
      momFile: null,
      momData: null,
      attendees: ["EMP001", "EMP002", "EMP003"],
      meetingLinks: ["https://meet.google.com/abc-defg-hij"],
      meetingMode: "Remote",
      description: "Quarterly business review and planning session",
      duration: "60",
    },
    {
      sNo: 2,
      dateOfMeeting: "03-09-2025",
      meetingDetails: "Client Presentation",
      fromTime: "02:00 PM",
      toTime: "03:30 PM",
      meetingTitle: "Demo Session",
      projectName: "E-commerce Platform",
      momFile: null,
      momData: null,
      attendees: ["EMP101", "EMP102"],
      meetingLinks: ["https://zoom.us/j/123456789"],
      meetingMode: "Onsite",
      description: "Product demo for new client",
      duration: "90",
    },
    {
      sNo: 3,
      dateOfMeeting: "08-09-2025",
      meetingDetails: "Sprint Planning",
      fromTime: "09:00 AM",
      toTime: "10:30 AM",
      meetingTitle: "Sprint 5 Planning",
      projectName: "Mobile App",
      momFile: null,
      momData: null,
      attendees: ["EMP201", "EMP202", "EMP203"],
      meetingLinks: [
        "https://teams.microsoft.com/meeting123",
        "https://backup-link.com",
      ],
      meetingMode: "Remote",
      description: "Planning for upcoming sprint tasks",
      duration: "90",
    },
    {
      sNo: 4,
      dateOfMeeting: "08-09-2025",
      meetingDetails: "Sprint Planning",
      fromTime: "09:00 AM",
      toTime: "10:30 AM",
      meetingTitle: "Sprint 5 Planning",
      projectName: "Mobile App",
      momFile: null,
      momData: null,
      attendees: ["EMP201", "EMP202", "EMP203"],
      meetingLinks: [
        "https://teams.microsoft.com/meeting123",
        "https://backup-link.com",
      ],
      meetingMode: "Remote",
      description: "Planning for upcoming sprint tasks",
      duration: "90",
    },
  ];

  let editingIndex = -1;
  let currentUploadIndex = -1;
  let meetingLinks = [""]; // Store links as array

  renderTable();

  // Open Add Meeting Modal
  if (openBtn) {
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      editingIndex = -1;
      meetingLinks = [""];
      renderMeetingLinks();
      initializeEmployeeDropdown();
    });
  }

  // Close buttons
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (viewCloseBtn) {
    viewCloseBtn.addEventListener("click", closeViewModal);
  }

  if (uploadMomCloseBtn) {
    uploadMomCloseBtn.addEventListener("click", closeUploadMomModal);
  }

  // Click outside to close modals
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

  if (uploadMomModal) {
    uploadMomModal.addEventListener("click", function (e) {
      if (e.target === uploadMomModal) {
        closeUploadMomModal();
      }
    });
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    form.reset();
    editingIndex = -1;
    meetingLinks = [""];
  }

  function closeViewModal() {
    viewModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function closeUploadMomModal() {
    uploadMomModal.classList.remove("active");
    document.body.style.overflow = "";
    uploadMomForm.reset();
    currentUploadIndex = -1;
  }

  // Employee Dropdown for Add Meeting Modal
  function initializeEmployeeDropdown() {
    const container = document.getElementById("employeeDropdownContainer");
    if (!container) {
      console.error("Employee dropdown container not found!");
      return;
    }

    container.innerHTML = `
      <div class="meeting-employee-dropdown">
        <input 
          type="text" 
          id="employeeSearch" 
          class="meeting-input meeting-search-input" 
          placeholder="Search Employee IDs..."
          readonly
        />
        <div class="meeting-employee-list" id="employeeList"></div>
        <div class="meeting-selected-employees" id="selectedEmployees"></div>
      </div>
    `;

    const searchInput = document.getElementById("employeeSearch");
    const employeeList = document.getElementById("employeeList");
    const selectedEmployeesContainer =
      document.getElementById("selectedEmployees");
    let selectedEmployees = [];

    // Render employee list with hiding selected ones
    function renderEmployeeList(filter = "") {
      const filtered = employeeIds.filter((id) =>
        id.toLowerCase().includes(filter.toLowerCase())
      );

      employeeList.innerHTML = filtered
        .map((id) => {
          const isSelected = selectedEmployees.includes(id);
          return `
        <div class="meeting-employee-item ${
          isSelected ? "hidden" : ""
        }" data-id="${id}">
          <input type="checkbox" id="emp-${id}" ${
            isSelected ? "checked" : ""
          } />
          <label for="emp-${id}">${id}</label>
        </div>
      `;
        })
        .join("");

      // Add click handlers
      document
        .querySelectorAll(".meeting-employee-item input")
        .forEach((cb) => {
          cb.addEventListener("change", function () {
            const empId = this.closest(".meeting-employee-item").dataset.id;
            if (this.checked) {
              if (!selectedEmployees.includes(empId)) {
                selectedEmployees.push(empId);
              }
            } else {
              selectedEmployees = selectedEmployees.filter(
                (id) => id !== empId
              );
            }
            renderSelectedEmployees();
            renderEmployeeList(searchInput.value);
          });
        });
    }

    // Render selected employees as badges
    function renderSelectedEmployees() {
      selectedEmployeesContainer.innerHTML = selectedEmployees
        .map(
          (id) => `
        <span class="meeting-employee-badge">
          ${id}
          <button type="button" class="meeting-remove-emp" data-id="${id}">×</button>
        </span>
      `
        )
        .join("");

      // Add remove handlers
      document.querySelectorAll(".meeting-remove-emp").forEach((btn) => {
        btn.addEventListener("click", function () {
          const empId = this.dataset.id;
          selectedEmployees = selectedEmployees.filter((id) => id !== empId);
          renderEmployeeList(searchInput.value);
          renderSelectedEmployees();
        });
      });

      // Store in hidden input
      const hiddenInput = document.getElementById("attendeesHidden");
      if (hiddenInput) {
        hiddenInput.value = selectedEmployees.join(",");
      }
    }

    if (searchInput) {
      // Toggle dropdown on click
      searchInput.addEventListener("click", function () {
        const isActive = employeeList.classList.contains("active");
        if (isActive) {
          employeeList.classList.remove("active");
        } else {
          employeeList.classList.add("active");
          renderEmployeeList("");
        }
      });

      // Make input editable for search
      searchInput.removeAttribute("readonly");
      searchInput.addEventListener("input", function () {
        employeeList.classList.add("active");
        renderEmployeeList(this.value);
      });

      // Open dropdown on focus
      searchInput.addEventListener("focus", function () {
        employeeList.classList.add("active");
        renderEmployeeList(this.value);
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!container.contains(e.target)) {
        employeeList.classList.remove("active");
      }
    });

    // Initial render
    renderEmployeeList();
  }

  // Employee Dropdown for Upload MoM Modal
  function initializeMomEmployeeDropdown(preSelectedEmployees = []) {
    const container = document.getElementById("momEmployeeDropdownContainer");
    if (!container) {
      console.error("MoM Employee dropdown container not found!");
      return;
    }

    container.innerHTML = `
      <div class="meeting-employee-dropdown">
        <input 
          type="text" 
          id="momEmployeeSearch" 
          class="meeting-input meeting-search-input" 
          placeholder="Search Employee IDs..."
          readonly
        />
        <div class="meeting-employee-list" id="momEmployeeList"></div>
        <div class="meeting-selected-employees" id="momSelectedEmployees"></div>
      </div>
    `;

    const searchInput = document.getElementById("momEmployeeSearch");
    const employeeList = document.getElementById("momEmployeeList");
    const selectedEmployeesContainer = document.getElementById("momSelectedEmployees");
    let selectedEmployees = [...preSelectedEmployees]; // Pre-select employees

    // Render employee list with hiding selected ones
    function renderEmployeeList(filter = "") {
      const filtered = employeeIds.filter((id) =>
        id.toLowerCase().includes(filter.toLowerCase())
      );

      employeeList.innerHTML = filtered
        .map((id) => {
          const isSelected = selectedEmployees.includes(id);
          return `
        <div class="meeting-employee-item ${
          isSelected ? "hidden" : ""
        }" data-id="${id}">
          <input type="checkbox" id="mom-emp-${id}" ${
            isSelected ? "checked" : ""
          } />
          <label for="mom-emp-${id}">${id}</label>
        </div>
      `;
        })
        .join("");

      // Add click handlers
      document
        .querySelectorAll("#momEmployeeList .meeting-employee-item input")
        .forEach((cb) => {
          cb.addEventListener("change", function () {
            const empId = this.closest(".meeting-employee-item").dataset.id;
            if (this.checked) {
              if (!selectedEmployees.includes(empId)) {
                selectedEmployees.push(empId);
              }
            } else {
              selectedEmployees = selectedEmployees.filter(
                (id) => id !== empId
              );
            }
            renderSelectedEmployees();
            renderEmployeeList(searchInput.value);
          });
        });
    }

    // Render selected employees as badges
    function renderSelectedEmployees() {
      selectedEmployeesContainer.innerHTML = selectedEmployees
        .map(
          (id) => `
        <span class="meeting-employee-badge">
          ${id}
          <button type="button" class="meeting-remove-emp" data-id="${id}">×</button>
        </span>
      `
        )
        .join("");

      // Add remove handlers
      document.querySelectorAll("#momSelectedEmployees .meeting-remove-emp").forEach((btn) => {
        btn.addEventListener("click", function () {
          const empId = this.dataset.id;
          selectedEmployees = selectedEmployees.filter((id) => id !== empId);
          renderEmployeeList(searchInput.value);
          renderSelectedEmployees();
        });
      });

      // Store in hidden input
      const hiddenInput = document.getElementById("momAttendeesHidden");
      if (hiddenInput) {
        hiddenInput.value = selectedEmployees.join(",");
      }
    }

    if (searchInput) {
      // Toggle dropdown on click
      searchInput.addEventListener("click", function () {
        const isActive = employeeList.classList.contains("active");
        if (isActive) {
          employeeList.classList.remove("active");
        } else {
          employeeList.classList.add("active");
          renderEmployeeList("");
        }
      });

      // Make input editable for search
      searchInput.removeAttribute("readonly");
      searchInput.addEventListener("input", function () {
        employeeList.classList.add("active");
        renderEmployeeList(this.value);
      });

      // Open dropdown on focus
      searchInput.addEventListener("focus", function () {
        employeeList.classList.add("active");
        renderEmployeeList(this.value);
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!container.contains(e.target)) {
        employeeList.classList.remove("active");
      }
    });

    // Initial render
    renderEmployeeList();
    renderSelectedEmployees(); // Render pre-selected employees
  }

  // Meeting Links Management
  function renderMeetingLinks() {
    const container = document.getElementById("meetingLinksContainer");
    if (!container) return;

    container.innerHTML = meetingLinks
      .map((link, index) => {
        const isLast = index === meetingLinks.length - 1;
        const showDeleteBtn = meetingLinks.length > 1;

        return `
        <div class="meeting-link-row" data-index="${index}">
          <input 
            type="url" 
            class="meeting-input meeting-link-input" 
            placeholder="https://example.com"
            value="${link}"
            data-index="${index}"
          />
          ${
            isLast
              ? '<button type="button" class="meeting-add-link-btn" data-action="add"><span>+</span></button>'
              : ""
          }
          ${
            showDeleteBtn
              ? '<button type="button" class="meeting-remove-link-btn" data-action="remove" data-index="' +
                index +
                '"><span>−</span></button>'
              : ""
          }
        </div>
      `;
      })
      .join("");

    // Update link values when inputs change
    container.querySelectorAll(".meeting-link-input").forEach((input) => {
      input.addEventListener("input", function () {
        const idx = parseInt(this.getAttribute("data-index"));
        meetingLinks[idx] = this.value;
      });
    });

    // Add link button
    const addBtn = container.querySelector('[data-action="add"]');
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        meetingLinks.push("");
        renderMeetingLinks();
      });
    }

    // Remove link buttons
    container.querySelectorAll('[data-action="remove"]').forEach((btn) => {
      btn.addEventListener("click", function () {
        const idx = parseInt(this.getAttribute("data-index"));
        meetingLinks.splice(idx, 1);
        if (meetingLinks.length === 0) {
          meetingLinks = [""];
        }
        renderMeetingLinks();
      });
    });
  }

  // Submit Add Meeting Form
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (form.checkValidity()) {
        const formData = new FormData(form);

        const attendeesValue =
          document.getElementById("attendeesHidden")?.value || "";
        const attendees = attendeesValue.split(",").filter((id) => id);

        // Filter out empty links
        const validLinks = meetingLinks.filter((link) => link.trim() !== "");

        const meeting = {
          sNo:
            editingIndex === -1
              ? meetings.length + 1
              : meetings[editingIndex].sNo,
          dateOfMeeting: formData.get("meetingDate"),
          meetingDetails: formData.get("meetingDescription").substring(0, 50),
          fromTime: formData.get("fromTime"),
          toTime: formData.get("toTime"),
          meetingTitle: formData.get("meetingTitle"),
          projectName: "N/A",
          momFile: null,
          momData: null,
          attendees: attendees,
          meetingLinks: validLinks,
          meetingMode: formData.get("meetingMode"),
          description: formData.get("meetingDescription"),
          duration: formData.get("duration"),
        };

        if (editingIndex === -1) {
          meetings.push(meeting);
        } else {
          meetings[editingIndex] = meeting;
        }

        renderTable();
        closeModal();
      } else {
        form.reportValidity();
      }
    });
  }

  // Table event handlers
  if (tableBody) {
    tableBody.addEventListener("click", function (e) {
      const viewBtn = e.target.closest(".meeting-view-btn");
      const deleteBtn = e.target.closest(".meeting-delete-btn");
      const uploadBtn = e.target.closest(".meeting-upload-btn");

      if (viewBtn) {
        const index = parseInt(viewBtn.getAttribute("data-index"));
        console.log("View button clicked for index:", index);
        openViewModal(index);
      } else if (deleteBtn) {
        const index = parseInt(deleteBtn.getAttribute("data-index"));
        deleteMeeting(index);
      } else if (uploadBtn) {
        const index = parseInt(uploadBtn.getAttribute("data-index"));
        handleFileUpload(index);
      }
    });
  }

  // Handle Upload MoM Button Click
  function handleFileUpload(index) {
    currentUploadIndex = index;
    const meeting = meetings[index];

    // Open the Upload MoM modal
    uploadMomModal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Pre-fill form with existing meeting data
    if (uploadMomForm) {
      uploadMomForm.reset();

      // Pre-populate fields from meeting data
      if (meeting.momData) {
        // If MoM data exists, fill all fields
        const momData = meeting.momData;
        uploadMomForm.elements["momMeetingDate"].value = momData.meetingDate || "";
        uploadMomForm.elements["momTime"].value = momData.time || "";
        uploadMomForm.elements["momOrder"].value = momData.order || "";
        uploadMomForm.elements["momProjectName"].value = momData.projectName || "";
        uploadMomForm.elements["momCustomerName"].value = momData.customerName || "";
        uploadMomForm.elements["momDepartment"].value = momData.department || "";
        uploadMomForm.elements["momEmail"].value = momData.email || "";
        uploadMomForm.elements["momPhone"].value = momData.phone || "";
        uploadMomForm.elements["momDuration"].value = momData.duration || "";
        uploadMomForm.elements["momLocation"].value = momData.location || "";
        uploadMomForm.elements["momFromTime"].value = momData.fromTime || "";
        uploadMomForm.elements["momToTime"].value = momData.toTime || "";
        uploadMomForm.elements["momObjective"].value = momData.objective || "";
        uploadMomForm.elements["momConclusion"].value = momData.conclusion || "";
        
        // Initialize employee dropdown with existing attendees
        const existingAttendees = momData.attendees ? momData.attendees.split(",") : [];
        initializeMomEmployeeDropdown(existingAttendees);
      } else {
        // Pre-populate with basic meeting data
        uploadMomForm.elements["momMeetingDate"].value = meeting.dateOfMeeting || "";
        uploadMomForm.elements["momTime"].value = `${meeting.fromTime} - ${meeting.toTime}` || "";
        uploadMomForm.elements["momProjectName"].value = meeting.projectName || "";
        uploadMomForm.elements["momDuration"].value = meeting.duration ? `${meeting.duration} minutes` : "";
        uploadMomForm.elements["momFromTime"].value = meeting.fromTime || "";
        uploadMomForm.elements["momToTime"].value = meeting.toTime || "";
        
        // Initialize employee dropdown with meeting's attendees
        initializeMomEmployeeDropdown(meeting.attendees || []);
      }
    }
  }

  // Submit Upload MoM Form
  if (uploadMomSubmitBtn) {
    uploadMomSubmitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (uploadMomForm.checkValidity()) {
        const formData = new FormData(uploadMomForm);

        // Get attendees from hidden input
        const attendeesValue = document.getElementById("momAttendeesHidden")?.value || "";

        // Store MoM data in the meeting object
        const momData = {
          meetingDate: formData.get("momMeetingDate"),
          time: formData.get("momTime"),
          order: formData.get("momOrder"),
          projectName: formData.get("momProjectName"),
          customerName: formData.get("momCustomerName"),
          department: formData.get("momDepartment"),
          email: formData.get("momEmail"),
          phone: formData.get("momPhone"),
          duration: formData.get("momDuration"),
          attendees: attendeesValue, // Comma-separated employee IDs
          location: formData.get("momLocation"),
          fromTime: formData.get("momFromTime"),
          toTime: formData.get("momToTime"),
          objective: formData.get("momObjective"),
          conclusion: formData.get("momConclusion"),
        };

        // Update the meeting with MoM data
        if (currentUploadIndex !== -1) {
          meetings[currentUploadIndex].momData = momData;
          meetings[currentUploadIndex].momFile = "Meeting_Minutes.pdf";

          alert("Meeting Minutes uploaded successfully!");
          closeUploadMomModal();
          renderTable();
        }
      } else {
        uploadMomForm.reportValidity();
      }
    });
  }

  // Open View Modal
  function openViewModal(index) {
    console.log("Opening view modal for index:", index);
    console.log("Meeting data:", meetings[index]);

    const meeting = meetings[index];

    if (!viewModal) {
      console.error("View modal element not found!");
      alert("Error: View modal not found in the page.");
      return;
    }

    // Populate basic information
    try {
      const titleEl = document.getElementById("viewMeetingTitle");
      const dateEl = document.getElementById("viewMeetingDate");
      const fromTimeEl = document.getElementById("viewFromTime");
      const toTimeEl = document.getElementById("viewToTime");
      const durationEl = document.getElementById("viewMeetingDuration");
      const modeEl = document.getElementById("viewMeetingMode");
      const projectEl = document.getElementById("viewProjectName");
      const descEl = document.getElementById("viewMeetingDescription");

      if (titleEl) titleEl.value = meeting.meetingTitle || "";
      if (dateEl) dateEl.value = meeting.dateOfMeeting || "";
      if (fromTimeEl) fromTimeEl.value = meeting.fromTime || "";
      if (toTimeEl) toTimeEl.value = meeting.toTime || "";
      if (durationEl)
        durationEl.value = meeting.duration
          ? `${meeting.duration} minutes`
          : "";
      if (modeEl) modeEl.value = meeting.meetingMode || "";
      if (projectEl) projectEl.value = meeting.projectName || "";
      if (descEl) descEl.value = meeting.description || "";

      console.log("Basic fields populated successfully");
    } catch (error) {
      console.error("Error populating basic fields:", error);
    }

    // Populate attendees as badges
    try {
      const attendeesContainer = document.getElementById(
        "viewAttendeesContainer"
      );

      if (attendeesContainer) {
        if (meeting.attendees && meeting.attendees.length > 0) {
          const badgesHTML = meeting.attendees
            .map(
              (emp) => `<span class="meeting-attendee-badge-view">${emp}</span>`
            )
            .join("");

          attendeesContainer.innerHTML = badgesHTML;
        } else {
          attendeesContainer.innerHTML =
            '<span style="color: #999; font-style: italic;">No attendees selected</span>';
        }
      }
    } catch (error) {
      console.error("Error populating attendees:", error);
    }

    // Populate meeting links
    try {
      const linksContainer = document.getElementById(
        "viewMeetingLinksContainer"
      );

      if (linksContainer) {
        if (meeting.meetingLinks && meeting.meetingLinks.length > 0) {
          const linksHTML = meeting.meetingLinks
            .map(
              (link) => `
            <a 
              href="${link}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="meeting-link-clickable-row"
            >
              <span class="meeting-link-icon">🔗</span>
              <span class="meeting-link-text">${link}</span>
              <span class="meeting-link-external">↗</span>
            </a>
          `
            )
            .join("");

          linksContainer.innerHTML = linksHTML;
        } else {
          linksContainer.innerHTML = "";
        }
      }
    } catch (error) {
      console.error("Error populating links:", error);
    }

    // Populate MoM data if available
    try {
      const momContainer = document.getElementById("viewMomDataContainer");
      
      if (momContainer) {
        if (meeting.momData) {
          const momData = meeting.momData;
          
          // Parse attendees
          const momAttendees = momData.attendees ? momData.attendees.split(",").filter(id => id) : [];
          const attendeesBadges = momAttendees.length > 0 
            ? momAttendees.map(id => `<span class="meeting-attendee-badge-view">${id}</span>`).join("")
            : '<span style="color: #999; font-style: italic;">No attendees</span>';
          
          const momHTML = `
            <div class="mom-data-section">
              <h3 style="color: #0052cc; margin-bottom: 15px;">Meeting Minutes Details</h3>
              
              <div class="mom-data-grid">
                <div class="mom-data-field">
                  <label>Customer Name:</label>
                  <p>${momData.customerName || "N/A"}</p>
                </div>
                <div class="mom-data-field">
                  <label>Department/Division:</label>
                  <p>${momData.department || "N/A"}</p>
                </div>
                <div class="mom-data-field">
                  <label>Email:</label>
                  <p>${momData.email || "N/A"}</p>
                </div>
                <div class="mom-data-field">
                  <label>Phone:</label>
                  <p>${momData.phone || "N/A"}</p>
                </div>
                <div class="mom-data-field">
                  <label>Location:</label>
                  <p>${momData.location || "N/A"}</p>
                </div>
                <div class="mom-data-field">
                  <label>Order:</label>
                  <p>${momData.order || "N/A"}</p>
                </div>
              </div>
              
              <div class="mom-data-full">
                <div class="mom-data-field">
                  <label>Attendees:</label>
                  <div class="mom-attendees-badges">
                    ${attendeesBadges}
                  </div>
                </div>
                <div class="mom-data-field">
                  <label>Meeting Objective:</label>
                  <p>${momData.objective || "N/A"}</p>
                </div>
                <div class="mom-data-field">
                  <label>Conclusion:</label>
                  <p>${momData.conclusion || "N/A"}</p>
                </div>
              </div>
            </div>
          `;
          momContainer.innerHTML = momHTML;
        } else {
          momContainer.innerHTML = '<p style="color: #999; font-style: italic; text-align: center;">No Meeting Minutes uploaded yet.</p>';
        }
      }
    } catch (error) {
      console.error("Error populating MoM data:", error);
    }

    // Show modal
    viewModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Delete Meeting
  function deleteMeeting(index) {
    if (confirm("Are you sure you want to delete this meeting?")) {
      meetings.splice(index, 1);
      meetings.forEach((m, i) => {
        m.sNo = i + 1;
      });
      renderTable();
    }
  }

  // Render Table
  function renderTable() {
    if (!tableBody) return;

    if (meetings.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; padding: 40px; color: #999">
            No meetings scheduled yet. Click "Add Meeting" to get started.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = meetings
      .map(
        (meeting, index) => `
        <tr>
          <td>${meeting.sNo}</td>
          <td>${meeting.dateOfMeeting}</td>
          <td>${meeting.meetingDetails}</td>
          <td>${meeting.fromTime}</td>
          <td>${meeting.toTime}</td>
          <td>${meeting.meetingTitle}</td>
          <td>${meeting.projectName}</td>
          <td>
            <button class="meeting-upload-btn ${meeting.momData ? 'uploaded' : ''}" data-index="${index}">
              ${meeting.momData ? '<img src="../assets/imgaes/tabler_eye.png" alt="View" /> View ' : '<img src="../assets/imgaes/plus_btn.webp" alt="View" /> Add'}
            </button>
          </td>
          <td>
            <button class="meeting-view-btn" data-index="${index}">
              <img src="../assets/imgaes/table_eye.webp" alt="View" />
            </button>
          </td>
          <td>
            <button class="meeting-delete-btn" data-index="${index}">
              <img src="../assets/imgaes/preview_delete_btn.webp" alt="Delete" />
            </button>
          </td>
        </tr>
      `
      )
      .join("");
  }

  console.log("Meeting details initialized successfully!");
}
