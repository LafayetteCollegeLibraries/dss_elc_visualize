/**
 * @author griffinj@lafayette.edu
 * Easton Library Company Project
 * The base class for all quantitative analyses
 *
 */

(function($) {

    $.fn.qAnalysisFactory = function(options) {

	function qAnalysis(options) {

	    this.element = $(this);
	    this.options = options;
	};

	qAnalysis.prototype.render = function(options) {

	    element = this.element;

	    if(options) {

		this.options = $.extend(this.options, options);
	    }

	    if(options.data.metadata.x.type != 'nominal') {
	    /*
	    // If the domain is not a nominal scale and if the grouped bar chart is not forced...
	    if(!this.options.renderBars &&
	       options.data.metadata.x.type == 'nominal') {
	    */
		
		// ...and if the rendering of the multiple line chart is not forced...
		if(this.options.renderLines) {
		
		    $(element).renderLineChart(this.options);
		} else {
		    
		    $(element).renderScatterplot(this.options);
		}
	    } else {
	    
		$(element).renderGroupedBarChart(this.options);
	    }
	}

	return new qAnalysis(options);
    };

})(jQuery);