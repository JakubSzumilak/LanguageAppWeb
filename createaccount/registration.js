$(document).ready(function() {
    $('#continueButton').click(function(e) {
        let login = $('#login').val().toString();
        let email = $('#mail').val().toString();
        let password = $('#password').val().toString();
        let passwordConfirmed = $('#passwordconfirm').val().toString();
        
        // Check if all fields are filled
        if (login.length === 0 || email.length === 0 || password.length === 0 || passwordConfirmed.length === 0)
        {
            $('#actionResultMessage').css('color', 'red');
            $('#actionResultMessage').html('All fields must be filled');
            return;
        }

        // Check if passwords match
        if (!(password === passwordConfirmed))
        {
            $('#actionResultMessage').css('color', 'red');
            $('#actionResultMessage').html('Passwords must match');
            return;
        }
        
        // Prepare AJAX
        $.ajax({
            type: "POST",
            url: "register.php",
            data: {
                login: login,
                password: password,
                email: email
            },
            success: function(response) {
                if (response === 'success')
                {
                    $('#actionResultMessage').css('color', 'yellowgreen');
                    $('#actionResultMessage').html('Registration successful - you can now sign in');
                } else {
                    $('#actionResultMessage').css('color', 'red');
                    $('#actionResultMessage').html('Registration failed - ' + response.toString());
                }
            },
            error: function(xhr, status, error) {
                alert("AJAX error has occurred, please try again")
            }
        });
            

    })
})















/*

<input type="text" name="login" id="login" placeholder="login" />
        <input type="email" name="mail" id="mail" placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password" />
        <input type="password" name="passwordconfirm" id="passwordconfirm" placeholder="confirm password" />
        <input type="button" id="continueButton" value="Continue" />
        */