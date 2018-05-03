import DOM from '../helper/DOM';
import Workspace from '../workspace/Workspace';
import Component from '../Component';

export default class Inspect {

	static init() {

		//Cria components HTML
		Inspect.createComponents();

		//Adiciona no iframe
		DOM.$iframe('body').appendChild(Inspect.inspectElement);
	}

	static createComponents() {

		//Layers
		Inspect.infoElement = DOM.$iframe('#infoElement') || DOM.str2Element(`<div>div | 200x10</div>`);
		Inspect.infoElement.id = 'infoElement';
		Inspect.infoElement.style.position = 'absolute';
		Inspect.infoElement.style.widows = '50px';
		Inspect.infoElement.style.pointerEvents = 'none';
		Inspect.infoElement.style.whiteSpace = 'nowrap';
		Inspect.infoElement.style.top = '0px';
		Inspect.infoElement.style.left = '0px';
		Inspect.infoElement.style.display = 'none';
		Inspect.infoElement.style.fontSize = '10px';
		Inspect.infoElement.style.fontFamily = 'monospace';
		Inspect.infoElement.style.backgroundColor = 'black';
		Inspect.infoElement.style.borderRadius = '2px 2px 2px 2px';
		Inspect.infoElement.style.cursor = 'move !important';
		Inspect.infoElement.style.padding = '3px';
		Inspect.infoElement.style.color = 'white';
		Inspect.infoElement.style.zIndex = '5';

		Inspect.marginElement = DOM.$iframe('#marginElement') || DOM.str2Element(`<div></div>`);
		Inspect.marginElement.id = 'marginElement';
		Inspect.marginElement.style.position = 'absolute';
		Inspect.marginElement.style.zIndex = '1';
		Inspect.marginElement.style.borderColor = '#f2d59f';
		Inspect.marginElement.style.borderStyle = 'solid';
		Inspect.marginElement.style.pointerEvents = 'none';
		Inspect.marginElement.style.display = 'none';

		Inspect.borderElement = DOM.$iframe('#borderElement') || DOM.str2Element(`<div></div>`);
		Inspect.borderElement.id = 'borderElement';
		Inspect.borderElement.style.position = 'absolute';
		Inspect.borderElement.style.zIndex = '2';
		Inspect.borderElement.style.borderColor = '#ffffb3';
		Inspect.borderElement.style.borderStyle = 'solid';
		Inspect.borderElement.style.pointerEvents = 'none';
		Inspect.borderElement.style.display = 'none';

		Inspect.paddingElement = DOM.$iframe('#paddingElement') || DOM.str2Element(`<div></div>`);
		Inspect.paddingElement.id = 'paddingElement';
		Inspect.paddingElement.style.position = 'absolute';
		Inspect.paddingElement.style.zIndex = '3';
		Inspect.paddingElement.style.borderColor = '#b8e0b8';
		Inspect.paddingElement.style.borderStyle = 'solid';
		Inspect.paddingElement.style.pointerEvents = 'none';
		Inspect.paddingElement.style.display = 'none';

		Inspect.contentElement = DOM.$iframe('#contentElement') || DOM.str2Element(`<div></div>`);
		Inspect.contentElement.id = 'contentElement';
		Inspect.contentElement.style.position = 'absolute';
		Inspect.contentElement.style.zIndex = '4';
		Inspect.contentElement.style.backgroundColor = '#4492ED';
		Inspect.contentElement.style.opacity = '0.4';
		Inspect.contentElement.style.pointerEvents = 'none';
		Inspect.contentElement.style.display = 'none';

		//Cria Inspect
		Inspect.inspectElement = DOM.$iframe('#inspectElement') || DOM.str2Element(`<div></div>`);
		Inspect.inspectElement.id = 'inspectElement';
		Inspect.inspectElement.style.position = 'absolute';
		Inspect.inspectElement.style.display = 'none';
		Inspect.inspectElement.style.zIndex = '5';
		Inspect.inspectElement.style.pointerEvents = 'none';

		//Estrutura components		
		Inspect.inspectElement.appendChild(Inspect.infoElement);
		Inspect.inspectElement.appendChild(Inspect.marginElement);
		Inspect.inspectElement.appendChild(Inspect.borderElement);
		Inspect.inspectElement.appendChild(Inspect.paddingElement);
		Inspect.inspectElement.appendChild(Inspect.contentElement);
	}

	static valueProperty(str) {
		return str.replace(/(.*)px$/ig, "$1");
	}

