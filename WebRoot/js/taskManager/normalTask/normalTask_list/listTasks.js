/**
 * 用于任务列表的js文件  2016-12-10
 */

var Taskdatas = [];
//当前页为第一页，页面大小为15  2016-12-27
var m_currentPageNum = 1, m_pageSize = 15, m_totalCount, m_allTotalCount;
var myChartForTaskType, myChartForTaskStat;
var m_legendDataForTaskType = [], m_seriesDataForTaskType = [];
var m_legendDataForTaskStat = [], m_seriesDataForTaskStat = [];


/**
 * 文档加载完成后触发
 */
$(function () {
	
	//以指定任务名称模糊查询任务
	$('#searchTaskByLikeTaskName').searchbox({ 
		searcher:function(value, name)
		{ 
			searchTaskByLikeTaskName(value, name);
		}, 
		prompt:'请输入任务名称' 
	});
	
    //基于准备好的dom，初始化echarts图表
	myChartForTaskType = echarts.init(document.getElementById("taskTypeView"));
	//基于准备好的dom，初始化echarts图表
	myChartForTaskStat = echarts.init(document.getElementById("taskStatView"));
	//初始化图形表格结构
	initTasksDatagrid();
	
	//分页获取 数据
	var page = new Page(m_taskName,m_taskTypeString,m_taskStatString,m_currentPageNum,m_pageSize);
	page.getPageData();

});


/**
 * 将表单数据以JSON对象返回
 */
$.fn.serializeObject = function()
{   
	var o = {};   
	var a = this.serializeArray();   
	$.each(a, function() {   
		if (o[this.name])
		{   
			if (!o[this.name].push)
			{   
				o[this.name] = [ o[this.name] ];   
			}   
			o[this.name].push(this.value || '');   
		} else
		{   
			o[this.name] = this.value || '';   
		}   
	});   
	return o;   
}; 

/**
 * 任务添加
 * @return
 */
function addTask()
{
	$('#win').window('open');
}

/**
 * 关闭任务添加UI界面
 * @return
 */
function closeWin()
{
    $('#win').window('close');
}

/**
 * 关闭对话框UI界面
 * @return
 */
function closeDialog()
{
 $('#popUpWindow').dialog('close');
}

/**
 * 任务列表结构初始化
 */
function initTasksDatagrid()
{
	$('#taskDatagrid').datagrid(
	{
		toolbar: '#toolbar',
		pagination: true,
		fitColumns:true,
		striped:true,
		columns: [[
		{
			field: 'checked',
			title: '',
			checkbox: true,
			width: '2%'
		},
		{
			field: 'task_num',
			title: '任务号',
			align: 'center',
			width: '5%'
		},
		{
			field: 'task_type',
			title: '任务类型',
			width: '8%',
			algin: 'center',
			formatter:function(value,row,index)
			{
				switch(value)
				{
					case 1:return '双向时延';
					case 2:return '单向时延';
					case 3:return '阻断测量';
					case 4:return 'TE隧道测量';
					case 5:return '链路性能测量';
					case 6:return '链路变化监测';
					case 7:return '多媒体业务';
					default:return '通用业务';
				}
			}
		},
		{
			field: 'task_subject',
			title: '任务主体',
			width: '7%',
			align: 'center'
		},
		{
			field: 'task_name',
			title: '任务名',
			width: '26%'
		},
		{
			field: 'is_cycle',
			title: '周期性',
			width: '6%',
			align: 'center',
			formatter:function(value,row,index)
			{
				return value==0 ? '否':'是';
			}
		},
		{
			field: 'task_interval',
			title: '测量间隔',
			align: 'center',
			width: '7%',
			formatter:function(value,row,index)
			{
				return value+"秒";
			}
		},
		{
			field: 'send_ip',
			title: '上报IP',
			width: '10%'
		},
		{
			field: 'start_time',
			title: '开始时间',
			width: '13%',
			formatter:function(value,row,index)
			{
				var d = new Date(value);
				return d.toLocaleDateString()+" "+d.toTimeString().substring(0, 8);
			}
		},
		{
			field: 'task_stat',
			title: '任务状态',
			align: 'center',
			width: '8%',
			formatter:function(value,row,index)
			{
				switch(value)
				{
					case 0: return '未激活';
					case 1: return '激活未下发';
					case 2: return '激活已下发';
					case 3: return '停止任务';
					default: return '下发失败';
				}
			}
		},
		{
			field: 'editlist',
			title: '操作',
			width: '8%',
			align: 'center',
			formatter: editlist
		}
		]]
	});	
}
 
