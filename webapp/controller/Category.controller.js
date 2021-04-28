sap.ui.define([
	"app/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("app.controller.Category", {

		onInit : function () {
			// var oViewModel = new JSONModel({
			// 	currency: "EUR"
			// });
			// this.getView().setModel(oViewModel, "view");
		},
		onFilterInvoices : function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}
			// filter binding
			var oList = this.byId("category");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
    onPress: function(oEvent){
			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext("invoice");
			this.getRouter().navTo("productsList",{
				productId : oCtx.getProperty("id")
			});
		}
	});
});