/**
 * Created by User on 27-11-2016.
 */
function valueFormat(d,city) {

    var k;
    if (d > 1000000) {
        k=Math.round(d / 1000000 * 10) / 10 + "M";
    } else if (d > 1000) {
        k= Math.round(d / 1000 * 10) / 10 + "K";
    } else {
        k= d;
    }
    return k;
}

function draw_NO2(place){
    parent.document.getElementById("No2_graph").innerHTML = "";
    // window.alert(place);
// Set the dimensions of the canvas / graph
    var margin = {top: 50, right: 20, bottom: 30, left: 100},
        width = 900 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
// Parse the date / time
// Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var formatyAxis = d3.format('.0f');
// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(15);
    var yAxis = d3.svg.axis().scale(y)
        .orient("left")
        .tickFormat(formatyAxis)
        .ticks(5);
// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place]); });
// Define the div for the tooltip
    var div = d3.select("#No2_graph").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
// Adds the svg canvas
    var svg = d3.select("#No2_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
// Get the data



    d3.csv("NO2Data.csv", function(error, data) {

        data.forEach(function(d) {

            d.Year = d.Year;
            d[place] = + d[place];
        });


// Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.Year; }));
        y.domain([0, d3.max(data, function(d) { return d[place]; })]);

        console.log(d3.max(data, function(d) { return d[place]; }));
// Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));
// Add the scatterplot
        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d[place]); })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html("Year: "+(d.Year) + "<br/> NO2 Emission: "  + valueFormat(d[place]))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
// Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
// Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    });
}


function draw_CO2(place){
    parent.document.getElementById("Co2_graph").innerHTML = "";
    // window.alert(place);
// Set the dimensions of the canvas / graph
    var margin = {top: 50, right: 20, bottom: 30, left: 100},
        width = 900 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
// Parse the date / time
// Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var formatyAxis = d3.format('.0f');
// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(15);
    var yAxis = d3.svg.axis().scale(y)
        .orient("left")
        .tickFormat(formatyAxis)
        .ticks(5);
// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place]); });
// Define the div for the tooltip
    var div = d3.select("#Co2_graph").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
// Adds the svg canvas
    var svg = d3.select("#Co2_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
// Get the data



    d3.csv("CO2Data.csv", function(error, data) {

        data.forEach(function(d) {

            d.Year = d.Year;
            d[place] = + d[place];
        });


// Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.Year; }));
        y.domain([0, d3.max(data, function(d) { return d[place]; })]);

        console.log(d3.max(data, function(d) { return d[place]; }));
// Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));
// Add the scatterplot
        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d[place]); })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html("Year: "+(d.Year) + "<br/> CO2 Emission: "  + valueFormat(d[place]))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
// Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
// Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    });
}


function draw_Methane(place){
    parent.document.getElementById("Methane_graph").innerHTML = "";
    // window.alert(place);
// Set the dimensions of the canvas / graph
    var margin = {top: 50, right: 20, bottom: 30, left: 100},
        width = 900 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
// Parse the date / time
// Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var formatyAxis = d3.format('.0f');
// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(15);
    var yAxis = d3.svg.axis().scale(y)
        .orient("left")
        .tickFormat(formatyAxis)
        .ticks(5);
// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place]); });
// Define the div for the tooltip
    var div = d3.select("#Methane_graph").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
// Adds the svg canvas
    var svg = d3.select("#Methane_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
// Get the data



    d3.csv("MethaneDataT.csv", function(error, data) {

        data.forEach(function(d) {

            d.Year = d.Year;
            d[place] = + d[place];
        });


// Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.Year; }));
        y.domain([0, d3.max(data, function(d) { return d[place]; })]);

        console.log(d3.max(data, function(d) { return d[place]; }));
// Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));
// Add the scatterplot
        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d[place]); })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html("Year: "+(d.Year) + "<br/> CO2 Emission: "  + valueFormat(d[place]))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
// Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
// Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    });
}





$(function () {
    $('a[data-toggle="collapse"]').on('click',function(){

        var objectID=$(this).attr('href');

        if($(objectID).hasClass('in'))
        {
            $(objectID).collapse('hide');
        }

        else{
            $(objectID).collapse('show');
        }
    });


    $('#expandAll').on('click',function(){

        $('a[data-toggle="collapse"]').each(function(){
            var objectID=$(this).attr('href');
            if($(objectID).hasClass('in')===false)
            {
                $(objectID).collapse('show');
            }
        });
    });


    $('#collapseAll').on('click',function(){

        $('a[data-toggle="collapse"]').each(function(){
            var objectID=$(this).attr('href');
            $(objectID).collapse('hide');
        });
    });

});

