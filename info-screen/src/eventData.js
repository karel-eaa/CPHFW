// Centralized event data - single source of truth
const eventsData = [
    {
        id: "1",
        designer: "Cecilie Bahnsen",
        eventName: "10-Anniversary Runway Show",
        time: "Saturday, 15/11/2025, 20:00 - 23:00",
        date: "2025-11-15",
        startTime: "20:00",
        endTime: "23:00",
        description: "Landmark anniversary runway presenting a retrospective/archival-inspired collection and theatrical finale, high-profile return to CPHFW.",
        place: "Nikolaj Kunsthal",
        locationDetail: "Nikolaj Kunsthal | 9 minutes by walk",
        entrance: "Registration required",
        image: "public/illustrational0.jpg"
    },
    {
        id: "2",
        designer: "CPHFW SS26 x NEWTALENT",
        eventName: "Showroom (presented by Pandora)",
        time: "Sunday, 16/11/2025, 10:00 - 14:00",
        date: "2025-11-16",
        startTime: "10:00",
        endTime: "14:00",
        description: "Exclusive showroom featuring emerging Nordic designers and innovative sustainable fashion pieces, curated by CPHFW's talent development program.",
        place: "Skuespilhuset",
        locationDetail: "Skuespilhuset | 12 minutes by walk",
        entrance: "By invitation only",
        image: "public/illustrational-1.png"
    },
    {
        id: "3",
        designer: "Cecilie Bahnsen x ASICS",
        eventName: "Embellishment Workshop",
        time: "Monday, 17/11/2025, 10:00 - 14:00",
        date: "2025-11-17",
        startTime: "10:00",
        endTime: "14:00",
        description: "Hands-on workshop exploring signature embellishment techniques from the collaboration collection, limited spots available for fashion enthusiasts.",
        place: "Cecilie Bahnsen Boutique",
        locationDetail: "Cecilie Bahnsen Boutique | 15 minutes by walk",
        entrance: "Registration required",
        image: "public/illustrational-2.jpg"
    },
    {
        id: "4",
        designer: "Gabi Gamél",
        eventName: "Collection 3 Presentation",
        time: "Tuesday, 18/11/2025, 10:00 - 16:00",
        date: "2025-11-18",
        startTime: "10:00",
        endTime: "16:00",
        description: "Intimate presentation of the brand's third collection, featuring bold silhouettes and experimental textiles in a curated store environment.",
        place: "Gabi Gamél Store",
        locationDetail: "Gabi Gamél Store | 8 minutes by walk",
        entrance: "By invitation only",
        image: "public/illustrational-3.png"
    },
    {
        id: "5",
        designer: "66°North",
        eventName: "Centenary Exhibition / Installation",
        time: "Sunday, 16/11/2025, 15:00 - 19:00",
        date: "2025-11-16",
        startTime: "15:00",
        endTime: "19:00",
        description: "Celebrating 100 years of Icelandic outerwear heritage with an immersive installation showcasing archival pieces and the evolution of technical fashion.",
        place: "Nils Stærk Gallery",
        locationDetail: "Nils Stærk Gallery | 11 minutes by walk",
        entrance: "Public",
        image: "public/illustrational-4.jpg"
    },
    {
        id: "6",
        designer: "CPHFW SS26",
        eventName: "Show & Presentation Schedule",
        time: "Monday, 17/11/2025, 15:00 - 19:00",
        date: "2025-11-17",
        startTime: "15:00",
        endTime: "19:00",
        description: "Full schedule reveal and information session for all upcoming shows and presentations during Copenhagen Fashion Week Spring/Summer 2026.",
        place: "Skuespilhuset",
        locationDetail: "Skuespilhuset | 12 minutes by walk",
        entrance: "Public",
        image: "public/illustrational-5.jpg"
    }
];

// Helper function to get event by ID
function getEventById(id) {
    return eventsData.find(event => event.id === id);
}

// Helper function to navigate to event detail page
function navigateToEvent(eventId) {
    const event = getEventById(eventId);
    if (!event) {
        console.error('Event not found:', eventId);
        return;
    }
    
    // Build URL parameters
    const params = new URLSearchParams({
        id: event.id,
        designer: event.designer,
        eventName: event.eventName,
        time: event.time,
        description: event.description,
        place: event.place,
        locationDetail: event.locationDetail,
        entrance: event.entrance,
        image: event.image
    });
    
    // Navigate to event.html with parameters
    window.location.href = `event.html?${params.toString()}`;
}

