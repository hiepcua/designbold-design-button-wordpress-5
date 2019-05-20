
// câu slogan khiến người ta lo sợ về sự an toàn của người thân ở nhà 
// -----------------------------------------------------------------------------------
(function($){
    var __localize_config = DB_localize_script;

    l10n = wp.media.view.l10n = typeof _wpMediaViewsL10n === 'undefined' ? {} : _wpMediaViewsL10n;
    
    var __menuItemKey = 'designbold';
    /**
     * __menuItemCopy
     * 
     * @access  private
     * @var     String (default: 'DesignBold')
     */
     var __menuItemCopy = 'DesignBold';

    /**
     * __getDefaultMenuItems
     * 
     * @access  private
     * @return  Object
     */
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

    /**
     * __getDesignBoldTabAnchorElement
     * 
     * @access  private
     * @return  jQuery
     */
     var __getDesignBoldTabAnchorElement = function() {
        var text = __menuItemCopy,
        selector = 'a.media-menu-item:contains("' + (text) + '"):visible',
        $element = __$(selector);
        return $element;
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
            if($('body').find('.media-modal-content .media-router a.media-menu-item.active')[0].innerText == "DesignBold")
                doMyTabContent();
        });
        $(wp.media).on('click', '.media-router a.media-menu-item', function(e){
            if(e.target.innerText == "DesignBold")
                doMyTabContent();
        });
    }

    function doMyTabContent() {
        var html = '<div class="myTabContent">123456789';
        //My tab content here
        html += '</div>';
        $('body .media-modal-content .media-frame-content')[0].innerHTML = html;
    }

    var __recent_doctype = function (){
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
            xhr.setRequestHeader("Authorization", "Bearer " + __localize_config.df_token);

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

})(jQuery);

