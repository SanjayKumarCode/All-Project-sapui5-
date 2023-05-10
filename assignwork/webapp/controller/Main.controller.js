sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment,JSONModel,Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.example.assignwork.controller.Main", {
            onInit: function () {
                var oModel = new JSONModel(sap.ui.require.toUrl("com/example/assignwork/model/products.json"));
           
                this.getView().setModel(oModel);
            },	onDialogPress: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();
    
                if (!this._pDialog) {
                    this._pDialog = Fragment.load({
                        id: oView.getId(),
                        name: "com.example.assignwork.view.fragment.Dialog",
                        controller: this
                    }).then(function (oDialog){
                        oDialog.setModel(oView.getModel());
                        return oDialog;
                    });
                }
    
                // this._pDialog.then(function(oDialog){
                //     this._configDialog(oButton, oDialog);
                //     oDialog.open();
                // }.bind(this));
    
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
    });
