
/**
 * Widget for visualizing quantitative relationships using a bar chart
 * @author griffinj@lafayette.edu
 */
(function($, Drupal) {
    Drupal.behaviors.dssElcQtyRelsVisualize = {

	attach: function(context, settings) {

	    // Example
	    /*
	    data = [{label: 'test1', value: 100},
    {label: 'test2', value: 200},
    {label: 'test3', value: 300}
		    ];
	    */

	    /*
	    var data = [4, 8, 15, 16, 23, 42];
	    var chart = d3.select("#book-measures").append("svg")
	    .attr("class", "chart");

	    // Set the x-axis to the domain of the data
	    var x = d3.scale.linear()
	    .domain([0, d3.max(data)])
	    // The range in pixels (?)
	    .range([0, 420]);

	    // Dynamic bar height
	    // Otherwise, each bar will have a static height, and the height of the entire chart cannot be scaled
	    var y = d3.scale.ordinal()
	    .domain(data)
	    .rangeBands([0, 120]);

	    chart.selectAll("rect")
	    .data(data)
	    .enter().append("rect")
	    .attr("y", y)
	    .attr("width", y)
	    .attr('height', x.rangeBand());
	    */
	    
	    var data = [
    {"time": 1297110663, "value": 40},
    {"time": 1297110663, "value": 30},
    {"time": 1297110663, "value": 56},
    {"time": 1297110664, "value": 53},
    {"time": 1297110665, "value": 58},
    {"time": 1297110666, "value": 58}];

	    var data2 = [
    {"time": 661, "value": 40},
    {"time": 662, "value": 30},
    {"time": 663, "value": 56},
    {"time": 664, "value": 53},
    {"time": 665, "value": 58},
    {"time": 666, "value": 58}];
	    


	    /*
	      svg.selectAll(".bar")
	    .data(data)
	    .enter().append("rect")
	    .attr("class", "bar")
	    //.attr("x", function(d) { return x(d.label); })
	    //.attr("width", x.rangeBand())
	    .style("width", function(d) { return d * 10 + "px"; });
	    //.attr("y", function(d) { return y(d.value); })
	    //.attr("height", function(d) { return height - y(d.value); });
	    //.attr("height", y);
	    */
	    
	    //d3.tsv("data.tsv", function(error, data) {
	    jQuery.post("/qty/rels/", {

		    contentTypes: settings.dssElcQtyRelsVisualize.contentTypes,
			fields: settings.dssElcQtyRelsVisualize.field,
			measures: settings.dssElcQtyRelsVisualize.measures
			}, function(rels, textStatus) {

		    for(measure in rels) {

			var contentTypeIndex = 0;
			var data = [];

			for(contentType in rels[measure]) {

			    var domain = [];
			    var range = [];

			    visualizeTitle = measure + contentType;
			    data[contentTypeIndex] = {

				key: visualizeTitle,
				values: []
			    };

			    //console.log(rels[i][j]);
			    for(label in rels[measure][contentType]) {

				domain.push(label);
				range.push(rels[measure][contentType][label]);
				//data.push({label: label, value: rels[measure][contentType][label] });

				data[contentTypeIndex]['values'].push({label: label, value: rels[measure][contentType][label] });
			    }

			    //console.log(data);
			    //console.log(data[contentTypeIndex]['values']);
			    
			    exampleData = [{"label":"one", "value":20},
					   {"label":"two", "value":50},
					   {"label":"three", "value":30}];
			    
			    //console.log(exampleData);

			    elementSelector = '#' + contentType + '-measures';
			    $(elementSelector).empty();

			    var canvasWidth = 300, //width
				canvasHeight = 300, //height
				outerRadius = 100, //radius
				color = d3.scale.category20c(); //builtin range of colors

			    var vis = d3.select(elementSelector)
				.append("svg:svg") //create the SVG element inside the <body>
				.data([data[contentTypeIndex]['values']]) //associate our data with the document
				.attr("width", canvasWidth) //set the width of the canvas
				.attr("height", canvasHeight) //set the height of the canvas
				.append("svg:g") //make a group to hold our pie chart
				.attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")") // relocate center of pie to 'outerRadius,outerRadius'
 
				// This will create <path> elements for us using arc data...
				var arc = d3.svg.arc()
				.outerRadius(outerRadius);
 
			    var pie = d3.layout.pie() //this will create arc data for us given a list of values
				.value(function(d) { return d.value; }) // Binding each value to the pie
				.sort( function(d) { return null; } );
 
			    // Select all <g> elements with class slice (there aren't any yet)
			    var arcs = vis.selectAll("g.slice")
				// Associate the generated pie data (an array of arcs, each having startAngle,
				// endAngle and value properties)
				.data(pie)
				// This will create <g> elements for every "extra" data element that should be associated
				// with a selection. The result is creating a <g> for every object in the data array
				.enter()
				// Create a group to hold each slice (we will have a <path> and a <text>
				// element associated with each slice)
				.append("svg:g")
				.attr("class", "slice"); //allow us to style things in the slices (like text)
 
			    arcs.append("svg:path")
				//set the color for each slice to be chosen from the color function defined above
				.attr("fill", function(d, i) { return color(i); } )
				//this creates the actual SVG path using the associated data (pie) with the arc drawing function
				.attr("d", arc);
 
			    // Add a legendLabel to each arc slice...
			    arcs.append("svg:text")
				.attr("transform", function(d) { //set the label's origin to the center of the arc
					//we have to make sure to set these before calling arc.centroid
					d.outerRadius = outerRadius + 50; // Set Outer Coordinate
					d.innerRadius = outerRadius + 25; // Set Inner Coordinate
					return "translate(" + arc.centroid(d) + ")";
				    })
				.attr("text-anchor", "middle") //center the text on it's origin
				.style("fill", "#777777")
				.style("font", "bold 12px Arial")
				.text(function(d, i) {

					if(data[contentTypeIndex]['values'][i].value == 0) {

					    '';
					} else {

					    return data[contentTypeIndex]['values'][i].label;
					}
				    }); //get the label from our original data array

			    // Computes the angle of an arc, converting from radians to degrees.
			    function angle(d) {

				var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
				return a > 90 ? a - 180 : a;
			    }
 
			    // Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
			    /*
			    arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				//.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
				.attr("transform", function(d) { //set the label's origin to the center of the arc
					//we have to make sure to set these before calling arc.centroid
					d.outerRadius = outerRadius; // Set Outer Coordinate
					d.innerRadius = outerRadius/2; // Set Inner Coordinate
					return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
				    })
				.style("fill", "White")
				.style("font", "bold 12px Arial")
				.text(function(d) { return d.data.value; });
			    */
 


			    /*
			    var w = 500, h = 500, r = 100, color = d3.scale.category20c(); //builtin range of colors
 
			    var vis = d3.select(elementSelector)
				.append("svg:svg") //create the SVG element inside the <body>
				.data([data[contentTypeIndex]['values']]) //associate our data with the document
				.attr("width", w) //set the width and height of our visualization (these will be attributes of the <svg> tag
				.attr("height", h)
				.append("svg:g") //make a group to hold our pie chart
				.attr("transform", "translate(" + r + "," + r + ")") //move the center of the pie chart from 0, 0 to radius, radius
 
				var arc = d3.svg.arc() //this will create <path> elements for us using arc data
				.outerRadius(r);
 
			    var pie = d3.layout.pie() //this will create arc data for us given a list of values
				.value(function(d) { return d.value; }); //we must tell it out to access the value of each element in our data array
 
			    var arcs = vis.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
				.data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
				.enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
				.append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
				.attr("class", "slice"); //allow us to style things in the slices (like text)
 
			    arcs.append("svg:path")
				.attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
				.attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function
 
			    arcs.append("svg:text") //add a label to each slice
				.attr("transform", function(d) { //set the label's origin to the center of the arc
					//we have to make sure to set these before calling arc.centroid
					d.innerRadius = 75;
					d.outerRadius = r;
					return "translate(" + arc.centroid(d) + ")"; //this gives us a pair of coordinates like [50, 50]
				    })
				.attr("text-anchor", "middle") //center the text on it's origin
				//.text(function(d, i) { return data[i].label; }); //get the label from our original data array
				.text(function(d, i) { return data[contentTypeIndex]['values'][i].label; }); //get the label from our original data array
			    */

			    // Developing a novel D3 visualization lies outside of the scope of this project
			    
			    /*
			    nv.addGraph(function() {

				    var chart = nv.models.pieChart()
					.x(function(d) { return d.label })
					.y(function(d) { return d.value })
					.showLabels(true);

				    var data = [
						{
						    key: "Cumulative Return",
						    values: [
				    { 
					"label": "One",
					"value" : 29.765957771107
				    } , 
				    { 
					"label": "Two",
					"value" : 0
				    } , 
				    { 
					"label": "Three",
					"value" : 32.807804682612
				    } , 
				    { 
					"label": "Four",
					"value" : 196.45946739256
				    } , 
				    { 
					"label": "Five",
					"value" : 0.19434030906893
				    } , 
				    { 
					"label": "Six",
					"value" : 98.079782601442
				    } , 
				    { 
					"label": "Seven",
					"value" : 13.925743130903
				    } , 
				    { 
					"label": "Eight",
					"value" : 5.1387322875705
				    }
							     ]}];

				    // src/models/pieChart.js
				    // https://github.com/novus/nvd3/issues/98				    
				    d3.select('#chart svg')
					//.datum(data)
					.datum([data[0].values])
					.transition().duration(1200)
					.call(chart);

				    return chart;
				});
			    
			    contentTypeIndex++;
			    */


			    /*
			    range = [0, d3.max(range)];



			    var margin = {top: 20, right: 20, bottom: 30, left: 40};

			    // var width = 960 - margin.left - margin.right;
			    var width = 256 - margin.left - margin.right;
			    //var height = 500 - margin.top - margin.bottom;
			    var height = 360 - margin.top - margin.bottom;

			    var formatPercent = d3.format(".0%");

			    var x = d3.scale.ordinal()
			    .rangeRoundBands([0, width], .1, 1);

			    var y = d3.scale.linear()
			    .range([height, 0]);
			    
			    var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");
			    
			    var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left")
			    .tickFormat(formatPercent);

			    //var w = 20, h = 80;
	    
			    // The range of the X scale is set to the width of each bar
			    var x = d3.scale.linear()
				//.domain([0, 1])
				.range([0, width]);

			    var y = d3.scale.linear()
				.domain([0, 100])
				.rangeRound([0, height]);

			    var chart = d3.select(elementSelector).append("svg")
				.attr("class", "chart")
				.attr("width", width * data.length - 1)
				.attr("height", height);

			    chart.selectAll("rect")
				.data(data)
				.enter().append("rect")
				.attr("x", function(d, i) { return x(i) - .5; })
				.attr("y", function(d) { return height - y(d.value) - .5; })
				.attr("width", width)
				.attr("height", function(d) { return y(d.value); });

			    chart.append("line")
				.attr("x1", 0)
				.attr("x2", width * data.length)
				.attr("y1", height - .5)
				.attr("y2", height - .5)
				.style("stroke", "#000");

			    svg.append('g')
			    .attr("class", "y axis")
			    .call(yAxis)
			    .append("text")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 6)
			    .attr("dy", ".71em")
			    .style("text-anchor", "end")
			    .text('Quantity');
			    
			    /*
			    var svg = d3.select(elementSelector).append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			    .append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			    
			    svg.append('g')
			    .attr("class", "x axis")
			    .attr("transform", "translate(0," + height + ")")
			    .call(xAxis);
			    


			    console.log('trace');
			    */

			    /*
			    svg.selectAll(".bar")
			    .data(data)
			    .enter().append("rect")
			    .attr("class", "bar")
			    .attr("x", function(d) { return x(d.label); })
			    .attr("width", x.rangeBand())
			    .attr("y", function(d) { return y(d.value); })
			    .attr("height", function(d) { return height - y(d.value); });
			    */
			}
		    }
		});
	}
    }
})(jQuery, Drupal);
	    
		    /*
		    rels.forEach(function(d) {

			    d.frequency = +d.frequency;
			});

		    x.domain(data.map(function(d) { return d.letter; }));
		    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

		    svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		    svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Frequency");

		    svg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.letter); })
			.attr("width", x.rangeBand())
			.attr("y", function(d) { return y(d.frequency); })
			.attr("height", function(d) { return height - y(d.frequency); });

		    d3.select("input").on("change", change);

		    var sortTimeout = setTimeout(function() {

			    d3.select("input").property("checked", true).each(change);
			}, 2000);

		    function change() {

			clearTimeout(sortTimeout);
			
			// Copy-on-write since tweens are evaluated after a delay.
			var x0 = x.domain(data.sort(this.checked
						    ? function(a, b) { return b.frequency - a.frequency; }
						    : function(a, b) { return d3.ascending(a.letter, b.letter); })
					  .map(function(d) { return d.letter; }))
			    .copy();

			var transition = svg.transition().duration(750),
			    delay = function(d, i) { return i * 50; };

			transition.selectAll(".bar")
			    .delay(delay)
			    .attr("x", function(d) { return x0(d.letter); });

			transition.select(".x.axis")
			    .call(xAxis)
			    .selectAll("g")
			    .delay(delay);
		    }
		}
		})(jQuery, Drupal);
		    */
