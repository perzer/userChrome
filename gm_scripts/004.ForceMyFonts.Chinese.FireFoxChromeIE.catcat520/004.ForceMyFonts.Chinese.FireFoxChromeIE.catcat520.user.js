﻿// ==UserScript==
// @name          004.ForceMyFonts.Chinese.FireFoxChromeIE.catcat520
// @namespace     http://userstyles.org
// @description	  功能简介：自定义字体，英文Tahoma，中文雅黑。修正乱码，网页错位
// @author        catcat520
// @homepage      https://userstyles.org/styles/100473
// @run-at        document-start
// @version       0.20150418025352
// ==/UserScript==
(function() {var css = "";
if (false || (new RegExp("^(^https?://.*CodeMirror.*|(?!telnet://|(.CodeMirror)|^https?://(www.youziku.com|typekit.com|fontdeck.com|designgala.com|127.0.0.1|bbs.kafan.cn/thread-1700312-1-1.html|bbs.kafan.cn/forum.php\\?mod=viewthread&tid=1700312)).)*$")).test(document.location.href))
	css += [
		"/* 非火狐浏览器，使用时要删除这行代码 */",
		"",
		"/* main(diyfont) */*:not([class*=\"ico\"]):not(i){font-family: ",
		"/* main(sysfont) */\"Microsoft YaHei UI\",\"Microsoft YaHei\",\"Catcat520.Lite.Latin\",\"在这填写\",\"Source Code Pro\",\"Inconsolata-g\",\"Inconsolata\",\"Segoe UI\",\"Tahoma\",\"Menlo\",\"Monaco\",\"在这填写\",\"Microsoft YaHei UI\",\"Microsoft YaHei\",\"Microsoft YaHei UI\",\"Microsoft YaHei\",\"Microsoft JhengHei UI\",\"Microsoft JhengHei\",\"SimSun\",\"fp-font\",",
		"/* main(webfont) */\"AccessibilityFoundicons\",\"Accessibility Foundicons\",\"brandico\",\"Brandico\",\"brankic1979\",\"Brankic1979\",\"brankic 1979\",\"Brankic 1979\",\"broccolidry\",\"Broccolidry\",\"CONDENSEicon\",\"cuticons\",\"Cuticons\",\"dashicons\",\"Dot Com\",\"ecoico\",\"Ecoico\",\"EightiesShades\",\"ElegantIcons\",\"elusive\",\"Elusive\",\"Elusive-Icons\",\"entypo\",\"Entypo\",\"Entypo Social\",\"Entypo-Social\",\"Erler Dingbats\",\"et-line\",\"Et-line\",\"fontawesome\",\"FontAwesome\",\"fontelico\",\"Fontelico\",\"fontello\",\"Fontello\",\"GeneralEnclosedFoundicons\",\"General Enclosed Foundicons\",\"GeneralFoundicons\",\"General Foundicons\",\"Gibson\",\"Gibson Light\",\"gibson_lightbold\",\"Gibson_lightbold\",\"gibson_lightitalic\",\"Gibson_lightitalic\",\"gibsonregular\",\"Gibsonregular\",\"Glyphicons Halflings\",\"GLYPHICONS Halflings\",\"Heydings Controls\",\"Heydings Icons\",\"iconminia\",\"Iconminia\",",
		"/* main(webfont) */\"iconvault\",\"Iconvault\",\"icomoon\",\"Icomoon\",\"iconic\",\"Iconic\",\"icons\",\"Icons\",\"Just Vector\",\"JustVector\",\"JustVectorRegular\",\"linecons\",\"Linecons\",\"LondonMM\",\"londonmmregular\",\"Londonmmregular\",\"mainicon\",\"maki\",\"Maki\",\"Mainicon\",\"Material-Design-Icons\",\"meteocons\",\"Meteocons\",\"MeteoconsRegular\",\"mfglabs\",\"Mfglabs\",\"MFG Labs Iconset\",\"mfg_labs_iconsetregular\",\"Mfg_labs_iconsetregular\",\"modernpics\",\"Modernpics\",\"Modern Pictograms\",\"OpenWeb Icons\",\"PulsarJS\",\"RaphaelIcons\",\"rondo\",\"Rondo\",\"silkcons\",\"Silkcons\",\"SocialFoundicons\",\"Social Foundicons\",\"Socialico\",\"Socialico Plus\",\"Social Networking Icons\",\"Sosa\",\"Symbol Signs\",\"Symbol Signs Basis set\",\"typicons\",\"Typicons\",\"weathercons\",\"Weathercons\",\"websymbols\",\"Websymbols\",\"Web Symbols\",\"Web Symbols Liga\",\"wpzoom\",\"Wpzoom\",\"zocial\",\"Zocial\",",
		"/* main(sysfont) */\"Segoe UI Symbol\",\"Symbola\",\"Meiryo\",\"Malgun Gothic\",\"NSimSun\",\"Nimbus Roman No9 L\",\"WenQuanYi Micro Hei\",\"WenQuanYi Zen Hei\",\"Hiragino Sans GB\",\"FZSongS\",\"方正宋体S-超大字符集\",\"Arial Unicode MS\",\"Unifont\",\"Symbol\"  !important;}",
		"",
		"/* VerCtrl */.comeing_twosublist>li>a[href*=thread-1681393-1-1]:after{background: #CBDDE3;color: black;content: \" Now(2015.04.18 | 10:51)\"  !important;}",
		"/* stylish edit box Orion */#clientDiv>DIV , #clientDiv>DIV>SPAN , .rulerLines.odd , .rulerLines.even{font-family: \"Source Code Pro\",\"Consolas\",\"Menlo\",\"Monaco\",\"DejaVu Sans Mono\",\"Liberation Mono\",\"Nimbus Roman No9 L\",\"Times New Roman\",\"Courier New\",\"Microsoft JhengHei UI\",\"Microsoft JhengHei\",\"Microsoft YaHei UI\",\"Microsoft YaHei\",\"SimHei\",\"SimSun\",\"KaiTi\",\"WenQuanYi Micro Hei Mono\",\"WenQuanYi Zen Hei Mono\",\"Hiragino Sans GB\"  !important;font-size:14px  !important;line-height:15pt  !important;}",
		"/* taobao.com */dl>dt>span.lala , .iconfont>em , p.font-face , a.new-todo-item , a.setting-item , a.calender-book-item , span.prev-btn , span.next-btn{font-family: \"shop-iconfont\",\"global-iconfont\",\"mticonfont\",\"marketicon\"  !important;}",
		"/* ju.taobao.com */DIV.price-block.clearfix>SPAN.price>SPAN.i , .ju-groupbar>.backtop>a:nth-child(n) , .mod-filter>.search>form:nth-child(n)>button:nth-child(n) , .cat-menu-h>p.ju-icon-juhuasuan>a:nth-child(n) , tbody>tr.h2:nth-child(n)>td:nth-child(n)>p:nth-child(n) , .feedback>.J_feedback>span:nth-child(n) , .ju-groupbar>.mbclientli>a.mbclient , h1.logo>.ju-logo>div[class^=\"ju-icon-\"]{font-family: \"ju-font\"  !important;}",
		"/* ai.taobao.com *//* L */DIV.con-wrap.clearfix>DIV.quick-links.clearfix>a[class*=\"atbfont\"] , DIV.con-wrap.clearfix>DIV.ai-logo>A.logo.atbfont{font-family: atbfont10  !important;}",
		"/* itercast.com */span.fui-logo-text{font-family: \"IterCast-Icon\"  !important;}",
		"/* github.com */span.diffstat-bar , span.diff-added{font-family: \"octicons\"  !important;}",
		"/* html5test.com */.pointsPanel h2>span , .pointsPanel h2>strong , #indexbutton , #loading>div{font-family: \"League Gothic\",\"html5test\"  !important;}",
		"/* 2345.com *//* L */.these_col_1>.tool_ul>li>a>ins , DIV.module_t>span>a>ins , DIV.module_t>a>ins , .category_in>div.panel:nth-child(n)>p>ins>a , #rightToolBox>dd>ins>a , .cnxh_hd>#J_gul_cata>a>ins{font-family: \"2345\"  !important;}",
		"/* 2345.com *//* D */#content>#left>.kzjx h2 a{margin: 0px 7.5px  !important;}",
		"/* sports.163.com/nba *//* CD */span.nba_matchnav_score , .pbody{font-family: \"System\",\"SimSun\"  !important;margin: 1px auto  !important;}",
		"/* w3cplus.com */#go_top{font-family: \"w3cplus\"  !important;}",
		"/* designgala.com */DIV.textwidget>.social>li>a{font-family: \"JustVectorRegular\"  !important;}",
		"/* etao.com */.s-btn-container>input{font-family: \"globalheader\"  !important;}",
		"/* alimama.com */LI.menu>DIV.menu-hd>EM.top-nav-down , a.data-send , i.current , .item-second>i , span.dialog-ext-close-x , #mxevt-0>i , #mxevt-1>i , .item-first>i{font-family: \"uxiconfont\"  !important;}",
		"/* abort *//* laverna.cc #wmd-bold-button > span,#wmd-italic-button > span,#wmd-link-button > span,#wmd-quote-button > span,#wmd-code-button > span,#wmd-image-button > span,#wmd-olist-button > span,#wmd-ulist-button > span,#wmd-heading-button > span,#wmd-hr-button > span,#wmd-undo-button > span,#wmd-redo-button > span{font-family: \"fontello\"  !important;} */",
		"/* 3c/chaoshi.tmall.com */.tm-focus-banner>dd>.logoIcon , .tab-pannel-combos>.tab-nav-groups>.trigger-prev , .tab-pannel-combos>.tab-nav-groups>.trigger-next , .tm-pay-box>.tm-pay>#J_Toggler , .tm-shopPromo-panel>a.more>s , .gray>h3>s , a:nth-child(n)>div:nth-child(n)>button:nth-child(n) , .tm-chaoshi-slide .trigger-next , .tm-chaoshi-slide .trigger-prev , li>a>s:nth-child(n) , li.j_Li>h3>s , a.mui-mbarp-prof-priv , .c-page span , .c3-item-shrh>ins , span.zoomIcon , div.mui-mbar-tab-logo.mui-mbar-tab-logo-qrcode , span.phone , span.arrow , .c>span , .row3 .row-title .c-slogo span , ins.c-rmb , .c-pairprice ins , li.tb-serPromise-item>a>s , .c3-item-sfby>ins , .c3-item-wythh>ins , .c3-item-qglb>ins{font-family: \"iconfont-detail\",\"tmall3c\",\"iconfont_qr\",\"iconfont\",\"mbar-font\",\"iconfont-chaoshi\",\"tm-detail-font\"  !important;}",
		"/* detail.tmall.com */P.qus>a>SPAN.mui-act-top-text.mui-act-font , div.J_ComboDialog>div.body>div.title>b , .tb-booth>.tm-video-stop>b , .tb-booth>.tm-video-stop>s , DIV.hd>a.more.unmore>s , .tm-shopPromotion-title>a.more>s , .tb-amount-widget>.mui-amount-btn>SPAN[class^=\"mui-amount-\"] , #J_TabBar>.tm-shop-list>.tm-shop-list-new{font-family: \"tm-detail-font\",\"mui-act-font\"  !important;}",
		"/* detail.tmall.com_VipFont */DIV.mui-mbarp-prof-list>A.mui-mbarp-prof-term.mui-mbarp-prof-term-enable>DIV.mui-mbarp-prof-symbol{font-family: \"vip-mob-font\"  !important;}",
		"/* godaddy.com */li>a>.caret:before , div>div>.close:before{font-family: \"uxfont\",\"whoisyourdaddy\"  !important;}",
		"/* dragonporn.ldblog.jp */span.omatome-icnfont-button>span>.omatome-icn-hatena , span.omatome-icnfont-button>span>span.omatome-icn-facebook , span.omatome-icnfont-button>span>span.omatome-icn-twitter{font-family: \"omatome_ico\"  !important;}",
		"/* wenku.baidu.com */p[class^=\"reader-word-\"]{font-family: \"Corbel\",\"Gabriola\",\"Times New Roman Italic\",\"Times New Roman\",\"91c5a3bbfd0a79563c1e72030080001\",\"Nimbus Roman No9 L\",\"SimHei\",\"SimSun\",\"NSimSun\",\"Symbol\",\"Microsoft JhengHei UI\",\"Microsoft JhengHei\",\"Microsoft YaHei UI\",\"Microsoft YaHei\",\"WenQuanYi Micro Hei Mono\",\"WenQuanYi Zen Hei Mono\",\"Hiragino Sans GB\"  !important;letter-spacing:-4px  !important;}",
		"/* abort Markdown *//* maxiang.info/dillinger.io/zybuluo.com/stackedit.io/mahua.jser.me/github.com div[class^=ace_]>div>*>span[class^=ace_]{font-family: \"Inconsolata-g\",\"Inconsolata\",\"SimHei\",\"KaiTi\",\"SimSun\"  !important;} */",
		"/* acgdb.com */#top #top-options>label , .mediaviewer-inset>.wrapper>.close:before , .mediaviewer>.wrapper>.body .panel .share , .mediaviewer-overlay>.wrapper>.body .nav a , .form-login>div p a[acgdb-tip=\"新浪微博\"] , .form-login>div p a[acgdb-tip=\"腾讯微博\"] , .slideshow2>.wrap>label span em , #quickfacts> .nav a span , #acgdb-picviewer>.top>.switches label{font-family: \"acgdb\"  !important;}",
		"/* firefox.net.cn *//* S */.wrap>.main_wrap>.bread_crumb , .main_wrap>.forum_page>.bbs_info_box{padding: 62px 1px 10px 20px  !important;}",
		"/* firefox.net.cn *//* S */body>.wrap>.search_type_wrap>.search_type{padding: 62px 0px 20px 170px  !important;}",
		"/* entypo.com */div.content>#logo>#front , div.content>#logo>#back{font-family: \"entypo-logo\"  !important;}",
		"/* caipiao.sohu.com */div.sgcp_a_d#sgcp_a_d , div.sgcp_a_d_mask#sgcp_a_d_mask{display: none  !important;}",
		"/* sf-express.com */ul>li>span[class^=sfi] , div>li>span[class^=sfi] , div>span>span[class^=sfi] , h4>a>span[class^=sfi] , .bill-number>.go-waybill-by-phone-num>span[class^=sfi] , li>a>span[class^=sfi]{font-family: \"sf-express-icon\"  !important;}",
		"/* baidu.com *//* Y */HTML>BODY>#_mask[style^=\"opacity\"]{display: none  !important;}",
		"/* read.qidian.com *//* D */#qd_reader_header>.page_set>.gg_box{display: none  !important;}",
		"/* google.com *//* Y */#cnt>div.mw>#flyr{display: none  !important;}",
		"/* dzh.mop.com *//* D */body>.topbar>.m-topbar-wrapper{border-bottom: 2px dashed #D0D0D0  !important;}",
		"/* dzh.mop.com *//* Y */.main>.p20>.dzh-indexNotice.mb15{display: none  !important;}",
		"/* dzh.mop.com *//* Y */div>.main .p20{padding: 0px 20px 0px 20px  !important;}",
		"/* s.taobao.com *//* D */.grid-view .item .g_price{letter-spacing: normal  !important;}",
		"/* duckduckgo.com *//* L */.search-wrap--home>#search_form_homepage>#search_button_homepage , .header__content>#search_form>#search_form_input_clear , .search-wrap--home>#search_form_homepage>#search_form_input_clear , .region-indicator-wrap>.region-indicator>span.region-indicator__icn , .header__content>#search_form>#search_button , #header_wrapper>.header--aside>.header__button--menu , div.zci__metabar>span.zci__metabar__mode-wrap>a.zci__metabar__mode{font-family: \"ddg-serp-icons\",\"DDG_ProximaNova\"  !important;}",
		"/* tudou.com *//* DS */.con_player>.player_container>#player{height: inherit  !important;}",
		"/* tudou.com *//* L */div[class*=Slide]>.btn>b{font-family: \"tuiicon\"  !important;}",
		"/* wordpress.com *//* Y */.format-standard>.content>p , #maincontent_inner>.format-standard>.post-info , #wrapper>#content>#title , #maincontent>#maincontent_inner>.post{margin: inherit  !important;}",
		"/* wordpress.com *//* Y */#maincontent_inner>div>.post-meta{padding: inherit  !important;}",
		"/* wordpress.com *//* Y */#header>#header_inner>.nav , #header>#header_inner>#search-form{top: 2px  !important;}",
		"/* wordpress.com *//* Y */.content-sidebar>#wrapper>#header{height: 33px  !important;}",
		"/* wordpress.com *//* Y */.content-sidebar>#wrapper>#content{max-width: none  !important;}",
		"/* wordpress.com *//* Y */#maincontent_inner>.format-standard>.sep{height: 3.5px  !important;}",
		"/* weibo.com *//* L */div>.W_swficon>em[class^=spac]{font-family: \"WBswficon\"  !important;}",
		"/* 17173.com *//* SY */BODY.trend>.wrapper>#content{padding-top: initial  !important;}",
		"/* 17173.com *//* SY */#center>.center-con>#flashBox{margin-top: initial  !important;}",
		"/* 17173.com *//* SY */#playRight>#rightTalk>.right-adimg{height: 0px !important;border-style: none !important;}",
		"/* ele.me *//* L */#mod_fixed>A.btn-site-feedback>SPAN.glyph-feedback.glyph , DIV.rst-d-act.act_btns>A.rst-d-act-add.add_btn>span.rst-d-act-glyph{font-family: \"eleme\"  !important;}",
		"/* pexetothemes.com *//* L */#footer>.scroll-to-top>span:nth-child(n) , DIV.section-boxed>.testimonial-slider>DIV[class^=\"ts-arrow\"] , .portfolio-carousel>.pc-wrapper>DIV[class^=\"pc-\"] , DIV.content-slider-wrapper>DIV[class^=\"content-slider\"]>DIV[class^=\"cs-arrows\"]{font-family: \"PexetoArrows\"  !important;}",
		"/* cart.taobao.com *//* L */@font-face{font-family: \"FireFox-SpecFix-taobao.com\";src: url(\"http://at.alicdn.com/t/font_1404888168_2057645.woff\");}/* 非火狐浏览器，使用时要删除这行代码 */",
		"/* cart.taobao.com *//* L */.J_Tmsg_Basic>.J_Tmsg_Logo>.J_Tmsg_Logo_Icon , .menu-hd>SPAN.arrow-icon-wrapper>SPAN.g-icon.arrow-icon , .menu-hd>a[target=\"_top\"]>SPAN.g-icon{font-family: \"FireFox-SpecFix-taobao.com\"  !important;}/* 非火狐浏览器，使用时要删除这行代码 */",
		"/* lengxiaohua.cn *//* D */#layMain>#contentTop>.articleTab{float: inherit  !important;}",
		"/* zybuluo.com *//* D */#preview-button-bar>#preview-button-row>.dropdown{margin-right: auto  !important;}",
		"/* deviantart.com *//* L */tr>#oh-menu-friends>#friendslink , tr>#oh-menu-collect>#collectlink{font-family: \"feedfont\"  !important;}",
		"/* jr.ifeng.com *//* Y */#indexBanner>.quick_login>.index_login>p{text-align: left  !important;}",
		"/* jr.ifeng.com *//* Y */#indexBanner>.quick_login>.index_login>p>a{font-weight: bold  !important;color: yellow  !important;}",
		"/* jr.ifeng.com *//* Y */.wrap>#indexBanner>.quick_login>.index_login{right: 68px  !important;}",
		"/* jr.ifeng.com *//* Y */DIV.pull-right>ul>li.login-status>a[href*=login] , DIV.pull-right>ul>li>a[href*=register]{font-weight: bold  !important;background: yellow  !important;}",
		"/* jr.ifeng.com *//* Y */div.header>div.header-bar>div.container>div.pull-right{margin-right: 33%  !important;}",
		"/* jr.ifeng.com *//* Y */.containerWrap>DIV.container>.p2p-navbar{margin-right: 15%  !important;}",
		"/* jr.ifeng.com *//* Y */.financing-list-wrapper>.breadcrumbs>.pull-right {margin-right: 58%  !important;}",
		"/* jr.ifeng.com *//* Y */.financing-list>DIV.container>.financing-list-wrapper{margin-left: 1%  !important;}",
		"/* jr.ifeng.com *//* Y */HTML.mq-xs.mq-sm.mq-md.mq-lg.mq-gfb>BODY#page-financing>DIV#dialog-1.dialog{margin-top: -6%  !important;}",
		"/* jr.ifeng.com *//* Y */DIV.container>.account-balance>a[href*=login]{margin-right: 16%  !important;}",
		"/* jr.ifeng.com *//* Y */.wrap>.financing-steps>DIV.container{padding: 0px 0px  !important;}",
		"/* jr.ifeng.com *//* Y */HTML.mq-xs.mq-sm.mq-md.mq-lg.mq-gfb>#page-financing>#fixed-tool-box , HTML.mq-xs.mq-sm.mq-md.mq-lg.mq-gfb>#page-index>#fixed-tool-box{top: 35%  !important;right: 88px  !important;}",
		"/* jr.ifeng.com *//* Y */UL.nav.navbar-nav>li>a[href*=\"18.ifeng.com\"]>em{display: none  !important;}",
		"/* jr.ifeng.com *//* Y */tr>TD.text>A#unamelink:before{content: \"\\6295\\8d44\\4eba\\3010 \"  !important;}",
		"/* jr.ifeng.com *//* Y */tr>TD.text>A#unamelink:after{content: \"\\3011\\6b63\\5728\\54a8\\8be2\\ff1a\"  !important;}",
		"/* jr.ifeng.com *//* Y */tr>td>div#typingdiv:before{content: \"\\51e4\\51f0\\91d1\\878d\\5ba2\\670d\\ff1a\"  !important;}",
		"/* jr.ifeng.com *//* Y */tr>td>div#typingdiv{font-size: inherit  !important;}",
		"/* jr.ifeng.com *//* Y */td>a>IMG.tplimage{display: none  !important;}",
		"/* jr.ifeng.com *//* Y */td.bgrn>table>tbody>tr>td[align=\"center\"]{text-align: left  !important;}",
		"/* jr.ifeng.com *//* Y */div[style*=\"overflow\"]>div[style*=\"border\"]>SPAN.nagent:before{font-size:150%;color:Red;content: \"\\2658\"  !important;}",
		"/* jr.ifeng.com *//* Y */div[style*=\"overflow\"]>div[style*=\"border\"]>SPAN.nuser:before{font-size:150%;color:orange;content: \"\\265b\"  !important;}",
		"/* jr.ifeng.com *//* Y */.message span.nagent{color: green  !important;}",
		"/* hao123/2345/sogou:split *//* C */li#nlhv_cp_li>DIV.memu>SPAN.l , DIV.g_clr.baritem>DIV.category>SPAN.split , #rightToolBox>dd>SPAN.split{font-family: \"Arial\" , \"Helvetica\"  !important;}",
		"/* taobao:space *//* C */DIV.side.service-side>DIV.tb-service>.service-bd>dd{font-family: \"Arial\" , \"Helvetica\"  !important;}",
		"/* skycitizen.net *//* L */div._chat>div>a.chat-btn{font-family: \"Material-Design-Icons\"  !important;}",
		"/* wooyun.org *//* D */#bugDetail>.content>fieldset.fieldset>pre{white-space: pre-wrap  !important;word-wrap: break-word  !important;}",
		"/* wooyun.org *//* Y */div.rightItem>.remindInfo>a , .infoContent > ul>LI[id*=remind].read>a{color:green  !important;}",
		"/* wooyun.org *//* Y */div.rightItem>.remindInfo>a>span , .infoContent>ul>LI[id*=remind]>a{color:red  !important;}",
		"/* wooyun.org *//* Y */.infoContent>ul>LI[id*=remind].read , .infoContent>ul>LI[id*=remind].read>span{color:gray  !important;}",
		"",
		"/* 扩展 *//* 启用便携字体 */",
		"",
		"/* 范围：*/"
	].join("\n");
css += [
		"/* 非火狐浏览器，使用时要删除这行代码 */",
		"",
		"/* stylish edit box CodeMirror */.CodeMirror-scroll{font-family: \"Source Code Pro\",\"Consolas\",\"Menlo\",\"Monaco\",\"DejaVu Sans Mono\",\"Liberation Mono\",\"Nimbus Roman No9 L\",\"Times New Roman\",\"Courier New\",\"Microsoft JhengHei UI\",\"Microsoft JhengHei\",\"Microsoft YaHei UI\",\"Microsoft YaHei\",\"SimHei\",\"SimSun\",\"KaiTi\",\"WenQuanYi Micro Hei Mono\",\"WenQuanYi Zen Hei Mono\",\"Hiragino Sans GB\"  !important;font-size:14px  !important;line-height:15pt  !important;}",
		"/* 扩展 *//*::-moz-selection{background: #3399FF  !important;color: #FFFFFF  !important;}/* 自定义鼠标选中字体颜色 */",
		"/* 扩展 *//**{text-shadow: 0.02em 0.02em 0.05em #999999  !important;}/* 自定义字体阴影特效 */",
		"",
		"/* 以下为说明，无需复制 */",
		"/* 0123456789 *//* abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ *//* `~!@#$%^&*()-=_+[]\\{}|;\':\",./<>? */",
		"/*",
		"01.常见字体集",
		"有衬：serif",
		"无衬：sans-serif",
		"等宽：monospace",
		"简体：Microsoft YaHei/SimSun/NSimSun/FZSongS/方正宋体S-超大字符集/宋体-方正超大字符集/Hiragino Sans GB/WenQuanYi Zen Hei/WenQuanYi Zen Hei Mono/WenQuanYi Micro Hei/WenQuanYi Micro Hei Mono/仿宋_GB2312/楷体_GB2312/SimHei/FangSong/KaiTi/Droid Sans Fallback/Microsoft Himalaya/Microsoft Yi Baiti/浪漫雅圆/XHei-5th",
		"繁体：Microsoft JhengHei/XinGothic/XinGothic CiticPress/XinGothic-Pleco W7/XinGothic-Pleco W4/XinGothic-ZhangYue W6/XinGothic-ZhangYue W4/XinGothic-TC W5/MingLiU/PMingLiU/DFKai-SB",
		"日文：Meiryo/MS Gothic/MS PGothic/MS Mincho/MS PMincho",
		"韩文：Malgun Gothic/Batang/BatangChe/Dotum/DotumChe/Gulim/GulimChe/Gungsuh/GungsuhChe",
		"英文：Arial/Bitstream Vera Sans/Bitstream Vera Serif/Calibri/Cambria/Candara/Comic Sans MS/Consolas/Constantia/Corbel/Courier New/DejaVu Sans/DejaVu Serif/Dosis/Droid Sans/Droid Sans Mono/Droid Serif/Franklin Gothic/Gabriola/Georgia/Helvetica/Helvetica CY/Helvetica Neue/Helvetica Neue LT Std/Impact/Liberation Sans/Liberation Serif/Lucida Console/Lucida Sans Typewriter/Lucida Sans Typewriter Std/Lucida Sans Unicode/Microsoft Sans Serif/Myriad Pro/Nimbus Mono L/Nimbus Sans L/Nimbus Roman No9 L/Palatino Linotype/Segoe Print/Segoe Script/Segoe UI/Sitka Banner/Sitka Display/Sitka Heading/Sitka Small/Sitka Subheading/Sitka Text/Source Sans Pro/Tahoma/Times New Roman/Trebuchet MS/Ubuntu/Verdana",
		"符号：Arial Unicode MS/Segoe UI Symbol/Symbol/Symbola/Unifont",
		"编程：Andale Mono/Anonymous Pro/Bitstream Vera Sans Mono/Consolas/DejaVu Sans Mono/Envy Code R/Fixedsys Excelsior 3.01/FixedsysTTF Monospaced/Inconsolata/Liberation Mono/Menlo/Monaco/Monofur/PragmataPro/ProFontWindows/Source Code Pro/Terminus (TTF)/Ubuntu Mono",
		"网络：AccessibilityFoundicons/Accessibility Foundicons/brandico/Brandico/brankic1979/Brankic1979/brankic 1979/Brankic 1979/broccolidry/Broccolidry/CONDENSEicon/cuticons/Cuticons/Dot Com/ecoico/Ecoico/EightiesShades/ElegantIcons/elusive/Elusive/Elusive-Icons/entypo/Entypo/Entypo Social/Entypo-Social/Erler Dingbats/et-line/Et-line/fontawesome/FontAwesome/fontelico/Fontelico/fontello/Fontello/GeneralEnclosedFoundicons/General Enclosed Foundicons/GeneralFoundicons/General Foundicons/Gibson/Gibson Light/gibson_lightbold/Gibson_lightbold/gibson_lightitalic/Gibson_lightitalic/gibsonregular/Gibsonregular/Glyphicons Halflings/GLYPHICONS Halflings/Heydings Controls/Heydings Icons/iconminia/Iconminia",
		"网络：iconvault/Iconvault/icomoon/Icomoon/iconic/Iconic/icons/Icons/Just Vector/JustVector/JustVectorRegular/linecons/Linecons/LondonMM/londonmmregular/Londonmmregular/mainicon/maki/Maki/Mainicon/meteocons/Meteocons/MeteoconsRegular/mfglabs/Mfglabs/MFG Labs Iconset/mfg_labs_iconsetregular/Mfg_labs_iconsetregular/modernpics/Modernpics/Modern Pictograms/OpenWeb Icons/PulsarJS/RaphaelIcons/rondo/Rondo/silkcons/Silkcons/SocialFoundicons/Social Foundicons/Socialico/Socialico Plus/Social Networking Icons/Sosa/Symbol Signs/Symbol Signs Basis set/typicons/Typicons/weathercons/Weathercons/websymbols/Websymbols/Web Symbols/Web Symbols Liga/wpzoom/Wpzoom/zocial/Zocial",
		"02.绕过 about:config -> gfx.direct2d.disabled;true 替换火狐设置中不显示的字体",
		"@font-face {",
		"    font-family: \"Source Sans Pro\";",
		"    src: local(\"Source Sans Pro Semibold\");",
		"           }",
		"*/"
	].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
