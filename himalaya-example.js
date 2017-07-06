var casper = require('casper').create();
var himalaya = require('himalaya')
var fs = require('fs')

// casper.start('https://www.cliniciansbrief.com/article/echinococcus-spp-tapeworms-dogs-cats', function() {
casper.start('http://localhost:81/node/1', function() {
	var body_html;
	 body_html = this.evaluate(function() {
	 		// return document.querySelector('#content .container').innerHTML
	    return document.body.innerHTML;
	 });
  body_html = body_html.replace(/\r/g, '')
  body_html = body_html.replace(/\n/g, '')
  body_html = body_html.replace(/\t/g, '')
	var json = himalaya.parse(body_html)
	fs.write('./himalaya-output-NEW.json', JSON.stringify(json, null, 4), function(err){})
});

casper.run();