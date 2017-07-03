+function () {
  var config = {
    snowFlowerURI: [
      './old/images/snowflake/snowflake1.png',
      './old/images/snowflake/snowflake2.png',
      './old/images/snowflake/snowflake3.png',
      './old/images/snowflake/snowflake6.png',
      './old/images/snowflake/snowflake5.png',
      './old/images/snowflake/snowflake4.png'
    ]
  }
  /********************封装人物的行为*******************/
  var Boy = function () {
    var path = document.querySelector('.a_background_middle')
    boy.style.top = path.getBoundingClientRect().top - boy.offsetHeight + path.offsetHeight / 2 + 'px'
    this.walkToShop = function (time) {
      var offset = getOffset('#boy', '.door')
      this.offset = offset
      boy.style.transition = 'transform ' + time + ' linear'
      console.log(boy.offsetLeft + ":" + offset.x)
      // console.log()
      boy.style.transform = 'translate(' + offset.x + 'px,' + offset.y + 'px) scale(0.0, 0.0)'
    }
    this.walkOutShop = function (time) {
      // boy.style.transition = 'transform ' + time + 'linear'
      console.log(boy.offsetLeft)
      boy.style.transform = 'translate(' + (this.offset.x) + 'px, ' + (-this.offset.y) + 'px) scale(1, 1)'
    }
    // 走到第三个场景的桥边
    this.walkToBridge = function (time, callback) {
      var girl = document.querySelector('.girl')
      var offset = function () {
        return {
          x: boy.offsetLeft - girl.offsetLeft,
          y: boy.offsetTop - girl.offsetTop
        }
      }()
      boy.style.transition = 'transform ' + time + ' cubic-bezier(.98,.01,.32,1) '
      boy.style.transform = 'translate(' + (-1 * offset.x + parseInt(girl.offsetWidth) - 2 * boy.offsetWidth + 20) + 'px, -' + offset.y + 'px)'
      boy.addEventListener('transitionend', function () {
        callback()
        boy.removeEventListener('transitionend', arguments.callee, false)
      }, false)
    }
  }
  /********************小女孩的行为************************/
  var bridgeY = document.querySelector('.c_background_middle').getBoundingClientRect().top
  var girl = {
    ele: document.querySelector('.girl'),
    setOffset: function () {
      this.ele.style.top = bridgeY - this.ele.offsetHeight + 'px'
    }
  }
  /*****************封装商店的行为*********************/
  var Shop = function () {
    var doorLeft = document.querySelector('.door-left')
    var doorRight = document.querySelector('.door-right')

    this.doorAction = function (left, right, duration, callback) {
      var times = 2
      var complete = function () {
        if (times === 1) {
          callback()
        }
        times--
      }

      // 添加transiton
      doorLeft.style.transition = 'transform ' + duration
      doorRight.style.transition = 'transform ' + duration
      doorLeft.style.transform = 'translateX(' + left + ')'
      doorRight.style.transform = 'translateX(' + right + ')'
      doorLeft.addEventListener('transitionend', complete, false)
      doorRight.addEventListener('transitionend', complete, false)
    } // this.doorAction

    this.openDoor = function (time, callback) {
      this.doorAction('-100%', '100%', time, callback)
    }
    this.closeDoor = function (time, callback) {
      this.doorAction('0%', '0%', time, callback)
    }
    this.turnOnLamp = function () {
      document.querySelector('.b_background').classList.add('lamp-bright')
    }
    this.turnOffLamp = function () {
      document.querySelector('.b_background').classList.remove('lamp-bright')
    }
  }
  /********************飘花的动画**********************/
  function flowerFlake () {
    var flakeContainer = document.querySelector('#snowflake')

    function getImageName () {
      return config.snowFlowerURI[Math.floor(Math.random() * 6)]
    }
    // 创建一个花瓣元素
    function createSnowBox () {
      var url = getImageName()
      var div = document.createElement('div')
      div.className = 'snowBox'
      div.style.cssText = `
                    position: absolute;
                    width: 41px;
                    height: 41px;
                    background-size: cover;
                    z-index: 1000;
                    top: -41px;
                    background-image: url(` + url + ');'
      div.classList.add('snowRoll')
      return div
    }

    // 开始飘花
    setInterval(function () {
      // 运动的轨迹
      var viewportWidth = document.querySelector('.content-wrap').offsetWidth
      var viewportHeight = document.querySelector('.content-wrap').offsetHeight
      var startPositionLeft = Math.random() * viewportWidth,
        startOpacity = 1,
        endPositionTop = viewportHeight + 40,
        endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
        duration = viewportHeight * 10 + Math.random() * 5000

      // 随机透明度
      var randomStart = Math.random()
      randomStart = randomStart < 0.5 ? startOpacity : randomStart

      // 创建一个雪花
      var flake = createSnowBox()
      flake.style.transition = 'left ' + duration + 'ms ease-out, top ' + duration + 'ms ease-out'

      // 设计起点位置
      flake.style.left = startPositionLeft + 'px'
      flake.style.opacity = randomStart
      flakeContainer.appendChild(flake)

      requestAnimationFrame(function() {
        requestAnimationFrame(() => {
          flake.style.left = endPositionLeft + 'px'
          flake.style.top = endPositionTop + 'px'
          flake.style.opacity = 0.7
        })
      })
    }, 200) // 开始飘花end
  }
  girl.setOffset()
  var boy = document.querySelector('#boy')
  // console.log(boy.getBoundingClientRect().height + '-' + boy.offsetHeight + "-" + boy.clientHeight)
  // console.log(boy.getClientRects())
  // console.log(boy.getBoundingClientRect())
  boy.addEventListener('animationend', function (event) {
    if (event.animationName === 'walk-to-6percent') {
      document.querySelector('.content-wrap').classList.add('scroll-1')
    }
  }, false)
  var shop = new Shop()
  var walkingBoy = new Boy()
  // boy.addEventListener('transitionend', (event) => {
  // }, false)
  var container = document.querySelector('.content-wrap')

  container.addEventListener('animationend', function (event) {
    switch (event.animationName) {
      case 'scroll-1':
        document.querySelector('.bird').classList.add('birdFly')
        // 停止行走
        boy.classList.add('pauseWalk')
        shop.turnOnLamp()
        shop.openDoor('1s', () => {
          // 开始行走
          boy.classList.remove('pauseWalk')
          // 进商店
          walkingBoy.walkToShop('2000ms')
        })
        boy.addEventListener('transitionend', function (event) {
          var callee = arguments.callee
          if (event.propertyName === 'transform') {
            // 进入商店后
            setTimeout(function () {
              boy.removeEventListener('transitionend', callee, false)
              // boy.classList.remove('firstWalkSlow')
              boy.classList.add('slowFlowerWalk')
              // 走出商店
              walkingBoy.walkOutShop('2000ms')
              boy.addEventListener('transitionend', function () {
                var callee = arguments.callee
                var callback = function () {
                  shop.turnOffLamp()
                  // 场景开始滚动
                  container.classList.add('scroll-2')
                  // 同时男孩开始走到桥上
                  walkingBoy.walkToBridge('4500ms', function () {
                    boy.classList.add('pauseWalk')
                    boy.classList.add('boyOriginal')
                    boy.style.animation = 'walk-to-6percent 6000ms 1 linear forwards'
                    setTimeout(function () {
                      boy.style.animation = 'boy-rotate 850ms 1 step-start forwards, walk-to-6percent 6000ms 1 linear forwards'
                      document.querySelector('.girl').classList.add('girl-rotate')
                      flowerFlake()
                    }, 1000)
                  })

                  boy.removeEventListener('transitionend', callee, false)
                }
                shop.closeDoor('1000ms', callback)
              }, false)
            }, 1000)
          }
        }, false)
        break
      case 'scroll-2':

        break
      default:
        break
    }
  }, false)

  /********************获取任务需要移动的距离**************************/
  var getOffset = function (srcSelector, destSelector) {
    var destInfo = document.querySelector(destSelector).getBoundingClientRect()
    var srcInfo = document.querySelector(srcSelector).getBoundingClientRect()
    return {
      x: (destInfo.left + destInfo.right) / 2 - (srcInfo.left + srcInfo.right) / 2,
      y: (destInfo.top + destInfo.bottom) / 2 - (srcInfo.top + srcInfo.bottom) / 2
    }
  }
}()
