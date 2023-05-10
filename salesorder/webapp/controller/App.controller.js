// sap.ui.define(
//     [
//         "sap/ui/core/mvc/Controller"
//     ],
//     function(BaseController) {
//       "use strict";
  
//       return BaseController.extend("com.example.salesorder.controller.App", {
//         onInit() {
//         }
//       });
//     }
//   );

sap.ui.define(
  [
    "./Base.controller"
  ],
  function(BaseController) {
    "use strict";
   
    return BaseController.extend("com.example.salesorder.controller.App", {
      onInit() {
        
      debugger;
        BaseController.prototype.onInit.call(this);
      }
    });
  }
);
  