package cn.zr.networkmonitor.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/*用于路由器及接口的数据回显的实体*/
@Entity
@Table(name="nspms_RoundShowRouterAndInterface")
public class RoundShowRouterAndInterface {

	@Id
	@Column(name="taskNum")
	private String taskNum;
	@Column(name="interfaceIdList")
	private String interfaceIdList;
	public String getTaskNum() {
		return taskNum;
	}
	public void setTaskNum(String taskNum) {
		this.taskNum = taskNum;
	}
	public String getInterfaceIdList() {
		return interfaceIdList;
	}
	public void setInterfaceIdList(String interfaceIdList) {
		this.interfaceIdList = interfaceIdList;
	}
	
	
}
