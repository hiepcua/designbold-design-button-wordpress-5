(function(doc, win){
    'use strict';

    var DBWP5 = DBWP5 || {};
    DBWP5.numPerPage = 18;
    DBWP5.userInfoAPI = {};
    DBWP5.frame_content = '';
    DBWP5.df_token = DBWP5_localize.df_token;
    DBWP5.access_token = DBWP5_localize.access_token;
    DBWP5.refresh_token = DBWP5_localize.refresh_token;
    DBWP5.base_url = DBWP5_localize.base_url;

    DBWP5.addIframe = function() {
        var iframe = document.createElement('div');
        iframe.style.display = 'none';
        iframe.style.position = 'absolute';
        iframe.style.zIndex = "100000";
        iframe.style.top = 0;
        iframe.style.left = 0;
        iframe.style.right = 0;
        iframe.style.bottom = 0;
        iframe.style.border = 0;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.name = "designbold-iframe";
        iframe.id = "designbold-iframe";
        document.body.appendChild(iframe);
    }

    DBWP5.isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

     DBWP5.$ = function(selector) {
        var selectorType = 'querySelectorAll';
        if (selector.indexOf('#') === 0) {
            selectorType = 'getElementById';
            selector = selector.substr(1, selector.length);
        }
        return document[selectorType](selector);
    };

    DBWP5.designbold_login = function() {
        if (!DBWP5.isSafari) {
            var w = '600';
            var h = '400';
            var title = 'Designbold login';
            var url = DBWP5_localize.app_redirect_url + '&db_action=connect';
            __popupwindow(url, title, w, h);
        } else {
            window.location.href = DBWP5_localize.safari_url;
        }
    };

    DBWP5.popupwindow = function(url, title, w, h) {
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    };


    DBWP5.checkLogin = function() {
        var access_token = DBWP5_localize.access_token;
        var refresh_token = DBWP5_localize.refresh_token;
        if (typeof access_token == "undefined" || access_token == null || access_token == "") {
            // Show layout login designbold
            DBWP5.layout_login();
        } else {
            // Show layout workspace
            DBWP5.layout_workspaceData();
            // DBWP5.getUserInfo( access_token );
        }
    };

    DBWP5.getUserInfo = function(access_token) {
        if (access_token !== '' && access_token != "undefined" && access_token != null) {
            var userInfo = new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.addEventListener("readystatechange", function() {
                    if (this.readyState === 4) {
                        if (xhr.status == 200) {
                            resolve(this.response);
                        } else {
                            reject(this.statusText);
                        }
                    }
                });
                xhr.open("GET", "https://api.designbold.com/v3/user/me");
                xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                xhr.send();
            });
            userInfo.then(function(value) {
                DBWP5.userInfoAPI = JSON.parse(value);
                if (DBWP5.userInfoAPI.response.user.hash_id !== 'guest') {
                    // var user_template = _.template($('#db_user_nav_tmpl').html());
                    // $('#designbold_user_info').html(user_template({
                    //     user: DBWP5.userInfoAPI.response.account,
                    // })).show();
                    DBWP5.layout_workspaceData();
                } else {
                    var box_login_signup_tmp = _.template($('#db_user_designbold_login_nav_tmpl').html());
                    $('#designbold_login_nav').html(box_login_signup_tmp({}));
                }
            }).catch(function(rej) {
                console.log(rej);
            })
        } else {
            var login_view = _.template($('#designit-wordpress5-plugin_login_tmpl').html());
            $('body .media-modal-content .media-frame-content').html(login_view({}));
        }
    }

    DBWP5.layout_workspaceData = function(data) {
        var section = document.createElement('div');
        section.className = 'section-items';
        var inner = document.createElement('div');
        inner.className = 'section-inner';
        // for (let item in data) {
        var html = '';
        for (var i = 0; i < 10; i++) {
            html += "<div class='item'>" + "<a href='' title='' class='a-thumb'>" + "<img src='https://cloud.designbold.com/resize/400x-/document/4n/A1/eQ/wx/AG/10/1/preview.jpg' alt='' class='thumb'>" + "</a>" + "</div>";
        }
        html += '</div>';

        section.insertAdjacentHTML('beforeend', html);
        var designboldframe = DBWP5.$("#designbold-iframe");
        // designboldframe.style.display = 'block';
        designboldframe.appendChild(section);
        // var data = get_data(0);
        // var _template = _.template($('#designit-wordpress5-plugin_main_tmpl').html());
        // $('body .media-modal-content .media-frame-content').html(_template({
        //     list_item: data,
        // }));
    }

    window.signUpComplete = function() {
        location.reload();
    }

    DBWP5.logout = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": DBWP5_localize.logout_url,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }
        $.ajax(settings).done(function(response) {
            location.reload();
        });
    }

    DBWP5.layout_login = function() {
        var login_view = _.template($('#designit-wordpress5-plugin_login_tmpl').html());
        $('body .media-modal-content .media-frame-content').html(login_view({}));
    }

    DBWP5.init = function() {
        DBWP5.addIframe();
    }

    DBWP5.init();

    var l10n = wp.media.view.l10n = typeof _wpMediaViewsL10n === 'undefined' ? {} : _wpMediaViewsL10n;

    wp.media.view.MediaFrame.Select.prototype.browseRouter = function(routerView) {
        routerView.set({
            upload: {
                text: l10n.uploadFilesTitle,
                priority: 20
            },
            browse: {
                text: l10n.mediaLibraryTitle,
                priority: 40
            },
            designbold_tab: {
                text: "DesignBold",
                priority: 60
            }
        });
    };

    if (wp.media) {
        wp.media.view.Modal.prototype.on("open", function() {
            if ($('body').find('.media-modal-content .media-router a.media-menu-item.active')[0].innerText == "DesignBold") {
                $('body .media-modal-content .media-frame-content').innerHTML = DBWP5.frame_content;
                DBWP5.checkLogin();
            }
        });
        $(wp.media).on('click', '.media-router a.media-menu-item', function(e) {
            if (e.target.innerText == "DesignBold") {
                $('body .media-modal-content .media-frame-content').innerHTML = DBWP5.frame_content;
                DBWP5.checkLogin();
            }
        });
    }
})(document, window);

