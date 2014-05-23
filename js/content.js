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

String.prototype.replaceAll = function (find, replace) {
	var str = this;
	return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

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
				res = res.replaceAll(emote.key, "<img alt='PMP' src='" + chrome.extension.getURL("img/emotes/" + emote.img) + "'/>")
				res = res.replace(/--[ ]*\sGeff/g, '');
			});
			$(post).html(res);
		});
	});
	prevent = 0;
}
