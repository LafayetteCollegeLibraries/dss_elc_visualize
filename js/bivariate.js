
/**
 * Widget for visualizing quantitative, bivariate relationships using a bar chart
 * @author griffinj@lafayette.edu
 *
 */

(function($, Drupal) {
    Drupal.behaviors.dssElcVisualizeBivariate = {

	attach: function(context, settings) {

	    /*
	    $bivariateButton = $('form#dss-elc-visualize-bivariate-form').find('button');
	    $bivariateButton.bivariateInit();
	    $bivariateButton.click(function(event) {
	    */

	    //$('#dss-elc-visualize-bivariate-form .btn').once('[type="submit"]:visible').bivariateInit().click(function(event) {
	    $('#dss-elc-visualize-bivariate-form .btn[type="submit"]:visible').bivariateInit().click(function(event) {

		    event.preventDefault();

		    $fieldSelect = $('form#dss-elc-visualize-bivariate-form').find('select#edit-field');
		    if(!$fieldSelect.length) {

			$fieldSelect = $('div#bundle-fields-div div div select.form-select');
		    }

		    var data = $('form#dss-elc-visualize-bivariate-form').serializeArray();

		    ['field_u' , 'field_v'].map(function(fieldName, i) {

			    var hasField = false;

			    for(var i in data) {

				if(data[i][name] == fieldName) {

				    hasField = true;
				}
			    }

			    if(!hasField) {

				var $field = $('#bundle-' + fieldName.replace('field', 'fields').replace('_', '-') + '-div select');
				data = data.concat({ name: fieldName, value: $field.val() });
			    }
			});

		    $.post('/bivariate', data, function(response, textStatus) {

			    // Refactor
			    $.bivariateRender({data: response});
			});
		});
	}
    }
})(jQuery, Drupal);
