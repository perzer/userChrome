// ==UserScript==
// @name        wikiRedirectZHCN
// @namespace   wikiRedirectZHCN
// @description redirect to zh-CN pages
// @include     http://zh.wikipedia.org/zh/*
// @include     http://zh.wikipedia.org/wiki/*
// @version     1
// @grant       GM_setValue
// ==/UserScript==
var url = window.location.href;
if (url.contains('zh/')) {
  window.location.href = url.replace(/zh\//, 'zh-cn/');
} else if (url.contains('wiki/')) {
  window.location.href = url.replace(/wiki\//, 'zh-cn/');
}
