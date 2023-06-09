/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/example/machineparts/model/models"
],
function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("com.example.machineparts.Component", {
        metadata: {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // enable routing
            this.getRouter().initialize();

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
             // *set size limit
             this.getModel("app");
             this.getModel("config");

             // initialize backend model API
             this._oBackendModelAPI = this._getBackendModelAPI();

       
     },
     _getBackendModelAPI: function () {
         var bMock = true;
         return models.createBackendModelAPI(this, bMock);
       }
        
        
    });
}
);