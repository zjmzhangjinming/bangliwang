// JavaScript Document

//购物车产品加减JS
var maxNum = 99;//最大数字限制
function boutton(type,id){
   if(type==1){
		//减
		var v = $("#digital"+id).val();
		v = parseInt(v);
		if( true === isNaN(v) ){
			alert("数量有误");
			return false;
		}
		if( v <= 1 ){
			return false;
		}
		if( v === 1 ){
			return false;
		}
		v--;
		$("#digital"+id).val(v);
		if( v === 1 ){
			//this.disabled = "true";//添加disabled属性
			$('#but_decr'+id).attr("disabled","disabled");//减、添加disabled属性
			$('#but_decr'+id).css({"color":"#E9E9E9","cursor":"default"});//减、改变灰色
		}
		if( v < maxNum ){
			$('#but_incr'+id).removeAttr("disabled");//加、移除disabled属性
			$('#but_incr'+id).css({"color":"#C91735","cursor":"pointer"});//加、添加高亮颜色
		}
		var xj = parseInt($("#digital_j"+id).html());//商品单价
		$("#digital_x"+id).html(xj*v);//商品总金额
		//所选商品总额
		if( $("#xZ"+id).is(":checked") ){
			var totalNum = parseInt( $(".totalNum").html() );//所选商品总额	
			totalNum = totalNum - xj ;//已选商品总额
			$(".totalNum").html(totalNum)	
		}
	}else{
		//加
		var v = $("#digital"+id).val();
		v = parseInt(v);
		if( true === isNaN(v) ){
			alert("数量有误");
			return false;
		}
		if( v > maxNum ){
			return false;
		}
		v++;
		$("#digital"+id).val(v);
		if( v > 1 ){
			$('#but_decr'+id).removeAttr("disabled");//减、移除disabled属性
			$('#but_decr'+id).css({"color":"#C91735","cursor":"pointer"});//减、添加高亮颜色
		}
		if( v === maxNum ){
			$('#but_incr'+id).attr("disabled","disabled");//加、添加disabled属性
			$('#but_incr'+id).css({"color":"#E9E9E9","cursor":"default"});//加、改变灰色
			return false;
		}
		var xj = parseInt($("#digital_j"+id).html());//商品单价
		$("#digital_x"+id).html(xj*v);//商品总金额
		//所选商品总额
		if( $("#xZ"+id).is(":checked") ){
			var totalNum = parseInt( $(".totalNum").html() );//所选商品总额	
			totalNum = totalNum + xj ;//已选商品总额
			$(".totalNum").html(totalNum)	
		}
	}
}
//购物车判断商品数量、加、减是否可点击
$(function(){
	$(".cc_digital").each(function(){
		var v=$(this).val();
		var id=$(this).attr('title');
		if( v ==1 ){
			$('#but_decr'+id).attr("disabled","disabled");//减、添加disabled属性
			$('#but_decr'+id).css({"color":"#E9E9E9","cursor":"default"});//减、改变灰色
			$('#but_incr'+id).removeAttr("disabled");//加、移除disabled属性
			$('#but_incr'+id).css({"color":"#C91735","cursor":"pointer"});//加、添加高亮颜色
		}
		else if(v < maxNum&&v>1){
			$('#but_decr'+id).removeAttr("disabled");//减、移除disabled属性
			$('#but_decr'+id).css({"color":"#C91735","cursor":"pointer"});//减、添加高亮颜色
			$('#but_incr'+id).removeAttr("disabled");//加、移除disabled属性
			$('#but_incr'+id).css({"color":"#C91735","cursor":"pointer"});//加、添加高亮颜色
		}
		else{
			$('#but_decr'+id).removeAttr("disabled");//减、移除disabled属性
			$('#but_decr'+id).css({"color":"#C91735","cursor":"pointer"});//减、添加高亮颜色
			$('#but_incr'+id).attr("disabled","disabled");//加、添加disabled属性
			$('#but_incr'+id).css({"color":"#E9E9E9","cursor":"pointer"});//加、添加灰色
		}
	});	
});


