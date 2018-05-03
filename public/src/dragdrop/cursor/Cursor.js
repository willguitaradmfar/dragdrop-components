import DOM from '../helper/DOM';
import Workspace from '../workspace/Workspace';
import Mouse from '../Mouse';
import ComponentUtil from '../helper/ComponentUtil';
import Log from '../../status/Log';
import Drop from '../Drop';
import Component from '../Component';

export default class Cursor {

	static get ORIENTATION_NORTH_DROP() { return 'NORTH_DROP' }
	static get ORIENTATION_SOUTH_DROP() { return 'SOUTH_DROP' }
	static get ORIENTATION_EAST_DROP() { return 'EAST_DROP' }
	static get ORIENTATION_WEST_DROP() { return 'WEST_DROP' }
	static get ORIENTATION_CENTER_DROP() { return 'CENTER_DROP' }
	static get ORIENTATION_XNORTH_DROP() { return 'XNORTH_DROP' }
	static get ORIENTATION_XSOUTH_DROP() { return 'XSOUTH_DROP' }
	static get ORIENTATION_XEAST_DROP() { return 'XEAST_DROP' }
	static get ORIENTATION_XWEST_DROP() { return 'XWEST_DROP' }

	static get ORIENTATION_NORTH_NOT_DROP() { return 'NORTH_NOT_DROP' }
	static get ORIENTATION_SOUTH_NOT_DROP() { return 'SOUTH_NOT_DROP' }
	static get ORIENTATION_EAST_NOT_DROP() { return 'EAST_NOT_DROP' }
	static get ORIENTATION_WEST_NOT_DROP() { return 'WEST_NOT_DROP' }
	static get ORIENTATION_CENTER_NOT_DROP() { return 'CENTER_NOT_DROP' }
	static get ORIENTATION_XNORTH_NOT_DROP() { return 'XNORTH_NOT_DROP' }
	static get ORIENTATION_XSOUTH_NOT_DROP() { return 'XSOUTH_NOT_DROP' }
	static get ORIENTATION_XEAST_NOT_DROP() { return 'XEAST_NOT_DROP' }
	static get ORIENTATION_XWEST_NOT_DROP() { return 'XWEST_NOT_DROP' }

	static get ACTION_PREPEND() { return 'ACTION_PREPEND' }
	static get ACTION_APPEND() { return 'ACTION_APPEND' }
	static get ACTION_INNER_APPEND() { return 'ACTION_INNER_APPEND' }

	static init() {
		Cursor.createComponents();

		//Adiciona no iframe
		DOM.$iframe('body').appendChild(Cursor.cursorElement);
	}

