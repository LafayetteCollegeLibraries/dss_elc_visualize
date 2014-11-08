
/**
 * Widget for visualizing quantitative, univariate relationships using a bar chart
 * @author griffinj@lafayette.edu
 *
 */

(function($, Drupal) {

    Drupal.behaviors.dssElcVisualizeUnivariate = {

	attach: function(context, settings) {

	    // Ensure that this handler is only bound to visible elements, and, is only called once
	    $('#dss-elc-visualize-univariate-form .btn[type="submit"]:visible').univariateInit().off('click').click(function(event) {

			event.preventDefault();

			var data = $('form#dss-elc-visualize-univariate-form').serializeArray();

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
				
				// Refactor into a dssElcMetrics plug-in
				$(this).univariateRender({

					chart: $('#edit-chart').val(),
					data: response});
			    });
		});

	    $('#dss-elc-visualize-univariate-form .btn[type="submit"]:visible').click();
	}
    };
})(jQuery, Drupal);
