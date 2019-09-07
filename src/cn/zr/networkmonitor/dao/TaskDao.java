package cn.zr.networkmonitor.dao;

import org.springframework.stereotype.Repository;

import cn.zr.networkmonitor.domain.Task;

@Repository
public class TaskDao extends BaseDao<Task>{
	
//	public void deleteTaskById(String taskId)
//	{
//		Task task = this.get(taskId);
//		if(task != null)
//		{
//			this.remove(task);
//		}
//	}
}