	static createComponents() {

		Cursor.rightElement = DOM.$iframe('#rightElement') || DOM.str2Element(`<span>&#8658;</span>`);
		Cursor.rightElement.id = 'rightElement';
		Cursor.rightElement.style.position = 'absolute';
		Cursor.rightElement.style.display = 'none';
		Cursor.rightElement.style.left = '-2px';
		Cursor.rightElement.style.color = '#3E8CE4';
		Cursor.rightElement.style.pointerEvents = 'none';
		Cursor.rightElement.style.boxShadow = '1px 1px 0 rgba(255,255,255,0.2), 1px 1px 0 rgba(255,255,255,0.2) inset';

		Cursor.leftElement = DOM.$iframe('#leftElement') || DOM.str2Element(`<span>&#8656;</span>`);
		Cursor.leftElement.id = 'leftElement';
		Cursor.leftElement.style.position = 'absolute';
		Cursor.leftElement.style.display = 'none';
		Cursor.leftElement.style.left = '-12px';
		Cursor.leftElement.style.color = '#3E8CE4';
		Cursor.leftElement.style.pointerEvents = 'none';
		Cursor.leftElement.style.boxShadow = '1px 1px 0 rgba(255,255,255,0.2), 1px 1px 0 rgba(255,255,255,0.2) inset';

		Cursor.topElement = DOM.$iframe('#topElement') || DOM.str2Element(`<span>&#8657;</span>`);
		Cursor.topElement.id = 'topElement';
		Cursor.topElement.style.position = 'absolute';
		Cursor.topElement.style.display = 'none';
		Cursor.topElement.style.top = '-16px';
		Cursor.topElement.style.color = '#3E8CE4';
		Cursor.topElement.style.pointerEvents = 'none';
		Cursor.topElement.style.boxShadow = '1px 1px 0 rgba(255,255,255,0.2), 1px 1px 0 rgba(255,255,255,0.2) inset';

		Cursor.bottomElement = DOM.$iframe('#bottomElement') || DOM.str2Element(`<span>&#8659;</span>`);
		Cursor.bottomElement.id = 'bottomElement';
		Cursor.bottomElement.style.position = 'absolute';
		Cursor.bottomElement.style.display = 'none';
		Cursor.bottomElement.style.top = '-6px';
		Cursor.bottomElement.style.color = '#3E8CE4';
		Cursor.bottomElement.style.pointerEvents = 'none';
		Cursor.bottomElement.style.boxShadow = '1px 1px 0 rgba(255,255,255,0.2), 1px 1px 0 rgba(255,255,255,0.2) inset';

		//Controi o elemento cursor
		Cursor.cursorElement = DOM.$iframe('#cursorElement') || DOM.str2Element(`<div></div>`);
		Cursor.cursorElement.id = 'cursorElement';

		//Define o stylo
		Cursor.cursorElement.style.position = 'absolute';
		Cursor.cursorElement.style.border = '1px solid #3E8CE4';
		Cursor.cursorElement.style.borderBottom = '0';
		Cursor.cursorElement.style.borderRight = '0';
		Cursor.cursorElement.style.boxSizing = 'content-box';
		Cursor.cursorElement.style.display = 'none';
		Cursor.cursorElement.style.zIndex = '5';
		Cursor.cursorElement.style.borderRadius = '2px';
		Cursor.cursorElement.style.pointerEvents = 'none';
		Cursor.cursorElement.style.boxShadow = '1px 1px 0 rgba(255,255,255,0.2), 1px 1px 0 rgba(255,255,255,0.2) inset';

		Cursor.cursorElement.appendChild(Cursor.rightElement);
		Cursor.cursorElement.appendChild(Cursor.leftElement);
		Cursor.cursorElement.appendChild(Cursor.topElement);
		Cursor.cursorElement.appendChild(Cursor.bottomElement);
	}

	static setNotDroppable() {
		Cursor.bottomElement.style.color = 'red';
		Cursor.rightElement.style.color = 'red';
		Cursor.topElement.style.color = 'red';
		Cursor.leftElement.style.color = 'red';
		Cursor.cursorElement.style.border = '1px solid red';
	}

	static setDroppable() {
		Cursor.bottomElement.style.color = '#3E8CE4';
		Cursor.rightElement.style.color = '#3E8CE4';
		Cursor.topElement.style.color = '#3E8CE4';
		Cursor.leftElement.style.color = '#3E8CE4';
		Cursor.cursorElement.style.border = '1px solid #3E8CE4';
	}

	static move(event) {

		Cursor.closer = DOM.$next([Drop.CLASS, Component.CLASS], event.target);
		Cursor.closer.orientation = ComponentUtil.getOrientation(event, Cursor.closer._document);
		let boundingClientRect = Cursor.closer._document.getBoundingClientRect();
		Cursor.closer.rect = {};
		Cursor.closer.rect.top = boundingClientRect.top + Workspace.offSetY;
		Cursor.closer.rect.left = boundingClientRect.left + Workspace.offSetX;
		Cursor.closer.rect.width = boundingClientRect.width;
		Cursor.closer.rect.height = boundingClientRect.height;

		if (Cursor.canDrop(Cursor.closer.orientation, DOM.hasClass(Drop.CLASS, Cursor.closer._document))) {

			Cursor.droppable = DOM.$next(Drop.CLASS, event.target);
			Cursor.droppable = Cursor.droppable.tailDocument.pop() || Cursor.droppable._document;

			Cursor.updateDirection(Cursor.closer.rect, Cursor.closer.orientation);

			Log.default(`Pode ser arrastado ${Cursor.action} ${Cursor.closer.orientation}, closer: [${Cursor.closer._document.tagName}::${Cursor.closer._document.classList}]`)

			Cursor.setDroppable();

			return true;
		}

		Log.default(`Não pode ser arrastado ${Cursor.action} ${Cursor.closer.orientation}, closer: [${Cursor.closer._document.tagName}::${Cursor.closer._document.classList}]`);

		Cursor.setNotDroppable();

		return false;
	}

