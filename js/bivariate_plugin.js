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

	var settings = $.extend({
		
		chart: 'bar',

		width: 820,
		height: 640,

		xAxisLabel: 'Domain',
		yAxisLabel: 'Range'

	    }, options);
	
	if(settings.chart == 'line') {

	    nv.addGraph(function() {

		    settings.height -= 60;
		    
		    var chart = nv.models.lineChart()
		    .margin({left: 100, bottom: 120})  //Adjust chart margins to give the x-axis some breathing room.
		    .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
		    .transitionDuration(350)  //how fast do you want the lines to transition?
		    //.rotateLabels(-35)
		    .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
		    .showYAxis(true)        //Show the y-axis
		    .showXAxis(true)        //Show the x-axis
		    
		    .tooltips(true)
		    .isArea(false)

		    .width(settings.width)
		    .height(settings.height);
		    
		    chart.xAxis
			//.axisLabel(settings.xAxisLabel)
			.tickFormat(function(d){

			    return settings.data.labels[d];
			});

		    
		    chart.yAxis
		    //.axisLabel(settings.yAxisLabel)
		    .tickFormat(d3.format(',.1f'));

		    // Could not remove line paths
		    // Set the area to none
		    /* chart.lines.isArea(function(d) {

			return true;
			});
			    return false;
		   }); */

		    d3.select('#bivariate-visualize')
			.append('svg')
			.attr('width', settings.width + 'px')
			.attr('height', settings.height + 'px')
			.datum(settings.data.samples)
			.call(chart);

		    nv.utils.windowResize(chart.update);

		    // Work-around for rotating the X-axis labels
		    d3.select('body')
			.selectAll('.nv-x.nv-axis > g')
			.selectAll('g')
			.selectAll('text')
			//.attr('transform', function(d) { return 'translate (-13, 15) rotate(-35 0,0)' });
		        .attr('transform', function(d, i, e) {

				/*
				// Magical constants
				//! @todo Refactor
				var translateX = 0 - d.length * (6.0 / 2.2);
				var translateY = d.length * (4.0 / 2.2);
				return 'translate (' + translateX + ', ' + translateY + ') rotate(-35 0,0)';
				*/

				return 'translate (-60, 40) rotate(-35 0,0)';
			    });
			//.attr('transform', function(d) { return 'rotate(-35 0,0)' });

		    return chart;
		});

	} else {

	    return nv.addGraph(function() {

		    settings.height -= 40;
		    
		    var chart = nv.models.multiBarChart()
		    .transitionDuration(350)
		    .reduceXTicks(false)   //If 'false', every single x-axis tick label will be rendered.
		    //.rotateLabels(-90)      //Angle to rotate x-axis labels.
		    .rotateLabels(-35)
		    .showControls(false)
		    .groupSpacing(0.1)    //Distance between each group of bars.
		    .width(settings.width)

 		    .showLegend(true)
		    .margin({bottom: 120})
		    .tooltips(false)

		    .height(settings.height);

		    chart.xAxis
		    //.axisLabel(settings.xAxisLabel)
		    .tickFormat(function(d){

			    return settings.data.labels[d];
			});

		
		    chart.yAxis
		    .axisLabel(settings.yAxisLabel)
		    .tickFormat(d3.format(',.1f'));


		    d3.select('#bivariate-visualize')
		    .append('svg')
		    .attr('width', settings.width + 'px')
		    .attr('height', settings.height + 'px')
		    .datum(settings.data.samples)
		    .call(chart);

		    nv.utils.windowResize(chart.update);

		    return chart;
		});
	}

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
