<?php

function dss_elc_visualize_blocks() {
  
  return array('node_metrics' => array(
				       'name' => t('Easton Library Company Node Metrics'),
				       'module' => 'dss_elc_visualize',
				       'file' => 'includes/blocks.inc',
				       'class' => NULL,
				       'function' => NULL,
				       'form' => 'dss_elc_visualize_node_metrics_form',
				       ),
	       'univariate' => array(
				     'name' => t('Easton Library Company Univariate Analysis'),
				     'module' => 'dss_elc_visualize',
				     'file' => 'includes/blocks.inc',
				     'class' => NULL,
				     'function' => NULL,
				     'form' => 'dss_elc_visualize_univariate_form',
				     ),
	       'bivariate' => array(
				     'name' => t('Easton Library Company Bivariate Analysis'),
				     'module' => 'dss_elc_visualize',
				     'file' => 'includes/blocks.inc',
				     'class' => NULL,
				     'function' => NULL,
				     'form' => 'dss_elc_visualize_bivariate_form',
				    ),
	       'network' => array(
				  'name' => t('Easton Library Company Network Analysis'),
				  'module' => 'dss_elc_visualize',
				  'file' => 'includes/blocks.inc',
				  'class' => NULL,
				  'function' => NULL,
				  'form' => 'dss_elc_visualize_network_form',
				  ),
	       );
}

/**
 *
 * Implements hook_block_info().
 *
 */
function dss_elc_visualize_block_info() {

  $blocks = array();

  /*
  $blocks = array('node_metrics' => array(
					  'name' => t('Easton Library Company Node Metrics'),
					  'module' => 'dss_elc_visualize',
					  'file' => 'includes/blocks.inc',
					  'class' => NULL,
					  'function' => NULL,
					  'form' => 'dss_elc_visualize_node_metrics_form',
					  'cache' => DRUPAL_NO_CACHE,
					  ),
		  );
  */

  foreach(dss_elc_visualize_blocks() as $name => $block ) {

    $blocks[$name] = array(
			   'info' => $block['name'],
			   'cache' => DRUPAL_NO_CACHE,
			   );
  }

  return $blocks;
}

/**
 * Implements hook_block_view().
 *
 * @param type $delta
 *   delta parameter for blocks. This is the unique block name.
 * @return type
 *   returns an array containing the data to display in the block
 */
function dss_elc_visualize_block_view($delta = '') {

  $blocks = dss_elc_visualize_blocks();
  $block = array();

  if(in_array($delta, array_keys($blocks))) {

    // set block title
    $block['subject'] = $blocks[$delta]['name'];

    // set content
    $block['content'] = drupal_get_form($blocks[$delta]['form']);
  }

  /*
  switch($delta) {

    case ''
  }
  */

  // get global class
  //global $_islandora_solr_queryclass;

  // get solr blocks
  /*
  $solr_blocks = module_invoke_all("islandora_solr_query_blocks");

  // if the block that is called is defined
  if(!empty($solr_blocks[$delta]) && user_access('search islandora solr')) {

    // set block title
    $block['subject'] = $solr_blocks[$delta]['name'];

    // Include the file from which the block originates.
    //require_once( drupal_get_path('module', $solr_blocks[$delta]['module']) . '/' . $solr_blocks[$delta]['file'] );

    // set content
    $block['content'] = drupal_get_form($solr_blocks[$delta]['form']);
  }
  */

  return $block;
}

/**
 * AJAX callback for retrieving fields related to a subject of quantitative analysis
 *
 * @param type $form
 * @param type $form_state
 * @return string
 */
function dss_elc_visualize_node_metrics_form_field_callback($form, $form_state) {

  $defaultFields = dss_elc_visualize_get_fields($form['node_metrics']['bundle']['#value']);
  $form['node_metrics']['field'] = array(
					 '#title' => t('Field for Analysis'),
					 '#type' => 'select',
					 '#default_value' => array_shift($defaultFields),
					 '#options' => $defaultFields,
					 '#prefix' => '<div id="bundle-fields-div">',
					 '#suffix' => '</div>',
					 );

  return $form['node_metrics']['field'];
}

// refactor

/**
 * AJAX callback for retrieving fields related to a subject of quantitative analysis
 *
 * @param type $form
 * @param type $form_state
 * @return string
 */
