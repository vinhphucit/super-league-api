"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardizePath = exports.switchNull = exports.genRandomString = exports.getRandomInt = exports.ALT_EMAIL_DOMAIN = exports.DATETIME_FORMAT_BASIC = exports.DATETIME_FORMAT_ISO = exports.DATETIME_FORMAT_NO_TZ = exports.UTC_TIMEZONE = void 0;
exports.UTC_TIMEZONE = 'Etc/UTC';
exports.DATETIME_FORMAT_NO_TZ = 'YYYY-MM-DDTHH:mm:ss';
exports.DATETIME_FORMAT_ISO = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
exports.DATETIME_FORMAT_BASIC = 'YYYY-MM-DD';
exports.ALT_EMAIL_DOMAIN = '@test.altitudehq.com';
function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.getRandomInt = getRandomInt;
function genRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
exports.genRandomString = genRandomString;
function switchNull(val1, val2) {
    if (val1 == null || val1 == undefined)
        return val2;
    return val1;
}
exports.switchNull = switchNull;
function standardizePath(val) {
    if (!val)
        return ``;
    if (!val.startsWith(`/`))
        val = `/${val}`;
    if (val.endsWith(`/`))
        val = val.substring(0, val.length - 1);
    return val;
}
exports.standardizePath = standardizePath;
//# sourceMappingURL=StringUtils.js.map