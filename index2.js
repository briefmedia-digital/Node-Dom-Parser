var casper = require('casper').create();
var fs = require('fs');

casper.start('http://localhost:81/node/6', function() {
    this.echo(this.getTitle());
});

function getParagraphCount() {
	return document.querySelectorAll('.paragraph').length;
}

function getParagraphsHtmlClasses() {
	var paragraphs = document.querySelectorAll('.paragraph');
	return Array.prototype.map.call(paragraphs, function(e) {
		return e.getAttribute('class');
	});
}

function trythis() {
	var paragraphs = document.querySelectorAll('.paragraph');
	return Array.prototype.map.call(paragraphs, function(e) {
		
		var type_class = e.getAttribute('class');
		var fields_in_group = e.querySelectorAll('.field');
		var field_count = fields_in_group.length;

		var html_content = Array.prototype.map.call(fields_in_group, function(e2) {

			var field_label = e2.querySelector('.field__label').textContent;
			var field_values = e2.querySelectorAll('.field__item');
			if (field_values.length > 1) {
				field_values = Array.prototype.map.call(field_values, function(e3) {
					return e3.innerHTML;
				});
			} else {
				field_values = field_values[0].innerHTML;
			}
			return {
				'field_label': field_label,
				'field_item': field_values,
			}
		});

		return {
			'type': type_class,
			'field_count': field_count,
			'content': html_content
		}

	});
}

function getTextFieldContent() {
	// field__item
	return 'hello world'
}

casper.then(function(){

	var paragraphsCount = this.evaluate(getParagraphCount);
	this.echo(paragraphsCount)

	var paragraphClasses = this.evaluate(getParagraphsHtmlClasses)
	this.echo('elements selected');

	var field_values = this.evaluate(trythis)

	var mystring = '';
	var paragraph_types = paragraphClasses;
	var field_html = field_values;

	mystring += JSON.stringify(paragraph_types, null, 4) + "\n";
	mystring += JSON.stringify(field_html, null, 4) + "\n";
  
  fs.write('./testhtml.html', mystring, function(err){
  	console.log('error')
  });
	
})

casper.run();