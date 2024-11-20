function verify(checkerDestination, destinationOnRedirect)
{
    
    let userID = sessionStorage.getItem('userID');
    let bRestricted = window.location.href.toString().includes("languageapp");
    if (userID != null)
    {
        // user logged in
        if (!bRestricted)
        {
            // logged in user wanted to log in again
            window.location.href = destinationOnRedirect;
            return false;
        }
    } else {
        // check if php session stores user ID and fetch it if possible
        $.ajax({
            type: "POST",
            url: checkerDestination,
            success: function(response) {
                if (response != '-1')
                {
                    // User logged in
                    sessionStorage.setItem('userID', response);
                    userID = response;
                    if (!bRestricted)
                    {
                        // logged in user wanted to log in again
                        window.location.href = destinationOnRedirect;
                        return false;
                    }
                } else {
                    // User not logged in
                    if (bRestricted)
                    {
                        // Breach attempt
                        window.location.href = destinationOnRedirect;
                        return false;
                    }
                }
            },
            error: function(xhr, status, error) {
                // Handle AJAX error here
                alert("AJAX FAILURE");
                return false;
            }
        });
        return true;
    }   
    return true;
}
