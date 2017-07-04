  <h2>案例简介</h2>
  案例预览点击这里:
  <a href="./index3.html">官方实现版</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="./index2.html">自我实现版</a>
  <p>这个案例实现了一个人物在不同的场景中进行转换，并在期间进行一系列动作的效果。</p>
  <section>
    <h2>官方实现版</h2>
    <section>
      <h3>实现技术介绍</h3>
      <article>
        <h4>布局介绍</h4>
        <p>采用了一个 <code>div</code> 作为整个场景的容器，里面放置了具有三个 <code>li</code>子元素的 <code>ul</code>作为三个场景的容器 使用了js来动态检测 <code>container</code>的大小，然后设置
          <code>ul</code>为父元素的三倍宽度, <code>li</code>采用浮动水平摆放。
        </p>
        <p>
          主要人物是使用绝对定位直接放置在最外层容器的，以便能在三个场景中切换，注意设置 <code>z-index</code>属性
        </p>
      </article>
      <article>
        <h4>人物切换场景</h4>
        <p>场景的切换是使用人物不动，然后切换背景来实现的。也就是说最外层容器是固定的，然后不断地滚动三个场景。</p>
      </article>
      <article>
        <h4>动画流程的实现</h4>
        <p>整个主流程的动画是依次进行的，具体实现使用了jQuery的 <code>Defer</code>。由于使用jQuery的动画可以在动画完成时调用回调函数， 所以在回调中，使用 <code>defer.resolve()</code>          很容易实现按顺序依次执行动画</p>
      </article>
      <article>
        <h4>元素位置与大小的获取</h4>
        <p>使用jQuery确实很方便，很容易就可以获取到当前元素的很多属性，如大小，位置等等</p>
      </article>
    </section>
    <section>
      <h3>知识总结</h3>
      <ul>
        <li>
          <code>$ele.css()</code>： 直接设置css，接受对象类型的参数
        </li>
        <li>
          <code>$ele.getHeight()</code>: 获取元素的高度
        </li>
        <li>
          <code>$ele.position()</code>: 获取元素位置，返回一个包含left和top的对象
        </li>
        <li>
          <code>$ele.transition()</code> : 设置动画，接受多个参数，可以指定一个回调函数
        </li>
        <li>
          <code>$.Defer()</code>: 创建一个 <code>Defer</code>对象，类似于ES6中的 <code>Promise</code>
        </li>
      </ul>
      <p>没什么高级知识，都很基础。顺便查了一下JS对于动画完成时回调的实现，就是用了animationend和transitionend事件来实现的。</p>
    </section>
  </section>
  <section>
    <h2>自我实现版</h2>
    <section>
      <h3>实现技术介绍</h3>
      <article>
        <h4>页面布局</h4>
        <p>没有使用float布局，设置 <code>ul</code>的宽度为父元素的300%，然后设置了 <code>li</code>标签为父元素的33.33%。感觉还是使用
          <code>float</code>更好一些 </p>
      </article>
      <article>
        <h4>动画流程</h4>
        <p>本来想使用 <code>Promise</code>来实现整个流程和异步的，但是在查看了jQuery的transition库后，了解了动画结束的回调实现，了解了
          <code>animationend</code> 和 <code>transitionend</code>后，感觉这样也可以实现</p>
        <p>对于动画结束的回调函数，实际上就是添加动画后，立刻添加对 <code>animationend</code>事件的监听函数，在执行完后，再移除该监听器。 对于没有实现
          <code>animationend</code>事件的浏览器，则使用<code>setTimeout</code>来实现。</p>
      </article>
      <article>
        <h4>元素大小和位置的获取</h4>
        <p>因为对于元素只需要获取border之外的整体大小，所以使用了 <code>element.offsetHeight</code>来获取大小。</p>
        <p> 位置的获取可以使用 <code>element.offsetLeft</code> 和 <code>element.offsetTop</code>。</p>
        <p>如果想要获取元素在整个视口的位置，也可以使用 <code>element.getBoundingClientRect()</code>,这个方法也能获取大小</p>
      </article>
    </section>
    <section>
      <h3>知识总结</h3>
      <ul>
        <li>
          <code>element.getBoundingClientRect()</code>：
          <p>该方法返回一个包含位置和大小的对象，含有left, top, bottom, right,height, width六个属性</p>
          <p>注意：该方法返回的位置是相对于整个视口的，若是容器发生了滚动，返回的位置也会发生变化，若想滚动时不发生变化，则可以加上页面滚动的距离
            <code>window.scrollY</code>或 <code>window.scrollX</code> 对于浏览器兼容性要求高的脚本，可以使用 <code>window.pageXOffset</code>            和 <code>window.pageYOffset</code></p>
          若这些属性都不能用，可以使用下面的方法:
          <pre>
// For scrollX
(((t = document.documentElement) || (t = document.body.parentNode)) 
&& typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft
// For scrollY
(((t = document.documentElement) || (t = document.body.parentNode)) 
&& typeof t.scrollTop == 'number' ? t : document.body).scrollTop
            </pre>
            <p>注意:这里返回的高度和宽度与 <code>offsetHeight</code> 取得的值是不一样的。不知道为什么</p>
        </li>
        <li>
          使用<code>element.style.cssText</code>来设置css
          <p>该属性可读可写，用来设置读取其被添加的css样式属性。注意，不是计算出来的样式，也非样式表中写的样式，而是代码添加的行内样式。</p>
          <p>还有一个 <code>stylesheet.cssRule[0].cssText</code>,是通过样式表的css规则来获取样式表中的具体代码。</p>
          <p>通过<code>document.styleSheets</code>来获取所有的样式表，包括外部引入样式表和以 <code>style</code>标签的形式定义的样式表。</p>
          <p>每个stylesheet都含有一个cssRules类数组对象，包含了写入的很多条规则。</p>
        </li>
        <li>
          面向对象之构造对象
          <p>使用了<code>new</code>操作符来实现对象的创建，可以将对象所需要的一系列方法封装到构造函数中。本例中，就对小男孩的行为进行了简单的封装。</p>
        </li>
        <li>
          关于<code>animationend</code><code>transitionend</code>事件
          <p><code>animationend</code>事件有以下三个属性: 
            <ul>
              <li> <code> animationName：</code>
                <p>表示当前完成的动画的名字，即css的 <code>animation-name</code>属性。可以根据此来判断是哪一个动画，然后执行相应的动作。</p>
              </li>
              <li>
                <code>elapsedTime：</code>
                <p>表示当前动画持续的时间，不包括中间的暂停。</p>
              </li>
              <li>
                <code>pseudoElement：</code>
                <p> 表示以``::``开头的伪元素的名字，如果当前动画运行在一个元素上，则返回空字符串，目前没有浏览器实现这个。</p>
              </li>
            </ul>
          </p>
          <p>
            <code>transitionend</code>事件也有三个属性，其中一个不同的属性是 <code>propertyName</code>,表示当前完成的动画的属性，如
            <code>margin-left, transform</code>等。
          </p>
        </li>
      </ul>
    </section>
    <section>
      <h3>不足之处</h3>
      <p>由于无法精确的知道某些场景的位置，所以在走到桥上时，人物的行走轨迹有些不当。</p>
      <p>没有使用异步的Promise，整个过程的代码写得很混乱，事件监听中放置了事件监听和 <code>setTimeout</code>，
      导致代码结构不清晰，不能适应更复杂一些的过程。</p>
    </section>
  </section>