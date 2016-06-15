# dialog.js
移动端Dialog弹出对话框插件，同时支持jQuery和Zepto

# 特性：
+ 支持三种类型的弹窗展示：alert、confirm、info；
+ 方便定制，可以自定义按钮的文字、样式、回调函数；
+ 支持 jQuery 和 Zepto JavaScript工具库；
+ 4个状态事件，用来监听状态改变；对话框默认样式主要针对移动端展示做优化。

# DEMO：
查看效果，请点击→：[demo示例](http://sufangyu.github.io/project/dialog/)


# 三种类型的对话框：
**1）alert 类型；**
![alert类型](http://7xp00j.com1.z0.glb.clouddn.com/static/images/dialog-plugin-01.jpg)

**2）confirm 类型**
![confirm类型](http://7xp00j.com1.z0.glb.clouddn.com/static/images/dialog-plugin-02.jpg)

**3）info 类型；**
![info类型](http://7xp00j.com1.z0.glb.clouddn.com/static/images/dialog-plugin-03.jpg)


# 引用文件：

**1、CSS**
``` css
<link rel="stylesheet" href="css/dialog.css">
```
**2、JS**
``` javascript
<script src="js/zepto.min.js"></script>
<script src="js/dialog.js"></script>
```
**3、JS 调用**
``` javascript
$.dialog({
    contentHtml : '弹出对话框的内容部分'
});
 ```

 <br />
 
# 参数
| 选项            | 类型    |  默认值  |  说明  |
| :--------       | :-----  | :----    | :----  |
| type            | string  | 'alert'  |  对话框的种类（alert-确定； confirm-确定/取消； info）|
|titleText 	      | string  | '信息提示' | 标题文字|
|showTitle 	      | bool    | true       | 是否显示标题。值为：true、false|
|contentHtml      | string  | ''         | 主体部分的HTML内容。默认值为空|
|dialogClass      | string  | ''         | 对话框自定义的 class。默认值为空|
|autoClose 	      | number  | 0          | 自动关闭的延时时间（单位：毫秒）。为0时表示不自动关闭；大于0时，表示自动关闭对话框|
|overlayClose     | bool    | fasle      | 是否可点击遮罩层关闭对话框。值为：true、false|
|buttonText       | string  | { ok : '确定', cancel : '取消' } | 按钮的文字|
|buttonClass      | string  | {ok : '',  cancel : ''}          | 按钮的自定义 class|
|infoText         | string  | ''            |info 类型对话框的提示文字|
|infoIcon         | string  | ''            |info 类型对话框的提示图标。值为图标的路径|
|onClickOk        | fn      | function(){} 	| 回调函数，点击“确定”按钮时执行|
|onClickCancel    | fn      | function(){}  | 回调函数，点击“取消”按钮时执行|
|onBeforeShow     | fn      | function(){}  | 回调函数，对话框显示前时执行|
|onShow 	      | fn      | function(){} 	| 回调函数，对话框显示后时执行|
|onBeforeClosed   | fn      | function(){}  | 回调函数，对话框关闭前时执行|
|onClosed 	      | fn      | function(){} 	| 回调函数，对话框关闭后时执行|


# 计划
- 弹窗主题内容部分增加最大高度，防止内容太多造成弹窗超出可视窗口；
- 把click点击关闭弹窗，调整为PC端使用click，移动端使用自定义tap；
- 增加弹窗显示时，页面是否可以滚动。
