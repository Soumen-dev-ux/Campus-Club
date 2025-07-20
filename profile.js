// Profile page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Tab functionality
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab")

      // Remove active class from all tabs and contents
      tabBtns.forEach((b) => b.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      this.classList.add("active")
      const targetContent = document.getElementById(targetTab + "-tab")
      if (targetContent) {
        targetContent.classList.add("active")
      }
    })
  })

  // Animate progress bars
  const progressBars = document.querySelectorAll(".progress-fill")
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target
        const width = progressBar.style.width
        progressBar.style.width = "0%"
        setTimeout(() => {
          progressBar.style.width = width
        }, 100)
      }
    })
  })

  progressBars.forEach((bar) => observer.observe(bar))

  // Handle club management buttons
  document.addEventListener("click", (e) => {
    if (e.target.textContent === "Manage") {
      window.showNotification("Club management panel opened!", "info")
    } else if (e.target.textContent === "View Club") {
      window.showNotification("Redirecting to club page...", "info")
    }
  })

  // Theme Toggle Functionality
  const themeToggle = document.getElementById("themeToggle")
  const themeIcon = themeToggle.querySelector("i")

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)

  // Theme toggle click handler
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "light" ? "dark" : "light"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)
  })

  // Update theme icon based on current theme
  function updateThemeIcon(theme) {
    themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun"
  }
})

// Declare showNotification function
function showNotification(message, type) {
  console.log(`Notification (${type}): ${message}`)
}
