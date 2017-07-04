/** Created by vac on 2017-07-03 */

'use strict'

var loadImage = require('./imageloader')
var Timeline = require('./timeline')

// 初始化状态
var STATE_INITIAL = 0
// 开始状态
var STATE_START = 1
// 停止状态
var STATE_STOP = 2

// 同步任务
var TASK_SYNC = 0
// 异步任务
var TASK_ASYNC = 1


/**
 * 简单的函数封装，执行callback
 * @param {any} callback 
 */
function next (callback) {
  callback && callback()
}
/**
 * 帧动画库类
 * @constructor
 */
function Animation() {
  // 任务队列
  this.taskQuene = []
  // 当前执行的任务的索引
  this.index = 0
  this.timeline = new Timeline()
  // 记录当前动画的状态
  this.state = STATE_INITIAL
}
/**
 *  添加一个同步任务，去预加载图片
 * @params {Array} 图片数组
 */
Animation.prototype.loadImage = function (imglist) {
  var taskFn = function (next) {
    loadImage(imglist.slice(), next)
  }
  var type = TASK_SYNC

  return this._add(taskFn, type)
}

/**
 * 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
 * @param {Element} ele DOM对象
 * @param {Array} positions 背景位置数组
 * @param {String} imageUrl 图片地址
 */
Animation.prototype.changePosition = function (ele, positions, imageUrl) {
  var len = positions.length
  var taskFn
  var type
  if (len) {
    var me = this
    taskFn = function (next, time) {
      if (imageUrl) {
        ele.style.backgroundImage = 'url(' + imageUrl + ')'
      }
      // 改变图片的索引
      var index = Math.min(time / me.interval | 0, len) // 和0进行按位或，表示向下取整
      var position = positions[index - 1].split(' ')
      // 改变DOM对象的背景图片的位置
      ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px'
      if (index === len - 1) {
        next()
      }
    }
    type = TASK_ASYNC
  } else {
    taskFn = next
    type = TASK_SYNC
  }
  return this._add(taskFn, type)
}

/**
 * 添加一个异步定时任务，通过定时改变image标签的src属性，实现帧动画
 * @param {Element} ele DOM对象
 * @param {Array} imglist 图片地址的数组
 */
Animation.prototype.changeSrc = function (ele, imglist) {
  var len = imglist.length
  var taskFn
  var type
  if (len) {
    var me = this
    taskFn = function (next, time) {
      // 获得当前图片的索引
      var index = Math.min(time / me.interval | 0, len - 1)
      // 改变image对象的图片地址
      ele.src = imglist[index]
      if (index === len - 1) {
        next()
      }
    }
    type = TASK_ASYNC
  } else {
    taskFn = next
    type = TASK_SYNC
  }
  return this._add(taskFn, type)
}

/**
 * 高级用法，添加一个异步执行任务，
 * 该任务自定义动画每一帧执行的任务函数
 * @param {Function} taskFn 自定义每一帧完成后的任务函数
 */
Animation.prototype.enterFrame = function (taskFn) {
  return this._add(taskFn, TASK_ASYNC)
}

/**
 * 添加一个同步任务，可以在上一个任务完成后执行回调函数
 * 
 * @param {Function} callback  指定要完成的任务
 */
Animation.prototype.then = function (callback) {
  var taskFn = function (next) {
    callback()
    next()
  }

  return this._add(taskFn, TASK_SYNC)
}

/**
 * 开始执行动画，异步定义任务执行的间隔
 * 
 * @param {any} interval 动画每一帧执行的间隔
 */
Animation.prototype.start = function (interval) {
  if (this.state === STATE_START) {
    return this
  }
  // 如果任务链中没有任务，则返回
  if (!this.taskQuene.length) {
    return this
  }
  this.state = STATE_START
  this.interval = interval
  this._runTask()
  return this
}

/**
 * 添加一个同步任务，回退到上一个任务中，
 * 实现重复上一个任务的效果，可以定义重复的次数
 * @param {Number} times 重复的次数，为空是表示无限循环
 */
Animation.prototype.repeat = function (times) {
  var me = this
  var taskFn = function () {
    if (typeof times === 'undefined') {
      // 无限回退到上一个任务
      me.index--
      me._runTask()
      return
    }
    if (times) {
      times--
      // 回退
      me.index--
      me._runTask()
    } else {
      // 达到了重复的次数,转到下一个任务
      var task = me.taskQuene[me.index]
      me._next(task)
    }
  } // taskFn end 

  return this._add(taskFn, TASK_SYNC)
}

/**
 * 无限循环上一次任务
 */
Animation.prototype.repeatForever = function () {
  return this.repeat()
}

/**
 * 设置当前任务执行结束后，到先一个任务开始前等待的时间
 * @param {any} time 等待的时长
 */
Animation.prototype.wait = function (time) {
  if (this.taskQuene && this.taskQuene.length > 0) {
    this.taskQuene[this.taskQuene.length - 1].wait = time
  }
  return this
}

/**
 * 暂停当前任务
 */
Animation.prototype.pause = function () {
  if (this.state === STATE_START) {
    this.state = STATE_STOP
    this.timeline.stop()
    return this
  }
  return this
}

/**
 * 重新开始上一次暂停的任务
 */
Animation.prototype.restart = function () {
  if (this.state === STATE_STOP) {
    this.state = STATE_START
    this.timeline.restart()
    return this
  }
  return this
}

/**
 * 释放资源
 */
Animation.prototype.dispose = function () {
  if (this.state !== STATE_INITIAL) {
    this.state = STATE_INITIAL
    this.taskQuene = null
    this.timeline.stop()
    this.timeline = null
    return this;
  }
  return this
}

/**
 * 添加一个任务到任务队列中,私有方法，所以加了下划线
 * @param { Function } taskFn 任务方法
 * @param { Number } type 任务类型
 */
Animation.prototype._add = function(taskFn, type) {
  this.taskQuene.push({
    taskFn: taskFn,
    ttype: type
  })
  // 返回该Animation对象，满足链式调用的需求
  return this
}

/**
 * 执行任务
 */
Animation.prototype._runTask = function() {
  if (!this.taskQuene || this.state !== STATE_START) {
    return
  }
  // 任务执行完毕
  if (this.index === this.taskQuene.length) {
    this.dispose()
    return
  }
  // 获得当前任务
  var task = this.taskQuene[this.index]
  if (task.type === TASK_SYNC) {
    this._syncTask(task)
  } else {
    this._asyncTask(task)
  }
}

/**
 * 同步任务
 * @param { Function } task  当前要执行的任务
 */
Animation.prototype._syncTask = function(task) {
  var me = this
  var next = function() {
    // 切换到下一个任务
    this._next(task)
  }
  var taskFn = task.taskFn
  taskFn(next)
}

/**
 * 异步任务
 * @param { Function } task 要执行的任务对象
 */
Animation.prototype._asyncTask = function(task) {
  var me = this
  // 定义每一帧执行的回调函数
  var enterFrame = function(time) {
    var taskFn = task.taskFn
    var next = function () {
      // 停止当前任务
      me.timeline.stop()
      // 执行下一个任务
      me._next(task)
    }
    taskFn(next, time)
  }
}

/**
 * 切换到下一个任务,如果当前任务需要等待，则延时执行
 * @param { Function } task 当前任务
 */
Animation.prototype._next = function(task) {
  this.index++
  var me = this
  task.wait ? setTimeout(function() {
    me._runTask()
  }, task.wait) : this._runTask()
}

module.exports = function () {
  return new Animation()
}