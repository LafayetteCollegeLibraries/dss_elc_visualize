
/**
 * Widget for visualizing quantitative, bivariate relationships using a bar chart
 * @author griffinj@lafayette.edu
 *
 */

(function($, Drupal) {
    Drupal.behaviors.dssElcVisualizeBivariate = {

	attach: function(context, settings) {

	    // Ensure that this handler is only bound to visible elements, and, is only called once
	    $('#dss-elc-visualize-bivariate-form .btn[type="submit"]:visible').bivariateInit().off('click').click(function(event) {

		    event.preventDefault();

		    $fieldSelect = $('form#dss-elc-visualize-bivariate-form').find('select#edit-field');
		    if(!$fieldSelect.length) {

			$fieldSelect = $('div#bundle-fields-div div div select.form-select');
		    }

		    var data = $('form#dss-elc-visualize-bivariate-form').serializeArray();

		    // Work-around due to problems arising from Drupal's Form API stripping certain element attributes from form fields
		    // (i. e. <select> has @name removed from dropdown fields after selecting different Node types for analysis)
		    // Please see EDDC-395
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
