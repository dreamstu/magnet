# magnet [![spm version](http://spmjs.io/badge/magnet)](http://spmjs.io/package/magnet)

---

类似词贴的遮罩，有方向性的遮罩效果!

---

## Install

```
$ spm install magnet --save
```

## Usage

```js
var magnet = require('magnet');
	// use magnet
	magnet.init({
		"selector":"#box",
		"hoverSelector":".qs-items .qs-img",
		"descSelector":".qs-desc",
		"map":{
			"prefixCls":"qs",
			"defaulturl":"./img/default.jpg",
			"width":216,
			"height":300,
			"data":[
				{"imgurl":"xxx.jpg","title":"图片一","desc":"这是图片一的说明文字"},
				{"imgurl":"xxx.jpg","title":"图片二","desc":"这是图片二的说明文字"},
				{"imgurl":"xxx.jpg","title":"图片三","desc":"这是图片三的说明文字"},
				{"imgurl":"xxx.jpg","title":"图片四","desc":"这是图片四的说明文字"},
				{"imgurl":"xxx.jpg","title":"图片五","desc":"这是图片五的说明文字"}
			]
		},
		"callback":function(){
			console.log('init done!');
		}
	});
```

