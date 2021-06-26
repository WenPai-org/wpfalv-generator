var $ = jQuery;//jQuery永远的神
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('#wpfl_selected').parent().parent().parent().parent().before('<h1 id="wpfl_ban_mobile">建议使用电脑访问以获取更好的体验。</h1>');
}
if (window.location.search == '?page=wpfl') {
    init();//Run
}

/**
 * Name: init
 * Describe: 页面加载以后的初始化过程，包括获取默认的文书列表，监听各按钮点击
 */
function init() {
    $(document).keydown(function (e) {
        var key = window.event ? e.keyCode : e.which;
        if (key.toString() == "13") {
            return false;
        }
    });
    $('#wpfl_template_library form h2').html('在库中挑选中意的范本，点击导入后，他们就会出现在你网站的页面管理列表中。');
    $('#wpfl_lists').parent().css('cssText', 'padding: 20px 0px!important; vertical-align: top;');
    $('#wpfl_selected').parent().css('width', '400px').css('padding', '20px 0px 20px 0');
    $('#wpfl_selected').parent().parent().parent().parent().before('<section id="wpfl_control" class="card"><h1 style="display: inline; font-size: 20px;">已选择范本</h1><div style="display: inline; float: right;"><h1 style="display: inline; font-size: 20px;">范本库</h1><span style="padding-left: 20px;">类型</span><select style="margin-left: 5px;" name="categories" id="wpfl_categories_selector"><option value="all" selected="selected">全部</option></select><span style="padding-left: 10px;">适用站点</span><select style="margin-left: 5px;" name="tags" id="wpfl_tags_selector"><option value="all" selected="selected">全部</option></select><input placeholder="搜索" type="search" id="wp-filter-search-input" class="wp-filter-search" style="margin-left: 10px;"/></div></section>');
    $('#wpfl_control').css('max-width', 'unset').css('margin-bottom', '-27px');
    $('#wpfl_lists').parent().append('<div id="wpfl_nav" class="tablenav"><div class="tablenav-pages"><span class="displaying-num">共有<span id="wpfl_falv_total"></span>个模版</span><span class="pagination-links"><a id="wpfl_prev_page" data-do="prev" class="button disabled" href="javascript:;"><span aria-hidden="true">‹</span></a><span id="table-paging" class="paging-input"><span class="tablenav-paging-text">第<span id="wpfl_falv_page_now">?</span>页，共<span id="wpfl_falv_page_total">??</span>页</span></span><a id="wpfl_next_page" data-do="next" class="button" href="javascript:;"><span aria-hidden="true">›</span></a></span></div></div>');

    $('#submit').parent().append('<input type="botton" name="reset" id="reset" class="button button-primary" style="width: 50px; margin-left: 10px;" value="重选" readonly>')
    $('#submit').parent().append('<input type="botton" name="go" id="go" class="button button-primary" style="width: 75px; margin-left: 10px;" value="立即导入" readonly>')
    $('#submit').hide();

    var categories, tags, views;

    /**
     * 获取第一页法律数据
     */
    u = new Url(WPFL.API_URL + "/wp-json/wp/v2");
    $.ajax({
        type: "GET",
        async: false,
        url: u + "/posts",
        success: function (data, status, request) {
            var total = request.getResponseHeader('x-wp-total');
            var total_pages = request.getResponseHeader('x-wp-totalpages');
            $('#wpfl_falv_total').html(total);
            $('#wpfl_falv_page_now').html(1);
            $('#wpfl_falv_page_total').html(total_pages);
            $('#wpfl_prev_page, #wpfl_next_page').removeClass('disabled');
            $('#wpfl_prev_page').addClass('disabled');
            if (total_pages == 1) {
                $('#wpfl_next_page').addClass('disabled');
            }
            $.each(data, function (k, v) {
                categories = v.categories_name;
                tags = v.tags_name;
                views = '';
                if (v.meta.views != undefined) {
                    views = v.meta.views[0];
                } else {
                    views = 0;
                }
                $('#wpfl_lists_table').append('<tr id="falv-' + v.id + '"><th style="vertical-align: middle;" scope="row" class="check-column"><input type="checkbox" name="falvs" id="' + v.id + '" value="' + v.id + '"></th><td><a href="javascript:;" class="wpfl_falvs" data-id="' + v.id + '">' + v.title.rendered + '</a></td><td><span>' + categories + '</span></td><td>' + tags + '</td><td>' + views + '</td></tr>')
            });
        }
    });

    /**
     * 分类下拉选择器初始化
     */
    $.ajax({
        type: "GET",
        async: false,
        url: u + "/categories",
        success: function (data) {
            $.each(data, function (k, v) {
                $('#wpfl_categories_selector').append('<option value="' + v.id + '">' + v.name + '</option>');
            });
        }
    });

    /**
     * 标签下拉选择器初始化
     */
    $.ajax({
        type: "GET",
        async: false,
        url: u + "/tags",
        success: function (data) {
            $.each(data, function (k, v) {
                $('#wpfl_tags_selector').append('<option value="' + v.id + '">' + v.name + '</option>');
            });
        }
    });

    /**
     * 监听分类&标签下拉选择
     */
    $("#wpfl_categories_selector, #wpfl_tags_selector").change(function () {
        var u1 = new Url(u + "/posts");
        if ($('#wpfl_categories_selector').children('option:selected').val() != 'all') {
            u1.query.categories = $('#wpfl_categories_selector').children('option:selected').val();
        }
        if ($('#wpfl_tags_selector').children('option:selected').val() != 'all') {
            u1.query.tags = $('#wpfl_tags_selector').children('option:selected').val();
        }
        if ($("#wp-filter-search-input").val() != '') {
            u1.query.search = $("#wp-filter-search-input").val();
        }

        $.ajax({
            type: "GET",
            async: false,
            url: u1,
            success: function (data, status, request) {
                var total = request.getResponseHeader('x-wp-total');
                var total_pages = request.getResponseHeader('x-wp-totalpages');
                $('#wpfl_falv_total').html(total);
                $('#wpfl_falv_page_now').html(1);
                $('#wpfl_falv_page_total').html(total_pages);

                $('#wpfl_prev_page, #wpfl_next_page').removeClass('disabled');
                $('#wpfl_prev_page').addClass('disabled');
                if (total_pages == 1) {
                    $('#wpfl_next_page').addClass('disabled');
                }
                $('#wpfl_lists_table').empty();
                $.each(data, function (k, v) {
                    categories = v.categories_name;
                    tags = v.tags_name;
                    views = '';
                    if (v.meta.views != undefined) {
                        views = v.meta.views[0];
                    } else {
                        views = 0;
                    }
                    $('#wpfl_lists_table').append('<tr id="falv-' + v.id + '"><th style="vertical-align: middle;" scope="row" class="check-column"><input type="checkbox" name="falvs" id="' + v.id + '" value="' + v.id + '"></th><td><a href="javascript:;" class="wpfl_falvs" data-id="' + v.id + '">' + v.title.rendered + '</a></td><td><span>' + categories + '</span></td><td>' + tags + '</td><td>' + views + '</td></tr>')
                });
                reload_falvs();
            }
        });
    });

    /**
     * 监听搜索框提交
     */
    $("#wp-filter-search-input").keydown(function (event) {
        if (event.keyCode == 13) {
            var u1 = new Url(u + "/posts");
            if ($('#wpfl_categories_selector').children('option:selected').val() != 'all') {
                u1.query.categories = $('#wpfl_categories_selector').children('option:selected').val();
            }
            if ($('#wpfl_tags_selector').children('option:selected').val() != 'all') {
                u1.query.tags = $('#wpfl_tags_selector').children('option:selected').val();
            }
            if ($("#wp-filter-search-input").val() != '') {
                u1.query.search = $("#wp-filter-search-input").val();
            }

            $.ajax({
                type: "GET",
                async: false,
                url: u1,
                success: function (data, status, request) {
                    var total = request.getResponseHeader('x-wp-total');
                    var total_pages = request.getResponseHeader('x-wp-totalpages');
                    $('#wpfl_falv_total').html(total);
                    $('#wpfl_falv_page_now').html(1);
                    $('#wpfl_falv_page_total').html(total_pages);
                    $('#wpfl_prev_page, #wpfl_next_page').removeClass('disabled');
                    $('#wpfl_prev_page').addClass('disabled');
                    if (total_pages == 1 || total_pages == 0) {
                        $('#wpfl_next_page').addClass('disabled');
                    }
                    $('#wpfl_lists_table').empty();
                    $.each(data, function (k, v) {
                        categories = v.categories_name;
                        tags = v.tags_name;
                        views = '';
                        if (v.meta.views != undefined) {
                            views = v.meta.views[0];
                        } else {
                            views = 0;
                        }
                        $('#wpfl_lists_table').append('<tr id="falv-' + v.id + '"><th style="vertical-align: middle;" scope="row" class="check-column"><input type="checkbox" name="falvs" id="' + v.id + '" value="' + v.id + '"></th><td><a href="javascript:;" class="wpfl_falvs" data-id="' + v.id + '">' + v.title.rendered + '</a></td><td><span>' + categories + '</span></td><td>' + tags + '</td><td>' + views + '</td></tr>')
                    });
                    reload_falvs();
                }
            });
        }
    })

    /**
     * 重载分页&详情展开
     */
    reload_falvs();
    reload_nav();

    /**
     * 监听详情的返回按钮点击
     */
    $('#wpfl_back_button').click(function () {
        $('#wpfl_show').hide();
        $('#wpfl_lists').show();
        $('#wpfl_nav').show();
    });
}

