$(document).ready(function () {
    // special characters
    var chars = "@!§$%&\\/()=?+*#-_<>{}[]";
    // var chars = "01 01";
    var decoded = $('#replace').html();
    // preparing arrays
    var decoded_array = []; // pure text
    var encoded_array = []; // text encoded with special characters
    var transformed_indexes = []; // transformed indexes
    var retransformed_indexes = []; // re-transformed indexes

    // filling arrays
    for (var i = 0; i < decoded.length; i++) {
        decoded_array[i] = decoded[i];
        encoded_array[i] = " ";
    }

    /*
     * Encoding String from clear text to special characters
     */
    function encoding() {
        // random integer between 0 and array length
        var rdm_int = Math.floor((Math.random() * decoded_array.length));
        // check if random integer / index of array has already been transformed
        if (!transformed_indexes.includes(rdm_int)) {
            // each character wait 40ms
            setTimeout(function () {
                // mark index as done through array push
                transformed_indexes.push(rdm_int);
                // get random character
                var rdm_char = Math.floor((Math.random() * chars.length));
                encoded_array[rdm_int] = chars[rdm_char];
                // transform array to string
                var encoded = encoded_array.join('');
                // show transformed string in html
                $('#replace').html(encoded);
                // infinite loop until all indexes have been transformed
                if (transformed_indexes.length !== encoded_array.length) {
                    encoding();
                } else {
                    setTimeout(function () {
                        transformed_indexes = [];
                        decoding();
                    }, 1250);
                }
            }, 40);
        } else {
            // infinite loop until all indexes have been transformed
            if (transformed_indexes.length !== encoded_array.length) {
                encoding();
            }
        }
    }

    /*
     * Decoding String from special characters to clear text
     */
    function decoding() {
        // random integer between 0 and array length
        var rdm_int = Math.floor((Math.random() * decoded_array.length));
        // check if random integer / index of array has already been transformed
        if (!retransformed_indexes.includes(rdm_int)) {
            // each character wait 25ms
            setTimeout(function () {
                // mark index as done through array push
                retransformed_indexes.push(rdm_int);
                encoded_array[rdm_int] = decoded_array[rdm_int];
                // transform array to string
                var decoded = encoded_array.join('');
                // show transformed string in html
                $('#replace').html(decoded);
                // infinite loop until all indexes have been transformed
                if (retransformed_indexes.length !== decoded_array.length) {
                    decoding();
                } else {
                    setTimeout(function () {
                        retransformed_indexes = [];
                        encoding();
                    }, 7000)
                }
            }, 100);
        } else {
            // infinite loop until all indexes have been transformed
            if (retransformed_indexes.length !== decoded_array.length) {
                decoding();
            }
        }
    }

    encoding();
});
