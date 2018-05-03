import HTTP from './HTTP';
export default class RestClient extends HTTP{
		static get(url, headers={}){
			HTTP.headers = {
				'Content-Type' : 'application/json'
			};
			return super.get(url, headers).then(res => {
				res.data = JSON.parse(res.response || res.responseText);
				return Promise.resolve(res);
			});
		}
}