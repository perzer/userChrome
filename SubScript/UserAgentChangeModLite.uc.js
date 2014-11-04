// ==UserScript==
// @name UserAgentChangeModLite.uc.js
// @namespace http://www.sephiroth-j.de/mozilla/
// @charset     utf-8
// @note  modify by lastdream2013 at 20130616 mino fix
// @note  modify by lastdream2013 at 20130409 sitelist : change SITELIST idx to Name
// @note  modify by lastdream2013 for navigator.userAgent https://g.mozest.com/thread-43428-1-2
// @include chrome://browser/content/browser.xul
// ==/UserScript==
var ucjs_UAChanger = {

	DISPLAY_TYPE : 1, // 0显示列表为radiobox, 1显示为ua图标列表

	//（1）在url后面添加网站，注意用正则表达式
	SITE_LIST : [

		// 在 http://www.google.co.jp/m 伪装成日本DoCoMo手机
		{
			url : "http://www\\.google\\.co\\.jp/m/",
			Name : "iPhone"
		}, //此处添加你需要的useragent的名称
		{
			url : "https?://www\\.icbc\\.com\\.cn/",
			Name : "Firefox10.0"
		}, {
			url : "https?://(?:mybank1?|b2c1)\\.icbc\\.com\\.cn/",
			Name : "Firefox10.0"
		},{
			url : "http://vod\\.kankan\\.com/",
			Name : "Safari - Mac"
		}, //直接可以看kankan视频，无需高清组件
        {
		    url : "http:\/\/wap\.*",
			Name : "UCBrowser"
		}, //WAP用UC浏览器
        {
		    url : "http:\/\/browser\.qq\.com\/*",
		    Name : "Chrome - Win7"
		}, //使用Chrome，看QQ游览器官网特效
		
		
		
		//添加网站到此结束
	],

	//现有版本firefox的图标
	NOW_UA_IMG : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADfklEQVQ4jW2TfUzUBRzGH+6444477o1TkXfZUUwJLwh72a6Dxk2wkBcPUSBAl6Ye0Cx0iIkk1AGyapO1AmbQKF+CTGm5DAySKOXFwIQJpkecTd2wabyk/O6e/sgaq56/vn88z3fPH88H+K9ksuDYHFNhdUvB+229+1q+7Ml9t+mw78r4dAAeDz0eC24AgAQA4OmfsMRSfqmwf5bfkXSQnCA5TrJ2dIqpJTW9oaERcQtyfz0pMeleKokPPymPKniQVNbDpqoyV1dHq9A188DV/ducq31qVrCP33Vv+aSPnZ01LE+PPgpACUAEAGiIlX18Z+si9m6PEPqyw1xfrQ9n9S03j98n2+/Ns+raXeZ+46Tp4EVXZ2epMDuQx33WiOZ/apy2+vQ6MxXCaLJMGLUqeM4awPN7k9l65G2+cUPgfscMbaMzXPXhJAtqKsixNMHRseb+smWyEDy/wmv17XwVh+K83AMJSv6Yqqaj6BFert1E28FmZnRPM/WzCZoarjCs+GsaN9p5+4yFdCQyw6y24FCar/3GejX7ExTCcJqGgxv86Nhv5Lrazxl5+BbjG0e4vKiNIVkfUJlUx11lO3nvbLzrj/Nm2hODmlBn0dRdW6viUJpa6FqtYUuwiKaUPdS/1sOA0gvU7e6nPr+V/omVhLGcFRXZ5FiscP1kDF9NMZxG7Uqv6svxSg5l+gpnzQr+8AR49BULn7W9x6wdZWy0b2PS7noqn3qdkuVF/OitOLq/jRB+bwvigY0KO56W45nuSBkvvKB1j+RoOWH15HCylMNZGjo3y/hpbhTjcioJQynDjcmcPhLA6WNL3DcPSOeilyIGACR1es+fvnhU5h7coBeublvM0U2+3BMTQUNYNuFfSujyqAvM5CHbKs43a+gsl7pPpQdNAVABAMxyZLT4iHnCqJgfzl7MsR1+HN8ZyPrMGNqeDGe5yYcDL8t5p0rLyTKVMFasZWVe1Km/hyQCgDyZqLFBIeaJx+RCX4rGPZKn5+RWFW9uV9K5RcWrm5XuX3YphZl3tOzeqxgMXQS/hTx4APBZKxcfr1eL2B4m5ffPKXnJquLYi0pez/fmrzZv/ly4lHUW9UUAwQ9zooVAiQAEGqR4s1jncaUpRDx35nEJz5k92bFGMtuSKptcF6k6BiD6/2hcKDEAg0qMpCAJ8v0kyPUWIwnACgDSf5v/BEdntiMaVZDwAAAAAElFTkSuQmCC",
	//其他版本firefox的图标
	EXT_FX_LIST_IMG : "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA80AAABCwUAKl4YBEGFLQVDiTEBNHAjAA8qDQAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAADAY2bT0VWq+PHGfMyh5q2OIdatnmHGnS2BdhvK8MRIljAA8kIAAAAAgAAAABAAAAAAAAAAAAAAABAAMNFA5IjnMfZNDiH2Lr/xdd8v8TW/P/EVzz/xNj8/8XbPH/HHDf9xRZq64CGz06AAAACwAAAAAADiQAAAAABBBNmmohZdrxGWTz/xV69f8Id/X/BnL2/wtz9v8TePb/GYD2/xFz9f8aduv/Fl+1tQAZPCUAAAABCVGqAAhQpScgZ9XaEWrz/xGH9v8Oi/b/D4Dz/yV82v85dLj/M3nG/ySJ6v8aifb/F3/1/yKD5/wRW7Rzc///AFKo/wAYZcR8G3vt/wmE9v8HgfX/FIT2/yuB3v8rbLr/VGSD/4JgTf9hZHX/J3zb/w549v8djvb/G3PWzQBHoxoANJANHXTUvhyU9v8KiPb/Anr1/yqP9/82kO//K4vv/y2L7v9aa4n/kVky/z1sqP8mhPb/DXv2/xl55fQOWrdOBEqmJx5529wYkvf/EY/2/wF69v8ihOv/PWul/1pmgP9Jb6H/W1ln/4tPJP9HWHr/JHLS/xZ98/8cguz+FGLAdQZRrmsceNz4D4j3/xCL9v8BevX/KInu/z9xsP+Zclf/ll42/4RIIP+ISh//ZEpD/zhXiv8cgvH/I47u/xZkwnoQW7dWH37l9gV+9v8IgfX/AHn1/w6B9/9LjdX/hHp7/6NuR/+ISiD/h0kf/4ZJH/9JX4f/IIj1/x+H6foTX7xhAkijGh11184IfPX/AHn2/wB59f8Nf/X/NYDQ/0Nfhf+igGv/lFw0/5VdNf+OXj3/MlyY/xx+8P8Zdt/lClOuMQAhfQgcctK5FYLz/xd/6/8TgPH/IIjz/1x8p/+njHv/uZFz/5toQ/+PWTP/h08p/0BZhv8dfO7/F2rMpAAogAcAAEkDGm3LpC51yfFrdpH4WmV+/zt4v/9Herj/tJWB/8Sbev+md1X/jlcw/39NLf84abD/IHXd4gtWszcRXbsAC1i2AAVTskcRTqFcnXRnjKN6YviJaFX/d25z/45rVf+vhGT/vJBv/59rRv9QUmj/IGnJ5RNfvlYAAAAAAD2cAABAoAAAQKACAEG6Al8tLAqPaWZppX9w062CafmZZ0j/n3NW/7iQdv18doDsFVKjrQBPtTsAEFcBADeSAAAAAAAAAAAAAAAAAAAAAAA0Cw8AAAAAAXBDRB+IYF1ck21oiZNsZpGLY190Q1B/OwBGvgoARrYAAkGFAAAAAAAAAAAA+AcAAMABAACAAAAAgAAAAIABAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAIABAACAAwAA8A8AAA==",

	//自己在底下添加UA
	UA_LIST : [{
	        name : "分隔线",
		},


    // 伪装Firefox10.0
    {
    	name: "Firefox10.0",
        ua: "Mozilla/5.0 (Windows NT 6.1; rv:10.0.6) Gecko/20120716 Firefox/10.0.6",
        label: "Firefox10.0",
        img: "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAQ4qKwYzdmERVaSOH3K6pCyHvqQyha+OJl+CYQkbLikAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAUiAB5fegJIrtAMbtb1HpHn/jW08P9L0PX/X972/mfX7PVSp8fOIk5tdQABAx4AAAABAAAAAAAAAAAAAAQkABh0lQFAw/MLbuH/GYno/zSl7v9Ese//SrXw/1nD9P9z3fr/jfD+/3HG6fAuZ42MAAAAHRY5UQAAAAAKAA1ybAQuvvAldN//OZjp/0el7P9Kpe7/QJns/0KW6P9FnO3/Sqby/2rF9v+l6P3/e8fw6jFukVwAAAAGAABlHwoptcYmbdr/QJ3p/0Og6v8wiuX/KW/F/0lee/9cVk//UVlj/0F9t/9TsPP/htj7/6Hl/f9zyu6zIVZ2FAsltlsfXdL2NJLo/zaV6P8id93/ClLN/yRImv9bUU//glMP/4BKA/9WNhv/S2+M/3vI4v+I3f7/kOP97XXS90MVSsqYJH3g/yqL5f8mf+D/B0PI/w5Oxv8lZcv/NXTU/1p9p/98eGH/azoH/1svDf92mpv/g93//4re/f+I4v+FFFTNyiGG4/8ih+T/G3Da/wwxsf9eanD/i4BQ/4aJbP+CmZH/mpJd/5VnFv9fKQD/XXF3/3rU/P+W5f7/f9v+tRhx2tgdhuP/H4nk/xh/4f8YUrr/fXVS/66SN/+9mzT/u5o0/7eTLv+idx7/i1gP/2xRM/90s83/ner//2/R/s4bhePRHYfj/x6I5P8Zg+P/GIDh/yiD0f+eonH/zrBM/8uvT//HqUf/vJg4/7GEKf+HUBL/g62x/5rp//9y0/7BHIbjkh2I4/8bhuP/G4Xj/xeC4v8oguH/fKTM/767jP/dxmn/1bpb/9CxU/+/lz7/h1AW/2uQnf+J3v//k+b/jieH4zMyk+bmNJno/yiQ5v8diOX/KXDI/3CHov+1uJX/7dqF/+PNcf/dw2v/0q9b/6t+Pv9smav/d9X/95bp/1opfe4kOpDx31yo5fhrrtn9XKzj/3Ont//hyF7/9uGC//nsp//y45f/5dB//8y6fP+cvrD/fNX183HR/ZyF4P8ZWrD/DWG0/6JfksRrtZNaucu+kv+zwqX/2tB///fkif/57Kb/9eei/9jQmP+LvMT/bcz35HPQ/HBbwfsOW8j+AHTC/wCk4f8XnO3/BrVwEh3KnVKU0axf6uLHb/7s1nr/79uI/+7fov7JxZrpjK6llV677ixErf8CT7D3AAAAAAAAAAAAAAAAAAAAAACQSQ0AgzcBBq54MzrKoFF/1bFdpuHEbaTjx3t9z6pYOLZuDQa7gyAAAAAAAAAAAAAAAAAA4AcAAIABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAwAA8A8AAA=="
	},
	
	
	    //伪装 Firefox3.6 - XP
	    {
			name : "Firefox3.6 - XP",
			ua : "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8",
			label : "Fx3.6",
			img : "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA80AAABCwUAKl4YBEGFLQVDiTEBNHAjAA8qDQAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAADAY2bT0VWq+PHGfMyh5q2OIdatnmHGnS2BdhvK8MRIljAA8kIAAAAAgAAAABAAAAAAAAAAAAAAABAAMNFA5IjnMfZNDiH2Lr/xdd8v8TW/P/EVzz/xNj8/8XbPH/HHDf9xRZq64CGz06AAAACwAAAAAADiQAAAAABBBNmmohZdrxGWTz/xV69f8Id/X/BnL2/wtz9v8TePb/GYD2/xFz9f8aduv/Fl+1tQAZPCUAAAABCVGqAAhQpScgZ9XaEWrz/xGH9v8Oi/b/D4Dz/yV82v85dLj/M3nG/ySJ6v8aifb/F3/1/yKD5/wRW7Rzc///AFKo/wAYZcR8G3vt/wmE9v8HgfX/FIT2/yuB3v8rbLr/VGSD/4JgTf9hZHX/J3zb/w549v8djvb/G3PWzQBHoxoANJANHXTUvhyU9v8KiPb/Anr1/yqP9/82kO//K4vv/y2L7v9aa4n/kVky/z1sqP8mhPb/DXv2/xl55fQOWrdOBEqmJx5529wYkvf/EY/2/wF69v8ihOv/PWul/1pmgP9Jb6H/W1ln/4tPJP9HWHr/JHLS/xZ98/8cguz+FGLAdQZRrmsceNz4D4j3/xCL9v8BevX/KInu/z9xsP+Zclf/ll42/4RIIP+ISh//ZEpD/zhXiv8cgvH/I47u/xZkwnoQW7dWH37l9gV+9v8IgfX/AHn1/w6B9/9LjdX/hHp7/6NuR/+ISiD/h0kf/4ZJH/9JX4f/IIj1/x+H6foTX7xhAkijGh11184IfPX/AHn2/wB59f8Nf/X/NYDQ/0Nfhf+igGv/lFw0/5VdNf+OXj3/MlyY/xx+8P8Zdt/lClOuMQAhfQgcctK5FYLz/xd/6/8TgPH/IIjz/1x8p/+njHv/uZFz/5toQ/+PWTP/h08p/0BZhv8dfO7/F2rMpAAogAcAAEkDGm3LpC51yfFrdpH4WmV+/zt4v/9Herj/tJWB/8Sbev+md1X/jlcw/39NLf84abD/IHXd4gtWszcRXbsAC1i2AAVTskcRTqFcnXRnjKN6YviJaFX/d25z/45rVf+vhGT/vJBv/59rRv9QUmj/IGnJ5RNfvlYAAAAAAD2cAABAoAAAQKACAEG6Al8tLAqPaWZppX9w062CafmZZ0j/n3NW/7iQdv18doDsFVKjrQBPtTsAEFcBADeSAAAAAAAAAAAAAAAAAAAAAAA0Cw8AAAAAAXBDRB+IYF1ck21oiZNsZpGLY190Q1B/OwBGvgoARrYAAkGFAAAAAAAAAAAA+AcAAMABAACAAAAAgAAAAIABAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAIABAACAAwAA8A8AAA=="
		},
	
	
	    //伪装 Firefox3.6 - Linux
        {
         	name: "Firefox3.6 - Linux",
            ua: "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.2.8) Gecko/20100723 Ubuntu/10.04 (lucid) Firefox/3.6.8",
            label: "Firefox - Linux",
            img: "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAACIXBwAGBAEDWDoTNnZOGYyFWBzGjFwe34tcHteEVxy4dEwZfFM3EiwAAAACFw8FAAAAAAAAAAAAAAAAAFY5EgBDLA4Oe1EaepdkIOOmbSP+rHEl/69zJf+vcyX/rnMl/6lvJP2aZSHbfVIabj0oDQpRNREAAAAAAFg6EwBFLQ8LiFkdkqRsI/uvcyX/s3Ym/7d4J/+5eif/u3sn/7p6J/+4eSf/tXcn/6pwJPiMXB6ENSMLB1Q3EgD//1YAh1kda6ZtI/mydSb/uHkn/759KP/DgCj/xoIq/8aFMf/FhC//xIAo/8B+KP+7eyj/rnMl9IxcHlfHgyoAeE8aJ6FqIteydSb/unon/8KAKf/Igyr/xo5E/8qshf/Mvan/yLae/8qdY//Khi//xYEp/759KP+qcCTCc0wZFZZjIHyucyX9uXon/8KAKf/Lhiz/zYkw/7uJSP+5mnP/ysO6/9nb3P/W08//zayC/8mRRv/Hgin/unon9Z1nIVekbCPDtXcm/8B+Kf/KhSv/0Isx/9OSPv/aoln/151R/8iXVv/Vw6v/7O3u/+Hg3//Usof/zYcs/8SBKf+vcyWdqnAk7Lp6J//Fgir/zoku/9OSPf/pyqL/+fPr//bp2P/y3MH/+PDl//j5+f/z9Pb/38eo/9CMNf/KhSv/uXonz7B0Jey9fCj/yYQr/9GMMv/Rlkj/18Wu//Ty7//////////////////+/v7//f3+//Pq3//aqGj/zYYr/79+KeqvcyXlv34o/8uGLP/RjTX/05RB/86YUf/l1sP////////////////////////////+////37eE/86HK//BfynctXcmsL9+KP/Lhiz/0Y01/9SVQv/Wm03/zKJq/+PZy////////////////////////v7+/9y4if/NiC7/xIEpoLR2JlC9fCjyyYQr/9GMM//Tkj7/2aBW/+O6hP/u28T///////////////////////z8/f/Xt43/zIct+sWBKWinbiQluXon4MiHMv/Rjzr/05I+/9qvd//7+ff///////////////////////f29v/Xxa3/yo5B/8aCKcm+fSgpq3EkErZ2JLPZsn+v9OTP8/HcwP/btYP/6+PY/////////////////+7q5P/FqIL/yYs8/s+JLr26eyg5pGwjBK5zJQGydCQs0Kp5Ev///2b////c/Pn1/vv49P////////////38/P/f1sr9xqR3086MNXLQiCsZ0IguAL1nEgAAAAAAAAAAAP///wD///8B////Lf///4r////P////7P///+r+/v3I9e/nf/HjziT//wAA/vHRAAAAAAAAAAAA4AcAAMADAACAAQAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAA4AcAAA=="
     	},
	
	
	     //伪装 Firefox3.6 - Mac OS X
        {
        	name: "Firefox3.6 - Mac",
            ua: "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.5; en-US; rv:1.9.2.8) Gecko/20100724 Firefox/3.6.8",
            label: "Firefox - Mac",
            img: "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAcHBwABAQEDERERNhcXF4waGhrGGxsb3xsbG9caGhq4FxcXfBAQECwAAAACBQUFAAAAAAAAAAAAAAAAABEREQANDQ0OGBgYeh4eHuMhISH+IiIi/yMjI/8jIyP/IiMi/yEhIf0eHh7bGRkZbgwMDAoQEBAAAAAAABEREQANDQ0LGhsakiAgIPsjIyP/JCQk/yUlJf8lJSX/JSUl/yUlJf8lJSX/JCQk/yIiIvgcHByECgoKBxEREQBPT08AGhsaayEhIfkjIyP/JSUl/yYnJv8nJyf/KCgo/y4uLv8tLS3/Jycn/ycnJ/8mJib/IyMj9BwcHFcoKCgAGBgXJyAgINcjJCP/JSYl/ycoJ/8pKSn/PT09/3Fxcf+NjY3/hISE/1ZWVv8tLS3/KCgo/yYmJv8iIiLCFxcXFR4eHnwiIyL9JSUl/ygoKP8qKir/LS0t/z09Pf9fX1//m5ub/7m5uf+srKz/bm5u/z8/P/8oKCj/JiYm9SAgIFcgICDDJCQk/ycnJ/8qKir/LS0t/zU1Nf9JSUn/QEBA/0RERP+Pj4//yMjI/7u7u/9zc3P/Kioq/ygoKP8jIyOdIiIi7CUmJf8oKCj/LCws/zQ0NP+JiYn/x8fH/7a2tv+hoaH/wsLC/9PT0//Q0ND/jY2N/zAwMP8qKir/JiYmzyMjI+wmJib/KSop/y0tLf87Ozv/kpKS/8zMzP/c3Nz/3Nzc/9ra2v/Y2Nj/2NjY/7y8vP9ZWln/KSkp/ycnJ+ojIyPlJycn/yoqKv8vLy//NDQ0/z09Pf+jo6P/3Nzc/9nZ2f/a2tr/2tra/9ra2v/b29v/cnJy/ykpKf8oKCjcJCQksCcnJ/8qKir/Ly8v/zU1Nf85OTn/UVFR/6urq//c3Nz/29vb/9zc3P/c3Nz/29vb/3Z2dv8rKyv/KCgooCQkJFAmJibyKSkp/y4uLv8zMzP/Q0ND/2pqav+lpaX/3t7e/97e3v/e3t7/39/f/93d3f97e3v/Kisq+igoKGgiIiIlJSUl4C8vL/81NTX/NDQ0/2VlZf/Z2dn/4ODg/+Dg4P/g4OD/4eHh/9jY2P+Xl5f/Ojo6/ygoKMknJycpIiIiEiIjIrNxcXGvt7e386qqqv9ycnL/v7+//+Tk5P/i4uL/4+Pj/8rKyv9xcXH/NDQ0/isrK70nJyc5ISEhBCIjIgEhIiEsdHR0Eujo6Gbl5eXc2tra/tra2v/k5OT/5OTk/+Hh4f+zs7P9aWlp0zAwMHIqKioZKioqABYVFgAAAAAAAAAAAOLi4gDh4eEB4+PjLeTk5Irl5eXP5OTk7OTk5Ori4uLIzs7Of7i4uCQAAAAAvLy8AAAAAAAAAAAA4AcAAMADAACAAQAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAA4AcAAA=="
    	},{
	        name : "分隔线",
		},
		
		
		//伪装 IE6 - XP
		{  
		    name: "IE6 - XP",
		    ua: "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
		    label: "IE6",
		    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADF0lEQVQ4jZWTfVALcBjHn1rbaq1QXWiFLW8JebnK7byE0zmjVyVjKcrLEedwXg4pnXZeW7jpReTtWHpZw0zcMp3USpeXvF7ISyuu2qRQ7esPtHPyh+fP5/f9fO733HMP0X+UR9zNaVN3VKTM2lOZxVt2YzYRWf07HXDKlgIUXApSOlBgkQcrXD0+Tv4ob/ia20G8mJIpc5MqTnvGa6L6ABVcpyiN8LDm7YOC2lbDlTrjp3pTNxR17Z+YEdoJv2Pu0epQ7/Wlu/5gnaI0QnlZc1Phq66O9bqvL7UtMD/rAqo+A3ojoKrv7Jm+W59CROQYqZ7ntPR6bC/MClePl5W3fktQG3WCNENqWl13R2pZy4fVl9/rZDXtxnwDUNgMFDeZMXF71TaaVzCfREXCXkHo8SflM9NfZrrsfL5K+rgHy/Mb71OAgktExJJox24pM7XJGgBZA5B8vxP2i65vIFIwiIiIGab25SfcOWQXe1e4svyrectjYEjSi61ERLRAxSEi8stqVK2oBcTVwNqHwLjEmiOW4QOLPEh0Zaww19AQpgeC7pkxU9X+ZeqZxha/E29aBybVtzCSm74x0jthffw7OEeMGLCuvJTmKN16HS6b9Bn+JV3w1QG+WjNGyQ11/D31avv4ByUkrr5JSyoKSFJ5kaKrLlGkrpBE16QUqnH99YNivl3iqy88JTBUDQzKA6wD9m/+Y0XDNviTf24w+eXMJx95KI2Relsew0oSrVJNYJ4EOKcB5gmAIi9VEpHtzxU5j7ZaWdVmIzWBsa8VlPAaxBNFWATiu4+sJEq9zd4mIzsTsD8FsI52w3p12VNGSHaxzdbnzXaZACcHYMsA6zlpFyzwtIzBFK41EdvVkzkyROKQ3NzDyQJscwBWNsDOAmyzAU420D+9Gw6RZ68SEccisBeMI5HyXW/T0X2ES/R5leuxHvAzOiGQd0Bw8GOXYGNptfOk+Bj6+4A4bv3Et9q43uJ1bEf34W5es0O8glNTeDPiJf08Jns6DAsczeUOdO0DtJSj+6S5Pov3n5u88ICU7yeJ+GewD8kPRgBxL4eH9TwAAAAASUVORK5CYII="
		},
		
			
		//伪装 IE8 - Windows7
        {  
            name: "IE8 - Win7",//此处文字显示在右键菜单上，中文字符请转换成javascript编码，否则乱码(推荐http://rishida.net/tools/conversion/)
            ua: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
            label: "IE8",//此处文字显示在状态栏上，如果你设置状态栏不显示图标
            img: "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAALOX/RAmW9Mgil+nXF4G10haGr7ABaaEyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN/v/FCC0/9UMdcimFGGDbTSq/1w0rfuiE2qP1StUWq5+TACieEoApWg9AHdbNAAiAAAAAAAAAAAAAAAAAAAAAD/6/zcns//yBlN/vAAAAAAqLik3bD0C4LVzAP7sogD//7YU//+zC//elQD/rWsA/ntJAN9VMgkqAAAAAAAAAABF/P9DKrz88RJeitGsinIgfD0A/sN4AP/kngD//78d///Ue///0nD//8Mv//+vBf//tyr/hkgA/VVDN04AAAAASfv/PkPW/88foP/mjU0N2JVNAP/PhQD/3pgA//auAP/voAD/2pMA///Pa///wTz/8qEA//+tF/+APgD8TT46IEP3/y5V7/+jJLf//1RyYv+GPwD/uXQA/9eQAP+KVQDSOxsJLFolEgx3RgB3/4YF//+4MP//nQr//6cC/1o6JNk59f8PSvv/ijjH9f8QtfP/cToD/49OAP+oaAD/Kh8XHQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADv6/1lzxMP/JsP7/ziEj/9cIgD/m1IA/5tYAP+tTAD/pFEA/6RRAP+cTgD/j0IA/4hBAP+CPQD/MxgBtAAAAAA7hYAldJ6R/1XX/f8VvPv/RUg1/2MwAP/2lwD/+ZwA//ygAP/4oQD/7JYA/+aSAP/xqBr/9o8D/zEWA7cAAAAAYh0BFKdzJt99xbj/RM77/wut5/8vNCn/NjYK1UErCLtKNAa7SDADwdxhD///dg7//LBT//GUPf8yFwSxAAAAAAAAAAC+dAPB+Lop/3zg3v82zPv/E5zA/ws7Xv8CO2YxAAAAAGpXOpP4lhf//qcv//zLV//ymz3/JxUJjgAAAAAAAAAAtnoJXP+tBvT/yE7/cNzU/znS/f8glKH/IzVL/lFXVbXlnSj//rNA//7NW//+wlr/r3E4/01fATwAAAAAAAAAAAAAAADEeQCa/7Uw+//LXP+Bzbr/Q9X//yaqv/9HYWj/ho1z///SZ///1nf/tnU0/2JnJWUCS2OJAAAAAAAAAAAAAAAAj0IAGMR5AJr/tS75/s5e/8LYk/913P//Tdf//0Rwcv9ngnP/m3FI/wAAAAAAAAAAHomwrQAAAAAAAAAAAAAAAAAAAAAAAAAAtnoJXMiFHsLkoiHz47Ez8EvWusA6y/juR5ym7RVWXr8DR2GoEmeHwDS26I4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAd977R0TH9Kwsue/YKbPn3ymx54tHzPckgf8AAAAPAAAQAwAAAAEAAAAAAAAAAAAAAP8AAIAAAACAAAAAgAAAAMBAAADAAAAA4AAAAOAGAAD4AAAA/8AAAA=="
		},{
		    name: "分隔线",
		},
		
		
		//伪装 Chrome - Windows7
        {
     		name: "Chrome - Win7",
            ua: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1623.0 Safari/537.36",
            label: "Chrome Win7",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACalBMVEX///8zhD/WnCjlsCH80glMtUlCmkQ/lEPsWkzqU0fntCDoS0HmQTrfIiffIifZoSc9k0M5jULmQTrkNzPhqyT80gnvvhrWnChMtUlFn0bsXU7rVUgzhD/iMTA5jULfqCXkNzPdpibgJyrntCDWnChMtUlCmkTpUEQzhD/kUSHoS0H80gnvvhrWnChMtUlFo0bvZ1bsXU4zhD85jULzxRXntCDdpibWnChMtUlIp0fwa1lCmkTuYlJtgzr4zA/oS0HlPDffIidMtUnvvhpIp0dChcboS0HlPDfgJyriMTDntCDhqyRqoNTF1N9jm9NKrkj4zA9alM5Fo0ZRj8vwa1lFn0ZNjMrvZ1ZCmkRLi8nuYlJGh8f2yBLsXU7sWkw8gsQ2f8I2f8HrVUjqU0fpUEQxe7zzxRXmQTryxBbkNzPO2eTfIifWISTlsCHjMjHuwBPltBlwptk/lENro9fgYGLR3Oc9k0Pb59zQ1d3hWFg5jULE1+hgmdFKqEPV4e380gmzzucteboseLhVkc02c6gpdbUsc6z1zwshbayNtt3N3u91w3KNr8l6rt3ZoSd2q9vOHCDp9uhbmD/ha2/Y1YW5uhviyMji2sq4tCfY5vJsw2ndpiaHtnPpzGS747lBhLuUtiv421F8qtZ4p9RmtmbWnCjtzA3p0tO6myz52kPhUkH92jeTZVJpqWDxwxFvqDRYrEHy7dRZcjDgSSnhSCPhQ0PhvVwicK7v6tHASEtunjtyXyyJVy3XxRTFPkAcY5+mRivpuhaFzoKBy39Sn0D111DHJCK1JR/51zTIGh6YJhrAFxvY2+FMir6ZHwFFAAAAQnRSTlMAEREREREREREREREREVVVVVVVVVV3d3d3d3d3d4iIiIiIiJmZmZmZmZmZqqqqqqqqqqru7u7u7u7u7u7u7u7u7u473/RYAAACIUlEQVR4Xq3OU2MdURSG4amd2k1pI6m9h8e2bcS2ndq2bdv/qSsz+4S9zHv7PbP2EIPZ6Dkbd2q1WsPuTXPH/AeMW+G2m80Gg8Fss3u8q8f3B1P2MV633W6z2exuD8ME9k/tCxaygQDDeD2Ql4GdZePpvUG6KMTyBAp0zaG4iFvcA9I4kSgeAgOIDbAhmEUcF0lLgRF7ohwQMJCwwhyJHJiAwTL0IcpFOEDc06KiW4+hJ3yr8AGEDn2Lwhdc7rHCwvCf48+SyeTHROKetWE4D2YhhN50gjgcbupoa+toyjsLo7ICms6D9QC+fO+M5oal8pysrBypNO9rhdAaHmxH0OvfP69fVpXK5VJ5qerSCwz28kCBoLJf78otmhoVVKMxlf8QgLIHoEcvK2mLSa/R600WuvnmQIDuVDodDpq20LTDWYKBtTe4e9Lnczkhl8sXvi0cEMAOLA6er6uu8vmqquv+PsQvZPJgAwafmusbn0ON9SUX8YG1PJhNYXFOVvseqg0fwX8QnMGDkToKCX0ukLW2ygrOXBN2PzmW4FuuTgl0qqXliu6osFvJJYTQqF1qhQKlou43AFAq/eSWYQRuklFNdYuyt/z/BUnxNKK7+UYdhY8oLsDX8DwpWSBsWOR3HQGjeJCw+oMkKZYsIvo0OSPbqFNTlPoECatYsnUi0a8hK4vzs43GV7FYTHK6felQGAaQeZszim+0X922bibMg9c/2eD7EBLmf70AAAAASUVORK5CYII="
		},
		
		
		//伪装 Chrome - Mac OS X
        {
    		name: "Chrome - Mac",
            ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36",
            label: "Chrome Mac",
            img: "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAANcNAADXDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGhoaABoaGgAaGhoGGhoaChoaGhoaGhoMGhoaARoaGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaGhoAGhoaABoaGh4aGhpyGhoarxoaGlkaGhqvGhoawhoaGoMaGhosGhoaARoaGgAAAAAAAAAAAAAAAAAaGhoAGhoaABoaGkkaGhrQGhoa/hoaGv8aGhq1GhoafxoaGvwaGhr/Ghoa4RoaGmUaGhoFGhoaAAAAAAAaGhoAGhoaABoaGkYaGhrkGhoa/xoaGv8aGhr/Ghoa+RoaGnkaGhq/Ghoa/xoaGv8aGhrzGhoaZxoaGgAaGhoAGhoaABoaGhcaGhrHGhoa/xoaGv8aGhr/Ghoa8RoaGsoaGhqSGhoaXxoaGvIaGhr/Ghoa/xoaGuIaGhowGhoaABoaGgAaGhpgGhoa/BoaGv8aGhr/Ghoa2RoaGnAaGhp9GhoagRoaGjcaGhqiGhoa/xoaGv8aGhr/GhoaiRoaGgAaGhoCGhoaoBoaGv8aGhr/Ghoa8hoaGm0aGhq8Ghoa/xoaGv8aGhrTGhoaZRoaGukaGhr/Ghoa/xoaGsYaGhoQGhoaChoaGr0aGhr/Ghoa/xoaGp4aGhpgGhoa/BoaGv8aGhr/Ghoa/xoaGoYaGhq7Ghoa/xoaGv8aGhrdGhoaIRoaGgoaGhq8Ghoa/xoaGuUaGhpKGhoaYBoaGvsaGhr/Ghoa/xoaGv8aGhqCGhoauhoaGv8aGhr/Ghoa3BoaGiEaGhoBGhoanRoaGv8aGhqOGhoamBoaGm8aGhqwGhoa/RoaGv8aGhrJGhoaZRoaGukaGhr/Ghoa/xoaGsIaGhoOGhoaABoaGl0aGhrOGhoabBoaGvEaGhrZGhoaaRoaGm0aGhptGhoaLRoaGlYaGhqNGhoajBoaGo4aGhpTGhoaABoaGgAaGhoUGhoaURoaGrwaGhr/Ghoa/xoaGvIaGhrJGhoauxoaGr0aGhq+GhoavBoaGr8aGhqbGhoaExoaGgAaGhoAGhoaABoaGiQaGhrXGhoa/xoaGv8aGhr/Ghoa/xoaGv8aGhr/Ghoa/xoaGv8aGhrwGhoaXhoaGgAaGhoAAAAAABoaGgAaGhoAGhoaPRoaGsMaGhr8Ghoa/xoaGv8aGhr/Ghoa/xoaGv4aGhrWGhoaVhoaGgMaGhoAAAAAAAAAAAAAAAAAGhoaABoaGgAaGhoVGhoaYRoaGqYaGhrGGhoayBoaGq8aGhpxGhoaIRoaGgAaGhoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGhoaABoaGgAaGhoEGhoaDxoaGhAaGhoGGhoaABoaGgAAAAAAAAAAAAAAAAAAAAAA+B8AAPAHAADAAwAAwAEAAIABAACAAQAAAAAAAAAAAAAAAAAAAAAAAIAAAACAAQAAwAMAAOADAADwBwAA/D8AAA=="
		},
		
		
		//伪装 Chrome - Linux
        {
     		name: "Chrome - Linux",
            ua: "Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.462.0 Safari/534.3",
            label: "Chrome Linux",
            img: "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAANcNAADXDQAAAAAAAAAAAAAAAAAAAAAAAAAAAADujVQA7o1UAO6NVAvui1Et8qBwR/3MsEb9zbEs/c2xCv3NsQD9zbEAAAAAAAAAAAAAAAAAAAAAAAAAAADujVQA7o1UCe6NVFbujVS17o1U5e6QWPP5v5zz/c6y5P3NsbT9zbFV/c2xCf3NsQAAAAAAAAAAAO6NVADujVQA7o1UE+6NVJfujVT37o1U/+6NVf/shkn/8Jpo//3MsP/9zbH//c2x9v3NsZb9zbET/c2xAP3NsQDujVQA7o1UCe6NVJfujVT+7o1U/+6NVP/ujVP/7IZK/+h6Of/3tY7//c6z//3Nsf/9zbH+/c2xlv3NsQj9zbEA7o1UAO6NVFbujVT27o1U/+6NVP/ujFP/8Jto//Kthf/unm//8J1s//zHqf/9zbH//c2x//3Nsfb9zbFV/c2xAO6NVArujVS07o1U/+6NVP/ujFP/866F//nRuf/3u5X/97uV//jOtf/7z7b//c2x//3Nsf/9zbH//c2xs/3NsQrujVQs7o1U5O6NVP/ujFP/75tp//jRuf/yklX/8Hw0//B8NP/yk1j//N3K//3Tu//9zbH//c2x//3NseP9zbEs7o1URu6NVPPujVT/7IpQ/96jgP/1uJL/8Hwz//B+N//wfjf/8Hw0//i+mv/+3cr//cyw//3Nsf/9zbHz/c2xRu6NVEbujVTz745V/9d7Rf+6im7/9biS//B8M//wfjf/8H43//B8NP/4vpr//t7L//3MsP/9zbH//c2x8/3NsUbujVQs7o1U5OuLU/+tXjD/nmI+/+3Ktf/0klb/8Hw0//B8NP/zk1f/+t3M//rSuv/9zbD//c2x//3NseT9zbEs7o1UCvCOVbTQeET/mk8j/6dVJP/Ijmv/8My2//e7lv/3vJj/+NzK/+7Rwf/pv6f/8MSq//jJrf/8y6+0/s+zCtd8RgDihE1WtGEv9qxYJv+wWif/sFkm/7pxRf/KknD/zJV0/8aGYf/DfFP/w3xT/8J8Uv/FflT21JNsVr91SQCzXisAtF8tCLBaJ5WwWif+sFon/7BaJ/+vWSX/r1cj/69XI/+vWCT/r1gl/69YJf+vWCX+rlcjl6dMGAmpTxsAslsnALBaJwCwWicTsFonlbBaJ/awWif/sFon/7BaJ/+wWif/sFon/7BaJ/+wWif3sFonl7BaJxOwWicAsFonAAAAAAAAAAAAsFonALBaJwmwWidVsFontLBaJ+WwWifzsFon87BaJ+SwWie1sFonVbBaJwmwWicAAAAAAAAAAAAAAAAAAAAAAAAAAACwWicAsFonALBaJwqwWicssFonR7BaJ0awWicssFonC7BaJwCwWicAAAAAAAAAAAAAAAAA+B8AAOAHAADAAwAAgAEAAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAAgAEAAMADAADgBwAA+B8AAA=="
		},


        // 伪装 Android Droid
        {
    		name: "Android Droid",
            ua: "Mozilla/5.0 (Linux; U; Android 2.0; en-us; Droid Build/ESD20) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17",
            label: "Android Droid",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASElEQVQ4jWNgQANLjln+RxcjRg5D4apTrv+XHLNEwURrhtHomgkagq4JF6adAWQBdD8S6wI4e9SA/1gDdODTAbpCkhMQXQ0AAEsuZja4+pi7AAAAAElFTkSuQmCC"},
			

        //伪装 Google 爬虫
        {
    		name: "Googlebot",
            ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
            label:"Googlebot",
            img:  "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAHQSAAB0EgAAAAAAAAAAAAAAAAAAAAAAAAAAAADwfjcA8H43BfB+Ny7wfjdm8H43h/B+N4fwfjdm8H43LfB+NwXwfjcAAAAAAAAAAAAAAAAAAAAAAPB+NwDwfjcA8H43JvB9NpXwfDTj8Hw0+/B8NP/wfDT/8H01+/B+NuLwfjeU8H43JfB+NwDwfjcAAAAAAPB+NwDwfjcA8H43PPB9NtHxgj7/9J1n//a1jP/3t5D/9a2A//OYYP/xgz7/8H01//B+N8/wfjc78H43APB+NwDwfjcA8H43J/B+NtDwgj3/+cip//zo2//4wJ3/9a1///awhf/4wqH/+cuu//OZYP/wfTb/8H43zvB+NybwfjcA8H43BPB+N5XwfTb/8otM//3t4//4wJ3/8Hox//B7Mv/wfDP/8H02//a2jf/85NX/8oxN//B9Nv/wfjeT8H43A/B+Ny7wfjfi8H43//CAOv/3upT/++DP//Wrff/xiEf/8IE8//KSVv/5yq3//vfz//ObY//wfDT/8H434PB+Nyzwfjdm8H43+/B+N//wfjb/8H85//ObZP/3vZn/+tK5//vaxv/+8uv//vTu//jGp//xhUL/8H42//B+N/rwfjdk8H43hvB+N//wfjf/8H43//B+N//wfDT/8H84//rYwv/98uv/+MCd//OWXf/wgDr/8H02//B+N//wfjf/8H43hPB+N4bwfjf/8H43//B+N//wfTb/8YVC//SicP/61L3/+9zI//GHRv/wezP/8H43//B+N//wfjf/8H43//B+N4Twfjdm8H43+/B+N//wfjb/8YM///nNsv/98Of/97uV//nIqv/5zLD/8YdG//B9Nv/wfjf/8H43//B+N/rwfjdj8H43LfB+N+Hwfjf/8H01//KRVf/+9O7/+cqt//B8NP/xhUL//OLS//jAnv/wfTX/8H43//B+N//wfjfg8H43LPB+NwTwfjeU8H43//B9Nv/xh0b//OTV//nJq//wfDP/8YM///zi0v/84dH/8pBT//CCPf/wfjf/8H43kvB+NwPwfjcA8H43JvB+N8/wfjf/8H02//Sfa//72cT/9rWM//jBoP/+9vH//OPU//jDov/yj1H/8H01zfB+NyXwfjcA8H43APB+NwDwfjc78H43z/B+N//wfTX/8o5P//avg//3u5b/9aVz//GKSf/wgTz/8H84zvB+NznwfjcA8H43AAAAAADwfjcA8H43APB+NyXwfjeT8H434vB9NvvwfDT/8Hw0//B8NPrwfTbh8H43kfB+NyTwfTYA8H43AAAAAAAAAAAAAAAAAAAAAADwfjcA8H43BfB+Nyzwfjdk8H43hPB+N4Twfjdj8H43K/B+NwXwfjcAAAAAAAAAAAAAAAAA8A8AAOAHAADAAwAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAMADAADgBwAA8A8AAA=="
		},{
			name: "分隔线",
		},


        //伪装 Opera 10.60
        {
     		name: "Opera",
            ua: "Opera/9.80 (Windows NT 6.1; U) Presto/2.6.30 Version/10.60",
            label: "Opera",
            img: "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAcHZgADA1oHExN5Qx0dh5gjI4zPJCSN5SMjjOUgIIrOGhqElhAQdkEBAVUGBQVhAAAAAAAAAAAAAAAfAAoKdQAHB2kZDw9+kw8Ph+0KCov/CwuQ/xcXmv8WFpn/CgqP/wkJiv8ODofsDQ18kAUFZRcHB3AAAAARAAQEZwADA2IUCgp7rQYGhP8BAYz/AwOY/xERjfUUFJamFBSXqhAQjvcCApn/AACN/wYGhP8JCXepAQFeEgICYwD///8ABQVxfQUFgv4CApD/AwOg/wYGmv8EBHadAABGBwAASwoFBXWnBgad/wEBof8BAY//BAR+/QQEbHgiIuYAAABiJAMDedgEBJD/Bgaj/wcHrv8DA473AAB1RwAAeAAAAHgAAAB1UwMDkvoFBa7/BASh/wICjP8CAnTVAABdIQEBbmEFBYf5Cgqi/w8Ps/8LC7H/AACE4gAAcyEAAHgAAAB6AAAAdSsBAYnpCAiy/wkJr/8FBZ7/AwOD+AEBZlwDA3uRCwuZ/xQUsv8iIsL/Dg6w/wAAedAAAGoSAABxAAAAdgAAAHAaAACB2wwMs/8XF73/DAyv/wYGl/8BAXGLBgaIqBQUq/8qKsT/RETS/xISrf8AAG/GAABgDAAAaAABAW4AAQFnFAAAedMUFLP/PDzN/xwcvv8MDKn/AwN/pQcHkKghIbv/UVHW/1pa2/8SEqv/AABnxQAAWwwAAGIAAABmAAAAXhQAAHHTFRWz/1VV1/86Os7/ExO2/wMDiKUFBZKRNzfG/3d35P9paeD/FRWt/wAAY8wAAFcQAABeAAAAYAAAAFgYAABq2BkZtP9iYt3/V1fa/x8fvP8BAYuLAACKYT8/xPmNjev/eXnm/yAgt/8AAGTcAABQHAAAWQAAAFkAAABQJQAAauUkJL3/cXHj/21t4v8kJLn4AACFWwAAeSQrK7HYjIzp/4qK7P86Osr/AQFu8QAASDkAAFAAAABOAAAASEQCAnT2QEDO/4SE6v9ycuH/GBio1QAAdyH///8ADQ2WfGNj0f6Vle//aGjh/xERjv8AAEZ/CgqDAAAAAAAAAEeKExOU/3Bw4/+Sku3/T0/I/QMDkHc4OP8AAACBAAAAdhQkJKatcXHZ/5GR7v9OTsz/ERFs5QMDPGoCAj9wERFx6VRUz/+Xl+7/aWnU/xgYn6kAAHQSAACAAAAARAADA4kAAAB7GCMjo5JdXcrtfX3g/1payf8/P579Pz+g/l9fzf9/f+D/V1fG7Boano8AAHkXAQGFAAAAQAAAAAAAAAAAAAAAcQAAAGAHDAyOQy4uqJdGRrjOSkq95UtLveRFRbfNKSmllgcHikEAAF8GAABvAAAAAAAAAAAA4AcAAMADAACAAQAAgAEAAAGAAAABgAAAAYAAAAGAAAABgAAAAYAAAAGAAAABgAAAgQEAAIABAADAAwAA4AcAAA=="
		},{
		    name: "分隔线",
		},
		

        //伪装 Safari - Mac OS X
        {
     		name: "Safari - Mac",
        ua: "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; ja-jp) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16",
        label: "Safari",
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADWElEQVQ4jXVTW0ybBRj9zGZMXEh4MY43ZwwaNRpRBMma6EhMjGOTGegykazLplvFQpPBFkkpBWopBRmGFVqxTEvbWQq9rrS0/WsvdL1x35gbc7rJH9mg0DHGMhw5vuHU7Tydh++c5Hw5h+gfPPEQp6Kioh0CobC4Uig8UFFR8RYRbaHHgcPhZEUiEaNOp6vkcrmvXro41jEaDcxEQ76/4hEfYmHfn1PjMTPDMB8/0qCwsPBlm93OhoKh9dnp2HxwJIzWniFIlG40dg9DonRgwMng8sXExuWZSUMJj/fM/0y+PXWq/cbsNCTdFhxti0FtYaF1L8DgXUafOwVxzwwEzSZMTyUxFo949hw6lLEplkqlObNT0bk6lRVfyqLwjNxG//gD9DM3offcgi2chju2CoU5BZ7MikuTcVhMxpObz/O57GomGMKR7guw+G4iWVWLXlUEDd4HsCVWUK+dg9IyB1MgjZo+Fh16F877Xb+/m5u7nUoOHtzuthuvynU+yB0pKBNAlVCLZN5OmBr70HT2GgQ6FjXmBbTYb+FM4C5qzpyH02FGq0z2CVVVV+f4HMb7wp4QPtWkILItotR2D5LdfCx9kAeFwow9mutomViDKrGKRs9d7OscQ4AZRldHez3xjvALGKtu45h6BE/yWTxf+yvkzgW0nLuK1q+7cCd1A+1Dc+jS/4YDBhbblEt4QzaBZNiLb5qbZMTllmebf1AtNhv9IOki6CQLOnEFr7lXUGy+hgF3EncW0sj76gpIyYIcayjWjCJo70e9qLaCiGhbZ5ucCXideP3H6yD1fVB3CsTcBiecxvG+X/B5Zxz28Xk867qHrQNL0A4F8ZPm9Oo7nF1vExHRsS8Ehx36Xnzv8CDLsgIa3ACF1/C0dRkv9C+D1CnkGP7AS5ZFVDouIOqyQCQS2R6u/1NicYPHP2iAbvhnvOedR4Z3DRRcB/nXsSW0gSznEiTDo0i4rWhrkaff//CjN//VxPz8/Odq6+pGBnu/g99hRq8/jmpmEpW+aXQEJsD4GfhMerQ2y+b3lewvfuQmMjMzMz/j8+VSsZhVK2SwaVQY0mqg72yHoqkhLRAI7bkFBbmPXeVmnoyMF3fv3csrKytrKy8vP11auv94dvYrO4lo639v/wYCax87ws5wXwAAAABJRU5ErkJggg=="
	},
	

    // 伪装 Safari - Windows7
    {
    	name: "Safari - Win7",
        ua: "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16",
        label: "Safari",
        img: "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAAAAAAAwEAAAMBAAA4ODUAGhsaCicmIjgtKyVwMS4mjzIwKI0xMCprKiooMhMUFAg0NTQAAAAAAAAAAAAAAAAAAwIBADg2NAD///8AIiIhIScmIogxLSLaRTsn9lRFLP1URi38Rj0r9Tk1LNQ3NjN9JiYlG////wAFBQUAAAAAAAoJCAAvLy8AISEhJyIiILY5MCP8d1k4/6R5Rv+zg0f/sYJG/510Q/9tUzf/SUM6+kZGRacrKysfUlJRAAEBAQAfHx8AHx8fDyAgIKQ3LCX/lGhH/7l+UP+rcUH/nWQ1/6VvOf+seD7/p3JG/31YQf9VTkn9SUpJkhMTEwoqKSkALCwsACIjI1MqJSP0kmtK/8uMWf+uaz3/lFEm/4NDHP+UWib/nGcs/5tmN/+jbUf/dFND/09MS+s4ODhCU1NTABESEgUkJSagWEQ4/+KveP/Oi1b/qVoo/5lLGv+QRhb/lVcb/55jI/+bYiv/nWU7/6BtTf9RQz7/OTo6iQAAAAIfISEVKCYnyo9xWv/yuYP/zn5G/7diKf/KgT7/z5BS/8GITP+5f0D/r3Mz/6JnN/+ye1T/ZEk8/zAxMbQpKioMHyEhHSckJNeoiXL/8riF/9GDTv/NhlP/+dKp//vYs//vyqT/4bSG/8WHSf+4fkv/voRZ/3ZWRP8yMjLBMTEyER4fIBQkIiLKnoBr//fEmP/gn3H/z41i/+S0jv/20rD/46t8/92eaP/hpGj/155n/9GYZf9zVUP/NTU2sissLAoOEBEDISEhnndlWv/30rH/8LyT/96je//Um3L/3KNz/9CJTf/Qhkj/6q11/+uxd//drH7/VUI5/zIzNIT///8AKCgoACEiIk1FPjz00bqp//zbvv/wvpn/5q+G/+etfP/sqWr/45dS/+2oZ//6yZf/poZv/zMtLOkwMTI5PDw8ACIiIgAcHR4JKioqn2tgW//hzL3//eDI//fVuP/yw5z/8rqG//e5fv/8xI3/xKCE/0k+Of0tLi6HKSoqBCgoKAAFBQUAKSkpACQkJRwwLy6vXlNP/a+aj//h0sb/69vJ/+nTuv/Zu5//noFu/0s/O/owLy+bLy8wEzIyMgAAAAAAAAAAAA4ODgAqKysAJCUmFCsrLHk9NzbZWE1K/mVZVf9hVFD+UEVB9Tk1Nc0xMTJrLS4uDjIyMgAAAAAAAAAAAAAAAAAAAAAAAAAAABocHAAAAAABLi8vTzY3N643ODiCMDEyXS0vMEMrLS4XDw8PARweHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASEhIAPT09ADg4OCM3NzdBNzc3FDk5OQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0A8AAOAHAADAAwAAgAEAAIABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAIABAACAAQAAwAMAAOAHAADwDwAA+P8AAA=="
	},


    //伪装 iPhone，查询http://www.zytrax.com/tech/web/mobile_ids.html
    {
    	name: "iPhone",
        ua: "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1_2 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7D11 Safari/528.16",
        label: "iPhone",
        img: "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAACMuAAAjLgAAAAAAAAAAAAAAAAAAAAAAAAAAAACLi4sAd3h3CqOjozOYmJgmNDQ0BPX19QB6enoQoqKiNY+Pjx4AAAAAMTExAAAAAAAAAAAAAAAAAAAAAACTlJQAgoOCEsTExJfi4uLq5OTk3dTU1KbOzs6T29vbv+Li4uvR0dHPoKGgR////wAzNDMAAAAAAAAAAABlZmUACw0MA7KzsojY2Nj+5+fn//Dw8P/09PT/9PT0/+/v7//m5ub/3d3d/8HBwdiEhYQtm5ubAAAAAAACAgIApKSkAJGRkUC9vb3tzc3N/9XV1f/e3t7/4+Pj/+Pj4//e3t7/1dXV/8zMzP/ExMT/pKSkozc4NwddXl0AUVJRAAAAAAOdnZ2ftbW1/7q6uv/BwcH/x8fH/8vLy//Ly8v/x8fH/8HBwf+6urr/tra2/6ioqOJ/gIApg4SDAHBwcABvcG8emZqZ3aWlpf+oqKj/rKys/7CwsP+ysrL/srKy/6+vr/+rq6v/p6en/6GhoeeUlJRYeHp5BoWGhQB6e3sAdHV1P46OjvWUlJT/lpaW/5iYmP+ampr/m5ub/5ubm/+ampr/mZmZ/5aWlv+HiIeE////AF1fXQAAAAAAiIiIAH19fU+Ojo77h4eH/4WFhf+Ghob/iIiI/4+Pj/+ZmZn/np6e/5+fn/+ZmZn6enp6TYWGhgAAAAAAAAAAAJGRkQCHiIhDqqqq96ioqP+goKD/n5+f/6Wlpf+tra3/sLCw/6+vr/+vr6//qqqq/oGBgWCoqKgAAAAAAAAAAAB7e3sAd3h4HrS0tNnExMT/w8PD/8PDw//CwsL/wcHB/8HBwf/AwMD/wMDA/7+/v/+hoqK8VVZVGW9wcAA5OzoAR0hHAP///wCnqKdxzc3N+NXV1f/U1NT/1NTU/9PT0//S0tL/09PT/9PT0//T09P/y8vL/qKiooMAAAAAR0hHAAAAAAB9fn0AZ2hnCbW2tWzS09LT29vb69bW1tLDw8OyuLm5rs3NzcHZ2dnn1tfW5cXGxaSfoKAp3t7eAEdJSAAAAAAAAAAAAExNTAApKyoBl5eXF66uriuVlpYTwMDAZMDAwOKUlJSDmZqaLaenpyN6enoHmJmZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmpqaAJWVlTalpaXqqKio9Y6PjlGnp6cABwcHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF5eXgAAAAACoqKibcfHx+7AwMCdAAAAAFJSUgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhYWFAGxtbQS6urpBxsbGUGRkZAFubm4AAAAAAAAAAAAAAAAA8IcAAOAHAADAAwAAwAEAAIABAACAAQAAgAcAAIAHAACABwAAgAMAAMABAADAAwAA4AcAAP4fAAD+DwAA/w8AAA=="
	},
	

    //伪装 iPad 2
    {
    	name: "iPad 2",
        ua: "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",
        label: "iPad 2",
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADG0lEQVQ4jW3R708TdxwH8HPGB0fLj0TguN5dCxkLiUSDOrLExDAXf8RHOjKJmTEKrcUftKUdlLrVWQwI18QZ2Nwsa7vatBRaaHtnqdIqFIzgZtzOLtb4wGV/h7lv33uwLIuh7z/glc/7/aGof7Otq6vrF4NeX2rmeaVFEIoCpyt+fuJE0Ts5WbzmdhfdV13FEeeQ4rDbSy6XK+LxeD6g/ks8Ht8ucFyplmHR1L4bDR+1YeeHbdhz8FOM3boN9/gEnNc9sLu/Rb/FAqPR+Nbn8+14D+B1uj+Omy6VZ5Zy6mg0UZ7KyGVvMlWOrq2XpY2NsvT8RTn/8pU65vOXu0+eLG0BdCyrfNl/GbnlHAnML2JubgaR2D3IhSyevVhB/skaXhafk/Hb0/js0KHXWwCWZRXboAOp5QKJLspISmkkMzIyS6tYX/sN+fVNFH4tkQnRi086O7cCDMsqww47Ftb/JDG5gHQijGQ6hmxiBfn5x5BWn2Jh8y8yNjqKXe3tlQBGcdhHUHgYJXImguXlVeTyjyDJElL37yObXMTjWJhc99xAc7OhUgVGGfpqBIn4PJEWQ0iml5B9kMXcXByhcBSZRAKZoJ98/c018DxfeQPLgAW53ApJxFOQ0hLSqRRkWYaUlrCQTCFfeEJs1kFwlQCdTqcY+0y4e9dHfvj+DkKhewgGgwgEAggEgpiZ+Rmz0RgxGk2VL+A4Tunu/gI/3vmJTEyK8Hq9EEUvRFHEpOjFzfEJTE1Nk1OneqDX6ysDhw8fgcvpJDarDVaLBTabFTbbICwWKwasVjiGRsjRI8dgMFQYURAEZW9HBy5ZnaTn9Bn0mi7iXJ8ZvefPwnShD2dO92BooJ907N0HQ6UvcBz/+8cde9SLwdy73uFRdco/q96YDqk3x4dV8TuP6nGcU1dD5nf7Ow+oer3wagvQ0tLyRqvVoJFtAtPEgGEY8IIAXtBjZ0MjGpkGsLpGVFdXo7W19W+z2fw/QFEUpdVqr9TW1vo1VVV+mqbDNE1HampqonV1dRENTUdoWhOuqtL4NRqNv76+3k5R1DaKoqh/AOus3HSfnM0iAAAAAElFTkSuQmCC"
	},{
	    name: "分隔线",
	},
	

    //  伪装 Nokia E72
    {
    	name: "Nokia",
        ua: "Mozilla/5.0 (SymbianOS/9.3; Series60/3.2 NokiaE72-1/021.021; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/525 (KHTML, like Gecko) Version/3.0 BrowserNG/7.1.16352",
        label: "Nokia",
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC/UlEQVQ4jaXTTUzTdwDG8e6ymO0wjdE5rPZf+f/+f0p9x2haeVkt4EsDCMqLOkAgWFGIOxg1MwozzrEpFCxvFYpS0FCoSGs0S8BNtxBFUEzIdBU06RZC0gU1btnFw9db1cRdtsNzeC6f0/NogA/+TzRvF9fAk0/sLSMlOTVD7rRTt4YtlTeC1sofgylVP41lnxnq3e28c8Decke8F+j5JRRnOTrwq1oWINruR7b7UfcFEGUB1LIAyl4/8l4/5kM/zGw9eTP/HSAUejHHVjkQXFzow2jvR190Gbm4D32RD22+F6nQR8yeKxjt/ailfawqv/oq88SgKQIcbBku0X/hxVDsQ93dQ0H1ILYjVyn8bpC26w8pd95CLvBiKO7FUOIjpqiXdeX+zgiws2rw/JK8SxgKupFyPNx/+JS//n5JeCbM71NTwD80+O4i5XSh5nej5ncTV+p7FAE+3+8bETmdqHldSJnnGR6f5PnLZ2yuuMiCTY10XhshPBMmdocHJfciSm4XKwovTUWAVbs8E0rWBWK2dyCltTL26ClXbtxnfmozC21uDpy+znR4muV57chZHajbOjDmembeANnuCTXDjZrhRtrUzOh4EE//baKSm9FudFFxKkDojxBLs84h0tyIDDexWe1vgOXpzjHZ1opic6FLdnJ7dJz23p9ZaHGitTay/+s+Hk8+Zml6M/JmF8LmIja9bToCGCxVXpHqQkltYlFSHXdHH+Dpucln8XVoE+upON7Dk8nfMG5xEm1tQk5pwrilJRgB5kXbKmJSWhGWsyxJdFB68ALZ9lZ0CXXok85iyW6g/CsP6gYHssWJYm1CWV/ljQAazSydMJ/8UyQ1IBJq0a6pRrv2e0SCA5HgQDKdISquGjm+FpFYj5pUz3x528Z3pvzRbDUjet03z9X4RpT19cgmB4qpBsVUgzDXIsx1qPENCHMNn+ozj773TJoP5xrmRCV/qzXuG9KtOByUVh8LSauPh3Qrj0wsWvblvXm6rY2zPl5s/dc3/pe8BiACa2LAfOYnAAAAAElFTkSuQmCC"
	},
	

    //伪装 日本DoCoMo手机
    {
    	name: "DoCoMo",
        ua: "DoCoMo/1.0/P502i/c10 (Google CHTML Proxy/1.0)",
        label: "DoCoMo",
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWM4w2D8nxLMMGoAwoCXk1f+P8Ng/P//////X05c/v+2Zy5pBvz//598F7ycuPw/DMDY14xjUPjYaLgBMHDbMxcrfcsDuzhRLoApRKYxXDA4onEEGwAAOydBL6/POBgAAAAASUVORK5CYII="
	},

	
	//伪装 UCBrowser
    {
	    name: "UCBrowser",
        ua: "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; Desktop) AppleWebKit/534.13 (KHTML, like Gecko) UCBrowser/8.9.0.251",
        label: "UCBrowser",
        img: "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAACAcAAAgHAAAAAAAAAAAAAAAAAAAAAAAAD5y8QA+cvEBPnLxIz5y8XM+cvG2PnLx0z5y8dM+cvG2PnLxcz5y8SM+cvEBPnLxAAAAAAAAAAAAAAAAAD5y8QA+cvEIPnLxYz5y8dU+cvH8PnLx/z5y8f8+cvH/PnLx/z5y8fw+cvHVPnLxYz5y8Qg+cvEAAAAAAD5y8QA+cvEHPnLxgj5y8fY+cvH/PHHx/z1x8f89cvH/PHDx/ztw8f88cfH/PnLx/z5y8fY+cvGCPnLxBz5y8QA+cvEAPnLxZD5y8fY+cvH/QXTx/2KL8P9bhe7/Un/u/3ma7v+HpfD/YIrw/z5y8f8+cvH/PnLx9j5y8WQ+cvEAPnLxJD5y8dM+cvH/PnLx/4up8f+yxPD/qLzv/67B8P+pvfD/xdHx/1iE8P89cfH/PnLx/z5y8f8+cvHTPnLxJD5y8XM+cvH8PXHx/1B/8P/X3/P/mLDv/6u+8P+ftvH/prrv/6e88f9Ac/D/PXHx/z5y8f8+cvH/PnLx/D5y8XM+cvG1PnLx/zxx8f9ahvH/5+r1/5Su8P+Qq+//qLzx/6q+8v+kuvH/ssTz/4mn8P9Me/D/PXHx/z5y8f8+cvG1PnLx0j5y8f89cvH/SXnx/87Z9f/e5fb/kKvv/5mx7/+nu/D/ssTy/7TG8v+ovfL/WITw/z1x8f8+cvH/PnLx0j5y8dI+cvH/PnLx/zxx8f90mfL/7vH5/+br+P+XsO//epvt/7XG8v/j6Pf/8PL4/2iP8f88cPH/PnLx/z5y8dI+cvG1PnLx/z5y8f8+cvH/PHHx/6C49P////z/7PD6/2yS8f+CovL/6+/5/6m+9f9Fd/H/PnLx/z5y8f8+cvG1PnLxcz5y8fw+cvH/QXTw/0188P+et/T///79//7+/f+GpvL/RHbw/4Sj8f9Fd/H/PXHx/z5y8f8+cvH8PnLxcz5y8SQ+cvHTPnLx/0F08P+NqvL/7fH7/////v/k6vr/Y4zx/zxx8f8/c/H/PnLx/z5y8f8+cvH/PnLx0z5y8SQ+cvEAPnLxZD5y8fY9cvH/Rnfx/3aa8v+PrPT/ZI3y/z5y8f8+cvH/PnLx/z5y8f8+cvH/PnLx9j5y8WQ+cvEAPnLxAD5y8Qc+cvGCPnLx9j5y8f87cPH/O3Dx/zxx8f8+cvH/PnLx/z5y8f8+cvH/PnLx9j5y8YI+cvEHPnLxAAAAAAA+cvEAPnLxCD5y8WM+cvHVPnLx/D5y8f8+cvH/PnLx/z5y8f8+cvH8PnLx1T5y8WM+cvEIPnLxAAAAAAAAAAAAAAAAAD5y8QA+cvEBPnLxIz5y8XM+cvG2PnLx0z5y8dM+cvG2PnLxcz5y8SM+cvEBPnLxAAAAAAAAAAAA4AcAAMADAACAAQAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAIABAADAAwAA4AcAAA=="
	},
	


		// 添加UA，到此结束
	],

	UANameIdxHash : [],

	// ----- 下面设置开始 -----
	// defautl: ステータスバーの右端に表示する
	TARGET : null, // 定义一个target，用来调整状态栏顺序,null为空

	ADD_OTHER_FX : false, // true:自动添加其他版本firefox的ua  false:不添加
	
	//2种版本firefox，下面请勿修改
	EXT_FX_LIST : [{
			name : "Firefox4.0",
			ua : "Mozilla/5.0 (Windows; Windows NT 6.1; rv:2.0b2) Gecko/20100720 Firefox/4.0b2",
			label : "Fx4.0",
			img : ""
		}, {
			name : "Firefox3.6",
			ua : "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8",
			label : "Fx3.6",
			img : ""
		},
	],
	// ----------------------
	// UA リストのインデックス
	def_idx : 0,
	Current_idx : 0,

	// 初期化
	init : function () {
		this.mkData(); // UA データ(UA_LIST)を作る
		this.mkPanel(); // パネルとメニューを作る
		this.setSiteIdx();
		// Observer 登録
		var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
		os.addObserver(this, "http-on-modify-request", false);
		os.addObserver(this.onDocumentCreated, "content-document-global-created", false);
		// イベント登録
		var contentArea = document.getElementById("appcontent");
		contentArea.addEventListener("load", this, true);
		contentArea.addEventListener("select", this, false);
		var contentBrowser = this.getContentBrowser();
		contentBrowser.tabContainer.addEventListener("TabClose", this, false);
		window.addEventListener("unload", this, false);
	},
	onDocumentCreated : function (aSubject, aTopic, aData) {
		var aChannel = aSubject.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIWebNavigation).QueryInterface(Ci.nsIDocShell).currentDocumentChannel;
		if (aChannel instanceof Ci.nsIHttpChannel) {
			var navigator = aSubject.navigator;
			var userAgent = aChannel.getRequestHeader("User-Agent");
			if (navigator.userAgent != userAgent)
				Object.defineProperty(XPCNativeWrapper.unwrap(navigator), "userAgent", {
					value : userAgent,
					enumerable : true
				});
		}
	},
	// UA データを作る
	mkData : function () {
		var ver = this.getVer(); // 現在使っている Firefox のバージョン
		// 現在使っている Firefox のデータを作る
		var tmp = [];
		tmp.name = "Firefox" + ver;
		tmp.ua = "";
		tmp.img = this.NOW_UA_IMG;
		tmp.label = "Fx" + (this.ADD_OTHER_FX ? ver : "");
		this.UA_LIST.unshift(tmp);
		// Fx のバージョンを見て UA を追加する
		if (this.ADD_OTHER_FX) {
			if (ver == 3.6) { // Fx3.6 の場合 Fx4 を追加する
				this.EXT_FX_LIST[0].img = this.EXT_FX_LIST_IMG;
				this.UA_LIST.push(this.EXT_FX_LIST[0]);
			} else { // Fx3.6 以外では Fx3.6 を追加する
				this.EXT_FX_LIST[1].img = this.EXT_FX_LIST_IMG;
				this.UA_LIST.push(this.EXT_FX_LIST[1]);
			}
		}
		// 起動時の UA を 初期化 (general.useragent.override の値が有るかチェック 07/03/02)
		var preferencesService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
		if (preferencesService.getPrefType("general.useragent.override") != 0) {
			for (var i = 0; i < this.UA_LIST.length; i++) {
				if (preferencesService.getCharPref("general.useragent.override") == this.UA_LIST[i].ua) {
					this.def_idx = i;
					break;
				}
			}
		}
	},
	// UA パネルを作る
	mkPanel : function () {
		var uacPanel = document.createElement("toolbarbutton");
		uacPanel.setAttribute("id", "uac_statusbar_panel");
		uacPanel.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		uacPanel.setAttribute("type", "menu");
		// css 解决按钮定义在urlbar-icons撑大地址栏，变宽……
		document.insertBefore(document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(
		'\
		#uac_statusbar_panel {\
		  -moz-appearance: none !important;\
		  border-style: none !important;\
		  border-radius: 0 !important;\
		  padding: 0 3px !important;\
		  margin: 0 !important;\
		  background: transparent !important;\
		  box-shadow: none !important;\
		  -moz-box-align: center !important;\
		  -moz-box-pack: center !important;\
		  min-width: 18px !important;\
		  min-height: 18px !important;\
		          }\
		#uac_statusbar_panel > .toolbarbutton-icon {\
			max-width: 18px !important;\
		    padding: 0 !important;\
		    margin: 0 !important;\
		}\
		#uac_statusbar_panel dropmarker{display: none !important;}\
		    ') + '"'), document.documentElement);

		uacPanel.setAttribute("image", this.UA_LIST[this.def_idx].img);
		uacPanel.style.padding = "0px 2px";

		var toolbar = document.getElementById("urlbar-icons");
		if (this.TARGET != null) { // default から書き換えている場合
			this.TARGET = document.getElementById(this.TARGET);
		}
		toolbar.insertBefore(uacPanel, this.TARGET);
		// UA パネルのコンテクストメニューを作る
		var PopupMenu = document.createElement("menupopup");
		PopupMenu.setAttribute("id", "uac_statusbar_panel_popup");
		for (var i = 0; i < this.UA_LIST.length; i++) {
			if (this.UA_LIST[i].name == "分隔线") {
				var mi = document.createElement("menuseparator");
				PopupMenu.appendChild(mi);
			} else {
				var mi = document.createElement("menuitem");

				mi.setAttribute('label', this.UA_LIST[i].name);
				mi.setAttribute('tooltiptext', this.UA_LIST[i].ua);
				mi.setAttribute('oncommand', "ucjs_UAChanger.setUA(" + i + ");");

				if (this.DISPLAY_TYPE) {
					mi.setAttribute('class', 'menuitem-iconic');
					mi.setAttribute('image', this.UA_LIST[i].img);
				} else {
					mi.setAttribute("type", "radio");
					mi.setAttribute("checked", i == this.def_idx);
				}
				if (i == this.def_idx) {
					mi.setAttribute("style", 'font-weight: bold;');
					mi.style.color = 'red';
				} else {
					mi.setAttribute("style", 'font-weight: normal;');
					mi.style.color = 'black';
				}
				mi.setAttribute("uac-generated", true);
				PopupMenu.appendChild(mi);
			}
		}
		uacPanel.addEventListener("popupshowing", this, false);
		uacPanel.appendChild(PopupMenu);

		// パネルの変更を可能にする
		uacPanel.setAttribute("context", "uac_statusbar_panel_popup");
		uacPanel.setAttribute("onclick", "event.stopPropagation();");
	},
	// URL 指定で User-Agent の書き換え(UserAgentSwitcher.uc.js より)
	observe : function (subject, topic, data) {
		if (topic != "http-on-modify-request")
			return;
		var http = subject.QueryInterface(Ci.nsIHttpChannel);
		for (var i = 0; i < this.SITE_LIST.length; i++) {
			if (http.URI && (new RegExp(this.SITE_LIST[i].url)).test(http.URI.spec)) {
				var idx = this.SITE_LIST[i].idx;
				http.setRequestHeader("User-Agent", this.UA_LIST[idx].ua, false);
			}
		}
	},
	// イベント・ハンドラ
	handleEvent : function (aEvent) {
		var contentBrowser = this.getContentBrowser();
		var uacPanel = document.getElementById("uac_statusbar_panel");
		var uacMenu = document.getElementById("uac_statusbar_panel_popup");
		switch (aEvent.type) {
		case "popupshowing": // コンテクスト・メニュー・ポップアップ時にチェック・マークを更新する
			var menu = aEvent.target;
			for (var i = 0; i < menu.childNodes.length; i++) {
				if (i == ucjs_UAChanger.Current_idx) {
					menu.childNodes[i].setAttribute("style", 'font-weight: bold;');
					menu.childNodes[i].style.color = 'red';
					if (!this.DISPLAY_TYPE)
						menu.childNodes[i].setAttribute("checked", true);
				} else {
					menu.childNodes[i].setAttribute("style", 'font-weight: normal;');
					menu.childNodes[i].style.color = 'blue';
				}
			}
			break;
		case "load": // SITE_LIST に登録された URL の場合
		case "select":
		case "TabClose":
			for (var i = 0; i < ucjs_UAChanger.SITE_LIST.length; i++) {
				if ((new RegExp(this.SITE_LIST[i].url)).test(contentBrowser.currentURI.spec)) {
					var idx = this.SITE_LIST[i].idx;
					this.setImage(idx);
					return;
				}
			}
			this.setImage(this.def_idx);

			break;
		case "unload": // 終了処理
			var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
			os.removeObserver(this, "http-on-modify-request");
			os.removeObserver(this.onDocumentCreated, "content-document-global-created");
			var contentArea = document.getElementById("appcontent");
			contentArea.removeEventListener("load", this, true);
			contentArea.removeEventListener("select", this, false);
			if (contentBrowser)
				contentBrowser.tabContainer.removeEventListener("TabClose", this, false);
			uacMenu.removeEventListener("popupshowing", this, false);
			window.removeEventListener("unload", this, false);
			break;
		}
	},
	// 番号を指定して UA を設定
	setUA : function (i) {
		var preferencesService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
		if (i == 0) { // オリジナル UA にする場合
			// 既にオリジナル UA の場合は何もしない
			if (preferencesService.getPrefType("general.useragent.override") == 0)
				return;
			preferencesService.clearUserPref("general.useragent.override");
		} else { // 指定した UA にする場合
			preferencesService.setCharPref("general.useragent.override", this.UA_LIST[i].ua);
		}
		this.def_idx = i;
		this.setImage(i);
	},
	// UA パネル画像とツールチップを設定
	setImage : function (i) {
		var uacPanel = document.getElementById("uac_statusbar_panel");

		uacPanel.setAttribute("image", this.UA_LIST[i].img);
		uacPanel.style.padding = "0px 2px";

		this.Current_idx = i;
	},
	// アプリケーションのバージョンを取得する(Alice0775 氏のスクリプトから頂きました。)
	getVer : function () {
		var info = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULAppInfo);
		var ver = parseInt(info.version.substr(0, 3) * 10, 10) / 10;
		return ver;
	},
	setSiteIdx : function () {
		for (let i = 0; i < this.UA_LIST.length; i++) {
			this.UANameIdxHash[this.UA_LIST[i].name] = i;
		}
		for (let j = 0; j < this.SITE_LIST.length; j++) {
			var uaName = this.SITE_LIST[j].Name;
			if (this.UANameIdxHash[uaName]) {
				this.SITE_LIST[j].idx = this.UANameIdxHash[uaName];

			} else {
				this.SITE_LIST[j].idx = this.def_idx;

			}
		}
	},
	// 現在のブラウザオブジェクトを得る。
	getContentBrowser : function () {
		var windowMediator = Cc["@mozilla.org/appshell/window-mediator;1"]
			.getService(Ci.nsIWindowMediator);
		var topWindowOfType = windowMediator.getMostRecentWindow("navigator:browser");
		if (topWindowOfType)
			return topWindowOfType.document.getElementById("content");
		return null;
	}
}
ucjs_UAChanger.init();
