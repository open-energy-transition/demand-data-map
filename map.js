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

// Country demand sources
const countrySources = {
    "Austria": "https://www.e-control.at/",
    "Belgium": "https://www.elia.be/en/grid-data",
    "Bosnia and Herzegovina": "https://www.elektroprivreda.ba/",
    "Bulgaria": "https://www.eso.bg/",
    "Croazia": "https://www.hep.hr/",
    "Cyprus": "https://tsoc.org.cy/",
    "Czech Republic": "https://www.ceps.cz/en",
    "Denmark": "https://www.energinet.dk/",
    "Estonia": "https://elering.ee/",
    "Finland": "https://www.fingrid.fi/",
    "France": "https://www.rte-france.com/",
    "Germany": "https://www.smard.de/en/",
    "Greece": "https://www.admie.gr/",
    "Hungary": "https://www.mavir.hu/",
    "Iceland": "https://www.landsnet.is/",
    "Ireland": "https://www.eirgridgroup.com/",
    "Italy": "https://www.terna.it/",
    "Latvia": "https://www.ast.lv/",
    "Lithuania": "https://www.litgrid.eu/",
    "Macedonia": "https://www.mepso.com.mk/",
    "Netherlands": "https://www.tennet.eu/",
    "Norway": "https://www.statnett.no/",
    "Poland": "https://www.pse.pl/",
    "Portugal": "https://www.ren.pt/",
    "Romania": "https://www.transelectrica.ro/",
    "Serbia": "https://www.ems.rs/",
    "Slovakia": "https://www.sepsas.sk/",
    "Slovenia": "https://www.eles.si/",
    "Spain": "https://www.ree.es/en",
    "Sweden": "https://www.svk.se/",
    "Switzerland": "https://www.swissgrid.ch/",
    "United Kingdom": "https://www.nationalgrid.com/uk",

    "Canada": "https://www.nrcan.gc.ca/",
    "Mexico": "https://www.cenace.gob.mx/",
    "Argentina": "https://www.cammesa.com/",
    "Brazil": "https://www.ons.org.br/",
    "Chile": "https://www.coordinador.cl/",
    "Australia": "https://www.aemo.com.au/",
    "New Zealand": "https://www.transpower.co.nz/",
    "Kenya": "https://www.kplc.co.ke/",
    "Saudi Arabia": "https://www.se.com.sa/",
    "South Korea": "https://www.kpx.or.kr/",
    "Sri Lanka": "https://www.ceb.lk/",
    "Turkey": "https://www.teias.gov.tr/"
};

// Function to generate Wikipedia link
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
                    color: countryColors[countryName] || "white",
                    weight: 1,
                    fillOpacity: 0.6
                };
            },
            onEachFeature: function (feature, layer) {
                const countryName = feature.properties.name;
                const wikipediaLink = getCountryLink(countryName);
                const sourceLink = countrySources[countryName] || "#"; // Use "#" if no source is available
                
                // Create popup with both links
                layer.bindPopup(`
                    <b>${countryName}</b><br>
                    <a href="${wikipediaLink}" target="_blank">Wikipedia</a><br>
                    <a href="${sourceLink}" target="_blank">Energy Demand Source</a>
                `);
            }
        }).addTo(map);
    });