	static canDrop(orientation, isDroppable) {

		if (orientation == Mouse.ORIENTATION_XEAST) {
			Cursor.orientation = (isDroppable ? Cursor.ORIENTATION_XEAST_DROP : Cursor.ORIENTATION_XEAST_NOT_DROP);
			if (Cursor.closer._document.tagName.toUpperCase() == 'BODY') {
				Cursor.action = Cursor.ACTION_INNER_APPEND;
			} else {
				if (isDroppable && !DOM.hasClass(Drop.CLASS, Cursor.closer.parentNode)) return false;
				Cursor.action = Cursor.ACTION_APPEND;
			}
			return true;
		}
		if (orientation == Mouse.ORIENTATION_XNORTH) {
			Cursor.orientation = (isDroppable ? Cursor.ORIENTATION_XNORTH_DROP : Cursor.ORIENTATION_XNORTH_NOT_DROP);
			if (Cursor.closer._document.tagName.toUpperCase() == 'BODY') {
				Cursor.action = Cursor.ACTION_INNER_APPEND;
			} else {
				if (isDroppable && !DOM.hasClass(Drop.CLASS, Cursor.closer.parentNode)) return false;
				Cursor.action = Cursor.ACTION_PREPEND;
			}

			return true;
		}
		if (orientation == Mouse.ORIENTATION_XSOUTH) {
			Cursor.orientation = (isDroppable ? Cursor.ORIENTATION_XSOUTH_DROP : Cursor.ORIENTATION_XSOUTH_NOT_DROP);
			if (Cursor.closer._document.tagName.toUpperCase() == 'BODY') {
				Cursor.action = Cursor.ACTION_INNER_APPEND;
			} else {
				if (isDroppable && !DOM.hasClass(Drop.CLASS, Cursor.closer.parentNode)) return false;
				Cursor.action = Cursor.ACTION_APPEND;
			}
			return true;
		}
		if (orientation == Mouse.ORIENTATION_XWEST) {
			Cursor.orientation = (isDroppable ? Cursor.ORIENTATION_XWEST_DROP : Cursor.ORIENTATION_XWEST_NOT_DROP);
			if (Cursor.closer._document.tagName.toUpperCase() == 'BODY') {
				Cursor.action = Cursor.ACTION_INNER_APPEND;
			} else {
				if (isDroppable && !DOM.hasClass(Drop.CLASS, Cursor.closer.parentNode)) return false;
				Cursor.action = Cursor.ACTION_PREPEND;
			}
			return true;
		}
		if (orientation == Mouse.ORIENTATION_CENTER) {
			Cursor.orientation = (isDroppable ? Cursor.ORIENTATION_CENTER_DROP : Cursor.ORIENTATION_CENTER_NOT_DROP);
			if (isDroppable) {
				Cursor.action = Cursor.ACTION_INNER_APPEND;
				return true;
			}
		}
		if (orientation == Mouse.ORIENTATION_EAST) {
			Cursor.orientation = (isDroppable ? Cursor.ORIENTATION_EAST_DROP : Cursor.ORIENTATION_EAST_NOT_DROP);
			if (isDroppable) {
				Cursor.action = Cursor.ACTION_INNER_APPEND;
				return true;
			}
		}
		if (orientation == Mouse.ORIENTATION_NORTH) {
			Cursor.orientation = (isDroppable ? Cursor.ORIENTATION_NORTH_DROP : Cursor.ORIENTATION_NORTH_NOT_DROP);
			if (isDroppable) {
				Cursor.action = Cursor.ACTION_INNER_APPEND;
				return true;
			}
		}
		if (orientation == Mouse.ORIENTATION_SOUTH) {
			Cursor.orientation = (isDroppable ? Cursor.ORIENTATION_SOUTH_DROP : Cursor.ORIENTATION_SOUTH_NOT_DROP);
			if (isDroppable) {
				Cursor.action = Cursor.ACTION_INNER_APPEND;
				return true;
			}
		}
		if (orientation == Mouse.ORIENTATION_WEST) {
			Cursor.orientation = (isDroppable ? Cursor.ORIENTATION_WEST_DROP : Cursor.ORIENTATION_WEST_NOT_DROP);
			if (isDroppable) {
				Cursor.action = Cursor.ACTION_INNER_APPEND;
				return true;
			}
		}

		return false;
	}

