/**
 * Widget for visualizing bivariate analyses using a scatter plot
 * @author griffinj@lafayette.edu
 */
(function($, Drupal) {
    Drupal.behaviors.dssElcBivariateVisualize = {

	attach: function(context, settings) {

	    // contentTypes[]=loan&fields[]=field_loan_duration&measures[]=total&analysis=bivariate

	    console.log(settings.dssElcBivariateVisualize);

	    jQuery.post("/qty/rels/", {

		    contentTypes: settings.dssElcBivariateVisualize.contentTypes,
			fields: settings.dssElcBivariateVisualize.fields,
			measures: settings.dssElcBivariateVisualize.measures,
			analysis: settings.dssElcBivariateVisualize.analysis,
			
		}, function(dataSets, textStatus) {

		    for(contentType in dataSets) {

			//console.log(dataSets[contentType]);
			var data = dataSets[contentType]
			    [settings.dssElcBivariateVisualize.measures[0]]
			    [settings.dssElcBivariateVisualize.fields[0]]
			    [settings.dssElcBivariateVisualize.measures[1]]
			    [settings.dssElcBivariateVisualize.fields[1]];

			console.log(data);
			
			elementSelector = '#' + contentType + '-bivariate';
			$(elementSelector).empty();
		    
			var w = 500;
			var h = 250;

			var svg = d3.select(elementSelector)
			.append("svg")
			.attr("width", w)
			.attr("height", h);

			var xScale = d3.scale.linear()
			    .domain([0, d3.max(data, function(d) { return d[0]; })])
			    .range([padding, w - padding]);

			var yScale = d3.scale.linear()
			    .domain([0, d3.max(data, function(d) { return d[1]; })])
			    .range([h - padding, padding]);
			
			svg.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			
			.attr("cx", function(d) {
				return xScale(d[0]);
			    })
			.attr("cy", function(d) {
				return yScale(d[1]);
			    })
			.attr("r", 5);

			var padding = 20;


			var xAxis = d3.svg.axis()
			    .scale(xScale)
			    .orient("bottom")
			    .ticks(5);  //Set rough # of ticks

			svg.append("g")
			    .attr("class", "axis")
			    .attr("transform", "translate(0," + (h - padding) + ")")
			    .call(xAxis);

			//Define Y axis
			var yAxis = d3.svg.axis()
			    .scale(yScale)
			    .orient("left")
			    .ticks(5);

			//Create Y axis
			svg.append("g")
			    .attr("class", "axis")
			    .attr("transform", "translate(" + padding + ",0)")
			    .call(yAxis);

		    }
		});
	}
    }
})(jQuery, Drupal);