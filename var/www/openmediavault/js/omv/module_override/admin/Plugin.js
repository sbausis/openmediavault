
// require("js/omv/WorkspaceManager.js")

OMV.WorkspaceManager.registerNodeOverride({
	del: true,
	id: "plugin",
	path: "/system"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/system/update",
	id: "plugins",
	path: "/system/plugin"
});
