sap.ui.define([
	
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.example.task.controller.Quality", {

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
		// ,

		// onDataExport : function(oEvent) {

		// 	var oExport = new Export({

		// 		exportType : new ExportTypeCSV({
		// 			separatorChar : ";"
		// 		}),

		// 		models : this.getView().getModel(),

		// 		rows : {
		// 			path : "/tabular_quality"
		// 		},

				
		// 		columns : [{
		// 			name : "GID",
		// 			template : {
		// 				content : "{GID}"
		// 			}
		// 		}, {
		// 			name : "SUPPLIER_MAIL",
		// 			template : {
		// 				content : "{SUPPLIER_MAIL}"
		// 			}
		// 		}, {
		// 			name : "IFA",
		// 			template : {
		// 				content : "{IFA}"
		// 			}
		// 		}]
		// 	});

		// 	// download exported file
		// 	oExport.saveFile().catch(function(oError) {
		// 		MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
		// 	}).then(function() {
		// 		oExport.destroy();
		// 	});
		// }
	});
});