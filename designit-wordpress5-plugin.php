<?php
/**
 * Plugin Name: DesignBold Design Button
 * Plugin URI: https://www.designbold.com/collection/create-new
 * Description: Desingbold designit build plugin allow designning image online
 * Version: 1.0.0
 * Author: DesignBold <hieptv@designbold.com>
 * Author URI: https://www.designbold.com/
 * License: GPLv2 or later

 * Plugin used to Wordpress version 5.0 integration the Gutenberg editor.

 * {DesignBold} is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.

 * {DesignBold} is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with {DesignBold}. If not, see {Plugin URI}.
*/

defined('ABSPATH') or die('No script kiddies please!');

define( 'DESIGNBOLD_VERSION', '1.0.0' );
define( 'DF_TOKEN', 'b0f99ceb3d596cb8e7152088548c41e981920c0bd92312047fd8e75b9eee440d' );

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

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-designbold-activator.php
 */
function activate_designbold() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-designbold-activator.php';
	DesignBold_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-designbold-deactivator.php
 */
function deactivate_designbold() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-designbold-deactivator.php';
	DesignBold_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_designbold' );
register_deactivation_hook( __FILE__, 'deactivate_designbold' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-designbold.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_designbold() {
	$plugin = new DesignBold();
	$plugin->run();
}
run_designbold();
