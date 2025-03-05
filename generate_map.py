import folium
import json

# Load demand data (GeoJSON format)
demand_data = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "United States",
                "fillColor": "#ff5733",
                "demand_url": "https://example.com/usa-demand"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-98.35, 39.50]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "India",
                "fillColor": "#33ff57",
                "demand_url": "https://example.com/india-demand"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [78.96, 20.59]
            }
        }
    ]
}

# Create map centered at a neutral point
m = folium.Map(location=[20, 0], zoom_start=2)

# Add GeoJSON layer
def click_popup(feature):
    return f'<a href="{feature["properties"]["demand_url"]}" target="_blank">{feature["properties"]["name"]} Demand Data</a>'

folium.GeoJson(
    demand_data,
    style_function=lambda feature: {
        "fillColor": feature["properties"]["fillColor"],
        "color": "black",
        "weight": 1,
        "fillOpacity": 0.6,
    },
    popup=folium.GeoJsonPopup(fields=["name"], aliases=["Country"]),
    tooltip=folium.GeoJsonTooltip(fields=["name"]),
).add_to(m)

# Save map as HTML
m.save("index.html")

# Save GeoJSON data separately
with open("demand_data_map.geojson", "w") as f:
    json.dump(demand_data, f)

print("Map and GeoJSON data generated successfully!")
