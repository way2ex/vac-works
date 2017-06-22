跟着慕课网做一个小demo
## 页面搭建
### 横向布局
因为本案例主要有三个场景页面，所以采用了一个固定大小的div框，然后里面放一个能容纳三个li的ul，采用float使三个li水平分布。
利用js监控div的大小，然后动态设置ul的宽度为其三倍。ul的``overflow``属性为``hidden``。
### 页面的滚动
页面滚动采用的是窗口不动内容动的方法，即滚动里面的ul。
使用了transform来实现滚动。
利用了给元素添加css来触发滚动。
```
element.css({
	'transition-timing-function': 'linear',
    'transition-duration': '5000md',
    'transform': 'translate3d(-'+(width * 2) + 'px,0px,0px)'
});
```
> note:*transform属性是静态属性，不是动画属性，一旦写到style里面，将会直接显示作用，无任何变化过程*


