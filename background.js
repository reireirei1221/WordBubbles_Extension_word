

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapeDefinition') {
        const selectedText = request.selectedText;
        var url = 'https://www.oxfordlearnersdictionaries.com/definition/english/' + encodeURIComponent(selectedText);
        // console.log(url);
        fetch(url)
            .then(response => response.text())
            .then(data => {
                // console.log(data);
                console.log("Welcome");
                console.log(data);
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                // const jsdom = require("jsdom");
                // console.log(jsdom);
                // const doc = new jsdom.JSDOM(data);
                console.log(doc);
                console.log("Hello");

                const definitionElement = doc.querySelector('.def'); // 定義を含む要素を適切なセレクタで取得

                if (definitionElement) {
                    const definition = definitionElement.textContent;
                    // 取得した定義を利用する処理を行う（例：メッセージとして送信する）
                    chrome.tabs.sendMessage(sender.tab.id, { definition });
                } else {
                    // 定義が見つからなかった場合の処理
                    chrome.tabs.sendMessage(sender.tab.id, { definition: '定義が見つかりませんでした' });
                }
            })
            .catch(error => {
                // エラーハンドリング
                chrome.tabs.sendMessage(sender.tab.id, { definition: 'エラーが発生しました' });
            });
    }
});
