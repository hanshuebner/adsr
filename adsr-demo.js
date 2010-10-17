$(document).ready(function () {
        console.log('ready');
        $('.adsr').map(function () {
                console.log('adsr: ' + this);
                this.getSVGDocument().drawEnvelope();
            });
    });