	static update() {
		let style = window.getComputedStyle(Inspect.component, null);

		Inspect.width = Math.abs(Inspect.valueProperty(style.getPropertyValue('width')));
		Inspect.height = Math.abs(Inspect.valueProperty(style.getPropertyValue('height')));

		Inspect.marginTop = Math.abs(Inspect.valueProperty(style.getPropertyValue('margin-top')));
		Inspect.marginLeft = Math.abs(Inspect.valueProperty(style.getPropertyValue('margin-left')));
		Inspect.marginRight = Math.abs(Inspect.valueProperty(style.getPropertyValue('margin-right')));
		Inspect.marginBottom = Math.abs(Inspect.valueProperty(style.getPropertyValue('margin-bottom')));

		Inspect.borderTop = Math.abs(Inspect.valueProperty(style.getPropertyValue('border-top-width')));
		Inspect.borderLeft = Math.abs(Inspect.valueProperty(style.getPropertyValue('border-left-width')));
		Inspect.borderRight = Math.abs(Inspect.valueProperty(style.getPropertyValue('border-right-width')));
		Inspect.borderBottom = Math.abs(Inspect.valueProperty(style.getPropertyValue('border-bottom-width')));

		Inspect.paddingTop = Math.abs(Inspect.valueProperty(style.getPropertyValue('padding-top')));
		Inspect.paddingLeft = Math.abs(Inspect.valueProperty(style.getPropertyValue('padding-left')));
		Inspect.paddingRight = Math.abs(Inspect.valueProperty(style.getPropertyValue('padding-right')));
		Inspect.paddingBottom = Math.abs(Inspect.valueProperty(style.getPropertyValue('padding-bottom')));

		Inspect.infoElement.innerText = `${DOM.getAttr(Component.ATTR_NAME, Inspect.component)} | ${Inspect.width}x${Inspect.height}`;
		Inspect.infoElement.style.display = 'block';

		Inspect.marginElement.style.top = `-${Inspect.marginTop}px`;
		Inspect.marginElement.style.left = `-${Inspect.marginLeft}px`;
		Inspect.marginElement.style.width = `${Inspect.width + Inspect.marginLeft + Inspect.marginRight}px`;
		Inspect.marginElement.style.height = `${Inspect.height + Inspect.marginTop + Inspect.marginBottom}px`;
		Inspect.marginElement.style.borderWidth = `${Inspect.marginTop}px ${Inspect.marginRight}px ${Inspect.marginBottom}px ${Inspect.marginLeft}px`;
		Inspect.marginElement.style.display = 'block';

		Inspect.borderElement.style.top = `0px`;
		Inspect.borderElement.style.left = `0px`;
		Inspect.borderElement.style.width = `${Inspect.width}px`;
		Inspect.borderElement.style.height = `${Inspect.height}px`;
		Inspect.borderElement.style.borderWidth = `${Inspect.borderTop}px ${Inspect.borderRight}px ${Inspect.borderBottom}px ${Inspect.borderLeft}px`;
		Inspect.borderElement.style.display = 'block';

		Inspect.paddingElement.style.top = `${Inspect.borderTop}px`;
		Inspect.paddingElement.style.left = `${Inspect.borderLeft}px`;
		Inspect.paddingElement.style.width = `${Inspect.width - (Inspect.borderLeft + Inspect.borderRight)}px`;
		Inspect.paddingElement.style.height = `${Inspect.height - (Inspect.borderTop + Inspect.borderBottom)}px`;
		Inspect.paddingElement.style.borderWidth = `${Inspect.paddingTop}px ${Inspect.paddingRight}px ${Inspect.paddingBottom}px ${Inspect.paddingLeft}px`;
		Inspect.paddingElement.style.display = 'block';

		Inspect.contentElement.style.top = `${Inspect.borderTop + Inspect.paddingTop}px`;
		Inspect.contentElement.style.left = `${Inspect.borderLeft + Inspect.paddingLeft}px`;
		Inspect.contentElement.style.width = `${Inspect.width - (Inspect.paddingLeft + Inspect.paddingRight + Inspect.borderLeft + Inspect.borderRight)}px`;
		Inspect.contentElement.style.height = `${Inspect.height - (Inspect.paddingTop + Inspect.paddingBottom + Inspect.borderTop + Inspect.borderBottom)}px`;
		Inspect.contentElement.style.display = 'block';
	}

	/**
	 * Mostra a alça	 
	 */
	static show() {
		let rect = Inspect.component.getBoundingClientRect();

		Inspect.inspectElement.style.top = `${rect.top + Workspace.offSetY}px`;
		Inspect.inspectElement.style.left = `${rect.left + Workspace.offSetX}px`;
		Inspect.inspectElement.style.width = `${rect.width}px`;
		Inspect.inspectElement.style.height = `${rect.height}px`;
		Inspect.inspectElement.style.display = 'block';
		Inspect.update();
	}

	/**
	 * Esconde a alça
	 */
	static hide() {
		Inspect.inspectElement.style.display = 'none';
		Inspect.marginElement.style.display = 'none';
		Inspect.borderElement.style.display = 'none';
		Inspect.paddingElement.style.display = 'none';
		Inspect.contentElement.style.display = 'none';
		Inspect.infoElement.style.display = 'none';
	}
}