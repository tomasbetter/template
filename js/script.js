/**
 * Consolidated JavaScript file for Travel Agency Website
 * Contains all JavaScript code from index.html
 */

document.addEventListener('DOMContentLoaded', function() {
  // Burger menu functionality
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');

  menuIcon.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event propagation
    e.preventDefault(); // Add this to prevent any default behavior
    navLinks.classList.toggle('active');
    console.log('Menu toggled:', navLinks.classList.contains('active')); // Debug logging
  });

  // Improve link click handling
  const navLinksItems = document.querySelectorAll('.nav-links a');
  navLinksItems.forEach(link => {
    link.addEventListener('click', function(e) {
      console.log('Link clicked:', this.href); // Debug logging
      navLinks.classList.remove('active');
      // Don't prevent default - let the link work
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        e.target !== menuIcon && 
        !menuIcon.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });
  
  // Prevent auto-scrolling on page load
  if (window.location.hash) {
    // Remove the hash fragment without triggering a page reload
    history.replaceState(null, document.title, window.location.pathname + window.location.search);
    // Scroll to top
    window.scrollTo(0, 0);
  }
  
  // Search form toggle
  const searchToggle = document.getElementById('search-toggle');
  const searchForm = document.getElementById('search-form');
  
  searchToggle.addEventListener('click', function() {
    searchForm.classList.toggle('active');
  });
  
  // Search form submission
  const searchFormElement = document.querySelector('.search-form');
  searchFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Search submitted!');
    searchForm.classList.remove('active');
    searchFormElement.reset();
  });
  
  // Newsletter form validation
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]');
    
    if (email.value) {
      alert('Subscribed successfully!');
      email.value = '';
    }
  });
  
  // Horizontal booking form validation
  const horizontalBookingForm = document.getElementById('horizontal-booking-form');
  if (horizontalBookingForm) {
    horizontalBookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const destination = document.getElementById('h-destination');
      const fromDate = document.getElementById('h-from-date');
      const toDate = document.getElementById('h-to-date');
      const guests = document.getElementById('h-guests');
      
      if (destination.value && fromDate.value && toDate.value && guests.value) {
        alert('Booking submitted successfully!');
        this.reset();
      } else {
        alert('Please fill in all fields');
      }
    });
  }

  // Initialize Flatpickr on date inputs
  initializeFlatpickr();
});

/**
 * Initialize Flatpickr date picker on date inputs
 */
function initializeFlatpickr() {
  // Helper function to calculate and set font size based on calendar width
  function updateCalendarFontSize(instance) {
    // Calculate base font size (proportional to container width)
    const width = instance.calendarContainer.offsetWidth;
    const baseFontSize = Math.max(12, Math.min(18, width * 0.05)); // Increased min/max and multiplier
    
    // Apply the calculated font size
    instance.calendarContainer.style.fontSize = baseFontSize + 'px';
  }
  
  function updateCalendarWidth(instance) {
    // Make calendar slightly wider than input to ensure all days are visible
    // Ensure minimum width of 280px
    const newWidth = Math.max(280, instance.input.offsetWidth * 1.1);
    instance.calendarContainer.style.width = newWidth + 'px';
    
    // Update font size after width change
    updateCalendarFontSize(instance);
  }
  
  function setupFlatpickr(inputId) {
    return flatpickr("#" + inputId, {
      dateFormat: "Y-m-d",
      allowInput: true,
      onReady: function(selectedDates, dateStr, instance) {
        // Set initial width and font size
        updateCalendarWidth(instance);
      },
      onOpen: function(selectedDates, dateStr, instance) {
        // Update width and font size when opening
        updateCalendarWidth(instance);
        
        // When calendar opens, change the input type to text to maintain the placeholder
        instance.input.type = 'text';
      },
      onClose: function(selectedDates, dateStr, instance) {
        // When calendar closes without a selection, keep it as text
        if (!dateStr) {
          instance.input.type = 'text';
        }
      }
    });
  }
  
  // Initialize Flatpickr on both date inputs
  const fromDatePicker = setupFlatpickr("h-from-date");
  const toDatePicker = setupFlatpickr("h-to-date");
  
  // Handle window resize to update calendar width and font size
  window.addEventListener('resize', function() {
    // Only update if calendar is open
    if (fromDatePicker.isOpen) {
      updateCalendarWidth(fromDatePicker);
    }
    if (toDatePicker.isOpen) {
      updateCalendarWidth(toDatePicker);
    }
  });
}
