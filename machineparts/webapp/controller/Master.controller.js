sap.ui.define([
	"./Base.controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox"
], function (BaseController, Filter, FilterOperator, MessageBox) {
	"use strict";

	return BaseController.extend("com.example.machineparts.controller.Master", {
		onInit: function () {
			BaseController.prototype.onInit.call(this);

			 
			this._oRouter.getRoute("master").attachPatternMatched(this.onViewPatternMatched, this);
			this._fetchRequestListData(); //method called to search the data
		},
		onViewPatternMatched: function () {
			this._oAppModel.updateBindings(true);
		},
		_fetchRequestListData: function () {
			
			if (this._oComponent._oBackendModelAPI) {
  
			  this._oComponent._oBackendModelAPI
				.getRequestList()
				.then(this.onRequestLoaded.bind(this))
				.catch(this.onRequestLoadFailed.bind(this));
			}
		  },
		  onRequestLoaded: function () {
			this._postProcessInitialDataLoad(true);
		  },
  
		  onRequestLoadFailed: function (oResponse) {
			this._postProcessInitialDataLoad(false);
		  },
		  _postProcessInitialDataLoad: function () {
			var aRequest =
			  this._oAppModel.getProperty("/REQUEST_LIST") || [];
		  },

		onListItemPress:function(oEvent){
			var oNextUIState = sap.f.LayoutType.TwoColumnsMidExpanded;
			var oListItem =sap.ui.getCore().byId(oEvent.getParameter("id")).getBindingContext('app').sPath;
				if (oListItem) {
					var index = oListItem.split("/")[2];
				} 
				this._showDetail(oNextUIState, index);
		  },  
		  _showDetail: function(oNextUIState, oItem){
	
			this.getRouter().navTo("detail", {layout: oNextUIState, 
				COMMODITY_NAME_SERVICES: oItem});
		  },  
		  onRequestApprove:function(){
			sap.m.MessageToast.show("Requests Approved");
		  },
		  onRequestReject:function(){
			sap.m.MessageToast.show("Requests Rejected");
		  },
		  onExit: function () {
			this._oComponent._oBackendModelAPI.abortAllRequests();
		  },

			  onSync: function () {
				  MessageBox.information("This functionality is not ready yet.", {title: "Aw, Snap!"});
			  },
			  //Searchbar
			  onSearch: function (oEvent) {
				  var oTableSearchState = [],
					  sQuery = oEvent.getParameter("query");
	  
				  if (sQuery && sQuery.length > 0) {
					  oTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
				  }
				  this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
			  }

	});
});
