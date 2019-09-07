package cn.zr.networkmonitor.web;

import java.io.IOException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.zr.networkmonitor.domain.Combox;
import cn.zr.networkmonitor.domain.Equip;
import cn.zr.networkmonitor.domain.EquipInte;
import cn.zr.networkmonitor.domain.Page;
import cn.zr.networkmonitor.domain.RoundShowRouterAndInterface;
import cn.zr.networkmonitor.domain.Task;
import cn.zr.networkmonitor.domain.TreeNode;
import cn.zr.networkmonitor.domain.TreeNodeForZTree;
import cn.zr.networkmonitor.service.EquipInteService;
import cn.zr.networkmonitor.service.EquipService;
import cn.zr.networkmonitor.service.RoundShowRouterAndInterfaceService;
import cn.zr.networkmonitor.service.TaskService;
import cn.zr.networkmonitor.util.ExportExcelUtils;

import cn.zr.networkmonitor.domain.Dict;
import cn.zr.networkmonitor.service.DictService;

/**
 * 设备控制
 * */
@Controller
public class NormalEquipController {

	@Autowired
	private EquipService equipService;
	@Autowired
	private RoundShowRouterAndInterfaceService roundShowRouterAndInterfaceService;
	@Autowired
	private DictService dictService;
	@Autowired
	private EquipInteService equipInteService;
	@Autowired
	private TaskService taskService;
	
	/**
	 * 分页获取设备列表数据
	 * @param currentPageNum 当前页
	 * @param pageSize 页面大小
	 * @return
	 */
	@RequestMapping("getEquipsByPage.html")
	@ResponseBody
	public Map<String, Object> getEquipsByPage(int currentPageNum, int pageSize)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		Page page = equipService.getAllEquipsByPage(currentPageNum, pageSize);
		
