function createFavorites() {
	var dataRows = [];
	for (var i = 0; i < 8; i++) {

		var row = Ti.UI.createTableViewRow({
			height : 70,
			left : 0,
			right : 0,
			backgroundColor : Alloy.Globals.mapsBackgroundColor,
		});

		var iconImg = Ti.UI.createImageView({
			left : Alloy.Globals.navigatorIconPadding,
			height : 48,
			width : 48,
			bottom : 10,
			top : 10,
			backgroundColor : "#fff",
			image : "/images/foodtruckBlack.png"
		});

		row.add(iconImg);

		var titleLbl = Ti.UI.createLabel({
			left : 80,
			top : 5,
			text : "Pacos Tacos",
			font: {
				fontSize: 14,
				fontFamily: 'Raleway',
				fontWeight:"Bold"
			},
			color : Alloy.Globals.buttonColor,
			height : 20,
			width : 140,
		});

		row.add(titleLbl);

		var subTitleLbl = Ti.UI.createLabel({
			left : 80,
			top : 25,
			text : "Churritos",
			font: {
				fontSize: 12,
				fontFamily: 'Raleway',
				fontWeight:"Medium"
			},
			color : "#000",
			height : 20,
			width : 140,
		});

		row.add(subTitleLbl);

		var ratingLbl = Ti.UI.createLabel({
			left : 80,
			top : 45,
			text : "4.8/5.0",
			font: {
				fontSize: 11,
				fontFamily: 'Raleway',
				fontWeight:"Medium"
			},
			color : Alloy.Globals.buttonColor,
			height : 20,
			width : 140,
		});

		row.add(ratingLbl);

		var openLbl = Ti.UI.createLabel({
			left : 220,
			top : 45,
			text : "open",
			font: {
				fontSize: 11,
				fontFamily: 'Raleway',
				fontWeight:"Medium"
			},
			color : Alloy.Globals.buttonColor,
			height : 20,
			width : 140,
		});

		row.add(openLbl);

		var miLbl = Ti.UI.createLabel({
			right : 10,
			top : 45,
			text : "0.3 mi",
			font: {
				fontSize: 11,
				fontFamily: 'Raleway',
				fontWeight:"Medium"
			},
			color : "#000",
			height : 20,
			width : 60,
		});

		row.add(miLbl);

		dataRows.push(row);
	}

	$.favoritesTable.setData(dataRows);
	$.favoritesTable.addEventListener("click", function(e) {
		// Alloy.Globals.baseView.add(Alloy.createController('vendorDetails').getView());
	});

}

createFavorites();