	static resetDirection() {
		Cursor.rightElement.style.display = 'none';
		Cursor.leftElement.style.display = 'none';
		Cursor.topElement.style.display = 'none';
		Cursor.bottomElement.style.display = 'none';
	}

	static updateDirection(rect, orientation) {
		Cursor.resetDirection();
		Cursor.cursorElement.style.display = 'block';
		Cursor[orientation]();
	}

	static XEAST() {
		if (Cursor.orientation == Cursor.ORIENTATION_XEAST_NOT_DROP || Cursor.orientation == Cursor.ORIENTATION_XEAST_DROP) {

			Cursor.topElement.style.display = 'block';
			Cursor.bottomElement.style.display = 'block';

			Cursor.topElement.style.top = `${Cursor.closer.rect.height - 4}px`;
			Cursor.topElement.style.left = `-6px`;
			Cursor.bottomElement.style.top = `-17px`;
			Cursor.bottomElement.style.left = `-6px`;

			Cursor.cursorElement.style.top = `${Cursor.closer.rect.top}px`;
			Cursor.cursorElement.style.left = `${Cursor.closer.rect.left + Cursor.closer.rect.width}px`;
			Cursor.cursorElement.style.height = `${Cursor.closer.rect.height}px`;
			Cursor.cursorElement.style.width = `0px`;
		}
	}

	static XNORTH() {
		if (Cursor.orientation == Cursor.ORIENTATION_XNORTH_NOT_DROP || Cursor.orientation == Cursor.ORIENTATION_XNORTH_DROP) {

			Cursor.leftElement.style.display = 'block';
			Cursor.rightElement.style.display = 'block';

			Cursor.rightElement.style.top = `-11px`;
			Cursor.rightElement.style.left = `-13px`;
			Cursor.leftElement.style.top = `-11px`;
			Cursor.leftElement.style.left = `${Cursor.closer.rect.width}px`;

			Cursor.cursorElement.style.top = `${Cursor.closer.rect.top}px`;
			Cursor.cursorElement.style.left = `${Cursor.closer.rect.left}px`;
			Cursor.cursorElement.style.height = `0px`;
			Cursor.cursorElement.style.width = `${Cursor.closer.rect.width}px`;
		}
	}

	static XSOUTH() {
		if (Cursor.orientation == Cursor.ORIENTATION_XSOUTH_NOT_DROP || Cursor.orientation == Cursor.ORIENTATION_XSOUTH_DROP) {

			Cursor.leftElement.style.display = 'block';
			Cursor.rightElement.style.display = 'block';

			Cursor.rightElement.style.top = `-11px`;
			Cursor.rightElement.style.left = `-13px`;
			Cursor.leftElement.style.top = `-11px`;
			Cursor.leftElement.style.left = `${Cursor.closer.rect.width}px`;

			Cursor.cursorElement.style.top = `${Cursor.closer.rect.top + Cursor.closer.rect.height}px`;
			Cursor.cursorElement.style.left = `${Cursor.closer.rect.left}px`;
			Cursor.cursorElement.style.height = `0px`;
			Cursor.cursorElement.style.width = `${Cursor.closer.rect.width}px`;
		}
	}

