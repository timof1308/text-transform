/*
 * Version 0.0.0
 * Author: Timo Fischer
 */

/**
 * Text-Transform
 * @param $element
 * @param settings
 * @constructor
 */
function Text_Transform($element, settings) {
    if (typeof $element !== 'string') {
        console.warn('Element must be type of String');
        return;
    }
    this.element = $($element);
    if (settings != null && typeof settings !== 'object') {
        console.warn('Settings must be type of JSON');
        return;
    }
    this.settings = settings;

    this.init();
}

/**
 * Text-Transform
 * Initialize en- & decoding
 */
Text_Transform.prototype.init = function () {
    // prepare empty arrays
    this.decoded_array = []; // pure text
    this.encoded_array = []; // text encoded with special characters
    this.transformed_indexes = []; // transformed indexes
    this.retransformed_indexes = []; // re-transformed indexes
    // use default duration before starting encoding
    this.encode_delay = 7000; // 7s
    // use default duration before starting decoding
    this.decode_delay = 1250; // 1,25s


    // fallback characters
    var fallback_chars = '@!§$%&\\/()=?+*#-_<>{}[]';

    // check if settings are defined
    if (typeof this.settings !== typeof undefined) {
        // check if settings characters are defined
        if (typeof this.settings.chars !== typeof undefined) {
            this.chars = this.settings.chars;
        } else {
            // use fallback characters
            this.chars = fallback_chars;
        }

        // check if settings default text is defined
        if (typeof this.settings.text !== typeof undefined) {
            this.decoded = this.settings.text;
        } else {
            // get inner html of element
            this.decoded = this.element.html();
        }

        // check if loop is set in settings
        if (typeof this.settings.encode_delay !== typeof undefined) {
            this.loop = this.settings.loop;
        } else {
            this.loop = false;
        }

        // check if encode delay is set in settings
        if (typeof this.settings.encode_delay !== typeof undefined) {
            this.encode_delay = this.settings.encode_delay;
        }
        // check if decode delay is set in settings
        if (typeof this.settings.decode_delay !== typeof undefined) {
            this.decode_delay = this.settings.decode_delay;
        }
    } else { // settings are not defined
        // get html attribute value
        var chars = this.element.attr('tt-chars');
        // check if html attribute is set
        if (typeof chars !== typeof undefined && chars !== false) {
            this.chars = chars;
        } else {
            // use fallback characters in case no html attribute has been found
            this.chars = fallback_chars;
        }

        // get html attribute value
        var text = this.element.attr('tt-text');
        // check if html attribute is set
        if (typeof text !== typeof undefined && text !== false) {
            this.decoded = text;
        } else {
            // get inner html of element
            this.decoded = this.element.html();
        }

        this.loop = false;
    }

    // filling arrays
    for (var i = 0; i < this.decoded.length; i++) {
        this.decoded_array[i] = this.decoded[i];
        this.encoded_array[i] = " ";
    }

    var _this = this;
    var transformed = false;
    $(window).on('resize scroll', function () {
        if (_this.element.isInViewport() && !transformed) {
            transformed = true;
            setTimeout(function () {
                _this.encode();
            }, 375);
        }
    });

};

/**
 * Text-Transform
 * Encode from clear text to random characters
 */
Text_Transform.prototype.encode = function () {
// random integer between 0 and array length
    var rdm_int = Math.floor((Math.random() * this.decoded_array.length));
    // check if random integer / index of array has already been transformed
    if (!this.transformed_indexes.includes(rdm_int)) {

        var _this = this;

        // each character wait 40ms
        setTimeout(function () {
            // prepare scroll to screen with new element height
            var _first_one = false;
            if (_this.transformed_indexes.length === 0) {
                _first_one = true;
            }
            // mark index as done through array push
            _this.transformed_indexes.push(rdm_int);
            // get random character
            var rdm_char = Math.floor((Math.random() * _this.chars.length));
            _this.encoded_array[rdm_int] = _this.chars[rdm_char];
            // transform array to string
            var encoded = _this.encoded_array.join('');
            // get scroll position if the first character has not been transformed yet
            if (_first_one) {
                var $scroll = $('html');
                var scrollTop = $scroll.scrollTop(),
                    height = _this.element.height();
            }
            // show transformed string in html
            $('#replace').text(encoded);
            // scroll screen to old position with new element height
            if (_first_one) {
                var newHeight = _this.element.height(),
                    newScrollTop = scrollTop + newHeight - height;
                $scroll.scrollTop(newScrollTop);
            }
            // infinite loop until all indexes have been transformed
            if (_this.transformed_indexes.length !== _this.encoded_array.length) {
                _this.encode();
            } else {
                setTimeout(function () {
                    _this.transformed_indexes = [];
                    _this.decode();
                }, _this.decode_delay);
            }
        }, 40);
    } else {
        // infinite loop until all indexes have been transformed
        if (this.transformed_indexes.length !== this.encoded_array.length) {
            this.encode();
        }
    }
};

/**
 * Text-Transform
 * Decode from random character string to clear text
 */
Text_Transform.prototype.decode = function () {
// random integer between 0 and array length
    var rdm_int = Math.floor((Math.random() * this.decoded_array.length));
    // check if random integer / index of array has already been transformed
    if (!this.retransformed_indexes.includes(rdm_int)) {
        var _this = this;

        // each character wait 25ms
        setTimeout(function () {
            // mark index as done through array push
            _this.retransformed_indexes.push(rdm_int);
            _this.encoded_array[rdm_int] = _this.decoded_array[rdm_int];
            // transform array to string
            var decoded = _this.encoded_array.join('');
            // show transformed string in html
            $('#replace').text(decoded);
            // infinite loop until all indexes have been transformed
            if (_this.retransformed_indexes.length !== _this.decoded_array.length) {
                _this.decode();
            } else {
                if (_this.loop === true) {
                    setTimeout(function () {
                        _this.retransformed_indexes = [];
                        _this.encode();
                    }, _this.encode_delay);
                }
            }
        }, 100);
    } else {
        // infinite loop until all indexes have been transformed
        if (this.retransformed_indexes.length !== this.decoded_array.length) {
            this.decode();
        }
    }
};

/**
 * Check if element is in viewport
 * @returns {boolean}
 */
$.fn.isInViewport = function () {
    var win = $(window);

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};
