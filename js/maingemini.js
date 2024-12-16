window.onload = setMap;

function setMap() {

  // Map frame dimensions
  var width = 960,
    height = 460;

  // Create svg container
  var map = d3.select("body")
    .append("svg")
    .attr("class", "map")
    .attr("width", width)
    .attr("height", height);

  // Projection
  var projection = d3.geoAlbers()
    .center([0, 46.2])
    .rotate([-2, 0])
    .parallels([43, 62])
    .scale(2500)
    .translate([width / 2, height / 2]);

  var path = d3.geoPath()
    .projection(projection);

  // Load data
  var promises = [
    d3.csv("data/unitsData.csv"),
    d3.json("data/EuropeCountries.topojson"),
    d3.json("data/FranceRegions.topojson"),
  ];

  Promise.all(promises).then(callback);

  function callback(data) {
    var csvData = data[0]; // Units data
    var europe = data[1]; // Europe countries
    var france = data[2]; // France regions

    // Process CSV data (assuming a column for region ID)
    var regionData = {}; // Dictionary to store attribute for each region
    csvData.forEach(function(d) {
      regionData[d.region_id] = d.attribute_value; // Assuming these columns exist
    });

    // Translate TopoJSON
    var europeCountries = topojson.feature(europe, europe.objects.EuropeCountries),
      franceRegions = topojson.feature(france, france.objects.FranceRegions);

    // Join data with regions (assuming 'adm1_code' is the region ID)
    franceRegions.features.forEach(function(d) {
      d.properties.attribute_value = regionData[d.properties.adm1_code];
    });

    // Add Europe countries (optional for reference)
    map.append("path")
      .datum(europeCountries)
      .attr("class", "countries")
      .attr("d", path);

    // Add France regions with color based on attribute (replace with your color scale)
    var colorScale = d3.scaleLinear() // Adjust color scale based on attribute values
      .domain([d3.min(franceRegions.features, d => d.properties.attribute_value), d3.max(franceRegions.features, d => d.properties.attribute_value)])
      .range(["lightblue", "darkblue"]);

    map.selectAll(".regions")
      .data(franceRegions.features)
      .enter()
      .append("path")
      .attr("class", function(d) {
        return "regions " + d.properties.adm1_code;
      })
      .attr("d", path)
      .style("fill", function(d) {
        return colorScale(d.properties.attribute_value);
      });

  }
}