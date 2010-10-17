

function $(id)
{
    return document.getElementById(id);
}

function drawEnvelope()
{
    var path = 'M0 0';
    var params = document.params;

    function positionMarker(id, x, y, yoffset)
    {
	if (yoffset == undefined) {
	    yoffset = -3;
	}
	$(id).setAttribute('x', x - 3);
	$(id).setAttribute('y', y + yoffset);
	path = path + 'L ' + x + ' ' + y;
    }

    var sustainLength = 40;

    positionMarker('attack', params.attack, 128);
    positionMarker('decay', params.attack + params.decay, params.sustain);
    positionMarker('sustain', params.attack + params.decay + sustainLength, params.sustain);
    positionMarker('release', params.attack + params.decay + sustainLength + params.release, 0, 0);
    $('path').setAttribute('d', path);
}

document.drawEnvelope = drawEnvelope;
document.params = {
    attack: 10,
    decay: 30,
    sustain: 100,
    release: 40
};

function beginDrag(evt) {
    console.log('begin drag ' + evt.target);
    var element = evt.target;
    element.dragStartX = evt.clientX;
    element.dragStartY = evt.clientY;
    element.onmouseup = endDrag;
    element.onmouseout = endDrag;
    element.onmousemove = dragging;
}

function dragging(evt) {
    var element = evt.target;
    console.log('dragging ' + evt.target
                + ' evt.x: ' + evt.clientX + ' evt.y: ' + evt.clientY
                + ' x: ' + element.getAttribute('x') + ' y: ' + element.getAttribute('y'));
    var deltaX = evt.clientX - element.dragStartX;
    var deltaY = evt.clientY - element.dragStartY;
    element.dragStartX = evt.clientX;
    element.dragStartY = evt.clientY;
    document.params.attack += deltaX;
    drawEnvelope();
}

function endDrag(evt) {
    console.log('end drag ' + evt.target);
    var element = evt.target;
    element.onmouseup = undefined;
    element.onmouseout = undefined;
    element.onmousemove = undefined;
}

$('attack').onmousedown = beginDrag;