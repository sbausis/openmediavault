
// require("js/omv/WorkspaceManager.js")

OMV.WorkspaceManager.registerNodeOverride({
	id: "storage",
	path: "/",
	position: 48
});

OMV.WorkspaceManager.registerPanelOverride({
	id: "devices",
	path: "/storage/mdadm",
	text: _("SoftwareRaid"),
	position: 1,
	//className: "OMV.module.admin.storage.mdadm.Devices"
});
