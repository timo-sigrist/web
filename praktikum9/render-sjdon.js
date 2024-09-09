function renderSJDON(element, parent) {
    const [tagName, props, ...children] = element;
  
    // Erstelle das DOM-Element
    const el = document.createElement(tagName);

    //handling props
    if (typeof props === 'object') {
        if (props.hasOwnProperty('style')) {
            el.setAttribute('style', props.style)
        }
    } else if (typeof props === 'string') {
        const stringEl = document.createTextNode(props)
        el.appendChild(stringEl)
    }

    //handling children
    if (isArrayWithSingleString(children)) {
        const stringEl = document.createTextNode(children[0])
        el.appendChild(stringEl)
    } else if (Array.isArray(children) && children.length > 0) {
        children.forEach(child => {
            renderSJDON(child, el)
        })
    }

    // Füge das erstellte Element zum übergeordneten Element hinzu
    parent.appendChild(el);
}

function isArrayWithSingleString(arr) {
    return (
      Array.isArray(arr) &&
      arr.length === 1 &&
      typeof arr[0] === 'string'
    );
}