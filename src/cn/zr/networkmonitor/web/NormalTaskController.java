package cn.zr.networkmonitor.web;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.zr.networkmonitor.domain.Combox;
import cn.zr.networkmonitor.domain.ComboxText;
import cn.zr.networkmonitor.domain.Dict;
import cn.zr.networkmonitor.domain.Equip;
import cn.zr.networkmonitor.domain.Page;
import cn.zr.networkmonitor.domain.Pair;
import cn.zr.networkmonitor.domain.Task;
import cn.zr.networkmonitor.domain.TreeNode;
import cn.zr.networkmonitor.service.DictService;
import cn.zr.networkmonitor.service.EquipService;
import cn.zr.networkmonitor.service.TaskService;
import cn.zr.networkmonitor.util.DateFormatUtil;

/**
 * 常规界面任务的控制器 by zxgm 2016-10-31
 * */
@Controller
public class NormalTaskController {
	
	@Autowired
	private TaskService taskService;
	@Autowired
	private EquipService equipService;
	@Autowired
	private DictService dictService;
	
	/**
	 * 返回指定任务编号的任务目标设备下拉框数据
	 * @param taskNum 任务编号
	 * @return
	 */
	@RequestMapping("getTargetEquipsByTaskNum.html")
	@ResponseBody
	public List<ComboxText> getTargetEquipsByTaskNum(String taskNum)
	{
		List<ComboxText> comboxTextList = new ArrayList<ComboxText>();
		Task task = taskService.getTaskById(taskNum);
		String taskTargetString = task.getTask_target();
		if(!taskTargetString.isEmpty())
		{
			String[] taskTargetArray = taskTargetString.split(";");
			for(String taskTarget:taskTargetArray)
			{
				if(!taskTarget.isEmpty())
				{
					Equip equip = equipService.getEquipById(taskTarget);
					ComboxText comboxText = new ComboxText();
					comboxText.setTextText(equip.getEquipName());
					comboxText.setValueText(equip.getEquipId());
					comboxTextList.add(comboxText);
				}
			}
		}
		
		return comboxTextList;
	}
	
