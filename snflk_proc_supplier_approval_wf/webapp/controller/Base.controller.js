sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    "sap/ui/core/message/Message",
	"sap/ui/core/library",
	"sap/ui/core/Fragment",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, MessageBox, Message, library, Fragment, Formatter) {
        "use strict";

        return Controller.extend("com.snflk.proc.snflkprocsupplierapprovalwf.controller.Base", {

             formatter: Formatter,

           // oFragments: {},
            // oUtils: Utils,
            onInit: function () {
                //this._oConstantsModel = this.getModel("constants");
				this._oConfigModel = this.getModel("config");
				this._oAppModel = this.getModel("app");
				this._oComponent = this.getOwnerComponent();
				this._oRouter = this.getRouter();
				//this._oValidation = new Validation(this);
				this._oAppModel.setSizeLimit(this._oConfigModel.getProperty("/MODEL_SIZE_LIMIT"));
            },            

            getModel: function (sName) {
                var oModel = this.getView().getModel(sName);
                if (!oModel) {
                    oModel = this.getOwnerComponent().getModel(sName);
                }
                return oModel;
            },

            setModel: function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            },
            
            getText: function (sText, aParams) {
                return this.getModel("i18n").getResourceBundle().getText(sText, aParams);
            },

            navTo: function (sTarget, oParameters, bNoHistory) {
                this.getRouter().navTo(sTarget, oParameters, bNoHistory);
            },

            getRouter: function () {
                return this.getOwnerComponent().getRouter();
            },

            getEventBus: function () {
                return sap.ui.getCore().getEventBus();
            },

            getEventBusChannel: function () {
                return this._oConstantsModel.getProperty("/EVENT/CHANNEL");
            },

            setBusyIndicator: function (sBusyIndicatorId, bBusy) {
				this._oAppModel.setProperty("/BUSY_INDICATORS/" + sBusyIndicatorId, bBusy);
			},

			setVisibility: function (sControl, bVisible) {
				this._oAppModel.setProperty("/VISIBILITY/" + sControl, bVisible);
			},

            getRootModulePath: function () {
                return jQuery.sap.getModulePath("com.snflk.proc.snflkprocsupplierapprovalwf");
            },           

            showMessage: function (sType, sTextKey, oParams, fnCallback) {
                MessageBox[sType](jQuery.sap.formatMessage(this.getText(sTextKey), oParams), {
                    onClose: fnCallback
                });
            },

            showMessageToast: function (sText, oParams) {
                sap.m.MessageToast.show(sText, oParams);
            },

            setBusyIndicator: function (sBusyIndicatorId, bBusy) {
                this._oAppModel.setProperty("/busyIndicators/" + sBusyIndicatorId, bBusy);
            },
            getBackendModelAPI: function () {
                return this.getOwnerComponent()._oBackendModelAPI;
            },
            _getMessagePopover: function () {
                var oView = this.getView();
    
                // create popover lazily (singleton)
                if (!this._pMessagePopover) {
                    this._pMessagePopover = Fragment.load({
                        id: oView.getId(),
                        name: "com.snflk.proc.snflkprocsupplierapprovalwf.view.fragment.MessagePopover"
                    }).then(function (oMessagePopover) {
                        oView.addDependent(oMessagePopover);
                        return oMessagePopover;
                    });
                }
                return this._pMessagePopover;
            }
            
        });
    });