function dss_elc_visualize_univariate_form_field_callback($form, $form_state) {

  $defaultFields = dss_elc_visualize_get_fields($form['univariate']['bundle']['#value']);
  $form['univariate']['field'] = array(
					 '#title' => t('Field for Analysis'),
					 '#type' => 'select',
					 '#default_value' => array_shift($defaultFields),
					 '#options' => $defaultFields,
					 '#prefix' => '<div id="bundle-fields-div">',
					 '#suffix' => '</div>',
					 );

  return $form['univariate']['field'];
}

function dss_elc_visualize_bivariate_form_field_u_callback($form, $form_state) {

  $default_fields_u = dss_elc_visualize_get_fields($form['bivariate']['bundle_u']['#value']);
  $form['bivariate']['field_u'] = array(
					 '#title' => t('Field for Analysis'),
					 '#type' => 'select',
					 '#default_value' => array_shift($default_fields_u),
					 '#options' => $default_fields_u,
					 '#prefix' => '<div id="bundle-fields-u-div">',
					 '#suffix' => '</div>',
					 );

  return $form['bivariate']['field_u'];
}

function dss_elc_visualize_bivariate_form_field_v_callback($form, $form_state) {

  $default_fields_v = dss_elc_visualize_get_fields($form['bivariate']['bundle_v']['#value']);
  $form['bivariate']['field_v'] = array(
					 '#title' => t('Field for Analysis'),
					 '#type' => 'select',
					 '#default_value' => array_shift($default_fields_v),
					 '#options' => $default_fields_v,
					 '#prefix' => '<div id="bundle-fields-v-div">',
					 '#suffix' => '</div>',
					 );

  return $form['bivariate']['field_v'];
}

/**
 * AJAX callback for retrieving entities related to the subject of network analysis
 *
 * @param type $form
 * @param type $form_state
 * @return string
 */
function dss_elc_visualize_network_form_field_callback($form, $form_state) {

  /*
  $default_related_entities = dss_elc_visualize_get_related_entities($form['node_metrics']['bundle']['#value']);
  $form['network']['related_entities'] = array(
				    '#title' => t('Related Entities'),
				    '#type' => 'select',
				    '#default_value' => array_shift($default_related_entities),
				    '#options' => $default_related_entities,
				    '#prefix' => '<div id="bundle-related-entities-div">',
				    '#suffix' => '</div>',
				    );
  */

  // Depending upon the related nodes, offer the option to filter the visualization
  $related_entities = dss_elc_visualize_get_related_entities($form['network_metrics']['bundle']['#value']);


  /*
  $form['network_metrics']['related_entities'] = array(
						       '#type' => 'checkboxes',
						       '#options' => drupal_map_assoc($related_entities),
						       '#title' => t('Render the Related Entities'),
						       '#prefix' => '<div id="bundle-related-entities-div">',
						       '#suffix' => '</div>',
						       );
  */

  // Depending upon the related nodes, offer the option to filter the visualization
  //$related_entities = dss_elc_visualize_get_related_entities($defaultBundle);

  $form['network_metrics']['related_entities'] = array(
						       '#type' => 'fieldset',
						       '#title' => t('Render the Related Entities'),
						       '#collapsible' => TRUE,
						       '#collapsed' => FALSE,
						       );

  $form['network_metrics']['related_entities']['entities'] = array(
								   '#type' => 'checkboxes',
								   '#options' => $related_entities,
								   //'#options' => drupal_map_assoc(!empty($related_entities['field']) ? $related_entities['field'] : array_shift($related_entities)),
								   //'#title' => t('Render the Related Entities'),
								   '#prefix' => '<div id="bundle-related-entities-div">',
								   '#suffix' => '</div>',
								   );

  return $form['network_metrics']['related_entities']['entities'];
}

/**
 *
 * Form for visualizing descriptive analyses of Drupal Nodes
 *
 * @param type $form
 * @param type $form_state
 * @return string
 */
