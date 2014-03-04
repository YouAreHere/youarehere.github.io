// $(document).ready(function () {
//     $('.toggle').hide();
//     $('a.togglelink').on('click', function (e) {
//         e.preventDefault();
//         var elem = $(this).next('.toggle')
//         $('.toggle').not(elem).hide('slow');
//         elem.toggle('slow');
//     });
// });

function alerts() {
	$( "#updates" ).hide();
	$( "#discover" ).hide();
	$( "#alerts" ).toggle();
}

function updates() {
	$( "#discover" ).hide();
	$( "#alerts" ).hide();
	$( "#updates" ).toggle();
}

function discover() {
	$( "#updates" ).hide();
	$( "#alerts" ).hide();
	$( "#discover" ).toggle();
}