/**
 * 任务列表的操作  2016-12-13
 * @param value
 * @param row
 * @param index
 * @return
 */
function editlist(value, row, index)
{
	var task_num = row.task_num;
    var task_name = row.task_name;
    var task_stat = row.task_stat;
    var task_type_num = row.task_type_num;
    
    /*var editContent = '<a href="javascript:void(0);" onclick="editTask(\''+task_num+'\',\''+task_type_num+'\')">'+
    						'<i class="icon-edit" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin:3px;"></i>'+
    					 '</a>'+
      				 '<a href="javascript:void(0);" onclick ="activeTask(\''+task_num+'\',\''+task_stat+'\')">'+
      					'<i class="icon-ok" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin:3px;"></i>'+
      				 '</a>'+
      				 '<a href="javascript:void(0);" onclick="measureDataInfo(\''+task_num+'\',\''+task_type_num+'\')">'+
      					'<i class="icon-search" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin:3px;"></i>'+
      				 '</a>';*/
    //1.编辑任务 	2.单个激活任务	3.任务测量数据查询
    var editContent = '<a href="javascript:void(0);" onclick="editTask(\''+task_num+'\',\''+task_type_num+'\')">'+
						'<i class="icon-edit" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin:3px;"></i>'+
					 '</a>'+
					 '<a href="javascript:void(0);" onclick ="activeTask(\''+task_num+'\',\''+task_stat+'\',\''+index+'\')">'+
						'<i class="icon-ok" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin:3px;"></i>'+
					 '</a>'+
					 '<a href="measureDataInfo.html?tasknum='+task_num+'" target="_blank">'+
						'<i class="icon-search" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin:3px;"></i>'+
					 '</a>';
    
    return editContent;
}

/**
 * 任务列表中点击测量数据  2016-12-13
 * @param taskNum 任务编号
 * @return
 */
function measureDataInfo(taskNum, taskTypeNum)
{
	var title;
	switch(taskTypeNum)
	{
		case "0": title = "双向时延测量数据"; break;
		case "1": title = "单向时延测量数据"; break;
		case "2": title = "阻断测量数据"; break;
		case "3": title = "TE隧道测量数据"; break;
		case "4": title = "链路性能测量数据"; break;
		case "5": title = "链路变化监测数据"; break;
		case "6": title = "多媒体业务测量数据"; break;
		case "7": title = "通用业务测量数据"; break;
	}
		
	$('#popUpWindow').dialog(
	{    
		title: title,    
		width: 1200,    
		height: 700,   
		closed: false,    
		cache: false,    
		href: 'measureDataInfo.html?tasknum='+taskNum
	});
}

/**
 * 任务列表中点击编辑任务  2016-12-13
 * @param taskNum 任务编号
 * @param taskTypeNum 任务类型
 * @return
 */
function editTask(taskNum, taskTypeNum)
{
	$('#popUpWindow').dialog(
	{    
		title: '编辑任务信息',    
		width: 700,    
		height: 400,   
		closed: false,    
		cache: false,    
		href: 'get_Taskcontent.html?tasknum=' + taskNum,   
		modal: true
	});
} 
    
//记录任务编号字符串,选中的行
var m_taskNumList = "", m_selectRows = [];
/**
 * 批量激活任务
 */
