
// require("js/omv/WorkspaceManager.js")

OMV.WorkspaceManager.registerNodeOverride({
	id: "privilege",
	path: "/",
	position: 49
});

OMV.WorkspaceManager.registerNodeOverride({
	newpath: "/storage",
	id: "sharedfolder",
	path: "/privilege",
	position: 90
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/storage/sharedfolder",
	id: "sharedfolders",
	path: "/privilege/sharedfolder",
	position: 10
});