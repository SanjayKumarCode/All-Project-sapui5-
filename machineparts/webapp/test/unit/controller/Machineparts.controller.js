/*global QUnit*/

sap.ui.define([
	"comexample/machineparts/controller/Machineparts.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Machineparts Controller");

	QUnit.test("I should test the Machineparts controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
