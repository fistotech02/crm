// ==================== EMPLOYEE DATA MANAGEMENT ====================
// Store all employees in an array with FAKE DATA
let employeesData = [
    {
        employeeId: 'EMP001',
        employeeName: 'Rajesh Kumar',
        dob: '1990-05-15',
        gender: 'Male',
        emailPersonal: 'rajesh.kumar@gmail.com',
        emailOfficial: 'rajesh.kumar@company.com',
        phonePersonal: '+91 9876543210',
        phoneOfficial: '+91 9876543211',
        designation: 'Senior Developer',
        employmentType: 'On Role',
        workingStatus: 'Working',
        joinDate: '2020-01-15',
        internStartDate: null,
        internEndDate: null,
        durationMonths: null,
        address: '123 MG Road, Coimbatore, Tamil Nadu - 641001',
        photoURL: null,
        uploadedFiles: {}
    },
    {
        employeeId: 'EMP002',
        employeeName: 'Priya Sharma',
        dob: '1995-08-22',
        gender: 'Female',
        emailPersonal: 'priya.sharma@gmail.com',
        emailOfficial: 'priya.sharma@company.com',
        phonePersonal: '+91 9876543220',
        phoneOfficial: '+91 9876543221',
        designation: 'UI/UX Designer',
        employmentType: 'On Role',
        workingStatus: 'Working',
        joinDate: '2021-06-10',
        internStartDate: null,
        internEndDate: null,
        durationMonths: null,
        address: '456 RS Puram, Coimbatore, Tamil Nadu - 641002',
        photoURL: null,
        uploadedFiles: {}
    },
    {
        employeeId: 'INT001',
        employeeName: 'Arun Vijay',
        dob: '2000-03-12',
        gender: 'Male',
        emailPersonal: 'arun.vijay@gmail.com',
        emailOfficial: 'arun.vijay@company.com',
        phonePersonal: '+91 9876543230',
        phoneOfficial: '+91 9876543231',
        designation: 'Frontend Developer Intern',
        employmentType: 'Intern',
        workingStatus: 'Working',
        joinDate: null,
        internStartDate: '2024-08-01',
        internEndDate: '2025-02-01',
        durationMonths: '6 months',
        address: '789 Gandhipuram, Coimbatore, Tamil Nadu - 641012',
        photoURL: null,
        uploadedFiles: {}
    },
    {
        employeeId: 'EMP003',
        employeeName: 'Deepa Lakshmi',
        dob: '1992-11-05',
        gender: 'Female',
        emailPersonal: 'deepa.lakshmi@gmail.com',
        emailOfficial: 'deepa.lakshmi@company.com',
        phonePersonal: '+91 9876543240',
        phoneOfficial: '+91 9876543241',
        designation: 'Project Manager',
        employmentType: 'On Role',
        workingStatus: 'Working',
        joinDate: '2019-03-20',
        internStartDate: null,
        internEndDate: null,
        durationMonths: null,
        address: '321 Saibaba Colony, Coimbatore, Tamil Nadu - 641011',
        photoURL: null,
        uploadedFiles: {}
    },
    {
        employeeId: 'INT002',
        employeeName: 'Karthik Rajan',
        dob: '2001-07-18',
        gender: 'Male',
        emailPersonal: 'karthik.rajan@gmail.com',
        emailOfficial: 'karthik.rajan@company.com',
        phonePersonal: '+91 9876543250',
        phoneOfficial: '+91 9876543251',
        designation: 'Marketing Intern',
        employmentType: 'Intern',
        workingStatus: 'Working',
        joinDate: null,
        internStartDate: '2024-09-01',
        internEndDate: '2025-03-01',
        durationMonths: '6 months',
        address: '555 Peelamedu, Coimbatore, Tamil Nadu - 641004',
        photoURL: null,
        uploadedFiles: {}
    }
];


let currentEditingIndex = null;


