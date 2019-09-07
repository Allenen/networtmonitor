package cn.zr.networkmonitor.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.zr.networkmonitor.domain.Edge;
import cn.zr.networkmonitor.service.EdgeService;


/**
 * 线条控制
 * */
@Controller
public class EdgeController {
	
	@Autowired
	private EdgeService edgeService;
	
	/*
	 * 将连线的id写入数据库
	 * 
	 */
	@RequestMapping("addEdge.html")
	@ResponseBody
	public Map<String, Object> addEdge(String edgeId)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		Edge edge = new Edge();
		edge.setEdgeId(edgeId);
		edgeService.addEdge(edge);
		map.put("code", 1);
		return map;
	}
	
	/*
	 * 根据线的id查询线的颜色和宽度
	 * 
	 */
	@RequestMapping("getEdgeById.html")
	@ResponseBody
	public Map<String, Object> getEdgeById(String edgeId)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		Edge edge = edgeService.getEdgeById(edgeId);
		map.put("exist", 1);
		if(edge == null){
			map.put("exist", 0);
		}
		
		map.put("edge", edge);
		return map;
	}
	
}
