let map;
let markers = [];

function initMap() {
    const center = { lat: 39.8283, lng: -98.5795 };

    map = new google.maps.Map(document.getElementById("mappa-route66"), {
        zoom: 5,
        center: center,
        mapTypeId: 'roadmap',
    });

    const locations = [
        { name: "Chicago", lat: 41.8781, lng: -87.6298 },
        { name: "Springfield", lat: 39.7817, lng: -89.6501 },
        { name: "Cuba", lat: 38.2055, lng: -91.1836 },
        { name: "Carthage", lat: 37.1831, lng: -94.3162 },
        { name: "Chandler", lat: 35.2002, lng: -97.9583 },
        { name: "Amarillo", lat: 35.2220, lng: -101.8313 },
        { name: "Santa Fe", lat: 35.6870, lng: -105.9378 },
        { name: "Gallup", lat: 35.5282, lng: -108.7426 },
        { name: "Holbrook", lat: 34.9110, lng: -110.1608 },
        { name: "Kingman", lat: 35.1896, lng: -113.5110 },
        { name: "Barstow", lat: 34.8950, lng: -117.0220 },
        { name: "Los Angeles", lat: 34.0522, lng: -118.2437 }
    ];

    locations.forEach((location) => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name,
            icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });

        markers.push({ name: location.name, marker });
    });

    updateMap();
    setInterval(updateMap, 10000);
}

function updateMap() {
    fetch("https://tuo-backend.com/api/donazioni")
        .then(res => res.json())
        .then(data => {
            data.tappe.forEach(tappa => {
                const m = markers.find(m => m.name === tappa.nome);
                if (m) {
                    m.marker.setIcon(
                        tappa.contribuito
                            ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                            : "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    );
                }
            });
        })
        .catch(error => console.error("Errore aggiornamento mappa:", error));
}