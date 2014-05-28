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

	    $networkMetricsButton.click(function(event) {

		    event.preventDefault();

		    $fieldSelect = $('form#dss-elc-visualize-network-form').find('select#edit-field');
		    if(!$fieldSelect.length) {

			$fieldSelect = $('div#bundle-fields-div div div select.form-select');
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
