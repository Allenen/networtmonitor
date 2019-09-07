package cn.zr.networkmonitor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zr.networkmonitor.dao.RoundShowRouterAndInterfaceUtilDao;
import cn.zr.networkmonitor.domain.RoundShowRouterAndInterface;

/*用于路由器及接口的数据回显的service层*/
@Service
@Transactional
public class RoundShowRouterAndInterfaceService {

	@Autowired
	private RoundShowRouterAndInterfaceUtilDao roundShowRouterAndInterfaceUtilDao;
	
	/*根据任务编号得到所有被选中的接口id的字符串*/
	public RoundShowRouterAndInterface getRoundShowRouterAndInterfaceByTaskNum(String taskNum)
	{
		return roundShowRouterAndInterfaceUtilDao.get(taskNum);
	}

	/*添加*/
	public void addRoundShowRouterAndInterface(
			RoundShowRouterAndInterface roundShowRouterAndInterface) {
		roundShowRouterAndInterfaceUtilDao.save(roundShowRouterAndInterface);
		
	}
}
