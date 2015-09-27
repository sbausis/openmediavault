
// require("js/omv/WorkspaceManager.js")

OMV.WorkspaceManager.registerNodeOverride({
	del: true,
	id: "info",
	path: "/"
});

OMV.WorkspaceManager.registerNodeOverride({
	del: true,
	id: "donate",
	path: "/info"
});

OMV.WorkspaceManager.registerPanelOverride({
	del: true,
	id: "donate",
	path: "/info/donate"
});

OMV.WorkspaceManager.registerNodeOverride({
	del: true,
	id: "support",
	path: "/info"
});

OMV.WorkspaceManager.registerPanelOverride({
	del: true,
	id: "support",
	path: "/info/support"
});

OMV.WorkspaceManager.registerNodeOverride({
	del: true,
	id: "about",
	path: "/info"
});

OMV.WorkspaceManager.registerPanelOverride({
	del: true,
	id: "about",
	path: "/info/about"
});
