sap.ui.define(
    [
      "./Base.controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.example.machineparts.controller.DetailDetail", {
        onInit: function () {
          BaseController.prototype.onInit.call(this);
          this.getRouter().getRoute("detaildetail").attachPatternMatched(this._onDetailMatched, this);
        },
        _onDetailMatched:function(oEvent){
        
          var oArguments = oEvent.getParameter("arguments");
          this._oConfigModel.setProperty("/layout", "ThreeColumnsMidExpanded");
          
          this._oAppModel.setProperty("/routing/arguments/COMMODITY_NAME_SERVICES", oArguments.COMMODITY_NAME_SERVICES);
          if(oArguments.COMMODITY_NAME_SERVICES) {
            this._sDetailPath = "/REQUEST_LIST/"+oArguments.COMMODITY_NAME_SERVICES;
            var oDetailsItems;
            var oDetailPage;
            oDetailsItems = this._oAppModel.getProperty(this._sDetailPath);
            oDetailPage = this.byId("detaildetailPage");
            oDetailPage.bindElement({
              path: this._sDetailPath,
              model: "app"
            });
            this._oAppModel.updateBindings(true);                
             this._pEADetailData = this.loadEADetailData(oDetailsItems.COMMODITY_NAME_SERVICES);
             this._pEADetailData
               .then(
                   this.onEADetailDataLoaded.bind(this))
               .catch(this.onEADetailDataFailed.bind(this));
          }
        },
        loadEADetailData:function(sID){
            var bLoaded = this._oAppModel.getProperty("/REQUEST_LIST");
            if (bLoaded) {
              return Promise.resolve(
                this._oAppModel.getProperty("/REQUEST_LIST")
              );
            } else {
              this.setBusyIndicator("page", false);
              return this._oComponent._oBackendModelAPI.getRequestDetail(this._sDetailPath,  sID);		
            }
          },
          onEADetailDataLoaded:function(){
             this._oAppModel.setProperty(this._sDetailPath + "/REQUEST_LIST", oDetailsItems.RequestID)
          },
          onEADetailDataFailed:function(oResponse){
          }       
      });
    }
  );