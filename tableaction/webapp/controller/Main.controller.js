sap.ui.define([
    'sap/m/MessageBox',  
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/util/Export',
    'sap/ui/core/util/ExportTypeCSV',
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/Fragment',
    "sap/ui/core/syncStyleClass"

], function(MessageBox, Controller, Export, ExportTypeCSV, JSONModel,Fragment, syncStyleClass) {
"use strict";

var TableController = Controller.extend("com.example.tableaction.controller.Main", {

    onInit : function() {
        // set explored app's demo model on this sample
        var oModel = new JSONModel(sap.ui.require.toUrl("com/example/tableaction/model/api/mockdata/table.json"));
        this.getView().setModel(oModel);
      
    },

    onDataExport : function(oEvent) {

        var oExport = new Export({
            exportType : new ExportTypeCSV({
                separatorChar : ",",
                charset: "utf-8"

            }),

            
            models : this.getView().getModel(),

           
            rows : {
                path : "/CountryCollection"
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
                }
            }]
        });

        
        oExport.saveFile().catch(function(oError) {
            MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
        }).then(function() {
            oExport.destroy();
        });
    },

// onDelete: function(oEvent) {
//     var oTab = this.getView().byId("tableId1");
//     oTab.getModel().getData().CountryCollection.pop();
//     oTab.getModel().refresh(true);
//     } 
onDelete: function (oEvent) {
    var oTable = this.getView().byId("tableId1");
    var aSelectedItems = oTable.getSelectedItems();

    for(var i=0; i<aSelectedItems.length; i++){
        oTable.removeItem(aSelectedItems[i])
    }
},
onCopyColumn: function(oEvent) {
    var oTable = this.byId("tableId1");
    var aSelectedItems = oTable.getSelectedItems();
    var aData = oTable.getModel().getProperty("/CountryCollection");
    var aNewData = [];
    for (var i = 0; i < aSelectedItems.length; i++) {
        var oItem = aSelectedItems[i];
        var oItemData = oItem.getBindingContext().getObject();
        var oNewData = {};
        for (var sKey in oItemData) {
            oNewData[sKey] = oItemData[sKey];
        }
        aNewData.push(oNewData);
    }
    var aCombinedData = aData.concat(aNewData);
    oTable.getModel().setProperty("/CountryCollection", aCombinedData);
},
// Define a change event handler for the dropdown control
handleSelectionChange: function(oEvent) {
    var sSelectedValue = oEvent.getSource().getSelectedKey();
    var oContext = oEvent.getSource().getBindingContext();
    oContext.getModel().setProperty(oContext.getPath() + "/CountryCollection", sSelectedValue);
    oContext.getModel().submitChanges();
  },

  onDropdownChange: function (oEvent) {
    this._pDialog.then(function(oDialog){
        oDialog.close();
    });
},






//  add a new row
onAdd: function (oEvent) {                              
    var oItem = new sap.m.ColumnListItem({
        cells: [new sap.m.Input({       
        }), new sap.m.Input(), new sap.m.Input(), new sap.m.Input({
            showValueHelp: true
 
        }), ]
   });

   var oTable = this.getView().byId("tableId1");
   oTable.addItem(oItem);
},

onCheckBoxSelect: function (oEvent) {
    var bFixedLayout = oEvent.getParameter("selected");
    var oTable = oEvent.getSource().getParent().getParent();
    oTable.setFixedLayout(bFixedLayout);
},
// open Dialog
onOpenPressed: function (oEvent) {
    var oView = this.getView();
    if (!this._pDialog) {
        this._pDialog = Fragment.load({
            id: oView.getId(),
            name: "com.example.tableaction.view.fragment.DialogHelp",
            controller: this
        }).then(function(oDialog){
            oView.addDependent(oDialog);
            return oDialog;
        });
    }

    this._pDialog.then(function(oDialog){
       
        syncStyleClass("sapUiSizeCompact", oView, oDialog);
        oDialog.open();
    });
},

onClosePressed: function (oEvent) {
    this._pDialog.then(function(oDialog){
        oDialog.close();
    });
}

// for delete row
// onDelete: function (oEvent) {
//     var oTable = this.getView().byId("tableId1");
//     oTable.removeItem(oEvent.getParameter("listItem"));
// }
});


return TableController;

});
