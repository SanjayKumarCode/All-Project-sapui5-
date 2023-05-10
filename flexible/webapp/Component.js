/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "sap/ui/model/json/JSONModel",
        "com/example/flexible/model/models"
    ],
    function (UIComponent, Device,JSONModel, models) {
        "use strict";

        return UIComponent.extend("com.example.flexible.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            // init: function () {
            //     // call the base component's init function
            //     UIComponent.prototype.init.apply(this, arguments);

            //     // enable routing
            //     this.getRouter().initialize();

            //     // set the device model
            //     this.setModel(models.createDeviceModel(), "device");

     

            // }

            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                var oProductsModel;
                oProductsModel = new JSONModel(sap.ui.require.toUrl('com/example/flexible/mockdata/Notification.json'));
			oProductsModel.setSizeLimit(1000);
			this.setModel(oProductsModel, 'Notification');
            }
        });
    }
);