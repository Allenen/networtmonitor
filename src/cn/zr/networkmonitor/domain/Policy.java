package cn.zr.networkmonitor.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="nspms_policy")
public class Policy {
	@Id
	@Column(name="POLICY_NUM")
	private int policy_num;
	@Column(name="POLICY_TYPE")
	private int policy_type;
	@Column(name="POLICY_NAME")
	private String policy_name;
	@Column(name="POLICY_PARA")
	private String policy_para;
	
	public int getPolicy_num() {
		return policy_num;
	}
	public void setPolicy_num(int policy_num) {
		this.policy_num = policy_num;
	}
	public int getPolicy_type() {
		return policy_type;
	}
	public void setPolicy_type(int policy_type) {
		this.policy_type = policy_type;
	}
	public String getPolicy_name() {
		return policy_name;
	}
	public void setPolicy_name(String policy_name) {
		this.policy_name = policy_name;
	}
	public String getPolicy_para() {
		return policy_para;
	}
	public void setPolicy_para(String policy_para) {
		this.policy_para = policy_para;
	}
	
	
	

}
