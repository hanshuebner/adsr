
function log(message) {
    console.log(message);
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
                    log('change delay: ' + params.delay
                        + ' attack: ' + params.attack
                        + ' decay: ' + params.decay
                        + ' sustain: ' + params.sustain
                        + ' release: ' + params.release);
                }
            });
    });