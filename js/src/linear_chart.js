/**
 * @author griffinj@lafayette.edu
 * Easton Library Company Project
 * A jQuery plug-in for the rendering of univariate analyses
 *
 */

(function($) {

    $.fn.renderSampleLegend = function(target, sampleGroups, margin, colors) {

	$(target).empty();

	var samplesContainer = d3.select(target).append("svg")
	.attr("width", 680 + margin.left + margin.right)
	.attr("height", 8 + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var legend = samplesContainer.selectAll(".legend")
	.data(sampleGroups)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	legend.append("rect")
	.attr("x", 680 - 18)
	.attr("width", 18)
	.attr("height", 18)
	.attr("id", function(d) {

		return d;
	    })
	.attr('class', 'legend-key')
	.style("fill", colors);

	legend.append("text")
	.attr("x", 680 - 24)
	.attr("y", 9)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d) { return d; })
    };

    $.fn.updateMetricsLegend = function(target, metrics, legendLabels, margin, yOffset) {

	$(target).empty();
	var metricsColors = d3.scale.category10().domain(d3.keys(metrics));

	$('<div id="bivariate-metrics-container" class=""></div>').appendTo($(target));

	//var metricsContainer = d3.select(target).append("svg")
	var metricsContainer = d3.select('#bivariate-metrics-container').append("svg")
	.attr("width", 680 + margin.left + margin.right)
	//.attr("height", 128 + margin.top + margin.bottom)
	.attr("height", 96 + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var metricsLegend = metricsContainer.selectAll(".metricsLegend")
	.data(metricsColors.domain())
	.enter().append("g")
	.attr("class", "metrics-legend")
	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	metricsLegend.append("text")
	//.attr("x", width - 18)
	//.attr("x", 680 - 18)
	.attr("x", 680)
	//.attr("y", 9)
	.attr("y", 0)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.style("fill", metricsColors)
	.text(function(d) {

		return legendLabels[d] + ': ' + metrics[d];
	    });
    };

    $.fn.renderLineChart = function(options) {

	var options = $.extend({

		target: 'div#univariate-visualize',
		variables: [],
		
	    }, options);

	// Implementing from http://bl.ocks.org/mbostock/3884955

	/**
	 * @author griffinj
	 * The Drupal service simply returns the summation, regardless of our metrics
	 * If the metric is not simply the summation (i. e. arithmetic mean, median...), then a request must be transmitted to the QAS
	 *
	 */
	//$.post('http://qas.lafayette.edu', data, function(data) {
	if(true) {

	    var data = options.data.data;
	    var metadata = options.data.metadata;
	    var metrics = options.data.metrics;

	    // Refactor
	    delete metadata['y']['property'];

	    // Fixture
	    /*
	    data = {
		"temporal": {
		    "domain": {'Month':
			       [181501, 181502, 181503]},
		    "range": {'Titles': {
			    'titleA': [12,23,34],
			    'titleB':[45,56,67]
			}}}};
	    */
	    /*
	    data = [ {date: '181501', titleA: 12, titleB: 45 },
		     {date: '181502', titleA: 23, titleB: 56 },
		     {date: '181503', titleA: 34, titleB: 67 } ];
	    */

	    /*
	      {"data":[ 

{"domain":"18141108","values":[{"sample":"Female","value":2},{"sample":"Unknown","value":1}]},
{"domain":"18141122","values":[{"sample":"Unknown","value":2}]},
{"domain":"18141129","values":[{"sample":"Unknown","value":4}]},
{"domain":"18141203","values":[{"sample":"Unknown","value":3}]},
{"domain":"18141231","values":[{"sample":"Unknown","value":4}]},
{"domain":"18150110","values":[{"sample":"Unknown","value":2}]},
{"domain":"18150124","values":[{"sample":"Unknown","value":2}]},
{"domain":"18150207","values":[{"sample":"Unknown","value":2}]}

{"domain":"18150228","values":[{"sample":"Unknown","value":2}]},{"domain":"18130904","values":[{"sample":"Unknown","value":7}]},{"domain":"18130918","values":[{"sample":"Unknown","value":3}]},{"domain":"18130925","values":[{"sample":"Unknown","value":4}]},{"domain":"18131106","values":[{"sample":"Unknown","value":3}]},{"domain":"18131120","values":[{"sample":"Unknown","value":3}]},{"domain":"18141001","values":[{"sample":"Unknown","value":2}]},{"domain":"18141206","values":[{"sample":"Unknown","value":5}]},{"domain":"18141210","values":[{"sample":"Unknown","value":4}]},{"domain":"18141217","values":[{"sample":"Unknown","value":4}]},{"domain":"18141227","values":[{"sample":"Unknown","value":2}]},{"domain":"18150107","values":[{"sample":"Unknown","value":2}]},{"domain":"18150131","values":[{"sample":"Unknown","value":2}]},{"domain":"18150328","values":[{"sample":"Unknown","value":4}]},{"domain":"18150926","values":[{"sample":"Unknown","value":3}]},{"domain":"18110713","values":[{"sample":"Unknown","value":4}]},{"domain":"18110716","values":[{"sample":"Unknown","value":6}]},{"domain":"18110720","values":[{"sample":"Unknown","value":5}]},{"domain":"18110723","values":[{"sample":"Unknown","value":4}]},{"domain":"18110730","values":[{"sample":"Unknown","value":4}]},{"domain":"18110803","values":[{"sample":"Unknown","value":2}]},{"domain":"18110811","values":[{"sample":"Unknown","value":2}]},{"domain":"18110813","values":[{"sample":"Unknown","value":5}]},{"domain":"18110820","values":[{"sample":"Unknown","value":3}]}
],
"metadata":{
"x":{"label":"field_loan_duration","property":"domain","type":"temporal","axis":"x"},
"y":{"label":"Loans","property":"value","type":"ratio","axis":"y"}
}
}

	     */

	    /*
	    data = [
		    { domain: '18150101', values: [ { sample: 'titleA', value: 45 }, { sample: 'titleB', value: 54 } ] },
		    { domain: '18150201', values: [ { sample: 'titleA', value: 67 }, { sample: 'titleB', value: 76 } ] },
		    { domain: '18150301', values: [ { sample: 'titleA', value: 88 }, { sample: 'titleB', value: 78 } ] },
		    { domain: '18150401', values: [ { sample: 'titleC', value: 32 }, { sample: 'titleD', value: 104 } ] },
		    { domain: '18150501', values: [ { sample: 'titleC', value: 56 }, { sample: 'titleD', value: 67 } ] },
		    { domain: '18150601', values: [ { sample: 'titleC', value: 42 }, { sample: 'titleD', value: 34 } ] } ];
	    metadata = {

		x: { property: 'domain', type: 'temporal', axis: 'x', label: 'Domain' },
		y: { type: 'ratio', axis: 'y', label: 'Range' }
	    };
	    */

	    /*
	    data = [
		    { domain: 'subjectA', values: [ { sample: 'titleA', value: 45 }, { sample: 'titleB', value: 54 } ] },
		    { domain: 'subjectB', values: [ { sample: 'titleA', value: 67 }, { sample: 'titleB', value: 76 } ] },
		    { domain: 'subjectC', values: [ { sample: 'titleA', value: 88 }, { sample: 'titleB', value: 78 } ] },
		    { domain: 'subjectD', values: [ { sample: 'titleC', value: 32 }, { sample: 'titleD', value: 104 } ] },
		    { domain: 'subjectE', values: [ { sample: 'titleC', value: 56 }, { sample: 'titleD', value: 67 } ] },
		    { domain: 'subjectF', values: [ { sample: 'titleC', value: 42 }, { sample: 'titleD', value: 34 } ] } ];
	    metadata = {

		x: { property: 'domain', type: 'nominal', axis: 'x', label: 'Domain' },
		y: { type: 'ratio', axis: 'y', label: 'Range' }
	    };
	    */

	    /*
	    data = [
		    { domain: 800, values: [ { sample: 'sampleA', value: 45 }, { sample: 'sampleB', value: 54 } ] },
		    { domain: 856, values: [ { sample: 'sampleA', value: 67 }, { sample: 'sampleB', value: 76 } ] },
		    { domain: 978, values: [ { sample: 'sampleA', value: 88 }, { sample: 'sampleB', value: 78 } ] },
		    { domain: 1045, values: [ { sample: 'sampleC', value: 32 }, { sample: 'sampleD', value: 104 } ] },
		    { domain: 1123, values: [ { sample: 'sampleC', value: 56 }, { sample: 'sampleD', value: 67 } ] },
		    { domain: 1345, values: [ { sample: 'sampleC', value: 42 }, { sample: 'sampleD', value: 34 } ] } ];
	    metadata = {

		x: { property: 'domain', type: 'ratio', axis: 'x', label: 'Domain' },
		y: { type: 'ratio', axis: 'y', label: 'Range' }
	    };
	    */

	    var margin = {top: 20, right: 80, bottom: 30, left: 50};

	    var width = 680 - margin.left - margin.right;

	    if(data.length - 9 > 0) {
	    
		if(data[0].domain.length > 8) {
		    
		    width = width + (data.length - 9) * 128;
		} else {

		    width = width + (data.length - 9) * 32;
		}

		// Refactor
		$(options.target).css('overflow-x', 'scroll');
	    }

	    height = 500 - margin.top - margin.bottom;

	    var parseDate = d3.time.format("%Y%m%d").parse;

	    var x = d3.time.scale()
		.range([0, width]);

	    var y = d3.scale.linear()
		.range([height, 0]);

	    var color = d3.scale.category10();

	    var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	    var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	    var line = d3.svg.line()
		.interpolate("bundle")
		.x(function(d) { return x(d.domain); })
		.y(function(d) { return y(d.value); });

	    // Refactor
	    $(options.yAxis).empty();
	    $(options.target).empty();
	    $(options.target).css('overflow-x', 'none');

	    var svg = d3.select(options.target).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	    // Generate a set of points from the data set
	    // Refactor
	    data.forEach(function(d) {

		    d.values.forEach(function(value) {

			    //value.domain = d.domain;
			    d[value.sample] = value.value;
			});

		    delete d.values;
		});

	    // The data set must be sorted!
	    data.sort(function(u, v) {

		    return u.domain > v.domain ? 1 : (u.domain < v.domain ? -1 : 0);
		});

	    sampleGroups = data.map(function(d) {

		    return d3.keys(d).filter(function(key) {

			    return key != 'domain';
			})
			}).reduce(function(v, u) {
				
				return v.concat(u);
			    });

	    // Unique: https://github.com/mbostock/d3/pull/1138
	    sampleGroups = d3.scale.ordinal().domain(sampleGroups).domain();

	    // Map all properties (save for the domain element) to the color domain
	    /*
	    color.domain(d3.keys(data[0]).filter(function(key) {
			
			return key !== 'domain';
		    }));
	    */
	    color.domain(sampleGroups);

	    /*
	    // Parse the date values for each of the 'date' properties
	    data.forEach(function(d) {

		    d.date = parseDate(d.date);
		});

	    // Retrieve the names of the individual samples, and structure an Object with multiple values mapped to a unique sample key
	    var samples = color.domain().map(function(sample) {

		    return {
			sample: sample,
			values: data.map(function(d) {
				
				return {date: d.date, value: +d[sample]};
			    })
		    };
		});

	    //d3.extent(d3.values(data1.temporal.domain['Date']));
	    //d3.extent(d3.values(data1.temporal.range['Titles (AM)']).reduce(function(v,u) { return v.concat(u) } ))

	    // Restrict the domain to the minimum and maximum dates
	    x.domain(d3.extent(data, function(d) {

			return d.date; }
		    ));

	    // Restrict the range to the minimum and maximum sample values
	    y.domain([
		      d3.min(samples, function(d) {

			      return d3.min(d.values, function(v) {

				      return v.value;
				  });
			  }),
		      d3.max(samples, function(d) {

			      return d3.max(d.values, function(v) {

				      return v.value;
				  });
			  })
		      ]);
	    */

	    // Retrieve the names of the individual samples, and structure an Object with multiple values mapped to a unique sample key
	    /*
	    var domains = color.domain().map(function(sample) {

		    return {
			sample: sample,
			values: data.map(function(d) {

				return {domain: d.domain, value: +d[sample]};
			    }).filter(function(d) { return d; });
		    };
		});
	    */

	    // Refactor
	    if(metadata.x.type == 'temporal') {

		// Parse the data for temporal data
		data.forEach(function(d) {
		    
			// Parse the date
			d.domain = parseDate(d.domain);
		    });
	    }

	    var samples = color.domain().map(function(sample) {

		    return {
			sample: sample,
			values: data.map(function(d) {
				
				if(d[sample]) {

				    return {domain: d.domain, value: +d[sample]};
				}
			    }).filter(function(d) { return d })
		    };
		});

	    scales = {};
	    axes = {};
	    isTemporal = false;

	    d3.entries(metadata).map(function(d) {
		    
		    return d.value;
		}).forEach(function(md) {

			if(md.type == 'temporal') {

			    isTemporal = true;

			    scales[md.axis] = d3.time.scale().range([ md.axis == 'x' ? 0 : height,
								      md.axis == 'y' ? 0 : width ]);
			    dateValues = d3.extent(data, function(d) {
				
				    return d.domain;
				});
			    
			    scales[md.axis].domain(d3.extent([parseDate(options.minDate)].concat(dateValues).concat(parseDate(options.maxDate))));
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
			    /*
			      scales[md.axis] = d3.scale.linear().domain(d3.extent(data, function(d) {
			
					return d[md.property]; }
				    )).nice().range([ md.axis == 'x' ? 0 : height,
						      md.axis == 'y' ? 0 : width ]);
			    */
			    
			    values = data.map(function(d) {

				    return d3.entries(d)
				}).reduce(function(v, u) { return v.concat(u) });

			    // For the x-axis...
			    if(md.property) {

				values = values.filter(function(d) { return d.key == md.property });
			    } else {

				values = values.filter(function(d) { return d.key != metadata.x.property });
			    }
			    
			    scales[md.axis] = d3.scale.linear().domain(d3.extent(values.map(function(d) {

					    return d.value }))).nice().range([ md.axis == 'x' ? 0 : height,
									       md.axis == 'y' ? 0 : width ]);

			}

		    });

	    var x = scales['x'];

	    var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	    if(isTemporal) {

		xAxis.tickPadding(5)
		    .tickFormat(d3.time.format("%Y-%m-%d"));
		//xAxis.tickPadding(5);
	    }

	    var y = scales['y'];

	    var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

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

	    var yAxisElement = d3.select(options.yAxis).append("svg")
		.attr("width", 64 + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	    //svg.append("g")
	    yAxisElement.append('g')
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text(metadata.y.label);

	    var sample = svg.selectAll(".sample")
		.data(samples)
		.enter().append("g")
		.attr("class", "sample");

	    sample.append("path")
		.attr("class", "line")
		.attr('class', function(d) {

			return 'sample-' + d.sample;
		    })
		.attr("d", function(d) {

			return line(d.values);
		    })
		.style("fill", 'none')
		.style("stroke", function(d) {

			return color(d.sample);
		    });

	    sample.append("text")
		.datum(function(d) {

			return {
			    sample: d.sample,
			    value: d.values[d.values.length - 1]
				};
		    })
		.attr("transform", function(d) {

			// Restructure
			return "translate(" + x(d.value.domain) + "," + y(d.value.value) + ")";
		    })
		.attr("x", 3)
		.attr("dy", ".35em")
		.text(function(d) { return d.sample; });

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

	    /*
	var nodeLegend = vis.selectAll(".nodeLegend")
	.data(nodeColors.domain())
	.enter().append("g")
	.attr("class", "nodeLegend")
	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
	    
	nodeLegend.append("rect")
	.attr("x", width - 18)
	.attr("width", 18)
	.attr("height", 18)
	.style("fill", nodeColors);
	    
	nodeLegend.append("text")
	.attr("x", width - 24)
	.attr("y", 9)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d) {

		return legendLabels[d];
	    });

	    */

	    $(this).renderSampleLegend(options.sampleLegend, sampleGroups, margin, color);
	    //$(this).updateMetricsLegend(options.metricsLegend, metrics[sampleGroups[0]], legendLabels, margin, 0);
	    //$(this).updateMetricsLegend(options.sampleLegend, metrics[sampleGroups[0]], legendLabels, margin, 0);

	    // For highlighting lines
	    //$('path.line').click(function(e) {
	    $('.legend-key')
		/*
		.click(function(e) {

			$(this).updateMetricsLegend(options.metricsLegend, metrics[$(this).attr('id')], legendLabels, margin, 0);
		    })
		*/
		.hover(function(e) {

			$('path.sample-' + $(this).attr('id')).css('stroke-width', '4');

			//$(options.metricsLegend).addClass('legend-metrics-highlighted');

			$(this).updateMetricsLegend(options.metricsLegend, metrics[$(this).attr('id')], legendLabels, margin, 0);
		    },
		    function(e) {

			$(options.metricsLegend).empty();
			//$(options.metricsLegend).removeClass('legend-metrics-highlighted');
			$('path.sample-' + $(this).attr('id')).css('stroke-width', '1');
		    });
	}
    };


}(jQuery));