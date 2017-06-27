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

### 添加任务和第一个场景的背景
第一个场景的背景分为三个部分:上方-楼房 中间-路 下方-绿地，实际上是用三个div依次实现的。
人物的div使用``position: absolution``，以达到可以在各个场景中穿梭的效果。
人物一开始是在中间的路上走，当页面的大小发生变化时，需要动态调整人物的高度，通过检测中间路的位置来更改人物的位置

- 获取路的位置
 ```
var getValue = function(className) {
                var $elem = $('' + className + '');
                // 走路的路线
                return {
                    height: $elem.height(),
                    top: $elem.position().top
                };
            }
            // 路的y轴
var pathY = function() {
    var data = getValue('.a_background_middle');
    return data.top + data.height / 2;
}();
 ```

- 设置任务的位置
```
// 25是一个偏移值
$boy.css({
    top: pathY - boyHeight + 25
});
```

### 精灵动画实现人物的走路效果
CSS Sprites在国内很多人叫CSS精灵，其实这个技术不新鲜，原理就是：**靠不断的切换图片让人感觉视觉上不断在变化**，例如gif动画之类的效果。
可以使用CSS3的动画效果来切换div的``background-position``属性。
然后使用了``jquery.transit``来实现transition的CSS3过渡动画
```
$boy.transition({
    'left': $("#content").width() + 'px',
}, 10000, 'linear', function() {});
```

### 路径动画的处理
路径动画就是人物行走的路径和在时刻y轴的不同位置
- 走路到页面的2/3的时候，主题页面开始滑动
- 走路到1/2的时候，到了商店门口
- 进出商店
- 走路到1/4到了桥边
- 走路到1/2到了桥上

### 本案例中使用了jQuery中的``dererred``来实现人物依次连续的动画。
其中人物走动的动画完成后会依次进行其他动画，开关门的动画也是依次实现的，先开门后关门


