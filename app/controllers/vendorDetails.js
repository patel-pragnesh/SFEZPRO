var vendorData = arguments[0];

Ti.API.info("********************vendor detail***************** " + JSON.stringify(vendorData));

var vendor = vendorData.vendor;
var unit = vendorData.unit;

$.win.barColor = Alloy.Globals.navBarColor;
$.win.navTintColor = "white";
(OS_IOS) ? ($.win.title = "Vendor Details") : ($.winTitle.text = "Vendor Details");
Alloy.Globals.selectedMenuItems = [];

if (OS_ANDROID) {
	function closeWindow(evt) {
		$.getView().close();
	}

}

if (OS_IOS) {
	utils.hyperLinkOfText($.reviewsLbl);
	utils.hyperLinkOfText($.mapItLbl);
} else {
	$.reviewsLbl.html = "<u>" + "Reviews" + "</u>";
	$.reviewsLbl.autoLink = Titanium.UI.AUTOLINK_ALL;
	$.mapItLbl.html = "<u>" + "Map It" + "</u>";
	$.mapItLbl.autoLink = Titanium.UI.AUTOLINK_ALL;
}

function goToMyOrder() {

}

function checkOutNavButtonHandler() {

}


$.getView().addEventListener('close', function() {
	// Let the tabgroup know that a focus event has occurred
	// in case the parent tab needs to be refreshed
	//Alloy.Globals.tabConsumer.fireEvent('focus');
});

$.titelLbl.text = vendor.name;
// $.subTitelLbl.text=vendorData
$.detailsLbl.text = vendor.description;
$.linkLbl.text = vendor.facebook;
$.hrsValue.text = vendor.schedule + " " + vendor.hours;
$.distanceValueLbl.text = Alloy.Globals.GetDistanceFromLocation(unit.latitude, unit.longitude);

function openMenuOrder(e) {
	var menuDetail = Alloy.createController('menuOrder', {
		orderSysId : vendor.order_sys_id,
		vendorName : vendor.name
	}).getView();
	menuDetail.open();
	//Alloy.Globals.tabConsumer.activeTab.open(menuDetail);
}

function openReviews(e) {
	//Alloy.Globals.baseView.add(Alloy.createController('reviewsScreen').getView());
	var reviewList = Alloy.createController('reviewsScreen').getView();
	reviewList.open();
	//Alloy.Globals.tabConsumer.activeTab.open(reviewList);
}

function openFavScreen(e) {
	
	//Alloy.Globals.baseView.add(Alloy.createController('favorites').getView());
	//var favoriteList = Alloy.createController('favorites').getView();
	//favoriteList.open();
	//Alloy.Globals.tabConsumer.activeTab.open(favoriteList);
}

$.mapItLbl.addEventListener('click', function() {
	var mapRoute = Alloy.createController('mapRoute', {
		latitude : unit.latitude,
		longitude : unit.longitude
	}).getView();
	mapRoute.open();
});

