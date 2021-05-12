sap.ui.define([
	"app/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("app.controller.Categories", {
		onInit : function () {
			
		},

		onFilterInvoices : function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}
			// filter binding
			var oList = this.byId("categories");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

    onPressProductName: function(oEvent){
			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext("invoice");
			this.getRouter().navTo("productsList",{
				productListId : oCtx.getProperty("id")
			});
		}
	});
});