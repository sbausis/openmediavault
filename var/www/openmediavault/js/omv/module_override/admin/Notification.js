
// require("js/omv/WorkspaceManager.js")

OMV.WorkspaceManager.registerNodeOverride({
	newpath: "/diagnostic",
	id: "notification",
	path: "/system"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/diagnostic/notification",
	id: "settings",
	path: "/system/notification"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/diagnostic/notification",
	id: "notifications",
	path: "/system/notification"
});