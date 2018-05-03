export default class Mouse {

	/*
                            XNORTH
                             ||
                             ||
                            NORTH
                             ||
                             ||
                             ||
                             ||
                             ||
	XWEST <== WEST <====================> EAST ==> XEAST
                             ||
                             ||
                             ||
                             ||
                             ||
                            SOUTH
                             ||
                             ||
                            XSOUTH

	*/

	static get ORIENTATION_NORTH() { return 'NORTH' }
	static get ORIENTATION_SOUTH() { return 'SOUTH' }
	static get ORIENTATION_EAST() { return 'EAST' }
	static get ORIENTATION_WEST() { return 'WEST' }
	static get ORIENTATION_CENTER() { return 'CENTER' }

	static get ORIENTATION_XNORTH() { return 'XNORTH' }
	static get ORIENTATION_XSOUTH() { return 'XSOUTH' }
	static get ORIENTATION_XEAST() { return 'XEAST' }
	static get ORIENTATION_XWEST() { return 'XWEST' }


	constructor() {
	}
}