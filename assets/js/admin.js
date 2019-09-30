
var DBWP5 = DBWP5 || {};
DBWP5.numPage = 1;
DBWP5.numPerPage = 20;
DBWP5.userInfoAPI = {};
DBWP5.frame_content = '';
DBWP5.df_token = DBWP5_localize.df_token;
DBWP5.access_token = DBWP5_localize.access_token;
DBWP5.refresh_token = DBWP5_localize.refresh_token;
DBWP5.base_url = DBWP5_localize.base_url;
DBWP5.access_token_status = 0;
DBWP5.all_data = [];
DBWP5.user_account = '';

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

DBWP5.__getWorkSpace = (access_token) =>{
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

        xhr.open("GET", "https://api.designbold.com/v3/document?owner=me&sort=modified&start=0&limit=20&target=my-design&loc=wp&folder_id=");
        xhr.setRequestHeader("Authorization", "Bearer " + access_token);

        xhr.send(data);
    })
};

DBWP5.__getMediaModalContentElement = function() {
    var $mediaModalContent = $('body .media-modal-content:visible');
    return $mediaModalContent;
};

/**
 * ajax_get_option Ajax get custom option
 * @param  {string} name Name of custom option
 * @return {string}      The option value
 */
DBWP5.ajax_get_option = (name) => {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": DBWP5_localize.ajax_get_option,
        "method": "POST",
        "data": {
            'option_name': name,
        },
        "headers": {
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function(response) {
        console.log();
        return response;
    });
}

/**
 * Create iframe node
 * @return {DOM node}
 */
DBWP5.__loadIFrame = function() {
    var element = document.createElement('iframe'),
    src = DBWP5_localize.base_url + 'templates/media-view.php',
    namespace = __pluginCSSNamespace;
    element.setAttribute('id', (namespace) + '-wp');
    element.setAttribute('name', (namespace) + '-wp');
    element.setAttribute('class', (namespace) + '-iframe');
    element.setAttribute('frameborder', '0');
    element.setAttribute('allowtransparency', 'true');
    element.setAttribute('src', src);
    __iFrameElement = element;
};

DBWP5.__getIFrameHTMLElement = function() {
    if (__iFrameElement === null) {
        DBWP5.__loadIFrame();
    }
    var element = __iFrameElement;
    return element;
};

