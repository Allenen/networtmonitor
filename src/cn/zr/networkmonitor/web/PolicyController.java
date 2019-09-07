package cn.zr.networkmonitor.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.zr.networkmonitor.domain.Combox;
import cn.zr.networkmonitor.domain.Policy;
import cn.zr.networkmonitor.service.PolicyService;

/**
 * 任务策略控制器 by zxgm 2016-10-31
 * */
@Controller
public class PolicyController {

	@Autowired
	private PolicyService policyService;
	
	/**
	 * 获取制定任务类型的策略
	 * @param tasktype
	 * @return
	 */
	@RequestMapping("getAjaxPolicyBytaskType.html")
	@ResponseBody  
	public List<Combox> getAjaxPolicyBytaskType(@RequestParam("tasktype") int tasktype){
		List<Policy> policys = policyService.getPolicyByTasktype(tasktype);
		List<Combox> comboxs  = new ArrayList<Combox>();
		Combox combox = null;
		for(int i=0;i<policys.size();i++){
			combox = new Combox();
			combox.setId(policys.get(i).getPolicy_num());		//策略编号
			combox.setText(policys.get(i).getPolicy_name());	//策略名称
			if(i==0){
				combox.setSelected(true);
			}
			comboxs.add(combox);
		}
		return comboxs;
	}
	
	/**
	 * 返回指定业务类型的下拉框策略数据
	 * @param serviceType
	 * @return
	 */
	@RequestMapping("getCommonServicePolicyByServiceType.html")
	@ResponseBody
	public List<Combox> getCommonServicePolicyByServiceType(String serviceType)
	{
		int taskType = 8;
		List<Policy> policys = policyService.getPolicyByTasktype(taskType);//得到任务类型为通用业务的所有策略
		List<Policy> satisfiedPolicys = new ArrayList<Policy>();
		//得到符合业务类型的策略
		for(Policy policy:policys)
		{
			String policyPara = policy.getPolicy_para();
			if(policyPara.indexOf(serviceType) > 0)
			{
				satisfiedPolicys.add(policy);
			}else if(serviceType.equals("email") && (policyPara.indexOf("smtp")>0 || policyPara.indexOf("pop3")>0))
			{
				satisfiedPolicys.add(policy);
			}
		}
		
		List<Combox> comboxs  = new ArrayList<Combox>();
		Combox combox = null;
		for(int i=0;i<satisfiedPolicys.size();i++){
			combox = new Combox();
			combox.setId(satisfiedPolicys.get(i).getPolicy_num());		//策略编号
			combox.setText(satisfiedPolicys.get(i).getPolicy_name());	//策略名称
			combox.setService_para(satisfiedPolicys.get(i).getPolicy_para());
			if(i==0){
				combox.setSelected(true);
			}
			comboxs.add(combox);
		}
		return comboxs;
	}
	
	/**
	 * 保存任务策略
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/addAjaxPolicy.html", method = RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> addAjaxPolicy(HttpEntity<Policy> model)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		policyService.savePolicy(model.getBody());
		map.put("success", "true");
		return map;
	}
	
	/**
	 * 返回指定策略名的策略
	 * @param choosePolicyName
	 * @return
	 */
	@RequestMapping("getPolicyParaByPolicyName.html")
	@ResponseBody
	public Map<String, Object> getPolicyParaByPolicyName(String choosePolicyName)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		Policy satisfyPolicy = policyService.getPolicyByPolicyName(choosePolicyName);
		map.put("policy", satisfyPolicy);
		return map;
	}

}
