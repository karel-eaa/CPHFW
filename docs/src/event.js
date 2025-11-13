// Load event details from URL parameters
document.addEventListener('DOMContentLoaded', function() {
    loadEventFromURL();
    setupBackButton();
    setupMapLightbox();
});

function loadEventFromURL() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Extract event data
    const eventData = {
        id: urlParams.get('id'),
        designer: urlParams.get('designer'),
        eventName: urlParams.get('eventName'),
        time: urlParams.get('time'),
        description: urlParams.get('description'),
        place: urlParams.get('place'),
        locationDetail: urlParams.get('locationDetail'),
        entrance: urlParams.get('entrance'),
        image: urlParams.get('image')
    };
    
    // If no data in URL, show default/error message
    if (!eventData.id) {
        console.warn('No event data found in URL parameters');
        return;
    }
    
    // Populate the page with event data
    populateEventDetails(eventData);
}

function populateEventDetails(data) {
    // Update event time
    const timeElement = document.querySelector('.text-time');
    if (timeElement && data.time) {
        timeElement.textContent = data.time;
    }
    
    // Update designer name
    const designerElement = document.querySelector('.designer');
    if (designerElement && data.designer) {
        designerElement.textContent = data.designer + ' —';
    }
    
    // Update event name
    const eventNameElement = document.querySelector('.event-name');
    if (eventNameElement && data.eventName) {
        eventNameElement.textContent = data.eventName;
    }
    
    // Update description
    const descriptionElement = document.querySelector('.text-details');
    if (descriptionElement && data.description) {
        descriptionElement.textContent = data.description;
    }
    
    // Update location detail
    const locationElement = document.querySelector('.text-location');
    if (locationElement && data.locationDetail) {
        // Keep the icon and update the text
        const icon = locationElement.querySelector('.icon');
        locationElement.innerHTML = '';
        if (icon) {
            locationElement.appendChild(icon);
        }
        locationElement.appendChild(document.createTextNode(data.locationDetail));
    }
    
    // Update event image
    const eventImageElement = document.querySelector('.event-image');
    if (eventImageElement && data.image) {
        eventImageElement.src = data.image;
        eventImageElement.alt = `${data.designer} - ${data.eventName}`;
    }
    
    // Update page title
    if (data.designer && data.eventName) {
        document.title = `${data.designer} - ${data.eventName}`;
    }
}

function setupBackButton() {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Go back to eventlist.html
            window.location.href = 'eventlist.html';
        });
    }
}

function setupMapLightbox() {
    const mapImage = document.getElementById('map-image');
    const modal = document.getElementById('map-modal');
    const modalImg = document.getElementById('zoomed-map');
    const closeBtn = document.querySelector('.map-modal-close');
    
    // Open modal when map is clicked
    if (mapImage && modal && modalImg) {
        mapImage.addEventListener('click', function() {
            modal.classList.add('show');
            modalImg.src = this.src;
        });
        
        // Close modal when clicking the X button
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('show');
            });
        }
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
            }
        });
    }
}