// Function to initialize employee details page (called from script.js)
function initializeEmployeeDetailsPage() {
    console.log('Initializing employee details page...');
    
    const empModal = document.getElementById('employeeModal');
    const empAddBtn = document.getElementById('addEmployeeBtn');
    const empCloseBtn = document.querySelector('.emp-modal-close');
    const empCancelBtn = document.getElementById('empCancelBtn');
    const empForm = document.getElementById('employeeForm');
    const empSubmitBtn = document.getElementById('empSubmitBtn');
    const empOnRole = document.getElementById('empOnRole');
    const empIntern = document.getElementById('empIntern');
    const onRoleFields = document.getElementById('onRoleFields');
    const internFields = document.getElementById('internFields');
    const internStartDate = document.getElementById('internStartDate');
    const internEndDate = document.getElementById('internEndDate');
    const durationMonths = document.getElementById('durationMonths');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    const passwordError = document.getElementById('passwordError');


    if (!empAddBtn || !empModal) {
        console.error('Employee modal elements not found!');
        return;
    }


    console.log('Elements found, setting up event listeners...');


    const uploadedFiles = {};


    function toggleEmploymentFields() {
        if (empIntern && empIntern.checked) {
            if (internFields) internFields.style.display = 'block';
            if (onRoleFields) onRoleFields.style.display = 'none';
            
            const workingStatusOnRole = document.getElementById('workingStatusOnRole');
            const joinDateOnRole = document.getElementById('joinDateOnRole');
            const workingStatusIntern = document.getElementById('workingStatusIntern');
            
            if (workingStatusOnRole) workingStatusOnRole.removeAttribute('required');
            if (joinDateOnRole) joinDateOnRole.removeAttribute('required');
            if (internStartDate) internStartDate.setAttribute('required', 'required');
            if (internEndDate) internEndDate.setAttribute('required', 'required');
            if (workingStatusIntern) workingStatusIntern.setAttribute('required', 'required');
        } else {
            if (internFields) internFields.style.display = 'none';
            if (onRoleFields) onRoleFields.style.display = 'grid';
            
            const workingStatusOnRole = document.getElementById('workingStatusOnRole');
            const joinDateOnRole = document.getElementById('joinDateOnRole');
            const workingStatusIntern = document.getElementById('workingStatusIntern');
            
            if (workingStatusOnRole) workingStatusOnRole.setAttribute('required', 'required');
            if (joinDateOnRole) joinDateOnRole.setAttribute('required', 'required');
            if (internStartDate) internStartDate.removeAttribute('required');
            if (internEndDate) internEndDate.removeAttribute('required');
            if (workingStatusIntern) workingStatusIntern.removeAttribute('required');
            
            if (internStartDate) internStartDate.value = '';
            if (internEndDate) internEndDate.value = '';
            if (durationMonths) durationMonths.value = '';
            if (workingStatusIntern) workingStatusIntern.value = '';
        }
    }


    function calculateDuration() {
        if (!internStartDate || !internEndDate || !durationMonths) return;
        
        const startDate = new Date(internStartDate.value);
        const endDate = new Date(internEndDate.value);
        
        if (internStartDate.value && internEndDate.value) {
            if (endDate < startDate) {
                durationMonths.value = 'Invalid dates';
                return;
            }
            
            const monthDiff = endDate.getMonth() - startDate.getMonth() + 
                             (12 * (endDate.getFullYear() - startDate.getFullYear()));
            
            const daysDiff = endDate.getDate() - startDate.getDate();
            let totalMonths = monthDiff;
            
            if (daysDiff > 0) {
                totalMonths += daysDiff / 30;
            }
            
            totalMonths = Math.round(totalMonths);
            durationMonths.value = totalMonths + (totalMonths === 1 ? ' month' : ' months');
        } else {
            durationMonths.value = '';
        }
    }


    function togglePasswordVisibility(inputField, toggleButton) {
        if (inputField.type === 'password') {
            inputField.type = 'text';
            toggleButton.src = './assets/Imgaes/eye_login.webp';
        } else {
            inputField.type = 'password';
            toggleButton.src = './assets/Imgaes/eye_slash_login.webp';
        }
    }


    function checkPasswordMatch() {
        if (!passwordInput || !confirmPasswordInput) return true;
        
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword.length > 0) {
            if (password !== confirmPassword) {
                if (passwordError) passwordError.style.display = 'block';
                if (empSubmitBtn) {
                    empSubmitBtn.disabled = true;
                    empSubmitBtn.style.opacity = '0.5';
                    empSubmitBtn.style.cursor = 'not-allowed';
                }
                return false;
            } else {
                if (passwordError) passwordError.style.display = 'none';
                if (empSubmitBtn) {
                    empSubmitBtn.disabled = false;
                    empSubmitBtn.style.opacity = '1';
                    empSubmitBtn.style.cursor = 'pointer';
                }
                return true;
            }
        } else {
            if (passwordError) passwordError.style.display = 'none';
            if (empSubmitBtn) {
                empSubmitBtn.disabled = false;
                empSubmitBtn.style.opacity = '1';
                empSubmitBtn.style.cursor = 'pointer';
            }
            return true;
        }
    }


    function isImageFile(file) {
        return file.type.startsWith('image/');
    }


    function createPreviewElement(file, inputId, index) {
        const previewItem = document.createElement('div');
        previewItem.className = 'emp-preview-item';
        previewItem.dataset.index = index;


        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'emp-preview-cancel';
        cancelBtn.innerHTML = '×';
        cancelBtn.type = 'button';
        cancelBtn.onclick = () => removeFile(inputId, index);


        if (isImageFile(file)) {
            const img = document.createElement('img');
            img.className = 'emp-preview-image';
            img.src = URL.createObjectURL(file);
            previewItem.appendChild(img);
        } else {
            const fileInfo = document.createElement('div');
            fileInfo.className = 'emp-preview-file';
            
            const fileIcon = document.createElement('span');
            fileIcon.className = 'emp-preview-file-icon';
            fileIcon.innerHTML = '📄';
            
            const fileName = document.createElement('span');
            fileName.className = 'emp-preview-file-name';
            fileName.textContent = file.name;
            
            fileInfo.appendChild(fileIcon);
            fileInfo.appendChild(fileName);
            previewItem.appendChild(fileInfo);
        }


        previewItem.appendChild(cancelBtn);
        return previewItem;
    }


    function updatePreview(inputId) {
        const previewContainer = document.getElementById(`preview-${inputId}`);
        if (!previewContainer) return;
        
        previewContainer.innerHTML = '';


        if (uploadedFiles[inputId] && uploadedFiles[inputId].length > 0) {
            uploadedFiles[inputId].forEach((file, index) => {
                const previewElement = createPreviewElement(file, inputId, index);
                previewContainer.appendChild(previewElement);
            });
        }
    }


    function removeFile(inputId, index) {
        if (uploadedFiles[inputId]) {
            uploadedFiles[inputId].splice(index, 1);
            updatePreview(inputId);
            
            const input = document.getElementById(inputId);
            if (input) {
                const dt = new DataTransfer();
                uploadedFiles[inputId].forEach(file => dt.items.add(file));
                input.files = dt.files;
            }
        }
    }


    const fileInputs = document.querySelectorAll('.emp-file-input');
    const singleFileInputs = ['employeePhoto', 'resumeCV'];


    fileInputs.forEach(input => {
        input.onchange = function() {
            const inputId = this.id;
            const isSingleFile = singleFileInputs.includes(inputId);
            
            if (isSingleFile) {
                uploadedFiles[inputId] = this.files.length > 0 ? [this.files[0]] : [];
            } else {
                if (!uploadedFiles[inputId]) {
                    uploadedFiles[inputId] = [];
                }
                
                const newFiles = Array.from(this.files);
                uploadedFiles[inputId] = [...uploadedFiles[inputId], ...newFiles];
                
                const dt = new DataTransfer();
                uploadedFiles[inputId].forEach(file => dt.items.add(file));
                this.files = dt.files;
            }
            
            updatePreview(inputId);
        };
    });


    if (empOnRole) empOnRole.onchange = toggleEmploymentFields;
    if (empIntern) empIntern.onchange = toggleEmploymentFields;
    if (internStartDate) internStartDate.onchange = calculateDuration;
    if (internEndDate) internEndDate.onchange = calculateDuration;


    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.onclick = () => togglePasswordVisibility(passwordInput, togglePasswordBtn);
    }


    if (toggleConfirmPasswordBtn && confirmPasswordInput) {
        toggleConfirmPasswordBtn.onclick = () => togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordBtn);
    }


    if (passwordInput) passwordInput.oninput = checkPasswordMatch;
    if (confirmPasswordInput) confirmPasswordInput.oninput = checkPasswordMatch;


    empAddBtn.onclick = () => {
        console.log('Add Employee button clicked!');
        resetEditingIndex();
        empModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        toggleEmploymentFields();
    };


    if (empCloseBtn) {
        empCloseBtn.onclick = () => {
            empModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }


    if (empCancelBtn) {
        empCancelBtn.onclick = () => {
            empModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            empForm.reset();
            toggleEmploymentFields();
            if (passwordError) passwordError.style.display = 'none';
            if (empSubmitBtn) {
                empSubmitBtn.disabled = false;
                empSubmitBtn.style.opacity = '1';
                empSubmitBtn.style.cursor = 'pointer';
            }
            
            Object.keys(uploadedFiles).forEach(key => {
                uploadedFiles[key] = [];
                const previewContainer = document.getElementById(`preview-${key}`);
                if (previewContainer) {
                    previewContainer.innerHTML = '';
                }
            });
        };
    }


    empModal.onclick = (e) => {
        if (e.target === empModal) {
            empModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };


    if (empForm) {
        empForm.onsubmit = function(e) {
            e.preventDefault();
            return false;
        };
    }


    if (empSubmitBtn) {
        empSubmitBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Submit button clicked');
            
            if (!empForm.checkValidity()) {
                empForm.reportValidity();
                return false;
            }
            
            const empFormData = new FormData(empForm);
            const empData = Object.fromEntries(empFormData.entries());
            
            if (empData.password !== empData.confirmPassword) {
                alert('Passwords do not match!');
                return false;
            }
            
            if (empIntern && empIntern.checked) {
                const startDate = new Date(internStartDate.value);
                const endDate = new Date(internEndDate.value);
                
                if (endDate < startDate) {
                    alert('Intern end date must be after start date!');
                    return false;
                }
            }
            
            let photoURL = null;
            if (uploadedFiles.employeePhoto && uploadedFiles.employeePhoto.length > 0) {
                photoURL = URL.createObjectURL(uploadedFiles.employeePhoto[0]);
            }
            
            const newEmployee = {
                employeeId: empData.employeeId,
                employeeName: empData.employeeName,
                dob: empData.dob,
                gender: empData.gender,
                emailPersonal: empData.emailPersonal,
                emailOfficial: empData.emailOfficial,
                phonePersonal: empData.phonePersonal,
                phoneOfficial: empData.phoneOfficial,
                designation: empData.designation,
                employmentType: empData.employmentType,
                workingStatus: empData.employmentType === 'On Role' ? empData.workingStatus : empData.workingStatusIntern,
                joinDate: empData.joinDate || null,
                internStartDate: empData.internStartDate || null,
                internEndDate: empData.internEndDate || null,
                durationMonths: empData.durationMonths || null,
                address: empData.address,
                photoURL: photoURL,
                uploadedFiles: JSON.parse(JSON.stringify(uploadedFiles))
            };
            
            addEmployeeToData(newEmployee);
            
            empModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            empForm.reset();
            toggleEmploymentFields();
            if (passwordError) passwordError.style.display = 'none';
            if (empSubmitBtn) {
                empSubmitBtn.disabled = false;
                empSubmitBtn.style.opacity = '1';
                empSubmitBtn.style.cursor = 'pointer';
            }
            
            Object.keys(uploadedFiles).forEach(key => {
                uploadedFiles[key] = [];
                const previewContainer = document.getElementById(`preview-${key}`);
                if (previewContainer) {
                    previewContainer.innerHTML = '';
                }
            });
            
            alert('Employee added successfully!');
            return false;
        };
    }


    // Initial table render with fake data
    renderEmployeeTable();


    console.log('Employee details page initialized successfully!');
}


