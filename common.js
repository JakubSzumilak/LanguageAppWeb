$(document).ready(function() {
    let msgBox = $("#actionResultMessage");
    $("#continueButton").click(function(e) {
        if ($("#username").val().length === 0 || $("#password").val().length === 0) {
            msgBox.css("color", "red");
            msgBox.text("One or more fields are empty")
            return;
        }
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "login.php",
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            success: function(response) {
                if (response == 'false') {
                    // Login failed
                    msgBox.css("color", "red");
                    msgBox.text("Wrong username or password")
                } else {
                    // login successful
                    msgBox.css("color", "yellowgreen");
                    msgBox.text("Logged in successfully!")
                    sessionStorage.setItem('userID', response);
                    $("#loginBox").fadeOut("slow");
                    setTimeout('window.location.href = "languageapp/userview/languageapp.html";', 1500)
                }
            },
            error: function(xhr, status, error) {
                // Handle AJAX error here
                alert("AJAX FAILURE");
            }
        });
        return false;
    });
});