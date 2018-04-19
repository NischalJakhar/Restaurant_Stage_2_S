var dbPromise = idb.open('restaurant-store', 1 , function(dbObject){
    if(!dbObject.objectStoreNames.contains('stores')){
        dbObject.createObjectStore('stores', {keyPath : 'id'});
    }

});

function writeData(st, data) {

    return dbPromise
        .then(function (dbObject) {
        var tx = dbObject.transaction(st , 'readwrite');
        var store = tx.objectStore(st);
        store.put(data);
        return tx.complete;
    });

}

function readAllData(st){
    return dbPromise
        .then(function (dbObject) {
            var tx = dbObject.transaction(st,'readonly');
            var store = tx.objectStore(st);
            return store.getAll();
        })
}


function addDataFromFetchApi() {
    return fetch(DBHelper.DATABASE_URL)
        .then(function (response) {
            return response.json();
        }).then(data => {
        for (var key in data) {
        writeData('stores', data[key]);
    }
    return data;
})
}