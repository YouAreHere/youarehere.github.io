var nav_map, searchBox;
var markers=[];
var default_center = new google.maps.LatLng(42.054647, -87.677139);
var markerAtCenter = 0;
function init_navi()
{
	if (nav_map == undefined) {
		var map_canvas = document.getElementById('navMap_canvas');
		var mapOpts = {
			center: default_center,
			zoom: 15,
			streetViewControl: false,
			panControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		nav_map = new google.maps.Map(map_canvas, mapOpts);
		searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
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
	}
}

var address_latlng = [
	{
		address: "The Rock Northwestern University Evanston, IL 60208",
		latlng: new google.maps.LatLng(42.051545, -87.675910)
	},
	{
		address: "The Lakefill Evanston, IL 60201",
		latlng: new google.maps.LatLng(42.055285, -87.670850)
	},
	{
		address: "Norris University Center 1999 Campus Drive Evanston, IL 60208",
		latlng: new google.maps.LatLng(42.053332, -87.672744)
	},
	{
		address: "1715 Maple Ave Evanston, IL 60201",
		latlng: new google.maps.LatLng(42.048967, -87.684637)
	},
	{
		address: "Ryan Field",
		latlng: new google.maps.LatLng(42.065976, -87.692463)
	},
	{
		address: "Evanston, IL",
		latlng: new google.maps.LatLng(42.054647, -87.677139)
	}];

function navigateToPlace(place)
{
	for (var i = 0, marker; marker = markers[i]; i++) {
      	marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
	if (nav_map == undefined) {
		default_center = address_latlng.filter(function(element, index, array) {
			return (element.address == place);
		})[0].latlng;
		markerAtCenter = 1;
	} else {
		var latlng = address_latlng.filter(function(element, index, array) {
			return (element.address == place);
		})[0].latlng;
		nav_map.setCenter(latlng);
		var marker = new google.maps.Marker({
       			 	map: nav_map,
        			position: latlng
      			});
      	nav_map.setZoom(17);
      	markers.push(marker);
	}
}

$(document).on("pageshow","#navigation",
				function(){
					var the_height = ($(window).height() - $(this).find('[data-role="header"]').height() - $(this).find('[data-role="footer"]').height());
    				$(this).find('[id="navMap_canvas"]').height(the_height-40);
    				$(this).find('[id="navMap_canvas"]').width(
    					$(this).find('[data-role="header"]').width()-30
    				);
    				//console.log($(this).find('[id="map_canvas"]'));
    				if (nav_map == undefined) {
						init_navi();
						if (markerAtCenter) {
							var marker = new google.maps.Marker({
       			 				map: nav_map,
        						position: nav_map.getCenter()
      						});
      						nav_map.setZoom(17);
      						markers.push(marker);
						}
					} else {
						google.maps.event.trigger(nav_map, 'resize');
					}
				});

$( document ).ready(function() {
  $('.navigatelink').click(function(){
            var $this = $(this);
            var p1 = $this.data('address');
            console.log(p1);
            navigateToPlace(p1);
        });
});
