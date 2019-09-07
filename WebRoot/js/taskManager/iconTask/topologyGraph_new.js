/** 快捷方式创建任务相关的拓扑模块的js文件 **/

$(function(){
	//1.创建左侧画布
	var graphLeft = new Q.Graph("canvasLeft");
	//2.左侧画布加载网络拓扑
	$.ajax({
		type:"POST",
		url:"json/topology.json",
		dataType:"text",
		success:function(data)
		{
			graphLeft.parseJSON(data);
			graphLeft.moveToCenter();
		}
	});
	
	var currentNode = undefined;//当前节点
	//3.点击左侧画布中的节点
	graphLeft.onclick = function(evt)
	{
		var element = graphLeft.getElementByMouseEvent(evt);
		if(element && element.type == 'Q.Node')
			currentNode = element;
		else
			currentNode = undefined;
	};
	
	//创建右侧画布
	m_graphRight = new Q.Graph("canvasRight");
	m_graphRight.originAtCenter = false;

	//点击右侧画布，绘制节点
	m_graphRight.onclick = function(evt)
	{
		var graphModel = m_graphRight.graphModel;
		if(currentNode != undefined)
		{
			//设备唯一标识，设备类型
			var deviceId = currentNode._nf4.deviceId,deviceType = currentNode._nf4.deviceType;
			if(graphModel.size() == 0)
			{
				if(deviceType.indexOf("探针") != -1)
					m_targetSubject = currentNode;
				else{
					alert("请选择探针类型设备");return;
				}
			}else {
				if(deviceType.indexOf("探针") == -1)
					m_chooseTargetDevices.push(currentNode);
				else
				{
					alert("请选择非探针类型设备");return;
				}
			}
			
			//坐标转换
			var p = m_graphRight.globalToLocal(evt);
			p = m_graphRight.toLogical(p.x,p.y);
			//创建节点
			var node = m_graphRight.createNode(currentNode.name,p.x,p.y);
			node.image = currentNode.image;
			
			//创建探针节点与各节点之间的连线
			if(graphModel.size() > 1)
			{
				var edge = m_graphRight.createEdge(graphModel.get(0),node);
				edge.setStyle(Q.Styles.EDGE_COLOR, '#88AAEE');
				edge.setStyle(Q.Styles.EDGE_WIDTH, 2);
				edge.setStyle(Q.Styles.EDGE_LINE_DASH, [8, 4, 0.01, 4]);
				
				/** 显示连线的流动效果*/
				var offset = 0,index = 0;
				var timer = setInterval(function(){
				    offset += -1;

				    index++;
				    index = index%20;
				    edge.setStyle(Q.Styles.ARROW_TO_OFFSET, -0.3 -0.02 * (20 - index));

				}, 150);

				function destroy(){
				    clearInterval(timer);
				}
				
			}
		}
		
	};
	
	
});