var casper = require('casper').create();
var fs = require('fs');

casper.start('http://localhost/bm-projects/dom-parser/simple-valid.html', function() {
	
	var body_html;
   body_html = this.evaluate(function() {
       return document.body.innerHTML;
   });

  body_html = body_html.replace(/\r/g, '')
  body_html = body_html.replace(/\n/g, '')
  body_html = body_html.replace(/\t/g, '')
  body_html = body_html.replace('&nbsp;', ' ') // DOMParser throws an error

  

	var result = mapDOM(body_html, false)
	var json = JSON.stringify(result, null, 4)

  fs.write('./output.json', json, function(err){
  	console.log('error')
  });
});

casper.run();

function mapDOM(element, json) {
    var treeObject = {};
    // If string convert to document Node
    if (typeof element === "string") {
      parser = new DOMParser();
      docNode = parser.parseFromString(element, 'application/xml');
      fs.write('./debug.html', parser, function(err){})
      element = docNode.firstChild;
    }

    //Recursively loop through DOM elements and assign properties to object
    function treeHTML(element, object) {
        if (element.nodeName !== 'SCRIPT') { 
            object["type"] = element.nodeName;
            var nodeList = element.childNodes;
            if (nodeList != null) {
                if (nodeList.length) {
                    object["content"] = [];
                    for (var i = 0; i < nodeList.length; i++) {
                        if (nodeList[i].nodeType == 3) {
                            object["content"].push(nodeList[i].nodeValue);
                        } else {
                            object["content"].push({});
                            treeHTML(nodeList[i], object["content"][object["content"].length -1]);
                        }
                    }
                }
            }
            if (element.attributes != null) {
                if (element.attributes.length) {
                    object["attributes"] = {};
                    for (var i = 0; i < element.attributes.length; i++) {
                        object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                    }
                }
            }
        }
    }
    treeHTML(element, treeObject);

    return (json) ? JSON.stringify(treeObject) : treeObject;
}