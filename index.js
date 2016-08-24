'use strict';

function Frequence(data, options) {
    options = options || {};

    let caseSensitive = options.caseSensitive || false;
    let keepSpecialChars = options.keepSpecialChars || false;
    let type = options.type || 'word';  //letter|word

    let buckets = [];
    let dictionary = {};

    if (data) {
        if (Array.isArray(data)) {
            data = data.join(' ');
        }
        if (!keepSpecialChars) {
            data = data.replace(/[^0-9a-zA-Z_ ]/g, '');
        }
        if (!caseSensitive) {
            data = data.toUpperCase();
        }
        switch (type) {
            case 'word':
                data = data.replace(/\s+/g, ' ');
                buckets = data.split(' ');
                break;
            case 'letter':
                data = data.replace(/\s+/g, '');
                buckets = data.split('');
                break;
        }
        buckets.forEach((token) => {
            dictionary[token] = dictionary[token] || 0;
            dictionary[token]++;
        });
    }
    return dictionary;
}

function words(data, options) {
    options = options || {};
    options.type = 'word';
    return Frequence(data, options);
}

function letters(data, options) {
    options = options || {};
    options.type = 'letter';
    return Frequence(data, options);
}

module.exports = Frequence;
module.exports.words = words;
module.exports.letters = letters;
