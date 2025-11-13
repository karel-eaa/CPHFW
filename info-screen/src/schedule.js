// Schedule page functionality
document.addEventListener('DOMContentLoaded', function() {
    setupScheduleEventClickHandlers();
    setupSeeAllButton();
    animateCurrentTimeLine();
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

// Animate the current time line to simulate time passing
// 1 hour in calendar = 10 seconds real time
function animateCurrentTimeLine() {
    const timeLine = document.querySelector('.hour-line-now');
    
    if (!timeLine) {
        console.warn('Current time line not found');
        return;
    }
    
    // Calendar constants
    const PIXELS_PER_HOUR = 47; // Distance between hour lines
    const SECONDS_PER_CALENDAR_HOUR = 60; // Real time seconds for 1 calendar hour (1 hour = 1 minute)
    const START_POSITION = 10; // Starting position (10:00 hour line)
    const END_POSITION = 574; // Ending position (22:00 hour line)
    
    // Calculate movement speed
    const pixelsPerSecond = PIXELS_PER_HOUR / SECONDS_PER_CALENDAR_HOUR; // 4.7px per second
    const updateIntervalMs = 100; // Update every 100ms for smooth animation
    const pixelsPerUpdate = (pixelsPerSecond * updateIntervalMs) / 1000;
    
    // Initialize position
    let currentPosition = START_POSITION;
    timeLine.style.top = currentPosition + 'px';
    
    // Start animation
    const animationInterval = setInterval(() => {
        currentPosition += pixelsPerUpdate;
        
        // Reset to start if we've reached the end
        if (currentPosition >= END_POSITION) {
            currentPosition = START_POSITION;
        }
        
        timeLine.style.top = currentPosition + 'px';
    }, updateIntervalMs);
    
    // Optional: Store interval ID if you need to stop the animation later
    window.currentTimeLineAnimation = animationInterval;
}