	static XWEST() {
		if (Cursor.orientation == Cursor.ORIENTATION_XWEST_NOT_DROP || Cursor.orientation == Cursor.ORIENTATION_XWEST_DROP) {

			Cursor.topElement.style.display = 'block';
			Cursor.bottomElement.style.display = 'block';
			Cursor.topElement.style.top = `${Cursor.closer.rect.height - 4}px`;
			Cursor.topElement.style.left = `-6px`;
			Cursor.bottomElement.style.top = `-17px`;
			Cursor.bottomElement.style.left = `-6px`

			Cursor.cursorElement.style.top = `${Cursor.closer.rect.top}px`;
			Cursor.cursorElement.style.left = `${Cursor.closer.rect.left}px`;
			Cursor.cursorElement.style.height = `${Cursor.closer.rect.height}px`;
			Cursor.cursorElement.style.width = `0px`;
		}
	}
	static CENTER() {
		if (Cursor.orientation == Cursor.ORIENTATION_CENTER_DROP) {
			Cursor.topElement.style.left = `${(Cursor.closer.rect.width / 2) - 7}px`;
			Cursor.topElement.style.top = `-16px`;

			Cursor.cursorElement.style.top = `${Cursor.closer.rect.top + Cursor.closer.rect.height}px`;
			Cursor.cursorElement.style.left = `${Cursor.closer.rect.left}px`;
			Cursor.cursorElement.style.height = `0px`;
			Cursor.cursorElement.style.width = `${Cursor.closer.rect.width}px`;
		}
	}
	static EAST() {
		if (Cursor.orientation == Cursor.ORIENTATION_EAST_DROP) {

			Cursor.leftElement.style.display = 'block';

			Cursor.leftElement.style.top = `${(Cursor.closer.rect.height / 2) - 10}px`;
			Cursor.leftElement.style.left = `-12px`;

			Cursor.cursorElement.style.top = `${Cursor.closer.rect.top}px`;
			Cursor.cursorElement.style.left = `${Cursor.closer.rect.left + Cursor.closer.rect.width}px`;
			Cursor.cursorElement.style.height = `${Cursor.closer.rect.height}px`;
			Cursor.cursorElement.style.width = `0px`;
		}
	}
	static NORTH() {
		if (Cursor.orientation == Cursor.ORIENTATION_NORTH_DROP) {
			Cursor.bottomElement.style.display = 'block';

			Cursor.bottomElement.style.left = `${(Cursor.closer.rect.width / 2) - 7}px`;
			Cursor.bottomElement.style.top = `-5px`;

			Cursor.cursorElement.style.top = `${Cursor.closer.rect.top}px`;
			Cursor.cursorElement.style.left = `${Cursor.closer.rect.left}px`;
			Cursor.cursorElement.style.height = `0px`;
			Cursor.cursorElement.style.width = `${Cursor.closer.rect.width}px`;
		}
	}
	static SOUTH() {
		Cursor.topElement.style.display = 'block';

		if (Cursor.orientation == Cursor.ORIENTATION_SOUTH_DROP) {
			//Calcula a metade para as setas								
			Cursor.topElement.style.left = `${(Cursor.closer.rect.width / 2) - 7}px`;
			Cursor.topElement.style.top = `-16px`;

			Cursor.cursorElement.style.top = `${Cursor.closer.rect.top + Cursor.closer.rect.height}px`;
			Cursor.cursorElement.style.left = `${Cursor.closer.rect.left}px`;
			Cursor.cursorElement.style.height = `0px`;
			Cursor.cursorElement.style.width = `${Cursor.closer.rect.width}px`;
		}
	}
	static WEST() {
		if (Cursor.orientation == Cursor.ORIENTATION_WEST_DROP) {
			Cursor.rightElement.style.display = 'block';

			Cursor.rightElement.style.top = `${(Cursor.closer.rect.height / 2) - 10}px`;
			Cursor.rightElement.style.left = `-1px`;

			Cursor.cursorElement.style.top = `${Cursor.closer.rect.top}px`;
			Cursor.cursorElement.style.left = `${Cursor.closer.rect.left}px`;
			Cursor.cursorElement.style.height = `${Cursor.closer.rect.height}px`;
			Cursor.cursorElement.style.width = `0px`;
		}
	}

	static detach() {
		Cursor.cursorElement.style.display = 'none';
	}
}