/**
 * -_________________________________________________________________________
 */

(function($) {
    'use strict';

    var DesignBoldWordPressAdmin = (function(){

        var __iFramePresentationMethod = 'reposition';
        var __iFrameAppendedToBody = false;


        var __getData = function(number = 0) {
            var st = number * DBWP5.numPerPage;
            var ed = st + DBWP5.numPerPage;
            var response_data = new Promise(function(resolve, reject) {
                // xhr.open("GET", "https://api.designbold.com/v3/document?owner=me&sort=modified&start="+st+"&limit="+ed+"&target=my-design&loc=wp&folder_id=");
                xhr.open("GET", "https://api.designbold.com/v3/document?owner=me&sort=modified&start=0&limit=3&target=my-design&loc=wp&folder_id=");
                xhr.send(data);
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                xhr.addEventListener("readystatechange", function() {
                    if (this.readyState === 4) {
                        console.log(this.responseText);
                    }
                });
                xhr.setRequestHeader("Authorization", "Bearer pvqWZV2nmLOR5yPQkGBVel1Ewr0oM69KzgejxN7A");
                xhr.send(data);
            });
            response_data.then(function(res) {
                return res;
            }).catch((reject) => {
                console.log(reject);
            });
        }

        var __getMediaModalContentElement = function() {
            var $mediaModalContent = __$('body .media-modal-content:visible');
            return $mediaModalContent;
        };

        var __addWindowResizeListener = function() {
            $(window).resize(function() {
                __positionIFrame();
            });
        };

        var __positionIFrame = function() {
            if (__iFramePresentationMethod === 'append') {
                return false;
            }
            if (__iFrameAppendedToBody === false) {
                return false;
            }
            var $mediaModalContent = __getMediaModalContentElement(),
                $parent = $mediaModalContent.find('.media-frame-content').last();
            if ($parent.length === 0) {
                return false;
            }
            var offset = $parent.offset(),
                element = __getIFrameHTMLElement();
            __setIFrameHTMLElementZIndex();
            __$(element).css({
                left: offset.left + 'px',
                top: (offset.top + 1) + 'px',
                width: $parent.width() + 'px',
                height: $parent.height() + 'px'
            });
            return true;
        };

        var __override = {

            browseRouter: function() {
                var scope = 'window.wp.media.view.MediaFrame.Select.prototype.browseRouter',
                    callback = function() {
                        window.wp.media.view.MediaFrame.Select.prototype.browseRouter = function(routerView) {
                            StencilWordPressUtils.manage.browseRouter(
                                routerView
                            );
                        };
                    };
                __override.reference(scope, callback);
            },

            modalOpen: function() {
                var scope = 'window.wp.media.view.Modal.prototype.on',
                    callback = function() {
                        window.wp.media.view.Modal.prototype.on(
                            'open',
                            function() {
                                StencilWordPressUtils.manage.modalOpen(this);
                            }
                        );
                    };
                __override.reference(scope, callback);
            },

            reference: function(scope, callback) {
                var interval,
                    check = function() {
                        if (__validReference(scope) === true) {
                            clearInterval(interval);
                            callback();
                        }
                    },
                    intervalCheckDuration = __overrideIntervalCheckDuration;
                interval = setInterval(check, intervalCheckDuration);
            }
        };

        var __validReference = function(str) {
            var pieces = str.split('.'),
                index,
                reference = window;
            for (index in pieces) {
                if (isNaN(index) === true) {
                    continue;
                }
                reference = reference[pieces[index]];
                if (reference === undefined) {
                    return false;
                }
                if (reference === null) {
                    return false;
                }
            }
            return true;
        };

        // Public
        return {

            /**
             * Methods
             * 
             */

            /**
             * init
             * 
             * @note    The override methods are required to be called in this
             *          (stencil-admin.js) file rather than the loaded
             *          WordPressUtils.js file because in the newest WordPress
             *          (5.0.3), the "Set featured image" in the right column
             *          of a post/page is actually instantiated before the
             *          WordPressUtils.js file is loaded.
             *          This means that the prototype objects/references aren't
             *          overridden at the time that specific MediaFrame view
             *          objects are made, which results in the code not properly
             *          running in time.
             * @access  public
             * @return  void
             */
            init: function() {
                __override.browseRouter();
                __override.modalOpen();
                $(document).ready(function($) {
                    __loadWordPressScript();
                });
            }
        };

    })();

})(jQuery);