package cn.zr.networkmonitor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zr.networkmonitor.dao.PolicyDao;
import cn.zr.networkmonitor.domain.Policy;
import cn.zr.networkmonitor.domain.Task;

@Service
@Transactional
public class PolicyService {
	@Autowired
	private PolicyDao policyDao;
	
	public List<Policy> getAllPolicys(){
	    List<Policy> Policys = policyDao.loadAll();
		if(Policys.size()>0)
			return Policys;
		return null;
	}
	public void savePolicy(Policy policy){
		policyDao.save(policy);
	}
	public void updatePolicy(Policy oldPolicy){
		policyDao.update(oldPolicy);
	}
	public void deletePolicy(Policy policy){
		policyDao.remove(policy);
	}
	
	//根据任务类型查询策略
	public List<Policy> getPolicyByTasktype(int task_type){
		return policyDao.find("from Policy where policy_type = ?",task_type);
	}
	
	//根据策略号得到所有的策略
	public Policy getPolicyByPolicyNum(int policy_num){
		return policyDao.get(policy_num);
	}
	
	//根据策略名称得到策略
	public Policy getPolicyByPolicyName(String choosePolicyName) {
		List<Policy> policyList = policyDao.find("from Policy where policy_name = ?", choosePolicyName);
		return policyList.get(0);
	}

}
