sap.ui.define([
	"app/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("app.controller.App", {

		onInit() {
			this.getOwnerComponent()._oSplitApp = this.byId('app')
		},
		onListFilter : function () {
			this.getOwnerComponent().openHelloDialog();
		}
	});
});