function dss_elc_visualize_node_metrics_form($form, &$form_state) {

  drupal_add_js(drupal_get_path('module', 'dss_elc_visualize') . '/js/node_metrics_plugin.js');
  drupal_add_js(drupal_get_path('module', 'dss_elc_visualize') . '/js/node_metrics.js');

  $form['node_metrics'] = array(
				'#prefix' => '<div id="node-metrics-visualize"></div>',
				'#type' => 'container',
				'#attributes' => array(
						       'class' => array('container-inline')
						       )
				);

  $node_metrics = variable_get('node_metrics', array());
  $defaultBundle = !empty($node_metrics['bundle']) ? $node_metrics['bundle'] : 'human';
  $form['node_metrics']['bundle'] = array(
					  '#title' => t('Type of Data Captured'),
					  '#type' => 'select',
					  '#default_value' => $defaultBundle,
					  '#options' => dss_elc_visualize_get_bundles(),
					  '#ajax' => array(
							   'callback' => 'dss_elc_visualize_node_metrics_form_field_callback',
							   'wrapper' => 'bundle-fields-div',
							   'method' => 'replace',
							   'effect' => 'fade',
							   ),
					  );

  // function dss_elc_visualize_get_fields($bundle) {
  $defaultFields = dss_elc_visualize_get_fields($defaultBundle);
  $form['node_metrics']['field'] = array(
					 '#title' => t('Field for Analysis'),
					 '#type' => 'select',
					 '#default_value' => (!empty($node_metrics['field']) ? $node_metrics['field'] : array_shift($defaultFields)),
					 '#options' => $defaultFields,
					 '#prefix' => '<div id="bundle-fields-div">',
					 '#suffix' => '</div>',
					 );

  $form['node_metrics']['submit'] = array(
					  '#type' => 'submit',
					  '#value' => t('View the Data')
					  );

  return $form;
}

/**
 *
 * Form for visualizing univariate analyses of Drupal Nodes
 *
 * @param type $form
 * @param type $form_state
 * @return string
 */
function dss_elc_visualize_univariate_form($form, &$form_state) {

  drupal_add_js(drupal_get_path('module', 'dss_elc_visualize') . '/js/univariate_plugin.js');
  drupal_add_js(drupal_get_path('module', 'dss_elc_visualize') . '/js/univariate.js');

  $form['univariate'] = array(
			      '#prefix' => '<div id="univariate-visualize-legend" class="visualize-legend"><div id="univariate-visualize-legend-samples"></div><div id="univariate-visualize-legend-metrics"></div></div><div id="univariate-visualize-axis-y" class="visualize-axis-y"></div><div id="univariate-visualize"></div>',
			      '#type' => 'container',
			      '#attributes' => array(
						     'class' => array('container-inline')
						     )
			      );

  $univariate = variable_get('univariate', array());
  $defaultBundle = !empty($univariate['bundle']) ? $univariate['bundle'] : 'human';
  $form['univariate']['bundle'] = array(
					  '#title' => t('Entity to be Analyzed'),
					  '#type' => 'select',
					  '#default_value' => $defaultBundle,
					  '#options' => dss_elc_visualize_get_bundles(),
					  '#ajax' => array(
							   'callback' => 'dss_elc_visualize_univariate_form_field_callback',
							   'wrapper' => 'bundle-fields-div',
							   'method' => 'replace',
							   'effect' => 'fade',
							   ),
					  );

  // function dss_elc_visualize_get_fields($bundle) {
  $defaultFields = dss_elc_visualize_get_fields($defaultBundle);
  $form['univariate']['field'] = array(
					 '#title' => t('Field for Analysis'),
					 '#type' => 'select',
					 '#default_value' => (!empty($univariate['field']) ? $univariate['field'] : array_shift($defaultFields)),
					 '#options' => $defaultFields,
					 '#prefix' => '<div id="bundle-fields-div">',
					 '#suffix' => '</div>',
					 );

  $form['univariate']['submit'] = array(
					  '#type' => 'submit',
					  '#value' => t('View the Data')
					  );
  return $form;
}

/**
 *
 * Form for visualizing bivariate analyses of Drupal Nodes
 *
 * @param type $form
 * @param type $form_state
 * @return string
 */
