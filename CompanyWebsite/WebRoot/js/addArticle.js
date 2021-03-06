
$(function () {
	

    $('#addArticle').click(function () {
    	
    	if(!validAddArticle()){
    		return ;
    	}
    	
    	   //encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
//    	该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。
//    	其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。
	var postdata = "title="+$.trim($("#addTitle").val())+"&content="+  encodeURIComponent(addEditor.html());//获取KindEditor的html文本
	ajax(
    		  {
			  	method:'POST',
	    		url:'admin/articleManageAction_addArticle.action',
				params: postdata,
	    		callback:function(data) {
					if (data == 1) {
						$("#addModal").modal("hide");//关闭模糊框		
						showInfo("添加成功");	

	                }else {
						$("#addModal").modal("hide");//关闭模糊框
						showInfo("添加失败");
					}
								
				}
			}
			   
    	);
			
		
	});
	
		$('#modal_info').on('hide.bs.modal',function() {//提示模糊框隐藏时候触发
       		 location.reload();  	//刷新当前页面
    	});
	
	

});




//加入在线编辑器
var addEditor;
KindEditor.ready(function(K) {
	//在当前网页中，查找<textarea id = "addContent"></textarea>，并替换成kindeditor编辑器。
	addEditor = K.create('textarea[id="addContent"]', {
		allowFileManager : true ,  //是否允许上传文件
		resizeType:0, //1只能拖动高度，0不能拖动
		allowImageUpload:true,//允许上传图片
        allowFileManager:true, //允许对上传图片进行管理
        uploadJson : '../js/editor/jsp/upload_json.jsp',  
        fileManagerJson : '../js/editor/file_manager_json.jsp',  
		afterCreate : function() {//获取 KindEditor里面的内容
         this.sync(); 
        }, 
        afterBlur:function(){ //获取 KindEditor里面的内容
            this.sync(); 
        }, 
        items:[
               'source', '|', 'undo', 'redo', '|', 'preview',  'cut', 'copy', 'paste',
                '|', 'justifyleft', 'justifycenter', 'justifyright',
               'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
               'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
               'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
               'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 
                'table', 'hr', 'emoticons',  '|'
       ]
	});
});





function validAddArticle() {
    var flag = true;

    var title = $.trim($("#addTitle").val());

    if (title == "") {
        $('#addTitle').parent().addClass("has-error");
        $('#addTitle').next().text("请输入新闻标题");
        $("#addTitle").next().show();
        flag = false;
    }else {
        $('#addTitle').parent().removeClass("has-error");
        $('#addTitle').next().text("");
        $("#addTitle").next().hide();
    }
	
    
    var content = addEditor.html();
    if (content == "") {
        $('#addContent').parent().addClass("has-error");
        $('#addContent').next().text("请输入新闻内容");
        $("#addContent").next().show();
        flag = false;
    }else {
        $('#addContent').parent().removeClass("has-error");
        $('#addContent').next().text("");
        $("#addContent").next().hide();
    }
    
    
 

	
    return flag;
}


function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


