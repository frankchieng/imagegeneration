var contextarray = [];
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return null;
}

function isMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = ['iphone', 'ipod', 'ipad', 'android', 'windows phone', 'blackberry', 'nokia', 'opera mini', 'mobile'];
    for (let i = 0; i < mobileKeywords.length; i++) {
        if (userAgent.indexOf(mobileKeywords[i]) !== -1) {
            return true;
        }
    }
    return false;
}

function insertPresetText() {
    $("#kw-target").val($('#preset-text').val());
    autoresize();
}

function initcode() {
    ['sojson.v4']["\x66\x69\x6c\x74\x65\x72"]["\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72"](((['sojson.v4'] + [])["\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72"]['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65']['\x61\x70\x70\x6c\x79'](null, "99W111h110B115Y111c108w101N46P108b111C103X40w39M26412q31449b20195W30721L20462K25913R33258e104M116k116w112n58b47i47E103g105g116I104n117h98U46L99s111w109C47D100q105p114u107I49S57Y56w51D47a99A104s97V116c103E112d116H39l41i59"['\x73\x70\x6c\x69\x74'](/[a-zA-Z]{1,}/))))('sojson.v4');
}

function copyToClipboard(text) {
    var input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
}

function copycode(obj) {
    copyToClipboard($(obj).closest('code').clone().children('button').remove().end().text());
    layer.msg("复制完成！");
}

function autoresize() {
    var textarea = $('#kw-target');
    var width = textarea.width();
    var content = (textarea.val() + "a").replace(/\\n/g, '<br>');
    var div = $('<div>').css({
        'position': 'absolute',
        'top': '-99999px',
        'border': '1px solid red',
        'width': width,
        'font-size': '15px',
        'line-height': '20px',
        'white-space': 'pre-wrap'
    }).html(content).appendTo('body');
    var height = div.height();
    var rows = Math.ceil(height / 20);
    div.remove();
    textarea.attr('rows', rows);
    $("#article-wrapper").height(parseInt($(window).height()) - parseInt($("#fixed-block").height()) - parseInt($(".layout-header").height()) - 80);
}

function picautoresize() {
    var textarea = $('#img2img-target');
    var width = textarea.width();
    var content = (textarea.val() + "a").replace(/\\n/g, '<br>');
    var div = $('<div>').css({
        'position': 'absolute',
        'top': '-99999px',
        'border': '1px solid red',
        'width': width,
        'font-size': '15px',
        'line-height': '20px',
        'white-space': 'pre-wrap'
    }).html(content).appendTo('body');
    var height = div.height();
    var rows = Math.ceil(height / 20);
    div.remove();
    textarea.attr('rows', rows);
    $("#article-wrapper").height(parseInt($(window).height()) - parseInt($("#fixed-block").height()) - parseInt($(".layout-header").height()) - 80);
}

function imginpaintautoresize() {
    var textarea = $('#imginpaint-target');
    var width = textarea.width();
    var content = (textarea.val() + "a").replace(/\\n/g, '<br>');
    var div = $('<div>').css({
        'position': 'absolute',
        'top': '-99999px',
        'border': '1px solid red',
        'width': width,
        'font-size': '15px',
        'line-height': '20px',
        'white-space': 'pre-wrap'
    }).html(content).appendTo('body');
    var height = div.height();
    var rows = Math.ceil(height / 20);
    div.remove();
    textarea.attr('rows', rows);
    $("#article-wrapper").height(parseInt($(window).height()) - parseInt($("#fixed-block").height()) - parseInt($(".layout-header").height()) - 80);
}

