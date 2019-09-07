
	/*得到选中目标设备的id的集合*/
	getChooseTargetDeviceIdList = function(chooseTargetDevices)
	{
		var chooseTargetDeviceIdArray=[];
		for(var index in chooseTargetDevices)
		{
			var chooseTargetDeviceId = chooseTargetDevices[index]._nf4.deviceId;
			chooseTargetDeviceIdArray.push(chooseTargetDeviceId);
			console.log("任务选中目标的id："+chooseTargetDeviceId);
		}
		
		var chooseTargetDeviceIdList = chooseTargetDeviceIdArray.join(";");
		return chooseTargetDeviceIdList;
	};

	/*用于图标任务的默认保存*/
	function saveIconTask()
	{
		var taskName = $("input[name=taskName]").val();//得到图标式任务的任务名称
		var selectValue = $('#iconTaskType').combo('getValue');	//得到图标式任务的任务类型
		var targetSubjectDeviceId = targetSubject._nf4.deviceId;
		console.log("task_subject:"+targetSubjectDeviceId);
		
		var chooseTargetDeviceIdList=getChooseTargetDeviceIdList(chooseTargetDevices);
		
		//将参数传递到后端，后端保存默认的任务
		$.ajax({
			type:"POST",
			data:{"taskType":selectValue, "targetSubjectDeviceId":targetSubjectDeviceId,"chooseTargetDeviceIdList":chooseTargetDeviceIdList,"taskName":taskName},
			url:"saveDefaultIconTask.html",
			success:function(data)
			{
				console.log("保存默认任务成功");
				$.messager.show({
	        		title:'消息提示',
	        		msg:'保存任务成功!',
	        		timeout:1000,
	        		showType:'slide'
	        	});
			},
			error:function()
			{
				console.log("保存默认任务失败");
				$.messager.show({
	        		title:'消息提示',
	        		msg:'保存任务成功!',
	        		timeout:1000,
	        		showType:'slide'
	        	});
			}
		});
		
		
	}

	/*用于图标任务的修改后保存*/
	function editIconTask()
  	{
		var taskName = $("input[name=taskName]").val();//得到图标式任务的任务名称
		var selectValue = $('#iconTaskType').combo('getValue');//得到选中的任务类型
		console.log("选中的任务类型:"+selectValue);
		if(targetSubject == null)
		{
			$.messager.alert('提示','请选择任务主体!');
			return;
		}
		var targetSubjectDeviceId = targetSubject.id;
		var chooseTargetDeviceIdList=getChooseTargetDeviceIdList(chooseTargetDevices);
		
  		$('#iconEditTaskDiv').dialog(
        {
            title: '修改任务',
            width: 1200,
            height: 700,
            closed: false,
            cache: false,
            href: 'getTaskUIForIcon.html?taskType='+selectValue+'&targetSubjectDeviceId='+targetSubjectDeviceId+'&chooseTargetDeviceIdList='+chooseTargetDeviceIdList+'&taskName='+taskName,
            modal: true
        });
    }
