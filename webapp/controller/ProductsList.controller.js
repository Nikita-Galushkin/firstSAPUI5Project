sap.ui.define([
	"app/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"app/model/formatter"
], function (BaseController, Filter, FilterOperator, formatter) {
	"use strict";

	return BaseController.extend("app.controller.ProductsList", {
		formatter: formatter,

		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("productsList").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			oArgs = Number(oEvent.getParameter("arguments").productListId) - 1;
			oView = this.getView();
			oView.bindElement({
				path : "invoice>/Invoices/" + oArgs
			});
		},

		onFilterProducts : function (oEvent) {
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
		},
		
		onPressProduct : function (oEvent) {
			var oCtx = this.getView().getElementBinding("invoice").getBoundContext();
			let path = oEvent.getSource("productId").getBindingContextPath()
			let getProductArr = path.match(/\/\d/g)
			let getProductParameter = getProductArr[getProductArr.length - 1].substr(1)
			this.getRouter().navTo("product",{
				productListId : oCtx.getProperty("id"),
				productId: getProductParameter
			});
		}, 

		onListFilter : function () {
			this.getOwnerComponent().openFilterDialog();
		}
	});
});