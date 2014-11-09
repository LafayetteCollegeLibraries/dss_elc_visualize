
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

		    // Empty the container element
		    // Render the AJAX loading animation
		    $('#bivariate-visualize')
		    .empty()
		    .toggleClass('visualize-loading');

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

				if(data[i].name == fieldName) {

				    hasField = true;
				}
			    }

			    if(!hasField) {

				var $field = $('#bundle-' + fieldName.replace('field', 'fields').replace('_', '-') + '-div select');
				data = data.concat({ name: fieldName, value: $field.val() });
			    }
			});

		    //var response = {"samples":[{"key":"Book","values":[{"x":0,"y":152},{"x":1,"y":66},{"x":2,"y":60},{"x":3,"y":59},{"x":4,"y":59},{"x":5,"y":56},{"x":6,"y":55},{"x":7,"y":53},{"x":8,"y":49},{"x":9,"y":49}]},{"key":"Unknown","values":[{"x":10,"y":7},{"x":11,"y":4},{"x":12,"y":3},{"x":13,"y":3},{"x":14,"y":3},{"x":15,"y":2},{"x":16,"y":2},{"x":17,"y":2},{"x":18,"y":2},{"x":19,"y":1}]},{"key":"Periodical","values":[{"x":20,"y":5},{"x":21,"y":4},{"x":22,"y":3},{"x":23,"y":2},{"x":24,"y":2}]}],"labels":["Unknown","Wagener, Jacob","Michler, Peter S.","Hunt, Elijah P.","Wolf, George","Weygandt, Jacob Junior","Shoemaker, John","Miller, John","Swift, Joseph K.","Tindall, Ralph","Unknown","Tindall, Ralph","Sinton, James","Swift, Joseph K.","Lerch, George","Wagener, Jacob","Michler, Peter S.","Michler, Nathaniel","Wagener, David D.","Depew, Samuel","Sinton, James","Unknown","Swift, Joseph K.","Michler, Peter S.","Shoemaker, John"]};

		    /*

		    var response = {"samples":[

		    {"key":"Book","values":[

		    {"x":0,"y":152},
		    {"x":1,"y":66},
		    {"x":2,"y":60},
		    {"x":3,"y":59}
					    ]},
		    {"key":"Unknown","values":[

		    {"x":10,"y":7},
		    {"x":11,"y":4},
		    {"x":12,"y":3},
		    {"x":13,"y":3},

					       ]},
		    {"key":"Periodical","values":[

		    {"x":20,"y":5},
		    {"x":21,"y":4},
		    {"x":22,"y":3},
		    {"x":23,"y":2},
						  ]}
					       ],
				    "labels":["Unknown","Wagener, Jacob","Michler, Peter S.","Hunt, Elijah P.","Wolf, George","Weygandt, Jacob Junior","Shoemaker, John","Miller, John","Swift, Joseph K.","Tindall, Ralph","Unknown","Tindall, Ralph","Sinton, James","Swift, Joseph K.","Lerch, George","Wagener, Jacob","Michler, Peter S.","Michler, Nathaniel","Wagener, David D.","Depew, Samuel","Sinton, James","Unknown","Swift, Joseph K.","Michler, Peter S.","Shoemaker, John"]};

		    $(this).bivariateRender({

			    chart: $('#edit-chart').val(),
			    data: response });
		    */

		    $.post('/bivariate', data, function(response, textStatus) {

			    // Remove the AJAX loading animation
			    $('#bivariate-visualize').toggleClass('visualize-loading');

			    // Refactor
			    $(this).bivariateRender({
						    chart: $('#edit-chart').val(),
						    data: response});
			});
		});

	    //! @todo Refactor
	    $('#dss-elc-visualize-bivariate-form .btn[type="submit"]:visible').click();
	}
    }
})(jQuery, Drupal);
