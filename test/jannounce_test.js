$(document).ready(function () {
	var text = "Welcome to jannounce!",
		url 	 = "../examples/message.json",
		jsonText = "Welcome to jannounce from JSON!",
		jannounce, jbtnClose,
		
		setup = function () {
			if (jannounce) jannounce.jannounce('destroy');
			jannounce = $('#jannounce').jannounce({
				text	: text
			});
			jbtnClose = jannounce.find('a.ja_close');
		};
	
	test("plugin created", function () {
		setup();
		equal(jannounce.length, 1);
	});
	
	test("returns 0 length if no element", function () {
		var jannounce1 = $('#jannounce1').jannounce({
			text: text
		});
		equal(jannounce1.length, 0);
	});
	
	test("classes are assigned", function () {
		setup();
		ok(jannounce.hasClass('ja_container'));
	});
	
	test("close btn is added", function () {
		setup();
		equal(jbtnClose.length, 1);
	});
	
	test("content div is added", function () {
		setup();
		equal(jannounce.find('div.ja_content').length, 1);
	});
	
	test("content is added", function () {
		setup();
		equal(jannounce.find('div.ja_content').html(), text);
	});
	
	test("element is visible", function () {
		setup();
		equal(jannounce[0].style.display, 'block');
	});
	
	test("destroy", function () {
		var ja = $('#jannounce-destroy').jannounce({ text: 'Hello!' }),
			classes = ['.ja_close', '.ja_content'];
			
		ok(ja.hasClass('ja_container'));
		$.each(classes, function (i, klass) {
			equal(ja.find(klass).length, 1);
		});
		ok(ja.data('ja-data') != null);
		
		ja.jannounce('destroy');
		
		ok(!ja.hasClass('ja_container'));
		$.each(classes, function (i, klass) {
			equal(ja.find(klass).length, 0);
		});
		equal(ja.data('ja-data'), null);
	});
	
	asyncTest("close hides the container", function () {
		setup();
		jbtnClose.trigger('click');
		setTimeout(function () {
			equal(jannounce[0].style.display, 'none');
			start()
		}, 500);
	});
	
	
});