var	loaded = 0;
var prevent = 0;

$(document).on('DOMNodeInserted', function(e) {

	if (e.target.className == "toolbar") {
		setCode();
		setEmotes();
		loaded = 1;
		$('.answer').click(function(){
			setCode();
			setEmotes();
			console.log("KIDDING");
		});
	}
	if (e.target.className == "item" && loaded == 1) {
		setCode();
		setEmotes();
	}
});

$(document).on('DOMSubtreeModified', function(e) {
	if (e.target.className == "item" && loaded == 1 && !prevent)
	{
		prevent = 1;
		setEmotes();
		setCode();
	}
});

function replaceAll(str, chr, rep) {
	while (-1 != str.indexOf(chr)) {
		str = str.replace(chr, rep);
	}
	return (str);
}

function setCode() {

	var code = $("code");
	code.addClass("language-clike");
	if (code.parent().is("pre"))
		code.unwrap();
	code.wrap("<pre class='language-clike line-numbers'></pre>");
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
	prevent = 0;
}
