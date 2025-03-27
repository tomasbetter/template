/**
 * Consolidated JavaScript file for Travel Agency Website
 * Contains all JavaScript code from index.html
 */

// Helper function to calculate and set font size based on calendar width
function updateCalendarFontSize(instance) {
  // Calculate base font size (proportional to container width)
  const width = instance.calendarContainer.offsetWidth;
  const baseFontSize = Math.max(12, Math.min(18, width * 0.05)); // Increased min/max and multiplier
  
  // Apply the calculated font size
  instance.calendarContainer.style.fontSize = baseFontSize + 'px';
}

// Helper function to update calendar width
function updateCalendarWidth(instance) {
  // Make calendar slightly wider than input to ensure all days are visible
  // Ensure minimum width of 280px
  const newWidth = Math.max(280, instance.input.offsetWidth * 1.1);
  instance.calendarContainer.style.width = newWidth + 'px';
  
  // Update font size after width change
  updateCalendarFontSize(instance);
}

// Function to setup Flatpickr instance
function setupFlatpickr(inputId, options = {}) {
  // Create configuration with minDate set to today
  const config = {
    dateFormat: "Y-m-d",
    allowInput: true,
    disableMobile: true, // Disable mobile native date picker
    defaultDate: null, // Don't set any default date
    minDate: "today", // Prevent selecting dates before today
    onReady: function(selectedDates, dateStr, instance) {
      // Set initial width and font size
      updateCalendarWidth(instance);
      // Clear any stored value
      instance.input.value = '';
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
        instance.input.value = '';
      }
    },
    ...options // Merge any additional options
  };
  
  return flatpickr("#" + inputId, config);
}

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
  
  // Expandable search bar toggle
  const searchToggle = document.getElementById('search-toggle');
  const searchInput = document.querySelector('.search-input');
  
  searchToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    searchInput.classList.toggle('expanded');
    if (searchInput.classList.contains('expanded')) {
      searchInput.focus();
    }
  });
  
  // Close search when clicking outside
  document.addEventListener('click', function(event) {
    if (!searchToggle.contains(event.target) && 
        !searchInput.contains(event.target) && 
        searchInput.classList.contains('expanded')) {
      searchInput.classList.remove('expanded');
    }
  });
  
  // Search input submission
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      alert('Search submitted!');
      searchInput.classList.remove('expanded');
      searchInput.value = '';
    }
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
  
  // Destination page booking form validation
  const destinationBookingForm = document.getElementById('destination-booking-form');
  if (destinationBookingForm) {
    destinationBookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const fromDate = document.getElementById('from-date');
      const toDate = document.getElementById('to-date');
      const guests = document.getElementById('guests');
      const roomType = document.getElementById('room-type');
      
      if (fromDate.value && toDate.value && guests.value && roomType.value) {
        alert('Booking submitted successfully!');
        this.reset();
      } else {
        alert('Please fill in all fields');
      }
    });
  }

  // Initialize Flatpickr on both date inputs for homepage
  const fromDatePicker = setupFlatpickr("h-from-date");
  const toDatePicker = setupFlatpickr("h-to-date");
  
  // Link the date pickers so "To" date can't be before "From" date
  if (fromDatePicker && toDatePicker) {
    fromDatePicker.config.onChange.push(function(selectedDates, dateStr) {
      if (selectedDates[0]) {
        // Set the minimum date of the "To" picker to be the selected "From" date
        toDatePicker.set('minDate', selectedDates[0]);
      }
    });
  }
  
  // Debug: Check if destination page date inputs exist
  console.log("Destination date inputs:", 
    document.getElementById("from-date"), 
    document.getElementById("to-date")
  );
  
  // Direct initialization for destination.html date pickers
  if (document.querySelector('#destination-booking-form #from-date')) {
    console.log("Found destination booking form inputs, initializing directly");
    
    const destFromDatePicker = flatpickr("#destination-booking-form #from-date", {
      dateFormat: "Y-m-d",
      allowInput: true,
      disableMobile: true,
      defaultDate: null,
      minDate: "today",
      onReady: function(selectedDates, dateStr, instance) {
        updateCalendarWidth(instance);
        instance.input.value = '';
      },
      onOpen: function(selectedDates, dateStr, instance) {
        updateCalendarWidth(instance);
        instance.input.type = 'text';
      },
      onClose: function(selectedDates, dateStr, instance) {
        if (!dateStr) {
          instance.input.type = 'text';
          instance.input.value = '';
        }
      }
    });
    
    const destToDatePicker = flatpickr("#destination-booking-form #to-date", {
      dateFormat: "Y-m-d",
      allowInput: true,
      disableMobile: true,
      defaultDate: null,
      minDate: "today",
      onReady: function(selectedDates, dateStr, instance) {
        updateCalendarWidth(instance);
        instance.input.value = '';
      },
      onOpen: function(selectedDates, dateStr, instance) {
        updateCalendarWidth(instance);
        instance.input.type = 'text';
      },
      onClose: function(selectedDates, dateStr, instance) {
        if (!dateStr) {
          instance.input.type = 'text';
          instance.input.value = '';
        }
      }
    });
    
    // Link the pickers
    destFromDatePicker.config.onChange.push(function(selectedDates) {
      if (selectedDates[0]) {
        destToDatePicker.set('minDate', selectedDates[0]);
      }
    });
  } else {
    // Fallback to the original method
    console.log("Falling back to original method for destination date pickers");
    const destFromDatePicker = setupFlatpickr("from-date");
    const destToDatePicker = setupFlatpickr("to-date");
    
    // Link the destination page date pickers if they exist
    if (destFromDatePicker && destToDatePicker) {
      destFromDatePicker.config.onChange.push(function(selectedDates, dateStr) {
        if (selectedDates[0]) {
          // Set the minimum date of the "To" picker to be the selected "From" date
          destToDatePicker.set('minDate', selectedDates[0]);
        }
      });
    }
  }
  
  // Handle window resize to update calendar width and font size
  window.addEventListener('resize', function() {
    // Only update if calendar is open
    if (fromDatePicker && fromDatePicker.isOpen) {
      updateCalendarWidth(fromDatePicker);
    }
    if (toDatePicker && toDatePicker.isOpen) {
      updateCalendarWidth(toDatePicker);
    }
    if (destFromDatePicker && destFromDatePicker.isOpen) {
      updateCalendarWidth(destFromDatePicker);
    }
    if (destToDatePicker && destToDatePicker.isOpen) {
      updateCalendarWidth(destToDatePicker);
    }
  });
});
