

$(function(){
	initToolbar();
});





function initToolbar(){
    var toolbar = document.getElementById("toolbar");
    var buttons = {
		
		add:{name: "添加", icon:"images/toolbar/edit_add.png", action:function(){
			$('#append').window('open');
		}},
		
		remove:{name: "删除", icon:"images/toolbar/edit_remove.png", action:function(){onremoveusers();}},
		
		save:{name: "保存修改", icon:"images/toolbar/save.png", action:function(){onsave_userinfo();}},
		
		refresh:{name: "刷新", action:function(){refreshpage();}},     
		
    };
    createToolBar(buttons, toolbar, null, false, false);
}

function submit(){
	var t = $(".easyui-textbox");
	var id = t[0].value;
	var pwd = t[1].value;
	var phone = t[2].value;
	var name = t[3].value;
	var unit = t[4].value;
	var memo = t[5].value;

	if(id == "" || pwd ==  "" || phone == "" || name == "" || unit == "" || memo == ""
		||!id || !pwd || !phone || !name || !unit || !memo){
		document.getElementById("showMsg").style.color = "red";
		return ;
	}
	
	$.ajax( {
 		  type : 'POST',
 		  url : 'adduser.html',
 		  data: "userId="+id+"&userMemo="+memo+"&userPassword="+pwd+"&userPhone="
	  			+phone+"&userRealName="+name+"&userUnit="+unit+"&userVisible=1",

 		  success : function(data) {
 			 if(data == "success"){
 				 	$('#append').window('close');
 				 	reset();
        			$.messager.show({
	     				title:'消息提示',
	     				msg:'添加成功!',
	     				timeout:1000,
	     				showType:'slide'
        			});
        			$('#user_tab').datagrid('appendRow',{userId:id,userPassword:pwd,userPhone:phone,userRealName:name,
        				userUnit:unit,userMemo:memo,status:"<input type='checkbox' name='isselect' value='" + id + "'/>"});		
			  }
 			 else if(data == "exist"){
 				document.getElementById("showMsg").innerText = "用户Id已经存在";
 				document.getElementById("showMsg").style.color = "red";
 			 }
 		  },
 		  error : function(data) {
 			  alert("服务器error");
 		  }
 	  });
}

function reset(){

	$("#id_text").textbox("setValue", "");
	$("#pwd_text").textbox("setValue", "");
	$("#phone_text").textbox("setValue", "");
	$("#name_text").textbox("setValue", "");
	$("#unit_text").textbox("setValue", "");
	$("#memo_text").textbox("setValue", "");
	document.getElementById("showMsg").style.color = "black";
	document.getElementById("showMsg").innerText = "所有的表单字段都是必填的。";
}

function onremoveusers(){
	var checkboxElements = $("table td input[type=checkbox]:checked");
	if(checkboxElements.length == 0){
		$.messager.confirm( '消息提示', '未选中任何记录');
		return ;
	}
	var rows = $('#user_tab').datagrid('getRows');
	$.messager.confirm('消息提示', '确定要删除选中用户?',function(r){
		if(r){
			var userIdList="";
			$.each(checkboxElements,function(index,checkboxElement){
				userIdList = userIdList+checkboxElement.value+";";	
			});
			Q.log(userIdList);
			$.ajax( {
       		  type : 'POST',
       		  url : 'deleteUsers.html',
       		  data : {'userIdList':userIdList},
       		  success : function(data) {
       			$.each(checkboxElements,function(index,checkboxElement){
       				//window.location.href = "usermanager.html"; 
       				for(var i = 0; i < rows.length; i ++){
       					if(rows[i].userId == checkboxElement.value){
       						var remove_index = $("#user_tab").datagrid('getRowIndex', rows[i]);
       						$("#user_tab").datagrid('deleteRow', remove_index);
       						break;
       					}
       				}
    			});
       			 
       			          			
       		  },
       		  error : function(data) {
       			  alert("服务器error");
       		  }
       	  });
		}
	});
}

function onsave_userinfo(){
	var checkboxElements = $("table td input[type=checkbox]:checked");
	if(checkboxElements.length == 0){
		$.messager.confirm( '消息提示', '未选中任何记录');
		return ;
	}
	var rows = $('#user_tab').datagrid('getRows');
	
	$.messager.confirm('消息提示', '确定要修改选中用户信息?',function(r){
		
		if(r){
			$.each(checkboxElements,function(index,item){
				var r;
				for(var i = 0; i < rows.length; i ++){
					if(rows[i].userId == item.value){
						r = rows[i];
						break;
					}
				}
				r.userVisible = 1;
				$.ajax( {
               		  type : 'POST',
               		  url : "update.html",
               		  data: "userId="+r.userId+"&userMemo="+r.userMemo+"&userPassword="+r.userPassword+"&userPhone="
               		  		+r.userPhone+"&userRealName="+r.userRealName+"&userUnit="+r.userUnit+"&userVisible="+r.userVisible,

               		  success : function(data) {
               			  if(data == "success"){
		               			$.messager.show({
		            				title:'消息提示',
		            				msg:'保存成功!',
		            				timeout:1000,
		            				showType:'slide'
		            			});
               			  }
               		  },
               		  error : function(data) {
               			  alert("服务器error");
               		  }
               	  });
			});
			
		}
	});
}

function refreshpage(){
	//刷新当前页面
	$.ajax({
		type:"POST",
		url:"refresh.html",
		success:function(data)
		{
			window.location.href = "usermanager.html"; 
		}
	 });	
}




$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		if(param.field == "status") return ;
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
			for(var i=0; i<fields.length - 1; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;	
				if (fields[i] != param.field){
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for(var i=0; i<fields.length - 1; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
			fields[0] = null;
		});
	}
});

var editIndex = undefined;
function endEditing(){
	if (editIndex == undefined){return true;}
	if ($('#user_tab').datagrid('validateRow', editIndex)){
		$('#user_tab').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell(index, field){
	if (endEditing()){
		$('#user_tab').datagrid('selectRow', index)
				.datagrid('editCell', {index:index,field:field});
		editIndex = index;	
	}
}