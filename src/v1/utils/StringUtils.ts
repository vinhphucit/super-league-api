import moment from "moment";
export const UTC_TIMEZONE = 'Etc/UTC';
export const DATETIME_FORMAT_NO_TZ: string = 'YYYY-MM-DDTHH:mm:ss';
export const DATETIME_FORMAT_ISO: string = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
export const DATETIME_FORMAT_BASIC: string = 'YYYY-MM-DD';
export const ALT_EMAIL_DOMAIN: string = '@test.altitudehq.com';


export function getRandomInt(max: number, min: number = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export function genRandomString(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export function switchNull(val1: any, val2: any): any {
    if(val1==null || val1 == undefined)
    return val2;
    return val1;
    
}

export function standardizePath(val: string):string{
    if(!val) return ``
    if(!val.startsWith(`/`)) val = `/${val}`;
    if(val.endsWith(`/`)) val = val.substring(0, val.length-1);
    return val;
}