function activeTasks()
{
	m_taskNumList = "";//任务编号字符串置为空字串
	var selectRows = $('#taskDatagrid').datagrid("getSelections");
	
	for(var index in selectRows)
	{
		var row = selectRows[index];		//选中的行
		if(row.task_stat != 0)
		{
			$.messager.alert('提示','存在已激活的任务');
			return;
		}
		
		m_taskNumList = m_taskNumList+row.task_num+";";
		m_selectRows.push(row);
	}
	
	activeTaskByBatch();//批量激活任务
}


/**
 * 批量激活任务
 * @param taskNum
 */ 
function activeTaskByBatch()
{
	$("#popUpWindow").dialog({
		title:"激活任务",
		width:550,
		height:300,
		closed:false,
		href:"activeTaskUI.html",
		modal:true
	});
}


/**
 * 单个激活任务
 * @param taskNum
 * @param taskstat
 * @return
 */
function activeTask(taskNum, taskStat,index)
{
	m_selectRows.length = 0;
	
	if(taskStat != 0)//taskStat不等于0
	{
		$.messager.alert("提示","任务已激活，无法再次激活");
	}else
    {
		$("#taskDatagrid").datagrid("selectRow",index);
		var selectRow = $("#taskDatagrid").datagrid("getSelected");
		m_taskNumList = m_taskNumList+taskNum+";";
		m_selectRows.push(selectRow);
		
    	$('#popUpWindow').dialog(
    		{  
    			title: '激活任务',    
    			width: 550,
    			height: 300,    
    			closed: false,
    			cache: false,   
    			href: 'activeTaskUI.html?taskNum='+taskNum,   
    			modal: true,
    			resizable:true
    		});
    }
}

/**
 * 激活任务弹窗的激活确定按钮
 */
function activeTaskForm()
{
	var jsonObj = $('#activeTaskff').serializeObject();
	var startTime = jsonObj["start_time"];
	
	var taskNumArray = m_taskNumList.split(";");
	var activeTaskInfo = JSON.stringify(jsonObj);
	  
	$.ajax({   
	    type : 'POST',   
	    url : 'activeAjaxTask.html',   
	    data : {"activeTaskInfo":activeTaskInfo,"taskNumString":m_taskNumList},   
	    success : function(data)
	    {   
			for(var i in m_selectRows)
	    	{
	    		var rowIndex = $("#taskDatagrid").datagrid("getRowIndex",m_selectRows[i]);
	    		console.log(rowIndex);
	    		m_selectRows[i].start_time=startTime;
	    		m_selectRows[i].task_stat=1;
	    		$("#taskDatagrid").datagrid("refreshRow",rowIndex);
	    	}
	    	
	        closeDialog();             
	    },   
	    error : function(data)
	    {   
	    	$.messager.alert("警告","激活任务失败");
	    }   
	}); 
}

/**
 * 批量删除
 * @return
 */
function removeTasks()
{
	var opts = $('#taskDatagrid').datagrid('getChecked');
	if(opts.length==0)
	{
		$.messager.alert("未选中任何记录");
		return;
	}
       
	$.messager.confirm('删除',
   	'确定要删除这  '+opts.length+' 个任务?',
	function(r)
	{    
		if (r)
		{       
			var taskNumList="";
			$.each(opts, function(i, item){taskNumList = taskNumList+item.task_num+";";});
 
			//后台批量删除任务
			$.ajax( {   
				type : 'POST',   
				url : 'deleteTasksByTaskNumList.html',   
				data : {'taskNumList':taskNumList},   
				success : function(data)
				{   
					//datagrid删除行
					$.each(opts, function(i, item)
				    {
		            	var index = $('#taskDatagrid').datagrid('getRowIndex',item);
		              	$('#taskDatagrid').datagrid('deleteRow',index);
		            });  
					
					//分页获取 数据
					var page = new Page(m_taskName,m_taskTypeString,m_taskStatString,m_currentPageNum,m_pageSize);
					page.getPageData();
		          },   
		          error : function(data)
		          {   
		        	  $.messager.alert("删除失败"); 
		          }   
			});   
         }else{
    
         }
     });  
}

    
/**
 * 用于任务状态和任务类型的视图设置  2016-12-8
 */