function dss_elc_visualize_bivariate_form($form, &$form_state) {

  drupal_add_js(drupal_get_path('module', 'dss_elc_visualize') . '/js/bivariate_plugin.js');
  drupal_add_js(drupal_get_path('module', 'dss_elc_visualize') . '/js/bivariate.js');

  $form['bivariate'] = array(
			     '#prefix' => '<div id="bivariate-visualize-legend" class="visualize-legend"><div id="bivariate-visualize-legend-samples"></div><div id="bivariate-visualize-legend-metrics"></div></div><div id="bivariate-visualize-axis-y" class="visualize-axis-y"></div><div id="bivariate-visualize"></div>',
			     '#type' => 'container',
			     '#attributes' => array(
						    'class' => array('container-inline')
						    )
			     );

  $bivariate = variable_get('bivariate', array());

  // One of the entities to be analyzed
  $default_bundle_u = !empty($bivariate['bundle_u']) ? $bivariate['bundle_u'] : 'book';
  $form['bivariate']['bundle_u'] = array(
					'#title' => t('Entity to be Analyzed'),
					'#type' => 'select',
					'#default_value' => $default_bundle_u,
					// To be extended
					//'#options' => dss_elc_visualize_get_bundles(),
					'#options' => array('book' => 'Books',
							    'periodical' => 'Periodicals',
							    //'item' => 'Collection Items'
							    ),
					'#ajax' => array(
							 'callback' => 'dss_elc_visualize_bivariate_form_field_u_callback',
							 'wrapper' => 'bundle-fields-u-div',
							 'method' => 'replace',
							 'effect' => 'fade',
							 ),
					);

  $default_fields_u = dss_elc_visualize_get_fields($default_bundle_u);
  $form['bivariate']['field_u'] = array(
					 '#title' => t('Field for Analysis'),
					 '#type' => 'select',
					 '#default_value' => (!empty($bivariate['field_u']) ? $bivariate['field_u'] : array_shift($default_fields_u)),
					 // To be extended
					 //'#options' => $default_fields_u,
					 '#options' => array('field_artifact_was_authored_by' => 'Authors',
							     'field_item_subject' => 'Subject',
							     'field_item_format' => 'Format',
							     'field_loan_duration' => 'Date Borrowed',
							     ),
					 '#prefix' => '<div id="bundle-fields-u-div">',
					 '#suffix' => '</div>',
					 );

  // The entity to be analyzed
  $default_bundle_v = !empty($bivariate['bundle_v']) ? $bivariate['bundle_v'] : 'human';
  $form['bivariate']['bundle_v'] = array(
					'#title' => t('Entity to be Analyzed'),
					'#type' => 'select',
					'#default_value' => $default_bundle_v,
					 // To be extended
					//'#options' => dss_elc_visualize_get_bundles(),
					'#options' => array('human' => 'People'),
					'#ajax' => array(
							 'callback' => 'dss_elc_visualize_bivariate_form_field_v_callback',
							 'wrapper' => 'bundle-fields-v-div',
							 'method' => 'replace',
							 'effect' => 'fade',
							 ),
					);

  $default_fields_v = dss_elc_visualize_get_fields($default_bundle_v);
  $form['bivariate']['field_v'] = array(
					 '#title' => t('Field for Analysis'),
					 '#type' => 'select',
					 '#default_value' => (!empty($bivariate['field_v']) ? $bivariate['field_v'] : array_shift($default_fields_v)),
					 // To be extended
					 //'#options' => $default_fields_v,
					 '#options' => array('field_human_gender' => 'Gender',
							     'field_human_occupation' => 'Occupation',
							     // To be extended
							     //'field_person_membership' => 'Membership',
							     'field_person_location' => 'Location',
							     'field_person_type' => 'Type',
							     ),
					 '#prefix' => '<div id="bundle-fields-v-div">',
					 '#suffix' => '</div>',
					 );

  $form['bivariate']['metric'] = array(
					'#title' => t('Type of Metric'),
					'#type' => 'select',
					'#default_value' => (!empty($bivariate['metric']) ? $bivariate['metric'] : 'sum'),
					'#options' => array(
							    'sum' => 'Summation',
							    // To be extended
							    //'am' => 'Arithmetic Mean',
							    //'cmedian' => 'Median',
							    //'gm' => 'Geometric Mean',
							    //'hm' => 'Harmonic Mean'),
							    ),
					'#prefix' => '<div id="metric-div">',
					'#suffix' => '</div>',
					);

  $form['bivariate']['submit'] = array(
					  '#type' => 'submit',
					  '#value' => t('View the Data')
					  );
  return $form;
}

/**
 *
 * Form for visualizing the network analyses of Drupal Nodes
 *
 * @param type $form
 * @param type $form_state
 * @return string
 */