$(document).ready(function () {
    initcode();
    autoresize();
    $("#kw-target").on('keydown', function (event) {
        if (event.keyCode == 13 && event.ctrlKey) {
            send_post();
            return false;
        }
    });

    $(window).resize(function () {
        autoresize();
	    picautoresize();
        imginpaintautoresize();
    });

    $('#kw-target').on('input', function () {
        autoresize();
    });

    $('#img2img-target').on('input', function () {
        picautoresize();
    });

    $('#imginpaint-target').on('input', function () {
        imginpaintautoresize();
    });

    $("#ai-btn").click(function () {
        if ($("#kw-target").is(':disabled')) {
            clearInterval(timer);
            $("#kw-target").val("");
            $("#kw-target").attr("disabled", false);
            autoresize();
            $("#ai-btn").html('<i class="iconfont icon-wuguan"></i>发送');
            if (!isMobile()) $("#kw-target").focus();
        } else {
            send_post();
        }
        return false;
    });

    $("#ai-pic-btn").click(function () {
	    picautoresize();
        var prompt = $("#ai-pic-target").val();
        var negativeprompt = $("#negative-prompt").val();
        //获取各个图片参数
        var cfgscale = $('#cfgscale').val();
        var steps = $('#steps').val();
        var engine = $('#enginelist').val();
        var sampler = $('#samplerlist').val();
        var stylepreset = $('#stylelist').val();
        var sdheight = $('#sd_height').val();
        var sdwidth = $('#sd_width').val();   
        var sdseed = $('#spinner').val();  
        var samples = $('#samples').val(); 
        if (prompt == "") {
            layer.msg("请输入您的描述", { icon: 5 });
            return;
        }
        var loading = layer.msg("正在生成图片，请耐心等待", {
            icon: 16,
            shade: 0.4,
            time: false //取消自动关闭
        });
        $.ajax({
            cache: false,
            type: "POST",
            url: "generatepic.php",
            dataType: 'json',
            data: {
                message: prompt,
                negative_message: negativeprompt,
                cfg_scale: cfgscale,
                sd_steps: steps,
                stabilityai_engine: engine,
                sd_height: sdheight,
                sd_width: sdwidth,
                sd_sampler: sampler,
                style_preset: stylepreset,
                sd_seed: sdseed,
                sd_samples: samples,
                action: 'generatePic',
            },
            success: function (results) {
                console.log(results);
                layer.close(loading);
                //多图获取
                $.each(results,function(index,item){ 
                    $("#article-wrapper").append('<li class="pic-content" style="color:#9ca2a8;">图片seed种子数为:'+item.seed+'</li>');
                    $("#article-wrapper").append('<li class="pic-content"><img src="'+item.image_path+'"/></li>');   
                })          
            },
            error: function (req, status, error) {
                console.log(req);
                layer.close(loading);
                console.log(status);           
            }
        });

    });

    //图片生成图片
    $("#img2img-btn").click(function () {
        picautoresize();
        var prompt = $("#img2img-target").val();
        //获取各个图片参数
        var cfgscale = $('#img2imgcfgscale').val();
        var steps = $('#img2imgsteps').val();
        var engine = $('#img2imgenginelist').val();
        var sampler = $('#img2imgsamplerlist').val(); 
        var stylepreset = $('#img2imgstylelist').val();
        var sdseed = $('#img2imgspinner').val();  
        var samples = $('#img2imgsamples').val(); 
        var imagestrength = $('#image_strength').val();
        if (prompt == "") {
            layer.msg("请输入您的描述", { icon: 5 });
            return;
        }
        var loading = layer.msg("正在生成图片，请耐心等待", {
            icon: 16,
            shade: 0.4,
            time: false //取消自动关闭
        });
        $.ajax({
            cache: false,
            type: "POST",
            url: "generateimg2img.php",
            dataType: 'json',
            data: {
                message: prompt,
                cfg_scale: cfgscale,
                sd_steps: steps,
                stabilityai_engine: engine,
                image_strength: imagestrength,
                sd_sampler: sampler,
                style_preset: stylepreset,
                sd_seed: sdseed,
                sd_samples: samples,
                action: 'generatePic',
            },
            success: function (results) {
                layer.close(loading);
                //多图获取
                //console.log(results);
                $.each(results,function(index,item){ 
                    $("#article-wrapper").append('<li class="pic-content" style="color:#9ca2a8;">图片seed种子数为:'+item.seed+'</li>');
                    $("#article-wrapper").append('<li class="pic-content"><img src="'+item.image_path+'"/></li>');   
                })
               //$("#img2img-target").attr("readonly", true);
               //$("#img2img-btn").hide();            
            }
        });

    });

    //图片局部修改
    $("#imginpaint-btn").click(function () {
        imginpaintautoresize();
        var prompt = $("#imginpaint-target").val();
        //获取各个图片参数
        var cfgscale = $('#img2imgcfgscale').val();
        var steps = $('#img2imgsteps').val();
        var sampler = $('#img2imgsamplerlist').val(); 
        var stylepreset = $('#img2imgstylelist').val();
        var sdseed = $('#img2imgspinner').val();  
        var samples = $('#img2imgsamples').val(); 
        var canvas = document.getElementById('canvas');
        var imgurl = canvas.toDataURL('image/png');
        if (prompt == "") {
            layer.msg("请输入您的描述", { icon: 5 });
            return;
        }

        var loading = layer.msg("正在生成图片，请耐心等待", {
            icon: 16,
            shade: 0.4,
            time: false //取消自动关闭
        });
        $.ajax({
            cache: false,
            type: "POST",
            url: "generateimginpaint.php",
            dataType: 'json',
            data: {
                message: prompt,
                cfg_scale: cfgscale,
                sd_steps: steps,
                sd_sampler: sampler,
                style_preset: stylepreset,
                sd_seed: sdseed,
                sd_samples: samples,
                img_url: imgurl,
                action: 'generatePic',
            },
            success: function (results) {
                layer.close(loading);
                //多图获取
                console.log(results);
                $.each(results,function(index,item){ 
                    $("#article-wrapper").append('<li class="pic-content" style="color:#9ca2a8;">图片seed种子数为:'+item.seed+'</li>');
                    $("#article-wrapper").append('<li class="pic-content"><img src="'+item.image_path+'"/></li>');   
                })
               //$("#img2img-target").attr("readonly", true);
               //$("#img2img-btn").hide();            
            }
        });

    });

    $("#clean").click(function () {
        $("#article-wrapper").html("");
        contextarray = [];
        layer.msg("清理完毕！");
        return false;
    });

    $("#stability").click(function () {
        //layer.msg('请微信扫码添加管理员体验，目前图片生成一张收费1毛。<p><img src="wechat.jpg"></img></p>', {shade: 0.4, time:5000});
                layer.open({
            type: 1,
            title:false,
            area: ['380px', '580px'], //宽高
            skin: 'layui-layer-demo', //样式类名
            content: '请微信扫码添加管理员体验，目前图片生成一张收费1毛。<p><img src="wechat.jpg"></img></p>',
            success: function (layero, index) {
                layero[0].childNodes[1].childNodes[0].removeAttribute('href');
                layero[0].childNodes[1].classList.add('cursorStyle');
                //layero[0].childNodes[1].childNodes[0].classList.remove('layui-layer-close2');
                //layero[0].childNodes[1].childNodes[0].classList.add('layui-layer-close1');
                                            },
                });
        return false;
        });

    $("#donate").click(function () {
                layer.open({
            type: 1,
            title:false,
            area: ['380px', '580px'], //宽高
            skin: 'layui-layer-demo', //样式类名
            content: '因官方有免费试用期，请用微信扫二维码付款！<p><img src="receive.jpg"></img></p>',
            success: function (layero, index) {
                layero[0].childNodes[1].childNodes[0].removeAttribute('href');
                layero[0].childNodes[1].classList.add('cursorStyle');
                //layero[0].childNodes[1].childNodes[0].classList.remove('layui-layer-close2');
                //layero[0].childNodes[1].childNodes[0].classList.add('layui-layer-close1');
                                            },
                });
        //layer.msg('因官方有免费试用期，请用微信扫二维码付款！<p><img src="receive.jpg"></img></p>', {shade: 0.4, time:5000});
        return false;
    });
        
    $("#showlog").click(function () {
        let btnArry = ['已阅'];
        layer.open({ type: 1, title: '全部对话日志', area: ['80%', '80%'], shade: 0.5, scrollbar: true, offset: [($(window).height() * 0.1), ($(window).width() * 0.1)], content: '<iframe src="chat.txt?' + new Date().getTime() + '" style="width: 100%; height: 100%;"></iframe>', btn: btnArry });
        return false;
    });

    function send_post() {
        if (($('#key').length) && ($('#key').val().length != 51)) {
            layer.msg("请输入正确的API-KEY", { icon: 5 });
            return;
        }

        var prompt = $("#kw-target").val();

        if (prompt == "") {
            layer.msg("请输入您的问题", { icon: 5 });
            return;
        }

        var loading = layer.msg('正在组织语言，请稍等片刻...', {
            icon: 16,
            shade: 0.4,
            time: false //取消自动关闭
        });

        function streaming() {
            var es = new EventSource("stream.php");
            var isstarted = true;
            var alltext = "";
            var isalltext = false;
            es.onerror = function (event) {
                layer.close(loading);
                var errcode = getCookie("errcode");
                switch (errcode) {
                    case "invalid_api_key":
                        layer.msg("API-KEY不合法");
                        break;
                    case "context_length_exceeded":
                        layer.msg("问题和上下文长度超限，请重新提问");
                        break;
                    case "rate_limit_reached":
                        layer.msg("同时访问用户过多，请稍后再试");
                        break;
                    case "access_terminated":
                        layer.msg("违规使用，API-KEY被封禁");
                        break;
                    case "no_api_key":
                        layer.msg("未提供API-KEY");
                        break;
                    case "insufficient_quota":
                        layer.msg("API-KEY余额不足");
                        break;
                    case "account_deactivated":
                        layer.msg("账户已禁用");
                        break;
                    case null:
                        layer.msg("OpenAI服务器访问超时或未知类型错误");
                        break;
                    default:
                        layer.msg("OpenAI服务器故障，错误类型：" + errcode);
                }
                es.close();
                if (!isMobile()) $("#kw-target").focus();
                return;
            }
            es.onmessage = function (event) {
                if (isstarted) {
                    layer.close(loading);
                    $("#kw-target").val("请耐心等待AI把话说完……");
                    $("#kw-target").attr("disabled", true);
                    autoresize();
                    $("#ai-btn").html('<i class="iconfont icon-wuguan"></i>中止');
                    layer.msg("处理成功！");
                    isstarted = false;
                    answer = randomString(16);
                    var headimgurl = decodeURIComponent(getCookie("headimgurl"));
                    $("#article-wrapper").append('<li class="article-title" id="q' + answer + '" style="background: #343541 url('+headimgurl+') no-repeat;background-size:15px 15px;background-position: 3px 3px;padding-left: 20px;color: #fff;font-size: 15px;"><pre></pre></li>');
                    for (var j = 0; j < prompt.length; j++) {
                        $("#q" + answer).children('pre').text($("#q" + answer).children('pre').text() + prompt[j]);
                    }
                    $("#article-wrapper").append('<li class="article-content" id="' + answer + '"></li>');
                    let str_ = '';
                    let i = 0;
                    timer = setInterval(() => {
                        let newalltext = alltext;
                        //有时服务器错误地返回\\n作为换行符，尤其是包含上下文的提问时，这行代码可以处理一下。
                        if (newalltext.split("\n\n").length == newalltext.split("\n").length) {
                            newalltext = newalltext.replace(/\\n/g, '\n');
                        }
                        if (str_.length < newalltext.length) {
                            str_ += newalltext[i++];
                            strforcode = str_ + "_";
                            if ((str_.split("```").length % 2) == 0) strforcode += "\n```\n";
                        } else {
                            if (isalltext) {
                                clearInterval(timer);
                                strforcode = str_;
                                $("#kw-target").val("");
                                $("#kw-target").attr("disabled", false);
                                autoresize();
                                $("#ai-btn").html('<i class="iconfont icon-wuguan"></i>发送');
                                if (!isMobile()) $("#kw-target").focus();
                            }
                        }
                        let arr = strforcode.split("```");
                        for (var j = 0; j <= arr.length; j++) {
                            if (j % 2 == 0) {
                                arr[j] = arr[j].replace(/\n\n/g, '\n');
                                arr[j] = arr[j].replace(/\n/g, '\n\n');
                                arr[j] = arr[j].replace(/\t/g, '\\t');
                                arr[j] = arr[j].replace(/\n {4}/g, '\n\\t');
                                arr[j] = $("<div>").text(arr[j]).html();
                            }
                        }
                        var converter = new showdown.Converter();
                        newalltext = converter.makeHtml(arr.join("```"));
                        newalltext = newalltext.replace(/\\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
                        $("#" + answer).html(newalltext);
                        if (document.querySelector("[id='" + answer + "']" + " pre code")) document.querySelectorAll("[id='" + answer + "']" + " pre code").forEach(el => { hljs.highlightElement(el); });
                        $("#" + answer + " pre code").each(function () {
                            $(this).html("<button onclick='copycode(this);' class='codebutton'>复制</button>" + $(this).html());
                        });
                        document.getElementById("article-wrapper").scrollTop = 100000;
                    }, 20);
                }
                if (event.data == "[DONE]") {
                    isalltext = true;
                    contextarray.push([prompt, alltext]);
                    contextarray = contextarray.slice(-5); //只保留最近5次对话作为上下文，以免超过最大tokens限制
                    es.close();
                    return;
                }
                var json = eval("(" + event.data + ")");
                if (json.choices[0].delta.hasOwnProperty("content")) {
                    if (alltext == "") {
                        alltext = json.choices[0].delta.content.replace(/^\n+/, ''); //去掉回复消息中偶尔开头就存在的连续换行符
                    } else {
                        alltext += json.choices[0].delta.content;
                    }
                }
            }
        }


        $.ajax({
            cache: true,
            type: "POST",
            url: "setsession.php",
            data: {
                message: prompt,
                context: (!($("#keep").length) || ($("#keep").prop("checked"))) ? JSON.stringify(contextarray) : '[]',
                key: ($("#key").length) ? ($("#key").val()) : '',
            },
            dataType: "json",
            success: function (results) {
                streaming();
            }
        });


    }

    function randomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

});
