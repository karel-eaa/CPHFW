// Date picker and filter functionality
let selectedDateFilter = null;
let selectedPlaceFilter = null;
let selectedEntranceFilter = null;

document.addEventListener('DOMContentLoaded', function() {
    const dateButton = document.getElementById('date-filter-btn');
    const datePicker = document.getElementById('date-picker');
    const placeButton = document.getElementById('place-filter-btn');
    const placeDropdown = document.getElementById('place-dropdown');
    const entranceButton = document.getElementById('entrance-filter-btn');
    const entranceDropdown = document.getElementById('entrance-dropdown');
    const activeFiltersSection = document.querySelector('.active-filters');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const eventCards = document.querySelectorAll('.event-card');
    
    // Initially hide the active filters section
    if (activeFiltersSection) {
        activeFiltersSection.style.display = 'none';
    }
    
    // Inject filter attributes from eventData.js into HTML
    injectFilterAttributes();
    
    // Add click handlers to event cards
    setupEventCardClickHandlers();
    
    // Date picker functionality
    if (dateButton && datePicker) {
        // Trigger date picker when button is clicked
        dateButton.addEventListener('click', function() {
            datePicker.showPicker();
            // Close dropdowns if open
            if (placeDropdown) placeDropdown.classList.remove('show');
            if (entranceDropdown) entranceDropdown.classList.remove('show');
        });
        
        // Handle date selection
        datePicker.addEventListener('change', function() {
            const selectedDate = this.value;
            if (selectedDate) {
                selectedDateFilter = selectedDate;
                updateActiveFilters();
                applyFilters();
            }
        });
    }
    
    // Place dropdown functionality
    if (placeButton && placeDropdown) {
        // Toggle dropdown when button is clicked
        placeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            placeDropdown.classList.toggle('show');
            // Close entrance dropdown if open
            if (entranceDropdown) entranceDropdown.classList.remove('show');
        });
        
        // Handle dropdown item selection
        const placeItems = placeDropdown.querySelectorAll('.dropdown-item');
        placeItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const place = this.getAttribute('data-place');
                selectedPlaceFilter = place;
                placeDropdown.classList.remove('show');
                updateActiveFilters();
                applyFilters();
            });
        });
    }
    
    // Entrance dropdown functionality
    if (entranceButton && entranceDropdown) {
        // Toggle dropdown when button is clicked
        entranceButton.addEventListener('click', function(e) {
            e.stopPropagation();
            entranceDropdown.classList.toggle('show');
            // Close place dropdown if open
            if (placeDropdown) placeDropdown.classList.remove('show');
        });
        
        // Handle dropdown item selection
        const dropdownItems = entranceDropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const entrance = this.getAttribute('data-entrance');
                selectedEntranceFilter = entrance;
                entranceDropdown.classList.remove('show');
                updateActiveFilters();
                applyFilters();
            });
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        if (placeDropdown) placeDropdown.classList.remove('show');
        if (entranceDropdown) entranceDropdown.classList.remove('show');
    });
    
    // Clear filters functionality
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            clearFilters();
        });
    }
    
    // Handle X icon clicks on individual filter tags
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('x-icon')) {
            const parent = e.target.parentElement;
            if (parent.classList.contains('date-filter-tag')) {
                selectedDateFilter = null;
                if (datePicker) datePicker.value = '';
            } else if (parent.classList.contains('place-filter-tag')) {
                selectedPlaceFilter = null;
            } else if (parent.classList.contains('entrance-filter-tag')) {
                selectedEntranceFilter = null;
            }
            updateActiveFilters();
            applyFilters();
        }
    });
});

