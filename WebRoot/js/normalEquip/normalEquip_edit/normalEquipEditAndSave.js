
/*普通设备编辑后保存
 * 
 */

/**
 * 保存路由器设备
 */
function saveRouterEquipForm()
{

	$('#routerEquipForm').form({
		url:"saveEquip.html",
		onSubmit: function(){//必须写,否则EasyUI的form表单不会提交到后台
    	},
		success:function(data)
		{

			var message = JSON.parse(data).message;
			if(message != "保存设备成功！")
			{
				$.messager.confirm('提示', message, function(r){});
				return ;
			}
			$("input[name=is_saved_flag]").val("yes");
			$('#showEquipUI', document.parent).dialog('close');
			close_after_save_flag = 1;
			$.messager.show({
				title:'消息提示',
				msg:message,
				timeout:1000,
				showType:'slide'
			});
			
		}
	});
			
	$('#routerEquipForm').submit();
}

/**
 * 保存服务器/其他设备
 * @return
 */
function saveServerEquipForm()
{
	$('#serverEquipForm').form({
		url:"saveEquip.html",
		onSubmit: function(){//必须写,否则EasyUI的form表单不会提交到后台
		},
		success:function(data)
		{
			var message = JSON.parse(data).message;
			if(message != "保存设备成功！")
			{
				$.messager.confirm('提示', message, function(r){});
				return ;
			}
			$("input[name=is_saved_flag]").val("yes");
			$('#showEquipUI', document.parent).dialog('close');
			
			$.messager.show({
				title:'消息提示',
				msg:message,
				timeout:1000,
				showType:'slide'
			});
		},
		error:function()
		{
			$.messager.show({
				title:'消息提示',
				msg:'保存设备失败!',
				timeout:1000,
				showType:'slide'
			});
		}
	});
		
	$('#serverEquipForm').submit();
}

/**
 * 保存性能探针设备
 * @return
 */
function saveTestEquipForm()
{
	$('#testEquipForm').form({
		url:"saveEquip.html",
		onSubmit: function(){//必须写,否则EasyUI的form表单不会提交到后台
		},
		success:function(data)
		{
			var message = JSON.parse(data).message;
			if(message != "保存设备成功！")
			{
				$.messager.confirm('提示', message, function(r){});
				return ;
			}
			$("input[name=is_saved_flag]").val("yes");
			$('#showEquipUI', document.parent).dialog('close');
			$.messager.show({
				title:'消息提示',
				msg:message,
				timeout:1000,
				showType:'slide'
			});
		},
		error:function()
		{
			$.messager.show({
				title:'消息提示',
				msg:'保存设备失败!',
				timeout:1000,
				showType:'slide'
			});
		}
	});
		
	$('#testEquipForm').submit();
}