// Function to render the employee table
function renderEmployeeTable() {
    const tableBody = document.getElementById('employeeTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (employeesData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align: center; padding: 40px; color: #999;">
                    No employees added yet. Click "Add Employee" to get started.
                </td>
            </tr>
        `;
        return;
    }
    
    employeesData.forEach((employee, index) => {
        const row = document.createElement('tr');
        
        // Get job role badge color
        let jobRoleBadgeClass = '';
        if (employee.employmentType === 'On Role') {
            jobRoleBadgeClass = 'job-role-onrole';
        } else {
            jobRoleBadgeClass = 'job-role-intern';
        }
        
        row.innerHTML = `
            <td>${employee.employeeId}</td>
            <td>
                <div class="employee-name-cell">
                    <div class="employee-avatar">
                        ${employee.photoURL ? 
                            `<img src="${employee.photoURL}" alt="${employee.employeeName}">` : 
                            `<div class="avatar-placeholder">${employee.employeeName.charAt(0).toUpperCase()}</div>`
                        }
                    </div>
                    <span>${employee.employeeName}</span>
                </div>
            </td>
            <td>${employee.designation}</td>
            <td><span class="job-role-badge ${jobRoleBadgeClass}">${employee.employmentType}</span></td>
            <td><span class="status-badge status-working">${employee.workingStatus}</span></td>
            <td>
                <div class="contact-cell">
                    <img src="./assets/Imgaes/table_mail.webp" alt="Email" class="contact-icon">
                    ${employee.emailPersonal}
                </div>
            </td>
            <td>
                <div class="contact-cell">
                    <img src="./assets/Imgaes/table_call.webp" alt="Phone" class="contact-icon">
                    ${employee.phonePersonal}
                </div>
            </td>
            <td>
                <button class="table-view-btn" onclick="viewEmployee(${index})">
                    <img src="./assets/Imgaes/table_eye.webp" alt="View">
                </button>
            </td>
            <td>
                <button class="table-delete-btn" onclick="deleteEmployee(${index})">
                    <img src="./assets/Imgaes/preview_delete_btn.webp" alt="Delete">
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}


// Function to view employee (opens update modal with data)
function viewEmployee(index) {
    currentEditingIndex = index;
    const employee = employeesData[index];
    
    // Populate update modal with employee data
    if (typeof populateUpdateModal === 'function') {
        populateUpdateModal(employee);
    }
    
    // Open update modal
    const updateEmployeeModal = document.getElementById('updateEmployeeModal');
    if (updateEmployeeModal) {
        updateEmployeeModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}


// Function to delete employee
function deleteEmployee(index) {
    const employee = employeesData[index];
    if (confirm(`Are you sure you want to delete ${employee.employeeName}?`)) {
        employeesData.splice(index, 1);
        renderEmployeeTable();
        alert('Employee deleted successfully!');
    }
}


// Function to add employee to data
function addEmployeeToData(employeeData) {
    employeesData.push(employeeData);
    renderEmployeeTable();
}


// Function to update employee in data
function updateEmployeeInData(index, employeeData) {
    if (index !== null && index >= 0 && index < employeesData.length) {
        employeesData[index] = employeeData;
        renderEmployeeTable();
    }
}


// Function to get current editing index
function getCurrentEditingIndex() {
    return currentEditingIndex;
}


// Function to reset editing index
function resetEditingIndex() {
    currentEditingIndex = null;
}

// Function to initialize update employee modal (called from script.js)
function initializeUpdateEmployeeModal() {
  console.log('Initializing update employee modal...');
  
  const updateEmployeeModal = document.getElementById("updateEmployeeModal");
  const updateModalClose = document.querySelector(".update-emp-modal-close");
  const fileViewModal = document.getElementById("fileViewModal");
  const fileViewContent = document.getElementById("fileViewContent");
  const fileViewClose = document.querySelector(".update-emp-view-modal-close");


  if (!updateEmployeeModal) {
    console.error("updateEmployeeModal not found!");
    return;
  }


  console.log('Update modal elements found!');


  const uploadedFiles = {
    employeePhoto: null,
    resumeCV: null,
    idProof: [],
    certificates: [],
    otherDocs: [],
  };


  function downloadFile(fileUrl, fileName) {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  function viewFile(fileUrl, fileType, fileName) {
    if (!fileViewModal || !fileViewContent) return;
 
    fileViewContent.innerHTML = "";
    const previewContainer = document.createElement("div");
    previewContainer.style.marginBottom = "20px";


    if (fileType.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = fileUrl;
      img.style.maxWidth = "100%";
      img.style.maxHeight = "70vh";
      img.style.objectFit = "contain";
      previewContainer.appendChild(img);
    } else if (fileType === "application/pdf") {
      const iframe = document.createElement("iframe");
      iframe.src = fileUrl;
      iframe.style.width = "100%";
      iframe.style.height = "70vh";
      iframe.style.border = "none";
      previewContainer.appendChild(iframe);
    } else {
      const message = document.createElement("p");
      message.textContent = `File: ${fileName}`;
      message.style.color = "white";
      message.style.textAlign = "center";
      message.style.fontSize = "18px";
      message.style.marginTop = "50px";
      previewContainer.appendChild(message);


      const fileIcon = document.createElement("div");
      fileIcon.textContent = "📄";
      fileIcon.style.fontSize = "100px";
      fileIcon.style.textAlign = "center";
      fileIcon.style.marginTop = "20px";
      previewContainer.appendChild(fileIcon);
    }


    fileViewContent.appendChild(previewContainer);


    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download";
    downloadBtn.className = "update-emp-download-btn";
    downloadBtn.onclick = function () {
      downloadFile(fileUrl, fileName);
    };


    fileViewContent.appendChild(downloadBtn);
    fileViewModal.style.display = "block";
  }


  function populateModalWithData(employeeData) {
    const form = document.getElementById("updateEmployeeForm");
    
    if (!employeeData || !form) {
      console.error("No employee data or form not found!");
      return;
    }


    console.log("Loading employee data:", employeeData);


    form.querySelector('[name="employeeId"]').value = employeeData.employeeId || '';
    form.querySelector('[name="employeeName"]').value = employeeData.employeeName || '';
    form.querySelector('[name="dob"]').value = employeeData.dob || '';
    
    if (employeeData.gender) {
      const genderValue = employeeData.gender.toLowerCase();
      const genderRadio = form.querySelector(`input[name="gender"][value="${genderValue}"]`);
      if (genderRadio) {
        genderRadio.checked = true;
      }
    }


    form.querySelector('[name="emailPersonal"]').value = employeeData.emailPersonal || '';
    form.querySelector('[name="emailOfficial"]').value = employeeData.emailOfficial || '';
    form.querySelector('[name="phonePersonal"]').value = employeeData.phonePersonal || '';
    form.querySelector('[name="phoneOfficial"]').value = employeeData.phoneOfficial || '';


    const employmentTypeRadio = form.querySelector(`input[name="employmentType"][value="${employeeData.employmentType}"]`);
    if (employmentTypeRadio) {
      employmentTypeRadio.checked = true;
      
      // Manually trigger toggle
      const updateEmpOnRole = document.getElementById("updateEmpOnRole");
      const updateEmpIntern = document.getElementById("updateEmpIntern");
      const updateOnRoleFields = document.getElementById("updateOnRoleFields");
      const updateInternFields = document.getElementById("updateInternFields");
      
      if (employeeData.employmentType === "On Role") {
        if (updateOnRoleFields) updateOnRoleFields.style.display = "grid";
        if (updateInternFields) updateInternFields.style.display = "none";
      } else {
        if (updateOnRoleFields) updateOnRoleFields.style.display = "none";
        if (updateInternFields) updateInternFields.style.display = "block";
      }
    }


    form.querySelector('[name="designation"]').value = employeeData.designation || '';


    setTimeout(() => {
      if (employeeData.employmentType === "On Role") {
        const workingStatus = form.querySelector('[name="workingStatus"]');
        const joinDate = form.querySelector('[name="joinDate"]');
        if (workingStatus) workingStatus.value = employeeData.workingStatus || '';
        if (joinDate) joinDate.value = employeeData.joinDate || '';
      } else if (employeeData.employmentType === "Intern") {
        const internStart = form.querySelector('[name="internStartDate"]');
        const internEnd = form.querySelector('[name="internEndDate"]');
        const duration = form.querySelector('[name="durationMonths"]');
        const workingStatusIntern = form.querySelector('[name="workingStatusIntern"]');
        
        if (internStart) internStart.value = employeeData.internStartDate || '';
        if (internEnd) internEnd.value = employeeData.internEndDate || '';
        if (duration) duration.value = employeeData.durationMonths || '';
        if (workingStatusIntern) workingStatusIntern.value = employeeData.workingStatus || '';
      }
    }, 100);


    form.querySelector('[name="address"]').value = employeeData.address || '';


    document.getElementById('updateModalTitle').textContent = 'Update Employee - ' + employeeData.employeeName;
    document.getElementById('updateEmpSubmitBtn').textContent = 'Save Changes';
  }


  window.populateUpdateModal = populateModalWithData;


  function closeModal() {
    updateEmployeeModal.style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById('updateModalTitle').textContent = 'Update Employee Details';
    document.getElementById('updateEmpSubmitBtn').textContent = 'Update Employee';
  }


  if (updateModalClose) {
    updateModalClose.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    };
  }


  updateEmployeeModal.onclick = function(event) {
    if (event.target === updateEmployeeModal) {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    }
  };


  if (fileViewClose) {
    fileViewClose.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      fileViewModal.style.display = "none";
    };
  }


  if (fileViewModal) {
    fileViewModal.onclick = function(event) {
      if (event.target === fileViewModal) {
        event.preventDefault();
        event.stopPropagation();
        fileViewModal.style.display = "none";
      }
    };
  }


  const updateEmpOnRole = document.getElementById("updateEmpOnRole");
  const updateEmpIntern = document.getElementById("updateEmpIntern");
  const updateOnRoleFields = document.getElementById("updateOnRoleFields");
  const updateInternFields = document.getElementById("updateInternFields");


  if (updateEmpOnRole) {
    updateEmpOnRole.onchange = function() {
      if (this.checked) {
        if (updateOnRoleFields) updateOnRoleFields.style.display = "grid";
        if (updateInternFields) updateInternFields.style.display = "none";
      }
    };
  }


  if (updateEmpIntern) {
    updateEmpIntern.onchange = function() {
      if (this.checked) {
        if (updateOnRoleFields) updateOnRoleFields.style.display = "none";
        if (updateInternFields) updateInternFields.style.display = "block";
      }
    };
  }


  const updateInternStartDate = document.getElementById("updateInternStartDate");
  const updateInternEndDate = document.getElementById("updateInternEndDate");
  const updateDurationMonths = document.getElementById("updateDurationMonths");


  function calculateDuration() {
    if (updateInternStartDate && updateInternEndDate && updateDurationMonths) {
      if (updateInternStartDate.value && updateInternEndDate.value) {
        const start = new Date(updateInternStartDate.value);
        const end = new Date(updateInternEndDate.value);
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        updateDurationMonths.value = months + " months";
      }
    }
  }


  if (updateInternStartDate) {
    updateInternStartDate.onchange = calculateDuration;
  }


  if (updateInternEndDate) {
    updateInternEndDate.onchange = calculateDuration;
  }


  function handleSingleFilePreview(inputId, previewId, storageKey) {
    const input = document.getElementById(inputId);
    const previewContainer = document.getElementById(previewId);


    if (!input || !previewContainer) return;


    input.onchange = function() {
      previewContainer.innerHTML = "";
      const file = this.files[0];


      if (file) {
        uploadedFiles[storageKey] = file;
        const fileType = file.type;
        const fileName = file.name;
        const fileUrl = URL.createObjectURL(file);


        const previewItem = document.createElement("div");
        previewItem.className = "update-emp-preview-item";


        if (fileType.startsWith("image/")) {
          const img = document.createElement("img");
          img.src = fileUrl;
          img.className = "update-emp-preview-image";
          previewItem.appendChild(img);
        } else {
          const fileInfo = document.createElement("div");
          fileInfo.className = "update-emp-preview-file";


          const fileIcon = document.createElement("div");
          fileIcon.className = "update-emp-preview-file-icon";
          fileIcon.textContent = "📄";
          fileInfo.appendChild(fileIcon);


          const fileNameDiv = document.createElement("div");
          fileNameDiv.className = "update-emp-preview-file-name";
          fileNameDiv.textContent = fileName;
          fileInfo.appendChild(fileNameDiv);


          previewItem.appendChild(fileInfo);
        }


        const xBtn = document.createElement("button");
        xBtn.innerHTML = "×";
        xBtn.className = "update-emp-preview-x-btn";
        xBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (confirm("Are you sure you want to remove this file?")) {
            previewItem.remove();
            input.value = "";
            uploadedFiles[storageKey] = null;
          }
        };
        previewItem.appendChild(xBtn);


        const btnContainer = document.createElement("div");
        btnContainer.className = "update-emp-preview-actions";


        const viewBtn = document.createElement("button");
        viewBtn.textContent = "View";
        viewBtn.className = "update-emp-preview-view-btn";
        viewBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          viewFile(fileUrl, fileType, fileName);
        };
        btnContainer.appendChild(viewBtn);


        const downloadBtn = document.createElement("button");
        downloadBtn.textContent = "Download";
        downloadBtn.className = "update-emp-preview-download-btn-inline";
        downloadBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          downloadFile(fileUrl, fileName);
        };
        btnContainer.appendChild(downloadBtn);


        previewItem.appendChild(btnContainer);
        previewContainer.appendChild(previewItem);
      }
    };
  }


  function handleMultipleFilePreview(inputId, previewId, storageKey) {
    const input = document.getElementById(inputId);
    const previewContainer = document.getElementById(previewId);


    if (!input || !previewContainer) return;


    input.onchange = function() {
      const files = this.files;


      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          uploadedFiles[storageKey].push(file);


          const fileType = file.type;
          const fileName = file.name;
          const fileUrl = URL.createObjectURL(file);


          const previewItem = document.createElement("div");
          previewItem.className = "update-emp-preview-item";
          previewItem.dataset.fileIndex = uploadedFiles[storageKey].length - 1;


          if (fileType.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = fileUrl;
            img.className = "update-emp-preview-image";
            previewItem.appendChild(img);
          } else {
            const fileInfo = document.createElement("div");
            fileInfo.className = "update-emp-preview-file";


            const fileIcon = document.createElement("div");
            fileIcon.className = "update-emp-preview-file-icon";
            fileIcon.textContent = "📄";
            fileInfo.appendChild(fileIcon);


            const fileNameDiv = document.createElement("div");
            fileNameDiv.className = "update-emp-preview-file-name";
            fileNameDiv.textContent = fileName;
            fileInfo.appendChild(fileNameDiv);


            previewItem.appendChild(fileInfo);
          }


          const xBtn = document.createElement("button");
          xBtn.innerHTML = "×";
          xBtn.className = "update-emp-preview-x-btn";
          xBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (confirm("Are you sure you want to remove this file?")) {
              const fileIndex = parseInt(previewItem.dataset.fileIndex);
              uploadedFiles[storageKey].splice(fileIndex, 1);
              previewItem.remove();


              const remainingItems = previewContainer.querySelectorAll(".update-emp-preview-item");
              remainingItems.forEach((item, idx) => {
                item.dataset.fileIndex = idx;
              });
            }
          };
          previewItem.appendChild(xBtn);


          const btnContainer = document.createElement("div");
          btnContainer.className = "update-emp-preview-actions";


          const viewBtn = document.createElement("button");
          viewBtn.textContent = "View";
          viewBtn.className = "update-emp-preview-view-btn";
          viewBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            viewFile(fileUrl, fileType, fileName);
          };
          btnContainer.appendChild(viewBtn);


          const downloadBtn = document.createElement("button");
          downloadBtn.textContent = "Download";
          downloadBtn.className = "update-emp-preview-download-btn-inline";
          downloadBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            downloadFile(fileUrl, fileName);
          };
          btnContainer.appendChild(downloadBtn);


          previewItem.appendChild(btnContainer);
          previewContainer.appendChild(previewItem);
        }
      }


      input.value = "";
    };
  }


  handleSingleFilePreview("updateEmployeePhoto", "update-preview-employeePhoto", "employeePhoto");
  handleSingleFilePreview("updateResumeCV", "update-preview-resumeCV", "resumeCV");
  handleMultipleFilePreview("updateIdProof", "update-preview-idProof", "idProof");
  handleMultipleFilePreview("updateCertificates", "update-preview-certificates", "certificates");
  handleMultipleFilePreview("updateOtherDocs", "update-preview-otherDocs", "otherDocs");


  // IMPORTANT: Prevent form submission and handle it manually
  const form = document.getElementById("updateEmployeeForm");
  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault(); // CRITICAL: Stop form from submitting
      e.stopPropagation();
      console.log('Form submit prevented');
      return false;
    };
  }


  const submitBtn = document.getElementById("updateEmpSubmitBtn");
