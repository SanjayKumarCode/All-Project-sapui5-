sap.ui.define([
    "./App.controller",
    //"./helper/Personalisation"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (AppController) {
        "use strict";

        return AppController.extend("com.snflk.proc.snflkprocsupplierapprovalwf.controller.Main", {
         // _oPerso: new Perso(),
            onInit: function () {
                AppController.prototype.onInit.call(this);
                this._oRouter.getRoute("main").attachPatternMatched(this.onViewPatternMatched, this);
                this._fetchRequestListData();
            },
            onViewPatternMatched: function () {
                this._oAppModel.updateBindings(true);
            },
            onRefresh:function(){
                this._fetchRequestListData();
            },
            _fetchRequestListData: function () {
                debugger;
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
                var oNextUIState =sap.f.LayoutType.TwoColumnsBeginExpanded,
                    oListItem = oEvent.getParameter("listItem").getBindingContext("app").getPath();
                    if (oListItem) {
                        var index = oListItem.split("/")[2];
                    } 
                    this._showMaster(oNextUIState, index);
              },  
              _showMaster: function(oNextUIState, oItem){
                this.getRouter().navTo("detail", {layout: oNextUIState, 
                  requestID: oItem});
              },  
              onRequestApprove:function(){
                sap.m.MessageToast.show("Requests Approved");
              },
              onRequestReject:function(){
                sap.m.MessageToast.show("Requests Rejected");
              },
              onExit: function () {
                this._oComponent._oBackendModelAPI.abortAllRequests();
              }
        });
    });
