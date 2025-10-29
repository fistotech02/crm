// =========================
//        LOGIN SCRIPT
// =========================

// Toggle Password Visibility
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".password-toggle");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.innerHTML =
      '<img src="./assets/Imgaes/eye_login.webp" alt="Show Password">';
  } else {
    passwordInput.type = "password";
    toggleIcon.innerHTML =
      '<img src="./assets/Imgaes/eye_slash_login.webp" alt="Hide Password">';
  }
}

// Auto Uppercase for Employee ID
document.getElementById("employeeId").addEventListener("input", function () {
  this.value = this.value.toUpperCase();
});

// Reference to existing error spans in HTML
const employeeError = document.getElementById("employeeIdError");
const passwordError = document.getElementById("passwordError");

// Array of employee objects with ID, Password, Name, and Designation
const employees = [
  {
    employeeId: "FST001",
    password: "1234",
    name: "Agasthiya",
    designation: "SBU"
  },
  {
    employeeId: "FST002",
    password: "1234",
    name: "Atchaya",
    designation: "Project Head"
  },
  {
    employeeId: "FST003",
    password: "1234",
    name: "Sham",
    designation: "Team Head"
  },
  {
    employeeId: "FST004",
    password: "1234",
    name: "Prakash",
    designation: "HR Manager"
  },
  {
    employeeId: "FST005",
    password: "1234",
    name: "Luffy",
    designation: "Junior Developer"
  },
  {
    employeeId: "FST000",
    password: "1234",
    name: "Shanks",
    designation: "Super Admin"
  }
];

// Handle Form Submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const employeeId = document.getElementById("employeeId").value.trim();
  const password = document.getElementById("password").value.trim();
  const loginBtn = document.querySelector(".login-btn");

  // Reset error messages
  employeeError.textContent = "";
  passwordError.textContent = "";

  // Check for empty fields
  if (!employeeId) {
    employeeError.textContent = "Please enter your Employee ID";
    return;
  }

  if (!password) {
    passwordError.textContent = "Please enter your Password";
    return;
  }

  // Find employee by ID
  const employee = employees.find(emp => emp.employeeId === employeeId);

  // Validate Employee ID
  if (!employee) {
    employeeError.textContent = "Invalid Employee ID";
    return;
  }

  // Validate Password
  if (employee.password !== password) {
    passwordError.textContent = "Wrong Password";
    return;
  }

  // If valid credentials -> show spinner & redirect
  loginBtn.disabled = true;
  loginBtn.innerHTML = '<div class="loading-spinner"></div>';

  // Store logged-in user data in sessionStorage
  sessionStorage.setItem("loggedInUser", employee.employeeId);
  sessionStorage.setItem("userName", employee.name);
  sessionStorage.setItem("userDesignation", employee.designation);

  // Redirect with slight delay
  setTimeout(() => {
    window.location.href = "home.html";
  }, 1200);
});
