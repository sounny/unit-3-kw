//execute script when window is loaded
window.onload = function(){
    var container = d3.select("body") //get the <body> element from the DOM

};
//Example 1.1 line 3...container block
var container = d3.select("body") //get the <body> element from the DOM
    .append("svg") //put a new svg in the body

//SVG dimension variables
var w = 900, h = 500;


//Example 1.5 line 1...container block
var container = d3.select("body") //get the <body> element from the DOM
    .append("svg") //put a new svg in the body
    .attr("width", w) //assign the width
    .attr("height", h) //assign the height
    .attr("class", "container") //assign a class name
    .style("background-color", "rgba(0,0,0,0.2)"); //svg background color


//Example 1.8 line 1...innerRect block
var innerRect = container.append("rect")
    .datum(400) //a single value is a DATUM
    .attr("width", function(d){ //rectangle width
    return d * 2; //400 * 2 = 800
})
    .attr("height", function(d){ //rectangle height
    return d; //400
})
    .attr("class", "innerRect") //class name
    .attr("x", 50) //position from left on the x (horizontal) axis
    .attr("y", 50) //position from top on the y (vertical) axis
    .style("fill", "#FFFFFF"); //fill color

console.log(innerRect);