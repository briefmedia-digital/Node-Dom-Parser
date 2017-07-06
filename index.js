var fs = require('fs');
var $ = require('jquery')
var casper = require('casper').create();
var links = [];
var myurl = 'http://localhost:81/node/1'
var page = []
var contentPiecesCB = $('#content .container *')

casper.start(myurl, function() {

  var html = this.getPageContent();
  this.waitForSelector('body');

  console.log( casper.fetchText('title') );
  console.log( casper.getElementAttribute('meta[name="description"]', 'content') );

    var text = this.evaluate(function(){
    		return $('.field__item').length
    });
   console.log(text)
   console.log($('.field_item').length)
   console.log( $('.paragraph').length )

	var myobj = {
		type: 'article',
		title: $('title').text(),
		meta_title: $('meta[name="title"]').attr('content'),
		meta_description: $('meta[name="description"]').attr('content'),
		og_type: $('meta[propert="og:type"]').attr('content'),
		og_title: $('meta[propert="og:title"]').attr('content'),
		og_image: $('meta[propert="og:image"]').attr('content'),
		og_description: $('meta[propert="og:description"]').attr('content'),
		twitter_image: $('meta[propert="twitter:image"]').attr('content'),
	}

  // fs.write('./array.html', arrayOfItems, {})
  // fs.write('./testhtml.html', html, function(err){
  // 	console.log('file written')
  // })

}).then(function(){

}).run()
