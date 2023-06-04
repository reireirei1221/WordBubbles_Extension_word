document.addEventListener('mouseup', function (e) {
    var selectedText = window.getSelection().toString().trim();

    if (selectedText !== '') {

        // If selectedText is not English, return
        if (!/^[a-zA-Z]+$/.test(selectedText)) {
            console.log("not english");
            return;
        }

        selectedText = selectedText.toLowerCase();
        console.log(selectedText);

        var dictionaryXhr = new XMLHttpRequest();
        var dictionaryBaseUrl = 'https://www.merriam-webster.com/dictionary/';
        word = selectedText;

        var dictionaryUrl = dictionaryBaseUrl + encodeURIComponent(word);
        var partOfSpeech = '';

        console.log(dictionaryUrl)

        dictionaryXhr.onreadystatechange = function () {
            if (dictionaryXhr.readyState === 4 && dictionaryXhr.status === 200) {
                // リクエストが成功した場合の処理
                console.log("word searched");

                var dictionaryParser = new DOMParser();
                var doc = dictionaryParser.parseFromString(dictionaryXhr.responseText, 'text/html');
                partOfSpeech = doc.querySelector('.parts-of-speech').innerText;

                console.log(partOfSpeech);

                var sendXhr = new XMLHttpRequest();
                var sendUrl = 'https://wordbubbles.herokuapp.com/words/store-from-outside?word=' + encodeURIComponent(word) + '&partOfSpeech=' + encodeURIComponent(partOfSpeech);

                sendXhr.onreadystatechange = function () {
                    if (sendXhr.readyState === 4 && sendXhr.status === 200) {
                        // リクエストが成功した場合の処理
                        console.log("word stored");
                    }
                };

                sendXhr.open('GET', sendUrl, false);
                sendXhr.send(null);
            }
        };

        dictionaryXhr.open('GET', dictionaryUrl, true);
        dictionaryXhr.send();   
    }
});

