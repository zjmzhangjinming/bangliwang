// JavaScript Document

//服务公告优惠信息切换JS
function tabSwitch(obj,objTab){
	$(obj).first().show();
	$(objTab).first().css("border-right","solid 1px #C7C7C7");
	$(objTab).first().addClass("current");
	$(objTab).hover(function(){//鼠标经过
		$(this).addClass("current").siblings().removeClass("current");
		var name=$(this).attr("name");
		if($(obj).has(name)){
			$(obj).hide();
			$(obj+"."+name).show();	
		};
	});
};
$(function(){	
	tabSwitch(".InquiryListData",".formationBulle_ul li");
});

//首页图片移动效果
$(function(){
	var rank_move_time  = 300;//偏移时速
	var rank_move_range = 13;
	$(".hover_moving_img").hover(
		function(){
			$(this).stop().animate({"marginLeft":-rank_move_range},rank_move_time);
		},
		function(){
			$(this).stop().animate({"marginLeft":0},rank_move_time);
		}
	);
	
});

//列表页今日推荐切换JS
(function($){
$.fn.slider=function(arg){
	var me = $(this),opt = $.extend({inteval:3000,auto:true,loop:false,prev:me.find(".prev"),next:me.find(".next"),pageBtns:"",finish:function(){},start:function(){}}, arg),pageBtns,scrollable = me.find(".scrollable"),ori_items = me.find(".items"),total_num = me.find(".item").length,cur_page = 0,mov_w = me.find(".item").outerWidth(),move_left=0,interval;
	opt.start();
	if (opt.loop) {
		ori_items.append(ori_items.find(".item").clone());
		ori_items.prepend(ori_items.find(".item").clone());
		scrollable.scrollLeft(getCurScroLeft());
	}
   if(opt.auto){
	   interval=setInterval(move,opt.inteval);
	   me.hover(function(){clearInterval(interval)},function(){interval=setInterval(move,opt.inteval);move_left=0});
   }
   if(opt.pageBtns&&!opt.loop){
	   pageBtns=opt.pageBtns;
	   pageBtns.bind("click",moveTo);
   }
   function moveTo(e){
		pageBtns.unbind("click",moveTo);
		var cur_li=$(e.target).closest("li"),num=cur_li.index();
		pageBtns.removeClass("select");cur_li.addClass("select");
		var cur_scrollLeft=num*mov_w;
		scrollable.animate({scrollLeft:cur_scrollLeft},{duration:'normal',easing:'swing',complete:function(){pageBtns.bind("click",moveTo);opt.finish(num)},queue:false});
   }
   function move(e){
	  opt.prev.length&&opt.prev.unbind("click",move);
	  opt.next.length&&opt.next.unbind("click",move);
	  if(e){
		  clearInterval(interval);
		  var cur_btn=$(e.target);
		  if(cur_btn.hasClass("prev")){move_left=1};
		  if(cur_btn.hasClass("next")){move_left=0};
	  }
	   var cur_scrollLeft=move_left ? getCurScroLeft()-mov_w:getCurScroLeft()+mov_w;
	   scrollable.stop().animate({scrollLeft:cur_scrollLeft},{duration:'normal',easing:'swing',complete:complate,queue:false});
   }
   function complate(){
	   cur_page=move_left?cur_page-1:cur_page+1;
	   if(cur_page<= -total_num+2){cur_page+=total_num;resetscroll()}
	   if(cur_page>=2*total_num-2){cur_page-=total_num;resetscroll()}
	   opt.prev.length&&opt.prev.bind("click",move);
	   opt.next.length&&opt.next.bind("click",move);
	   opt.finish();
   }
   function resetscroll(){
	   scrollable.scrollLeft(getCurScroLeft());
   }
   function getCurScroLeft(){
	   return opt.loop?total_num * mov_w+cur_page*mov_w:cur_page*mov_w;
   }
}
})(jQuery);
$(document).ready(function() {
    $("#banner-slide").slider({
        interval:3000,
        loop:true,
        auto:true
    });
});

//列表页关键字更多JS
	$(function(){
	var $category = $('#gjzKeyword_dl dd a:gt(25):not(:last)');
	$category.hide();
	var $toggleBtn = $('.gjz_dlAlast_child');
	$toggleBtn.toggle(function(){
		$category.show();
		$('.gjz_dlAlast_child').text("隐藏部分");
		$('.gjz_dlAlast_child').addClass("gjz_dlAlast_child2");
		return false;
	},function(){
		$category.hide();
		$('.gjz_dlAlast_child').text("更多");
		$('.gjz_dlAlast_child').removeClass("gjz_dlAlast_child2");
		$('.gjz_dlAlast_child').addClass("gjz_dlAlast_child");
		return false;
	});
});

//显示仅有货JS
$(function(){
	$(".CheckedAll").toggle(function(){
	     $('[name=items]:checkbox').attr('checked', true);
	 },function(){
		$('[name=items]:checkbox').attr('checked', false);
	});
});
//列表页左侧上方点击箭头弹出产品分类JS
function allGetspan(id){
	$("#detailsList_div"+id).show();
}
function spanClose(id){
	$("#detailsList_div"+id).hide();
}


//首页、列表页、幻灯片切换JS
$(function(){
	//图片banner切换JS
	show_count=$("#banner .banner_con li").length;
	//根据图片个数创建按钮
	for(var i=0;i<show_count;i++)$("#banner .banner_nav").append("<li class='banner_nav_li "+(i==0?"banner_nav_li_first banner_nav_sel":"")+"'>"+(i+1)+"</li>");
	//hover event
	$("#banner .banner_nav li").mouseover(function(){
		$("#banner .banner_con li").stop();	
		show($(this).index());
	});
	//启动banner定时器
	show(0);
	$(".f_c_b_control_block_sp").mouseover(function(){
		$("#f1_example").stop();
		f1_show($(this).index());
	});
	//启动f1定时器
	f1_show_count=3;
	f1_show(0);
});
var show_timer;//自动切换图片计时器
var show_time=300;//显示效果时间
var show_spacetime=3000;//切换间隔时间
var show_count;//图片个数
var show_current=0;//当前显示的图片序号(从0开始)
//图片切换
function show(i){
	if(isNaN(i)||i<0||i>=show_count)i=0;
	clearTimeout(show_timer);
	show_current=i;
	$("#banner .banner_con li").stop();
	$("#banner .banner_con li").animate({opacity:0},show_time/2);
	$("#banner .banner_nav li").removeClass("banner_nav_sel").eq(show_current).addClass("banner_nav_sel");
	$("#banner .banner_con li").eq(show_current).animate({opacity:1},show_time/2,function(){
		$("#banner .banner_con li").removeClass("banner_active").eq(show_current).addClass("banner_active");	
	});
	show_timer=setTimeout(
		function(){
			show(show_current+1);
		},
		show_spacetime
	);
};

