// https://www.flickr.com/services/api/explore/flickr.photos.search

var $form = $('form');
var $search = $('input[type="search"]');
var $button = $('button');
var $row = $search.closest('.form-row');
var $results = $('#results');

var initialize = function(){

	$search.focus();

	$search.on('input', function(){
		if( this.value.length ){
			$row.removeClass('has-error');
		}
	});

	$form.on('submit', function(event){
		event.preventDefault();

		if( $search.val().length ){
			searchFlickerAPI();
		} else {
			$row.addClass('has-error');
			if( !$('.alert-danger').length ){
				var $message = $('<div class="alert alert-danger"/>').text('Please enter a search term.').hide();
				$row.after($message);
				$message.slideDown('fast').delay(2500).slideUp('fast');
			}
		}
	});
};

var searchFlickerAPI = function(){
	$.ajax({
		url: 'https://api.flickr.com/services/rest/',
		dataType: 'jsonp',
		data: {
			method: 'flickr.photos.search',
			format: 'json',
			api_key: atob('OGE3NGM2NTM5N2UzODZiNTk3N2M5NTcxMTMzNmZhMTc='),
			text: $search.val(),
			per_page: '25',
			tag_mode: 'all',
			tags: ''
		}
	});
};

	var jsonFlickrApi = function(jsonData){

		var html = '';

		$.each(jsonData.photos.photo, function(index, photo){
			photo.src = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + 't.jpg';
			photo.link = 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id;

			html += '<a target="_blank" href="' + photo.link + '">';
				html += '<img src="' + photo.src + '" alt="' + photo.title + '" class="img-thumbnail">';
			html += '</a>';
		});

		$results.html( html );
	};

$(document).on('ready', initialize);