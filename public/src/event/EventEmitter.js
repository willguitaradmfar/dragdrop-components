import Log from '../status/Log';

export default class EventEmitter {
    constructor() {
    }

    on(event, cb) {
        Log.default(`EventEmitter ==>> (on) ${event}`);
        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(cb);
    }

    removeListener(event, cb) {
        Log.default(`EventEmitter ==>> (removeListener) ${event}`);
        this._events = this._events || {};
        if (event in this._events === false) return;
        this._events[event].splice(this._events[event].indexOf(cb), 1);
    }

    emit(event) {
        Log.default(`EventEmitter ==>> (emit) ${event}`);
        this._events = this._events || {};
        if (event in this._events === false) return;
        for (var i = 0; i < this._events[event].length; i++) {
            this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
}

