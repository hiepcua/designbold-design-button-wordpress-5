// var DBWP = (function(doc, win, $){
//     'use strict';

    var DBWP5 = DBWP5 || {};
    DBWP5.numPerPage = 18;
    DBWP5.userInfoAPI = {};
    DBWP5.frame_content = '';
    DBWP5.df_token = DBWP5_localize.df_token;
    DBWP5.access_token = DBWP5_localize.access_token;
    DBWP5.refresh_token = DBWP5_localize.refresh_token;
    DBWP5.base_url = DBWP5_localize.base_url;
    DBWP5.media_css = DBWP5_localize.media_css;
    DBWP5.access_token_status = 0;

    var __tabId = 'tab_dbwp5';
    var __iFrameElement = null;
    var __menuItemCopy = 'DesignBold';
    var __pluginCSSNamespace = 'dbwp5';
    var __iFramePresentationMethod = 'reposition';
    var __iFrameAppendedToBody = false;
    var __accessTokenExpires = false;

    DBWP5.isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    DBWP5.designbold_login = function() {
        if (!DBWP5.isSafari) {
            var w = '600';
            var h = '400';
            var title = 'Designbold login';
            var url = DBWP5_localize.app_redirect_url + '&db_action=connect';
            DBWP5.popupwindow(url, title, w, h);
        } else {
            window.location.href = DBWP5_localize.safari_url;
        }
    };

    DBWP5.popupwindow = function(url, title, w, h) {
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
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

    var __getWorkSpace = (access_token) =>{
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
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);

            xhr.send(data);
        })
    };

    var __getMediaModalContentElement = function() {
        var $mediaModalContent = $('body .media-modal-content:visible');
        return $mediaModalContent;
    };

    var __loadIFrame = function() {
        var element = document.createElement('iframe'),
            src = DBWP5_localize.base_url + 'templates/media-view.php',
            // src = 'https://www.designbold.com/workspace',
            namespace = __pluginCSSNamespace;
        element.setAttribute('id', (namespace) + '-wp');
        element.setAttribute('name', (namespace) + '-wp');
        element.setAttribute('class', (namespace) + '-iframe');
        element.setAttribute('frameborder', '0');
        element.setAttribute('allowtransparency', 'true');
        element.setAttribute('src', src);
        __iFrameElement = element;
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

    var __getDesignBoldTabAnchorElement = function() {
        var text = __menuItemCopy,
            selector = 'a.media-menu-item:contains("' + (text) + '"):visible',
            $element = $(selector);
        return $element;
    };

    /**
     * Detect current tab active. If content tab equal DesignBold then show iframe.
     */
    var __checkForDefaultTab = function() {
        var $tab = __getDesignBoldTabAnchorElement();
        if ($tab.hasClass('active') === true) {
            __showIFrame();
        }
    };

    /**
     * [__addDesignBoldBodyClass Default add class dbwp5 to body element html]
     */
    var __addDesignBoldBodyClass = function() {
        var namespace = __pluginCSSNamespace,
            className = namespace;
        $('body').addClass(className);
    };

    /**
     * [__hideIFrame Remove class to hiden iframe]
     */
    var __hideIFrame = function() {
        var namespace = __pluginCSSNamespace,
            className = (namespace) + '-body-open';
        $('body').removeClass(className);
    };

    var __addWindowResizeListener = function() {
        $(window).resize(function() {
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
            height: ($parent.height() + 60) + 'px'
        });
        return true;
    };

    window.signUpComplete = function() {
        location.reload();
    }

    DBWP5.add_media_css = () => {
        var iframe = __getIFrameHTMLElement();
        var cssLink = document.createElement("link");
        cssLink.href = DBWP5_localize.media_css;  
        cssLink.rel = "stylesheet";  
        cssLink.type = "text/css"; 
        iframe.appendChild(cssLink); 
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

    DBWP5.init = function() {
        // __loadIFrame();
        __addWindowResizeListener();
    }

    DBWP5.loadScript = function(url, success, error) {
        $.ajax({
            cache: true,
            dataType: 'script',
            error: error,
            success: success,
            timeout: '5000',
            url: url
        });
    };

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
                id: __tabId,
                text: "DesignBold",
                priority: 60
            }
        });
    };

    if (wp.media) {
        /**
         * Detect event click button Media Library
         */
        wp.media.view.Modal.prototype.on("open", function() {
            __addDesignBoldBodyClass();
            __checkForDefaultTab();
            __addModalCloseListener();
            
            // if ($('body').find('.media-modal-content .media-router a.media-menu-item.active')[0].innerText == "DesignBold") {
            //     $('body .media-modal-content .media-frame-content').innerHTML = DBWP5.frame_content;
            //     DBWP5.checkLogin();
            // }
        });

        $(wp.media).on('click', '.media-router a.media-menu-item', function(e) {
            var _this = $(this).attr('id');
            if(_this == __tabId){
                __showIFrame();
            }else{
                __hideIFrame();
            }
        });
    }

    /**
     * Ajax update WordPress option
     * @param  {[string]} option    Name of option
     * @param  {[object]} value     Object value of option
     * @return boolean              True if option value has changed, false if not or if update failed.
     */
    DBWP5.update_access_token_option = (value) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": DBWP5_localize.app_update_option,
            "data": {
                'access_token': value,
            },
            "method": "POST",
            "headers": {
                "cache-control": "no-cache"
            }
        }
        $.ajax(settings).done(function(response) {
            if(parseInt(response) == 10){
                console.log("Update access token success !");
            }else{
                console.log("Update access token error.");
            }
        });
    }

    /**
     * [__showIFrame Add iframe to body]
     */
    var __showIFrame = function() {
        // var namespace = __pluginCSSNamespace,
            // className = (namespace) + '-body-open';
        // $('body').addClass(className);
        // __insertIFrameIntoTab();
        // __positionIFrame();
        // DBWP5.add_media_css();
        DBWP5.process_login();
    };

    /**
     * [process_login Check is login DesignBold]
     * @return {true} [ logged ]
     * @return {false} [ Not logged in ]
     */
    DBWP5.process_login = function(){
        var access_token = DBWP5_localize.access_token;
        var refresh_token = DBWP5_localize.refresh_token;
        
        if (typeof access_token == "undefined" || access_token == null || access_token == "") {
            DBWP5.layout_login();
        } else {
            //  Get new access token
            DBWP5.get_new_access_token()
            .then((res) => {
                var res_data = JSON.parse(res);
                // Update/ insert user meta data
                DBWP5.update_access_token_option( res_data['access_token'] );
                DBWP5_localize.access_token = res_data['access_token'];
                DBWP5.layout_workspaceData();
            })
            .catch((rej) => {
                DBWP5.layout_login();
            });

            // // Nếu token chưa hết hạn thì thực hiện login, get user design bình thường 
            // // Nếu token hết hạn thì phải refresh lại token
            // DBWP5.check_access_token_expires(access_token)
            // .then((res) => {
            //     // Status = 200 : success.
            //     // console.log('Access token success.');
            //     // DBWP5.access_token_status = res;
            //     DBWP5.layout_workspaceData();
            //     // return 1;
            // })
            // .catch(function(rej){
            //     // Status = 204 : access token invalid.
            //     // console.log('Access token invalid.');
            //     if(rej == 204){
            //         var refresh_status = DBWP5.refresh_access_token(refresh_token);
            //     }else{
            //         DBWP5.layout_login();
            //     }
            // });
        }
    }

    /**
     * Custome hook to check access token expires
     * Status = 200 : success.
     * Status = 204 : access token invalid.
    */
    DBWP5.check_access_token_expires = (access_token) => {
        // access_token = '4qeZXOkwYmEoQBLjnVW71p8RGM9b6vNKDydJx5a1';
        if (access_token !== null && access_token !== '') {
            return new Promise((resolve, reject) => {
                var data = "access_token=" + access_token;

                var xhr = new XMLHttpRequest();
                xhr.withCredentials = false;

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        if(xhr.status == 200){
                            resolve(this.status);
                        }else{
                            reject(this.status);
                        }
                    }
                });

                xhr.open("POST", "https://accounts.designbold.com/v2/oauth/tokeninfo");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                xhr.send(data);
            });
        }
    }

    /**
     * Custome hook to refresh access token
     * If refresh success then save new access token result to wp_usermeta table in database with 
     * meta_key = dbmenu_access_token
     * If refresh error then do it again 5 times.
     * If in 5 times with 1 success then save data 
     * dbmenu_access_token = new access token 
     * else  
     * dbmenu_access_token = empty string
    */
    DBWP5.tmp = 0;
    DBWP5.refresh_access_token = (refresh_token) => {
        return new Promise ((resolve, reject) => {
            var refresh_token_df = 'b0f99ceb3d596cb8e7152088548c41e981920c0bd92312047fd8e75b9eee440d';
            if(refresh_token == null || refresh_token == undefined || refresh_token == ''){
                refresh_token = refresh_token_df;
            }
            var app_key = DBWP5_localize.app_key;
            var app_redirect_url = DBWP5_localize.app_update_option;

            var data = "app_key=" + app_key + "&redirect_uri=" + app_redirect_url + "&grant_type=refresh_token&refresh_token=" + refresh_token;
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                /**
                 * Status = 200 => success.
                 * status = 406 : refresh token expires.
                 * status = 500 : not create access token.
                */
                if (this.readyState == 4) {
                    if(this.status == 200){
                        console.log('Refresh access token success!');
                        var res_data = JSON.parse(this.response);
                        // Update/ insert user meta data
                        DBWP5.update_access_token_option( res_data['access_token'] );
                        DBWP5_localize.access_token = res_data['access_token'];
                        DBWP5.isLogin();
                        return this.status;
                    // }else if(this.readyState == 4 && (this.status == 406 || this.status == 500)){
                    }else{
                        for ( DBWP5.tmp; DBWP5.tmp < 5; DBWP5.tmp++ ) {
                            DBWP5.refresh_access_token(refresh_token);
                        }
                        return this.status;
                    }
                    
                }
            });

            xhr.open("POST", "https://accounts.designbold.com/v2/oauth/token");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.send(data);
        });
    }

    DBWP5.get_new_access_token = () => {
        return new Promise ((resolve, reject) => {
            var refresh_token_df = 'b0f99ceb3d596cb8e7152088548c41e981920c0bd92312047fd8e75b9eee440d';
            var app_key = DBWP5_localize.app_key;
            var app_redirect_url = DBWP5_localize.app_update_option;

            var data = "app_key=" + app_key + "&redirect_uri=" + app_redirect_url + "&grant_type=refresh_token&refresh_token=" + refresh_token;
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if(xhr.status == 200){
                        resolve(this.status);
                    }else{
                        reject(this.status);
                    }
                }
            });

            xhr.open("POST", "https://accounts.designbold.com/v2/oauth/token");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.send(data);
        });
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
        var designboldframe = $("#designbold-iframe");
        // designboldframe.style.display = 'block';
        designboldframe.appendChild(section);
        // var data = get_data(0);
        // var _template = _.template($('#designit-wordpress5-plugin_main_tmpl').html());
        // $('body .media-modal-content .media-frame-content').html(_template({
        //     list_item: data,
        // }));
    }

    DBWP5.layout_login = function() {
        var login_view = _.template($('#designit-wordpress5-plugin_login_tmpl').html());
        $('body .media-modal-content .media-frame-content').html(login_view({}));
    }

    DBWP5.init();
// })(document, window, jQuery);