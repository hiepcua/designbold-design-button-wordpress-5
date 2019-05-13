var l10n = wp.media.view.l10n;
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
        my_tab: {
            text:     "DesignBold",
            priority: 60
        }
    });
};

jQuery(document).ready(function($){
    if ( wp.media ) {
        wp.media.view.Modal.prototype.on( "open", function() {
            if($('body').find('.media-modal-content .media-router a.media-menu-item.active')[0].innerText == "My tab")
                doMyTabContent();
        });
        $(wp.media).on('click', '.media-router a.media-menu-item', function(e){
            if(e.target.innerText == "My tab")
                doMyTabContent();
        });
    }
});

function doMyTabContent() {
    var html = '<div id="myTabContent">';
    //My tab content here
    html += '</div>';
    $('body .media-modal-content .media-frame-content')[0].innerHTML = html;
}

var container   = document.getElementById('myTabContent');

// h is short for hyperscript and it makes everything a little bit easier
var h = React.createElement;


// This is how we inherit methods like setState from React.Component
Timer.prototype = Object.create(React.Component.prototype);

function Timer(props) {
    React.Component.constructor.call(this);
    var self = this;

    self.state = { seconds: 0 };

    self.tick = function() {
        self.setState(function(prevState) {
            return { seconds: prevState.seconds + 1 };
        });
    };

    self.componentDidMount = function() {
        self.interval = setInterval(self.tick, 1000);
    };

    self.componentWillUnmount = function() {
        clearInterval(self.interval);
    };

    self.render = function() {
        return h('div', null, 'seconds: ', self.state.seconds);
    }
}

ReactDOM.render(h(Timer), container);