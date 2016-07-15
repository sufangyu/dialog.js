# dialog.js
移动端Dialog弹出对话框插件，同时支持jQuery和Zepto

# 特性：
+ 支持四种类型的弹窗展示：alert、confirm、info、tips；
+ 方便定制，可以自定义按钮的文字、样式、回调函数；
+ 支持 jQuery 和 Zepto JavaScript工具库；
+ 4个状态事件，用来监听状态改变；对话框默认样式主要针对移动端展示做优化。

# DEMO：
查看效果，请点击→：[demo示例](http://sufangyu.github.io/project/dialog/)

![项目地址二维码](http://7xp00j.com1.z0.glb.clouddn.com/erweima-dialog.js.png)


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


# 方法
| 方法            |   说明  |
| :--------       | :----   |
| $.dialog.close  | 关闭对话框。用法：dialogObj.dialog.close() |
| $.dialog.update | 更新info、tips类型对话框的状态（图标、提示文字），该方法可传入autoClose、infoText、infoIcon三个参数。<br />dialogObj.dialog.update({ autoClose : 1500, infoText : '操作成功', infoIcon : 'images/icon/success.png' })


#最新版本
### 1.0.3 (2016-07-15)
+ 修复弹窗在低版本安卓手机无法居中显示；
+ 修复连续点击遮罩层后，弹窗会自动关闭；
+ 延迟阻止Tap点透层的关闭时间；
+ 增加 info 和 tips 类型弹窗的关闭前与关闭后的回调函数；
+ 通过CSS3启用GPU硬件加速

[全部更新日志](https://github.com/sufangyu/dialog.js/blob/master/Changelog.md)
