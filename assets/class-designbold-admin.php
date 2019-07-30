<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://designbold.com/
 * @since      1.0.0
 *
 * @package    DesignBold
 * @subpackage DesignBold/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    DesignBold
 * @subpackage DesignBold/admin
 * @author     DesignBold <hieptv@designbold.com>
 */
class DesignBold_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in DesignBold_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The DesignBold_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/designbold-admin.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in DesignBold_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The DesignBold_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		$access_token = $this->dbwp5_get_option_user( 'dbwp5_access_token' );
		$refresh_token = $this->dbwp5_get_option_user( 'dbwp5_refresh_token' );

		// wp_enqueue_script( $this->plugin_name.'_underscore.js', plugin_dir_url( __FILE__ ) . 'js/underscore-min.js' );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/admin.js', array('jquery'), $this->version, true );

		wp_localize_script( $this->plugin_name, 'DBWP5_localize', array(
			'base_url' => DB_URL,
			'df_token' => DF_TOKEN,
			'access_token' => $access_token,
			'refresh_token' => $refresh_token,
			'app_redirect_url'  => admin_url('admin-ajax.php?action='.DB_AFFIX.'process-login'),
			'app_key' => get_option('dbwp5_option_app_key') != '' ? get_option('dbwp5_option_app_key') : "",
		) );

		// wp_enqueue_script( $this->plugin_name.'_core', plugin_dir_url( __FILE__ ) . 'js/designbold-core.js', array( 'jquery' ), $this->version, false );
	}

	public function login(){
		if(file_exists(DB_ROOT_PATH . 'designbold.php')) {
			include(DB_ROOT_PATH.'designbold.php');

			$action = isset($_GET['db_action']) ? $_GET['db_action'] : 'callback';
			if ($action == 'connect'){
				connect();
			}
			else{
				callback();
			}
			exit(0);
		}
	}

	public function logout(){
		dbwp5_delete_option_user('dbwp5_info_user');
		dbwp5_delete_option_user('dbwp5_access_token');
		dbwp5_delete_option_user('dbwp5_refresh_token');
	}

	/*
	 * Update/ insert option
	 * $option - (string) (required) Name of the option to update.
	 * $newvalue - (mixed) (required) The NEW value for this option name. This value can be an integer, string, array, or object.
	 * $autoload - (mixed) (optional) Whether to load the option when WordPress starts up
	 * return - (boolean) True if option value has changed, false if not or if update failed.
	*/
	public function dbwp5_update_option_user( $option, $new_value, $autoload = flase){
		if( $option !== null && $option !== '' && $option !== undefined ){
			return update_option( $option, $new_value, $autoload );
		}
	}

	/* Delete user option
	 * $option - (string) (required) Name of the option to be deleted. 
	 * Return (boolean) - True, if option is successfully deleted. False on failure, or option does not exist.
	*/
	public function dbwp5_delete_option_user( $option ){
		if( $option !== null && $option !== '' && $option !== undefined ){
			return delete_option( $option );
		}
	}

	/**
	 * $option
	 * (string) (Required) Name of option to retrieve. Expected to not be SQL-escaped.

	 * $default
	 * (mixed) (Optional) Default value to return if the option does not exist.
	 * Default value: false
	 * 
	 * return (mixed) Value set for the option.
	*/
	public function dbwp5_get_option_user( $option ){
		return get_option( $option );
	}
	
	/**
	 * Insert/ update user info
	 * Insert/ update access token
	 * Insert/ update refresh token
	*/
	public function dbwp5_save_account($access_token, $refresh_token){
		if( $access_token !== '' && $refresh_token != '' ){
			$ch = curl_init();

			$options = array(
				CURLOPT_RETURNTRANSFER => 1,
				CURLOPT_URL => "https://api.designbold.com/v3/user/me?",
				CURLOPT_HTTPHEADER => array(
					"Content-Type: application/x-www-form-urlencoded",
					'cache-control: no-cache',
					'Authorization: Bearer ' . $access_token,
				)
			);

			curl_setopt_array($ch, $options);

			$response = curl_exec($ch);

			$result = json_decode($response, true);

			if( $result !== '' ) :

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
				$this->dbwp5_update_option_user( 'dbwp5_info_user', $user_metadata );
				$this->dbwp5_update_option_user( 'dbwp5_access_token', $access_token );
				$this->dbwp5_update_option_user( 'dbwp5_refresh_token', $refresh_token );

			endif;
		}
	}

	public function dbwp5_validate_access_token(){}

	public function dbwp5_check_access_token_expires(){}
	
	public function dbwp5_refresh_access_token(){}

	public function dbwp5_show_workspace(){

	}

}
