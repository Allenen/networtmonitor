
	//用于选中任务后，任务名称自动生成 
	$('#iconTaskType').combobox(
	{
		url:'getTaskNameFromDict.html',
		valueField:'dict_numb',
		textField:'dict_cont',
		onSelect:function(rec)
		{
			if(rec.dict_numb==5)
			{
				$("#canvasLeft").hide();
				iconPathTask();
			}else
			{
				$("#canvasLeft").show();
			}
			$("#iconTaskName").textbox("setValue", rec.dict_cont+new Date().toLocaleString());
			chooseTargetDevices.length = 0;//每次选中下拉选框，清空数组
			isSubject = true;
			graphRight.clear();//清空右侧的画布
		}
	});
	
	
	
	//用于处理图标式链路性能监测任务,链路变化监测任务
	function iconPathTask(){
		//var graphRight2 = new Q.Graph("canvasRight");
		targetSubject = null;
		chooseTargetDevices.length=0;
		//ajax方式左侧加载网络拓扑图
		$.ajax(
		{
			type: "POST",
			url: "json/topology.json",
			dataType: "text",
			success: function(data)
			{
				graphRight.parseJSON(data);
				graphRight.updateViewport();
				graphRight.moveToCenter();
			}
		});
		
		var currentNode = null;
		//左键选中
		graphRight.onclick = function(evt)
		{
			var element = graphRight.getElementByMouseEvent(evt);
			
			if(element && element.type == 'Q.Node')
			{
				currentNode = element;
				var currentNodeType = currentNode._nf4.deviceType;//得到选中设备的类型
				
				if(currentNodeType.indexOf("探针") != -1)//探针类型设备
				{
					if(targetSubject == null || currentNode.id != targetSubject.id)//如果上一次设置的主题与本次不一致
					{
						if(targetSubject != null)
						{
							targetSubject.setStyle(Q.Styles.RENDER_COLOR, "#FFFFFF");
						}
						
						targetSubject = currentNode;
						currentNode.setStyle(Q.Styles.RENDER_COLOR, "#FF0000");
					}
					
				}else if(currentNodeType == "路由器")//路由器
				{
					chooseTargetDevices.push(currentNode);
					currentNode.setStyle(Q.Styles.RENDER_COLOR, "#FF0000");
				}
			}
			else
			{
				currentNode = null;
			}
		};
		
		/*右键取消
		graphRight.onclick = function(evt)
		{
			var element = graphRight.getElementByMouseEvent(evt);
			
			if(element && element.type == 'Q.Node')
			{
				currentNode = element;
				console.log("设备类型:"+currentNode._nf4.deviceType);
				
			}
			else
			{
				currentNode = null;
			}
		}*/
		
	}
	
	/*
	//得到左边的canvas画布
		var graphLeft = new Q.Graph('canvasRight');
		
		
		
		var currentNode = null;
		//选中左侧的画布中的节点
		graphLeft.onclick = function(evt)
		{
			var element = graphLeft.getElementByMouseEvent(evt);
			
			if(element && element.type == 'Q.Node')
			{
				currentNode = element;
			}
			else
			{
				currentNode = null;
			}
		}
		
		//得到右侧的画布
		graphRight = new Q.Graph('canvasRight');
		graphRight.originAtCenter = false;
		
		var isSubject = true;//是否为任务主体
		var chooseTargetDevices = [];//用于存放已选目标设备
		var targetSubject;//用于存放任务主体
		
		//点击右侧的画布
		graphRight.onclick = function(evt)
		{
			if(currentNode)
			{
				if(!isSubject)//不是任务主体
				{
					chooseTargetDevices.push(currentNode);
				}else
				{
					targetSubject = currentNode;
					isSubject = false;
				}
				
				var p = graphRight.globalToLocal(evt);
				p = graphRight.toLogical(p.x, p.y);
				var node = graphRight.createNode(currentNode.name, p.x, p.y);
				node.image = currentNode.image;
				
				if(graphRight.graphModel.size() > 1)
				{
					graphRight.createEdge("", graphRight.graphModel.get(0), node);
				}
				
				console.log("已选目标设备数："+chooseTargetDevices.length);
				
			}
		}
*/
	
	