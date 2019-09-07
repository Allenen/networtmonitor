
/**
 * 链路性能测量数据的js文件 by zxgm 2016-10-31
 * */

/**
 * 文档加载完成后触发
 */
$(function(){
	
	//1. 起始时间和结束时间默认初始化(起始时间小于结束时间一天)
	$("#start_testTime").datetimebox("setValue",initDateTimeBox(new Date(),0));
	$("#end_testTime").datetimebox("setValue",initDateTimeBox(new Date(),1));
	
	//2. 链路性能测量表格的格式初始化
	$('#PathChangeMeasureDataQueryTable').datagrid({       
	    columns:[[    
	        {field:'testTimeString',title:'测量时间',width:'16%'},    
	        {field:'equipName',title:'设备名称',width:'9%'},    
	        {field:'snmpInteDataUnionKey',
	        	title:'接口标识',width:'9%',
	        	formatter:function(value,row,index)
	        	{
	        		return row.snmpInteDataUnionKey.inteId;
	        	}
			},
	        {field:'inteStatus',title:'接口状态',width:'9%'},
	        {field:'inteTraffic',title:'标称带宽(Mbps)', width:'9%'},
	        {field:'measureTime',title:'扫描间隔(秒)', width:'9%'},
	        {field:'inTraffic',title:'入带宽利用率(%)', width:'9%'},
	        {field:'outTraffic',title:'出带宽利用率(%)', width:'9%'},
	        {field:'inLossRate',title:'入丢包率(%)', width:'9%'},
	        {field:'outLossRate',title:'出丢包率(%)', width:'9%'}
	    ]]    
	});   
	
});

/**
 * 选择按钮后，显示符合条件的双向时延测量数据
 */
function showSatisfiedPathChangeMeasureData()
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
	
	//4. 得到符合条件的链路性能测量数据
	$.ajax({
		type:"POST",
		url:"satisfiedPathPerformanceMeasureDataQueryByList.html",
		data:{"startTestTime":startTestTime,"endTestTime":endTestTime,"taskNum":taskNum},
		success:function(data)
		{
			console.log("data:"+JSON.stringify(data));
			m_pathChangeMeasureRecords = data.pathPerformanceMeasureRecords;
			console.log("data2");
			$('#PathChangeMeasureDataQueryTable').datagrid('loadData',data.pathPerformanceMeasureRecords);//加载链路性能测量数据
			console.log("data3");
		},
		error:function()
		{
			console.log("查询条件失败");
		}
	});
}

/*选中复选按钮全部复选框*/
var m_isAllChecked = false;//全部复选框未被选中
function checkAll()
{
	//true:所有class属性为equipNameCheckbox的复选框全部勾选;false://所有class属性为equipNameCheckbox的复选框全部不勾选
	!m_isAllChecked ? $('.equipNameCheckbox').prop("checked",true):$('.equipNameCheckbox').prop("checked",false);
	m_isAllChecked = !m_isAllChecked;
	
	$('#PathChangeMeasureDataQueryTable').datagrid('loadData',m_pathChangeMeasureRecords);/*点击任务后设置相应任务的测量数据(所有的数据)*/
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

	showSatisfiedPathChangeMeasureData();
}

/**
 * 校验双向时延测量数据列表的日期
 */
function onSelectDateTime(selectedDate)
{
	dateValidator(this.id,selectedDate,"start_testTime","end_testTime");
}



