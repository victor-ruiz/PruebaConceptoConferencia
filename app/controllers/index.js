Alloy.Globals.tabGroup = $.index;

//empieza desdel 0 .. n-1

$.index.addEventListener('open', function(evt) {
	if (OS_ANDROID) {
		// var activity = evt.source.getActivity();
		// var actionbar = activity.actionBar;
		// actionbar.title = "Conferencia Alloy";
		//actionbar.icon = "appicon.png";

		var dataDia1 = ConexionBD(0);
		$.day1table.setData(dataDia1);

		var dataDia2 = ConexionBD(1);
		$.day2table.setData(dataDia2);

		var dataDia3 = ConexionBD(2);
		$.day3table.setData(dataDia3);

	};
});