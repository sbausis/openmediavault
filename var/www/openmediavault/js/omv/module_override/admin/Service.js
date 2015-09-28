
// require("js/omv/WorkspaceManager.js")

OMV.WorkspaceManager.registerNodeOverride({
	del: true,
	id: "service",
	path: "/diagnostic"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/diagnostic/system",
	id: "status",
	path: "/diagnostic/service",
	position: 30
});