DBWP5.__insertIFrameIntoTab = function() {
    var element = DBWP5.__getIFrameHTMLElement();
    if (__iFramePresentationMethod === 'append') {
        var $mediaModalContent = DBWP5.__getMediaModalContentElement().last(),
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

DBWP5.__getElementZIndex = function(element) {
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

DBWP5.__setIFrameHTMLElementZIndex = function() {
    var iFrameHTMLElement = DBWP5.__getIFrameHTMLElement(),
    modal = DBWP5.__getMediaModalContentElement().get(0),
    zIndex = DBWP5.__getElementZIndex(modal);
    if (isNaN(zIndex) === false) {
        zIndex += 1
    }
    $(iFrameHTMLElement).css({
        'z-index': zIndex
    });
};

DBWP5.__getDesignBoldTabAnchorElement = function() {
    var text = __menuItemCopy,
    selector = 'a.media-menu-item:contains("' + (text) + '"):visible',
    $element = $(selector);
    return $element;
};

/**
 * Detect current tab active. If content tab equal DesignBold then show iframe.
 */
DBWP5.__checkForDefaultTab = function() {
    var $tab = DBWP5.__getDesignBoldTabAnchorElement();
    if ($tab.hasClass('active') === true) {
        DBWP5.__addDesignBoldBodyClass();
        DBWP5.__showIFrame();
    }
};

/**
 * DBWP5.__addDesignBoldBodyClass Default add class dbwp5 to body element html
 */
DBWP5.__addDesignBoldBodyClass = function() {
    var namespace = __pluginCSSNamespace,
    className = namespace;
    $('body').addClass(className);
};

/**
 * DBWP5.__removeDesignBoldBodyClass Default remove class dbwp5 to body element html
 */
DBWP5.__removeDesignBoldBodyClass = function() {
    var namespace = __pluginCSSNamespace,
    className = namespace;
    $('body').removeClass(className);
};

/**
 * DBWP5.__hideIFrame Remove class to hiden iframe
 */
DBWP5.__hideIFrame = function() {
    var namespace = __pluginCSSNamespace,
    className = (namespace) + '-body-open';
    $('body').removeClass(className);
};

DBWP5.__addWindowResizeListener = function() {
    $(window).resize(function() {
        DBWP5.__positionIFrame();
    });
};

DBWP5.update_data = (obj) => {
    var length = obj.length;
    for( let i = 0; i < length; i++ ){
        DBWP5.all_data.push(obj[i]);
    }
}

var runningAjaxRequest = false;

DBWP5.scroll_load = () => {
    document.addEventListener('scroll', function (event) {
        var attachments = $('.designbold-items.attachments-browser .attachments');
        if (event.target === attachments[0]) { 
            /*just use native javascript becuz jquery scroll bind not work*/

            var lastItem = attachments.find('.item:last-child');
            if( lastItem.position().top <= attachments.height() ) {
                /*check load het chua*/
                if(runningAjaxRequest !== false) {
                    runningAjaxRequest.abort();
                }

                var start = DBWP5.numPage * DBWP5.numPerPage;
                var end = DBWP5.numPerPage;
                var access_token = DBWP5_localize.access_token;

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://api.designbold.com/v3/document?owner=me&sort=modified&start="+start+"&limit="+end+"&target=my-design&loc=wp&folder_id=",
                    "method": "GET",
                    "headers": {
                        "Authorization": "Bearer " + access_token,
                    }
                }

                runningAjaxRequest = $.ajax(settings).done(function(response) {
                    if(response.response !== ''){
                        DBWP5.numPage ++;
                        DBWP5.update_data(response.response);
                        DBWP5.append_layout_workspaceData(response.response);
                    }else{
                        runningAjaxRequest == false;
                    }
                });
            }
        }
    }, true);
}

DBWP5.__addModalCloseListener = function() {
    window.wp.media.view.Modal.prototype.on(
        'close',
        function() {
            DBWP5.__hideIFrame();
        }
        );
};

DBWP5.__positionIFrame = function() {
    if (__iFramePresentationMethod === 'append') {
        return false;
    }
    if (__iFrameAppendedToBody === false) {
        return false;
    }
    var $mediaModalContent = DBWP5.__getMediaModalContentElement(),
    $parent = $mediaModalContent.find('.media-frame-content').last();
    if ($parent.length === 0) {
        return false;
    }
    var offset = $parent.offset(),
    element = DBWP5.__getIFrameHTMLElement();
    DBWP5.__setIFrameHTMLElementZIndex();
    $(element).css({
        left: offset.left + 'px',
        top: (offset.top + 1) + 'px',
        width: $parent.width() + 'px',
        height: ($parent.height() + 60) + 'px'
    });
    return true;
};

window.signUpComplete = function(access_token, refresh_token) {
    DBWP5_localize.access_token = access_token;
    DBWP5_localize.refresh_token = refresh_token;
    DBWP5.__showIFrame();
}

DBWP5.logout = function() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": DBWP5_localize.ajax_logout_url,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function(response) {
        DBWP5_localize.access_token = '';
        DBWP5_localize.refresh_token = '';
        DBWP5.process_login();
    });
}

