import { Store } from './store'

export default function printMe() {
	console.log('I get called from print.gjs!');


}
$(document).ready(function () {
	console.log("sddgsdg")
	console.log("$", $)
});

// 


const baseUrl = "https://api.giphy.com/v1/gifs";
const api_key = "rXduKJTlpl96RvM2HsHtlvGh01YYMZD2";

export function getSearchList(argument) {
	// Store.search.pagination.response_pending = true;
	return $.ajax({
		url: `${baseUrl}/search?api_key=${api_key}&q=${Store.searchValue}&limit=5&offset=${Store.search.pagination.offset + 5}&rating=G&lang=en`,
		// type: 'default GET (Other values: POST)',
		// dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		// data: {param1: 'value1'},
		// beforeSend: () => {
	
			
		// },
	})

		.done(function () {
			console.log("getSearchList  success");
		})
		.fail(function () {
			console.log("getSearchList  error");
		})
		.always(function () {
			console.log("getSearchList  complete");
		});
}
export function getTrendingList(argument) {
			// Store.search.pagination.response_pending = true;

	return $.ajax({
		url: `${baseUrl}/trending?api_key=${api_key}&q=prafull&limit=10&offset=${Store.trending.pagination.offset + 5}`,
		// type: 'default GET (Other values: POST)',
		// dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		// data: {param1: 'value1'},
		// beforeSend: () => {
	
		// },
	})

		.done(function () {
			console.log("getTrendingList  success");
		})
		.fail(function () {
			console.log("getTrendingList  error");
		})
		.always(function () {
			console.log("getTrendingList  complete");
		});
}

// getSearchList()
// getTrendingList()