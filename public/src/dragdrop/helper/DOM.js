const DOM = {
    $iframe: (selector) => {
        return document.querySelector('iframe').contentDocument.querySelector(selector);
    },
    $$iframe: (selector) => {
        return document.querySelector('iframe').contentDocument.querySelectorAll(selector);
    },
    $: (selector) => {
        return document.querySelector(selector);
    },
    $$: (selector) => {
        return document.querySelectorAll(selector);
    },
    $next: (_class, _document, tailDocument = []) => {
        if (!DOM.hasClass(_class, _document) && _document.parentNode) {
            tailDocument.push(_document);
            return DOM.$next(_class, _document.parentNode, tailDocument);
        }
        return {
            _document,
            tailDocument
        };
    },
    setClass: (_class, _document) => {
        if (_document.classList) {
            _document.classList.add(_class);
        } else {
            console.error(`Não pode adicionar a classe ${_class}`);
        }
    },

    removeClass: (_class, _document) => {
        if (_document.classList) {
            _document.classList.remove(_class);
        } else {
            console.error(`Não pode remover a classe ${_class}`);
        }
    },
    hasClass: (_class, _document) => {
        if (_class instanceof Array) {
            return DOM.hasClasses(_class, _document);
        }

        if (_document && _document.classList) {
            return _document.classList.contains(_class);
        } else {
            return false;
        }
    },
    hasClasses: (_classes, _document) => {
        if (_classes instanceof Array) {
            for (let _classStr of _classes) {
                if (_document && _document.classList) {
                    if(_document.classList.contains(_classStr)){
                        return true;
                    }                    
                }
            }
        }

        return false;
    },
    hasAttr: (attr, _document) => {
        if (_document && _document.attributes) {
            return _document.attributes.hasOwnProperty(attr);
        } else {
            return false;
        }
    },
    setAttr: (attr, value, _document) => {
        _document.setAttribute(attr, value);
    },
    getAttr: (attr, _document) => {
        return _document.getAttribute(attr);
    },
    str2Element: (str) => {
        let _element = document.createElement('p');
        _element.innerHTML = str;
        return _element.childNodes[0];
    }
}



export default DOM;