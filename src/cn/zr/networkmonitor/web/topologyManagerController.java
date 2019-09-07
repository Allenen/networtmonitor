package cn.zr.networkmonitor.web;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.zr.networkmonitor.domain.TopologyImageManager;

import cn.zr.networkmonitor.service.TopologyImageManagerService;


@Controller
public class topologyManagerController {
	
	@Autowired
	private TopologyImageManagerService topologyImageManagerService;
	//拓扑编辑页面
	@RequestMapping("topologymanager.html")
	public String topologyManager()
	{
		return "forward:/WEB-INF/jsp/topologyManager/topologymanager.jsp";
	}
	
	@RequestMapping("topologyMonitor.html")
	public String topologyMonitor()
	{
		return "forward:/WEB-INF/jsp/topologyManager/topologyMonitor.jsp";
	}
	
	//查看设备状态页面
	@RequestMapping("devicestatus.html")
	public String deviceStatus()
	{
		return "forward:/WEB-INF/jsp/topologyManager/devicestatus.jsp";
	}
	
	//删除逻辑配图
	@RequestMapping("deleteTopologyImageById.html")
	@ResponseBody
	public Map<String, Object> deleteTopologyImageById(String topologyImageId)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		topologyImageManagerService.deleteTopologyImageById(topologyImageId);
		map.put("data", "删除成功");
		return map;
	}
	
	//查看设备状态页面
	@RequestMapping("topologyimagemanager.html")
	public ModelAndView topologyImageManager(){
		ModelAndView modelAndView = new ModelAndView();
		List<TopologyImageManager> topologyImageManagers = topologyImageManagerService.getAllTopologyImages();
		modelAndView.addObject("topologyImageList", topologyImageManagers);
		modelAndView.setViewName("/WEB-INF/jsp/topologyManager/topologyimagemanager.jsp");
		return modelAndView;
	}
	
	//设置拓扑图
	@RequestMapping("setTopologyImage.html")
	@ResponseBody 
	public Map<String, Object> Topology(String topologyImageIdList, String initCheckboxCheckedIdList){
		Map<String, Object> map = new HashMap<String, Object>();
		topologyImageManagerService.setTopologyImage(topologyImageIdList,initCheckboxCheckedIdList);
		map.put("message", "设置拓扑图显示成功！");
		return map;
	}
	
	//设置拓扑图标可见
	@RequestMapping("setTopologyImagevisible.html")
	@ResponseBody 
	public Map<String, Object> setTopologyImagevisible(String topologyImageIdList,String preImageIdList){
		Map<String, Object> map = new HashMap<String, Object>();
		topologyImageManagerService.setTopologyImagevisible(topologyImageIdList, preImageIdList);
		map.put("message", "设置拓扑图显示成功！");
		return map;
	}

	//获取需要显示的拓扑图
	@RequestMapping("getTopologyImage.html")
	@ResponseBody 
	public List<TopologyImageManager> getTopologyImage()
	{
		List<TopologyImageManager> topologyImageManagers = topologyImageManagerService.getTopologyImage();
		return topologyImageManagers;
	}
		
	//上传图片 ,上传成功后，显示上传后的结果(拓扑图上传)
	@RequestMapping("uploadTopologyImage.html")
	public void uploadTopologyImage(HttpServletRequest request, HttpServletResponse response, String topologyImageName, String topologyImageType, String pic_data){

		TopologyImageManager topologyImageManager = new TopologyImageManager();
		topologyImageManager.setTopologyImageType(topologyImageType);
		topologyImageManager.setTopologyImageName(topologyImageName);
		

		String realPathString = request.getSession().getServletContext().getRealPath("");
		boolean flag = topologyImageManagerService.uploadTopologyImage(pic_data, topologyImageManager, realPathString);
		String id = String.valueOf(topologyImageManager.getTopologyImageId());
		if (!flag) {
			try {
				response.getWriter().write("error");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}		
		else{
			try {
				response.getWriter().write("success;" + id + ";" + realPathString);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}
	
	//保存网络拓扑图
	@RequestMapping("saveTopology.html")
	@ResponseBody 
	public Map<String, Object> saveTopology(String json, String filename, HttpSession session)
	{
		String pathString = session.getServletContext().getRealPath("json");
		Map<String, Object> map = new HashMap<String, Object>();
		try 
		{
			OutputStreamWriter outputStreamWriter = new OutputStreamWriter(new FileOutputStream(pathString + "/" + filename + ".json"), "UTF-8");
			outputStreamWriter.write(json);
			outputStreamWriter.flush();
			map.put("code", 0);
			map.put("message", "保存成功！");
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			map.put("code", 1);
			map.put("message", "保存失败！");
			return map;
		}
	}
}
