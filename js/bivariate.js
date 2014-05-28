
/**
 * Widget for visualizing quantitative, bivariate relationships using a bar chart
 * @author griffinj@lafayette.edu
 *
 */

(function($, Drupal) {
    Drupal.behaviors.dssElcVisualizeBivariate = {

	attach: function(context, settings) {

	    $bivariateButton = $('form#dss-elc-visualize-bivariate-form').find('button');
	    $bivariateButton.bivariateInit();
	    $bivariateButton.click(function(event) {

		    event.preventDefault();

		    $fieldSelect = $('form#dss-elc-visualize-bivariate-form').find('select#edit-field');
		    if(!$fieldSelect.length) {

			$fieldSelect = $('div#bundle-fields-div div div select.form-select');
		    }

		    $.post('/bivariate', $('form#dss-elc-visualize-bivariate-form').serialize(), function(data, textStatus) {

			    // Refactor
			    $bivariateButton.bivariateRender({data: data});
			});
		});
	}
    }
})(jQuery, Drupal);
