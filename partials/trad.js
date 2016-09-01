var lang = json.lang;

var Trad = function (el) {
	this.el = el;
	this.input = el.querySelector('.form-abe');
	this.label = el.querySelector('label');
	this.labelText = this.label.textContent.trim();

	this.bindEvt();
};

Trad.prototype.bindEvt = function bindEvt () {
	this.input.addEventListener('blur', function (e) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/abe/plugin/abe-trad/create?l=' + lang + '&k=' + encodeURIComponent(this.labelText) + '&v=' + encodeURIComponent(this.input.value));
		xhr.send(null);

		xhr.onreadystatechange = function () {
		  if (xhr.readyState === 4) {
		    if (xhr.status === 200) {
		      // console.log(xhr.responseText); // 'This is the returned text.'
		      abe.editorReload.instance.reload();
		    } else {
		      console.log('Error: ' + xhr.status); // An error occurred during the request.
		    }
		  }
		};

	}.bind(this));
}

document.addEventListener("DOMContentLoaded", function(event) {
  var els = document.querySelectorAll('.tab-pane#i18n .form-group');
  if(typeof els === 'undefined' || els === null) return;

  Array.prototype.forEach.call(els, function (el) {
  	new Trad(el);
  });
});
