sap.ui.define([
	'sap/ui/core/format/NumberFormat'
], function (NumberFormat) {
	"use strict";

  var mStatusState = {
		"A": "Success",
		"B": "Warning",
		"C": "Error"
	};

	var formatter = {
		price: function (sValue) {
			var numberFormat = NumberFormat.getFloatInstance({
				maxFractionDigits: 2,
				minFractionDigits: 2,
				groupingEnabled: true,
				groupingSeparator: " ",
				decimalSeparator: ","
			});
			return numberFormat.format(sValue);
		},

    statusText: function (sStatus) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (sStatus) {
				case "A":
					return resourceBundle.getText("statusA");
				case "B":
					return resourceBundle.getText("statusB");
				case "C":
					return resourceBundle.getText("statusC");
				default:
					return sStatus;
			}
		},

    statusState: function (sStatus) {
			return mStatusState[sStatus] || "None";
		}
	};

	return formatter;
});