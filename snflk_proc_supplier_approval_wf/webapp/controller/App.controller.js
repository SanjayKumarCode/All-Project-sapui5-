sap.ui.define(
    [
      "./Base.controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.snflk.proc.snflkprocsupplierapprovalwf.controller.App", {
        onInit() {
          BaseController.prototype.onInit.call(this);
        }
      });
    }
  );
  