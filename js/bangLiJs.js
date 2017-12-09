// JavaScript Document
//邦礼样式控制 JS
$(function(){
	$(".beforeLogin_ul li:first-child").css("background-image","none");//首页关注我们去掉背景图JS
	$(".bl_logoDiv_c dd a:last-child").css("background-image","none");//首页热搜关键词去掉背景图JS
	$(".ssificationUl li:last-child").css("background-image","none");//首页热搜关键词去掉背景图JS
	$(".two_Navdlcon dd a:last-child").css("border-right","0 none");//首页左侧分类导航JS
	$(".diseXiao:last-child").css("margin-right","0");//分类页今日推荐产品img
	$(".gjzKeyword_dl:last-child").css("border-bottom","none 0");//列表页品牌关键字筛选JS
	$(".detailsList_dl:last").css("border-bottom","none 0");//分类页
	$(".Interest_dl:last-child").css("margin-right","0");//详情页到货弹出框可能感兴趣的产品JS	
	$(".shoppCartTable tr:last,.shoppCartTable tr:first").css("border-bottom","none 0");//购物车




		
});
//首页页头关闭广告JS
$(function(){
	$(".ahieldGao_span").click(function(){
		$(".ahieldGao").remove();
	});	
});
//首页搜索框JS
$(function(){
	$(".bl_logoDiv_c_inp1").focus(function(){
		  if($(this).val() ==this.defaultValue){  
			  $(this).val("");           
		  } 
	}).blur(function(){
		 if ($(this).val() == '') {
			$(this).val(this.defaultValue);
		 }
	});	
});

//返回顶部JS
$(function(){
	(function(){
		var $backToTopTxt = "", $backToTopEle = $('<div class="backToTop"></div>').appendTo($("body"))
			.text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
				$("html, body").animate({ scrollTop: 0 }, 120);
		}), $backToTopFun = function() {
			var st = $(document).scrollTop(), winh = $(window).height();
			(st > 0)? $backToTopEle.show(): $backToTopEle.hide();
			//IE6下的定位
			if (!window.XMLHttpRequest) {
				$backToTopEle.css("top", st + winh - 166);
			}
		};
		$(window).bind("scroll", $backToTopFun);
		$(function() { $backToTopFun(); });
	})();
});

