const i18n = require('i18n');

const configureI18N = (root_path) => {
    i18n.configure({
        objectNotation: true,
        locales: ['en', 'es'],
        directory: root_path + '/locales'
    });
    
    return i18n;
}

module.exports = configureI18N;