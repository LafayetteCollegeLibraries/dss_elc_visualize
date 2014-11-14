
/**
 * @author griffinj@lafayette.edu
 * Easton Library Company Project
 * A jQuery plug-in for the rendering of Drupal Node metrics
 *
 */

(function($) {

    $.fn.render = function(options) {

	var options = $.extend({

		target: 'div#node-metrics-visualize',
		chart: 'pie',
		modal: false,
	    }, options);

	// Bootstrap
	if(options.modal) {

	    /*
	    $target = $(options.target);
	    $modal = $('<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		<h3 id="myModalLabel">Modal header</h3>
		</div>
		<div class="modal-body">
		<p>One fine body…</p>
		</div>
		<div class="modal-footer">
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		<button class="btn btn-primary">Save changes</button>
		</div>
		</div>');

	    $target.append($modal.appendTo('body'));
	    */

	    /*
	    $target
		.attr('tabindex', '-1')
		.attr('role', 'dialog')
		.attr('aria-hidden', 'true')
		.addClass('modal hide fade');
	    */

	    //$target.modal({show: true});
	    /*
	    <!-- Modal -->
		<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		<h3 id="myModalLabel">Modal header</h3>
		</div>
		<div class="modal-body">
		<p>One fine body…</p>
		</div>
		<div class="modal-footer">
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		<button class="btn btn-primary">Save changes</button>
		</div>
		</div>
	    */
	}

	if(options.chart == 'bar') {

	} else {

	    // Render the visualization
	    elementSelector = options.target;
	    $(elementSelector).empty();

	    /*
	    var canvasWidth = 228, //width
	    canvasHeight = 180, //height
	    outerRadius = 50, //radius
	    color = d3.scale.ordinal()
	    .range(colorbrewer.BrBG[11]);
	    //color = d3.scale.category20c(); //builtin range of colors
	    //color = colorbrewer.BrBG[11];
	    */

	    var canvasWidth = 300;
	    var canvasHeight = 300;
	    var outerRadius = 90;
	    var color = d3.scale.ordinal().range(colorbrewer.BrBG[11]);
	    var pie = d3.layout.pie() //this will create arc data for us given a list of values
	    .value(function(d) { return d.value; }) // Binding each value to the pie
	    .sort( function(d) { return null; } );
	    // This will create <path> elements for us using arc data...
	    var arc = d3.svg.arc()
	    .outerRadius(outerRadius);

	    /*
            // Set up variables required to draw a pie chart
            var outerRadius = d3CalendarGlobals.cellWidth / 3;
            var innerRadius = 0;
            var pie = d3.layout.pie();
            var color = d3.scale.category10();
            var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
	     */
		    
	    var vis = d3.select(elementSelector)
	    .append("svg:svg") //create the SVG element inside the <body>
	    .data([options.data]) //associate our data with the document
	    .attr("width", canvasWidth) //set the width of the canvas
	    .attr("height", canvasHeight) //set the height of the canvas
	    .append("svg:g") //make a group to hold our pie chart
	    .attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")") // relocate center of pie to 'outerRadius,outerRadius'
	    //.attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")") // relocate center of pie to 'outerRadius,outerRadius'
		    
	    
	    
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
		    //d.outerRadius = outerRadius + 50; // Set Outer Coordinate
		    //d.innerRadius = outerRadius + 25; // Set Inner Coordinate
		    d.outerRadius = outerRadius - 0; // Set Outer Coordinate
		    d.innerRadius = outerRadius - 5; // Set Inner Coordinate
		    return "translate(" + arc.centroid(d) + ")";
		})
	    .attr("text-anchor", "middle") //center the text on it's origin
	    .style("fill", "#777777")
	    .style("font", "bold 12px Arial")
	    .text(function(d, i) {
		    
		    if(options.data[i].value == 0) {
			
			'';
		    } else {
			
			return options.data[i].label;
		    }
		}); //get the label from our original data array
	    
		    // Computes the angle of an arc, converting from radians to degrees.
	    function angle(d) {
		
		var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
		return a > 90 ? a - 180 : a;
	    }
	}

	return this;
    };	

    $.fn.elcDrupalNodeMetrics = function(options) {

	// This is the easiest way to have default options.
	var settings = $.extend({

		target: 'div#node-metrics-visualize',
	    }, options);

	return this.each(function(i, element) {

	    });
    };
}(jQuery));
