sap.ui.define([
	"app/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("app.controller.App", {

		onOpenDialog : function () {
			this.getOwnerComponent().openHelloDialog();
		}
	});

});