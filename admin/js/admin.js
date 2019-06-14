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

    var __$ = null;
    var __iFrameElement = null;
    var __pluginCSSNamespace = 'dbwp5';
    var __iFramePresentationMethod = 'reposition';
    var __iFrameAppendedToBody = false;

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

    var __makeRequest = (url, method, access_token) => {
        // Return it as a Promise
        return new Promise((resolve, reject) => {
            // Create XHR request
            var request = new XMLHttpRequest();
            // Setup our listener to process compeleted requests
            request.onreadystatechange = function (){

                // Only run if the request completed requests
                if(request.readyState !== 4) return;

                // Process the response
                if (request.status >= 200 && request.status < 300){
                    // If successful
                    resolve(request);
                }else{
                    // If failed
                    reject({
                        status: request.status,
                        statusText : request.statusText
                    });
                }
            };

            // Setup our HTTP request
            request.open(method || 'GET', url, true);

            // Setup our request header
            if(access_token != ''){
                request.setRequestHeader("Authorization", "Bearer "+access_token);
            }

            // Send request
            request.send();
        });
    }

    var __getWorkSpace = () =>{
        return new Promise((resolve, reject) => {
            var data = null;

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if(xhr.status == 200){
                        resolve(this.response);
                    }else{
                        reject(this.statusText);
                    }
                }
            });

            xhr.open("GET", "https://api.designbold.com/v3/document?owner=me&sort=modified&start=0&limit=3&target=my-design&loc=wp&folder_id=");
            xhr.setRequestHeader("Authorization", "Bearer BwPmKYDW5XnLvNJGxqV0lV4e7l91pR2O0bardgoZ");

            xhr.send(data);
        })
    };

    var __getMediaModalContentElement = function() {
        var $mediaModalContent = $('body .media-modal-content:visible');
        return $mediaModalContent;
    };

    var __loadIFrame = function() {
        var element = document.createElement('iframe'),
            src = DBWP5_localize.base_url + 'media-view.php',
            namespace = __pluginCSSNamespace;
        element.setAttribute('id', (namespace) + '-wp');
        element.setAttribute('name', (namespace) + '-wp');
        element.setAttribute('class', (namespace) + '-iframe');
        element.setAttribute('frameborder', '0');
        element.setAttribute('allowtransparency', 'true');
        element.setAttribute('src', src);
        __iFrameElement = element;

        __getWorkSpace()
        .then(function(value){
            var Obj_items = JSON.parse(value);
            // console.log(Obj_items);
            var list_items = $('#dbwp5-wp-items').html();
            $('#dbwp5_content').html(_.template(list_items, {items : Obj_items}));
        })
        .catch(function(rej){
            console.log(rej);
        });
    };

    var __getIFrameHTMLElement = function() {
        if (__iFrameElement === null) {
            __loadIFrame();
        }
        var element = __iFrameElement;
        return element;
    };

    var __insertIFrameIntoTab = function() {
        var element = __getIFrameHTMLElement();
        if (__iFramePresentationMethod === 'append') {
            var $mediaModalContent = __getMediaModalContentElement().last(),
                mediaFrameContentElement = $mediaModalContent.find('.media-frame-content').get(0);
            mediaFrameContentElement.appendChild(element);
            return true;
        }
        if (__iFrameAppendedToBody === true) {
            return false;
        }
        var $body = $('body'),
            body = $body.get(0);
        body.appendChild(element);
        __iFrameAppendedToBody = true;
        return true;
    };

    var __setIFrameHTMLElementZIndex = function() {
        var iFrameHTMLElement = __getIFrameHTMLElement(),
            modal = __getMediaModalContentElement().get(0),
            zIndex = __getElementZIndex(modal);
        if (isNaN(zIndex) === false) {
            zIndex += 1
        }
        $(iFrameHTMLElement).css({
            'z-index': zIndex
        });
    };

    var __getElementZIndex = function(element) {
        var response = 'auto',
            zIndex,
            items = $(element).parents().addBack().toArray(),
            index,
            item;
        for (index in items) {
            item = items[index];
            zIndex = $(item).css('z-index');
            if (zIndex === 'auto') {
                continue;
            }
            if (zIndex === 'initial') {
                continue;
            }
            if (zIndex === 'inherit') {
                continue;
            }
            if (isNaN(zIndex) === true) {
                continue;
            }
            zIndex = parseInt(zIndex, 10);
            if (response === 'auto') {
                response = zIndex;
                continue;
            }
            if (zIndex > response) {
                response = zIndex;
                continue;
            }
        }
        return response;
    };

    var __addDesignBoldBodyClass = function() {
        var namespace = __pluginCSSNamespace,
            className = namespace;
        $('body').addClass(className);
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
        $(element).css({
            left: offset.left + 'px',
            top: (offset.top + 1) + 'px',
            width: $parent.width() + 'px',
            height: $parent.height() + 'px'
        });
        return true;
    };

    var __showIFrame = function() {
        var namespace = __pluginCSSNamespace,
            className = (namespace) + '-body-open';
        $('body').addClass(className);
        __insertIFrameIntoTab();
        __positionIFrame();
    };

    var __hideIFrame = function() {
        var namespace = __pluginCSSNamespace,
            className = (namespace) + '-body-open';
        __$('body').removeClass(className);
    };

    var __addWindowResizeListener = function() {
        __$(window).resize(function() {
            __positionIFrame();
        });
    };

    var __addModalCloseListener = function() {
        window.wp.media.view.Modal.prototype.on(
            'close',
            function() {
                __hideIFrame();
            }
        );
    };

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
        __$ = $;
        // __loadIFrame();
        __addWindowResizeListener();
        __addModalCloseListener();
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
            __addDesignBoldBodyClass();
            __showIFrame();
            // if ($('body').find('.media-modal-content .media-router a.media-menu-item.active')[0].innerText == "DesignBold") {
            //     $('body .media-modal-content .media-frame-content').innerHTML = DBWP5.frame_content;
            //     DBWP5.checkLogin();
            // }
        });
        $(wp.media).on('click', '.media-router a.media-menu-item', function(e) {
            // if (e.target.innerText == "DesignBold") {
            //     $('body .media-modal-content .media-frame-content').innerHTML = DBWP5.frame_content;
            //     DBWP5.checkLogin();
            // }
        });
    }
})(document, window);

