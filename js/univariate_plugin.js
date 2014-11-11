/**
 * @author griffinj@lafayette.edu
 * Easton Library Company Project
 * A jQuery plug-in for the rendering of univariate analyses
 *
 */

(function($) {

    $.fn.univariateInit = function(options) {

	/**
	 * These settings can be unique to univariate analyses
	 *
	 */
	var settings = $.extend({

		target: 'div#univariate-visualize',
		yAxis: 'div#univariate-visualize-axis-y',
		sampleLegend: 'div#univariate-visualize-legend-samples',
		maxDomainGroups: 5,
	    }, options);

	return this.each(function(i, element) {

		// Bind a new qAnalysis Object to the element
		$(element).data('elc', { univariate: $(element).qAnalysisFactory(settings) });
	    });
    };
			
    $.fn.univariateRender = function(options) {

	var settings = $.extend({
		
		chart: 'pie',

		width: 820,
		height: 640,

		xAxisLabel: 'Domain',
		yAxisLabel: 'Range'

	    }, options);

	if(settings.chart == 'bar') {

	    return nv.addGraph(function() {

		    settings.height -= 40;
		    
		    var chart = nv.models.multiBarChart()
		    .transitionDuration(350)
		    .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
		    //.rotateLabels(-90)      //Angle to rotate x-axis labels.
		    .rotateLabels(-35)
		    .showControls(false)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
		    .groupSpacing(0.1)    //Distance between each group of bars.
		    .tooltips(false)
		    .width(settings.width)
		    .height(settings.height);

		    chart.xAxis
		    //.axisLabel(settings.xAxisLabel)
		    .tickFormat(function(d){

			    return settings.data.labels[d];
			});

		
		    chart.yAxis
		    .axisLabel(settings.yAxisLabel)
		    .tickFormat(d3.format(',.1f'));

		    d3.select('#univariate-visualize')
		    .append('svg')
		    .attr('width', settings.width + 'px')
		    .attr('height', settings.height + 'px')
		    .datum(settings.data.samples)
		    .call(chart);

		    nv.utils.windowResize(chart.update);

		    return chart;
		});
	
	} else {

	    nv.addGraph(function() {

		    var chart = nv.models.pieChart()
		    .x(function(d) { return d.label })
		    .y(function(d) { return d.value })
		    .showLabels(true)     //Display pie labels
		    .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
		    .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
		    .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
		    .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
		    .tooltips(false)
		    .width(settings.width)
		    .height(settings.height)
		    ;

		    d3.select('#univariate-visualize')
		    .append('svg')
		    .attr('width', settings.width + 'px')
		    .attr('height', settings.height + 'px')
		    .datum(settings.data.samples)
		    .transition().duration(350)
		    .call(chart);
		});
	}

	/*
	return this.each(function(i, element) {

		// If the qAnalysis Object has been bound to the element...
		if($(element).data('elc')) {

		    // ...render the visualization.
		    $(element).data('elc').univariate.render(options);
		}

	    });
	*/
    };
}(jQuery));