//购物车产品加减当产品值为空、或者直接输入0时JS
function xiaoJiFen(id){
	var name = $("#digital"+id).val();
	if( name.length==0 ){
		$("#digital"+id).val(1);
	}
	var v = $("#digital"+id).val();//产品数量
		v = parseInt(v);
	if( v === 0 ){
		alert("产品数量为0,删除商品");
		$("#digital"+id).val(1);
		$('#but_decr'+id).attr("disabled","disabled");//减、添加disabled属性
		$('#but_decr'+id).css({"color":"#E9E9E9","cursor":"default"});//减、改变灰色
		$("#tr_"+id).remove();
		//
		//所选商品总额
		var soloTotal;
		var totalNum='0';
		$("input[name='items']:checked").each(function(){ 
			var xid=$(this).val();
			soloTotal = parseInt( $("#digital_x"+xid).html() );//单个商品总额
			totalNum=parseInt(totalNum)+soloTotal;
			$(".totalNum").html(totalNum);	
		})
		return false;
	}
	if( v === 1 ){
		$('#but_decr'+id).attr("disabled","disabled");//减、添加disabled属性
		$('#but_decr'+id).css({"color":"#E9E9E9","cursor":"default"});//减、改变灰色
	}
	if( v > 1 ){
		$('#but_decr'+id).removeAttr("disabled");//减、移除disabled属性
		$('#but_decr'+id).css({"color":"#C91735","cursor":"pointer"});//减、添加高亮颜色	
	}
	if( v < maxNum ){
		$('#but_incr'+id).removeAttr("disabled");//加、移除disabled属性
		$('#but_incr'+id).css({"color":"#C91735","cursor":"pointer"});//加、添加高亮颜色
	}
	if( v === maxNum ){
		$('#but_incr'+id).attr("disabled","disabled");//加、添加disabled属性
		$('#but_incr'+id).css({"color":"#E9E9E9","cursor":"default"});//加、改变灰色
	}
	//商品总金额
	var xj = parseInt($("#digital_j"+id).html());//商品单价
	var xf_Z = $("#digital_x"+id).html();//单个物品小计
	var xiaoji=xj*v;
	$("#digital_x"+id).html(xiaoji);
	
	//所选商品总额
	var soloTotal;
	var totalNum='0';
	$("input[name='items']:checked").each(function(){ 
		var xid=$(this).val();
		soloTotal = parseInt( $("#digital_x"+xid).html() );//单个商品总额
		totalNum=parseInt(totalNum)+soloTotal;
		$(".totalNum").html(totalNum);	
    })
}
//购物车、删除选中商品
var del = function(){
	var list = $('[name=items]:checkbox');
	for(i in list){
		if( list[i].checked === true ){
			del_tr( list[i].value );
		}
	}
	//显示选中商品数量
	$("input[name='items']:checked").each(function(){ 
		var $tmp=$('[name=items]:checkbox').length;
		$(".electNum").text( $tmp );	
    })
	//商品都清楚
	if($("input[name='items']:checked").length==0){
		$(".electNum").text( 0 );
	}
	$(".totalNum").html(0)
	$(".balanceH").removeClass("balanceA");//改变结算按钮的背景
	$(".gouWu_jieH").removeClass("gouWu_jieS");//改变结算按钮的背景
}
//购物车、删除TR
var del_tr = function(id){
	$("tr[id=\"tr_" + id + "\"]").remove();
	//所选商品总额
	var soloTotal;
	var totalNum='0';
	$("input[name='items']:checked").each(function(){ 
		var xid=$(this).val();
		soloTotal = parseInt( $("#digital_x"+xid).html() );//单个商品总额
		totalNum=parseInt(totalNum)+soloTotal;
		$(".totalNum").html(totalNum);	
		//已选商品数量
		var $tmp=$('[name=items]:checkbox').length;
		$(".electNum").text( $tmp );
    })
	$("input[name='items']").each(function(){ 
		if( $("[name=items]:checkbox").is(":checked") ){
			$(".balanceH").addClass("balanceA");
			$(".gouWu_jieH").addClass("gouWu_jieS");
		}else{
			$(".balanceH").removeClass("balanceA");
			$(".gouWu_jieH").removeClass("gouWu_jieS");
			$(".totalNum").html(0)	
			$(".electNum").text(0);
		}
    })
	if($("input[name='items']:checked").length==0){
		$(".electNum").text(0);
		$(".totalNum").html(0)
		$(".balanceH").removeClass("balanceA");//改变结算按钮的背景
		$(".gouWu_jieH").removeClass("gouWu_jieS");//改变结算按钮的背景
	}
}

