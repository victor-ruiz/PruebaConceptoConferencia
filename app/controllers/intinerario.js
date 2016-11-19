// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function tabHandler(e) {

}

function table1click(evt) {

	var dia = "dia1";
	var data = obtenerDetalleEvento(dia, evt.index);
	tableClick(evt, data, dia);
}

function tableClick(evt, talkDetails, dayTag) {

	var w = Alloy.createController('detalleEvento', {
		rowId : evt.row.rowId,
		talkDetails : talkDetails,
		day : dayTag
	}).getView();
	//alert("index" + JSON.stringify(talkDetails));
	w.addEventListener('open', function(evt) {
		if (OS_ANDROID) {
			//alert(JSON.stringify(talkDetails));
			var activity = evt.source.getActivity();
			var actionbar = activity.actionBar;
			actionbar.title = talkDetails.title;
			// if (talkDetails.speaker !== '') {
				// actionbar.subtitle = String.format(L('presented_by'), talkDetails.speaker);
			// };
			actionbar.displayHomeAsUp = true;
			actionbar.onHomeIconItemSelected = function() {
				evt.source.close();
			};
		};
	});
	
	Alloy.Globals.tabGroup.activeTab.open(w,{animated:true});
	
}

function table2click(evt) {
	//alert(evt.index);
	var dia = "dia2";
	var data = obtenerDetalleEvento(dia, evt.index);

}

function table3click(evt) {
	//alert(evt.index);
	var dia = "dia3";
	var data = obtenerDetalleEvento(dia, evt.index);

}

function obtenerDetalleEvento(dia, row) {
	var arreglo = [];
	var db = Ti.Database.install('/bd/conferenciasBD.sqlite', 'conferenciasBD');

	var resulset = db.execute('SELECT * FROM ' + dia + ' where rowid = ' + parseInt(row + 1));

	while (resulset.isValidRow()) {

		arreglo.push({
			time : resulset.fieldByName('horario'),
			room : resulset.fieldByName('salon'),
			title : resulset.fieldByName('titulo'),
			speaker : resulset.fieldByName('ponente'),
			description : resulset.fieldByName('descripcion'),
			ponentebiblio : resulset.fieldByName('ponentebiblio')
		});

		resulset.next();
	}
	resulset.close();

	return arreglo;

}

function tablescroll(evt) {
	evt.cancelBubble = true;
}

function ConexionBD(dia) {
	var arreglo = [];
	var data = [];
	var db = Ti.Database.install('/bd/conferenciasBD.sqlite', 'conferenciasBD');
	if (dia == 0) {
		var resulset = db.execute('SELECT * FROM dia1');

		while (resulset.isValidRow()) {

			arreglo.push({
				time : resulset.fieldByName('horario'),
				room : resulset.fieldByName('salon'),
				title : resulset.fieldByName('titulo'),
				speaker : resulset.fieldByName('ponente'),
				description : resulset.fieldByName('descripcion'),
				ponentebiblio : resulset.fieldByName('ponentebiblio')
			});

			resulset.next();
		}
		for (var i = 0; i < arreglo.length; i++) {

			var row = Alloy.createController('fila', arreglo[i]).getView();
			data.push(row);
		};
		resulset.close();

		return data;
	} else {
		if (dia === 1) {
			var resulset = db.execute('SELECT * FROM dia2');

			var index = 0;
			while (resulset.isValidRow()) {

				arreglo.push({
					index : index,
					time : resulset.fieldByName('horario'),
					room : resulset.fieldByName('salon'),
					title : resulset.fieldByName('titulo'),
					speaker : resulset.fieldByName('ponente'),
					description : resulset.fieldByName('descripcion'),
					ponentebiblio : resulset.fieldByName('ponentebiblio')
				});
				index++;
				resulset.next();
			}
			for (var i = 0; i < arreglo.length; i++) {

				var row = Alloy.createController('fila', arreglo[i]).getView();
				data.push(row);
			};
			resulset.close();

			return data;
		} else {
			var resulset = db.execute('SELECT * FROM dia3');

			while (resulset.isValidRow()) {

				arreglo.push({
					time : resulset.fieldByName('horario'),
					room : resulset.fieldByName('salon'),
					title : resulset.fieldByName('titulo'),
					speaker : resulset.fieldByName('ponente'),
					description : resulset.fieldByName('descripcion'),
					ponentebiblio : resulset.fieldByName('ponentebiblio')
				});

				resulset.next();
			}
			for (var i = 0; i < arreglo.length; i++) {

				var row = Alloy.createController('fila', arreglo[i]).getView();
				data.push(row);
			};
			resulset.close();

			return data;
		};
	};

}

function accesoQR(e) {
	//alert('me presionaste');
	if (OS_IOS) {
		Alloy.Globals.tabGroup.openWindow(Alloy.createController('viewQR').getView());
	} else if (OS_ANDROID) {
		Alloy.createController('viewQR').getView().open();
	}
}

function clickmap(evt) {
	var lugar = $.lblDir.getText();
	Ti.Platform.openURL('https://maps.google.com/maps?q=' + encodeURIComponent(lugar));
}

function onClickTel(evt) {
	var tel = $.lblTel.getText();

	if (OS_IOS) {
		// canOpenURL is iOS only
		if (Ti.Platform.canOpenURL('tel://' + tel)) {
			tel = tel.replace("(0)", "").replace("(", "").replace(")", "").replace("-", "").replace("/", "").split(' ').join('');
			Ti.Platform.openURL('tel://' + tel);
		} else {
			alert(L('no_phone'));
		}
	} else {
		tel = tel.replace("(0)", "").replace("(", "").replace(")", "").replace("-", "").replace("/", "").split(' ').join('');
		Ti.Platform.openURL('tel://' + tel);
	}

}



$.paging.setScrollableView($.scrollableView);

Alloy.Globals.tabGroup.open();
