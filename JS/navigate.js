var nav_map;
function init_navi()
{
	if (nav_map == undefined) {
		var markers=[];
		var map_canvas = document.getElementById('map_canvas');
		var mapOpts = {
			center: new google.maps.LatLng(42.054647, -87.677139),
			zoom: 15,
			streetViewControl: false,
			panControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		nav_map = new google.maps.Map(map_canvas, mapOpts);
		var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
		google.maps.event.addListener(searchBox, 'places_changed', function() {
    		var places = searchBox.getPlaces();

    		for (var i = 0, marker; marker = markers[i]; i++) {
      			marker.setMap(null);
    		}

    		// For each place, get the icon, place name, and location.
    		markers = [];
    		var bounds = new google.maps.LatLngBounds();
    		for (var i = 0, place; place = places[i]; i++) {
      			var image = {
       			 	url: place.icon,
        			size: new google.maps.Size(71, 71),
        			origin: new google.maps.Point(0, 0),
        			anchor: new google.maps.Point(17, 34),
        			scaledSize: new google.maps.Size(25, 25)
      			};

      			// Create a marker for each place.
      			var marker = new google.maps.Marker({
       			 	map: nav_map,
        			icon: image,
        			title: place.name,
        			position: place.geometry.location
      			});

      			markers.push(marker);

      			bounds.extend(place.geometry.location);
    		}

    		nav_map.fitBounds(bounds);
  		});
  		// [END region_getplaces]

  		// Bias the SearchBox results towards places that are within the bounds of the
  		// current map's viewport.
  		google.maps.event.addListener(nav_map, 'bounds_changed', function() {
    		var bounds = nav_map.getBounds();
    		searchBox.setBounds(bounds);
  		});
	} else {
		google.maps.event.trigger(nav_map, 'resize');
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
					init_navi();
				});
