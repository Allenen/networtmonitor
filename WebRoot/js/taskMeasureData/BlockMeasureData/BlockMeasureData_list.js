
/**
 * 阻断测量数据的js文件 by zxgm 2016-11-4
 * */
 
/**
 * 文档加载完成后触发
 */
$(function(){
	
	//1. 起始时间和结束时间默认初始化(起始时间小于结束时间一天)
	$("#start_testTime").datetimebox("setValue",initDateTimeBox(new Date(),0));
	$("#end_testTime").datetimebox("setValue",initDateTimeBox(new Date(),1));
	
	//2. 阻断测量表格的格式初始化
	$('#BlockMeasureDataQueryTable').datagrid({       
	    columns:[[    
	        {field:'test_targetName',title:'目标名',width:'15%'},    
	        {field:'test_target',title:'目标IP',width:'15%'},
	        {field:'zd',title:'阻断状态',width:'15%'},
	        {field:'test_timeString',title:'首次测量时间',width:'30%'},
	        {field:'last_timeString',title:'最新测量时间',width:'30%'},
	        {field:'block_time',title:'阻断历时(分钟)',width:'15%'}
	    ]]    
	});
	
});

/*选中复选按钮全部复选框*/
var m_isAllChecked = false;//全部复选框未被选中
function checkAll()
{
	//true:所有class属性为equipNameCheckbox的复选框全部勾选;false://所有class属性为equipNameCheckbox的复选框全部不勾选
	!m_isAllChecked ? $('.equipNameCheckbox').prop("checked",true):$('.equipNameCheckbox').prop("checked",false);
	m_isAllChecked = !m_isAllChecked;
	
	$('#BlockMeasureDataQueryTable').datagrid('loadData',m_interruptMeasureRecords);/*点击任务后设置相应任务的测量数据(所有的数据)*/
}

/**
 * 勾选目标设备的复选框
 */
function getAllSelect()
{
	var checkedItemLength = $(".equipNameCheckbox:checked").length;
	var itemLength = $(".equipNameCheckbox").length;
	if(checkedItemLength == itemLength)
	{
		$("#checkAll").prop("checked",true);
		m_isAllChecked = true;
	}else
	{
		$("#checkAll").prop("checked",false);
		m_isAllChecked = false;
	}

	showSatisfiedBlockMeasureData();
}

/**
 * 点击选中，表格显示满足条件的阻断测量数据
 */
function showSatisfiedBlockMeasureData()
{
	//1. 得到选中的任务号
	var taskNum = m_taskNum;
	
	//2. 得到选中的目标设备标识
	var checkedEquipNameDom = $(".equipNameCheckbox:checked");
	var checkedEquipIds = [];	//选中的目标设备标识
	for(var i = 0;i < checkedEquipNameDom.length;i++)
		checkedEquipIds.push(checkedEquipNameDom[i].value);
	
	//3. 得到起始时间和结束时间
	var startTestTime = $("#start_testTime").datetimebox("getValue"),endTestTime = $("#end_testTime").datetimebox("getValue");
	
	//4. 得到符合条件的双向时延测量数据
	$.ajax({
		url:"satisfiedBlockMeasureDataQueryByList.html",
		type:"POST",
		data:{"taskNum":taskNum,"taskTargetIdString":checkedEquipIds.join(";"),
			"startTestTime":startTestTime,"endTestTime":endTestTime},
		success:function(data)
		{
			m_interruptMeasureRecords = data;
			$('#BlockMeasureDataQueryTable').datagrid('loadData',data);//加载阻断测量数据
			if(m_interruptMeasureRecords != null)
				setReportValue(m_interruptMeasureRecords);//5. 设置丢包率、往返时延和时延抖动的值
		},
		error:function()
		{
			console.log("没有符合条件的结果数据");
		}
	});
}

/**
 * 设置阻断测量数据的阻断历时数据
 */
function setReportValue(interruptMeasureRecords)
{
	var totalAvgBlock_time = 0;//总平均阻断历时
	var avgBlock_time = 0, maxBlock_time = 0, minBlock_time = 0;//平均阻断历时，最大阻断历时，最小阻断历时
	var length = interruptMeasureRecords.length;
	if(interruptMeasureRecords.length != 0)//测量记录不为空
	{
		maxBlock_time = interruptMeasureRecords[0].block_time;
		minBlock_time = maxBlock_time;
		
		for(var i=0;i<interruptMeasureRecords.length;i++)
		{
			var block_time = interruptMeasureRecords[i].block_time;
			if(new Number(maxBlock_time) < new Number(block_time))
			{
				maxBlock_time = block_time;
			}
			
			if(new Number(minBlock_time) > new Number(block_time))
			{
				minBlock_time = block_time;
			}
			totalAvgBlock_time = new Number(totalAvgBlock_time)+new Number(block_time);
		}
		
		$("#avgBlock_time").text(totalAvgBlock_time/length);
		
		$("#maxBlock_time").text(maxBlock_time);
		$("#minBlock_time").text(minBlock_time);
	}else//测量记录为空
	{
		$("#avgBlock_time").text(0);
		$("#maxBlock_time").text(0);
		$("#minBlock_time").text(0);
	}
}

/**
 * 校验双向时延测量数据列表的日期
 */
function onSelectDateTime(selectedDate)
{
	dateValidator(this.id,selectedDate,"start_testTime","end_testTime");
}
