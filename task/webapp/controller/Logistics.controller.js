sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.example.task.controller.Logistics", {

		onInit: function() {
			var oModel = new JSONModel(sap.ui.require.toUrl("com/example/task/Mockdata/KPIData.json"));
			this.getView().setModel(oModel);
		},
		handleRowClick: function(oEvent) {
			var demoToast = this.getView().byId("demoToast");
			demoToast.setText("Event rowClick fired.");
			demoToast.show();
		},
		handleSelectionChange: function(oEvent) {
			var demoToast = this.getView().byId("demoToast");
			demoToast.setText("Event selectionChange fired.");
			demoToast.show();
		}
	});
});