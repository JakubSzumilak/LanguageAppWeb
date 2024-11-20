let seconds = 0;
$(document).ready(function() {
$.ajax({
    type: 'POST',
    url: 'userDataFetcher.php',
    dataType: 'json',
    success: function(response, statusText) {
        seconds = response['timeSpent'];
        setInterval(addTime, 1000);
    },
    error: function(xhr, status, error) {
        // Handle AJAX error here
        alert("AJAX FAILURE");
        return false;
    }
})
});


function addTime()
{
    seconds += 1;
    let timeString = "";
    if (seconds >= 86400) {
        let sec = seconds
        let days = Math.floor(sec / 86400);
        sec -= days * 86400;
        let hours = Math.floor(sec / 3600);
        sec -= hours * 3600;
        let minutes = Math.floor(sec / 60);
        sec -= minutes * 60;
        timeString += days + "d " + hours + "h " + minutes + "m " + sec + "s";
    } else if (seconds >= 3600)
    {
        let sec = seconds
        let hours = Math.floor(sec / 3600);
        sec -= hours * 3600;
        let minutes = Math.floor(sec / 60);
        sec -= minutes * 60;
        timeString += hours + "h " + minutes + "m " + sec + "s";
    } else if (seconds >= 60)
    {
        let sec = seconds
        let minutes = Math.floor(sec / 60);
        sec -= minutes * 60;
        timeString += minutes + "m " + sec + "s";
    } else
    {
        timeString += seconds + "s";
    }

    $('#userData').html(timeString);
}

function autoSave()
{
    // to do later
}