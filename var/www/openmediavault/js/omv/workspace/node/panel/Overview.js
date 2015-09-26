/**
 * This file is part of OpenMediaVault.
 *
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @copyright Copyright (c) 2009-2015 Volker Theile
 *
 * OpenMediaVault is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * OpenMediaVault is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OpenMediaVault. If not, see <http://www.gnu.org/licenses/>.
 */
// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/panel/Panel.js")
// require("js/omv/workspace/node/Model.js")
// require("js/omv/workspace/node/Node.js")

/**
 * Display all workspace categories and their child nodes in an data view.
 * @class OMV.workspace.node.panel.Overview
 * @derived OMV.workspace.panel.Panel
 * @param root The root workspace node to be displayed.
 */
Ext.define("OMV.workspace.node.panel.Overview", {
	extend: "OMV.workspace.panel.Panel",
	alias: "widget.workspace.node.panel.overview",
	requires: [
		"Ext.data.Store",
		"Ext.view.View",
		"Ext.XTemplate",
		"OMV.WorkspaceManager",
		"OMV.workspace.node.Model",
		"OMV.workspace.node.Node"
	],

	cls: Ext.baseCSSPrefix + "workspace-node-view",

	constructor: function(config) {
		var me = this;
		config = Ext.apply({
			root: OMV.WorkspaceManager.getRootNode()
		}, config || {});
		me.callParent([ config ]);
		/**
		 * @event select
		 * Fires when a node has been selected.
		 * @param this The panel object.
		 * @param node The selected node object.
		 */
	},

	initComponent: function() {
		var me = this;
		var store = Ext.create("Ext.data.Store", {
			model: "OMV.workspace.node.Model",
			sorters: [{
				sorterFn: function(a, b) {
					var getCmpData = function(o) {
						var node = o.getData();
						return {
							position: node.getPosition(),
							text: node.getText().toLowerCase()
						};
					};
					// Get data to compare.
					a = getCmpData(a);
					b = getCmpData(b);
					// Sort by position and text.
					return a.position > b.position ? 1 :
					  a.position < b.position ? -1 :
					  a.text > b.text ? 1 : a.text < b.text ? -1 : 0;
				}
			}]
		});
		me.getRootNode().eachChild(function(node) {
			var model = store.add(node);
			model[0].set("header", true);
			node.eachChild(function(subNode) {
				model = store.add(subNode);
				model[0].set("header", false);
			});
		});
		Ext.apply(me, {
			items: Ext.create("Ext.view.View", {
				multiSelect: false,
				trackOver: true,
				overItemCls: Ext.baseCSSPrefix + "item-over",
				itemSelector: "div.thumb-wrap",
				store: store,
				updateIndexes: function(startIndex, endIndex) {
					// This is a special implementation of this method
					// because the default one is not able to process the
					// data structure if the data view tems are out of
					// order than they are stored in the store.
					var nodes = this.all.elements,
					    node,
					    records = this.getViewRange(),
					    i,
					    myId = this.id;
					startIndex = startIndex || 0;
					endIndex = endIndex || ((endIndex === 0) ?
					  0 : (nodes.length - 1));
					for (i = startIndex; i <= endIndex; i++) {
					    //node = nodes[i];
						node = Ext.Array.findBy(nodes, function(item, index) {
			        		return item.id == records[i].get("uri");
			        	});
					    node.setAttribute('data-recordIndex', i);
					    node.setAttribute('data-recordId', records[i].internalId);
					    node.setAttribute('data-boundView', myId);
					}
			    },
				tpl: Ext.create("Ext.XTemplate",
					'<div class="',Ext.baseCSSPrefix,'workspace-node-view-categories">',
						'<tpl for=".">',
							'<tpl if="values.header == true">',
								'<div class="',Ext.baseCSSPrefix,'workspace-node-view-category">',
									'<div class="',Ext.baseCSSPrefix,'workspace-node-view-category-header">',
										'<div class="thumb-wrap" id="{uri:stripTags}">',
											'{[this.renderCategoryHeaderText(values)]}',
										'</div>',
									'</div>',
									'<div class="',Ext.baseCSSPrefix,'workspace-node-view-category-items">',
										'{[this.renderCategory(values, parent)]}',
									'</div>',
								'</div>',
								'<div class="x-clear"></div>',
							'</tpl>',
						'</tpl>',
					'</div>',
					{
						renderCategoryHeaderText: function(node) {
							return Ext.String.htmlEncode(node.getText());
						},
						renderCategory: function(categoryNode, models) {
							var tpl = Ext.create("Ext.XTemplate",
								'<tpl for=".">',
									'<tpl if="this.isRenderNode(values)">',
										'<div class="thumb-wrap" id="{uri:stripTags}">',
											'<div class="thumb"><img src="{[this.renderIcon(values)]}" title="{[this.renderText(values)]}"></div>',
											'<span>{[this.renderText(values)]}</span>',
										'</div>',
									'</tpl>',
								'</tpl>',
								{
									isRenderNode: function(node) {
										return OMV.workspace.node.Node.
										  compareUri(node.getPath(),
										  categoryNode.getUri());
									},
									renderText: function(node) {
										return Ext.String.htmlEncode(
										  node.getText());
									},
									renderIcon: function(node) {
										return node.getProperIcon32();
									}
								});
							return tpl.apply(models);
						}
					}
				),
				listeners: {
					scope: me,
					select: function(view, record, eOpts) {
						var node = record.getData();
						this.fireEvent("select", this, node);
					}
				}
			})
		});
		me.callParent(arguments);
	},

	getRootNode: function() {
		var me = this;
		return me.root;
	}
});
