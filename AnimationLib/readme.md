完成了上一个案例之后，就像自己实现一个类似于jQuery动画功能的动画库，正好看到了这个教程，就开始做一个帧动画库吧

## 需求分析
设计一个通用的动画库，包括以下功能:
1. 支持图片**预加载**
2. 支持**两种**动画播放方式，及**自定义**每帧动画
3. 支持**单组**动画控制循环次数(可支持无限次)
4. 支持**一组**动画完成，进行下一组动画
5. 支持每个动画完成后有**等待时间**
6. 支持动画的**暂停**和**继续**播放
7. 支持动画完成后执行回调函数

## 编程接口
1. loadImage(imglist)
 预加载图片
2. changePosition(ele, positions, imageUrl)
 通过改变元素的``background-position``实现动画
3. changeSrc(ele, imglist)
 改变image元素的src
4. enterFrame(callback)
 可以指定每一帧动画结束后执行的函数，相当于用户自定义每一帧动画的callback
5. repeat(times)
 指定动画重复的次数，times为空时表示无限次
6. repeatForever()
 相当于times为空时的``repeat()``函数
7. wait(time)
 每个动画执行完后等待的时间
8. then(callback)
 动画执行完之后的回调函数
9. start(interval)
 动画开始执行，interval表示动画执行的间隔
10. pause()
 动画暂停
11. restart()
 动画从上一次暂停处重新执行
12. dispose()
 释放资源
 
## 调用方式
1. 支持链式调用，以动词的方式描述接口，调用方式如下:
```
 var animation = require('animation')
 var demoAnimation = animation()
 	.loadImage(images)
    .changePosition(ele, positions)
    .repeat(2)
    .then(function(){
    	// 动画完成后调用此函数
    })
 demoAnimation.start(80)
```

## 代码设计
1. 把"图片加载 -> 动画执行 -> 动画结束" 等一系列操作堪称一条**任务链**
 任务链有两种类型的任务:
  - 同步执行完毕的
  - 异步定时执行的
2. 记录当前任务链的索引
3. 每个人物执行完毕后，通过调用``next()``方法，执行下一个任务，同时更新任务链的索引值

## Webpack打包
在浏览器环境中不能使用require方法，webpack可以分析依赖关系，将资源进行打包。

## 收获与知识点
跟着教程做完了这个帧动画库，收获还是挺大的，既包括在使用前端打包工具时不同文件的编写与调用，也包括代码的组织和结构，还熟悉了webpack的工作流程，在过程中出现的一些小技巧也是值得注意的。

### 遍历数组或者对象
使用``for-in``和``object.hasOwnProperty(propertyName)``可以遍历数组中的项，也可以遍历对象中所有可枚举属性。

### 想调用一个方法时，可以使用逻辑与的短路操作，这样就可以避免调用不存在的函数或者引发不是函数的错误
```
callback && callback()
```




