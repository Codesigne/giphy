// import jQuery from 'jquery'
import { Store } from './store'
import * as API from './API'
import 'bootstrap';
import './style.scss';

const $gifHolder = $("[data-template='gifHolder'] > div").clone(!0, !0)

function onSucces(response, apiName) {
    Store[apiName].pagination.response_pending = false;
    Object.assign(Store[apiName].pagination, { ...response.pagination })
    if (response.pagination.total_count > 0) {
        response.data.forEach(function (el, index) {
            let $gifHolderInstance = $gifHolder.clone(1, 1)
            $gifHolderInstance.find('img').attr({
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
        if (
            (
                Store[apiName].pagination.total_count == null ||
                Store[apiName].pagination.offset + Store[apiName].pagination.offset < Store[apiName].pagination.total_count
            ) &&
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
$('#gifDetails').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    console.log("button :", button.data());

    var details = button.data('details') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    console.log("details :", details);

    var modal = $(this)
    modal.find('.modal-title').text(details.title)
    modal.find('.preview').attr('src', details.images.original.webp)
    modal.find('pre').text(JSON.stringify(details, undefined, 2))

    //   modal.find('.modal-body input').val(details)
})

$(window).on('scroll', function (event) {
    event.preventDefault();
    /* Act on the event */
    // console.log(Store);
    if (Math.floor($(this).scrollTop()) + 100 >= (($(document).height()) - $(window).height())) {
        getListOfActiveApi(Store.activeApi)
    }
});

$('body').on('click', '.gif', function () {
    Store.activeGif = this.id;
    // API.getListItem() //not making new request as related data is already bound to 'gif'
});

getTrendingList()