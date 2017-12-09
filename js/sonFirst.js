// JavaScript Document


/*详细页放大图片JS*/
(function($) {
    $.fn.imagezoom = function(options) {
        var settings = {
            xzoom: 352,//鼠标经过图片时显示的div宽度
            yzoom: 352,//鼠标经过图片时显示的div高度
            offset: 10,//鼠标经过图片时显示的div与图片的距离
            position: "BTR",
            preload: 1
        };
        if (options) {
            $.extend(settings, options);
        }
        var noalt = '';
        var self = this;
        $(this).bind("mouseenter",
        function(ev) {
            var imageLeft = $(this).offset().left;
            var imageTop = $(this).offset().top;
            var imageWidth = $(this).get(0).offsetWidth;
            var imageHeight = $(this).get(0).offsetHeight;
            var boxLeft = $(this).parent().offset().left;
            var boxTop = $(this).parent().offset().top;
            var boxWidth = $(this).parent().width();
            var boxHeight = $(this).parent().height();
            noalt = $(this).attr("alt");
            var bigimage = $(this).attr("rel");
            $(this).attr("alt", '');
            if ($("div.zoomDiv").get().length == 0) {
                $(document.body).append("<div class='zoomDiv'><img class='bigimg' src='" + bigimage + "'/></div><div class='zoomMask'>&nbsp;</div>");
            }
            if (settings.position == "BTR") {
                if (boxLeft + boxWidth + settings.offset + settings.xzoom > screen.width) {
                    leftpos = boxLeft - settings.offset - settings.xzoom;
                } else {
                    leftpos = boxLeft + boxWidth + settings.offset;
                }
            } else {
                leftpos = imageLeft - settings.xzoom - settings.offset;
                if (leftpos < 0) {
                    leftpos = imageLeft + imageWidth + settings.offset;
                }
            }
            $("div.zoomDiv").css({
                top: boxTop,
                left: leftpos
            });
            $("div.zoomDiv").width(settings.xzoom);
            $("div.zoomDiv").height(settings.yzoom);
            $("div.zoomDiv").show();
            $(this).css('cursor', 'crosshair');
            $(document.body).mousemove(function(e) {
                mouse = new MouseEvent(e);
                if (mouse.x < imageLeft || mouse.x > imageLeft + imageWidth || mouse.y < imageTop || mouse.y > imageTop + imageHeight) {
                    mouseOutImage();
                    return;
                }
                var bigwidth = $(".bigimg").get(0).offsetWidth;
                var bigheight = $(".bigimg").get(0).offsetHeight;
                var scaley = 'x';
                var scalex = 'y';
                if (isNaN(scalex) | isNaN(scaley)) {
                    var scalex = (bigwidth / imageWidth);
                    var scaley = (bigheight / imageHeight);
                    $("div.zoomMask").width((settings.xzoom) / scalex);
                    $("div.zoomMask").height((settings.yzoom) / scaley);
                    $("div.zoomMask").css('visibility', 'visible');
                }
                xpos = mouse.x - $("div.zoomMask").width() / 2;
                ypos = mouse.y - $("div.zoomMask").height() / 2;
                xposs = mouse.x - $("div.zoomMask").width() / 2 - imageLeft;
                yposs = mouse.y - $("div.zoomMask").height() / 2 - imageTop;
                xpos = (mouse.x - $("div.zoomMask").width() / 2 < imageLeft) ? imageLeft: (mouse.x + $("div.zoomMask").width() / 2 > imageWidth + imageLeft) ? (imageWidth + imageLeft - $("div.zoomMask").width()) : xpos;
                ypos = (mouse.y - $("div.zoomMask").height() / 2 < imageTop) ? imageTop: (mouse.y + $("div.zoomMask").height() / 2 > imageHeight + imageTop) ? (imageHeight + imageTop - $("div.zoomMask").height()) : ypos;
                $("div.zoomMask").css({
                    top: ypos,
                    left: xpos
                });
                $("div.zoomDiv").get(0).scrollLeft = xposs * scalex;
                $("div.zoomDiv").get(0).scrollTop = yposs * scaley;
            });
        });
        function mouseOutImage() {
            $(self).attr("alt", noalt);
            $(document.body).unbind("mousemove");
            $("div.zoomMask").remove();
            $("div.zoomDiv").remove();
        }
    }
})(jQuery);
function MouseEvent(e) {
    this.x = e.pageX;
    this.y = e.pageY;
}
//调用下面的图片JS
$(function(){
	$(".jqzoom").imagezoom();
	$("#thumblist li:first-child").addClass("tb-selected");
	$("#thumblist li a").hover(function(){
		$(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
		$(".jqzoom").attr('src',$(this).find("img").attr("mid"));
		$(".jqzoom").attr('rel',$(this).find("img").attr("big"));
	});
});

//详细页选中商品颜色、型号JS
$(function(){
	$(".speciColour").each(function(){
		var i=$(this);
		var p=i.find("li");
		p.click(function(){
			if(!!$(this).hasClass("tb-selected")){
				$(this).removeClass("tb-selected");
			}else{
				$(this).addClass("tb-selected").siblings("li").removeClass("tb-selected");
			}
		})
	})
});

/*放大图片JS end*/

//详细页登录、到货弹出框通知JS
$(function(){
	$(".stockSpan").click(function(){
		
		//$("#bl_blackBg").show();//黑色背景
		//$("#inSignbox").show();//登录框
		
		//显示到货通知1、可修改邮箱js
		$("#bl_blackBg").show();//黑色背景
		$("#arrNotice1").show();//到货通知1弹出框
		
		//显示到货通知2、填写邮箱
		//$("#bl_blackBg").show();//黑色背景
		//$("#arrNotice2").show();//到货通知2弹出框

	});
	//关闭登录框js
	$("#entryEm").click(function(){
		$("#bl_blackBg").hide();//黑色背景
		$("#inSignbox").hide();//登录框
	});
	//到货通知1直接修改邮箱
	$("#notice_xg").click(function(){
		$("#bl_blackBg").hide();//黑色背景
		$("#arrNotice1").hide();//到货通知1弹出框
	});
	//到货通知2填写邮箱
	$("#notice_tx").click(function(){
		$("#bl_blackBg").hide();//黑色背景
		$("#arrNotice2").hide();//到货通知2弹出框
	});
});


//详细页产品加减JS

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
			}
	}
}
//判断商品
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


