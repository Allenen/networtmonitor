package cn.zr.networkmonitor.domain;

import java.util.List;

/**
 * 符合zTree数据格式的实体
 * @author zhenrong
 *
 */
public class TreeNodeForZTree
{
	public String id;//节点编号
	//public String 
	public String name;//符合zTree格式的节点名称
	public String open;//是否展开
	//public String iconOpen;//节点打开时图标
	//public String iconClose;//节点关闭时图标
	public String icon;//节点图标
	public boolean isParent;//节点是否为父节点
	
	
	public List<TreeNodeForZTree> children;//用于记录子节点（符合zTree）
	
	/* 符合zTree结构的数据格式
	 * [
		{id:1,name:"南京节点1",open:true,
			children:[
				{id:11,name:"接口1"},
				{id:12,name:"接口2"},
				{id:13,name:"接口3"},
				{id:14,name:"接口4"},
				{id:15,name:"接口5"}
			]
		},
		{id:2,name:"南京节点2",open:true,
			children:[
				{id:21,name:"接口1"},
				{id:22,name:"接口2"}
			]
		}
	]*/
}
