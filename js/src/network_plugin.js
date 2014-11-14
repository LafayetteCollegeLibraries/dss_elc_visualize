/**
 * @author griffinj@lafayette.edu
 * Easton Library Company Project
 * A jQuery plug-in for the rendering of network analyses
 *
 */



(function($) {

    $.fn.render = function(options) {

	$(this).data('elcNetwork').render(options);
    };

    /**
     * The plugin for the network analysis instance
     *
     */
    $.fn.elcNetworkMetrics = function(options) {

	/*
	// This is the easiest way to have default options.
	var settings = $.extend({

		target: 'div#network-visualize',
	    }, options);
	*/

	return this.each(function() {
	
		return $(this).data('elcNetwork', new NetworkAnalysis(this, options));
	    });
    };
}(jQuery));
