import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.d53bf09d.js";const h=JSON.parse('{"title":"Vue 插槽 (slot) 的实现原理","description":"Vue 插槽 (slot) 的实现原理","frontmatter":{"description":"Vue 插槽 (slot) 的实现原理","layout":"doc","tag":["vue"]},"headers":[],"relativePath":"vue-md/vue-slot.md","filePath":"vue-md/vue-slot.md","lastUpdated":null}'),p={name:"vue-md/vue-slot.md"},o=l(`<h1 id="vue-插槽-slot-的实现原理" tabindex="-1">Vue 插槽 (slot) 的实现原理 <a class="header-anchor" href="#vue-插槽-slot-的实现原理" aria-label="Permalink to &quot;Vue 插槽 (slot) 的实现原理&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>大家好，我是你们的友好邻居 Talon ，想必大家都用过 Vue 的插槽吧，用过的人都说好用，没用过的人建议用一用，那么这个插槽到底是怎么实现的，我们今天就来一探究竟。</p><h2 id="插槽的工作原理与实现" tabindex="-1">插槽的工作原理与实现 <a class="header-anchor" href="#插槽的工作原理与实现" aria-label="Permalink to &quot;插槽的工作原理与实现&quot;">​</a></h2><p>顾名思义，组件的插槽指组件会预留一个槽位，该槽位具体要渲 染的内容由用户插入，如下面给出的 <code>MyComponent</code> 组件的模板所 示：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">header</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">slot</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;header&quot;</span><span style="color:#FDAEB7;font-style:italic;">/</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">header</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">slot</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;body&quot;</span><span style="color:#FDAEB7;font-style:italic;">/</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">footer</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">slot</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;footer&quot;</span><span style="color:#FDAEB7;font-style:italic;">/</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">footer</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">header</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">slot</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;header&quot;</span><span style="color:#B31D28;font-style:italic;">/</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">header</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">slot</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;body&quot;</span><span style="color:#B31D28;font-style:italic;">/</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">footer</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">slot</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;footer&quot;</span><span style="color:#B31D28;font-style:italic;">/</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">footer</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>当在父组件中使用 <code>&lt;MyComponent&gt;</code> 组件时，可以根据插槽的名 字来插入自定义的内容：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">MyComponent</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;template #header&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;h1&gt;我是标题&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;template #body&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;section&gt;我是内容&lt;/section&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;template #footer&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;p&gt;我是注脚&lt;/p&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">MyComponent</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">MyComponent</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;template #header&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;h1&gt;我是标题&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;template #body&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;section&gt;我是内容&lt;/section&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;template #footer&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;p&gt;我是注脚&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">MyComponent</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>上面这段父组件的模板会被编译成如下渲染函数</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 父组件的渲染函数</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: MyComponent,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 组件的 children 会被编译成一个对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        children: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">header</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {type: </span><span style="color:#9ECBFF;">&#39;h1&#39;</span><span style="color:#E1E4E8;">, children: </span><span style="color:#9ECBFF;">&#39;我是标题&#39;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">body</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {type: </span><span style="color:#9ECBFF;">&#39;section&#39;</span><span style="color:#E1E4E8;">, children: </span><span style="color:#9ECBFF;">&#39;我是内容&#39;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">footer</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {type: </span><span style="color:#9ECBFF;">&#39;p&#39;</span><span style="color:#E1E4E8;">, children: </span><span style="color:#9ECBFF;">&#39;我是注脚&#39;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 父组件的渲染函数</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        type: MyComponent,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 组件的 children 会被编译成一个对象</span></span>
<span class="line"><span style="color:#24292E;">        children: {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">header</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {type: </span><span style="color:#032F62;">&#39;h1&#39;</span><span style="color:#24292E;">, children: </span><span style="color:#032F62;">&#39;我是标题&#39;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">body</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {type: </span><span style="color:#032F62;">&#39;section&#39;</span><span style="color:#24292E;">, children: </span><span style="color:#032F62;">&#39;我是内容&#39;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">footer</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {type: </span><span style="color:#032F62;">&#39;p&#39;</span><span style="color:#24292E;">, children: </span><span style="color:#032F62;">&#39;我是注脚&#39;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，组件模板中的插槽内容会被编译为插槽函数，而插槽 函数的返回值就是具体的插槽内容。组件 MyComponent 的模板则会 被编译为如下渲染函数：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// MyComponent 组件模板的编译结果</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">            type: </span><span style="color:#9ECBFF;">&#39;header&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            children: [</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$slots.</span><span style="color:#B392F0;">header</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">            type: </span><span style="color:#9ECBFF;">&#39;body&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            children: [</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$slots.</span><span style="color:#B392F0;">body</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">            type: </span><span style="color:#9ECBFF;">&#39;footer&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            children: [</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$slots.</span><span style="color:#B392F0;">footer</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">// MyComponent 组件模板的编译结果</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">            type: </span><span style="color:#032F62;">&#39;header&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            children: [</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$slots.</span><span style="color:#6F42C1;">header</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">            type: </span><span style="color:#032F62;">&#39;body&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            children: [</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$slots.</span><span style="color:#6F42C1;">body</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">            type: </span><span style="color:#032F62;">&#39;footer&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            children: [</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$slots.</span><span style="color:#6F42C1;">footer</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，渲染插槽内容的过程，就是调用插槽函数并渲染由其 返回的内容的过程。这与 React 中 render props 的概念非常相似。 在运行时的实现上，插槽则依赖于 setupContext 中的 slots 对象，如下面的代码所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mountComponent</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">vnode</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">container</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">anchor</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 省略部分代码</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 直接使用编译好的 vnode.children 对象作为 slots 对象即可</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">slots</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> vnode.children </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 将 slots 对象添加到 setupContext 中</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">setupContext</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {attrs, emit, slots}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mountComponent</span><span style="color:#24292E;">(</span><span style="color:#E36209;">vnode</span><span style="color:#24292E;">, </span><span style="color:#E36209;">container</span><span style="color:#24292E;">, </span><span style="color:#E36209;">anchor</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 省略部分代码</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 直接使用编译好的 vnode.children 对象作为 slots 对象即可</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">slots</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> vnode.children </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 将 slots 对象添加到 setupContext 中</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">setupContext</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {attrs, emit, slots}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，最基本的 slots 的实现非常简单。只需要将编译好的 VNode.children 作为 slots 对象，然后将 slots 对象添加到 setupContext 对象中。为了在 render 函数内和生命周期钩子函数 内能够通过 this.$slots 来访问插槽内容，我们还需要在 renderContext 中特殊对待 $slots 属性，如下面的代码所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mountComponent</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">vnode</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">container</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">anchor</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 省略部分代码</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">slots</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> vnode.children </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">instance</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        state,</span></span>
<span class="line"><span style="color:#E1E4E8;">        props: </span><span style="color:#B392F0;">shallowReactive</span><span style="color:#E1E4E8;">(props),</span></span>
<span class="line"><span style="color:#E1E4E8;">        isMounted: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        subTree: </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 将插槽添加到组件实例上</span></span>
<span class="line"><span style="color:#E1E4E8;">        slots</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 省略部分代码</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">renderContext</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(instance, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">t</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">k</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">r</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> {</span><span style="color:#79B8FF;">state</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">props</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">slots</span><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> t</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 当 k 的值为 $slots 时，直接返回组件实例上的 slots</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (k </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;$slots&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> slots</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 省略部分代码</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">t</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">k</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">v</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">r</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 省略部分代码</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 省略部分代码</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mountComponent</span><span style="color:#24292E;">(</span><span style="color:#E36209;">vnode</span><span style="color:#24292E;">, </span><span style="color:#E36209;">container</span><span style="color:#24292E;">, </span><span style="color:#E36209;">anchor</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 省略部分代码</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">slots</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> vnode.children </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">instance</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        state,</span></span>
<span class="line"><span style="color:#24292E;">        props: </span><span style="color:#6F42C1;">shallowReactive</span><span style="color:#24292E;">(props),</span></span>
<span class="line"><span style="color:#24292E;">        isMounted: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        subTree: </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 将插槽添加到组件实例上</span></span>
<span class="line"><span style="color:#24292E;">        slots</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 省略部分代码</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">renderContext</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(instance, {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#E36209;">t</span><span style="color:#24292E;">, </span><span style="color:#E36209;">k</span><span style="color:#24292E;">, </span><span style="color:#E36209;">r</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> {</span><span style="color:#005CC5;">state</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">props</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">slots</span><span style="color:#24292E;">} </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> t</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 当 k 的值为 $slots 时，直接返回组件实例上的 slots</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (k </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;$slots&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> slots</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 省略部分代码</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#E36209;">t</span><span style="color:#24292E;">, </span><span style="color:#E36209;">k</span><span style="color:#24292E;">, </span><span style="color:#E36209;">v</span><span style="color:#24292E;">, </span><span style="color:#E36209;">r</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 省略部分代码</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 省略部分代码</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们对渲染上下文 renderContext 代理对象的 get 拦截函数做 了特殊处理，当读取的键是 $slots 时，直接返回组件实例上的 slots 对象，这样用户就可以通过 this.$slots 来访问插槽内容 了。</p><p><strong><i>—— 节选自 Vue.js 设计与实现</i></strong></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>当子组件 vm 实例化时，获取到父组件传入的 slot 标签的内容，存放在 vm.$slot中，默认插槽为vm.$slot.default，具名插槽为 vm.$slot.xxx，xxx 为插槽名，当组件执行渲染函数时候，遇到slot标签，使用$slot 中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。</p><h2 id="最后" tabindex="-1">最后 <a class="header-anchor" href="#最后" aria-label="Permalink to &quot;最后&quot;">​</a></h2><p>好了，今天就到这里啦，明天依旧光芒万丈哦～，希望对你们有帮助，祝大家工作顺利，生活愉快！ 读者有什么更好的方式想法，欢迎留言评论，一起学习一起进步！</p>`,22),e=[o];function t(c,r,E,y,i,d){return n(),a("div",null,e)}const u=s(p,[["render",t]]);export{h as __pageData,u as default};
