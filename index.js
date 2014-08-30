
var magnet = {};
var Template = require('template');

magnet.init = function(attrs){
	var attr = {
		"selector":null,
		"hoverSelector":".qs-items .qs-img",
		"descSelector":".qs-desc",
		"callback":null,
		"map":{
			"prefixCls":"qs",
			"defaulturl":"",
			"width":216,
			"height":300
		}
	};

	attr = $.extend(true,{},attr,attrs);
	//selector,descSelector,callback
	require.async('./index.css');
	require.async('./box.tpl', function(tpl){
		var render = Template.compile(tpl);
		$(attr.selector).html(render(attr.map));
		setTimeout(function(){
			magnet._render(attr);
			if(_ept(attr.callback) && typeof(attr.callback) == "Function")
				attr.callback();
		},300);
  	});
	
};

function _ept(obj) {
	return (!(Boolean((obj+"").replace(/(^\s*)|(\s*$)/g, "") || obj === 0)) || obj == "null" || obj == "undefined");
};

magnet._render = function(attr){
	/**
	 * 效果来源于 http://www.jue.so/ 采用 KISSY 的 UI 实现
	 * 以下是 jQuery 方法实现，当然原生 js 也不难实现、、
	 */
	$(attr.hoverSelector).hover(function (e) {
		var _this  = $(this), //闭包
		    _desc  = _this.find(attr.descSelector).stop(true),
		    width  = _this.width(), //取得元素宽
		    height = _this.height(), //取得元素高
		    left   = e.offsetX || e.originalEvent.layerX, //得到左边界
		    top    = e.offsetY || e.originalEvent.layerY, //得到上边界
		    right  = width - left, //计算出右边界
		    bottom = height - top, //计算出下边界 
		    _out   = e.type == "mouseleave", //是否是离开事件
		    spos   = {},//起始位置
			way		 = 'none',//存储进入或离开的方向
			_exec  = function(way,epos){
				spos={left:{"left": -width, "top": 0},right:{"left": left,"top": 0},top:{"top": -height, "left": 0},bottom:{"top": height, "left": 0}}[way];
				if (_out) {
						_desc.animate(spos,'fast'); //离开
					} else {
						_desc.css(spos).animate(epos,'fast'); //进入
					}
			};
		//判断进入/离开的方向
		if (_out) {
			//对像的边界矩阵和当前鼠标的坐标
			var _rect	=	{left:_this.offset().left,right:_this.offset().left+_this.width(),top:_this.offset().top,bottom:_this.offset().top+_this.height()},
					pos		=	(e.pageX || e.pageY)
	                ? {x:e.pageX, y:e.pageY}
	                : { 
	                    x:e.clientX + document.body.scrollLeft - document.body.clientLeft, 
	                    y:e.clientY + document.body.scrollTop - document.body.clientTop 
	                  };
			//判断离开的方向
			if(pos.y<=_rect.top){
					way ='top';
			}else if(pos.y>=_rect.bottom){
					way ='bottom';
			}else if(pos.x<=_rect.left){
					way ='left';
			}else{
					way ='right';
			};
		}else{
			//获取进入的方向
			way =[{way:'left',v:left},{way:'right',v:right},{way:'top',v:top},{way:'bottom',v:bottom}].sort(function(a,b){ return a.v-b.v;})[0].way;
		};
		//消灭卡顿现像
		$(attr.descSelector).hide();
		_this.find(attr.descSelector).show();
		// 执行对应边界 进入/离开 的方法
		_exec(way,{"left":0, "top":0});
	});
}

module.exports = magnet;