select_count = 0;

/**
 * Name: reload_falvs
 * Describe: 在ajax加载之后重新绑定法律列表点击事件
 */
function reload_falvs() {
    $('.wpfl_falvs').click(function () {
        $.ajax({
            type: "GET",
            async: false,
            url: u + "/posts/" + $(this).data('id'),
            success: function (data) {
                $('#wpfl_select_this').attr('data-id', data.id);
                $('#wpfl_falv_title').html(data.title.rendered);
                $('#wpfl_falv_content').html(data.content.rendered);
                $('#wpfl_lists').hide();
                $('#wpfl_nav').hide();
                $('#wpfl_show').show();
            }
        });
    });
    $('#wpfl_lists_table input:checkbox[name=falvs]').change(function () {
        var id = $(this).attr('id');
        if ($('#select-falv-' + id).length > 0) {
            $('#wpfl_lists_table input:checkbox[id=' + id + ']').removeAttr('checked');
            $('#select-falv-' + id).remove();
            select_count--;
        } else {
            var html = $('#falv-' + id).html();
            var new_html = '<tr id="select-falv-' + id + '">' + html + '</tr>';
            if (select_count > 8) {
                alert('请先导入，再添加吧');
                return false;
            }
            $('#wpfl_selected').append(new_html);
            $('#select-falv-' + id).children().last().remove();
            select_count++;
        }
    })
}

