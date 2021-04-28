sap.ui.define([
	"app/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("app.controller.Category", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("productsList").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			oArgs = Number(oEvent.getParameter("arguments").productId);
			oView = this.getView();
			
			oView.bindElement({
				path : "invoice>/Invoices/productsList/" + oArgs
			});
		},

		onFilterDetails : function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));
			}
			// filter binding
			var oList = this.byId("productsList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});