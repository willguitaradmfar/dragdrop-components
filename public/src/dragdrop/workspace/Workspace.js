import DOM from '../helper/DOM';
import Drop from '../Drop';
import Component from '../Component';
import Drag from '../Drag';
import Phantom from '../phantom/Phantom';
import Alca from '../alca/Alca';
import Cursor from '../cursor/Cursor';
import EventEmitter from '../../event/EventEmitter';

export default class Workspace {

	static get SELECTOR() { return 'iframe' };

	static init() {
		Workspace.iframe = DOM.$(Workspace.SELECTOR);
		Workspace.register();
		Workspace.registerEvents();

		let heightWorkspace = DOM.$('.ux-workspace').getBoundingClientRect().height;
		Workspace.iframe.style.height = `${heightWorkspace}px`;
		//DOM.$iframe('html').style.overflowX = 'hidden';
		DOM.$iframe('html').style.marginTop = '19px';


		if (!Workspace.event) {
			Workspace.event = new EventEmitter();

			Workspace.event.on('component$remove', () => {
				Alca.hide();
				Cursor.detach();
			});

			Workspace.event.on('component$leave', () => {
				Alca.hide();
				Cursor.detach();
			});

			Workspace.event.on('component$change', () => {
				Alca.hide();
				Cursor.detach();
			});
		}
	}

	static get html() {
		DOM.$$iframe('html').forEach(o => {
			new Drop(o);
		});

		return DOM.$iframe('html');
	}

	static register() {
		DOM.$$iframe(Drop.SELECTOR).forEach(o => {
			new Drop(o);
		});

		DOM.$$iframe(Component.SELECTOR).forEach(o => {
			Phantom.create(o);
		});
	}

	static registerEvents() {
		Workspace.offSetY = Workspace.iframe.contentWindow.scrollY;
		Workspace.offSetX = Workspace.iframe.contentWindow.scrollX;

		Workspace.iframe.contentDocument.addEventListener('scroll', event => {
			Workspace.offSetY = Workspace.iframe.contentWindow.scrollY;
			Workspace.offSetX = Workspace.iframe.contentWindow.scrollX;
		});
	}
}

