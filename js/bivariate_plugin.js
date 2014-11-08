/**
 * @author griffinj@lafayette.edu
 * Easton Library Company Project
 * A jQuery plug-in for the rendering of bivariate analyses
 *
 */

(function($) {

    $.fn.bivariateInit = function(options) {

	/**
	 * These settings can be unique to bivariate analyses
	 *
	 */

	var settings = $.extend({

		target: 'div#bivariate-visualize',
		yAxis: 'div#bivariate-visualize-axis-y',
		sampleLegend: 'div#bivariate-visualize-legend-samples',
		metricsLegend: 'div#bivariate-visualize-legend-metrics',
		maxDomainGroups: 5,
		renderBars: false,
		renderLines: true,
		minDate: '18141201',
		maxDate: '18160101'
	    }, options);

	return this.each(function(i, element) {

		// Bind a new qAnalysis Object to the element
		$(this).data('elc', { bivariate: $(this).qAnalysisFactory(settings) });

		return this;
	    });
    };
			
    $.fn.bivariateRender = function(options) {

	return nv.addGraph(function() {

		var chart = nv.models.multiBarChart()
		.transitionDuration(350)
		.reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
		.rotateLabels(0)      //Angle to rotate x-axis labels.
		.showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
		.groupSpacing(0.1)    //Distance between each group of bars.
		.width(820)
		.height(640);

		/*
		chart.xAxis
		.tickFormat(d3.format(',f'));
		*/
		chart.xAxis.tickFormat(function(d){

			return options.data.labels[d];
		    });
		
		chart.yAxis
		.tickFormat(d3.format(',.1f'));

		d3.select('#bivariate-visualize')
		.append('svg')
		.attr('width', '820px')
		.attr('height', '640px')
		.datum(options.data.samples)
		.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	    });

	/*
	return this.each(function(i, element) {

		// If the qAnalysis Object has been bound to the element...
		if($(element).data('elc')) {

		    // ...render the visualization.
		    $(element).data('elc').bivariate.render(options);
		}
	    });
	*/
    };
}(jQuery));
