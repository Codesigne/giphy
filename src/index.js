import { Store } from './store'
import * as API from './API'
// API.getSearchList()

// $(document).ready(function () {
const $gifHolder = $("[data-template='gifHolder']  img").clone(!0, !0)

// console.log("$gifHolder : ", $gifHolder);
// console.log('Store', Store)

// });
function getSearchList(params) {
    console.log("getSearchList");
    console.log(Store.search.pagination.total_count == null );
    console.log( Store.search.pagination.offset + Store.search.pagination.offset < Store.search.pagination.total_count);
    console.log("||" , Store.search.pagination.total_count == null || Store.search.pagination.offset + Store.search.pagination.offset < Store.search.pagination.total_count);
    console.log( Store.search.pagination.response_pending != true)
console.log("&& " ,     (
    Store.search.pagination.total_count == null ||
    Store.search.pagination.offset + Store.search.pagination.offset < Store.search.pagination.total_count
) &&
Store.search.pagination.response_pending != true);

    if (
        (
            Store.search.pagination.total_count == null ||
            Store.search.pagination.offset + Store.search.pagination.offset < Store.search.pagination.total_count
        ) &&
        Store.search.pagination.response_pending != true
    ) {
        console.log("getSearchList if ");

        API.getSearchList().then((response) => {
            Store.search.pagination.response_pending = false;

            // console.log("response.data :", response.data);
            Object.assign(Store.search.pagination, { ...response.pagination })
            // console.log('Store', Store)

            // let b = ;
            response.data.forEach(function (el, index) {
                // console.log('el.fixed_height_downsampled', el.images.fixed_width_downsampled.webp)
                let $gifHolderInstance = $gifHolder.clone(1, 1)
                // console.log('$gifHolderInstance  :', $gifHolderInstance)
                $gifHolderInstance.attr('src', el.images.fixed_width_downsampled.webp);
                $('[data-result]').append($gifHolderInstance)
                // console.log('($(document).height() * 0.8) - $(window).height()):', $(document).height(), $(window).height())

            });
        });
        Store.search.pagination.response_pending = true;
    }
}

function getTrendingList(params) {
    if (
        (Store.trending.pagination.total_count == null ||
            Store.trending.pagination.offset + Store.trending.pagination.offset < Store.trending.pagination.total_count) &&
        Store.trending.pagination.response_pending != true
    ) {
        API.getTrendingList().then((response) => {
            Store.trending.pagination.response_pending = false;

            // console.log("response.data :", response.data);
            Object.assign(Store.trending.pagination, { ...response.pagination })
            // console.log('Store', Store)

            // let b = ;
            response.data.forEach(function (el, index) {
                // console.log('el.fixed_height_downsampled', el.images.fixed_width_downsampled.webp)
                let $gifHolderInstance = $gifHolder.clone(1, 1)
                // console.log('$gifHolderInstance  :', $gifHolderInstance)
                $gifHolderInstance.attr('src', el.images.fixed_width_downsampled.webp);
                $('[data-result]').append($gifHolderInstance)
                // console.log('($(document).height() * 0.8) - $(window).height()):', $(document).height(), $(window).height())

            });
        });
        Store.trending.pagination.response_pending = true;
    }
}



// import _ from 'lodash';
import './style.css';
// getSearchList()
getTrendingList()

$('#inputeSearch').on('input', function (event) {
    event.preventDefault();
    /* Act on the event */
    Store.searchValue = this.value;
    console.log(this.value);

});
$('#seachGify').on('click', function (event) {
    event.preventDefault();
    /* Act on the event */
    $('[data-result]').empty();
    Store.activeApi = 'search'
    console.log("set active api", Store);

    getSearchList()
});
$(window).on('scroll', function (event) {
    event.preventDefault();
    /* Act on the event */
    // console.log('($(document).height() * 0.8) - $(window).height()):', $(this).scrollTop(), $(document).height(), $(window).height(), (($(document).height()) - $(window).height()))

    if (Math.floor($(this).scrollTop()) + 10 >= (($(document).height()) - $(window).height())) {
        // console.log('ddf($(document).height() * 0.8) - $(window).height()):', $(this).scrollTop(), $(document).height(), $(window).height(), (($(document).height()) - $(window).height()))
        switch (Store.activeApi) {
            case 'search':
                getSearchList()
                break;
            case 'trending':
                getTrendingList()
                break;
            default:
                // statements_def
                break;
        }
    }
});