// Function to update the active filters display
function updateActiveFilters() {
    const activeFiltersSection = document.querySelector('.active-filters');
    const dateFilterTag = document.querySelector('.date-filter-tag');
    const placeFilterTag = document.querySelector('.place-filter-tag');
    const entranceFilterTag = document.querySelector('.entrance-filter-tag');
    
    let hasActiveFilters = false;
    
    // Update date filter tag
    if (selectedDateFilter && dateFilterTag) {
        const date = new Date(selectedDateFilter + 'T00:00:00');
        const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        dateFilterTag.innerHTML = `${formattedDate}<img src="X.svg" alt="X" class="x-icon">`;
        dateFilterTag.style.display = 'inline-block';
        hasActiveFilters = true;
    } else if (dateFilterTag) {
        dateFilterTag.style.display = 'none';
    }
    
    // Update place filter tag
    if (selectedPlaceFilter && placeFilterTag) {
        placeFilterTag.innerHTML = `${selectedPlaceFilter}<img src="X.svg" alt="X" class="x-icon">`;
        placeFilterTag.style.display = 'inline-block';
        hasActiveFilters = true;
    } else if (placeFilterTag) {
        placeFilterTag.style.display = 'none';
    }
    
    // Update entrance filter tag
    if (selectedEntranceFilter && entranceFilterTag) {
        entranceFilterTag.innerHTML = `${selectedEntranceFilter}<img src="X.svg" alt="X" class="x-icon">`;
        entranceFilterTag.style.display = 'inline-block';
        hasActiveFilters = true;
    } else if (entranceFilterTag) {
        entranceFilterTag.style.display = 'none';
    }
    
    // Show/hide active filters section
    if (activeFiltersSection) {
        activeFiltersSection.style.display = hasActiveFilters ? 'flex' : 'none';
    }
}

// Function to apply all filters
function applyFilters() {
    const eventCards = document.querySelectorAll('.event-card');
    let visibleCount = 0;
    
    eventCards.forEach(card => {
        const eventDate = card.getAttribute('data-event-date');
        const eventPlace = card.getAttribute('data-place');
        const eventEntrance = card.getAttribute('data-entrance');
        
        let shouldShow = true;
        
        // Apply date filter
        if (selectedDateFilter && eventDate !== selectedDateFilter) {
            shouldShow = false;
        }
        
        // Apply place filter
        if (selectedPlaceFilter && eventPlace !== selectedPlaceFilter) {
            shouldShow = false;
        }
        
        // Apply entrance filter
        if (selectedEntranceFilter && eventEntrance !== selectedEntranceFilter) {
            shouldShow = false;
        }
        
        card.style.display = shouldShow ? 'flex' : 'none';
        if (shouldShow) visibleCount++;
    });
    
    // Show/hide "no results" message
    const noResults = document.querySelector('.no-results');
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

// Function to clear all filters
function clearFilters() {
    const datePicker = document.getElementById('date-picker');
    const eventCards = document.querySelectorAll('.event-card');
    const noResults = document.querySelector('.no-results');
    
    // Reset filters
    selectedDateFilter = null;
    selectedPlaceFilter = null;
    selectedEntranceFilter = null;
    
    // Reset date picker
    if (datePicker) {
        datePicker.value = '';
    }
    
    // Update display
    updateActiveFilters();
    
    // Show all event cards
    eventCards.forEach(card => {
        card.style.display = 'flex';
    });
    
    // Hide "no results" message
    if (noResults) {
        noResults.style.display = 'none';
    }
}

// Function to inject filter attributes from centralized data
function injectFilterAttributes() {
    const eventCards = document.querySelectorAll('.event-card[data-event-id]');
    
    eventCards.forEach(card => {
        const eventId = card.getAttribute('data-event-id');
        const event = getEventById(eventId);
        
        if (event) {
            // Add filter attributes from centralized data
            card.setAttribute('data-event-date', event.date);
            card.setAttribute('data-entrance', event.entrance);
            card.setAttribute('data-place', event.place);
        }
    });
}

// Function to setup click handlers for event cards
function setupEventCardClickHandlers() {
    const eventCards = document.querySelectorAll('.event-card.clickable');
    
    eventCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on filter icons inside cards
            if (e.target.closest('.x-icon')) {
                return;
            }
            
            // Get event ID from data attribute
            const eventId = this.getAttribute('data-event-id');
            
            // Use centralized navigation function
            if (eventId && typeof navigateToEvent === 'function') {
                navigateToEvent(eventId);
            }
        });
    });
}
