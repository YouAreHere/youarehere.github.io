
function init_map()
{
	if (map == undefined) {
		var map_canvas = document.getElementById('map_canvas');
		var mapOpts = {
			center: new google.maps.LatLng(42.054647, -87.677139),
			zoom: 15,
			streetViewControl: false,
			panControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(map_canvas, mapOpts);
		var searchbox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
	}
}
$(document).on("pageshow","#navigation",
				function(){
					var the_height = ($(window).height() - $(this).find('[data-role="header"]').height() - $(this).find('[data-role="footer"]').height());
    				$(this).find('[id="map_canvas"]').height(the_height-40);
    				$(this).find('[id="map_canvas"]').width(
    					$(this).find('[data-role="header"]').width()-30
    				);
    				//console.log($(this).find('[id="map_canvas"]'));
					init_map();
				});
