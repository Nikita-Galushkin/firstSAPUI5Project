sap.ui.define([
	"sap/ui/core/UIComponent",
	"./controller/FilterDialog"
], function (UIComponent, FilterDialog) {
	"use strict";

	return UIComponent.extend("app.Component", {

		metadata : {
			manifest: "json"
		},

		init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// set dialog
			this._filterDialog = new FilterDialog(this.getRootControl());

			// create the views based on the url/hash
			this.getRouter().initialize();

			var oPromotedModel = this.getModel("promotedList");
			oPromotedModel.dataLoaded().then(function () {
				var promotedList = localStorage.getItem("allPromotedProducts");
				if(promotedList) {
					var aPromotedList = JSON.parse(promotedList);
					oPromotedModel.setProperty("/promotedList", aPromotedList);
				}
			});

			var oCartModel = this.getModel("cartList");
			oCartModel.dataLoaded().then(function () {
				var cartList = localStorage.getItem("allProducts");
				if(cartList) {
					var aCartList = JSON.parse(cartList);
					oCartModel.setProperty("/cartList", aCartList);
				}
			});
		},

		exit : function () {
			this._filterDialog.destroy();
			delete this._filterDialog;
		},

		openFilterDialog : function () {
			this._filterDialog.open();
		}

	});

});