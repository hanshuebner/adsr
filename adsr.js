

function $(id)
{
    return document.getElementById(id);
}

function drawEnvelope()
{
    var path;
    var params = document.params;

    function positionMarker(id, x, y, yoffset)
    {
	if (yoffset == undefined) {
	    yoffset = -8;
	}
	$(id).setAttribute('x', x - 8);
	$(id).setAttribute('y', y + yoffset);
        if (path) {
	    path = path + 'L ' + x + ' ' + y;
        } else {
            path = 'M' + x + ' ' + y;
        }
    }

    var sustainLength = 40;
    
    positionMarker('delay', params.delay, 0, 0);
    positionMarker('attack', params.delay + params.attack, 128);
    positionMarker('decay', params.delay + params.attack + params.decay, params.sustain);
    positionMarker('sustain', params.delay + params.attack + params.decay + sustainLength, params.sustain);
    positionMarker('release', params.delay + params.attack + params.decay + sustainLength + params.release, 0, 0);
    $('path').setAttribute('d', path);
}

function doAllHandles(f) {
    var handles = document.getElementsByClassName('handle');
    for (var i = 0; i < handles.length; i++) {
        f(handles[i]);
    }
}

var drag = undefined;

function beginDrag(evt) {
    // console.log('begin drag ' + evt.target);
    drag = {
        element: evt.target,
        prevX: evt.clientX,
        prevY: evt.clientY
    };
    var id = evt.target.id;
    drag.ondrag = function (deltaX, deltaY) {
        var param = document.params[id];
        switch (id) {
        case 'delay':
        case 'attack':
        case 'decay':
        case 'release':
            param += deltaX;
            break;
        case 'sustain':
            param += deltaY;
            break;
        }
        document.params[id] = Math.max(0, Math.min(127, param));
    }
    document.onmousemove = dragging;
}

function dragging(evt) {
    // console.log('dragging ' + evt.target
    //            + ' evt.x: ' + evt.clientX + ' evt.y: ' + evt.clientY);
    var deltaX = evt.clientX - drag.prevX;
    var deltaY = evt.clientY - drag.prevY;
    drag.ondrag(deltaX, -deltaY);
    drag.prevX = evt.clientX;
    drag.prevY = evt.clientY;
    drawEnvelope();
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, true);
    document.dispatchEvent(event);
    var element = evt.target;
}

function endDrag(evt) {
    // console.log('end drag ' + evt.target);
    if (drag) {
        document.onmousemove = undefined;
        drag = undefined;
    }
}

function highlightHandle(evt) {
    event.target.style = 'fill: #d00';
}

doAllHandles(function (handle) {
    handle.onmousedown = beginDrag;
    handle.onmouseover = highlightHandle;
});

document.onmouseup = endDrag;
document.drawEnvelope = drawEnvelope;
document.params = {
    delay: 20,
    attack: 10,
    decay: 30,
    sustain: 100,
    release: 40
};

drawEnvelope();
