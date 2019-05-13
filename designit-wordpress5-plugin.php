<?php
/*
Plugin Name: DesignBold Design Button
Plugin URI: https://www.designbold.com/collection/create-new
Description: Desingbold designit build plugin allow designning image online
Version: 1.0.0
Author: DesignBold <hieptv@designbold.com>
Author URI: https://www.designbold.com/
License: GPLv2 or later
*/

/*
Plugin used to Wordpress version 5.0 integration the Gutenberg editor.

{Designit} is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.

{Designit} is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with {Designit}. If not, see {Plugin URI}.
*/

defined('ABSPATH') or die('No script kiddies please!');

define( 'DESIGNBOLD_VERSION', '1.0.0' );

/**
 * Due to some browsers not supporting the HTML5 File Constructor call, it's
 * neccessary to allow unfiltered uploads in order to facilitate image exporting
 * from the Stencil app into the WordPress installation.c
 * 
 * Without this, image exporting fails for browsers include:
 * - Internet Explorer (all versions)
 * - Microsoft Edge (all versions)
 * - Mozilla Firefox (versions <= 27)
 * - Google Chrome (versions <= 37)
 * - Apple Safari (versions <= 9.1)
 * - iOS Safari (versions <= 9.3)
 * - Opera (versions <= 24)
 * 
 * @see     https://caniuse.com/#feat=fileapi
 */
if (defined('ALLOW_UNFILTERED_UPLOADS') === false) {
    define( 'ALLOW_UNFILTERED_UPLOADS', true );
}

add_action('admin_enqueue_scripts', function(){
    wp_enqueue_script( 'my-media-tab', plugin_dir_url( __FILE__ ) . 'assets/js/media.js', array( 'jquery' ), time(), true );
});