	/**
	 * 返回指定任务编号的任务
	 * @param taskNum 任务编号
	 * @return
	 */
	@RequestMapping("getTaskByTaskNum.html")
	@ResponseBody
	public Map<String,Object> getTaskByTaskNum(String taskNum)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		Task task = taskService.getTaskById(taskNum);
		map.put("task",task);
		return map;
	}
	
	/**
	 * 返回任务类型的key-value
	 * by zxgm 20170122
	 * @return
	 */
	@RequestMapping("getTaskStatNameCount.html")
	@ResponseBody
	public Map<String,Integer> getTaskStatNameCount()
	{
		Map<String,Integer> map = new HashMap<String, Integer>();

		String[] taskStatString={"未激活","激活未下发","激活已下发","用户停止任务","下发失败"};
		for(int i=0;i<taskStatString.length;i++)
		{
			int count = taskService.getCountByTaskStat(i);
			map.put(taskStatString[i], count);
		}
		return map;
	}
	
	/**
	 * 返回任务类型key-value
	 * @return
	 */
	@RequestMapping("getTaskTypeNameCount.html")
	@ResponseBody
	public Map<String, Integer> getTaskTypeNameCount()
	{
		Map<String, Integer> map = new HashMap<String,Integer>();
		List<Dict> dictList = dictService.getDeviceCategorys("RWLB");
		for(Dict dict:dictList)
		{
			int count = taskService.getCountByTaskType(dict.getDict_numb());
			map.put(dict.getDict_cont(), count);
		}
		return map;
	}
	/**
	 * 返回指定的任务名称、任务类型和任务状态的任务
	 * @param taskName 任务名称(模糊查询)
	 * @param taskTypeString 任务类型列表1;2;3;4;
	 * @param taskStatString 任务状态 列表 0;1;4  0:未激活；1：激活未下发；2：激活已下发；3：停止任务；4：下发失败
	 * @return
	 */
	@RequestMapping("getTasksByConditionPage.html")
	@ResponseBody
	public Map<String,Object> getTasksByConditionPage(String taskName,String taskTypeString,
			String taskStatString, int currentPageNum, int pageSize)
	{
		System.out.println("任务名称："+taskName+";任务类型列表:"+taskTypeString
				+";任务状态列表:"+taskStatString+";当前页码:"+currentPageNum+";页面大小:"+pageSize);
		
		Page page = null;
		Map<String, Object> map = new HashMap<String, Object>();
		//1.任务名称未填写
		if(taskName.isEmpty() || taskName.equals(""))
		{
			//1.1未勾选任务类型
			if(taskTypeString.isEmpty() || taskTypeString.equals(""))
			{
				page = taskService.getTasksByConditionPage_taskStatString(taskStatString,currentPageNum,pageSize);
			}else//1.2勾选任务类型
			{
				page = taskService.getTasksByConditionPage_taskTypeStringAndTaskStatString(taskTypeString, taskStatString,currentPageNum,pageSize);
			}
		}else//2.任务名称填写
		{
			//2.1未勾选任务类型
			if(taskTypeString.isEmpty() || taskTypeString.equals(""))
			{
				page = taskService.getTasksByConditionPage_taskNameAndTaskStatString(taskName, taskStatString,currentPageNum,pageSize);
			}else//2.2勾选任务类型
			{
				page = taskService.getTasksByConditionPage(taskName,taskTypeString, taskStatString,currentPageNum,pageSize);
			}
		}
		
		map.put("page", page);
		return map;
	}
	
	/**
	 * 批量删除指定的taskNumList任务
	 * @param taskNumList
	 * @return
	 */
	@RequestMapping("deleteTasksByTaskNumList.html")
	@ResponseBody  
	public Map<String, Object> deleteTasksByTaskNumList(String taskNumList)
	{
		System.out.println("taskNumList:"+taskNumList);
		Map<String, Object> map = new HashMap<String, Object>();
		
		String[] taskNumListArray = taskNumList.split(";");
		
		for(String taskNum:taskNumListArray)
		{
			if(taskNum.isEmpty())
				continue;
			taskService.deleteTasks(taskNum);
		}
		map.put("data", "删除成功");
		return map;
	}
	
	/**
	 * 返回激活任务的视图
	 * @param tasknum
	 * @return
	 */
	@RequestMapping("activeTaskUI.html")
	public ModelAndView activeTaskUI(String taskNum)
	{
		ModelAndView modelAndView = new ModelAndView();
		
		if(taskNum != null)
		{
			Task task = taskService.getTaskById(taskNum);
			modelAndView.addObject("task",task);
			
			modelAndView.setViewName("/WEB-INF/jsp/taskManager/normalTaskView/activeTask.jsp");
		}else
		{
			modelAndView.setViewName("/WEB-INF/jsp/taskManager/normalTaskView/activeTaskByBatch.jsp");
		}
			
		return modelAndView;
	}
	
	/**
	 * 激活任务
	 * @param activeTaskInfo 激活表单信息
	 * @param taskNumString 激活任务编号列表 1;2;3;
	 * @return
	 */
	@RequestMapping(value = "activeAjaxTask.html")
	@ResponseBody 
	public Map<String, Object> activeAjaxTask(String activeTaskInfo,String taskNumString)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println("activeTaskInfo="+activeTaskInfo+";taskNumString="+taskNumString);
		JSONObject jsonObject = JSONObject.fromObject(activeTaskInfo);
		String[] taskNumArray = taskNumString.split(";");
		Date startTimeDate = DateFormatUtil.formatDate(jsonObject.getString("start_time"), "MM/dd/yyyy HH:mm:ss");
		Date endTimeDate = DateFormatUtil.formatDate(jsonObject.getString("end_time"), "MM/dd/yyyy HH:mm:ss");;
			
		for(String str:taskNumArray)
		{
			if(!str.isEmpty())
			{
				Task task = taskService.getTaskById(str);
				task.setStart_time(startTimeDate);
				task.setEnd_time(endTimeDate);
				task.setTask_stat(1);
				taskService.updateTask(task);
			}
		}
		
		return map;
	}
		
	
	/**
	 * 任务列表
	 * @return
	 */
	@RequestMapping("listTasks.html")
	public ModelAndView listTasks()
	{
		ModelAndView modelAndView = new ModelAndView();
		
		List<Dict> dictTypeList = dictService.getDeviceCategorys("RWLB");//得到字典表中的设备类别
		modelAndView.addObject("dictTypeList", dictTypeList);
		
	    modelAndView.setViewName("/WEB-INF/jsp/taskManager/normalTaskView/normalTask_list/listTasks.jsp");
	    return modelAndView;
	}
	
	/**
	 * 任务添加UI
	 * @return
	 */
	@RequestMapping("taskAddUI.html")
	public String taskAddUI()
	{
		return "forward:/WEB-INF/jsp/taskManager/normalTaskView/normalTask_add/taskAddUI.jsp";
	}
	
	/**
	 * 转发到双向时延测量任务添加UI界面
	 * @return
	 */
	@RequestMapping("getDLatencyTaskAddUI.html")
	public String getDLatencyTaskAddUI()
	{
		return "forward:/WEB-INF/jsp/taskManager/normalTaskView/normalTask_add/DLatencyTaskAddUI.jsp";
	}
	
	/**
	 * 转发到单向时延测量任务添加UI界面
	 * @return
	 */
	@RequestMapping("getSLatencyTaskAddUI.html")
	public String getSLatencyTaskAddUI()
	{
		return "forward:/WEB-INF/jsp/taskManager/normalTaskView/normalTask_add/SLatencyTaskAddUI.jsp";
	}
	
	/**
	 * 转发到阻断测量任务添加UI界面
	 * @return
	 */
	@RequestMapping("getBlockTaskAddUI.html")
	public String getBlockTaskAddUI()
	{
		return "forward:/WEB-INF/jsp/taskManager/normalTaskView/normalTask_add/BlockTaskAddUI.jsp";
	}
	
	/**
	 * 转发到TE隧道测量任务添加UI界面
	 * @return
	 */
	@RequestMapping("getTETestTaskAddUI.html")
	public String getTETestTaskAddUI()
	{
		return "forward:/WEB-INF/jsp/taskManager/normalTaskView/normalTask_add/TETestTaskAddUI.jsp";
	}
	
	/**
	 * 转发到链路性能测量任务添加UI界面
	 * @return
	 */
	@RequestMapping("getPathPerformanceTaskAddUI.html")
	public String getPathPerformanceTaskAddUI()
	{
		return "forward:/WEB-INF/jsp/taskManager/normalTaskView/normalTask_add/PathPerformanceTaskAddUI.jsp";
	}
	
	/**
	 * 转发到链路变化监测任务添加UI界面
	 * @return
	 */
	@RequestMapping("getPathChangeTaskAddUI.html")
	public String getPathChangeTaskAddUI()
	{
		return "forward:/WEB-INF/jsp/taskManager/normalTaskView/normalTask_add/PathChangeTaskAddUI.jsp";
	}
	
	/**
	 * 转发到多媒体业务性能测量任务添加UI界面
	 * @return
	 */
	@RequestMapping("getMultiMediaTaskAddUI.html")
	public String getMultiMediaTaskAddUI()
	{
		return "forward:/WEB-INF/jsp/taskManager/normalTaskView/normalTask_add/MultiMediaTaskAddUI.jsp";
	}
	
	/**
	 * 转发到通用业务测量任务添加UI界面
	 * @return
	 */
	@RequestMapping("getCommonServiceTaskAddUI.html")
	public String getCommonServiceTaskAddUI()
	{
		return "forward:/WEB-INF/jsp/taskManager/normalTaskView/normalTask_add/CommonServiceTaskAddUI.jsp";
	}
	
	//用于端性能态势得到活动的任务
	@RequestMapping("getActiveTasksByAjax.html")
	@ResponseBody
	public List<TreeNode> getActiveTasksByAjax(){
		List<Task> activeTasks = taskService.getActiveTasks();//得到所有活动任务
		List<TreeNode> treeNodeList = new ArrayList<TreeNode>();//用于存储easyui的树节点
		for (int i = 0; i < activeTasks.size(); i++) {
			TreeNode treeNode = new TreeNode();
			treeNode.id=String.valueOf(i+1);
			treeNode.text = activeTasks.get(i).getTask_name();
			treeNode.num = String.valueOf(activeTasks.get(i).getTask_num());
			
			treeNodeList.add(treeNode);
		}
		
		return treeNodeList;
	}
	
	//用于端性能态势页面跳转
	@RequestMapping("iconEditDLatencyTask.html")
	public String iconEditDLatencyTask(){
		return "forward:/WEB-INF/jsp/taskManager/iconTaskView/iconEditTask/iconEditDLatencyTask.jsp";
	}
	
	//异步获取所有的任务
	@RequestMapping("ajaxGetAllTasks.html")
	@ResponseBody 
	public Map<String, Object> ajaxGetAllTasks()
	{
		Map<String, Object> map = new HashMap<String, Object>();
		List<Task> taskList = taskService.getAllTasks();
		if (taskList.size() == 0) {
			map.put("data", "null");
		}else {
			map.put("data", taskList);
		}
		
		return map;
	}
	
	/* by zxgm 2016-11-11
	 * 根据任务类别获取任务（端性能统计的下拉任务框）
	 * taskType:任务类别
	 * */
	@RequestMapping("getTasksByTaskType.html")
	@ResponseBody
	public List<Task> getTasksByTaskType(String taskType)
	{
		return taskService.getTaskByTaskType(taskType);
	}
	
	@RequestMapping("getTasksByTaskSubject.html")
	@ResponseBody
	public List<Task> getTasksByTaskSubject(String taskSubject)
	{
		return taskService.getTaskByTaskSubject(taskSubject);
	}
	
	/* by zxgm 2016-11-22
	 * 获取双向时延任务(用于端性能统计分析的性能分析，区别是任务目标转化为List集合)
	 * */
	@RequestMapping("getTasksForAnalysis.html")
	@ResponseBody 
	public List<TreeNode> getTasksForAnalysis(String taskType)
	{
		List<Task> taskList = taskService.getTaskByTaskType(taskType);
		System.out.println("taskList:"+taskList);
		List<TreeNode> treeNodes = getTasksAndTargetForTreeNode(taskList);
		
		return treeNodes;
	}
	
	/**
	 * 返回通用业务性能统计的性能分析的树节点集合
	 * @param taskType	任务类型
	 * @param serviceType	通用业务中服务类型,格式：service_type=WEB
	 * @return
	 */
	@RequestMapping("getTasksForGeneralServiceAnalysis.html")
	@ResponseBody
	public List<TreeNode> getTasksForGeneralServiceAnalysis(String taskType, String serviceType)
	{
		List<Task> taskList = taskService.getTaskByTaskType(taskType);
		List<Task> satisfiedTaskList= new ArrayList<Task>();
		for(Task task : taskList)
		{
			String policyPara = task.getPolicy_para();
			if(serviceType.equalsIgnoreCase("service_type=EMAIL"))
			{
				if (policyPara.startsWith("service_type=smtp") || policyPara.startsWith("service_type=pop3"))
				{
					satisfiedTaskList.add(task);
				}
			}else {
				if(policyPara.startsWith(serviceType))
				{
					satisfiedTaskList.add(task);
				}
			}
		}
		
		return getTasksAndTargetForTreeNode(satisfiedTaskList);
	}

	/**
	 * 返回用于性能分析的树节点的集合
	 * @param taskList 任务集合
	 * @return
	 */
	private List<TreeNode> getTasksAndTargetForTreeNode(List<Task> taskList)
	{
		List<TreeNode> treeNodes = new ArrayList<TreeNode>();
		for(int i=0;i<taskList.size();i++)
		{
			Task task = taskList.get(i);
			List<TreeNode> childTreeNodes = new ArrayList<TreeNode>();
			
			TreeNode treeNode = new TreeNode();
			treeNode.id=String.valueOf(i+1);
			treeNode.text = task.getTask_name();
			treeNode.state = "closed";
			
			String taskTarget = task.getTask_target();
			String[] taskTargetList = taskTarget.split(";");
			String taskSubject = task.getTask_subject();//得到任务主体
			Equip equip = equipService.getEquipByEquipId(taskSubject);
			String testSubjectIP = equip.getManageIp();//得到任务主体的IP
			
			for(String taskTargetId:taskTargetList)
			{
				if (!taskTargetId.equals(""))
				{
					Equip equip2 = equipService.getEquipById(taskTargetId);
					TreeNode childTreeNode = new TreeNode();
					childTreeNode.taskNum = task.getTask_num();//设置任务编号
					childTreeNode.text = equip2.getEquipName();//设置显示的设备名称
					childTreeNode.testTargetIP = equip2.getManageIp();//设置测量目标IP
					childTreeNode.testSubjectIP = testSubjectIP;//设置测量主体IP
					childTreeNodes.add(childTreeNode);
				}
			}
			treeNode.children=childTreeNodes;
			
			
			treeNodes.add(treeNode);
		}
		return treeNodes;
	}
	
	/**
	 * 返回指定任务类型用于显示任务测量数据中的任务列表数据
	 * @param taskType 任务类型
	 * @return
	 */
	@RequestMapping("ajaxGetAllTasksByTaskType.html")
	@ResponseBody
	public List<Combox> ajaxGetAllTasksByTaskType(String taskType,String serviceType)
	{
		List<Task> taskList = taskService.getTaskByTaskType(taskType);
		//1. 对通用业务性能测量任务单独处理
		if(taskType.equals("8"))
		{
			List<Task> satisfiedTaskList = new ArrayList<Task>();
			for(Task task:taskList)
			{
				String policyPara = task.getPolicy_para();
				if(serviceType.equals("web") && policyPara.startsWith("service_type=web"))
					satisfiedTaskList.add(task);
				else if(serviceType.equals("ftp") && policyPara.startsWith("service_type=ftp"))
					satisfiedTaskList.add(task);
				else if(serviceType.equals("dns") && policyPara.startsWith("service_type=dns"))
					satisfiedTaskList.add(task);
				else if(serviceType.equals("email") && (policyPara.startsWith("service_type=smtp") || policyPara.startsWith("service_type=pop3")))
					satisfiedTaskList.add(task);
			}
			
			taskList.clear();
			taskList.addAll(satisfiedTaskList);
		}
		
		List<Combox> comboxs = new ArrayList<Combox>();
		Combox combox = null;
		for(Task task:taskList){
			combox = new Combox();
			
			combox.setId(task.getTask_num());
			combox.setText(task.getTask_name());
			comboxs.add(combox);
		}
		
		return comboxs;
	}
	
	//异步获取所有双向时延任务
	@RequestMapping("ajaxGetAllDoubleTimeDelay.html")
	@ResponseBody 
	public List<Combox> ajaxGetAllDoubleTimeDelayTasks()
	{
		//得到所有的双向时延任务
		List<Task> taskList = taskService.getTaskByTaskType("1");
		List<Combox> comboxs = new ArrayList<Combox>();
		Combox combox = null;
		for(Task task:taskList){
			combox = new Combox();
			
			combox.setId(task.getTask_num());
			combox.setText(task.getTask_name());
			comboxs.add(combox);
		}
		
		return comboxs;
	}
	
	//异步获取所有阻断任务
	@RequestMapping("ajaxGetAllBlockingUp.html")
	@ResponseBody 
	public List<Combox> ajaxGetAllBlockingUpTasks()
	{
		//得到所有的双向时延任务
		List<Task> taskList = taskService.getTaskByTaskType("3");
		List<Combox> comboxs = new ArrayList<Combox>();
		Combox combox = null;
		Task task = null;
		for(int i=0;i<taskList.size();i++){
			combox = new Combox();
			task = taskList.get(i);
			combox.setId(task.getTask_num());
			combox.setText(task.getTask_name());
			if(i==0){
				combox.setSelected(true);
			}
			comboxs.add(combox);
		}
		
		return comboxs;
	}
	
	
	
	@RequestMapping("get_Taskcontent.html")
	public ModelAndView getAllTasksByPage(@RequestParam("tasknum") String tasknum)
	{
		ModelAndView modelAndView = new ModelAndView();
		Task  task = taskService.getTaskById(tasknum);
		List<Equip> equipList = equipService.getAllEquips();
		List<Equip> equipList1 = new ArrayList<Equip>();
		List<Equip> taskList = new ArrayList<Equip>();
		
		String task_target = task.getTask_target();
		String[] targets = task_target.split(";");
		String targetsName = "";
		if(targets.length != 0){
			for(String id : targets){
				Equip e = equipService.getEquipByEquipId(id);
				taskList.add(e);
				targetsName += e.getEquipName() + ";";
			}
		}
		
		String viewName="";
		switch (task.getTask_type())
		{
			case 1://双向时延、丢包率、时延抖动测量
				viewName = "/WEB-INF/jsp/taskManager/normalTaskView/normalEditTask/editDLatencyTask.jsp";
				equipList1 = equipList;
				break;
			case 2://单向时延、丢包率、时延抖动测量
				viewName = "/WEB-INF/jsp/taskManager/normalTaskView/normalEditTask/editSLatencyTask.jsp";

				for(Equip e : equipList)
				{
					String type = e.getEquipKind();
					String name = e.getEquipName();
					if(type.substring(type.length() - 2).equals("探针"))
					{
						if(targetsName.contains(name) == false)
						{
							equipList1.add(e);
						}
					}
				}
				break;
			case 3://阻断测量
				viewName = "/WEB-INF/jsp/taskManager/normalTaskView/normalEditTask/editBlockTask.jsp";
				equipList1 = equipList;
				break;
			case 4://TE隧道测量
				viewName = "/WEB-INF/jsp/taskManager/normalTaskView/normalEditTask/editTETestTask.jsp";
				equipList1 = equipList;
				break;
			case 5://链路性能测量
				viewName = "/WEB-INF/jsp/taskManager/normalTaskView/normalEditTask/editPathPerformanceTask.jsp";
				equipList1 = equipList;
				break;
			case 6://链路变化监测
				viewName = "/WEB-INF/jsp/taskManager/normalTaskView/normalEditTask/editDLatencyTask.jsp";
				equipList1 = equipList;
				break;
			case 7://多媒体业务性能测量
				viewName = "/WEB-INF/jsp/taskManager/normalTaskView/normalEditTask/editMultiMediaTask.jsp";
				for(Equip e : equipList)
				{
					String type = e.getEquipKind();
					String name = e.getEquipName();
					if(type.substring(type.length() - 2).equals("探针"))
					{
						if(targetsName.contains(name) == false)
						{
							equipList1.add(e);
						}
					}
				}
				break;
			case 8://通用业务测量
				viewName = "/WEB-INF/jsp/taskManager/normalTaskView/normalEditTask/editCommonServiceTask.jsp";
				for(Equip e : equipList)
				{
					String type = e.getEquipKind();
					String name = e.getEquipName();
					if(type.substring(type.length() - 3).equals("服务器"))
					{
						if(targetsName.contains(name) == false)
						{
							equipList1.add(e);
						}
					}
				}
				break;
	
			default:
				break;
		}
		String policy = task.getPolicy_para();

		modelAndView.addObject("task", task);
		modelAndView.addObject("policy", policy);
		modelAndView.addObject("taskList", taskList);
		modelAndView.addObject("equipList", equipList1);
		modelAndView.setViewName(viewName);
		
		return modelAndView;
	}
	
	
	//异步添加任务
	@RequestMapping(value = "/addAjaxTask.html", method = RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> addAjaxEquip(HttpEntity<Task> model)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		taskService.saveTask(model.getBody());
		
		Task task = taskService.getTaskByAccTaskName(model.getBody().getTask_name());
		if(task != null)
		{
			map.put("taskNum", task.getTask_num());
			map.put("message", task.getTask_type());
		}
		
		return map;
	}
	
	//异步更新
	@RequestMapping(value = "/updateAjaxTask.html", method = RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateAjaxEquip(HttpEntity<Task> model)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		Task task = model.getBody();
		System.out.println(task.getTask_num() + "  " + task.getTask_name() + "  " + task.getPolicy_name());
		taskService.updateTask(task);
		map.put("success", "true");
		map.put("data", "更新成功");
		return map;
	}
	
	
		
	//监测任务态势中的活动任务数->跨域任务
	@RequestMapping("getStrideTasks.html")
	@ResponseBody
	public List<Pair> getStrideTasks(){
		Pair pair1 = new Pair(335,"跨域任务");
		Pair pair2 = new Pair(310, "非跨域任务");
		List<Pair> pairList = new ArrayList<Pair>();
		pairList.add(pair1);
		pairList.add(pair2);
		return pairList;
	}
	
	//监测任务态势中的活动任务类别
	@RequestMapping("getActiveTaskTypes.html")
	@ResponseBody
	public List<Pair> getActiveTaskTypes(){
		List<Pair> pairList = new ArrayList<Pair>();
		List<Task> taskList = taskService.getAllTasks();
		int value1=0,value2=0,value3=0,value4=0,value5=0,value6=0,value7=0,value8=0,value9=0,value10=0,value11=0,value12=0,value13=0,value14=0,value15=0;
		for (int i = 0; i < taskList.size(); i++) {
			int taskType = taskList.get(i).getTask_type();
			switch (taskType) {
			case 1://双向时延
				value1++;
				break;
			case 2://单向时延
				value2++;
				break;
			case 3://阻断测量
				value3++;
				break;
			case 4://路由测量
				value4++;
				break;
			case 5://QoS等级性能测量
				value5++;
				break;
			case 6://VPN-TE性能测量
				value6++;
				break;
			case 7://路由器测试代理测量
				value7++;
				break;
			case 8://链路性能测量
				value8++;
				break;
			case 9://业务传输性能测量
				value9++;
				break;
			case 10://性能探针管理
				value10++;
				break;
			case 11://流量探针管理
				value11++;
				break;
			case 12://探针更新
				value12++;
				break;
			case 13://通用业务测量
				value13++;
				break;
			case 14://多播测量
				value14++;
				break;
			case 15://链路变化测量
				value15++;
				break;
			default:
				break;
			}
		}
		
		if (value1!=0) {
			Pair pair = new Pair(value1, "双向时延、丢包率、时延抖动测量");
			pairList.add(pair);
		}
		if (value2!=0) {
			Pair pair = new Pair(value2, "单向时延、丢包率、时延抖动测量");
			pairList.add(pair);
		}
		if (value3!=0) {
			Pair pair = new Pair(value3, "阻断测量");
			pairList.add(pair);
		}
		if (value4!=0) {
			Pair pair = new Pair(value4, "路由测量");
			pairList.add(pair);
		}
		if (value5!=0) {
			Pair pair = new Pair(value5, "QoS等级性能测量");
			pairList.add(pair);
		}
		if (value6!=0) {
			Pair pair = new Pair(value6, "VPN-TE性能测量");
			pairList.add(pair);
		}
		if (value7!=0) {
			Pair pair = new Pair(value7, "路由器测试代理测量");
			pairList.add(pair);
		}
		if (value8!=0) {
			Pair pair = new Pair(value8, "链路性能测量");
			pairList.add(pair);
		}
		if (value9!=0) {
			Pair pair = new Pair(value9, "业务传输性能测量");
			pairList.add(pair);
		}
		if (value10!=0) {
			Pair pair = new Pair(value10, "性能探针管理");
			pairList.add(pair);
		}
		if (value11!=0) {
			Pair pair = new Pair(value11, "流量探针管理");
			pairList.add(pair);
		}
		if (value12!=0) {
			Pair pair = new Pair(value12, "探针更新");
			pairList.add(pair);
		}
		if (value13!=0) {
			Pair pair = new Pair(value13, "通用业务测量");
			pairList.add(pair);
		}
		if (value14!=0) {
			Pair pair = new Pair(value14, "多播测量");
			pairList.add(pair);
		}
		if (value15!=0) {
			Pair pair = new Pair(value15, "链路变化监测");
			pairList.add(pair);
		}
		return pairList;
	}
	
	//监测任务态势中的告警次数
	@RequestMapping("getWarningNum.html")
	public ModelAndView getWarningNum(){
		ModelAndView modelAndView = new ModelAndView();
		return modelAndView;
	}
	
	//ajax方式得到任务根据任务Num
	@RequestMapping("getTaskByTaskNumAjax.html")
	@ResponseBody
	public Task getTaskByTaskNumAjax(String task_num){
		return taskService.getTaskById(task_num);
	}
	
	/*
	//分类查询
	@RequestMapping(value = "/ajaxgetAllMainkind.html",method=RequestMethod.POST)
	@ResponseBody
	public List<Pair> getallKind(){
		List allkinds = alarmRecService.getAlarmRecsByGroupByAlarmMainkind();
		List<Pair> all =  new ArrayList<Pair>();
		for(int i=0;i<allkinds.size();i++){
			Pair pair = new Pair();
			Object[] objects = (Object[]) allkinds.get(i);
			Long longvalue = (Long) objects[1];
			pair.setValue(longvalue.intValue());
			pair.setName((String)objects[0]);
			all.add(pair);
		}
		return all;
		
	}
*/
	
	//根据探针设备的Id得到探针相关的任务
	@RequestMapping("getTaskInfoByEquipId.html")
	public List<Task> getTaskInfoByEquipId(String equipId)
	{
		List<Task> taskList = taskService.getTaskInfoByEquipId(equipId);
		for(Task task:taskList)
		{
			task.setTaskTargetNum(task.getTask_target().split(";").length);
		}
		
		return taskList;
	}
	
}
