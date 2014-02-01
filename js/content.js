$(document).on('DOMNodeInserted', function(e) {
	if (e.target.className == "toolbar")
	{
		$("code").addClass("language-clike");
		$("code").wrap("<pre class='language-clike line-numbers'></pre>");;
		Prism.highlightAll();
	}
});