/**
 * 翻页初始化&重载
 */
function reload_nav() {
    $('#wpfl_prev_page, #wpfl_next_page').click(function () {
        var now = Number($('#wpfl_falv_page_now').html());
        var total = Number($('#wpfl_falv_page_total').html());
        var doing = $(this).data('do');
        if (now == 1 && doing == 'prev' || now == total && doing == 'next' || total == 0) {
            return false;
        }
        var u1 = new Url(u + "/posts");
        if ($('#wpfl_categories_selector').children('option:selected').val() != 'all') {
            u1.query.categories = $('#wpfl_categories_selector').children('option:selected').val();
        }
        if ($('#wpfl_tags_selector').children('option:selected').val() != 'all') {
            u1.query.tags = $('#wpfl_tags_selector').children('option:selected').val();
        }
        if ($("#wp-filter-search-input").val() != '') {
            u1.query.search = $("#wp-filter-search-input").val();
        }
        if (doing == 'prev' && now > 1) {
            u1.query.page = now - 1;
        }
        if (doing == 'next' && now < total) {
            u1.query.page = now + 1;
        }
        $.ajax({
            type: "GET",
            async: false,
            url: u1,
            success: function (data, status, request) {
                var total = request.getResponseHeader('x-wp-total');
                var total_pages = request.getResponseHeader('x-wp-totalpages');
                $('#wpfl_falv_total').html(total);
                $('#wpfl_falv_page_total').html(total_pages);
                $('#wpfl_falv_page_now').html(u1.query.page);
                $('#wpfl_prev_page, #wpfl_next_page').removeClass('disabled');
                if (u1.query.page == 1) {
                    $('#wpfl_prev_page').addClass('disabled');

                } else if (u1.query.page == total_pages) {
                    $('#wpfl_next_page').addClass('disabled');
                }
                if (total_pages == 0) {
                    $('#wpfl_next_page').addClass('disabled');
                }
                $('#wpfl_lists_table').empty();
                $.each(data, function (k, v) {
                    categories = v.categories_name;
                    tags = v.tags_name;
                    views = '';
                    if (v.meta.views != undefined) {
                        views = v.meta.views[0];
                    } else {
                        views = 0;
                    }
                    $('#wpfl_lists_table').append('<tr id="falv-' + v.id + '"><th style="vertical-align: middle;" scope="row" class="check-column"><input type="checkbox" name="falvs" id="' + v.id + '" value="' + v.id + '"></th><td><a href="javascript:;" class="wpfl_falvs" data-id="' + v.id + '">' + v.title.rendered + '</a></td><td><span>' + categories + '</span></td><td>' + tags + '</td><td>' + views + '</td></tr>')
                });
                reload_falvs();
            }
        });

    });
}

$('#wpfl_select_this').click(function () {
    var id = $(this).attr('data-id');
    var html = $('#falv-' + id).html();
    var new_html = '<tr id="select-falv-' + id + '">' + html + '</tr>';
    if (select_count > 8) {
        alert('请先导入，再添加吧');
        return false;
    }
    if ($('#select-falv-' + id).length > 0) {
        alert('重复添加');
        return false;
    }
    $('#wpfl_lists_table input:checkbox[id=' + id + ']').prop("checked", "true");
    $('#wpfl_selected').append(new_html);
    $('#select-falv-' + id).children().last().remove();
    select_count++;
});

/**
 * 监听立即导入按钮点击并完成导入
 */
$('#go').click(function () {
    $('table#wpfl_selected input:checkbox[name=falvs]:checked').each(function (i) {
        var id = $(this).val();
        $.ajax({
            type: "GET",
            async: false,
            url: u + "/posts/" + id,
            success: function (data) {
                $.ajax({
                    type: "post",
                    async: false,
                    url: WPFL.root + 'wp/v2/pages',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-WP-Nonce', WPFL.nonce);
                    },
                    data: {'title': data.title.rendered, 'content': data.content.rendered, 'status': 'publish'},
                    success: function (data) {
                        alert('ID:' + id + '的内容导入成功');
                    }
                });
            }
        });
    });
})

/**
 * 监听重选按钮点击并清空
 */
$('#reset').click(function () {
    $('#the-list').empty();
})
