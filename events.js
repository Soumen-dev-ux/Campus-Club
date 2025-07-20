// Events page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput")
  const categoryFilter = document.getElementById("categoryFilter")
  const eventsGrid = document.getElementById("eventsGrid")
  const noResults = document.getElementById("noResults")
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  // Tab functionality
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

  // Search and filter functionality
  function filterEvents() {
    const searchTerm = searchInput.value.toLowerCase()
    const selectedCategory = categoryFilter.value
    const eventCards = eventsGrid.querySelectorAll(".event-card")
    let visibleCount = 0

    eventCards.forEach((card) => {
      const title = card.querySelector(".event-title").textContent.toLowerCase()
      const description = card.querySelector(".event-description").textContent.toLowerCase()
      const club = card.querySelector(".event-club span").textContent.toLowerCase()
      const category = card.getAttribute("data-category")

      const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm) || club.includes(searchTerm)
      const matchesCategory = selectedCategory === "all" || category === selectedCategory

      if (matchesSearch && matchesCategory) {
        card.style.display = "block"
        visibleCount++
      } else {
        card.style.display = "none"
      }
    })

    // Show/hide no results message
    if (visibleCount === 0) {
      noResults.style.display = "block"
      eventsGrid.style.display = "none"
    } else {
      noResults.style.display = "none"
      eventsGrid.style.display = "grid"
    }
  }

  // Event listeners for search and filter
  if (searchInput) {
    searchInput.addEventListener("input", filterEvents)
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterEvents)
  }

  // Clear filters function
  window.clearFilters = () => {
    if (searchInput) searchInput.value = ""
    if (categoryFilter) categoryFilter.value = "all"
    filterEvents()
    window.showNotification("Filters cleared!", "info")
  }

  // Handle event registration
  document.addEventListener("click", (e) => {
    if (e.target.matches(".event-register")) {
      const isRegistered = e.target.classList.contains("registered")

      if (isRegistered) {
        e.target.textContent = "Register"
        e.target.classList.remove("registered")
        e.target.classList.remove("btn-outline")
        e.target.classList.add("btn-primary")
        window.showNotification("Unregistered from event!", "info")
      } else {
        e.target.textContent = "Registered"
        e.target.classList.add("registered")
        e.target.classList.remove("btn-primary")
        e.target.classList.add("btn-outline")
        window.showNotification("Successfully registered for event!", "success")
      }
    }
  })

  // Handle share buttons
  document.addEventListener("click", (e) => {
    if (e.target.matches(".fa-share") || e.target.closest(".action-btn")?.querySelector(".fa-share")) {
      e.preventDefault()
      const eventCard = e.target.closest(".event-card")
      const eventTitle = eventCard.querySelector(".event-title").textContent

      if (navigator.share) {
        navigator.share({
          title: eventTitle,
          text: `Check out this event: ${eventTitle}`,
          url: window.location.href,
        })
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href).then(() => {
          window.showNotification("Event link copied to clipboard!", "success")
        })
      }
    }
  })

  // Animate event cards on scroll
  const eventCards = document.querySelectorAll(".event-card")
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  })

  eventCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    cardObserver.observe(card)
  })

  // Declare showNotification function
  window.showNotification = (message, type) => {
    // Implementation of showNotification function
    console.log(`Notification (${type}): ${message}`)
  }

  // Theme Toggle Functionality
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  // Theme toggle click handler
  themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
  });
  
  // Update theme icon based on current theme
  function updateThemeIcon(theme) {
      themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
})
