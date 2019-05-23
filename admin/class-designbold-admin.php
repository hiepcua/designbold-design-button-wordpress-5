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
		$current_user = wp_get_current_user();
		$current_user_id = $current_user->ID;
		$access_token = $refresh_token = '';

		if( $current_user_id !== 0 ){
			$access_token = get_user_meta( $current_user_id, 'dbmenu_access_token', true );
			$refresh_token = get_user_meta( $current_user_id, 'dbmenu_refresh_token', true );
		}

		wp_enqueue_script( $this->plugin_name.'_underscore.js', plugin_dir_url( __FILE__ ) . 'js/underscore-min.js', array('jquery'), $this->version, true );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/admin.js', array('jquery'), $this->version, true );

		wp_localize_script( $this->plugin_name, 'DBWP5_localize', array(
			'df_token' => DF_TOKEN,
			'access_token' => $access_token,
			'refresh_token' => $refresh_token,
			'app_redirect_url'  => admin_url('admin-ajax.php?action='.DB_AFFIX.'process-login'),
			'app_key' => get_option('dbmenu_option_app_key') != '' ? get_option('dbmenu_option_app_key') : "",
		) );

		wp_enqueue_script( $this->plugin_name.'_core', plugin_dir_url( __FILE__ ) . 'js/designbold-core.js', array( 'jquery' ), $this->version, false );
	}

	// wp_ajax_nopriv_dbwp5-process-login
	// wp_ajax_dbwp5-process-login
	public function login(){}

	public function logout(){}
	
	public function save_options(){}
	
	public function insert_user(){}
	
	public function username_exists(){}
	
	public function set_current_user(){}

	public function defind_user_metadata(){}

	public function delete_user_metadata(){}

	public function get_user_metadata_exists(){}

	public function get_user_metadata_by_user_id_and_meta_key(){}
	
	public function save_account(){}

	public function validate_access_token(){}

	public function check_access_token_expires(){}
	
	public function refresh_access_token(){}

}
