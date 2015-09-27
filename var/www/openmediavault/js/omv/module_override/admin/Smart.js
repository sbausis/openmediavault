
// require("js/omv/WorkspaceManager.js")

OMV.WorkspaceManager.registerNodeOverride({
	newpath: "/diagnostic",
	id: "smart",
	path: "/storage"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/diagnostic/smart",
	id: "settings",
	path: "/storage/smart"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/diagnostic/smart",
	id: "devices",
	path: "/storage/smart"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/diagnostic/smart",
	id: "scheduledjobs",
	path: "/storage/smart"
});
