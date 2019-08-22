
var DBWP5 = DBWP5 || {};
DBWP5.numPage = 1;
DBWP5.numPerPage = 20;
DBWP5.userInfoAPI = {};
DBWP5.frame_content = '';
DBWP5.df_token = DBWP5_localize.df_token;
DBWP5.access_token = DBWP5_localize.access_token;
DBWP5.refresh_token = DBWP5_localize.refresh_token;
DBWP5.base_url = DBWP5_localize.base_url;
// DBWP5.media_css = DBWP5_localize.media_css;
DBWP5.access_token_status = 0;
DBWP5.all_data = [];

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
        if (event.target === attachments[0]) { // just use native javascript becuz jquery scroll bind not work
           
           var lastItem = attachments.find('.item:last-child');
           if( lastItem.position().top <= attachments.height() ) {
                //check load het chua
                if(runningAjaxRequest !== false) {
                   runningAjaxRequest.abort();
                }

                var start = DBWP5.numPage * DBWP5.numPerPage;
                var end = DBWP5.numPerPage;
                var access_token = DBWP5.access_token;

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

window.signUpComplete = function() {
    DBWP5.layout_workspaceData();
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
DBWP5.process_login = function(){
    DBWP5.get_new_access_token()
    .then((res) => {
        var res_data = JSON.parse(res);
        DBWP5.update_access_token_option( res_data['access_token'] );
        DBWP5_localize.access_token = res_data['access_token'];
        DBWP5.layout_workspaceData();
    })
    .catch((rej) => {
        DBWP5.layout_login();
    });
}

/**
 * Get new access token
 * @return {json} [Access token]
 */
DBWP5.get_new_access_token = () => {
    return new Promise ((resolve, reject) => {
        var app_key = DBWP5_localize.app_key;
        var app_redirect_url = DBWP5_localize.app_update_option;
        var refresh_token = DBWP5_localize.refresh_token;
        if(refresh_token == ''){
            refresh_token = 'b0f99ceb3d596cb8e7152088548c41e981920c0bd92312047fd8e75b9eee440d';
        }

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
    var res_data = DBWP5.all_data;
    var section = document.createElement('div');
    section.className = 'designbold-items attachments-browser';
    var html = '<div class="attachments ui-sortable ui-sortable-disabled">';
    for (var i in res_data) {
        html += "<div class='item attachment' data-id='"+res_data[i]._id+"' onclick='DBWP5.design_info(this)'>";
        html += "<div class='attachment-preview'>";
        html += "<div class='thumbnail'>";
        html += "<div class='centered'>";
        html += "<img src='"+res_data[i].thumb+"' alt='"+res_data[i].title+"' class='thumb'>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
    }
    html += '</div>';
    html += '</div>';
    html += '<div class="media-sidebar"></div>';

    section.insertAdjacentHTML('beforeend', html);
    if ($('body').find('.media-modal-content .media-router a.media-menu-item.active')[0].innerText == "DesignBold") {
        $('body .media-modal-content .media-frame-content').append(section);
    }
}

DBWP5.append_layout_workspaceData = (data) => {
    var res_data = data;
    var html = '';
    for (var i in res_data) {
        html += "<div class='item attachment' data-id='"+res_data[i]._id+"' onclick='DBWP5.design_info(this)'>";
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

/**
 * Get design infomation
 * @return { html }      Create html and append to media-sidebar
 */
DBWP5.design_info = (data) => {
    $('.designbold-items.attachments-browser .attachments .attachment').removeClass('selected');
    $('.designbold-items.attachments-browser .attachments .attachment').removeClass('details');
    data.classList.add('selected', 'details');
    var id = data.getAttribute("data-id");
    var data = DBWP5.all_data;
    // console.log(data);
    html = '<div class="attachment-details">';
    for(var i in data){
        if(data[i]._id == id){
            html += '<h2>'+data[i].title+'</h2>';
            html += '<div class="attachment-info">';
            html += '<div class="thumbnail thumbnail-image"><img src="'+data[i].thumb+'" alt="'+data[i].title+'"></div>';
            html += '<div class="details design-info">';
            html += '<div class="type">'+data[i].dimensions.title+'</div>';
            html += '<div class="description">'+data[i].description+'</div>';
            html += '<div class="view_link"><a href="'+data[i].link+'" title="'+data[i].title+'" target="_blank">View design</a></div>';
            html += '<div class="edit_link"><a href="javascript:void(0)" title="'+data[i].title+'" class="db-edit-design"';
            html += ' data-id="'+data[i]._id+'" data-edit-link="'+data[i].edit_link+'" onclick="initDesignTool(this)">Edit design</a></div>';
            html += '<div class="use_design">';
            html += '<button type="button" data-db-version="'+data[i].version+'" data-db-id="'+data[i]._id+'" class="button media-button button-primary button-large media-button-select" onclick="DBWP5_db_api_free_render(this)">Save to library</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
    }
    html += '</div>';
    $('.attachment-details').remove();
    $('.media-sidebar').append(html);
}

/**
 * Layout login
 * @return {html} Append html to media-frame-content
 */
DBWP5.layout_login = function() {
    var login_view = _.template($('#designit-wordpress5-plugin_login_tmpl').html());
    $('body .media-modal-content .media-frame-content').html(login_view({}));
}

DBWP5.init();

DBWP5.accessProtectedResource = (url, method_opt) => {
    return new Promise((resolve, reject) => {
        var data = null;
        var xhr = new XMLHttpRequest();
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

        xhr.open(method_opt, url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.send(data);
    })
}

/**
 * db_api_free_render Using API to download design
 * Return download url design
 */
async function DBWP5_db_api_free_render(attr){
    var flag = true;
    var version = attr.getAttribute("data-db-version");;
    var id = attr.getAttribute("data-db-id");
    var d = new Date();
    var n = d.getMilliseconds();
    var name = id + n;
    var url = "https://api.designbold.com/v3/document/"+id+"/render?name="+name+"&type=png&crop_bleed=0&quality=high&pages=picked&mode=download&wm=0&session=&beta=0&picked=%5B1%5D";

    // Get pk parameter
    var result1 = await DBWP5.accessProtectedResource(url, "GET");
    var _result1 = JSON.parse(result1);
    var pk = _result1.response.pk;

    var i = 0;
    var downloadUrl = '';
    var document_id = '';
    do{
        i++;
        // Get download url
        let result2 = await DBWP5.accessProtectedResource(url+'&pk='+pk, "GET");
        let _result2 = JSON.parse(result2);

        if(_result2.response !== undefined && _result2.response.downloadUrl !== undefined){
            downloadUrl = _result2.response.downloadUrl;
            document_id = _result2.response.document_id;
        }
    }while(downloadUrl == '' && i <= 5);

    var resultUrl = encodeURIComponent(downloadUrl);
    var url  = DBWP5_localize.siteurl + "/wp-admin/admin-ajax.php?action=dbwp5_download_image";
    var params = "post_id=" + DBWP5_localize.post_id + "&image_url=" + resultUrl + "&image_name=" + document_id;
    var url = DBWP5_localize.siteurl + "/wp-admin/admin-ajax.php?action=dbwp5_download_image";
    DBSDK.uploadImage(url, params, "POST");
    // return downloadUrl;
}