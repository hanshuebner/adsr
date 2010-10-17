

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

