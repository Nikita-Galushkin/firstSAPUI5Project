sap.ui.define([
	"app/controller/BaseController",
	"app/model/formatter",
	"sap/m/MessageToast"
], function (BaseController, formatter, MessageToast) {
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
			this._addPromotedProduct();
		},

		_addPromotedProduct: function () {
			var oPromotedProduct = this.getView().getBindingContext("invoice").getObject();
			var existingPromotedEntries = JSON.parse(localStorage.getItem("allPromotedProducts"));
			if(existingPromotedEntries == null) existingPromotedEntries = [];
			localStorage.setItem("promotedProduct", JSON.stringify(oPromotedProduct));
			existingPromotedEntries.push(oPromotedProduct);
			localStorage.setItem("allPromotedProducts", JSON.stringify(existingPromotedEntries));
		},

		onBasket : function () {
			this.getRouter().navTo("cart");
		},

		onAddInBasket : function () {
			var oProduct = this.getView().getBindingContext("invoice").getObject();
			if(oProduct.Status === "A") {
				var existingEntries = JSON.parse(localStorage.getItem("allProducts"));
				if(existingEntries == null) existingEntries = [];
				localStorage.setItem("product", JSON.stringify(oProduct));
				existingEntries.push(oProduct);
				localStorage.setItem("allProducts", JSON.stringify(existingEntries));

				MessageToast.show(oProduct.name + " added to cart");
			} else if (oProduct.Status === "B") {
				MessageToast.show(oProduct.name + " out of stock");
			} else {
				MessageToast.show(oProduct.name + " discontinued");
			}
		}
	});
});