/**
 * -_________________________________________________________________________
 */

(function($) {
    'use strict';

    // var DesignBoldWordPressAdmin = (function(){
    //     var __iFramePresentationMethod = 'reposition';
    //     var __iFrameAppendedToBody = false;
    //     var __overrideIntervalCheckDuration = 10;
    //     var __browseRouterChangeDetectionInterval = 1500;
    //     var __timeout = 5000;

    //     var __filenames = {
    //         admin: 'admin.js',
    //         wordPressUtils: 'WordPressUtils.js'
    //     };

    //     var __attempt = function(closure) {
    //         try {
    //             var response = closure();
    //             return response;
    //         } catch (err) {
    //         }
    //         return null;
    //     };

    //     var __callbacks = {
    //         error: function() {
    //             var editPostPage = window.location.pathname.indexOf('wp-admin/post.php') !== -1;
    //             if (editPostPage === false) {
    //                 return false;
    //             }
    //             var msg = __messages.failed;
    //             alert(msg);
    //             return true;
    //         },
    //         success: function() {
    //             window.DesignBoldWordPressUtils.init($);
    //         }
    //     };

    //     var __getPluginVersion = function() {
    //         var adminFilename = __filenames.admin,
    //             src = $('script[src*="' + (adminFilename) + '"]').first().attr('src'),
    //             matches = src.match(/ver=([0-9\.]+)/);
    //         if (matches === null) {
    //             return null;
    //         }
    //         var version = matches.pop();
    //         return version;
    //     };

    //     var __getHour = function() {
    //         var currentDate = new Date(),
    //             hour = currentDate.getDate() + '/'
    //                 + (currentDate.getMonth() + 1)  + '/'
    //                 + currentDate.getFullYear() + '@'
    //                 + currentDate.getHours() + ':'
    //                 + '00:'
    //                 + '00';
    //         return hour;
    //     };

    //     var __getTimezone = function() {
    //         var currentDate = new Date(),
    //             lang = 'en-us',
    //             localeTimeString = currentDate.toLocaleTimeString(lang, {
    //                 timeZoneName: 'short'
    //             }),
    //             pieces = localeTimeString.split(' '),
    //             timezone = 'unknown';
    //         if (pieces.length > 2) {
    //             timezone = pieces[2];
    //         }
    //         return timezone;
    //     };

    //     var __getQueryData = function() {
    //         var queryData = {
    //             hour: __getHour(),
    //             timezone: __getTimezone(),
    //             version: __getPluginVersion()
    //         };
    //         if (queryData.version === null) {
    //             delete queryData.version;
    //         }
    //         return queryData;
    //     };

    //     var __getQueryString = function() {
    //         var queryData = __getQueryData(),
    //             queryString = jQuery.param(queryData);
    //         return queryString;
    //     };

    //     var __getLocalWordPressScriptPath = function() {
    //         var path = __attempt(__getPluginWordPressUtilsPath);
    //         var path1 = __getPluginWordPressUtilsPath();
    //         if (path === null) {
    //             return null;
    //         }
    //         var queryString = __getQueryString();
    //         path = (path) + '?' + (queryString);
    //         return path;
    //     };

    //     var __getPluginWordPressUtilsPath = function() {
    //         var adminFilename = __filenames.admin,
    //             wordPressUtilsFilename = __filenames.wordPressUtils,
    //             src = $('script[src*="' + (adminFilename) + '"]').first().attr('src');
    //         src = src.replace(adminFilename, wordPressUtilsFilename);
    //         var host = window.location.host;
    //         src = src.split(host).pop();
    //         return src;
    //     };

    //     var __loadLocalWordPressScript = function(error) {
    //         var path = __getLocalWordPressScriptPath(),
    //             url = path,
    //             success = __callbacks.success;
    //         if (path === null) {
    //             error();
    //         } else {
    //             __loadScript(url, success, error);
    //         }
    //     };

    //     var __loadWordPressScript = function() {
    //         var error = function() {
    //             console.log("Can not load location WordPress script.")
    //         };
    //         __loadLocalWordPressScript(error);
    //     };

    //     var __loadScript = function(url, success, error) {
    //         $.ajax({
    //             cache: true,
    //             dataType: 'script',
    //             error: error,
    //             success: success,
    //             timeout: __timeout,
    //             url: url
    //         });
    //     };

    //     var __getMediaModalContentElement = function() {
    //         var $mediaModalContent = __$('body .media-modal-content:visible');
    //         return $mediaModalContent;
    //     };

    //     var __validReference = function(str) {
    //         var pieces = str.split('.'),
    //         index,
    //         reference = window;
    //         for (index in pieces) {
    //             if (isNaN(index) === true) {
    //                 continue;
    //             }
    //             reference = reference[pieces[index]];
    //             if (reference === undefined) {
    //                 return false;
    //             }
    //             if (reference === null) {
    //                 return false;
    //             }
    //         }
    //         return true;
    //     };

    //     var __setBrowseRouterChangeDetectionInterval = function(browseRouterCallback) {
    //         var callback = function() {
    //                 var callback = window.wp.media.view.MediaFrame.Select.prototype.browseRouter,
    //                     str = callback.toString();
    //                 if (str.match(/DesignBoldWordPressUtils/) === null) {
    //                     var child = window.wp.media.view.MediaFrame.Select.prototype.browseRouter;
    //                     window.wp.media.view.MediaFrame.Select.prototype.browseRouter = function() {
    //                         DesignBoldWordPressUtils;
    //                         var args = arguments;
    //                         args = [].slice.call(args);
    //                         child.apply(window, args);
    //                         browseRouterCallback.apply(window, args);
    //                     };
    //                 }
    //             },
    //             period = __browseRouterChangeDetectionInterval,
    //             reference = setInterval(callback, period);
    //     };

    //     var __override = {
    //         browseRouter: function() {
    //             var scope = 'window.wp.media.view.MediaFrame.Select.prototype.browseRouter',
    //                 callback = function() {
    //                     window.wp.media.view.MediaFrame.Select.prototype.browseRouter = function(routerView) {
    //                         var browseRouterCallback = function(routerView) {
    //                             DesignBoldWordPressUtils.manage.browseRouter(routerView);
    //                         };
    //                         window.wp.media.view.MediaFrame.Select.prototype.browseRouter = browseRouterCallback;
    //                         __setBrowseRouterChangeDetectionInterval(browseRouterCallback);
    //                     };
    //                 };
    //             __override.reference(scope, callback);
    //         },

    //         modalOpen: function() {
    //             var scope = 'window.wp.media.view.Modal.prototype.on',
    //                 callback = function() {
    //                     var openModalCallback = function() {
    //                         DesignBoldWordPressUtils.manage.modalOpen(this);
    //                     };
    //                     window.wp.media.view.Modal.prototype.on('open', openModalCallback);
    //                 };

    //             __override.reference(scope, callback);
    //         },

    //         reference: function(scope, callback) {
    //             var interval,
    //                 check = function() {
    //                     if (__validReference(scope) === true) {
    //                         clearInterval(interval);
    //                         callback();
    //                     }
    //                 },
    //                 intervalCheckDuration = __overrideIntervalCheckDuration;
    //             interval = setInterval(check, intervalCheckDuration);
    //         }
    //     };

    //     // Public
    //     return {
    //         init: function() {
    //             __override.browseRouter();
    //             __override.modalOpen();
    //             $(document).ready(function($) {
    //                 __loadWordPressScript();
    //             });
    //         }
    //     };

    // })();

    // DesignBoldWordPressAdmin.init();

})(jQuery);