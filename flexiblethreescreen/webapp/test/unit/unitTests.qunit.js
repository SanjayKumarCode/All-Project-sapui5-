/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comexample/flexibleproject/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