DBWP5.init = function() {
    DBWP5.__addWindowResizeListener();
    DBWP5.scroll_load();
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

DBWP5.add_dbsdk_notification = function(){
    var notify = '<div id="dbsdk_modal_notification" class="fadeIn">'
    + '<div id="modal_notification" class="modal">'
    + '<div class="db-loading">'
    + '<p>Please wait download image...</p>'
    + '<div class="inner-circles-loader large loading-icon"></div>'
    + '</div>'
    + '</div>'
    + '</div>';
    document.body.insertAdjacentHTML('beforeend', notify);
}

/* Tạm thời chưa dùng */
DBWP5.add_design_info_notification = function(){
    var element = '<div id="design_info_notification" class="fadeIn">';
    element += '<div id="small_notification" class="modal">';
    element += '<div class="db-loading"><p>Please wait...</p>';
    element += '<div class="inner-circles-loader large loading-icon"></div>';
    element += '</div>';
    element += '</div>';
    element += '</div>';
    document.getElementsByClassName('designbold-items')[0].insertAdjacentHTML("afterbegin", element);
}

var l10n = typeof _wpMediaViewsL10n === 'undefined' ? {} : _wpMediaViewsL10n;
if(Object.entries(l10n).length > 0 && l10n.constructor === Object){
    DBWP5.init();
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
}

if (wp.media) {
    /**
     * Detect event click button Media Library
     */
    wp.media.view.Modal.prototype.on("open", function() {
        DBWP5.__checkForDefaultTab();
        DBWP5.__addModalCloseListener();
        DBWP5.add_dbsdk_notification();
    });

    $(wp.media).on('click', '.media-router a.media-menu-item', function(e) {
        var _this = $(this).attr('id');
        if(_this == __tabId){
            DBWP5.__addDesignBoldBodyClass();
            DBWP5.__showIFrame();
        }else{
            DBWP5.__removeDesignBoldBodyClass();
            DBWP5.__hideIFrame();
        }
    });
 }

/**
 * Ajax update WordPress option
 * @param  {string} option    Name of option
 * @param  {object} value     Object value of option
 * @return boolean            True if option value has changed, false if not or if update failed.
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
        if(parseInt(response) == 1){
            console.log("Update access token success !");
        }else{
            console.log("Update access token error.");
        }
    });
}

/* Get info user */
DBWP5.db_api_get_info_user = () => {
    var accessToken = DBWP5_localize.access_token;
    if(accessToken !== ''){
        return new Promise((resolve, reject) => {
            var data = null;
            var xhr = new XMLHttpRequest();
            var url = "https://api.designbold.com/v3/user/me?";
            var accessToken = DBWP5_localize.access_token;
            xhr.withCredentials = false;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if(xhr.status == 200){
                        DBWP5.user_account = JSON.parse(this.response);
                        resolve(DBWP5.user_account);
                    }else{
                        reject(this.statusText);
                    }
                }
            });

            xhr.open("GET", url);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            xhr.send(data);
        });
    }
}

/**
 * [DBWP5.__showIFrame Add iframe to body]
 */
DBWP5.__showIFrame = function() {
    $('body .media-modal-content .media-frame-content .attachments-browser').remove();
    $('body .media-modal-content .media-frame-content .uploader-inline').remove();
    DBWP5.process_login();
};

/**
 * Get new access token/ Update/ insert user meta data
 * @return {true} [ show layout workspace ]
 * @return {false} [ show layout login ]
 */
DBWP5.process_login = function () {
    DBWP5.get_new_access_token()
    .then((res) => {
        var res_data = JSON.parse(res);
        DBWP5.update_access_token_option( res_data['access_token'] );
        DBWP5_localize.access_token = res_data['access_token'];
        var res2 =DBWP5.db_api_get_info_user();
        return res2;
    })
    .then(function (res2){
        DBWP5.layout_workspaceData();
    })
    .catch((rej) => {
        // DBWP5.add_media_view();
        DBWP5.layout_login();
    });
}

/**
 * Get new access token
 * @return {json} [Access token]
 */
DBWP5.get_new_access_token = function() {
    return new Promise ((resolve, reject) => {
        var app_key = DBWP5_localize.app_key;
        var app_redirect_url = DBWP5_localize.app_update_option;
        var refresh_token = DBWP5_localize.refresh_token;

        if(refresh_token !== ''){
            var data = "app_key=" + app_key + "&redirect_uri=" + app_redirect_url + "&grant_type=refresh_token&refresh_token=" + refresh_token;
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if(xhr.status == 200){
                        resolve(this.response);
                    }else{
                        reject(this.response);
                    }
                }
            });

            xhr.open("POST", "https://accounts.designbold.com/v2/oauth/token");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.send(data);
        }else{
            reject('Missing refresh_token');
        }
    });
}

/**
 * Layout workspace
 * @return {html} [Show html layout workspace]
 */
DBWP5.layout_workspaceData = () => {
    if(DBWP5.all_data.length == 0){
        DBWP5.__getWorkSpace(DBWP5_localize.access_token)
        .then((res) => {
            var temp = JSON.parse(res);
            DBWP5.update_data(temp.response);
            DBWP5.print_layout_workspaceData();
        })
        .catch((rej) => {
            console.log(rej);
        })
    }else{
        DBWP5.print_layout_workspaceData();
    }
}

/**
 * Print layout workspace
 * @return {html} Print layout workspace
 */
