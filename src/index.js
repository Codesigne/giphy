import { Store } from './store'
import * as API from './API'
import './style.css';

const $gifHolder = $("[data-template='gifHolder']  img").clone(!0, !0)

function onSucces(response, apiName) {
    Store[apiName].pagination.response_pending = false;
    Object.assign(Store[apiName].pagination, { ...response.pagination })
    if (response.pagination.total_count > 0) {
        response.data.forEach(function (el, index) {
            let $gifHolderInstance = $gifHolder.clone(1, 1)
            $gifHolderInstance.attr({
                'src': el.images.fixed_width_downsampled.webp,
                'id': el.id,
                'data-details': JSON.stringify(el)
            });
            $('[data-result]').append($gifHolderInstance)
        });
    } else {
        $('[data-result]').append(`No result for ${Store.searchValue}`)
    }
}
function getListOf(apiName) {
    return () => {
        if ((
            Store[apiName].pagination.total_count == null ||
            Store[apiName].pagination.offset + Store[apiName].pagination.offset < Store[apiName].pagination.total_count) &&
            Store[apiName].pagination.response_pending != true
        ) {
            switch (apiName) {
                case 'search':
                    API.getSearchList()
                        .then(
                            (response) => { onSucces(response, apiName) },
                            (error) => { $('[data-result]').append(`Something went wrong`) }
                        );
                    break;
                case 'trending':
                    API.getTrendingList()
                        .then(
                            (response) => { onSucces(response, apiName) },
                            (error) => { $('[data-result]').append(`Something went wrong`) }
                        );
                    break;
            }
            Store[apiName].pagination.response_pending = true;
        }
    }
}
var getSearchList = getListOf('search');
var getTrendingList = getListOf('trending');

function getListOfActiveApi(activeApi) {
    switch (activeApi) {
        case 'search':
            getSearchList()
            break;
        case 'trending':
            getTrendingList()
            break;
        default:
            getTrendingList()
            break;
    }
}

$('#inputeSearch').on('input', function (event) {
    event.preventDefault();
    /* Act on the event */
    if (this.value == "") {
        Store.activeApi = 'trending'
    } else {
        Store.searchValue = this.value;
        Store.activeApi = 'search'
    }
});
$('#seachGify').on('click', function (event) {
    event.preventDefault();
    /* Act on the event */
    $('[data-result]').empty();
    Store.search.pagination.offset = 0;
    Store.trending.pagination.offset = 0;
    getListOfActiveApi(Store.activeApi)
});

$(window).on('scroll', function (event) {
    event.preventDefault();
    /* Act on the event */
    console.log(Store);
    if (Math.floor($(this).scrollTop()) + 10 >= (($(document).height()) - $(window).height())) {
        getListOfActiveApi(Store.activeApi)
    }
});

$('body').on('click', '.gif', function () {
    Store.activeGif = this.id;
    // API.getListItem() //not making new request as related data is already bound to 'gif'
});

getTrendingList()