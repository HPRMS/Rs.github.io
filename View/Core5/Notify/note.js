sjs.using("Core5.Cls")
   .using("Core5.Component")
   .using("Core5.Util.EventManager")
   .using("Core5.Util.Lang")
   .using("Core5.DomEvent.onmouseover", !0)
   .using("jQuery")
  .define(function (d, a, c, b,f) {
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
        //debugger
        var i = a;
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
            ((i = f("body").width()),
            f("<div class='load-ok-item'>&nbsp;</div>")
              .appendTo("body")
              .animate(
                { right: i, width: i / 2, opacity: 0.2 },
                500,
                "swing",
                function () {
                  f(this).remove();
                }
              )),
          (i = a ? "ok" : "err"));
        c &&
          ((a = []),
          a.push("<div class='load-info-item load-" + i + "-msg"),
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
      onCallServiceOK: function (a, b, c, d, f, k, m) {
        a = null;
        m && m.push && 1 < m.length && "LOADING_MSG" == m[m.length - 2]
          ? ((a = m[m.length - 1]),
            "function" == typeof a && (a = a.call(k, b, m)))
          : m &&
            m.push &&
            0 < m.length &&
            "RETURN_MSG" == m[m.length - 1] &&
            (a = b.Result.replace(/\n/g, "<br>"));
        this.loadInfo(!0, a);
      },
      onCallServiceErr: function (a, b, c, d, f, k, m) {
        a = b.Message.replace(/\n/g, "<br>");
        m &&
          m.push &&
          0 < m.length &&
          "object" == typeof m[m.length - 1] &&
          m[m.length - 1] &&
          "function" == typeof m[m.length - 1].getErrMsg &&
          (a = m[m.length - 1].getErrMsg(a));
        this.loadInfo(!1, a);
      },
      onDisplayLoadingMsg: function (a, b, c) {
        this.loadInfo(b, c, !0);
      },
     
    });
    c.subscribe(d);
    return d;
  });