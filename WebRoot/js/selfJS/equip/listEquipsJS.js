         //将一个表单的数据返回成JSON对象
	   $.fn.serializeObject = function() {
			  var o = {};
			  var a = this.serializeArray();
			  $.each(a, function() {
			    if (o[this.name]) {
			      if (!o[this.name].push) {
			        o[this.name] = [ o[this.name] ];
			      }
			      o[this.name].push(this.value || '');
			    } else {
			      o[this.name] = this.value || '';
			    }
			  });
			  return o;
	 };
        function deleteSelectEquips(){
             var opts = $('#list1').datagrid('getChecked');
             
             if(opts.length==0){
                 $.messager.alert('消息提示','未选中任何记录!');
                 return;
             }
             $.messager.confirm('消息提示',
             '确定要删除这  '+opts.length+' 个设备?',
                function(r){
                  if (r){
                	  var equipNumList="";
                	  $.each(opts, function(i, item){
                		  equipNumList = equipNumList+item.equipNum+";";
                	  });
                	  $.ajax( {
                		  type : 'POST',
                		  url : 'deleteEquips.html',
                		  data : {'equipNumList':equipNumList},
                		  success : function(data) {
            				  $.each(opts, function(i, item){
            					  var index = $('#list1').datagrid('getRowIndex',item);
            					  $('#list1').datagrid('deleteRow',index);
            					  $('#info').html("设备数：" + EquipDatas.length + "&nbsp;&nbsp;&nbsp;查询设备数："+EquipDatas.length);
            				  });
                		  },
                		  error : function(data) {
                			  alert("服务器error");
                		  }
                	  });
                   }
               });
        }
        
      //编辑设备
        function editEquip(equipType, equipNum){
           $('#dd').dialog({
            title: '编辑设备信息',
            width: 1200,
            height: 500,
            closed: false,
            cache: false,
            href:'getEquipUI.html?deviceType='+equipType+'&equipNum='+equipNum,
            //href: 'get_Equipcontent.html?equipnum='+equipNum,
            modal: true
            });
        }
        
        
        function closeWin(){
           $('#win').window('close');
        }
        function closeDialog(){
           $('#dd').dialog('close');
        }
        function qq(value,name){
           var loaddata =[];
           $.each( EquipDatas, function(i, item) {
              var equipName =item.equipName;
             // alert(equipName);
              if(equipName.indexOf(value)>=0||item.manageIp==value){
                loaddata.push(item);
              }
           });
           if(loaddata.length==0){
             alert('未查找到符合项');
             return;
           }else{
              //alert('aaa');
               $('#info').html("设备数：" + EquipDatas.length + "&nbsp;&nbsp;&nbsp;查询设备数："+loaddata.length);
              $('#list1').datagrid('loadData',loaddata);
           }

        }
        var flag=1;
	    function checkAll()
	   {
	    if( flag == 1){
	       $('table td label input[type=checkbox]').prop("checked",true);
	        flag=0;
	        $('#info').html("设备数：" + EquipDatas.length + "&nbsp;&nbsp;&nbsp;查询设备数："+EquipDatas.length);
	        $('#list1').datagrid('loadData',EquipDatas);
	    }
	    else{
	      $('table td label input[type=checkbox]').prop("checked",false);
	      flag=1;
	       $('#info').html("设备数：" + EquipDatas.length + "&nbsp;&nbsp;&nbsp;查询设备数："+EquipDatas.length);
	      $('#list1').datagrid('loadData',EquipDatas);
	    }

	  }
	    
    /**
     * 选中筛选条件，显示筛选结果
     * */
	  function getallselect(){
	      if(flag==0){
	         $('#checkall').prop("checked",false);
	      }
	      var selectvalue= [],selectvalueContent=[];
	      var loaddata =[];
	      $('table td label input[type=checkbox]:checked').each(function(){
	            selectvalue.push($(this).val());
	            selectvalueContent.push(this.nextSibling.nodeValue);
	        }
	      );
	      
	      //如果没有筛选条件
	      if(selectvalue.length==0){
	        $('#list1').datagrid('loadData',EquipDatas);
	      }
	      
	      //得到满足筛选条件的结果集
	      $.each(EquipDatas, function(i, item){
	    	  var equipKind = item.equipKind;
	    	  for(var index in selectvalue){
	    		  if(selectvalueContent[index] == equipKind){
	    			loaddata.push(item);  
	    		  }
	    	  }
	      });

	      $('#info').html("设备数：" + EquipDatas.length + "&nbsp;&nbsp;&nbsp;查询设备数："+loaddata.length);
	      $('#list1').datagrid('loadData',loaddata);
	  }
	  
	  $(function(){
		//添加设备中的设备类型的combobox
		  $('#deviceType').combobox({
		      url: "getDictsForComboxByDict_type.html?dict_type=SBLB",
		      valueField: 'id',
			  textField: 'text',
		      onSelect: function(rec){
	          if(rec.id==1){		//路由器设备
	        	  $('#serviceDiv').hide();
	        	  $('#testEquipDiv').hide();
	        	  $('#routerDiv').show();
	        	  
	        	  $("#routerEquipKind").textbox("setValue",rec.text);
	          }else if(rec.id==5||rec.id==6||rec.id==7||rec.id==8||rec.id==9||rec.id==10||rec.id==11){//服务器/交换机/其他
	             $('#routerDiv').hide();
	             $('#testEquipDiv').hide();
	             $('#serviceDiv').show();
	             $("#serverEquipKind").textbox("setValue",rec.text);
	          }else if(rec.id ==2||rec.id==3||rec.id==4){//性能探测设备
	             $('#routerDiv').hide();
	             $('#serviceDiv').hide();
	             $('#testEquipDiv').show();
	             $("#equipKind").textbox("setValue",rec.text);
	          }
	          
	          }
		  		
		  });
		  
		  //用于默认值获得焦点，清空输入框效果
		  $("#snmpPort").textbox("textbox").bind("focus",function(){this.value="";});
		  $("#snmpRcommunity").textbox("textbox").bind("focus",function(){this.value="";});
		  $("#snmpRetry").textbox("textbox").bind("focus",function(){this.value="";});
		  $("#snmpWcommunity").textbox("textbox").bind("focus",function(){this.value="";});
		  $("#snmpV3SecurityName").textbox("textbox").bind("focus",function(){this.value="";});
		  $("#snmpTimeout").textbox("textbox").bind("focus",function(){this.value="";});
		  
	  });
	  
	  
	  /**
	   * 保存设备信息的方法
	   * */
	  //用于保存路由器的表单
		function saveRouterEquipForm(){
			$('#routerEquipForm').form({
				    url:"saveEquip.html",
				    onSubmit: function(){
			            // do some check        // return false to prevent submit;
			        },
			        success:function(data){
			        	$.messager.show({
			        		title:'消息提示',
			        		msg:'保存设备成功!',
			        		timeout:1000,
			        		showType:'slide'
			        	});
    
			        },
			        error:function(){
			        	$.messager.show({
			        		title:'消息提示',
			        		msg:'保存设备失败!',
			        		timeout:1000,
			        		showType:'slide'
			        	});
				    }
			});
			
			$('#routerEquipForm').submit();
		}

		//用于保存服务器/其他设备的表单
		function saveServerEquipForm(){
			$('#serverEquipForm').form({
				    url:"saveEquip.html",
				    onSubmit: function(){
			            // do some check        // return false to prevent submit;
			        },
			        success:function(data){
			        	$.messager.show({
			        		title:'消息提示',
			        		msg:'保存设备成功!',
			        		timeout:1000,
			        		showType:'slide'
			        	});
    
			        },
			        error:function(){
			        	$.messager.show({
			        		title:'消息提示',
			        		msg:'保存设备失败!',
			        		timeout:1000,
			        		showType:'slide'
			        	});
				    }
			});
			
			$('#serverEquipForm').submit();
		}

		//用于保存性能探测设备的表单
		function saveTestEquipForm(){
			$('#testEquipForm').form({
				    url:"saveEquip.html",
				    onSubmit: function(){
			            // do some check        // return false to prevent submit;
			        },
			        success:function(data){
			        	$.messager.show({
			        		title:'消息提示',
			        		msg:'保存设备成功!',
			        		timeout:1000,
			        		showType:'slide'
			        	});
    
			        },
			        error:function(){
			        	$.messager.show({
			        		title:'消息提示',
			        		msg:'保存设备失败!',
			        		timeout:1000,
			        		showType:'slide'
			        	});
				    }
			});
			
			$('#testEquipForm').submit();
		}
		
		
		function Equip(equipNum,equipName,equipId,equipKind,manageIp,areaUnit,probeState)
	       {
	           this.equipNum = equipNum;
	           this.equipName =  equipName;
	           this.equipId = equipId;
	           this.equipKind = equipKind;
	           this.manageIp = manageIp;
	           this.areaUnit = areaUnit;
	           if(probeState==0){
	             this.probeState = "离线";
	           }else{
	             this.probeState = "在线";
	           }

	       }
		
	        var EquipDatas = [];//表格中的数据
	        
	        //编辑设备中的数据
	        function editlist(value,row,index) {
	            var equipNum = row.equipNum;
	            var equipType = row.equipKind;
	            return '<a href="#" onclick="editEquip(\''+equipType+'\',\''+equipNum+'\')"><i class="icon-edit" style="width:16px;height:16px;display:inline-block;vertical-align:middle;"></i></a>';
	        }
	        
	        $(function () {
	             $.ajax( {   //异步获取所有设备信息
			          type : 'POST',
			          contentType : 'application/json;charset=UTF-8',
			          url : 'ajaxGetAllEquips.html',
			          dataType : 'json',
			          success : function(data) {
			             if (data.data=="null") {
				          }
				          else{
				             $('#info').html("设备数：" + data.total + "&nbsp;&nbsp;&nbsp;查询设备数："+data.querytotal);
			                 $.each(data.data, function(i, item) {
			                     EquipDatas.push(new Equip(item.equipNum,item.equipName,item.equipId,item.equipKind
			                     ,item.manageIp,item.areaUnit,item.probeState));

			                  });
			                 
			                  $('#list1').datagrid({
				                 data: EquipDatas.slice(0,10)
				               , toolbar: '#toolbar'
				               , pagination: true
				               ,selectOnCheck:false
				               , columns: [[
				                   {
				                       field: 'checked'
				                       , title: ''
				                       , checkbox: true
				                       , width: 30
				                   }
				                   , {
				                       field: 'equipNum'
				                       , title: '序号'
				                       , width: 80
				                       , algin: 'center'
				                   }
				                   , {
				                       field: 'equipName'
				                       , title: '设备名称'
				                       , width: 250
				                       , algin: 'center'
				                   }
				                   , {
				                       field: 'equipId'
				                       , title: '设备标识'
				                       , width: 250
				                       , algin: 'center'
				                   }
				                   , {
				                       field: 'equipKind'
				                       , title: '设备类别'
				                       , width: 200
				                       , algin: 'center'
				                   }
				                   , {
				                       field: 'manageIp'
				                       , title: '管理ip'
				                       , width: 200
				                       , algin: 'center'
				                   }
				                   , {
				                       field: 'areaUnit'
				                       , title: '归属大单位'
				                       , width: 150
				                       , algin: 'center'
				                   }
				                   , {
				                       field: 'probeState'
				                       , title: '状态'
				                       , width: 80
				                       , algin: 'center'
				                   }
				                   , {
				                       field: 'editlist'
				                       , title: '操作'
				                       , width: 50
				                       , algin: 'center'
				                       , formatter: editlist
				                   }
				               , ]]
				            });
			              //用于分页工具栏的实现   
		                  var pager = $('#list1').datagrid('getPager');
					        $(pager).pagination({
					         total: EquipDatas.length,      
					          onSelectPage:function(pageNo, pageSize){
								var start =(pageNo-1)*pageSize;
								var end = start+pageSize;
								$('#list1').datagrid('loadData',EquipDatas.slice(start,end));
								$(pager).pagination('refresh',{
								  total:EquipDatas.length,
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
	  


  