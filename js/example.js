$(document).ready(function(){

	/*  
	 * alert type 
	 */
	$('#btn-01').click(function(){
		$.dialog({
			contentHtml : '<p>我是默认弹出对话框示例展示。我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。</p>'
		});
	});

	$('#btn-02').click(function(){
		$.dialog({
			autoClose : 2500,
			contentHtml : '<p>我是自动关闭的对话框示例展示。</p><p>我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。</p>'
		});
	});


	$('#btn-03').click(function(){
		$.dialog({
			showTitle : false,
			contentHtml : '<p>我是没有标题的对话框。</p><p>我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。</p>'
		});
	});


	$('#btn-04').click(function(){
		$.dialog({
			titleText : '自定义标题',
			contentHtml : '<p>我是自定义标题的对话框。</p><p>我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。</p>'
		});
	});


	/*  
	 * confirm type 
	 */
	$('#btn-05').click(function(){
		$.dialog({
			type : 'confirm',
			contentHtml : '<p>我是confirm类型的对话框。</p><p>我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。</p>'
		});
	});

	$('#btn-06').click(function(){
		$.dialog({
			type : 'confirm',
			buttonText : {
	            ok : '自定义-确定',
	            cancel : '自定义-取消'
	        },
			contentHtml : '<p>我是confirm类型的对话框。</p><p>我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。</p>'
		});
	});

	$('#btn-07').click(function(){
		$.dialog({
			type : 'confirm',
			onClickOk : function(){
				alert('你点了确定~~');
			},
        	onClickCancel : function(){        		
				alert('你点了取消~~');
        	},
			contentHtml : '<p>我是confirm类型的对话框。</p><p>我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。</p>'
		});
	});

	$('#btn-08').click(function(){
		$.dialog({
			type : 'confirm',
	        onBeforeShow : function(){
	        	alert('显示前执行~~')
	        },
	        onShow : function(){
	        	alert('显示完成后执行~~')
	        },
	        onBeforeClosed : function(){
	        	alert('关闭前执行~~')
	        },
	        onClosed : function(){
	        	alert('关闭后执行，可以看页面title是否改变~~');
	        	document.title = '我已经关闭拉！';
	        },
			contentHtml : '<p>我是confirm类型的对话框。</p><p>我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。我只是用来占位的内容展示，仅仅用来占位撑起提示内容的高度。</p>'
		});
	});


	/*  
	 * info type 
	 */
	$('#btn-09').click(function(){
		$.dialog({
			type : 'info',
	        infoText : '加载中…',
			infoIcon : 'images/icon/loading.gif',
			autoClose : 2500			
		});
	});

	$('#btn-10').click(function(){
		$.dialog({
			type : 'info',
	        infoText : '操作成功',
			infoIcon : 'images/icon/success.png',
			autoClose : 2500
		});
	});

	$('#btn-11').click(function(){
		$.dialog({
			type : 'info',
	        infoText : '操作失败',
			infoIcon : 'images/icon/fail.png',
			autoClose : 2500			
		});
	});


	$('#btn-12').click(function(){
		$.dialog({
			type : 'info',
	        contentHtml : '<img class="info-icon" src="images/icon/success.png" alt="操作成功" /><p class="info-text">操作成功</p>',
			autoClose : 2500			
		});
	});


	$('#btn-13').click(function(){
		var infoDialog = $.dialog({
			type : 'info',
			infoText : '加载中…',
			infoIcon : 'images/icon/loading.gif'			
		});

		window.setTimeout(function() {
	        infoDialog.dialog.update({
	        	autoClose : 1500,
		    	infoText : '操作成功',
				infoIcon : 'images/icon/success.png'
     		});
     	}, 2500);
	});

});