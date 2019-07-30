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

define('DESIGNBOLD_VERSION', '1.0.0');
define('DB_PLUGIN_NAME', 'designbold');
define('DB_AFFIX', 'dbwp5-');
define('DB_NAME_APP_KEY', 'dbwp5_option_app_key');
define('DB_NAME_APP_SECRET', 'dbwp5_option_app_secret');
define('DB_ROOT_PATH', plugin_dir_path(__FILE__));
define('DB_URL', plugin_dir_url(__FILE__));
define('DF_APP_KEY', 'Mj4VXEJ3dAwr6GPBzlR80qOajvEgye8Lk9oDWNKbemZ1X74x5Q2VYMaWD2NY@designbold-apps');
define('DF_APP_SECRET', 'y63LZXXlPa4RWyEG1b7mn0z2vkwDjDvA6doZqeQJ3L5YBr8VKg9pxNEW0vYD@designbold-apps');
define('DF_TOKEN', 'b0f99ceb3d596cb8e7152088548c41e981920c0bd92312047fd8e75b9eee440d');

if (defined('ALLOW_UNFILTERED_UPLOADS') === false) {
	define('ALLOW_UNFILTERED_UPLOADS', true);
}
require_once plugin_dir_path( __FILE__ ) . 'templates/media-view.php';

/**
 * The code insert/ update app config.
 */
add_action('dbwp5_app_config', 'dbwp5_update_option', 10, 2);
function dbwp5_update_option() {
	update_option(DB_NAME_APP_KEY, DF_APP_KEY, 'yes');
	update_option(DB_NAME_APP_SECRET, DF_APP_SECRET, 'yes');
}
do_action('dbwp5_app_config');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-designbold-activator.php
 */
