import Component from './Component';
import DOM from './helper/DOM';
import ComponentUtil from './helper/ComponentUtil';
import Phantom from './phantom/Phantom';
import Cursor from './cursor/Cursor';
import Alca from './alca/Alca';
import Log from '../status/Log';
import Workspace from './workspace/Workspace';

export default class Drag extends Component {
		
	static get SELECTOR (){return '.ux-draggable'}
	static get CLASS (){return 'ux-draggable'}

	constructor(_document) {
		super();
		this.document = _document;

		//Diz que componente pode ser arrastado
		DOM.setAttr('draggable', true, this.document);

		//Registro de eventos
		this.document.addEventListener('dragstart', this.dragstart.bind(this), false);
		this.document.addEventListener('dragend', this.dragend.bind(this), false);		
	}

	dragstart(event) {
		let componentURL = DOM.getAttr(Component.ATTR_COMPONENT_URL, event.target);
		let propertyHTMLURL = DOM.getAttr(Component.ATTR_PROPERTY_HTML_URL, event.target);
		let propertyJSURL = DOM.getAttr(Component.ATTR_PROPERTY_JS_URL, event.target);		
		let componentName = DOM.getAttr(Component.ATTR_NAME, event.target);

		//Pede o componente referente ao server API
		ComponentUtil
			.getComponentHTML(componentURL)
			.then(component => {

				DOM.setAttr(Component.ATTR_NAME, componentName, component);
				DOM.setAttr(Component.ATTR_COMPONENT_URL, componentURL, component);
				DOM.setAttr(Component.ATTR_PROPERTY_HTML_URL, propertyHTMLURL, component);
				DOM.setAttr(Component.ATTR_PROPERTY_JS_URL, propertyJSURL, component);

				//Cria um prototipo do componente virtualmente (Chamado de fantasma)
				Phantom.create(component);

				//Emite um evento de drag
				Workspace.event.emit('component$drag', component);
				
				//Mostra no status o componente qual componente esta como fantasma
				Log.default(`Componente (${componentURL}) aguardando ser solto .....`);
			});
	}

	dragend() {
		//Mostra que componente foi solto
		Log.default(`Componente solto`);

		//Desliga o cursor após o término da operação
		Cursor.detach();
	}
}

