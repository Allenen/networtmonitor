/** 快捷创建任务编辑和保存相关的js文件 **/

/**
 * 点击修改按钮，显示相应任务的弹出弹窗
 */
function editIconTask()
{
	var taskName = $("input[name=taskName]").val(),selectValue = $("#iconTaskType").combo("getValue");
	if(m_targetSubject == undefined)
	{
		$.messager.alert("提示","请选择任务主体");
		return;
	}
	
	var targetSubjectDeviceId = m_targetSubject.id;
	var chooseTargetDeviceIdList = getChooseTargetDeviceIdList(m_chooseTargetDevices);
	
	$("#iconEditTaskDiv").dialog({
		title:"修改任务",
		width:1200,
		height:700,
		closed:false,
		cache:false,
		href:"getTaskUIForIcon.html?taskType="+selectValue+"&targetSubjectDeviceId="
			+ targetSubjectDeviceId+"&chooseTargetDeviceIdList="+chooseTargetDeviceIdList+"&taskName="+taskName,
		modal:true
	});
}

/**
 * 返回目标设备的唯一标识的集合
 * @param chooseTargetDevices
 * @returns
 */
function getChooseTargetDeviceIdList(chooseTargetDevices)
{
	var chooseTargetDeviceIdArray = [];
	for(var index in chooseTargetDevices)
	{
		var chooseTargetDeviceId = chooseTargetDevices[index]._nf4.deviceId;
		chooseTargetDeviceIdArray.push(chooseTargetDeviceId);
	}
	
	return chooseTargetDeviceIdArray.join(";");
}

/**
 * 快捷方式保存默认任务
 */
function saveIconTask()
{
	var taskName = $("input[name=taskName]").val(),selectValue = $("#iconTaskType").combo("getValue");
	var targetSubjectDeviceId = m_targetSubject._nf4.deviceId;
	var chooseTargetDeviceIdList = getChooseTargetDeviceIdList(m_chooseTargetDevices);
	
	$.ajax({
		type:"POST",
		data:{"taskType":selectValue,"targetSubjectDeviceId":targetSubjectDeviceId,
				"chooseTargetDeviceIdList":chooseTargetDeviceIdList,"taskName":taskName},
		url:"saveDefaultIconTask.html",
		success:function(data)
		{
			$.messager.alert("保存成功");
		},
		error:function()
		{
			$.messager.alert("保存失败");
		}
	});
}