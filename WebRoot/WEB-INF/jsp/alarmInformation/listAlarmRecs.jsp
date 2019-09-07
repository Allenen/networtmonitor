<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>index</title>
    <link href="jqueryEasyUI/icon.css" rel="stylesheet">
    <link href="jqueryEasyUI/easyui.css" rel="stylesheet">
    <link href="css/alarmInformation/listAlarmRecs.css" rel="stylesheet">
    
    
    <script src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
    <script src="jqueryEasyUI/jquery.easyui.min.js"></script>

    <script  src="jquery/jquery.json-2.2.min.js"></script>
    <script type="text/javascript">
      
       function generateExcel()
       {
          var jsonstr = JSON.stringify(AlarmRecDatas);
          var temp =document.createElement("form");
          temp.action= 'exportAlarmRecExcel.html';
          temp.method= "post";
          temp.style.display ="none";
          var opt=document.createElement("textarea");
          opt.name = 'alarmRecs';
          opt.value = jsonstr;
          temp.appendChild(opt);
          document.body.appendChild(temp);
          temp.submit();
       }
    </script>
</head>
  
  <body>
              <form id="ff" method="post">
                  <div id="toolbar" class="cl">
                      <div class="fr">
                          <a href="#" onclick="generateExcel()" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" >生成Excel</a>
                       
                      </div>
                     
                  </div>
                  <table id="list1" class="easyui-datagrid"></table>
                 
              </form>
<script>
   function AlarmRec(alarm_newest,alarm_equipName,alarm_subkind,alarm_level,alarmKeepMinute,alarm_ip)
       {
          
           var date = new Date(alarm_newest);
              var date1  =new Date(date);
  		 	  var y = date1.getFullYear();
	          var m = date1.getMonth()+1;
	          if(m<10)m='0'+m;
	           var d = date1.getDate();
	            if(d<10)d='0'+d;
	            var h= date1.getHours();
	             if(h<10)h='0'+h;
	            var mm= date1.getMinutes();
	             if(mm<10)mm='0'+mm;
	            var s= date1.getSeconds();
	            if(s<10)s='0'+s;
	        this.alarm_newest = y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
  		
           this.alarm_equipName =  alarm_equipName;
           this.alarm_subkind = alarm_subkind;
           this.alarm_level = alarm_level;
           this.alarmKeepMinute = alarmKeepMinute;
           this.alarm_ip = alarm_ip;

       }
        var AlarmRecDatas = [];
          $(function () {
             $.ajax( {   //异步获取所有设备信息
		          type : 'POST',
		          contentType : 'application/json;charset=UTF-8',
		          url : 'ajaxGetAllAlarmRecs.html',
		          dataType : 'json',
		          success : function(data) {
		             if (data.data=="null") {
			            // data1=null;
			            // window.location.href="listEquips.html";
			           // alert('a');
			          }
			          else{
			           //  alert(data.total);
			             
		                 $.each(data.data, function(i, item) {
		                     AlarmRecDatas.push(new AlarmRec(item.alarm_newest,item.alarm_equipName,item.alarm_subkind
		                     ,item.alarm_level,item.alarmKeepMinute,item.alarm_ip));

		                  });
		                 // alert(EquipDatas);
		                  $('#list1').datagrid({
		                     title:"最新告警信息列表"
			               , data: AlarmRecDatas.slice(0,10)
			               , toolbar: '#toolbar'
			               ,fitColumns:true
			               , pagination: true
			               
			               , columns: [[
			                   {
			                       field: 'alarm_newest'
			                       , title: '告警时间'
			                       , width: 50
			                       , algin: 'center'
			                   }
			                   , {
			                       field: 'alarm_equipName'
			                       , title: '设备名称'
			                       , width: 25
			                       , algin: 'center'
			                   }
			                   , {
			                       field: 'alarm_subkind'
			                       , title: '告警名称'
			                       , width: 25
			                       , algin: 'center'
			                   }
			                   , {
			                       field: 'alarm_level'
			                       , title: '告警等级'
			                       , width: 25
			                       , algin: 'center'
			                   }
			                   , {
			                       field: 'alarmKeepMinute'
			                       , title: '历时（分钟）'
			                       , width: 20
			                       , algin: 'center'
			                   }
			                   , {
			                       field: 'alarm_ip'
			                       , title: '告警IP地址'
			                       , width: 40
			                       , algin: 'center'
			                   }
			                  ]]
			            });
			            
			            
			            var pager = $('#list1').datagrid('getPager');
					    //  alert(pager);
					     //   alert('a');
					        $(pager).pagination({
					         total: AlarmRecDatas.length,      
					          onSelectPage:function(pageNo, pageSize){
								var start =(pageNo-1)*pageSize;
								var end = start+pageSize;
								$('#list1').datagrid('loadData',AlarmRecDatas.slice(start,end));
							//	alert('pageNumber:'+pageNo+',pageSize:'+pageSize);
								$(pager).pagination('refresh',{
								  total:AlarmRecDatas.length,
								  pageNumber:pageNo
								});
								
							  }
					          
					      });  
			            

			          }
		          },
		          error : function(data) {
		            alert("服务器异常") ;
		          }
		        });
		        
		        
		        
           });
           
</script>
  </body>
  
</html>
