
/**
 * TE隧道测量数据的js文件 by zxgm 2016-11-8
 * */
 var m_taskNum = undefined, m_taskTargetArrayForGraph=[];
 /**
  * 文档加载完成后触发事件
  */
 $(function(){
	 //1. 取得选中的任务编号
	 var taskNum = $('#task_num').val();
	 
	 //2. 列表与视图模式切换
	$("input:radio[name='showType']").click(function() {
   		if(this.value == 02)//曲线视图
   		{
        	$("#centerTableLayout").hide();
        	$("#centerGraphLayout").show();
        	
			//TE隧道测量数据的图标式
			loadView_graph();
   		}else{				//列表视图
     		$("#centerGraphLayout").hide();
     		$("#centerTableLayout").show();
   		}
	});

	//3. TE隧道测量数据的任务列表初始化
	$('#TETubeMeasureDataQueryTree').tree({
		url:'ajaxGetAllTasksByTaskType.html?taskType=4',
		onClick: function(node)
		{	
			m_taskNum = node.id;
			m_taskTargetArrayForGraph.length=0;
			$.ajax({
				url:"getTaskByTaskNum.html",
				type:"POST",
				data:{"taskNum":m_taskNum},
				success:function(data)
				{
					setVPNTEValue(data.task);	//选中任务后，设置TE隧道测量数据
					$('#TETubeMeasureDataQueryTable').datagrid('loadData',[]);//加载双向时延测量数据
				},
				error:function()
				{
					console.log("获取任务数值失败！");
				}
			});
		}
	});
 });
 
/**
 * 选中任务后，设置TE隧道测量数据页面的任务名、任务编号、
 * 源探测设备和目标探测设备
 */
function setVPNTEValue(task)
{
	$('#taskName').textbox('setValue',task.task_name);//设置任务名称
	$('#task_num').textbox('setValue', task.task_num);//设置任务号
	$('#task_subject').textbox('setValue', task.task_subject);//设置源探测设备
	$("#task_target").textbox("setValue", task.task_target);//设置目标探测设备
}
	


