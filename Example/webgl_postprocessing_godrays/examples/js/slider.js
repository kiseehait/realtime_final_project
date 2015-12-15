$(function() {
	$( "#slider" ).slider({
		range: "max",
		min: 1,
		max: 10,
		value: 2,
		slide: function( event, ui ) {
        	console.log(ui.value);
		}
	});
});