<?php
/**
 * Plugin Name: WPFalv Generator
 * Description: Bring the most standardized and authoritative Chinese Internet operations related legal provisions into your WordPress website, and automatically generate a template template page.
 * Author: WenPai.org
 * Author URI: https://wenpai.org/
 * Version: 1.0.0
 * License: GPLv2
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

namespace WenPai\FaLv;

define( 'WPFL_PREFIX', 'wpfl' );
define( 'WPFL_VERSION', '1.0.0' );
define( 'WPFL_PLUGIN_URL' , plugin_dir_url( __FILE__ ) );
define( 'WPFL_API_URL' , 'https://api.falv.haozi.xyz');

require_once 'load.php';
