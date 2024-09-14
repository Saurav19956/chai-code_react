
function customRender(reactElement, container){
    /*
    // create element  which is empty now 

    const domElement = document.createElement(reactElement.type);

    // usingInnerHTML find content
    domElement.innerHTML = reactElement.children;
    
    // add props which an attribute
    domElement.setAttribute('href', reactElement.props.href);
    domElement.setAttribute('target', reactElement.props.target);

    // now append created element into main container

    container.appendChild(domElement)*/

    // 2nd approch : above one need to add manully setAttribute in 2nd one use for in loop in object

    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.children;

    for (const prop in reactElement.props) {
       if(prop === 'children') continue;
       domElement.setAttribute(prop, reactElement.props[prop])
    }
   container.appendChild(domElement)

}




// step2, when we return html element in function how react saw it . Note : every element should be written like this below for 'a' tag

const reactElement = {
    type : 'a', // type of lement here is 'a' tag, maybe div , p or h tag etc,
    props : {    // props are object in 'a' tag there is href, target , alt etc
        href: 'http://google.com',
        target: '_blank'
   
    } ,
    children : 'click me to visit google'
}


//step1. grab the root id 
const mainContainer = document.querySelector('#root')

// step3. need to inject the react element into div or root for rendering, that is done tghrough the function component or method

 customRender(reactElement, mainContainer) // it takes 2 params what need to be inject and where 

