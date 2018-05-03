import DOM from '../helper/DOM';
import Mouse from '../Mouse';
import HTTP from '../http/HTTP';
import Log from '../../status/Log';
import Cursor from '../cursor/Cursor';
import Alca from '../alca/Alca';
import Inspect from '../inspect/Inspect';
import Drop from '../Drop';
import Component from '../Component';
import Workspace from '../workspace/Workspace'

export default class Phantom {
	static create(component) {
		Phantom.phantom = component;

		//O componente não pode ser arrastado de forma natual
		//após ser solto no plano
		DOM.setAttr('draggable', false, Phantom.phantom);

		//Adiciona a classe de componente para esse fantasma
		DOM.setClass(Component.CLASS, Phantom.phantom);

		//Registra eventos
		Phantom.phantom.addEventListener('mouseup', Phantom.mouseup.bind(this), false);
		Phantom.phantom.addEventListener('mousemove', Phantom.mousemove.bind(this), false);
		Phantom.phantom.addEventListener('mouseleave', Phantom.mouseleave.bind(this), false);		

	}

	static mousemove(event) {
		Inspect.component = DOM.$next(Component.CLASS, event.target)._document;
		Inspect.show();		
	}

	static mouseleave(event) {
		Inspect.hide();
	}		

	static mouseup(event) {
		event.stopPropagation();

		//Importante para recuperar o componente clicado
		Alca.component = DOM.$next(Component.CLASS, event.target)._document;

		//Coloca o componente clicado em phantom
		Phantom.phantom = Alca.component;

		//Mostra a alça para componentes clicados
		Alca.show();

		//Emite um evento de click
		Workspace.event.emit('component$click', Alca.component);
	}

	static leave() {
		
		if (Cursor.action == Cursor.ACTION_INNER_APPEND) {
			Cursor.closer._document.insertAdjacentElement('beforeend', Phantom.phantom);
			return Workspace.event.emit('component$leave', Phantom.phantom);
		}

		if (Cursor.action == Cursor.ACTION_PREPEND) {
			Cursor.closer._document.insertAdjacentElement('beforebegin', Phantom.phantom);
			return Workspace.event.emit('component$leave', Phantom.phantom);
		}

		if (Cursor.action == Cursor.ACTION_APPEND) {
			Cursor.closer._document.insertAdjacentElement('afterend', Phantom.phantom);
			return Workspace.event.emit('component$leave', Phantom.phantom);
		}		
	}
}