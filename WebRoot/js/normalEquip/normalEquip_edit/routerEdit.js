/*编辑路由器的js文件 
 * 
 */

/**
 * 文件加载完成触发
 */
$(function(){

	var equipId=$("#equipId")[0].value;
	$('#equipInteInfoTable').datagrid({    
	    url:'getEquipInteByEquipId.html?equipId='+equipId,
	    singleSelect:true,
		
	    columns:[[    
	        {
	        	field:'equipInteUnionKey',
	        	title:'接口编号',width:'6%',editor:'numberbox',align:"center",
	        	formatter:function(value,row,index)
	        	{
	        		return row.equipInteUnionKey.inteId;
	        	}
	        },    
	        {field:'inteDesc',title:'接口描述',width:'6%',editor:'textbox',align:"center"},    
	        {field:'inteTraffic',title:'标称带宽(Mbps)',width:'9%',editor:'numberbox',align:"center"},
	        {field:'ifType',title:'类型',width:'6%',editor:'textbox',align:"center"},
	        {field:'inteStatus',title:'状态',width:'4%',editor:'textbox',align:"center"},
	        {field:'measureTime',title:'查询间隔(秒)',width:'8%',editor:'numberbox',align:"center"},
	        {field:'inTraffic',title:'入利用率阈值(%)',width:'9%',editor:'numberbox',align:"center"},
	        {field:'outTraffic',title:'出利用率阈值(%)',width:'9%',editor:'numberbox',align:"center"},
	        {field:'inLossRate',title:'入丢包率阈值(%)',width:'9%',editor:'numberbox',align:"center"},
	        {field:'outLossRate',title:'出丢包率阈值(%)',width:'9%',editor:'numberbox',align:"center"},
	        {field:'mtu',title:'最大传送单元(字节)',width:'11%',editor:'numberbox',align:"center"},
	        {field:'inteIp',title:'接口IP',width:'8%',editor:'textbox',align:"center"},
	        {field:'inteIpMask',title:'接口IP掩码',width:'8%',editor:'textbox',align:"center"	}
	    ]],

	});
	
	

});

var editIndex = undefined;

function endEditing(){
	if (editIndex == undefined){return true;}
	if ($('#equipInteInfoTable').datagrid('validateRow', editIndex)){
		$('#equipInteInfoTable').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}


/**
 * 单击单元格触发编辑单元格操作
 * @param index
 * @param field
 * @return
 */
function onClickCell(index, field){
	if (endEditing()){
		$('#equipInteInfoTable').datagrid('selectRow', index)
				.datagrid('editCell', {index:index,field:field});
		editIndex = index;	
	}
}


/**
 * 在完成编辑但编辑器还没有销毁之前触发
 * @param index 行号
 * @param row 行数据
 * @return
 */
function onEndEdit(index, row)
{
//	$.ajax({
//		url:"updateEquipInte.html",
//		type:"POST",
//		data:{"equipInteJson":JSON.stringify(row)},
//		success:function(data)
//		{
//			console.log("更新设备接口信息正确");
//		},
//		error:function()
//		{
//			console.log("更新设备接口信息失败");
//		}
//	});
}

function update()
{
	var selectRow = $('#equipInteInfoTable').datagrid("getSelected");
	
	if(selectRow == null){
		$.messager.confirm( '消息提示', '未选中任何记录');
		return ;
	}
	$.ajax({
		url:"updateEquipInte.html",
		type:"POST",
		data:{"equipInteJson":JSON.stringify(selectRow)},
		success:function(data)
		{
			$.messager.show({
				title: '消息提示',
				msg: "更新设备接口信息正确",
				timeout: 1000,
				showType: 'slide'
			});
		},
		error:function()
		{
			$.messager.show({
				title: '消息提示',
				msg: "更新设备接口信息失败",
				timeout: 1000,
				showType: 'slide'
			});
		}
	});
}

/**
 * 点击保存按钮保存接口信息
 * @return
 */
function save_interface_info()
{
	$('#InterfaceForm').form({
		url:"saveInterface.html",
		onSubmit: function(){//必须写,否则EasyUI的form表单不会提交到后台
    	},
		success:function(data)
		{
			
			var message = JSON.parse(data).message;
			
			if(message != "保存接口信息成功！")
			{
				$.messager.confirm('提示', message, function(r){});
				return ;
			}
			$('#append').window('close');
			var inte = JSON.parse(data).inte;
			$('#equipInteInfoTable').datagrid('appendRow',inte);
			$.messager.show({
				title:'消息提示',
				msg:message,
				timeout:1000,
				showType:'slide'
			});
			
		}
	});

}

function Reset()
{
	for(var i = 1; i < 12; i ++){
		$("#info" + i).textbox("setValue", "");
		if(i == 4 || i == 7 || i == 8)
			$("#info" + i).textbox("setValue", "10");
		if(i == 5 || i == 6)
			$("#info" + i).textbox("setValue", "60");
	}

}

/**
 * 添加行
 * @return
 */
function appendRow()
{
	$('#append').window('open');
	Reset();
}

/**
 * 删除选中的行
 * @return
 */
function removeRow()
{
	var selectRow = $('#equipInteInfoTable').datagrid("getSelected");
	
	if(selectRow == null)
	{
		$.messager.confirm( '消息提示', '未选中任何记录');
		return ;
	}
	
	//删除数据库中的数据
	$.ajax({
		url:"deleteEquipInteByInteIdAndEquipId.html",
		type:"POST",
		data:{"inteId":selectRow.equipInteUnionKey.inteId,"equipId":selectRow.equipInteUnionKey.equipId},//设备标识，接口编号
		success:function(data)
		{
			var index=$('#equipInteInfoTable').datagrid('getRowIndex', selectRow);//得到选中的行号
			$("#equipInteInfoTable").datagrid("deleteRow",index);//删除表格选中的行
		},
		error:function()
		{
			$.messager.alert('警告','数据库删除数据失败!'); 
		}
	});
	
}

$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		if(param.field == "equipInteUnionKey") return ;
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
			for(var i = 0; i < fields.length; i ++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;	
				if (fields[i] != param.field){
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for(var i = 0; i < fields.length; i ++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
			//fields[0] = null;
		});
	}
});