package cn.zr.networkmonitor.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.zr.networkmonitor.domain.BIMeasureRecord;
import cn.zr.networkmonitor.domain.Equip;
import cn.zr.networkmonitor.domain.Task;
import cn.zr.networkmonitor.service.BIMeasureRecordService;
import cn.zr.networkmonitor.service.EquipService;
import cn.zr.networkmonitor.service.TaskService;

/**
 * 任务测量数据控制器 by  2016-10-31
 * */
@Controller
public class TaskMeasureDataController {
	
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private EquipService equipService;

	/**
	 * 查询任务的测量数据
	 * @param task_num 任务号
	 * @return
	 */
	@RequestMapping("measureDataInfo.html")
	public ModelAndView measureDataInfo(@RequestParam("tasknum") String task_num)
	{
		Task task  = taskService.getTaskById(task_num);
		
		String taskTarget = task.getTask_target();
		int taskType = task.getTask_type();
		
		String[] equipIds = null;
		List<Equip> targetEquipList = new ArrayList<Equip>();//存储任务的目标设备/
		if(taskTarget != null)
		{
			equipIds = taskTarget.split(";");
			for(String equipId:equipIds)
			{
				if(equipId != null && !equipId.isEmpty())
				{
					Equip equip = equipService.getEquipByEquipId(equipId);
					targetEquipList.add(equip);
				}
			}
		}

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("task", task);
		modelAndView.addObject("targetEquipList",targetEquipList);
		
		String viewName = "";
		switch(taskType)
		{
			case 1:	//双向时延测量任务
				viewName = "/WEB-INF/jsp/taskMeasureData/DLatencyMeasureData.jsp";
				break;
			case 2:	//单向时延测量任务
				viewName = "/WEB-INF/jsp/taskMeasureData/SLatencyMeasureData.jsp";
				break;
			case 3:	//阻断监测任务
				viewName = "/WEB-INF/jsp/taskMeasureData/BlockMeasureData.jsp";
				break;
			case 4:	//TE隧道测量任务
				viewName = "/WEB-INF/jsp/taskMeasureData/TETubeMeasureData.jsp";
				break;
			case 5:	//链路性能测量任务
				viewName = "/WEB-INF/jsp/taskMeasureData/PathPerformanceMeasureData.jsp";
				break;
			case 6:	//链路变化测量任务
				viewName = "/WEB-INF/jsp/taskMeasureData/PathChangeMeasureData.jsp";
				break;
			case 7:	//多媒体业务性能测量任务
				viewName = "/WEB-INF/jsp/taskMeasureData/MultiMediaMeasureData.jsp";
				break;
			default:	//通用业务性能测量任务
				String policyPara = task.getPolicy_para();
				if(policyPara.startsWith("service_type=web"))//通用业务性能测量任务-WEB业务类型
				{
					viewName="/WEB-INF/jsp/taskMeasureData/WEBCommonServiceMeasureData.jsp";
				}else if(policyPara.startsWith("service_type=ftp"))//通用业务性能测量任务-FTP业务类型
				{
					viewName="/WEB-INF/jsp/taskMeasureData/FTPCommonServiceMeasureData.jsp";
				}else if(policyPara.startsWith("service_type=dns"))//通用业务性能测量任务-DNS业务类型
				{
					viewName="/WEB-INF/jsp/taskMeasureData/DNSCommonServiceMeasureData.jsp";
				}else//通用业务性能测量任务-EMAIL业务类型
				{
					viewName="/WEB-INF/jsp/taskMeasureData/EMAILCommonServiceMeasureData.jsp";
				}
				
				break;
		}
		
		modelAndView.setViewName(viewName);

	   return modelAndView;
	}
	
}
