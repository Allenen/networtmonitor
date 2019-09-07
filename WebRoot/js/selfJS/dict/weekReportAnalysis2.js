		var dictWeekDatas = [];	
		var dataFromAjax = [];
		var check = true;
		/*
		 * 第二个全选复选框  by TX 2016.11.1
		 */	
		function checkAllStat(){
			if(check==false){
				arr = document.getElementsByName("ck");
				for(var i=0;i<arr.length;i++){
					arr[i].checked = false;
				}
				check = true;
			}else{
				arr = document.getElementsByName("ck");
				for(var i=0;i<arr.length;i++){
					arr[i].checked = true;
				}
				check = false;
			}
		}
		/*
		 * 第二个单选复选框  by TX 2016.11.1
		 */
		function getSelect(){
			if(check==false){
		         $('#checkallstat').prop("checked",false);
		         check = true;
		      }
			arr = document.getElementsByName("ck");
			/*var select2= [],selectContent2=[];
		    $('div table  tr td  input[type=checkbox]:checked').each(function(){
		            select2.push($(this).val());
		            selectContent2.push(this.nextSibling.nodeValue);
		        }
		      );
		    for(var i=0;i<select2.length;i++){
		    	  console.log(selectContent2[i]);
		      }*/
			var select2 = [];
			var j =0;
			for(var i=0;i<arr.length;i++){
				if(arr[i].checked){
					select2[j]=arr[i];
					j++;
				}
			}
		    if(select2.length==arr.length){
		    	$('#checkallstat').prop("checked",true);
		         check = false;
		      }
		      
		}

		
		/*
		 * 日历表获取当前系统时间  并设置为初始值   by TX 2016.11.1
		 */
		formatterDate = function(date){
			var day = date.getDate()>9?date.getDate():"0"+date.getDate();
			var month = (date.getMonth()+1)>9?(date.getMonth+1):"0"+(date.getMoth()+1);
			return date.getFullYear()+"/"+month+"/"+day;
			
		};
		window.onload = function(){
			$('#Time1').datebox('setValue',formatterDate(new Date()));
		};


		/*
		 * 用于导出数据  by TX 2016.11.11
		 * */
		function DictWeek(dictcont,IPUseable,DNSUseable,websiteUseable,emailUseable,FTPUseable){
			this.dictcont = dictcont;
			this.IPUseable = IPUseable;
			this.DNSUseable = DNSUseable;
			this.websiteUseable = websiteUseable;
			this.emailUseable = emailUseable;
			this.FTPUseable = FTPUseable;
		}
		
		
		
		/*
		 * weekReportAnalysis.jsp 中表单提交与生成数据显示   by TX 2016.11.11
		* */
		function submitForm(){
			$('#weekReportAnalysisForm').form('submit');
			
			$.get("weekReportAnalysisTable.html",function(data){
				dataFromAjax = data;
				console.log(data);
				
				$('#weekReportAnalysisTable').datagrid('loadData', data);
				var x = document.getElementsByName("ck");
				for(var i=0;i<x.length;i++){
					$('#weekReportAnalysisTable').datagrid('hideColumn',x[i].value);
					//console.log(x[i]);
					//console.log(x[i].value);
					/*if(!x[i].checked){
						$('#weekReportAnalysisTable').datagrid('hideColumn',x[i].value);
						console.log(x[i].value+"is hidden");
					}*/
					if(x[i].checked){
						$('#weekReportAnalysisTable').datagrid('showColumn',x[i].value);
						//console.log(x[i].value+"is showed");
					}
				}
				
				

			});
		}
		
		
	//导出表格
	function getForm()
	{   //by TX 2016.11.21
		for(var i=0;i<dataFromAjax.length;i++)
		{
			dictWeekDatas.push(new DictWeek(dataFromAjax[i].dictcont,dataFromAjax[i].IPUseable,dataFromAjax[i].DNSUseable,dataFromAjax[i].websiteUseable,dataFromAjax[i].emailUseable,dataFromAjax[i].FTPUseable));
		}
	  
		dataFromAjax = null;
		var jsonstr = JSON.stringify(dictWeekDatas);
		  
		for(var i=dictWeekDatas.length-1;i>=0;i--)
		{
			dictWeekDatas.pop();
		}
		var temp =document.createElement("form");
		temp.action= 'exportDictWeekExcel.html';
		temp.method= "post";
		temp.style.display ="none";
	  
		var opt=document.createElement("textarea");
		opt.name = 'dictWeeks';
		opt.value = jsonstr;
		temp.appendChild(opt);
		document.body.appendChild(temp);
		temp.submit();
	}
	

