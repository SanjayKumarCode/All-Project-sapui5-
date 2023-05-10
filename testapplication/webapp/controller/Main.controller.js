sap.ui.define([  
'sap/ui/core/mvc/Controller', 
'sap/ui/core/util/Export',
'sap/ui/core/util/ExportTypeCSV',
'sap/ui/model/json/JSONModel',

"sap/ui/core/Fragment"




],
function(  Controller, Export, ExportTypeCSV, JSONModel, ) {
"use strict";

var TableController = Controller.extend(
"com.example.testapplication.controller.Main", {

onInit : function() {
var oModel = new JSONModel(sap.ui.require.toUrl("com/example/testapplication/model/data.json"));
this.getView().setModel(oModel);
},
// onAddRow : function() {
// var oTab = this.getView().byId('tableId');
// oTab.getModel().getData().ProductCollection.push({});
// oTab.getModel().refresh(true);
// },
onAddRow: function (oEvent) {                              
    var oItem = new sap.m.ColumnListItem({
        cells: [new sap.m.Input({       
        }), new sap.m.Input(),new sap.m.Input(), new sap.m.Input(), new sap.m.Input({
            showValueHelp: true
 
        }), ]
   });

   var oTable = this.getView().byId("tableId");
   oTable.addItem(oItem);
},

onDeleteRow : function() {
var oTab = this.getView().byId('tableId');
oTab.getModel().getData().ProductCollection.pop();
oTab.getModel().refresh(true);
},
// dialog

onSelectDialogPress: function (oEvent) {
    var oButton = oEvent.getSource(),
        oView = this.getView();

    if (!this._pDialog) {
        this._pDialog = Fragment.load({
            id: oView.getId(),
            name: "com.example.testapplication.view.fragment.Dialog",
            controller: this
        }).then(function (oDialog){
            oDialog.setModel(oView.getModel());
            return oDialog;
        });
    }

    this._pDialog.then(function(oDialog){
        this._configDialog(oButton, oDialog);
        oDialog.open();
    }.bind(this));

},

onDataExport : function(oEvent) {

    var oExport = new Export({
        exportType : new ExportTypeCSV({
            separatorChar : ",",
            charset: "utf-8"

        }),

        
        models : this.getView().getModel(),

       
        rows : {
            path : "/ProductCollection"
        },

columns : [{
            name : "ID",
            template : {
                content : "{Country_Id}"
            }
        }, {
            name : "Name",
            template : {
                content : "{Name1}"
            }
        }, {
            name : "Population",
            template : {
                content : "{Population}"
            }
        },    
        {
            name : "Area",
            template : {
                content : "{Area} "
            }
        }, {
            name : "Countries",
            template : {
                content : "{Country}"
            },
            name : "Price",
            template : {
                content : "{Price}"
            }
        }]
    });

    
    oExport.saveFile().catch(function(oError) {
        MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
    }).then(function() {
        oExport.destroy();
    });
},

});

return TableController;

});