$(function () {

	// Get your Behance API Key here:
	// https://www.behance.net/dev

	var beUsername = 'your_behance_username',
		beApiKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
		beUserAPI = '//www.behance.net/v2/users/' + beUsername + '?callback=?&api_key=' + beApiKey,
		bePerPage = 12,
		beProjectAPI = '//www.behance.net/v2/users/' + beUsername + '/projects?callback=?&api_key=' + beApiKey + '&per_page=' + bePerPage;

	////////////////////////
	// Behance User data //
	////////////////////////
	function setUserTemplate() {
		// Get handlebars template
		// And compile it (populate data)
		var userData = JSON.parse(sessionStorage.getItem('behanceUser')),
			getTemplate = $('#profile-template').html(),
			template = Handlebars.compile(getTemplate),
			result = template(userData);
		$('#header').html(result);
		$('#header .loading').remove();
	}
	if (sessionStorage.getItem('behanceUser')) {
		setUserTemplate();
	} else {
		// Load JSON-encoded data from the Behance API using a GET HTTP request.
		// Store it in sessionStorage
		$.getJSON(beUserAPI, function (user) {
			sessionStorage.setItem('behanceUser', JSON.stringify(user));
			setUserTemplate();
		});
	}

	/////////////////////////////
	// Behance Portfolio data //
	/////////////////////////////
	function setPortfolioTemplate() {
		// Get handlebars template
		// And compile it (populate data)
		var projectData = JSON.parse(sessionStorage.getItem('behanceProject')),
			getTemplate = $('#portfolio-template').html(),
			template = Handlebars.compile(getTemplate),
			result = template(projectData);
		$('#portfolio').html(result);
		$('.wrapper').removeClass('loading');
	}
	if (sessionStorage.getItem('behanceProject')) {
		setPortfolioTemplate();
	} else {
		// Load JSON-encoded data from the Behance API using a GET HTTP request.
		// Store it in sessionStorage
		$.getJSON(beProjectAPI, function (project) {
			sessionStorage.setItem('behanceProject', JSON.stringify(project));
			setPortfolioTemplate();
		});
	}

});