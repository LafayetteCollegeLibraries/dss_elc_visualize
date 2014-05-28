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
		maxDomainGroups: 5,
	    }, options);

	return this.each(function(i, element) {

		// Bind a new qAnalysis Object to the element
		$(element).data('elc', { univariate: $(element).qAnalysisFactory(settings) });
	    });
    };
			
    $.fn.univariateRender = function(options) {

	return this.each(function(i, element) {

		// If the qAnalysis Object has been bound to the element...
		if($(element).data('elc')) {

		    // ...render the visualization.
		    $(element).data('elc').univariate.render(options);
		}

	    });
    };
}(jQuery));
