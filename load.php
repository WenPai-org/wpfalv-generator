<?php
/**
 * 插件装载文件
 *
 * @package WenPai\FaLv
 */

namespace WenPai\FaLv;

use WenPai\FaLv\Src\Core;

/** 载入Composer的自动加载程序 */
require_once 'vendor/autoload.php';

/** 载入公共函数 */
require_once 'src/functions.php';

/** 载入设置项 */
if ( is_admin() && ! ( defined('DOING_AJAX' ) && DOING_AJAX) ) {
    require_once 'src/setting.php';
}

