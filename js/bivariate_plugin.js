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

	return this.each(function(i, element) {

		// If the qAnalysis Object has been bound to the element...
		if($(element).data('elc')) {

		    // ...render the visualization.
		    $(element).data('elc').bivariate.render(options);
		}
	    });
    };
}(jQuery));