DBWP5.print_layout_workspaceData = () => {
    var res_data        = DBWP5.all_data;
    var section         = document.createElement('div');
    section.className   = 'designbold-items attachments-browser';
    var avatar          = DBWP5.user_account.response.account.avatar;
    var email           = DBWP5.user_account.response.account.email;
    var name           = DBWP5.user_account.response.account.name;

    var html = '<div class="attachments ui-sortable ui-sortable-disabled">';
    html += "<div class='toolbar'>";
    html += '<ul>';
    html += '<li class="avatar"><img src="'+ avatar +'" class="thumb"/></li>';
    html += '<li class="name">'+ name +'</li>';
    html += '<li class="email">('+ email +')</li>';
    html += '<li class="close"><a href="javascript:void(0)" title="Đăng xuất" onclick="DBWP5.logout()"><span>x<span></a></li>';
    html += '</ul>';
    html += "</div>";
    for (var i in res_data) {
        html += "<div class='item' data-id='"+res_data[i]._id+"' onclick='DBWP5.design_info(this)'>";
        html += "<div class='attachment-preview'>";
        html += "<div class='thumbnail'>";
        html += "<div class='centered'>";
        html += "<img src='"+res_data[i].thumb+"' alt='"+res_data[i].title+"' class='thumb'>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += '<button type="button" class="check" tabindex="0"><span class="media-modal-icon"></span><span class="screen-reader-text">Deselect</span></button>';
        html += "</div>";
    }
    html += '</div>';
    html += '</div>';
    html += '<div class="media-sidebar"></div>';

    section.insertAdjacentHTML('beforeend', html);
    if ($('body').find('.media-modal-content .media-router a.media-menu-item.active')[0].innerText == "DesignBold") {
        $('body .media-modal-content .media-frame-content').html(section);
    }
}

DBWP5.append_layout_workspaceData = (data) => {
    var res_data = data;
    var html = '';
    for (var i in res_data) {
        if(res_data[i].thumb == ''){
            res_data[i].thumb = 'https://cdn.designbold.com/www/dbday/social/images/nothumb.jpg';
        }
        html += "<div class='item' data-id='"+res_data[i]._id+"' onclick='DBWP5.design_info(this)'>";
        html += "<div class='attachment-preview'>";
        html += "<div class='thumbnail'>";
        html += "<div class='centered'>";
        html += "<img src='"+res_data[i].thumb+"' alt='"+res_data[i].title+"' class='thumb'>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
    }

    if ($('body').find('.media-modal-content .media-router a.media-menu-item.active')[0].innerText == "DesignBold") {
        $('body .media-modal-content .media-frame-content .attachments-browser .attachments').append(html);
    }
}

DBWP5.design_info_flag = false;
/**
 * Get design infomation
 * @return { html }      Create html and append to media-sidebar
 */
