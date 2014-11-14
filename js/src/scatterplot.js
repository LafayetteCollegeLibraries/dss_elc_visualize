/**
 * @author griffinj@lafayette.edu
 * Easton Library Company Project
 * A jQuery plug-in for the rendering of scatterplot widgets for univariate and bivariate analyses
 *
 */

// JSHint
var d3 = d3 || {};

(function($) {

    'use strict';

    $.fn.renderScatterplot = function(options) {

	var options = $.extend({

		target: 'div#univariate-visualize',
		variables: [],
		
	    }, options);


	if(true) {

	    // Fixture
	    /*
	    data = [ {date: '181501', titleA: 12, titleB: 45 },
		     {date: '181502', titleA: 23, titleB: 56 },
		     {date: '181503', titleA: 34, titleB: 67 } ];
	    */

	    var parseDate = d3.time.format("%Y%m%d").parse;

	    var data = options.data.data;
	    var metadata = options.data.metadata;

	    var margin = {top: 20, right: 20, bottom: 30, left: 40};
	    var width = (680 - margin.left - margin.right);

	    if(data.length - 9 > 0) {

		width = width + (data.length - 9) * (metadata.x.type == 'temporal' ? 16 : 180);
	    }
	    var height = 500 - margin.top - margin.bottom;

	    var svg = d3.select(options.target).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	    /*
	    data = [ {sample: 'titleA', domain: '181501', value: 12 },
		     {sample: 'titleA', domain: '181502', value: 23 },
		     {sample: 'titleA', domain: '181503', value: 34 },
		     {sample: 'titleB', domain: '181501', value: 45 },
		     {sample: 'titleB', domain: '181502', value: 56 },
		     {sample: 'titleB', domain: '181503', value: 67 },
		     {sample: 'titleC', domain: '181501', value: 78 },
		     {sample: 'titleC', domain: '181502', value: 89 } ];
	    */


	    /*
	    data = [
		    { domain: '18150101', values: [ { sample: 'sampleA', value: 45 }, { sample: 'sampleB', value: 54 } ] },
		    { domain: '18150201', values: [ { sample: 'sampleA', value: 67 }, { sample: 'sampleB', value: 76 } ] },
		    { domain: '18150301', values: [ { sample: 'sampleA', value: 88 }, { sample: 'sampleB', value: 78 } ] },
		    { domain: '18150401', values: [ { sample: 'sampleC', value: 32 }, { sample: 'sampleD', value: 104 } ] },
		    { domain: '18150501', values: [ { sample: 'sampleC', value: 56 }, { sample: 'sampleD', value: 67 } ] },
		    { domain: '18150601', values: [ { sample: 'sampleC', value: 42 }, { sample: 'sampleD', value: 34 } ] } ];
	    metadata = {

		x: { property: 'domain', type: 'temporal', axis: 'x', label: 'Domain' },
		y: { property: 'value', type: 'ratio', axis: 'y', label: 'Range' }
	    };
	    */

	    /*
	    data = [
		    { domain: 'subjectA', values: [ { sample: 'male', value: 45 }, { sample: 'female', value: 54 } ] },
		    { domain: 'subjectB', values: [ { sample: 'male', value: 67 }, { sample: 'female', value: 76 } ] },
		    { domain: 'subjectC', values: [ { sample: 'male', value: 88 }, { sample: 'female', value: 78 } ] },
		    { domain: 'subjectD', values: [ { sample: 'male', value: 32 }, { sample: 'female', value: 104 } ] },
		    { domain: 'subjectE', values: [ { sample: 'male', value: 56 }, { sample: 'female', value: 67 } ] },
		    { domain: 'subjectF', values: [ { sample: 'male', value: 42 }, { sample: 'female', value: 34 } ] } ];
	    metadata = [

			{ label: 'domain', type: 'nominal', axis: 'x' },
			{ label: 'value', type: 'ratio', axis: 'y' }
	    ];
	    */

	    // Generate a set of points from the data set
	    data.forEach(function(d) {

		    d.values.forEach(function(value) {

			    value.domain = d.domain;
			});
		});

	    data = data.map(function(d) {
		    
		    return d.values
		}).reduce(function(v,u) { return v.concat(u) });

	    //isNominal = false;
	    scales = {};
	    axes = {};
	    isTemporal = false;

	    //metadata.forEach(function(md) {
	    d3.entries(metadata).map(function(d) {

		    return d.value;
		}).forEach(function(md) {

		    if(md.type == 'temporal') {

			isTemporal = true;

			// Parse the data for temporal data
			data.forEach(function(d) {

				// Parse the date
				d.domain = parseDate(d.domain);
			    });
			
			scales[md.axis] = d3.time.scale().range([ md.axis == 'x' ? 0 : height,
								  md.axis == 'y' ? 0 : width ]);
			    /*
			      .domain(d3.extent(data, function(d) {
				    
			      return d.domain;
			      }));
			    */

			//minDate = '18141201';
			//maxDate = '18160101';

			minDate = '18141201';
			maxDate = '18150701';
			dateValues = d3.extent(data, function(d) {
				
				return d.domain;
			    });

			scales[md.axis].domain(d3.extent([parseDate(minDate)].concat(dateValues).concat(parseDate(maxDate))));
		    } else if(md.type == 'nominal') {

			// Refactor
			//isNominal = true;
			scales[md.axis] = d3.scale.ordinal().rangeRoundBands([ md.axis == 'x' ? 0 : height,
									     md.axis == 'y' ? 0 : width ], 1)
			    // For nominal scales...
			    // Unique: https://github.com/mbostock/d3/pull/1138
			    .domain(d3.scale.ordinal().domain(data.map(function(d) {
					    
					    return d[md.property];
					})).domain());

		    } else {
			
			// For now, just utilize the d3 linear scale for non-temporal data
			scales[md.axis] = d3.scale.linear().domain(d3.extent(data, function(d) {
			
				    return d[md.property]; }
				)).nice().range([ md.axis == 'x' ? 0 : height,
						  md.axis == 'y' ? 0 : width ]);
		    }

		});

	    var x = scales['x'];

	    var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");
	    //var xAxis = axes['x'];

	    if(isTemporal) {

		xAxis.tickPadding(5)
		    .tickFormat(d3.time.format("%Y-%m-%d"));
		//xAxis.tickPadding(5);
	    }

	    var y = scales['y'];

	    var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");
	    //var yAxis = axes['y'];

	    var color = d3.scale.category10().domain(data.map(function(d) { return d.sample }));

	    svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.append("text")
		.attr("class", "label")
		.attr("x", width)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text(metadata['x'].label);

	    svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text(metadata['y'].label)

		svg.selectAll(".dot")
		.data(data)
		.enter().append("circle")
		.attr("class", "dot")
		.attr("r", 3.5)
		.attr("cx", function(d) { return x(d.domain); })
		.attr("cy", function(d) { return y(d.value); })
		.style("fill", function(d) { return color(d.sample); });

	    var legend = svg.selectAll(".legend")
		.data(color.domain())
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
	    
	    legend.append("rect")
		.attr("x", width - 18)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", color);
	    
	    legend.append("text")
		.attr("x", width - 24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) { return d; })
		.style("fill", color);

	    // Metrics
	    /*
	    var metricsLegend = svg.selectAll(".metrics-legend")
		.data(color.domain())
		.enter().append("g")
		.attr("class", "metrics-legend")
		.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
	    
	    metricsLegend.append("rect")
		.attr("x", width - 18)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", color);
	    
	    metricsLegend.append("text")
		.attr("x", width - 24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) { return d; });
	    */

	    legendLabels = {

	        components: 'Network Components',
		avgClustering: 'Average Clustering Coefficient',

		sample: 'Sample',
		aMean: "x\u0304",
		median: 'x\u0303',
		mode: 'Mode',
		kurtosisPearson: "β\u2082",
		kurtosisFisher: "γ\u2081",
		distribution: 'Distribution'
	    };

	    // The network metrics
	    metrics = {

		sample: 'sampleA',
		aMean: 3.45,
		median: '{ ' + 4.56 + ' }',
		mode: 7.68,
		kurtosisPearson: 2.345,
		kurtosisFisher: -1,
		distribution: 'Poisson'
		
	    };

	    /*
	    metricsColors = d3.scale.category10().domain(d3.keys(metrics));

	    var metricsLegend = svg.selectAll(".metricsLegend")
		.data(metricsColors.domain())
		.enter().append("g")
		.attr("class", "metricsLegend")
		.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
	    metricsLegend.append("text")
		.attr("x", width - 18)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.style("fill", metricsColors)
		.text(function(d) {

			return legendLabels[d] + ': ' + metrics[d];
		    });
	    */

	}
    };
}(jQuery));