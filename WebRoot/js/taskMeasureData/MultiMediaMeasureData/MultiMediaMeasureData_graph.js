
/**
 * 多媒体业务性能测量数据的js文件 by zxgm 2016-11-8
 * */
 
 var m_index = 0,m_formateData = {},m_testTimeArray=[];//用于记录当前显示条数的下标
 /**
  * 显示多媒体业务性能测量数据的图标式表现形式
  */
 function loadView_graph()
 {
	 //1. 得到当前日期和目标探测设备
	 var testTime = $("#TestTime").datetimebox("getValue"),taskTargetId = $("#task_target").combobox("getValue");
	 getFormateData(testTime,taskTargetId);
 }
 
 /**
  * 得到符合显示数据格式的数据
  */
 function getFormateData(testTime,taskTargetId)
 {
	 $.ajax({
		url:"satisfiedMultiMediaMeasureDataQueryByList.html",
		type:"POST",
		data:{"taskNum":m_taskNum,"startTestTime":testTime,"endTestTime":null,"taskTarget":taskTargetId},
		success:function(data)
		{
			//1. 没有测量数据
			if(data.length == 0 )		
			{
				$("#measureDataInfo").empty();//测量数据清空
				$('#MultiMediaMeasureTestTime').html("");//测量时间清空
				$("#MultiMediaMeasureTestTarget").html("");//目标探测设备清空
				return;
			}	
			
			//2. 具有测量数据
			var lastDataRow = undefined;
			m_testTimeArray.length=0;
			for(var index in data)
			{
				var dataRow = data[index];
				if(lastDataRow != null && lastDataRow.testTime == dataRow.testTime)
				{
					lastDataRow = dataRow;
					continue;
				}
	
				lastDataRow = dataRow;
				m_testTimeArray.push(lastDataRow.testTime);
			}
			
			//3. 得到符合格式的多媒体业务性能测量数据
			for(var i=0;i<m_testTimeArray.length;i++)
			{
				var tempData=[];
				for(var j in data)
				{
					if(m_testTimeArray[i] == data[j].testTime)
					{
						tempData.push(data[j]);
					}
				}
				m_formateData[i] = tempData;
			}
			
			//4. 显示第一条数据记录
			if(m_formateData != null && m_testTimeArray.length != 0)
			{
				showRecord(0);
				m_index = 0;
			}	
		},
		error:function()
		{
			console.log("没有符合条件的结果数据");
		}
	});	
 }
 
 /**
  * 选中日期
  */
function onSelectDate(testTime)
{
	m_index = 0;
	var testTime = $("#TestTime").datetimebox("getValue"),taskTargetId = $("#task_target").combobox("getValue");
	getFormateData(testTime,taskTargetId);	
}

/**
 * 首条
 */
function FirstMultiMediaMeasureData()
{
	showRecord(0);
	m_index = 0;
	$('#pageNum').html(1);
}

/**
 * 前一条
 */
function PreviousMultiMediaMeasureData()
{
	if(m_index !=0 )
		showRecord(--m_index);
}

/**
 * 后一条
 */
function NextMultiMediaMeasureData()
{
	if(m_index != (m_testTimeArray.length-1))
		showRecord(++m_index);
}

/**
 * 末条
 */
function LastMultiMediaMeasureData()
{
	showRecord(m_testTimeArray.length-1);
	m_index = m_testTimeArray.length-1;
	$('#pageNum').html(m_testTimeArray.length);
}

/**
 * 设置显示为第i条数据
 */
function showRecord(i)
{
	$("#measureDataInfo").empty();
	var data = m_formateData[i];
	
	for(var index in data)
	{
		var content = "<div><label>"+data[index].flowIdString+"</label><label>最大单向时延:"+data[index].maxDelay+"ms</label>"+
						"<label>平均单向时延:"+data[index].avgDelay+"ms</label><label>单向时延抖动:"+data[index].jitter+"ms</label>"+
						"<label>单向丢包率:"+data[index].lossRate+"%</label><label>平均双向时延:"+data[index].avgDoubleDelay+"ms</label>"+
						"<label>比特率:"+data[index].bitrate+"kbs</label><label>质量:"+data[index].level+"</label></div>";
		$("#measureDataInfo").append(content);
	}
	
	//2. 设置源探测设备、时间、目标探测设备
	var d = new Date(data[0].testTime);
	var dateString = d.toLocaleDateString()+" "+d.toTimeString().substring(0,8);
	$('#MultiMediaMeasureTestTime').html(dateString);		//设置测量时间
	$("#MultiMediaMeasureTestFrom").html(m_taskSubjectEquipName);	//设置源探测设备
	$("#MultiMediaMeasureTestTarget").html(m_taskTargetEquipName);	//设置目标探测设备
	$('#pageNum').html(m_index+1);
}

	


