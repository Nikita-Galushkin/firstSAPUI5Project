sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment"
], function (ManagedObject, Fragment) {
	"use strict";

	return ManagedObject.extend("app.controller.FilterDialog", {
		constructor : function (oView) {
			this._oView = oView;
		},

		exit : function () {
			delete this._oView;
		},

		open : function () {
			var oView = this._oView;
			// create dialog lazily
			if (!this.pDialog) {
				var oFragmentController = {
					onCloseDialog : function () {
						oView.byId("filterDialog").close();
					}
				};
				// load asynchronous XML fragment
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "app.view.FilterDialog",
					controller: oFragmentController
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},

		// _applyFilter : function (oEvent) {
		// 	var oList = this.byId("productsList"),
		// 		oBinding = oList.getBinding("items"),
		// 		aSelectedFilterItems = oEvent.getParameter("filterItems"),
		// 		oCustomFilter =  this._oDialog.getFilterItems()[1],
		// 		oFilter,
		// 		oCustomKeys = {},
		// 		aFilters = [],
		// 		aAvailableFilters = [],
		// 		aPriceFilters = [],
		// 		aSupplierFilters = [];

		// 	// Add the slider custom filter if the user selects some values
		// 	if (oCustomFilter.getCustomControl().getAggregation("content")[0].getValue() !== oCustomFilter.getCustomControl().getAggregation("content")[0].getMin() ||
		// 		oCustomFilter.getCustomControl().getAggregation("content")[0].getValue2() !== oCustomFilter.getCustomControl().getAggregation("content")[0].getMax()) {
		// 		aSelectedFilterItems.push(oCustomFilter);
		// 	}
		// 	aSelectedFilterItems.forEach(function (oItem) {
		// 		var sFilterKey = oItem.getProperty("key"),
		// 			iValueLow,
		// 			iValueHigh;
		// 		switch (sFilterKey) {
		// 			case "Available":
		// 				oFilter = new Filter("Status", FilterOperator.EQ, "A");
		// 				aAvailableFilters.push(oFilter);
		// 				break;

		// 			case "OutOfStock":
		// 				oFilter = new Filter("Status", FilterOperator.EQ, "B");
		// 				aAvailableFilters.push(oFilter);
		// 				break;

		// 			case "Discontinued":
		// 				oFilter = new Filter("Status", FilterOperator.EQ, "C");
		// 				aAvailableFilters.push(oFilter);
		// 				break;

		// 			case "Price":
		// 				iValueLow = oItem.getCustomControl().getAggregation("content")[0].getValue();
		// 				iValueHigh = oItem.getCustomControl().getAggregation("content")[0].getValue2();
		// 				oFilter = new Filter("currentPrice", FilterOperator.BT, iValueLow, iValueHigh);
		// 				aPriceFilters.push(oFilter);
		// 				oCustomKeys["priceKey"] = {Price: true};
		// 				break;

		// 			default:
		// 				oFilter = new Filter("supplierName", FilterOperator.EQ, sFilterKey);
		// 				aSupplierFilters.push(oFilter);

		// 		}
		// 	});
		// 	if (aAvailableFilters.length > 0) {
		// 		aFilters.push(new Filter({filters: aAvailableFilters}));
		// 	}
		// 	if (aPriceFilters.length > 0) {
		// 		aFilters.push(new Filter({filters: aPriceFilters}));
		// 	}
		// 	if (aSupplierFilters.length > 0) {
		// 		aFilters.push(new Filter({filters: aSupplierFilters}));
		// 	}
		// 	oFilter = new Filter({filters: aFilters, and: true});
		// 	if (aFilters.length > 0) {
		// 		oBinding.filter(oFilter);
		// 		this.byId("categoryInfoToolbar").setVisible(true);
		// 		var sText = this.getResourceBundle().getText("filterByText") + " ";
		// 		var sSeparator = "";
		// 		var oFilterKey = oEvent.getParameter("filterCompoundKeys");
		// 		var oKeys = $.extend(oFilterKey, oCustomKeys);
		// 		for (var key in oKeys) {
		// 			if (oKeys.hasOwnProperty(key)) {
		// 				sText = sText + sSeparator  + this.getResourceBundle().getText(key, [this._iLowFilterPreviousValue, this._iHighFilterPreviousValue]);
		// 				sSeparator = ", ";
		// 			}
		// 		}
		// 		this.byId("categoryInfoToolbarTitle").setText(sText);
		// 	} else {
		// 		oBinding.filter(null);
		// 		this.byId("categoryInfoToolbar").setVisible(false);
		// 		this.byId("categoryInfoToolbarTitle").setText("");
		// 	}
		// },

		// /**
		//  * Open the filter dialog
		//  */
		// onMasterListFilterPressed: function () {
		// 	this._getDialog().open();
		// },

		// /**
		//  * Define and return {sap.ui.xmlfragment}
		//  * @private
		//  */
		// _getDialog: function () {
		// 	if (!this._oDialog) {
		// 		this._oDialog = sap.ui.xmlfragment("app.view.FilterDialog", this);
		// 		this.getView().addDependent(this._oDialog);
		// 	}
		// 	return this._oDialog;
		// },

		// /**
		//  * Updates the previous slider values
		//  * @param {sap.ui.base.Event} oEvent the press event of the sap.m.Button
		//  */
		// handleConfirm: function (oEvent) {
		// 	var oCustomFilter = this._getDialog().getFilterItems()[1];
		// 	var oSlider = oCustomFilter.getCustomControl().getAggregation("content")[0];
		// 	this._iLowFilterPreviousValue = oSlider.getValue();
		// 	this._iHighFilterPreviousValue = oSlider.getValue2();
		// 	this._applyFilter(oEvent);
		// },

		// /**
		//  * Sets the slider values to the previous ones
		//  * Updates the filter count
		//  */
		// handleCancel: function () {
		// 	var oCustomFilter = this._oDialog.getFilterItems()[1];
		// 	var oSlider = oCustomFilter.getCustomControl().getAggregation("content")[0];
		// 	oSlider.setValue(this._iLowFilterPreviousValue).setValue2(this._iHighFilterPreviousValue);
		// 	if (this._iLowFilterPreviousValue > oSlider.getMin() || this._iHighFilterPreviousValue !== oSlider.getMax()) {
		// 		oCustomFilter.setFilterCount(1);
		// 	} else {
		// 		oCustomFilter.setFilterCount(0);
		// 	}
		// },

		// /**
		//  * Updates filter count if there is a change in one of the slider values
		//  * @param {sap.ui.base.Event} oEvent the change event of the sap.m.RangeSlider
		//  */
		// handleChange: function (oEvent) {
		// 	var oCustomFilter = this._getDialog().getFilterItems()[1];
		// 	var oSlider = oCustomFilter.getCustomControl().getAggregation("content")[0];
		// 	var iLowValue = oEvent.getParameter("range")[0];
		// 	var iHighValue = oEvent.getParameter("range")[1];
		// 	if (iLowValue !== oSlider.getMin() || iHighValue !== oSlider.getMax()) {
		// 		oCustomFilter.setFilterCount(1);
		// 	} else {
		// 		oCustomFilter.setFilterCount(0);
		// 	}

		// },

		// /**
		//  * Reset the price custom filter
		//  */
		// handleResetFilters: function () {
		// 	var oCustomFilter = this._oDialog.getFilterItems()[1];
		// 	var oSlider = oCustomFilter.getCustomControl().getAggregation("content")[0];
		// 	oSlider.setValue(oSlider.getMin());
		// 	oSlider.setValue2(oSlider.getMax());
		// 	oCustomFilter.setFilterCount(0);
		// }
	});
});