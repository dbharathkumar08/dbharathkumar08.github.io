





function plot_sorted_bar(yr){
  parent.document.getElementById("rankChart").innerHTML = "";
var year = yr;

var margin = {top: 0, right: 20, bottom: 20, left: 70},
    width = 430 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom;



var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .1, 1);

var x = d3.scale.linear()
    .range([width, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5);

var svg = d3.select("#rankChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("coda.csv", function(error, data) {
  data.forEach(function(d) {
    d[year] = +d[year];
  });
    //data.filter(function(d) { return d[year] > 20,000,000 });
    y.domain(data.sort(true? function(a, b) { return b[year] - a[year]; }: function(a, b) { return d3.ascending(a.Code, b.Code); })
        .slice(0,50)
        .map(function(d) { console.log(d.Code);return d.Code; }));
  x.domain([0, d3.max(data, function(d) { return d[year]; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    ;

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("y", function(d) { return y(d.Code); })
      .attr("height", y.rangeBand())
      .attr("x", function(d) { return x(d[year]); })
      .attr("width", function(d) { return height - x(d[year]); });
  svg.select(".y.axis")
    .selectAll("text")
    .style("font-size","8px"); 

});


}
