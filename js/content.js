$(document).on('DOMNodeInserted', function(e) {
	if (e.target.className == "toolbar") {
		setCode();
		setEmotes();
	}
});

function replaceAll(str, chr, rep) {
	while (-1 != str.indexOf(chr)) {
		str = str.replace(chr, rep);
	}
	return (str);
}

function setCode() {
	$("code").addClass("language-clike");
	$("code").wrap("<pre class='language-clike line-numbers'></pre>");;
	Prism.highlightAll();
}

function setEmotes() {

	var posts = $("div .post:not(.list, .buttons) .content").find(".text, .comment .content");

	$.getJSON(chrome.extension.getURL("js/emotes.json"), function(emotes) {
		posts.each(function (index, post) {
			var res = $(post).html();
			emotes.forEach(function (emote) {
				res = replaceAll(res, emote.key, '<img alt="PMP" src="' + chrome.extension.getURL("img/emotes/" + emote.img) + '"/>');
			});
			$(post).html(res);
		});
	});
}
