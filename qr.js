window.addEventListener('load', function() {
	const qr = document.getElementById('qr'),
		input = document.getElementById('text'),
		codeSelectors = document.getElementsByName('codeSelectRadio');

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
		//xhr.setRequestHeader('Content-Type', 'image/png');
		xhr.responseType = 'blob';

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status !== 200) {
					alert(xhr.status);
					callback('./img/ERROR.png');
					return;
				}
				var reader = new FileReader();
				reader.onloadend = function() {
					var base64data = reader.result;
					callback(base64data);
				}
				reader.readAsDataURL(xhr.response);
			}
		}
		xhr.onload = function() {
			//alert(typeof(URL.createObjectURL));
			//alert(this.response);
			//var reader = new Image();
			//reader.onload = function() {
			//	alert(this.src);
			//};
			//callback(URL.createObjectURL(this.response));
		};

		xhr.onerror = function(e) {
			//alert('Error');
		};

		xhr.send();
	}

	
	function generate(str) {
		var imageUrl = 'https://barcodeapi.org/api/' + getSelectedCode() + '/' + decodeURIComponent(str);
		loadImageAsDataURL(imageUrl, function(dataUrl) {
    			qr.src = dataUrl;
		});
	}

	document.getElementById('btn-gen').addEventListener('click', function() {
		if (input.value.length) generate(input.value);
	}, false);
}, false);
