sap.ui.define([
   
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function( Controller, JSONModel) {
"use strict";

var TableController = Controller.extend("com.example.assignwork.controller.PopMessagebox", {

    onInit: function () {

        // set explored app's demo model on this sample
        var oModel = new JSONModel(sap.ui.require.toUrl("com/example/assignwork/model/products.json"));
        this.getView().setModel(oModel);
    }
});


return TableController;

});