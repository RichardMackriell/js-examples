$(document).ready(function() { 
    $('.register-form').on('submit', function(event) {
        event.preventDefault();
        let json = convertToJson(event.target);
        console.log(json);
        $.post({
            url: 'http://localhost:3000/register', 
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',           
            data: JSON.stringify(json),
            success: (e) => {
                alert("Registered Successfully");
            }
        });
    })
});
function convertToJson(form) {
    let arr = $(form).serializeArray();
    let res = {};
    arr.forEach(i => {
        res[i.name] = i.value;
    });
    return res;
}