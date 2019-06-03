(function($) {
    'use strict';
    var DesignBoldWordPressAdmin = (function() {
        var l10n = wp.media.view.l10n = typeof _wpMediaViewsL10n === 'undefined' ? {} : _wpMediaViewsL10n;
        var __browseRouterChangeDetectionInterval = 1500;
        var __menuItemKey = 'designbold';
        var __menuItemCopy = 'DesignBold';
        var __pluginCSSNamespace = 'dbwp5';
        var __iFrameElement = null;
        var __timeout = 5000;
        var __overrideIntervalCheckDuration = 10;
        var __compiledWordPressPath = '/app/static/compiled/wordPress.js';
        var __hosts = {
            local: 'local.getstencil.com',
            dev: 'dev.getstencil.com',
            prod: 'getstencil.com'
        };
        var __filenames = {
            admin: 'admin.js',
            wordPressUtils: 'WordPressUtils.js'
        };
        var __callbacks = {
            error: function() {
                var editPostPage = window.location.pathname.indexOf('wp-admin/post.php') !== -1;
                if (editPostPage === false) {
                    return false;
                }
                var msg = __messages.failed;
                alert(msg);
                return true;
            },
            success: function() {
                window.DesignBoldWordPressUtils.init($);
            }
        };
        var __getAppSRC = function() {
            var host = __getHost(),
                path = __getAppPath(),
                src = 'https://' + (host) + (path);
            return src;
        };
        var __getHost = function() {
            var role = __getRole(),
                hosts = __hosts,
                host = hosts[role];
            return host;
        };
        var __getAppPath = function() {
            var path = __appPath,
                externalRequestID = __externalRequestID
            path += '&erid=' + (externalRequestID);
            return path;
        };
        var __getRole = function() {
            if (window.location.host === 'local.getstencil.com') {
                var role = 'local';
                return role;
            }
            if (window.location.host === 'dev.getstencil.com') {
                var role = 'dev';
                return role;
            }
            var role = 'prod';
            return role;
        };
        var __loadIFrame = function() {
            var element = document.createElement('iframe'),
                src = __getIFrameSRC(),
                namespace = __pluginCSSNamespace;
            element.setAttribute('name', (namespace) + '-wp');
            element.setAttribute('class', (namespace) + '-iframe');
            element.setAttribute('frameborder', '0');
            element.setAttribute('allowtransparency', 'true');
            element.setAttribute('src', src);
            // element.onload = function() {
            //     __iFrameLoaded = true;
            // };
            __iFrameElement = element;
        };
        var __getIFrameSRC = function() {
            var src = __getAppSRC();
            return src;
        };
        var __getDefaultMenuItems = function() {
            items = {
                upload: {
                    text: l10n.uploadFilesTitle,
                    priority: 20
                },
                browse: {
                    text: l10n.mediaLibraryTitle,
                    priority: 40
                }
            };
            return items;
        };
        /**
         * __getModalReference
         * 
         * @note    The et_pb_file_frame and file_frame checks are performed to
         *          account for the Divi Builder plugin (different versions).
         * @see     https://i.imgur.com/hRHamYE.jpg
         * @see     https://i.imgur.com/8he4M0L.png
         * @access  private
         * @return  Object|null
         */
        var __getModalReference = function() {
            var modal = window.wp.media.frame;
            if (modal !== undefined) {
                return modal;
            }
            modal = window.wp.media.frames.et_pb_file_frame;
            if (modal !== undefined) {
                return modal;
            }
            modal = window.wp.media.frames.file_frame;
            if (modal !== undefined) {
                return modal;
            }
            return null;
        };
        /**
         * __addActionMessageListener
         * 
         * @note    The __iFrameElement check is because some events might be
         *          triggered without the iframe having been drawn if the user
         *          has a Stencil extension installed.
         * @access  private
         * @param   String action
         * @param   Function callback
         * @return  void
         */
        var __addActionMessageListener = function(action, callback) {
            window.addEventListener('message', function(event) {
                if (event === undefined) {
                    return false;
                }
                if (event === null) {
                    return false;
                }
                var data = event.data;
                if (data === undefined) {
                    return false;
                }
                if (data === null) {
                    return false;
                }
                if (data[0] !== '{') {
                    return false;
                }
                try {
                    var parsed = JSON.parse(data);
                } catch (e) {
                    return false;
                }
                // if (__iFrameElement === null) {
                //     return false;
                // }
                // if (__iFrameLoaded === false) {
                //     return false;
                // }
                if (parsed.action === action) {
                    if (parsed.erid === __externalRequestID) {
                        callback.apply(window, [event]);
                        return true;
                    }
                    return false;
                }
                return false;
            });
        };
        var __loadScript = function(url, success, error) {
            $.ajax({
                cache: true,
                dataType: 'script',
                error: error,
                success: success,
                timeout: __timeout,
                url: url
            });
        };
        var __getRandomString = function(length) {
            var str = '',
                range = '0123456789abcdefghijklmnopqrstuvwxyz',
                i = 0;
            for (i; i < length; i++) {
                str += range.charAt(Math.floor(Math.random() * range.length));
            }
            return str;
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
        var __getPluginVersion = function() {
            var adminFilename = __filenames.admin,
                src = $('script[src*="' + (adminFilename) + '"]').first().attr('src'),
                matches = src.match(/ver=([0-9\.]+)/);
            if (matches === null) {
                return null;
            }
            var version = matches.pop();
            return version;
        };
        var __getHour = function() {
            var currentDate = new Date(),
                hour = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear() + '@' + currentDate.getHours() + ':' + '00:' + '00';
            return hour;
        };
        var __getTimezone = function() {
            var currentDate = new Date(),
                lang = 'en-us',
                localeTimeString = currentDate.toLocaleTimeString(lang, {
                    timeZoneName: 'short'
                }),
                pieces = localeTimeString.split(' '),
                timezone = 'unknown';
            if (pieces.length > 2) {
                timezone = pieces[2];
            }
            return timezone;
        };
        var __getQueryData = function() {
            var queryData = {
                hour: __getHour(),
                timezone: __getTimezone(),
                version: __getPluginVersion()
            };
            if (queryData.version === null) {
                delete queryData.version;
            }
            return queryData;
        };
        var __getQueryString = function() {
            var queryData = __getQueryData(),
                queryString = jQuery.param(queryData);
            return queryString;
        };
        var __getRemoteWordPressScriptURL = function() {
            var host = __getHost(),
                path = __compiledWordPressPath,
                queryString = __getQueryString(),
                url = 'https://' + (host) + (path) + '?' + (queryString);
            return url;
        };
        var __getLocalWordPressScriptPath = function() {
            var role = __getRole(),
                path = __attempt(__getPluginWordPressUtilsPath);
            if (path === null) {
                return null;
            }
            if (role === 'local') {
                path = __compiledWordPressPath;
            }
            var queryString = __getQueryString();
            path = (path) + '?' + (queryString);
            return path;
        };
        var __loadLocalWordPressScript = function(error) {
            var path = __getLocalWordPressScriptPath(),
                url = path,
                success = __callbacks.success;
            if (path === null) {
                error();
            } else {
                __loadScript(url, success, error);
            }
        };
        var __loadRemoteWordPressScript = function(error) {
            var url = __getRemoteWordPressScriptURL(),
                success = __callbacks.success;
            __loadScript(url, success, error);
        };
        var __loadWordPressScript = function() {
            var error = function() {
                var error = __callbacks.error;
                __loadLocalWordPressScript(error);
            };
            __loadRemoteWordPressScript(error);
        };
        var __override = {
            /**
             * browseRouter
             * 
             * @access  private
             * @return  void
             */
            browseRouter: function() {
                var scope = 'window.wp.media.view.MediaFrame.Select.prototype.browseRouter';
                var callback = function() {
                        var browseRouterCallback = function(routerView) {
                            DesignBoldWordPressUtils.manage.browseRouter(routerView);
                        };
                        window.wp.media.view.MediaFrame.Select.prototype.browseRouter = browseRouterCallback;
                        __setBrowseRouterChangeDetectionInterval(browseRouterCallback);
                    };
                __override.reference(scope, callback);
            },
            /**
             * modalOpen
             * 
             * @access  private
             * @return  void
             */
            modalOpen: function() {
                var scope = 'window.wp.media.view.Modal.prototype.on',
                    callback = function() {
                        var openModalCallback = function() {
                            DesignBoldWordPressUtils.manage.modalOpen(this);
                        };
                        window.wp.media.view.Modal.prototype.on('open', openModalCallback);
                    };
                __override.reference(scope, callback);
            },
            /**
             * reference
             * 
             * @access  private
             * @param   String scope
             * @param   Function callback
             * @return  void
             */
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

        var __setBrowseRouterChangeDetectionInterval = function(browseRouterCallback) {
            var callback = function() {
                    var callback = window.wp.media.view.MediaFrame.Select.prototype.browseRouter,
                        str = callback.toString();
                    if (str.match(/StencilWordPressUtils/) === null) {
                        var child = window.wp.media.view.MediaFrame.Select.prototype.browseRouter;
                        window.wp.media.view.MediaFrame.Select.prototype.browseRouter = function() {
                            StencilWordPressUtils;
                            var args = arguments;
                            args = [].slice.call(args);
                            child.apply(window, args);
                            browseRouterCallback.apply(window, args);
                        };
                    }
                },
                period = __browseRouterChangeDetectionInterval,
                reference = setInterval(callback, period);
        };
        // wp.media.view.MediaFrame.Select.prototype.browseRouter = function(routerView) {
        //     routerView.set({
        //         upload: {
        //             text: l10n.uploadFilesTitle,
        //             priority: 20
        //         },
        //         browse: {
        //             text: l10n.mediaLibraryTitle,
        //             priority: 40
        //         },
        //         designbold_tab: {
        //             text: "DesignBold",
        //             priority: 60
        //         }
        //     });
        // };
        // if (wp.media) {
        //     wp.media.view.Modal.prototype.on("open", function() {
        //         if ($('body').find('.media-modal-content .media-router a.media-menu-item.active')[0].innerText == "DesignBold") {
        //             $('body .media-modal-content .media-frame-content').innerHTML = DBWP5.frame_content;
        //             DBWP5.checkLogin();
        //         }
        //     });
        //     $(wp.media).on('click', '.media-router a.media-menu-item', function(e) {
        //         if (e.target.innerText == "DesignBold") {
        //             $('body .media-modal-content .media-frame-content').innerHTML = DBWP5.frame_content;
        //             DBWP5.checkLogin();
        //         }
        //     });
        // }
        return {
            init: function() {
                __override.browseRouter();
                // __override.modalOpen();
                $(document).ready(function($) {
                    __loadWordPressScript();
                });
            }
        };
    })();
    // We landed on the moon!
    DesignBoldWordPressAdmin.init();
})(jQuery);
var DBWP5 = DBWP5 || {};
DBWP5.numPerPage = 18;
DBWP5.userInfoAPI = {};
DBWP5.frame_content = '';
DBWP5.df_token = DBWP5_localize.df_token;
DBWP5.access_token = DBWP5_localize.access_token;
DBWP5.refresh_token = DBWP5_localize.refresh_token;
// Safari 3.0+ "[object HTMLElementConstructor]" 
DBWP5.isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
    return p.toString() === "[object SafariRemoteNotification]";
})(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
DBWP5.designbold_login = function() {
    // check safari
    if (!DBWP5.isSafari) {
        var w = '600';
        var h = '400';
        var title = 'Designbold login';
        var url = DBWP5_localize.app_redirect_url + '&db_action=connect';
        DBWP5.popupwindow(url, title, w, h);
    } else {
        window.location.href = DBWP5_localize.safari_url;
    }
}
DBWP5.popupwindow = function(url, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}
// Check login when website start
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
}
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
                var user_template = _.template($('#db_user_nav_tmpl').html());
                $('#designbold_user_info').html(user_template({
                    user: DBWP5.userInfoAPI.response.account,
                })).show();
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
// ----------------------------------------------------------------------------------------
DBWP5.layout_login = function() {
    var login_view = _.template($('#designit-wordpress5-plugin_login_tmpl').html());
    $('body .media-modal-content .media-frame-content').html(login_view({}));
}
/**
 * @param  {Number} number of page
 * @return {[data]}
 */
DBWP5.get_data = function(number = 0) {
    var st = number * DBWP5.numPerPage;
    var ed = st + DBWP5.numPerPage;
    var response_data = new Promise(function(resolve, reject) {
        // xhr.open("GET", "https://api.designbold.com/v3/document?owner=me&sort=modified&start="+st+"&limit="+ed+"&target=my-design&loc=wp&folder_id=");
        xhr.send(data);
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });
        xhr.open("GET", "https://api.designbold.com/v3/document?owner=me&sort=modified&start=0&limit=3&target=my-design&loc=wp&folder_id=");
        xhr.setRequestHeader("Authorization", "Bearer pvqWZV2nmLOR5yPQkGBVel1Ewr0oM69KzgejxN7A");
        xhr.send(data);
    });
    response_data.then(function(res) {
        return res;
    }).catch((reject) => {
        console.log(reject);
    });
}
DBWP5.layout_workspaceData = function() {
    var data = DBWP5.get_data(0);
    var _template = _.template($('#designit-wordpress5-plugin_main_tmpl').html());
    $('body .media-modal-content .media-frame-content').html(_template({
        list_item: data,
    }));
}
// ----------------------------------------------------------------------------------------
// DBWP5.checkLogin();