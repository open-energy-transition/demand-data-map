// Create the Map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json', // Default MapLibre style
    center: [0, 20], // [Longitude, Latitude]
    zoom: 1.5,
    pitch: 30,
    bearing: 0,
    antialias: true
});

// Sample demand data with country colors and links
const countryData = {
    "Austria": { "color": "#FF5733", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10YAT-APG------L!CTY|10YAT-APG------L&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Belgium": { "color": "#33FF57", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10YBE----------2!CTY|10YBE----------2&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Bosnia and Herzegovina": { "color": "#5733FF", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10YBA-JPCC-----D!CTY|10YBA-JPCC-----D&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Bulgaria": { "color": "#FF33A1", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10YCA-BULGARIA-R!CTY|10YCA-BULGARIA-R&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Croatia": { "color": "#33FFF3", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10YHR-HEP------M!CTY|10YHR-HEP------M&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Cyprus": { "color": "#F3FF33", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10YCY-1001A0003J!CTY|10YCY-1001A0003J&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Czech Republic": { "color": "#8B33FF", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10YCZ-CEPS-----N!CTY|10YCZ-CEPS-----N&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Denmark": { "color": "#FF8333", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10Y1001A1001A65H!CTY|10Y1001A1001A65H&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Estonia": { "color": "#33A1FF", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10Y1001A1001A39I!CTY|10Y1001A1001A39I&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Finland": { "color": "#FF336E", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10YFI-1--------U!CTY|10YFI-1--------U&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "France": { "color": "#33FFB1", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10YFR-RTE------C!CTY|10YFR-RTE------C&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Georgia": { "color": "#336EFF", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10Y1001A1001B012!CTY|10Y1001A1001B012&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Germany": { "color": "#336EFF", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10Y1001A1001A83F!CTY|10Y1001A1001A83F&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Greece": { "color": "#FF9933", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10YGR-HTSO-----Y!CTY|10YGR-HTSO-----Y&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Hungary": { "color": "#9933FF", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=13.03.2025+00:00|CET|DAY&biddingZone.values=CTY|10YHU-MAVIR----U!CTY|10YHU-MAVIR----U&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Ireland": { "color": "#FF3366", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10YIE-1001A00010!CTY|10YIE-1001A00010&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Italy": { "color": "#3366FF", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10YIT-GRTN-----B!CTY|10YIT-GRTN-----B&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Kosovo": { "color": "#33FF99", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10Y1001C--00100H!CTY|10Y1001C--00100H&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Latvia": { "color": "#66FF33", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10YLV-1001A00074!CTY|10YLV-1001A00074&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Lithuania": { "color": "#FF6633", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10YLT-1001A0008Q!CTY|10YLT-1001A0008Q&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Netherlands": { "color": "#6633FF", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10YNL----------L!CTY|10YNL----------L&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Norway": { "color": "#FF33FF", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10YNO-0--------C!CTY|10YNO-0--------C&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Poland": { "color": "#33FF66", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10YPL-AREA-----S!CTY|10YPL-AREA-----S&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Portugal": { "color": "#FF3333", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10YPT-REN------W!CTY|10YPT-REN------W&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Romania": { "color": "#33FFFF", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10YRO-TEL------P!CTY|10YRO-TEL------P&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Spain": { "color": "#FF33CC", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10YES-REE------0!CTY|10YES-REE------0&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Sweden": { "color": "#33CCFF", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10YSE-1--------K!CTY|10YSE-1--------K&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Switzerland": { "color": "#CC33FF", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10YCH-SWISSGRIDZ!CTY|10YCH-SWISSGRIDZ&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "United Kingdom": { "color": "#FFCC33", "link": "https://transparency.entsoe.eu/load-domain/r2/totalLoadR2/show?name=&defaultValue=false&viewType=TABLE&areaType=CTY&atch=false&dateTime.dateTime=14.03.2024+00:00|CET|DAY&biddingZone.values=CTY|10Y1001A1001A92E!CTY|10Y1001A1001A92E&dateTime.timezone=CET_CEST&dateTime.timezone_input=CET+(UTC+1)+/+CEST+(UTC+2) "},
    "Canada": { "color": "#9933CC", "link": " "},
    "Mexico": { "color": "#33CC99", "link": "" },
    "Argentina": { "color": "#CC9933", "link": "" },
    "Brazil": { "color": "#33FFCC", "link": "" },
    "Chile": { "color": "#FFCC99", "link": "" },    
    "Australia": { "color": "#99FFCC", "link": "https://www.aemo.com.au/energy-systems/electricity/national-electricity-market-nem/data-nem/aggregated-data" },
    "New Zealand": { "color": "#CC99FF", "link": "https://www.emi.ea.govt.nz/Wholesale/Reports/W_GD_C?DateFrom=20250212&DateTo=20250212&RegionType=NZ&_rsdr=D1&_si=_dr_RegionType|NZ,_dr__rsdr|L364D,_dr_DateFrom|20240213,_dr_DateTo|20250212,v|4" },
    "Kenya": { "color": "#FF99CC", "link": "" },
    "Saudi Arabia": { "color": "#99CCFF", "" },
    "South Korea": { "color": "#CCFF99", "" },
    "Sri Lanka": { "color": "#FF6699", "link": "https://gendata.pucsl.gov.lk/generation-profile" },
    "Turkey": { "color": "#6699FF", "link": "https://www.kaggle.com/datasets/dharanikra/electrical-power-demand-in-turkey" }
};

// Load country boundaries from GeoJSON
map.on('load', function () {
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
        .then(response => response.json())
        .then(data => {
            map.addSource('countries', {
                'type': 'geojson',
                'data': data
            });

            map.addLayer({
                'id': 'country-fills',
                'type': 'fill',
                'source': 'countries',
                'layout': {},
                'paint': {
                    'fill-color': [
                        'match',
                        ['get', 'name'],
                        ...Object.entries(countryData).flatMap(([name, info]) => [name, info.color]),
                        "#AAAAAA" // Default color for unlisted countries
                    ],
                    'fill-opacity': 0.7
                }
            });

            // Add country borders
            map.addLayer({
                'id': 'country-borders',
                'type': 'line',
                'source': 'countries',
                'layout': {},
                'paint': {
                    'line-color': '#000',
                    'line-width': 1
                }
            });

            // Click Event for Countries
            map.on('click', 'country-fills', function (e) {
                const countryName = e.features[0].properties.name;
                const countryInfo = countryData[countryName];

                if (countryInfo) {
                    window.open(countryInfo.link, '_blank'); // Open demand data link
                } else {
                    alert("No demand data available for " + countryName);
                }
            });

            // Change cursor on hover
            map.on('mouseenter', 'country-fills', function () {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'country-fills', function () {
                map.getCanvas().style.cursor = '';
            });
        });
});
