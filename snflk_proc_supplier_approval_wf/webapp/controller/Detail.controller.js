sap.ui.define([
    "./App.controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (AppController) {
        "use strict";

        return AppController.extend("com.snflk.proc.snflkprocsupplierapprovalwf.controller.Detail", {
            onInit: function () {
                AppController.prototype.onInit.call(this);
                this.getRouter().getRoute("detail").attachPatternMatched(this._onDetailMatched, this);
            },
            _onDetailMatched:function(oEvent){
                var oArguments = oEvent.getParameter("arguments");
                this._oConfigModel.setProperty("/layout", "TwoColumnsBeginExpanded");
                
                this._oAppModel.setProperty("/routing/arguments/requestID", oArguments.requestID);
                if(oArguments.requestID) {
                  this._sDetailPath = "/REQUEST_LIST/"+oArguments.requestID;
                  var oDetailsItems;
                  var oDetailPage;
                  oDetailsItems = this._oAppModel.getProperty(this._sDetailPath);
                  oDetailPage = this.byId("detailPage");
                  oDetailPage.bindElement({
                    path: this._sDetailPath,
                    model: "app"
                  });
                  this._oAppModel.updateBindings(true);                
                  this._pEADetailData = this.loadEADetailData(oDetailsItems.RequestID);
                  this._pEADetailData
                    .then(
                        this.onEADetailDataLoaded.bind(this))
                    .catch(this.onEADetailDataFailed.bind(this));
              }
              
            },
            loadEADetailData:function(sID){
                var bLoaded = this._oAppModel.getProperty("/EDIT_ASSESSMENT_DETAIL");
                if (bLoaded) {
                  return Promise.resolve(
                    this._oAppModel.getProperty("/EDIT_ASSESSMENT_DETAIL")
                  );
                } else {
                  this.setBusyIndicator("page", false);
                  return this._oComponent._oBackendModelAPI.getRequestDetail(this._sDetailPath,  sID);		
                }
              },
              onEADetailDataLoaded:function(aEditAssmtDetailData){
                 this._oAppModel.setProperty(this._sDetailPath + "/EDIT_ASSESSMENT_DETAIL", oDetailsItems.RequestID)
              },
              onEADetailDataFailed:function(oResponse){
              }
        });
    });
