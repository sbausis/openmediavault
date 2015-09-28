
// require("js/omv/WorkspaceManager.js")

OMV.WorkspaceManager.registerNodeOverride({
	newpath: "/diagnostic",
	id: "monitoring",
	path: "/system"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "perfstat",
	newpath: "/diagnostic/monitoring",
	id: "perfstats",
	path: "/system/monitoring"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/diagnostic/monitoring",
	id: "perfstats",
	path: "/diagnostic/system"
});