		map.put("page", page);
		return map;
	}
	
	@RequestMapping("getEquipsByEquipKinds.html")
	@ResponseBody
	public List<Equip> getEquipsByEquipKinds(String equipKindString, String equipConditionTest)
	{
		return equipService.getEquipsByCondition(equipKindString, equipConditionTest);
		//return equipService.getEquipsByEquipKinds(equipKindString);
	}
	
	/**
	 * 返回设备列表中的归属单位的key-value形式
	 * @return
	 */
	@RequestMapping("getAreaUnitNameCount.html")
	@ResponseBody
	public Map<String,Integer> getAreaUnitNameCount()
	{
		Map<String, Integer> map = new HashMap<String, Integer>();
		List<Dict> dictList = dictService.getDeviceCategorys("GSDW");
		for(Dict dict:dictList)
		{
			int count = equipService.getCountByAreaUnit(dict.getDict_cont());//返回指定归属单位所拥有的设备数
			map.put(dict.getDict_cont(), count);
		}
		return map;
	}
	
	/**
	 * 返回设备列表中的设备类型的key-value形式
	 * @return
	 */
	@RequestMapping("getEquipKindNameCount.html")
	@ResponseBody
	public Map<String, Integer> getEquipKindNameCount()
	{
		Map<String, Integer> map = new HashMap<String, Integer>();
		List<Dict> dictList = dictService.getDeviceCategorys("SBLB");
		for(Dict dict:dictList)
		{
			int count = equipService.getCountByEquipKind(dict.getDict_cont());//返回指定归属单位所拥有的设备数
			map.put(dict.getDict_cont(), count);
		}
		return map;
	}
	
	//得到所有的设备信息,包括需要显示数据
	@RequestMapping("listEquips.html")
	public ModelAndView getAllEquips()
	{
		ModelAndView modelAndView = new ModelAndView();
		List<Dict> dictTypeList = dictService.getDeviceCategorys("SBLB");//得到字典表中的设备类别
		List<Dict> dictUnitList = dictService.getDeviceCategorys("GSDW");//得到字典表中的设备归属单位
		modelAndView.addObject("dictTypeList", dictTypeList);
		modelAndView.addObject("dictUnitList", dictUnitList);
		modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_list/listEquips.jsp");
		return modelAndView;
	}
	
	//批量删除设备
	@RequestMapping("deleteEquips.html")
	@ResponseBody  
	public Map<String, Object> deleteEquips(String equipNumList)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		String[] equipNums = equipNumList.split(";");
		for(String equipNum:equipNums){
			if (equipNum != null && !equipNum.equals("")) {
				equipService.deleteEquipsByNum(equipNum);
			}
		}
		return map;
	}
	
	/**
	 * 用于设备添加UI页面
	 * @return
	 */
	@RequestMapping("equipAddUI.html")
	public String equipAddUI()
	{
		return "forward:/WEB-INF/jsp/equipManager/normalEquip_add/equipAddUI.jsp";
	}
	
	/**
	 * 返回路由器的UI视图
	 * @return
	 */
	@RequestMapping("getRouterAddUI.html")
	public ModelAndView getRouterAddUI(String equipKind)
	{
		ModelAndView modelAndView = new ModelAndView();
		List<Dict> dictUnitList = dictService.getDeviceCategorys("GSDW");//得到字典表中的设备归属单位
		modelAndView.addObject("dictUnitList", dictUnitList);
		modelAndView.addObject("equipKind", equipKind);//填充设备类型
		
		modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_add/routerAddUI.jsp");
		return modelAndView;
	}
	
	/**
	 * 返回性能探针的UI视图 
	 * @return
	 */
	@RequestMapping("getPerformanceProbeAddUI.html")
	public ModelAndView getPerformanceProbeAddUI(String equipKind)
	{
		ModelAndView modelAndView = new ModelAndView();
		List<Dict> dictUnitList = dictService.getDeviceCategorys("GSDW");//得到字典表中的设备归属单位
		modelAndView.addObject("dictUnitList", dictUnitList);
		modelAndView.addObject("equipKind", equipKind);//填充设备类型
		
		modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_add/performanceProbeAddUI.jsp");
		return modelAndView;
	}
	
	/**
	 * 返回服务器的UI视图
	 * @return
	 */
	@RequestMapping("getServeAddUI.html")
	public ModelAndView getServeAddUI(String equipKind)
	{
		ModelAndView modelAndView = new ModelAndView();
		List<Dict> dictUnitList = dictService.getDeviceCategorys("GSDW");//得到字典表中的设备归属单位
		modelAndView.addObject("dictUnitList", dictUnitList);
		modelAndView.addObject("equipKind", equipKind);//填充设备类型
		
		modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_add/serveAddUI.jsp");
		return modelAndView;
	}
	
	/**
	 * 返回所有探针类型设备
	 * @return
	 */
	@RequestMapping("get_AjaxTanzhenEquip.html")
	@ResponseBody  
	public List<Combox> getAjaxTanzhenEquips(){
		String tanZhenEquipList = "性能硬探针;性能软探针;流量探针;";
		List<Equip> equips = equipService.getSubjectEquipsByTasktype(tanZhenEquipList);
		List<Combox> comboxs  = new ArrayList<Combox>();
		for(int i = 0; i < equips.size(); i ++){
			Combox combox = new Combox();
			if(i == 0){
				combox.setId(i + 1);
				combox.setText(equips.get(i).getEquipName());
				combox.setValue(equips.get(i).getEquipId());
				combox.setSelected(true);
			}
			else{
				combox.setId(i + 1);
				combox.setText(equips.get(i).getEquipName());
				combox.setValue(equips.get(i).getEquipId());
			}
			comboxs.add(combox);
		}
		return comboxs;
		
	}
	
	//打开设备编辑框
	@RequestMapping("viewEquipInfo.html")
	public ModelAndView viewEquipInfo(@RequestParam("deviceType") String equipType,  @RequestParam("equipId") String equipId)
	{
		ModelAndView modelAndView = new ModelAndView();
		
		Equip equip = equipService.getEquipByEquipId(equipId);
		String exist = "yes";
		if(equip == null){
			exist = "no";
		}

		
		modelAndView.addObject("equip", equip);//设备信息，用于回显数据
		modelAndView.addObject("exist", exist);
		
		if(equipType != null)
		{
			equipType = equipType.trim();
			
			if (equipType.equals("路由器")) {
				modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_view/router_view.jsp");
			}else if (equipType.equals("性能硬探针") || equipType.equals("性能软探针") || equipType.equals("流量探针")) {
				modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_view/probe_view.jsp");
			}else{
				modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_view/service_view.jsp");
			}
		}
		
		return modelAndView;
	}
	
	//打开设备编辑框
	@RequestMapping("addEquip.html")
	public ModelAndView addEquip(@RequestParam("deviceType") String equipType,  @RequestParam("equipId") String equipId){
		ModelAndView modelAndView = new ModelAndView();
		Equip equip = new Equip();
		equip.setEquipId(equipId);
		equip.setEquipKind(equipType);
		
		List<Dict> gsdws = dictService.getDeviceCategorys("GSDW");
		modelAndView.addObject("dictUnitList", gsdws);//用于归属单位的数据显示
		
		equipType = equipType.trim();
		
		if (equipType.equals("路由器")) {
			modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_edit/router_edit.jsp");
		}else if (equipType.equals("性能硬探针") || equipType.equals("性能软探针") || equipType.equals("流量探针")) {
			modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_edit/probe_edit.jsp");
		}else{
			modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_edit/service_edit.jsp");
		}
		modelAndView.addObject("equip", equip);//设备信息，用于回显数据
		return modelAndView;
	}
	//根据设备的类型和设备的Id,跳转到相应的界面显示
	@RequestMapping("getEquipInterfaceInfo.html")
	public ModelAndView getEquipInterfaceInfo(@RequestParam("deviceType") String equipType, @RequestParam("equipId") String equipId)
	{
		ModelAndView modelAndView = new ModelAndView();
		
		List<Dict> jklx = dictService.getDeviceCategorys("JKLX");
		modelAndView.addObject("dictStatusList", jklx);//用于归属单位的数据显示
	
		Equip equip = equipService.getEquipByEquipId(equipId);
		int equipNum = equip.getEquipNum();
		modelAndView.addObject("equipId", equipId);
		modelAndView.addObject("equipNum", equipNum);
		modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_edit/router_interface_edit.jsp");
		
		return modelAndView;
	}
	
	//根据设备的类型和设备的Id,跳转到相应的界面显示
	@RequestMapping("getEquipUI.html")
	public ModelAndView getEquipUI(@RequestParam("deviceType") String equipType, @RequestParam("equipId") String equipId)
	{
		ModelAndView modelAndView = new ModelAndView();
		
		List<Dict> gsdws = dictService.getDeviceCategorys("GSDW");
		modelAndView.addObject("dictUnitList", gsdws);//用于归属单位的数据显示
		
		Equip equip = equipService.getEquipByEquipId(equipId);
		String exist = "yes";
		if(equip == null){
			exist = "no";
		}

		
		modelAndView.addObject("equip", equip);//设备信息，用于回显数据
		modelAndView.addObject("exist", exist);
		
		if(equipType != null)
		{
			equipType = equipType.trim();
			
			if (equipType.equals("路由器")) {
				modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_edit/router_edit.jsp");
			}else if (equipType.equals("性能硬探针") || equipType.equals("性能软探针") || equipType.equals("流量探针")) {
				modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_edit/probe_edit.jsp");
			}else{
				modelAndView.setViewName("/WEB-INF/jsp/equipManager/normalEquip_edit/service_edit.jsp");
			}
		}
		
		return modelAndView;
	}
	

	
	
	//保存、编辑设备信息,返回保存失败与否的信息
	@RequestMapping("saveEquip.html")
	@ResponseBody 
	public Map<String, Object> saveEquip(Equip equip)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		//Equip equip = equipEntity.getBody();
		//1.编辑设备信息
		
		if(equip.getEquipName() == "" || equip.getEquipName() == null || equip.getManageIp() == "" || equip.getManageIp() == null)
		{
			map.put("message", "设备名或管理IP不能为空！");
			return map;
		}
		
		Equip equipSearchByIp = equipService.getEquipsByManageIP(equip.getManageIp());
		if(equipSearchByIp != null && equip.getEquipNum() == 0){       //管理的唯一性
			map.put("message", "管理IP已存在！");
			return map;
		}
		
		if (equip.getEquipNum() != 0) {
			equipService.updateEquip(equip);
		}else{//2.保存设备信息
			equipService.addEquip(equip);
		}
		map.put("message", "保存设备成功！");
		
		map.put("equipId", equip.getEquipId());
		return map;
	}
	
	
	
	//导出所有的设备信息
	@RequestMapping("exportAllEquip.html")
	public void  exportAllEquip(HttpServletResponse response)
	{
		
		List<Equip> equipList = equipService.getAllEquips();
		final String title = "设备信息导出";  
	    final String[] rowsName = new String[]{"序号","设备名称","设备标识","设备类型","归属大单位","状态"};  
	    List<Object[]>  dataList = new ArrayList<Object[]>();
	    Object[] objs = null;  
	    //得到设备信息
	    for (int i = 0; i < equipList.size(); i++) {  
		    Equip equip = equipList.get(i);  
		    objs = new Object[rowsName.length];  
		    objs[0] = equip.getEquipNum();  
		    objs[1] = equip.getEquipName();  
		    objs[2] = equip.getEquipId();  
		    objs[3] = equip.getEquipKind();  
		    objs[4] = equip.getAreaUnit();  
		    if(equip.getProbeState()==0){  
		    	 objs[5] = "离线"; 
		    }else{
		    	 objs[5] = "在线";
		    }
		    dataList.add(objs);  
		   } 
   
		ExportExcelUtils excelUtils = new ExportExcelUtils(title, rowsName, dataList);
		//导出
		 try  
         {  
             String fileName = "Excel-" + String.valueOf(System.currentTimeMillis()).substring(4, 13) + ".xls";  
             String headStr = "attachment; filename=\"" + fileName + "\"";   
             response.setContentType("APPLICATION/OCTET-STREAM");  
             response.setHeader("Content-Disposition", headStr);  
             ServletOutputStream out = response.getOutputStream(); 
             excelUtils.export().write(out);  
         }  
         catch (IOException e)  
         {   
             e.printStackTrace();  
         } 
	}
	
	//异步添加
	@RequestMapping(value = "/addAjaxEquip.html", method = RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> addAjaxEquip(HttpEntity<Equip> model)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		equipService.addEquip(model.getBody());
		map.put("success", "true");
		map.put("data", "添加成功");
		return map;
	}
	
	//异步添加
	@RequestMapping(value = "/updateAjaxEquip.html", method = RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateAjaxEquip(HttpEntity<Equip> model)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		equipService.updateEquip(model.getBody());
		map.put("success", "true");
		map.put("data", "更新成功");
		return map;
	}
	
	//异步获取所有的设备
	@RequestMapping("ajaxGetAllEquips.html")
	@ResponseBody 
	public Map<String, Object> ajaxGetAllEquips()
	{
		Map<String, Object> map = new HashMap<String, Object>();
		List<Equip> equipList = equipService.getAllEquips();
		
		if (equipList.size() == 0) {
			map.put("data", "null");
		}else {
			map.put("data", equipList);
			map.put("total", equipList.size());
			map.put("querytotal", equipList.size());
		}
		
		return map;
	}
	
	/**
	 * 返回指定设备类型的设备
	 * @param equipKind
	 * @return
	 */
	@RequestMapping("getEquipsByEquipKind.html")
	@ResponseBody
	public Map<String, Object> getEquipsByEquipKind(String equipKind)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		List<Equip> equipList = equipService.getEquipsByEquipkind(equipKind);
		
		if (equipList.size() == 0) {
			map.put("data", "null");
		}else {
			map.put("data", equipList);
			map.put("total", equipList.size());
			map.put("querytotal", equipList.size());
		}
		
		return map;
	}
	
	/* by 
	 * 根据设备信息表的设备编号获取设备
	 * equipNum:设备编号
	 * */
	@RequestMapping("getEquipAndTaskByAjax.html")
	@ResponseBody
	public Map<String, Object> getEquipAndTaskByAjax(String equipNum){
		Map<String, Object> map = new HashMap<String, Object>();
		Equip equip = equipService.getEquipAndTaskByAjax(equipNum);
		map.put("equip", equip);
		return map;
	}
	
	/* by 
	 * 根据设备信息表中的设备标识获取设备
	 * equipId:设备标识
	 * */
	@RequestMapping("getEquipByEquipId1.html")
	@ResponseBody
	public Map<String, Object> getEquipByEquipId1(String equipId)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		Equip equip = equipService.getEquipByEquipId(equipId);

		map.put("equip", equip);
		return map;
	}
	
	/* by 
	 * 根据设备信息表中的设备标识获取设备
	 * equipId:设备标识
	 * */
	@RequestMapping("getEquipByEquipId.html")
	@ResponseBody
	public Equip getEquipByEquipId(String equipId)
	{
		return equipService.getEquipByEquipId(equipId);
	}
	
	//根据设备的类型和设备的Id,跳转到相应的界面显示
	@RequestMapping("getEquipByNum.html")
	@ResponseBody  
	public Map<String, Object> getequipbynum(String equipNum)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		Equip equip = equipService.getEquipByEquipNum(equipNum);

		
		if(equip != null)
		{
			map.put("code", 1);
			map.put("equip_name", equip.getEquipName());	
			map.put("equip_id", equip.getEquipId());
		}
		else
		{
			map.put("code", 0);
		}
		return map;
	}
	
	//根据设备的类型和设备的Id,跳转到相应的界面显示
	@RequestMapping("getEquipById.html")
	@ResponseBody  
	public Map<String, Object> getEquipById(String equipId)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		Equip equip = equipService.getEquipByEquipId(equipId);
		
		if(equip != null)
		{
			map.put("code", 1);
			map.put("equip", equip);
			String equipType = equip.getEquipKind() ;
			List<Task> tasklist = null;
			if(equipType.substring(equipType.length() - 2) == "探针");
				tasklist = taskService.getTaskByTaskSubject(equipId);
			if(tasklist != null && tasklist.size() != 0)
			{
				map.put("code", 2);
				map.put("tasklist", tasklist);
			}
			
			
		}
		else
		{
			map.put("code", 0);
		}
		return map;
	}
		
	
	//根据探针主体和探针目标获取设备名称
	@RequestMapping("getEquipByAjax.html")
	@ResponseBody
	public List<Equip> getEquipByAjax(String subjectEquipId, String targetEquipIdList){
		List<Equip> equipList = new ArrayList<Equip>();
		Equip subjectEquip = equipService.getEquipByEquipId(subjectEquipId);
		equipList.add(subjectEquip);
		String[] targetEquipIds = targetEquipIdList.split(";");
		for(String targetEquipId:targetEquipIds){
			if (!targetEquipId.equals("")) {
				Equip targetEquip = equipService.getEquipByEquipId(targetEquipId);
				equipList.add(targetEquip);
			}
		}
		
		return equipList;
	}
	
	/**
	 * 返回符合zTree结构的路由器及接口数据
	 * @param equip_kind
	 * @return
	 */
	@RequestMapping("getRouterAndInterface.html")
	@ResponseBody
	public List<TreeNodeForZTree> getRouterAndInterface(String equip_kind)
	{
		List<Equip> equipList = equipService.getDevicesByEquipKind(equip_kind);//返回设备类型为路由器的设备
		List<TreeNodeForZTree> treeNodeList = new ArrayList<TreeNodeForZTree>();
		
		for(int i=0;i<equipList.size();i++)
		{
			Equip equip = equipList.get(i);
			
			TreeNodeForZTree parentTreeNode = new TreeNodeForZTree();
			parentTreeNode.id = equipList.get(i).getEquipId();
			parentTreeNode.name = equip.getEquipName();
			parentTreeNode.icon="images/equipImages/路由器.png";
			
			List<TreeNodeForZTree> childrenTreeNodeList = new ArrayList<TreeNodeForZTree>();
			String equipId = equip.getEquipId();
			List<EquipInte> equipInteList = equipInteService.getEquipIntesByEquipId(equipId);
			if(equipInteList.size() == 0)
				parentTreeNode.isParent = false;
			for(int j=0;j<equipInteList.size();j++)
			{
				TreeNodeForZTree childrenTreeNode = new TreeNodeForZTree();
				childrenTreeNode.id=String.valueOf(equipInteList.get(j).getEquipInteUnionKey().getInteId());
				childrenTreeNode.name = equipInteList.get(j).getInteDesc();
				
				childrenTreeNodeList.add(childrenTreeNode);//接口信息存储到List集合
			}
			
			parentTreeNode.children = childrenTreeNodeList;
			treeNodeList.add(parentTreeNode);//路由器设备信息存储到集合
		}
		
		return treeNodeList;
	}
	
	/*初始化路由器及接口数据，用于生成树形结构 (用于使用easyui的tree结构)
	@RequestMapping("getRouterAndInterface.html")
	@ResponseBody
	public List<TreeNode> getRouterAndInterface(String equip_kind)
	{
		List<Equip> equipList = equipService.getDevicesByEquipKind(equip_kind);//根据设备类型获取设备
		List<TreeNode> treeNodeList = new ArrayList<TreeNode>();
		
		for(int i=0;i<equipList.size();i++)
		{
			//根据设备编号查设备接口
			String equipId = equipList.get(i).getEquipId();
			List<EquipInte> equipInteList = equipInteService.getEquipIntesByEquipId(equipId);
			List<TreeNode> childrenTreeNodeList = new ArrayList<TreeNode>();
			for(EquipInte equipInte:equipInteList)
			{
				TreeNode childrenTreeNode = new TreeNode();
				//childrenTreeNode.id=String.valueOf(equipInte.getInteId()); by zxgm 改成联合主键
				childrenTreeNode.id=String.valueOf(equipInte.getEquipInteUnionKey().getInteId());
				childrenTreeNode.text = equipInte.getInteDesc();
				childrenTreeNodeList.add(childrenTreeNode);
			}
			
			TreeNode treeNode = new TreeNode();
			treeNode.id = equipList.get(i).getEquipId();
			treeNode.text=equipList.get(i).getEquipName();
			treeNode.children=childrenTreeNodeList;
			
			treeNodeList.add(treeNode);
		}
		return treeNodeList;
	}*/
	
	/*列表式路由器及接口回显*/
	@RequestMapping("getRoundShowRouterAndInterface.html")
	@ResponseBody
	public List<TreeNode> getRoundShowRouterAndInterface(String equip_kind, String taskNum)
	{
		List<Equip> equipList = equipService.getDevicesByEquipKind(equip_kind);//根据设备类型获取设备
	
		RoundShowRouterAndInterface roundShowRouterAndInterface = roundShowRouterAndInterfaceService.getRoundShowRouterAndInterfaceByTaskNum(taskNum);
		String interfaceIdList = roundShowRouterAndInterface.getInterfaceIdList();
		String[] interfaceIdArray = interfaceIdList.split(";");
		
		
		List<TreeNode> treeNodeList = new ArrayList<TreeNode>();
		
		for(int i = 0; i < equipList.size(); i ++)
		{
			//根据设备编号查设备接口
			String equipId = equipList.get(i).getEquipId();
			List<EquipInte> equipInteList = equipInteService.getEquipIntesByEquipId(equipId);
			List<TreeNode> childrenTreeNodeList = new ArrayList<TreeNode>();
			for(EquipInte equipInte : equipInteList)
			{
				TreeNode childrenTreeNode = new TreeNode();
				/*childrenTreeNode.id=String.valueOf(equipInte.getInteId()); by zxgm 改成联合主键*/
				childrenTreeNode.id = String.valueOf(equipInte.getEquipInteUnionKey().getInteId());
				childrenTreeNode.text = equipInte.getInteDesc();
				for(String interfaceId : interfaceIdArray)
				{
					if (childrenTreeNode.id.equals(interfaceId)) 
					{
						childrenTreeNode.checked = true;
					}
				}
				childrenTreeNodeList.add(childrenTreeNode);
			}
			
			TreeNode treeNode = new TreeNode();
			treeNode.id = equipList.get(i).getEquipId();
			treeNode.text = equipList.get(i).getEquipName();
			treeNode.children = childrenTreeNodeList;
			
			treeNodeList.add(treeNode);
		}
		
		return treeNodeList;
	}
	
	/*根据设备Id获取设备及接口信息*/
	@RequestMapping("getEquipsByEquipId.html")
	@ResponseBody
	public List<Equip> getEquipsByEquipId(String deviceNodeIds, String interfaceNodeIds)
	{
		List<Equip> equipList = new ArrayList<Equip>();
		String[] deviceNodeIdArray = deviceNodeIds.split(";");
		if(interfaceNodeIds.isEmpty())
			return equipList;
		String[] interfaceNodeIdArray = interfaceNodeIds.split(";");
		
		for(String deviceNodeId:deviceNodeIdArray)
		{
			equipList.add(equipService.getEquipByEquipId(deviceNodeId));
		}
		
		for(String interfaceNodeId:interfaceNodeIdArray)
		{
			EquipInte equipInte = equipInteService.getEquipInteByInteId(interfaceNodeId);
			/*String equipId = equipInte.getEquipId(); by zxgm 改成联合主键*/
			String equipId = equipInte.getEquipInteUnionKey().getEquipId();
			Equip equip = equipService.getEquipByEquipId(equipId);
			if(!equipList.contains(equip))
			{
				equipList.add(equip);
			}
		}
		
		for(Equip equip:equipList)
		{
			List<EquipInte> equipList2 = new ArrayList<EquipInte>();
			for(String interfaceNodeId:interfaceNodeIdArray)
			{
				EquipInte equipInte = equipInteService.getEquipInteByInteId(interfaceNodeId);
				/*String equipId = equipInte.getEquipId(); by zxgm 改成联合主键*/
				String equipId = equipInte.getEquipInteUnionKey().getEquipId();
				Equip equip2 = equipService.getEquipByEquipId(equipId);
				if (equip2.getEquipId().equals(equip.getEquipId()))
				{
					equipList2.add(equipInte);
				}
			}
			equip.setEquipInteList(equipList2);
		}
		
		return equipList;
	}
	
	/*根据设备标识列表获取设备*/
	@RequestMapping("getEquipsByEquipIdList.html")
	@ResponseBody
	public List<Equip> getEquipsByEquipIdList(String equipIdList)
	{
		String[] equipIdArray = equipIdList.split(";");
		List<Equip> list = new ArrayList<Equip>();
		for(String equipId : equipIdArray)
		{
			if (!equipId.isEmpty()&& equipId != "")
			{
				list.add(equipService.getEquipByEquipId(equipId));
			}
		}
		return list;
	}
	 
	
}

