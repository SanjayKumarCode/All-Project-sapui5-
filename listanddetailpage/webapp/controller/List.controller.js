sap.ui.define([
    "sap/ui/core/mvc/Controller",
"sap/ui/model/Filter",
"sap/ui/model/FilterOperator",
'sap/ui/model/json/JSONModel'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator,JSONModel) {
        "use strict";

        return Controller.extend("com.example.listanddetailpage.controller.List", {
            onInit: function () {
                var oModel = new JSONModel(sap.ui.require.toUrl("com/example/listanddetailpage/model/products.json"));
                this.getView().setModel(oModel);
            },
          

            handleSearch: function (evt) {
                // create model filter
                var filters = [];
                var query = evt.getParameter("query");
                if (query && query.length > 0) {
                    filters.push(new Filter({
                        path: "ProductName",
                        operator: FilterOperator.Contains,
                        value1: query
                    }));
                }
                 // update list binding
            var list = this.getView().byId("list");
            var binding = list.getBinding("items");
            binding.filter(filters);
        },
        handleListItemPress: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
            oRouter.navTo("Detail", {
                productId: selectedProductId
            });
        }


        });
    });
