// Define are dimensions, chart's margins and dimensions of chart area (using activiies from D3 day 3 as example)
var svgWidth = 700;
var svgHeight = 500;
var margin = {
  top: 30,
  right: 20,
  bottom: 50,
  left: 50
};
// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append an SVG group that will hold our chart,and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
// Append SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Load data from csv file
d3.csv("assets/data/data.csv").then(function(healthData) {
  // Print the health data
  console.log(healthData);
  //start function to extract income and health data
  healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });
  // set the ranges
  var xLinearScale = d3.scaleLinear().range([0, width]);
  var yLinearScale = d3.scaleLinear().range([height, 0]);
  //  define the axes
  var xAxis = d3.axisBottom(xLinearScale);
  var yAxis = d3.axisLeft(yLinearScale);
  //set x/y minimums & max
  xMinimum = d3.min(healthData, function(data) {
      return data.poverty -1;
  });
  xMaximum = d3.max(healthData, function(data) {
      return data.poverty +1;
  });
  yMinimum = d3.min(healthData, function(data) {
      return data.healthcare -1;
  });
  yMaximum = d3.max(healthData, function(data) {
      return data.healthcare +1;
  });
  //print mins and max to console
  console.log(xMaximum);
  console.log(xMinimum);
  console.log(yMaximum);
  console.log(yMinimum);
  //set mins/max in scale
  xLinearScale.domain([xMinimum, xMaximum]);
  yLinearScale.domain([yMinimum, yMaximum]);
  // Append x-axis
  chartGroup.append("g").attr("transform", `translate(0, ${height})`)
    .call(xAxis);
  // Append y-axis
  chartGroup.append("g").call(yAxis);
  // Create code to build the bar chart using health data extracted 
  chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 9)
    .attr("fill", "#16ABCC")
    .attr("opacity", .70);
  // Add texts to the circles
  chartGroup.selectAll("text.text-circles")
    .data(healthData)
    .enter()
    .append("text")
    .classed("stateText", true)
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("text-anchor","middle")
    .attr("font-size","8px");
  //http://bl.ocks.org/weiglemc/6185069
  // set y axis label
  svg.append("text")
      .attr("class", "y axis")
      .text("Lacks Healthcare (%)")
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("x", -120)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      ;
  // set x axis label
  svg.append("text")
      .attr("class", "x axis")
      .text("In Poverty Rate (%)")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "label")
      .attr("x", width - 200)
      .attr("y", 70)
      .style("text-anchor", "end")
;
});
