chrome.tabs.onUpdated.addListener((function(e,l,o){if(o.url&&o.url.includes("mellow-stroopwafel-5a4e10.netlify.app")){let e=o.url?.split("code="),l=e[1];chrome.storage.sync.set({code:l})}}));