// @ts-nocheck
/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define(
	["sap/ui/base/Object", "./provider/MockProvider", "./provider/DefaultProvider"],
	function (UI5Object, MockProvider, DefaultProvider) {
		"use strict";

		return UI5Object.extend("com.example.machineparts.model.api.BackendModelAPI", {
			_oAppModel: {},
			_oConstantsModel: {},
			_oErrorHandler: {},
			_oBundle: {},
			_aRequests: [],

			constructor: function (oComponent, bMock) {
				var bMock = false;
				this._oComponent = oComponent;
				this._oAppModel = oComponent.getModel("app");
				this._oConfigModel = oComponent.getModel("config");
				
				this._oBundle = oComponent.getModel("i18n").getResourceBundle();
				bMock = true;
				this._oProvider = bMock ? new MockProvider() : new DefaultProvider(oComponent);
			},
			getRequestList:function(){
				var oPromise;
				var bAborted = false;

				return new Promise(
					function (resolve, reject) {
						oPromise = this._oProvider.getRequestList();
						this._aRequests.push(oPromise);
						oPromise
							.then(
								function (aRequestList) { 
									this._oAppModel.setProperty(
										"/REQUEST_LIST",aRequestList
									);
									resolve(aRequestList);
								}.bind(this)
							)							
							.catch(function (oResponse) {
								bAborted = oResponse.readyState === XMLHttpRequest.UNSENT;

                                if (!bAborted) {
                                    reject({
                                        response: oResponse
                                    });
                                }
							});
					}.bind(this)					
				);
			},
			getRequestDetail:function(sEAItemPath, sID){
				debugger;
				var oPromise;
				var bAborted = false;

				return new Promise(
					function (resolve, reject) {
						oPromise = this._oProvider.getRequestDetail(sEAItemPath, sID);
						this._aRequests.push(oPromise);
						oPromise
							.then(
								function (aRequestDetail) { 
								debugger;
									this._oAppModel.setProperty(sEAItemPath +
										"/Request_Detail",aRequestDetail
									);
									resolve(aRequestDetail);
								}.bind(this)
							)							
							.catch(function (oResponse) {
								bAborted = oResponse.readyState === XMLHttpRequest.UNSENT;

                                if (!bAborted) {
                                    reject({
                                        response: oResponse
                                    });
                                }
							});
					}.bind(this)					
				);
			}
			
			
        });
	}
);