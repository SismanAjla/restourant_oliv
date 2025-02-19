! function(a) {
    window.WPHJS = {
        GOOGLE_MAPS_API_KEY: "AIzaSyBVrrJLTmmDoRk5nCE3xglH496gj1Ff-gE",
        childrenTotalHeight: function(e) {
            var t = 0;
            return a(e).find("> *").each(function() {
                t += a(this).outerHeight()
            }), t
        },
        getContainerOuterWidth: function() {
            var e = a('<div class="container"/>').appendTo(a("body")),
                t = e.outerWidth();
            return e.remove(), t
        },
        getContainerInnerWidth: function() {
            var e = a('<div class="container"><div></div></div>').appendTo(a("body")),
                t = e.find("> div").outerWidth();
            return e.remove(), t
        }
    }
}(jQuery),
function(h) {
    "use strict";

    function g(e, t) {
        return e = new Date(e.getFullYear(), e.getMonth(), e.getDate()).valueOf(), ((t = new Date(t.getFullYear(), t.getMonth(), t.getDate()).valueOf()) < e) - (e < t)
    }

    function s(e) {
        return [e.getFullYear(), (e.getMonth() + 1 + "").padStart(2, "0"), (e.getDate() + "").padStart(2, "0")].join("-")
    }

    function p(e) {
        return new Date(e.getFullYear(), e.getMonth(), 1)
    }

    function m(e) {
        return new Date(e.getFullYear(), e.getMonth() + 1, 0)
    }
    var e = function(e) {
            e.version = "0.1.0";

            function l(e) {
                this.message = e, this.toString = function() {
                    return this.constructor.name + ": " + this.message
                }
            }

            function t(e) {
                this.firstWeekDay = e || 0
            }
            t.prototype = {
                constructor: t,
                weekStartDate: function(e) {
                    for (var t = new Date(e.getTime()); t.getDay() !== this.firstWeekDay;) t.setDate(t.getDate() - 1);
                    return t
                },
                monthDates: function(e, t, a, n) {
                    if ("number" != typeof e || e < 1970) throw new l("year must be a number >= 1970");
                    if ("number" != typeof t || t < 0 || 11 < t) throw new l("month must be a number (Jan is 0)");
                    var o = [],
                        i = [],
                        r = 0,
                        s = this.weekStartDate(new Date(e, t, 1));
                    do {
                        for (r = 0; r < 7; r++) i.push(a ? a(s) : s), (s = new Date(s.getTime())).setDate(s.getDate() + 1)
                    } while (o.push(n ? n(i) : i), i = [], s.getMonth() <= t && s.getFullYear() === e);
                    return o
                },
                monthDays: function(e, t) {
                    return this.monthDates(e, t, function(e) {
                        return e.getMonth() === t ? e.getDate() : 0
                    })
                },
                monthText: function(e, a) {
                    var t;
                    void 0 === e && (e = (t = new Date).getFullYear(), a = t.getMonth());
                    return this.monthDates(e, a, function(e) {
                        for (var t = e.getMonth() === a ? e.getDate().toString() : "  "; t.length < 2;) t = " " + t;
                        return t
                    }, function(e) {
                        return e.join(" ")
                    }).join("\n")
                }
            };
            for (var a = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" "), n = 0; n < a.length; n++) t[a[n]] = n;
            return e.Calendar = t, e.Calendar
        }({}),
        t = new Date,
        l = {
            year: t.getFullYear(),
            month: t.getMonth(),
            firstWeekDay: 1,
            dayItemContents: ["month-full", "day"],
            months: [{
                short: "Jan",
                full: "January"
            }, {
                short: "Feb",
                full: "February"
            }, {
                short: "Mar",
                full: "March"
            }, {
                short: "Apr",
                full: "April"
            }, {
                short: "May",
                full: "May"
            }, {
                short: "Jun",
                full: "June"
            }, {
                short: "Jul",
                full: "July"
            }, {
                short: "Aug",
                full: "August"
            }, {
                short: "Sep",
                full: "September"
            }, {
                short: "Oct",
                full: "October"
            }, {
                short: "Nov",
                full: "November"
            }, {
                short: "Dec",
                full: "December"
            }],
            weekdays: [{
                short: "Sun",
                full: "Sunday"
            }, {
                short: "Mon",
                full: "Monday"
            }, {
                short: "Tue",
                full: "Tuesday"
            }, {
                short: "Wed",
                full: "Wednesday"
            }, {
                short: "Thu",
                full: "Thursday"
            }, {
                short: "Fri",
                full: "Friday"
            }, {
                short: "Sat",
                full: "Saturday"
            }]
        };
    h.fn.calendar = function(d) {
        d = h.extend(l, d);
        var c = new e(d.firstWeekDay),
            t = h(this),
            u = new Date(d.year, d.month),
            a = h('<div class="calendar-month-selector"/>').appendTo(t),
            n = h('<div class="calendar-weekdays-container"/>').appendTo(t),
            f = h('<div class="calendar-dates-container"/>').appendTo(t),
            o = h('<input type="date" class="calendar-native-input form-control"/>').appendTo(t);
        d.nativeInputName && o.attr("name", d.nativeInputName), d.maxDate && o.attr("max", s(d.maxDate)), d.minDate && o.attr("min", s(d.minDate));

        function i(e) {
            a.empty().append(h('<button class="btn btn-square btn-light btn-sm prev-month"/>').html('<i class="material-icons">keyboard_arrow_left</i>'), h('<div class="current-month"/>').text(d.months[e.getMonth()].full + " " + e.getFullYear()), h('<button class="btn btn-square btn-light btn-sm next-month"/>').html('<i class="material-icons">keyboard_arrow_right</i>'));
            var t = new Date(e.getFullYear(), e.getMonth() - 1);
            d.minDate && 1 === g(d.minDate, m(t)) && a.find(".prev-month").addClass("disabled"), e = new Date(e.getFullYear(), e.getMonth() + 1), d.maxDate && -1 === g(d.maxDate, p(e)) && a.find(".next-month").addClass("disabled")
        }

        function r(e) {
            f.empty();
            for (var t, a = c.monthDates(e.getFullYear(), e.getMonth()), n = 0; n < a.length; n++)
                for (var o = a[n], i = 0; i < o.length; i++) {
                    var r = o[i],
                        s = ["calendar-date", "weekday-" + (r.getDay() + 1)];
                    switch (l = u, t = 12 * (t = r).getFullYear() + t.getMonth(), ((l = 12 * l.getFullYear() + l.getMonth()) < t) - (t < l)) {
                        case -1:
                            s.push("prev-month");
                            break;
                        case 0:
                            s.push("current-month");
                            break;
                        case 1:
                            s.push("next-month")
                    }
                    0 === g(r, m(r)) ? s.push("last-date-of-month") : 0 === g(r, p(r)) && s.push("first-date-of-month"), d.selectedDay && 0 === g(r, d.selectedDay) && s.push("selected"), (d.maxDate && 1 === g(r, d.maxDate) || d.minDate && -1 === g(r, d.minDate)) && s.push("disabled");
                    var l = h("<div/>", {
                        class: s.join(" ")
                    }).data("date", r).appendTo(f);
                    h("<div/>", {
                        class: "calendar-date-content"
                    }).appendTo(l).append(h.map(d.dayItemContents, function(e) {
                        return "month-full" === e ? h('<div class="month-full"/>').text(d.months[r.getMonth()].full) : "month-short" === e ? h('<div class="month-short"/>').text(d.months[r.getMonth()].short) : "day" === e ? h('<div class="day"/>').text(r.getDate()) : "weekday-full" === e ? h('<div class="weekday-full"/>').text(d.weekdays[r.getDay()].full) : "weekday-short" === e ? h('<div class="weekday-short"/>').text(d.weekdays[r.getDay()].short) : void 0
                    }))
                }
        }
        return i(u),
            function() {
                n.empty();
                for (var e = 0; e < d.weekdays.length; e++) {
                    var t = (e + d.firstWeekDay) % d.weekdays.length;
                    n.append(h('<div class="weekday"/>').text(d.weekdays[t].short))
                }
            }(), r(u), t.on("click", ".calendar-date:not(.disabled)", function() {
                var e = h(this).addClass("selected");
                t.find(".calendar-date").not(e).removeClass("selected"), t.trigger("select-a-date", [e.data("date")]), o.val(s(e.data("date")))
            }), a.on("click", ".prev-month:not(.disabled), .next-month:not(.disabled)", function() {
                var e = h(this);
                u = e.hasClass("prev-month") ? new Date(u.getFullYear(), u.getMonth() - 1) : new Date(u.getFullYear(), u.getMonth() + 1), i(u), r(u)
            }), o.on("change", function() {
                var e = new Date(this.value);
                d.selectedDay = new Date(e.getFullYear(), e.getMonth(), e.getDate()), u = new Date(d.selectedDay.getFullYear(), d.selectedDay.getMonth()), i(u), r(u), t.trigger("select-a-date", [d.selectedDay])
            }), t.trigger("init"), this
    }, h(".calendar").calendar({
        minDate: t,
        maxDate: new Date(t.getFullYear(), t.getMonth(), t.getDate() + 90),
        selectedDay: new Date,
        dayItemContents: ["month-short", "day"]
    }).on("select-a-date", function(e, t) {
        console.log(t)
    })
}(jQuery),
function(r) {
    "use strict";

    function e(e) {
        var t, a = WPHJS.getContainerInnerWidth(),
            n = r(window).outerWidth(),
            e = "ready" === e.type && "flickity" === e.namespace,
            a = n < 576 ? 0 : (n - a) / 2;
        r(this).find(".card-slider-item:first").css("padding-left", a), r(this).find(".card-slider-item:last").css("padding-right", a), r(this).css({
            marginLeft: -1 * a,
            marginRight: -1 * a
        }), r(this).data("flickity") ? r(this).flickity("resize") : e && (t = this, setTimeout(function() {
            r(t).flickity("resize")
        }, 0))
    }
    var t = r(".card-slider");
    t.filter(".card-slider-viewport").on("ready.flickity", e), r(window).on("resize", function() {
        t.filter(".card-slider-viewport").each(e)
    }), r('[data-target][data-action][data-toggle="card-slider"]').each(function() {
        var n = r(this),
            t = r(n.data("target")),
            o = n.data("action");
        "prevSlide" === o ? n.on("click", function(e) {
            e.preventDefault(), t.flickity("previous")
        }) : "nextSlide" === o && n.on("click", function(e) {
            e.preventDefault(), t.flickity("next")
        }), t.on("ready.flickity change.flickity", function() {
            var a = this;
            setTimeout(function() {
                var e = r(a).data("flickity"),
                    t = e.slides.length ? e.slides.length - 1 : 0,
                    t = "prevSlide" === o ? 0 : t;
                n.toggleClass("disabled", !e.options.wrapAround && e.selectedIndex === t), n.prop("disabled", !e.options.wrapAround && e.selectedIndex === t)
            }, 0)
        })
    }), r('[data-target][data-control="card-slider-dots"]').each(function() {
        var i = r(this);
        r(i.data("target")).on("ready.flickity change.flickity", function() {
            var o = this;
            setTimeout(function() {
                var t = r(o).data("flickity");
                i.html('<ul class="card-slider-dots"></ul>');
                for (var e = i.find(".card-slider-dots"), a = 0; a < t.slides.length; a++) {
                    var n = r('<li class="card-slider-dot"/>');
                    n.append(r('<a href="#"/>').data("index", a).text(a + 1)), a === t.selectedIndex && n.addClass("card-slider-dot-active"), e.append(n)
                }
                i.find("a").on("click", function(e) {
                    e.preventDefault(), t.select(r(this).data("index"))
                })
            }, 0)
        })
    }), t.each(function() {
        r(this).flickity(r.extend({
            imagesLoaded: !0,
            watchCSS: !0,
            groupCells: !0,
            percentPosition: !1,
            cellAlign: "left",
            sellSelector: ".card-slider-item",
            prevNextButtons: !1,
            pageDots: !1,
            contain: !0
        }, r(this).data("options")))
    })
}(jQuery),
function(n) {
    "use strict";
    var o = n(".custom-checkbox, .custom-radio");
    o.each(function() {
        var t = n(this),
            e = "custom-" + t.attr("type"),
            a = n("<div/>", {
                class: e + "-wrap"
            }),
            e = n("<div/>", {
                class: e + "-presenter"
            });
        t.wrap(a), (a = t.parent()).append(e), t.on("refresh", function(e) {
            e.stopPropagation(), t.prop("checked") ? a.addClass("checked") : a.removeClass("checked")
        }), t.on("change", function() {
            o.trigger("refresh")
        }), e.on("click", function(e) {
            e.stopPropagation(), "radio" === t.attr("type") ? t.prop("checked", !0) : t.prop("checked", !t.prop("checked")), t.trigger("change")
        }), t.trigger("change")
    })
}(jQuery),
function(e) {
    "use strict";
    e(".faq").on("hide.bs.collapse", function() {
        e(this).removeClass("faq-open")
    }).on("show.bs.collapse", function() {
        e(this).addClass("faq-open")
    })
}(jQuery),
function(n) {
    "use strict";
    n(".form-collapsible-section").each(function() {
        var e = n(this),
            t = e.find(".form-collapsible-section-head"),
            a = e.find(".form-collapsible-section-body");
        t.on("click", function() {
            a.collapse("toggle")
        }), a.addClass("collapse"), "true" === e.attr("aria-expanded") && a.addClass("show")
    }).on("hide.bs.collapse", function() {
        n(this).attr("aria-expanded", !1)
    }).on("show.bs.collapse", function() {
        n(this).attr("aria-expanded", !0)
    })
}(jQuery),
function(a) {
    "use strict";
    var t = [];
    a(".form-selectable-label[data-input]").each(function() {
        var e = a(this).attr("data-input"),
            e = document.querySelector(e);
        e && t.push(e)
    }).on("click", function(e) {
        var t = a(this).attr("data-input"),
            t = a(t);
        t && (t.is('[type="radio"]') ? t.prop("checked", !0) : t.prop("checked", !t.prop("checked")), t.trigger("change"))
    });

    function n() {
        var e = a(this),
            t = e.closest(".form-selectable-label");
        e.prop("checked") ? t.addClass("selected") : t.removeClass("selected")
    }
    a(t).each(n).on("change", function() {
        a(t).trigger("refresh")
    }).on("refresh", function(e) {
        e.stopPropagation(), n.apply(this)
    })
}(jQuery),
function(e) {
    "use strict";
    var t = e(".header"),
        a = t.next(".header-spacing-helper");
    (a = !a.length ? e('<div class="header-spacing-helper"/>').insertAfter(t) : a).css("height", t.outerHeight());

    function n() {
        150 < window.scrollY ? o.addClass("page-scrolled") : o.removeClass("page-scrolled")
    }
    var o = e("body");
    e(window).on("scroll", n), e(n)
}(jQuery),
function(t) {
    "use strict";

    function a(e) {
        return t(e).hasClass("hero-fullscreen") ? function() {
            e.each(function() {
                var e;
                t(this).css("min-height", (e = this, Math.max(t(window).outerHeight() - t(e).position().top, WPHJS.childrenTotalHeight(t(e).find(".hero-foreground"))) + "px"))
            })
        } : function() {}
    }
    t(".hero").each(function() {
        var e = t(this);
        e.imagesLoaded(function() {
            e.hasClass("jarallax") ? jarallax(e.get(0), {
                videoSrc: e.attr("data-video"),
                automaticResize: !0,
                onInit: function() {
                    t(a(e)), t(window).on("resize orientationchange", a(e)), e.addClass("hero-bg-ready")
                }
            }) : (t(a(e)), t(window).on("resize orientationchange", a(e)), e.addClass("hero-bg-ready"))
        })
    })
}(jQuery),
function(i) {
    "use strict";
    var e = i(".image-slider");
    e.find(".image-slider-prev, .image-slider-next").on("click", function(e) {
        var t = i(this),
            a = t.closest(".image-slider").find(".image-slider-contents");
        "function" == typeof a.flickity && (e.preventDefault(), t.hasClass("image-slider-prev") && a.flickity("previous"), t.hasClass("image-slider-next") && a.flickity("next"))
    }), e.find(".image-slider-contents").on("ready.flickity change.flickity", function() {
        var a = this,
            e = i(a).closest(".image-slider"),
            n = e.find(".image-slider-prev"),
            o = e.find(".image-slider-next");
        setTimeout(function() {
            var e = i(a).data("flickity"),
                t = e.slides.length ? e.slides.length - 1 : 0;
            n.toggleClass("disabled", 0 === e.selectedIndex).prop("disabled", 0 === e.selectedIndex), o.toggleClass("disabled", e.selectedIndex === t).prop("disabled", e.selectedIndex === t)
        }, 0)
    }), e.find(".image-slider-contents").flickity({
        draggable: !0,
        imagesLoaded: !0,
        watchCSS: !1,
        groupCells: !1,
        percentPosition: !1,
        adaptiveHeight: !0,
        sellSelector: ".image-slider-item",
        prevNextButtons: !1,
        pageDots: !1
    })
}(jQuery), jQuery(window).one("wph.google_maps_loaded", function() {
        "use strict";
        var s, e, o;
        "undefined" != typeof google && void 0 !== google.maps && (e = (s = jQuery)(".gmap"), o = {
            zoom: 14,
            disableDefaultUI: !0,
            openFirstInfobox: !0,
            draggable: !0,
            styles: [{
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#d3d3d3"
                }]
            }, {
                featureType: "transit",
                stylers: [{
                    color: "#808080"
                }, {
                    visibility: "off"
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    visibility: "on"
                }, {
                    color: "#b3b3b3"
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#ffffff"
                }]
            }, {
                featureType: "road.local",
                elementType: "geometry.fill",
                stylers: [{
                    visibility: "on"
                }, {
                    color: "#ffffff"
                }, {
                    weight: 1.8
                }]
            }, {
                featureType: "road.local",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#d7d7d7"
                }]
            }, {
                featureType: "poi",
                elementType: "geometry.fill",
                stylers: [{
                    visibility: "on"
                }, {
                    color: "#ebebeb"
                }]
            }, {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [{
                    color: "#a7a7a7"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#ffffff"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#ffffff"
                }]
            }, {
                featureType: "landscape",
                elementType: "geometry.fill",
                stylers: [{
                    visibility: "on"
                }, {
                    color: "#efefef"
                }]
            }, {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#696969"
                }]
            }, {
                featureType: "administrative",
                elementType: "labels.text.fill",
                stylers: [{
                    visibility: "on"
                }, {
                    color: "#737373"
                }]
            }, {
                featureType: "poi",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "poi",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#d6d6d6"
                }]
            }, {
                featureType: "road",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {}, {
                featureType: "poi",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#dadada"
                }]
            }],
            mapTypeId: "roadmap"
        }, e.each(function() {
            var e = s(this).find(".gmap-embed-inner"),
                t = s(this).find(".gmap-infobox"),
                a = e.data("options"),
                n = parseInt(s(this).find(".gmap-embed").data("parallax-speed")),
                i = s.extend(o, a),
                r = new google.maps.Map(e.get(0), i);
            s(t.get().reverse()).each(function() {
                var e = s(this),
                    t = e.data("latlng").split(" "),
                    t = {
                        lat: parseFloat(t[0]),
                        lng: parseFloat(t[1])
                    };
                void 0 === i.center && r.setCenter(t);
                var a = !1,
                    n = new GoogleMaps_InfoBox_Factory({
                        content: e.html(),
                        maxWidth: 350,
                        boxClass: "gmap-infobox",
                        pixelOffset: new google.maps.Size(57, e.find(".gmap-infobox-header").outerHeight() / 2 * -1),
                        closeBoxURL: "",
                        zIndex: 1,
                        infoBoxClearance: new google.maps.Size(32, 32),
                        enableEventPropagation: !1
                    }),
                    o = new google.maps.Marker({
                        position: t,
                        map: r,
                        icon: {
                            url: "assets/images/map-marker.png",
                            anchor: new google.maps.Point(31, 31),
                            scaledSize: new google.maps.Size(62, 62)
                        }
                    });
                o.addListener("click", function() {
                    a ? n.close() : n.open(r, o), a = !a
                })
            }), 0 !== n && (e.css({
                top: -1 * n / 2,
                bottom: -1 * n / 2
            }), e.jarallax({
                type: "element",
                speed: n.toString() + " 0"
            }))
        }))
    }),
    function(e) {
        "use strict";
        var t;
        e(".gmap").length && ("undefined" == typeof google || void 0 === google.maps ? (t = "https://maps.google.com/maps/api/js?key=" + WPHJS.GOOGLE_MAPS_API_KEY, e.getScript(t, function() {
            e(window).trigger("wph.google_maps_loaded")
        })) : e(window).trigger("wph.google_maps_loaded"))
    }(jQuery),
    function() {
        "use strict";
        jQuery('[data-toggle="popover"]').popover()
    }(),
    function(n) {
        "use strict";
        n(".radio-buttons-group-disabled .btn").addClass("disabled"), n(".radio-buttons-group:not(.radio-buttons-group-disabled)").each(function() {
            var t = n(this),
                a = t.find(".btn");
            a.on("click", function(e) {
                e.preventDefault();
                e = n(this);
                a.removeClass("selected"), e.addClass("selected"), t.trigger("change", e.data("value"))
            })
        })
    }(jQuery),
    function(n) {
        "use strict";
        n(".shuffle-grid").each(function() {
            n(this).data("shufflejs-instance", new Shuffle(this, {
                itemSelector: ".shuffle-grid-item",
                delimiter: ","
            }))
        }).on("set-filter.shufflejs", function(e, t) {
            n(this).closest(".shuffle-grid").data("shufflejs-instance").filter(-1 !== ["all", "*"].indexOf(t) ? Shuffle.ALL_ITEMS : t)
        }), n('.radio-buttons-group[data-toggle="shuffle-grid"][data-target]').on("change", function(e, t) {
            var a = n(this);
            n(a.data("target")).trigger("set-filter.shufflejs", t)
        })
    }(jQuery),
    function(t) {
        "use strict";
        var a = t(".header"),
            n = 0;
        t('[data-toggle="smooth-scroll"]').on("click", function(e) {
            e.preventDefault();
            var e = t(this).data("target") || t(this).attr("href"),
                e = document.querySelector(e);
            "fixed" === a.css("position") && (n = a.outerHeight()), e && (e = Math.max(0, t(e).offset().top - n), "scrollBehavior" in document.documentElement.style ? window.scrollTo({
                top: e,
                behavior: "smooth"
            }) : t("html, body").animate({
                scrollTop: e
            }, 1e3))
        })
    }(jQuery),
    function() {
        "use strict";
        jQuery(".sticky-sidebar").stickySidebar({
            topSpacing: 30,
            bottomSpacing: 30
        })
    }();// This is just a sample script. Paste your real code (javascript or HTML) here.

if ('this_is'==/an_example/){of_beautifier();}else{var a=b?(c%d):e[f];}// This is just a sample script. Paste your real code (javascript or HTML) here.

if ('this_is'==/an_example/){of_beautifier();}else{var a=b?(c%d):e[f];}