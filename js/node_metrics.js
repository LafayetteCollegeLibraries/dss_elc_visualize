/**
 * Widget for visualizing quantitative relationships using a bar chart
 * @author griffinj@lafayette.edu
 */
(function($, Drupal) {
    Drupal.behaviors.dssElcVisualizeNodeMetrics = {

	attach: function(context, settings) {

	    $button = $('form#dss-elc-visualize-node-metrics-form').find('button');
	    $button.elcDrupalNodeMetrics();
	    //$fieldSelect = $('form#dss-elc-visualize-node-metrics-form').find('select#edit-field');

	    //$fieldSelect.click(function(event) {
	    //$('form#dss-elc-visualize-node-metrics-form').find('select#edit-bundle').click(function(event) {
	    $button.click(function(event) {

		    console.log('trace');
		    
		    /*
		    $('form#dss-elc-visualize-node-metrics-form').find('select#edit-field').load(function() {

			    console.log('trace2');
			});
		    */

		    //$('div#bundle-fields-div div div select.form-select').live('click', function(event) {

		    event.preventDefault();

		    //url = '/metrics/' + $('form#dss-elc-visualize-node-metrics-form').find('select#edit-bundle').val() + '/' + $fieldSelect.val();

		    $fieldSelect = $('form#dss-elc-visualize-node-metrics-form').find('select#edit-field');
		    if(!$fieldSelect.length) {

			//$fieldSelect = $('form#dss-elc-visualize-node-metrics-form').find('select#edit-field');
			$fieldSelect = $('div#bundle-fields-div div div select.form-select');
		    }

		    url = '/metrics/' + $('form#dss-elc-visualize-node-metrics-form').find('select#edit-bundle').val() + '/' + $fieldSelect.val();

		    $.get(url, function(data, textStatus) {
			
			    $button.render({data: data});
			});
		});
	    //});
	}
    }
})(jQuery, Drupal);