package cn.zr.networkmonitor.domain;

import java.util.List;

//用于Easyui tree的实体
public class TreeNode 
{

	public String id;//用于标识 树层次关系
	public String num;//用于唯一标示
	public String text;//用于显示树节点的名称
	public boolean checked;//节点是否被选中
	
	public String state;//用于表示是否关闭节点
	//public String managerIP;//用于记录设备的管理IP
	 
	public int taskNum;//用于记录任务编号
	public String testTargetIP;//用于记录测量目标的IP
	public String testSubjectIP;//用于记录测量主体的探针IP
	
	public List<TreeNode> children;//用于记录子节点（符合zTree）
	
}