if (submitBtn) {
  submitBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Submit button clicked');


    const editingIndex = typeof getCurrentEditingIndex === 'function' ? getCurrentEditingIndex() : null;
    
    if (editingIndex === null || typeof employeesData === 'undefined') {
      console.error('Cannot update: no editing index');
      alert('Error: No employee selected for editing');
      return false;
    }
    
    const existingEmployee = employeesData[editingIndex];
    
    // Get form values - use existing data if field is empty
    const employeeId = form.querySelector('[name="employeeId"]').value || existingEmployee.employeeId;
    const employeeName = form.querySelector('[name="employeeName"]').value || existingEmployee.employeeName;
    const dob = form.querySelector('[name="dob"]').value || existingEmployee.dob;
    
    const genderRadio = form.querySelector('input[name="gender"]:checked');
    const gender = genderRadio ? genderRadio.value : existingEmployee.gender;
    
    const emailPersonal = form.querySelector('[name="emailPersonal"]').value || existingEmployee.emailPersonal;
    const emailOfficial = form.querySelector('[name="emailOfficial"]').value || existingEmployee.emailOfficial;
    const phonePersonal = form.querySelector('[name="phonePersonal"]').value || existingEmployee.phonePersonal;
    const phoneOfficial = form.querySelector('[name="phoneOfficial"]').value || existingEmployee.phoneOfficial;
    
    const designation = form.querySelector('[name="designation"]').value || existingEmployee.designation;
    
    const employmentTypeRadio = form.querySelector('input[name="employmentType"]:checked');
    const employmentType = employmentTypeRadio ? employmentTypeRadio.value : existingEmployee.employmentType;
    
    const address = form.querySelector('[name="address"]').value || existingEmployee.address;
    
    // Handle employment type specific fields
    let workingStatus = existingEmployee.workingStatus;
    let joinDate = existingEmployee.joinDate;
    let internStartDate = existingEmployee.internStartDate;
    let internEndDate = existingEmployee.internEndDate;
    let durationMonths = existingEmployee.durationMonths;
    
    if (employmentType === 'On Role') {
      const workingStatusInput = form.querySelector('[name="workingStatus"]');
      const joinDateInput = form.querySelector('[name="joinDate"]');
      
      if (workingStatusInput) workingStatus = workingStatusInput.value || existingEmployee.workingStatus;
      if (joinDateInput) joinDate = joinDateInput.value || existingEmployee.joinDate;
    } else if (employmentType === 'Intern') {
      const workingStatusInternInput = form.querySelector('[name="workingStatusIntern"]');
      const internStartInput = form.querySelector('[name="internStartDate"]');
      const internEndInput = form.querySelector('[name="internEndDate"]');
      const durationInput = form.querySelector('[name="durationMonths"]');
      
      if (workingStatusInternInput) workingStatus = workingStatusInternInput.value || existingEmployee.workingStatus;
      if (internStartInput) internStartDate = internStartInput.value || existingEmployee.internStartDate;
      if (internEndInput) internEndDate = internEndInput.value || existingEmployee.internEndDate;
      if (durationInput) durationMonths = durationInput.value || existingEmployee.durationMonths;
    }
    
    // Handle photo upload
    let photoURL = existingEmployee.photoURL;
    if (uploadedFiles.employeePhoto) {
      photoURL = URL.createObjectURL(uploadedFiles.employeePhoto);
    }
    
    // Build updated employee object
    const updatedEmployee = {
      employeeId: employeeId,
      employeeName: employeeName,
      dob: dob,
      gender: gender,
      emailPersonal: emailPersonal,
      emailOfficial: emailOfficial,
      phonePersonal: phonePersonal,
      phoneOfficial: phoneOfficial,
      designation: designation,
      employmentType: employmentType,
      workingStatus: workingStatus,
      joinDate: joinDate,
      internStartDate: internStartDate,
      internEndDate: internEndDate,
      durationMonths: durationMonths,
      address: address,
      photoURL: photoURL,
      uploadedFiles: {
        employeePhoto: uploadedFiles.employeePhoto 
          ? [uploadedFiles.employeePhoto] 
          : (existingEmployee.uploadedFiles?.employeePhoto || []),
        resumeCV: uploadedFiles.resumeCV 
          ? [uploadedFiles.resumeCV] 
          : (existingEmployee.uploadedFiles?.resumeCV || []),
        idProof: uploadedFiles.idProof.length > 0 
          ? [...uploadedFiles.idProof] 
          : (existingEmployee.uploadedFiles?.idProof || []),
        certificates: uploadedFiles.certificates.length > 0 
          ? [...uploadedFiles.certificates] 
          : (existingEmployee.uploadedFiles?.certificates || []),
        otherDocs: uploadedFiles.otherDocs.length > 0 
          ? [...uploadedFiles.otherDocs] 
          : (existingEmployee.uploadedFiles?.otherDocs || [])
      }
    };
    
    console.log('Saving updated employee:', updatedEmployee);
    
    // Update in data array
    if (typeof updateEmployeeInData === 'function') {
      updateEmployeeInData(editingIndex, updatedEmployee);
      alert('Employee updated successfully!');
    }
    
    // Close modal and cleanup
    closeModal();
    form.reset();
    
    uploadedFiles.employeePhoto = null;
    uploadedFiles.resumeCV = null;
    uploadedFiles.idProof = [];
    uploadedFiles.certificates = [];
    uploadedFiles.otherDocs = [];
    
    document.getElementById("update-preview-employeePhoto").innerHTML = "";
    document.getElementById("update-preview-resumeCV").innerHTML = "";
    document.getElementById("update-preview-idProof").innerHTML = "";
    document.getElementById("update-preview-certificates").innerHTML = "";
    document.getElementById("update-preview-otherDocs").innerHTML = "";
    
    if (typeof resetEditingIndex === 'function') {
      resetEditingIndex();
    }
    
    return false;
  };
}



  console.log('Update employee modal initialized successfully!');
}
