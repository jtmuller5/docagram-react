(() => {
  "use strict";
  var e = window.ai,
    n = null;
  chrome.runtime.onInstalled.addListener(function () {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: !0 });
  }),
    chrome.runtime.onMessage.addListener(function (t, a, r) {
      return (
        "analyzeText" === t.type &&
          (function (t) {
            return (
              (a = this),
              (r = void 0),
              (o = function () {
                var a, r, i, o, s;
                return (function (e, n) {
                  var t,
                    a,
                    r,
                    i,
                    o = {
                      label: 0,
                      sent: function () {
                        if (1 & r[0]) throw r[1];
                        return r[1];
                      },
                      trys: [],
                      ops: [],
                    };
                  return (
                    (i = { next: s(0), throw: s(1), return: s(2) }),
                    "function" == typeof Symbol &&
                      (i[Symbol.iterator] = function () {
                        return this;
                      }),
                    i
                  );
                  function s(s) {
                    return function (l) {
                      return (function (s) {
                        if (t)
                          throw new TypeError(
                            "Generator is already executing."
                          );
                        for (; i && ((i = 0), s[0] && (o = 0)), o; )
                          try {
                            if (
                              ((t = 1),
                              a &&
                                (r =
                                  2 & s[0]
                                    ? a.return
                                    : s[0]
                                    ? a.throw ||
                                      ((r = a.return) && r.call(a), 0)
                                    : a.next) &&
                                !(r = r.call(a, s[1])).done)
                            )
                              return r;
                            switch (
                              ((a = 0), r && (s = [2 & s[0], r.value]), s[0])
                            ) {
                              case 0:
                              case 1:
                                r = s;
                                break;
                              case 4:
                                return o.label++, { value: s[1], done: !1 };
                              case 5:
                                o.label++, (a = s[1]), (s = [0]);
                                continue;
                              case 7:
                                (s = o.ops.pop()), o.trys.pop();
                                continue;
                              default:
                                if (
                                  !(
                                    (r =
                                      (r = o.trys).length > 0 &&
                                      r[r.length - 1]) ||
                                    (6 !== s[0] && 2 !== s[0])
                                  )
                                ) {
                                  o = 0;
                                  continue;
                                }
                                if (
                                  3 === s[0] &&
                                  (!r || (s[1] > r[0] && s[1] < r[3]))
                                ) {
                                  o.label = s[1];
                                  break;
                                }
                                if (6 === s[0] && o.label < r[1]) {
                                  (o.label = r[1]), (r = s);
                                  break;
                                }
                                if (r && o.label < r[2]) {
                                  (o.label = r[2]), o.ops.push(s);
                                  break;
                                }
                                r[2] && o.ops.pop(), o.trys.pop();
                                continue;
                            }
                            s = n.call(e, o);
                          } catch (e) {
                            (s = [6, e]), (a = 0);
                          } finally {
                            t = r = 0;
                          }
                        if (5 & s[0]) throw s[1];
                        return { value: s[0] ? s[1] : void 0, done: !0 };
                      })([s, l]);
                    };
                  }
                })(this, function (l) {
                  switch (l.label) {
                    case 0:
                      return n
                        ? [3, 2]
                        : [
                            4,
                            e.languageModel.create({
                              systemPrompt:
                                "You are a document analysis expert who creates both written analysis and diagrams.\n      For each document analyze:\n      1. Key concepts and entities\n      2. How they relate to each other\n      3. Important relationships and dependencies\n\n      Then provide TWO parts:\n      PART 1: A written analysis (2-3 paragraphs) explaining the key relationships and concepts found.\n      \n      PART 2: A nomnoml diagram syntax showing these relationships visually using:\n      -> for one-way relationships\n      <-> for two-way relationships\n      -:> for inheritance\n      --:> for implementation\n      \n      Start part 2 with [DIAGRAM] on its own line.\n      Keep diagrams focused with no more than 7-8 entities.\n      Use clear, readable labels.",
                            }),
                          ];
                    case 1:
                      (n = l.sent()), (l.label = 2);
                    case 2:
                      return (
                        (a =
                          "Analyze this text and provide both written analysis and a diagram as specified: ".concat(
                            t.text
                          )),
                        [4, n.prompt(a)]
                      );
                    case 3:
                      return (
                        (r = l.sent()),
                        (i = r.split("[DIAGRAM]")),
                        (o = i[0].trim()),
                        (s = i[1] ? i[1].trim() : ""),
                        chrome.runtime.sendMessage({
                          type: "analysisComplete",
                          analysis: o,
                          diagram: s,
                        }),
                        [2]
                      );
                  }
                });
              }),
              new ((i = void 0) || (i = Promise))(function (e, n) {
                function t(e) {
                  try {
                    l(o.next(e));
                  } catch (e) {
                    n(e);
                  }
                }
                function s(e) {
                  try {
                    l(o.throw(e));
                  } catch (e) {
                    n(e);
                  }
                }
                function l(n) {
                  var a;
                  n.done
                    ? e(n.value)
                    : ((a = n.value),
                      a instanceof i
                        ? a
                        : new i(function (e) {
                            e(a);
                          })).then(t, s);
                }
                l((o = o.apply(a, r || [])).next());
              })
            );
            var a, r, i, o;
          })(t).catch(function (e) {
            chrome.runtime.sendMessage({
              type: "error",
              error: e.message || "Failed to generate analysis",
            });
          }),
        !0
      );
    }),
    chrome.runtime.onSuspend.addListener(function () {
      n && (n.destroy(), (n = null));
    });
})();
