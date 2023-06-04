function send_m3u(info, tab) {
    browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
        if (tabs.length !== 0) {
            var url = tabs[0].url
            if (info) {
                url = info.linkUrl || info.srcUrl;
            }
            console.log("play-url: sending " + url);
            var content = "#EXTM3U\n" + url;
            var blob = new Blob([content], {type: 'video/x-mpegurl;charset=utf-8'});
            browser.tabs.update(tabs[0].id, {url: URL.createObjectURL(blob)});
      }
    });
}

browser.contextMenus.create({
    id: "play-url",
    title: "play-url",
    contexts: ["link", "image", "video"]
});

browser.browserAction.onClicked.addListener((tab) => {
    send_m3u(null, tab);
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    send_m3u(info, tab);
});

browser.commands.onCommand.addListener((command) => {
    send_m3u(null, null);
});
