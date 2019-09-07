/**
 * 用于列表式任务管理的筛选条件的功能
 * 
 * */

/*选中筛选条件的全部筛选条件*/
var flag = 1;
function checkAll()
{
	console.log("haizeiwang");
	if( flag == 1)
	{
		$('label input[type=checkbox]').prop("checked",true);
		flag=0;
		$('#taskList').datagrid('loadData',Taskdatas);
	}
	else
	{
		$('label input[type=checkbox]').prop("checked",false);
		flag=1;
		$('#taskList').datagrid('loadData',Taskdatas);
	}
}

/*得到筛选条件中选中的条件*/
function getallselect()
{
	console.log("haizeiwang");
	var selectValue= [], loaddata =[], selectContent=[];
	if(flag==0)
	{
		$('#checkall').prop("checked",false);
	} 
    
	//得到所有筛选条件的值
    $('label input[type=checkbox]:checked').each(function()
    {
    	selectValue.push($(this).val());
    	selectContent.push(this.nextSibling.nodeValue);
    	console.log("筛选条件的值:"+$(this).val()+";筛选条件的内容:"+this.nextSibling.nodeValue);
    });
    
    //1.如果没有选中条件，则显示所有的数据
    if(selectValue.length==0)
    {
        $('#taskList').datagrid('loadData',Taskdatas);
    }
    
    //2.根据筛选条件的不同，显示的数据信息不同
	$.each(Taskdatas, function(i, item)
	{
		for(var j=0;j<selectContent.length;j++)
    	{
			var taskType = item.task_type;
    		if(taskType == selectContent[j])
    		{
    			loaddata.push(item);
    		}
    	}
	});
    $('#taskList').datagrid('loadData',loaddata);
      
  }