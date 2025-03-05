import plotly.graph_objects as go
import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import json
import webbrowser

# Load country demand data sources
with open("data.json") as f:
    country_sources = json.load(f)["countries"]

# Country coordinates (latitude, longitude, color)
countries = {
    "France": {"lat": 46.603354, "lon": 1.888334, "color": "red"},
    "Brazil": {"lat": -14.2350, "lon": -51.9253, "color": "blue"},
    "India": {"lat": 20.5937, "lon": 78.9629, "color": "green"},
    "Australia": {"lat": -25.2744, "lon": 133.7751, "color": "orange"}
}

# Initialize Dash app
app = dash.Dash(__name__)

app.layout = html.Div([
    html.H1("3D Globe with Clickable Countries", style={"textAlign": "center"}),

    dcc.Graph(id="globe"),

    html.Div(id="country-output", style={"textAlign": "center", "fontSize": "20px", "marginTop": "20px"})
])

@app.callback(
    Output("globe", "figure"),
    Input("globe", "clickData")
)
def update_globe(clickData):
    fig = go.Figure()

    # Add the globe
    fig.add_trace(go.Scattergeo(
        lon=[-180, 180], lat=[-90, 90], mode="lines",
        line=dict(width=0.5, color="white"),
        hoverinfo="none"
    ))

    # Add highlighted countries
    for country, info in countries.items():
        fig.add_trace(go.Scattergeo(
            lon=[info["lon"]],
            lat=[info["lat"]],
            mode="markers+text",
            marker=dict(size=10, color=info["color"]),
            text=country,
            textposition="top center",
            name=country
        ))

    # Configure manual rotation (no auto-rotation)
    fig.update_layout(
        geo=dict(
            showland=True,
            landcolor="rgb(243, 243, 243)",
            projection_type="orthographic",  # 3D globe
            showocean=True,
            oceancolor="rgb(204, 230, 255)",
            showcoastlines=False,
            showcountries=True,
            showframe=False
        ),
        margin=dict(l=0, r=0, t=0, b=0),
        dragmode="orbit"  # Allows manual rotation
    )

    return fig

@app.callback(
    Output("country-output", "children"),
    Input("globe", "clickData")
)
def display_country(clickData):
    if clickData:
        country_name = clickData["points"][0]["text"]
        if country_name in country_sources:
            webbrowser.open(country_sources[country_name])  # Open data source
            return f"You clicked on {country_name}. Redirecting..."
    return "Click on a country to see details."

if __name__ == "__main__":
    app.run_server(debug=True)
