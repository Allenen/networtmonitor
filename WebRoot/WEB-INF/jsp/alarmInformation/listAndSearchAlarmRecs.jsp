<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>index</title>
    <link href="${pageContext.request.contextPath }/jqueryEasyUI/icon.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/jqueryEasyUI/easyui.css" rel="stylesheet">
    <link href="css/alarmInformation/listAndSearchAlarmRecs.css" rel="stylesheet">
    
    <script src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath}/lib/js/jquery.easyui.min.js"></script>
    <script  src="${pageContext.request.contextPath}/js/jquery.json-2.2.min.js"></script>
    <script type="text/javascript">
        
        
        function getallselect(){
	     
	    
	      $('table td label input[type=checkbox]').not('input:checked').each(function(){
	         var index = $(this).val();
	         if(index==1){
	         $('#list1').datagrid("hideColumn","alarm_equipName");
	       
	        }
	      if(index==2){
	         $('#list1').datagrid("hideColumn","alarm_ip");
	        
	      }
	       if(index==3){
	         $('#list1').datagrid("hideColumn","alarm_mainkind");
	       
	      }
	       if(index==4){
	         $('#list1').datagrid("hideColumn","alarm_subkind");
	       
	      }
	       if(index==5){
	         $('#list1').datagrid("hideColumn","alarm_first");
	        
	      }
	       if(index==6){
	         $('#list1').datagrid("hideColumn","alarm_newest");
	        
	      }
	       if(index==7){
	         $('#list1').datagrid("hideColumn","alarmKeepMinute");
	        
	      } if(index==8){
	         $('#list1').datagrid("hideColumn","alarm_level");
	       
	      }
	      });
	       $('table td label input[type=checkbox]:checked').each(function(){
	         var index = $(this).val();
	         if(index==1){
	         $('#list1').datagrid("showColumn","alarm_equipName");
	       
	        }
	      if(index==2){
	         $('#list1').datagrid("showColumn","alarm_ip");
	        
	      }
	       if(index==3){
	         $('#list1').datagrid("showColumn","alarm_mainkind");
	       
	      }
	       if(index==4){
	         $('#list1').datagrid("showColumn","alarm_subkind");
	       
	      }
	       if(index==5){
	         $('#list1').datagrid("showColumn","alarm_first");
	        
	      }
	       if(index==6){
	         $('#list1').datagrid("showColumn","alarm_newest");
	        
	      }
	       if(index==7){
	         $('#list1').datagrid("showColumn","alarmKeepMinute");
	        
	      } if(index==8){
	         $('#list1').datagrid("showColumn","alarm_level");
	       
	      }
	      });

	  }
	  function generateExcel(){
	     var alldate =  $('#list1').datagrid("getRows");
	     var jsonstr = JSON.stringify(alldate);
	     //alert(jsonstr);
         var temp =document.createElement("form");
          temp.action= '${pageContext.request.contextPath}/exportAllColAlarmRecExcel.html';
          temp.method= "post";
          temp.style.display ="none";
          var opt=document.createElement("textarea");
          opt.name = 'alarmRecs';
          opt.value = jsonstr;
          temp.appendChild(opt);
          document.body.appendChild(temp);
          temp.submit();
          
	  }
	  function queryRec(){
	  
	       var loaddata1 = [];
	       var loaddata = [];
	       var field1 = $('#field1').combobox('getValue');
	      
	       var operate1 = $('#operate1').combobox('getValue');
	       var value1 = $('#value1').combobox('getText');
	       
	       var field2 = $('#field2').combobox('getValue');
	      
	       var operate2 = $('#operate2').combobox('getValue');
	       var value2 = $('#value2').combobox('getText');
	       
	       var link1 = $('#link1').combobox('getValue');
	        var link2 = $('#link2').combobox('getValue');
	       if(!field1){
	            alert('未选择任何选项');
	            return;
	       }else{
	           if(!operate1){
	               alert('未对'+field1+'选择任何操作'); 
	               return;
	           }else{
	               if(!value1){
	                   alert('未对'+field1+'选择任何取值'); 
	                   return;
	               }else{
	                  
	               }
	           }
	       }     
	     
	      //存在连接符
	       if(link1){
	           if(!field2){
	            alert('第二项未选择任何选项');
	            return;
	          }else{
	           if(!operate2){
	               alert('第二项未对'+field2+'选择任何操作'); 
	               return;
	           }else{
	               if(!value2){
	                   alert('第二项未对'+field2+'选择任何取值'); 
	                   return;
	               }else{
	                  
	               }
	             }
	          }
	          if(link1=="&&"){
	           $.each(AlarmRecDatas, function(i, item){
	           var operate ="";
	           if(isNaN(value1)){
	             if(operate1!="=="){
	               operate1="=="
	             }
	             operate = 'item.'+field1+operate1+"'"+value1+"'";
	           }else{
	             operate = 'item.'+field1+operate1+value1;
	           }
	           if(eval(operate)){
	             loaddata1.push(item);
	           }
	          }); 
	           $.each(loaddata1, function(i, item){
	             var operate ="";
	             if(isNaN(value2)){
	              if(operate2!="=="){
	                operate2="=="
	                
	             }
	             operate = 'item.'+field2+operate2+"'"+value2+"'";
	           }else{
	             operate = 'item.'+field2+operate2+value2;
	           }
	           if(eval(operate)){
	             loaddata.push(item);
	              
	           }
	         });
	            $('#list1').datagrid('loadData',loaddata);
	        
	          } 
	          if(link1=="||"){
	           $.each(AlarmRecDatas, function(i, item){
	           var operate ="";
	           if(isNaN(value1)){
	             if(operate1!="=="){
	               operate1="=="
	             }
	             operate = 'item.'+field1+operate1+"'"+value1+"'";
	           }else{
	             operate = 'item.'+field1+operate1+value1;
	           }
	           if(eval(operate)){
	             loaddata1.push(item);
	           }
	          }); 
	           $.each(AlarmRecDatas, function(i, item){
	             var operate ="";
	             if(isNaN(value2)){
	              if(operate2!="=="){
	                operate2="=="
	             }
	             operate = 'item.'+field2+operate2+"'"+value2+"'";
	           }else{
	             operate = 'item.'+field2+operate2+value2;
	           }
	           if(eval(operate)){
	             loaddata1.push(item);
	           }
	         });
	           $('#list1').datagrid('loadData',loaddata1);
	               
	          }     
	           
	       }else{
	           $.each(AlarmRecDatas, function(i, item){
	           var operate ="";
	           if(isNaN(value1)){
	             if(operate1!="=="){
	               operate1="=="
	             }
	             operate = 'item.'+field1+operate1+"'"+value1+"'";
	           }else{
	             operate = 'item.'+field1+operate1+value1;
	           }
	           if(eval(operate)){
	             loaddata1.push(item);
	           }
	       }); 
	          $('#list1').datagrid('loadData',loaddata1);
	       }
	       
	       
	      
	  
	  }
    
    </script>
