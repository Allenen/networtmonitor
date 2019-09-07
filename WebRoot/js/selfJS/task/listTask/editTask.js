	/**
	 * 编辑列表式任务的功能
	 * */
	//编辑任务
	function editTask(taskNum, taskTypeNum)
	{
		console.log("编辑任务的任务号:"+taskNum+";编辑任务的任务类型:"+taskTypeNum);
		$('#dd').dialog(
		{    
			title: '编辑任务信息',    
			width: 1200,    
			height: 700,   
			closed: false,    
			cache: false,    
			href: 'get_Taskcontent.html?tasknum='+taskNum,   
			modal: true
			/*onLoad:function()
			{
				rec = {};
				rec["id"]=taskTypeNum;
				initTaskStrategy(rec);
			}*/
		});
		
		
	} 