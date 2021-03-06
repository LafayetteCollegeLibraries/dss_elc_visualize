/**
 * Widget for visualizing quantitative, univariate relationships using a bar chart
 * @author griffinj@lafayette.edu
 *
 */

// JSHint
var Drupal = Drupal || {};

(function($, Drupal) {

    'use strict';

    Drupal.behaviors.dssElcVisualizeUnivariate = {

	attach: function(context, settings) {

	    // Ensure that this handler is only bound to visible elements, and, is only called once
	    $('#dss-elc-visualize-univariate-form .btn[type="submit"]:visible').univariateInit().off('click').click(function(event) {

		    event.preventDefault();

		    // Empty the container element
		    // Render the AJAX loading animation
		    $('#univariate-visualize')
		    .empty()
		    .toggleClass('visualize-loading');

		    var data = $('form#dss-elc-visualize-univariate-form').serializeArray();

		    // Work-around due to problems arising from Drupal's Form API stripping certain element attributes from form fields
		    // (i. e. <select> has @name removed from dropdown fields after selecting different Node types for analysis)
		    // Please see EDDC-395
		    ['field'].map(function(fieldName, i) {

			    var hasField = false;
			    
			    for(var i in data) {
				
				if(data[i].name == fieldName) {
				    
				    hasField = true;
				}
			    }
			    
			    if(!hasField) {
				
				var $field = $('#bundle-' + fieldName.replace('field', 'fields').replace('_', '-') + '-div select');
				data = data.concat({ name: fieldName, value: $field.val() });
			    }
			});
		    
		    /*
		      $fieldSelect = $('form#dss-elc-visualize-univariate-form').find('select#edit-field');
		      if(!$fieldSelect.length) {
		      
		      $fieldSelect = $('div#bundle-fields-div div div select.form-select');
		      }
		      
		      /**
		      * Work-around for missing form fields during the serialization
		      * @todo Refactor/restructure in order to ensure that the proper form values are submitted to the AJAX endpoint
		      * /
		      var formValues = $('form#dss-elc-visualize-univariate-form').serializeArray();
		      if(!formValues.filter(function(i,e) { return i.name == 'field' }).length) {
		      
		      formValues = formValues.concat({name: 'field', value: jQuery('#bundle-fields-div select').val()});
		      }
		    */
		    
		    /*
		    //var response = {"samples":[{"key":"Items","values":[{"x":0,"y":951},{"x":1,"y":33},{"x":2,"y":16}]}],"labels":["Book","Unknown","Periodical"]};
		    //var response = {"samples":[{"label":"Book","value":951},{"label":"Unknown","value":33},{"label":"Periodical","value":16}],"labels":[]};
		    
		    $(this).univariateRender({
		    
		    chart: $('#edit-chart').val(),
		    data: response });
		    */
		    
		    $.post('/dss_elc_metrics/univariate', data, function(response, textStatus) {
			    
			    // Remove the AJAX loading animation
			    $('#univariate-visualize').toggleClass('visualize-loading');
			    
			    // Refactor into a dssElcMetrics plug-in
			    $(this).univariateRender({
				    
				    chart: $('#edit-chart').val(),
					data: response});
			});
		});
	    
	    //$('#dss-elc-visualize-univariate-form .btn[type="submit"]:visible').click();
	}
    };
})(jQuery, Drupal);
