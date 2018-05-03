import Mouse from '../Mouse';
import HTTP from '../http/HTTP';


export default {
	getComponentHTML: (endpoint) => {
		return HTTP.get(endpoint)
			.then(res => {
				let _element = document.createElement('p');
				_element.innerHTML = res.responseText;				
				return _element.childNodes[0];
			});
	},
	getComponent: (endpoint) => {
		return HTTP.get(endpoint)
			.then(res => {							
				return res.responseText;
			});
	},
	getOrientation: (event, target) => {

		target = target || event.target;

		let rect = target.getBoundingClientRect();

		let width6 = rect.width / 6;
		let height6 = rect.height / 6;

		let positionMouseX = event.clientX - rect.left;
		let positionMouseY = event.clientY - rect.top;

		let orientation_x = Math.round(positionMouseX / width6);
		let orientation_y = Math.round(positionMouseY / height6);		
		
		if(orientation_x == 0){
			return Mouse.ORIENTATION_XWEST;
		}

		if(orientation_x == 6){
			return Mouse.ORIENTATION_XEAST;
		}

		if(orientation_y == 0){
			return Mouse.ORIENTATION_XNORTH;
		}

		if(orientation_y == 6){
			return Mouse.ORIENTATION_XSOUTH;
		}

		if(orientation_x == 1){
			return Mouse.ORIENTATION_WEST;
		}

		if(orientation_x == 5){
			return Mouse.ORIENTATION_EAST;
		}

		if(orientation_y == 1){
			return Mouse.ORIENTATION_NORTH;
		}

		if(orientation_y == 5){
			return Mouse.ORIENTATION_SOUTH;
		}


		if(orientation_x == 2){
			return Mouse.ORIENTATION_WEST;
		}

		if(orientation_x == 4){
			return Mouse.ORIENTATION_EAST;
		}

		if(orientation_y == 2){
			return Mouse.ORIENTATION_NORTH;
		}

		if(orientation_y == 4){
			return Mouse.ORIENTATION_SOUTH;
		}		
		
		
		return Mouse.ORIENTATION_CENTER;
	}	
}