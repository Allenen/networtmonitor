package cn.zr.networkmonitor.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.zr.networkmonitor.domain.DefaultTask;
import cn.zr.networkmonitor.domain.Dict;
import cn.zr.networkmonitor.domain.Equip;
import cn.zr.networkmonitor.domain.EquipInte;
import cn.zr.networkmonitor.domain.Task;
import cn.zr.networkmonitor.service.DictService;
import cn.zr.networkmonitor.service.EquipInteService;
import cn.zr.networkmonitor.service.EquipService;
import cn.zr.networkmonitor.service.TaskService;

/**
 * 图标式任务创建控制器 by zxgm 2016-10-31
 * */
@Controller
public class IconTaskController {

	@Autowired
	private TaskService taskService;
	@Autowired
	private EquipService equipService;
	@Autowired
	private EquipInteService equipInteService;
	@Autowired
	private DictService dictService;
	
	/**
	 * 快捷方式转发UI界面
	 * @return
	 */
	@RequestMapping("iconTaskAddUI.html")
	public String iconTaskAddUI()
	{
		return "forward:/WEB-INF/jsp/taskManager/iconTaskView/iconTask_add/iconTaskAddUI.jsp";
	}
	
	//图标式保存默认任务
	@RequestMapping("saveDefaultIconTask.html")
	@ResponseBody
	public Map<String, Object> saveDefaultIconTask(String taskType, String targetSubjectDeviceId, String chooseTargetDeviceIdList, String taskName)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		DefaultTask defaultTask =taskService.getDefaultTaskByTaskType(taskType);//通过任务类型得到默认任务;
		Task task = null;
		if(taskType.equals("5") || taskType.equals("6"))
		{
			task = getCopyTaskForPath(defaultTask, taskType, targetSubjectDeviceId, taskName, chooseTargetDeviceIdList);
		}else {
			task = getCopyTask(defaultTask,taskType,targetSubjectDeviceId,taskName,chooseTargetDeviceIdList);
		}
		
		taskService.saveTask(task);
		
