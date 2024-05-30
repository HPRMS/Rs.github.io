sjs.define(function(){
    return {
        isIE:"ActiveXObject" in window          //兼容IE11(只有IE才可以跑的程式)

        // handle multiple browsers for requestAnimationFrame()
        ,requestAFrame:(function () {
           return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    // if all else fails, use setTimeout
                    function (callback) {
                        return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
                    };
        })()

        // handle multiple browsers for cancelAnimationFrame()
        ,cancelAFrame:(function () {
            return window.cancelAnimationFrame ||
                    window.webkitCancelAnimationFrame ||
                    window.mozCancelAnimationFrame ||
                    window.oCancelAnimationFrame ||
                    function (id) {
                        window.clearTimeout(id);
                    };
        })()

       ,setCookie :function(name, value, expires, path, domain, secure) {
            var expDays = expires * 24 * 60 * 60 * 1000;
            var expDate = new Date();
            expDate.setTime(expDate.getTime() + expDays);
            var expString = expires == null ? "" : ";expires=" + expDate.toGMTString();
            var pathString = path == null ? "" : ";path=" + path;
            var domainString = domain == null ? "" : ";domain=" + domain;
            var secureString = secure == true ? ";secure" : "";
            document.cookie = name + "=" + escape(value) + expString + pathString + domainString + secureString;
        }

        ,getCookie:function(name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg){
                    var endstr = document.cookie.indexOf(";", j);
                    if (endstr == -1)
                        endstr = document.cookie.length;
                    return unescape(document.cookie.substring(j, endstr));
                }
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0) break;
            }
            return null;
        }

	    ,clearCookie: function (key) {
		    this.setCookie(key, '', -1);
	    }

    }
});