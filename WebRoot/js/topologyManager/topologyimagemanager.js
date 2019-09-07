var pic_data = null;
var len = 0;
var preImageIdList = "";

$(function(){
	
	$("#imageType").combobox(
	{	
		url:'getDictsForComboxByDict_type.html?dict_type=SBLB',
		valueField:'text',
		textField:'text'
	});
	preImageIdList="";
	var checkboxElementsList = $("input[name=isFlag]:checked");
	len = checkboxElementsList.length / 2;
	for(var i = 0; i < len; i ++)
		preImageIdList = preImageIdList + ";" + checkboxElementsList[i].value;
	
});

/**
 * 删除指定id的域管理图片
 * @param id
 * @return
 */
function deleteTopologyImageById(id)
{
	$.messager.confirm( '删除', '您确定删除此条记录?',
	function(r)
	{
		if (r)
		{
		 	$.ajax({   
	          type : 'POST',   
	          url : 'deleteTopologyImageById.html',   
	          data : {"topologyImageId":id},   
	          success : function(data) {   
		          var rows = $('#image_table').datagrid('getRows');
		          for(var i = 0; i < rows.length; i ++){
		        	  if(rows[i].topologyImageId == id){
		        		  $("#image_table").datagrid('deleteRow', i);
		        		  break;
		        	  }
		          }
		          var pattern = ";" + id;
		          var index = preImageIdList.indexOf(pattern);
		          if(index > 0){
		        	  preImageIdList = preImageIdList.substring(0, index) + preImageIdList.substring(index + pattern.length);
		        	  //Q.log("hashdw");
		          }
		          //Q.log(preImageIdList);
	          },   
	          error : function(XMLHttpRequest, textStatus, errorThrown) {   
	        	  alert(XMLHttpRequest.status+";"+XMLHttpRequest.readyState+";"+textStatus+";"+errorThrown);  
	         }   
	        });
		}
	});
}

function preview(){
	var selRows = $('#image_table').datagrid('getChecked');  
	Q.log("预览");
	var div = document.createElement("div");
	var checkboxElements = $("input[name=isFlag]:checked");
	Q.log(checkboxElements);
	div.innerHTML = "<a id='btn' >删除</a>";
	var toolbar = document.getElementById("toolbar");
	toolbar.appendChild(div);
	$('#btn').linkbutton({  
		  
		iconCls: 'icon_trash_zfj'  
		});  
}
function fun(){
	Q.log("");
}
/**
 * 设置域管理图片显示
 */
function setview()
{
	
	var topologyImageIdList="";
	var checkboxElements = $("table td input[type=checkbox]:checked");

	for(var i = 0; i < checkboxElements.length - len; i ++)
		topologyImageIdList=topologyImageIdList+";"+checkboxElements[i].value;

	$.ajax({
		type:"POST",
		data:{"topologyImageIdList": topologyImageIdList, "preImageIdList": preImageIdList},
		url:"setTopologyImagevisible.html",
		success:function(data)
		{
			preImageIdList = topologyImageIdList;
			$.messager.show({
				title:'消息提示',
				msg:'拓扑图设置成功!',
				timeout:1000,
				showType:'slide'
			});
		},
		error:function()
		{
			$.messager.show({
				title:'消息提示',
				msg:'拓扑图设置失败!',
				timeout:1000,
				showType:'slide'
			});
		}
	});
}

/**
 * 删除指定id的域管理图片
 */

function refreshpage(){
	//刷新当前页面
	$.ajax({
		type:"POST",
		url:"refresh.html",
		success:function(data)
		{
			window.location.href = "topologyimagemanager.html"; 
		}
	 });	
}


/**
 * 文件浏览器打开文件后读取图片的内容
 *
 */
var icon = null;
	
function load_pic(){
	var files = $("#openfile").get(0).files;				
	if (!files.length) {
		return ;
	}
	var file = files[0];
	var reader = new FileReader();
		
	reader.readAsDataURL(file);  // 读取文件作为URL可访问地址
	var btn = document.getElementById("pic");
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

/**
 * 上传图片按钮的点击事件
 *
 */
function clicklistener(){
	var i = pic_data.indexOf("base64,") + 7;
	pic_data = pic_data.substring(i);
	var name = $("#openfile").val().substring(12);
	var type = $("#imageType").combobox('getText');
	var tip = "null";
	if(type == "请选择上传的图片类型") tip = type;
	if(name == "") tip = "请选择图片文件";
	if(tip != "null"){
		$.messager.confirm('提示', tip);
		return ;
	}
	$.ajax({
		type:"POST",
		data:{"topologyImageName":name,"topologyImageType":type,"pic_data":pic_data},
		url:"uploadTopologyImage.html",
		success:function(data)
		{
			var array = data.split(";");
			if(array[0] == "success"){
				var id = array[1];
				var path = array[2];
				$('#image_table').datagrid('appendRow',{
					topologyImageId: id,
					topologyImageName: name,
					topologyImagePath: path + "/images/topologyImages/" + name,
					image:"<img src='images/topologyImages/"+ name +"' width='30px;' height='30px;'/>",
					topologyImageType:type,
    				isFlag:"<input type='checkbox' name='isFlag' value='"+id +"'/>设置显示 <a id='btn"+id+"' onclick='deleteTopologyImageById(" + id + ")'>删除</a>"
    			});	
				$('#btn' + id).linkbutton({  
					plain:true,
					iconCls: 'icon_trash_zfj'  
				});  
				$('#imageType').combobox('setValue', '请选择上传的图片类型');	
				var btn = document.getElementById("pic");
				btn.removeChild(icon);
				$("#pic").html("预览");
				$("#openfile").value = "";
				//window.location.href="topologyimagemanager.html";
			}
			else{
				$.messager.show({
					title:'消息提示',
					msg:'拓扑图设置失败!',
					timeout:1000,
					showType:'slide'
				});
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {   
           alert(XMLHttpRequest.status+";"+XMLHttpRequest.readyState+";"+textStatus+";"+errorThrown);  
         }
	});
}
