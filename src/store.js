export var Store = {
    activeGif:"",
    searchValue:"",
	activeApi:'trending',
    trending: {
        pagination: {
            // limit:2null,
            total_count: null,
            count: null,
            offset:0,
            response_pending:false
        }
    },
    search: {
        pagination: {
            // limit:2null,xc
            total_count: null,
            count: null,
            offset:0,
            response_pending:false
        }
    }

}