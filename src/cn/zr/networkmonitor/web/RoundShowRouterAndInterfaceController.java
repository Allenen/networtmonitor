package cn.zr.networkmonitor.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.zr.networkmonitor.domain.RoundShowRouterAndInterface;
import cn.zr.networkmonitor.service.RoundShowRouterAndInterfaceService;

/**
 * 列表式路由及接口的控制器 by zxgm  2016-10-31
 * */
@Controller
public class RoundShowRouterAndInterfaceController {

	@Autowired
	private RoundShowRouterAndInterfaceService roundShowRouterAndInterfaceService;
	
	@RequestMapping("addRoundShowRouterAndInterface.html")
	@ResponseBody
	public Map<String, Object> addRoundShowRouterAndInterface(RoundShowRouterAndInterface roundShowRouterAndInterface)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		roundShowRouterAndInterfaceService.addRoundShowRouterAndInterface(roundShowRouterAndInterface);
		
		map.put("message", "添加成功");
		return map;
	}
}
