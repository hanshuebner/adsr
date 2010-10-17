$(document).ready(function () {
        console.log('ready');
        $('form').submit(function () {
                console.log('submit');
                return false;
            });
        $('.adsr').map(function () {
                console.log('adsr: ' + this);
                var svgDoc = this.getSVGDocument();
                svgDoc.drawEnvelope();
                svgDoc.onchange = function () {
                    var params = svgDoc.params;
                    console.log('change attack: ' + params.attack
                                + ' decay: ' + params.decay
                                + ' sustain: ' + params.sustain
                                + ' release: ' + params.release);
                }
            });
    });