</head>
  
  <body>
              <form id="ff" method="post">
                 <table style="padding:10px;margin:0 auto;width: 100%;">
                   <tr> <td align="center" colspan="9"><h1>告警信息筛选管理</h1></td>
                   </tr>
                <tr>
                    <td colspan="2">数据字段</td>
                    <td colspan="2">操作符</td>
                    <td colspan="2">取值</td>
                     <td colspan="2">连接符</td>
                </tr>
                 <tr>
                    <td colspan="2"><select id="field1" class="easyui-combobox"> <option></option> <option value="alarmKeepMinute">告警历时（分钟）</option>    <option value="alarm_level">告警等级</option></select></td>
                    <td colspan="2"><select id="operate1" class="easyui-combobox" style="width: 80px;">  <option></option>  <option value=">">大于</option>    <option value="==">等于</option>    <option value="<">小于</option></select></td>
                    <td colspan="2"><select id="value1" class="easyui-combobox" style="width: 80px;">  <option></option>  <option>11</option>  <option>重要告警</option>     <option>严重告警</option>    <option>一般告警</option></select></td>
                    <td colspan="2"><select id="link1" class="easyui-combobox" style="width: 80px;">  <option></option>  <option value="&&">并且</option>  <option value="||">或者</option></select></td>
                </tr>
                 <tr>
                    <td colspan="2"><select id="field2" class="easyui-combobox"><option></option> <option value="alarmKeepMinute">告警历时（分钟）</option>    <option value="alarm_level">告警等级</option></select></td>
                    <td colspan="2"><select id="operate2" class="easyui-combobox" style="width: 80px;">  <option></option>  <option value=">">大于</option>    <option value="==">等于</option>    <option value="<">小于</option></select></td>
                    <td colspan="2"><select id="value2" class="easyui-combobox" style="width: 80px;"> <option></option>   <option>10</option>    <option>严重告警</option> <option>重要告警</option>   <option>一般告警</option></select></td>
                    <td colspan="2"><select id="link2" class="easyui-combobox" style="width: 80px;"> <option></option>  <option value="&&">并且</option>  <option value="||">或者</option> </select></td>
                </tr>
                 <tr>
                    <td colspan="2"><select id="" class="easyui-combobox"> <option></option>  <option>设备名称</option>    <option>告警历时（分钟）</option>    <option>告警等级</option></select></td>
                    <td colspan="2"><select id="" class="easyui-combobox" style="width: 80px;"> <option></option>   <option>大于</option>    <option>等于</option>    <option>小于</option></select></td>
                    <td colspan="2"><select id="" class="easyui-combobox" style="width: 80px;">  <option></option>  <option>10</option>    <option>严重告警</option> <option>重要告警</option>    <option>一般告警</option></select></td>
                    <td colspan="2"><select id="link3" class="easyui-combobox" style="width: 80px;"> <option></option>   <option>并且</option>  <option>或者</option></select></td>
                     <td></td>
                     <td></td>
                     <td> <a href="#" onclick ="queryRec()" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a> </td>
                     <td> <a href="#" onclick = "generateExcel()"  class="easyui-linkbutton" >生成Excel</a> </td>
                     <td></td>
                    
                </tr>
                 <tr>
                    <td colspan="2"><select id="" class="easyui-combobox"> <option></option>   <option>设备名称</option>    <option>告警历时（分钟）</option>    <option>告警等级</option></select></td>
                    <td colspan="2"><select id="" class="easyui-combobox" style="width: 80px;">  <option></option>  <option>大于</option>    <option>等于</option>    <option>小于</option></select></td>
                    <td colspan="2"><select id="" class="easyui-combobox" style="width: 80px;"> <option></option>   <option>10</option>    <option>严重告警</option>    <option>一般告警</option></select></td>
                    <td colspan="2"><select id="link4" class="easyui-combobox" style="width: 80px;"> <option></option>   <option>并且</option>  <option>或者</option></select></td>
                    
                </tr>
              
                 <tr>
                    <td> 显示项：</td>
                    <td><label><input type="checkbox" onclick = "getallselect()" value ="1"> 告警设备名称</label></td>
                    <td><label><input type="checkbox" onclick = "getallselect()" value ="2"> 告警IP地址</label></td>
                    <td><label><input type="checkbox" onclick = "getallselect()" value ="3"> 告警主类别</label></td>
                    <td><label><input type="checkbox" onclick = "getallselect()" value ="4"> 告警子类别</label></td>
                    <td><label><input type="checkbox" onclick = "getallselect()" value ="5"> 首次告警时间</label></td>
                    <td><label><input type="checkbox" onclick = "getallselect()" value ="6"> 最新告警时间</label></td>
                    <td><label><input type="checkbox" onclick = "getallselect()" value ="7"> 历时（分钟）</label></td>
                    <td><label><input type="checkbox" onclick = "getallselect()" value ="8"> 告警等级</label></td>
                </tr>
            </table>
   
                  <table id="list1" class="easyui-datagrid"></table>
                 
              </form>
