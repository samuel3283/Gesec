var cls = "";

/* Listener Security Test*/
function onNodeInserted (event) {
    // alert ("The text node has been added to the container.");
    if(event.target.nodeName == "PANEL-BUSCAR") { //  || event.target.nodeName == "LABEL"
        // console.log("#onNodeInserted", event.target.nodeName, event);
        event.target.addEventListener('DOMNodeInserted', onNodeInserted, false);

        var element = document.getElementById ("nuevo");
        if(element != null) {
            //console.log("element addEventListener DOMAttrModified");
            element.addEventListener('DOMAttrModified', function(e){
                //console.log("#DOMAttrModified", e.target.nodeName, e);
                if (e.attrName === 'style' || e.attrName === 'class') {
                    //console.log('prevValue: ' + e.prevValue, 'newValue: ' + e.newValue);
                }
            }, false);

            cls = element.className + "";
            element.className = element.className + " disabled hide";
            //console.log(element.className);
            window.setTimeout(function(){
                element.className = cls;
                //console.log(element.className);
            }, 10000);
            // element.style.display = "none";
            // element.style.display = "inline";
        }
    }
}

function onNodeInsertedIntoDocument (e) {
    // alert ("The text node has been inserted into the document.");
    console.log("#onNodeInsertedIntoDocument", e);
}

function init() {

    function attrModified(mutation) {
        var name = mutation.attributeName,
            newValue = mutation.target.getAttribute(name),
            oldValue = mutation.oldValue;

        if(newValue != oldValue) {
            // console.log("#MutationObserver", name, newValue, mutation);            
        }
        
        if(mutation.addedNodes.length > 0) {
            // console.log(mutation.addedNodes);
        }
    }

    var container = document.getElementById ("layout");
    if (container.addEventListener) {

        var navegador = browserSelector(navigator.userAgent);
        // console.log(navegador);
        var observer;
        if(navegador === 'webkit chrome') {
            observer = new WebKitMutationObserver(function (mutations) {
                mutations.forEach(attrModified);
            });
        } else {
            observer = new MutationObserver(function (mutations) {
                mutations.forEach(attrModified);
            });
        }
        
        observer.observe(container, { attributeOldValue: true, attributes: true, subtree: true, childList: true, attributeFilter: ["class", "style"] });

        /*
        container.addEventListener('DOMNodeInserted', onNodeInserted, false);
        container.addEventListener('DOMNodeInsertedIntoDocument', onNodeInsertedIntoDocument, false);
        */

        /* document.addEventListener('DOMAttrModified', function(e){
            console.log("#DOMAttrModified", event.target.nodeName, event);
            if (e.attrName === 'style') {
                console.log('prevValue: ' + e.prevValue, 'newValue: ' + e.newValue);
            }
        }, false); */

        // container.addEventListener ('DOMNodeRemoved', OnNodeRemoved, false);
        // container.addEventListener ('DOMNodeRemovedFromDocument', OnNodeRemovedFromDocument, false);
    }
}

/*
var fred = function(a,b){return a-b;};
window.tdiff = []; 
window.document.onload = function(e){ 
    // console.log("document.onload", e, Date.now(), window.tdiff, (window.tdiff[0] = Date.now()) && window.tdiff.reduce(fred) ); 
}
*/
window.onload = function(e){ 
    // console.log("window.onload", e, Date.now(), window.tdiff, (window.tdiff[1] = Date.now()) && window.tdiff.reduce(fred) ); 
    init();
}

function browserSelector(u) {
    var ua = u.toLowerCase();
    var is = function(t) {
        return ua.indexOf(t) > -1
    };
    var g = 'gecko';
    var w = 'webkit';
    var s = 'safari';
    var o = 'opera';
    var m = 'mobile';
    var h = document.documentElement;

    var b = (!(/opera|webtv/i.test(ua)) && /msie\s(\d)/.test(ua)) ? ('ie ie' + RegExp.$1) : is('firefox/2') ? g + ' ff2' : is('firefox/3.5') ? g + ' ff3 ff3_5' : is('firefox/3.6') ? g + ' ff3 ff3_6'
                    : is('firefox/3') ? g + ' ff3' : is('gecko/') ? g : is('opera') ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.$1 : (/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : ''))
                            : is('konqueror') ? 'konqueror' : is('blackberry') ? m + ' blackberry' : is('android') ? m + ' android' : is('chrome') ? w + ' chrome' : is('iron') ? w + ' iron'
                                    : is('applewebkit/') ? w + ' ' + s + (/version\/(\d+)/.test(ua) ? ' ' + s + RegExp.$1 : '') : is('mozilla/') ? g : '';
    return b;
};

/*
document.onload = function() {
    init();
};
*/
/*
function RemoveContainer () {
    if (container.parentNode) {
        container.parentNode.removeChild (container);
    }
}

function RemoveTextFromContainer () {
    if (textNode.parentNode) {
        textNode.parentNode.removeChild (textNode);
    }
}

function AddContainer () {
    if (!container.parentNode) {
        containerParent.appendChild (container);
    }
}

function AddTextToContainer () {
    if (!textNode.parentNode) {
        container.appendChild (textNode);
    }
}

function OnNodeRemoved () {
    alert ("The text node has been removed from the container.");
}

function OnNodeRemovedFromDocument () {
    alert ("The text node has been removed from the document.");
}
*/