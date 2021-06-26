<?php
/**
 * 设置项注册文件
 *
 * @package WenPai\FaLv
 */

namespace WenPai\FaLv\Src;

use WenPai\Framework\Setting;

Setting::create_options( WPFL_PREFIX, array(
	'menu_title' => '文派法律',
	'menu_slug'  => 'wpfl',
	'network'    => true,
) );

Setting::create_section( WPFL_PREFIX, array(
	array(
		'id'     => 'wpfl_template_library',
		'title'  => '法律文书范本库',
		'fields' => array(
			array(
				'name'  => 'html',
				'label' => <<<html
<style>
td {
padding: 15px 0px!important;
}
#wpfl_control *{
vertical-align: sub;
}
</style>
<table id="wpfl_selected" class="wp-list-table widefat">
	<thead>
	<tr>
		<td id="wpfl_selected_all" class="manage-column check-column"><label class="screen-reader-text" for="wpfl_selected_all-1">全选</label><input id="wpfl_selected_all-1" type="checkbox"></td>
		<th scope="col" class="manage-column" style="width: 260px;">标题（排序）</th>
		<th scope="col" class="manage-column">类型</th>
		<th scope="col" class="manage-column">适用站点</th>
	</tr>
	</thead>
	<tbody id="the-list">
	</tbody>

</table>
html,
				'type'  => 'html',
				'html'  => <<<html
<table id="wpfl_lists" class="wp-list-table widefat">
	<thead>
	<tr>
		<td id="wpfl_lists_all" class="manage-column check-column"><label class="screen-reader-text" for="wpfl_lists_all-1">全选</label><input id="wpfl_lists_all-1" type="checkbox"></td>
		<th scope="col" class="manage-column column-name column-primary">标题（排序）</th>
		<th scope="col" class="manage-column">类型</th>
		<th scope="col" class="manage-column">适用站点</th>
		<th scope="col" class="manage-column">下载量（排序）</th></tr>
	</thead>

	<tbody id="wpfl_lists_table">
	</tbody>
</table>
<div id="wpfl_show" style="display: none;">
	<div class="with-banner" style="padding: 9px; border: 1px solid #c3c4c7; background: #fff;">
		<h1 style="text-align: center;">
			<a id="wpfl_back_button" class="button button-primary left" href="javascript:;" style="float: left;">返回</a>
			<span id="wpfl_falv_title">加载中...</span>
			<a id="wpfl_select_this" data-id="1" class="button button-primary right" href="javascript:;">选择这篇</a>
		</h1>
	</div>
	<div id="plugin-information-content" class="with-banner" style="border: 1px solid #c3c4c7;">
		<div style="padding: 10px;">
			<div id="section-description" class="section" style="display: block;"><span id="wpfl_falv_content">加载中...</span>
			</div>
		</div>
	</div>
</div>
html,
			),
		),
	),
	array(
		'id'     => 'wpfl_regulations_index',
		'title'  => '法规索引',
		'fields' => array(),
	),
	array(
		'id'     => 'wpfl_indexed_regulations',
		'title'  => '已索引法规',
		'fields' => array(),
	),
	array(
		'id'     => 'wpfl_settings',
		'title'  => '设置',
		'fields' => array(
			array(
				'name'        => 'domain',
				'type'        => 'text',
				'label'       => '域名',
				'placeholder' => '请输入域名',
			),
			array(
				'name'        => 'business_name',
				'type'        => 'text',
				'label'       => '企业名',
				'placeholder' => '请输入企业名',
			),
			array(
				'name'        => 'phone',
				'type'        => 'text',
				'label'       => '电话',
				'placeholder' => '请输入电话',
			),
			array(
				'name'        => 'street',
				'type'        => 'text',
				'label'       => '街道',
				'placeholder' => '请输入街道',
			),
			array(
				'name'        => 'city_state_zipcode',
				'type'        => 'text',
				'label'       => '城市 州 邮政编码',
				'placeholder' => '请输入城市 州 邮政编码',
			),
			array(
				'name'        => 'country',
				'type'        => 'text',
				'label'       => '国家',
				'placeholder' => '请输入国家',
			),
			array(
				'name'        => 'email',
				'type'        => 'text',
				'label'       => 'E-mail',
				'placeholder' => '请输入E-mail',
			),
			array(
				'name'        => 'address',
				'type'        => 'text',
				'label'       => '详细地址',
				'placeholder' => '请输入详细地址',
			),
		),
	),
) );

add_action( 'admin_footer', function () {
	wp_enqueue_script( 'wpfalv-url', WPFL_PLUGIN_URL . 'assets/url.min.js', array( 'jquery' ), time(), true );
	wp_enqueue_script( 'wpfalv-generator', WPFL_PLUGIN_URL . 'assets/wpfalv-generator.js', array( 'jquery', 'wpfalv-url' ), time(), true );
	wp_localize_script( 'wpfalv-generator', 'WPFL', array(
		'API_URL' => WPFL_API_URL,
		'root'    => esc_url_raw( rest_url() ),
		'nonce'   => wp_create_nonce( 'wp_rest' )
	) );

} );
