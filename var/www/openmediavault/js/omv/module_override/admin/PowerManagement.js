
// require("js/omv/WorkspaceManager.js")

OMV.WorkspaceManager.registerNodeOverride({
	newpath: "/diagnostic",
	id: "powermanagement",
	path: "/system"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/diagnostic/powermanagement",
	id: "settings",
	path: "/system/powermanagement"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/diagnostic/powermanagement",
	id: "scheduledjobs",
	path: "/system/powermanagement"
});
