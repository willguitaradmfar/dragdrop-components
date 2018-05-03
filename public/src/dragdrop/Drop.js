import Component from './Component';
import DOM from './helper/DOM';
import HTTP from './http/HTTP';
import Phantom from './phantom/Phantom';
import Cursor from './cursor/Cursor';
import Alca from './alca/Alca';
import ComponentUtil from './helper/ComponentUtil';
import Log from '../status/Log';

export default class Drop extends Component {

    static get SELECTOR() { return '.ux-droppable' }
    static get CLASS() { return 'ux-droppable' }

    constructor(_document) {
        super();
        this.document = _document;

        //Registro de eventos
        _document.addEventListener('drop', this.drop.bind(this), false);
        _document.addEventListener('dragover', this.dragover.bind(this), false);
        _document.addEventListener('dragenter', this.dragenter.bind(this), false);
        _document.addEventListener('dragleave', this.dragleave.bind(this), false);
    }

    drop(event) {
        event.stopPropagation();
        /*
        * Componente foi solto
        * indica para o componente fantasma largar no cursor
        */
        Phantom.leave();

        //Após a deixa do componente, desliga a alça
        Alca.hide();
    }

    dragover(event) {
        event.stopPropagation();
        /*
        * Move o cursor para a área do mouse
        * Caso negado, proíbe o drop nessa área
        */
        if (Cursor.move(event)) {
            return event.preventDefault();
        }
    }

    dragenter(event) {
        event.stopPropagation();
    }

    dragleave(event) {
        event.stopPropagation();
    }

}