// // メッセージ受信時の処理
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.definition) {
//         // 受け取った定義を利用する処理を行う（例：アラート表示）
//         alert(request.definition);
//     }
// });

// // 選択テキストの取得とメッセージ送信
// function scrapeDefinition() {
//     const selectedText = window.getSelection().toString().trim();
//     chrome.runtime.sendMessage({ action: 'scrapeDefinition', selectedText });
//     console.log(selectedText);
// }

// // ページ上で選択テキストが変更された場合に実行
// document.addEventListener('selectionchange', scrapeDefinition);

document.addEventListener('mouseup', function (e) {
    var selectedText = window.getSelection().toString().trim();
    // Upper to lower case

    // var url = 'https://www.oxfordlearnersdictionaries.com/definition/english/' + encodeURIComponent(selectedText);
    // fetch(url)
    //     .then(response => response.text())
    //     .then(data => {
    //         // レスポンスのデータを解析して定義を取得する処理を記述
    //         const parser = new DOMParser();
    //         const doc = parser.parseFromString(data, 'text/html');
    //         const definitionElement = doc.querySelector('.def'); // 定義を含む要素を適切なセレクタで取得

    //         if (definitionElement) {
    //             const definition = definitionElement.textContent;
    //             // 取得した定義を利用する処理
    //             console.log(definition);
    //         } else {
    //             // 定義が見つからなかった場合の処理
    //             console.log('定義が見つかりませんでした');
    //         }
    //     })
    //     .catch(error => {
    //         // エラーハンドリング
    //     });

    if (selectedText !== '') {
        selectedText = selectedText.toLowerCase();
        console.log(selectedText);

        // var xhr = new XMLHttpRequest();
        // var baseUrl = 'https://wordbubbles.herokuapp.com/words/storeFromOutside'; // 実際のベースURLに置き換えてください
        // var word = selectedText; // URLエンコードするデータ

        // var url = baseUrl + '?name=' + encodeURIComponent(word); // URLエンコードしてクエリパラメータを組み立てる

        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         // リクエストが成功した場合の処理
        //         console.log("word stored");
        //     }
        // };

        // xhr.open('GET', url, true);
        // xhr.send();

        var dictionaryXhr = new XMLHttpRequest();
        var dictionaryBaseUrl = 'https://www.merriam-webster.com/dictionary/';
        word = selectedText;

        var dictionaryUrl = dictionaryBaseUrl + encodeURIComponent(word);
        var partOfSpeech = '';

        console.log(dictionaryUrl)

        dictionaryXhr.onreadystatechange = function () {
            if (dictionaryXhr.readyState === 4 && dictionaryXhr.status === 200) {
                // // リクエストが成功した場合の処理
                // console.log("word searched");
                // var dictionaryParser = new DOMParser();
                // var doc = dictionaryParser.parseFromString(dictionaryXhr.responseText, 'text/html');
                // partOfSpeech = doc.querySelector('.parts-of-speech').innerText;
                // console.log(partOfSpeech);

                // var sendXhr = new XMLHttpRequest();
                // var sendUrl = 'https://wordbubbles.herokuapp.com/words/storeFromOutside';

                // sendXhr.onreadystatechange = function () {
                //     if (sendXhr.readyState === 4 && sendXhr.status === 200) {
                //         // リクエストが成功した場合の処理
                //         console.log("word stored");
                //     }
                // }

                // sendXhr.open('POST', sendUrl, true);
                // sendXhr.setRequestHeader('Content-Type', 'application/json');
                // sendXhr.send(JSON.stringify({ word: word, partOfSpeech: partOfSpeech }));
                console.log("word searched");

                var dictionaryParser = new DOMParser();
                var doc = dictionaryParser.parseFromString(dictionaryXhr.responseText, 'text/html');
                partOfSpeech = doc.querySelector('.parts-of-speech').innerText;

                console.log(partOfSpeech);

                var sendXhr = new XMLHttpRequest();
                var sendUrl = 'https://wordbubbles.herokuapp.com/words/storeFromOutside?word=' + encodeURIComponent(word) + '&partOfSpeech=' + encodeURIComponent(partOfSpeech);

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

// document.addEventListener('click', function (e) {
//     var title = document.getElementsByClassName("citation__title")[0].innerText;
//     var author_data = document.getElementsByClassName("loa__author-name");
//     var authors = [];

//     for (var i = 0; i < author_data.length; i++) {
//         var author = author_data[i].innerText;
//         authors.push(author);
//     }

//     console.log(title);
//     console.log(authors);

//     var xhr = new XMLHttpRequest();
//     var url = 'https://wordbubbles.herokuapp.com/authors/storeFromOutside'; // 実際のベースURLに置き換えてください

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             // リクエストが成功した場合の処理
//             console.log("author stored");
//         }
//     };

//     xhr.open('POST', url, false);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify({ title: title, authors: authors }));
// });
