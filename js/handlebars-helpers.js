// Format dates using plain JS
// Would be best to use http://momentjs.com/

Handlebars.registerHelper('dateFormat', function (options) {
	var date = new Date(options * 1000);
	var d = date.getDate();
	var m = date.getMonth() + 1; //Months are zero based
	var y = date.getFullYear();

	return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
});