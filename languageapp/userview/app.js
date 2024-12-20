let nextIndex = 1;
let itemCount = 0;
let correctAnswersInThisRound = 0;
let translations = []
let bShouldLoadTerms = true;
let TOTAL_ITEM_COUNT = 0;
let totalCorrectAnswers = 0;
let totalMistakes = 0;
let roundCount = 0;
let result = 0; //%
let bDictionaryInitialized = false;
let bDictionaryVisible = false;

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
                if (itemCount != obj.length)
                {
                    itemCount = obj.length;
                    $('#entrynum').val(itemCount)
                    updateSpan(itemCount)
                }
                nextIndex = nextIndex + obj.length;
                for (let index = 0; index < obj.length; index++) {
                    translations[index] = obj[index].translation;
                    $('#translateme'+(index+1)).html(obj[index].term)
                }
                $('#checkButton').html("check");
            }
        },
        error: function(xhr, status, error) {
            alert("AJAX error has occurred, please try again")
        }
    });
}

$(document).ready(function() {

    getTotalItemCount();

    $('#saveBtn').click(function(e) {
        saveData(0)
    })

    $('#dictionaryBtn').click(function(e) {
        if (!bDictionaryInitialized) {
            $.ajax({
                type: "POST",
                url: "termFetcher.php",
                data: {
                    action: "dictionary"
                },
                success: function(response) {
                    if (response != null)
                    {
                        let obj = JSON.parse(response)
                        let termsStr = ""
                        let translationsStr = "";
                        for (let index = 0; index < obj.length; index++) {
                            termsStr += obj[index].term + '<br />'
                            translationsStr += obj[index].translation + "<br />";
                        }
                        $('#dictionaryTerms').html("TERM<br />" + termsStr)
                        $('#dictionaryTranslations').html("TRANSLATION<br />" + translationsStr)
                        bDictionaryInitialized = true;
                    }
                },
                error: function(xhr, status, error) {
                    alert("AJAX error has occurred, please try again")
                }
            });
        }
            if(!bDictionaryVisible) {
                $('#dictionaryBox').show();
                bDictionaryVisible = true;
            }
        
    });

    $('#dictionaryOkButton').click(function(e) {
        if (bDictionaryVisible) {
            $('#dictionaryBox').hide();
            bDictionaryVisible = false;
        }
    })

    $('#checkButton').click(function(e) {
        if (bShouldLoadTerms)
        {
            itemCount = Number($('#entrynum').val());
            loadTerms(nextIndex, nextIndex + itemCount - 1);
            bShouldLoadTerms = false;
            clearDesk();
            return;
        }

        for (let i = 0; i < itemCount; i++) {
            if (!$('#translated'+(i+1)).hasClass('correct')) {
                if ($('#translated'+(i+1)).val() === translations[i]){
                    $('#translated'+(i+1)).addClass('correct');
                    correctAnswersInThisRound += 1;
                    totalCorrectAnswers += 1;
                } else {
                    totalMistakes += 1;
                }
            }
        }

        if (totalCorrectAnswers == TOTAL_ITEM_COUNT)
        {
            $('#checkButton').html("Again");
            saveData(1)
            result = parseFloat(totalCorrectAnswers) * 100.0 / parseFloat(totalCorrectAnswers + totalMistakes);
            correctAnswersInThisRound = 0;
            totalCorrectAnswers = 0;
            totalMistakes = 0;
            nextIndex = 1;
            itemCount = $('#entrynum').val();
            bShouldLoadTerms = true;
        }

        if (correctAnswersInThisRound == itemCount && bShouldLoadTerms == false)
        {
            correctAnswersInThisRound = 0;
            itemCount = $('#entrynum').val();
            $('#checkButton').html("load terms");
            bShouldLoadTerms = true;
        }
    })
})

function clearDesk()
{
    translations = []
    for (let i = 0; i < 9; i++) {
        $('#translated'+(i+1)).removeClass('correct');
        $('#translated'+(i+1)).val("");
        $('#translateme'+(i+1)).html("");
    }
}

function getTotalItemCount() {
    $.ajax({
        type: "POST",
        url: "termFetcher.php",
        data: {
            action: "count"
        },
        success: function(response) {
            if (response != null)
            {
                TOTAL_ITEM_COUNT = response
            }
        },
        error: function(xhr, status, error) {
            alert("AJAX error has occurred, please try again")
        }
    });
}


function saveData(roundsPlayed) 
{
    $('#notificationBox').html('Saving data...')
    $.ajax({
        type: "POST",
        url: "userDataSaver.php",
        data: {
            correct: totalCorrectAnswers,
            mistakes: totalMistakes,
            rounds: roundsPlayed
        },
        success: function(response) {
            if (response === 'success')
            {
                $('#notificationBox').css('color', 'yellowgreen');
                $('#notificationBox').html('Data saved successfully!');
            } else {
                $('#notificationBox').css('color', 'red');
                $('#notificationBox').html('An error has occurred while saving data - ' + response.toString());
            }
            setTimeout(() => {
                $('#notificationBox').css('color', 'white');
                $('#notificationBox').html('');
            }, 3000);
        },
        error: function(xhr, status, error) {
            alert("AJAX error has occurred, please try again")
        }
    });
}