DBWP5.design_info = async (data) => {
    $('.designbold-items.attachments-browser .attachments .item').removeClass('selected');
    data.classList.add('selected');
    if(DBWP5.design_info_flag !== false) {
        return;
    }

    $('.designbold-items.attachments-browser .attachments .item').removeClass('selected');
    $('.designbold-items.attachments-browser .attachments .item').removeClass('details');
    data.classList.add('selected', 'details');
    var id = data.getAttribute("data-id");
    var data = DBWP5.all_data;
    // console.log(data);

    for(let i in data){
        if(data[i]._id == id){
            DBWP5.design_info_flag = true;
            var html = '<div class="attachment-details">';
            /*Check design free or premium*/
            var checkout_info = await DBWP5.db_api_checkout(data[i]._id, data[i].version);
            var j_checkout_info = JSON.parse(checkout_info);
            var _medias = j_checkout_info.response.medias;
            var _total = j_checkout_info.response.total;

            var accountUser = DBWP5.user_account;
            var your_budget = parseInt(accountUser.response.account.budget);
            var your_budget_bonus = parseInt(accountUser.response.account.budget_bonus);
            var total_budget = your_budget + your_budget_bonus;
            var estimate = parseInt(_total);

            /*------------------------------------------------------------------------------------------*/

            html += '<h2>'+data[i].title+'</h2>';
            html += '<div class="attachment-info">';
            html += '<div class="thumbnail thumbnail-image"><img src="'+data[i].thumb+'" alt="'+data[i].title+'"></div>';
            html += '<div class="details design-info">';
            if(j_checkout_info.response.total == 0){
                html += '<div class="free-design">Design is free to download</div>';
            }else{
                html += '<div class="premium-design">Design Premium </div>';
            }
            
            /*------------------------------------------------------------------------------------------*/

            if(estimate > 1){
                html += '<div class="i-pay">Pay: <b><font color="#18b8a5">' + estimate +'</font></b> Coins<br></div>';
            }

            if(your_budget > 1){
                html += '<div class="i-budget">Budget: <b><font color="#18b8a5">' + your_budget +'</font></b> Coins<br></div>';
            }else if(your_budget == 1){
                html += '<div class="i-budget">Budget: <b><font color="#18b8a5">' + your_budget +'</font></b> Coin <br></div>';
            }

            if(your_budget_bonus > 1){
                html += '<div class="i-budget-bonus">Budget bonus: <b><font color="#18b8a5">' + your_budget_bonus +'</font></b> Coins<br></div>';
            }else if(your_budget_bonus == 1){
                html += '<div class="i-budget-bonus">Budget bonus: <b><font color="#18b8a5">' + your_budget_bonus +'</font></b> Coin <br></div>';
            }

            /*------------------------------------------------------------------------------------------*/

            /* If total equal 0 return save to library button else return payout button */
            if(_total == 0){
                html += '<div class="use_design">';
                html += '<button type="button" data-db-version="'+data[i].version+'" data-db-id="'+data[i]._id+'" class="button media-button button-primary button-large media-button-select"'; 
                html += 'onclick="DBWP5_db_api_free_render(this)">Save to library</button>';
                html += '</div>';
            }else if(total_budget < estimate){
                html += '<div class="use_design">';
                html += '<a href="https://www.designbold.com/pricing" class="button-primary" target="_blank">Buy Coin</a>';
                html += '</div>';
            }else{
                html += '<div class="use_design">';
                html += '<button type="button" data-db-version="'+data[i].version+'" data-db-id="'+data[i]._id+'" class="button media-button button-primary button-large media-button-select"'; 
                html += 'onclick="DBWP5_db_api_payout(this)">Payout and save to library</button>';
                html += '</div>';
            }

            /*------------------------------------------------------------------------------------------*/

            html += '<div class="type">'+data[i].dimensions.title+'</div>';
            html += '<div class="description">'+data[i].description+'</div>';
            html += '<div class="view_link"><a href="'+data[i].link+'" title="'+data[i].title+'" target="_blank">View design</a></div>';
            html += '<div class="edit_link"><a href="javascript:void(0)" title="'+data[i].title+'" class="db-edit-design"';
            html += ' data-id="'+data[i]._id+'" data-edit-link="'+data[i].edit_link+'" onclick="initDesignTool(this)">Edit design</a></div>';

            /*------------------------------------------------------------------------------------------*/

            /* List media items */
            if(_medias.length > 0) {
                var media_html = '<div class="list-media-items"><b>List items:</b></br>';
                for(var item in _medias){
                    media_html += '<div class="item"><label>Title :</label> <a href="' + _medias[item].thumb + '" class="i-title" target="_blank">'+_medias[item].title+'</a>';
                    if(parseInt(_medias[item].price) !== 0){
                        media_html += '<div class="i-price">Price : <b><font color="#18b8a5">'+_medias[item].price+'</font></b></div>';
                    }
                    media_html += '</div>';
                }
                media_html += '</div>';
            }
            else var media_html = '';

            html += media_html;
            html += '</div>';
            html += '</div>';
            html += '</div>';

            $('.attachment-details').remove();
            $('.media-sidebar').append(html);
            DBWP5.design_info_flag = false;
        }
    }
}

/**
 * Layout login
 * @return {html} Append html to media-frame-content
 */
DBWP5.layout_login = function() {
    var login_view = _.template($('#designit-wordpress5-plugin_login_tmpl').html());
    $('body .media-modal-content .media-frame-content').html(login_view({}));
}

var DBWP5_i = 0;
function DBWP5_db_api_check_render(url){
    return new Promise((resolve, reject) => {
        var data = null;
        var _url = url;
        var xhr = new XMLHttpRequest();
        var accessToken = DBWP5_localize.access_token;
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if(xhr.status == 200){
                    var res = JSON.parse(this.response);
                    resolve(res);
                }else if(xhr.status == 406){
                    resolve(xhr.status);
                }else{
                    reject('500');
                }
            }
        });

        xhr.open("GET", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.send(data);
    })
}

