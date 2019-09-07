

//记录被选中的单选按钮的值
var initRadioCheckedId;
var pic_data = null;

$(function(){
	initRadioCheckedId = $("input[name=isFlag]:checked").val();
});
	
/**
 * 删除指定Id的图片
 * @param id
 * @return
 */
function deleteBottomImageById(id)
{
	$.messager.confirm( '删除', '您确定删除此条记录?',
		function(r)
		{
			if (r)
			{
				$.ajax({   
			          type : 'POST',   
			          url : 'deleteBottomImageById.html',   
			          data : {"bottomImageId":id},   
			          success : function(data) {   
			        	  var rows = $('#bottomimage_table').datagrid('getRows');
				          for(var i = 0; i < rows.length; i ++){
				        	  if(rows[i].imageId == id){
				        		  $("#bottomimage_table").datagrid('deleteRow', i);
				        		  break;
				        	  }
				          }
			          },   
			          error : function(XMLHttpRequest, textStatus, errorThrown) {   
			        	  alert(XMLHttpRequest.status+";"+XMLHttpRequest.readyState+";"+textStatus+";"+errorThrown);  
			         }   
			        });
			}
			//window.location.href="deleteBottomImageById.html?bottomImageId="+id;
        });
}

/**
 * 设置底图
 */
function setview(){
	var bottomImageId = $("input[name=isFlag]:checked").val();
	$.ajax({
		type:"POST",
		data:{"bottomImageId":bottomImageId,"initRadioCheckedId":initRadioCheckedId},
		url:"setBottomImage.html",
		success: function(data){
			initRadioCheckedId = bottomImageId;
			$.messager.show({
				title:'消息提示',
				msg:'底图设置成功!',
				timeout:1000,
				showType:'slide'
			});
								
		},
		error:function(){
			$.messager.show({
				title:'消息提示',
				msg:'底图设置失败!',
				timeout:1000,
				showType:'slide'
			});
		}
	});
}

var icon = null;
function load_pic(){
	var files = $("#openfile").get(0).files;				
	if (!files.length) {
		return ;
	}
	var file = files[0];
	var reader = new FileReader();
	var btn = document.getElementById("pic");		
	reader.readAsDataURL(file);  // 读取文件作为URL可访问地址
	 
	reader.onload = function(e){     //异步加载文件成功
		for (var i = btn.childNodes.length - 1; i >= 0; i--) {  
			btn.removeChild(btn.childNodes[i]);  
		}  
		icon = document.createElement('img');
		icon.src = reader.result;     //reader.result 表示图片地址
		pic_data = reader.result;
		icon.width = "25";
		icon.height = "25";
		btn.appendChild(icon);
	};
}

function fun(){
	var index = pic_data.indexOf("base64,") + 7;
	pic_data = pic_data.substring(index);

}

function refreshpage(){
	//刷新当前页面
	$.ajax({
		type:"POST",
		url:"refresh.html",
		success:function(data)
		{
			window.location.href = "bottomManager.html"; 
		}
	 });	
}

function clicklistener(){
	var i = pic_data.indexOf("base64,") + 7;//Q.log(pic_data);
	pic_data = pic_data.substring(i);
	//Q.log(pic_data);
	var name = $("#openfile").val().substring(12);
	var tip = "null";
	if(name == "") tip = "请选择图片文件";
	
	if(tip != "null")
		$.messager.confirm('提示', tip);
	$.ajax({
		type:"POST",
		data:{"bottomImageName": name, "pic_data": pic_data},
		url:"uploadBottomImage.html",
		success:function(data)
		{
			var array = data.split(";");
			if(array[0] == "success"){
				var id = array[1];
				var path = array[2];
				$('#bottomimage_table').datagrid('appendRow',{
					imageId:id,
					imageName:name,
					imagePath: path + "/images/bottomImages/" + name,
					image:"<img src='images/bottomImages/"+ name +"' width='30px;' height='30px;'/>",
    				isFlag:"<input type='radio' name='isFlag' value='"+id +"'/>设置显示 <a id='btn"+id+"' onclick='deleteBottomImageById(" + id + ")'>删除</a>"
    			});	
				$('#btn' + id).linkbutton({  
					plain:true,
					iconCls: 'icon_trash_zfj'  
				});  

				var btn = document.getElementById("pic");
				btn.removeChild(icon);
				$("#pic").html("预览");
				$("#openfile").value = "";
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {   
           alert(XMLHttpRequest.status+";"+XMLHttpRequest.readyState+";"+textStatus+";"+errorThrown);  
         }
	});
	
}
