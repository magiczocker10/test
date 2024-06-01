window.addEventListener('load', function() {
	const qr = document.getElementById('qr'),
		input = document.getElementById('text'),
		codeSelectors = document.getElementsByName('codeSelectRadio'),
		pages = document.getElementsByClassName('page'),
		left = document.getElementById('left'),
		right = document.getElementById('right');
	var page = 0;

	function getSelectedCode(){
		for(var i = 0; i < codeSelectors.length; i++){
			if(codeSelectors[i].checked){
				return codeSelectors[i].value;
			}
		}
	}

	function loadImageAsDataURL(url, callback) { // 3DS refuses to wait for api when just setting the src, so I need to request it through JS
    		var xhr = new XMLHttpRequest();
    		xhr.open('GET', url, true);
    		xhr.responseType = 'blob';

    		xhr.onload = function() {
        		if (this.status === 200) {
            			var reader = new FileReader();
            			reader.onloadend = function() {
                			var base64data = reader.result;
                			callback(base64data);
            			};
            			reader.readAsDataURL(this.response);
        		} else {
            			callback('./img/ERROR.png'); // Return the error image (likely the code type does not support the input)
        		}
    		};

    		xhr.onerror = function() {
        		console.error("Request failed");
    		};

   		xhr.send();
	}

	
	function generate(str) {
		var imageUrl = 'http://barcodeapi.org/api/' + getSelectedCode() + '/' + decodeURIComponent(str);
		loadImageAsDataURL(imageUrl, function(dataUrl) {
    			qr.src = dataUrl;
		});
	}

	document.getElementById('btn-gen').addEventListener('click', function() {
		if (input.value.length) generate(input.value);
	}, false);
	left.addEventListener('click', function(e) {
		right.style.removeProperty('color');
		pages[page].style.display = 'none';
		page--;
		pages[page].style.removeProperty('display');
		if (page === 0) e.target.style.color = 'transparent';
	});
	right.addEventListener('click', function(e) {
		left.style.removeProperty('color');
		pages[page].style.display = 'none';
		page++;
		pages[page].style.removeProperty('display');
		if (page+1 === pages.length) e.target.style.color = 'transparent';
	});
}, false);
