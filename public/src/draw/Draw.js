import Log from '../status/Log';
import Cursor from '../dragdrop/cursor/Cursor';
import Alca from '../dragdrop/alca/Alca';
import Inspect from '../dragdrop/inspect/Inspect';
import Workspace from '../dragdrop/workspace/Workspace'
import Phantom from '../dragdrop/phantom/Phantom'
import Drag from '../dragdrop/Drag'

export default class Draw {
	constructor() {		
		this.loadLog();
		this.loadAlca();
		this.loadInspect();
		this.loadCursor();
		this.loadWorkspace();		
	}

	//static get Phantom() { return Phantom }
	static get Drag() { return Drag }
	static get Workspace() { return Workspace }
	static get Alca() { return Alca }	

	loadLog() {
		Log.bind();
	}

	loadAlca() {
		Alca.init();
	}

	loadInspect() {
		Inspect.init();
	}

	loadCursor() {
		Cursor.init();
	}

	loadWorkspace() {
		Workspace.init();
	}	
}