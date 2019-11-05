export default function printMe() {
    console.log('I get called from print.gjs!');


}
$(document).ready(function() {
	console.log("sddgsdg")
	console.log("$", $)
});
const baseUrl = "https://api.giphy.com/v1/gifs";
const api_key = "rXduKJTlpl96RvM2HsHtlvGh01YYMZD2";
function getSearchList (argument) {
	$.ajax({
		url: `${baseUrl}/search?api_key=${api_key}&q=prafull&limit=5&offset=0`,
		// type: 'default GET (Other values: POST)',
		// dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		// data: {param1: 'value1'},
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

getSearchList()