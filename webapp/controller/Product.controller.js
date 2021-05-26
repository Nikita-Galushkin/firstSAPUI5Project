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
			var oPromotedProductPath = this.getView().getBindingContext("invoice").getPath();
			oPromotedProduct._path = oPromotedProductPath;
			let oPromotedModel = this.getView().getModel("promotedList");
			var promotedArr = oPromotedModel.getProperty("/promotedList");
			if (promotedArr.find(item => item._path === oPromotedProductPath)) {
				return;
			} else {
				promotedArr.push(oPromotedProduct);
			}
			localStorage.setItem("allPromotedProducts", JSON.stringify(promotedArr));
		},

		onBasket : function () {
			this.getRouter().navTo("cart");
		},

		onAddInBasket : function () {
			var oProduct = this.getView().getBindingContext("invoice").getObject();
			var oProductPath = this.getView().getBindingContext("invoice").getPath();
			oProduct._path = oProductPath;
			if(oProduct.Status === "A") {
				let oCartModel = this.getView().getModel("cartList");
				var cartArr = oCartModel.getProperty("/cartList");
				if(cartArr.find(item => item._path === oProductPath)) {
					MessageToast.show(oProduct.name + " added to cart");
					cartArr.forEach((item) => {
						if(item.name === oProduct.name) {
							item.quantity += 1;
						}
					});
				} else {
					oProduct.quantity += 1;
					cartArr.push(oProduct);
					MessageToast.show(oProduct.name + " added to cart");
				}
				localStorage.setItem("allProducts", JSON.stringify(cartArr));
			} else if (oProduct.Status === "B") {
				MessageToast.show(oProduct.name + " out of stock");
			} else {
				MessageToast.show(oProduct.name + " discontinued");
			}
		}
	});
});