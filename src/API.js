import { Store } from './store'

const baseUrl = "https://api.giphy.com/v1/gifs";
const api_key = "rXduKJTlpl96RvM2HsHtlvGh01YYMZD2";

export function getSearchList(argument) {
	return $.ajax({
		url: `${baseUrl}/search?api_key=${api_key}&q=${Store.searchValue}&limit=5&offset=${Store.search.pagination.offset + 5}&rating=G&lang=en`,
	})
}

export function getTrendingList(argument) {
	return $.ajax({
		url: `${baseUrl}/trending?api_key=${api_key}&q=prafull&limit=10&offset=${Store.trending.pagination.offset + 5}`,
	})
}
