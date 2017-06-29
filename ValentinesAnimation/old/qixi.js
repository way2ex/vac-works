var Qixi = function() {
    // 将变量以配置对象的形式保存
    var config = {
        //音乐的配置
        audio: {
            enable: true, // 是否开启音乐
            playURI: "./music/happy.wav", // 播放的地址
            cycleURL: "./music/circulation.wav" // 循环播放的地址
        },
        // 人物走动的时间
        setTime: {
            walkToThird: 6000,
            walkToMiddle: 6500,
            walkToEnd: 6500,
            walkToBridge: 2000,
            bridgeWalk: 2000,
            walkToShop: 1500,
            walkOutShop: 1500,
            openDoorTime: 800,
            shutDoorTime: 500,
            waitRotate: 850,
            waitFlower: 800
        },
        snowFlowerURI: [
            './images/snowflake/snowflake1.png',
            './images/snowflake/snowflake2.png',
            './images/snowflake/snowflake3.png',
            './images/snowflake/snowflake6.png',
            './images/snowflake/snowflake5.png',
            './images/snowflake/snowflake4.png'
        ]
    }; // 变量end
    var instanceX;

    /*************属性******************/
    var container = $('#content');
    // 页面可视区域
    var visualWidth = container.width();
    var visualHeight = container.height();

    var swipe = Swipe($('#content'));

    /***************公共方法*****************/
    // 页面滚动到指定的位置
    function scrollTo(time, proportionX) {
        var distX = container.width() * proportionX;
        swipe.scrollTo(distX, time);
    }
    // 获取数据
    var getValue = function(className) {
        var $elem = $('' + className + '');
        //走路的路线坐标
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
    // 桥的y轴
    var bridgeY = function() {
        var data = getValue('.c_background_middle');
        return data.top;
    }();

    /*************动画结束事件****************/
    var animationEnd = (function() {
        var explorer = navigator.userAgent;
        if (~explorer.indexOf('WebKit')) {
            return 'webkitAnimationEnd';
        }
        return 'animationend';
    })();

    /******************飞鸟***************/
    var bird = {
        elem: $('.bird'),
        fly: function() {
            this.elem.addClass('birdFly');
            this.elem.transition({
                right: container.width()
            }, 15000, 'linear');
        }
    };

    /*******************最后的飘花动画**************/
    function flowerFlake() {
        var $flakeContainer = $('#snowflake');

        function getImageName() {
            return config.snowFlowerURI[Math.floor(Math.random() * 6)];
        }
        // 创建一个雪花元素
        function createSnowBox() {
            var url = getImageName();
            return $("<div class='snowBox'></div>")
                .css({
                    "position": "absolute",
                    "width": 41,
                    "height": 41,
                    "backgroundSize": "cover",
                    "zIndex": 1000,
                    "top": "-41px",
                    "backgroundImage": "url(" + url + ")"
                })
                .addClass('snowRoll');
        }
        // 开始飘花
        setInterval(function() {
            // 运动的轨迹
            // 运动的轨迹
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity = 1,
                endPositionTop = visualHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration = visualHeight * 10 + Math.random() * 5000;

            // 随机透明度，不小于0.5
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;

            // 创建一个雪花
            var $flake = createSnowBox();

            // 设计起点位置
            $flake.css({
                left: startPositionLeft,
                opacity: randomStart
            });

            // 加入到容器
            $flakeContainer.append($flake);

            // 开始执行动画
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //结束后删除
            });
        }, 200);
    }
    /*************商店门与灯的动画******************/
    var shop = function() {
        var defer = $.Deferred();
        var $door = $('.door');
        var doorLeft = $('.door-left');
        var doorRight = $('.door-right');
        // 定义门的动作
        function doorAction(left, right, time) {
            var defer = $.Deferred();
            var count = 2;
            // 等待开门完成
            var complete = function() {
                if (count == 1) {
                    defer.resolve();
                    return;
                }
                count--;
            };
            doorLeft.transition({
                'left': left,
            }, time, complete);
            doorRight.transition({
                'left': right
            }, time, complete);
            return defer;
        }
        // 开门
        function openDoor(time) {
            return doorAction('-50%', '100%', time);
        }
        // 关门
        function shutDoor(time) {
            return doorAction('0%', '50%', time);
        }
        var lamp = {
            elem: $(".b_background"),
            bright: function() {
                this.elem.addClass("lamp-bright")
            },
            dark: function() { this.elem.removeClass("lamp-bright") }
        };
        return {
            openDoor: function(time) {
                openDoor(time);
            },
            shutDoor: function(time) {
                shutDoor(time);
            },
            openLamp: function() {
                lamp.bright();
            },
            closeLamp: function() {
                lamp.dark();
            }
        };
    }

    /******************小女孩*****************/
    var girl = {
        elem: $('.girl'),
        getHeight: function() {
            return this.elem.height();
        },
        getWidth: function() {
            return this.elem.width();
        },
        setOffset: function() {
            this.elem.css({
                left: visualWidth / 2,
                top: bridgeY - this.getHeight()
            });
        },
        getOffset: function() {
            return this.elem.offset();
        },
        rotate: function() {
            this.elem.addClass('girl-rotate');
        }
    };
    // 修正小女孩位置
    girl.setOffset();

    /**
     * 小孩走路
     */
    function BoyWalk() {

        var $boy = $("#boy");
        var boyWidth = $boy.width();
        var boyHeight = $boy.height();
        // 修正小男孩的正确位置
        $boy.css({
            top: pathY - boyHeight + 25
        });
        // 暂停走路
        function pauseWalk() {
            $boy.addClass('pauseWalk');
        }
        // 恢复走路
        function restoreWalk() {
            $boy.removeClass('pauseWalk');
        }
        // CSS3的动作变化
        function slowWalk() {
            $boy.addClass('slowWalk');
        }
        // 用transition做运动
        function startRun(options, runTime) {
            var defer = $.Deferred();
            // 恢复走路
            restoreWalk();
            $boy.transition(
                options,
                runTime,
                'linear',
                function() {
                    defer.resolve(); // 动画完成
                }
            );
            return defer;
        }
        // 开始走路
        function walkRun(time, dist, disY) {
            time = time || 3000;
            // 脚动作
            slowWalk();
            // 开始走路
            var d1 = startRun({
                'left': dist + 'px',
                'top': disY ? disY : undefined
            }, time);
            return d1;
        }
        // 计算移动距离
        function calculateDist(direction, proportion) {
            return (direction == "x" ?
                visualWidth : visualHeight) * proportion;
        }

        // 走进商店
        function walkToShop(runTime) {
            var defer = $.Deferred();
            var doorObj = $('.door');
            // 门的坐标
            var offsetDoor = doorObj.offset(); // 获取相对于视口的距离
            var doorOffsetLeft = offsetDoor.left;
            // 小孩当前坐标
            var offsetBoy = $boy.offset();
            var boyOffsetLeft = offsetBoy.left;

            // 当前需要移动的坐标
            instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffsetLeft + $boy.width() / 2);

            // 开始走路
            var walkPlay = startRun({
                transform: 'translateX(' + instanceX + 'px),scale(0.3,0.3)',
                opacity: 0.1
            }, runTime);

            // 走路完毕
            walkPlay.done(function() {
                $boy.css({
                    opacity: 0
                });
                defer.resolve();
            });
            return defer;
        }

        // 走出商店
        function walkOutShop(runTime) {
            var defer = $.Deferred();
            restoreWalk();
            // 开始走路
            var walkPlay = startRun({
                transform: 'translateX(' + instanceX + 'px),scale(1,1)',
                opacity: 1
            }, runTime);
            // 走路完毕
            walkPlay.done(function() {
                defer.resolve();
            });
            return defer;
        }
        // 取花
        function takeFlower(time) {
            // 增加延时等待效果
            var defer = $.Deferred();
            setTimeout(function() {
                $boy.addClass('slowFlowerWalk');
                defer.resolve();
            }, time);
            return defer;
        }
        return {
            // 开始走路
            walkTo: function(time, proportionX, proportionY) {
                var distX = calculateDist('x', proportionX)
                var distY = calculateDist('y', proportionY)
                return walkRun(time, distX, distY);
            },
            // 停止走路
            stopWalk: function() {
                pauseWalk();
            },
            // 复位初始状态
            resetOriginal: function() {
                this.stopWalk();
                // 恢复图片
                $boy.removeClass('slowWalk slowFlowerWalk').addClass('boyOriginal');
            },
            // 走进商店
            toShop: function() {
                return walkToShop.apply(null, arguments);
            },
            // 取花
            takeFlower: function(time) {
                return takeFlower(time);
            },
            // 走出商店
            outShop: function(time) {
                return walkOutShop(time);
            },
            // 获取宽度
            getWidth: function() {
                return $boy.width();
            },
            // 获取偏移距离
            getDistance: function() {
                return $boy.offset().left;
            },
            // 拿到鲜花
            setFlowerWalk: function() {
                $boy.addClass('slowFlowerWalk');
            },
            rotate: function(callback) {
                restoreWalk();
                $boy.addClass('boy-rotate');
                // 监听转身完毕
                if (callback) {
                    $boy.on(animationEnd, function() {
                        callback();
                        $(this).off();
                    });
                }
            }
        }
    }
    /**********************播放音乐***********************/
    function html5Audio(url, isloop) {
        var audio = new Audio(url);
        audio.autoPlay = true;
        audio.loop = isloop || false;
        audio.play();
        return {
            end: function(callback) {
                audio.addEventListener('ended', function() {
                    callback();
                }, false);
            }
        };
    }
    var audio1 = html5Audio(config.audio.playURI);
    audio1.end(function() {
        html5Audio(config.audio.cycleURL, true);
    });
    var boy = BoyWalk();
    var shop = shop();

    boy.walkTo(config.setTime.walkToThird, 0.6)
        .then(function() {
            scrollTo(config.setTime.walkToMiddle, 1);
            return boy.walkTo(config.setTime.walkToMiddle, 0.5);
        })
        .then(function() {
            bird.fly();
            // 暂停走路
            boy.stopWalk();
            shop.openLamp();
            // 开门
            return shop.openDoor(config.setTime.openDoorTime);
        })
        .then(function() {
            return boy.toShop(config.setTime.walkToShop);
        })
        .then(function() {
            // 取花
            return boy.takeFlower(config.setTime.waitFlower);
        })
        .then(function() {
            // 出商店
            return boy.outShop(config.setTime.walkOutShop);
        })
        .then(function() {
            // 关灯
            shop.closeLamp();
            boy.stopWalk();
            // 关门
            return shop.shutDoor(config.setTime.shutDoorTime);
        })
        .then(function() {
            girl.setOffset();
            scrollTo(config.setTime.walkToEnd, 2);
            // 走到第三个场景
            return boy.walkTo(config.setTime.walkToEnd, 0.15);
        })
        .then(function() {
            return boy.walkTo(config.setTime.walkToBridge, 0.25, (bridgeY - girl.getHeight()) / visualHeight);
        })
        .then(function() {
            var proportionX = (girl.getOffset().left - boy.getWidth() - instanceX +
                girl.getWidth() / 5) / visualWidth;
            return boy.walkTo(config.setTime.bridgeWalk, proportionX);
        })
        .then(function() {
            boy.resetOriginal();
            setTimeout(function() {
                girl.rotate();
                boy.rotate(function() {
                    flowerFlake();
                });
            }, config.setTime.waitRotate);
        });
};
Qixi();