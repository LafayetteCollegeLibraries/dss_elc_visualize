
/**
 * Widget for visualizing quantitative, univariate relationships using a bar chart
 * @author griffinj@lafayette.edu
 *
 */

(function($, Drupal) {

    Drupal.behaviors.dssElcVisualizeUnivariate = {

	attach: function(context, settings) {

	    $univariateButton = $('form#dss-elc-visualize-univariate-form').find('button');
	    $univariateButton.univariateInit();
	    $univariateButton.click(function(event) {

		    event.preventDefault();

		    $fieldSelect = $('form#dss-elc-visualize-univariate-form').find('select#edit-field');
		    if(!$fieldSelect.length) {

			$fieldSelect = $('div#bundle-fields-div div div select.form-select');
		    }

		    $.post('/metrics/univariate', $('form#dss-elc-visualize-univariate-form').serialize(), function(data, textStatus) {
		    //if(true) {
			
			// Refactor into a dssElcMetrics plug-in
			$univariateButton.univariateRender({data: data});

			/*
			// Fixture
			data = {
			    data : [

				    { domain: 'subjectA', values: [ { sample: 'male', value: 45 }] },
				    { domain: 'subjectB', values: [ { sample: 'male', value: 67 }] },
				    { domain: 'subjectC', values: [ { sample: 'male', value: 88 }] } ],

			    metadata: [				       

			{ label: 'domain', type: 'temporal', axis: 'x' },
			{ label: 'value', type: 'ratio', axis: 'y' } ]
			};
			
			// Refactor
			//$univariateButton.dss.elc.metrics.render({data: data});
			$univariateButton.univariateRender({data: data});
			*/

			//}
			});
		});
	}
    };
})(jQuery, Drupal);
