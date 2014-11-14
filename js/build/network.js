/**
 * Widget for visualizing networks of relationships using the D3 forced, acyclic graph widget implementation
 * @author griffinj@lafayette.edu
 *
 */
(function($, Drupal) {
    Drupal.behaviors.dssElcVisualizeNetwork = {

	attach: function(context, settings) {

	    $networkMetricsButton = $('form#dss-elc-visualize-network-form').find('button');
	    $networkMetricsButton.elcNetworkMetrics();

	    /**
	     * Overriding the hidden <input> element field values for form submissions
	     * @todo Refactor
	     */
	    $('#edit-limit-container').on("slide", function(event, ui) {

		    //console.log(ui);
		});

	    /**
	     * Depending upon the bundle selected for the relationship, modifying the slider widget
	     */
	    var sliderHandler = function(e) {

		var legendMin, legendMax;
		var min = $('#edit-limit-container').slider("option", "min");
		var max = $('#edit-limit-container').slider("option", "max");

		/** @todo Refactor, magic numbers */
		if($('#edit-bundle').val() == 'loan') {

		    // -3313422000
		    min = -5017575600000;
		    //max = -3313422000000;
		    max = -103544437500 * 32;
		    legendMin = new Date(min).getFullYear();
		    legendMax = new Date(max).getFullYear();
		} else {

		    if(min < 1000) {

			min = 1;
			//max = max / -103544437500;
			max = 32;
		    }

		    legendMin = min;
		    legendMax = max;
		}
		
		if($('#edit-limit-container').length == 0) {

		    /*
		    $('#edit-limit-value').val(min);
		    $('#edit-limit-value2').val(max);
		    */
		} else {

		    $('#edit-limit-container').slider("option", "min", min).slider("option", "max", max).slider('values', [min, max]);
		}
		$('.ui-slider-legend-min').text(legendMin);
		$('.ui-slider-legend-max').text(legendMax);
	    };

	    //$('#edit-bundle').change(sliderHandler);
	    //sliderHandler();

	    $networkMetricsButton.click(function(event) {

		    /**
		     * @todo Refactor with once()
		     */
		    event.stopImmediatePropagation();
		    event.preventDefault();

		    $fieldSelect = $('form#dss-elc-visualize-network-form').find('select#edit-field');
		    if(!$fieldSelect.length) {

			$fieldSelect = $('div#bundle-fields-div div div select.form-select');
		    }

		    /**
		     * Overriding the hidden <input> element field values for form submissions
		     * @todo Refactor
		     */
		    if($('#edit-bundle').val() == 'loan' && $('#edit-limit-value').val() > 0) {

			min = -5017575600 + (53254800 * $('#edit-limit-value').val() - 1);
			max = -5017575600 + (53254800 * $('#edit-limit-value2').val() - 1);
			$('#edit-limit-value').val(min);
			$('#edit-limit-value2').val(max);
		    }
		    
		    $.post('/network', $('form#dss-elc-visualize-network-form').serialize(), function(data, textStatus) {
			
			    // Refactor
			    $networkMetricsButton.renderNetwork({data: data});
			});
		});

	    //$('input.sliderfield-processed').hide();

	    // .ui-slider-handle
	    $('.ui-slider-handle').click(function(e) {

		    displayValues = '.sliderfield-display-values-field';
		    $(displayValues).text($(displayValues).text().split(/\s\-\s/).map(function(d) {
				      
				return new Date(d * 259200000 + -5005047600000);
			    }).reduce(function(v, u) {
					  
				    pad = function(n) { return n<10 ? '0'+n : n };
				    
				    return (v.getUTCFullYear() + '-' + pad(v.getUTCMonth() + 1) + '-' + pad(v.getUTCDate())) + ' - ' +
					(u.getUTCFullYear() + '-' + pad(u.getUTCMonth() + 1) + '-' + pad(u.getUTCDate()));
				}));
		});
	}
    }
})(jQuery, Drupal);
