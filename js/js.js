$(document).ready( function() {
	var api_key = 'ae2208496bd2075d615cab8f38594b60';
	var username = window.location.href.split("?",2)[1];
	//var username = 'bonoguy';
	var search_length = 7;

	var d = new Date();
	d.setDate(d.getDate() - search_length);
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var date = year.toString() + ((month < 10) ? '0' + month.toString() : month.toString()) + ((day < 10) ? '0' + day.toString() : day.toString());
	
	var url = 'http://api.trakt.tv/user/calendar/shows.json/' + api_key + '/' + username + '/' + date + '/' + search_length;
	var upcoming_url = 'http://api.trakt.tv/user/calendar/shows.json/' + api_key + '/' + username + '/?days=14';
	console.log(day);
	console.log(url);
	$.ajax( {
		type: 'POST',
		crossDomain: true,
		dataType: 'jsonp',
		url: url,
		success: showParse
	});

	$.ajax( {
		type: 'POST',
		crossDomain: true,
		dataType: 'jsonp',
		url: upcoming_url,
		success: upcomingShowParse
	});

});

function showParse(data)
{
	$.each(data, function(i, dates){
		 var html = "<div class='row'>" +
	 			"<div class='large-12 columns'>" +
	 				"<h2>" + dates.date + "</h2>" +
	 			"</div>" +
	 		"</div>";
		$.each(dates.episodes, function(j, episodes){
			html += "<div class='row'>" +
					"<div class='small-12 large-3 columns show-for-large-up' id='show-" + i + "-" + j + "-art'></div>" +
					"<div class='small-12 large-9 columns'>" +
						"<div class='row'>" +
							"<h3><a href='" + episodes.show.url + "'>" + episodes.show.title + "</a>" + 
								"<small> Season - " + episodes.episode.season + ', Episode - ' + episodes.episode.number + "</small>" +
							"</h3>" +
						"</div>" +
						"<div class='row'>" +
							"<h3><small>" + episodes.episode.title + "</small></h3>" +
							"<p>" + episodes.episode.overview + "</p>" +
						"</div>" +
						"<div class='row'>" +
							"<p><a href='http://thepiratebay.se/search/" + 
								episodes.show.title + ' ' +
								'S' + ((episodes.episode.season < 10) ? '0' + episodes.episode.season.toString() : episodes.episode.season.toString()) +
								 'E' + ((episodes.episode.number < 10) ? '0' + episodes.episode.number.toString() : episodes.episode.number.toString()) + 
								 "/0/99/0'>Search Pirate Bay</a></p>" +
						"</div>" +
					"</div>" +
				"</div>";
			html += "<div class='row'><br></div>";
			$('<img src="' + episodes.show.images.poster + '" width="300" height="300">').load(function() {$(this).appendTo('#show-' + i + "-" + j + '-art');});
		});
		$('#show-container').prepend(html);

	});

	console.log(data);
}

function upcomingShowParse(data)
{
	$.each(data, function(i, dates){
		 var html = "<div class='row'>" +
	 			"<div class='large-12 columns'>" +
	 				"<h4>" + dates.date + "</4>" +
	 			"</div>" +
	 		"</div>";
		$.each(dates.episodes, function(j, episodes){
			html += "<div class='row'>" +
						"<div class='small-12 columns'>" +
							"<h5><a href='" + episodes.show.url + "'>" + episodes.show.title + "</a>" + 
								"<small> S" + episodes.episode.season + 'E' + episodes.episode.number + "</small>" +
							"</h3>" +
						"</div>" +
					"</div>";
		});
		$('#upcoming-container').prepend(html);

	});

	console.log(data);
}