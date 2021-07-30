$(document).ready(function() { 
    $('#getDataBtn').click(function() { 
        getData();
    });
    $('#getBadDataBtn').click(function() {
        getBadData();
    });
});
function getData() {
    $('#scriptInserter').append('<script src="http://localhost:3000/jsonp"/>');
}
function getBadData() {
    $('#scriptInserter').append('<script src="http://localhost:3000/evilp"/>');
}
function callback(data) {
    var obj = JSON.parse(data);
    alert(obj.message);
}