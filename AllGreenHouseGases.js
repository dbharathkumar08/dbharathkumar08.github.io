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




function draw_Co2(place){
    parent.document.getElementById("Co2_graph").innerHTML = "";
    // window.alert(place);
    //console.log(place);
// Set the dimensions of the canvas / graph
    var place2 = "World";
    var margin = {top: 30, right: 180, bottom: 50, left: 100},
        width = 900 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;
// Parse the date / time
// Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(10);
    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);
// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place]); });

    // Define the line
    var valueline2 = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place2]); });

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

    var finalplacevalue=0;
    var finalplace2value=300;

    d3.csv("CO2Data.csv", function(error, data) {

        var max = + d3.max(data, function(d) { return + d[place]; });
        var min = + d3.min(data, function(d) { return + d[place]; });

        var maxWorld = + d3.max(data, function(d) { return + d[place2]; });
        var minWorld = + d3.min(data, function(d) { return + d[place2]; });

        //console.log(max);
        //console.log(min);

        //console.log(maxWorld);
        //console.log(minWorld);

        var offset = + 100/ (max - min);
        var offsetWorld = + 100/ (maxWorld - minWorld);

        //console.log(offset);

        //console.log(offsetWorld);
        data.forEach(function(d) {

            //console.log(d[place]);
            //console.log(d[place2]);
            d.Year = d.Year;
            d[place] = + ((+ (+ d[place] - max) * offset)) + 100;
            //console.log(d[place]);
            if(place!="World"){
                d[place2] = + ((+ (+ d[place2] - maxWorld) * offsetWorld)) + 100;
                //console.log(d[place2]);
            }

            finalplacevalue = d[place];
            finalplace2value = d[place2];

        });
// Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.Year; }));
        y.domain([0, d3.max(data, function(d) { return d[place]; })]);
// Add the valueline path.
        svg.append("path")
            .attr("class", "line lineClass")
            .attr("d", valueline(data));

        svg.append("path")
            .attr("class", "line lineClass")
            .style("stroke", "red")
            .attr("d", valueline2(data));
// Add the scatterplot
        var area = "";
        if(place!='World'){
            area = place+" vs ";
        }
        svg.append("text")
            .attr("x", (width/3.4))             
            .attr("y", 15)
            .attr("text-anchor", "middle")  
            .style("font-size", "11px") 
            .style("text-decoration", "underline")  
            .text(area+"World Graph for CO2 Emission");


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


        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d[place2]); })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html("Year: "+(d.Year) + "<br/> GreenHouse: "  + valueFormat(d[place2]))
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

        // Add the text label for the x axis
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
            .style("text-anchor", "middle")
            .text("Year");


// Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        // Add the text label for the Y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 30 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Percentage Change");


        console.log(finalplacevalue);

        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(finalplace2value) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "red")
            .text(place2);

        if(place!="World"){
            svg.append("text")
                .attr("transform", "translate(" + (width+3) + "," + y(finalplacevalue) + ")")
                .attr("dy", ".35em")
                .attr("text-anchor", "start")
                .style("fill", "steelblue")
                .text(place);

        }


    });




}

function draw_Methane(place){
    parent.document.getElementById("Methane_graph").innerHTML = "";
    // window.alert(place);
    //console.log(place);
// Set the dimensions of the canvas / graph
    var place2 = "World";
    var margin = {top: 30, right: 180, bottom: 50, left: 100},
        width = 900 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;
// Parse the date / time
// Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(10);
    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);
// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place]); });

    // Define the line
    var valueline2 = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place2]); });

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

    var finalplacevalue=0;
    var finalplace2value=300;

    d3.csv("MethaneDataT.csv", function(error, data) {

        var max = + d3.max(data, function(d) { return + d[place]; });
        var min = + d3.min(data, function(d) { return + d[place]; });

        var maxWorld = + d3.max(data, function(d) { return + d[place2]; });
        var minWorld = + d3.min(data, function(d) { return + d[place2]; });

        //console.log(max);
        //console.log(min);

        //console.log(maxWorld);
        //console.log(minWorld);

        var offset = + 100/ (max - min);
        var offsetWorld = + 100/ (maxWorld - minWorld);

        //console.log(offset);

        //console.log(offsetWorld);
        data.forEach(function(d) {

            //console.log(d[place]);
            //console.log(d[place2]);
            d.Year = d.Year;
            d[place] = + ((+ (+ d[place] - max) * offset)) + 100;
            //console.log(d[place]);
            if(place!="World"){
                d[place2] = + ((+ (+ d[place2] - maxWorld) * offsetWorld)) + 100;
                //console.log(d[place2]);
            }
            finalplacevalue = d[place];
            finalplace2value = d[place2];
        });
// Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.Year; }));
        y.domain([0, d3.max(data, function(d) { return d[place]; })]);
// Add the valueline path.
        svg.append("path")
            .attr("class", "line lineClass")
            .attr("d", valueline(data));

        svg.append("path")
            .attr("class", "line lineClass")
            .style("stroke", "red")
            .attr("d", valueline2(data));
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


        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d[place2]); })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html("Year: "+(d.Year) + "<br/> GreenHouse: "  + valueFormat(d[place2]))
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

        // Add the text label for the x axis
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
            .style("text-anchor", "middle")
            .text("Year");

// Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        // Add the text label for the Y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 30 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Percentage Change");


        console.log(finalplacevalue);

        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(finalplace2value) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "red")
            .text(place2);

        if(place!="World"){
            svg.append("text")
                .attr("transform", "translate(" + (width+3) + "," + y(finalplacevalue) + ")")
                .attr("dy", ".35em")
                .attr("text-anchor", "start")
                .style("fill", "steelblue")
                .text(place);

        }

            var area = "";
        if(place!='World'){
            area = place+" vs ";
        }
        svg.append("text")
            .attr("x", (width/3.4))             
            .attr("y", 15)
            .attr("text-anchor", "middle")  
            .style("font-size", "11px") 
            .style("text-decoration", "underline")  
            .text(area+"World Graph for Methane Emission");


    });




}
function draw_NO2(place){
    parent.document.getElementById("No2_graph").innerHTML = "";
    // window.alert(place);
    //console.log(place);
// Set the dimensions of the canvas / graph
    var place2 = "World";
    var margin = {top: 30, right: 180, bottom: 50, left: 100},
        width = 900 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;
// Parse the date / time
// Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(10);
    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);
// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place]); });

    // Define the line
    var valueline2 = d3.svg.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[place2]); });

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
    var finalplacevalue=0;
    var finalplace2value=300;


    d3.csv("NO2Data.csv", function(error, data) {

        var max = + d3.max(data, function(d) { return + d[place]; });
        var min = + d3.min(data, function(d) { return + d[place]; });

        var maxWorld = + d3.max(data, function(d) { return + d[place2]; });
        var minWorld = + d3.min(data, function(d) { return + d[place2]; });

        //console.log(max);
        //console.log(min);

        //console.log(maxWorld);
        //console.log(minWorld);

        var offset = + 100/ (max - min);
        var offsetWorld = + 100/ (maxWorld - minWorld);

        //console.log(offset);

        //console.log(offsetWorld);
        data.forEach(function(d) {

            //console.log(d[place]);
            //console.log(d[place2]);
            d.Year = d.Year;
            d[place] = + ((+ (+ d[place] - max) * offset)) + 100;
            //console.log(d[place]);
            if(place!="World"){
                d[place2] = + ((+ (+ d[place2] - maxWorld) * offsetWorld)) + 100;
                //console.log(d[place2]);
            }
            finalplacevalue = d[place];
            finalplace2value = d[place2];

        });
// Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.Year; }));
        y.domain([0, d3.max(data, function(d) { return d[place]; })]);
// Add the valueline path.
        svg.append("path")
            .attr("class", "line lineClass")
            .attr("d", valueline(data));

        svg.append("path")
            .attr("class", "line lineClass")
            .style("stroke", "red")
            .attr("d", valueline2(data));
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


        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d[place2]); })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html("Year: "+(d.Year) + "<br/> GreenHouse: "  + valueFormat(d[place2]))
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

        // Add the text label for the x axis
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
            .style("text-anchor", "middle")
            .text("Year");
// Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);


        // Add the text label for the Y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 30 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Percentage Change");


        console.log(finalplacevalue);

        svg.append("text")
            .attr("transform", "translate(" + (width+3) + "," + y(finalplace2value) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "red")
            .text(place2);

        if(place!="World"){
            svg.append("text")
                .attr("transform", "translate(" + (width+3) + "," + y(finalplacevalue) + ")")
                .attr("dy", ".35em")
                .attr("text-anchor", "start")
                .style("fill", "steelblue")
                .text(place);

        }

        var area = "";
        if(place!='World'){
            area = place+" vs ";
        }
        svg.append("text")
            .attr("x", (width/3.4))             
            .attr("y", 15)
            .attr("text-anchor", "middle")  
            .style("font-size", "11px") 
            .style("text-decoration", "underline")  
            .text(area+"World Graph for NO2 Emission");

    });




}


$(document).ready(function(){

    $("#line_graph").show();
    $("#No2_graph").hide();
    $("#Methane_graph").hide();
    $("#Co2_graph").hide();

});

$(document).ready(function(){
    $('#purpose').on('change', function() {
        if ( this.value == '3')
        {
            $("#No2_graph").show();
        }
        else
        {
            $("#No2_graph").hide();
        }
    });
});

$(document).ready(function(){
    $('#purpose').on('change', function() {
        if ( this.value == '1')
        {
            $("#Co2_graph").show();
        }
        else
        {
            $("#Co2_graph").hide();
        }
    });
});

$(document).ready(function(){
    $('#purpose').on('change', function() {
        if ( this.value == '2')
        {
            $("#Methane_graph").show();
        }
        else
        {
            $("#Methane_graph").hide();
        }
    });
});

$(document).ready(function(){
    $('#purpose').on('change', function() {
        if ( this.value == '0')
        {
            $("#line_graph").show();
            $("#No2_graph").hide();
            $("#Methane_graph").hide();
            $("#Co2_graph").hide();
        }
        else
        {
            $("#line_graph").hide();
        }
    });
});