function activate_designbold() {
	require_once plugin_dir_path(__FILE__) . 'includes/class-designbold-activator.php';
	require_once plugin_dir_path(__FILE__) . 'templates/media-view.php';
	DesignBold_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-designbold-deactivator.php
 */
function deactivate_designbold() {
	require_once plugin_dir_path(__FILE__) . 'includes/class-designbold-deactivator.php';
	DesignBold_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_designbold');
register_deactivation_hook(__FILE__, 'deactivate_designbold');

add_action('admin_enqueue_scripts', 'dbwp5_namespace_scripts_styles');
function dbwp5_namespace_scripts_styles() {
	$dir = plugin_dir_url(__FILE__);
	$access_token = dbwp5_get_option_user('dbwp5_access_token');
	$refresh_token = dbwp5_get_option_user('dbwp5_refresh_token');

	wp_enqueue_style(DB_PLUGIN_NAME.'_bootstrap', $dir . 'assets/css/bootstrap.min.css');
	wp_enqueue_style(DB_PLUGIN_NAME.'_designbold-admin', $dir . 'assets/css/designbold-admin.css', array(), 1, 'all');

	// Js
	wp_enqueue_script('dbwp5_underscore.js', $dir . 'assets/js/underscore-min.js');
	wp_enqueue_script('dbwp5_underscore.js', $dir . 'assets/js/jquery.min.js');
	wp_enqueue_script(DB_PLUGIN_NAME, $dir . 'assets/js/admin.js', array('jquery'), DESIGNBOLD_VERSION, true);
	wp_localize_script(DB_PLUGIN_NAME, 'DBWP5_localize', array(
		'base_url' => DB_URL,
		'df_token' => DF_TOKEN,
		'access_token' => $access_token,
		'refresh_token' => $refresh_token,
		'app_update_option' => admin_url('admin-ajax.php?action=' . DB_AFFIX . 'update-access-token'),
		'app_redirect_url' => admin_url('admin-ajax.php?action=' . DB_AFFIX . 'process-login'),
		'app_key' => get_option('dbwp5_option_app_key') != '' ? get_option('dbwp5_option_app_key') : "",
		'media_css' => $dir . 'assets/css/media-view.css',
	));
}

add_action('wp_ajax_nopriv_dbwp5-process-login', 'dbwp5_login');
add_action('wp_ajax_dbwp5-process-login', 'dbwp5_login');
function dbwp5_login() {
	if (file_exists(DB_ROOT_PATH . 'designbold.php')) {
		include DB_ROOT_PATH . 'designbold.php';

		$action = isset($_GET['db_action']) ? $_GET['db_action'] : 'callback';
		if ($action == 'connect') {
			connect();
		} else {
			callback();
		}
		exit(0);
	}
}

add_action('wp_ajax_nopriv_dbwp5-process-logout', 'dbwp5_logout');
add_action('wp_ajax_dbwp5-process-logout', 'dbwp5_logout');
function dbwp5_logout() {
	dbwp5_delete_option_user('dbwp5_info_user');
	dbwp5_delete_option_user('dbwp5_access_token');
	dbwp5_delete_option_user('dbwp5_refresh_token');
}

function dbwp5_get_option_user($option) {
	return get_option($option);
}

/* Delete user option
 * $option - (string) (required) Name of the option to be deleted.
 * Return (boolean) - True, if option is successfully deleted. False on failure, or option does not exist.
 */
function dbwp5_delete_option_user($option) {
	if ($option !== null && $option !== '' && $option !== undefined) {
		return delete_option($option);
	}
}

/*
 * Update/ insert option
 * $option - (string) (required) Name of the option to update.
 * $newvalue - (mixed) (required) The NEW value for this option name. This value can be an integer, string, array, or object.
 * $autoload - (mixed) (optional) Whether to load the option when WordPress starts up
 * return - (boolean) True if option value has changed, false if not or if update failed.
 */
function dbwp5_update_option_user($option, $new_value, $autoload = flase) {
	if ($option !== null && $option !== '' && $option !== undefined) {
		return update_option($option, $new_value, $autoload);
	}
}

/**
 * Insert/ update user info
 * Insert/ update access token
 * Insert/ update refresh token
 */
add_action('dbwp5_save_account', 'dbwp5_save_account', $priority = 10, $accepted_args = 2);
function dbwp5_save_account($access_token, $refresh_token) {
	if ($access_token !== '' && $refresh_token != '') {
		$ch = curl_init();

		$options = array(
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_URL => "https://api.designbold.com/v3/user/me?",
			CURLOPT_HTTPHEADER => array(
				"Content-Type: application/x-www-form-urlencoded",
				'cache-control: no-cache',
				'Authorization: Bearer ' . $access_token,
			),
		);

		curl_setopt_array($ch, $options);

		$response = curl_exec($ch);

		$result = json_decode($response, true);
		echo '<br>';
		print_r($result);

		if ($result !== ''):

			$user = $result['response']['user'];
			$account = $result['response']['account'];
			$user_metadata = array(
				'user_name' => $user['username'],
				'email' => $account['email'],
				'group_id' => $account['group_id'],
				'name' => $account['name'],
				'avatar' => $account['avatar'],
				'budget' => $account['budget'],
				'budget_bonus' => $account['budget_bonus'],
				'slug' => $account['slug'],
				'hash_id' => $account['hash_id'],
				'first_name' => $account['hash_id'],
				'last_name' => $account['hash_id'],
			);

			// Update/ insert user meta data
			dbwp5_update_option_user('dbwp5_info_user', $user_metadata);
			dbwp5_update_option_user('dbwp5_access_token', $access_token);
			dbwp5_update_option_user('dbwp5_refresh_token', $refresh_token);

		endif;
	}
}

/**
 *
 */
add_action('dbwp5_show_workspace', 'dbwp5_show_workspace');
function dbwp5_show_workspace() {
}

/**
 * Custome hook to check validate access token ever reload website
 *
 */
add_action('wp_ajax_dbwp5-validate-access-token', 'dbwp5_validate_access_token');
function dbwp5_validate_access_token() {
	// Get dbmenu_access_token in wp_usermeta table
	$access_token = dbwp5_get_option_user('dbwp5_access_token');
	$refresh_token = dbwp5_get_option_user('dbwp5_refresh_token');

	if ($access_token !== '' && $refresh_token !== '' && $access_token !== null && $refresh_token !== null):
		/**
		 * status_expires = 200 : success.
		 * status_expires = 204 : access token invalid.
		 */
		$status_expires = do_action('dbwp5_check_access_token_expires', $access_token);

		if ($status_expires == 204) {
			/**
			 * status = 200 => success.
			 * status = 406 : refresh token expires.
			 * status = 500 : not create access token.
			 */
			$status = do_action('dbwp5_refresh_access_token', $refresh_token);

			if ($status == 200):
				dbmenu_set_current_user($wp_current_user_info->ID);
			else: // 406 || 500
				dbmenu_define_user_metadata($wp_current_user_info->ID, 'dbmenu_access_token', '');
			endif;
		}
	endif;
}

add_action('wp_ajax_dbwp5-update-access-token', 'dbwp5_update_access_token');
add_action('wp_ajax_nopriv_dbwp5-update-access-token', 'dbwp5_update_access_token');
function dbwp5_update_access_token() {
	$access_token = isset($_POST['access_token']) ? trim($_POST['access_token']) : '';
	$res = dbwp5_update_option_user('dbwp5_access_token', $access_token);
	if ($res) {
		echo '1';
	} else {
		echo '2';
	}
}

/**
 * Custome hook to check access token expires
 * Status = 200 : success.
 * Status = 204 : access token invalid.
 */
add_action('dbwp5_check_access_token_expires', 'dbwp5_check_access_token_expires', 10, 1);
function dbwp5_check_access_token_expires($access_token = null) {
	if ($access_token !== null):
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => "https://accounts.designbold.com/v2/oauth/tokeninfo",
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => "access_token=" . $access_token,
			CURLOPT_HTTPHEADER => array(
				"Content-Type: application/x-www-form-urlencoded",
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);
		$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

		curl_close($curl);

		return $status;
	endif;
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
add_action('dbwp5_refresh_access_token', 'dbwp5_refresh_access_token', 10, 2);
function dbwp5_refresh_access_token($refresh_token = null) {
	$refresh_token_df = 'b0f99ceb3d596cb8e7152088548c41e981920c0bd92312047fd8e75b9eee440d';
	$refresh_token = $refresh_token !== null ? $refresh_token : $refresh_token_df;
	$curl = curl_init();
	$app_key = dbwp5_get_option_user(DB_NAME_APP_KEY) != '' ? dbwp5_get_option_user(DB_NAME_APP_KEY) : "";
	$app_redirect_url = admin_url('admin-ajax.php?action=dbwp5-process-login');
	$data = "app_key=" . $app_key . "&redirect_uri=" . $app_redirect_url . "&grant_type=refresh_token&refresh_token=" . $refresh_token . "&undefined=";

	curl_setopt_array($curl, array(
		CURLOPT_URL => "https://accounts.designbold.com/v2/oauth/token",
		CURLOPT_RETURNTRANSFER => 1,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => $data,
		CURLOPT_HTTPHEADER => array(
			"Content-Type: application/x-www-form-urlencoded",
		),
	));

	$res_data = '';
	$response = curl_exec($curl);
	$err = curl_error($curl);
	$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

	/**
	 * Status = 200 => success.
	 * status = 406 : refresh token expires.
	 * status = 500 : not create access token.
	 */
	if ($status == 200) {
		$res_data = json_decode($response, true);
		// Update/ insert user meta data
		dbmenu_define_user_metadata($user_id, 'dbmenu_access_token', $res_data['access_token']);
	} elseif ($status == 406 || $status == 500) {
		for ($i = 0; $i < 5; $i++) {
			do_action('designbold_auth_menu_bar_refresh_access_token', $refresh_token, $user_id);
		}
	}

	curl_close($curl);
	return $status;
}