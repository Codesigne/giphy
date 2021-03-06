import { Store } from './store'

const baseUrl = "https://api.giphy.com/v1/gifs";
const api_key = "mP17pVxuBhxNTIg9QZqTgDK18hOvgGF5";

export function getSearchList(argument) {
	return $.ajax({
		url: `${baseUrl}/search?api_key=${api_key}&q=${Store.searchValue}&limit=5&offset=${Store.search.pagination.offset + 5}&rating=G&lang=en`,
	})
}

export function getTrendingList(argument) {
	return $.ajax({
		url: `${baseUrl}/trending?api_key=${api_key}&q=prafull&limit=5&offset=${Store.trending.pagination.offset + 5}`,
	})
}
/**
 * 
 * Returns same data relatd to gif as it is in above two list functions 
 */
export function getListItem(argument) {
	return $.ajax({
		url: `${baseUrl}/${Store.activeGif}?api_key=${api_key}`,
	})
}

