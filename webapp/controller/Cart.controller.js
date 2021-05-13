sap.ui.define([
	"app/controller/BaseController",
	"app/model/formatter"
], function (BaseController, formatter) {
	"use strict";

	return BaseController.extend("app.controller.Cart", {
		formatter: formatter,

		onInit: function () {
			var products = JSON.parse(localStorage.getItem("allProducts"));
			var cartList = this.getOwnerComponent().getModel("cartList").getData().cartList;
			cartList.push(products);
		},

		onPressInfo : function () {
			
		},

		onDeleteProduct : function (oEvent) {
			this._deleteListProduct(oEvent.getParameter("listItem"));

			var productTitle = oEvent.getParameter("listItem").getProperty("title");
			var arrpProducts = JSON.parse(localStorage.getItem("allProducts"));

			var newProductsList = arrpProducts.filter(element => element.name !== productTitle);
			localStorage.setItem("allProducts", JSON.stringify(newProductsList));
		},

		_deleteListProduct: function (oListItem) {
			var oListCart = this.getView().byId("cartList");
			oListCart.removeAggregation("items", oListItem);
		}
	});
});






