sjs._setCssLoaded("Core5.Widget.Input");
sjs._setCssLoaded("Core5.Shp.Icon");
sjs._setCssLoaded("Core5.Widget.Button");
sjs._setCssLoaded("Core5.Shp.Other");
sjs._setCssLoaded("Core5.Html.Layout");
sjs._setCssLoaded("Core5.Widget.YearPicker");
sjs._setCssLoaded("Core5.Widget.MonthPicker");
sjs._setCssLoaded("Core5.Shp.Panel");
sjs._setCssLoaded("Core5.Html.DatePicker");
sjs._setCssLoaded("Core5.Widget.DatePicker");
sjs._setCssLoaded("Core5.YT.Button");
sjs._setCssLoaded("Core5.YT.Panel");
sjs._setCssLoaded("Core5.YT.Model");
sjs._setCssLoaded("Core5.Html.Grid");
sjs._setCssLoaded("Core5.Widget.Grid");
sjs._setCssLoaded("Core5.Widget.Menu");
sjs._setCssLoaded("Core5.Widget.Toolbar");
sjs._setCssLoaded("Core5.App.Pagebar");
sjs._setCssLoaded("Core5.Widget.Table.ReportStyle");
sjs._setCssLoaded("Core5.Widget.Table.ColAdjust");
sjs._setCssLoaded("Core5.Widget.Ability.DragResize");
sjs._setCssLoaded("Core5.Layout.Form");
sjs._setCssLoaded("Core5.Layout.Form2");
sjs._setCssLoaded("Core5.Shp.icon");
sjs._setCssLoaded("Core5.Widget.Table");
sjs._setCssLoaded("Core5.Layout.LabelForm");
sjs._setCssLoaded("Core5.Widget.Ability.ActionInfoWin");
sjs._setCssLoaded("Core5.YT.Msg");
sjs._setCssLoaded("Core5.Widget.Input.CheckGroup");
sjs._setCssLoaded("Core5.Widget.WeekPicker");
sjs._setCssLoaded("Core5.Widget.Tree");
sjs._setCssLoaded("Core5.Widget.Loading");
sjs._setCssLoaded("Core5.YT.Taskbar");
sjs._setCssLoaded("Core5.YT.Tab");
var _before_merge_js = sjs._getCurrentLoadingUsing();
sjs._setCurrentLoadingUsing({ js: "Core5.Util.EventManager" });
sjs.define(function () {
  var d = [];
  return {
    subscribe: function (a) {
      d.push(a);
    },
    unSubscribe: function (a) {
      for (var c = 0; c < d.length; c++)
        if (d[c] == a) {
          d.splice(c, 1);
          break;
        }
    },
    publish: function (a, c, b, f, e) {
      for (
        var g = Array.prototype.slice.call(arguments, 2),
          i = "on" + (c.substr(0, 1).toUpperCase() + c.substr(1)),
          h = 0;
        h < d.length;
        h++
      ) {
        var j = d[h],
          k = j[i];
        "string" == typeof k && (k = j[k]);
        "function" == typeof k && k.apply(j, [a].concat(g));
      }
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Layout.Float" });
sjs.define(function () {
  return {
    _initInnerItem: function (d, a) {
      var c = this.$base(d, a);
      c.css && c.css("float", d.floatRight ? "right" : "left");
      return c;
    },
    innerHtml: function (d) {
      this.$base(d);
      d.push("<div style='clear:both'></div>");
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Layout.Layout" });
sjs.define(function () {
  return { layoutOnly: !0 };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.UIManager" });
sjs.define(function () {
  var d = 0,
    a = {};
  return {
    reg: function (c, b) {
      var f = b || "c_" + ++d;
      a[f] = c;
      return f;
    },
    unReg: function (c) {
      delete a[c];
    },
    get: function (c) {
      return a[c] || null;
    },
    getPool: function () {
      return a;
    },
    getPoolCount: function () {
      var c = 0,
        b;
      for (b in a) c++;
      return c;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "jQuery" });
window._no_jquery_module = !0;
sjs
  .loadJs(
    !window.qs ||
      !qs.JS ||
      0 < qs.JS.toLowerCase().indexOf(".run") ||
      "Bonding.NewTest" == qs.JS ||
      "QIPDayReport.Default" == qs.JS ||
      0 <= qs.JS.indexOf("UI.") ||
      0 <= qs.JS.indexOf("Core2.")
      ? "./Ref/jquery-1.11.1.min.js"
      : "./Ref/jQuery-1.4.2.min.js"
  )
  .loadJs("./Ref/jquery.mousewheel.js")
  .define(function () {
    !window._org_jquery && jQuery && (window._org_jquery = jQuery);
    return window._org_jquery;
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.GetHelper" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.UIManager")
  .define(function (d, a) {
    function c(b, a) {
      "string" == typeof b && (b = d(b));
      if (b.attr(a)) return b;
      var c = b.parents("[" + a.toLowerCase() + "]");
      return c.length ? d(c[0]) : null;
    }
    return {
      getHasAttr: c,
      getSjsObj: function (b, f) {
        var f = f || "s-objId",
          e = c(b, f);
        return e ? a.get(e.attr(f)) : null;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.PopManager" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.GetHelper")
  .define(function (d, a) {
    function c(f) {
      if (!f._hasPopDown) {
        var c = -1,
          g = null,
          i;
        (target = a.getHasAttr(d(f.target), "pop-obj"))
          ? (g = a.getSjsObj(target))
          : (i = d(f.target).attr("s-mask-target-objId")) &&
            (g = a.getSjsObj(d(f.target), "s-mask-target-objId"));
        g && ((c = b.find(g)), i && c--);
        b.hideByLevel(c);
      }
    }
    var b = {
      _pops: [],
      add: function (b) {
        this._pops.push(b);
      },
      find: function (b) {
        for (var a = 0; a < this._pops.length; a++)
          if (this._pops[a] == b) return a;
        return -1;
      },
      remove: function (b) {
        b = this.find(b);
        -1 != b && this._pops.splice(b, 1);
      },
      hideByLevel: function (b) {
        b += 1;
        if (0 <= b)
          for (var a = this._pops.length - 1; a >= b; a--)
            this._pops[a].noClickHide || this._pops[a].hide();
      },
      getTopZIndex: function () {
        var b = this._pops.length;
        return 0 < b ? this._pops[b - 1].zIndex : 100;
      },
    };
    d(document).bind("mousedown", c);
    b.whenBodyClick = c;
    return b;
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.onclick" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.GetHelper")
  .using("Core5.DomEvent.PopManager")
  .define(function (d, a, c) {
    function b(b, c, g) {
      var i = a.getSjsObj(c);
      sjs.__currentPressAlt = g.altKey;
      i && i._onDomEvent && i._onDomEvent(b, c, g);
      delete sjs.__currentPressAlt;
    }
    d(document)
      .delegate("[s-click]", "click", function (a) {
        b("click", d(this), a);
      })
      .delegate("[s-dblclick]", "dblclick", function (a) {
        b("dblclick", d(this), a);
      })
      .delegate("[s-mousedown]", "mousedown", function (a) {
        c.whenBodyClick(a);
        a._hasPopDown = !0;
        b("mousedown", d(this), a);
      })
      .delegate("[s-mouseup]", "mouseup", function (a) {
        b("mouseup", d(this), a);
      });
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Util.Tool" });
sjs.using("Core5.Util.EventManager").define(function (d) {
  return {
    isIE: "ActiveXObject" in window,
    requestAFrame: (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (a) {
          return window.setTimeout(a, 1e3 / 60);
        }
      );
    })(),
    cancelAFrame: (function () {
      return (
        window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function (a) {
          window.clearTimeout(a);
        }
      );
    })(),
    setCookie: function (a, c, b, f, e, g) {
      var i = new Date();
      i.setTime(i.getTime() + 864e5 * b);
      b = null == b ? "" : ";expires=" + i.toGMTString();
      document.cookie =
        a +
        "=" +
        escape(c) +
        b +
        (null == f ? "" : ";path=" + f) +
        (null == e ? "" : ";domain=" + e) +
        (!0 == g ? ";secure" : "");
    },
    getCookie: function (a) {
      for (
        var c = a + "=", b = c.length, f = document.cookie.length, e = 0;
        e < f;

      ) {
        a = e + b;
        if (document.cookie.substring(e, a) == c)
          return (
            (c = document.cookie.indexOf(";", a)),
            -1 == c && (c = document.cookie.length),
            unescape(document.cookie.substring(a, c))
          );
        e = document.cookie.indexOf(" ", e) + 1;
        if (0 == e) break;
      }
      return null;
    },
    clearCookie: function (a) {
      this.setCookie(a, "", -1);
    },
    ok: function (a) {
      d.publish(this, "displayLoadingMsg", "ok", a);
    },
    error: function (a) {
      d.publish(this, "displayLoadingMsg", "err", a);
    },
    warn: function (a) {
      d.publish(this, "displayLoadingMsg", "warn", a);
    },
    info: function (a) {
      d.publish(this, "displayLoadingMsg", "common", a);
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Util.Lang" });
sjs
  .using("jQuery")
  .using("Core5.Util.Tool")
  .define(function (d, a) {
    return {
      langContents: {},
      setLangMap: function (a, b, f) {
        this.langContents[a] || (this.langContents[a] = {});
        if ("string" == typeof b) this.langContents[a][b] = f;
        else for (var e in b) this.langContents[a][e] = b[e];
      },
      getLangMap: function (a, b) {
        var a = a || this.defaultLang,
          f = this.langContents[a] ? this.langContents[a][b] || null : null;
        !f &&
          a != this.defaultLang &&
          ((a = this.defaultLang),
          (f = this.langContents[a] ? this.langContents[a][b] || null : null));
        return f;
      },
      switchLang: function (c) {
        c ? a.setCookie("SJS_LANG", c, 3650, "/") : a.clearCookie("SJS_LANG");
        var b = this;
        d("i").each(function () {
          b._switchLang(d(this), c);
        });
      },
      _switchLang: function (a, b) {
        var f = a.text(),
          e = a.attr("s-lang-default");
        !e && a.attr("s-lang-default", f);
        f = a.attr("s-lang-id") || e || f;
        (f = this.getLangMap(b, f))
          ? a.text(f)
          : (f = a.attr(b))
          ? a.text(f)
          : e && a.text(e);
      },
      html: function (a, b) {
        a.html(this.parseRenderHtml(b));
      },
      getPageLang: function () {
        return sjs.getLanguage() || a.getCookie("SJS_LANG");
      },
      defaultLang: "en",
      parseRenderHtml: function (a) {
        var b = this.getPageLang(),
          f = this;
        b &&
          a &&
          (a = d("<div></div>")
            .html(a)
            .find("i")
            .each(function () {
              f._switchLang(d(this), b);
            })
            .end()
            .html());
        return a;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.DomEvent" });
sjs.using("Core5.DomEvent.UIManager").define(function (d) {
  return {
    regUIObj: !1,
    init: function () {
      this.$base();
      this.regUIObj &&
        ((this._objId = d.reg(this)), this.attr("s-objId", this._objId));
    },
    _dispose: function (a) {
      this.$base(a);
      this.regUIObj && d.unReg(this._objId);
    },
    disableEvent: function (a) {
      this[a + "-disabled"] = !0;
    },
    enableEvent: function (a) {
      this[a + "-disabled"] = !1;
    },
    _onDomEvent: function (a, c, b, f) {
      if (
        (a = c.attr("s-" + a)) &&
        !this[a + "-disabled"] &&
        (!0 === this[a + "ActiveDisabled"] || !this.isDisabled())
      ) {
        var e = this["on" + a.substr(0, 1).toUpperCase() + a.substr(1)];
        "function" == typeof e
          ? e.call(this, c, b, f)
          : this.report && this.report(a, c, b, f);
      }
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Cls" });
sjs.define(function () {
  function d() {
    if (this[h]) {
      var b = arguments.callee.caller,
        a = b[j];
      if (a) {
        var f = this[h][a];
        if (f && f.length) {
          var c = null;
          if (this[a] == b) c = f[f.length - 1];
          else
            for (a = f.length - 1; 0 <= a; a--)
              if (f[a] == b) {
                1 <= a && (c = f[a - 1]);
                break;
              }
          return !(1 == arguments.length && arguments[0] == k) &&
            "function" == typeof c
            ? ((b = Array.prototype.slice.call(arguments, 0)), c.apply(this, b))
            : c;
        }
      }
    }
  }
  function a(a, b) {
    for (var f = 0; f < b.length; f++)
      if (b[f]) {
        for (var c = !1, e = 0; e < a.length; e++)
          if (a[e] == b[f]) {
            c = !0;
            break;
          }
        c || a.push(b[f]);
      }
  }
  function c(b, f) {
    if (f) {
      for (var e in f)
        if ("$" != e.substr(0, 1)) {
          if (
            "function" == typeof f[e] &&
            ("undefined" != typeof b[e] || (f[h] && f[h][e]))
          ) {
            b[h] || (b[h] = {});
            b[h][e] || (b[h][e] = []);
            f[e][j] = e;
            "function" == typeof b[e] && (b[e][j] = e);
            "undefined" != typeof b[e] && a(b[h][e], [b[e]]);
            f[h] && f[h][e] && a(b[h][e], f[h][e]);
            for (var i = b[h][e], g = f[e], k = 0; k < i.length; k++)
              if (i[k] == g) {
                i.splice(k, 1);
                break;
              }
          } else b[h] && b[h][e] && delete b[h][e];
          b[e] = f[e];
        }
      b[l] = d;
    }
    e = Array.prototype.slice.call(arguments, 2);
    if (0 < e.length) for (i = 0; i < e.length; i++) c(b, e[i]);
    return b;
  }
  function b(b) {
    var a = {},
      f;
    for (f in b) a[f] = [].concat(b[f]);
    return a;
  }
  function f(a, f) {
    var e = {},
      i;
    for (i in a)
      i == h ? (e[i] = b(a[i])) : "$" != i.substr(0, 1) && (e[i] = a[i]);
    i = Array.prototype.slice.call(arguments, 1);
    0 < i.length && (i.unshift(e), c.apply(null, i));
    return e;
  }
  function e(b) {
    if (b[s])
      throw Error(
        "\u8acb\u52ff\u5c07cls.create\u51fa\u4f86\u7684\u5c0d\u8c61\uff0c\u53c8\u7528\u4f86extend\u5b50\u5c0d\u8c61"
      );
    var a;
    if (!b[n] && !b[o] && !b[m]) a = b;
    else if (b[p]) a = b[p];
    else {
      a = [];
      var c = b[n];
      c && a.push(e(c));
      var i = b[o];
      if (i) for (c = 0; c < i.length; c++) i[c] && a.push(e(i[c]));
      a.push(b);
      if ((i = b[m])) for (c = 0; c < i.length; c++) i[c] && a.push(e(i[c]));
      a = f.apply(null, a);
      b[p] = a;
      a[t] = b[t];
    }
    a[l] || (a[l] = d);
    return a;
  }
  function g(b) {
    return "[object Array]" === Object.prototype.toString.apply(b);
  }
  function i(a, f, i, d, j) {
    "undefined" == typeof a[t] && (a[t] = sjs.getDefineIn(a));
    var k = e(a),
      l = k[q];
    l ||
      ((l = function (f, i) {
        this[h] = b(this[h]);
        this[s] = !0;
        for (var g = [this], d = 0; d < f.length; d++) f[d] && g.push(e(f[d]));
        g.push(i);
        c.apply(null, g);
        this._REMEMBER_NEW && (this._REMEMBER_NEW = { $extend: a, $mixin: f });
        this.init && this.init();
        this.init = null;
        this[h].init = null;
      }),
      (l.prototype = k),
      (k[q] = l));
    var k = Array.prototype.slice.call(arguments, 1),
      n = null;
    0 < k.length && (n = k.pop());
    for (var o = [], m = 0; m < k.length; m++)
      g(k[m]) ? (o = o.concat(k[m])) : o.push(k[m]);
    return new l(o, n);
  }
  var h = "$CHAIN",
    j = "$METHOD",
    k = "$ONLY_GET",
    l = "$base",
    n = "$extend",
    o = "$mixin",
    m = "$plugin",
    p = "$TYPE_CACHE",
    q = "$TYPE_FN_CACHE",
    s = "$new",
    t = "$DEFINE_IN";
  return {
    apply: c,
    mixin: f,
    define: e,
    create: i,
    create_no_new: function (b, a, f, i, d) {
      "undefined" == typeof b[t] && (b[t] = sjs.getDefineIn(b));
      var j = e(b),
        k = Array.prototype.slice.call(arguments, 1),
        l = null;
      0 < k.length && (l = k.pop());
      for (var n = [], o = 0; o < k.length; o++)
        g(k[o]) ? (n = n.concat(k[o])) : n.push(k[o]);
      k = n;
      j = [{}, j];
      for (n = 0; n < k.length; n++) k[n] && j.push(e(k[n]));
      j.push(l);
      j = c.apply(null, j);
      j.init && j.init();
      j.init = null;
      j[h] && (j[h].init = null);
      return j;
    },
    create_single: function (b, a, f, c, h) {
      "undefined" == typeof b[t] && (b[t] = sjs.getDefineIn(b));
      var d = e(b),
        j = d.$TYPE_SINGLE_CACHE;
      j ||
        ((j = i.apply(null, Array.prototype.slice.call(arguments, 0))),
        (d.$TYPE_SINGLE_CACHE = j));
      var k = Array.prototype.slice.call(arguments, 1),
        l = null;
      0 < k.length && (l = k.pop());
      for (var n = [], o = 0; o < k.length; o++)
        g(k[o]) ? (n = n.concat(k[o])) : n.push(k[o]);
      d[q].call(j, n, l);
      return j;
    },
    createCount: function () {
      return 0;
    },
    createTime: function () {
      return 0;
    },
    callBaseTime: function () {
      return 0;
    },
    callBaseCount: function () {
      return 0;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.CreateChild" });
sjs.using("Core5.Cls").define(function (d) {
  return {
    init: function () {
      this.parent &&
        !this.parent.createChild &&
        (this.id && (this.parent[this.id] = this),
        this.responser || this.setResponser(this.parent));
      this.$base();
    },
    createChild: function (a, c, b, f, e) {
      var g = Array.prototype.slice.call(arguments),
        i = g[g.length - 1];
      if (this.layoutOnly && !i.ignoreParentLayoutOnly)
        return this.parent.createChild.apply(this.parent, g);
      i = this._children = this._children || [];
      g.splice(1, 0, { parent: this, responser: this });
      this.response(this, "CHILDCREATING", g);
      var h = d.create.apply(null, g);
      this.response(this, "CHILDCREATED", h, g);
      h.setResponser && h.setResponser(this);
      if (h.id) {
        if (this[h.id])
          throw (h.dispose && h.dispose(), Error("id already exists:" + h.id));
        this[h.id] = h;
      }
      i.push(h);
      return h;
    },
    setResponser: function (a) {
      this.responser = a;
      return this;
    },
    report: function (a) {
      if (this.responser) {
        var c = Array.prototype.slice.call(arguments, 0);
        c.unshift(this);
        if (this.responser.response)
          this.responser.response.apply(this.responser, c);
        else {
          var b =
            this.responser["on" + (a.substr(0, 1).toUpperCase() + a.substr(1))];
          "function" == typeof b && b.apply(this.responser, c);
        }
      }
      return this;
    },
    isDisabled: function () {
      if (!this.$base()) {
        var a = this.responser;
        return a && "function" == typeof a.isDisabled ? a.isDisabled() : !1;
      }
      return !0;
    },
    _setDisabled: function (a, c) {
      this.$base(a, c);
      if (c) this.onDisabledChange(a);
    },
    onDisabledChange: function (a) {
      var c = this._children;
      if (c)
        for (var b = 0; b < c.length; b++)
          c[b] && c[b].onDisabledChange && c[b].onDisabledChange(a);
    },
    bubbleResponse: !0,
    response: function (a, c, b, f, e) {
      if (!0 === this[c + "ActiveDisabled"] || !this.isDisabled()) {
        var g = Array.prototype.slice.call(arguments, 2),
          i = "on" + (c.substr(0, 1).toUpperCase() + c.substr(1)),
          h = this[i],
          d = !0;
        "function" == typeof h && (d = h.apply(this, [a].concat(g)));
        !0 === d &&
          this.responser &&
          ((h = [a, c].concat(g)),
          this.responser.response
            ? this.responser.response.apply(this.responser, h)
            : ((h = this.responser[i]),
              "function" == typeof h &&
                h.apply(this.responser, [a].concat(g))));
      }
    },
    _dispose: function (a) {
      if (this.parent) {
        var c = this.parent._children;
        if (c)
          for (var b = c.length, f = 0; f < b; f++)
            if (c[f] == this) {
              c.splice(f, 1);
              break;
            }
        this.id && delete this.parent[this.id];
      }
      if (this._children) {
        b = this._children.length;
        for (f = 0; f < b; f++)
          if ((c = this._children[f]) && c.dispose)
            (c.parent = null), this._disposeChild(c);
      }
      this.$base(a);
    },
    _disposeChild: function (a) {
      a.dispose();
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Disable" });
sjs.define(function () {
  return {
    disabled: !1,
    disabledClass: "s-disabled",
    init: function () {
      this.$base();
      this._initData("disabled");
    },
    _setDisabled: function (d, a) {
      a && (d ? this._disable() : this._enable());
    },
    _disable: function () {
      this.addClass(this.disabledClass);
    },
    _enable: function () {
      this.removeClass(this.disabledClass);
    },
    isDisabled: function () {
      return this.disabled;
    },
    disable: function () {
      this.set("disabled", !0);
      return this;
    },
    enable: function () {
      this.set("disabled", !1);
      return this;
    },
    setDisabled: function (d) {
      this.set("disabled", d);
      return this;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Visible" });
sjs.define(function () {
  return {
    init: function () {
      this.$base();
      this._initData("visible", !0);
    },
    _setVisible: function (d, a) {
      a &&
        (this.displayBlock || this.isRender()
          ? d
            ? this._show()
            : this._hide()
          : d
          ? this.css(
              "visible" == this.displayMode ? "visibility" : "display",
              null
            )
          : "visible" == this.displayMode
          ? this.css("visibility", "hidden")
          : this.css("display", "none"),
        this.onVisibleChange && this.onVisibleChange(d));
    },
    _show: function () {
      "visible" == this.displayMode
        ? this.css("visibility", "visible")
        : this.css("display", this.displayBlock || "block");
    },
    _hide: function () {
      "visible" == this.displayMode
        ? this.css("visibility", "hidden")
        : this.css("display", "none");
    },
    isVisible: function () {
      return this.visible;
    },
    show: function () {
      this.set("visible", !0);
      return this;
    },
    hide: function () {
      this.set("visible", !1);
      return this;
    },
    setVisible: function (d) {
      this.set("visible", d);
      return this;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Util.NumberCal" });
sjs.define(function () {
  function d(a) {
    var a = "" + a,
      c = a.indexOf(".");
    return -1 < c ? a.length - c - 1 : 0;
  }
  return {
    add: function (a, c) {
      a = null === a ? "xxx" : a;
      c = null === c ? "xxx" : c;
      if (isNaN(a) && isNaN(c)) return 0;
      if (isNaN(a)) return c;
      if (isNaN(c)) return a;
      var b = d(a),
        f = d(c);
      if (!b && !f) return a + c;
      b = Math.pow(10, Math.max(b, f));
      a = Math.round(a * b);
      c = Math.round(c * b);
      return (a + c) / b;
    },
    sub: function (a, c) {
      a = null === a ? "xxx" : a;
      c = null === c ? "xxx" : c;
      if (isNaN(a) && isNaN(c)) return 0;
      if (isNaN(a)) return -1 * c;
      if (isNaN(c)) return a;
      var b = d(a),
        f = d(c);
      if (!b && !f) return a - c;
      b = Math.pow(10, Math.max(b, f));
      a = Math.round(a * b);
      c = Math.round(c * b);
      return (a - c) / b;
    },
    mul: function (a, c) {
      a = null === a ? "xxx" : a;
      c = null === c ? "xxx" : c;
      if ((isNaN(a) && isNaN(c)) || isNaN(a) || isNaN(c)) return 0;
      var b = d(a),
        f = d(c);
      if (!b && !f) return a * c;
      var e = Math.pow(10, b),
        g = Math.pow(10, f),
        b = Math.pow(10, b + f),
        a = Math.round(a * e),
        c = Math.round(c * g);
      return (a * c) / b;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Util.DataFn" });
sjs.using("Core5.Util.NumberCal").define(function (d) {
  function a(b) {
    if (b) {
      for (var b = b.split(","), a = [], f = [], c = 0; c < b.length; c++) {
        var e = b[c].split(" "),
          g = e[0],
          d = "asc";
        1 < e.length && (d = e[1]);
        a.push(g);
        f.push(d);
      }
      return [a, f];
    }
    return null;
  }
  function c(b, a) {
    if ("undefined" != typeof b && null !== b && "object" == typeof b) {
      if (b.push) for (var f = [], e = 0; e < b.length; e++) f.push(c(b[e], a));
      else {
        var f = {};
        for (e in b) f[e] = a && "$" == e[0] ? b[e] : c(b[e], a);
      }
      return f;
    }
    return b;
  }
  function b(a, f) {
    if (f) for (var c in f) a[c] = f[c];
    c = Array.prototype.slice.call(arguments, 2);
    if (0 < c.length) for (var e = 0; e < c.length; e++) b(a, c[e]);
    return a;
  }
  function f(b, a) {
    var f = 0;
    if (b) for (var c = 0; c < b.length; c++) f = d.add(f, b[c][a]);
    return f;
  }
  function e(b, a) {
    return f(b, a.calFieldNo || a.fieldNo);
  }
  var g = {
    sum: e,
    count: function (b) {
      return b.length;
    },
    "count distinct": null,
    average: function (b, a) {
      var c = f(b, a.calFieldNo || a.fieldNo),
        e = Math.pow(
          10,
          "undefined" == typeof a.decimalCount ? 2 : a.decimalCount || 0
        );
      return Math.round((e * c) / b.length) / e;
    },
    rate: function (b, a, c) {
      var e = 0,
        g = 0,
        e = a.caledFieldNo1 ? c[a.caledFieldNo1] : f(b, a.calFieldNo1);
      return (g = a.caledFieldNo2 ? c[a.caledFieldNo2] : f(b, a.caledFieldNo2))
        ? ((b = Math.pow(
            10,
            "undefined" == typeof a.decimalCount ? 2 : a.decimalCount || 0
          )),
          Math.round((b * (a.noRate ? 100 : 1) * e) / g) / b)
        : 0;
    },
  };
  return {
    deepCopy: c,
    apply: b,
    mixin: function (a, f) {
      var c = {},
        e;
      for (e in a) c[e] = a[e];
      e = Array.prototype.slice.call(arguments, 1);
      0 < e.length && (e.unshift(c), b.apply(null, e));
      return c;
    },
    select: function (b, a) {
      if (b) {
        for (var f = [], c = 0; c < b.length; c++) {
          var e = !0,
            g;
          for (g in a)
            if (b[c][g] !== a[g]) {
              e = !1;
              break;
            }
          e && f.push(b[c]);
        }
        return f;
      }
      return null;
    },
    pager: function (b, a, f) {
      return b ? b.slice(a * (f - 1), a * f) : b;
    },
    distinctValues: function (b, a) {
      var f = [];
      if (b)
        for (var c = {}, e = 0; e < b.length; e++) {
          var g = b[e][a];
          c[g] || ((c[g] = 1), f.push(g));
        }
      return f;
    },
    distinct: function (b, a, f, c) {
      if (b) {
        for (var e = [], c = c || {}, g = 0; g < b.length; g++) {
          for (var d = b[g], m = "", p = 0; p < a.length; p++)
            m += (m ? f || "," : "") + d[a[p]];
          c[m] || ((d = b[g]), (c[m] = d), e.push(d));
        }
        return e;
      }
      return null;
    },
    getRowByField: function (b, a, f) {
      if (b) for (var c = 0; c < b.length; c++) if (b[c][a] == f) return b[c];
      return null;
    },
    getRowByFields: function (b, a) {
      if (b)
        for (var f = 0; f < b.length; f++) {
          var c = !0,
            e;
          for (e in a)
            if (b[f][e] !== a[e]) {
              c = !1;
              break;
            }
          if (c) return b[f];
        }
      return null;
    },
    indexOf: function (b, a, f) {
      if (b)
        for (var c = 0; c < b.length; c++)
          if ((f ? b[c][f] : b[c]) == a) return c;
      return -1;
    },
    lastIndexOf: function (b, a, f) {
      if (b)
        for (var c = b.length - 1; 0 <= c; c--)
          if ((f ? b[c][f] : b[c]) == a) return c;
      return -1;
    },
    remove: function (b, a, f) {
      return b && ((a = this.indexOf(b, a, f)), 0 <= a)
        ? (b.splice(a, 1), a)
        : -1;
    },
    compareAry: function (b, a) {
      if (b && a) {
        if (b.length != a.length) return !1;
        for (var f = 0; f < b.length; f++)
          if (-1 == this.indexOf(a, b[f])) return !1;
        return !0;
      }
      return (!b && !a) || (!b && 0 == a.length) || (!a && 0 == b.length)
        ? !0
        : !1;
    },
    sort: function (b, f, c) {
      if ("string" == typeof f) {
        var e = a(f);
        e && ((f = e[0]), (c = e[1]));
      }
      if (b && f && f.length) {
        var g = function (b, a, e) {
          e = e || 0;
          if (e >= f.length) return 0;
          var i,
            d = f[e];
          i = c && c[e] ? c[e] : "asc";
          var k = b && b[d],
            d = a && a[d];
          if ("undefined" == typeof k || null === k)
            k = "string" == typeof d ? "" : 0;
          if ("undefined" == typeof d || null === d)
            d = "string" == typeof k ? "" : 0;
          i =
            k == d ? 0 : k < d ? ("desc" == i ? 1 : -1) : "desc" == i ? -1 : 1;
          return 0 == i ? g(b, a, e + 1) : i;
        };
        b.sort(g);
      }
    },
    rowsToDic: function (b, a, f) {
      var c = {};
      if (b)
        for (var e = 0; e < b.length; e++) {
          for (var g = "", d = 0; d < a.length; d++)
            g += (0 < g.length ? f || "|" : "") + b[e][a[d]];
          c[g] = b[e];
        }
      return c;
    },
    loopDic: function (b, a, f, c, e) {
      if (b) {
        for (var g = [], d = [], m = 0; m < b.length; m++)
          this._fillDicLevel(g, a, d, b[m]);
        this._loopLevelItems(g, "", d, 1, "", 0, f, c, e);
      }
    },
    _fillDicLevel: function (b, a, f, c) {
      var e = b.length;
      b.push(c);
      e = { rowIndex: e };
      f.push(e);
      if ((f = c[a])) {
        c = [];
        e.items = c;
        for (e = 0; e < f.length; e++) this._fillDicLevel(b, a, c, f[e]);
      }
    },
    _loopLevelItems: function (b, a, f, c, e, g, d, m, p) {
      for (var q = 0; q < f.length; q++) {
        var s = f[q],
          t = q + 1;
        s.items
          ? ((p = p || m),
            p.call(d, b, a, s, c, t, e, g, !1),
            this._loopLevelItems(
              b,
              a,
              s.items,
              c + 1,
              e + (e ? "." : "") + t,
              s.items.length,
              d,
              m,
              p
            ),
            p.call(d, b, a, s, c, t, e, g, !1, !0))
          : m.call(d, b, a, s, c, t, e, g, !0);
      }
    },
    loopLevel: function (b, a, f, c, e, g) {
      a = this.initLevelFields(a);
      (g = this.levelRows(b, a, g)) &&
        this._loopLevelItems(b, a, g, 1, "", 0, f, c, e);
    },
    levelRows: function (b, a, f) {
      if (b) {
        for (
          var f = f || this.compareRow, c = [], e = null, g = 0;
          g < b.length;
          g++
        ) {
          for (var d = b[g], m = c, p = 0; p < a.length; p++)
            if (f(e, d, a[p])) m = m[m.length - 1].items;
            else {
              m.push({ rowIndex: g, items: [] });
              m = m[m.length - 1].items;
              for (e = p + 1; e < a.length; e++)
                m.push({ rowIndex: g, items: [] }), (m = m[m.length - 1].items);
              break;
            }
          m.push({ rowIndex: g });
          e = d;
        }
        return c;
      }
      return null;
    },
    compareRow: function (b, a, f) {
      for (var c = 0; c < f.length; c++) {
        var e = f[c],
          g = b ? b[e] : null;
        "undefined" == typeof g && (g = null);
        e = a ? a[e] : null;
        "undefined" == typeof e && (e = null);
        if (g !== e) return !1;
      }
      return !0;
    },
    initLevelFields: function (b) {
      for (var a = [], b = b.split(","), f = 0; f < b.length; f++) {
        for (var c = b[f].split("+"), e = [], g = 0; g < c.length; g++)
          e.push(c[g]);
        a.push(e);
      }
      return a;
    },
    loopTree: function (b, a, f, c, e, g) {
      (a = this.treeRows(b, a, f)) &&
        this._loopLevelItems(b, "", a, 1, "", 0, c, e, g);
    },
    treeRows: function (b, a, f) {
      if (b) {
        for (var c = [], e = {}, g = 0; g < b.length; g++) {
          var d = b[g],
            m = d[a],
            d = d[f];
          if (e[m]) {
            if (0 <= e[m].rowIndex)
              throw Error(
                m + "\u4e3bkey(" + a + ":" + m + ")\u4e0d\u552f\u4e00"
              );
            e[m].rowIndex = g;
          } else e[m] = { rowIndex: g };
          e[d]
            ? (e[d].items || (e[d].items = []), e[d].items.push(e[m]))
            : ((e[d] = { rowIndex: -1, items: [e[m]] }), c.push(e[d]));
        }
        b = [];
        for (g = 0; g < c.length; g++)
          0 > c[g].rowIndex && (b = b.concat(c[g].items));
        return b;
      }
      return null;
    },
    getParent: function (b, a, f) {
      if (a)
        for (var a = a.split("."), e = 0; e < a.length; e++) {
          var c = b[parseInt(a[e]) - 1],
            b = c[f];
          "function" == typeof b && (b = b.call(c));
        }
      return b;
    },
    getGroupRow: function (b, a) {
      if (a.push) return b[a[0]] || null;
      for (var f in curDic) return this.getGroupRow(a[f]);
    },
    getGroupCount: function (b) {
      if (b.push) return b.length;
      var b = 0,
        a;
      for (a in curDic) b += this.getGroupCount(curDic[a]);
      return b;
    },
    sum: function (b, a) {
      var f = 0;
      if (b) for (var e = 0; e < b.length; e++) f = d.add(f, 1 * b[e][a]);
      return f;
    },
    toDic: function () {
      for (
        var b = {}, a = Array.prototype.slice.call(arguments, 0), f = 0;
        f < a.length;
        f += 2
      )
        b[a[f]] = a[f + 1] || null;
      return b;
    },
    tranDataToField: function (b, a, f, e) {
      if (b) {
        var a = a.split(","),
          f = f.split(","),
          e = e.split(","),
          c = [];
        c.NEW_FIELDS = {};
        for (var g = {}, d = 0; d < b.length; d++) {
          for (var m = b[d], p = "", q = 0; q < a.length; q++)
            p += (p ? "," : "") + (m[a[q]] || "-");
          if (!g[p]) {
            g[p] = [];
            for (q = 0; q < e.length; q++) {
              var s = (g[p][q] = { NEW_ROW_INDEX: q });
              c.push(s);
              for (var t in m) s[t] = m[t];
            }
          }
          s = "";
          for (q = 0; q < f.length; q++) s += (s ? "_" : "") + m[f[q]];
          c.NEW_FIELDS[s] = 1;
          for (q = 0; q < e.length; q++) g[p][q][s] = m[e[q]];
        }
        return c;
      }
      return null;
    },
    groupCalRow: function (b, a, f) {
      for (var b = b || {}, c = 0; c < f.length; c++) {
        var d = f[c],
          n = d.fieldNo;
        if (d.text) b[n] = d.text;
        else if (d.textFieldNo) {
          var o;
          if (d.filter) {
            var m = this.select(a, d.filter);
            m && 0 < m.length && (o = m[0]);
          } else o = a[0];
          b[n] = o ? o[d.textFieldNo] : "";
        } else {
          var p = d.calFn || g[d.calKind] || e;
          p &&
            ((m = a),
            d.filter && (m = this.select(a, d.filter)),
            (b[n] = p(m, d, b)));
        }
      }
      return b;
    },
    groupCalRows: function (b, a, f) {
      if (b && b.length) {
        for (var e = [], c = [], g = 0; g < b.length; g++)
          for (var d = b[g], m = 0; m < a.length; m++) {
            var p = a[m];
            if (p.keyFields) {
              var q,
                s = p.keyFields,
                t = "";
              for (q = 0; q < s.length; q++)
                t += (q ? f || "," : "") + (d[s[q]] || "");
              q = t;
              0 == g
                ? (c[m] = { key: q, rows: [d] })
                : ((s = c[m]),
                  q != s.key
                    ? ((t = { _ROW_INDEX: g, _FIELDS_INDEX: m, _KEY: s.key }),
                      this.groupCalRow(t, s.rows, p.calFields),
                      (e[g] = e[g] || []),
                      e[g].push(t),
                      (s.key = q),
                      (s.rows = [d]))
                    : s.rows.push(d));
            }
          }
        f = [];
        for (m = 0; m < a.length; m++)
          (p = a[m]),
            (s = c[m] || { key: "", rows: b }),
            (t = { _ROW_INDEX: g, _FIELDS_INDEX: m, _KEY: s.key }),
            this.groupCalRow(t, s.rows, p.calFields),
            f.push(t);
        e[b.length] = f;
        for (g = e.length - 1; 0 <= g; g--)
          if ((a = e[g])) for (m = 0; m < a.length; m++) b.splice(g, 0, a[m]);
      }
    },
    getSaveItems: function (b, a, f) {
      return this._getSaveItems(this.deepCopy(b), a, f, 0);
    },
    _getDetailSaveItems: function (b, a, f) {
      var e;
      if (a) {
        var c = a[f],
          g;
        for (g in c)
          if (b[g]) {
            var d = this._getSaveItems(b[g], c[g], a, f + 1);
            d.length ? (e || (e = {}), (e[g] = b[g] = d)) : delete b[g];
          }
      }
      return e;
    },
    _getSaveItems: function (b, a, f, e) {
      for (var c = [], g = 0; g < b.length; g++) {
        var d = b[g];
        if (d._NEW)
          c.push(d),
            delete d._ORG,
            delete d._NEW,
            delete d[a],
            this._getDetailSaveItems(d, f, e);
        else if (d._DELETED) {
          var m = { _DELETED: !0 };
          m[a] = d[a];
          c.push(m);
        } else if (d._UPDATED)
          c.push(d), delete d._ORG, this._getDetailSaveItems(d, f, e);
        else if ((m = this._getDetailSaveItems(d, f, e)))
          (m[a] = d[a]), c.push(m);
      }
      return c;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DataUI" });
sjs.using("Core5.Util.DataFn").define(function (d, a) {
  var c = /\.\d+(\.|$)/g,
    b = { number: [0, 1], string: ["", "1"], boolean: [!1, !0] };
  return {
    _initData: function (b, e) {
      var c = this[b];
      "undefined" == typeof c && (c = e);
      this[b] = a;
      this.set(b, c);
    },
    refreshData: function (a) {
      var e = this[a],
        c = typeof e;
      this.set(a, b[c] ? b[c][e ? 0 : 1] : e ? (e.push ? [] : {}) : "1");
      this.set(a, e);
    },
    set: function (b, a, c) {
      var a = !this.undefNotToNull && "undefined" == typeof a ? null : a,
        d = this.get(b),
        h = d !== a;
      h && this._doSet(b, a, c);
      this._afterSet(b, a, h, d, c);
      return this;
    },
    _doSet: function (b, a, c) {
      var d = b.split(".");
      if (1 == d.length)
        this[this.keySetReplaceDot ? ("" + b).replace(/`/g, ".") : b] = a;
      else
        for (var b = this, h = 0; h < d.length; h++) {
          var j = !isNaN(d[h]) ? parseInt(d[h]) : d[h],
            j = this.keySetReplaceDot ? ("" + j).replace(/`/g, ".") : j;
          if (h == d.length - 1) b[j] = a;
          else {
            if (null === b[j] || "undefined" == typeof b[j]) {
              var k = !isNaN(d[h + 1]);
              b[j] = k ? [] : {};
              this._afterSet(d.slice(0, h + 1).join("."), b[j], !0, null, c);
            }
            b = b[j];
          }
        }
    },
    _afterSet: function (b, a, g, d, h) {
      var j = b.replace(c, ".."),
        k = this["_set" + (j.substr(0, 1).toUpperCase() + j.substr(1))];
      k && k.call(this, a, g, d, b, h);
      g && this._afterSetAddRemove(j, "set");
      j += "SetEvt";
      this[j] && this.report(this[j], a, g, d, b, h);
    },
    get: function (b) {
      return this._doGet(b);
    },
    _doGet: function (b) {
      for (var b = b.split("."), c = this[b[0]], g = 1; g < b.length; g++) {
        if (!c) {
          c = !this.undefNotToNull ? null : a;
          break;
        }
        var d = !isNaN(b[g]) ? parseInt(b[g]) : b[g],
          c = c[d];
      }
      return c;
    },
    add: function (b, a, c) {
      var d = this.get(b);
      d
        ? ("number" == typeof c && 0 <= c && c < d.length
            ? d.splice(c, 0, a)
            : ((c = d.length), d.push(a)),
          this._afterAdd(b, d, c, a))
        : this.set(b, [a]);
      return this;
    },
    _afterAdd: function (b, a, g, d) {
      var h = b.replace(c, ".."),
        j = this["_add" + (h.substr(0, 1).toUpperCase() + h.substr(1))];
      j && j.call(this, a, g, d, b);
      this._afterSetAddRemove(h, "add");
      h += "AddEvt";
      this[h] && this.report(this[h], a, g, d, b);
    },
    remove: function (b, a) {
      var c = this.get(b);
      c && ((c = d.indexOf(c, a)), this.removeAt(b, c));
      return this;
    },
    removeAt: function (b, a) {
      var c = this.get(b);
      if (c && 0 <= a && a < c.length) {
        var d = c[a];
        c.splice(a, 1);
        this._afterRemove(b, c, a, d);
      }
      return this;
    },
    _afterRemove: function (b, a, g, d) {
      var h = b.replace(c, ".."),
        j = this["_remove" + (h.substr(0, 1).toUpperCase() + h.substr(1))];
      j && j.call(this, a, g, d, b);
      this._afterSetAddRemove(h, "remove");
      h += "RemoveEvt";
      this[h] && this.report(this[h], a, g, d, b);
    },
    _afterSetAddRemove: function () {},
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Html.Tag" });
sjs.using("Core5.Cls").define(function (d) {
  function a(b, a, e) {
    var g = b.tag || "div",
      d = [];
    d.push("<");
    d.push(g);
    var h = [],
      j = [];
    b.attribute &&
      d.push(
        " " + ("function" == typeof b.attribute ? b.attribute() : b.attribute)
      );
    var k = "function" == typeof b[" style"] ? b[" style"]() : "",
      l = "function" == typeof b[" class"] ? b[" class"]() : "",
      n;
    for (n in b) {
      var o = typeof b[n];
      "function" != o &&
        "object" != o &&
        "undefined" != o &&
        null !== b[n] &&
        (0 == n.indexOf(";")
          ? h.push(n + ":" + b[n])
          : 0 == n.indexOf("-") && b[n]
          ? j.push(n.substr(1))
          : 0 == n.indexOf(" ") &&
            (" style" == n
              ? (k = b[n])
              : " class" == n
              ? (l = b[n])
              : d.push(n + '="' + ("" + b[n]).replace(/\"/g, "&quot;") + '"')));
    }
    if (k || 0 < h.length)
      d.push(
        " style='" +
          k +
          (k && h.length ? ";" : "") +
          (h.length ? h.join("").substr(1) : "") +
          "'"
      );
    if (l || 0 < j.length)
      d.push(" class='" + l + (l && j.length ? " " : "") + j.join(" ") + "'");
    d.push(">");
    b.tagNoInner ||
      ("function" == typeof b.innerHtml
        ? b.innerHtml(d)
        : d.push(c(b.inner, a || b)),
      d.push("</" + g + ">"));
    return e ? d : d.join("");
  }
  function c(b, f) {
    if (null === b || "undefined" == typeof b) return "";
    var e = typeof b;
    if ("object" == e) {
      if (b.push) {
        for (var e = [], g = 0; g < b.length; g++) e.push(c(b[g], f));
        return e.join("");
      }
      return b.$extend
        ? ((e = d.create(b.$extend, b.$mixin, b)),
          (g = e.getHtml(f)),
          e.dispose && e.dispose(),
          g)
        : b.getHtml
        ? "function" == typeof b.getHtml
          ? b.getHtml(f)
          : b.getHtml
        : a(b, f);
    }
    return "function" == e ? c(b.call(f), f) : b;
  }
  return { html: a, itemHtml: c };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Html.Base" });
sjs.using("Core5.Html.Tag").define(function (d) {
  return {
    getHtml: function () {
      return this.getHtmlNoJoin ? d.html(this, this, !0) : d.html(this);
    },
    getHtmlNoJoin: !1,
    innerHtml: function (a) {
      a.push(d.itemHtml(this.inner, this));
    },
    attr: function (a, c) {
      if ("object" == typeof a)
        for (var b in a) null !== a[b] && (this[" " + b] = a[b]);
      else this[" " + a] = c;
      return this;
    },
    css: function (a, c) {
      if ("object" == typeof a)
        for (var b in a) null !== a[b] && (this[";" + b] = a[b]);
      else this[";" + a] = c;
      return this;
    },
    addClass: function (a) {
      this["-" + a] = !0;
      return this;
    },
    removeClass: function (a) {
      this["-" + a] = !1;
      return this;
    },
    setClass: function (a, c) {
      c ? this.addClass(a) : this.removeClass(a);
      return this;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Component" });
sjs
  .using("jQuery")
  .using("Core5.Html.Base")
  .using("Core5.DataUI")
  .using("Core5.Visible")
  .using("Core5.Disable")
  .using("Core5.CreateChild")
  .using("Core5.DomEvent.DomEvent")
  .using("Core5.Util.Lang")
  .using("Core5.DomEvent.onclick")
  .define(function (d, a, c, b, f, e, g, i) {
    var h = function () {};
    return {
      $mixin: [a, c],
      $plugin: [b, f, e, g],
      init: function () {
        this.initDomId();
      },
      initDomId: function () {
        sjs._autoIdSeed = sjs._autoIdSeed || 1e3;
        var b =
          "s2_" +
          (this.typeName ||
            (this.$DEFINE_IN ? this.$DEFINE_IN.replace(/[\/\.]/g, "") : null) ||
            "COMP") +
          "_" +
          sjs._autoIdSeed++;
        this._domId = b;
        this.attr("id", b);
      },
      jq: function (b) {
        var a = d("#" + this._domId + (b ? " " + b : "")),
          c = a.html;
        a.html = function () {
          var b = Array.prototype.slice.call(arguments, 0);
          "string" == typeof b[0] && (b[0] = i.parseRenderHtml(b[0]));
          return c.apply(a, b);
        };
        return a;
      },
      INSERT_BEFORE: "insertBefore",
      INSERT_AFTER: "insertAfter",
      REPLACE_ALL: "replaceAll",
      renderTo: function (b, a) {
        var c = this.getHtml(),
          c = i.parseRenderHtml(c);
        a === this.INSERT_BEFORE
          ? d(c).insertBefore(d(b))
          : a === this.INSERT_AFTER
          ? d(c).insertAfter(d(b))
          : a === this.REPLACE_ALL
          ? d(c).replaceAll(b)
          : a
          ? d(b).append(c)
          : d(b).html(c);
        this.render();
        return this;
      },
      _setInner: function (b) {
        this.inner = b;
        this.isRender() &&
          ((b = []), this.innerHtml(b), (b = b.join("")), this.jq().html(b));
      },
      setInner: function (b) {
        this._setInner(b);
      },
      refreshInner: function () {
        this.isRender() && this._setInner(this.inner);
      },
      render: function () {
        this.render = null;
        this._render();
        return this;
      },
      dispose: function (b) {
        this.report("DISPOSING", b);
        this._dispose(b);
        for (var a in this)
          "function" == typeof this[a] && "report" != a && (this[a] = h);
        this.report("DISPOSED", b);
        this.report = h;
      },
      isRender: function () {
        return null === this.render;
      },
      _render: function () {},
      _dispose: function (b) {
        !b && this.isRender() && this.jq().remove();
      },
      attr: function (b, a) {
        this.isRender() && this.jq().attr(b, a);
        this.$base(b, a);
        return this;
      },
      css: function (b, a) {
        this.isRender() && this.jq().css(b, a);
        this.$base(b, a);
        return this;
      },
      addClass: function (b) {
        this.isRender() && this.jq().addClass(b);
        this.$base(b);
        return this;
      },
      removeClass: function (b) {
        this.isRender() && this.jq().removeClass(b);
        this.$base(b);
        return this;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Bind.BindTarget" });
sjs.define(function (d) {
  function a(b) {
    var a = {},
      b = b.replace(c, function (b) {
        b = b.substr(1);
        a[b] = 1;
        return 0 <= b.indexOf("this.")
          ? "this.get('" + b.substr(5) + "')"
          : "this.parent.get('" + b + "')";
      }),
      e;
    try {
      e = new Function(
        "try{return " +
          (0 <= b.indexOf("@") ? b.replace(".@", "['@") + "']" : b) +
          "}catch(ex){return ex;}"
      );
    } catch (g) {
      console.error("bind error", b, g), (e = new Function("return '';"));
    }
    var b = [],
      d;
    for (d in a) b.push(d);
    return { fn: e, fields: b.join(",") };
  }
  var c = /@[a-zA-Z_][\w.]*/g;
  return {
    init: function () {
      this.$base();
      this._bindsBack = {};
      this._renderJqBinds = [];
      this._scanToSetBinds();
    },
    _initData: function (b, a) {
      var c = this["@" + b];
      (c && "string" == typeof c) || this.$base(b, a);
    },
    _scanToSetBinds: function () {
      for (var b in this) {
        var a = this[b],
          c = typeof a;
        if (
          "@" == b.substr(0, 1) &&
          ("string" == c || ("object" == c && a.push))
        )
          (c = b.substr(1)), (this[c] = d), this._scanBind(c, a);
      }
    },
    _render: function () {
      this.$base();
      this._applyRenderJqBinds();
    },
    _setInner: function (b) {
      this.$base(b);
      this.isRender() && this._applyRenderJqBinds();
    },
    _applyRenderJqBinds: function () {
      for (var b = 0; b < this._renderJqBinds.length; b++)
        this._applyBind(this._renderJqBinds[b]);
    },
    bind: function (b, a) {
      this.unBind(b);
      this._scanBind(b, a);
    },
    getBindFnFromExpAsTool: a,
    _scanBind: function (b, c) {
      var e = b.split("=>"),
        b = e[0],
        g =
          "inner" == b
            ? "inner"
            : { ";": "css", " ": "attr", "-": "setClass" }[b.substr(0, 1)] ||
              "set",
        d = null;
      "set" != g && ((b = "inner" == b ? b : b.substr(1)), (d = e[1] || ""));
      var h = [],
        e = [];
      if (0 <= c.indexOf("@") || this[b + "_FORCE_PARSE_BIND_EXP"]) {
        var j = a(c);
        this[
          "bind" +
            ({ css: ";", attr: " ", setClass: "-", set: "", inner: "" }[g] +
              ("set" == g || "inner" == g
                ? b.substr(0, 1).toUpperCase() + b.substr(1)
                : b + (d ? "=>" + d : ""))) +
            "From"
        ] = j.fn;
        c = j.fields;
      }
      for (
        var j = "object" == typeof c && c.push ? c : c.split(","), k = 0;
        k < j.length;
        k++
      ) {
        var l = j[k].split("."),
          n = "parent";
        if ("this" == l[0] || "parent" == l[0]) n = l.shift();
        var o = h;
        "this" == n && (o = e);
        o.push(l.join("."));
      }
      h.length &&
        ((k = { key: b, bindKind: g, args: j, target: this }),
        "set" == g && 1 == j.length && (k.backField = j[0]),
        (this._bindsBack[b] = k),
        null !== d && (k.jq = d),
        this.parent && this.parent._addBind && this.parent._addBind(h, k),
        this.parent &&
          this.parent.isRender() &&
          !e.length &&
          this._applyBind(k, {
            kind: "bind",
            type: "scan_applyBind",
            fromKey: "",
            source: this.parent,
            bind: k,
            bindField: "",
            fromArgs: Array.prototype.slice.call(arguments),
          }));
      e.length &&
        ((g = { key: b, bindKind: g, args: j, target: this }),
        null !== d && (g.jq = d),
        this._addBind(e, g),
        this.parent &&
          this.parent.isRender() &&
          this._applyBind(g, {
            kind: "bind",
            type: "scan_applyBind",
            fromKey: "",
            source: this,
            bind: g,
            bindField: "",
            fromArgs: Array.prototype.slice.call(arguments),
          }));
    },
    _applyBind: function (b, a) {
      var c = this._getBindValue(b);
      "set" == b.bindKind
        ? this.set(b.key, c, a)
        : "inner" == b.bindKind
        ? b.jq
          ? this.isRender()
            ? this.jq(b.jq).html(c)
            : this._renderJqBinds.push(b)
          : this.setInner(c)
        : b.jq
        ? this.isRender()
          ? "attr" == b.bindKind
            ? this.jq(b.jq).attr(b.key, c)
            : "css" == b.bindKind
            ? this.jq(b.jq).css(b.key, c)
            : "setClass" == b.bindKind && this.jq(b.jq).setClass(b.key, c)
          : this._renderJqBinds.push(b)
        : this[b.bindKind].call(this, b.key, c);
    },
    _getBindValue: function (b) {
      for (var a = b.args, c = [], g = 0; g < a.length; g++) {
        var d = a[g].split("."),
          h = "parent";
        if ("this" == d[0] || "parent" == d[0]) h = d.shift();
        var h = "this" == h ? this : this.parent,
          j = "";
        h && h.get && (j = h.get(d.join(".")));
        c.push(j);
      }
      a = b.key;
      b =
        this[
          "bind" +
            ({ css: ";", attr: " ", setClass: "-", set: "", inner: "" }[
              b.bindKind
            ] +
              ("set" == b.bindKind || "inner" == b.bindKind
                ? a.substr(0, 1).toUpperCase() + a.substr(1)
                : a + (b.jq ? "=>" + b.jq : ""))) +
            "From"
        ];
      return "function" == typeof b
        ? b.apply(this, c)
        : 1 < c.length
        ? c.join(",")
        : c[0];
    },
    _removeBindBack: function (b) {
      var a = this._bindsBack,
        c;
      for (c in a)
        if (a[c] == b) {
          delete a[c];
          break;
        }
    },
    _dispose: function (b) {
      this.$base(b);
      if ((b = this._bindsBack))
        for (var a in b)
          this.parent &&
            this.parent._removeBind &&
            this.parent._removeBind(b[a], !0);
    },
    unBind: function (b) {
      var a = this._bindsBack;
      a && a[b] && this.parent && this.parent._removeBind(a[b]);
    },
    _afterSet: function (b, a, c, g, d) {
      this.$base(b, a, c, g, d);
      if (this[b + "_SET_BACK_TO_PARENT"] && this.parent) {
        var h = this;
        window.setTimeout(function () {
          h.parent.set(h[b + "_SET_BACK_TO_PARENT"], a);
        });
      }
      if (!d || !("bind" == d.kind && d.source == this.parent)) {
        var j = this._bindsBack;
        if (j) {
          var k = j[b];
          if (k && k.backField)
            this[b + "_NO_BIND_BACK"] ||
              ((j =
                this[
                  "bind" +
                    ({ css: ";", attr: " ", setClass: "-", set: "", inner: "" }[
                      k.bindKind
                    ] +
                      ("set" == k.bindKind || "inner" == k.bindKind
                        ? b.substr(0, 1).toUpperCase() + b.substr(1)
                        : b + (k.jq ? "=>" + k.jq : ""))) +
                    "Back"
                ]),
              "function" == typeof j && (a = j.call(this, a)),
              this.parent.set(k.backField, a, {
                kind: "bind",
                back: !0,
                type: "set_set",
                fromKey: b,
                source: this,
                bind: k,
                backField: k.backField,
                fromArgs: Array.prototype.slice.call(arguments),
              }));
          else {
            var l = b.split(".");
            if ((k = j[l[0]]) && k.backField)
              (l[0] = k.backField),
                this.parent._afterSet(l.join("."), a, c, g, {
                  kind: "bind",
                  back: !0,
                  type: "set_afterSet",
                  fromKey: b,
                  source: this,
                  bind: k,
                  backField: l.join("."),
                  fromArgs: Array.prototype.slice.call(arguments),
                });
          }
        }
      }
    },
    _afterAdd: function (b, a, c, d, i) {
      this.$base(b, a, c, d, i);
      if (!i || !("bind" == i.kind && i.source == this.parent)) {
        var h = this._bindsBack;
        if (h) {
          var j = h[b];
          if (j && j.backField)
            this.parent._afterAdd(j.backField, a, c, d, {
              kind: "bind",
              back: !0,
              type: "add_afterAdd",
              fromKey: b,
              source: this,
              bind: j,
              backField: j.backField,
              fromArgs: Array.prototype.slice.call(arguments),
            });
          else {
            var k = b.split(".");
            if ((j = h[k[0]]) && j.backField)
              (k[0] = j.backField),
                this.parent._afterAdd(k.join("."), a, c, d, {
                  kind: "bind",
                  back: !0,
                  type: "add_afterAdd",
                  fromKey: b,
                  source: this,
                  bind: j,
                  backField: k.join("."),
                  fromArgs: Array.prototype.slice.call(arguments),
                });
          }
        }
      }
    },
    _afterRemove: function (b, a, c, d, i) {
      this.$base(b, a, c, d, i);
      if (!i || !("bind" == i.kind && i.source == this.parent)) {
        var h = this._bindsBack;
        if (h) {
          var j = h[b];
          if (j && j.backField)
            this.parent._afterRemove(j.backField, a, c, d, {
              kind: "bind",
              back: !0,
              type: "remove_afterRemove",
              fromKey: b,
              source: this,
              bind: j,
              backField: j.backField,
              fromArgs: Array.prototype.slice.call(arguments),
            });
          else {
            var k = b.split(".");
            if ((j = h[k[0]]) && j.backField)
              (k[0] = j.backField),
                this.parent._afterRemove(k.join("."), a, c, d, {
                  kind: "bind",
                  back: !0,
                  type: "remove_afterRemove",
                  fromKey: b,
                  source: this,
                  bind: j,
                  backField: k.join("."),
                  fromArgs: Array.prototype.slice.call(arguments),
                });
          }
        }
      }
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Bind.BindSource" });
sjs.using("Core5.Html.Tag").define(function () {
  return {
    init: function () {
      this._binds = {};
      this.$base();
    },
    _addBind: function (d, a) {
      for (var c = this._binds, b = 0; b < d.length; b++) {
        var f = d[b],
          e = c[f];
        e || (e = c[f] = []);
        a.id ||
          ((this._bindID = this._bindID || 0),
          (a.id = "BIND_" + ++this._bindID));
        e.push(a);
      }
    },
    _removeBind: function (d, a) {
      var c = this._binds,
        b;
      for (b in c) {
        for (var f = c[b], e = f.length - 1; 0 <= e; e--)
          f[e] == d && (!a && d.target._removeBindBack(d), f.splice(e, 1));
        0 == f.length && delete c[b];
      }
    },
    _dispose: function (d) {
      this.$base(d);
      var d = this._binds,
        a;
      for (a in d)
        for (var c = d[a], b = c.length - 1; 0 <= b; b--) {
          var f = c[b];
          f.target._removeBindBack && f.target._removeBindBack(f);
        }
      this._binds = null;
    },
    _afterSet: function (d, a, c, b, f) {
      this.$base(d, a, c, b, f);
      var e = this._binds,
        g = {},
        i = {},
        h;
      for (h in e) {
        var j = e[h];
        if (d == h || 0 == (h + ".").indexOf(d + "."))
          for (var k = 0; k < j.length; k++) {
            var l = j[k].target,
              n = j[k];
            if (
              !g[n.id] &&
              (!f ||
                "bind" != f.kind ||
                ("bind" == f.kind && l != f.source) ||
                "set" != n.bindKind)
            )
              (g[n.id] = 1),
                l._applyBind(n, {
                  kind: "bind",
                  type: "set_applyBind",
                  fromKey: d,
                  source: this,
                  bind: n,
                  bindField: h,
                  fromArgs: Array.prototype.slice.call(arguments),
                });
          }
        else if (0 == (d + ".").indexOf(h + "."))
          for (k = 0; k < j.length; k++)
            if (
              ((l = j[k].target),
              !f || "bind" != f.kind || ("bind" == f.kind && l != f.source))
            )
              if (((n = j[k]), !i[n.id])) {
                i[n.id] = 1;
                var o = n.key + "." + d.substr(h.length + 1);
                "set" == n.bindKind && !l[n.key + "_BIND_DIRECTLY"]
                  ? l._afterSet(o, a, c, b, {
                      kind: "bind",
                      type: "set_afterSet",
                      fromKey: d,
                      source: this,
                      bind: n,
                      bindField: h,
                      fromArgs: Array.prototype.slice.call(arguments),
                    })
                  : l._applyBind(n, {
                      kind: "bind",
                      type: "set_applyBind",
                      fromKey: d,
                      source: this,
                      bind: n,
                      bindField: h,
                      fromArgs: Array.prototype.slice.call(arguments),
                    });
              }
      }
    },
    _adjustBindsIndex: function (d, a, c) {
      var b = [],
        f = {},
        e = [],
        g = this._binds,
        i;
      for (i in g) {
        var h = g[i];
        if (0 == (i + ".").indexOf(d + ".")) {
          var j = i.split("."),
            k = d.split(".").length,
            l = parseInt(j[k]);
          if (l >= a) {
            if (l == a && "remove" == c)
              for (j = 0; j < h.length; j++) (k = h[j]), e.push(k);
            else {
              j[k] = "add" == c ? l + 1 : l - 1;
              l = j.join(".");
              for (j = 0; j < h.length; j++)
                if (((k = h[j]), k.backField)) {
                  k.backField = l;
                  for (var n = 0; n < k.args.length; n++)
                    if (k.args[n] == i) {
                      k.args[n] = l;
                      break;
                    }
                }
              f[l] = h;
            }
            b.push(i);
          }
        }
      }
      for (j = 0; j < e.length; j++) this._removeBind(e[j]);
      for (j = 0; j < b.length; j++) delete this._binds[b[j]];
      for (var o in f) this._binds[o] = f[o];
    },
    _afterAdd: function (d, a, c, b, f) {
      this._adjustBindsIndex(d, c, "add");
      this.$base(d, a, c, b, f);
      var e = this._binds,
        g;
      for (g in e) {
        var i = e[g];
        if (d == g || 0 == (d + ".").indexOf(g + "."))
          for (var h = 0; h < i.length; h++) {
            var j = i[h].target;
            if (!f || "bind" != f.kind || ("bind" == f.kind && j != f.source)) {
              var k = i[h];
              if ("set" == k.bindKind && !j[k.key + "_BIND_DIRECTLY"]) {
                var l = k.key + (d == g ? "" : "." + d.substr(g.length + 1));
                j._afterAdd(l, a, c, b, {
                  kind: "bind",
                  type: "add_afterAdd",
                  fromKey: d,
                  source: this,
                  bind: k,
                  bindField: g,
                  fromArgs: Array.prototype.slice.call(arguments),
                });
              } else
                j._applyBind(k, {
                  kind: "bind",
                  type: "add_applyBind",
                  fromKey: d,
                  source: this,
                  bind: k,
                  bindField: g,
                  fromArgs: Array.prototype.slice.call(arguments),
                });
            }
          }
      }
    },
    _afterRemove: function (d, a, c, b, f) {
      this._adjustBindsIndex(d, c, "remove");
      this.$base(d, a, c, b, f);
      var e = this._binds,
        g;
      for (g in e) {
        var i = e[g];
        if (d == g || 0 == (d + ".").indexOf(g + "."))
          for (var h = 0; h < i.length; h++) {
            var j = i[h].target;
            if (!f || "bind" != f.kind || ("bind" == f.kind && j != f.source)) {
              var k = i[h];
              if ("set" == k.bindKind && !j[k.key + "_BIND_DIRECTLY"]) {
                var l = k.key + (d == g ? "" : "." + d.substr(g.length + 1));
                j._afterRemove(l, a, c, b, {
                  kind: "bind",
                  type: "remove_afterRemove",
                  fromKey: d,
                  source: this,
                  bind: k,
                  bindField: g,
                  fromArgs: Array.prototype.slice.call(arguments),
                });
              } else
                j._applyBind(k, {
                  kind: "bind",
                  type: "remove_applyBind",
                  fromKey: d,
                  source: this,
                  bind: k,
                  bindField: g,
                  fromArgs: Array.prototype.slice.call(arguments),
                });
            }
          }
      }
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Container" });
sjs
  .using("Core5.Html.Tag")
  .using("Core5.Component")
  .using("jQuery")
  .define(function (d, a, c) {
    return {
      $extend: a,
      init: function () {
        this.$base();
        this.setInner(this.inner);
      },
      setInner: function (b) {
        this._innerInit && this._disposeInner();
        this._innerInit = !0;
        null === b || "undefined" == typeof b
          ? (b = [])
          : ("function" == typeof b && (b = b.call(this)),
            (b = "object" != typeof b || !b.push ? [b] : [].concat(b)));
        this._initInner(b);
        this._setInner(b);
      },
      _initInner: function (b) {
        for (var a = 0; a < b.length; a++) b[a] = this._initInnerItem(b[a], a);
      },
      innerHtml: function (b) {
        this._itemsHtml(b, this.inner);
      },
      _itemsHtml: function (b, a) {
        for (var c = 0; c < a.length; c++) this._itemHtml(b, a[c]);
      },
      _itemHtml: function (b, a) {
        b[b.length] = d.itemHtml(a, this);
      },
      _setInner: function (b) {
        this.$base(b);
        this.isRender() && this._renderInner();
      },
      _render: function () {
        this.$base();
        this._renderInner();
      },
      _dispose: function (b) {
        this.$base(b);
        if (this.container)
          for (var b = this.container.inner, a = b.length, c = 0; c < a; c++)
            if (b[c] == this) {
              b.splice(c, 1);
              break;
            }
        this._disposeInner();
      },
      _disposeChild: function (b) {
        b.dispose(b.container == this);
      },
      renderItem: function (b, a, c) {
        if (this.isRender())
          (c = "#" + this._domId + (c ? " " + c : "")),
            (b.container = this),
            this.inner.push(b),
            b.renderTo(c, a);
        else
          throw Error(
            "\u53ea\u6709render\u540e\u624d\u53ef\u8abf\u7528renderItem\u65b9\u6cd5"
          );
        return this;
      },
      _disposeInner: function () {
        if (this.inner && this.inner.push)
          for (var b = [].concat(this.inner), a = 0; a < b.length; a++) {
            var c = b[a];
            if (c && c.dispose) {
              var d = c.container == this;
              c.dispose(d);
            } else if (c && "object" == typeof c && c.push)
              for (var i = 0; i < c.length; i++) {
                var h = c[i];
                h && h.dispose && ((d = h.container == this), h.dispose(d));
              }
          }
      },
      _initDelayItem: function (b, a) {
        delete b.delayInit;
        return {
          cfg: b,
          createP: a,
          oThis: this,
          show: function () {
            delete this.createP[this.cfg.id];
            this.cfg.__fromDelayInit = !0;
            var b = this.oThis._initInnerItem(this.cfg);
            delete this.cfg.__fromDelayInit;
            b.renderTo(
              this.cfg.renderJq || "#" + this.oThis._domId,
              "undefined" == typeof this.cfg.renderKind
                ? !0
                : this.cfg.renderKind
            );
            b.show();
            b.dispose &&
              c.contains(this.oThis.jq()[0], b.jq()[0]) &&
              (b.container = this.oThis);
          },
        };
      },
      _initInnerItem: function (b) {
        if (null === b || "undefined" == typeof b) return "";
        if ("object" == typeof b) {
          var a = b;
          if (b.$extend)
            if (b.delayInit && b.id) {
              for (var c = this; c; )
                if (c.layoutOnly) c = c.parent;
                else break;
              c[b.id] = this._initDelayItem(b, c);
              b = "";
            } else b = this.createChild(b.$extend, b.$mixin, b);
          b.dispose && !a.__fromDelayInit && (b.container = this);
        }
        return b;
      },
      _renderInner: function () {
        for (var b = 0; b < this.inner.length; b++) {
          var a = this.inner[b];
          a.render && a.render();
        }
      },
      onVisibleChange: function (b) {
        if (this.inner && this.inner.push)
          for (var a = 0; a < this.inner.length; a++) {
            var c = this.inner[a];
            c && c.onVisibleChange && c.onVisibleChange(b);
          }
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.oninput" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.GetHelper")
  .define(function (d, a) {
    d(document)
      .delegate("[s-change]", "change", function (c) {
        var b = d(this),
          f = a.getSjsObj(b);
        f && f._onDomEvent && f._onDomEvent("change", b, c, b.val());
      })
      .delegate("[s-focus]", "focus", function (c) {
        var b = d(this),
          f = a.getSjsObj(b);
        f && f._onDomEvent && f._onDomEvent("focus", b, c, b.val());
      })
      .delegate("[s-blur]", "blur", function (c) {
        var b = d(this),
          f = a.getSjsObj(b);
        f && f._onDomEvent && f._onDomEvent("blur", b, c, b.val());
      })
      .delegate("[s-keyup]", "keyup", function (c) {
        var b = d(this),
          f = a.getSjsObj(b);
        f && f._onDomEvent && f._onDomEvent("keyup", b, c, b.val());
      })
      .delegate("[s-keydown]", "keydown", function (c) {
        var b = d(this),
          f = a.getSjsObj(b);
        f && f._onDomEvent && f._onDomEvent("keydown", b, c, b.val());
      })
      .delegate("[s-keypress]", "keypress", function (c) {
        var b = d(this),
          f = a.getSjsObj(b);
        f && f._onDomEvent && f._onDomEvent("keypress", b, c, b.val());
      });
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Upload2" });
sjs
  .loadCss("Core5.Widget.Input")
  .loadCss("Core5.Shp.Icon")
  .using("Core5.Component")
  .using("jQuery")
  .using("Core5.DomEvent.oninput")
  .define(function (d, a) {
    return {
      $extend: d,
      regUIObj: !0,
      rightIcon: "upload",
      "-s-upload": !0,
      init: function () {
        this.$base();
        this._initData("file");
        this.iptFileId = this._objId + "_input_file";
      },
      set: function (a, b, f) {
        "SELF_SET" != f && "fileID" == a
          ? b != this.iptFileId &&
            this.set("fileID", this.iptFileId, "SELF_SET")
          : this.$base(a, b, f);
      },
      inner: function () {
        return [
          { "-s-upload-text": !0, inner: this.text },
          {
            "-s-upload-label": !0,
            tag: "label",
            " for": this.isDisabled() ? null : this.iptFileId,
          },
          {
            tag: "label",
            " for": this.isDisabled() ? null : this.iptFileId,
            "-s-upload-icon": !0,
            "-icon": !0,
            " class": "icon-" + this.rightIcon,
            inner: "&nbsp;",
          },
        ];
      },
      onDisabledChange: function () {
        var a = this.isDisabled();
        this.setClass("s-readonly", a);
        this.isRender() &&
          (this.jq(".s-upload-label").attr("for", a ? "" : this.iptFileId),
          this.jq(".s-upload-icon").attr("for", a ? "" : this.iptFileId));
      },
      getUrlFromFile: function (a) {
        return "/RIAService/Upload/Files/" + this.fileKind + "/" + a;
      },
      modifyShowText: function (a) {
        return a;
      },
      showText: function () {
        if (this.file)
          if (this.file != this._org_file)
            this.set(
              "text",
              '<font style="cursor:pointer;color:purple" title="clear select file" s-click="cancelSelect">[Clear]</font>&nbsp;&nbsp;' +
                this.file
            );
          else {
            var a = this.getUrlFromFile(this.file);
            this.noShowDelete
              ? this.set(
                  "text",
                  '<a rel="external" target="_blank" href="' +
                    a.replace('"', "&quot;") +
                    '">' +
                    this.modifyShowText(this.file) +
                    "</a>"
                )
              : this.set(
                  "text",
                  '<font style="cursor:pointer;color:red" title="delete file" s-click="removeFile">[Delete]</font>&nbsp;&nbsp;<a rel="external" target="_blank" href="' +
                    a.replace('"', "&quot;") +
                    '">' +
                    this.modifyShowText(this.file) +
                    "</a>"
                );
          }
        else
          this._org_file
            ? this.set(
                "text",
                '<font style="cursor:pointer;color:blue" title="cancel delete file" s-click="cancelSelect">[Cancel Delete]</font>&nbsp;&nbsp;<font style="text-decoration:line-through">' +
                  this._org_file +
                  "</font>"
              )
            : this.set("text", "");
      },
      refreshInputFile: function () {
        a("#" + this.iptFileId).remove();
        a("#SERVICE_UPLOAD_FORM").append(
          "<input s-objId='" +
            this._objId +
            "' type='file' s-change='input' name='" +
            this.iptFileId +
            "' id='" +
            this.iptFileId +
            "'>"
        );
      },
      _setFile: function (a, b, f, e, d) {
        !d || (0 != ("" + d).indexOf("USER_ACT_") && this.set("_org_file", a));
        this.isRender() && "USER_ACT_SELECT_OK" != d && this.refreshInputFile();
        this.showText();
      },
      _setText: function (a) {
        this.isRender() && this.jq(".s-upload-text").html(a || "&nbsp;");
      },
      onCancelSelect: function () {
        this.set("file", this._org_file, "USER_ACT_CANCEL");
      },
      onRemoveFile: function () {
        this.set("file", null, "USER_ACT_REMOVE");
        this.removeEvt && this.report(this.removeEvt);
      },
      _render: function () {
        this.$base();
        if (0 == a("#SERVICE_UPLOAD_IFRAME").size()) {
          var c = [];
          c.push(
            '<form style="width:0;height:0;overflow:hidden;" id="SERVICE_UPLOAD_FORM" enctype="multipart/form-data" accept-charset="UTF-8" target="SERVICE_UPLOAD_IFRAME" method="post">'
          );
          c.push('<input type="hidden" name="JsonService">');
          c.push("</form>");
          c.push(
            '<iframe style="display:none;width:120px;height:120px" id="SERVICE_UPLOAD_IFRAME" name="SERVICE_UPLOAD_IFRAME"></iframe>'
          );
          a("body").append(c.join(""));
        }
        a("#SERVICE_UPLOAD_FORM").append(
          "<input s-objId='" +
            this._objId +
            "' type='file' s-change='input' name='" +
            this.iptFileId +
            "' id='" +
            this.iptFileId +
            "'>"
        );
      },
      _dispose: function (c) {
        this.isRender() && a("#" + this.iptFileId).remove();
        this.$base(c);
      },
      types: "*",
      _checkType: function (a) {
        for (
          var b = this.types.split(","),
            a = a.substr(a.lastIndexOf(".") + 1).toLowerCase(),
            f = 0;
          f < b.length;
          f++
        )
          if ("*" == b[f] || b[f].toLowerCase() == a) return !0;
        return !1;
      },
      onInput: function () {
        if (!this.isDisabled()) {
          var c = a("#" + this.iptFileId).val();
          c && this._checkType(c)
            ? this.set("file", c, "USER_ACT_SELECT_OK")
            : (this.set("file", this._org_file, "USER_ACT_SELECT_ERR"),
              c && alert("file type must be:" + this.types));
        }
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Formatter.Item" });
sjs.define(function () {
  return {
    valueField: "value",
    textField: "text",
    forceFullEqualSelected: !0,
    format: function (d) {
      if (this.items && null !== d)
        for (
          var a = this.items, c = this.valueField, b = this.textField, f = 0;
          f < a.length;
          f++
        ) {
          var e = a[f];
          if (e[c] === d || (!this.forceFullEqualSelected && e[c] == d))
            return "function" == typeof b ? b.call(this, e) : e[b || c];
        }
      return this.noForceMatchItem ? d : "";
    },
    formatNull: !0,
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.onmouseclass" });
sjs.using("jQuery").define(function (d) {
  function a(a, b) {
    for (
      var f =
        a.relatedTarget || ("mouseout" == a.type ? a.toElement : a.fromElement);
      f && f != b;

    )
      f = f.parentNode;
    return f != b;
  }
  d(document)
    .delegate("[s-overClass]", "mouseover", function (c) {
      var b = d(this);
      b.attr("s-overself")
        ? b.addClass(b.attr("s-overClass"))
        : a(c, b[0]) && b.addClass(b.attr("s-overClass"));
    })
    .delegate("[s-overClass]", "mouseout", function (c) {
      var b = d(this);
      b.attr("s-overself")
        ? b.removeClass(b.attr("s-overClass"))
        : a(c, b[0]) && b.removeClass(b.attr("s-overClass"));
    })
    .delegate("[s-downClass]", "mousedown", function () {
      d(this).addClass(d(this).attr("s-downClass"));
    })
    .delegate("[s-downClass]", "mouseup", function () {
      d(this).removeClass(d(this).attr("s-downClass"));
    });
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Button" });
sjs
  .loadCss("Core5.Shp.Icon")
  .loadCss("Core5.Widget.Button")
  .using("Core5.Component")
  .using("Core5.DomEvent.onmouseclass")
  .define(function (d) {
    return {
      $extend: d,
      regUIObj: !0,
      " s-click": "command",
      size: "",
      "-s-btn": !0,
      " s-overClass": "s-btn-over",
      " s-downClass": "s-btn-down",
      getHtml: function () {
        this.size && this.addClass("s-btn-" + this.size);
        !this.icon && this.addClass("s-btn-no-left-icon");
        !this.rightIcon && this.addClass("s-btn-no-right-icon");
        !this.text &&
          this.addClass("s-btn-notext" + (this.size ? "-" + this.size : ""));
        return this.$base();
      },
      inner: function () {
        var a = [];
        this.icon &&
          a.push({
            "-icon": !0,
            "-s-btn-icon": !0,
            " class": "icon-" + this.icon,
            inner: "&nbsp",
          });
        this.rightIcon &&
          a.push({
            "-icon": !0,
            "-s-btn-icon-right": !0,
            " class": "icon-" + this.rightIcon,
            inner: "&nbsp",
          });
        a.push({
          inner:
            "undefined" == typeof this.text ||
            null === this.text ||
            0 == ("" + this.text).length
              ? "&nbsp;"
              : this.text,
          "-s-btn-text": !0,
        });
        return a;
      },
      _setIcon: function (a, c, b) {
        c &&
          this.isRender() &&
          this.jq(".s-btn-icon")
            .removeClass("icon-" + b)
            .addClass("icon-" + a);
      },
      _setRightIcon: function (a, c, b) {
        c &&
          this.isRender() &&
          this.jq(".s-btn-icon-right")
            .removeClass("icon-" + b)
            .addClass("icon-" + a);
      },
      _setText: function (a, c) {
        !this.text
          ? this.addClass("s-btn-notext" + (this.size ? "-" + this.size : ""))
          : this.removeClass(
              "s-btn-notext" + (this.size ? "-" + this.size : "")
            );
        c &&
          this.isRender() &&
          this.jq(".s-btn-text").html(
            null === a || 0 == ("" + a).length ? "&nbsp;" : a
          );
      },
      setIcon: function (a) {
        this.set("icon", a);
        return this;
      },
      setRightIcon: function (a) {
        this.set("rightIcon", a);
        return this;
      },
      setText: function (a) {
        this.set("text", a);
        return this;
      },
      disabledBtnClass: "s-btn-disabled",
      onDisabledChange: function () {
        var a = this.isDisabled();
        this._overDownClassSetting ||
          ((this._overClass = this[" s-overClass"]),
          (this._downClass = this[" s-downClass"]),
          (this._overDownClassSetting = 1));
        this.disabledBtnClass && this.setClass(this.disabledBtnClass, a);
        this.attr("s-overClass", a ? null : this._overClass);
        this.attr("s-downClass", a ? null : this._downClass);
        this.removeClass(this._overClass);
        this.removeClass(this._downClass);
      },
      onCommand: function (a, c) {
        this.evt && this.report(this.evt, a, c);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Toggle" });
sjs.using("Core5.Widget.Button").define(function (d) {
  return {
    $extend: d,
    " s-click": "toggleClick",
    "-s-tgl": !0,
    " s-overClass": "s-tgl-over",
    " s-downClass": null,
    checkIcon: "check",
    noneIcon: "none",
    toggleClass: "s-tgl-checked",
    toggle: !1,
    init: function () {
      this.$base();
      "undefined" != typeof this.value
        ? this._initData("value")
        : this._initData("toggle");
    },
    _setToggle: function (a, c, b, f, e) {
      c &&
        (a
          ? (this.addClass(this.toggleClass),
            this.setIcon(this.checkIcon),
            this.checkText && this.setText(this.checkText),
            this.checkStyle && this.css(this.checkStyle))
          : (this.removeClass(this.toggleClass),
            this.setIcon(this.noneIcon),
            this.noneText && this.setText(this.noneText),
            this.noneStyle && this.css(this.noneStyle)));
      "VALUE" != e &&
        this.set("value", a ? this.trueValue : this.falseValue, "TOGGLE");
    },
    setToggle: function (a) {
      this.set("toggle", a);
      return this;
    },
    onToggleClick: function () {
      this.set("toggle", !this.toggle);
      this.onCommand(this.toggle);
    },
    onCommand: function (a) {
      this.evt && this.report(this.evt, a);
    },
    trueValue: "Y",
    falseValue: "N",
    _setValue: function (a, c, b, f, e) {
      "TOGGLE" != e && this.set("toggle", a === this.trueValue, "VALUE");
    },
    setValue: function (a) {
      this.set("value", a);
      return this;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.ListContainer" });
sjs
  .using("Core5.Component")
  .using("Core5.Container")
  .define(function (d, a) {
    return {
      $extend: a,
      init: function () {
        this.$base();
        this._initData("items", []);
      },
      itemType: d,
      _getItemType: function () {
        return this.itemType;
      },
      _getItemCfg: function () {
        return {};
      },
      _initItem: function (a, b) {
        var f = this._getItemCfg(a, b);
        f.$extend = this._getItemType(a, b);
        this.itemMixin &&
          ((f.$mixin = f.$mixin || []), f.$mixin.push(this.itemMixin));
        return this._initInnerItem(f, b);
      },
      _itemsContainerJq: function () {
        return "";
      },
      _setItems: function (a, b) {
        if (b || this.ignoreItemsCompareOnSet) {
          this.setInner("render");
          var f = [];
          if (a)
            for (var e = 0; e < a.length; e++) f.push(this._initItem(a[e], e));
          this._items = [].concat(f);
          this.setInner(f);
        }
      },
      _dyRenderItem: function (a, b) {
        this.renderItem(
          a,
          0 == b
            ? this._items[0]
              ? this.INSERT_BEFORE
              : !0
            : this.INSERT_AFTER,
          0 == b
            ? this._items[0]
              ? "#" + this._items[0]._domId
              : this._itemsContainerJq()
            : "#" + this._items[b - 1]._domId
        );
      },
      _addItems: function (a, b, f) {
        this.isRender() &&
          ((a = this._initItem(f, b)),
          this._dyRenderItem(a, b),
          this._items.splice(b, 0, a));
      },
      _removeItems: function (a, b) {
        this.isRender() && (this._items[b].dispose(), this._items.splice(b, 1));
      },
      setItems: function (a) {
        this.set("items", a);
        return this;
      },
      addItem: function (a, b) {
        this.add("items", a, b);
      },
      removeItem: function (a) {
        this.remove("items", a);
      },
      removeItemAt: function (a) {
        this.removeAt("items", a);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.RadioGroup" });
sjs
  .using("Core5.ListContainer")
  .using("Core5.Widget.Input.Toggle")
  .using("Core5.Util.DataFn")
  .define(function (d, a, c) {
    return {
      $extend: d,
      "-s-radiogroup": !0,
      itemType: {
        $extend: a,
        onToggleClick: function () {
          this.report("itemSelect", this.data);
        },
      },
      textField: "text",
      iconField: null,
      checkIcon: null,
      noneIcon: null,
      icon: null,
      _getItemCfg: function (a, c) {
        var e = this.textField || this.valueField;
        return {
          text: e ? a[e] : this.iconField ? null : a,
          checkIcon: this.iconField
            ? a[this.iconField]
            : this.checkIcon || this.icon,
          noneIcon: this.iconField
            ? a[this.iconField]
            : this.noneIcon || this.icon,
          checkStyle: this.checkStyle,
          noneStyle: this.noneStyle,
          data: a,
          "-s-tgl-left": 0 == c,
          toggle: this.forceFullEqualSelected
            ? (this.valueField ? a[this.valueField] : a) === this.selected
            : (this.valueField ? a[this.valueField] : a) == this.selected,
        };
      },
      onItemSelect: function (a, c) {
        var e = this.get("selected");
        this.set("selected", this.valueField ? c[this.valueField] : c);
        this.onCommand(this.selected, e);
      },
      onCommand: function (a, c) {
        if (this.evt) {
          var e = this._getItemByValue(a);
          e && this.report(this.evt, a, e ? e.data : null, e.text, c);
        }
      },
      valueField: "value",
      init: function () {
        this.$base();
        this._initData("selected");
      },
      _getItemByValue: function (a) {
        for (var c = this._items || [], e = 0; e < c.length; e++) {
          var d = c[e].data,
            d = this.valueField ? d[this.valueField] : d;
          if (this.forceFullEqualSelected ? d === a : d == a) return c[e];
        }
        return null;
      },
      _setSelected: function (a, c, e) {
        c &&
          ((c = this._getItemByValue(e)) && c.setToggle(!1),
          (a = this._getItemByValue(a)) && a.setToggle(!0),
          this.autoFocusSelected && this.focusSelect());
      },
      focusSelect: function () {
        if (this.isRender() && this.selected) {
          var a = this._getItemByValue(this.selected),
            a = c.indexOf(this._items, a),
            a = a - 3;
          0 > a && (a = 0);
          if ((a = this._items[a])) (a = a.jq()) && a[0].scrollIntoView(!0);
        }
      },
      select: function (a) {
        this.set("selected", a);
        return this;
      },
      clear: function () {
        this.select(null);
        return this;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.Pop" });
sjs
  .loadCss("Core5.Shp.Other")
  .using("jQuery")
  .using("Core5.DomEvent.PopManager")
  .using("Core5.DomEvent.UIManager")
  .define(function (d, a, c) {
    var b = {
      lt: ["left", "top", "right", "bottom"],
      rt: ["right", "top", "left", "bottom"],
      lb: ["left", "bottom", "right", "top"],
      rb: ["right", "bottom", "left", "top"],
    };
    return {
      regUIObj: !0,
      "-s-pop": !0,
      " pop-obj": "1",
      visible: !1,
      ";position": "absolute",
      autoAdjustPos: !0,
      mask: !1,
      maskOpacity: 0.3,
      getHtml: function () {
        var a = this.$base();
        this.mask &&
          (a =
            "<div s-mask-target-objId='" +
            this._objId +
            "' id='" +
            this._domId +
            "_mask' style='opacity:" +
            this.maskOpacity +
            "' class='maskDiv'></div>" +
            a);
        return a;
      },
      show: function () {
        this.$base();
        this.setOnTopLevel();
        return this;
      },
      _show: function () {
        this.set("zIndex", a.getTopZIndex() + 1);
        this.mask &&
          d("#" + this._domId + "_mask")
            .css({
              width:
                Math.max(
                  document.documentElement.scrollWidth,
                  d("body")[0].scrollWidth
                ) + "px",
              height:
                Math.max(
                  document.documentElement.scrollHeight,
                  d("body")[0].scrollHeight
                ) + "px",
            })
            .show();
        if (!this.autoAdjustPos && !this.noAdjustBodyOverflow) {
          "hidden" == d("html").css("overflow") &&
            (d("html").css("overflow", "auto"),
            (this._oldHtmlCssOverflow = "hidden"));
          "hidden" == d("body").css("overflow") &&
            (d("body").css("overflow", "auto"),
            (this._oldBodyCssOverflow = "hidden"));
          var b = this;
          window.setTimeout(function () {
            b && b.jq && b.jq() && b.jq()[0] && b.jq()[0].scrollIntoView();
          }, 100);
        }
        this.$base();
      },
      setOnTopLevel: function () {
        var b = [],
          e = this;
        this.jq("[pop-obj=1]").each(function () {
          var g = c.get(d(this).attr("s-objid"));
          g.jq().parents("[pop-obj]")[0] == e.jq()[0] &&
            -1 != a.find(g) &&
            g.setOnTopLevel &&
            b.push(g);
        });
        a.remove(this);
        this.set("zIndex", a.getTopZIndex() + 1);
        for (var g = 0; g < b.length; g++) b[g].setOnTopLevel();
      },
      _setZIndex: function (b) {
        !this.noAutoZIndex && this.css("z-index", b);
        !this.noAutoZIndex &&
          this.mask &&
          d("#" + this._domId + "_mask").css("z-index", b);
        a.add(this);
      },
      posKind: "lt",
      move: function (a, c) {
        if ("string" == typeof a) this.css(a, c + "px");
        else {
          var d = b[this.posKind];
          this.css(d[0], a + "px").css(d[1], c + "px");
        }
        this.autoAdjustPos && this.adjustPos();
        return this;
      },
      adjustPos: function () {
        var a = this.jq(),
          b = a.offset(),
          c = a.outerHeight(),
          i = d(window).height(),
          h = d("html").scrollTop() || d("body").scrollTop();
        b.top + c > i + h &&
          ((c = h + i - c - 5), this.css("top", 0 <= c ? c + "px" : 0));
        a = a.outerWidth();
        c = d(window).width();
        i = d("html").scrollLeft() || d("body").scrollLeft();
        b.left + a > c + i &&
          ((b = i + c - a - 5), this.css("left", 0 <= b ? b + "px" : 0));
      },
      _hide: function () {
        this.$base();
        this.mask && d("#" + this._domId + "_mask").hide();
        a.remove(this);
        !this.autoAdjustPos &&
          !this.noAdjustBodyOverflow &&
          (this._oldHtmlCssOverflow &&
            d("html").css("overflow", this._oldHtmlCssOverflow),
          this._oldBodyCssOverflow &&
            d("body").css("overflow", this._oldBodyCssOverflow));
      },
      _dispose: function (b) {
        this.$base(b);
        this.mask && d("#" + this._domId + "_mask").remove();
        a.remove(this);
        !this.autoAdjustPos &&
          !this.noAdjustBodyOverflow &&
          (this._oldHtmlCssOverflow &&
            d("html").css("overflow", this._oldHtmlCssOverflow),
          this._oldBodyCssOverflow &&
            d("body").css("overflow", this._oldBodyCssOverflow));
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Mixin.Pop" });
sjs.using("Core5.Widget.Ability.Pop").define(function (d) {
  return {
    popConfig: null,
    _getPopConfig: function () {
      return this.popConfig || {};
    },
    _getPopCreater: function () {
      return this;
    },
    _getPop: function (a) {
      if (!this.pop) {
        var c = this._getPopCreater(),
          b = this.popId || (c != this ? this.fieldNo + "_pop" : "pop");
        if (!b)
          throw Error(
            "\u5982\u679c\u4f7f\u7528_getPopCreater,\u5fc5\u9808\u8a2d\u5b9afieldNo\u6216popId,\u4ee5\u4fbf\u5728parent\u4e2d\u552f\u4e00\u5340\u5225\u5c0d\u8c61"
          );
        var f = this._getPopConfig();
        this.pop = c[b]
          ? c[b]
          : c
              .createChild(
                a,
                d,
                f.$mixin,
                { id: b, posKind: "top" == this.showPos ? "lb" : "lt" },
                f,
                this.popMixin || {}
              )
              .renderTo("body", !0);
      }
      return this.pop;
    },
    _getPosJq: function () {
      return this.jq();
    },
    showPos: "bottom",
    _getShowPos: function () {
      var a = this._getPosJq(),
        c = a.offset(),
        b = c.left,
        f = c.top;
      "right" == this.showPos
        ? (b = c.left + a.outerWidth())
        : "bottom" == this.showPos && (f = c.top + a.outerHeight());
      return { left: b, top: f };
    },
    _showPop: function (a) {
      var c = this._getShowPos();
      this._getPop(a).setResponser(this).show().move(c.left, c.top);
    },
    popType: "",
    showPop: function () {
      if ("string" == typeof this.popType) {
        var a = this;
        sjs.using(this.popType).run(function (c) {
          a._showPop(c);
        });
      } else this._showPop(this.popType);
      return this;
    },
    hidePop: function () {
      this.pop && this.pop.hide();
      return this;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Command" });
sjs
  .loadCss("Core5.Widget.Input")
  .loadCss("Core5.Shp.Icon")
  .using("Core5.Component")
  .using("Core5.Widget.Mixin.Pop")
  .define(function (d, a) {
    return {
      $extend: d,
      regUIObj: !0,
      $mixin: [a],
      rightIcon: "cog",
      rightClearIcon: "remove-circle",
      "-s-command": !0,
      " s-click": "popClick",
      textFromValue: !0,
      disabledClass: "s-command-disabled",
      init: function () {
        this.$base();
        this._initValueText();
      },
      _initValueText: function () {
        this._initData("value");
        !this.textFromValue && this._initData("text");
      },
      _setValue: function (a) {
        this._innerSetText();
        this.clearable &&
          this.isRender() &&
          (a || 0 === a
            ? this.jq(".s-command-icon")
                .removeClass("icon-" + this.rightIcon)
                .addClass("icon-" + this.rightClearIcon)
            : this.jq(".s-command-icon")
                .removeClass("icon-" + this.rightClearIcon)
                .addClass("icon-" + this.rightIcon));
      },
      _innerSetText: function (a) {
        this.textFromValue &&
          ((a = this.format("undefined" == typeof a ? this.value : a)),
          this.set(
            "text",
            null === a || "undefined" == typeof a || "" === a ? "&nbsp;" : a
          ));
      },
      _setText: function (a, b) {
        this.isRender() && b && this.jq(".s-command-text").html(a);
      },
      format: function (a) {
        return a;
      },
      inner: function () {
        return [
          { "-s-command-text": !0, inner: this.text },
          { inner: "&nbsp;", "-s-command-btn": !0 },
          {
            "-s-command-icon": !0,
            "-icon": !0,
            " class":
              "icon-" +
              (this.clearable && (this.value || 0 === this.value)
                ? this.rightClearIcon
                : this.rightIcon),
            inner: "&nbsp;",
            " s-click": "clearIconClick",
          },
        ];
      },
      onPopClick: function () {
        this.showPop();
        this.clickEvt && this.report(this.clickEvt);
      },
      onClearIconClick: function (a, b) {
        if (this.clearable & (!!this.value || 0 === this.value))
          this.clearValueAndText(), b.stopPropagation();
      },
      clearValueAndText: function () {
        var a = this.get("value");
        this.set("value", null);
        return a;
      },
      setValue: function (a) {
        this.set("value", a);
        return this;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Select" });
sjs
  .using("Core5.Widget.Input.Command")
  .using("Core5.Widget.Input.RadioGroup")
  .using("Core5.Widget.Input.Formatter.Item")
  .define(function (d, a, c) {
    return {
      $extend: d,
      $mixin: [c],
      _initValueText: function () {
        this._initData("items", []);
        this.$base();
      },
      rightIcon: "chevron-down",
      popType: a,
      maxPopHeight: 200,
      minPopWidth: 200,
      _getPopConfig: function () {
        return {
          textField: this.textField,
          valueField: this.valueField,
          ";max-height": this.maxPopHeight + "px",
          ";min-width": this.minPopWidth + "px",
          ";overflow-y": "auto",
          "-s-radiogroup-select": !0,
          evt: "popSelect",
          forceFullEqualSelected: this.forceFullEqualSelected,
        };
      },
      _getPop: function (a) {
        a = this.$base(a);
        a.setItems(this.items)
          .css("width", this.jq().outerWidth() + "px")
          .select(this.value);
        return a;
      },
      onPopSelect: function (a, c, e, d) {
        this.pop.hide();
        a = this.get("value");
        this.setValue(c);
        this.textFromValue ||
          this.set(
            "text",
            "function" == typeof this.textField
              ? this.textField(e)
              : e[this.textField || this.valueField]
          );
        this.evt && this.report(this.evt, c, e, d, a);
      },
      clearValueAndText: function () {
        var a = this.$base();
        this.evt && this.report(this.evt, null, null, -1, a);
      },
      _setItems: function (a) {
        this._innerSetText();
        this.pop && this.pop.set("items", a);
      },
      _setValue: function (a, c) {
        this.$base(a, c);
        this.pop && this.pop.select(this.value);
      },
      setItems: function (a) {
        this.set("items", a);
        return this;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Combox" });
sjs
  .loadCss("Core5.Widget.Input")
  .loadCss("Core5.Shp.Icon")
  .using("Core5.Widget.Input.Select")
  .using("Core5.DomEvent.oninput")
  .define(function (d) {
    return {
      $extend: d,
      regUIObj: !0,
      rightIcon: "chevron-down",
      "-s-combox": !0,
      "-s-command": null,
      disabledClass: "s-combox-disabled",
      " s-click": null,
      inner: function () {
        return [
          {
            tag: "input",
            tagNoInner: !0,
            "-s-combox-input": !0,
            " s-change": "input",
            " value": this.text ? ("" + this.text).replace(/"/g, "&quot;") : "",
            " type": this.inputType,
            attribute: this.inputAttr,
            " readonly": this.isDisabled() ? !0 : null,
          },
          { inner: "&nbsp;", "-s-combox-btn": !0, " s-click": "popClick" },
          {
            "-s-combox-icon": !0,
            "-icon": !0,
            " class": "icon-" + this.rightIcon,
            inner: "&nbsp;",
            " s-click": "popClick",
          },
        ];
      },
      onDisabledChange: function () {
        var a = this.isDisabled();
        this.isRender() && this.jq(".s-combox-input").prop("readonly", a);
      },
      _setText: function (a, c) {
        this.isRender() && c && this.jq(".s-combox-input").val(a);
      },
      noForceMatchItem: !0,
      _innerSetText: function () {
        this.textFromValue && this.set("text", this.format(this.value));
      },
      onInput: function (a, c, b) {
        this.set("value", b);
        this.evt && this.report(this.evt, b);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Util.StrFn" });
sjs.define(function () {
  return (strFn = {
    trimRe: /^\s+|\s+$/g,
    trim: function (d) {
      d += "";
      return "function" == typeof d.trim
        ? d.trim()
        : d.replace(strFn.trimRe, "");
    },
    format: function (d) {
      var a = Array.prototype.slice.call(arguments, 1);
      return (" " + d)
        .replace(/([^{])\{(\d+|\w+(:\d+)?)\}/g, function (c, b, f) {
          var e = "";
          if (isNaN(f)) {
            var e = f.indexOf(":"),
              d = -1 == e ? f : f.substr(0, e),
              c = a[0];
            0 < e && (c = a[parseInt(f.substr(e + 1))]);
            e = c[d];
            "function" == typeof e && (e = e.call(c));
          } else e = a[f];
          return b + e;
        })
        .replace(/{{/g, "{")
        .substr(1);
    },
  });
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Util.DateFn" });
sjs.using("Core5.Util.StrFn").define(function (d) {
  function a(a) {
    return new Date(
      a.substr(0, 4),
      Number(a.substr(4, 2)) - 1,
      Number(a.substr(6, 2))
    );
  }
  function c(a) {
    return new Date(
      a.substr(0, 4),
      Number(a.substr(4, 2)) - 1,
      8 <= a.length ? Number(a.substr(6, 2)) : 1,
      10 <= a.length ? Number(a.substr(8, 2)) : 0,
      12 <= a.length ? Number(a.substr(10, 2)) : 0,
      14 <= a.length ? Number(a.substr(12, 2)) : 0
    );
  }
  function b(a) {
    var a = a || new Date(),
      b = a.getFullYear(),
      c = "" + (a.getMonth() + 1),
      c = 2 > c.length ? "0" + c : c,
      d = "" + a.getDate(),
      d = 2 > d.length ? "0" + d : d,
      h = "" + a.getHours(),
      h = 2 > h.length ? "0" + h : h,
      j = "" + a.getMinutes(),
      j = 2 > j.length ? "0" + j : j,
      k = "" + a.getSeconds(),
      k = 2 > k.length ? "0" + k : k,
      a = "" + a.getMilliseconds(),
      a = 3 > a.length ? "00" + a : 2 > a.length ? "0" + a : a;
    return "" + b + c + d + h + j + k + a;
  }
  return {
    addMonths: function (a, b) {
      var c, d;
      d = b;
      var h = !0;
      0 > d && ((d *= -1), (h = !1));
      c = Math.floor(d / 12) * (h ? 1 : -1);
      d = (d % 12) * (h ? 1 : -1);
      var j = a;
      if (0 == c) a = j;
      else {
        h = j.substr(0, 4);
        j = j.substr(4, 2);
        h = Number(h) + c;
        if (9999 < h || 1e3 > h)
          throw Error(
            "\u66ab\u4e0d\u652f\u63f41000\u5e74\u4e4b\u524d\u548c9999\u5e74\u4e4b\u540e"
          );
        a = "" + h + j;
      }
      h = a;
      if (0 == d) d = h;
      else {
        c = h.substr(0, 4);
        h = h.substr(4, 2);
        h = Number(h) + d;
        12 < h
          ? ((c = Number(c) + 1), (h %= 12))
          : 1 > h && ((c = Number(c) - 1), (h = 12 + h));
        10 > h && (h = "0" + h);
        if (9999 < c || 1e3 > c)
          throw Error(
            "\u66ab\u4e0d\u652f\u63f41000\u5e74\u4e4b\u524d\u548c9999\u5e74\u4e4b\u540e"
          );
        d = "" + c + h;
      }
      return d;
    },
    addDays: function (c, e) {
      if (0 == e) return c;
      var d = a(c);
      d.setDate(d.getDate() + e);
      return b(d).substr(0, 8);
    },
    getYearWeek: function (b) {
      var c = a(b),
        b = a(b.substr(0, 4) + "0101"),
        d = b.getDay();
      return Math.floor((c - b - 864e5 * (d ? 7 - d : 0)) / 6048e5 + 1);
    },
    getThisYear: function () {
      return b().substr(0, 4);
    },
    getThisMonth: function () {
      return b().substr(0, 6);
    },
    getToday: function () {
      return b().substr(0, 8);
    },
    getNow: function () {
      return b().substr(8, 6);
    },
    getTimeStamp: function () {
      return b();
    },
    formatDate: function (a) {
      var b = a;
      a &&
        ((b = ""),
        (a = d.trim(a)),
        3 < a.length && (b += a.substr(0, 4)),
        5 < a.length && (b += "/" + a.substr(4, 2)),
        7 < a.length && (b += "/" + a.substr(6, 2)),
        9 < a.length && (b += " " + a.substr(8, 2)),
        11 < a.length && (b += ":" + a.substr(10, 2)),
        13 < a.length && (b += ":" + a.substr(12, 2)));
      return b;
    },
    formatTime: function (a, b) {
      var c = a;
      a &&
        ((c = ""),
        (a = d.trim(a)),
        4 <= a.length && (c += a.substr(0, 2) + ":" + a.substr(2, 2)),
        4 < a.length && !b && (c += ":" + a.substr(4, 2)));
      return c;
    },
    isDate: function (c) {
      var e = a(c);
      return b(e).substr(0, 8) == c;
    },
    getWeek: function (b) {
      if (b) {
        var c = a(b).getDay(),
          d = this.addDays(b, -1 * c),
          b = this.addDays(b, 7 - c - 1);
        return [d, b];
      }
      return null;
    },
    getTimeDiff: function (a, b) {
      var d = c(a);
      return this.getTimeSpan((b ? c(b) : new Date()) - d);
    },
    getTimeSpan: function (a) {
      var b = a / 864e5,
        c = Math.floor(b),
        d = 864e5 * c,
        h = Math.floor((a - d) / 36e5),
        j = 36e5 * h,
        k = Math.floor((a - d - j) / 6e4);
      return {
        day: c,
        hour: h,
        minute: k,
        second: Math.floor((a - d - j - 6e4 * k) / 1e3),
        totalDays: b,
        totalHours: a / 36e5,
        totalMinutes: a / 6e4,
      };
    },
    getStrFromDate: b,
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Formatter.DateTime" });
sjs.using("Core5.Util.DateFn").define(function (d) {
  return {
    todayShowText: null,
    yesterdayShowText: null,
    thisYearShowText: null,
    format: function (a) {
      if (a) {
        a += "";
        if ("yymm" == this.valueKind)
          return a.substr(0, 4) + "/" + a.substr(4, 2);
        if ("time" == this.valueKind)
          return d.formatTime(this.noSecond ? a.substr(0, 4) : a);
        var c = "";
        if ("onlyTime" != this.showKind) {
          var c = a.substr(0, 8),
            b = d.getToday(),
            c =
              null !== this.todayShowText &&
              "undefined" != typeof this.todayShowText &&
              b == c
                ? this.todayShowText
                : null !== this.yesterdayShowText &&
                  "undefined" != typeof this.yesterdayShowText &&
                  d.addDays(b, -1) == c
                ? this.yesterdayShowText
                : null !== this.thisYearShowText &&
                  "undefined" != typeof this.thisYearShowText &&
                  b.substr(0, 4) == c.substr(0, 4)
                ? this.thisYearShowText + c.substr(4, 2) + "/" + c.substr(6, 2)
                : d.formatDate(c);
          if ("onlyDate" == this.showKind) return c;
        }
        a = d.formatTime(this.noSecond ? a.substr(8, 4) : a.substr(8));
        return c + (c ? " " : "") + a;
      }
      return "";
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Html.CalTableLayout" });
sjs.define(function () {
  return function (d, a) {
    var c = [],
      b = [],
      f = 0,
      e = a;
    c[0] = [];
    for (var g = d.length, i = 0; i < g; i++) {
      var h = d[i],
        j = h.colspan || 1;
      j > e && (j = e);
      var k = h.rowspan || 1;
      if (1 < k)
        for (var l = 1; l < k; l++) b[f + l] || (b[f + l] = 0), (b[f + l] += j);
      c[f].push({ index: i, rowspan: k, colspan: j, item: h });
      e -= j;
      if (
        0 == e &&
        i < g - 1 &&
        (f++, (c[f] = []), (e = a - (b[f] || 0)), 0 >= e)
      )
        throw (
          (alert(
            "\u6709\u4e0d\u9700\u8981\u7684rowspan\u8a2d\u5b9a\uff0c\u8acb\u6aa2\u67e5"
          ),
          Error(
            "\u6709\u4e0d\u9700\u8981\u7684rowspan\u8a2d\u5b9a\uff0c\u8acb\u6aa2\u67e5"
          ))
        );
    }
    return c;
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Html.TableLayout" });
sjs
  .loadCss("Core5.Html.Layout")
  .using("Core5.Html.CalTableLayout")
  .define(function (d) {
    return {
      _getLayoutRows: function (a, c) {
        return d(a, c);
      },
      _getColumnCount: function (a, c) {
        return 0 >= c || c > a.length ? a.length : c;
      },
      tableClass: "",
      tableStyle: "",
      tableAttr: "",
      cellSpacing: 0,
      cellPadding: 0,
      thAttr: "",
      thStyle: "",
      thClass: "",
      tdAttr: "",
      tdStyle: "",
      tdClass: "",
      cellsWidth: null,
      _table: function (a, c) {
        return {
          tag: "table",
          attribute: this.tableAttr,
          " class": this.tableClass,
          " style": this.tableStyle,
          " cellspacing": this.cellSpacing,
          " cellpadding": this.cellPadding,
          "-s-layout-table": !0,
          inner: [this._colgroup(c), this._tbody(a)],
        };
      },
      _colgroup: function () {
        var a = this.cellsWidth;
        if (a) {
          for (var c = [], b = 0; b < a.length; b++) c.push(this._col(a[b]));
          return { tag: "colgroup", inner: c };
        }
        return "";
      },
      _col: function (a) {
        return {
          tag: "col",
          tagNoInner: !0,
          ";width":
            a && "0" != ("" + a).trim()
              ? a + (0 < ("" + a).indexOf("%") ? "" : "px")
              : null,
        };
      },
      _tbody: function (a) {
        return { tag: "tbody", inner: this._trs(a) };
      },
      _trs: function (a) {
        for (var c = [], b = 0; b < a.length; b++) c.push(this._tr(a[b], b, a));
        return c;
      },
      _tr: function (a, c, b) {
        return {
          tag: "tr",
          attribute:
            (this.trAttr || "") +
            (this.trAttr && a[0] && a[0].item.trAttr ? " " : "") +
            (a[0] && a[0].item.trAttr ? a[0].item.trAttr : ""),
          " class":
            (this.trClass || "") +
            (this.trClass && a[0] && a[0].item.trClass ? " " : "") +
            (a[0] && a[0].item.trClass ? a[0].item.trClass : ""),
          " style":
            (this.trStyle || "") +
            (this.trStyle && a[0] && a[0].item.trStyle ? ";" : "") +
            (a[0] && a[0].item.trStyle ? a[0].item.trStyle : ""),
          ";height":
            this.rowsHeight && this.rowsHeight[c]
              ? this.rowsHeight[c] + "px"
              : null,
          inner: this._tds(a, c, b),
        };
      },
      _tds: function (a, c, b) {
        for (var f = [], e = 0; e < a.length; e++)
          f.push(this._td(a[e], e, a, c, b));
        return f;
      },
      _td: function (a, c, b, f, e) {
        c = this._tdTag(a.item, a, c, b, f, e);
        c.tag = "td";
        c[" colspan"] = 1 < a.colspan ? a.colspan : null;
        c[" rowspan"] = 1 < a.rowspan ? a.rowspan : null;
        return c;
      },
      _tdTag: function (a, c, b, f, e, d) {
        return {
          attribute:
            (this.tdAttr || "") +
            (this.tdAttr && a.tdAttr ? " " : "") +
            (a.tdAttr || ""),
          " class":
            (this.tdClass || "") +
            (this.tdClass && a.tdClass ? " " : "") +
            (a.tdClass || ""),
          " style":
            (this.tdStyle || "") +
            (this.tdStyle && a.tdStyle ? ";" : "") +
            (a.tdStyle || ""),
          inner: this._tdInner(a, c, b, f, e, d),
        };
      },
      _tdInner: function (a) {
        return a;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Layout.TableLayout" });
sjs.using("Core5.Html.TableLayout").define(function (d) {
  return {
    $extend: d,
    columnCount: 2,
    init: function () {
      this.$base();
      this._initTableLayout();
    },
    _initTableLayout: function () {
      this._columnCount = this._getColumnCount(this.inner, this.columnCount);
      this._layoutRows = this._getLayoutRows(this.inner, this._columnCount);
    },
    _itemsHtml: function (a) {
      var c = this._table(this._layoutRows, this._columnCount);
      this._itemHtml(a, c);
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.YearPicker" });
sjs
  .loadCss("Core5.Widget.YearPicker")
  .using("Core5.Container")
  .using("Core5.Widget.Button")
  .using("Core5.Util.DateFn")
  .using("Core5.Layout.TableLayout")
  .using("Core5.DomEvent.onmouseclass", !0)
  .using("Core5.Html.Tag")
  .define(function (d, a, c, b, f) {
    return {
      $extend: d,
      regUIObj: !0,
      $mixin: [b],
      columnCount: 4,
      cellsWidth: [52, 0, 50, 52],
      showBottom: !0,
      yearRows: 5,
      yearColumns: 4,
      thisYearAfterCount: 5,
      "-s-yp": !0,
      init: function () {
        this.$base();
        this._initData("year");
      },
      _yearPageHtml: function () {
        for (
          var a = this.yearRows,
            b = this.yearColumns,
            d = this._startYear,
            h = this.year,
            j = c.getThisYear(),
            k = [],
            l = 0;
          l < a;
          l++
        ) {
          for (var n = [], o = 0; o < b; o++) {
            var m = d + l * b + o;
            n.push({
              tag: "td",
              "-s-yp-td": !0,
              " s-overClass": "s-yp-td-over",
              "-s-yp-thisyear": m == j,
              "-s-yp-select": m == h,
              " s-click": "setYear",
              " year": m,
              inner: m,
            });
          }
          k.push({ tag: "tr", inner: n });
        }
        return f.html({
          tag: "table",
          " cellpadding": 0,
          " cellspacing": 0,
          "-s-yp-table": !0,
          inner: k,
        });
      },
      inner: function () {
        var b = [
          {
            $extend: a,
            icon: "backward",
            size: "small",
            evt: "AddStartYear",
            plus: -1,
          },
          {
            $extend: a,
            id: "yymmBtn",
            text: "&nbsp;",
            size: "small",
            colspan: 2,
            " s-overClass": !1,
            " s-downClass": !1,
            ";cursor": "default",
          },
          {
            $extend: a,
            rightIcon: "forward",
            size: "small",
            evt: "AddStartYear",
            plus: 1,
          },
          {
            tdClass: "s-yp-con",
            colspan: 4,
            getHtml: function (a) {
              return a._yearPageHtml();
            },
          },
        ];
        this.showBottom &&
          (b = b.concat([
            { $extend: a, size: "small", evt: "clear", text: "Clear" },
            {
              tdClass: "s-yp-show",
              getHtml: function (a) {
                return a._year || "&nbsp;";
              },
            },
            {
              $extend: a,
              size: "small",
              evt: "setThisYear",
              text: "This Year",
              colspan: 2,
            },
          ]));
        return b;
      },
      _setYear: function (a, b) {
        var f;
        var d = this.yearRows,
          j = this.yearColumns,
          k = this.thisYearAfterCount;
        f = a || "";
        var l = c.getThisYear(),
          d = d * j,
          k = Number(l) - d + k + 1;
        f = f ? Number(k) + Math.floor((f - k) / d) * d : k;
        b && this.isRender() && this.jq(".s-yp-show").html(a || "&nbsp;");
        this._startYear != f
          ? this.set("_startYear", f)
          : b &&
            this.isRender() &&
            (this.jq(".s-yp-select").removeClass("s-yp-select"),
            this.jq("[year='" + a + "']").addClass("s-yp-select"));
      },
      _set_startYear: function (a, b) {
        b &&
          (this.yymmBtn.setText(
            a + "~" + (a + this.yearRows * this.yearColumns - 1)
          ),
          this.isRender() && this.jq(".s-yp-con").html(this._yearPageHtml()));
      },
      onAddStartYear: function (a) {
        this.set(
          "_startYear",
          this._startYear + this.yearRows * this.yearColumns * Number(a.plus)
        );
      },
      onSetYear: function (a) {
        this.set("year", a.attr("year"));
        this.evt && this.report(this.evt, this.year);
      },
      onSetThisYear: function () {
        this.set("year", c.getThisYear());
        this.evt && this.report(this.evt, this.year);
      },
      onClear: function () {
        this.set("year", "");
        this.evt && this.report(this.evt, "");
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.MonthPicker" });
sjs
  .loadCss("Core5.Widget.MonthPicker")
  .using("Core5.Container")
  .using("Core5.Widget.Button")
  .using("Core5.Util.DateFn")
  .using("Core5.Util.StrFn")
  .using("Core5.Layout.TableLayout")
  .using("Core5.Widget.YearPicker")
  .using("Core5.Html.Tag")
  .define(function (d, a, c, b, f, e, g) {
    return {
      $extend: d,
      regUIObj: !0,
      $mixin: [f],
      columnCount: 3,
      cellsWidth: [47, 0, 90],
      "-s-mp": !0,
      init: function () {
        this.$base();
        this._initData("month");
      },
      _monthPageHtml: function () {
        for (
          var a = this._mm, b = c.getThisMonth().substr(4, 2), e = [], f = 0;
          3 > f;
          f++
        ) {
          for (var d = [], n = 0; 4 > n; n++) {
            var o = 4 * f + n + 1;
            10 > o && (o = "0" + o);
            d.push({
              tag: "td",
              "-s-mp-td": !0,
              " s-overClass": "s-mp-td-over",
              "-s-mp-thismonth": o == b,
              "-s-mp-select": o == a,
              " s-click": "setMm",
              " mm": o,
              inner: o,
            });
          }
          e.push({ tag: "tr", inner: d });
        }
        return g.html({
          tag: "table",
          " cellpadding": 0,
          " cellspacing": 0,
          "-s-mp-table": !0,
          inner: e,
        });
      },
      inner: function () {
        return [
          {
            $extend: e,
            id: "yp",
            evt: "setYear",
            colspan: 3,
            showBottom: !1,
            yearRows: 3,
            thisYearAfterCount: 2,
          },
          {
            tdClass: "s-mp-con",
            colspan: 3,
            getHtml: function (a) {
              return a._monthPageHtml();
            },
          },
          { $extend: a, size: "small", evt: "clear", text: "Clear" },
          {
            tdClass: "s-mp-show",
            getHtml: function (a) {
              return c.formatDate(a._month) || "&nbsp;";
            },
          },
          {
            $extend: a,
            size: "small",
            evt: "setThisMonth",
            text: "This Month",
          },
        ];
      },
      _setMonth: function (a) {
        this.yp.set("year", a && b.trim(a) ? a.substr(0, 4) : c.getThisYear());
        this.set("_mm", a && b.trim(a) ? a.substr(4, 2) : "");
        this.isRender() &&
          this.jq(".s-mp-show").html(c.formatDate(a) || "&nbsp;");
      },
      _set_mm: function (a, b) {
        this.isRender() &&
          b &&
          (this.jq(".s-mp-select").removeClass("s-mp-select"),
          a && this.jq("[mm='" + a + "']").addClass("s-mp-select"));
      },
      setMonth: function (a) {
        this.set("month", a);
        return this;
      },
      onSetMm: function (a) {
        var b = this.yp.year,
          a = a.attr("mm");
        this.set("month", "" + b + a);
        this.evt && this.report(this.evt, this.month);
      },
      onSetYear: function () {
        this.set("_mm", "");
        this.isRender() && this.jq(".s-mp-show").html("please click month...");
      },
      onSetThisMonth: function () {
        this.set("month", c.getThisMonth());
        this.evt && this.report(this.evt, this.month);
      },
      onClear: function () {
        this.set("month", "");
        this.evt && this.report(this.evt, this.month);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.MonthPicker" });
sjs
  .using("Core5.Widget.Input.Command")
  .using("Core5.Widget.MonthPicker")
  .using("Core5.Widget.Input.Formatter.DateTime")
  .using("Core5.Widget.Ability.Pop")
  .using("Core5.Cls")
  .define(function (d, a, c, b, f) {
    var e;
    return {
      $extend: d,
      $mixin: [c],
      rightIcon: "calendar",
      showPop: function () {
        e ||
          (e = f
            .create(
              a,
              b,
              { posKind: "top" == this.showPos ? "lb" : "lt" },
              this._getPopConfig()
            )
            .renderTo("body", !0));
        this.pop = e;
        var c = this._getShowPos();
        this.pop
          .setMonth(this.value)
          .setResponser(this)
          .show()
          .move(c.left, c.top);
      },
      _getPopConfig: function () {
        return {
          textField: this.textField,
          valueField: this.valueField,
          ";width": "200px",
          ";overflow-y": "auto",
          evt: "popSelect",
        };
      },
      _getPop: function (a) {
        a = this.$base(a);
        a.setDay(this.value);
        return a;
      },
      onPopSelect: function (a, b, c, e) {
        this.pop.hide();
        this.setValue(b);
        this.evt && this.report(this.evt, b, c, e);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Panel" });
sjs
  .loadCss("Core5.Shp.Panel")
  .loadCss("Core5.Shp.Icon")
  .using("Core5.Container")
  .using("Core5.DomEvent.onmouseclass")
  .define(function (d) {
    return {
      $extend: d,
      regUIObj: !0,
      title: "\u6a19\u984c...",
      icon: "th-list",
      "-s-panel": !0,
      showClose: !0,
      innerHtml: function (a) {
        a.push(this.titleHtml());
        this.$base(a);
      },
      titleHtml: function () {
        var a = [];
        a.push("<div class='s-panel-title'>");
        a.push(
          "<div class='icon icon-" +
            this.icon +
            " icon-white s-panel-title-icon'>"
        );
        a.push("</div>");
        a.push("<div class='s-panel-title-text'>");
        a.push(this.title);
        a.push("</div>");
        this.showClose &&
          a.push(
            "<div s-click='close' class='icon icon-white icon-remove s-panel-title-close' s-overClass='s-panel-title-close-over' xs-downClass='s-panel-title-close-down'></div>"
          );
        a.push("</div>");
        return a.join("");
      },
      onClose: function () {
        this.hide();
      },
      _setTitle: function (a) {
        this.isRender() && this.jq(".s-panel-title-text").html(a);
      },
      setTitle: function (a) {
        this.set("title", a);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Html.DatePicker" });
sjs
  .loadCss("Core5.Html.DatePicker")
  .using("Core5.Util.DateFn")
  .using("Core5.Util.StrFn")
  .define(function (d) {
    var a = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      c =
        '<i zh="\u65e5">Sun</i>,<i zh="\u4e00">Mon</i>,<i zh="\u4e8c">Tue</i>,<i zh="\u4e09">Wed</i>,<i zh="\u56db">Thu</i>,<i zh="\u4e94">Fri</i>,<i zh="\u516d">Sat</i>'.split(
          ","
        );
    return {
      _dp: function (a) {
        return {
          tag: "table",
          " cellpadding": 0,
          " cellspacing": 0,
          "-s-dp-table": !0,
          inner: [this._dpThsTr(), this._dpTrs(a)],
        };
      },
      _dpThsTr: function () {
        return { tag: "tr", inner: this._dpThs() };
      },
      _dpThs: function () {
        var a = [];
        this.showWeek && a.push(this._dpWeekTh());
        for (var c = 0; 7 > c; c++) a.push(this._dpTh(c));
        return a;
      },
      _dpWeekTh: function () {
        return {
          tag: "th",
          "-s-dp-th": !0,
          "-s-dp-th-week": !0,
          inner: "W",
          " title": "week",
        };
      },
      _dpTh: function (a) {
        return {
          tag: "th",
          inner: c[a],
          "-s-dp-th": !0,
          "-s-dp-th-weekend": 0 == a || 6 == a,
        };
      },
      _dpTrs: function (b) {
        var c = Number(b.substr(0, 4)),
          e = b.substr(4, 2),
          g = Number(e) - 1,
          e = new Date(c, g, 1).getDay() + 1,
          i = a[g];
        1 == g && (i = (0 == c % 4 && 0 != c % 100) || 0 == c % 400 ? 29 : 28);
        for (
          var c = Math.ceil((i - (7 - e + 1)) / 7) + 1,
            g = d.getToday(),
            h = Math.ceil((Number(g.substr(6, 2)) - (7 - e + 1)) / 7),
            j = d.getYearWeek(b + "01"),
            k = [],
            l = 0;
          l < c;
          l++
        )
          k.push(
            this._dpTr(l, e, i, b, g, g.substr(0, 6) == b && h == l, j + l)
          );
        return k;
      },
      _dpTr: function (a, c, e, d, i, h, j) {
        return {
          tag: "tr",
          "-s-dp-thisweek": h,
          inner: this._dpTds(a, c, e, d, i, j),
        };
      },
      _dpTds: function (a, c, e, g, i, h) {
        var j = [];
        this.showWeek && j.push(this._dpWeekTd(a, c, e, g, i, h));
        for (h = 0; 7 > h; h++) {
          var k = 7 * a + h + 1 - c + 1,
            l = g;
          0 >= k
            ? ((k = Number(d.addDays(g + "01", k - 1).substr(6))),
              (l = d.addMonths(g, -1)))
            : k > e && ((l = d.addMonths(g, 1)), (k -= e));
          var n = "" + l + (10 > k ? "0" + k : k);
          j.push(this._dpTd(n, k, 0 == h || 6 == h, n == i, g != l));
        }
        return j;
      },
      _dpWeekTd: function (a, c, e, d, i, h) {
        return {
          tag: "td",
          "-s-dp-td": !0,
          "-s-dp-week": !0,
          inner: h,
          " title": "the " + h + " week",
        };
      },
      _dpTd: function (a, c, e, d, i) {
        return {
          tag: "td",
          inner: this._dpTdInner(c, a),
          "-s-dp-td": !0,
          "-s-dp-weekend": e,
          "-s-dp-today": d,
          "-s-dp-notthismonth": i,
        };
      },
      _dpTdInner: function (a) {
        return a;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.DatePicker" });
sjs
  .loadCss("Core5.Widget.DatePicker")
  .using("Core5.Container")
  .using("Core5.Widget.Button")
  .using("Core5.Util.DateFn")
  .using("Core5.Util.StrFn")
  .using("Core5.Html.DatePicker")
  .using("Core5.Layout.TableLayout")
  .using("Core5.Widget.MonthPicker")
  .using("Core5.Widget.Panel")
  .using("Core5.Widget.Ability.Pop")
  .using("Core5.Cls")
  .using("Core5.Html.Tag")
  .define(function (d, a, c, b, f, e, g, i, h, j, k) {
    var l = null;
    return {
      $extend: d,
      regUIObj: !0,
      $mixin: [e, f],
      columnCount: 6,
      cellsWidth: [26, 26, 0, 18, 26, 26],
      "-s-dp": !0,
      init: function () {
        this.$base();
        this._initData("day");
      },
      _datePageHtml: function () {
        var a = this._dp(this._yymm);
        return k.html(a);
      },
      _dpTd: function (a, b, c, e, f) {
        b = this.$base(a, b, c, e, f);
        b[" s-overClass"] = "s-dp-over";
        b["-s-dp-select"] = a == this.day;
        b[" s-click"] = "setDay";
        b[" day"] = a;
        return b;
      },
      inner: function () {
        return [
          {
            $extend: a,
            icon: "backward",
            size: "small",
            evt: "addMonth",
            months: -12,
          },
          {
            $extend: a,
            icon: "chevron-left",
            size: "small",
            evt: "addMonth",
            months: -1,
          },
          {
            $extend: a,
            id: "yymmBtn",
            text: "&nbsp;",
            size: "small",
            evt: "yymm",
            colspan: 2,
          },
          {
            $extend: a,
            icon: "chevron-right",
            size: "small",
            evt: "addMonth",
            months: 1,
          },
          {
            $extend: a,
            icon: "forward",
            size: "small",
            evt: "addMonth",
            months: 12,
          },
          {
            tdClass: "s-dp-con",
            colspan: 6,
            getHtml: function (a) {
              return a._datePageHtml();
            },
          },
          {
            $extend: a,
            size: "small",
            evt: "clear",
            colspan: 2,
            text: "<i zh='\u6e05\u7a7a'>Clear</i>",
          },
          {
            tdClass: "s-dp-show",
            getHtml: function (a) {
              return c.formatDate(a.day) || "&nbsp;";
            },
          },
          {
            $extend: a,
            size: "small",
            evt: "setToday",
            colspan: 3,
            text: "<i zh='\u4eca\u5929'>Today</i>",
          },
        ];
      },
      _setDay: function (a, e) {
        var f = a && b.trim(a) ? a.substr(0, 6) : c.getThisMonth();
        this.isRender() &&
          e &&
          this.jq(".s-dp-show").html(c.formatDate(a) || "&nbsp;");
        f != this._yymm
          ? this.set("_yymm", f)
          : e &&
            this.isRender() &&
            (this.jq(".s-dp-select").removeClass("s-dp-select"),
            this.jq("[day='" + a + "']").addClass("s-dp-select"));
      },
      _set_yymm: function (a, b) {
        b &&
          (this.yymmBtn.setText(c.formatDate(a)),
          this.isRender() && this.jq(".s-dp-con").html(this._datePageHtml()));
      },
      setDay: function (a) {
        this.set("day", a);
        return this;
      },
      evt: "",
      onAddMonth: function (a) {
        this.set("_yymm", c.addMonths(this._yymm, a.months));
      },
      _reportDayEvt: function () {
        this.evt && this.report(this.evt, this.day);
      },
      onSetDay: function (a) {
        this.set("day", a.attr("day"));
        this._reportDayEvt();
      },
      onSetToday: function () {
        this.set("day", c.getToday());
        this._reportDayEvt();
      },
      onClear: function () {
        this.set("day", "");
        this._reportDayEvt();
      },
      onYymm: function () {
        l ||
          (l = j
            .create(i, h, {
              inner: {
                $extend: g,
                ";border-width": "1px 0 0 0",
                ";border-color": "#D0D0D0",
                ";border-style": "solid",
                evt: "setYymm",
                id: "picker",
                onSet: function (a, b) {
                  this._month = "";
                  this._year = b;
                  this.updateUI();
                },
              },
              title:
                "<i zh='\u8acb\u9078\u64c7\u5e74\u6708...'>please select month...</i>",
              icon: "th",
            })
            .renderTo("body", !0));
        l.picker.setResponser(this).set("month", this._yymm);
        var a = this.jq(),
          b = a.offset();
        l.css("width", a.width() + "px")
          .move(b.left, b.top)
          .show();
      },
      onSetYymm: function (a, b) {
        b && (this.set("_yymm", b), l.hide());
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.DatePicker" });
sjs
  .using("Core5.Widget.Input.Command")
  .using("Core5.Widget.DatePicker")
  .using("Core5.Widget.Input.Formatter.DateTime")
  .using("Core5.Widget.Ability.Pop")
  .using("Core5.Cls")
  .define(function (d, a, c, b, f) {
    var e;
    return {
      $extend: d,
      $mixin: [c],
      rightIcon: "calendar",
      showPop: function () {
        e ||
          (e = f
            .create(
              a,
              b,
              { posKind: "top" == this.showPos ? "lb" : "lt" },
              this._getPopConfig()
            )
            .renderTo("body", !0));
        this.pop = e;
        var c = this._getShowPos();
        this.pop
          .setDay(this.value)
          .setResponser(this)
          .show()
          .move(c.left, c.top);
      },
      _getPopConfig: function () {
        return {
          textField: this.textField,
          valueField: this.valueField,
          ";width": "200px",
          ";overflow-y": "auto",
          evt: "popSelect",
        };
      },
      _getPop: function (a) {
        a = this.$base(a);
        a.setDay(this.value);
        return a;
      },
      onPopSelect: function (a, b, c, e) {
        this.pop.hide();
        this.setValue(b);
        this.evt && this.report(this.evt, this.value, c, e, b);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Util.Service" });
sjs
.loadJs("./Ref/JSON.js")
.using("jQuery")
.using("$SERVICE_CONFIG")
.using("Core5.Util.EventManager")
.define(function (d, a, c) {
  function b(a) {
    for (; a; ) {
      if (a.MENU_JS && "string" == typeof a.MENU_JS) return a.MENU_JS;
      a = a.parent;
      if (a == window) break;
    }
    return null;
  }
  function f(a, b, c) {
    "contextIsParamsLast" == c && (c = b[b.length - 1]);
    for (
      a = [];
      c &&
      !(c.MENU_JS &&
        "string" == typeof c.MENU_JS &&
        a.push(c.MENU_JS.split("$")[0]),
      (c = c.parent),
      c == window);

    );
    return a.join(",");
  }
  function e(a, c, e) {
    if (0 == a.indexOf("~.")) {
      var d = b(e);
      if (!d)
        return (
          "call ~ style service(" +
          a +
          ")\ncontext(or parent) no MENU_JS property!\n(cusCallService context please set as the last params)"
        );
      var d = d.split("$"),
        g = d[1],
        d = d[0],
        h = sjs.getPath(d).replace(/\\/g, "/"),
        g = h.indexOf("_ui");
      if (0 >= g)
        return (
          "call ~ style service(" +
          a +
          ")\nnot a wdp app!\ncontextMenuJs:" +
          d +
          "\nappUIPath:" +
          h
        );
      d = d.split(".");
      h = h.split("/_ui/")[1].split("?")[0].replace(/\//g, ".").split(".");
      h.pop();
      "Index" == h[h.length - 1] && (h.pop(), d.pop());
      h = h.join(".");
      d = d.join(".");
      d = d.replace(h, "_ui." + h);
      h = a.substr(1);
      return { service: d + h, parentMenuJs: f(a, c, e) };
    }
    d = a.split("$");
    if (
      ("ClientTool.QueryPage" == d[0] ||
        "ClientTool.Query" == d[0] ||
        "ClientTool.QueryDataSet" == d[0] ||
        "ClientTool.QueryRows" == d[0] ||
        "ClientTool.QueryRow" == d[0] ||
        "ClientTool.QueryObject" == d[0] ||
        "ClientTool.ExecuteObject" == d[0] ||
        "ClientTool.ExecuteDataSet" == d[0] ||
        "ClientTool.Execute" == d[0] ||
        "ClientTool.ExecuteOutput" == d[0]) &&
      c[0] &&
      c[0].indexOf &&
      0 == c[0].indexOf("~.")
    ) {
      d = b(e);
      if (!d)
        return (
          "call ~ style service(" +
          a +
          ")\ncontext(or parent) no MENU_JS property!\n(cusCallService context please set as the last params)"
        );
      d = d.split("$");
      d = d[0];
      h = sjs.getPath(d).replace(/\\/g, "/");
      g = h.indexOf("_ui");
      if (0 >= g)
        return (
          "call ~ style service(" +
          a +
          ")\nnot a wdp app!\ncontextMenuJs:" +
          d +
          "\nappUIPath:" +
          h
        );
      d = d.split(".");
      h = h.split("/_ui/")[1].split("?")[0].replace(/\//g, ".").split(".");
      h.pop();
      "Index" == h[h.length - 1] && (h.pop(), d.pop());
      h = h.join(".");
      d = d.join(".");
      d = d.replace(h, "_ui." + h);
      h = c[0].substr(1);
      c[0] = d + h;
      return { parentMenuJs: f(a, c, e) };
    }
    var j = i.isUIService(a, c);
    if (j && 0 > j.indexOf("PCI.Eng.")) {
      "contextIsParamsLast" == e && (e = c.pop());
      if (!e || "object" != typeof e)
        return (
          "call _ui style service(" +
          j +
          ")\ncontext can not be empty!\n(cusCallService context please set as the last params)"
        );
      d = b(e);
      if (!d)
        return (
          "call _ui style service(" +
          j +
          ")\ncontext(or parent) no MENU_JS property!\n(cusCallService context please set as the last params)"
        );
      var h =
          "\n------------------\ncontextMenuJs:" +
          d +
          "\nuiService:" +
          j +
          (0 < a.indexOf("._ui.") ? "" : "(SqlHelper)") +
          "\n------------------\n",
        g = d.split("$"),
        s = j.split("$");
      if (g.length != s.length || (2 == g.length && g[1] != s[1]))
        return (
          "call _ui style service(" +
          h +
          ")\n$SERVICE_CONFIG is not same!\ncontextMenuJs:" +
          d +
          "\nuiService:" +
          j
        );
      d = g[0];
      j = s[0].split("._ui.");
      g = j[0] + ".";
      if (0 != d.indexOf(g))
        return (
          "call _ui style service(" +
          h +
          ")\ncontextMenuJs not start with serviceAppID!\ncontextMenuJs:" +
          d +
          "\nserviceAppID:" +
          g
        );
      j = j[1].split(".");
      j.pop();
      j = j.join(".") + ".";
      d = d.split(".");
      "Index" == d[d.length - 1] && d.pop();
      d = d.join(".").substr(g.length) + ".";
      if (0 != j.indexOf(d))
        return (
          "call _ui style service(" +
          h +
          ")\nserviceID not start with menuJs!\nserviceID:" +
          j +
          "\nmenuJs:" +
          d
        );
    }
    return { parentMenuJs: f(a, c, e) };
  }
  function g(a, b) {
    if (a && a.length)
      for (var c = 0; c < a.length; c++) if (a[c] == b) return !0;
    return !1;
  }
  function h() {
    return !!sjs._getLoadedJs()["Core5.Widget.Loading"];
  }
  var i = {
      isUIService: function (a, b) {
        var c,
          e = a.split("$");
        if (0 < a.indexOf("._ui.")) c = a;
        else if (
          ("ClientTool.QueryPage" == e[0] ||
            "ClientTool.Query" == e[0] ||
            "ClientTool.QueryDataSet" == e[0] ||
            "ClientTool.QueryRows" == e[0] ||
            "ClientTool.QueryRow" == e[0] ||
            "ClientTool.QueryObject" == e[0] ||
            "ClientTool.ExecuteObject" == e[0] ||
            "ClientTool.ExecuteDataSet" == e[0] ||
            "ClientTool.Execute" == e[0] ||
            "ClientTool.ExecuteOutput" == e[0]) &&
          b[0] &&
          b[0].indexOf &&
          0 < b[0].indexOf("._ui.")
        )
          c = b[0] + (2 == e.length ? "$" + e[1] : "");
        return c;
      },
      cusCallService: function (b, c, d, f, g, i, h) {
        var h = sjs.getRIAServiceByHost(h || sjs.getHost()),
          g = h + "?NoMultipleLang=1&ServiceKind=" + (g || "View"),
          b = { service: a ? b.split("$")[0] + "$" + a : b, params: c },
          c = e(b.service, b.params, "contextIsParamsLast"),
          j;
        if ("string" == typeof c) {
          if ((alert(c), i)) return "about:blank";
        } else
          c.service
            ? ((b.service = c.service), (j = c.parentMenuJs))
            : c.parentMenuJs && (j = c.parentMenuJs);
        b = encodeURIComponent(JsonHelper.encode(b));
        g = g + ("&JsonService=" + b) + ("&view=" + d);
        j && (g += "&ParentMenuJs=" + j);
        if (f) for (var t in f) g += "&" + t + "=" + f[t];
        if (i) return g;
        window.open(g);
      },
    },
    j = 0;
  sjs.iframeCallBack ||
    ((sjs._iframeCall = {}),
    (sjs._iframeKey = 0),
    (sjs.iframeCallBack = function (a) {
      var b = a.callbackArgs,
        e = sjs._iframeCall[b];
      delete sjs._iframeCall[b];
      var b = e.okFn,
        d = e.errFn,
        f = e.context,
        g = e.addParam;
      c.publish(
        i,
        !a.AjaxError ? "callServiceOK" : "callServiceErr",
        a,
        e.servicePackage,
        e.host,
        e.serviceConfig,
        f,
        g
      );
      a.AjaxError
        ? d
          ? d.call(f || window, a, g)
          : h() || alert((a.Message || "").replace(/\<br\>/gi, "\r\n"))
        : b && b.call(f || window, a.Result, g, a);
    }));
  i.exportExcelByHtml = function (a, b, c) {
    d("#__excelOutputFrm").length ||
      d("body").append(
        '<form name="__excelOutputFrm"  id="__excelOutputFrm" action="/RIAService/ExportExcel.aspx" method="post" target="__excelExportIfm" style="display:none"><input type="hidden" name="__excelHtmlHdn" id="__excelHtmlHdn"><input type="hidden" name="__excelFileNameHdn" id="__excelFileNameHdn"><input type="hidden" name="__excelTitleHdn" id="__excelTitleHdn"></form><iframe name="__excelExportIfm" style="display:none"></iframe>'
      );
    d("#__excelHtmlHdn").val(b);
    d("#__excelFileNameHdn").val(a);
    d("#__excelTitleHdn").val(c || "");
    d("#__excelOutputFrm")[0].submit();
  };
  i.callServiceUpload = function (b, f, j, o, l, r, q, s) {
    var t = b.lastIndexOf("."),
      p = b.substr(0, t),
      u = b.substr(t + 1),
      b = d("#SERVICE_UPLOAD_FORM");
    if ((t = b[0])) {
      var w = new Date().valueOf() + "_" + ++sjs._iframeKey,
        v = p.push
          ? p
          : typeof p == "string"
          ? { service: p + "." + u, params: j }
          : p;
      if (a)
        if (v.push)
          for (j = 0; j < v.length; j++)
            v[j].service = v[j].service.split("$")[0] + "$" + a;
        else v.service = v.service.split("$")[0] + "$" + a;
      var x;
      if (v.push)
        for (j = 0; j < v.length; j++) {
          p = e(v[j].service, v[j].params, o);
          if (typeof p == "string") {
            alert(p);
            x = { AjaxError: -1, Result: null, Message: p };
            r && r.call(o || window, x, q);
            return;
          }
          if (p.service) {
            v[j].service = p.service;
            x = p.parentMenuJs;
          } else if (p.parentMenuJs) x = p.parentMenuJs;
        }
      else {
        p = e(v.service, v.params, o);
        if (typeof p == "string") {
          alert(p);
          x = { AjaxError: -1, Result: null, Message: p };
          r && r.call(o || window, x, q);
          return;
        }
        if (p.service) {
          v.service = p.service;
          x = p.parentMenuJs;
        } else if (p.parentMenuJs) x = p.parentMenuJs;
      }
      var j = JsonHelper.encode(v),
        y = sjs.getRIAServiceByHost(s || sjs.getHost());
      d.makeArray(t);
      if (y.indexOf("http://") == 0) {
        s = y + "?ServiceKind=Upload&UploadKey=" + w;
        x && (s = s + ("&ParentMenuJs=" + x));
        d("input[name='JsonService']", b).val(j);
        t.setAttribute("action", s);
        var z = false;
        d("input[type='file']", b).each(function () {
          var a = d(this).attr("id");
          d(this).attr("TYPE_NOT_ALLOWED") == "1" && (z = true);
          d(this).prop("disabled", !g(f, a));
        });
        if (z) alert("file type not allowed,please choose again");
        else {
          c.publish(i, "callService", v, y, a, o, q);
          t.submit();
          d("input[type='file']", b).each(function () {
            d(this).prop("disabled", false);
          });
          i.callService(
            "AndrieWeb.UploadService",
            "WaitResult",
            [w],
            o,
            function (b) {
              c.publish(
                i,
                !b.AjaxError ? "callServiceOK" : "callServiceErr",
                b,
                v,
                y,
                a,
                o,
                q
              );
              b.AjaxError
                ? r
                  ? r.call(o || window, b, q)
                  : h() ||
                    alert((b.Message || "").replace(/\<br\>/gi, "\r\n"))
                : l && l.call(o || window, b.Result, q, b);
            },
            r,
            q,
            y
          );
        }
      } else {
        z = false;
        d("input[type='file']", b).each(function () {
          var a = d(this).attr("id");
          d(this).attr("TYPE_NOT_ALLOWED") == "1" && (z = true);
          d(this).prop("disabled", !g(f, a));
        });
        if (z) alert("file type not allowed,please choose again");
        else {
          d("input[name='JsonService']", b).val(j);
          c.publish(i, "callService", v, y, a, o, q);
          s =
            y +
            "?iframeRequest=1&callback=parent.sjs.iframeCallBack&callbackArgs=" +
            w;
          x && (s = s + ("&ParentMenuJs=" + x));
          t.setAttribute("action", s);
          sjs._iframeCall[w] = {
            context: o,
            okFn: l,
            errFn: r,
            addParam: q,
            servicePackage: v,
            host: y,
            serviceConfig: a,
          };
          t.submit();
          d("input[type='file']", b).each(function () {
            d(this).prop("disabled", false);
          });
        }
      }
    } else i.callService(p, u, j, o, l, r, q, s);
  };
  i.callService = function (b, f, g, o, l, r, q, s, t) {
    var p;
    if (typeof b == "object" && !b.push) {
      var u = b[f];
      if (typeof u == "string") p = { service: u, params: g };
      else if (typeof u == "function")
        if ((u = u.call(b, g, o, l, r, q, s)))
          typeof u == "string"
            ? (p = { service: u, params: g })
            : typeof u == "object"
            ? (p = u)
            : alert(
                "only string,object or void can be return in this function:" +
                  f
              );
        else return;
      else p = b;
    } else if (typeof b == "string") {
      if (b.substr(0, 1) == "@") {
        var w = { service: b + "." + f };
        c.publish(i, "callService", w, "", "", o, q);
        sjs.using(b.substr(1)).run(function (a) {
          var b;
          try {
            g = g.concat([]);
            for (var e = 0; e < g.length; e++)
              typeof g[e] == "object" &&
                (g[e] = JsonHelper.decode(JsonHelper.encode(g[e])));
            g.push(o);
            g.push(l);
            g.push(r);
            g.push(q);
            var d = a[f].apply(a, g);
            if (typeof d !== "undefined") {
              typeof d == "object" &&
                (d = JsonHelper.decode(JsonHelper.encode(d)));
              b = { AjaxError: 0, Result: d };
            } else {
              c.publish(
                i,
                "callServiceOK",
                { AjaxError: 0, Result: null },
                w,
                "",
                "",
                o,
                q
              );
              return;
            }
          } catch (j) {
            b = { AjaxError: -1, Result: null, Message: j.message };
          }
          c.publish(
            i,
            !b.AjaxError ? "callServiceOK" : "callServiceErr",
            b,
            w,
            "",
            "",
            o,
            q
          );
          b.AjaxError
            ? r
              ? r.call(o || window, b, q)
              : h() || alert((b.Message || "").replace(/\<br\>/gi, "\r\n"))
            : l && l.call(o || window, b.Result, q, b);
        });
        return;
      }
      p = { service: b + (f ? "." : "") + (f || ""), params: g };
    } else p = b;
    s = sjs.getRIAServiceByHost(s || sjs.getHost());
    w = p;
    if (a)
      if (w.push)
        for (p = 0; p < w.length; p++)
          w[p].service = w[p].service.split("$")[0] + "$" + a;
      else w.service = w.service.split("$")[0] + "$" + a;
    var v;
    if (w.push)
      for (p = 0; p < w.length; p++) {
        u = e(w[p].service, w[p].params, o);
        if (typeof u == "string") {
          alert(u);
          v = { AjaxError: -1, Result: null, Message: u };
          r && r.call(o || window, v, q);
          return;
        }
        if (u.service) {
          w[p].service = u.service;
          v = u.parentMenuJs;
        } else if (u.parentMenuJs) v = u.parentMenuJs;
      }
    else {
      u = e(w.service, w.params, o);
      if (typeof u == "string") {
        alert(u);
        v = { AjaxError: -1, Result: null, Message: u };
        r && r.call(o || window, v, q);
        return;
      }
      if (u.service) {
        w.service = u.service;
        v = u.parentMenuJs;
      } else if (u.parentMenuJs) v = u.parentMenuJs;
    }
    var x = JsonHelper.encode(w),
      y = function (e) {
        if (b.push) {
          var d;
          d = [];
          var f = "";
          if (e.AjaxError) f = e.Message;
          else
            for (var g = 0; g < e.Result.length; g++)
              e.Result[g].AjaxError
                ? (f = f + ((f.length > 0 ? "\n" : "") + e.Result[g].Message))
                : d.push(e.Result[g].Result);
          d = f.length > 0 ? f : d;
          if (!d.push) e.Message = d;
          c.publish(
            i,
            d.push ? "callServiceOK" : "callServiceErr",
            e,
            w,
            s,
            a,
            o,
            q
          );
          d.push
            ? l && l.call(o || window, d, q, e)
            : r
            ? r.call(o || window, e, q)
            : h() || alert((d || "").replace(/\<br\>/gi, "\r\n"));
        } else {
          c.publish(
            i,
            !e.AjaxError ? "callServiceOK" : "callServiceErr",
            e,
            w,
            s,
            a,
            o,
            q
          );
          e.AjaxError
            ? r
              ? r.call(o || window, e, q)
              : h() || alert((e.Message || "").replace(/\<br\>/gi, "\r\n"))
            : l && l.call(o || window, e.Result, q, e);
        }
      },
      z = function (b, e, d) {
        b = {
          AjaxError: -1,
          Result: null,
          Message: b.statusText,
          textStatus: e,
          errorThrown: d,
        };
        c.publish(i, "callServiceErr", b, w, s, a, o, q);
        r
          ? r.call(o || window, b, q)
          : h() || alert((b.Message || "").replace(/\<br\>/gi, "\r\n"));
      };
    c.publish(i, "callService", w, s, a, o, q);
    if (!t && x.length <= 800)
      d.ajax({
        url:
          s +
          "?JsonService=" +
          encodeURIComponent(x) +
          (v ? "&ParentMenuJs=" + v : ""),
        async: true,
        type: "get",
        dataType: "jsonp",
        success: y,
        error: z,
      });
    else {
      u = [];
      for (p = 0; p < x.length; p = p + 800) {
        var B = x.substr(
          p,
          Math.max(p < x.length - 1 ? 800 : x.length - p, 800)
        );
        u.push(B);
      }
      var t = t || new Date().valueOf() + "_" + ++j,
        x = u.length + 0,
        A = false;
      for (p = 0; p < u.length; p++)
        d.ajax({
          url:
            s +
            "?JsonKey=" +
            t +
            "&JsonTotal=" +
            x +
            "&JsonSeq=" +
            (p + 0) +
            "&JsonService=" +
            encodeURIComponent(u[p]) +
            (v ? "&ParentMenuJs=" + v : ""),
          async: true,
          type: "get",
          dataType: "jsonp",
          success: function (a, b) {
            if (!A && !a.PartPackage) {
              A = true;
              y(a, b);
            }
          },
          error: function (a, b, c) {
            if (!A) {
              A = true;
              z(a, b, c);
            }
          },
        });
    }
  };
  return i;
});
  /************************/
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Mixin.QueryGen" });
sjs.using("Core5.Util.Service").define(function (d) {
  return function (a) {
    var c = {};
    c[a + "QueryService"] = "ClientTool";
    c[a + "QueryMethod"] = "Query";
    c[a + "QuerySql"] = null;
    c[a + "QueryArgs"] = function (b, c, e, g, i) {
      var h = [],
        j = this[a + "QuerySql"];
      j && h.push(j);
      b && h.push(b);
      c && h.push(c);
      null != e &&
        "undefined" != typeof e &&
        (h.push(i ? 0 : e), h.push(g || 1));
      i &&
        (b = d.isUIService(
          this[a + "QueryService"] + "." + this[a + "QueryMethod"],
          h
        )) &&
        0 > b.indexOf("PCI.Eng.") &&
        h.push(this);
      return h;
    };
    c[a + "Query"] = function (b, c, e, g) {
      this.set("_dataListQueryStartTime", new Date());
      d.callService(
        this[a + "QueryService"],
        this[a + "QueryMethod"],
        this[a + "QueryArgs"](b, c, e, g) || [],
        this,
        this[a + "QueryResult"],
        this[a + "QueryError"],
        this[a + "QueryAddParam"],
        this[a + "QueryHost"]
      );
    };
    c[a + "ExcelViewUrl"] =
      "undefined" != typeof qs && qs.EXCEL2
        ? "View/ExcelView2.aspx"
        : "View/ExcelView.aspx";
    c[a + "Excel"] = function (b, c, e) {
      this.set("_dataListQueryStartTime", new Date());
      d.cusCallService(
        this[a + "QueryService"] + "." + this[a + "QueryMethod"],
        this[a + "QueryArgs"](b, c, null === e ? null : 0, 1, !0) || [],
        this[a + "ExcelViewUrl"],
        null,
        null,
        !1,
        this[a + "QueryHost"]
      );
    };
    c[a + "QueryResult"] = function () {};
    c[a + "QueryError"] = function (a) {
      alert(a.Message);
    };
    c[a + "QueryAddParam"] = null;
    c[a + "QueryHost"] = null;
    return c;
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.DSelect" });
sjs
  .using("Core5.Widget.Input.Command")
  .using("Core5.Widget.Input.RadioGroup")
  .using("Core5.Widget.Mixin.QueryGen")
  .define(function (d, a, c) {
    return {
      $extend: d,
      $mixin: [c("items")],
      textFromValue: !1,
      init: function () {
        this.$base();
        this._argChange = !0;
      },
      rightIcon: "chevron-down",
      popType: a,
      maxPopHeight: 200,
      minPopHeight: 200,
      minPopWidth: 200,
      _getPopConfig: function () {
        return {
          textField: this.textField || "text",
          valueField: this.valueField || "value",
          ";max-height": this.maxPopHeight + "px",
          ";min-width": this.minPopWidth + "px",
          ";min-height": this.minPopHeight + "px",
          ";overflow-y": "auto",
          evt: "popSelect",
          autoFocusSelected: !0,
        };
      },
      onPopClick: function () {
        this.showPop();
        this._argChange &&
          (!this.queryEveryTime && (this._argChange = !1),
          this.pop.setInner("loading..."),
          this.itemsQuery(
            this.initCondition,
            this.sort,
            this.pagesize,
            this.page
          ));
      },
      _getRowsFromResult: function (a) {
        return a ? a.Rows || a : null;
      },
      itemsQueryResult: function (a) {
        this.set("items", this._getRowsFromResult(a) || []);
      },
      itemsQueryError: function () {
        this.set("items", []);
      },
      _setItems: function (a) {
        a && !this.queryEveryTime && (this._argChange = !1);
        this.pop &&
          (a && a.length
            ? this.pop.setItems(a).select(null).select(this.value)
            : this.pop.setInner("No Items"));
      },
      _getPop: function (a) {
        var a = this.$base(a),
          c = this.items;
        c && c.length
          ? a.setItems(c).select(null).select(this.value)
          : a.setInner("No Items");
        a.css("width", this.jq().outerWidth() + "px");
        return a;
      },
      onPopSelect: function (a, c, e, d) {
        this.pop.hide();
        a = this.get("value");
        this.setValue(c);
        this.set("text", e[this.textField || "text"]);
        this.evt && this.report(this.evt, c, e, d, a);
      },
      clearValueAndText: function () {
        var a = this.$base();
        this.set("text", "");
        this.evt && this.report(this.evt, null, null, -1, a);
        return a;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Timebox" });
sjs.using("Core5.Widget.Input.Combox").define(function (d) {
  return {
    $extend: d,
    init: function () {
      this.items = this.getDefaultItems();
      this.$base();
    },
    startHour: 7,
    endHour: 24,
    showQuarter: !0,
    showHalf: !0,
    getDefaultItems: function () {
      for (var a = [], c = this.startHour; c < this.endHour; c++) {
        var b = 10 > c ? "0" + c : c,
          d = "00",
          e = b + ":" + d,
          d = b + d;
        a[a.length] = { value: d, text: e };
        this.showQuarter &&
          ((d = "15"),
          (e = b + ":" + d),
          (d = b + d),
          (a[a.length] = { value: d, text: e }));
        this.showHalf &&
          ((d = "30"),
          (e = b + ":" + d),
          (d = b + d),
          (a[a.length] = { value: d, text: e }));
        this.showQuarter &&
          ((d = "45"),
          (e = b + ":" + d),
          (d = b + d),
          (a[a.length] = { value: d, text: e }));
      }
      return a;
    },
    onInput: function (a, c, b) {
      b = b.replace(":", "");
      0 == b.length
        ? this.$base(a, c, null)
        : 4 == b.length && "0000" < b && "2400" > b
        ? this.$base(a, c, b)
        : this._innerSetText();
    },
    _setText: function (a) {
      this.$base(a, !0);
    },
    format: function (a) {
      var c = a;
      a && 4 == a.length && (c = c.substr(0, 2) + ":" + c.substr(2, 2));
      return c;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.RadioBox" });
sjs
  .loadCss("Core5.Widget.Input")
  .using("Core5.Component")
  .using("Core5.Html.TableLayout")
  .define(function (d, a) {
    return {
      $extend: d,
      $mixin: [a],
      regUIObj: !0,
      "-s-radiobox": !0,
      init: function () {
        this.$base();
        this._initData("items", []);
        this._initData("value");
      },
      valueField: "value",
      textField: "text",
      columnCount: 0,
      getItemsInner: function () {
        var a = [],
          b = this.isDisabled();
        this._radio_seed_id = this._radio_seed_id || 0;
        this._radio_seed_id++;
        this.radioName = this._objId + "_radio_" + this._radio_seed_id;
        for (var d = 0; d < this.items.length; d++) {
          var e = this.value == this.items[d][this.valueField],
            g = this.items[d][this.textField],
            i = this.radioName + "_" + (d + 1);
          a.push({
            "-s-radiobox-item": !0,
            "-s-radiobox-item-checked": e,
            tdStyle: this.items[d].tdStyle,
            colspan: this.items[d].colspan,
            rowspan: this.items[d].rowspan,
            " title": g,
            inner: [
              {
                tag: "input",
                tagNoInner: !0,
                "-s-radiobox-input": !0,
                " type": "radio",
                " disabled": b || null,
                " name": this.radioName,
                " value": this.items[d][this.valueField],
                " checked": e ? "true" : null,
                " s-click": "click",
                " id": i,
              },
              {
                tag: "label",
                inner: g,
                "-s-radiobox-label": !0,
                " for": i,
                " disabled": b || null,
              },
            ],
          });
        }
        return a;
      },
      layoutInner: function () {
        var a = this.getItemsInner();
        return a && a.length
          ? ((this._layoutRows = this._getLayoutRows(
              a,
              this.columnCount || a.length
            )),
            this._table(this._layoutRows, this.columnCount))
          : "";
      },
      inner: function () {
        return this.layoutInner();
      },
      onClick: function () {
        var a = this.jq("input:checked").val(),
          b = this.get("value");
        this.set("value", a);
        this.evt && this.report(this.evt, a, b);
      },
      onDisabledChange: function () {
        var a = this.isDisabled();
        this.isRender() && this.jq("input").prop("disabled", a);
      },
      _setValue: function (a) {
        if (this.isRender()) {
          var a = this.jq("input:checked").val(),
            b = this.jq("input[value='" + this.value + "']");
          a != this.value && b.prop("checked", !0);
          this.jq(".s-radiobox-item-checked").removeClass(
            "s-radiobox-item-checked"
          );
          b.parent().addClass("s-radiobox-item-checked");
        }
      },
      _setItems: function () {
        this.setInner(this.layoutInner);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.CheckBox" });
sjs
  .loadCss("Core5.Widget.Input")
  .using("Core5.Component")
  .define(function (d) {
    return {
      $extend: d,
      regUIObj: !0,
      "-s-checkbox": !0,
      checked: !1,
      init: function () {
        this.$base();
        "undefined" != typeof this.value
          ? this._initData("value")
          : this._initData("checked");
        this._initData("text");
      },
      inner: function () {
        var a = this._objId + "_input",
          c = this.isDisabled();
        return [
          {
            tag: "input",
            tagNoInner: !0,
            "-s-checkbox-input": !0,
            " s-change": "input",
            " type": "checkbox",
            " id": a,
            " s-click": "checkClick",
            " checked": this.checked || null,
            " disabled": c || null,
          },
          {
            tag: "label",
            "-s-checkbox-label": !0,
            " disabled": c || null,
            inner: this.text,
          },
        ];
      },
      onDisabledChange: function () {
        var a = this.isDisabled();
        this.isRender() &&
          (this.jq(".s-checkbox-input").prop("disabled", a),
          this.jq(".s-checkbox-label").prop("disabled", a));
      },
      _setChecked: function (a, c, b, d, e) {
        c &&
          (a
            ? (this.checkText && this.setText(this.checkText),
              this.checkStyle && this.css(this.checkStyle),
              this.checkClass && this.addClass(this.checkClass))
            : (this.noneText && this.setText(this.noneText),
              this.noneStyle && this.css(this.noneStyle),
              this.checkClass && this.removeClass(this.checkClass)),
          "VALUE" != e &&
            this.set("value", a ? this.trueValue : this.falseValue, "CHECKED"),
          this.isRender() && this.jq(".s-checkbox-input").prop("checked", a));
      },
      _setText: function (a) {
        this.isRender() && this.jq(".s-checkbox-label").html(a);
        this.attr("title", a);
      },
      setChecked: function (a) {
        this.set("checked", a);
        return this;
      },
      setText: function (a) {
        this.set("text", a);
        return this;
      },
      onCheckClick: function (a, c) {
        this.set("checked", this.jq("input").prop("checked"));
        this.onCommand(this.checked);
        c.stopPropagation();
      },
      " s-click": "checkConClick",
      onCheckConClick: function (a, c) {
        if ((c.srcElement || c.target) != this.jq("input")[0])
          this.set("checked", !this.jq("input").prop("checked")),
            this.onCommand(this.checked);
      },
      onCommand: function (a) {
        this.evt && this.report(this.evt, a);
      },
      trueValue: "Y",
      falseValue: "N",
      _setValue: function (a, c, b, d, e) {
        "CHECKED" != e && this.set("checked", a === this.trueValue, "VALUE");
      },
      setValue: function (a) {
        this.set("checked", a);
        return this;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Textarea" });
sjs
  .loadCss("Core5.Widget.Input")
  .using("Core5.Component")
  .using("Core5.DomEvent.oninput")
  .define(function (d) {
    return {
      $extend: d,
      regUIObj: !0,
      "-s-textarea": !0,
      disabledClass: "s-textarea-disabled",
      inner: function () {
        return {
          tag: "textarea",
          "-s-textarea-input": !0,
          " s-change": "input",
          " s-focus": "iptFocus",
          " s-mouseup": "mouseup",
          " readonly": this.isDisabled() ? !0 : null,
          inner: this.value,
        };
      },
      onIptFocus: function () {
        this.isDisabled() || (this._focused = !0);
      },
      onMouseup: function (a, c) {
        this._focused && a[0].select();
        this._focused = !1;
        c.stopPropagation();
      },
      onDisabledChange: function () {
        var a = this.isDisabled();
        this.setClass("s-readonly", a);
        this.isRender() && this.jq(".s-textarea-input").prop("readonly", a);
      },
      _setValue: function (a, c) {
        this.isRender() && c && this.jq(".s-textarea-input").val(a);
      },
      onInput: function (a, c, b) {
        this.set("value", b);
        this.evt && this.report(this.evt, this.value);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Checker.Range" });
sjs.define(function () {
  return {
    equalMin: !0,
    allowMinValue: 0,
    allowMinValueEqual: !0,
    equalMax: !0,
    allowMaxValue: 65536,
    allowMaxValueEqual: !0,
    _getMinValue: function () {
      return this.allowMinValue;
    },
    _getMaxValue: function () {
      return this.allowMaxValue;
    },
    checkInput: function (d) {
      d = this.$base(d);
      if (!d.error) {
        var a = d.value,
          c = this._getMinValue(),
          b = this._getMaxValue();
        if (this.equalMax && a > b)
          return { error: "can not greater than " + b };
        if (this.equalMax && a === b && !this.allowMaxValueEqual)
          return { error: "must less than " + b };
        if (this.equalMin && a < c) return { error: "can not less than " + c };
        if (this.equalMin && a === c && !this.allowMinValueEqual)
          return { error: "must greater than " + c };
      }
      return d;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Checker.Number" });
sjs.define(function () {
  return {
    decimalCount: 0,
    checkInput: function (d) {
      d = d.replace(/\,/g, "");
      if (isNaN(d)) return { error: d + " not a number" };
      var d = 1 * d,
        a = 0,
        c = ("" + d).split(".");
      2 == c.length && (a = c[1].length);
      return a > this.decimalCount
        ? {
            error: this.decimalCount
              ? "up to " + this.decimalCount + " decimal"
              : "must be integer",
          }
        : { value: d };
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Mixin.Input" });
sjs.using("Core5.Util.StrFn").define(function (d) {
  return {
    init: function () {
      this.$base();
      this._initData("value");
    },
    format: function (a) {
      return a;
    },
    _setValue: function () {
      this.renderInputText();
    },
    renderInputText: function (a) {
      var c = this.value;
      if (!a && (!(null === c || "undefined" == typeof c) || this.formatNull))
        c = this.format(c);
      this.set(
        "_text",
        (null === c || "undefined" == typeof c
          ? "function" == typeof this.textWhenNull
            ? this.textWhenNull()
            : this.textWhenNull || ""
          : c) + ""
      );
    },
    trimInput: !0,
    setInput: function (a) {
      this.trimInput && (a = d.trim(a));
      this.upperCase && (a = a.toUpperCase());
      var c;
      c =
        0 == a.length
          ? this.required
            ? { error: "required" }
            : { value: this.emptyInput }
          : "object" == typeof this.checkInput && this.checkInput.reg
          ? this.checkInput.reg.test(a)
            ? { value: a }
            : {
                error:
                  this.checkInput.msg ||
                  "not match:" + this.checkInput.reg.toString(),
              }
          : this.checkInput(a);
      c.error && !this.errorBack
        ? (this._innerSetError(c.error), this.set("_text", a + ""))
        : (c.error && this.report("msg", c.error),
          this._innerSetValue(c.error ? this.value : c.value));
      this.keyInput && this.set("_text", a + "");
    },
    required: !1,
    checkInput: function (a) {
      return { value: a };
    },
    emptyInput: null,
    _innerSetError: function (a) {
      this.set("error", a);
      this.set("value", null);
      this.errEvt && this.report(this.errEvt, this.error);
    },
    _innerSetValue: function (a) {
      this.set("error", null);
      var c = this.get("value");
      this.set("value", a);
      this.evt && this.report(this.evt, this.value, this._text, c);
    },
    setValue: function (a) {
      this.set("value", a);
      return this;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Text" });
sjs
  .loadCss("Core5.Widget.Input")
  .using("Core5.Component")
  .using("Core5.Widget.Mixin.Input")
  .using("Core5.DomEvent.oninput")
  .define(function (d, a) {
    return {
      $extend: d,
      $mixin: [a],
      regUIObj: !0,
      "-s-text": !0,
      inputType: "text",
      init: function () {
        this.$base();
        this.emptyText && this.attr("title", this.emptyText);
      },
      inner: function () {
        var a = {
          tag: "input",
          tagNoInner: !0,
          "-s-text-input": !0,
          " s-focus": "iptFocus",
          " s-blur": "iptBlur",
          " s-mouseup": "mouseup",
          " value": this._text ? this._text.replace(/"/g, "&quot;") : "",
          " type": this.inputType,
          " readonly": this.isDisabled() ? !0 : null,
          " maxlength": this.maxlength,
          " placeholder": this.emptyText,
          attribute: this.inputAttr,
        };
        a[this.keyInput ? " s-keyup" : " s-change"] = "input";
        return a;
      },
      onIptFocus: function () {
        this.isDisabled() ||
          (!this.error && this.renderInputText(!0), (this._needSelect = !0));
      },
      onIptBlur: function () {
        !this.error && this.renderInputText();
      },
      onMouseup: function (a, b) {
        this._needSelect &&
          (this._needSelect && a[0].select(),
          (this._needSelect = !1),
          b.stopPropagation());
      },
      focus: function () {
        if (this.isRender()) {
          var a = this.jq(".s-text-input")[0];
          a.focus();
          a.select();
          this._needSelect = !1;
        }
      },
      onDisabledChange: function () {
        var a = this.isDisabled();
        this.setClass("s-readonly", a);
        this.isRender() && this.jq(".s-text-input").prop("readonly", a);
      },
      _set_text: function (a) {
        this.isRender() && this.jq(".s-text-input").val(a);
      },
      onInput: function (a, b, d) {
        this.isDisabled() || this.setInput(d);
      },
      _setError: function (a, b) {
        b && (this.setClass("s-input-error", a), this.attr("title", a || null));
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Formatter.Dic" });
sjs.using("Core5.Util.StrFn").define(function (d) {
  return {
    format: function (a) {
      a = null === a && "undefined" != typeof this.isNull ? this.isNull : a;
      return this.dic && null !== a
        ? ((a = this.trimKey ? d.trim(a) : a),
          "undefined" == typeof this.dic[a] ? a : this.dic[a])
        : a;
    },
    formatNull: !0,
    _setValue: function (a, c, b, f, e) {
      this.$base(a, c, b, f, e);
      a = null === a && "undefined" != typeof this.isNull ? this.isNull : a;
      this.dicStyle &&
        null !== a &&
        ((a = this.trimKey ? d.trim(a) : a), this.css(this.dicStyle[a]));
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Formatter.Currency" });
sjs.define(function () {
  var d = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
  return {
    currency: "",
    formatNull: !0,
    ";font-family": "consolas",
    rightFixed: 0,
    zeroFixed: !1,
    format: function (a) {
      return a
        ? (this.rightFixed && (a = (1 * a).toFixed(this.rightFixed)),
          (a = ("" + a).split(".")),
          this.currency +
            a[0].replace(d, "$1,") +
            (1 < a.length ? "." + a[1] : ""))
        : this.zeroFixed && this.rightFixed
        ? ((a = (0).toFixed(this.rightFixed)), this.currency + a)
        : this.currency + "0";
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Formatter.Percent" });
sjs.using("Core5.Util.DateFn").define(function () {
  return {
    times: 100,
    decimalCount: 2,
    format: function (d) {
      if (d) {
        var a = Math.pow(10, this.decimalCount),
          d = "" + Math.round(d * this.times * a);
        return (
          d.substr(0, d.length - this.decimalCount) +
          (this.decimalCount ? "." : "") +
          d.substr(d.length - this.decimalCount) +
          "%"
        );
      }
      return "0";
    },
    formatNull: !0,
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Label" });
sjs
  .loadCss("Core5.Widget.Input")
  .using("Core5.Component")
  .define(function (d) {
    return {
      $extend: d,
      "-s-label": !0,
      init: function () {
        this.mline && this.addClass("s-label-mline");
        this.$base();
        "undefined" != typeof this.value
          ? this._initData("value")
          : this._initData("text");
      },
      format: function (a) {
        return a;
      },
      _setText: function (a) {
        if (
          this.format &&
          (!(null === a || "undefined" == typeof a) || this.formatNull)
        )
          a = this.format(a);
        a =
          null === a || "undefined" == typeof a
            ? "function" == typeof this.textWhenNull
              ? this.textWhenNull()
              : this.textWhenNull || ""
            : a;
        this.overShowTitle && this.attr("title", a);
        this.isRender() ? this.jq().html(a) : (this.inner = a);
      },
      setText: function (a) {
        this.set("text", a);
        return this;
      },
      setValue: function (a) {
        this.set("value", a);
        return this;
      },
      _setValue: function (a) {
        this.set("text", a);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Form" });
sjs
  .using("Core5.Widget.Label")
  .using("Core5.Widget.Input.Formatter.DateTime")
  .using("Core5.Widget.Input.Formatter.Percent")
  .using("Core5.Widget.Input.Formatter.Currency")
  .using("Core5.Widget.Input.Formatter.Item")
  .using("Core5.Widget.Input.Formatter.Dic")
  .using("Core5.Widget.Input.Text")
  .using("Core5.Widget.Input.Checker.Number")
  .using("Core5.Widget.Input.Checker.Range")
  .using("Core5.Widget.Input.Textarea")
  .using("Core5.Widget.Input.Toggle")
  .using("Core5.Widget.Input.CheckBox")
  .using("Core5.Widget.Input.RadioBox")
  .using("Core5.Widget.Input.Timebox")
  .using("Core5.Widget.Input.Select")
  .using("Core5.Widget.Input.DSelect")
  .using("Core5.Widget.Input.DatePicker")
  .using("Core5.Widget.Input.MonthPicker")
  .using("Core5.Widget.Button")
  .using("Core5.Widget.Input.Command")
  .using("Core5.Widget.Input.Combox")
  .using("Core5.Widget.Input.Upload2")
  .using("Core5.Container")
  .using("Core5.Bind.BindSource")
  .using("Core5.Bind.BindTarget")
  .using("Core5.Component")
  .using("Core5.Layout.Layout")
  .using("Core5.Layout.Float")
  .using("Core5.Util.EventManager")
  .define(function (
    d,
    a,
    c,
    b,
    f,
    e,
    g,
    i,
    h,
    j,
    k,
    l,
    n,
    o,
    m,
    p,
    q,
    s,
    t,
    r,
    y,
    w,
    u,
    x,
    v,
    z,
    C,
    B,
    D
  ) {
    var A = {
      label: { $extend: d, $mixin: [v], valueNoBindBack: !0 },
      dateTime: { $extend: d, $mixin: [v, a] },
      percent: { $extend: d, $mixin: [v, c] },
      currency: { $extend: d, $mixin: [v, b] },
      item: { $extend: d, $mixin: [v, f] },
      dic: { $extend: d, $mixin: [v, e] },
      text: { $extend: g, $mixin: [v] },
      int: {
        $extend: g,
        $mixin: [v, i, h, b],
        allowMinValueEqual: !1,
        equalMax: !1,
        inner: function () {
          var a = this.$base();
          a[";text-align"] = "right";
          a[";font-family"] = "consolas";
          return a;
        },
        formatNull: !1,
      },
      float: {
        $extend: g,
        $mixin: [v, i, h, b],
        decimalCount: 2,
        allowMinValueEqual: !1,
        equalMax: !1,
        inner: function () {
          var a = this.$base();
          a[";text-align"] = "right";
          a[";font-family"] = "consolas";
          return a;
        },
        formatNull: !1,
      },
      textarea: { $extend: j, $mixin: [v] },
      toggle: { $extend: k, $mixin: [v] },
      checkbox: { $extend: l, $mixin: [v] },
      radiobox: { $extend: n, $mixin: [v] },
      timebox: { $extend: o, $mixin: [v] },
      select: {
        $extend: m,
        $mixin: [v],
        _getPopCreater: function () {
          return this.parent.parent && this.parent.parent["-s-edit-grid"]
            ? this.parent.parent
            : this;
        },
      },
      dSelect: { $extend: p, $mixin: [v] },
      datePicker: { $extend: q, $mixin: [v] },
      monthPicker: { $extend: s, $mixin: [v] },
      command: { $extend: r, $mixin: [v] },
      combox: { $extend: y, $mixin: [v] },
      upload: { $extend: w, $mixin: [v] },
      con: {
        $extend: u,
        $mixin: [C, B, v],
        _initInnerItem: function (a, b) {
          a.$extend = a.$extend || A[a.type || this.defaultItemType];
          a.fieldNo && (a["@value"] = "item." + a.fieldNo);
          return this.$base(a, b);
        },
      },
      cmp: z,
      button: { $extend: t, $mixin: [v], evt: "rowEvt" },
    };
    return {
      $extend: u,
      $mixin: [x],
      noTdTag: !0,
      init: function () {
        this.$base();
        this._initData("item", {});
      },
      setItem: function (a) {
        this.set("item", a);
        return this;
      },
      defaultItemType: "text",
      bindFieldError: !0,
      __registerTypes: function (a) {
        for (var b in a) A[b] = A[b] || a[b];
      },
      _initInnerItem: function (a, b) {
        a.$extend = a.$extend || A[a.type || this.defaultItemType] || {};
        a.fieldNo &&
          ((a["@" + (a.$extend.VALUE_FIELD || "value")] =
            "." == a.fieldNo ? "item" : "item." + a.fieldNo),
          this.bindFieldError &&
            !a.$extend.NO_BIND_FIELD_ERROR &&
            (a["@error"] = "error." + a.fieldNo));
        return this.$base(a, b);
      },
      checkError: function () {
        var a = [];
        this._checkRequiredEmpty(a);
        this._checkFormErr(a);
        return a;
      },
      doCheckError: function () {
        var a = this.checkError();
        return a.length
          ? (D.publish(this, "displayLoadingMsg", "err", a.join("<br>")), !1)
          : !0;
      },
      _checkRequiredEmpty: function (a) {
        for (var b = this.inner, c = 0; c < b.length; c++) {
          var e = b[c].fieldNo,
            d = this.item ? this.item[e] : null;
          if (
            e &&
            b[c].required &&
            (null === d || "undefined" == typeof d || "" === d)
          )
            a.push((b[c].prompt || "") + " required!");
        }
      },
      _checkFormErr: function (a) {
        var b = this.error;
        if (b) for (var c in b) b[c] && a.push(b[c] + "(" + c + ")");
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.YT.Button" });
sjs
  .loadCss("Core5.YT.Button")
  .using("Core5.Component")
  .using("Core5.DomEvent.onmouseclass")
  .define(function (d) {
    return {
      $extend: d,
      regUIObj: !0,
      " s-click": "click",
      "-yt-btn": !0,
      " s-overClass": "yt-btn-over",
      inner: function () {
        return [
          "<div class='yt-btn-l'></div>",
          "<div class='yt-btn-r'></div>",
          "<div class='yt-btn-inner'>" + this.text + "</div>",
        ];
      },
      _setText: function (a) {
        this.isRender() && this.jq(".yt-btn-inner").html(a);
      },
      setText: function (a) {
        this.set("text", a);
        return this;
      },
      onClick: function () {
        this.evt && this.report(this.evt);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Layout.AutoFit" });
sjs.define(function () {
  function d(a) {
    a.css("position", a.relative ? "relative" : "absolute");
    a.css("overflow", a.overflow || a[";overflow"] || "auto");
    a.width
      ? (a.css(
          "width",
          "number" == typeof a.width || !isNaN(a.width)
            ? a.width + "px"
            : a.width
        ),
        "undefined" != typeof a.right
          ? (a.css(
              "right",
              "number" == typeof a.right || !isNaN(a.right)
                ? a.right + "px"
                : a.right
            ),
            a.css("left", "auto"),
            a.set && a.set("horLayoutKind", "right_width"))
          : (a.css(
              "left",
              "number" == typeof a.left || !isNaN(a.left)
                ? a.left + "px"
                : a.left
                ? a.left
                : 0
            ),
            a.css("right", "auto"),
            a.set && a.set("horLayoutKind", "left_width")))
      : (a.css(
          "left",
          "number" == typeof a.left || !isNaN(a.left)
            ? a.left + "px"
            : a.left
            ? a.left
            : 0
        ),
        a.css(
          "right",
          "number" == typeof a.right || !isNaN(a.right)
            ? a.right + "px"
            : a.right
            ? a.right
            : 0
        ),
        a.css("width", "auto"),
        a.set && a.set("horLayoutKind", "left_right"));
    a.height
      ? (a.css(
          "height",
          "number" == typeof a.height || !isNaN(a.height)
            ? a.height + "px"
            : a.height
        ),
        "undefined" != typeof a.bottom
          ? (a.css(
              "bottom",
              "number" == typeof a.bottom || !isNaN(a.bottom)
                ? a.bottom + "px"
                : a.bottom
            ),
            a.css("top", "auto"),
            a.set && a.set("verLayoutKind", "bottom_height"))
          : (a.css(
              "top",
              "number" == typeof a.top || !isNaN(a.top)
                ? a.top + "px"
                : a.top
                ? a.top
                : 0
            ),
            a.css("bottom", "auto"),
            a.set && a.set("verLayoutKind", "top_height")))
      : (a.css(
          "top",
          "number" == typeof a.top || !isNaN(a.top)
            ? a.top + "px"
            : a.top
            ? a.top
            : 0
        ),
        a.css(
          "bottom",
          "number" == typeof a.bottom || !isNaN(a.bottom)
            ? a.bottom + "px"
            : a.bottom
            ? a.bottom
            : 0
        ),
        a.css("height", "auto"),
        a.set && a.set("verLayoutKind", "top_bottom"));
  }
  return {
    init: function () {
      this.$base();
      this.isAutoFitLayout && d(this);
    },
    isAutoFitLayout: !0,
    _initInnerItem: function (a, c) {
      var b = this.$base(a, c);
      this.isAutoFitLayout && !this.innerNoAutoFit && b.css && d(b, !0);
      return b;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.TransformShowHide" });
sjs
  .loadCss("Core5.Shp.Other")
  .using("jQuery")
  .define(function (d) {
    var a = !1;
    return {
      visible: !1,
      orgWidth: 0,
      orgHeight: 0,
      orgLeft: 0,
      orgTop: 0,
      _lastPos: null,
      _hide: function () {
        var a = this.jq(),
          b = a.offset();
        this._lastPos = b;
        this.$base();
        var f = this;
        d(".transformDiv")
          .stop(!0, !0)
          .css({
            opacity: 0.8,
            visibility: "visible",
            width: a.width() + "px",
            height: a.height() + "px",
            left: b.left + "px",
            top: b.top + "px",
          })
          .animate(
            {
              opacity: 0.1,
              width: this.orgWidth + "px",
              height: this.orgHeight + "px",
              left: this.orgLeft + "px",
              top: this.orgTop + "px",
            },
            250,
            function () {
              f._finishHide.call(f);
            }
          );
      },
      _finishHide: function () {
        d(".transformDiv").css("visibility", "hidden");
      },
      _show: function () {
        if (this._lastPos) {
          a ||
            (d("<div class='transformDiv'></div>").appendTo("body"), (a = !0));
          var c = this.$base("$ONLY_GET"),
            b = this,
            f = this.jq(),
            e = f.width(),
            g = f.height(),
            f = this._lastPos || f.offset();
          d(".transformDiv")
            .stop(!0, !0)
            .css({
              opacity: 0.8,
              visibility: "visible",
              width: this.orgWidth + "px",
              height: this.orgHeight + "px",
              left: this.orgLeft + "px",
              top: this.orgTop + "px",
            })
            .animate(
              {
                opacity: 0.3,
                width: e + "px",
                height: g + "px",
                left: f.left + "px",
                top: f.top + "px",
              },
              200,
              function () {
                b._finishShow.call(b);
                c.call(b);
              }
            );
        } else this.$base();
      },
      _finishShow: function () {
        d(".transformDiv").css("visibility", "hidden");
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.Resizable" });
sjs.define(function () {
  return {
    init: function () {
      this.$base();
      this._initData("width", 0);
      this._initData("height", 0);
    },
    _setWidth: function (d) {
      this.css("width", !isNaN(d) ? (d ? d + "px" : 0) : "auto");
    },
    _setHeight: function (d) {
      this.css("height", !isNaN(d) ? (d ? d + "px" : 0) : "auto");
    },
    getWidth: function () {
      return this.isRender() ? this.jq().width() : this.width;
    },
    getHeight: function () {
      return this.isRender() ? this.jq().height() : this.height;
    },
    setWidth: function (d) {
      this.set("width", d);
      return this;
    },
    setHeight: function (d) {
      this.set("height", d);
      return this;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.DragMove" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.GetHelper")
  .using("Core5.DomEvent.UIManager")
  .define(function (d, a, c) {
    function b(a, b) {
      for (
        var c =
          a.relatedTarget ||
          ("mouseout" == a.type ? a.toElement : a.fromElement);
        c && c != b;

      )
        c = c.parentNode;
      return c != b;
    }
    var f, e, g, i, h, j, k, l, n;
    d(document)
      .delegate("[s-drag]", "mousedown", function (a) {
        k ||
          ((l = d(this)),
          (k = c.get(l.attr("s-drag")))
            ? ((n = !1),
              (f = a.pageX),
              (e = a.pageY),
              (g = a.clientX),
              (i = a.clientY),
              (j = h = 0),
              (document.unselectable = "on"),
              (document.onselectstart = function () {
                return !1;
              }))
            : (l = null));
      })
      .bind("mousemove", function (a) {
        if (1 === a.which && k) {
          var b = Math.round(a.clientX - g),
            c = Math.round(a.clientY - i);
          if (b || c)
            n ||
              (k._onDomEvent && k._onDomEvent("dragStart", l, a, [g, i, l]),
              (n = !0)),
              (h += b),
              (j += c),
              k._onDomEvent &&
                k._onDomEvent("dragMove", l, a, [b, c, h, j, g, i, f, e]),
              (g = a.clientX),
              (i = a.clientY),
              window.getSelection
                ? window.getSelection().removeAllRanges()
                : document.selection && document.selection.empty();
        } else (l = k = null), (n = !1);
      })
      .delegate("[s-drop]", "mouseup", function (b) {
        if (k && n) {
          var c = d(this),
            e = a.getSjsObj(c);
          e && e._onDomEvent && e._onDomEvent("drop", c, b, [k, l]);
        }
      })
      .delegate("[s-dropOverClass]", "mouseover", function (a) {
        if (k && n) {
          var c = d(this);
          c.attr("s-overself")
            ? c.addClass(c.attr("s-dropOverClass"))
            : b(a, c[0]) && c.addClass(c.attr("s-dropOverClass"));
        }
      })
      .delegate("[s-dropOverClass]", "mouseout", function (a) {
        if (k && n) {
          var c = d(this);
          c.attr("s-overself")
            ? c.removeClass(c.attr("s-dropOverClass"))
            : b(a, c[0]) && c.removeClass(c.attr("s-dropOverClass"));
        }
      })
      .delegate("[s-dropover]", "mouseover", function (c) {
        if (k && n) {
          var e = d(this);
          if (b(c, e[0])) {
            var f = a.getSjsObj(e);
            f && f._onDomEvent && f._onDomEvent("dropover", e, c);
          }
        }
      })
      .delegate("[s-dropout]", "mouseout", function (c) {
        if (k && n) {
          var e = d(this);
          if (b(c, e[0])) {
            var f = a.getSjsObj(e);
            f &&
              f._onDomEvent &&
              f._onDomEvent("dropout", e, c, d(c.relatedTarget || c.toElement));
          }
        }
      })
      .bind("mouseup", function (a) {
        k && n
          ? (k._onDomEvent && k._onDomEvent("dragEnd", l, a, [h, j, f, e]),
            (document.unselectable = "off"),
            (document.onselectstart = null))
          : k &&
            ((document.unselectable = "off"), (document.onselectstart = null));
        l = k = null;
        n = !1;
      });
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.Movable" });
sjs.define(function () {
  return {
    init: function () {
      this.$base();
      this._initData("left", 0);
      this._initData("top", 0);
    },
    _setLeft: function (d) {
      this.css("left", d ? d + "px" : d);
    },
    _setTop: function (d) {
      this.css("top", d ? d + "px" : d);
    },
    position: function () {
      return this.isRender()
        ? this.jq().position()
        : { left: this.left, top: this.top };
    },
    setLeft: function (d) {
      this.set("left", d);
    },
    setTop: function (d) {
      this.set("top", d);
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.DragMove" });
sjs
  .using("Core5.Widget.Ability.Movable")
  .using("jQuery")
  .using("Core5.DomEvent.PopManager")
  .using("Core5.DomEvent.DragMove")
  .define(function (d, a, c) {
    return {
      $extend: d,
      regUIObj: !0,
      _render: function () {
        this.$base();
        if (this.dragDom)
          for (var a = this.dragDom.split(","), c = 0; c < a.length; c++) {
            var e = a[c];
            (e = this[e] ? "#" + this[e]._domId : e) &&
              this.jq(e)
                .css("cursor", this.moveDisabled ? "default" : "move")
                .attr({
                  "s-drag": this._objId,
                  "s-dragStart": "moveStart",
                  "s-dragMove": "move",
                  "s-dragEnd": "moveEnd",
                });
          }
        else
          this.css("cursor", this.moveDisabled ? "default" : "move").attr({
            "s-drag": this._objId,
            "s-dragStart": "moveStart",
            "s-dragMove": "move",
            "s-dragEnd": "moveEnd",
          });
      },
      onMoveStart: function () {
        var a = this.getDragDiv(),
          d = this.jq(),
          e = d.offset();
        a.css({
          width: d.outerWidth() - 2 + "px",
          height: d.outerHeight() - 2 + "px",
          left: e.left + "px",
          top: e.top + "px",
          "z-Index": c.getTopZIndex() + 1,
        })
          .text(this.dragText || "")
          .show();
      },
      onMove: function (a, c, e) {
        var a = this.getDragDiv(),
          c = a.position(),
          d = e[0],
          e = e[1];
        d && a.css("left", c.left + d + "px");
        e && a.css("top", c.top + e + "px");
      },
      onMoveEnd: function (a, c, e) {
        var c = e[0],
          e = e[1],
          a = this.jq().position(),
          c = a.left + c,
          c = 0 > c ? 0 : c,
          d = c % 10;
        0 < d && (c = Math.round((c % 10) / 10) ? c + 10 - d : c - d);
        e = a.top + e;
        e = 0 > e ? 0 : e;
        d = e % 10;
        0 < d && (e = Math.round((e % 10) / 10) ? e + 10 - d : e - d);
        this.setLeft(c);
        this.setTop(e);
        this.getDragDiv().hide();
      },
      getDragDiv: function () {
        a("#s-dragDiv").length ||
          a(
            "<div id='s-dragDiv' style='display:none;position:absolute;border:1px dotted black;z-index:999;overflow:hidden;background-color:#f3f3f3;'>&nbsp;</div>"
          )
            .css("opacity", "0.5")
            .appendTo("body");
        return a("#s-dragDiv");
      },
      _setMoveDisabled: function (a) {
        a
          ? (this.disableEvent("moveStart"),
            this.disableEvent("move"),
            this.disableEvent("moveEnd"),
            this.isRender() &&
              this.jq("[s-dragStart='moveStart']")
                .filter("[s-drag='" + this._objId + "']")
                .css("cursor", "default"))
          : (this.enableEvent("moveStart"),
            this.enableEvent("move"),
            this.enableEvent("moveEnd"),
            this.isRender() &&
              this.jq("[s-dragStart='moveStart']")
                .filter("[s-drag='" + this._objId + "']")
                .css("cursor", "move"));
      },
      disableDragMove: function () {
        this.set("moveDisabled", !0);
      },
      enableDragMove: function () {
        this.set("moveDisabled", !1);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.YT.Panel" });
sjs
  .loadCss("Core5.YT.Panel")
  .using("Core5.Container")
  .using("Core5.Html.Tag")
  .using("Core5.DomEvent.onmouseclass")
  .define(function (d, a) {
    return {
      $extend: d,
      regUIObj: !0,
      title: "\u6a19\u984c...",
      "-yt-panel": !0,
      innerHtml: function (c) {
        var b = this._getPanelInner();
        this.bodyAbsolute &&
          ((b[1][";position"] = "absolute"),
          (b[1][";top"] = "25px"),
          (b[1][";left"] = "0"),
          (b[1][";right"] = "0"),
          (b[1][";bottom"] = "0"),
          (b[1][";overflow"] = "auto"));
        c.push(a.itemHtml(b, this));
      },
      _getPanelInner: function () {
        var a = this._getTitleToolsInner();
        return [
          {
            "-yt-panel-title": !0,
            inner: [
              { "-yt-panel-title-icon": !0 },
              this._getTitleText(a),
              {
                "-yt-panel-title-tools": !0,
                inner: a,
                ";width": 20 * a.length + "px",
              },
            ],
          },
          {
            "-yt-panel-body": !0,
            ";display": this.collapsed ? "none" : "block",
            inner: this.inner,
          },
        ];
      },
      _getTitleText: function (a) {
        return {
          "-yt-panel-title-text": !0,
          inner: this.title,
          ";right": 20 * a.length + 5 + "px",
        };
      },
      _getTitleToolsInner: function () {
        var a = [];
        "undefined" != typeof this.collapsed &&
          a.push(
            this._getTitleToolItem(this.collapsed ? "up" : "down", "upDown")
          );
        return a;
      },
      _getTitleToolItem: function (a, b) {
        var d = {
          "-yt-panel-btn": !0,
          " class": "yt-panel-title-" + a,
          " s-overClass": "yt-panel-title-" + a + "-over",
        };
        b && (d[" s-click"] = b);
        return d;
      },
      onUpDown: function () {
        this.set("collapsed", !this.collapsed);
      },
      _setCollapsed: function (a) {
        if (this.isRender()) {
          var b = "yt-panel-title-" + (!a ? "up" : "down"),
            d = "yt-panel-title-" + (!a ? "down" : "up");
          this.jq("." + b)
            .addClass(d)
            .removeClass(b)
            .removeClass(b + "-over")
            .attr("s-overClass", d + "-over");
          this.jq(".yt-panel-body").css("display", !a ? "block" : "none");
        }
      },
      _setTitle: function (a) {
        this.isRender() && this.jq(".yt-panel-title-text").html(a);
      },
      setTitle: function (a) {
        this.set("title", a);
        return this;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.YT.Model" });
sjs
  .loadCss("Core5.YT.Model")
  .using("Core5.YT.Panel")
  .using("Core5.Container")
  .using("Core5.Widget.Ability.Pop")
  .using("Core5.Widget.Ability.DragMove")
  .using("Core5.Widget.Ability.Resizable")
  .using("Core5.Widget.Ability.TransformShowHide")
  .using("Core5.Layout.AutoFit")
  .using("Core5.Layout.Float")
  .using("jQuery")
  .using("Core5.Html.Base")
  .using("Core5.YT.Button")
  .define(function (d, a, c, b, f, e, g, i, h, j, k) {
    return {
      $extend: d,
      $mixin: [c, b, f, g],
      dragDom:
        ">.yt-panel-title>.yt-panel-title-text,>.yt-panel-body>.yt-model-header",
      noClickHide: !1,
      mask: !0,
      maskOpacity: 0.8,
      autoAdjustPos: !1,
      noAdjustBodyOverflow: !0,
      "-yt-model": !0,
      width: 400,
      height: 250,
      top: -1,
      left: -1,
      init: function () {
        this.$base();
        this._adjustCenterMiddle();
      },
      " s-mousedown": "activateWin",
      onActivateWin: function () {
        this.setOnTopLevel();
        this.activeEvt && this.report(this.activeEvt);
      },
      show: function () {
        this.isRender() || this.renderTo(this.renderJq || "body", !0);
        this._adjustScrollPosWhenShow && this._adjustScrollPos();
        return this.$base();
      },
      _adjustScrollPosWhenShow: !0,
      _adjustCenterMiddle: function () {
        if (0 > this.top) {
          var a = this.height,
            b = h(window).height();
          this.setTop(b > a ? (b - a) / 2 : 0);
        }
        0 > this.left &&
          ((a = this.width),
          (b = h(window).width()),
          this.setLeft(b > a ? (b - a) / 2 : 0));
      },
      _adjustScrollPos: function () {
        var a = h("html").scrollLeft() || h("body").scrollLeft(),
          b = h("html").scrollTop() || h("body").scrollTop();
        this.setLeft(this.left + a - (this._scrollLeft || 0));
        this.setTop(this.top + b - (this._scrollTop || 0));
        this._scrollLeft = a;
        this._scrollTop = b;
      },
      _setHeader: function (a) {
        this.isRender()
          ? this.jq(".yt-model-header").html(a)
          : this.inner[0] &&
            this.inner[0]["-yt-model-header"] &&
            (this.inner[0].inner = a);
      },
      setHeader: function (a) {
        this.set("header", a);
        return this;
      },
      _initInner: function (a) {
        this.header &&
          (a.unshift({ "-yt-model-logo": !0 }),
          a.unshift({
            $extend: j,
            "-yt-model-header": !0,
            inner: this.header,
            ";line-height": "36px",
            height: 36,
          }));
        this.footer && a.push(this._modelFoolter());
        this.$base(a);
      },
      _initInnerItem: function (a, b) {
        var c = this.$base(a, b);
        this.header && 2 == b && c.css("top", "37px");
        if (this.footer && b == (this.header ? 2 : 0))
          c.css("bottom", 35 + (this.showBottomBorder ? 1 : 0) + "px");
        return c;
      },
      _modelFoolter: function () {
        for (var b = this.footer, c = 0; c < b.length; c++)
          b[c].$extend = b[c].$extend || k;
        return {
          $extend: a,
          "-yt-model-footer": !0,
          $mixin: [i],
          id: "footerCon",
          ignoreParentLayoutOnly: this.footerIgnoreLayoutOnly,
          bottom: 0,
          left: 0,
          height: 35,
          right: 0,
          overflow: "hidden",
          ";border-top": this.showBottomBorder ? "1px solid #C6C6C6" : "0",
          inner: b,
        };
      },
      showBottomBorder: !0,
      _getTitleToolsInner: function () {
        var a = [];
        a.push(
          this._getTitleToolItem(
            "close",
            this.closeDestroy ? "destroy" : "close"
          )
        );
        return a;
      },
      onDestroy: function () {
        this.destroyEvt && this.report(this.destroyEvt);
        this.dispose && this.dispose();
      },
      onClose: function () {
        this.hide();
        this.hideEvt && this.report(this.hideEvt);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.App.Mixin.Prompt" });
sjs
  .using("Core5.YT.Model")
  .using("Core5.Widget.Form")
  .define(function (d, a) {
    return {
      prompt: function (c, b, f, e) {
        this._promptModel ||
          this.createChild(d, {
            id: "_promptModel",
            inner: {
              $extend: a,
              id: "form",
              inner: [{ type: "text", fieldNo: "prompt" }],
            },
            title: c,
            footer: [
              { text: "OK", icon: "ok", floatRight: !0, evt: "OK" },
              { text: "Close", icon: "remove", evt: "close" },
            ],
            onOK: function () {
              var a = this.form.item.prompt;
              a && this.okEvt && this.report(this.okEvt, a);
            },
            height: 95,
            noClickHide: "undefined" == typeof e ? !0 : e,
          });
        this._promptModel.form.set("item.prompt", f || "");
        this._promptModel.set("okEvt", b).set("title", c).show();
        return this._promptModel;
      },
      hidePrompt: function () {
        this._promptModel && this._promptModel.hide();
      },
      customPrompt: function (a, b, f, e, g) {
        this[a] ||
          this.createChild(d, g, {
            id: a,
            inner: e,
            footer: [
              { text: "OK", icon: "ok", floatRight: !0, evt: b },
              { text: "Close", icon: "remove", evt: "close" },
            ],
            noClickHide:
              "undefined" == typeof g.noClickHide ? !0 : g.noClickHide,
          });
        this[a].set("title", f).show();
        return this[a];
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.onmouseover" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.GetHelper")
  .define(function (d, a) {
    function c(a, c) {
      for (
        var e =
          a.relatedTarget ||
          ("mouseout" == a.type ? a.toElement : a.fromElement);
        e && e != c;

      )
        e = e.parentNode;
      return e != c;
    }
    d(document)
      .delegate("[s-mouseover]", "mouseover", function (b) {
        var f = d(this);
        if (c(b, f[0])) {
          var e = a.getSjsObj(f);
          e && e._onDomEvent && e._onDomEvent("mouseover", f, b);
        }
      })
      .delegate("[s-mouseout]", "mouseout", function (b) {
        var f = d(this);
        if (c(b, f[0])) {
          var e = a.getSjsObj(f);
          e &&
            e._onDomEvent &&
            e._onDomEvent("mouseout", f, b, d(b.relatedTarget || b.toElement));
        }
      });
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Html.GridMixin" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.onmouseclass")
  .using("Core5.DomEvent.onmouseover")
  .define(function (d) {
    return {
      regUIObj: !0,
      _render: function () {
        this.$base();
        this._initScroll();
      },
      _disposeScroll: function () {
        "static" != this[";position"] &&
          (this.jq(" > .s-grid-r-scroll").scroll(null),
          this.jq(" > .s-grid-b-scroll").scroll(null),
          this.jq(" > .s-grid-body").unbind("mousewheel", this._scrollBodyFn));
      },
      _dispose: function (a) {
        this._disposeScroll();
        this.$base(a);
      },
      _initScroll: function () {
        if ("static" != this[";position"]) {
          var a = this;
          window.clearTimeout(this._resizeScrollID);
          this._resizeScrollID = window.setTimeout(function () {
            a && a._resize && a._resize(!0);
          }, 500);
          this.jq(" > .s-grid-r-scroll").scroll(function () {
            a._scrollRight();
          });
          this.jq(" > .s-grid-b-scroll").scroll(function () {
            a._scrollBottom();
          });
          this._scrollBodyFn = function (c, b) {
            if (a._rightScrollVisible) {
              var d = -a.jq(" > .s-grid-r-scroll").scrollTop() + 30 * b;
              0 < d && (d = 0);
              var e = a.jq(" > .s-grid-body").height(),
                g = a
                  .jq(" > .s-grid-r-scroll > .s-grid-r-scroll-inner")
                  .height();
              d < e - g && (d = e - g);
              a.jq(" > .s-grid-r-scroll").scrollTop(-d);
              a.onScrollBody(d);
              return !1;
            }
          };
          this.jq(" > .s-grid-body").bind("mousewheel", this._scrollBodyFn);
          this._resize(!0);
        }
      },
      onScrollBody: function () {},
      " s-mouseover": "resize",
      onResize: function () {
        this._resize();
      },
      onVisibleChange: function (a) {
        a && this.isRender() && this._resize(!0);
      },
      _resize: function (a) {
        if ("static" != this[";position"]) {
          var c = this.jq().width(),
            b = this.jq().height();
          if (a || c != this._jqWidth || b != this._jqHeight)
            return (
              (this._jqWidth = c), (this._jqHeight = b), this._doResize(c, b)
            );
        }
      },
      rightScrollHideTr: !0,
      _doResize: function (a, c) {
        this.rightScrollHideTr &&
          this.jq(" > .s-grid-body > table > tbody > .s-grid-body-tr").show();
        var b = this.jq(" > .s-grid-body").width(),
          d = this.jq("> .s-grid-body > .s-grid-body-table").width(),
          e = c - this._headerHeight - (d > b ? 22 : 0),
          g = this.jq("> .s-grid-body > .s-grid-body-table").height();
        d > b
          ? this._showBottomScroll(d, b, g > e, e)
          : this._hideBottomScroll();
        g > e
          ? (this._showRightScroll(g, e, d > b),
            this.rightScrollHideTr && this._initBodyTrHeights())
          : this._hideRightScroll(d > b);
        return {
          bodyWidth: b,
          bodyHeight: e,
          bodyTableWidth: d,
          bodyTableHeight: g,
        };
      },
      _showBottomScroll: function (a) {
        this.jq(" > .s-grid-b-scroll > .s-grid-b-scroll-inner").css(
          "width",
          a + "px"
        );
        this.jq(" > .s-grid-b-scroll").show();
      },
      _hideBottomScroll: function () {
        this.jq(" > .s-grid-b-scroll").hide();
        this.jq(" > .s-grid-body > .s-grid-body-table").css("left", "0");
        this.jq(" > .s-grid-head > .s-grid-head-table").css("left", "0");
      },
      _showRightScroll: function (a, c, b) {
        this._rightScrollVisible = !0;
        this.jq(" > .s-grid-head").css("right", "22px");
        this.jq(" > .s-grid-body")
          .css("right", "22px")
          .css("bottom", b ? "22px" : "0");
        this.jq(" > .s-grid-b-scroll").css("right", "22px");
        this.jq(" > .s-grid-r-scroll > .s-grid-r-scroll-inner").css(
          "height",
          a + "px"
        );
        this.jq(" > .s-grid-r-scroll").css("bottom", b ? "22px" : "0");
        this.jq(" > .s-grid-r-scroll").show();
      },
      _hideRightScroll: function (a) {
        this._rightScrollVisible = !1;
        this.jq(" > .s-grid-head").css("right", "0");
        this.jq(" > .s-grid-body")
          .css("right", "0")
          .css("bottom", a ? "22px" : "0");
        this.jq(" > .s-grid-b-scroll").css("right", "0");
        this.jq(" > .s-grid-r-scroll").hide();
        this.jq(" > .s-grid-body > .s-grid-body-table").css("top", "0");
      },
      _scrollRight: function () {
        if (this.rightScrollHideTr) {
          var a = this.jq(" > .s-grid-r-scroll").scrollTop(),
            c = this.jq().height();
          this._displayCurrentTrs(a, c);
        } else
          this.jq(" > .s-grid-body > .s-grid-body-table").css(
            "top",
            -1 * this.jq(" > .s-grid-r-scroll").scrollTop() + "px"
          );
      },
      _scrollBottom: function () {
        var a = -1 * this.jq(" > .s-grid-b-scroll").scrollLeft() + "px";
        this.jq(" > .s-grid-head  > .s-grid-head-table").css("left", a);
        this.jq(" > .s-grid-body > .s-grid-body-table").css("left", a);
      },
      _initBodyTrHeights: function () {
        for (
          var a = this.jq(" > .s-grid-body > table > tbody > .s-grid-body-tr"),
            c = [],
            b = a.size(),
            f = 0;
          f < b;
          f++
        ) {
          var e = d(a[f]);
          c.push(e.outerHeight());
        }
        this._bodyTrHeights = c;
        this._lastDisplayTrIndex = null;
        a.hide();
        a = this.jq().height();
        this._displayCurrentTrs(
          this.jq(" > .s-grid-r-scroll").scrollTop() || 0,
          a
        );
      },
      _displayCurrentTrs: function (a, c) {
        for (
          var b = this._bodyTrHeights, f = 0, e = 0, g = -1, i = -1, h = 0;
          h < b.length;
          h++
        )
          if (f >= a) {
            if ((-1 == g && (g = h), (e += b[h]), e > c)) {
              i = h;
              break;
            }
          } else f += b[h];
        -1 == i && (i = b.length - 1);
        b = this._lastDisplayTrIndex;
        if (!b || !(b[0] == g && b[1] == i)) {
          f = this.jq(" > .s-grid-body > table > tbody > .s-grid-body-tr");
          if (b)
            for (var j = b[0], k = b[1], h = j; h < k + 1; h++)
              (h < g || h > i) && d(f[h]).hide();
          for (h = g; h < i + 1; h++) (!b || h < j || h > k) && d(f[h]).show();
          this._lastDisplayTrIndex = [g, i];
        }
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Html.Grid" });
sjs.loadCss("Core5.Html.Grid").define(function () {
  return {
    "-s-grid": !0,
    cellSpacing: 0,
    defaultWidth: 120,
    gridHeadRowHeight: 27,
    _grid: function (d, a) {
      if ("static" != this[";position"])
        return (
          (this._headerHeight =
            this.headerHeight ||
            (this.titleRows ? this.titleRows.length : 0) *
              this.gridHeadRowHeight +
              this.gridHeadRowHeight),
          [
            this._gridHead(d, this.titleRows),
            this._gridBody(d, a),
            this._gridRightScroll(),
            this._gridBottomScroll(),
          ]
        );
      this._headerHeight = 0;
      return this._gridBody(d, a);
    },
    _gridRightScroll: function () {
      return {
        "-s-grid-r-scroll": !0,
        ";top": this._headerHeight + "px",
        inner: { "-s-grid-r-scroll-inner": !0 },
      };
    },
    _gridBottomScroll: function () {
      return {
        "-s-grid-b-scroll": !0,
        inner: { "-s-grid-b-scroll-inner": !0 },
      };
    },
    _gridHead: function (d, a) {
      return { "-s-grid-head": !0, inner: this._gridHeadInner(d, a) };
    },
    _gridHeadInner: function (d, a) {
      return {
        tag: "table",
        " cellspacing": this.cellSpacing,
        " cellpadding": 0,
        "-s-grid-head-table": !0,
        inner: [
          this._gridColgroup(d),
          this._thsTr(d, 0, a),
          a ? this._gridHeadExt(a) : null,
        ],
      };
    },
    _gridHeadExt: function (d) {
      for (var a = [], c = 0; c < d.length; c++)
        a.push(this._thsTr(d[c], c + 1, d));
      return a;
    },
    _thsTr: function (d, a, c) {
      return { tag: "tr", "-s-grid-head-tr": !0, inner: this._ths(d, a, c) };
    },
    _ths: function (d, a, c) {
      var b = [];
      if (d)
        for (var f = 0; f < d.length; f++)
          null !== d[f].prompt && b.push(this._th(d[f], a, f, d, c));
      !this.noAddBlankTd && b.push(this._thBlank(a, c));
      return b;
    },
    _thBlank: function (d, a) {
      return {
        tag: "th",
        "-s-grid-th": !0,
        "-s-grid-th-blank": !0,
        "-s-grid-th-up": d < (a ? a.length + 1 : 1) - 1,
        inner: { "-s-grid-prompt": !0, inner: "&nbsp;" },
      };
    },
    _th: function (d, a, c, b, f) {
      var e = d.colspan || 1,
        g = d.rowspan || (!a && f ? f.length + 1 : 1);
      return {
        tag: "th",
        "-s-grid-th": !0,
        "-s-grid-th-up": a + (g - 1) < (f ? f.length + 1 : 1) - 1,
        " colspan": 1 == e ? null : e,
        " rowspan": 1 == g ? null : g,
        ";padding-left": d.paddingLeft ? d.paddingLeft + "px" : null,
        ";padding-right": d.paddingRight ? d.paddingRight + "px" : null,
        attribute:
          (this.thAttr || "") +
          (this.thAttr && d.thAttr ? " " : "") +
          (d.thAttr || ""),
        " class":
          (this.thClass || "") +
          (this.thClass && d.thClass ? " " : "") +
          (d.thClass || ""),
        " style":
          (this.thStyle || "") +
          (this.thStyle && d.thStyle ? ";" : "") +
          (d.thStyle || ""),
        inner: this._thInner(d, a, c, b),
      };
    },
    _thInner: function (d) {
      var a =
        ("string" == typeof d.prompt
          ? (d.required ? "<b title='required' style='color:red'>*</b>" : "") +
            d.prompt
          : d.prompt) || "&nbsp;";
      return d.noGridPrompt
        ? a
        : {
            "-s-grid-prompt": !0,
            attribute:
              (this.thInnerAttr || "") +
              (this.thInnerAttr && d.thInnerAttr ? " " : "") +
              (d.thInnerAttr || ""),
            " class":
              (this.thInnerClass || "") +
              (this.thInnerClass && d.thInnerClass ? " " : "") +
              (d.thInnerClass || ""),
            " style":
              (this.thInnerStyle || "") +
              (this.thInnerStyle && d.thInnerStyle ? ";" : "") +
              (d.thInnerStyle || ""),
            inner: a,
            " title": d.noTitle ? null : d.titleText || d.prompt || null,
          };
    },
    _gridBody: function (d, a) {
      var c = {
        "-s-grid-body": !0,
        ";top": this._headerHeight + "px",
        inner: {
          tag: "table",
          " cellspacing": this.cellSpacing,
          " cellpadding": 0,
          "-s-grid-body-table": !0,
          inner: [this._gridColgroup(d), this._tbody(d, a)],
        },
      };
      if ("static" == this[";position"]) {
        c[";position"] = "static";
        var b = this._gridHeadInner(d, this.titleRows);
        b.tag = "thead";
        b.inner.shift();
        c.inner.inner.splice(1, 0, b);
      }
      return c;
    },
    _tds: function (d, a, c, b) {
      var f = [];
      if (c)
        for (var e = 0; e < c.length; e++)
          f.push(this._td(c[e], e, d, a, c, b));
      !this.noAddBlankTd && f.push(this._tdBlank());
      return f;
    },
    _tdBlank: function () {
      return {
        tag: "td",
        "-s-grid-td": !0,
        "-s-grid-td-blank": !0,
        inner: "&nbsp;",
      };
    },
    _td: function (d, a, c, b, f, e) {
      var g = d.bodyColspan || 1,
        i = d.bodyRowspan || 1,
        a = this._tdInner(d, a, c, b, f, e);
      a.tag = "td";
      a["-s-grid-td"] = !0;
      a[";padding-left"] = d.paddingLeft ? d.paddingLeft + "px" : null;
      a[";padding-right"] = d.paddingRight ? d.paddingRight + "px" : null;
      a[";text-align"] = d.align || null;
      a[" colspan"] = 1 == g ? null : g;
      a[" rowspan"] = 1 == i ? null : i;
      a.attribute = d.tdAttr || "";
      a[" class"] = d.tdClass || "";
      a[" style"] = d.tdStyle || "";
      return a;
    },
    _tdInner: function (d) {
      return this.noTdTag || d.noTdTag ? { inner: d } : d;
    },
    _gridColgroup: function (d) {
      for (var a = [], c = 0; c < d.length; c++) a.push(this._gridCol(d[c], c));
      return { tag: "colgroup", inner: a };
    },
    _gridCol: function (d) {
      return {
        tag: "col",
        tagNoInner: !0,
        ";width":
          (d.width ? d.width : this.defaultWidth) +
          (d.paddingLeft || 0) +
          (d.paddingRight || 0) +
          "px",
      };
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Grid" });
sjs
  .loadCss("Core5.Widget.Grid")
  .using("Core5.Bind.BindSource")
  .using("Core5.Bind.BindTarget")
  .using("Core5.ListContainer")
  .using("Core5.Html.Grid")
  .using("Core5.Html.GridMixin")
  .using("Core5.Widget.Form")
  .using("Core5.Util.EventManager")
  .define(function (d, a, c, b, f, e, g) {
    return {
      $extend: c,
      $mixin: [d, b, f],
      "-s-edit-grid": !0,
      init: function () {
        this.$base();
        this.setFields(this.fields);
        this._initData("error", []);
      },
      _getItemCfg: function (b, c) {
        var e = this.$base(b, c),
          d = (e.$mixin = e.$mixin || []);
        d.push(this._getInnerMixin(b, c));
        d.push(a);
        this._fillFormMixin(d);
        e["@item"] = "items." + c;
        e["@error"] = "error." + c;
        e.bindFieldError = !0;
        return e;
      },
      setInner: function (a) {
        this.isRender() && this._disposeScroll();
        this.$base(a);
        this.isRender() && this._initScroll();
      },
      itemType: e,
      _fillFormMixin: function () {},
      noTdTag: !0,
      _getInnerMixin: function (a, b) {
        return {
          rowIndex: b,
          tag: "tr",
          defaultItemType: "text",
          "-s-grid-body-tr": !0,
          xgetHtml: function () {
            this.setClass(
              "s-grid-body-tr-odd",
              !this.parent.noTrOdd && 1 == this.rowIndex % 2
            );
            return this.$base();
          },
          _itemsHtml: function (a) {
            var b = this._tds(
              this.item,
              this.rowIndex,
              this.inner,
              this.parent.items
            );
            this._itemHtml(a, b);
          },
          defaultWidth: this.defaultWidth,
          cellsWidth: this.cellsWidth,
          attribute: this.trAttr,
          " class": this.trClass,
          " style": this.trStyle,
          _tds: this._tds,
          _tdBlank: this._tdBlank,
          noAddBlankTd: this.noAddBlankTd,
          _td: this._td,
          _tdInner: this._tdInner,
          noTdTag: this.noTdTag,
          inner: this.fields,
        };
      },
      _itemsHtml: function (a, b) {
        var c = 0 < b.length ? b[0].inner : this.fields;
        c && ((c = this._grid(c, this.items)), this._itemHtml(a, c));
      },
      _tbody: function () {
        return [
          { tag: "tbody", " id": this._domId + "_tbody", inner: this.inner },
        ];
      },
      _thInner: function (a, b, c, e) {
        var d =
          ("string" == typeof a.prompt
            ? (a.required
                ? "<b title='required' style='color:red'>*</b>"
                : a.requiredCondition
                ? "<b title='" +
                  a.requiredCondition.replace(/\'/g, "") +
                  "' style='color:blue'>*</b>"
                : "") + a.prompt
            : a.prompt) || "&nbsp;";
        if (a.noGridPrompt) return d;
        a = this.$base(a, b, c, e);
        a.inner = d;
        return a;
      },
      _itemsContainerJq: function () {
        return "#" + this._domId + "_tbody";
      },
      setFields: function (a, b) {
        this.fields = a || [];
        b || this.set("items", [].concat(this.items || []));
      },
      _addItems: function (a, b, c) {
        this.$base(a, b, c);
        this.error && this.error.splice && this.error.splice(b, 0, {});
        this._resize(!0);
      },
      _removeItems: function (a, b, c) {
        this.$base(a, b, c);
        this.error.splice(b, 1);
        this._resize(!0);
      },
      _setItems: function (a, b) {
        this.$base(a, b);
        this.set("error", []);
      },
      checkError: function () {
        for (var a = [], b = this._items, c = 0; c < b.length; c++) {
          var e = b[c].checkError();
          e.length &&
            a.push(
              "<b style='color:#000084'>" + (c + 1) + ":</b>" + e.join("<br>")
            );
        }
        return a;
      },
      doCheckError: function () {
        var a = this.checkError();
        return a.length
          ? (g.publish(this, "displayLoadingMsg", "err", a.join("<br>")), !1)
          : !0;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.App.EditGrid" });
sjs.using("Core5.Widget.Grid").define(function (d) {
  return {
    $extend: d,
    xinit: function () {
      this.initFields();
      this.$base();
    },
    initFields: function (a) {
      return [
        {
          prompt: {
            "-icon": !0,
            "-icon-plus": !0,
            ";margin-left": "8px",
            " class": this._domId + "-grid-add-btn",
            ";display": this.disableAddRemove ? "none" : "",
          },
          thStyle: "cursor:pointer",
          thAttr: "s-overClass='s-btn-over' s-click='addItem'",
          noGridPrompt: !0,
          type: "button",
          icon: "minus",
          evt: "remove",
          width: 30,
          " class": this._domId + "-grid-remove-btn",
          ";display": this.disableAddRemove ? "none" : "",
        },
      ].concat(a || []);
    },
    setFields: function (a, c) {
      a = this.initFields(a);
      this.$base(a, c);
    },
    _setDisableAddRemove: function () {
      this._showHideBtnForDisabled();
    },
    _showHideBtnForDisabled: function () {
      if (this.isRender()) {
        var a = this;
        window.setTimeout(function () {
          a &&
            a.jq &&
            (a.disableAddRemove
              ? (a.jq("." + a._domId + "-grid-add-btn").hide(),
                a.jq("." + a._domId + "-grid-remove-btn").hide())
              : (a.jq("." + a._domId + "-grid-add-btn").show(),
                a.jq("." + a._domId + "-grid-remove-btn").show()));
        });
      }
    },
    _setItems: function (a, c) {
      this.$base(a, c);
      this._showHideBtnForDisabled();
    },
    onRemove: function (a) {
      if (!this.disableAddRemove) {
        var c = a.parent.item;
        if (this.keyFields) {
          for (
            var b = this.keyFields.split(","), d = !0, e = {}, g = 0;
            g < b.length;
            g++
          )
            if (c[b[g]]) e[b[g]] = c[b[g]];
            else {
              d = !1;
              break;
            }
          d &&
            (this.deleteItems || (this.deleteItems = []),
            this.deleteItems.push(e));
        }
        this.remove("items", a.parent.item);
      }
    },
    defaultAddItem: function () {
      return {};
    },
    onAddItem: function () {
      this.disableAddRemove || this.add("items", this.defaultAddItem());
    },
    _fillFormMixin: function (a) {
      a.push({ noTdTag: !0 });
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.MenuButton" });
sjs
  .loadCss("Core5.Widget.Menu")
  .using("Core5.Widget.Button")
  .using("Core5.Widget.Mixin.Pop")
  .define(function (d, a) {
    function c(a) {
      for (var c = b.length - 1; 0 <= c; c--)
        if (b[c] == a) {
          b.splice(c, b.length - c);
          break;
        }
    }
    var b = [];
    return {
      $extend: d,
      $mixin: [a],
      "-s-menubtn": !0,
      menuButton: !0,
      popType: "Core5.Widget.Menu",
      _getPopConfig: function () {
        return {
          inner: this.menuItems,
          _show: function () {
            for (var a = b.length - 1; 0 <= a; a--) {
              var c;
              a: {
                for (c = this; c.parent; ) {
                  if (c.parent == b[a]) {
                    c = !0;
                    break a;
                  }
                  c = c.parent;
                }
                c = !1;
              }
              if (c) break;
              b[a].hide();
            }
            b.push(this);
            this.parent &&
              this.parent.addClass &&
              this.parent.addClass("s-btn-showmenu");
            this.$base();
          },
          _hide: function () {
            c(this);
            this.parent &&
              this.parent.removeClass &&
              this.parent.removeClass("s-btn-showmenu");
            this.$base();
          },
          _dispose: function () {
            c(this);
            this.parent &&
              this.parent.removeClass &&
              this.parent.removeClass("s-btn-showmenu");
            this.$base();
          },
        };
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Toolbar" });
sjs
  .loadCss("Core5.Widget.Toolbar")
  .using("Core5.Container")
  .using("Core5.Layout.Float")
  .using("Core5.Widget.Button")
  .using("Core5.Widget.Input.Toggle")
  .using("Core5.Widget.Input.RadioGroup")
  .using("Core5.Widget.MenuButton")
  .using("Core5.DomEvent.onmouseover")
  .define(function (d, a, c, b, f, e) {
    function g(a) {
      for (var a = a.inner, b = 0; b < a.length; b++)
        if (a[b].menuButton) {
          var c = a[b].pop;
          c && (g(c), c.hide());
        }
    }
    var i = {
      button: {
        $extend: c,
        "-s-toolbar-btn": !0,
        " s-downClass": "s-toolbar-btn-down",
        " s-overClass": "s-toolbar-btn-over",
      },
      toggle: {
        $extend: b,
        "-s-tgl": null,
        "-s-toolbar-btn": !0,
        " s-overClass": "s-toolbar-tgl-over",
        toggleClass: "s-toolbar-tgl-checked",
      },
      group: {
        $extend: f,
        $mixin: [a],
        _getItemCfg: function (a, b) {
          var c = this.$base(a, b);
          c["-s-tgl"] = null;
          c["-s-toolbar-btn"] = !0;
          c[" s-overClass"] = "s-toolbar-tgl-over";
          c.toggleClass = "s-toolbar-tgl-checked";
          return c;
        },
      },
      menu: {
        $extend: e,
        "-s-toolbar-btn": !0,
        " s-downClass": "s-toolbar-btn-down",
        " s-overClass": "s-toolbar-btn-over",
        " s-mouseover": "showPop",
        " s-mouseout": "hidePop",
        rightIcon: "chevron-down",
        onShowPop: function (a, b) {
          this.showPop();
          b.stopPropagation();
        },
        onHidePop: function (a, b, c) {
          a = !0;
          this.pop &&
            c &&
            ((b = this.pop._objId),
            c[0] == this.pop.jq()[0]
              ? (a = !1)
              : c.parents("[s-objId='" + b + "']").length && (a = !1));
          a && this.hidePop();
        },
      },
    };
    return {
      $extend: d,
      $mixin: [a],
      "-s-toolbar": !0,
      _initInnerItem: function (a, b) {
        if ("-" == a) return '<div class="s-toolbar-split">&nbsp;</div>';
        if ("-|" == a)
          return '<div class="s-toolbar-split" style="float:right">&nbsp;</div>';
        a.$extend = a.$extend || i[a.type || "button"];
        return this.$base(a, b);
      },
      regUIObj: !0,
      " s-mouseover": "hideMenuBtnMenu",
      onHideMenuBtnMenu: function () {
        g(this);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.App.Pagebar" });
sjs
  .loadCss("Core5.App.Pagebar")
  .using("Core5.Widget.Toolbar")
  .using("Core5.Component")
  .using("Core5.Widget.Input.Text")
  .using("Core5.Widget.Input.Checker.Number")
  .using("Core5.Widget.Input.Checker.Range")
  .using("Core5.Widget.Label")
  .using("Core5.Widget.Input.RadioGroup")
  .using("Core5.Layout.Float")
  .using("Core5.Bind.BindSource")
  .using("Core5.Bind.BindTarget")
  .define(function (d, a, c, b, f, e, g, i, h, j) {
    return {
      $extend: d,
      "-s-pagebar": !0,
      $mixin: [h],
      inner: function () {
        return [
          { $extend: e, text: "<i zh='\u7e3d\u7b46\u6578'>Total</i>:" },
          {
            $extend: e,
            $mixin: [j],
            ";padding": "0 2px",
            ";color": "#000084",
            "@text": "totalCount",
            ";font-weight": "bold",
          },
          "-",
          {
            icon: "step-backward",
            $mixin: [j],
            evt: "firstPage",
            displayMode: "visible",
            "@visible": "page",
            bindVisibleFrom: function (a) {
              return 1 < a;
            },
          },
          {
            icon: "chevron-left",
            $mixin: [j],
            evt: "prePage",
            displayMode: "visible",
            "@visible": "page",
            bindVisibleFrom: function (a) {
              return 1 < a;
            },
          },
          {
            $extend: c,
            inputAttr: " maxlength=4",
            ";width": "25px",
            displayMode: "visible",
            evt: this.pageEvt,
            required: !0,
            $mixin: [b, f, j],
            allowMinValueEqual: !1,
            "@value": "page",
            "@allowMaxValue": "totalPage",
            "@visible": "totalPage",
            bindVisibleFrom: function (a) {
              return 1 < a;
            },
          },
          {
            $extend: e,
            $mixin: [j],
            text: "/",
            "@visible": "totalPage",
            bindVisibleFrom: function (a) {
              return 1 < a;
            },
          },
          {
            $extend: e,
            $mixin: [j],
            ";padding": "0 2px",
            ";color": "#000084",
            "@text": "totalPage",
            ";font-weight": "bold",
            "@visible": "totalPage",
            bindVisibleFrom: function (a) {
              return 1 < a;
            },
          },
          {
            icon: "chevron-right",
            $mixin: [j],
            evt: "nextPage",
            displayMode: "visible",
            "@visible": "page,totalPage",
            bindVisibleFrom: function (a, b) {
              return b > a;
            },
          },
          {
            icon: "step-forward",
            $mixin: [j],
            evt: "lastPage",
            displayMode: "visible",
            "@visible": "page,totalPage",
            bindVisibleFrom: function (a, b) {
              return b > a;
            },
          },
          {
            $extend: a,
            $mixin: [j],
            ";margin": "0 5px",
            inner:
              "<img style='margin-top:5px' src='" +
              (sjs.baseFolder || sjs.getDefaultFolder() || ".") +
              "/Image/Core5/wait.gif'>",
            "@visible": "loading",
          },
          {
            $extend: e,
            $mixin: [j],
            "-info-label": !0,
            "@text": "info",
            ";color": "#A65900",
            ";overflow": "hidden",
            ";text-overflow": "ellipsis",
            ";position": "absolute",
            ";left": "320px",
            ";right": "180px",
          },
          {
            type: "group",
            evt: this.pageSizeEvt,
            $mixin: [i, j],
            textField: null,
            valueField: null,
            items: this.pageSizes,
            floatRight: !0,
            "@selected": "pageSize",
            "@visible": "pageSize,totalCount",
            bindVisibleFrom: function (a, b) {
              return 0 < a && 0 < b;
            },
          },
          {
            $extend: e,
            $mixin: [j],
            text: "<i zh='\u6bcf\u9801\u7b46\u6578'>Page size</i>:",
            floatRight: !0,
            "@visible": "pageSize,totalCount",
            bindVisibleFrom: function (a, b) {
              return 0 < a && 0 < b;
            },
          },
        ];
      },
      pageSizes: [10, 100, 500],
      onLastPage: function () {
        this._innerSetPage(this.totalPage);
      },
      onNextPage: function () {
        this._innerSetPage(this.page + 1);
      },
      onFirstPage: function () {
        this._innerSetPage(1);
      },
      onPrePage: function () {
        this._innerSetPage(this.page - 1);
      },
      _innerSetPage: function (a) {
        this.set("page", a);
        this.pageEvt && this.report(this.pageEvt, this.page);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.App.DataWindow" });
sjs
  .using("Core5.Widget.Mixin.QueryGen")
  .using("Core5.Util.DataFn")
  .using("Core5.Util.StrFn")
  .using("Core5.Util.Service")
  .define(function (d, a, c, b) {
    function f(a, b, c) {
      a &&
        b &&
        a.sort(function (a, e) {
          var d = null == a ? "" : a[b] || "",
            f = null == e ? "" : e[b] || "";
          !isNaN(d) && !isNaN(f) && ((d *= 1), (f *= 1));
          return d < f
            ? "desc" == c
              ? 1
              : -1
            : d == f
            ? 0
            : "desc" == c
            ? -1
            : 1;
        });
      return a;
    }
    function e(a, b) {
      for (var e = [], d = 0; d < a.length; d++) {
        var f = a[d],
          l = !0,
          n;
        for (n in b) {
          var o = b[n],
            m = "E",
            p = n,
            q = n.indexOf("__");
          0 < q &&
            ((m = c.trim(n.substr(q + 2).toUpperCase())),
            (p = n.substr(0, n.length - m.length - 2)));
          p = f ? f[p] : "";
          if (!("undefined" === typeof o || null === o || 0 == ("" + o).length))
            if (
              !(
                ("undefined" === typeof p ||
                  null === p ||
                  0 == ("" + p).length) &&
                "NE" == m
              ) &&
              !(
                "LIKE" == m &&
                0 <= ("" + p).toLowerCase().indexOf(("" + o).toLowerCase())
              ) &&
              !(
                "START" == m &&
                0 == ("" + p).toLowerCase().indexOf(("" + o).toLowerCase())
              ) &&
              !(
                "END" == m &&
                ("" + p).toLowerCase().lastIndexOf(("" + o).toLowerCase()) ==
                  ("" + p).length - ("" + o).length
              ) &&
              !("G" == m && p > o) &&
              !("GE" == m && p >= o) &&
              !("L" == m && p < o) &&
              !("LE" == m && p <= o) &&
              !("NE" == m && p != o) &&
              !("E" == m && p == o)
            ) {
              l = !1;
              break;
            }
        }
        l && e.push(f);
      }
      return e;
    }
    return {
      $extend: {
        sortField: "",
        sortSeq: "desc",
        pageSize: 10,
        page: 1,
        init: function () {
          this.$base();
          this._initData("pageSize", this.pageSize);
          this._initData("page");
          this._initData("totalPage", 0);
          this._initData("totalCount", 0);
          this.sortField &&
            (this._initData("sortField"), this._initData("sortSeq"));
          this.set("source", this.rows || []);
        },
        source: null,
        _filterRows: null,
        _sortRows: null,
        rows: null,
        _setSource: function (a) {
          this._setCountBySource && this.set("originalCount", a ? a.length : 0);
          this._doFilter();
        },
        _setCountBySource: !0,
        _setTotalCount: function () {
          this._calTotalPage();
        },
        _setPageSize: function () {
          this._calTotalPage();
        },
        _calTotalPage: function () {
          this.set(
            "totalPage",
            this.pageSize ? Math.ceil(this.totalCount / this.pageSize) : 0
          );
          this.page > this.totalPage && this.set("page", this.totalPage || 1);
        },
        doFilter: function () {
          this._doFilter();
        },
        doSort: function () {
          this._doSort();
        },
        doPage: function () {
          this._doPage();
        },
        _doFilter: function () {
          var a = this._needFilter();
          this._filterRows = a ? e(this.source, this.filter) : this.source;
          this._doSort();
          this.set(
            "totalCount",
            a
              ? this._filterRows
                ? this._filterRows.length
                : 0
              : this.originalCount
          );
        },
        _needFilter: function () {
          var a;
          if ((a = this.source))
            if ((a = this.filter))
              a: {
                if ((a = this.filter))
                  for (var b in a)
                    if (
                      "" !== a[b] &&
                      null !== a[b] &&
                      "undefined" != typeof a[b]
                    ) {
                      a = !0;
                      break a;
                    }
                a = !1;
              }
          return a;
        },
        _doSort: function () {
          this._sortRows = this._needSort()
            ? f([].concat(this._filterRows), this.sortField, this.sortSeq)
            : this._filterRows;
          this._doPage();
        },
        _needSort: function () {
          return this._filterRows && this.sortField;
        },
        _doPage: function () {
          this.set(
            "rows",
            this._needPage()
              ? this._sortRows.slice(
                  this.pageSize * (this.page - 1),
                  this.pageSize * this.page
                )
              : this._sortRows
          );
        },
        _needPage: function () {
          return this._sortRows && this.originalCount && this.pageSize;
        },
      },
      $mixin: [d("list")],
      initQuery: !1,
      init: function () {
        this._setCountBySource = !this._pageServer();
        this.set("filter", this._initFilter());
        this.$base();
        this.set("condition", this._initQueryCondition());
        this._initData("condition");
        this._initData("queryStatus", 0);
        this._initData("queryError", null);
        this.initQuery && this.doQuery();
      },
      _initQueryCondition: function () {
        return "undefined" != typeof this.initCondition
          ? this.initCondition
            ? a.deepCopy(this.initCondition)
            : null
          : {};
      },
      _initFilter: function () {
        return "undefined" != typeof this.initFilter
          ? this.initFilter
            ? a.deepCopy(this.initFilter)
            : null
          : null;
      },
      checkQuery: function () {
        return null;
      },
      doQuery: function () {
        this._initQuery = !0;
        var a = this.checkQuery ? this.checkQuery(this.condition) : null;
        this.set("conError", a);
        a
          ? (this.nowTranReport = !1)
          : (this.set("queryStatus", 1), this.listQuery());
      },
      doExcel: function () {
        var a = this.checkQuery ? this.checkQuery(this.condition) : null;
        this.set("conError", a);
        !a && this.listExcel();
      },
      listQueryArgs: function (a, c, e, d, f) {
        a = [];
        "undefined" != typeof this.listQuerySql &&
          null !== this.listQuerySql &&
          a.push(this.listQuerySql);
        this.condition && a.push(this.condition);
        !this.sortClient &&
          this.sortField &&
          a.push(this.sortField + " " + this.sortSeq);
        this._pageServer() &&
          (a.push(f ? 0 : this.pageSize), a.push(this.page));
        f &&
          (f = b.isUIService(
            this.listQueryService + "." + this.listQueryMethod,
            a
          )) &&
          0 > f.indexOf("PCI.Eng.") &&
          a.push(this);
        return a;
      },
      _pageServer: function () {
        return !this.pageClient && "number" == typeof this.pageSize;
      },
      listQueryResult: function (a) {
        this.set("_dataListQueryEndTime", new Date());
        this.set(
          "_dataListQueryTime",
          Math.round(
            (this._dataListQueryEndTime - this._dataListQueryStartTime) / 1e3
          )
        );
        this.set("queryStatus", 0);
        this.set("queryError", null);
        var b = this._pageServer();
        b && this.set("originalCount", a.Count);
        this.set("source", b ? a.Rows : a);
        this.refreshEvt && this.report(this.refreshEvt, a);
      },
      listQueryError: function (a) {
        this.set("_dataListQueryEndTime", new Date());
        this.set(
          "_dataListQueryTime",
          Math.round(
            (this._dataListQueryEndTime - this._dataListQueryStartTime) / 1e3
          )
        );
        this.set("queryStatus", 0);
        this.set("queryError", a.Message);
      },
      doSort: function () {
        this.sortClient ? this.$base() : this._initQuery && this.doQuery();
      },
      doPage: function () {
        this.pageClient ? this.$base() : this._initQuery && this.doQuery();
      },
      _needSort: function () {
        return this.sortClient && this.$base();
      },
      _needPage: function () {
        return this.pageClient && this.$base();
      },
      getFilterRows: e,
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.ReportStyle" });
sjs
  .loadCss(".ReportStyle")
  .using("jQuery")
  .define(function (d) {
    return {
      "-s-report-style": !0,
      _grid: function (a, c) {
        var b = this.$base(a, c),
          d = b[0];
        b.shift();
        b.splice(1, 0, d);
        d[";display"] = "none";
        return b;
      },
      _gridHeadInner: function (a, c) {
        var b = this.$base(a, c),
          d = [].concat(b.inner);
        d.shift();
        this._tmpGridHeadInner = d;
        b[";table-layout"] = "auto";
        return b;
      },
      _fillFormMixin: function (a) {
        this.$base(a);
        a.push({
          _td: function (a, b, d, e, g, i) {
            if ((a = this.$base(a, b, d, e, g, i)) && 0 == e)
              (a[" s-field-index"] = b), (a["-s-width-td"] = !0);
            return a;
          },
        });
      },
      noTdTag: !0,
      _gridBody: function (a, c) {
        this._resizeColsWidth = !1;
        for (
          var b = this.$base(a, c),
            d = this._tmpGridHeadInner,
            e = d.length - 1;
          0 <= e;
          e--
        )
          b.inner.inner.splice(1, 0, d[e]);
        b[";top"] = "0";
        b.inner[";table-layout"] = "auto";
        return b;
      },
      noAddBlankTd: !0,
      _gridCol: function (a, c) {
        delete a.width;
        delete a.paddingLeft;
        delete a.paddingRight;
        delete a.width;
        var b = this.$base(a, c);
        b[" s-field-index"] = c;
        delete b[";width"];
        return b;
      },
      colMinWidth: 30,
      colMaxWidth: 200,
      _doResize: function (a, c) {
        this.$base(a, c);
        if (!this._resizeColsWidth) {
          this._resizeColsWidth = !0;
          this.jq(".s-grid-head").show();
          for (
            var b = this.jq(".s-grid-head-table col"),
              f = this.jq(".s-grid-body-table col"),
              e = this.jq(".s-grid-body-table .s-width-td"),
              g = this.htmlForm ? this.htmlForm.inner : this.fields,
              i = 0;
            i < e.length;
            i++
          ) {
            var h = d(e[i]),
              j = h.attr("s-field-index");
            if (j) {
              var j = 1 * j,
                h = Math.ceil(h.width()),
                j = g[j],
                k = j.minWidth || this.colMinWidth || 0,
                h = h < k ? k : h;
              (k = j.maxWidth || this.colMaxWidth) && (h = h > k ? k : h);
              j.width = h;
            }
          }
          for (i = 0; i < b.length; i++)
            (j = 1 * d(b[i]).attr("s-field-index")),
              d(b[i]).css("width", g[j].width + "px"),
              d(f[i]).css("width", g[j].width + "px");
          this.jq(".s-grid-body-table").css("table-layout", "fixed");
          this.jq(".s-grid-head-table").css("table-layout", "fixed");
          this.jq(".s-grid-r-scroll").css("top", 0);
        }
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.ColAdjust" });
sjs
  .loadCss(".ColAdjust")
  .using("jQuery")
  .using("Core5.DomEvent.PopManager")
  .using("Core5.DomEvent.GetHelper")
  .using("Core5.Util.Tool")
  .using("Core5.DomEvent.DragMove")
  .define(function (d, a, c, b) {
    return {
      _th: function (a, b, c, d, h) {
        d = this.$base(a, b, c, d, h);
        0 == b &&
          !a.noDropAdjustCol &&
          ((d[" s-dropOverClass"] = "s-grid-th-drag-over"),
          (d[" s-drop"] = "dragAdjustColDrop"),
          !d[" fieldIndex"] && 0 === c && (d[" colAdjustFieldIndex"] = c));
        return d;
      },
      _thInner: function (a, b, c, d) {
        b = this.$base(a, b, c, d);
        a.noDragAdjustCol ||
          ((b[" s-drag"] = this._objId),
          (b[" s-dragStart"] = "dragAdjustColStart"),
          (b[" s-dragMove"] = "dragAdjustColMove"),
          (b[" s-dragEnd"] = "dragAdjustColEnd"));
        return b;
      },
      regUIObj: !0,
      onDragAdjustColStart: function (b) {
        var c = this.getDragDiv(),
          b = b.parent();
        this._colAdjustFieldIndex = parseInt(b.attr("fieldIndex"));
        var d = b.offset();
        c.css({
          width: Math.max(40, Math.min(200, b.outerWidth() - 2)) + "px",
          left: d.left + 1 + "px",
          top: d.top + 30 + "px",
          "z-Index": a.getTopZIndex() + 1,
        })
          .html(b.text())
          .show();
      },
      getDragDiv: function () {
        d("#s-dragColAdjustDiv").length ||
          d(
            "<div id='s-dragColAdjustDiv' class='s-grid-drag-container' ></div>"
          ).appendTo("body");
        return d("#s-dragColAdjustDiv");
      },
      onDragAdjustColMove: function (a, b, c) {
        var a = this.getDragDiv(),
          b = a.position(),
          d = c[0],
          c = c[1];
        d && a.css("left", b.left + d + "px");
        c && a.css("top", b.top + c + "px");
      },
      onDragAdjustColEnd: function () {
        this.getDragDiv().hide();
      },
      onDragAdjustColDropOver: function () {},
      onDragAdjustColDrop: function (a) {
        var b =
          parseInt(a.attr("fieldIndex")) ||
          parseInt(a.attr("colAdjustFieldIndex"));
        a.removeClass("s-grid-th-drag-over");
        if (
          this._colAdjustFieldIndex &&
          !isNaN(b) &&
          this._colAdjustFieldIndex !== b &&
          this._colAdjustFieldIndex !== b + 1
        ) {
          a = this.fields[this._colAdjustFieldIndex];
          if (this.colAdjustSaveID) {
            var c =
                a.colID ||
                (this.fieldNoAsColID && a.fieldNo && "." != a.fieldNo
                  ? a.fieldNo
                  : null),
              d = this.fields[b],
              d =
                d.colID ||
                (this.fieldNoAsColID && d.fieldNo && "." != d.fieldNo
                  ? d.fieldNo
                  : null);
            c && d && this._saveColAdjustPos(c, d);
          }
          this.fields.splice(this._colAdjustFieldIndex, 1);
          this.fields.splice(b + (this._colAdjustFieldIndex < b ? 0 : 1), 0, a);
          this.innerUpdateSetFields(this.fields);
        }
      },
      _saveColAdjustPos: function (a, c) {
        var d = b.getCookie("sjs-col-adjust-" + this.colAdjustSaveID),
          d = d ? JSON.parse(d) : {};
        d[a] = c;
        b.setCookie(
          "sjs-col-adjust-" + this.colAdjustSaveID,
          JSON.stringify(d),
          3650
        );
      },
      updateSetFields: function (a, c) {
        if (this.colAdjustSaveID)
          try {
            var d = b.getCookie("sjs-col-adjust-" + this.colAdjustSaveID);
            if (d) {
              var i = JSON.parse(d),
                h;
              for (h in i) {
                var j = i[h],
                  k = this._getFieldIndexByColID(a, h),
                  l = this._getFieldIndexByColID(a, j);
                if (-1 != k && -1 != l) {
                  var n = a[k];
                  a.splice(k, 1);
                  a.splice(l + (k < l ? 0 : 1), 0, n);
                }
              }
            }
          } catch (o) {
            console.error("get col adjust error:", o);
          }
        this.$base(a, c);
      },
      _getFieldIndexByColID: function (a, b) {
        if (a)
          for (var c = 0; c < a.length; c++) {
            var d = a[c];
            if (
              (d.colID ||
                (this.fieldNoAsColID && d.fieldNo && "." != d.fieldNo
                  ? d.fieldNo
                  : null)) == b
            )
              return c;
          }
        return -1;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.FixColumns" });
sjs.using("jQuery").define(function (d) {
  return {
    _scrollBottom: function () {
      this._doScrollBottom();
    },
    _doResize: function (a, c) {
      if (0 < this._lastHideEndIndex) {
        var b = this;
        this.jq("col.s-fix-column-td").each(function () {
          var a = d(this),
            c = parseInt(a.attr("fixFieldIndex"));
          a.css(
            "width",
            ((b.htmlForm ? b.htmlForm.inner[c] : b.fields[c]).width ||
              b.defaultWidth) + "px"
          );
        });
      }
      this._lastHideEndIndex = 0;
      var f = this.$base(a, c);
      this._doScrollBottom();
      return f;
    },
    _th: function (a, c, b, d, e) {
      c = this.$base(a, c, b, d, e);
      if (
        a.fixFieldIndex ||
        (this.fixColumnsCount && b >= this.fixColumnsCount)
      )
        (c["-s-fix-column-td"] = !0),
          (c[" fixFieldIndex"] = a.fixFieldIndex || b),
          (c[" fixNotFirstRow"] = a.fixFieldIndex ? "1" : !1);
      return c;
    },
    _gridCol: function (a, c) {
      var b = this.$base(a, c);
      this.fixColumnsCount &&
        c >= this.fixColumnsCount &&
        ((b["-s-fix-column-td"] = !0), (b[" fixFieldIndex"] = c));
      return b;
    },
    _fillFormMixin: function (a) {
      this.$base(a);
      a.push({
        _td: function (a, b, d, e, g, i) {
          d = this.$base(a, b, d, e, g, i);
          if (
            a.bodyFixFieldIndex ||
            (this.parent.fixColumnsCount && b >= this.parent.fixColumnsCount)
          )
            (d["-s-fix-column-td"] = !0),
              (d[" fixFieldIndex"] = a.bodyFixFieldIndex || b),
              (d[" fixNotFirstRow"] = a.bodyFixFieldIndex ? "1" : !1);
          return d;
        },
      });
    },
    _doScrollBottom: function (a) {
      var a = a || this.jq(" > .s-grid-b-scroll").scrollLeft(),
        c = 0;
      if (0 < a)
        for (
          var b = 0,
            f = this.htmlForm ? this.htmlForm.inner : this.fields,
            e = f.length,
            g = this.fixColumnsCount;
          g < e;
          g++
        )
          if (((b += f[g].width || this.defaultWidth), g == e - 2 || b >= a)) {
            c = g + 1;
            break;
          }
      if (this._lastHideEndIndex != c) {
        var i = this;
        this.jq("col.s-fix-column-td").each(function () {
          var a = d(this),
            b = parseInt(a.attr("fixFieldIndex")),
            e = i.htmlForm ? i.htmlForm.inner[b] : i.fields[b];
          b < c
            ? (a.css("width", "1px"),
              i.hideTdNoWrapClass &&
                i
                  .jq(".s-grid-body td[fixFieldIndex=" + b + "]")
                  .addClass("s-hide-fix-td"),
              i.hideTdNoWrapStyle &&
                i
                  .jq(".s-grid-body td[fixFieldIndex=" + b + "]")
                  .css("white-space", "nowrap")
                  .css("word-break", "normal"))
            : (a.css("width", (e.width || i.defaultWidth) + "px"),
              i.hideTdNoWrapClass &&
                i
                  .jq(".s-grid-body td[fixFieldIndex=" + b + "]")
                  .removeClass("s-hide-fix-td"),
              i.hideTdNoWrapStyle &&
                i
                  .jq(".s-grid-body td[fixFieldIndex=" + b + "]")
                  .css("white-space", "normal")
                  .css("word-break", "break-all"));
        });
        window.clearTimeout(this._resizeScrollBottomWordWrapID);
        if (this.hideTdNoWrapClass || this.hideTdNoWrapStyle)
          (i = this),
            (this._resizeScrollBottomWordWrapID = window.setTimeout(
              function () {
                i && i._resize && i._resize(!0);
              },
              100
            ));
        this._lastHideEndIndex = c;
      }
      this._lastScrollLeft = a;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.DragResize" });
sjs
  .loadCss("Core5.Widget.Ability.DragResize")
  .using("jQuery")
  .using("Core5.Widget.Ability.Movable")
  .using("Core5.Widget.Ability.Resizable")
  .using("Core5.DomEvent.PopManager")
  .using("Core5.DomEvent.DragMove")
  .using("Core5.DomEvent.onmouseclass")
  .define(function (d, a, c, b) {
    function f(a, b, c, d, e) {
      var f = [];
      f.push(
        "<div class='s-dragDiv' s-drag='" +
          a +
          "' s-dragStart='dResizeStart' s-dragMove='dResize' s-dragEnd='dResizeEnd'"
      );
      "Right" == b || "Left" == b
        ? f.push(" s-dragResizeNoH='1'")
        : ("Top" == b || "Bottom" == b) && f.push(" s-dragResizeNoW='1'");
      ("Left" == b || "LT" == b || "LB" == b) &&
        f.push(" s-dragResizeReverseW='1'");
      ("Top" == b || "LT" == b || "RT" == b) &&
        f.push(" s-dragResizeReverseH='1'");
      f.push(" style='");
      f.push(";width:" + c);
      f.push(";height:" + d);
      ("Top" == b || "Left" == b || "Right" == b || "LT" == b || "RT" == b) &&
        f.push(";top:0");
      ("Bottom" == b || "RB" == b || "LB" == b) && f.push(";bottom:0");
      ("Top" == b || "Left" == b || "Bottom" == b || "LT" == b || "LB" == b) &&
        f.push(";left:0");
      ("Right" == b || "RB" == b || "RT" == b) && f.push(";right:0");
      f.push(";cursor:" + h[b] + "-resize");
      e.resizeDivZIndex && f.push(";z-index:" + e.resizeDivZIndex);
      e.resizeDisabled && f.push(";display:none");
      f.push("'></div>");
      return f.join("");
    }
    function e() {
      d("#s-resizeDiv").length ||
        d(
          "<div id='s-resizeDiv' style='display:none;position:absolute;border:1px dotted black;z-index:999;overflow:hidden;background-color:#f3f3f3;'>&nbsp;</div>"
        )
          .css("opacity", "0.5")
          .appendTo("body");
      return d("#s-resizeDiv");
    }
    function g(a, b, c, d, e) {
      if (o && b) {
        var f = a.getWidth ? a.getWidth() : a.width(),
          g = f + b * (p ? -1 : 1),
          g = l && g > l ? l : g,
          g = g < j ? j : g,
          g = 0 > g ? 0 : g,
          b = g % d,
          g = 0 < b ? g - b + (Math.round(b / d) ? d : 0) : g;
        g != f &&
          (a.setWidth ? a.setWidth(g) : a.width(g),
          p &&
            ((b = a.position().left - (g - f)),
            (b = 0 > b ? 0 : b),
            a.setLeft ? a.setLeft(b) : a.css("left", b + "px")));
      }
      m &&
        c &&
        ((d = a.getHeight ? a.getHeight() : a.height()),
        (c = d + c * (q ? -1 : 1)),
        (c = n && c > n ? n : c),
        (c = c < k ? k : c),
        (c = 0 > c ? 0 : c),
        (b = c % e),
        (c = 0 < b ? c - b + (Math.round(b / e) ? e : 0) : c),
        c != d &&
          (a.setHeight ? a.setHeight(c) : a.height(c),
          q &&
            ((e = a.position().top - (c - d)),
            (e = 0 > e ? 0 : e),
            a.setTop ? a.setTop(e) : a.css("top", e + "px"))));
    }
    function i(d, h, i) {
      var y = {
        $mixin: [a, c],
        regUIObj: !0,
        " s-overClass": "s-dragresize-over",
        " s-overself": "1",
        ";position": "absolute",
        minWidth: 20,
        maxWidth: 0,
        minHeight: 20,
        maxHeight: 0,
        init: function () {
          this.$base();
          this._initData("resizeDisabled");
        },
        innerHtml: function (a) {
          this.$base(a);
          var b = "resize" + d,
            c = this[b].width;
          "100%" != c && (c += "px");
          b = this[b].height;
          "100%" != b && (b += "px");
          a.push(f(this._objId, d, c, b, this));
        },
        onDResizeStart: function (a) {
          var c = e(),
            d = this.jq(),
            f = d.offset();
          c.css({
            width: d.outerWidth() - 2 + "px",
            height: d.outerHeight() - 2 + "px",
            left: f.left + "px",
            top: f.top + "px",
            "z-Index": b.getTopZIndex() + 1,
          }).show();
          o = "1" != a.attr("s-dragResizeNoW");
          p = "1" == a.attr("s-dragResizeReverseW");
          m = "1" != a.attr("s-dragResizeNoH");
          q = "1" == a.attr("s-dragResizeReverseH");
          l = this.maxWidth;
          j = this.minWidth;
          n = this.maxHeight;
          k = this.minHeight;
        },
        onDResize: function (a, b, c) {
          g(e(), c[0], c[1], 1, 1);
        },
        onDResizeEnd: function (a, b, c) {
          g(this, c[0], c[1], this.widthCell || 10, this.heightCell || 10);
          e().hide();
        },
        _setResizeDisabled: function (a) {
          a
            ? this.isRender() &&
              this.jq(".s-dragDiv")
                .filter("[s-drag='" + this._objId + "']")
                .hide()
            : this.isRender() &&
              this.jq(".s-dragDiv")
                .filter("[s-drag='" + this._objId + "']")
                .show();
        },
        disableDragResize: function () {
          this.set("resizeDisabled", !0);
        },
        enableDragResize: function () {
          this.set("resizeDisabled", !1);
        },
      };
      y["resize" + d] = { width: h, height: i, regUIObj: !0 };
      return y;
    }
    var h = {
        Right: "e",
        Bottom: "s",
        Left: "w",
        Top: "n",
        RB: "se",
        LB: "sw",
        RT: "ne",
        LT: "nw",
      },
      j,
      k,
      l,
      n,
      o,
      m,
      p,
      q;
    return {
      right: i("Right", 6, "100%"),
      bottom: i("Bottom", "100%", 6),
      left: i("Left", 6, "100%"),
      top: i("Top", "100%", 6),
      rb: i("RB", 15, 15),
      lb: i("LB", 15, 15),
      rt: i("RT", 15, 15),
      lt: i("LT", 15, 15),
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Window" });
sjs
  .using("Core5.Widget.Panel")
  .using("Core5.Widget.Ability.Pop")
  .using("Core5.Widget.Ability.TransformShowHide")
  .using("Core5.Widget.Ability.DragMove")
  .using("Core5.Widget.Ability.DragResize")
  .using("Core5.Layout.AutoFit")
  .using("Core5.Widget.Toolbar")
  .define(function (d, a, c, b, f, e, g) {
    return {
      $extend: d,
      $mixin: [a, b, e],
      visible: !1,
      dragDom: ".s-panel-title-text",
      noClickHide: !0,
      mask: !0,
      top: 20,
      init: function () {
        this.$base();
        this.css(";margin-left", -this.width / 2 + "px");
        this.css(";left", "50%");
      },
      show: function () {
        this.isRender() || this.renderTo("body", !0);
        this.$base();
      },
      _initInner: function (a) {
        if (this.toolbarItems) {
          var b = this.toolbarPos || "top";
          a.push({
            $extend: g,
            inner: this.toolbarItems,
            ";border-width": "top" == b ? "0 0 1px 0" : "1px 0 0 0",
          });
          "top" == b
            ? (a[0].top = 56)
            : ((a[0].top = 24), (a[0].bottom = 32), (a[1].bottom = 0));
          a[1].height = 32;
        } else a[0].top = 24;
        this.$base(a);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Msg.Confirm" });
sjs
  .using("Core5.Widget.Window")
  .using("Core5.Component")
  .define(function (d, a) {
    return {
      $extend: d,
      title: "\u60a8\u78ba\u5b9a(Are you sure)...",
      icon: "question-sign",
      inner: {
        $extend: a,
        ";text-align": "center",
        ";padding": "20px 5px",
        ";color": "#444444",
        inner: "some text here...",
      },
      width: 320,
      height: 150,
      toolbarPos: "bottom",
      toolbarItems: [
        {
          text: "\u78ba\u5b9a(Yes)",
          icon: "ok",
          floatRight: !0,
          ";font-weight": "bold",
          evt: "confirm",
        },
        "-|",
        {
          text: "\u53d6\u6d88(No)",
          icon: "remove",
          floatRight: !0,
          ";color": "gray",
          evt: "close",
        },
      ],
      showMsg: function (a) {
        this.isRender()
          ? this.inner[0].jq().html(a)
          : (this.inner[0].inner = a);
        this.show();
      },
      onConfirm: function () {
        this.hide();
        this.context &&
          this.contextFn &&
          this.contextFn.apply(this.context, this.contextArgs || []);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Msg.Tool" });
sjs
  .using("Core5.Cls")
  .using("Core5.Widget.Msg.Confirm")
  .define(function (d, a) {
    var c;
    return {
      confirm: function (b, f, e, g) {
        c || (c = d.create(a));
        c.context = f;
        c.contextFn = e;
        c.contextArgs = g;
        c.showMsg(b);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Layout.Table" });
sjs.using("Core5.Html.TableLayout").define(function (d) {
  return {
    $extend: d,
    columnCount: 2,
    _itemsHtml: function (a) {
      this._layoutRows = this._getLayoutRows(this.inner, this.columnCount);
      var c = this._table(this._layoutRows, this.columnCount);
      this._itemHtml(a, c);
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Layout.Form" });
sjs
  .loadCss("Core5.Layout.Form")
  .using("Core5.Layout.Table")
  .define(function (d) {
    return {
      $extend: d,
      "-s-form": !0,
      promptPos: "left",
      _tr: function (a, c, b, d) {
        var e = "top" == this.promptPos ? this._thsTr(a, c, b, d) : null,
          a = this.$base(a, c, b, d);
        return [e, a];
      },
      _td: function (a, c, b, d, e, g, i) {
        b = a.item;
        if ("top" == this.promptPos && !i && !b.prompt) return null;
        i = "left" == this.promptPos ? this._th(a, c, e[d], e, d) : null;
        "left" == this.promptPos
          ? b.prompt
            ? 1 < a.colspan &&
              (a.colspan = 2 * a.colspan - (b.promptColspan || 1))
            : (a.colspan = 2 * (a.colspan || 1) - (b.promptColspan || 0))
          : "top" == this.promptPos &&
            (b.prompt
              ? 1 < a.rowspan && (a.rowspan = 2 * a.rowspan - 1)
              : (a.rowspan = (a.rowspan || 1) + 1));
        a = this.$base(a, c, d, e, g);
        a["-s-form-td"] = !0;
        return [i, a];
      },
      _tdTag: function (a) {
        return this.noTdTag || a.noTdTag
          ? {
              inner: a,
              attribute:
                (this.tdAttr || "") +
                (this.tdAttr && a.tdAttr ? " " : "") +
                (a.tdAttr || ""),
              " class":
                (this.tdClass || "") +
                (this.tdClass && a.tdClass ? " " : "") +
                (a.tdClass || ""),
              " style":
                (this.tdStyle || "") +
                (this.tdStyle && a.tdStyle ? ";" : "") +
                (a.tdStyle || ""),
            }
          : a;
      },
      _thsTr: function (a, c, b, d) {
        return { tag: "tr", inner: this._ths(a, c, b, d) };
      },
      _ths: function (a, c, b, d) {
        for (var e = [], g = 0; g < a.length; g++)
          e.push(this._th(a[g], g, a, c, b, d));
        return e;
      },
      _th: function (a, c, b, d, e, g) {
        var i = a.item;
        return i.prompt
          ? {
              tag: "th",
              "-s-form-th": !0,
              attribute:
                (this.thAttr || "") +
                (this.thAttr && i.thAttr ? " " : "") +
                (i.thAttr || ""),
              " class":
                (this.thClass || "") +
                (this.thClass && i.thClass ? " " : "") +
                (i.thClass || ""),
              " style":
                (this.thStyle || "") +
                (this.thStyle && i.thStyle ? ";" : "") +
                (i.thStyle || ""),
              inner:
                "string" == typeof i.prompt
                  ? (i.required
                      ? "<b title='required' style='color:red'>&nbsp;&nbsp;*&nbsp;</b>"
                      : i.requiredCondition
                      ? "<b title='" +
                        i.requiredCondition.replace(/\'/g, "") +
                        "' style='color:blue'>&nbsp;&nbsp;*&nbsp;</b>"
                      : "") +
                    i.prompt +
                    (i.noColon ? "" : ":")
                  : i.prompt,
              " colspan":
                "top" == this.promptPos
                  ? 1 < a.colspan
                    ? a.colspan
                    : null
                  : i.promptColspan || null,
              " rowspan":
                "left" == this.promptPos
                  ? 1 < a.rowspan
                    ? a.rowspan
                    : null
                  : i.promptRowspan || null,
            }
          : "top" == this.promptPos
          ? this._td(a, c, b, d, e, g, !0)
          : null;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Layout.Form2" });
sjs
  .loadCss("Core5.Layout.Form2")
  .using("Core5.Layout.Form")
  .define(function (d) {
    return { $extend: d, "-s-form2": !0, cellSpacing: 4 };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.GenRowKey" });
sjs.define(function () {
  function d(a, c, b) {
    for (var a = a.split(","), d = [], e = 0; e < a.length; e++) {
      var g = b ? b[a[e]] : "";
      "string" != typeof g && "number" != typeof g && (g = "");
      (g += "") && d.push(g);
    }
    return d.join(c);
  }
  return function (a) {
    var c = a + "KeyFields",
      b = a + "KeyJoin",
      f = "s-" + a + "-key",
      e = {
        _fillFormMixin: function (a) {
          this.$base(a);
          if (!this[c])
            throw Error(
              "\u8acb\u8a2d\u5b9a" +
                c +
                "\u7684\u6b04\u4f4d\u540d(\u591a\u500b\u6642\u9017\u865f\u5206\u9694)!"
            );
          this[b] = this[b] || ",";
          var e = this;
          a.push({
            _setItem: function (a) {
              this.$base(a);
              a = d(e[c], e[b], a);
              this.attr(f, a);
            },
          });
        },
      };
    e[a + "Jq"] = function (a, b) {
      return this.jq("[" + f + "='" + a + "']" + (b ? " " + b : ""));
    };
    a = a.substr(0, 1).toUpperCase() + a.substr(1);
    e["get" + a + "Key"] = function (a) {
      return d(this[c], this[b], a);
    };
    e["get" + a + "ByKey"] = function (a) {
      a: {
        var e = this[c],
          f = this[b],
          j = this.items;
        if (j && (a || 0 === a))
          for (var k = 0; k < j.length; k++)
            if (d(e, f, j[k]) == a) {
              a = j[k];
              break a;
            }
        a = null;
      }
      return a;
    };
    return e;
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.RowKey" });
sjs.using("Core5.Widget.Table.GenRowKey").define(function (d) {
  return d("row");
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.RowEvent" });
sjs.using("Core5.Widget.Table.RowKey").define(function (d) {
  return {
    $extend: d,
    regUIObj: !0,
    onRowEvt: function (a, c, b) {
      var d = a.jq ? a.rowEvt : a.attr("s-rowEvt");
      if (d) {
        var e = a.jq ? c : a,
          g = e.parents("tr[s-row-key]")[0].getAttribute("s-row-key"),
          i = this.getRowByKey(g),
          c = a.jq ? b : c;
        this.response(a, d, i, g, e, c);
        c.stopPropagation();
      }
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.Action" });
sjs
  .using("Core5.Widget.Table.RowEvent")
  .using("Core5.Component")
  .using("Core5.Widget.Button")
  .using("Core5.Widget.Window")
  .using("Core5.Widget.Form")
  .using("Core5.Layout.Form2")
  .using("Core5.Widget.Msg.Tool")
  .using("Core5.Util.Service")
  .define(function (d, a, c, b, f, e, g, i) {
    return {
      $extend: d,
      setFields: function (b, d) {
        for (var e = [], f = this.actions, g = 0; g < f.length; g++) {
          var i = f[g];
          i.$extend = i.$extend || c;
          i.evt = i.evt || "rowEvt";
          "rowEvt" == i.evt && (i.rowEvt = i.rowEvt || "action");
          i.initDomId = function () {};
          e.push(i);
        }
        f = this.actionWidth || 150;
        e.push({
          $extend: a,
          inner: "doing",
          ";line-height": "30px",
          ";float": "left",
          ";padding": "0 5px",
          "-info-cmp": !0,
          ";width": f + "px",
          ";overflow": "hidden",
          visible: !1,
        });
        var m = this;
        this.$base(
          [
            {
              prompt: "Action",
              type: "con",
              width: f,
              "-action-td": !0,
              inner: e,
              noResize: !0,
              "@row": "item",
              _setRow: function (a) {
                m._actionContainer = this;
                var b = m.getActionStatus(m.getRowKey(a)),
                  c = b && ("doing" == b.status || "ok" == b.status),
                  d = this.inner[this.inner.length - 1];
                d.setVisible(c);
                c && (d.inner = m._statusHtml(b.btn, b.status));
                for (b = 0; b < this.inner.length - 1; b++) {
                  var d = this.inner[b],
                    e = !0;
                  d.isShow && (e = d.isShow(a));
                  d.setClass("action-btn", e);
                  d.setVisible(e && !c);
                }
              },
            },
          ].concat(b),
          d
        );
      },
      onCloseRowErr: function (a, b, c) {
        this._setActionStatus(c, a, "init");
      },
      onAction: function (a, b, c) {
        this.doAction(a, b, c);
      },
      doAction: function (a, c, d) {
        "number" == typeof a && (a = this._actionContainer.inner[a]);
        if (!c && d.push)
          for (var c = [], i = 0; i < d.length; i++)
            c.push(this.getRowByKey(d[i]));
        a.inputInner
          ? (a.inputForm ||
              a.createChild(b, {
                id: "inputForm",
                inner: {
                  $extend: f,
                  $mixin: [e, a.formMixin],
                  id: "form",
                  promptPos: a.promptPos || "top",
                  columnCount: a.columnCount || 1,
                  inner: a.inputInner,
                  item: a.inputDefault || {},
                },
                icon: "question-sign",
                toolbarPos: "bottom",
                toolbarItems: [
                  {
                    text: "\u78ba\u5b9a(Yes)",
                    icon: "ok",
                    floatRight: !0,
                    ";font-weight": "bold",
                    evt: "confirm",
                  },
                  "-|",
                  {
                    text: "\u53d6\u6d88(No)",
                    icon: "remove",
                    floatRight: !0,
                    ";color": "gray",
                    evt: "close",
                  },
                ],
                width: a.inputWidth || 400,
                height: a.inputHeight || 250,
                context: this,
                contextFn: this.doRowAction,
                onConfirm: function () {
                  var a = this.contextArgs || [];
                  a.push(this.form.item);
                  for (
                    var b = this.form.item, c = 0;
                    c < this.form.inner.length;
                    c++
                  ) {
                    var d = this.form.inner[c];
                    if (
                      d.fieldNo &&
                      d.required &&
                      ("undefined" == typeof b[d.fieldNo] ||
                        null === b[d.fieldNo] ||
                        "" == b[d.fieldNo])
                    ) {
                      alert(
                        (d.fieldNm || d.prompt || d.fieldNo) +
                          " can not be empty!"
                      );
                      return;
                    }
                  }
                  this.hide();
                  this.contextFn.apply(this.context, a);
                },
              }),
            a.inputForm.setTitle(
              (a.inputTitle ||
                "<b style='color:" +
                  (a.promptColor || "black") +
                  "'>" +
                  (a.prompt || a.text || "deal")) +
                "</b> " +
                ((!c.push || 1 == c.length) && a.promptField
                  ? (c.push ? c[0] : c)[a.promptField]
                  : c.push
                  ? "((\u6279\u6b21" +
                    c.length +
                    "\u7b46," +
                    c.length +
                    " together)"
                  : "this") +
                "?"
            ),
            (a.inputForm.contextArgs = [a, c, d]),
            a.inputForm.form.set("row", c.push ? c[0] : c),
            a.inputForm.show())
          : a.needConfirm
          ? g.confirm(
              "Are you sure to <b style='color:" +
                (a.promptColor || "black") +
                "'>" +
                (a.prompt || a.text || "commit") +
                "</b> " +
                ((!c.push || 1 == c.length) && c[a.promptField]
                  ? (c.push ? c[0] : c)[a.promptField]
                  : c.push
                  ? "(\u6279\u6b21" +
                    c.length +
                    "\u7b46," +
                    c.length +
                    " together)"
                  : "this") +
                "?",
              this,
              function () {
                this.doRowAction(a, c, d);
              }
            )
          : this.doRowAction(a, c, d);
      },
      _statusHtml: function (a, b) {
        if ("doing" == b) {
          var c = a.prompt || a.text || "deal";
          return "<font color='black'>" + c + "...</font>";
        }
        return "ok" == b
          ? ((c = a.prompt || a.text || "deal"),
            "<font title='data is changed,you can refresh to get newest data' color='green'>" +
              c +
              " successfully!</font>")
          : '<b s-click="rowEvt" s-rowEvt ="closeRowErr" style="text-decoration:underline;cursor:pointer;color:blue">close</b><font title="' +
              b.replace(/"/g, "&quot;") +
              '" color="red">' +
              b +
              "</font>";
      },
      Xset: function () {},
      _setActionStatus: function (a, b, c) {
        var d = this._actionStatus;
        d || (d = this._actionStatus = {});
        var e = this.rowJq(a);
        if ("init" == c)
          delete d[a], e.find(".action-btn").show(), e.find(".info-cmp").hide();
        else {
          d[a] = { btn: b, status: c };
          var f = this._statusHtml(b, c);
          e.find(".action-btn").hide();
          e.find(".info-cmp").html(f).show();
        }
        this.actionStatusEvt && this.report(this.actionStatusEvt, b, c, a, f);
      },
      getActionStatus: function (a) {
        var b = this._actionStatus;
        return b ? b[a] : null;
      },
      hasDoingAction: function () {
        if (this._actionStatus)
          for (var a in this._actionStatus)
            if ("doing" == this._actionStatus[a].status) return !0;
        return !1;
      },
      clearActionStatus: function () {
        this._actionStatus && delete this._actionStatus;
      },
      doRowAction: function (a, b, c, d) {
        if (a.service && a.command)
          if (b.push)
            for (
              var b = [].concat(b), c = [].concat(c), e = 0;
              e < b.length;
              e++
            )
              this._doRowAction(a, b[e], c[e], d);
          else this._doRowAction(a, b, c, d);
      },
      _doRowAction: function (a, b, c, d) {
        var e = this.getActionStatus(c);
        if (!e || ("doing" != e.status && "ok" != e.status))
          this._setActionStatus(c, a, "doing"),
            "string" == typeof a.service
              ? i.callService(
                  a.service,
                  a.command,
                  a.params ? a.params(b, c, d, this) : [],
                  this,
                  this._actionOK,
                  this._actionErr,
                  [c, a, b]
                )
              : ((e = a.service[a.command]),
                (d = a.params ? a.params(b, c, d, this) : []),
                e.call(a.service, d, this, this._actionOK, this._actionErr, [
                  c,
                  a,
                  b,
                ]));
      },
      _actionOK: function (a, b) {
        this._setActionStatus(b[0], b[1], "ok");
      },
      _actionErr: function (a, b) {
        this._setActionStatus(b[0], b[1], a.Message);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.CheckSelect" });
sjs.using("Core5.Widget.Table.RowKey").define(function (d) {
  return {
    $extend: d,
    regUIObj: !0,
    init: function () {
      this.$base();
      this._initData("checked", []);
    },
    _getCheckKey: function (a) {
      for (
        var c = this.checkFields.split(","), b = "", d = 0;
        d < c.length;
        d++
      )
        b += (0 < b.length ? this.checkedKeyJoin : "") + a[c[d]];
      return b;
    },
    _isCheck: function (a) {
      var c = this.checked;
      if (c)
        for (var a = this.getRowKey(a), b = 0; b < c.length; b++)
          if (a == c[b]) return !0;
      return !1;
    },
    setFields: function (a, c) {
      this.$base(
        this.noShowCheckbox
          ? [].concat(a)
          : [
              {
                prompt: "<input type='checkbox' s-click='checkAll'>",
                ";text-align": "center",
                " s-click": "checkTd",
                noResize: !0,
                type: "cmp",
                inner: function () {
                  var a = this.parent,
                    c = a.parent,
                    d = c._isCheckedDisable(a.item),
                    a = d ? !1 : c._isCheck(a.item);
                  return (
                    "<input" +
                    (d ? " disabled='disabled'" : "") +
                    " class='s-tbl-checkbox' " +
                    (a ? "checked='checked'" : "") +
                    " type='checkbox'>"
                  );
                },
                width: 27,
              },
            ].concat(a),
        c
      );
    },
    _setChecked: function (a) {
      if (this.isRender()) {
        !this.noShowCheckbox && this.jq(".s-tbl-checkbox").prop("checked", !1);
        this.checkTrClass &&
          this.jq(".tr_" + this._objId).removeClass(this.checkTrClass);
        for (var c = 0; c < a.length; c++)
          !this.noShowCheckbox &&
            this.rowJq(a[c], ".s-tbl-checkbox").prop("checked", !0),
            this.checkTrClass && this.rowJq(a[c]).addClass(this.checkTrClass);
      }
    },
    _addChecked: function (a, c, b) {
      this.isRender() &&
        (!this.noShowCheckbox &&
          this.rowJq(b, ".s-tbl-checkbox").prop("checked", !0),
        this.checkTrClass && this.rowJq(b).addClass(this.checkTrClass));
    },
    _removeChecked: function (a, c, b) {
      this.isRender() &&
        (!this.noShowCheckbox &&
          this.rowJq(b, ".s-tbl-checkbox").prop("checked", !1),
        this.checkTrClass && this.rowJq(b).removeClass(this.checkTrClass));
    },
    onCheckAll: function (a) {
      if (this.items)
        for (var a = a.prop("checked"), c = 0; c < this.items.length; c++) {
          var b = this.getRowKey(this.items[c]);
          this._isCheckedDisable(this.items[c]) ||
            (a ? this.addCheck(b, !0) : this.removeCheck(b, !0));
        }
    },
    onCheckTd: function (a, c, b) {
      var d = a.jq ? c : a,
        a = a.jq ? b : c,
        c = d.find("input");
      c.prop("disabled") ||
        ((c =
          "TD" == (a.srcElement || a.target).tagName.toUpperCase()
            ? !c.prop("checked")
            : c.prop("checked")),
        (d = d.parents("tr[s-row-key]")[0].getAttribute("s-row-key")),
        c ? this.addCheck(d, !0) : this.removeCheck(d, !0));
      a.stopPropagation();
    },
    setCheck: function (a) {
      this.set("checked", a || []);
    },
    _getCheckedIndex: function (a) {
      if (this.checked)
        for (var c = 0; c < this.checked.length; c++)
          if (this.checked[c] == a) return c;
      return -1;
    },
    addCheck: function (a, c) {
      -1 == this._getCheckedIndex(a) &&
        (this.add("checked", a),
        c &&
          this.checkEvt &&
          this.report(this.checkEvt, this.checked, !0, a, this.getRowByKey(a)));
    },
    removeCheck: function (a, c) {
      var b = this._getCheckedIndex(a);
      0 <= b &&
        (this.removeAt("checked", b),
        c &&
          this.checkEvt &&
          this.report(this.checkEvt, this.checked, !1, a, this.getRowByKey(a)));
    },
    _isCheckedDisable: function (a) {
      a = this.getRowKey(a);
      return this._disabledChecked && this._disabledChecked[a];
    },
    disableChecked: function (a) {
      this._disabledChecked || (this._disabledChecked = {});
      this._disabledChecked[a] = 1;
      !this.noShowCheckbox &&
        this.rowJq(a, ".s-tbl-checkbox").prop("disabled", !0);
    },
    enableChecked: function (a) {
      this._disabledChecked && delete this._disabledChecked[a];
      !this.noShowCheckbox &&
        this.rowJq(a, ".s-tbl-checkbox").prop("disabled", !1);
    },
    clearCheckDisable: function () {
      if (this._disabledChecked) {
        for (var a = 0; a < this._disabledChecked.length; a++)
          this.enableChecked(this._disabledChecked[a]);
        delete this._disabledChecked;
      }
    },
    _fillFormMixin: function (a) {
      this.$base(a);
      var c = this,
        b = {
          " s-click": this.clickRowCheck ? "clickRowCheck" : null,
          _setItem: function (a) {
            this.$base(a);
            c.checkTrClass &&
              this.setClass(
                c.checkTrClass,
                0 <= c._getCheckedIndex(c.getRowKey(a))
              );
          },
        };
      b["-tr_" + this._objId] = !0;
      a.push(b);
    },
    onClickRowCheck: function (a, c) {
      var b = a.jq ? c : a,
        b = a.jq
          ? b.parents("tr[s-row-key]")[0].getAttribute("s-row-key")
          : b.attr("s-row-key");
      if (!this._disabledChecked || !this._disabledChecked[b])
        0 <= this._getCheckedIndex(b)
          ? this.removeCheck(b, !0)
          : this.addCheck(b, !0);
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.Select" });
sjs.using("Core5.Widget.Table.RowKey").define(function (d) {
  return {
    $extend: d,
    regUIObj: !0,
    "-s-grid-select": !0,
    init: function () {
      this.$base();
      this._initData("selected");
    },
    selectTrClass: "s-grid-tr-selected",
    _fillFormMixin: function (a) {
      this.$base(a);
      var c = this;
      a.push({
        " s-click": this.clickNoSelect ? null : "select",
        _setItem: function (a) {
          this.$base(a);
          a = c.getRowKey(a);
          this.setClass(c.selectTrClass, c.selected == a && a);
        },
      });
    },
    _setSelected: function (a, c, b) {
      this.isRender() &&
        c &&
        (b && this.rowJq(b).removeClass(this.selectTrClass),
        a && this.rowJq(a).addClass(this.selectTrClass));
    },
    onSelect: function (a, c) {
      var b = a.jq ? c : a,
        b =
          a.jq && a != this.htmlForm
            ? b.parents("tr[s-row-key]")[0].getAttribute("s-row-key")
            : b.attr("s-row-key");
      if ((!this.noRepeatSelect || b != this.selected) && b)
        this.setSelected(b),
          this.selectEvt && this.report(this.selectEvt, b, this.getRowByKey(b));
    },
    setSelected: function (a) {
      this.set("selected", a);
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.RowIndex" });
sjs.define(function () {
  return {
    setFields: function (d, a) {
      this.$base(
        [
          {
            prompt: "&nbsp;",
            thClass: "s-grid-th-seq",
            "-s-grid-td-seq": !0,
            noResize: !0,
            type: "cmp",
            inner: function () {
              var a = this.parent,
                b = a.parent;
              if (a.item._NEW)
                return "<b style='color:blue' title='new item(\u65b0\u9805\u6b21)'>+</b>";
              a = a.rowIndex;
              return b && b.parent && b.parent.pageSize
                ? ((b = b.parent), b.pageSize * (b.page - 1) + a + 1)
                : a + 1;
            },
            width: 38,
            paddingLeft: 2,
            paddingRight: 2,
            gridIndexField: !0,
            minWidth: 30,
            maxWidth: 45,
            colID: "SJS_INDEX",
          },
        ].concat(d || []),
        a
      );
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.ColResizer" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.PopManager")
  .using("Core5.Util.Tool")
  .using("Core5.DomEvent.DragMove")
  .define(function (d, a, c) {
    return {
      _gridCol: function (a, c) {
        var d = this.$base(a, c);
        d[" resizeFieldIndex"] = c;
        return d;
      },
      _th: function (a, c, d, g, i) {
        if (
          (g = this.$base(a, c, d, g, i)) &&
          2 > (a.colspan || 1) &&
          0 == c &&
          !a.noResize
        )
          (a = g.inner),
            (c = { "-s-grid-resizer": !0 }),
            (c[" s-drag"] = this._objId),
            (c[" s-dragStart"] = "resizeStart"),
            (c[" s-dragMove"] = "resizeMove"),
            (c[" s-dragEnd"] = "resizeEnd"),
            (g[" fieldIndex"] = d),
            (a.inner = [a.inner, c]);
        return g;
      },
      _fillFormMixin: function (a) {
        this.$base(a);
        a.push({
          _td: function (a, b, c, d, h, j) {
            (c = this.$base(a, b, c, d, h, j)) &&
              !a.noResize &&
              0 == d &&
              (c[" fieldIndex"] = b);
            return c;
          },
        });
      },
      onResizeStart: function (b) {
        var c = b.parent().parent(),
          b = c.offset();
        this._resizeFieldIndex = parseInt(c.attr("fieldIndex"));
        var c = this.htmlForm
            ? this.htmlForm.inner[this._resizeFieldIndex]
            : this.fields[this._resizeFieldIndex],
          e =
            (c.width || this.defaultWidth) +
            (c.paddingLeft || 0) +
            (c.paddingRight || 0);
        if (!d(".s-grid-resize-div").length) {
          var g = [];
          g.push(
            "<div class='s-grid-resize-div' style='border-width:0 1px;border-style:solid;border-color:gray;position:absolute;'></div>"
          );
          d("body").append(g.join(""));
        }
        d(".s-grid-resize-div")
          .css("left", b.left + "px")
          .css("top", this.jq().offset().top + "px")
          .css("z-index", a.getTopZIndex() + 1)
          .height(this.jq().height())
          .width(e)
          .show();
        this._resizeStartWidth = e;
        this._resizeMinWidth = c.minWidth || 20;
        this._resizeField = c;
      },
      onResizeMove: function (a, c, e) {
        a = d(".s-grid-resize-div").width() + e[0];
        c = this._resizeMinWidth;
        d(".s-grid-resize-div").width(a < c ? c : a);
      },
      onResizeEnd: function (a, c, e) {
        d(".s-grid-resize-div").hide();
        a = e[0] + this._resizeStartWidth;
        c = this._resizeMinWidth;
        e = this._resizeField;
        a = a < c ? c : a;
        this.jq("[resizeFieldIndex='" + this._resizeFieldIndex + "']").width(a);
        e.width = a - (e.paddingLeft || 0) - (e.paddingRight || 0);
        e != this.fields[this._resizeFieldIndex] &&
          (this.fields[this._resizeFieldIndex].width =
            a - (e.paddingLeft || 0) - (e.paddingRight || 0));
        this._resize(!0);
        if (
          (this.colResizerSaveID && e.colID) ||
          (this.fieldNoAsColID && e.fieldNo && "." != e.fieldNo)
        )
          this._saveColResizeWidth(e.colID || e.fieldNo, e.width);
      },
      _saveColResizeWidth: function (a, d) {
        var e = c.getCookie("sjs-col-resizer-" + this.colResizerSaveID),
          e = e ? JSON.parse(e) : {};
        e[a] = d;
        c.setCookie(
          "sjs-col-resizer-" + this.colResizerSaveID,
          JSON.stringify(e),
          3650
        );
      },
      setFields: function (a, d) {
        if (this.colResizerSaveID)
          try {
            var e = c.getCookie("sjs-col-resizer-" + this.colResizerSaveID);
            if (e)
              for (var g = JSON.parse(e), e = 0; e < a.length; e++) {
                var i =
                  a[e].colID ||
                  (this.fieldNoAsColID && a[e].fieldNo && "." != a[e].fieldNo
                    ? a[e].fieldNo
                    : null);
                i && g[i] && (a[e].width = g[i]);
              }
          } catch (h) {
            console.error("get col resizer error:", h);
          }
        this.$base(a, d);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.Sort" });
sjs.loadCss("Core5.Shp.icon").define(function () {
  return {
    regUIObj: !0,
    sortField: "",
    sortSeq: "desc",
    defaultSeq: "desc",
    _th: function (d, a, c, b, f) {
      if (
        (a = this.$base(d, a, c, b, f)) &&
        (d.sortField || (!d.noSort && d.fieldNo && "." != d.fieldNo))
      )
        a[" s-overclass"] = "s-grid-th-over";
      return a;
    },
    _thInner: function (d, a, c, b) {
      a = this.$base(d, a, c, b);
      if (d.sortField || (!d.noSort && d.fieldNo && "." != d.fieldNo))
        if ((d = d.sortField || d.fieldNo))
          (a["-s-grid-field-sort"] = !0),
            (a[" s-click"] = "sort"),
            (a[" sort-field"] = d),
            (a.inner = [
              a.inner,
              "<font " +
                (this.sortField == d ? "" : "style='display:none'") +
                " class='icon icon-blue" +
                (d == this.sortField
                  ? " " +
                    ("desc" == this.sortSeq
                      ? "icon-arrow-down"
                      : "icon-arrow-up")
                  : "") +
                "'>&nbsp;&nbsp;&nbsp;&nbsp;</font>",
            ]);
      return a;
    },
    onSort: function (d) {
      if (!this.sortDisabled) {
        var d = d.attr("sort-field"),
          a = this.defaultSeq;
        this.sortField == d && (a = "asc" == this.sortSeq ? "desc" : "asc");
        this.setSort(d, a);
        this.sortEvt && this.report(this.sortEvt, d, this.sortSeq);
      }
    },
    setSort: function (d, a) {
      if (this.sortField != d || this.sortSeq != a)
        this.set("sortSeq", a),
          this.set("sortField", d),
          this.jq(".s-grid-field-sort .icon").hide(),
          this.jq("[sort-field='" + d + "'] .icon")
            .removeClass(
              "asc" == this.sortSeq ? "icon-arrow-down" : "icon-arrow-up"
            )
            .addClass(
              "asc" == this.sortSeq ? "icon-arrow-up" : "icon-arrow-down"
            )
            .show();
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.oncontextmenu" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.GetHelper")
  .using("Core5.DomEvent.PopManager")
  .define(function (d, a) {
    d(document).delegate("[s-rightclick]", "contextmenu", function (c) {
      var b = d(this),
        f = a.getSjsObj(b);
      f && f._onDomEvent && f._onDomEvent("rightclick", b, c);
      f && c.preventDefault();
    });
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table" });
sjs
  .loadCss("Core5.Widget.Table")
  .using("Core5.Component")
  .using("Core5.Html.Grid")
  .using("Core5.Html.GridMixin")
  .using("Core5.Widget.Form")
  .using("Core5.Util.EventManager")
  .using("Core5.DomEvent.onmouseclass")
  .using("Core5.DomEvent.oncontextmenu")
  .define(function (d, a, c, b) {
    return {
      $extend: d,
      "-s-table": !0,
      $mixin: [a, c],
      init: function () {
        this.$base();
        this.setFields(this.fields, !0);
        this._initData("items", []);
      },
      _fillFormMixin: function () {},
      noTdTag: !1,
      _initHtmlForm: function () {
        var a = [];
        this._fillFormMixin(a);
        this.createChild(
          b,
          {
            id: "htmlForm",
            tag: "tr",
            defaultItemType: "label",
            "-s-grid-body-tr": !0,
            getHtml: function () {
              this.setClass(
                "s-grid-body-tr-odd",
                !this.parent.noTrOdd && 1 == this.rowIndex % 2
              );
              !this.parent.noTrOver &&
                this.attr("s-overClass", "s-grid-tr-over");
              return this.$base();
            },
            _itemsHtml: function (a) {
              var b = this._tds(
                this.item,
                this.rowIndex,
                this.inner,
                this.parent.rows
              );
              this._itemHtml(a, b);
            },
            defaultWidth: this.defaultWidth,
            cellsWidth: this.cellsWidth,
            attribute: this.trAttr,
            " class": this.trClass,
            " style": this.trStyle,
            _tds: this._tds,
            _tdBlank: this._tdBlank,
            noAddBlankTd: this.noAddBlankTd,
            _td: this._td,
            _tdInner: this._tdInner,
            noTdTag: this.noTdTag,
            inner: this.fields,
            _initInnerItem: function (a, b) {
              var c = a.initDomId;
              a.initDomId = function () {};
              if (
                a.mouseoverShowTitle ||
                ("left" == a.align && 120 < a.width && !a.noShowTdTitle)
              )
                (a.$mixin = a.$mixin || []),
                  a.$mixin.push({
                    _setText: function (a, b) {
                      this.$base(a, b);
                      this.attr("title", a);
                    },
                  });
              var d = this.$base(a, b);
              c ? (a.initDomId = c) : delete a.initDomId;
              if (
                a.mouseoverShowTitle ||
                ("left" == a.align && 120 < a.width && !a.noShowTdTitle)
              )
                (a.$mixin = a.$mixin || []), a.$mixin.pop();
              return d;
            },
          },
          this.formMixin,
          a,
          {}
        );
      },
      inner: function () {
        return this._grid(this.htmlForm.inner, this.items);
      },
      _tbody: function (a, b) {
        var c = [];
        if (b) {
          for (var d = 0; d < b.length; d++)
            (this.htmlForm.rowIndex = d),
              this.htmlForm.setItem(b[d]),
              c.push(this.htmlForm.getHtml());
          this.htmlForm.setItem({});
        }
        return [{ tag: "tbody", inner: c }];
      },
      setItems: function (a) {
        this.set("items", a);
        return this;
      },
      _setItems: function () {
        this._updateInner();
      },
      _updateInner: function () {
        if (this.isRender()) {
          this._disposeScroll();
          var a = [];
          this.innerHtml(a);
          this.jq().html(a.join(""));
          this._initScroll();
        }
      },
      innerUpdateSetFields: function (a, b) {
        this.fields = a;
        this.htmlForm && this.htmlForm.dispose();
        this._initHtmlForm();
        b || this._updateInner();
      },
      updateSetFields: function (a, b) {
        this.innerUpdateSetFields(a, b);
      },
      setFields: function (a, b) {
        this.updateSetFields(a, b);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.App.DataList" });
sjs
  .using("Core5.Layout.AutoFit")
  .using("Core5.Container")
  .using("Core5.Widget.Form")
  .using("Core5.Layout.Form")
  .using("Core5.Layout.Layout")
  .using("Core5.Widget.Button")
  .using("Core5.Widget.Table")
  .using("Core5.Widget.Table.RowKey")
  .using("Core5.Widget.Table.Sort")
  .using("Core5.Widget.Table.ColResizer")
  .using("Core5.Widget.Table.RowIndex")
  .using("Core5.Widget.Table.Select")
  .using("Core5.Widget.Table.CheckSelect")
  .using("Core5.Widget.Table.RowEvent")
  .using("Core5.Widget.Table.Action")
  .using("Core5.Widget.Table.FixColumns")
  .using("Core5.Widget.Table.ColAdjust")
  .using("Core5.App.Pagebar")
  .using("Core5.App.DataWindow")
  .using("Core5.Bind.BindSource")
  .using("Core5.Bind.BindTarget")
  .using("Core5.Html.TableLayout")
  .using("Core5.Util.DateFn")
  .define(function (
    d,
    a,
    c,
    b,
    f,
    e,
    g,
    i,
    h,
    j,
    k,
    l,
    n,
    o,
    m,
    p,
    q,
    s,
    t,
    r,
    y,
    w,
    u
  ) {
    return {
      $extend: a,
      $mixin: [d, r, y, t],
      regUIObj: !0,
      "-s-datalist": !0,
      queryVisible: !0,
      pageVisible: !0,
      inner: function () {
        return [
          this.queryFields ? this._queryForm() : null,
          this.fields ? this._grid() : null,
          this.pageVisible ? this._pageBar() : null,
        ];
      },
      queryCellsWidth: null,
      queryColumnCount: 4,
      queryTdPos: -1,
      _queryForm: function () {
        var a = (this.queryFields = [].concat(this.queryFields));
        if (!this.hideQueryTd) {
          var d = this._queryTd();
          -1 == this.queryTdPos ? a.push(d) : a.splice(this.queryTdPos, 0, d);
        }
        a = w._getColumnCount(this.queryFields, this.queryColumnCount);
        this._queryFormHeight =
          31 * w._getLayoutRows(this.queryFields, a).length + 1;
        return {
          $extend: c,
          $mixin: [b, y, this.queryFormMixin],
          cellsWidth: this.queryCellsWidth,
          "@item": this.queryAsFilter ? "filter" : "condition",
          "@error": "conError",
          columnCount: this.queryColumnCount,
          inner: this.queryFields,
          height: this.queryFormHeight || this._queryFormHeight,
          "-s-query-form": !0,
          visible: this.queryVisible,
          id: "queryForm",
          "@queryStatus": "queryStatus",
          " s-keyup": "queryFormKeyUp",
        };
      },
      onQueryFormKeyUp: function (a, b) {
        if (13 == b.keyCode) this.onQuery();
      },
      _queryBtn: function () {
        return {
          $extend: e,
          icon: "search",
          evt: "query",
          text: "<i zh='\u67e5\u8a62'>Query</i>",
          ";float": "left",
          ";padding": "0 20px",
          ";border-width": "0",
          size: "small",
          id: "queryBtn",
          $mixin: [y],
          "@visible": "@queryStatus!=1",
          ";margin-top": "3px",
        };
      },
      _excelBtn: function () {
        return {
          $extend: e,
          icon: "download",
          evt: "excel",
          text: "Excel",
          ";float": "left",
          ";margin-left": "10px",
          ";padding": "0 15px",
          ";border-width": "0",
          size: "small",
          id: "excelBtn",
          $mixin: [y],
          "@visible": "@queryStatus!=1",
          ";margin-top": "3px",
        };
      },
      queryTdColspan: 1,
      queryTdRowspan: 1,
      _queryTd: function () {
        return {
          $extend: a,
          $mixin: [f],
          tdStyle: "background-color:#E3E3E3",
          ";padding": "0 15px",
          ";height": "30px",
          ";overflow-y": "auto",
          ";overflow-x": "hidden",
          tdAttr: " s-dblclick ='showListQueryService'",
          inner: [this._queryBtn(), this.showExcel ? this._excelBtn() : null],
          colspan: this.queryTdColspan,
          rowspan: this.queryTdRowspan,
        };
      },
      onShowListQueryService: function () {
        "ClientTool" != this.listQueryService
          ? alert(this.listQueryService + "." + this.listQueryMethod)
          : this.listQuerySql &&
            "string" == typeof this.listQuerySql &&
            alert(
              "$" == this.listQuerySql.substr(0, 1)
                ? this.listQuerySql.split("@")[0].substr(1)
                : this.listQuerySql
            );
      },
      showExcel: !1,
      onExcel: function () {
        this.excel();
      },
      divInterval: 3,
      _grid: function () {
        this.fields = [].concat(this.fields);
        return {
          $extend: this.tableType || g,
          id: "table",
          $mixin: this._gridMixin(),
          fields: this.fields,
          titleRows: this.gridTitleRows,
          top:
            this.queryFields && this.queryVisible
              ? this._queryFormHeight + this.divInterval
              : 0,
          bottom: this.pageVisible ? 34 + this.divInterval : 0,
          "@items": "rows",
        };
      },
      showQueryForm: function () {
        this.queryForm.show();
        this.table.css("top", this._queryFormHeight + this.divInterval + "px");
      },
      hideQueryForm: function () {
        this.queryForm.hide();
        this.table.css("top", 0);
      },
      showIndex: !0,
      fixColumnsCount: 1,
      resizeCol: !0,
      _gridMixin: function () {
        var a = [y];
        this.formMixin && a.push({ formMixin: this.formMixin });
        this.fixColumnsCount &&
          (a.push(p), a.push({ fixColumnsCount: this.fixColumnsCount }));
        if (this.sortField || this.sortClient)
          a.push(h),
            a.push({
              "@sortField": "sortField",
              "@sortSeq": "sortSeq",
              sortEvt: "sort",
            });
        this.resizeCol && a.push(j);
        this.adjustCol && a.push(q);
        this.showIndex && a.push(k);
        if (
          this.rowKeyFields &&
          (a.push(i),
          a.push(o),
          a.push({ rowKeyFields: this.rowKeyFields }),
          this.checkEvt &&
            (a.push(n),
            a.push({ checked: this.checked, checkEvt: this.checkEvt })),
          this.selectEvt &&
            (a.push(l),
            a.push({ selected: this.selected, selectEvt: this.selectEvt })),
          this.actions)
        )
          a.push(m),
            a.push({
              actions: this.actions,
              actionStatusEvt: this.actionStatusEvt,
              actionWidth: this.actionWidth,
            });
        this.tableMixin && a.push(this.tableMixin);
        return (a = a.concat(this.tableMixins || []));
      },
      pageSizes: [10, 50, 100, 500],
      _pageBar: function () {
        return {
          $extend: s,
          $mixin: [y, this.pagebarMixin],
          pageEvt: "page",
          pageSizeEvt: "page",
          overflow: "hidden",
          "@page": "page",
          "@totalCount": "totalCount",
          "@pageSize": "pageSize",
          bindPageSizeFrom: function (a) {
            return a || 0;
          },
          "@totalPage": "totalPage",
          "@loading": "queryStatus",
          bindLoadingFrom: function (a) {
            return a;
          },
          "@info":
            "queryStatus,queryError,_dataListQueryStartTime,_dataListQueryEndTime,_dataListQueryTime,disabled,edited",
          bindInfoFrom: function (a, b, c, d, e, f, g) {
            return d || 1 == a
              ? "<i zh='\u67e5\u8a62\u65bc'>Query at </i><b>" +
                  u.formatDate(u.getStrFromDate(c)).substr(5) +
                  "</b>" +
                  (1 == a
                    ? " ..."
                    : d
                    ? "(<i zh='\u82b1\u8cbb'>Spend</i> <b style='color:black'>" +
                      e +
                      "</b> <i zh='\u79d2'>seconds</i>)"
                    : "") +
                  (1 != a && !f && !g
                    ? "<font title='click here to try query again' style='cursor:pointer;color:blue;text-decoration:underline;padding-left:5px;padding-right:5px' s-click='pagebarRefresh'>" +
                      (b
                        ? "<i zh='\u91cd\u8a66'>Retry</i>"
                        : "<i zh='\u5237\u65b0'>Refresh</i>") +
                      "</font>" +
                      (b || "")
                    : "")
              : "";
          },
          "@;color=>.info-label": "queryStatus,queryError",
          "bind;color=>.info-labelFrom": function (a, b) {
            return 1 == a ? "blue" : b ? "red" : "gray";
          },
          pageSizes: this.pageSizes,
          bottom: 0,
          height: 32,
          id: "pagebar",
        };
      },
      onPage: function () {
        this.doPage();
      },
      onSort: function () {
        this.doSort();
      },
      onQuery: function () {
        this.queryAsFilter ? this.doFilter() : this.doQuery();
      },
      onExcel: function () {
        this.doExcel();
      },
      onPagebarRefresh: function () {
        this.doQuery();
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.App.Report" });
sjs
  .using("Core5.App.DataList")
  .using("Core5.Widget.Table.ReportStyle")
  .define(function (d, a) {
    return {
      $extend: d,
      resizeCol: !1,
      _gridMixin: function () {
        var c = this.$base();
        c.push(a);
        return c;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.onresize" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.GetHelper")
  .define(function (d, a) {
    var c = d(window).width(),
      b = d(window).height();
    d(window).resize(function () {
      var f = d(window).height(),
        e = d(window).width();
      if (f != b || e != c)
        (b = f),
          (c = e),
          (f = d("[s-resize]")),
          d.each(f, function (b, c) {
            var e = a.getSjsObj(d(c));
            e && e.onresize && e.onresize();
          });
    });
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.onchange" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.GetHelper")
  .define(function (d, a) {
    function c() {
      var b = d(this),
        c = a.getSjsObj(b);
      c && c.onchange && c.onchange(b, b.val());
    }
    d(document)
      .delegate("[s-change]", "change", c)
      .delegate("[s-focus]", "focus", c)
      .delegate("[s-blur]", "blur", c)
      .delegate("[s-keyup]", "keyup", c)
      .delegate("[s-keydown]", "keydown", c)
      .delegate("[s-keypress]", "keypress", c);
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.DomEvent.DragResize" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.GetHelper")
  .define(function (d, a) {
    function c() {
      b &&
        (m && p && m[q] && m[q](b),
        (m = b = null),
        (document.unselectable = "off"),
        (document.onselectstart = null));
      sjs._isDrag = !1;
    }
    var b, f, e, g, i, h, j, k, l, n, o, m, p, q;
    d(document)
      .bind("mousemove", function (a) {
        if (1 === a.which && b) {
          if (g && (moveX = Math.round((a.clientX - f) * (h ? -1 : 1)))) {
            var d = b.width(),
              m = d + moveX;
            0 !== l && m > l && (m = l);
            m < k && (m = k);
            m != d &&
              (b.width(m),
              h && ((d = b.position()), b.css("left", d.left - moveX + "px")));
            f = a.clientX;
          }
          if (i) {
            if ((moveY = Math.round((a.clientY - e) * (j ? -1 : 1))))
              (d = b.height()),
                (m = d + moveY),
                0 !== o && m > o && (m = o),
                m < n && (m = n),
                m != d &&
                  (b.height(m),
                  j &&
                    ((d = b.position()), b.css("top", d.top - moveY + "px")));
            e = a.clientY;
          }
          window.getSelection
            ? window.getSelection().removeAllRanges()
            : document.selection && document.selection.empty();
        } else c();
      })
      .bind("mouseup", c)
      .delegate("[s-dragResize]", "mousedown", function (c) {
        if (!sjs._isDrag) {
          sjs._isDrag = !0;
          var t = d(c.target),
            r = parseInt(t.attr("s-dragResize"));
          g = "1" != t.attr("s-dragResizeNoW");
          i = "1" != t.attr("s-dragResizeNoH");
          h = "1" == t.attr("s-dragResizeReverseW");
          j = "1" == t.attr("s-dragResizeReverseH");
          for (var y = 0; y < r; y++) t = t.parent();
          b = t;
          k = parseInt(b.attr("s-minWidth") || "0");
          l = parseInt(b.attr("s-maxWidth") || "0");
          n = parseInt(b.attr("s-minHeight") || "0");
          o = parseInt(b.attr("s-maxHeight") || "0");
          m = a.getSjsObj(t);
          p = b.attr("s-dragResizeEvent") || "onDragResize";
          q = b.attr("s-dragResizeOKEvent") || "onDragResizeOK";
          f = c.clientX;
          e = c.clientY;
          document.unselectable = "on";
          document.onselectstart = function () {
            return !1;
          };
        }
      });
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Html.Table" });
sjs.loadCss("Core5.Html.Layout").define(function () {
  return {
    tableClass: "",
    tableStyle: "",
    tableAttr: "",
    cellSpacing: 1,
    cellPadding: 0,
    thAttr: "",
    thStyle: "",
    thClass: "",
    tdAttr: "",
    tdStyle: "",
    tdClass: "",
    _table: function (d, a) {
      return {
        tag: "table",
        attribute: this.tableAttr,
        " class": this.tableClass,
        " style": this.tableStyle,
        " cellspacing": this.cellSpacing,
        " cellpadding": this.cellPadding,
        "-s-grid-layout": !0,
        inner: [this._thead(d), this._tbody(d, a)],
      };
    },
    _thead: function (d) {
      return { tag: "thead", inner: this._thsTr(d) };
    },
    _thsTr: function (d) {
      return { tag: "tr", inner: this._ths(d) };
    },
    _ths: function (d) {
      var a = [];
      if (d) for (var c = 0; c < d.length; c++) a.push(this._th(d[c], c, d));
      return a;
    },
    _th: function (d) {
      return {
        tag: "th",
        "-s-field-prompt": !0,
        attribute:
          (this.thAttr || "") +
          (this.thAttr && d.thAttr ? " " : "") +
          (d.thAttr || ""),
        " class":
          (this.thClass || "") +
          (this.thClass && d.thClass ? " " : "") +
          (d.thClass || ""),
        " style":
          (this.thStyle || "") +
          (this.thStyle && d.thStyle ? ";" : "") +
          (d.thStyle || ""),
        inner: d.prompt || "&nbsp;",
      };
    },
    _tbody: function (d, a) {
      return [{ tag: "tbody", inner: this._trs(d, a) }];
    },
    _trs: function (d, a) {
      var c = [];
      if (a && d)
        for (var b = 0; b < a.length; b++) c.push(this._tr(a[b], b, d, a));
      return c;
    },
    _tr: function (d, a, c, b) {
      return {
        tag: "tr",
        attribute: this.trAttr,
        " class": this.trClass,
        " style": this.trStyle,
        inner: this._tds(d, a, c, b),
      };
    },
    _tds: function (d, a, c, b) {
      for (var f = [], e = 0; e < c.length; e++)
        f.push(this._td(c[e], e, d, a, c, b));
      return f;
    },
    _td: function (d, a, c, b) {
      return {
        tag: "td",
        "-s-field-content": !0,
        attribute:
          (this.tdAttr || "") +
          (this.tdAttr && d.tdAttr ? " " : "") +
          (d.tdAttr || ""),
        " class":
          (this.tdClass || "") +
          (this.tdClass && d.tdClass ? " " : "") +
          (d.tdClass || ""),
        " style":
          (this.tdStyle || "") +
          (this.tdStyle && d.tdStyle ? ";" : "") +
          (d.tdStyle || ""),
        inner: "function" == typeof d.getHtml ? d.getHtml(c, b, this) : d,
      };
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Layout.Split" });
sjs
  .using("Core5.Component")
  .using("Core5.Layout.AutoFit")
  .using("Core5.DomEvent.DragMove")
  .define(function (d, a) {
    return {
      $extend: a,
      regUIObj: !0,
      _initInner: function (a) {
        var b = this.splitter;
        if (b) {
          for (var f = 0; f < b.length; f++) {
            var e = b[f];
            if (e.items && 1 < e.items.length) {
              var g = (e.posKind = e.posKind || "top");
              e.pos = e.pos || 200;
              e.splitIndex = e.splitIndex || 1;
              var i = {
                $extend: d,
                ";background-color": "#d0d0d0",
                ";cursor":
                  "top" == g || "bottom" == g ? "row-resize" : "col-resize",
                " s-drag": this._objId,
                " s-dragStart": "splitStart",
                " s-dragMove": "splitMove",
                " s-dragEnd": "splitEnd",
                " s-split-id": f,
              };
              e.id && (i.id = e.id);
              i[g] = e.pos ? e.pos : 200;
              i["top" == g || "bottom" == g ? "height" : "width"] = 5;
              a.push(i);
            }
          }
          for (f = 0; f < b.length; f++) this._splitItems(b[f], b[f].pos, a);
        }
        this.$base(a);
      },
      splitStartActiveDisabled: !0,
      splitMoveActiveDisabled: !0,
      splitEndActiveDisabled: !0,
      onSplitStart: function (a) {
        a.css("background-color", "#888888");
      },
      onSplitMove: function (a, b, d) {
        var b = this.splitter[parseInt(a.attr("s-split-id"))].posKind,
          e = "top" == b || "bottom" == b ? 1 : 0,
          g = "top" == b || "left" == b ? 1 : -1;
        d[e] &&
          ((d = parseInt(a.css(b).replace("px", "")) + d[e] * g),
          a.css(b, d + "px"));
      },
      _getInnerItemById: function (a, b) {
        for (var d = 0; d < b.length; d++) if (b[d].id == a) return b[d];
        return null;
      },
      _splitItems: function (a, b, d) {
        var e = a.items;
        if (e)
          for (var g = a.posKind, i = a.splitIndex, h = 0; h < e.length; h++) {
            var j = d ? this._getInnerItemById(e[h], d) : this[e[h]],
              k = "top" == g || "left" == g,
              l = h < i,
              n = "top" == g || "bottom" == g ? "height" : "width",
              o = k === l ? n : g,
              m = b + (o == n ? 0 : 5);
            d
              ? ((j[o] = m - (o == n ? a.basePos || 0 : 0)),
                k === l &&
                  ("bottom" == g
                    ? (j.bottom = 0 + (a.basePos || 0))
                    : "right" == g && (j.right = 0 + (a.basePos || 0))))
              : j.css(o, m - (o == n ? a.basePos || 0 : 0) + "px");
          }
      },
      onSplitEnd: function (a) {
        a.css("background-color", "#d0d0d0");
        var b = this.splitter[parseInt(a.attr("s-split-id"))],
          d = b.posKind,
          e = parseInt(a.css(d).replace("px", "")),
          g = b.basePos || 0,
          e = e < g ? g : e,
          i = (g = "top" == d || "bottom" == d)
            ? this.jq().height()
            : this.jq().width();
        e > i - 8
          ? ((e = i - 8), a.css(g ? "height" : "width", "7px"))
          : a.css(g ? "height" : "width", "6px");
        a.css(d, e + "px");
        this._splitItems(b, e);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Layout.LabelForm" });
sjs.loadCss("Core5.Layout.LabelForm").define(function () {
  return {
    "-s-label-form": !0,
    _itemsHtml: function (d, a) {
      this.$base(d, a);
      d.push("<div style='clear:both'></div>");
    },
    _itemHtml: function (d, a) {
      a.prompt &&
        (d.push("<div class='s-label-field'>"),
        d.push("<div class='s-label-form-prompt'>"),
        d.push(a.prompt),
        !a.noColon && d.push(":"),
        d.push("</div>"));
      a.addClass && a.addClass("s-label-form-content");
      a["-s-btn"] && (a.size = "small");
      this.$base(d, a);
      a.prompt && d.push("</div>");
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.TreeSelect" });
sjs.define(function () {
  function d(a, c) {
    if (a)
      for (var b = 0; b < a.length; b++) {
        if (a[b].key === c) return a[b];
        if (a[b].treeBody) {
          var f = d(a[b].treeBody.inner, c);
          if (null !== f) return f;
        }
      }
    return null;
  }
  return {
    onTreeNodeSelect: function (a) {
      this.set("selected", a.key);
      this.selectEvt && this.report(this.selectEvt, this.selected, a);
    },
    getItemBykey: function (a) {
      return d(this.inner, a);
    },
    _getItemCfg: function (a, c) {
      var b = this.$base(a, c);
      b.selected = this.selected === a.key;
      return b;
    },
    nodeMixin: {
      init: function () {
        this.$base();
        this._initData("selected");
      },
      _setSelected: function (a) {
        a
          ? this.addClass("s-tree-selected")
          : this.removeClass("s-tree-selected");
      },
      setSelected: function (a) {
        this.set("selected", a);
      },
      onClickTitle: function () {
        this.selected || this.report("treeNodeSelect");
      },
    },
    init: function () {
      var a = this;
      this.treeMixin = {
        _getItemCfg: function (c, b) {
          var d = this.$base(c, b);
          d.selected = a.selected === c.key;
          return d;
        },
      };
      this.$base();
      this._initData("selected");
    },
    _setSelected: function (a, c, b) {
      (c = d(this.inner, b)) && c.setSelected(!1);
      (a = d(this.inner, a)) && a.setSelected(!0);
    },
    select: function (a) {
      this.set("selected", a);
      return this;
    },
    clear: function () {
      this.select(null);
      return this;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.ItemSelect" });
sjs.define(function () {
  function d(a, b) {
    if (a) for (var d = 0; d < a.length; d++) if (a[d].key === b) return a[d];
    return null;
  }
  var a = {
    regUIObj: !0,
    init: function () {
      this.$base();
      this._initData("selected");
    },
    _setSelected: function (a) {
      this.setClass("s-item-selected", a);
    },
    setSelected: function (a) {
      this.set("selected", a);
    },
    " s-click": "clickItem",
    onClickItem: function () {
      this.selected || this.report("itemSelect");
    },
  };
  return {
    onItemSelect: function (a) {
      this.set("selected", a.key);
      this.selectEvt && this.report(this.selectEvt, this.selected, a);
    },
    _getItemCfg: function (c, b) {
      var d = this.$base(c, b);
      d.selected = this.selected === c.key;
      d.key = c.key;
      d.$mixin = d.$mixin || [];
      d.$mixin.push(a);
      return d;
    },
    init: function () {
      this.$base();
      this._initData("selected");
    },
    _setSelected: function (a, b, f) {
      this.isRender() &&
        ((b = d(this._items, f)) && b.setSelected(!1),
        (a = d(this._items, a)) && a.setSelected(!0));
    },
    select: function (a) {
      this.set("selected", a);
      return this;
    },
    clear: function () {
      this.select(null);
      return this;
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.ItemMultipleSelect" });
sjs.using("Core5.Util.DataFn").define(function (d) {
  var a = {
    regUIObj: !0,
    init: function () {
      this.$base();
      this._initData("selected");
    },
    _setSelected: function (a) {
      this.setClass("s-item-selected", a);
    },
    setSelected: function (a) {
      this.set("selected", a);
    },
    " s-click": "clickItem",
    onClickItem: function (a, b) {
      b.ctrlKey
        ? this.report("itemSelect", !this.selected)
        : this.report("select");
      b.stopPropagation();
    },
  };
  return {
    _getItemCfg: function (c, b) {
      var d = this.$base(c, b);
      d.selected = !1;
      d._keyValue = this.valueField ? c[this.valueField] : c;
      d.$mixin = d.$mixin || [];
      d.$mixin.push(a);
      return d;
    },
    onItemSelect: function (a, b) {
      var f = a._keyValue;
      b
        ? 0 > d.indexOf(this.selected, f) && this.add("selected", f)
        : this.remove("selected", f);
      this.mulSelectEvt && this.report(this.mulSelectEvt, b, checked, data);
    },
    onSelect: function (a) {
      this.select([a._keyValue]);
      this.selectEvt && this.report(this.selectEvt, this.selected);
    },
    init: function () {
      this.$base();
      this._initData("selected", []);
    },
    _getItemByValue: function (a) {
      var b = this._items;
      if (b)
        for (var d = 0; d < b.length; d++)
          if (b[d]._keyValue === a) return b[d];
      return null;
    },
    _addSelected: function (a, b, d) {
      (a = this._getItemByValue(d)) && a.setSelected(!0);
    },
    _removeSelected: function (a, b, d) {
      (a = this._getItemByValue(d)) && a.setSelected(!1);
    },
    _setSelected: function (a) {
      var b = this._items;
      if (b)
        for (var f = 0; f < b.length; f++) {
          var e = b[f];
          e.setSelected(0 <= d.indexOf(a, e._keyValue));
        }
    },
    select: function (a) {
      this.set("selected", a);
      return this;
    },
    clear: function () {
      this.select([]);
      return this;
    },
    regUIObj: !0,
    " s-click": "clickBlank",
    onClickBlank: function () {
      this.clear();
      this.mulSelectEvt && this.report(this.mulSelectEvt, this.selected);
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.InputDataList" });
sjs
  .using("Core5.App.DataList")
  .using("Core5.Widget.Ability.Pop")
  .using("Core5.Widget.Ability.DragResize")
  .define(function (d, a, c) {
    return {
      " s-keyup": "keyup",
      onKeyup: function () {
        this.showListPop();
      },
      showListPop: function () {
        window.clearTimeout(this._inputPromptID);
        var a = this;
        this._inputPromptID = window.setTimeout(function () {
          a.queryListPop();
        }, this.queryMillSeconds || 500);
      },
      onIptFocus: function () {
        this.$base();
        !this.isDisabled() && this.showListPop();
      },
      textArgField: "input",
      listQuerySql: "",
      listSortField: "",
      listKeyField: "",
      listFields: "",
      popCreater: function () {
        return this;
      },
      queryListPop: function () {
        var b = this.jq(".s-text-input").val(),
          b = strFn.trim(b);
        if (0 < b.length) {
          var f = this.popCreater();
          f.inputDataList ||
            f
              .createChild(d, a, c.rb, c.right, c.bottom, this.listSetting, {
                id: "inputDataList",
                $mixin: [this.listSetting],
                width: this.listWidth || 500,
                height: this.listHeight || 300,
                rowKeyFields: this.listKeyField,
                selectEvt: "selectList",
                queryFields: this.listQueryFields,
                fields: this.listFields,
                listQueryService: this.listService || "ClientTool",
                listQueryMethod: this.listMethod || "Query",
                listQuerySql: this.listQuerySql || null,
                sortField: this.listSortField,
                sortSeq: "asc",
                pageSize: this.listPageSize || 20,
              })
              .renderTo("body", !0);
          var e = this.jq(),
            g = e.offset(),
            i = g.left,
            h = g.top,
            h = g.top + e.outerHeight();
          f.inputDataList.setResponser(this);
          f.inputDataList.show().move(i, h);
          if (this.conditionItemFields)
            for (var j in this.conditionItemFields)
              f.inputDataList.set(
                "condition." + this.conditionItemFields[j],
                this.parent.item[j]
              );
          f.inputDataList.set("condition." + this.textArgField, b);
          f.inputDataList.doQuery();
        }
      },
      onSelectList: function (a, c, d) {
        a.set("selected", null);
        if (this.parentItemFields)
          for (var g in this.parentItemFields)
            this.parent.set("item." + g, d[this.parentItemFields[g]]);
        this.selectEvt && this.report(this.selectEvt, c, d);
        this.popCreater().inputDataList.hide();
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.InputPrompt" });
sjs
  .using("Core5.Widget.Mixin.QueryGen")
  .using("Core5.Widget.Table")
  .using("Core5.Widget.Table.ColResizer")
  .using("Core5.Widget.Ability.Pop")
  .using("Core5.Container")
  .using("Core5.Widget.Ability.DragResize")
  .using("Core5.Widget.Table.Select")
  .using("Core5.Util.StrFn")
  .define(function (d, a, c, b, f, e, g, i) {
    return {
      $mixin: [d("prompt")],
      " s-keyup": "keyup",
      onKeyup: function () {
        window.clearTimeout(this._inputPromptID);
        var a = this;
        this._inputPromptID = window.setTimeout(function () {
          a._promptQuery();
        }, 500);
      },
      promptQueryMethod: "QueryPage",
      promptPageSize: 20,
      _promptQuery: function () {
        this.promptQuery.apply(this, this._getInputPromptQueryArgs());
      },
      _getInputPromptQueryArgs: function () {
        var a = this.jq(".s-text-input").val();
        this.trimInput && (a = i.trim(a));
        this.upperCase && (a = a.toUpperCase());
        if (this.promptQueryField) {
          var b = {};
          b[this.promptQueryField + "__START"] = a;
          return [b, this.promptQueryField, this.promptPageSize, 1];
        }
        return [a];
      },
      _getPromptPopCreater: function () {
        return this;
      },
      fieldWidth: 150,
      promptQueryResult: function (d) {
        var i = this._getPromptPopCreater();
        if (d.Count) {
          var k = d.Rows,
            l = this.jq();
          if (!i.promptPop) {
            var n = this.promptQueryField;
            if (!n) {
              var o = k[0],
                m;
              for (m in o) {
                n = m;
                break;
              }
            }
            o = this.promptQueryFieldNm || n;
            i.createChild(f, b, e.rb, {
              id: "promptPop",
              width: l.outerWidth(),
              height: 150,
              inner: [
                {
                  $extend: a,
                  $mixin: [g, c],
                  rowKeyFields: n,
                  selectEvt: "promptSelect",
                  fields: [{ prompt: o, fieldNo: n, width: this.fieldWidth }],
                  ";position": "absolute",
                  ";top": "0",
                  ";left": "0",
                  ";right": "0",
                  ";bottom": "0",
                },
                "<div class='s-more' style='text-align:right;right:0;padding-right:25px;position:absolute;bottom:0;height:20px;xfont-size:12px;color:#A0A0A0' title='type more words to list exactly'>...</div>",
              ],
            }).renderTo("body", !0);
          }
          i.promptPop.setResponser(this);
          n = i.promptPop.inner[0];
          n.setSelected(null);
          n.setItems(k);
          d.Count > this.promptPageSize
            ? i.promptPop
                .jq(".s-more")
                .html("list:" + this.promptPageSize + "/" + d.Count + "...")
                .show()
            : i.promptPop
                .jq(".s-more")
                .html("total:" + d.Count)
                .show();
          d = l.offset();
          k = d.left;
          n = d.top;
          n = d.top + l.outerHeight();
          i.promptPop.show().move(k, n);
        } else
          i.promptPop &&
            ((n = i.promptPop.inner[0]),
            n.setSelected(null),
            n.setItems(null),
            i.promptPop.jq(".s-more").html("total:0").show());
      },
      onPromptSelect: function (a, b) {
        this.setValue(b);
        this._getPromptPopCreater().promptPop.hide();
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.DragSelect" });
sjs
  .using("jQuery")
  .using("Core5.DomEvent.DragMove")
  .define(function (d) {
    return {
      regUIObj: !0,
      ";cursor": "default",
      " s-dragStart": "selectStart",
      " s-dragMove": "selectMove",
      " s-dragEnd": "selectEnd",
      init: function () {
        this.$base();
        this.attr("s-drag", this._objId);
      },
      selectDragDivOverDistance: 8,
      onSelectStart: function (a, c) {
        this.getSelectDiv()
          .css({
            width: "0",
            height: "0",
            left: c.pageX - this.selectDragDivOverDistance + "px",
            top: c.pageY - this.selectDragDivOverDistance + "px",
          })
          .show();
      },
      onSelectMove: function (a, c, b) {
        a = this.getSelectDiv();
        a.position();
        b[0] &&
          (0 > b[2]
            ? a
                .css("left", c.pageX - this.selectDragDivOverDistance + "px")
                .width(-b[2])
            : a
                .css("left", b[6] + "px")
                .width(b[2] + this.selectDragDivOverDistance));
        b[1] &&
          (0 > b[3]
            ? a
                .css("top", c.pageY - this.selectDragDivOverDistance + "px")
                .height(-b[3])
            : a
                .css("top", b[7] + "px")
                .height(b[3] + this.selectDragDivOverDistance));
        c = a.position();
        b = a.width();
        a = a.height();
        this._selectByRange(c.left, c.left + b, c.top, c.top + a);
      },
      _selectByRange: function (a, c, b, d) {
        var e = this._items,
          g = [];
        if (e)
          for (var i = 0; i < e.length; i++) {
            var h = e[i],
              j = h.jq().offset(),
              k = h.jq().width(),
              l = h.jq().height(),
              n = j.left,
              o = j.top,
              l = j.top + l;
            j.left + k < a || n > c || l < b || o > d || g.push(h._keyValue);
          }
        this.select(g);
      },
      onSelectEnd: function () {
        this.getSelectDiv().hide();
        this.dragSelectEvt && this.report(this.dragSelectEvt, this.selected);
      },
      getSelectDiv: function () {
        d("#s-selectDiv").length ||
          d(
            "<div id='s-selectDiv' style='display:none;position:absolute;border:1px solid #5d91c1;z-index:999;overflow:hidden;background-color:#A8CAED;cursor:default;'>&nbsp;</div>"
          )
            .css("opacity", "0.5")
            .appendTo("body");
        return d("#s-selectDiv");
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.ActionInfoWin" });
sjs
  .loadCss("Core5.Widget.Ability.ActionInfoWin")
  .using("Core5.Component")
  .using("Core5.Util.DateFn")
  .define(function (d, a) {
    return {
      $extend: d,
      "-s-prompt-con": !0,
      iconPath: "./Core5/Widget/Ability/ActionInfoWin/",
      inner: function () {
        return [
          "<div class='s-prompt-img'><img src='" +
            this.iconPath +
            "warn.gif' class='s-prompt-icon'></div>",
          "<div class='s-prompt-main'>",
          "<div class='s-prompt-line1'></div>",
          "<div class='s-prompt-con-msg'></div>",
          "</div>",
        ];
      },
      msgs: {
        start:
          "\u6b63\u5728\u57f7\u884c\uff0c\u8acb\u7a0d\u5019(\u5982\u679c\u7cfb\u7d71\u9577\u6642\u9593\u7121\u53cd\u61c9\uff0c\u8acb\u806f\u7e6b\u7cfb\u7d71\u4eba\u54e1)<font class='time-font'></font><font class='dot-font'></font><br>Please wait and do not exit program(If system has no response for a long time,please contact system manager)",
        ok: "\u57f7\u884c\u6210\u529f(Successfully)\uff0c\u5171\u82b1\u8cbb\u6642\u9593(Time Spend)\uff1a<font class='time-font2'></font>",
        error:
          "\u5f88\u62b1\u6b49\uff0c\u767c\u751f\u4e86\u4e00\u4e9b\u554f\u984c\uff0c\u8acb\u91cd\u8a66\u6216\u7a0d\u5019\u518d\u8a66\uff0c\u5982\u679c\u554f\u984c\u4ecd\u7136\u5b58\u5728\uff0c\u8acb\u806f\u7e6b\u7cfb\u7d71\u4eba\u54e1<br>Please try again or refresh this page,if error come up again,pls contact IT department(3070)!",
      },
      _updateTime: function () {
        this._seconds++;
        var a = this._seconds,
          b = 1 == a % 3 ? "." : 2 == a % 3 ? ".." : "...";
        if (1 == a || 0 == a % 2)
          (a = this._getTimeStr(a)), this.jq(".time-font").html(a);
        this.jq(".dot-font").html(b);
        if (this._updateTime && "start" == this.status) {
          var d = this;
          window.setTimeout(function () {
            d._updateTime();
            d = null;
          }, 500);
        }
      },
      _getTimeStr: function (c) {
        c = a.getTimeSpan(500 * c);
        return (
          (c.day ? "&nbsp;" + c.day + "Day" : "") +
          (c.day || c.hour ? "&nbsp;" + c.hour + ":" : "") +
          ((10 > c.minute ? "0" : "") +
            c.minute +
            ":" +
            (10 > c.second ? "0" : "") +
            c.second)
        );
      },
      _setStatus: function (a, b, d) {
        d && this.removeClass("status-" + d);
        this.addClass("status-" + a);
        this.isRender() &&
          ("start" == a && ((this._seconds = 0), this._updateTime()),
          this.jq(".s-prompt-icon").attr(
            "src",
            this.iconPath +
              ("ok" == a
                ? "success.gif"
                : "error" == a
                ? "fail.gif"
                : "info.gif")
          ),
          this.jq(".s-prompt-line1").html(this.msgs[a]),
          "ok" == a &&
            this.jq(".time-font2").html(this._getTimeStr(this._seconds)));
      },
      _setMsg: function (a) {
        this.isRender() && this.jq(".s-prompt-con-msg").html(a);
      },
      regUIObj: !0,
      onStart: function () {
        this.set("status", "start");
      },
      onOk: function () {
        this.set("status", "ok");
      },
      onError: function () {
        this.set("status", "error");
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.YT.Msg" });
sjs
  .loadCss("Core5.YT.Msg")
  .using("Core5.YT.Model")
  .using("Core5.YT.Button")
  .using("Core5.Html.Base")
  .using("Core5.Cls")
  .using("Core5.Widget.Input.Textarea")
  .using("Core5.Widget.Ability.DragResize")
  .define(function (d, a, c, b, f, e) {
    function g(a, c, d, e, f, g) {
      h ||
        (h = b
          .create(i, { width: k.width || 300, height: k.height || 150 })
          .show());
      h.set("kind", a)
        .set("Info", c)
        .setTitle(d || a);
      h.fn = e;
      h.args = f;
      h.context = g;
      h.show();
    }
    var i = {
        $extend: d,
        $mixin: [e.rb, e.right, e.bottom],
        width: 300,
        height: 150,
        minWidth: 300,
        minHeight: 150,
        noClickHide: !0,
        footer: [
          {
            $extend: a,
            id: "cancelBtn",
            floatRight: !0,
            text: "Cancel",
            evt: "close",
            ";width": "50px",
          },
          {
            $extend: a,
            id: "noBtn",
            floatRight: !0,
            text: "No",
            evt: "close",
            ";width": "50px",
          },
          {
            $extend: a,
            id: "yesBtn",
            floatRight: !0,
            text: "Yes",
            evt: "yes",
            ";width": "50px",
          },
        ],
        inner: function () {
          return {
            $extend: c,
            inner: [
              { "-yt-msg-icon": !0, " class": "yt-msg-icon-" + this.kind },
              { "-yt-msg-info": !0, inner: this.info },
            ],
          };
        },
        _setKind: function (a, b, c) {
          this.isRender() &&
            this.jq(".yt-msg-icon")
              .removeClass("yt-msg-icon-" + c)
              .addClass("yt-msg-icon-" + a.toLowerCase());
          this.footerCon.cancelBtn.setText(
            "Question" == a || "Warn" == a ? "Cancel" : "Close"
          );
          this.footerCon.yesBtn.setVisible("Question" == a || "Warn" == a);
          this.footerCon.noBtn.setVisible(!1);
        },
        _setInfo: function (a) {
          this.isRender() && this.jq(".yt-msg-info").html(a);
        },
        onYes: function () {
          this.hide();
          this.fn && this.fn.apply(this.context, this.args || []);
        },
      },
      h,
      j,
      k;
    return (k = {
      warn: function (a, b, c, d, e) {
        g("Warn", a, e, b, c, d);
      },
      info: function (a, b) {
        g("Done", a, b);
      },
      error: function (a, b) {
        g("Error", a, b);
      },
      ask: function (a, b, c, d, e) {
        g("Question", a, e, b, c, d);
      },
      prompt: function (a, c, e, g, i) {
        j ||
          (j = b.create(d, {
            inner: { $extend: f, ";height": "62px", id: "input" },
            footer: [
              { text: "OK", icon: "ok", floatRight: !0, evt: "OK" },
              { text: "Close", icon: "remove", evt: "close" },
            ],
            onOK: function () {
              var a = this.input.value;
              this.required && !a
                ? alert("can not empty!")
                : (this.okEvt && this.report(this.okEvt, a), this.hide());
            },
            height: 126,
            showBottomBorder: !1,
          }));
        j.input.set("value", i || null);
        j.setResponser(c)
          .set("required", g)
          .set("okEvt", e)
          .set("title", a + (g ? "<b style='color:yellow'>(Required)</b>" : ""))
          .show();
      },
    });
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Ability.Action" });
sjs
  .using("Core5.YT.Button")
  .using("Core5.YT.Model")
  .using("Core5.YT.Msg")
  .using("Core5.Widget.Form")
  .using("Core5.Layout.Form")
  .using("Core5.Widget.Ability.ActionInfoWin")
  .using("Core5.Util.Service")
  .define(function (d, a, c, b, f, e, g) {
    return {
      onActionDoing: function (d, e, g) {
        this._actionCfg = d;
        this._actionRows = e.push ? [].concat(e) : [e];
        this._actionRowKeys = e.push ? [].concat(g) : [g];
        if (d.actionWindow) {
          e = d.actionID;
          if (!e) throw "please set actionID first";
          (g = this[e]) || (g = this.createChild(d.actionWindow, { id: e }));
          g.set("actionConfig", this._actionCfg);
          g.set("rowKeys", this._actionRowKeys);
          g.set("rows", this._actionRows);
          g.show();
        } else if (d.actionForm || d.actionInner) {
          e = d.actionID;
          if (!e) throw "please set actionID first";
          (g = this[e]) ||
            (g = this.createChild(a, {
              id: e,
              inner: d.actionForm || {
                $extend: b,
                $mixin: [d.formLayout || f, d.formMixin],
                id: "form",
                promptPos: d.promptPos || "left",
                columnCount: d.columnCount || 1,
                cellsWidth: d.cellsWidth,
                inner: d.actionInner,
              },
              width: d.inputWidth || 400,
              height: d.inputHeight || 250,
              noClickHide: !0,
              showBottomBorder: !1,
              footer: [
                { text: "\u78ba\u5b9a(OK)", floatRight: !0, evt: "confirm" },
                { text: "\u53d6\u6d88(Cancel)", evt: "close" },
              ],
              service: d.service,
              command: d.command,
              params: d.params,
              onConfirm: function () {
                if (this.form && this.form.checkError) {
                  var a = this.form.checkError();
                  if (a.length) {
                    c.error(a.join("<br>"));
                    return;
                  }
                }
                a = null;
                this.form &&
                  (a = this.form.getConfirmInput
                    ? this.form.getConfirmInput()
                    : this.form.item);
                this.report("formConfirm", a);
                this.hide();
              },
            }));
          g.setTitle(
            (d.promptTitle || "Please input...") +
              (!d.noShowTotalInTitle && this._actionRows.length
                ? "(Total:" + this._actionRows.length + ")"
                : "")
          );
          g.form && g.form.set("row", this._actionRows[0]);
          g.form && g.form.set("rowKey", this._actionRowKeys[0]);
          g.form && g.form.set("rows", this._actionRows);
          g.form && g.form.set("rowsKey", this._actionRowKeys);
          g.show();
        } else
          d.needConfirm
            ? c.ask(
                (d.promptTitle || "Are you sure?") +
                  (!d.noShowTotalInTitle && this._actionRows.length
                    ? "(Total:" + this._actionRows.length + ")"
                    : ""),
                function () {
                  this.doAction();
                },
                null,
                this
              )
            : this.doAction();
      },
      onFormConfirm: function (a, b) {
        this._actionInput = b;
        this.doAction(b);
      },
      doAction: function () {
        var a = this._actionCfg;
        a.service && a.command
          ? this._actionExecute
            ? c.warn(
                "please wait all executions finish,remain:" +
                  (this._actionTotalCount - this._actionTotalExec)
              )
            : ((this._actionExecute = !0),
              (this._actionTotalCount = this._actionRows.length),
              (this._actionExecError =
                this._actionExecOK =
                this._actionTotalExec =
                  0),
              (this._actionInfo = []),
              this._doAction())
          : c.error("action cfg has no service and command config");
      },
      onCancelAll: function () {
        this._actionExecute = !1;
        this.actionMsgWin.hide();
      },
      onRetryAll: function () {
        this.doAction();
      },
      _doAction: function () {
        if (this._actionExecute) {
          var a = this._actionCfg,
            b = this._actionInput,
            c =
              this._actionTotalCount +
              "(OK:" +
              this._actionExecOK +
              ",Error:" +
              this._actionExecError +
              ")<br>" +
              this._actionInfo.join("<br>");
          if (this._actionTotalExec >= this._actionTotalCount) {
            for (
              var a = this._actionRows, b = this._actionRowKeys, d = a.length;
              0 <= d;
              d--
            )
              a[d] || (a.splice(d, 1), b.splice(d, 1));
            this._actionExecute = !1;
            this._showActionInfo(
              this._actionExecError ? "error" : "ok",
              "Total:" + c
            );
            this.onActionFinish &&
              this.onActionFinish(
                this,
                this._actionExecError ? "error" : "ok",
                this._actionInfo
              );
            this.actionFinishEvt &&
              this.report(
                this.actionFinishEvt,
                this._actionExecError ? "error" : "ok",
                this._actionInfo
              );
          } else {
            var c = this._actionTotalExec,
              d = this._actionRows[c],
              e = this._actionRowKeys[c];
            this._showActionInfo(
              "start",
              "\u5171(Total)" + this._actionTotalCount + "\u7b46"
            );
            b = a.params ? a.params(d, e, b, this) : [];
            g.callService(
              a.service,
              a.command,
              b,
              this,
              this._doActionOK,
              this._doActionErr,
              c
            );
          }
        }
      },
      _doActionOK: function (a, b) {
        this._actionExecOK++;
        this._actionTotalExec++;
        var c = this._actionRows[b],
          d = this._actionRowKeys[b];
        this._actionInfo[b] = b + 1 + ":OK";
        this._actionRows[b] = null;
        this.onActionOK && this.onActionOK(this, c, d, b);
        this.actionOKEvt &&
          this.report(
            this.actionOKEvt,
            this._actionCfg,
            c,
            d,
            b,
            this._actionInput
          );
        this._doAction();
      },
      _doActionErr: function (a, b) {
        this._actionExecError++;
        this._actionTotalExec++;
        this._actionInfo[b] = b + 1 + ":[error]" + a.Message;
        var c = this._actionRows[b],
          d = this._actionRowKeys[b];
        this.onActionError && this.onActionError(this, c, d, b);
        this.actionErrEvt &&
          this.report(
            this.actionErrEvt,
            this._actionCfg,
            c,
            d,
            b,
            this._actionInput
          );
        this._doAction();
      },
      onActionInfoWinHide: function (a) {
        "error" == a.msgCon.status &&
          ((a = this._actionCfg.actionID), this[a] && this[a].show());
      },
      _showActionInfo: function (b, c) {
        this.actionMsgWin ||
          this.createChild(a, {
            id: "actionMsgWin",
            inner: { $extend: e, id: "msgCon" },
            footer: [
              {
                id: "closeBtn",
                text: "Close",
                floatRight: !0,
                evt: "close",
                visible: !1,
              },
              {
                id: "cancelAllBtn",
                text: "Cancel All",
                evt: "cancelAll",
                visible: !1,
              },
              {
                id: "retryBtn",
                text: "Retry All",
                evt: "retryAll",
                visible: !1,
              },
            ],
            width: 700,
            height: 240,
            noClickHide: !0,
            title: "\u670d\u52d9\u57f7\u884c\u8a0a\u606f(Execute Info)",
            _getTitleToolsInner: function () {
              return [];
            },
            hideEvt: "actionInfoWinHide",
          }).show();
        this.actionMsgWin.msgCon.set("status", b);
        this.actionMsgWin.msgCon.set("msg", c);
        "ok" == b
          ? this.actionMsgWin.hide()
          : ("start" == b
              ? (this.actionMsgWin.footerCon.closeBtn.hide(),
                this.actionMsgWin.footerCon.cancelAllBtn.show(),
                this.actionMsgWin.footerCon.retryBtn.hide())
              : (this.actionMsgWin.footerCon.closeBtn.show(),
                this.actionMsgWin.footerCon.cancelAllBtn.hide(),
                this.actionMsgWin.footerCon.retryBtn.show()),
            this.actionMsgWin.show());
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Formatter.Items" });
sjs.define(function () {
  return {
    fieldValueSplit: ",",
    showSpliter: "",
    showAllWhenAll: !1,
    valueField: "value",
    textField: "text",
    format: function (d) {
      if (this.items && null !== d && d && 0 < d.length) {
        var a = d,
          c = this.fieldValueSplit;
        c || ((c = ","), (a = d.join(c)));
        for (
          var d = c + a + c,
            a = this.items,
            b = [],
            f = this.valueField,
            e = this.textField,
            g = 0;
          g < a.length;
          g++
        )
          0 <= d.indexOf(c + a[g][f] + c) && b.push(a[g][e]);
        return a.length == b.length && this.showAllWhenAll
          ? "all"
          : b.join(this.showSpliter || c);
      }
      return "";
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.DataList" });
sjs
  .using("Core5.Widget.Input.Command")
  .using("Core5.App.DataList")
  .using("Core5.Widget.Ability.Pop")
  .using("Core5.Widget.Ability.DragResize")
  .define(function (d, a, c, b) {
    return {
      $extend: d,
      textFromValue: !1,
      rightIcon: "chevron-down",
      onPopClick: function () {
        this.showListPop();
      },
      listQuerySql: "",
      listSortField: "",
      listKeyField: "",
      listFields: "",
      popCreater: function () {
        return this;
      },
      showListPop: function () {
        var d = this.jq(".s-text-input").val(),
          d = strFn.trim(d);
        if (0 < d.length) {
          d = this.popCreater();
          d.inputDataList ||
            d
              .createChild(a, c, b.rb, b.right, b.bottom, this.listSetting, {
                id: "inputDataList",
                $mixin: [this.listSetting],
                width: this.listWidth || 500,
                height: this.listHeight || 300,
                rowKeyFields: this.listKeyField,
                selectEvt: "selectList",
                queryFields: this.listQueryFields,
                fields: this.listFields,
                listQueryService: this.listService || "ClientTool",
                listQueryMethod: this.listMethod || "Query",
                listQuerySql: this.listQuerySql || null,
                sortField: this.listSortField,
                sortSeq: "asc",
                pageSize: this.listPageSize || 20,
              })
              .renderTo("body", !0);
          var e = this.jq(),
            g = e.offset(),
            i = g.left,
            h = g.top,
            h = g.top + e.outerHeight();
          d.inputDataList.setResponser(this);
          d.inputDataList.show().move(i, h);
          this.setCondition(d.inputDataList);
          d.inputDataList.doQuery();
        }
      },
      setCondition: function (a) {
        if (this.conditionFields && this.parent && this.parent.item)
          for (
            var b = this.conditionFields.split(","),
              c = this.parent.item,
              d = 0;
            d < b.length;
            d++
          )
            a.set("condition." + b[d], c[b[d]]);
      },
      parentItemFields: {},
      onSelectList: function (a, b, c) {
        a.set("selected", null);
        if (this.parentItemFields)
          for (var d in this.parentItemFields)
            this.parent.set("item." + d, c[this.parentItemFields[d]]);
        this.selectEvt && this.report(this.selectEvt, b, c);
        this.popCreater().inputDataList.hide();
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.Upload" });
sjs
  .loadCss("Core5.Widget.Input")
  .loadCss("Core5.Shp.Icon")
  .using("Core5.Component")
  .using("jQuery")
  .using("Core5.DomEvent.oninput")
  .define(function (d, a) {
    return {
      $extend: d,
      regUIObj: !0,
      rightIcon: "upload",
      "-s-upload": !0,
      init: function () {
        this.$base();
        this._initData("file");
        this.iptFileId = this._objId + "_input_file";
      },
      set: function (a, b, d) {
        "SELF_SET" != d && "fileID" == a
          ? b != this.iptFileId &&
            this.set("fileID", this.iptFileId, "SELF_SET")
          : this.$base(a, b, d);
      },
      inner: function () {
        return [
          { "-s-upload-text": !0, inner: this.text },
          {
            "-s-upload-label": !0,
            tag: "label",
            " for": this.isDisabled() ? null : this.iptFileId,
          },
          {
            tag: "label",
            " for": this.isDisabled() ? null : this.iptFileId,
            "-s-upload-icon": !0,
            "-icon": !0,
            " class": "icon-" + this.rightIcon,
            inner: "&nbsp;",
          },
        ];
      },
      onDisabledChange: function () {
        var a = this.isDisabled();
        this.setClass("s-readonly", a);
        this.isRender() &&
          (this.jq(".s-upload-label").attr("for", a ? "" : this.iptFileId),
          this.jq(".s-upload-icon").attr("for", a ? "" : this.iptFileId));
      },
      getUrlFromFile: function (a) {
        return "/RIAService/Upload/Files/" + this.fileKind + "/" + a;
      },
      modifyShowText: function (a) {
        return a;
      },
      _setFile: function (c, b, d, e, g) {
        if ("USER_SELECT_OK" == g && c) this.set("text", c);
        else if (
          (c
            ? ((b = this.getUrlFromFile(c)),
              this.set("_org_file", c),
              this.set(
                "text",
                '<a rel="external" target="_blank" href="' +
                  b.replace('"', "&quot;") +
                  '">' +
                  this.modifyShowText(c) +
                  '</a>&nbsp;&nbsp;<font style="cursor:pointer;color:red" title="delete file" s-click="removeFile">[delete]</font>'
              ))
            : this.set("text", ""),
          this.isRender())
        )
          a("#" + this.iptFileId).remove(),
            a("#SERVICE_UPLOAD_FORM").append(
              "<input s-objId='" +
                this._objId +
                "' type='file' s-change='input' name='" +
                this.iptFileId +
                "' id='" +
                this.iptFileId +
                "'>"
            );
      },
      _setText: function (a) {
        this.isRender() && this.jq(".s-upload-text").html(a || "&nbsp;");
      },
      onRemoveFile: function () {
        this.set("_org_file", null);
        this.set("file", null);
        this.removeEvt && this.report(this.removeEvt);
      },
      _render: function () {
        this.$base();
        if (0 == a("#SERVICE_UPLOAD_IFRAME").size()) {
          var c = [];
          c.push(
            '<form style="width:0;height:0;overflow:hidden;" id="SERVICE_UPLOAD_FORM" enctype="multipart/form-data" accept-charset="UTF-8" target="SERVICE_UPLOAD_IFRAME" method="post">'
          );
          c.push('<input type="hidden" name="JsonService">');
          c.push("</form>");
          c.push(
            '<iframe style="display:none;width:120px;height:120px" id="SERVICE_UPLOAD_IFRAME" name="SERVICE_UPLOAD_IFRAME"></iframe>'
          );
          a("body").append(c.join(""));
        }
        a("#SERVICE_UPLOAD_FORM").append(
          "<input s-objId='" +
            this._objId +
            "' type='file' s-change='input' name='" +
            this.iptFileId +
            "' id='" +
            this.iptFileId +
            "'>"
        );
      },
      _dispose: function (c) {
        this.isRender() && a("#" + this.iptFileId).remove();
        this.$base(c);
      },
      types: "*",
      _checkType: function (a) {
        for (
          var b = this.types.split(","),
            a = a.substr(a.lastIndexOf(".") + 1).toLowerCase(),
            d = 0;
          d < b.length;
          d++
        )
          if ("*" == b[d] || b[d].toLowerCase() == a) return !0;
        return !1;
      },
      onInput: function () {
        if (!this.isDisabled()) {
          var c = a("#" + this.iptFileId).val();
          c && this._checkType(c)
            ? this.set("file", c, "USER_SELECT_OK")
            : (this.set("file", this._org_file || null),
              c && alert("file type must be:" + this.types));
        }
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.CheckGroup" });
sjs
  .loadCss("Core5.Widget.Input.CheckGroup")
  .using("Core5.ListContainer")
  .using("Core5.Widget.Input.CheckBox")
  .using("Core5.Util.DataFn")
  .using("Core5.Layout.Float")
  .define(function (d, a, c, b) {
    return {
      $extend: d,
      $mixin: [b],
      "-s-checkgroup": !0,
      itemType: a,
      textField: "text",
      _getItemCfg: function (a) {
        var b =
          0 <=
          c.indexOf(this.selected, this.valueField ? a[this.valueField] : a);
        return {
          text: this.textField ? a[this.textField] : null,
          data: a,
          evt: "itemSelect",
          checked: b,
        };
      },
      onItemSelect: function (a, b) {
        var c = a.data,
          c = this.valueField ? c[this.valueField] : c;
        b ? this.add("selected", c) : this.remove("selected", c);
        this.onCommand(this.selected, b, c);
      },
      onCommand: function (a, b, c) {
        this.evt && this.report(this.evt, a, b, c);
      },
      valueField: "value",
      init: function () {
        this.$base();
        this._initData("items", []);
        this._initData("selected", []);
      },
      _getItemByValue: function (a) {
        for (var b = this.inner, c = 0; c < b.length; c++) {
          var d = b[c].data;
          if ((this.valueField ? d[this.valueField] : d) === a) return b[c];
        }
        return null;
      },
      _setSelected: function (a) {
        var b = this._items;
        if (b)
          for (var d = 0; d < b.length; d++) {
            var i = b[d];
            b[d].setChecked(
              0 <=
                c.indexOf(a, this.valueField ? i.data[this.valueField] : i.data)
            );
          }
      },
      _addSelected: function (a, b, c) {
        this._getItemByValue(c).setChecked(!0);
      },
      _removeSelected: function (a, b, c) {
        this._getItemByValue(c).setChecked(!1);
      },
      select: function (a) {
        this.set("selected", a);
        return this;
      },
      clear: function () {
        this.select(null);
        return this;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Input.SelectList" });
sjs
  .using("Core5.Widget.Input.Command")
  .using("Core5.Widget.Input.CheckGroup")
  .using("Core5.Widget.Input.Formatter.Items")
  .define(function (d, a, c) {
    return {
      $extend: d,
      $mixin: [c],
      rightIcon: "chevron-down",
      _initValueText: function () {
        this._initData("items", []);
        this.$base();
      },
      popType: a,
      maxPopHeight: 200,
      minPopWidth: 200,
      _getPopConfig: function () {
        return {
          textField: this.textField,
          valueField: this.valueField,
          ";max-height": this.maxPopHeight + "px",
          ";min-width": this.minPopWidth + "px",
          ";overflow-y": "auto",
          evt: "popSelect",
        };
      },
      _getPop: function (a) {
        a = this.$base(a);
        a.setItems(this.items)
          .css("width", this.jq().outerWidth() + "px")
          .select(this.value);
        return a;
      },
      onPopSelect: function (a, c, d, g) {
        this.setValue(this.value);
        this.evt && this.report(this.evt, c, d, g);
      },
      _getByValue: function (a) {
        return a || [];
      },
      _getByItems: function (a) {
        return a || [];
      },
      _setItems: function (a, c) {
        c && this._innerSetText();
      },
      setItems: function (a) {
        this.set("items", a);
        return this;
      },
      fieldValueSplit: null,
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Mixin.ResizeEvt" });
sjs.using("Core5.DomEvent.onmouseover").define(function () {
  return {
    regUIObj: !0,
    " s-mouseover": "resize",
    onResize: function () {
      this._doResize && this._resize();
    },
    _resize: function (d) {
      var a = this.jq().width(),
        c = this.jq().height();
      if (d || a != this._jqWidth || c != this._jqHeight)
        return (this._jqWidth = a), (this._jqHeight = c), this._doResize(a, c);
    },
    renderResizeWait: 500,
    _render: function () {
      this.$base();
      if (this._doResize) {
        var d = this;
        window.setTimeout(function () {
          d.onResize();
        }, this.renderResizeWait);
      }
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Mixin.Command" });
sjs.using("Core5.Util.StrFn").define(function () {
  return {
    setValue: function (d) {
      var a;
      a =
        0 == d.length
          ? this.required
            ? { error: "required" }
            : { value: this.emptyInput }
          : "object" == typeof this.checkInput && this.checkInput.reg
          ? this.checkInput.reg.test(d)
            ? { value: d }
            : {
                error:
                  this.checkInput.msg ||
                  "not match:" + this.checkInput.reg.toString(),
              }
          : this.checkInput(d);
      a.error && !this.errorBack
        ? (this._innerSetError(a.error), this._innerSetText(d))
        : (a.error && this.report("msg", a.error),
          this._innerSetValue(a.error ? this.value : a.value));
      return this;
    },
    required: !1,
    checkInput: function (d) {
      return { value: d };
    },
    emptyInput: null,
    _innerSetError: function (d) {
      this.set("error", d);
      this.set("value", null);
      this.errEvt && this.report(this.errEvt, this.error);
    },
    _innerSetValue: function (d) {
      this.set("error", null);
      this.set("value", d);
    },
    _setError: function (d, a) {
      a && (this.setClass("s-input-error", d), this.attr("title", d || null));
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.CellMerge" });
sjs.using("Core5.Util.DataFn").define(function (d) {
  return {
    _grid: function (a, c) {
      this._cellMergeTmpData = {};
      if (c && c.length)
        for (var b = 0; b < a.length; b++) {
          var f = a[b];
          if (f.mergeByFields && "string" != typeof f.mergeByFields) {
            var e = f.mergeId || f.fieldNo;
            if (e) {
              for (
                var f = d.levelRows(c, [f.mergeByFields]), g = {}, i = 0;
                i < f.length;
                i++
              )
                g[f[i].rowIndex] = f[i].items.length;
              this._cellMergeTmpData[e] = g;
            }
          }
        }
      return this.$base(a, c);
    },
    rightScrollHideTr: !1,
    noTrOver: !0,
    _fillFormMixin: function (a) {
      this.$base(a);
      a.push({
        _td: function (a, b, d, e, g, i) {
          var b = this.$base(a, b, d, e, g, i),
            h;
          "string" == typeof a.mergeByFields
            ? (h = a.mergeByFields)
            : a.mergeByFields && (h = a.mergeId || a.fieldNo);
          h &&
            this.parent._cellMergeTmpData[h] &&
            ((a = this.parent._cellMergeTmpData[h][e])
              ? 1 < a && (b[" rowspan"] = a)
              : (b = ""));
          return b;
        },
      });
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Table.AddRemove" });
sjs.using("Core5.Widget.Button").define(function (d) {
  return {
    regUIObj: !0,
    setFields: function (a, c) {
      this.$base(
        [
          {
            prompt: {
              $extend: d,
              icon: "plus",
              regUIObj: !1,
              " title": "add one item",
              " s-click": "addItem",
            },
            noGridPrompt: !0,
            noResize: !0,
            $extend: d,
            icon: "minus",
            " title": "remove this item",
            evt: "removeItem",
            width: 30,
          },
        ].concat(a),
        c
      );
    },
    onRemoveItem: function (a) {
      this.remove("items", a.parent.item);
      this._resize(!0);
    },
    defaultAddItem: function () {
      return {};
    },
    onAddItem: function () {
      this.add("items", this.defaultAddItem());
      this._resize(!0);
    },
    clickLastAutoAdd: !1,
    onClickLineForm: function (a) {
      a = a._bindsBack.item.backField.split(".")[1];
      this.clickLastAutoAdd &&
        a == this.items.length - 1 &&
        this.add("items", this.defaultAddItem());
      this.clickLineEvt && this.report(this.clickLineEvt, a);
    },
    _fillFormMixin: function (a) {
      this.$base(a);
      a.push({ regUIObj: !0, " s-click": "clickLineForm" });
    },
  };
});
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.WeekPicker" });
sjs
  .loadCss("Core5.Widget.WeekPicker")
  .using("Core5.Widget.DatePicker")
  .using("Core5.Util.DateFn")
  .define(function (d, a) {
    return {
      $extend: d,
      showWeek: !0,
      _dpTd: function (a, b, d, e, g) {
        a = this.$base(a, b, d, e, g);
        a[" s-overClass"] = null;
        a["-s-dp-select"] = null;
        a[" s-click"] = null;
        a[" day"] = null;
        return a;
      },
      _dpTr: function (c, b, d, e, g, i, h) {
        d = this.$base(c, b, d, e, g, i, h);
        d[" s-overClass"] = "s-wp-tr-over";
        c = 7 * c + 1 - b + 1;
        c = 0 >= c ? 1 : c;
        c = 10 > c ? "0" + c : "" + c;
        b = a.getWeek(e + c).join(",");
        d["-s-wp-tr-select"] = this._week == b;
        d[" week"] = b;
        d[" day"] = e + c;
        d[" s-click"] = "setDay";
        return d;
      },
      set: function (c, b, d) {
        "day" == c
          ? ((c = ""), b && (c = a.getWeek(b).join(",")), this.set("_week", c))
          : this.$base(c, b, d);
      },
      _set_week: function (c, b) {
        var d = c ? c.substr(0, 6) : a.getThisMonth();
        b &&
          this.isRender() &&
          this.jq(".s-dp-show").html(this._week || "&nbsp;");
        d != this._yymm
          ? this.set("_yymm", d)
          : this.isRender() &&
            b &&
            (this.jq(".s-wp-tr-select").removeClass("s-wp-tr-select"),
            this.jq("[week='" + c + "']").addClass("s-wp-tr-select"));
      },
      _reportDayEvt: function () {
        this.evt && this.report(this.evt, this._week);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Tree2" });
sjs
  .loadCss("Core5.Widget.Tree")
  .using("Core5.Component")
  .using("Core5.Util.DataFn")
  .using("Core5.Html.Tag")
  .using("Core5.Util.Service")
  .using("jQuery")
  .define(function (d, a, c, b, f) {
    return {
      $extend: d,
      init: function () {
        this.$base();
        this.rootID = "undefined" == typeof this.rootID ? "0" : this.rootID;
        this._loaded = {};
        this._data = {};
      },
      _render: function () {
        this.$base();
        this.initStart && this.loadSubItems(this.rootID);
      },
      inner: "<i zh='\u8f09\u5165\u4e2d'>Loading</i>...",
      nodeInner: function (a, b) {
        var c = !0;
        this.leafField &&
          (c =
            "function" == typeof this.leafField
              ? this.leafField.call(this, b)
              : "undefined" == typeof this.leafValue
              ? b[this.leafField]
              : b[this.leafField] !== this.leafValue);
        a.push(this.getNode(b, c));
        c && a.push(this.getNodeBody(b[this.keyField]));
      },
      getNode: function (a, b) {
        var c = a[this.keyField];
        this._data[c] = a;
        return {
          " s-node-key": c,
          " s-node-expand": b ? "0" : "-1",
          "-s-tree-title": !0,
          "-s-tree-selected":
            "undefined" != typeof this.selected &&
            a[this.keyField] == this.selected,
          "-s-tree-title-noplus": this.noPlusIcon,
          inner: [
            !this.noPlusIcon && b ? this._getPlusIcon() : "",
            this._getIcon(a),
            {
              "-s-tree-title-text": !0,
              " s-click": "clickTitle",
              inner:
                "function" == typeof this.textField
                  ? this.textField.call(this, a)
                  : a[this.textField],
            },
          ],
        };
      },
      getNodeBody: function (a) {
        return {
          "-s-tree-body": !0,
          " s-body-key": a,
          inner: "",
          ";display": "none",
        };
      },
      _getPlusIcon: function () {
        return {
          "-icon": !0,
          "-s-tree-plus-icon": !0,
          " s-click": "clickPlusIcon",
          "-icon-plus": !0,
          inner: "",
        };
      },
      _getIcon: function (a) {
        if (this.icon || this.iconField) {
          var b = {
            "-icon": !0,
            "-s-tree-icon": !0,
            " s-click": "clickIcon",
            inner: "&nbsp",
          };
          b[
            "-icon-" +
              (this.iconField
                ? "function" == typeof this.iconField
                  ? this.iconField.call(this, a)
                  : a[this.iconField]
                : this.icon)
          ] = !0;
          return b;
        }
        return "";
      },
      onClickIcon: function (a) {
        this.onClickTitle(a);
      },
      onClickTitle: function (a) {
        !this.noPlusIcon ? this.clickTitle(a) : this.onClickPlusIcon(a);
      },
      clickTitle: function (a) {
        if (this.selectEvt) {
          var b = a.parent().attr("s-node-key"),
            c = this.selected;
          this.set("selected", b);
          this.report(this.selectEvt, b, c, this.getData(b), a);
        } else
          this.clickEvt && this.report(this.clickEvt, b, this.getData(b), a);
      },
      regUIObj: !0,
      onClickPlusIcon: function (a) {
        var b = a.parent(),
          c = b.attr("s-node-key"),
          b = b.attr("s-node-expand");
        "-1" == b
          ? this.clickTitle(a)
          : "1" == b
          ? this.doExpand(c, !1)
          : this._loaded[c]
          ? this.doExpand(c, !0)
          : this.loadSubItems(c);
      },
      nodeJq: function (a) {
        return this.jq("[s-node-key='" + a + "']");
      },
      nodeBodyJq: function (a) {
        return a == this.rootID
          ? this.jq()
          : this.jq("[s-body-key='" + a + "']");
      },
      doExpand: function (a, b) {
        var c = this.jq("[s-node-key='" + a + "']").attr(
          "s-node-expand",
          b ? "1" : "0"
        );
        if (!this.noPlusIcon) {
          var d = b ? "plus" : "minus",
            f = b ? "minus" : "plus";
          c.find(".s-tree-plus-icon")
            .removeClass("icon-" + d)
            .addClass("icon-" + f);
        }
        this.jq("[s-body-key='" + a + "']").css(
          "display",
          b ? "block" : "none"
        );
        return this;
      },
      _setSelected: function (a, b, c) {
        this.isRender() &&
          (this.jq("[s-node-key='" + c + "']").removeClass("s-tree-selected"),
          this.jq("[s-node-key='" + a + "']").addClass("s-tree-selected"));
      },
      setSubItems: function (a, b) {
        if ("string" == typeof b)
          this.nodeBodyJq(a).html(b),
            this.nodeJq(a)
              .find(".s-tree-plus-icon")
              .css("visibility", "visible");
        else if (b && b.length) {
          for (var d = [], f = 0; f < b.length; f++) this.nodeInner(d, b[f]);
          this.nodeBodyJq(a).html(c.itemHtml(d));
          this.nodeJq(a).find(".s-tree-plus-icon").css("visibility", "visible");
        } else
          this.nodeBodyJq(a).html(""),
            this.nodeJq(a)
              .find(".s-tree-plus-icon")
              .css("visibility", "hidden");
      },
      icon: "list-alt",
      textField: "text",
      keyField: "value",
      loadService: "ClientTool",
      loadMethod: "QueryRows",
      loadSql: "",
      loadArgs: function (a) {
        var b = [this.loadSql || a];
        this.loadSql && b.push({ key: a });
        return b;
      },
      loadSubItems: function (a) {
        this._loaded[a] = !0;
        this.doExpand(a, !0);
        if (a == this.rootID && this.addRootID) {
          var c = {};
          c[this.textField] = this.addRootName;
          c[this.keyField] = this.addRootID;
          this && this.setSubItems && this && this.setSubItems(a, [c]);
          this.loadSubItems(this.addRootID);
        } else
          this.setSubItems(a, "loading..."),
            b.callService(
              this.loadService,
              this.loadMethod,
              this.loadArgs(a),
              this,
              function (b) {
                this && this.setSubItems && this && this.setSubItems(a, b);
              },
              function (b) {
                this &&
                  this.setSubItems &&
                  (delete this._loaded[a],
                  this &&
                    this.setSubItems &&
                    this.setSubItems(
                      a,
                      "<font title='expand to try again' color='red'>" +
                        b.Message +
                        "</font>"
                    ));
              }
            );
      },
      getData: function (a) {
        return this._data[a];
      },
      refreshNode: function (a) {
        if (this._loaded) {
          for (var b = this.getAllChildrenKeys(a), c = 0; c < b.length; c++)
            delete this._loaded[b[c]], delete this._data[b[c]];
          delete this._loaded[a];
          delete this._data[a];
        }
        this.loadSubItems(a);
      },
      getParentKey: function (a) {
        return this.nodeJq(a).parent().attr("s-body-key");
      },
      getChildrenKey: function (a, b) {
        for (
          var c = this.nodeBodyJq(a)
              .children("[s-node-key]")
              .map(function () {
                return f(this).attr("s-node-key");
              })
              .get(),
            d = 0;
          d < c.length;
          d++
        )
          b.push(c[d]);
        return c;
      },
      getAllChildrenKeys: function (a, b) {
        b || (b = []);
        for (var c = this.getChildrenKey(a, b), d = 0; d < c.length; d++)
          this.getAllChildrenKeys(c[d], b);
        return b;
      },
      getAllParentKeys: function (a, b) {
        b || (b = []);
        var c = this.getParentKey(a);
        c && (b.push(c), this.getAllParentKeys(c, b));
        return b;
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Tree3" });
sjs
  .using("Core5.Widget.Tree2")
  .using("Core5.Util.Service")
  .using("Core5.Util.DataFn")
  .define(function (d, a, c) {
    return {
      $extend: d,
      loadSubItems: function (a) {
        this.isRender() && this.doExpand(a, !0);
      },
      _setItems: function () {
        this.setInner(this.treeInner);
      },
      inner: function () {
        return this.treeInner();
      },
      treeInner: function () {
        var a = [],
          c = this.getSubItems(this.rootID);
        if ("string" == typeof c) a.push(c);
        else if (c) for (var d = 0; d < c.length; d++) this.nodeInner(a, c[d]);
        return a;
      },
      getSubItems: function (a) {
        var d = {};
        d[this.refKeyField] = a;
        return (a = c.select(this.items, d)) && a.length ? a : null;
      },
      nodeInner: function (a, c) {
        var d = this.getSubItems(c[this.keyField]),
          g = !!d;
        !g &&
          this.leafField &&
          (g =
            "function" == typeof this.leafField
              ? this.leafField.call(this, c)
              : "undefined" == typepof(this.leafValue)
              ? c[this.leafField]
              : c[this.leafField] !== this.leafValue);
        var i = !0;
        "undefined" != typeof this.expand
          ? (i = this.expand)
          : this.expandField &&
            (i =
              "function" == typeof this.expandField
                ? this.expandField.call(this, c)
                : "undefined" == typepof(this.expandValue)
                ? c[this.expandField]
                : c[this.expandField] !== this.expandValue);
        a.push(this.getNode(c, g, i));
        g && a.push(this.getNodeBody(c[this.keyField], d, i));
      },
      getNode: function (a, c, d) {
        var g = a[this.keyField];
        this._data[g] = a;
        a = {
          " s-node-key": g,
          "-s-tree-title": !0,
          "-s-tree-selected":
            "undefined" != typeof this.selected &&
            a[this.keyField] == this.selected,
          "-s-tree-title-noplus": this.noPlusIcon,
          inner: [
            !this.noPlusIcon && c ? this._getPlusIcon(d) : "",
            this._getIcon(a),
            {
              "-s-tree-title-text": !0,
              " s-click": "clickTitle",
              inner:
                "function" == typeof this.textField
                  ? this.textField.call(this, a)
                  : a[this.textField],
            },
          ],
        };
        c && (a[" s-node-expand"] = d ? "1" : "0");
        return a;
      },
      getNodeBody: function (a, c, d) {
        var g = [];
        if ("string" == typeof c) ret.push(c);
        else if (c) for (var i = 0; i < c.length; i++) this.nodeInner(g, c[i]);
        return {
          "-s-tree-body": !0,
          " s-body-key": a,
          inner: g,
          ";display": d ? "block" : "none",
        };
      },
      _getPlusIcon: function (a) {
        var c = {
          "-icon": !0,
          "-s-tree-plus-icon": !0,
          " s-click": "clickPlusIcon",
          inner: "&nbsp",
        };
        c["-icon-" + ("1" == a ? "minus" : "plus")] = !0;
        return c;
      },
      _getIcon: function (a) {
        if (this.icon || this.iconField) {
          var c = {
            "-icon": !0,
            "-s-tree-icon": !0,
            " s-click": "clickIcon",
            inner: "&nbsp",
          };
          c[
            "-icon-" +
              (this.iconField
                ? "function" == typeof this.iconField
                  ? this.iconField.call(this, a)
                  : a[this.iconField]
                : this.icon)
          ] = !0;
          return c;
        }
        return "";
      },
      loadService: "ClientTool",
      loadMethod: "QueryRows",
      loadSql: "",
      loadArgs: function () {
        return this.loadSql ? [this.loadSql, {}] : [];
      },
      doLoad: function () {
        this.setInner("loading...");
        a.callService(
          this.loadService,
          this.loadMethod,
          this.loadArgs(),
          this,
          function (a) {
            a = a || [];
            if (this.addRootID) {
              var c = {};
              c[this.refKeyField] = this.rootID;
              c[this.textField] = this.addRootName;
              c[this.keyField] = this.addRootID;
              a.push(c);
            }
            this.set("items", a);
          },
          function (a) {
            this.setInner(
              "<font title='expand to try again' color='red'>" +
                a.Message +
                "</font>"
            );
          }
        );
      },
      init: function () {
        this.$base();
        this.initStart && this.doLoad();
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Tree" });
sjs
  .loadCss("Core5.Shp.Icon")
  .loadCss("Core5.Widget.Tree")
  .using("Core5.Component")
  .using("Core5.ListContainer")
  .define(function (d, a) {
    var c = {
      $extend: a,
      itemType: {
        $extend: d,
        regUIObj: !0,
        "-s-tree-title": !0,
        text: "Title Text",
        icon: "list-alt",
        init: function () {
          this.$base();
          this.noPlusIcon && this.addClass("s-tree-title-noplus");
          this.items &&
            this.expand &&
            this.createChild(c, this.treeMixin, this._getTreeBodyCfg());
        },
        _getTreeBodyCfg: function () {
          return {
            treeMixin: this.treeMixin,
            nodeMixin: this.nodeMixin,
            id: "treeBody",
            "-s-tree-body": !0,
            items: this.items,
          };
        },
        inner: function () {
          return [
            this.items && !this.noPlusIcon ? this._getPlusIcon() : "",
            this._getIcon(),
            {
              "-s-tree-title-text": !0,
              " s-click": "clickTitle",
              inner: this.text,
            },
          ];
        },
        _getPlusIcon: function () {
          var a = {
            "-icon": !0,
            "-s-tree-plus-icon": !0,
            " s-click": "clickPlusIcon",
            inner: "&nbsp",
          };
          a["-icon-" + (this.expand ? "minus" : "plus")] = !0;
          return a;
        },
        _getIcon: function () {
          if (this.icon) {
            var a = {
              "-icon": !0,
              "-s-tree-icon": !0,
              " s-click": "clickIcon",
              inner: "&nbsp",
            };
            a["-icon-" + this.icon] = !0;
            return a;
          }
          return "";
        },
        onClickPlusIcon: function () {
          this.setExpand(!this.expand);
        },
        onClickIcon: function () {
          this.onClickTitle();
        },
        onClickTitle: function () {
          this.onClickPlusIcon();
        },
        _setExpand: function (a) {
          this.treeBody ||
            (this.createChild(c, this.treeMixin, this._getTreeBodyCfg()),
            this.treeBody.renderTo("#" + this._domId, this.INSERT_AFTER));
          if (this.isRender() && !this.noPlusIcon) {
            var d = a ? "plus" : "minus",
              e = a ? "minus" : "plus";
            this.jq(".s-tree-plus-icon")
              .removeClass("icon-" + d)
              .addClass("icon-" + e);
          }
          this.treeBody.setVisible(a);
        },
        setExpand: function (a) {
          this.set("expand", a);
          return this;
        },
        getHtml: function () {
          return this.$base() + (this.treeBody ? this.treeBody.getHtml() : "");
        },
        _render: function () {
          this.$base();
          this.treeBody && this.treeBody.render();
        },
        setItems: function (a) {
          this.set("items", a);
          return this;
        },
        _setItems: function (a) {
          this.treeBody && this.treeBody.setItems(a);
        },
        _setText: function (a) {
          this.isRender() && this.jq(".s-tree-title-text").html(a);
        },
        setText: function (a) {
          this.set("text", a);
        },
        _setIcon: function (a, c, d) {
          c &&
            this.isRender() &&
            this.jq(".s-tree-icon")
              .removeClass("icon-" + d)
              .addClass("icon-" + a);
        },
        setIcon: function (a) {
          this.set("icon", a);
        },
      },
      _getItemCfg: function (a) {
        this.nodeMixin && (a.$mixin = a.nodeMixin = this.nodeMixin);
        this.treeMixin && (a.treeMixin = this.treeMixin);
        return a;
      },
    };
    return c;
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Splitter" });
sjs
  .using("Core5.Component")
  .using("Core5.DomEvent.DragMove")
  .define(function (d) {
    return {
      $extend: d,
      regUIObj: !0,
      posKind: "top",
      posItems: [],
      measureItems: [],
      splitBase: 0,
      init: function () {
        this.$base();
        var a = this.posKind;
        this._measureKind = a =
          "top" == a || "bottom" == a ? "height" : "width";
        this._measure = this[a] = this[a] || 5;
        this.css("cursor", "height" == a ? "row-resize" : "col-resize");
        this.attr("s-drag", this._objId);
      },
      overflow: "hidden",
      ";background-color": "#d0d0d0",
      " s-dragStart": "splitStart",
      " s-dragMove": "splitMove",
      " s-dragEnd": "splitEnd",
      ";z-index": "1",
      splitStartActiveDisabled: !0,
      splitMoveActiveDisabled: !0,
      splitEndActiveDisabled: !0,
      onSplitStart: function (a) {
        a.css("background-color", "#888888");
      },
      onSplitMove: function (a, c, b) {
        var c = this.posKind,
          d = "height" == this._measureKind ? 1 : 0;
        if (b[d]) {
          var e = "top" == c || "left" == c ? 1 : -1,
            a = parseInt(a.css(c).replace("px", "")) + b[d] * e,
            b =
              (d ? this.parent.jq().height() : this.parent.jq().width()) -
              this._measure,
            a = Math.min(a, this.splitMax || b, b),
            a = Math.max(a, this.splitMin || 0, 0);
          this.css(c, a + "px");
        }
      },
      adjustSplitItems: function () {
        var a = this.posKind,
          c = parseInt(this.jq().css(a).replace("px", "")),
          b = c + this._measure,
          c = c - this.splitBase,
          d = this.posItems;
        if (d)
          for (var e = 0; e < d.length; e++) {
            var g = this.parent[d[e]];
            g.css(this._measureKind, c + "px");
          }
        if ((c = this.measureItems))
          for (e = 0; e < c.length; e++)
            (g = this.parent[c[e]]), g.css(a, b + "px");
      },
      onSplitEnd: function (a) {
        a.css("background-color", "#d0d0d0");
        this.adjustSplitItems();
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Menu" });
sjs
  .loadCss("Core5.Widget.Menu")
  .using("Core5.Container")
  .using("Core5.Widget.Button")
  .using("Core5.Widget.Input.Toggle")
  .using("Core5.Widget.Input.RadioGroup")
  .using("Core5.Widget.MenuButton")
  .using("Core5.DomEvent.onmouseover")
  .define(function (d, a, c, b, f) {
    function e(a) {
      for (var a = a.inner, b = 0; b < a.length; b++)
        if (a[b].menuButton) {
          var c = a[b].pop;
          c && (e(c), c.hide());
        }
    }
    var g = {
      button: {
        $extend: a,
        "-s-menu-btn": !0,
        " s-overClass": "s-menu-btn-over",
        " s-downClass": null,
      },
      toggle: {
        $extend: c,
        "-s-tgl": !1,
        "-s-menu-btn": !0,
        " s-overClass": "s-menu-tgl-over",
        toggleClass: "s-menu-tgl-checked",
      },
      group: {
        $extend: b,
        _getItemCfg: function (a, b) {
          var c = this.$base(a, b);
          c["-s-tgl"] = !1;
          c["-s-menu-btn"] = !0;
          c[" s-overClass"] = "s-menu-tgl-over";
          c.toggleClass = "s-menu-tgl-checked";
          return c;
        },
      },
      menu: {
        $extend: f,
        "-s-menu-btn": !0,
        " s-downClass": !1,
        " s-overClass": "s-menu-btn-over",
        " s-mouseover": "overMenuItem",
        " s-mouseout": "outMenuItem",
        showPos: "right",
        rightIcon: "chevron-right",
        onOverMenuItem: function (a, b) {
          this.showPop();
          b.stopPropagation();
        },
        onOutMenuItem: function (a, b, c) {
          a = !0;
          this.pop &&
            c &&
            ((b = this.pop._objId),
            c[0] == this.pop.jq()[0]
              ? (a = !1)
              : c.parents("[s-objId='" + b + "']").length && (a = !1));
          a && this.hidePop();
        },
      },
    };
    return {
      $extend: d,
      "-s-menu": !0,
      _initInnerItem: function (a, b) {
        if ("-" == a) return '<div class="s-menu-split">&nbsp;</div>';
        a.$extend = a.$extend || g[a.type || "button"];
        return this.$base(a, b);
      },
      innerHtml: function (a) {
        a.push("<div class='s-menu-v-split'></div>");
        this.$base(a);
      },
      regUIObj: !0,
      " s-mouseover": "hideMenuBtnMenu",
      onHideMenuBtnMenu: function () {
        e(this);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.Widget.Loading" });
sjs
  .loadCss(".Loading")
  .using("Core5.Cls")
  .using("Core5.Component")
  .using("Core5.Util.EventManager")
  .using("Core5.Util.Lang")
  .using("Core5.DomEvent.onmouseover", !0)
  .using("jQuery")
  .define(function (d, a, c, b, f) {
    d = d.create({
      $extend: a,
      "-loading-ui": !0,
      inner: [
        {
          "-loading-ui-wait": !0,
          inner: [
            {
              tag: "img",
              tagNoInner: !0,
              " src":
                (sjs.baseFolder || sjs.getDefaultFolder() || ".") +
                "/Image/Core5/wait.gif",
            },
            { "-info": !0, inner: "&nbsp;" },
          ],
        },
        { "-loading-clear-div": !0, inner: "&nbsp;" },
      ],
      regUIObj: !0,
      _loadingCount: 0,
      _totalOKCount: 0,
      _totalErrCount: 0,
      loading: function () {
        this._loadingCount++;
        this.jq(".info").html(
          "<i en='Loading'>\u8f09\u5165\u4e2d</i>..." +
            (1 < this._loadingCount
              ? "<b title='total:" +
                this._loadingCount +
                "'>(" +
                this._loadingCount +
                ")</b>"
              : "")
        );
        this.jq(".loading-ui-wait")
          .stop(!0, !0)
          .css("opacity", 1)
          .show()
          .delay(1e3)
          .animate({ opacity: 0.8 });
      },
      loadInfo: function (a, c, d) {
        var h = a;
        d ||
          (a ? this._totalOKCount++ : this._totalErrCount++,
          this._loadingCount--,
          0 > this._loadingCount && (this._loadingCount = 0),
          1 < this._loadingCount
            ? this.jq(".info b").html(
                "<b title='total:" +
                  this._loadingCount +
                  "'>(" +
                  this._loadingCount +
                  ")</b>"
              )
            : this.jq(".info b").remove(),
          !this._loadingCount &&
            this.jq(".loading-ui-wait").stop(!0, !0).hide(),
          a &&
            ((h = f("body").width()),
            f("<div class='load-ok-item'>&nbsp;</div>")
              .appendTo("body")
              .animate(
                { right: h, width: h / 2, opacity: 0.2 },
                500,
                "swing",
                function () {
                  f(this).remove();
                }
              )),
          (h = a ? "ok" : "err"));
        c &&
          ((a = []),
          a.push("<div class='load-info-item load-" + h + "-msg"),
          a.push("' pin-status='pin'>"),
          a.push(
            "<div s-click='pinMsg' title='pin this message(no hide automatically)' class='load-icon-pin'>&nbsp;</div>"
          ),
          a.push(c),
          a.push("</div>"),
          f(b.parseRenderHtml(a.join("")))
            .insertAfter(this.jq(".loading-clear-div"))
            .delay(3e3)
            .fadeOut(!d ? 2e3 : 100, function () {
              f(this).remove();
            }));
      },
      " s-mouseover": "overMsg",
      " s-mouseout": "outMsg",
      onOverMsg: function () {
        this.jq(".load-info-item[pin-status='pin']")
          .stop(!0, !1)
          .css("opacity", 1)
          .show();
      },
      onOutMsg: function () {
        this.jq(".load-info-item[pin-status='pin']")
          .delay(2e3)
          .fadeOut(2e3, function () {
            f(this).remove();
          });
      },
      onPinMsg: function (a) {
        "pin" == a.parent().attr("pin-status")
          ? (a.parent().addClass("load-err-msg-pin").stop(!0, !0).show(),
            a.parent().attr("pin-status", "close"),
            a.attr("title", "close this message"))
          : a.parent().remove();
      },
      onUsingJs: function () {
        this.loading();
      },
      onUsingJsOK: function () {
        this.loadInfo(!0);
      },
      onUsingJsErr: function (a, b) {
        this.loadInfo(!1, b);
      },
      onCallService: function (a, b) {
        this.loading("call service:" + (b.push ? b[0].service : b.service));
      },
      onCallServiceOK: function (a, b, c, d, f, k, l) {
        a = null;
        l && l.push && 1 < l.length && "LOADING_MSG" == l[l.length - 2]
          ? ((a = l[l.length - 1]),
            "function" == typeof a && (a = a.call(k, b, l)))
          : l &&
            l.push &&
            0 < l.length &&
            "RETURN_MSG" == l[l.length - 1] &&
            (a = b.Result.replace(/\n/g, "<br>"));
        this.loadInfo(!0, a);
      },
      onCallServiceErr: function (a, b, c, d, f, k, l) {
        a = b.Message.replace(/\n/g, "<br>");
        l &&
          l.push &&
          0 < l.length &&
          "object" == typeof l[l.length - 1] &&
          l[l.length - 1] &&
          "function" == typeof l[l.length - 1].getErrMsg &&
          (a = l[l.length - 1].getErrMsg(a));
        this.loadInfo(!1, a);
      },
      onDisplayLoadingMsg: function (a, b, c) {
        this.loadInfo(b, c, !0);
      },
    });
    c.subscribe(d);
    return d;
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.YT.Taskbar" });
sjs
  .loadCss("Core5.Shp.Icon")
  .loadCss("Core5.YT.Taskbar")
  .using("Core5.Component")
  .using("Core5.ListContainer")
  .using("Core5.Html.Tag")
  .using("jQuery")
  .using("Core5.Widget.Mixin.Pop")
  .using("Core5.DomEvent.onmouseclass")
  .using("Core5.DomEvent.onmouseover")
  .define(function (d, a, c, b, f) {
    return {
      $extend: a,
      $mixin: [f],
      itemType: {
        $extend: d,
        "-yt-taskbar-item": !0,
        " s-overClass": "yt-taskbar-item-over",
        " s-downClass": "yt-taskbar-item-down",
        " s-click": "clickItem",
        innerHtml: function (a) {
          this.closable
            ? a.push(
                c.itemHtml(
                  [
                    this.inner,
                    {
                      "-yt-taskbar-close": !0,
                      " s-overClass": "yt-taskbar-close-over",
                      "-icon": !0,
                      "-icon-blue": !0,
                      "-icon-remove": !0,
                      " s-click": "tabClose",
                      " title": "close this",
                    },
                  ],
                  this
                )
              )
            : this.$base(a);
        },
      },
      regUIObj: !0,
      "-yt-taskbar": !0,
      innerHtml: function (a) {
        var b = this.inner;
        b.push("<div class='yt-taskbar-clearfix'></div>");
        a.push(
          c.itemHtml(
            [
              { "-yt-taskbar-con": !0, inner: b },
              {
                "-yt-taskbar-down": !0,
                " s-overClass": "yt-taskbar-down-over",
                " s-click": "tabShowAll",
                " title": "show all tabs' title",
                inner: { "-icon": !0, "-icon-chevron-down": !0 },
                ";display": "none",
              },
            ],
            this
          )
        );
      },
      _dyRenderItem: function (a) {
        this.renderItem(a, this.INSERT_BEFORE, ".yt-taskbar-clearfix");
      },
      _getItemCfg: function (a) {
        return a;
      },
      _initItem: function (a, b) {
        var c = this.$base(a, b),
          d = c.taskItemIndex;
        c.attr("s-taskitem-index", d);
        this._taskItems = this._taskItems || {};
        return (this._taskItems[d] = c);
      },
      activeItem: function (a) {
        this._taskItems[a] &&
          this._taskItems[a].addClass &&
          this._taskItems[a].addClass("yt-taskbar-current");
        this.pop &&
          this.pop
            .jq("[s-taskitem-index='" + a + "']")
            .addClass("yt-taskbar-current");
        this._doResize();
      },
      deActiveItem: function (a) {
        this._taskItems[a] &&
          this._taskItems[a].removeClass &&
          this._taskItems[a].removeClass("yt-taskbar-current");
        this.pop &&
          this.pop
            .jq("[s-taskitem-index='" + a + "']")
            .removeClass("yt-taskbar-current");
      },
      addItem: function (a) {
        this._itemSeed = this._itemSeed || 0;
        a.taskItemIndex =
          "undefined" != typeof a.taskItemIndex && null !== a.taskItemIndex
            ? a.taskItemIndex
            : this._itemSeed++;
        this.add("items", a);
        this._doResize();
        return a.taskItemIndex;
      },
      removeItem: function (a) {
        for (var b = -1, c = 0; c < this.items.length; c++)
          if (this.items[c].taskItemIndex == a) {
            b = c;
            break;
          }
        0 <= b &&
          (this.removeAt("items", b),
          this._doResize(),
          this.pop && this.pop.jq("[s-taskitem-index='" + a + "']").remove());
        return 0 <= b;
      },
      onTabClose: function (a, b) {
        this.closeEvt &&
          this.report(
            this.closeEvt,
            (a._objId ? b : a).parent().attr("s-taskitem-index")
          );
        a._objId && this.pop.show();
      },
      onClickItem: function (a, b, c) {
        this.clickEvt &&
          this.report(
            this.clickEvt,
            (a._objId ? b : a).attr("s-taskitem-index"),
            a._objId ? c : b
          );
        a._objId && this.pop.show();
      },
      popType: { $extend: d, "-yt-taskbar-menu": !0 },
      _getPosJq: function () {
        return this.jq(".yt-taskbar-down");
      },
      _getPop: function (a) {
        a = this.$base(a);
        a.jq().html(this.jq(".yt-taskbar-con").html());
        a.jq("[s-taskitem-index]").show();
        return a;
      },
      onTabShowAll: function () {
        this.showPop();
      },
      " s-mouseover": "resize",
      onResize: function () {
        this._resize();
      },
      _resize: function (a) {
        var b = this.jq().width(),
          c = this.jq().height();
        if (a || b != this._jqWidth || c != this._jqHeight)
          return (this._jqWidth = b), (this._jqHeight = c), this._doResize();
      },
      _doResize: function () {
        this._checkTabMustShow();
        this._checkDownIconShow();
      },
      _render: function () {
        this.$base();
        var a = this;
        window.setTimeout(function () {
          a._doResize();
        }, 500);
      },
      _checkDownIconShow: function () {
        var a = this.jq(".yt-taskbar-con"),
          b = a.find(".yt-taskbar-clearfix").prev();
        if (b.length) {
          var c = a.offset().top,
            b = b.offset().top - c,
            a = a.height();
          if (b >= a || this.jq(".yt-taskbar-con > div:hidden").size()) {
            this.jq(".yt-taskbar-down").show();
            return;
          }
        }
        this.jq(".yt-taskbar-down").hide();
      },
      _checkTabMustShow: function () {
        this.jq(".yt-taskbar-item").show();
        var a = this.jq(".yt-taskbar-con .yt-taskbar-current");
        if (a.size()) {
          var c = this.jq(".yt-taskbar-con").width(),
            d = a.outerWidth(!0),
            f = a.next();
          0 < f.size() && ((f = b(f[0]).outerWidth(!0)), f + d < c && (d += f));
          for (var a = a.prevAll(), f = a.size(), j = 0; j < f; j++) {
            var k = b(a[j]),
              d = d + k.outerWidth(!0);
            if (d > c) {
              for (c = j; c < f; c++) b(a[c]).hide();
              break;
            }
          }
        }
      },
      xitems: [
        { inner: "Hello1" },
        { inner: "Hello2" },
        { inner: "\u8865\u6599\u5355\u7b7e\u6838" },
        { inner: "\u4e2d\u82f1\u6587\u6df7\u5408(Test)" },
        { inner: "\u4e2d\u82f1\u6587\u6df7\u5408(Test)2" },
        { inner: "\u4e2d\u82f1\u6587\u6df7\u5408(Test)3" },
        { inner: "\u4e2d\u82f1\u6587\u6df7\u5408(Test)4" },
        { inner: "\u4e2d\u82f1\u6587\u6df7\u5408(Test)5" },
        { inner: "\u4e2d\u82f1\u6587\u6df7\u5408(Test)6" },
        { inner: "\u4e2d\u82f1\u6587\u6df7\u5408(Test)7" },
        { inner: "\u4e2d\u82f1\u6587\u6df7\u5408(Test)8" },
      ],
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.YT.Window" });
sjs
  .using("Core5.YT.Model")
  .using("Core5.Widget.Ability.DragResize")
  .using("jQuery")
  .define(function (d, a, c) {
    return {
      $extend: d,
      $mixin: [a.right, a.bottom, a.rb, a.left, a.top, a.lb, a.lt],
      minWidth: 300,
      minHeight: 200,
      noClickHide: !0,
      mask: !1,
      init: function () {
        this.$base();
        this._initData("windowMax");
      },
      _getTitleToolsInner: function () {
        var a = this.$base();
        a.unshift(
          this._getTitleToolItem(this.windowMax ? "resize" : "max", "max")
        );
        a.unshift(this._getTitleToolItem("min", "close"));
        return a;
      },
      onMax: function () {
        this.set("windowMax", !this.windowMax);
        this.maxWindowEvt && this.report("maxWindow", this.windowMax);
      },
      onActivateWin: function () {
        this.windowMax || this.$base();
      },
      _getTitleText: function (a) {
        a = this.$base(a);
        a[" s-dblclick"] = "max";
        return a;
      },
      _adjustScrollPosWhenShow: !1,
      maxTop: 0,
      maxHideTitleAndHead: !1,
      _setWindowMax: function (a, d) {
        if (d) {
          var e = c("html").scrollLeft() || c("body").scrollLeft(),
            g = c("html").scrollTop() || c("body").scrollTop();
          a
            ? ((this._beforeMaxWidth = this.width),
              (this._beforeMaxHeight = this.height),
              (this._beforeMaxLeft = this.left - (this._beforeMaxLeft ? e : 0)),
              (this._beforeMaxTop = this.top - (this._beforeMaxTop ? g : 0)),
              this.setWidth("auto"),
              this.setHeight("auto"),
              this.css("bottom", -e),
              this.css("right", -g),
              this.setLeft(e),
              this.setTop(g + this.maxTop),
              this.disableDragMove(),
              !this.dragResizeDisabled && this.disableDragResize(),
              this.maxHideTitleAndHead && this.hideTitleAndHead())
            : (this.css("bottom", "auto"),
              this.css("right", "auo"),
              this._beforeMaxWidth && this.setWidth(this._beforeMaxWidth),
              this._beforeMaxHeight && this.setHeight(this._beforeMaxHeight),
              this._beforeMaxLeft && this.setLeft(this._beforeMaxLeft + e),
              this._beforeMaxTop && this.setTop(this._beforeMaxTop + g),
              this.enableDragMove(),
              this.dragResizeDisabled
                ? this.disableDragResize()
                : this.enableDragResize(),
              this.maxHideTitleAndHead && this.showTitleAndHead());
          this.isRender() &&
            ((e = "yt-panel-title-" + (!a ? "resize" : "max")),
            (g = "yt-panel-title-" + (!a ? "max" : "resize")),
            this.jq("." + e)
              .addClass(g)
              .removeClass(e)
              .removeClass(e + "-over")
              .attr("s-overClass", g + "-over"));
        }
      },
      hideTitleAndHead: function () {
        this.isRender() &&
          (this.jq("> .yt-panel-body > .yt-model-header").hide(),
          this.jq("> .yt-panel-body > .yt-model-logo").hide(),
          this.jq("> .yt-panel-title").hide(),
          this.jq("> .yt-panel-body").css("top", "0"),
          this.header && this.inner[2].css("top", "0"));
      },
      showTitleAndHead: function () {
        this.isRender() &&
          (this.jq("> .yt-panel-body > .yt-model-header").show(),
          this.jq("> .yt-panel-body > .yt-model-logo").show(),
          this.jq("> .yt-panel-title").show(),
          this.jq("> .yt-panel-body").css("top", "24px"),
          this.header && this.inner[2].css("top", "37px"));
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing({ js: "Core5.YT.Tab" });
sjs
  .loadCss("Core5.Shp.Icon")
  .loadCss("Core5.YT.Tab")
  .using("Core5.Container")
  .using("Core5.Html.Tag")
  .using("jQuery")
  .using("Core5.Widget.Mixin.Pop")
  .using("Core5.DomEvent.onmouseclass", !0)
  .using("Core5.Component")
  .using("Core5.DomEvent.onmouseover")
  .define(function (d, a, c, b, f) {
    return {
      $extend: d,
      $mixin: [b],
      "-y-tab": !0,
      regUIObj: !0,
      tabIndex: 0,
      _getTabHeadItem: function (a, b) {
        return {
          "-y-tab-head-item": !0,
          " s-click": "tabClick",
          " s-tab-index": this._objId + "_" + b,
          " s-overClass": "y-tab-item-over",
          inner: a.closable
            ? [
                a.title || "&nbsp;",
                {
                  "-y-tab-close": !0,
                  " s-overClass": "y-tab-close-over",
                  "-icon": !0,
                  "-icon-blue": !0,
                  "-icon-remove": !0,
                  " s-click": "tabClose",
                  " title": "close this",
                },
              ]
            : a.title || "&nbsp;",
          " class": this.tabIndex == b ? "y-tab-head-item-current" : null,
        };
      },
      innerHtml: function (b) {
        var c = this.inner;
        this._tabSeed = c.length;
        this._tabs = {};
        for (var d = [], f = 0; f < c.length; f++)
          d.push(this._getTabHeadItem(c[f], f));
        d.push("<div class='y-tab-clearfix'></div>");
        for (f = 0; f < c.length; f++)
          (this._tabs[f] = c[f]),
            c[f].addClass && c[f].addClass("y-tab-body-item"),
            this.tabIndex == f ? c[f].show() : c[f].hide();
        c = [
          { "-y-tab-body": !0, inner: c },
          { "-y-tab-head": !0, inner: { "-y-tab-head-con": !0, inner: d } },
          {
            "-y-tab-down": !0,
            "-icon": !0,
            "-icon-chevron-down": !0,
            " s-overClass": "y-tab-down-over",
            " s-click": "tabShowAll",
            " title": "show all tabs' title",
            ";display": this.downButtonAlwaysShow ? "" : "none",
          },
        ];
        c[1]["-head-" + this._domId] = !0;
        b.push(a.itemHtml(c, this));
      },
      _setTabIndex: function (a, b, c) {
        b &&
          this.isRender() &&
          (-1 != c &&
            this.jq(
              ".head-" +
                this._domId +
                " [s-tab-index='" +
                this._objId +
                "_" +
                c +
                "']"
            ).removeClass("y-tab-head-item-current"),
          -1 != a &&
            this.jq(
              ".head-" +
                this._domId +
                " [s-tab-index='" +
                this._objId +
                "_" +
                a +
                "']"
            ).addClass("y-tab-head-item-current"),
          -1 != c && this._tabs[c] && this._tabs[c].hide(),
          -1 != a && this._tabs[a] && this._tabs[a].show(),
          this._checkTabMustShow());
        this.tabSwitchEvt && this.report(this.tabSwitchEvt, this._tabs[a], a);
      },
      " s-mouseover": "resize",
      onResize: function () {
        this._resize();
      },
      _resize: function (a) {
        var b = this.jq().width(),
          c = this.jq().height();
        if (a || b != this._jqWidth || c != this._jqHeight)
          return (
            (this._jqWidth = b), (this._jqHeight = c), this._doResize(b, c)
          );
      },
      _doResize: function () {
        this._checkTabMustShow();
        !this.downButtonAlwaysShow && this._checkDownIconShow();
      },
      onVisibleChange: function (a) {
        a && this.isRender() && this._resize(!0);
      },
      _render: function () {
        this.$base();
        var a = this;
        window.setTimeout(function () {
          a && a._doResize && a._doResize();
        }, 500);
      },
      _checkDownIconShow: function () {
        var a = this.jq(".head-" + this._domId + " .y-tab-clearfix").prev();
        if (a.length) {
          var b = this.jq(".head-" + this._domId + " .y-tab-head-con").offset()
              .top,
            a = a.offset().top - b,
            b = this.jq(".head-" + this._domId + " .y-tab-head-con").height();
          if (
            a >= b ||
            this.jq(
              ".head-" + this._domId + " .y-tab-head-con > div:hidden"
            ).size()
          ) {
            this.jq("> .y-tab-down").show();
            return;
          }
        }
        this.jq("> .y-tab-down").hide();
      },
      _checkTabMustShow: function () {
        this.jq(".head-" + this._domId + " [s-tab-index]")
          .not("[s-tab-hide='1']")
          .show();
        var a = this.jq(
          ".head-" +
            this._domId +
            " [s-tab-index='" +
            this._objId +
            "_" +
            this.tabIndex +
            "']"
        );
        if (a.size()) {
          var b = this.jq(".head-" + this._domId + " .y-tab-head-con").width(),
            d = a.outerWidth(!0),
            f = a.next().not("[s-tab-hide='1']");
          0 < f.size() && ((f = c(f[0]).outerWidth(!0)), f + d < b && (d += f));
          for (
            var a = a.prevAll().not("[s-tab-hide='1']"), f = a.size(), j = 0;
            j < f;
            j++
          ) {
            var k = c(a[j]),
              d = d + k.outerWidth(!0);
            if (d > b) {
              for (b = j; b < f; b++) c(a[b]).hide();
              break;
            }
          }
        }
      },
      onTabClick: function (a, b) {
        var c = (a._objId ? b : a).attr("s-tab-index");
        a._objId &&
          (a
            .jq(".y-tab-head-item-current")
            .removeClass("y-tab-head-item-current"),
          b.addClass("y-tab-head-item-current"));
        c = c.substr(this._objId.length + 1);
        this.set("tabIndex", c);
        this.tabClickEvt && this.report(this.tabClickEvt, this._tabs[c], c);
      },
      onTabClose: function (a, b) {
        var c = (a._objId ? b : a).parent().attr("s-tab-index");
        a._objId && b.parent().remove();
        c = c.substr(this._objId.length + 1);
        this.removeTab(c);
      },
      addTab: function (b) {
        if (this.isRender()) {
          var d = this._tabSeed++,
            f = this._getTabHeadItem(b, d);
          c(a.itemHtml(f)).insertBefore(
            this.jq(".head-" + this._domId + " .y-tab-clearfix")
          );
          b = this._initInnerItem(b, this.inner.length);
          this._tabs[d] = b;
          b.hide();
          this.renderItem(b, !0, ">.y-tab-body");
          this._doResize();
          return d;
        }
      },
      removeTab: function (a) {
        if (this.isRender()) {
          if (this.tabIndex == a) {
            for (var b = -1, c = 0; c < this._tabSeed; c++)
              if (this._tabs[c] && c != a) {
                b = c;
                break;
              }
            this.set("tabIndex", b);
          }
          this.jq(
            ".head-" +
              this._domId +
              " [s-tab-index='" +
              this._objId +
              "_" +
              a +
              "']"
          ).remove();
          this._tabs[a].dispose();
          delete this._tabs[a];
          this._doResize();
        }
      },
      popType: { $extend: f, "-y-tab-menu": !0 },
      _getPosJq: function () {
        return this.jq("> .y-tab-down");
      },
      _getPop: function (a) {
        a = this.$base(a);
        a.jq().html(
          this.jq(".head-" + this._domId + " .y-tab-head-con").html()
        );
        a.jq("[s-tab-index]").not("[s-tab-hide='1']").show();
        return a;
      },
      onTabShowAll: function () {
        this.showPop();
      },
      _getTabIndex: function (a) {
        var b = this._tabs,
          c;
        for (c in b) if (b[c] == a) return c;
        return null;
      },
      hideTabTitle: function (a) {
        var b = this._getTabIndex(this[a]);
        if (b == this.tabIndex) {
          var c = -1,
            d = this._tabs,
            f;
          for (f in d)
            if (!d[f]._tabHide && d[f] != this[a]) {
              c = f;
              break;
            }
          this.set("tabIndex", c);
        }
        this[a]._tabHide = !0;
        this.jq(
          ".head-" +
            this._domId +
            " [s-tab-index='" +
            this._objId +
            "_" +
            b +
            "']"
        )
          .attr("s-tab-hide", "1")
          .hide();
      },
      showTabTitle: function (a) {
        var b = this._getTabIndex(this[a]);
        delete this[a]._tabHide;
        this.jq(
          ".head-" +
            this._domId +
            " [s-tab-index='" +
            this._objId +
            "_" +
            b +
            "']"
        )
          .removeAttr("s-tab-hide")
          .show();
        -1 == this.tabIndex && this.set("tabIndex", b);
      },
    };
  });
sjs._addUsingListAfterDefine();
sjs._setCurrentLoadingUsing(_before_merge_js);
sjs
  .using("Core5.YT.Button")
  .using("Core5.YT.Model")
  .using("Core5.YT.Msg")
  .using("Core5.YT.Panel")
  .using("Core5.YT.Tab")
  .using("Core5.YT.Window")
  .using("Core5.YT.Taskbar")
  .using("Core5.Widget.Button")
  .using("Core5.Widget.DatePicker")
  .using("Core5.Widget.Form")
  .using("Core5.Widget.Grid")
  .using("Core5.Widget.Label")
  .using("Core5.Widget.Loading")
  .using("Core5.Widget.Menu")
  .using("Core5.Widget.MenuButton")
  .using("Core5.Widget.MonthPicker")
  .using("Core5.Widget.Splitter")
  .using("Core5.Widget.Table")
  .using("Core5.Widget.Toolbar")
  .using("Core5.Widget.Tree")
  .using("Core5.Widget.Tree2")
  .using("Core5.Widget.Tree3")
  .using("Core5.Widget.WeekPicker")
  .using("Core5.Widget.YearPicker")
  .using("Core5.Widget.Table.Action")
  .using("Core5.Widget.Table.AddRemove")
  .using("Core5.Widget.Table.CellMerge")
  .using("Core5.Widget.Table.CheckSelect")
  .using("Core5.Widget.Table.ColResizer")
  .using("Core5.Widget.Table.ColAdjust")
  .using("Core5.Widget.Table.FixColumns")
  .using("Core5.Widget.Table.GenRowKey")
  .using("Core5.Widget.Table.RowEvent")
  .using("Core5.Widget.Table.RowIndex")
  .using("Core5.Widget.Table.RowKey")
  .using("Core5.Widget.Table.Select")
  .using("Core5.Widget.Table.Sort")
  .using("Core5.Widget.Mixin.Input")
  .using("Core5.Widget.Mixin.Command")
  .using("Core5.Widget.Mixin.Pop")
  .using("Core5.Widget.Mixin.QueryGen")
  .using("Core5.Widget.Mixin.ResizeEvt")
  .using("Core5.Widget.Input.CheckBox")
  .using("Core5.Widget.Input.RadioBox")
  .using("Core5.Widget.Input.CheckGroup")
  .using("Core5.Widget.Input.Combox")
  .using("Core5.Widget.Input.Command")
  .using("Core5.Widget.Input.DatePicker")
  .using("Core5.Widget.Input.DSelect")
  .using("Core5.Widget.Input.MonthPicker")
  .using("Core5.Widget.Input.RadioGroup")
  .using("Core5.Widget.Input.Select")
  .using("Core5.Widget.Input.SelectList")
  .using("Core5.Widget.Input.Text")
  .using("Core5.Widget.Input.Textarea")
  .using("Core5.Widget.Input.Timebox")
  .using("Core5.Widget.Input.Toggle")
  .using("Core5.Widget.Input.Upload")
  .using("Core5.Widget.Input.DataList")
  .using("Core5.Widget.Input.Formatter.Currency")
  .using("Core5.Widget.Input.Formatter.DateTime")
  .using("Core5.Widget.Input.Formatter.Dic")
  .using("Core5.Widget.Input.Formatter.Item")
  .using("Core5.Widget.Input.Formatter.Items")
  .using("Core5.Widget.Input.Formatter.Percent")
  .using("Core5.Widget.Input.Checker.Number")
  .using("Core5.Widget.Input.Checker.Range")
  .using("Core5.Widget.Ability.Action")
  .using("Core5.Widget.Ability.ActionInfoWin")
  .using("Core5.Widget.Ability.DragMove")
  .using("Core5.Widget.Ability.DragResize")
  .using("Core5.Widget.Ability.DragSelect")
  .using("Core5.Widget.Ability.InputPrompt")
  .using("Core5.Widget.Ability.InputDataList")
  .using("Core5.Widget.Ability.ItemMultipleSelect")
  .using("Core5.Widget.Ability.ItemSelect")
  .using("Core5.Widget.Ability.Movable")
  .using("Core5.Widget.Ability.Pop")
  .using("Core5.Widget.Ability.Resizable")
  .using("Core5.Widget.Ability.TreeSelect")
  .using("Core5.Util.DataFn")
  .using("Core5.Util.DateFn")
  .using("Core5.Util.NumberCal")
  .using("Core5.Util.StrFn")
  .using("Core5.Util.Service")
  .using("Core5.Util.Lang")
  .using("Core5.Util.Tool")
  .using("Core5.Util.EventManager")
  .using("Core5.Layout.AutoFit")
  .using("Core5.Layout.Float")
  .using("Core5.Layout.Form")
  .using("Core5.Layout.Form2")
  .using("Core5.Layout.LabelForm")
  .using("Core5.Layout.Layout")
  .using("Core5.Layout.Split")
  .using("Core5.Layout.TableLayout")
  .using("Core5.Html.Base")
  .using("Core5.Html.CalTableLayout")
  .using("Core5.Html.DatePicker")
  .using("Core5.Html.Grid")
  .using("Core5.Html.GridMixin")
  .using("Core5.Html.Table")
  .using("Core5.Html.TableLayout")
  .using("Core5.Html.Tag")
  .using("Core5.DomEvent.DomEvent")
  .using("Core5.DomEvent.DragMove")
  .using("Core5.DomEvent.DragResize")
  .using("Core5.DomEvent.GetHelper")
  .using("Core5.DomEvent.onchange")
  .using("Core5.DomEvent.onclick")
  .using("Core5.DomEvent.oncontextmenu")
  .using("Core5.DomEvent.oninput")
  .using("Core5.DomEvent.onmouseclass")
  .using("Core5.DomEvent.onmouseover")
  .using("Core5.DomEvent.onresize")
  .using("Core5.DomEvent.PopManager")
  .using("Core5.DomEvent.UIManager")
  .using("Core5.Bind.BindSource")
  .using("Core5.Bind.BindTarget")
  .using("Core5.App.DataList")
  .using("Core5.App.Report")
  .using("Core5.App.DataWindow")
  .using("Core5.App.Pagebar")
  .using("Core5.App.EditGrid")
  .using("Core5.App.Mixin.Prompt")
  .define({});
sjs._loadCss("./Runtime/Core5.All.css?31756899.281538482");
