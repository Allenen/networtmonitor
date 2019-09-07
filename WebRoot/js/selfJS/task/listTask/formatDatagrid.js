/*用于将后台的task任务转化为easyui datagrid格式的数据*/
    function Task(task_num,task_type,task_subject,task_name,
            is_cycle,task_interval,interval_unit,
            send_ip,start_time,task_stat,task_type_num)
   {
       this.task_num = task_num;
       var taskType;
       $.ajax(
       {
    	   type:"POST",
    	   url:"getDictByDictTypeAndDictNumb.html?dict_type=RWLB&dict_numb="+task_type,
    	   async:false,
    	   success:function(data)
    	   {
		   	   taskType=data.dict_cont;
    	   },
    	   error:function()
    	   {
    		   
    	   }
       });
       console.log("用于将后台的task任务转化为easyui datagrid格式的数据");
       this.task_type_num = task_type;
       this.task_type=taskType;
       this.task_subject =  task_subject;
       this.task_name= task_name;
       if(is_cycle==0){
          this.is_cycle="否";
       }else{
          this.is_cycle="是";
       }
       if(interval_unit=="s"){
          this.task_interval=task_interval+"秒";
       }else if(interval_unit=="m"){
          this.task_interval=task_interval+"分";
       }else if(interval_unit=="h"){
           this.task_interval=task_interval+"时";
       }else if(interval_unit=="d"){
           this.task_interval=task_interval+"天";
       }else{
          this.task_interval=task_interval+"秒";
       }
       this.send_ip = send_ip;
       var date = new Date(start_time);
       this.start_time = date.toLocaleString();
       
       if(task_stat==0){
         this.task_stat = "未激活"; 
       }else if(task_stat==1){
         this.task_stat = "激活未下发"; 
       }else if(task_stat==2){
          this.task_stat = "激活已下发"; 
       }else if(task_stat==3){
          this.task_stat = "用户要求停止该任务"; 
       }else if(task_stat==4){
          this.task_stat = "下发失败"; 
       }else{
          this.task_stat = "已完成";
       }
       
   }
    var Taskdatas = [];
    
    
    $(function () {
       //获取设备信息
         $.ajax( {   
	          type : 'POST',   
	          contentType : 'application/json;charset=UTF-8',  
	          url : 'ajaxGetAllTasks.html',    
	          dataType : 'json',   
	          success : function(data)
	          {   
	             if (data.data=="null")
	             {   
		           
		         }else
		         {
	                 $.each(data.data, function(i, item)
	                 { 
	                	 var task = new Task(item.task_num,item.task_type,item.task_subject,item.task_name
	    	                     ,item.is_cycle,item.task_interval,item.interval_unit,item.send_ip,item.start_time,item.task_stat,item.task_type);
	                     Taskdatas.push(task);
	                 }); 
	                 
	                 $('#taskList').datagrid(
	                 {
		                 title:"任务列表显示",
			             data: Taskdatas.slice(0,10),
			             toolbar: '#toolbar',
			             pagination: true,
			             columns: [[
		                   {
		                       field: 'checked',
		                       title: '',
		                       checkbox: true,
		                       width: 30
		                   },
		                   {
		                       field: 'task_num',
		                       title: '任务号',
		                       width: 20,
		                       algin: 'center'
		                   },
		                   {
		                       field: 'task_type',
		                       title: '任务类型',
		                       width: 140,
		                       algin: 'center'
		                   },
		                   {
		                       field: 'task_subject',
		                       title: '任务主体',
		                       width: 80,
		                       algin: 'center'
		                   },
		                   {
		                       field: 'task_name',
		                       title: '任务名',
		                       width: 200,
		                       algin: 'center'
		                   },
		                   {
		                       field: 'is_cycle',
		                       title: '周期性',
		                       width: 50,
		                       algin: 'center'
		                   },
		                   {
		                       field: 'task_interval',
		                       title: '测量间隔',
		                       width: 60,
		                       algin: 'center'
		                   },
		                   {
		                       field: 'send_ip',
		                       title: '上报IP',
		                       width: 90,
		                       algin: 'center'
		                   },
		                   {
		                       field: 'start_time',
		                       title: '开始时间',
		                       width: 150,
		                       algin: 'center'
		                   },
		                   {
		                       field: 'task_stat',
		                       title: '任务状态',
		                       width: 80,
		                       algin: 'center'
		                   },
		                   {
		                       field: 'editlist',
		                       title: '操作',
		                       width: 70,
		                       algin: 'center',
		                       formatter: editlist
		                   }
		               ]]
		            });
	                 console.log("用于将后台的task任务转化为easyui datagrid格式的数据3");
		             var pager = $('#taskList').datagrid('getPager');
		             console.log("用于将后台的task任务转化为easyui datagrid格式的数据4");
				        $(pager).pagination(
				        {
					        total: Taskdatas.length,      
					        onSelectPage:function(pageNo, pageSize)
					        {
								var start =(pageNo-1)*pageSize;
								var end = start+pageSize;
									
								$('#taskList').datagrid('loadData',Taskdatas.slice(start,end));
								$(pager).pagination('refresh',
								{
									total:Taskdatas.length,
									pageNumber:pageNo
								});
							}
				       });  
		           }  		           
	          },   
	          error : function(data)
	          { 
	            alert("服务器异常") ; 
	          }   
	        }); 
    });