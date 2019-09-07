
//得到左边的canvas画布
	var graphLeft = new Q.Graph('canvasLeft');
	
	//ajax方式左侧加载网络拓扑图
	$.ajax(
	{
		type: "POST",
		url: "json/topology.json",
		dataType: "text",
		success: function(data)
		{
        	graphLeft.parseJSON(data);
        	graphLeft.moveToCenter();
		}
	});
	
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
	};
	
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
	};
