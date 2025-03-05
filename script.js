// Select the container
const globeContainer = document.getElementById('globe-container');

// Create the Globe
const world = Globe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .showAtmosphere(true)
    .atmosphereColor('lightblue')
    .atmosphereAltitude(0.2)
    .onPolygonClick(showCountryInfo) // Click Event
    .polygonsData([])
    .polygonCapColor(() => 'rgba(255, 165, 0, 0.8)') // Orange fill
    .polygonSideColor(() => 'rgba(255, 165, 0, 0.4)') // Orange sides
    .polygonStrokeColor(() => '#111');

// Append the Globe to the container
globeContainer.appendChild(world);

// Rotate the Globe
function rotateGlobe() {
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.5;
}
rotateGlobe();

// Function to load country borders
fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
    .then(res => res.json())
    .then(data => {
        // Filter only the first 4 countries (for testing)
        const selectedCountries = ["United States", "Brazil", "India", "Germany"];
        const filteredCountries = data.features.filter(f => selectedCountries.includes(f.properties.name));

        world.polygonsData(filteredCountries)
            .polygonCapColor(f => countryColors[f.properties.name] || 'rgba(255, 165, 0, 0.8)')
            .polygonSideColor(() => 'rgba(255, 165, 0, 0.3)')
            .polygonStrokeColor(() => '#222');
    });

// Define country colors
const countryColors = {
    "United States": "blue",
    "Brazil": "green",
    "India": "orange",
    "Germany": "red"
};

// Define sources for each country
const countrySources = {
    "United States": "https://www.eia.gov/",
    "Brazil": "https://www.ons.org.br/",
    "India": "https://www.cea.nic.in/",
    "Germany": "https://www.energy-charts.info/"
};

// Function to show country info on click
function showCountryInfo(feature) {
    const countryName = feature.properties.name;
    const infoBox = document.getElementById('info-box');
    
    if (countrySources[countryName]) {
        infoBox.innerHTML = `<b>${countryName}</b><br><a href="${countrySources[countryName]}" target="_blank">Energy Data</a>`;
        infoBox.style.display = "block";
    }
}
