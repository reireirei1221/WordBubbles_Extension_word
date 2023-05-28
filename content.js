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
    selectedText = selectedText.toLowerCase();
    console.log(selectedText);

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
        var xhr = new XMLHttpRequest();
        var baseUrl = 'https://wordbubbles.herokuapp.com/words/storeFromOutside'; // 実際のベースURLに置き換えてください
        var name = selectedText; // URLエンコードするデータ

        var url = baseUrl + '?name=' + encodeURIComponent(name); // URLエンコードしてクエリパラメータを組み立てる

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // リクエストが成功した場合の処理
                console.log("word stored");
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
    }
});

document.addEventListener('click', function (e) {
    var title = document.getElementsByClassName("citation__title")[0].innerText;
    var author_data = document.getElementsByClassName("loa__author-name");
    var authors = [];

    for (var i = 0; i < author_data.length; i++) {
        var author = author_data[i].innerText;
        authors.push(author);
    }

    console.log(title);
    console.log(authors);

    var xhr = new XMLHttpRequest();
    var baseUrl = 'https://wordbubbles.herokuapp.com/authors/storeFromOutside'; // 実際のベースURLに置き換えてください
    var url = baseUrl;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // リクエストが成功した場合の処理
            console.log("author stored");
        }
    };

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ title: title, authors: authors }));
});
