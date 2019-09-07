/**
 * 任务列表条件过滤
 */
//标识全部是否被勾选,任务名称，任务类型列表（1；2；3；4），任务状态(0;1;3;4)，页面(currentPageNum,hasNextPage,hasPreviousPage,pageSize,result,totalCount,totalPageCount)
var m_isAllCheck = true, m_taskName="", m_taskTypeString="", m_taskStatString="",m_page=undefined;


/**
 * 全部复选框被点击
 * @return
 */
function checkAll()
{
	var checkAllValue = [];
	//得到所有筛选条件的值
	$('label input[type=checkbox]').each(function()
	{
		checkAllValue.push($(this).val());
	});
	
	m_taskTypeString = checkAllValue.join(";");//任务类型列表1;2;3;4;
	
	m_taskTypeString="";
	if(m_isAllCheck)
	{
		$('label input[type=checkbox]').prop("checked",true);
		m_isAllCheck=false;
	}
	else
	{
		$('label input[type=checkbox]').prop("checked",false);
		m_isAllCheck=true;
	}
	
	var page = new Page(m_taskName,m_taskTypeString,m_taskStatString,m_currentPageNum,m_pageSize);
	page.getPageData();
}

var m_satisfyConditionData,m_selectValue=[];

/**
 * 以指定任务名称模糊查询任务
 * @param value
 * @param name
 * @return
 */
function searchTaskByLikeTaskName(value,name)
{
	m_taskName = value;
	var page = new Page(m_taskName,m_taskTypeString,m_taskStatString,m_currentPageNum,m_pageSize);
	page.getPageData();
}

/**
 * 点击任务状态筛选条件触发事件
 */
function clickTaskStatCheckbox()
{
	var valueForTaskStat=[];
	$("span input[type=checkbox]:checked").each(function(){
		valueForTaskStat.push($(this).val());
	});
	
	m_taskStatString = valueForTaskStat.join(";");//任务状态列表0;3;
	
	var page = new Page(m_taskName,m_taskTypeString,m_taskStatString,m_currentPageNum,m_pageSize);
	page.getPageData();
}

/**
 * 点击任务类型筛选条件触发事件
 */
function clickTaskKindCheckbox()
{
	m_selectValue.length = 0;
	
	if(!m_isAllCheck)//所有复选框已被勾选
	{
		$('#checkall').prop("checked",false);
	} 
	
	var selectValue=[],loadData=[];
	
	//得到所有筛选条件的值
	$('label input[type=checkbox]:checked').each(function()
	{
		selectValue.push($(this).val());
		m_selectValue.push($(this).val());
	});
	
	m_taskTypeString = m_selectValue.join(";");//任务类型列表1;2;3;4;
	
	var totalTaskKindNums = $("label input[type=checkbox]").length-1;
	    
	if(selectValue.length == totalTaskKindNums)//3.1 所有任务类型都被勾选，则全部复选框也被勾选
	{
		$("#checkall").prop("checked", true);//勾选全部复选框
		m_isAllCheck = false;
	}
	
	var page = new Page(m_taskName,m_taskTypeString,m_taskStatString,m_currentPageNum,m_pageSize);
	page.getPageData();
}

/**
 * Page对象，用于处理分页数据
 * @returns {Page}
 */
function Page(taskName,taskTypeString,taskStatString,currentPageNum,pageSize)
{
	this.taskName = taskName;
	this.taskTypeString = taskTypeString;
	this.taskStatString = taskStatString;
	this.currentPageNum = currentPageNum;
	this.pageSize = pageSize;
	var page;
	
	/**
	 * 得到分页数据
	 */
	this.getPageData = function()
	{
		getTasksByConditionPage(this.taskName,this.taskTypeString,this.taskStatString,this.currentPageNum,this.pageSize);
		paginationByCondition();
	};
	
	/**
	 * 返回指定条件的任务分页数据
	 * @returns
	 */
	function getTasksByConditionPage(taskName,taskTypeString,taskStatString,currentPageNum,pageSize)
	{
		$.ajax({
			type:"POST",
			url:"getTasksByConditionPage.html",
			async:false,
			data:{"taskName":taskName,"taskTypeString":taskTypeString,
				"taskStatString":taskStatString,"currentPageNum":currentPageNum,"pageSize":pageSize},
			success:function(data)
			{
				page = data.page;
				var result = page.result;
				if(result.length == 0)
				{
					$("#taskDatagrid").datagrid("loadData",[]);
				}else
				{
					$("#taskDatagrid").datagrid("loadData",result);
				}
			},
			error:function()
			{
				console.log("获取分页任务信息失败");
			}
		});
	}

	/**
	 * 根据条件刷新分页工具
	 */
	function paginationByCondition()
	{
		var pager = $("#taskDatagrid").datagrid("getPager");
		$(pager).pagination({
			pageList:[15],
			pageSize:15,
			total:page.totalCount,
			onSelectPage:function(pageNo,pageSize)
			{
				getTasksByConditionPage(taskName,taskTypeString,taskStatString,pageNo,pageSize);
				pager.pagination("refresh",{
					total:page.totalCount,
					pageNumber:pageNo
				});
			}
		});
	}
}



