$(document).ready(function(){
    $('#gas-form').validate({
        rules: {
            fieldName: {
                required: true
            },
            fieldEmail: {
                required: true,
                email: true
            },
            fieldSub: {
                required: true
            },
            fieldMessage: {
                required: true
            }
        },
        submitHandler: function(form){
            form.submit();
        }
    });
    $('#btn-send').on('click', function(e){
        e.preventDefault();
        const url = 'https://script.google.com/macros/s/AKfycbwglT8GxpXDIq1zi9CrQwfZgBitEpWr5qGCmFNE-mmr4Z-01Lo/exec';
        let getName = $('#name').val(),
            getEmail = $('#email').val(),
            getSub = $('#subject').val(),
            getMsg = $('#message').val();
        const postRequest = {
            name: getName,
            email: getEmail,
            subject: getSub,
            message: getMsg
        };
        console.log(postRequest);
        if(url) {
            $.post(url, JSON.stringify(postRequest)).then(res => {
                $('#form-msg').text(res.msg);
            });
        }
    });
});