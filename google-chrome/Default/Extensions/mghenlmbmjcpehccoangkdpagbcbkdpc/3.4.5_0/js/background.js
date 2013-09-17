var _gaq = _gaq || [];

(function () {

///////////////////////////////////////////////////////////////////////////////
// Setup
///////////////////////////////////////////////////////////////////////////////
var version = "3.4.5";

localStorage.sessions = localStorage.sessions || '{}';
localStorage.open = localStorage.open || '{"add":"click", "replace":"shift+click", "new":"ctrl/cmd+click", "incognito":"alt+click"}';
localStorage.pinned = localStorage.pinned || "skip";

_gaq.push(
	["_setAccount", "UA-27082345-2"],
	["_setSessionCookieTimeout", 0],
	["_setCustomVar", 1, "Version", version, 1],
	["_trackPageview", "/"]
);

if (localStorage.version === version) {
	if ("temp" in localStorage) {
		JSON.parse(localStorage.temp).forEach(function (v) {
			chrome.tabs.create({ url: v });
		});
		
		delete localStorage.temp;
		
		_gaq.push(["_trackEvent", "Temp", "Restore"]);
	}
} else {
	localStorage.readchanges = false;
	localStorage.version = version;
}

document.body.appendChild(function () {
	var el = document.createElement("script");
	el.src = "https://ssl.google-analytics.com/ga.js";
	return el;
}());


///////////////////////////////////////////////////////////////////////////////
// Omnibox
///////////////////////////////////////////////////////////////////////////////
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
	var sessions = JSON.parse(localStorage.sessions);
	text = text.trim();
	var ltext = text.toLowerCase();
	var suggestions = [];
	
	if (text.length) {
		chrome.omnibox.setDefaultSuggestion({
			description: "Open <match>" + text + "</match>" + (sessions[text] ? "" : " ...") + " in this window"
		});
		
		Object.keys(sessions).forEach(function (name) {
			var index = name.toLowerCase().indexOf(ltext);
			
			index !== -1 && suggestions.push({
				content: name,
				description: name.substring(0, index) + "<match>" + name.substr(index, text.length) + "</match>" + name.substr(index + text.length),
				index: index
			});
		});
		
		suggest(suggestions.sort(function (a, b) {
			return a.index === b.index ? (a.content.length === b.content.length ? 0 : a.content.length - b.content.length) : a.index - b.index;
		}));
	} else {
		chrome.omnibox.setDefaultSuggestion({ description: "Open a session in this window" });
	}
});

chrome.omnibox.onInputEntered.addListener(function (name) {
	var sessions = JSON.parse(localStorage.sessions);
	
	if (sessions[name]) {
		openSession(undefined, sessions[name]);
		
		_gaq.push(["_trackEvent", "Session", "Omnibox"]);
	}
});

chrome.omnibox.setDefaultSuggestion({ description: "Open a session in this window" });


///////////////////////////////////////////////////////////////////////////////
// Opening
///////////////////////////////////////////////////////////////////////////////
window.openSession = function (cwinId, urls, e, isTemp) {
	var open = JSON.parse(localStorage.open);
	var action = e ? (((e.ctrlKey || e.metaKey) && "ctrl/cmd+click") || (e.shiftKey && "shift+click") || (e.altKey && "alt+click") || "click") : open.add;
	
	for (var k in open) {
		if (action === open[k]) {
			action = k;
			break;
		}
	}
	
	if (action === "add") {
		urls.forEach(function (v) {
			chrome.tabs.create({ windowId: cwinId, url: v });
		});
	} else if (action === "replace") {
		chrome.tabs.getAllInWindow(cwinId, function (tabs) {
			openSession(cwinId, urls);
			
			if (localStorage.noreplacingpinned) {
				tabs = tabs.filter(function (t) { return !t.pinned; });
			}
			
			tabs.forEach(function (tab) {
				chrome.tabs.remove(tab.id);
			});
		});
	} else if (action === "new" || action === "incognito") {
		chrome.windows.create({ url: urls.shift(), incognito: action === "incognito" }, function (win) {
			openSession(win.id, urls);
		});
	} else {
		return false;
	}
	
	e && _gaq.push(["_trackEvent", isTemp ? "Temp" : "Session", "Open", action]);
};

})();
