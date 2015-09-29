
// require("js/omv/WorkspaceManager.js")

OMV.WorkspaceManager.registerNodeOverride({
	newpath: "/diagnostic",
	id: "notification",
	path: "/system",
	position: 13
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
