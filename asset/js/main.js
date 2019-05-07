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
        
        // Insert google app script
        const url = 'GOOGLE_APP_SCRIPT_URL';
        
        // Get data from html input field
        let getName = $('#name').val(),
            getEmail = $('#email').val(),
            getSub = $('#subject').val(),
            getMsg = $('#message').val();
        
        // Get the data and make it as json
        const postRequest = {
            name: getName,
            email: getEmail,
            subject: getSub,
            message: getMsg
        };
        
        // Send the postRequest 
        if(url) {
            $.post(url, JSON.stringify(postRequest)).then(res => {
                $('#form-msg').text(res.msg);
            });
        }
    });
});