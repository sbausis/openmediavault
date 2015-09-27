
// require("js/omv/WorkspaceManager.js")

OMV.WorkspaceManager.registerNode({
	id: "networking",
	path: "/",
	text: _("Networking"),
	position: 15
});

OMV.WorkspaceManager.registerNodeOverride({
	newpath: "/networking",
	id: "network",
	path: "/system"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/networking/network",
	id: "general",
	path: "/system/network"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/networking/network",
	id: "interfaces",
	path: "/system/network"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/networking/network",
	id: "zeroconf",
	path: "/system/network"
});

OMV.WorkspaceManager.registerPanelOverride({
	newpath: "/networking/network",
	id: "firewall",
	path: "/system/network"
});
