sap.ui.define(
  [
    "./Base.controller",
      "sap/ui/core/mvc/Controller"
  ],
  function(BaseController) {
    "use strict";

    return BaseController.extend("com.example.machineparts.controller.App", {
      onInit() {
        BaseController.prototype.onInit.call(this);
      }
    });
    
  }
);
  