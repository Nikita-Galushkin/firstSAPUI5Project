sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"./controller/FilterDialog"
], function (UIComponent, JSONModel, FilterDialog) {
	"use strict";

	return UIComponent.extend("app.Component", {

		metadata : {
			manifest: "json"
		},

		init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// set data model
			var oData = {
				recipient : {
					name : "World"
				}
			};
			var oModel = new JSONModel(oData);
			this.setModel(oModel);

			// set dialog
			this._filterDialog = new FilterDialog(this.getRootControl());
			// create the views based on the url/hash
			this.getRouter().initialize();
		},

		exit : function () {
			this._filterDialog.destroy();
			delete this._filterDialog;
		},

		openFilterDialog : function () {
			this._filterDialog.open();
		}

	});

});