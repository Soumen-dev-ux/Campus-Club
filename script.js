// Global JavaScript functionality


// Theme Toggle Functionality
  const themeToggle = document.getElementById("themeToggle")
  const themeIcon = themeToggle.querySelector("i")



// Profile dropdown functionality
document.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.querySelector(".profile-btn")
  const dropdownMenu = document.querySelector(".dropdown-menu")

  if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      dropdownMenu.classList.toggle("show")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      dropdownMenu.classList.remove("show")
    })

    // Prevent dropdown from closing when clicking inside
    dropdownMenu.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  }

  // Theme Toggle Functionality
  const themeToggle = document.getElementById("themeToggle")
  const themeIcon = themeToggle.querySelector("i")

})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add loading states to buttons
function addLoadingState(button, text = "Loading...") {
  const originalText = button.textContent
  button.textContent = text
  button.disabled = true

  setTimeout(() => {
    button.textContent = originalText
    button.disabled = false
  }, 2000)
}

// Handle button clicks with loading states
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-primary") || e.target.matches(".btn-outline")) {
    if (!e.target.disabled) {
      addLoadingState(e.target)
    }
  }
})

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Handle favorite buttons
document.addEventListener("click", (e) => {
  if (e.target.matches(".action-btn") || e.target.closest(".action-btn")) {
    const btn = e.target.closest(".action-btn") || e.target
    const icon = btn.querySelector("i")

    if (icon && icon.classList.contains("fa-heart")) {
      btn.classList.toggle("favorited")
      const isFavorited = btn.classList.contains("favorited")
      showNotification(
        isFavorited ? "Added to favorites!" : "Removed from favorites!",
        isFavorited ? "success" : "info",
      )
    }
  }
})
