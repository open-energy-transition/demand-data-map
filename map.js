// Initialize the map
var map = L.map('map').setView([20, 0], 2); 

// Add tile layer (base map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Country colors for differentiation
const countryColors = {
    "Austria": "red", "Belgium": "blue", "Bosnia and Herzegovina": "green", 
    "Bulgaria": "purple", "Croazia": "orange", "Cyprus": "yellow",
    "Czech Republic": "cyan", "Denmark": "pink", "Estonia": "brown", 
    "Finland": "gray", "France": "lightblue", "Germany": "lightgreen", 
    "Greece": "darkred", "Hungary": "darkblue", "Iceland": "lime",
    "Ireland": "darkgray", "Italy": "magenta", "Latvia": "olive", 
    "Lithuania": "teal", "Macedonia": "navy", "Netherlands": "maroon",
    "Norway": "gold", "Poland": "chocolate", "Portugal": "darkorange", 
    "Romania": "coral", "Serbia": "crimson", "Slovakia": "dodgerblue",
    "Slovenia": "firebrick", "Spain": "goldenrod", "Sweden": "lightcoral",
    "Switzerland": "mediumvioletred", "United Kingdom": "orangered",

    "Canada": "red", "Mexico": "green",
    "Argentina": "blue", "Brazil": "yellow", "Chile": "purple",
    "Australia": "orange", "New Zealand": "teal", "Kenya": "brown",
    "Saudi Arabia": "darkgreen", "South Korea": "darkblue",
    "Sri Lanka": "darkred", "Turkey": "maroon"
};

// Function to generate a country-specific Wikipedia link
function getCountryLink(countryName) {
    return `https://en.wikipedia.org/wiki/${countryName.replace(/\s+/g, '_')}`;
}

// Add country shapes
fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                const countryName = feature.properties.name;
                return {
                    color: countryColors[countryName] || "white", // Default color for missing countries
                    weight: 1,
                    fillOpacity: 0.6
                };
            },
            onEachFeature: function (feature, layer) {
                const countryName = feature.properties.name;
                const countryLink = getCountryLink(countryName);
                
                // Create popup with clickable link
                layer.bindPopup(`<b>${countryName}</b><br><a href="${countryLink}" target="_blank">More Info</a>`);
            }
        }).addTo(map);
    });