$(function () {
    $('a[data-toggle="collapse1"]').on('click',function(){

        var objectID=$(this).attr('href');

        if($(objectID).hasClass('in'))
        {
            $(objectID).collapse('hide');
        }

        else{
            $(objectID).collapse('show');
        }
    });

    $('#expandAll1').on('click',function(){

        $('a[data-toggle="collapse1"]').each(function(){
            var objectID=$(this).attr('href');
            if($(objectID).hasClass('in')===false)
            {
                $(objectID).collapse('show');
            }
        });
    });

    $('#collapseAll1').on('click',function(){

        $('a[data-toggle="collapse1"]').each(function(){
            var objectID=$(this).attr('href');
            $(objectID).collapse('hide');
        });
    });

});

function draw_World(place){
    parent.document.getElementById("world_graph").innerHTML = "";
    // window.alert(place);
// Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 100},
        width = 900 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
// Parse the date / time
// Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(15);
    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);
// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place]); });
// Define the div for the tooltip
    var div = d3.select("#world_graph").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
// Adds the svg canvas
    var svg = d3.select("#world_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
// Get the data



    d3.csv("finalCSV.csv", function(error, data) {

        data.forEach(function(d) {

            d.Year = d.Year;
            d[place] = + d[place];
        });
// Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.Year; }));
        y.domain([0, d3.max(data, function(d) { return d[place]; })]);
// Add the valueline path.
        svg.append("path")
            .attr("class", "line lineClass")
            .attr("d", valueline(data));
// Add the scatterplot



        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d[place]); })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html("Year: "+(d.Year) + "<br/> GreenHouse: "  + valueFormat(d[place]))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
// Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
// Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    });
}


function draw_World_NO2(place){
    parent.document.getElementById("No2_World_graph").innerHTML = "";
    // window.alert(place);
// Set the dimensions of the canvas / graph
    var margin = {top: 50, right: 20, bottom: 30, left: 100},
        width = 900 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
// Parse the date / time
// Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var formatyAxis = d3.format('.0f');
// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(15);
    var yAxis = d3.svg.axis().scale(y)
        .orient("left")
        .tickFormat(formatyAxis)
        .ticks(5);
// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place]); });
// Define the div for the tooltip
    var div = d3.select("#No2_World_graph").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
// Adds the svg canvas
    var svg = d3.select("#No2_World_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
// Get the data



    d3.csv("NO2Data.csv", function(error, data) {

        data.forEach(function(d) {

            d.Year = d.Year;
            d[place] = + d[place];
        });


// Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.Year; }));
        y.domain([0, d3.max(data, function(d) { return d[place]; })]);

        console.log(d3.max(data, function(d) { return d[place]; }));
// Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));
// Add the scatterplot
        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d[place]); })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html("Year: "+(d.Year) + "<br/> NO2 Emission: "  + valueFormat(d[place]))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
// Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
// Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    });
}


function draw_World_CO2(place){
    parent.document.getElementById("Co2_World_graph").innerHTML = "";
    // window.alert(place);
// Set the dimensions of the canvas / graph
    var margin = {top: 50, right: 20, bottom: 30, left: 100},
        width = 900 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
// Parse the date / time
// Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var formatyAxis = d3.format('.0f');
// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(15);
    var yAxis = d3.svg.axis().scale(y)
        .orient("left")
        .tickFormat(formatyAxis)
        .ticks(5);
// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place]); });
// Define the div for the tooltip
    var div = d3.select("#Co2_World_graph").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
// Adds the svg canvas
    var svg = d3.select("#Co2_World_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
// Get the data



    d3.csv("CO2Data.csv", function(error, data) {

        data.forEach(function(d) {

            d.Year = d.Year;
            d[place] = + d[place];
        });


// Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.Year; }));
        y.domain([0, d3.max(data, function(d) { return d[place]; })]);

        console.log(d3.max(data, function(d) { return d[place]; }));
// Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));
// Add the scatterplot
        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d[place]); })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html("Year: "+(d.Year) + "<br/> CO2 Emission: "  + valueFormat(d[place]))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
// Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
// Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    });
}


function draw_World_Methane(place){
    parent.document.getElementById("Methane_World_graph").innerHTML = "";
    // window.alert(place);
// Set the dimensions of the canvas / graph
    var margin = {top: 50, right: 20, bottom: 30, left: 100},
        width = 900 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
// Parse the date / time
// Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var formatyAxis = d3.format('.0f');
// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(15);
    var yAxis = d3.svg.axis().scale(y)
        .orient("left")
        .tickFormat(formatyAxis)
        .ticks(5);
// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place]); });
// Define the div for the tooltip
    var div = d3.select("#Methane_World_graph").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
// Adds the svg canvas
    var svg = d3.select("#Methane_World_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
// Get the data



    d3.csv("MethaneDataT.csv", function(error, data) {

        data.forEach(function(d) {

            d.Year = d.Year;
            d[place] = + d[place];
        });


// Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.Year; }));
        y.domain([0, d3.max(data, function(d) { return d[place]; })]);

        console.log(d3.max(data, function(d) { return d[place]; }));
// Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));
// Add the scatterplot
        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d[place]); })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html("Year: "+(d.Year) + "<br/> CO2 Emission: "  + valueFormat(d[place]))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
// Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
// Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    });
}
