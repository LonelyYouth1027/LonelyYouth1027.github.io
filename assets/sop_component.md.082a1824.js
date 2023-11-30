import{_ as d,C as i,o as l,c as E,H as n,w as s,b as t,a as c,ab as r,Q as e,k as a}from"./chunks/framework.d53bf09d.js";const I=JSON.parse('{"title":"","description":"默认支持流程图，tabs面板","frontmatter":{"description":"默认支持流程图，tabs面板"},"headers":[],"relativePath":"sop/component.md","filePath":"sop/component.md","lastUpdated":null}'),y={name:"sop/component.md"},b=e('<h1 id="内置第三方插件能力" tabindex="-1">内置第三方插件能力 <a class="header-anchor" href="#内置第三方插件能力" aria-label="Permalink to &quot;内置第三方插件能力&quot;">​</a></h1><h2 id="tabs" tabindex="-1">tabs <a class="header-anchor" href="#tabs" aria-label="Permalink to &quot;tabs&quot;">​</a></h2><ul><li>Type: <code>boolean</code></li></ul><p>支持局部的<code>tabs</code>面板，<strong>默认开启</strong></p><div class="tip custom-block"><p class="custom-block-title">一点说明</p><p>基于 <a href="https://www.npmjs.com/package/vitepress-plugin-tabs" target="_blank" rel="noreferrer">vitepress-plugin-tabs@0.2.0</a> 内置实现</p></div><p>效果如下</p>',6),h=a("p",null,"一些内容",-1),m=a("p",null,"一些内容",-1),g=a("p",null,"一些内容",-1),_=a("p",null,"一些内容 。。。",-1),u=e(`<p>简单的使用方式如下（效果如上面的示例）</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">:::=tabs</span></span>
<span class="line"><span style="color:#E1E4E8;">::tab1</span></span>
<span class="line"><span style="color:#E1E4E8;">一些内容</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">一些内容</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">一些内容</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">::tab2</span></span>
<span class="line"><span style="color:#E1E4E8;">一些内容 。。。</span></span>
<span class="line"><span style="color:#E1E4E8;">:::</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">:::=tabs</span></span>
<span class="line"><span style="color:#24292E;">::tab1</span></span>
<span class="line"><span style="color:#24292E;">一些内容</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">一些内容</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">一些内容</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">::tab2</span></span>
<span class="line"><span style="color:#24292E;">一些内容 。。。</span></span>
<span class="line"><span style="color:#24292E;">:::</span></span></code></pre></div><p>共享状态的使用方式如下</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">:::=tabs=ab</span></span>
<span class="line"><span style="color:#E1E4E8;">::a</span></span>
<span class="line"><span style="color:#E1E4E8;">a content</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">::b</span></span>
<span class="line"><span style="color:#E1E4E8;">b content</span></span>
<span class="line"><span style="color:#E1E4E8;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">:::=tabs=ab</span></span>
<span class="line"><span style="color:#E1E4E8;">::a</span></span>
<span class="line"><span style="color:#E1E4E8;">a content 2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">::b</span></span>
<span class="line"><span style="color:#E1E4E8;">b content 2</span></span>
<span class="line"><span style="color:#E1E4E8;">:::</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">:::=tabs=ab</span></span>
<span class="line"><span style="color:#24292E;">::a</span></span>
<span class="line"><span style="color:#24292E;">a content</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">::b</span></span>
<span class="line"><span style="color:#24292E;">b content</span></span>
<span class="line"><span style="color:#24292E;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">:::=tabs=ab</span></span>
<span class="line"><span style="color:#24292E;">::a</span></span>
<span class="line"><span style="color:#24292E;">a content 2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">::b</span></span>
<span class="line"><span style="color:#24292E;">b content 2</span></span>
<span class="line"><span style="color:#24292E;">:::</span></span></code></pre></div>`,4),A=a("p",null,"a content",-1),C=a("p",null,"b content",-1),v=a("p",null,"a content 2",-1),f=a("p",null,"b content 2",-1),T=e(`<p>不需要也可以关闭</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// .vitepress/blog-theme.ts</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">blogTheme</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getThemeConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  tabs: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// .vitepress/blog-theme.ts</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">blogTheme</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getThemeConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  tabs: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="mermaid-图表" tabindex="-1">Mermaid - 图表 <a class="header-anchor" href="#mermaid-图表" aria-label="Permalink to &quot;Mermaid - 图表&quot;">​</a></h2><ul><li>Type: <code>boolean</code>|<code>object</code></li></ul><blockquote><p>通过解析类 Markdown 的文本语法来实现图表的创建和动态修改。</p></blockquote><div class="tip custom-block"><p class="custom-block-title">一点说明</p><p>基于 <a href="https://github.com/emersonbottero/vitepress-plugin-mermaid" target="_blank" rel="noreferrer">vitepress-plugin-mermaid</a> 实现</p></div><p>简单语法如下，详细流程图语法见 <a href="https://github.com/mermaid-js/mermaid/blob/develop/README.zh-CN.md" target="_blank" rel="noreferrer">Mermaid 中文文档</a></p><pre>\`\`\`mermaid
flowchart TD
  Start --&gt; Stop
\`\`\`
</pre><p>效果如下</p>`,9),k=e(`<p><strong>默认开启</strong>，可以通过<code>mermaid</code>进行进一步配置，或关闭</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-EiT9E" id="tab-l18Jjjb" checked="checked"><label for="tab-l18Jjjb">① 关闭</label><input type="radio" name="group-EiT9E" id="tab-3se8psT"><label for="tab-3se8psT">② 进一步配置</label></div><div class="blocks"><div class="language-ts vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">blogTheme</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getThemeConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  mermaid: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">blogTheme</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getThemeConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  mermaid: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">blogTheme</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getThemeConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  mermaid: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">blogTheme</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getThemeConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  mermaid: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div></div></div><p>下面看一下官方其它案例</p><p><strong>时序图</strong></p>`,4),F=a("p",null,[a("strong",null,"甘特图")],-1);function S(P,D,B,J,V,N){const p=i("PluginTabs"),o=i("Mermaid");return l(),E("div",null,[b,n(p,{tabLabels:["tab1","tab2"]},{tab1:s(()=>[h,m,g]),tab2:s(()=>[_]),_:1}),u,n(p,{tabLabels:["a","b"],sharedStateKey:"ab"},{a:s(()=>[A]),b:s(()=>[C]),_:1}),n(p,{tabLabels:["a","b"],sharedStateKey:"ab"},{a:s(()=>[v]),b:s(()=>[f]),_:1}),T,(l(),t(r,null,{default:s(()=>[n(o,{id:"mermaid-66",graph:"flowchart%20TD%0A%20%20Start%20--%3E%20Stop%0A"})]),fallback:s(()=>[c(" Loading... ")]),_:1})),k,(l(),t(r,null,{default:s(()=>[n(o,{id:"mermaid-80",graph:"sequenceDiagram%0AAlice-%3E%3EJohn%3A%20Hello%20John%2C%20how%20are%20you%3F%0Aloop%20Healthcheck%0A%20%20%20%20John-%3E%3EJohn%3A%20Fight%20against%20hypochondria%0Aend%0ANote%20right%20of%20John%3A%20Rational%20thoughts!%0AJohn--%3E%3EAlice%3A%20Great!%0AJohn-%3E%3EBob%3A%20How%20about%20you%3F%0ABob--%3E%3EJohn%3A%20Jolly%20good!%0A"})]),fallback:s(()=>[c(" Loading... ")]),_:1})),F,(l(),t(r,null,{default:s(()=>[n(o,{id:"mermaid-84",graph:"gantt%0A%20%20%20%20section%20Section%0A%20%20%20%20Completed%20%3Adone%2C%20%20%20%20des1%2C%202014-01-06%2C2014-01-08%0A%20%20%20%20Active%20%20%20%20%20%20%20%20%3Aactive%2C%20%20des2%2C%202014-01-07%2C%203d%0A%20%20%20%20Parallel%201%20%20%20%3A%20%20%20%20%20%20%20%20%20des3%2C%20after%20des1%2C%201d%0A%20%20%20%20Parallel%202%20%20%20%3A%20%20%20%20%20%20%20%20%20des4%2C%20after%20des1%2C%201d%0A%20%20%20%20Parallel%203%20%20%20%3A%20%20%20%20%20%20%20%20%20des5%2C%20after%20des3%2C%201d%0A%20%20%20%20Parallel%204%20%20%20%3A%20%20%20%20%20%20%20%20%20des6%2C%20after%20des4%2C%201d%0A"})]),fallback:s(()=>[c(" Loading... ")]),_:1}))])}const j=d(y,[["render",S]]);export{I as __pageData,j as default};
