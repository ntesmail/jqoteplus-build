/*
 * jy-deploy
 *
 * Copyright (c) 2014 ntesmail
 * Licensed under the MIT license.
 */

'use strict';

var JQOTE2_TMPL_UNDEF_ERROR = 'UndefinedTemplateError',
    JQOTE2_TMPL_COMP_ERROR = 'TemplateCompilationError',
    JQOTE2_TMPL_EXEC_ERROR = 'TemplateExecutionError';
var ARR = '[object Array]',
    STR = '[object String]',
    FUNC = '[object Function]';

var n = 1,
    tag = '%',
    qreg = /^[^<]*(<[\w\W]+>)[^>]*$/,
    type_of = Object.prototype.toString;

function raise(error, ext) {
    throw ($.extend(error, ext), error);
}

function jqotec(template, t) {
    var cache, elem, tmpl,
        type = type_of.call(template),
        ie = true; //$.browser.msie && (parseInt($.browser.version, 10) < 9);
    t = t || tag;
    if (type === STR && qreg.test(template)) {
        elem = tmpl = template;

    //     if (cache = $.jqotecache[template]) {
    //         return cache;
    //     }
    // } else {
    //     elem = type === STR || template.nodeType ?
    //         $(template) : template instanceof jQuery ?
    //         template : null;

    //     if (!elem[0] || !(tmpl = elem[0].innerHTML) && !(tmpl = elem.text())) {
    //         raise(new Error('Empty or undefined template passed to $.jqotec'), {
    //             type: JQOTE2_TMPL_UNDEF_ERROR
    //         });
    //     }

    //     if (cache = $.jqotecache[$.data(elem[0], 'jqote_id')]) {
    //         return cache;
    //     }
    }

    var index, fn, str = '',
        strArr = [],
        arr = tmpl.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]/g, '').split('<' + t).join(t + '>\x1b').split(t + '>');

    // define two templates
    var pushTemp = ['out.push("', '");', 'out.push(', ');', '', 'var out=[];', 'return out.join("");'],
        strTemp = ['out+="', '";', 'out+=', ';', '', 'var out="";', 'return out;'];

    var mode = ie ? pushTemp : strTemp;

    for (var m = 0, l = arr.length; m < l; m++) {
        var temp = arr[m];

        if (temp) {

            if (temp.charAt(0) !== '\x1b') {
                if (ie) {
                    strArr.push(mode[0]);
                    strArr.push(temp.replace(/([^\\])?(["'])/g, '$1\\$2'));
                    strArr.push(mode[1]);
                } else {
                    str += mode[0] + temp.replace(/([^\\])?(["'])/g, '$1\\$2') + mode[1];
                }
            } else {
                if (temp.charAt(1) === '=') {
                    if (ie) {
                        strArr.push(mode[2]);
                        strArr.push(temp.substr(2));
                        strArr.push(mode[3]);
                    } else {
                        str += mode[2] + temp.substr(2) + mode[3];
                    }
                } else {
                    if (ie) {
                        strArr.push(mode[4]);
                        strArr.push(temp.substr(1));
                    } else {
                        str += mode[4] + temp.substr(1);
                    }
                }
            }
            if (ie) {
                strArr.push('\n');
            } else {
                str += '\n';
            }
        }
    }

    if (ie) {
        strArr.unshift('try{');
        strArr.unshift(mode[5]);
        strArr.push(mode[6]);
        strArr.push('}catch(e){e.type="TemplateExecutionError";e.args=arguments;e.template=arguments.callee.toString();throw e;}');
        str = strArr.join('');
    } else {
        str = 'try{' + mode[5] + str + mode[6] +
            '}catch(e){e.type="TemplateExecutionError";e.args=arguments;e.template=arguments.callee.toString();throw e;}';
    }

    return str;
    // try {
    //     fn = new Function('i, j, data, fn', str);
    // } catch (e) {
    //     raise(e, {
    //         type: JQOTE2_TMPL_COMP_ERROR
    //     });
    // }

    // index = elem instanceof jQuery ?
    //     $.data(elem[0], 'jqote_id', n) : elem;

    // return $.jqotecache[index] = (fn.jqote_id = n++, fn);
}
exports.jqotec = jqotec;