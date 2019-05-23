
(function($){
    l10n = wp.media.view.l10n = typeof _wpMediaViewsL10n === 'undefined' ? {} : _wpMediaViewsL10n;
    
    var __menuItemKey = 'designbold';

    var __menuItemCopy = 'DesignBold';

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
     * __getRandomString
     * 
     * @access  private
     * @param   Number length
     * @return  String
     */
     var __getRandomString = function(length) {
        var str = '',
        range = '0123456789abcdefghijklmnopqrstuvwxyz',
        i = 0;
        for (i; i < length; i++) {
            str += range.charAt(Math.floor(Math.random() * range.length));
        }
        return str;
    };

    wp.media.view.MediaFrame.Select.prototype.browseRouter = function( routerView ) {
        routerView.set({
            upload: {
                text:     l10n.uploadFilesTitle,
                priority: 20
            },
            browse: {
                text:     l10n.mediaLibraryTitle,
                priority: 40
            },
            designbold_tab: {
                text:     "DesignBold",
                priority: 60
            }
        });
    };

    if ( wp.media ) {
        wp.media.view.Modal.prototype.on( "open", function() {
            if($('body').find('.media-modal-content .media-router a.media-menu-item.active')[0].innerText == "DesignBold"){
                $('body .media-modal-content .media-frame-content').innerHTML = DBWP5.frame_content;
                DBWP5.checkLogin();
            }
        });
        $(wp.media).on('click', '.media-router a.media-menu-item', function(e){
            if(e.target.innerText == "DesignBold"){
                $('body .media-modal-content .media-frame-content').innerHTML = DBWP5.frame_content;
                DBWP5.checkLogin();
            }
        });
    }
})(jQuery);

var DBWP5 = DBWP5 || {};

DBWP5.userInfoAPI    = {};
DBWP5.frame_content  = '';
DBWP5.df_token       = DBWP5_localize.df_token;
DBWP5.access_token   = DBWP5_localize.access_token;
DBWP5.refresh_token  = DBWP5_localize.refresh_token;

DBWP5.wrapper = function(){
    $('body .media-modal-content .media-frame-content').innerHTML = '<div class="designbold-wrapper"></div>';
}

DBWP5.recent_doctype = function (){
    var response_data = new Promise (function (resolve, reject){
        var data = null;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("GET", "https://api.designbold.com/v3/user/recent_doctype");
        xhr.setRequestHeader("Authorization", "Bearer " + DBWP5_localize.df_token);

        xhr.send(data);
    });

    response_data
    .then(function(res){
        console.log(res);
    })
    .catch((reject) => {
        console.log(reject);
    });
}

// Safari 3.0+ "[object HTMLElementConstructor]" 
DBWP5.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

DBWP5.designbold_login = function(){
    // check safari
    if( ! DBWP5.isSafari ){
        var w = '600';
        var h = '400';
        var title = 'Designbold login';
        var url = DBWP5_localize.app_redirect_url + '&db_action=connect';
        DBWP5.popupwindow(url, title, w, h);
    }else{
        window.location.href = DBWP5_localize.safari_url;
    }
}

DBWP5.popupwindow = function(url, title, w, h){
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

// Check login when website start
 DBWP5.checkLogin = function(){
    var access_token = DBWP5_localize.access_token;
    var refresh_token = DBWP5_localize.refresh_token;

    if(typeof access_token != "undefined" && access_token != null && access_token != "" && typeof refresh_token !== "undefined" && refresh_token != null && refresh_token != ""){
        $('#designbold_login_nav').removeClass("d-sm-block");
        DBWP5.getUserInfo( access_token );
    }else{
        DBWP5.getUserInfo( DBWP5.access_token_default );
    }
}

DBWP5.getUserInfo = function( access_token ){
    if( access_token !== '' && access_token != "undefined" && access_token != null) {
        var userInfo = new Promise (function (resolve, reject){
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

            xhr.open("GET", "https://api.designbold.com/v3/user/me");
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
            xhr.send();
        });

        userInfo.then(function(value){
            DBWP5.userInfoAPI = JSON.parse(value);
            if (DBWP5.userInfoAPI.response.user.hash_id !== 'guest') {
                var user_template = _.template($('#db_user_nav_tmpl').html());
                $('#designbold_user_info').html(user_template({
                    user : DBWP5.userInfoAPI.response.account,
                })).show();
            }else{
                var box_login_signup_tmp = _.template($('#db_user_designbold_login_nav_tmpl').html());
                $('#designbold_login_nav').html(box_login_signup_tmp({}));
            }
        })
        .catch(function(rej){
            console.log(rej);
        })
    }else{
        var login_view = _.template($('#designit-wordpress5-plugin_login_tmpl').html());
        $('body .media-modal-content .media-frame-content').html(login_view({}));
    }
}

window.signUpComplete = function(){
    location.reload();
}

DBWP5.logout = function(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": DBWP5_localize.logout_url,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        location.reload();
    });
}

DBWP5.checkLogin();