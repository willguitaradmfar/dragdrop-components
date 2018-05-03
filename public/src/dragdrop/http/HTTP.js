export default class HTTP{

	static get(url, headers={}) {
		return new Promise((resolve, reject) => {
			const xhttp = new XMLHttpRequest();			

			xhttp.onreadystatechange = (as) => {
				if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
					return resolve(xhttp);
				}

				if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status >= 400) {
					return reject(xhttp);
				}				
			};

			xhttp.open("GET", url, true);

			for(let i in this.headers){
				xhttp.setRequestHeader(i, HTTP.headers[i]);
			}

			for(let i in headers){
				xhttp.setRequestHeader(i, headers[i]);
			}

			xhttp.send();
		});
	}
}