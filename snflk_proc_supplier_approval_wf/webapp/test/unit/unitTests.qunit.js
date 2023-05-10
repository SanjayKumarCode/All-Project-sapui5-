/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comsnflkproc/snflk_proc_supplier_approval_wf/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
