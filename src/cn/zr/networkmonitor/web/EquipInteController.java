package cn.zr.networkmonitor.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.zr.networkmonitor.domain.EquipInte;
import cn.zr.networkmonitor.service.EquipInteService;

/**
 * 设备接口控制器 by zxgm 2016-10-31
 * */
@Controller
public class EquipInteController {
	
	@Autowired
	private EquipInteService equipInteService;
	
	/**
	 * 返回指定设备标识的设备接口集合
	 * by zxgm 2017-01-06
	 * @param equipId
	 * @return
	 */
	@RequestMapping("getEquipInteByEquipId.html")
	@ResponseBody
	public List<EquipInte> getEquipInteByEquipId(String equipId)
	{
		return equipInteService.getEquipIntesByEquipId(equipId);
	}
	
	
	
	/**
	 * 
	 * 删除指定设备标识和接口编号的设备接口信息
	 * @param inteId 接口编号
	 * @param equipId 设备标识
	 */
	@RequestMapping("deleteEquipInteByInteIdAndEquipId.html")
	@ResponseBody
	public Map<String, Object> deleteEquipInteByInteIdAndEquipId(String inteId,String equipId)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		equipInteService.deleteEquipInteByInteIdAndEquipId(inteId,equipId);
		return map;
	}
	
	//保存、编辑设备信息,返回保存失败与否的信息
	@RequestMapping("saveInterface.html")
	@ResponseBody 
	public Map<String, Object> saveInterface(EquipInte equipInte)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		String equipId = equipInte.getEquipInteUnionKey().getEquipId();
		int inteId = equipInte.getEquipInteUnionKey().getInteId();
		EquipInte inte = equipInteService.getEquipInteByEquipIdAndInteId(equipId, inteId);
		if(inte != null)
		{
			map.put("message", "接口编号已存在！");
			return map;
		}
		
		equipInteService.addEquipInte(equipInte);
		
		
		map.put("message", "保存接口信息成功！");
		map.put("inte", equipInte);
		
		return map;
	}
	
	/**
	 * 更新设备接口信息
	 * @param equipInteJson
	 * @return
	 */
	@RequestMapping("updateEquipInte.html")
	@ResponseBody
	public Map<String, Object> updateEquipInte(String equipInteJson)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		JSONObject jsonObject = JSONObject.fromObject(equipInteJson);
		EquipInte equipInte = (EquipInte) JSONObject.toBean(jsonObject, EquipInte.class);
		
		String inteIdString = String.valueOf(equipInte.getEquipInteUnionKey().getInteId());//接口编号
		String equipId = equipInte.getEquipInteUnionKey().getEquipId();//设备标识
		
		//1.删除原有数据
		equipInteService.deleteEquipInteByInteIdAndEquipId(inteIdString, equipId);
		//2.增加数据
		equipInteService.addEquipInte(equipInte);
		
		return map;
	}

	//添加设备接口信息
	@RequestMapping("addEquipInte.html")
	public ModelAndView addEquipInte(EquipInte equipInte)
	{
		ModelAndView modelAndView = new ModelAndView();
		equipInteService.addEquipInte(equipInte);
		
		return modelAndView;
	}
	
	/**
	 * 得到所有的设备接口信息
	 * @return
	 */
	@RequestMapping("getAllEquipIntes.html")
	public ModelAndView getAllEquipIntes()
	{
		ModelAndView modelAndView = new ModelAndView();
		List<EquipInte> equipInteList = equipInteService.getAllEquipIntes();
		modelAndView.addObject("equipInteList", equipInteList);
		modelAndView.setViewName("/WEB-INF/jsp/client3/listEquipIntes.jsp");
		
		return modelAndView;
	}
	
	//批量删除设备接口信息
	@RequestMapping("deleteEquipIntes.html")
	public ModelAndView deleteEquipIntes(String equipIntes)
	{
		ModelAndView modelAndView = new ModelAndView();
		String[] equipInteList = equipIntes.split(";");//分割设备接口的Id
		if (equipInteList.length == 0) {//设备接口的ID为空
			return modelAndView;
		}else{
			for(String equipInte:equipInteList)
			{
				if(!equipInte.equals(""))
					equipInteService.deleteEquipIntes(equipInte);
			}
		}
		
		List<EquipInte> equipInteList2 = equipInteService.getAllEquipIntes();
		modelAndView.addObject("equipInteList", equipInteList2);
		modelAndView.setViewName("/WEB-INF/jsp/client3/listEquipIntes.jsp");
		return modelAndView;
	}
}
