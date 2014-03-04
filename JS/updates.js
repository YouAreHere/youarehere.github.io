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
	$( "#alerts" ).show();
}

function updates() {
	$( "#discover" ).hide();
	$( "#alerts" ).hide();
	$( "#updates" ).show();
}

function discover() {
	$( "#updates" ).hide();
	$( "#alerts" ).hide();
	$( "#discover" ).show();
}