chrome.tabs.onUpdated.addListener(function (tabid, info, tab) {
    if (tab.url) {
        let st = tab.url

        if (st.includes("mellow-stroopwafel-5a4e10.netlify.app")) {
            let arr = tab.url?.split('code=')
            let code = arr[1]
            chrome.storage.sync.set({ 'code': code })
        }

    }
});

