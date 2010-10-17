$(document).ready(function () {
        console.log('ready');
        $('.adsr').map(function () {
                console.log('adsr: ' + this);
                var svgDoc = this.getSVGDocument();
                svgDoc.drawEnvelope();
            });
    });