//购物车、移入收藏夹
function collection(id){
	//删除
	del_tr(id);
}

//购物车、已选择的产品数量
$(function(){
	$("[name=items]:checkbox").click(function(){
		var num = $(".electNum").text();
		if( this.checked === true ){
			num++;
		}else{
			num--;
		}
		if( num < 0 ){
			return false;
		}
		$(".electNum").text( num );
	});
});

//购物车、全选JS
$(function(){
     //全选
     $(".CheckedAll").click(function(){
		 //所有checkbox跟着全选的checkbox走。
		$("[name=items]:checkbox").attr("checked", this.checked );
		//商品选中商品数量显示
		var $tmp=$("[name=items]:checkbox").length;
		if( $("[name=items]:checkbox").is(":checked") ){
			$(".electNum").text( $tmp );
		}else{
			$(".electNum").text( 0 );
		}
	 });
	 $("[name=items]:checkbox").click(function(){
		 //定义一个临时变量，避免重复使用同一个选择器选择页面中的元素
		var $tmp=$("[name=items]:checkbox");
		//用filter方法筛选出选中的复选框。并直接给CheckedAll赋值
		$(".CheckedAll").attr("checked",$tmp.length==$tmp.filter(":checked").length);
	 });
});


//删除失效商品
$(function(){
	$(".shiXiao_a").click(function(){
		$(".shiXiao_tr").remove();		
	});	
	//失效商品不能加减
	$(".shiXiao_tr input").attr("disabled","disabled");//加、减、添加disabled属性
	$(".shiXiao_tr input").css({"color":"#E9E9E9","cursor":"default"});
});
//选中商品，添加背景颜色
$(function(){
	$(".xuanZ_inp").click(function(){
		$(this).each(function() {
			var bj = $(this).val();
			var totalNum = parseInt( $(".totalNum").html() );//所选商品总额	
			var soloTotal = parseInt( $("#digital_x"+bj).html() );//单个商品总额
			if( this.checked === true ){
				$("#tr_"+bj).addClass("backgroundFEC6C5");
				totalNum = totalNum + soloTotal ;//已选商品总额
				$(".totalNum").html(totalNum)	
			}else{
				$("#tr_"+bj).removeClass("backgroundFEC6C5");
				totalNum = totalNum - soloTotal ;//已选商品总额
				$(".totalNum").html(totalNum)
			}
			if( $("[name=items]:checkbox").is(":checked") ){
				$(".balanceH").addClass("balanceA");
				$(".gouWu_jieH").addClass("gouWu_jieS");	
			}else{
				$(".balanceH").removeClass("balanceA");
				$(".gouWu_jieH").removeClass("gouWu_jieS");	
			}
        });	
	});	
	$(".CheckedAll").click(function(){
		$(".totalNum").html(0);
		$(".xuanZ_inp").each(function() {
			var bj = $(this).val();
			if( $("[name=items]:checkbox").is(":checked") ){
				$("#tr_"+bj).addClass("backgroundFEC6C5");
				$(".balanceH").addClass("balanceA");
				$(".gouWu_jieH").addClass("gouWu_jieS");
				//已选商品总额	
				var totalNum = parseInt( $(".totalNum").html() );//所选商品总额	
				var soloTotal = parseInt( $("#digital_x"+bj).html() );//单个商品总额
				totalNum = totalNum + soloTotal ;//已选商品总额
				$(".totalNum").html(totalNum)	
			}else{
				$("#tr_"+bj).removeClass("backgroundFEC6C5");
				$(".balanceH").removeClass("balanceA");
				$(".gouWu_jieH").removeClass("gouWu_jieS");	
				//已选商品总额	
				$(".totalNum").html(0)//已选商品总额
			}
        });	
	});	
});




//购物车热卖产品切换JS
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






















