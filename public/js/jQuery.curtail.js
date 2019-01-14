/*!
 * Copyright (c) 2016 Arnolds Kozlovskis
 *
 * jQuery Curtail plugin
 * Version 1.1.2 (November 2016)
 *
 * Licensed under the MIT License
 */

/* global jQuery */
(function ($) {
    'use strict';

    $.fn.curtail = function (options) {
        var settings = $.extend({
            limit: 250,
            ellipsis: '...',
            toggle: false,
            text: ['read more', 'read more']
        }, options);

        $(this).each(function () {
            var $this = $(this),
                p = $this.find('> p'),
                a = $this.find('> span');

            if (p.text().length > settings.limit) {
                init(p, a);
            } else {
                a.hide();
            }
        });

        function init(p, a) {

            a[0].text = settings.text[1];

            var oldParagraphs = nowParagraphs(p),
                newParagraphs = nextParagraphs(p),
                flag = true;

            setParagraphs(p, newParagraphs);            

            a.on('click', function (e) {

                if (settings.toggle) {

                    if (flag) {
                        setParagraphs(p, oldParagraphs);
                        this.text = settings.text[0];
                    } else {
                        setParagraphs(p, newParagraphs);
                        this.text = settings.text[1];
                    }

                    flag = !flag;
                } else {
                    setParagraphs(p, oldParagraphs);
                    a.hide();
                }

                e.preventDefault();
            });
        }

        function nowParagraphs(paragraphs) {
            var strArr = [];

            for (var i = 0; i < paragraphs.length; i++) {
                strArr.push(paragraphs[i].innerHTML);
            }

            return strArr;
        }

        function nextParagraphs(paragraphs) {
            var strArr = [],
                chars = 0,
                truncate = 0;

            paragraphs.each(function () {
                var str = $(this).html(),
                    len = str.length;

                chars += len;

                if (chars <= settings.limit) {
                    strArr.push(str);
                } else {
                    truncate = settings.limit - (chars - len);

                    if (truncate > 0) {
                        strArr.push(str.slice(0, truncate) + settings.ellipsis);
                    } else {
                        strArr.push('');
                    }
                }
            });

            return strArr;
        }

        function setParagraphs(para1, para2) {
            for (var i = 0; i < para1.length; i++) {
                para1[i].innerHTML = para2[i];
            }
        }
    };
}(jQuery));