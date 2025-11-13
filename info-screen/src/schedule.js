// Schedule page functionality
document.addEventListener('DOMContentLoaded', function() {
    setupScheduleEventClickHandlers();
    setupSeeAllButton();
});

// Setup click handlers for all event elements in schedule
function setupScheduleEventClickHandlers() {
    const clickableEvents = document.querySelectorAll('.clickable-event');
    
    clickableEvents.forEach(eventElement => {
        // Add cursor pointer style
        eventElement.style.cursor = 'pointer';
        
        // Add click event
        eventElement.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            
            // Use centralized navigation function from eventData.js
            if (eventId && typeof navigateToEvent === 'function') {
                navigateToEvent(eventId);
            }
        });
        
        // Add hover effect
        eventElement.addEventListener('mouseenter', function() {
            this.style.opacity = '0.9';
            this.style.transform = 'translateY(-2px)';
        });
        
        eventElement.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
            this.style.transform = 'translateY(0)';
        });
    });
}

// Setup "See All" button to go to event list
function setupSeeAllButton() {
    const seeAllButton = document.querySelector('.upcoming-events-container-see-all');
    
    if (seeAllButton) {
        seeAllButton.style.cursor = 'pointer';
        seeAllButton.addEventListener('click', function() {
            window.location.href = 'eventlist.html';
        });
    }
}