<script>
   function AlarmRec(alarm_newest,alarm_equipName,alarm_subkind,alarm_level,alarmKeepMinute,alarm_ip,alarm_mainkind,alarm_first)
       {
           this.alarm_equipName =  alarm_equipName;
           this.alarm_ip = alarm_ip;
           this.alarm_mainkind = alarm_mainkind;
           this.alarm_subkind = alarm_subkind;
           this.alarmKeepMinute = alarmKeepMinute;
            var date = new Date(alarm_first);
         
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
	        this.alarm_first = y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
	        
	        
	        
             var date2 = new Date(alarm_newest);
              date1  =new Date(date2);
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
	    
   
          
            this.alarm_level = alarm_level;
           

       }
        var AlarmRecDatas = [];
          $(function () {
            
          
             $.ajax( {   //异步获取所有设备信息
		          type : 'POST',
		          contentType : 'application/json;charset=UTF-8',
		          url : 'ajaxGetAllNotorderAlarmRecs.html',
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
		                     ,item.alarm_level,item.alarmKeepMinute,item.alarm_ip,item.alarm_mainkind,item.alarm_first));

		                  });
		                 // alert(EquipDatas);
		                  $('#list1').datagrid({
		                    data: AlarmRecDatas.slice(0,10)
			               ,fitColumns:true
			               , pagination: true
			               
			               , columns: [[
			                   {
			                       field: 'alarm_equipName'
			                       , title: '告警设备名称'
			                       , width: 100
			                       , algin: 'center'
			                   }
			                    , {
			                       field: 'alarm_ip'
			                       , title: '告警IP地址'
			                       , width: 150
			                       , algin: 'center'
			                   }
			                   , {
			                       field: 'alarm_mainkind'
			                       , title: '告警主类别'
			                       , width: 150
			                       , algin: 'center'
			                   }
			                   , {
			                       field: 'alarm_subkind'
			                       , title: '告警子类别'
			                       , width: 100
			                       , algin: 'center'
			                   }
			                   , {
			                       field: 'alarm_first'
			                       , title: '首次告警时间'
			                       , width: 150
			                       , algin: 'center'
			                   }
			                   , {
			                       field: 'alarm_newest'
			                       , title: '最新告警时间'
			                       , width: 200
			                       , algin: 'center'
			                   }
			                   , {
			                       field: 'alarmKeepMinute'
			                       , title: '历时（分钟）'
			                       , width: 80
			                       , algin: 'center'
			                   }
			                   , {
			                       field: 'alarm_level'
			                       , title: '告警等级'
			                       , width: 100
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
		        
		     $('table td label input[type=checkbox]').prop("checked",true);    
		        
           });
           
</script>
  </body>
  
</html>
