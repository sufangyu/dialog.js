/*
 * dialog
 * http://sufangyu.github.io
 * 1.0.3(2016-07-15)
 */
;(function(win,$){

    /*
     * Private methods
     */
    var wrap, overlay, content, title, close, cancelBtn, okBtn, delBtn, settings, timer, aTimer;

    var _renderDOM = function(){
        if( $('.dialog-wrap').length > 0){
            return;
        }

        clearTimeout(timer);
        clearTimeout(aTimer);
        settings.onBeforeShow();

        $('body').append( dialogWrapper = $('<div class="dialog-wrap '+ settings.dialogClass +'"></div>') );
        dialogWrapper.append(
            overlay = $('<div class="dialog-overlay"></div>'),
            content = $('<div class="dialog-content dialog-content-animate"></div>')
        );
        solveTapBug = $('<div class="solve-tap-bug" style="margin:0;padding:0;border:none;background:rgba(255,255,255,0.01); -webkit-tap-highlight-color:rgba(0,0,0,0); width:100%; height:100%; position:fixed; top:0px; left:0px;"></div>').insertBefore(dialogWrapper);


        switch (settings.type){
            case 'alert' :
                if(settings.showTitle){
                    content.append(
                        title = $('<div class="dialog-content-hd"><h4 class="dialog-content-title">'+ settings.titleText +'</h4></div>')
                    );
                }
                content.append(
                    contentBd = $('<div class="dialog-content-bd">'+ settings.contentHtml +'</div>')
                );
                content.append(
                    contentFt = $('<div class="dialog-content-ft"></div>')
                );
                contentFt.append(
                    okBtn = $('<button class="dialog-btn dialog-btn-ok '+ settings.buttonClass.ok +'" >'+ settings.buttonText.ok +'</button>')
                );
                break;

            case 'confirm' :
                if(settings.showTitle){
                    content.append(
                        title = $('<div class="dialog-content-hd"><h4 class="dialog-content-title">'+ settings.titleText +'</h4></div>')
                    );
                }
                content.append(
                    contentBd = $('<div class="dialog-content-bd">'+ settings.contentHtml +'</div>')
                );
                content.append(
                    contentFt = $('<div class="dialog-content-ft"></div>')
                );
                contentFt.append(
                    cancelBtn = $('<button class="dialog-btn dialog-btn-cancel '+ settings.buttonClass.cancel +'" >'+ settings.buttonText.cancel +'</button>'),
                    okBtn = $('<button class="dialog-btn dialog-btn-ok '+ settings.buttonClass.ok +'" >'+ settings.buttonText.ok +'</button>')
                );
                break;

            case 'info' :
                var infoContent = settings.contentHtml || '<img class="info-icon" src="'+ settings.infoIcon +'" alt="'+ settings.infoText +'" /><p class="info-text">'+ settings.infoText +'</p>';
                content.append(
                    contentBd = $('<div class="dialog-content-bd">'+ infoContent +'</div>')
                );
                dialogWrapper.addClass('dialog-wrap-info');
                content.addClass('dialog-content-info').removeClass('dialog-content-animate');
                break;

            case 'tips' :
                var tipsContent = settings.contentHtml || (settings.infoIcon ? '<img class="info-icon" src="'+ settings.infoIcon +'" alt="'+ settings.infoText +'" />' : '') + '<span class="info-text">'+ settings.infoText +'</span>';
                content.append(
                    contentBd = $('<div class="dialog-content-bd">'+ tipsContent +'</div>')
                );
                dialogWrapper.addClass('dialog-wrap-tips');
                content.addClass('dialog-content-tips').removeClass('dialog-content-animate');
                break;
        }

        setTimeout(function(){
            dialogWrapper.addClass('dialog-wrap-show');
            settings.onShow();
            _resize();
        }, 20);

        _setDirectionAndAlign();

        // 解决zepto无法正常获取实际高度造成限制最大高度失效
        setTimeout(function(){
            _setMaxHeight();
            _setDirectionAndAlign();
        }, 100);

    };

    var _setDirectionAndAlign = function(){
      $(contentBd).css({'direction': settings.direction,'text-align': settings.align});
    }

    var _bindEvent = function() {

        touchEvent.tap($(okBtn), function(){
            settings.onClickOk();
            $.dialog.close();
            return false;
        });

        touchEvent.tap($(cancelBtn), function(){
            settings.onClickCancel();
            $.dialog.close();
            return false;
        });

        // overlay clisk hide
        if( settings.overlayClose ){
            touchEvent.tap($(overlay), function(){
                $.dialog.close();
            });
        }

        // auto close, set autoClose and type isn't info
        if( settings.autoClose > 0 ){
            _autoClose();
        }

        // stop body scroll
        $(document).on('touchmove', function(event){
            if( $(dialogWrapper).find($(event.target)).length ){
                return false;
            }else{
                return true;
            }
        });
        _touchScroll();

    };

    var _autoClose = function(){
        clearTimeout(aTimer);
        aTimer = window.setTimeout(function(){
            $.dialog.close();
        }, settings.autoClose);
    };

    var _setMaxHeight = function(){
        var windowHeight = $(window).height();

        $(contentBd).removeAttr('style');
        if( $(content).height() >= windowHeight - 10 ){
            var contentTitleHeight = $(title).height() + parseInt($(title).css('margin-top')) + parseInt($(title).css('margin-bottom')) + parseInt($(title).css('padding-top')) + parseInt($(title).css('padding-bottom'));
            var contentFtHeight = $(contentFt).height() + parseInt($(contentFt).css('margin-top')) + parseInt($(contentFt).css('margin-bottom')) + parseInt($(contentFt).css('padding-top')) + parseInt($(contentFt).css('padding-bottom'));
            var contentBdSpace =  parseInt($(contentBd).css('margin-top')) + parseInt($(contentBd).css('margin-bottom')) + parseInt($(contentBd).css('padding-top')) + parseInt($(contentBd).css('padding-bottom'));

            var contentMaxHeight = windowHeight - contentTitleHeight - contentFtHeight - contentBdSpace - 50;
            $(contentBd).css({'max-height': contentMaxHeight, 'overflow-y':'auto'});
        }
    };

    var _resize = function(){

        $(window).on('resize', function(){
            clearTimeout(rTimer);
            var rTimer = window.setTimeout(function(){
                _setMaxHeight();
            },100);
        });
    };

    var _touchScroll = function(){
        var position = {
            x: 0,
            y: 0,
            top: 0,
            left: 0
        };

        // 滚动条top位置 = 原来的滚动条top - 滚动的距离
        $(contentBd).on("touchstart", function(e) {
            position.x = event.changedTouches[0].clientX,
            position.y = event.changedTouches[0].clientY,
            position.top == 0 && (position.top = $(this).scrollTop()),
            position.left == 0 && (position.left = $(this).scrollLeft())
        }).on("touchmove", function(e) {
            $(this).scrollTop(position.top - event.changedTouches[0].clientY + position.y),
            $(this).scrollLeft(position.left - event.changedTouches[0].clientX + position.x)
        }).on("touchend", function(e) {
            if (position.x != 0 || position.y != 0) {
                // return (event.changedTouches[0].clientY - position.y > 20 || event.changedTouches[0].clientX - position.x > 20) && (e = !1),
                position = {
                    x: 0,
                    y: 0,
                    top: 0,
                    left: 0
                }
            }
            e.preventDefault();
        })
    };

    var touchEvent = {
        tap : function(element, fn){
            if ('ontouchstart' in window || 'ontouchstart' in document) {
                var supportsTouch = true;
            } else if(window.navigator.msPointerEnabled) {
                var supportsTouch = true;
            }

            if(supportsTouch){
                var startTx, startTy;
                element.on('touchstart',function(e){
                    var touches = e.touches ? e.touches[0] : e.originalEvent.touches[0];
                    startTx = touches.clientX;
                    startTy = touches.clientY;
                });

                element.on('touchend',function(e){
                    var touches = e.changedTouches ? e.changedTouches[0] : e.originalEvent.changedTouches[0];
                    endTx = touches.clientX,
                    endTy = touches.clientY;
                    // 在部分设备上 touch 事件比较灵敏，导致按下和松开手指时的事件坐标会出现一点点变化
                    if( Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6 ){
                        fn();
                    }
                    e.preventDefault();
                });
            }else{
                element.on('click',function(e){
                    fn();
                });
            }
        }
    };



    /*
     * Public methods
     */

    $.dialog = function(options) {
        settings = $.extend({}, $.fn.dialog.defaults, options);
        $.dialog.init();
        return this;
    };

    $.dialog.init = function(){
        _renderDOM();
        _bindEvent();
    };


    $.dialog.close = function(){
        settings.onBeforeClosed();

        dialogWrapper.removeClass('dialog-wrap-show');
        timer = setTimeout(function(){
            dialogWrapper.remove();
            settings.onClosed();
        }, 100);

        // cancel stop body scroll
        $(document).on('touchmove', function(event){
            return true;
        });

        // 解决touchend点透，延迟阻止点透层隐藏
        setTimeout(function(){
            solveTapBug.remove();
        }, 350);
    };

    $.dialog.update = function(params) {
        if(params.infoText) {
            content.find('.info-text').html(params.infoText);
        }
        if(params.infoIcon) {
            content.find('.info-icon').attr('src', params.infoIcon);
        }
        if(params.autoClose>0){
            window.setTimeout(function(){
				if(params.onBeforeClosed) { params.onBeforeClosed(); }
                $.dialog.close();
                if(params.onClosed) { params.onClosed(); }
            }, params.autoClose);
        }
    };


    // 插件
    $.fn.dialog = function(options){
        return this;
    };


    $.fn.dialog.defaults = {
        type : 'alert',     // alert、confirm、info、tips
        titleText : '信息提示',
        showTitle : true,
        contentHtml : '',
        dialogClass : '',
        autoClose : 0,
        overlayClose : false,
        drag : false,
        direction: 'ltr',
        align: 'left',

        buttonText : {
            ok : '确定',
            cancel : '取消',
            delete : '删除'
        },
        buttonClass : {
            ok : '',
            cancel : '',
            delete : ''
        },

        infoText : '',      // working in info type
        infoIcon : '',      // working in info type

        onClickOk : function(){},
        onClickCancel : function(){},
        onClickClose : function(){},

        onBeforeShow : function(){},
        onShow : function(){},
        onBeforeClosed : function(){},
        onClosed : function(){}
    }

})(window, window.Zepto || window.jQuery);
