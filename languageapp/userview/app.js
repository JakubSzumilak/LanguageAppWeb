let lastIndex = 0;
let currentIndex = 0;

function loadTerms(firstIndex, lastIndex)
{
    $.ajax({
        type: "POST",
        url: "termFetcher.php",
        data: {
            first: firstIndex,
            last: lastIndex
        },
        success: function(response) {
            if (response != null)
            {
                let obj = JSON.parse(response)
                for (let index = 0; index < obj.length; index++) {
                    $('#translateme'+(index+1)).html(obj[index].term)
                }
            }
        },
        error: function(xhr, status, error) {
            alert("AJAX error has occurred, please try again")
        }
    });
}

