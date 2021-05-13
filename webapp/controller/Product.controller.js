sap.ui.define([
	"app/controller/BaseController",
	"app/model/formatter"
], function (BaseController, formatter) {
	"use strict";

	return BaseController.extend("app.controller.Product", {
		formatter: formatter,

		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("product").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path : "invoice>/Invoices/" + (Number(oArgs.productListId) - 1) + "/product/" + Number(oArgs.productId)
			});
		},

		onBasket : function () {
			this.getRouter().navTo("cart");
		},

		onAddInBasket : function () {
			var oProduct = this.getView().getBindingContext("invoice").getObject();
			// var promotedList = this.getView().getModel("promotedList").getData().promotedList;
			// promotedList.push(oProduct);

			// var cartList = this.getView().getModel("cartList").getData().cartList;
			// cartList.push(oProduct);

			// var cartList = this.getOwnerComponent().getModel("cartList").getData().cartList;
			// cartList.push(oProduct);

			var existingEntries = JSON.parse(localStorage.getItem("allProducts"));
			if(existingEntries == null) existingEntries = [];
			localStorage.setItem("product", JSON.stringify(oProduct));
			existingEntries.push(oProduct);
			localStorage.setItem("allProducts", JSON.stringify(existingEntries));

			
		}
	});
});