// Initialize the map centered at the world view
var map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load demand data from JSON file
fetch('demand_data.json')
    .then(response => response.json())
    .then(demandData => {
        for (var country in demandData) {
            var data = demandData[country];
            
            // Create marker for each country
            L.marker([data.lat, data.lon]).addTo(map)
                .bindPopup(`<b>${country}</b><br>Data Source: ${data.source}`);
        }
    })
    .catch(error => console.error('Error loading demand data:', error));
