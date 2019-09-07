package cn.zr.networkmonitor.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.zr.networkmonitor.domain.MultipartFileDomain;

import cn.zr.networkmonitor.service.MultipartFileService;


/**
 * 拓扑管理底图的控制器 by zxgm 2016-10-31
 * */
@Controller
public class TopologyBottomImageController {
	
	@Autowired
	private MultipartFileService multipartFileService;

	
	//底图管理
	@RequestMapping("bottomManager.html")
	public ModelAndView bottomManager()
	{
		//ApplicationContext
		ModelAndView modelAndView = new ModelAndView();
		List<MultipartFileDomain> multipartFileDomains = multipartFileService.getAllBottomImages();//得到所有的底图信息
		modelAndView.addObject("multipartFileDomainList", multipartFileDomains);
		modelAndView.setViewName("/WEB-INF/jsp/topologyManager/bottomManager.jsp");
		return modelAndView;
	}
	
	//上传图片 ,上传成功后，显示上传后的结果(底图上传)
//	@RequestMapping("uploadBottomImage.html")
//	public ModelAndView uploadBottomImage(HttpServletRequest request, MultipartFileDomain multipartFileDomain){
//		ModelAndView modelAndView = new ModelAndView();
//		
//		String realPathString = request.getSession().getServletContext().getRealPath("");
//		
//		boolean flag = multipartFileService.uploadBottomImage(multipartFileDomain, realPathString);
//		if (!flag) {
//			System.out.println("文件上传失败!");
//		}
//		
//		List<MultipartFileDomain> multipartFileDomains = multipartFileService.getAllBottomImages();//得到所有的底图信息
//		modelAndView.addObject("multipartFileDomainList", multipartFileDomains);
//		modelAndView.setViewName("/WEB-INF/jsp/topologyManager/bottomManager.jsp");
//		return modelAndView;
//	}
	
	//上传图片 ,上传成功后，显示上传后的结果(底图上传)
	@RequestMapping("uploadBottomImage.html")
	public void uploadbottomImage(HttpServletRequest request, HttpServletResponse response, String bottomImageName, String pic_data){

		MultipartFileDomain multipartFileDomain = new MultipartFileDomain();
		multipartFileDomain.setImageName(bottomImageName);
		String realPathString = request.getSession().getServletContext().getRealPath("");
		
		
		boolean flag = multipartFileService.uploadBottomImage(multipartFileDomain, pic_data, realPathString);
		String id = String.valueOf(multipartFileDomain.getImageId());
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
	
	//删除底图
//	@RequestMapping("deleteBottomImageById.html")
//	public ModelAndView deleteBottomImageById(String bottomImageId)
//	{
//		ModelAndView modelAndView = new ModelAndView();
//		multipartFileService.deleteBottomImageById(bottomImageId);
//		
//		List<MultipartFileDomain> multipartFileDomains = multipartFileService.getAllBottomImages();//得到所有的底图信息
//		modelAndView.addObject("multipartFileDomainList", multipartFileDomains);
//		modelAndView.setViewName("/WEB-INF/jsp/topologyManager/bottomManager.jsp");
//		return modelAndView;
//	}
	
	//删除逻辑配图
	@RequestMapping("deleteBottomImageById.html")
	@ResponseBody
	public Map<String, Object> deleteBottomImageById(String bottomImageId)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		multipartFileService.deleteBottomImageById(bottomImageId);
		map.put("data", "删除成功");
		return map;
	}
	
	
	//设置底图
	@RequestMapping("setBottomImage.html")
	@ResponseBody 
	public Map<String, Object> setBottomImage(String bottomImageId, String initRadioCheckedId){
		Map<String, Object> map = new HashMap<String, Object>();
		multipartFileService.setBottomImage(bottomImageId,initRadioCheckedId);
		map.put("message", "设置底图成功！");
		return map;
	}
	
	//获取绑定的底图
	@RequestMapping("getBottomImage.html")
	@ResponseBody 
	public Map<String, Object> getBottomImage()
	{
		Map<String, Object> map = new HashMap<String, Object>();
		List<MultipartFileDomain> multipartFileDomains = multipartFileService.getBottomImage();
		if (multipartFileDomains.size() == 1)
		{
			map.put("code", 1);
			map.put("imageName", multipartFileDomains.get(0).getImageName());
		}
		else
		{
			map.put("code", 0);
		}
		
		return map;
	}
	
}
