<?php
/**
 * 公共函数
 *
 * @package WenPai\FaLv
 */

if ( ! function_exists( 'wpfl_get_option' ) ) {
    function wpfl_get_option( string $option, string $section, $default = '' ) {
        $options = is_multisite() ? get_site_option( WPFL_PREFIX . "_{$section}" ) : get_option( WPFL_PREFIX . "_{$section}" );

        if ( isset( $options[ $option ] ) ) {
            return $options[ $option ];
        }

        return $default;
    }
}

/**
 * 注册短码们
 */
add_shortcode('Domain', function () {
	return wpfl_get_option('domain', 'wpfl_settings');
});
add_shortcode('Business-Name', function () {
	return wpfl_get_option('business_name', 'wpfl_settings');
});
add_shortcode('Phone', function () {
	return wpfl_get_option('phone', 'wpfl_settings');
});
add_shortcode('Street', function () {
	return wpfl_get_option('street', 'wpfl_settings');
});
add_shortcode('City-State-Zipcode', function () {
	return wpfl_get_option('city_state_zipcode', 'wpfl_settings');
});
add_shortcode('Country', function () {
	return wpfl_get_option('country', 'wpfl_settings');
});
add_shortcode('Email', function () {
	return wpfl_get_option('email', 'wpfl_settings');
});
add_shortcode('Address', function () {
	return wpfl_get_option('address', 'wpfl_settings');
});
