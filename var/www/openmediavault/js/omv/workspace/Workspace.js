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
// require("js/omv/SessionManager.js")
// require("js/omv/Rpc.js")
// require("js/omv/window/MessageBox.js")
// require("js/omv/toolbar/ApplyCfg.js")
// require("js/omv/workspace/tab/Panel.js")
// require("js/omv/workspace/node/tree/Panel.js")
// require("js/omv/workspace/node/panel/Category.js")
// require("js/omv/workspace/node/panel/Overview.js")

/**
 * @ingroup webgui
 * @class OMV.workspace.Workspace
 * @derived Ext.container.Viewport
 * A specialized container representing the viewable application area.
 */
Ext.define("OMV.workspace.Workspace", {
	extend: "Ext.container.Viewport",
	requires: [
		"OMV.WorkspaceManager",
		"OMV.SessionManager",
		"OMV.Rpc",
		"OMV.toolbar.ApplyCfg",
		"OMV.window.MessageBox",
		"OMV.workspace.node.tree.Panel"
	],
	uses: [
		"OMV.workspace.node.panel.Category",
		"OMV.workspace.node.panel.Overview",
		"OMV.workspace.tab.Panel"
	],

	layout: "border",

	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [
				me.header = me.buildHeader(),
				me.tree = me.buildTree(),
				me.view = me.buildView()
 			]
		});
		me.callParent(arguments);
	},

	mask: function(config) {
		var me = this;
		if(!Ext.isDefined(me.loadMask)) {
			Ext.apply(config, {
				target: me,
				useMsg: true
			});
			me.loadMask = new Ext.LoadMask(config);
		} else {
			Ext.apply(me.loadMask, config);
		}
		me.loadMask.show();
	},

	unmask: function() {
		var me = this;
		if(Ext.isDefined(me.loadMask))
			me.loadMask.hide();
	},

	/**
	 * @private
	 */
	buildHeader: function() {
		var me = this;
		return Ext.create("Ext.Component", {
			region: "north",
			autoEl: {
				tag: "div",
				html: "<div id='header'><a title='" + OMV.PRODUCT_NAME +
				  "' href='" + OMV.PRODUCT_URL + "' target='_blank'>" +
				  "<div id='headerlogo'></div></a><div id='headerrlogo'>" +
				  "</div></div>"
			}
		});
	},

	/**
	 * @private
	 */
	buildTree: function() {
		var me = this;
		return me.tp = Ext.create("OMV.workspace.node.tree.Panel", {
//			plugins: "responsive",
//			responsiveConfig: {
				// On tablet/phone/touch devices the tree panel will not
				// be displayed.
//				"tablet || phone || touch": {
//					hidden: true
//				}
//			},
			region: "west",
			split: true,
			width: 210,
			minSize: 150,
			maxSize: 280,
			collapsible: true,
			margins: "0 0 0 0",
			layout: "fit",
			border: true,
			scrollable: true,
			listeners: {
				scope: me,
				select: function(view, record, eOpts) {
					// Get the workspace node object.
					var node = record.get("node");
					this.onSelectNode(node, !record.isLeaf());
				}
			}
		});
	},

	/**
	 * @private
	 */
	getTree: function() {
		var me = this;
		return me.tp;
	},

	/**
	 * @private
	 */
	buildView: function() {
		var me = this;
		return me.vp = Ext.create("Ext.panel.Panel", {
			id: me.getId() + "-center",
			region: "center",
			layout: "fit",
			dockedItems: [ me.tb = Ext.create("Ext.toolbar.Toolbar", {
				dock: "top",
				items: [{
					xtype: "tbtext",
					id: me.getId() + "-text",
					text: "&nbsp;"
				},{
					xtype: "tbfill"
				},{
					xtype: "splitbutton",
					icon: "images/menu.png",
					iconCls: Ext.baseCSSPrefix + "btn-icon-16x16",
					handler: function() {
						this.showMenu();
					},
					menu: Ext.create("Ext.menu.Menu", {
						defaults: {
							iconCls: Ext.baseCSSPrefix + "menu-item-icon-16x16"
						},
						items: [{
							text: _("Language"),
							icon: Ext.supports.Svg ? "images/globe.svg" :
							  "images/globe.png",
							menu: {
								items: function() {
									var items = [];
									var locale = OMV.util.i18n.getLocale();
									Ext.Array.each(OMV.languages,
									  function(item) {
										Ext.Array.push(items, {
											xtype: "menucheckitem",
											text: item[1],
											value: item[0],
											checked: item[0] === locale,
											group: "locale"
										})
									});
									return items;
								}(),
								listeners: {
									click: function(menu, item) {
										OMV.util.i18n.setLocale(item.value);
										// Force rendering of whole page with
										// selected language.
										OMV.confirmPageUnload = false;
										document.location.reload();
									}
								}
							}
						},{
							text: _("Reset WebGUI state"),
							action: "resetstate",
							msg: _("Do you really want to reset WebGUI state, e.g. grid column order?"),
							tooltip: _("Reset WebGUI state will restore default settings of grid columns for example."),
							icon: Ext.supports.Svg ? "images/refresh.svg" : "images/refresh.png"
						},{
							xtype: "menuseparator"
						},{
							text: _("Logout"),
							action: "logout",
							msg: _("Do you really want to logout?"),
							icon: Ext.supports.Svg ? "images/logout.svg" :
							  "images/logout.png"
						},{
							text: _("Reboot"),
							action: "reboot",
							msg: _("Do you really want to reboot the system?"),
							icon: Ext.supports.Svg ? "images/reboot.svg" :
							  "images/reboot.png",
							hidden: !OMV.SessionManager.isAdministrator()
						},{
							text: _("Standby"),
							action: "standby",
							msg: _("Do you really want to put the system into standby?"),
							icon: Ext.supports.Svg ? "images/pause.svg" :
							  "images/pause.png",
							hidden: !OMV.SessionManager.isAdministrator()
						},{
							text: _("Shutdown"),
							action: "shutdown",
							msg: _("Do you really want to shutdown the system?"),
							icon: Ext.supports.Svg ? "images/shutdown.svg" :
							  "images/shutdown.png",
							hidden: !OMV.SessionManager.isAdministrator()
						}],
						listeners: {
							click: function(menu, item, e, eOpts) {
								if(!Ext.isDefined(item.action))
									return;
								OMV.MessageBox.show({
									title: _("Confirmation"),
									msg: item.msg,
									buttons: Ext.Msg.YESNO,
									fn: function(answer) {
										if(answer !== "yes")
											return;
										switch (item.action) {
										case "resetstate":
											Ext.state.Manager.getProvider().clearAll();
											break;
										case "logout":
											OMV.SessionManager.logout();
											break;
										case "reboot":
											OMV.Rpc.request({
												scope: this,
												callback: function(id, success, response) {
													OMV.MessageBox.show({
														title: _("Information"),
														icon: Ext.Msg.INFO,
														msg: _("The system will reboot now. This may take some time ..."),
														wait: true,
														closable: false
													});
													this.waitingForResponse = false;
													this.hasRebooted = false;
													Ext.util.TaskManager.start({
														run: function() {
															if(this.waitingForResponse)
																return;
															this.waitingForResponse = true;
															// Execute RPC.
															OMV.Rpc.request({
																scope: this,
																callback: function(id, success, response) {
																	this.waitingForResponse = false;
																	if(success) {
																		if(this.hasRebooted) {
																			OMV.confirmPageUnload = false;
																			document.location.reload();
																		}
																	} else {
																		this.hasRebooted = true;
																	}
																},
																relayErrors: true,
																rpcData: {
																	service: "System",
																	method: "noop"
																}
															});
														},
														scope: this,
														interval: 5000,
														fireOnStart: true
													});
												},
												relayErrors: false,
												rpcData: {
													service: "System",
													method: "reboot"
												}
											});
											break;
										case "standby":
										case "shutdown":
											OMV.Rpc.request({
												scope: this,
												callback: function(id, success, response) {
													OMV.confirmPageUnload = false;
													document.location.replace("shutdown.php");
												},
												relayErrors: false,
												rpcData: {
													service: "System",
													method: item.action
												}
											});
											break;
										}
									},
									scope: this,
									icon: Ext.Msg.QUESTION
								});
							},
							scope: this
						}
					})
				}]
			}),{
				xtype: "applycfgtoolbar"
			}]
		});
	},

	/**
	 * @private
	 */
	getView: function() {
		var me = this;
		return me.vp;
	},

	/**
	 * @private
	 */
	getToolbar: function() {
		var me = this;
		return me.tb;
	},

	/**
	 * Function that is called when a workspace node has been selected.
	 * @param node The workspace node object.
	 * @param iconView Set to TRUE to display the node childen in an
	 *   icon view panel.
	 */
	onSelectNode: function(node, iconView) {
		var me = this;
		if (!Ext.isObject(node) || !node.isNode)
			return;
		// Update content page.
		var selector = Ext.String.format("#{0}-center", me.getId());
		var centerPanel = me.query(selector).shift();
		if (Ext.isDefined(centerPanel)) {
			var object;
			if (false == iconView) {
				if (0 == node.getChildCount()) {
					object = Ext.create(node.getClassName(), {
						header: false,
						title: node.getText()
					});
				} else if (1 == node.getChildCount()) {
					// Display a single panel.
					var childNode = node.getChildAt(0);
					object = Ext.create(childNode.getClassName(), {
						header: false,
						title: childNode.getText()
					});
				} else {
					// Create a tab panel containg all registered panels.
					object = Ext.create("OMV.workspace.tab.Panel");
					// Sort child nodes based on their position.
					node.eachChild(function(childNode) {
						if (!childNode.isLeaf())
							return;
						object.add(Ext.create(childNode.getClassName(), {
							title: childNode.getText()
						}));
					});
					object.setActiveTab(0);
				}
			} else {
				var className = "OMV.workspace.node.panel.Category";
				if (node.isRoot())
					className = "OMV.workspace.node.panel.Overview";
				object = Ext.create(className, {
					root: node,
					listeners: {
						scope: me,
						select: function(panel, node) {
							me.getTree().selectPathByNode(node);
						}
					}
				});
			}
			// Display the panel.
			centerPanel.removeAll(true);
			centerPanel.add(object);
			// Remove all  workspace node navigation buttons.
			Ext.Array.each(me.getToolbar().query("*[cls=" +
			  Ext.baseCSSPrefix + "workspace-node-toolbar-item]"),
			  function(c) {
				me.getToolbar().remove(c);
			});
			// Add workspace node navigation buttons.
			var components = [];
			node.bubble(function(parentNode) {
				// Insert a button per workspace node.
				var config = {
					xtype: "button",
					cls: Ext.baseCSSPrefix + "workspace-node-toolbar-item",
					handler: function() {
						var iconView = (parentNode.getPath() == "/");
						me.onSelectNode(parentNode, iconView);
					}
				};
				if (!parentNode.isRoot()) {
					Ext.apply(config, {
						text: parentNode.getText()
					});
				}
				if (parentNode.hasIcon("raster16")) {
					Ext.apply(config, {
						icon: parentNode.getProperIcon16(),
						iconCls: Ext.baseCSSPrefix + "btn-icon-16x16"
					});
				}
				Ext.Array.insert(components, 0, [ config ]);
				// Insert separator?
				if (!parentNode.isRoot()) {
					Ext.Array.insert(components, 0, [{
						xtype: "tbseparator",
						cls: Ext.baseCSSPrefix + "workspace-node-toolbar-item"
					}]);
				}
			});
			me.getToolbar().insert(0, components);
		}
	},

	afterRender: function() {
		var me = this;
		me.callParent(arguments);
		// The list of the nodes to select after login is ordered by
		// preference.
		var uris = [
			"/diagnostic/dashboard",
			"/diagnostic/system",
			"/info/about"
		];
		// Find and select the workspace node to automatically select
		// after login.
		Ext.Array.each(uris, function(uri) {
			var node = OMV.WorkspaceManager.getNodeByPath(uri);
			if (!Ext.isEmpty(node) && node.isNode) {
				this.onSelectNode(node, false);
				return false;
			}
		}, me);
	}
});