		map.put("message", "保存成功");
		return map;
	}
	
	@RequestMapping("delayTaskEditor.html")
	public ModelAndView delayTaskEditor()
	{
		ModelAndView modelAndView = new ModelAndView();
		List<Dict> dictList = dictService.getDeviceCategorys("RWLB");
		modelAndView.addObject("dictList", dictList);
		modelAndView.setViewName("/WEB-INF/jsp/taskManager/iconTaskView/delayTaskEditor.jsp");
		
		return modelAndView;
	}
	
	/**
	 * 图标式创建任务
	 * @param taskType 任务类型
	 * @param targetSubjectDeviceId 任务主体
	 * @param chooseTargetDeviceIdList 目标设备
	 * @param taskName 任务名称
	 * @return
	 */
	@RequestMapping("getTaskUIForIcon.html")
	public ModelAndView getTaskUIForIcon(String taskType, String targetSubjectDeviceId, 
			String chooseTargetDeviceIdList, String taskName)
	{
		ModelAndView modelAndView = new ModelAndView();
		DefaultTask defaultTask = taskService.getDefaultTaskByTaskType(taskType);//通过任务类型得到默认任务
		Task task = getCopyTask(defaultTask,taskType,targetSubjectDeviceId,taskName,chooseTargetDeviceIdList);
		
		modelAndView.addObject("task", task);
		int taskTypeNum = Integer.parseInt(taskType);
		String viewName="";
		switch (taskTypeNum)
		{
		case 1://双向时延、丢包率、时延抖动测量
			viewName = "/WEB-INF/jsp/taskManager/iconTaskView/iconEditTask/iconEditDLatencyTask.jsp";
			break;
		case 2://单向时延、丢包率、时延抖动测量
			viewName = "/WEB-INF/jsp/taskManager/iconTaskView/iconEditTask/iconEditSLatencyTask.jsp";
			break;
		case 3://阻断测量
			viewName = "/WEB-INF/jsp/taskManager/iconTaskView/iconEditTask/iconEditBlockTask.jsp";
			break;
		case 4://TE隧道测量
			viewName = "/WEB-INF/jsp/taskManager/iconTaskView/iconEditTask/iconEditTETestTask.jsp";
			break;
		case 5://链路性能测量
			viewName = "/WEB-INF/jsp/taskManager/iconTaskView/iconEditTask/PathPerformanceTask.jsp";
			break;
		case 6://链路变化监测
			viewName = "/WEB-INF/jsp/taskManager/iconTaskView/iconEditTask/editDLatencyTask.jsp";
			break;
		case 7://多媒体业务性能测量
			viewName = "/WEB-INF/jsp/taskManager/iconTaskView/iconEditTask/multiMediaTask.jsp";
			break;
		case 8://通用业务测量
			viewName = "/WEB-INF/jsp/taskManager/iconTaskView/iconEditTask/commonServiceTask.jsp";
			break;
	
			default:
				break;
		}
		
		modelAndView.setViewName(viewName);
		
		return modelAndView;
	}
	
	
	//为链路性能和链路变化得到拷贝的Task类型的任务
	private Task getCopyTaskForPath(DefaultTask defaultTask, String taskType,
			String targetSubjectDeviceId, String taskName,
			String chooseTargetDeviceIdList) {
		Task task = new Task();
		task.setTask_type(Integer.parseInt(taskType));
		task.setTask_subject(targetSubjectDeviceId);
		task.setTask_name(taskName);
		task.setTask_target(chooseTargetDeviceIdList);
		
		task.setPolicy_para(getPolicy_paraForPath(chooseTargetDeviceIdList));//设置链路性能或者链路变化的任务
		
		task.setIs_cycle(defaultTask.getIs_cycle());
		task.setTask_interval(defaultTask.getTask_interval());
		task.setInterval_unit(defaultTask.getInterval_unit());
		task.setSend_ip(defaultTask.getSend_ip());
		task.setStart_time(defaultTask.getStart_time());
		task.setEnd_time(defaultTask.getEnd_time());
		task.setTask_stat(defaultTask.getTask_stat());
		task.setLevel(defaultTask.getLevel());
		task.setResend_interval(defaultTask.getResend_interval());
		task.setResend_count(defaultTask.getResend_count());
		task.setTask_over_time(defaultTask.getTask_over_time());
		task.setPolicy_name(defaultTask.getPolicy_name());
		task.setSend_notice(defaultTask.getSend_notice());
		
		return task;
	}
	
	//从默认任务中得到拷贝的Task类型的任务
	private Task getCopyTask(DefaultTask defaultTask,String taskType,String targetSubjectDeviceId,String taskName, String chooseTargetDeviceIdList)
	{
		Task task = new Task();
		
		task.setTask_type(Integer.parseInt(taskType));
		task.setTask_subject(targetSubjectDeviceId);
		task.setTask_name(taskName);
		task.setTask_target(chooseTargetDeviceIdList);
		task.setPolicy_para(defaultTask.getPolicy_para());
		task.setIs_cycle(defaultTask.getIs_cycle());
		task.setTask_interval(defaultTask.getTask_interval());
		task.setInterval_unit(defaultTask.getInterval_unit());
		task.setSend_ip(defaultTask.getSend_ip());
		task.setStart_time(defaultTask.getStart_time());
		task.setEnd_time(defaultTask.getEnd_time());
		task.setTask_stat(defaultTask.getTask_stat());
		task.setLevel(defaultTask.getLevel());
		task.setResend_interval(defaultTask.getResend_interval());
		task.setResend_count(defaultTask.getResend_count());
		task.setTask_over_time(defaultTask.getTask_over_time());
		task.setPolicy_name(defaultTask.getPolicy_name());
		task.setSend_notice(defaultTask.getSend_notice());
		
		return task;
	}
	
	//设置链路性能或者链路变化的任务
	private String getPolicy_paraForPath(String chooseTargetDeviceIdList) {
		String[] chooseTargetDeviceIdArray = chooseTargetDeviceIdList.split(";");
		String deviceCount = String.valueOf(chooseTargetDeviceIdArray.length); 
		String policypara="[TASK]\r\nTestTimeSection=\r\nDEVICE_COUNT="+deviceCount+"\r\n";
		
		for (int i = 0; i < chooseTargetDeviceIdArray.length; i++)
		{
			Equip equip = equipService.getEquipById(chooseTargetDeviceIdArray[i]);
			List<EquipInte> equipInteList = equipInteService.getEquipIntesByEquipId(equip.getEquipId());
    		int equipInteCount = equipInteList.size();//设备的接口数
    		
    		policypara = policypara+"[DEVICE"+i+"]\r\n"+"EQUIP_ID="+equip.getEquipId()
    			+"\r\nMANAGE_IP="+equip.getManageIp()+"\r\nSNMP_PORT="+equip.getSnmpPort()+"\r\nSNMP_VERSION="+
    			equip.getSnmpVersion()+"\r\nSNMP_RCOMMUNITY="+equip.getSnmpRcommunity()+"\r\nSNMP_RETRY="+equip.getSnmpRetry()
    			+"\r\nSNMP_TIMEOUT="+equip.getSnmpTimeout()+"\r\nSNMP_V3_SECURITYNAME="+equip.getSnmpV3SecurityName()
    			+"\r\nSNMP_V3_SECURITYLEVEL="+equip.getSnmpV3SecurityLevel()+"\r\nSNMP_V3_SECURITYMODEL="+equip.getSnmpV3SecurityModel()
    			+"\r\nSNMP_V3_CONTEXTNAME="+equip.getSnmpV3ContextName()+"\r\nSNMP_V3_CONTEXTENGONEID="+equip.getSnmpV3ContextEngoneId()
    			+"\r\nSNMP_V3_AUTHPROTOCOL="+equip.getSnmpV3AuthProtocol()+"\r\nSNMP_V3_AUTHPASSWORD="+equip.getSnmpV3AuthPassword()
    			+"\r\nSNMP_V3_PRIVPROTOCOL="+equip.getSnmpV3PrivProtocol()+"\r\nSNMP_V3_PRIVPASSWORD="+equip.getSnmpV3PrivPassword()
    			+"\r\nINTERFACE_COUNT="+equipInteCount+"\r\n";
    		
    		for(int j=0;j<equipInteList.size();j++)
    		{
    			EquipInte equipInte=equipInteList.get(j);
    			policypara = policypara+"[DEVICE"+i+"_INTERFACE"+j+"]\r\nINTEID="+equipInte.getEquipInteUnionKey().getInteId()
    			+"\r\nINTETRAFFIC="+equipInte.getInteTraffic()+"\r\nMEASURETIME="+equipInte.getMeasureTime()+"\r\nINTRAFFIC="+equipInte.getInTraffic()
    			+"\r\nOUTTRAFFIC="+equipInte.getOutTraffic()+"\r\nINLOSSRATE="+equipInte.getInLossRate()+"\r\nOUTLOSSRATE="+equipInte.getOutLossRate()
    			+"\r\n";
    		}
    		
		}
		
		return policypara;
	}
}
