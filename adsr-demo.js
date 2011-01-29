
var log;

try {
    log = console.log;
}
catch (e) {
    log = function () {}
}

$(document).ready(function () {
        log('ready');
        $('form').submit(function () {
                log('submit');
                return false;
            });
        $('.adsr').map(function () {
                log('adsr: ' + this);
                var svgDoc = this.getSVGDocument();
                svgDoc.drawEnvelope();
                svgDoc.onchange = function () {
                    var params = svgDoc.params;
                    log('change attack: ' + params.attack
                        + ' decay: ' + params.decay
                        + ' sustain: ' + params.sustain
                        + ' release: ' + params.release);
                }
            });
    });