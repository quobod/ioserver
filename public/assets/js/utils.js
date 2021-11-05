const stringify = (arg = []) => JSON.stringify(arg);
const parse = (arg = {}) => JSON.parse(arg);
const log = (arg = "") => console.log(arg);

const addHandler = (theElement, whichEvent, method) => {
    if (
        null != theElement &&
        null != whichEvent &&
        typeof method == "function"
    ) {
        theElement.addEventListener(whichEvent, method);
    }
};

const addAttribute = (theElement, whichAttribute, attributeValue) => {
    if (null != theElement) {
        theElement.setAttribute(whichAttribute, attributeValue);
    }
};

const removeAttribute = (theElement, whichAttribute) => {
    if (null != theElement) {
        if (theElement.hasAttribute(whichAttribute)) {
            theElement.removeAttribute(whichAttribute);
        }
    }
};

const getElement = (nameIdClass) => {
    let element = null;
    if (null != (element = document.querySelector(`${nameIdClass}`))) {
        return element;
    } else if (null != (element = document.querySelector(`#${nameIdClass}`))) {
        return element;
    } else if (null != (element = document.querySelector(`.${nameIdClass}`))) {
        return element;
    }
    return null;
};

const size = (arg = null) => {
    if (null != arg) {
        if (Array.isArray(arg)) {
            return arg.length;
        } else if (arg instanceof Object && !Array.isArray(arg)) {
            return Object.keys(arg).length;
        } else if (
            !(arg instanceof Object) &&
            !Array.isArray(arg) &&
            typeof arg == "string"
        ) {
            return arg.length;
        } else {
            return NaN;
        }
    }
};