function showTaskStatAndTaskType()
{
	//为任务状态准备数据  20170122
	prepareDataForTaskType();
	
	var timeTicket;
	optionForTaskType = {
			title : {text: '任务类型'},
			tooltip :
			{
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend:
			{
				x : 'center',
				y : 'bottom',
				data:m_legendDataForTaskType
			},
    	    toolbox:
    	    {
    	        show : true,
    	        feature : {
    	            dataView : {show: true, readOnly: false},
    	            restore : {show: true},
    	            saveAsImage : {show: true}
    	        }
    	    },
    	    calculable : true,
    	   
    	    series : [ {
    	            name:'任务类型',
    	            type:'pie',
    	            radius : ['10%', '60%'],
    	            center : ['60%', '50%'],
    	            roseType : 'radius',
    	            x: '60%',               // for funnel
    	            max: 40,                // for funnel
    	            sort : 'ascending',     // for funnel
    	            data:m_seriesDataForTaskType
    	     } ]
	};
        	                    
	myChartForTaskType.clear();
    myChartForTaskType.setOption(optionForTaskType);
	
	//为任务状态准备数据
	prepareDataForTaskStat();
	
	var timeTicket;

	optionForTaskStat = {
			title : { text: '任务状态' },
			tooltip : { trigger: 'item' },
			toolbox: {
    	        show : true,
    	        feature : {
    	            dataView : {show: true, readOnly: false},
    	            restore : {show: true},
    	            saveAsImage : {show: true}
    	        }
    	    },
    	    calculable : true,
    	    grid:{
    	    	borderWidth:0,
    	    	x:20,
    	    	y2:20
    	    },
    	    xAxis : [ {
    	            type : 'category',
    	           //show:false,
    	            data : m_legendDataForTaskStat
    	    } ],
    	    yAxis : [ {
    	            type : 'value',
    	            //show:false
    	        } ],
    	    series : [
    	        {
    	        	name:"任务状态",
    	        	type:"bar",
    	        	itemStyle:{
    	        		normal:{
    	        			color:function(params)
    	        			{
    	        				var colorList=[
    	        					'#2EC7C9','#B6A2DE','#5AB1EF','#FFB980','#8D98B3',
  	                                   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
  	                                   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
    	        				];
    	        				return colorList[params.dataIndex];
    	        			},
    	        			label:{
    	        				show:true,
    	        				position:"top",
    	        				formatter:'{b}\n{c}'
    	        			}
    	        		}
    	        	},
    	        	data:m_seriesDataForTaskStat
    	        }
    	    ]
    };
	myChartForTaskStat.clear();
	myChartForTaskStat.setOption(optionForTaskStat);

}



/**
 * 为任务状态准备数据
 */
function prepareDataForTaskStat()
{
	m_legendDataForTaskStat = [];
	m_seriesDataForTaskStat = [];
	//获取任务状态信息，采用key-value的形式，例如：激活-10
	$.ajax({
		url:"getTaskStatNameCount.html",
		type:"POST",
		async:false,
		success:function(data)
		{
			for(var k in data)
			{
				m_legendDataForTaskStat.push(k);
				m_seriesDataForTaskStat.push(data[k]);
			}
		},
		error:function()
		{
			console.log("获取任务状态信息失败");
		}
	});
}
   


function prepareDataForTaskType()
{
	m_legendDataForTaskType = [];
	m_seriesDataForTaskType = [];
	$.ajax({
		url:"getTaskTypeNameCount.html",
		type:"POST",
		async:false,
		success:function(data)
		{
			for(var k in data)
			{
				m_legendDataForTaskType.push(k);
				m_seriesDataForTaskType.push({value:data[k],name:k});
			}
			
		},
		error:function()
		{
			console.log("获取任务类型失败");;
		}
	});
}

function switchView(){
	var table = document.getElementById("dataTable");
	var layout = document.getElementById("viewLayout");
	if(table.style.display == "none"){
		table.style.display = "";
		layout.style.display = "none";
	}	
	else{
		table.style.display = "none";
		showTaskStatAndTaskType();
		layout.style.display = "";
	}
}
    
   