//详细页产品加减当产品值为空、或者直接输入0时JS
function xiaoJiFen(id){
	var name = $("#digital"+id).val();
	if( name.length==0 ){
		$("#digital"+id).val(1);
	}
	var v = $("#digital"+id).val();//产品数量
		v = parseInt(v);
	if( v === 0 ){
		$("#digital"+id).val(1);
		$('#but_decr'+id).attr("disabled","disabled");//减、添加disabled属性
		$('#but_decr'+id).css({"color":"#E9E9E9","cursor":"default"});//减、改变灰色
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
}
//判断是否选中颜色、型号、相关提示文字
$(function(){
	$(".hoppingCart,.buyingOne").click(function(){
		if( $("#thumblist2 li").hasClass("tb-selected")== false ){
			$(".prompt_Div_p2").css("display","block");
			$(".prompt_Div_p1").css("display","none");
			$(".prompt_Div_p3").css("display","none");
		}else{
			$(".prompt_Div_p2").css("display","none");
		}
		if( $("#thumblist3 li").hasClass("tb-selected")== false ){
			$(".prompt_Div_p3").css("display","block");
			$(".prompt_Div_p2").css("display","none");
			$(".prompt_Div_p1").css("display","none");
			
		}else{
			$(".prompt_Div_p3").css("display","none");
		}
		if( $("#thumblist2 li , #thumblist3 li").hasClass("tb-selected")== false ){
			$(".prompt_Div_p1").css("display","block");
			$(".prompt_Div_p2").css("display","none");
			$(".prompt_Div_p3").css("display","none");
		}else{
			$(".prompt_Div_p1").css("display","none");	
		}
	});	
});


//详细页最佳搭档JS
$(function(){
	var goodsN = parseInt( $("#goodsN").html() );//当前商品金额
	$("#groupTotal").html(goodsN);//没选之前组合商品金额
	$("[name=giveInp]").click(function(){ 
		var thVal=$(this).val();
		var groupTotal = $("#groupTotal").html();
		if( this.checked === true ){
			$("#giveDl"+thVal).addClass("defauThe").parents("dl").siblings().children("dt").removeClass("defauThe");
			var parts = parseInt( $("#parts"+thVal).html() );//组合其一商品金额
			//alert(parts);
			var groupTotal = goodsN+parts;
			$("#groupTotal").html(groupTotal);
		}
	});
});

//详细页产品介绍、用户评价、购买、服务、切换JS
function xxSwitch(obj,objTab){
	$(obj).first().show();
	$(objTab).first().addClass("xxCurrent");
	$(objTab).click(function(){
		$(this).addClass("xxCurrent").siblings().removeClass("xxCurrent");
		var name=$(this).attr("name");
		if($(obj).has(name)){
			$(obj).hide();
			$(obj+"."+name).show();	
		};
	});
};
$(function(){	
	xxSwitch(".xxListData",".goodsThe li");
});
//详细页评论JS
function judgeFun(obj,objTab){
	$(obj).first().show();
	$(objTab).first().addClass("quanBu_pl");
	$(objTab).click(function(){//鼠标经过
		$(this).addClass("quanBu_pl").siblings().removeClass("quanBu_pl");
		var name=$(this).attr("name");
		if($(obj).has(name)){
			$(obj).hide();
			$(obj+"."+name).show();	
		};
	});
};
$(function(){	
	judgeFun(".judgeDiv",".judgeUl li");
});

