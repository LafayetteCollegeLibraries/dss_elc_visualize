/**
 * Javascript functionality for the data visualization layer of the VRE
 * Refactor into the "dss_elc" JavaScript Module
 * @author griffinj@lafayette.edu
 *
 */

// JSHint
var Drupal = Drupal || {};

(function($, Drupal) {

    "use strict";

    Drupal.behaviors.dssElcPersRelsVisualize = {

	attach: function(context, settings) {

	    //var vis = d3.select('div#network').append("svg:svg").attr("width", w).attr("height", h);

	    var width = 320, height = 256;

	    var color = d3.scale.category20();

	    var force = d3.layout.force()
	    .charge(-120)
	    .linkDistance(30)
	    .size([width, height]);

	    var svg = d3.select("div#social-network")
	    .append("svg")
	    .attr("width", width)
	    .attr("height", height);

	    var nodes = [];
	    var labelAnchors = [];
	    var labelAnchorLinks = [];
	    var links = [{source: 0, target: 1}];

	    var drupalNodes = {};

 	    // Retrieve all "loan" relationships for which Abraham Bachman is the patron
	    jQuery.get("/pers-rels/get/" + settings.dssElcPersRelsVisualize.nid, function(rels, textStatus) {

		    var nodeIndex = 0;

		    for(i in rels) {

			if(!(rels[i].field_pers_rel_subject.und[0].nid in drupalNodes)) {

			    nodes.push({
				    name: rels[i].field_pers_rel_subject.und[0].field_person_name.und[0].value, group: 1
					});

			    drupalNodes[rels[i].field_pers_rel_subject.und[0].nid] = nodeIndex;

			    nodeIndex++;
			}

			if(!(rels[i].field_pers_rel_object.und[0].nid in drupalNodes)) {

			    nodes.push({
				    name: rels[i].field_pers_rel_object.und[0].field_person_name.und[0].value, group: 1
					});

			    drupalNodes[rels[i].field_pers_rel_object.und[0].nid] = nodeIndex;

			    nodeIndex++;
			}

			links.push({source: drupalNodes[rels[i].field_pers_rel_subject.und[0].nid],
				    target: drupalNodes[rels[i].field_pers_rel_object.und[0].nid]
				    });
		    }

		    force
			.nodes(nodes)
			.links(links)
			.start();

		    var link = svg.selectAll(".link")
			.data(links)
			.enter().append("line")
			.attr("class", "link")
			.style("stroke-width", function(d) { return Math.sqrt(d.value); });

		    var node = svg.selectAll(".node")
			.data(nodes)
			.enter().append("circle")
			.attr("class", "node")
			.attr("r", 5)
			.style("fill", function(d) { return color(d.group); })
			.call(force.drag);

		    node.append("title")
			.text(function(d) { return d.name; });

		    force.on("tick", function() {
			    link.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

			    node.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
			});
			
		});
	}
    }
})(jQuery, Drupal);

(function($, Drupal) {
    Drupal.behaviors.dssElcBibRelsVisualize = {

	attach: function(context, settings) {

	    var width = 320, height = 256;

	    var color = d3.scale.category20();

	    var force = d3.layout.force()
	    .charge(-120)
	    .linkDistance(30)
	    .size([width, height]);

	    var svg = d3.select("div#biblio-network")
	    .append("svg")
	    .attr("width", width)
	    .attr("height", height);

	    var nodes = [];
	    var labelAnchors = [];
	    var labelAnchorLinks = [];
	    var links = [{source: 0, target: 1}];

	    var drupalNodes = {};

 	    // Retrieve all "loan" relationships for which Abraham Bachman is the patron
	    jQuery.get("/bib-rels/get/" + settings.dssElcBibRelsVisualize.nid, function(rels, textStatus) {

		    var nodeIndex = 0;

		    for(i in rels) {

			if(!(rels[i].field_bib_rel_subject.und[0].nid in drupalNodes)) {

			    nodes.push({
				    name: rels[i].field_bib_rel_subject.und[0].field_person_name.und[0].value, group: 1
					});

			    drupalNodes[rels[i].field_bib_rel_subject.und[0].nid] = nodeIndex;

			    nodeIndex++;
			}

			if(!(rels[i].field_bib_rel_object.und[0].nid in drupalNodes)) {

			    nodes.push({
				    name: rels[i].field_bib_rel_object.und[0].field_artifact_title.und[0].value, group: 1
					});

			    drupalNodes[rels[i].field_bib_rel_object.und[0].nid] = nodeIndex;

			    nodeIndex++;
			}

			links.push({source: drupalNodes[rels[i].field_bib_rel_subject.und[0].nid],
				    target: drupalNodes[rels[i].field_bib_rel_object.und[0].nid]
				    });
		    }

		    force
			.nodes(nodes)
			.links(links)
			.start();

		    var link = svg.selectAll(".link")
			.data(links)
			.enter().append("line")
			.attr("class", "link")
			.style("stroke-width", function(d) { return Math.sqrt(d.value); });

		    var node = svg.selectAll(".node")
			.data(nodes)
			.enter().append("circle")
			.attr("class", "node")
			.attr("r", 5)
			.style("fill", function(d) { return color(d.group); })
			.call(force.drag);

		    node.append("title")
			.text(function(d) { return d.name; });

		    force.on("tick", function() {
			    link.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

			    node.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
			});
			
		});
	}
    }
})(jQuery, Drupal);

