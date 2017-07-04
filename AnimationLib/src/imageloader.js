/** Create by vac on 2017-07-04   */

'use strict'

/**
 * 预加载图片
 * @param { Array|Object } images 加载图片的数组或对象 
 * @param { Function } callback 全部图片加载完成后的回调函数
 * @param { Number } timeout 加载超时的时长
 */
function loadImage(images, callback, timeout) {
  // 加载完成图片的数量
  var count = 0
  // 全部图片加载成功的标志位
  var success = true
  // 超时timer的id
  var timeoutId = 0
  // 是否加载超时的标志位
  var isTimeout = false

  // 对图片数组或者对象进行遍历
  for (var key in images) {
    // 过滤prototype上的属性
    if (!images.hasOwnProperty(key)) {
      continue
    }
    // 获得每个图片元素
    // 期望格式是个object: {src:xxx}
    var item = images[key]

    // 进行类型检测
    if (typeof item === 'string') {
      // 将字符串转化为对象格式
      images[key] = {
        src: item
      }
      item = images[key]
    }
    // 格式不满足，则继续循环
    if (!item || item.src) {
      continue
    }
    // 计数加1
    count++
    // 设置图片元素的id
    item.id = '__img__' + key + getId()
    // 设置图片元素的img，是一个Image对象
    item.img = window[item.id] = new Image()

    doLoad(item)
  } // for-in

  // 如果计数为0，直接调用callback
  if (!count) {
    callback(success)
  } else if (timeout) {
    timeoutId = setTimeout(onTimeout, timeout)
  }

  /**
   * 真正进行图片加载的函数
   * 
   * @param {Object} item 图片元素对象
   */
  function doLoad(item) {
    item.status = 'loading'

    var img = item.img
    // 定义图片加载成功的回调函数
    img.onload = function() {
      // 如果有一个失败，则后面的都会失败
      success = success & true
      item.status = 'loaded'
      done()
    }
    // 定义图片加载失败的回调函数
    img.onerror = function() {
      success = false
      item.status = 'error'
      done()
    }

    // 发起http请求加载图片
    img.src = item.src
    /**
     * 每张图片加载完成后的回调函数
     */
    function done() {
      img.onload = img.onerror = null

      try {
        delete window[item.id]
      } catch (e) {}

      // 每张图片加载完成，计数器-1，当所有的图片加载完成且没有超时，
      // 清除超时计数器，执行回调函数
      if (!--count && !isTimeout) {
        clearTimeout(timeoutId)
        callback(success)
      }
    }
  } // doLoad

  /**
   * 超时函数
   */
  function onTimeout() {
    isTimeout = true
    callback(false)
  }
}

var __id = 0
function getId() {
  return ++__id
}
module.exports = loadImage