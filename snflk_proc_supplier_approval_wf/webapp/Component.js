/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",    
	  "sap/ui/model/json/JSONModel",
    "sap/f/library",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
    "./model/models",

  ],
  function (UIComponent, Device, JSONModel, LayoutLib, FlexibleColumnLayoutSemanticHelper, Models) {
    "use strict";

    return UIComponent.extend(
      "com.snflk.proc.snflkprocsupplierapprovalwf.Component",
      {
        metadata: {
          manifest: "json",
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
          // call the base component's init function
          UIComponent.prototype.init.apply(this, arguments);

          var oRouter = this.getRouter();
          // enable routing
          oRouter.initialize();

          // set the device model
          this.setModel(Models.createDeviceModel(), "device");

         

          // initialize backend model API
          this._oBackendModelAPI = this._getBackendModelAPI();

          // set size limit
          this.getModel("app").setSizeLimit(1000000);
          this.getModel("config");
        },
        getHelper: function () {
          var oFCL = this.getRootControl().byId("idLayout");
          var oSettings = {
            defaultTwoColumnLayoutType:
              LayoutLib.LayoutType.TwoColumnsBeginExpanded,
          };
          return FlexibleColumnLayoutSemanticHelper.getInstanceFor(
            oFCL,
            oSettings
          );
          //});
        },
        _getFcl: function () {
          return new Promise(
            function (resolve, reject) {
              var oFCL = this.getRootControl().byId("idLayout");
              if (!oFCL) {
                this.getRootControl().attachAfterInit(function (oEvent) {
                  resolve(oEvent.getSource().byId("idLayout"));
                }, this);
                return;
              }
              resolve(oFCL);
            }.bind(this)
          );
        },

        getStartupParameter: function (sParameterName) {
          var oStartupParameters = this._getStartupParameters();

          if (!oStartupParameters) {
            return jQuery.sap.getUriParameters().get(sParameterName);
          }

          if (
            Object.prototype.hasOwnProperty.call(
              oStartupParameters,
              sParameterName
            )
          ) {
            return oStartupParameters[sParameterName][0];
          } else {
            return null;
          }
        },

        _getMockParameter: function () {
          if (this.getStartupParameter("mock") === "true") {
            return true;
          } else {
            return false;
          }
        },

        _getStartupParameters: function () {
          var oComponentData = this.getComponentData();

          if (
            oComponentData &&
            oComponentData.hasOwnProperty("startupParameters")
          ) {
            return oComponentData.startupParameters;
          } else {
            return null;
          }
        },

        _getBackendModelAPI: function () {
          return Models.createBackendModelAPI(this, this._getMockParameter());
        },
      }
    );
  }
);
