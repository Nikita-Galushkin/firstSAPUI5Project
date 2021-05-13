sap.ui.define([
	'app/controller/BaseController',
	'sap/ui/model/json/JSONModel',
	"app/model/formatter"
], function (BaseController, JSONModel, formatter) {
	"use strict";

	return BaseController.extend("app.controller.Home", {
		formatter: formatter,

		onInit: function () {
			var oViewModel = new JSONModel({
				welcomeCarouselShipping: 'images/shipping.jpg',
				welcomeCarouselInviteFriend: 'images/inviteFriend.jpg',
				welcomeCarouselTablet: 'images/tablet.jpg',
				welcomeCarouselCreditCard: 'images/creditCard.jpg'
			});
			this.getView().setModel(oViewModel, "view");

			var products = JSON.parse(localStorage.getItem("allPromotedProducts"));

			var promotedList = this.getOwnerComponent().getModel("promotedList").getData().promotedList;
			promotedList.push(products);
		},

		onBasket : function () {
			this.getRouter().navTo("cart");
		},
	});
});