function dss_elc_visualize_network_form($form, &$form_state) {

  drupal_add_js(drupal_get_path('module', 'dss_elc_visualize') . '/js/network_plugin.js');
  drupal_add_js(drupal_get_path('module', 'dss_elc_visualize') . '/js/network.js');

  $form['network_metrics'] = array(
				'#type' => 'container',
				'#suffix' => '<div id="network-visualize"></div>',
				'#attributes' => array(
						       'class' => array('container-inline')
						       )
				);

  $network_metrics = variable_get('network_metrics', array());
  $defaultBundle = !empty($network_metrics['bundle']) ? $network_metrics['bundle'] : 'human';

  // To be extended
  $form['network_metrics']['subject_nids'] = array(
						   '#title' => t('Name(s)'),
						   '#type' => 'entityreference',
						   //'#default_value' => $defaultBundle,
						   '#era_entity_type' => 'node',
						   // To be extended
						   '#era_bundles' => array('human'),
						   );

  $form['network_metrics']['bundle'] = array(
					     '#title' => t('Related To'),
					     '#type' => 'select',
					     '#default_value' => $defaultBundle,
					     // To be extended
					     //'#options' => dss_elc_visualize_get_bundles(),
					     '#options' => array('personal_relationship' => 'Shareholders & Representatives',
								 'loan' => 'Loan'),
					     '#ajax' => array(
							      'callback' => 'dss_elc_visualize_network_form_field_callback',
							      'wrapper' => 'bundle-related-entities-div',
							      'method' => 'replace',
							      'effect' => 'fade',
							      ),
					     );



  /*
  $form['slider2'] = array(
    '#title' => 'Range Slider',
    '#type' => 'slider',
    '#default_value' => array('value' => 200, 'value2' => 700),
    //'#orientation' => 'vertical',
    '#slider_style' => 'orange',
    '#range' => TRUE,
    '#min' => 10,
    '#max' => 1000,
    '#step' => 1,
	'#display_bubble' => TRUE,
	'#display_bubble_format' => '$%{value}%',
    //'#required' => 1,
    //'#disabled' => TRUE,
    //'#display_inputs' => FALSE,
    '#display_values' => TRUE,
  );
   */

  // To be extended

  $min = 1;
  $max = 32;
  $form['network_metrics']['limit'] = array('#title' => 'Max. Nodes',
					    '#type' => 'slider',
					    //'#default_value' => $min,
					    '#default_value' => array('value' => $min, 'value2' => $max),
					    '#slider_style' => '#6E664F',
					    //'#range' => 'min',
					    '#range' => TRUE,
					    /*
					    '#min' => -4859982000000,
					    '#max' => -5005047600000,
					    '#step' => 259200000,
					    */
					    /*
					    '#min' => 485.99820,
					    '#max' => 500.50476,
					    '#step' => 259.20000,
					    */
					    '#min' => $min,
					    '#max' => $max,
					    '#step' => 1,
					    //'#display_bubble' => TRUE,
					    //'#display_bubble_format' => '$%{value}%',
					    //'#required' => 1,
					    //'#disabled' => TRUE,
					    '#display_inputs' => FALSE,
					    //'#display_values' => TRUE,
					    '#slider_length' => '100px',
					    '#suffix' => '<div class="ui-slider-legend"><span class="ui-slider-legend-min">' . $min . '</span><span class="ui-slider-legend-max">' . $max . '</span></div>',
					    );

					    /*
					    array('#type' => 'transfer_slider',
					    //'#title' => t('Slider test'),
					    '#display_inputs' => FALSE,
					    '#display_values' => FALSE,
					    //'#left_value' => 0,
					    //'#right_value' => 200,
					    '#left' => t('Min. Nodes'),
					    '#right' => t('Max. Nodes'),
					    '#min' => 4,
					    '#max' => 100,
					    '#size' => 4,
					    );
					    */

  // Depending upon the related nodes, offer the option to filter the visualization
  $related_entities = dss_elc_visualize_get_related_entities($defaultBundle);

  // To be extended
  /*
  $form['network_metrics']['related_entities'] = array(
						       '#type' => 'fieldset',
						       '#title' => t('Render the Related Entities'),
						       '#collapsible' => TRUE,
						       '#collapsed' => FALSE,
						       );

  dpm($related_entities);

  $form['network_metrics']['related_entities']['entities'] = array(
								   '#type' => 'checkboxes',
								   '#options' => drupal_map_assoc($related_entities),
								   //'#title' => t('Render the Related Entities'),
								   '#prefix' => '<div id="bundle-related-entities-div">',
								   '#suffix' => '</div>',
								   );
  */

  $form['network_metrics']['submit'] = array(
					     '#type' => 'submit',
					     '#value' => t('Generate')
					     );

  return $form;
}