DBWP5.db_api_check_render_with_pk = (url) => {
    return new Promise((resolve, reject) => {
        var data = null;
        var _url = url;
        var xhr = new XMLHttpRequest();
        var accessToken = DBWP5_localize.access_token;
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if(xhr.status == 200){
                    var res = JSON.parse(this.response);
                    resolve(res);
                }else if(xhr.status == 406){
                    resolve(xhr.status);
                }else{
                    reject('500');
                }
            }
        });

        xhr.open("GET", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.send(data);
    })
}

/**
 * db_api_free_render Using API to download design
 * Return download url design
 */
async function DBWP5_db_api_check_render_with_pk(url, type=0){
    var downloadUrl = '';
    var document_id = '';

    if(type == 0){
        var result2 = await DBWP5_db_api_check_render(url);
    }else if(type == 1){
        var result2 = DBWP5.db_api_check_render_with_pk(url, 1);
    }
    
    
    if(result2.response == undefined || result2 == 406){
        DBWP5_db_api_check_render_with_pk(url, 0);
    }else if(result2 == 500){
        console.log('Render false!');
    }else{
        downloadUrl = result2.response.downloadUrl;
        document_id = result2.response.document_id;

        var resultUrl = encodeURIComponent(downloadUrl);
        var url  = DBWP5_localize.siteurl + "/wp-admin/admin-ajax.php?action=dbwp5_download_image";
        var params = "post_id=" + DBWP5_localize.post_id + "&image_url=" + resultUrl + "&image_name=" + document_id;
        var url = DBWP5_localize.siteurl + "/wp-admin/admin-ajax.php?action=dbwp5_download_image";
        DBSDK.uploadImage(url, params, "POST");
    }
}

// Check out
DBWP5.db_api_checkout = (_id, _version) => {
    return new Promise((resolve, reject) => {
        var data = null;
        var xhr = new XMLHttpRequest();
        var url = "https://api.designbold.com/v3/document/"+_id+"/checkout?type=png&pages=picked&version="+_version+"&picked=[1]";
        var accessToken = DBWP5_localize.access_token;
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

        xhr.open("GET", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.send(data);
    })
}

/* payout */
DBWP5.db_api_payout = (id) => {
    return new Promise((resolve, reject) => {
        var data = null;
        var xhr = new XMLHttpRequest();
        var accessToken = DBWP5_localize.access_token;
        var url = "https://api.designbold.com/v3/document/"+id+"/payout";
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

        xhr.open("PATCH", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.send(data);
    });
}

DBWP5.set_selected_item = ()=>{
    var el = $('.attachments-browser .attachments .attachment')[0];
    el.classList.add('selected', 'details');
}

/**
 * Start render to get pk parameter
 */
DBWP5_db_api_free_render = (attr) => {
    var id = attr.getAttribute("data-db-id");
    var d = new Date();
    var n = d.getMilliseconds();
    var name = id + n;
    var url = "https://api.designbold.com/v3/document/"+id+"/render?name="+name+"&type=png&crop_bleed=0&quality=high&pages=picked&mode=download&wm=0&session=&beta=0&picked=%5B1%5D";
    $('#dbsdk_modal_notification').css('display', 'block');
    var result = new Promise((resolve, reject) => {
        var data = null;
        var xhr = new XMLHttpRequest();
        var accessToken = DBWP5_localize.access_token;
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if(xhr.status == 200){
                    var _result = JSON.parse(this.response);
                    _result.response._id = id;
                    _result.response._name = name;
                    resolve(_result);
                }else{
                    reject(this.statusText);
                }
            }
        });

        xhr.open("GET", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.send(data);
    })

    result.then((res) => {
        var _pk = res.response.pk;
        var _id = res.response._id;
        var name = res.response._name;
        var url = "https://api.designbold.com/v3/document/"+id+"/render?name="+name+"&type=png&crop_bleed=0&quality=high&pages=picked&mode=download&wm=0&session=&beta=0&picked=%5B1%5D&pk="+_pk;
        DBWP5_db_api_check_render_with_pk(url, 0);
    })
    .catch((rej) => {
        console.log('Render error!');
    });
}

DBWP5_db_api_payout = (attr) =>{
    var id = attr.getAttribute("data-db-id");
    var payout = DBWP5.db_api_payout(id);
    payout.then((res) => {
        var res_payout = JSON.parse(res);
        if("response" in res_payout && "purchase_id" in res_payout.response){
            DBWP5_db_api_free_render(attr);
        }
    })
    .catch((rej) => {
        console.log('Payout error!');
    });   
}
