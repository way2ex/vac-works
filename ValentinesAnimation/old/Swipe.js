/////////
//实现页面滑动//
/////////////

/**
 * 实现元素的滑动
 * @param {Object} container the container which will be scrolled
 * @return {Object} 滑动的对象
 */
function Swipe(container) {
    // 获取第一个子节点
    var element = container.find(':first');

    // 滑动的对象
    var swipe = {};

    // li页面的数量
    var slides = element.find('>');

    // 获取容器的尺寸
    var width = container.width();
    var height = container.height();

    // 设置li页面的总宽度
    element.css({
        width: (slides.length * width) + 'px',
        height: height + 'px'
    });

    //设置每一个页面li的宽度
    $.each(slides, function(index) {
        var slide = slides.eq(index); //获取到每一个li元素
        slide.css({
            width: width + 'px',
            height: height + 'px'
        });
    });

    //监控完成与移动
    swipe.scrollTo = function(x, speed) {
        //执行动画移动
        element.css({
            'transition-timing-function': 'linear',
            'transition-duration': speed + 'ms',
            'transform': 'translate3d(-' + x + 'px,0px,0px)'
        });
        return this;
    };

    return swipe;
}