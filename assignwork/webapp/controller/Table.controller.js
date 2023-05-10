sap.ui.define([
   
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/Filter",
"sap/ui/model/FilterOperator"
], function( Controller, JSONModel,Filter, FilterOperator) {
"use strict";

var TableController = Controller.extend("com.example.assignwork.controller.Table", {

    onInit: function () {

        // set explored app's demo model on this sample
        var oModel = new JSONModel(sap.ui.require.toUrl("com/example/assignwork/model/products.json"));
        this.getView().setModel(oModel);
    },
    handleSearch: function (evt) {
        // create model filter
        var filters = [];
        var query = evt.getParameter("query");
        if (query && query.length > 0) {
            filters.push(new Filter({
                path: "ProductId",
                operator: FilterOperator.Contains,
                value1: query
            }));
        }

        // update list binding
        var list = this.getView().byId("idProductsTable");
        var binding = list.getBinding("items");
        binding.filter(filters);
    },
});


return TableController;

});