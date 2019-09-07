package cn.zr.networkmonitor.service;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zr.networkmonitor.dao.DefaultTaskDao;
import cn.zr.networkmonitor.dao.TaskDao;
import cn.zr.networkmonitor.domain.DefaultTask;
import cn.zr.networkmonitor.domain.Equip;
import cn.zr.networkmonitor.domain.Page;
import cn.zr.networkmonitor.domain.Task;
import cn.zr.networkmonitor.util.ArraysOperationUtil;
import cn.zr.networkmonitor.util.ClassCastUtil;

@Service
@Transactional
public class TaskService {
	
	@Autowired
	private TaskDao taskDao;
	@Autowired
	private DefaultTaskDao defaultTaskDao;

	//得到所有的任务列表
	public List<Task> getAllTasks(){
	    List<Task> tasks = taskDao.loadAll();
		if(tasks.size()>0)
			return tasks;
		return null;
	}
	public void saveTask(Task task){
		taskDao.save(task);
	}
	public void updateTask(Task oldTask){
		taskDao.update(oldTask);
	}
	public void deleteTask(Task task){
		taskDao.remove(task);
	}
	//删除任务
	public void deleteTasks(String taskNum)
	{
		taskDao.remove(getTaskById(taskNum));
	}
	
	//根据任务名模糊查询任务列表
	public List<Task> getTaskByTaskName(String taskname){
		List<Task> tasks = taskDao.find("from Task where task_name like ?","%"+taskname+"%");
		if(tasks.size()>0)
			return tasks;
		return null;
		
	}
	//根据任务名准确查询
	public Task getTaskByAccTaskName(String taskname){
		List<Task> tasks = taskDao.find("from Task where task_name = ?",taskname);
		if(tasks.size()>0)
			return tasks.get(0);
		return null;
		
	}
	
	//根据筛选条件获取任务列表
	public List<Task> getTaskByTaskType(boolean active,String taskTypeList){
		StringBuilder sBuilder = new StringBuilder();
		sBuilder.append("from Task where ");
		if(active){
			sBuilder.append("task_stat > 0 AND");
		}
		if(!taskTypeList.contains(";")){
			sBuilder.append("task_type = ?");
			List<Task> tasks = taskDao.find(sBuilder.toString(),Integer.parseInt(taskTypeList));
			if(tasks.size()>0)
				return tasks;
			return null;
		}
		String[] tasktypesList =taskTypeList.split(";");//路由器、DNS服务器
		sBuilder.append(" task_type = ").append(Integer.parseInt(tasktypesList[0]));
		for(int i = 1;i<tasktypesList.length;i++){
			sBuilder.append(" or task_type = ").append(Integer.parseInt(tasktypesList[i]));
		}
		List<Task> tasks = taskDao.find(sBuilder.toString());
		if(tasks.size()>0)
			return tasks;
		return null;

	}
	//根据ID获取设备
	public Task getTaskById(String taskNum)
	{
		int task_num = Integer.parseInt(taskNum);
		List<Task> tasks = taskDao.find("from Task where task_num = ?",task_num);
		if(tasks.size()>0)
			return tasks.get(0);
		return null;
	}
	//根据多id激活任务
	public void activeTaskByIds(String taskNumlist)
	{
		if(!taskNumlist.contains(";")){
			Task task = getTaskById(taskNumlist);
			task.setTask_stat(1);
			taskDao.update(task);
			return;
		}
		String[] task_numList =  taskNumlist.split(";");
		for(int i=0;i<task_numList.length;i++){
			Task task = getTaskById(task_numList[i]);
			task.setTask_stat(1);
			taskDao.update(task);
		}
		
	}
	//根据多id删除任务
	public void deleteTaskByIds(String taskNumlist)
	{
		if(!taskNumlist.contains(";")){
			Task task = getTaskById(taskNumlist);
			taskDao.remove(task);
			return;
		}
		String[] task_numList =  taskNumlist.split(";");
		for(int i=0;i<task_numList.length;i++){
			Task task = getTaskById(task_numList[i]);
			taskDao.remove(task);
		}
		
	}
	//激活任务
	public void activeTask(String taskname,Date start_time,Date end_time){
		Task task = getTaskByAccTaskName(taskname);
		task.setStart_time(start_time);
		task.setEnd_time(end_time);
		task.setTask_stat(1);
		taskDao.update(task);
		
	}
	//根据任务主体设备名获取任务列表
	public List<Task> getTaskByTaskSubject(String taskSubject){
		List<Task> tasks = taskDao.find("from Task where task_subject = ?",taskSubject);
		if(tasks.size()>0)
			return tasks;
		return null;
		
	}
	//根据任务类型得到任务列表
	public List<Task> getTaskByTaskType(String tasktype){
		int task_type = Integer.parseInt(tasktype);
		List<Task> tasks = taskDao.find("from Task where task_type = ?",task_type);
		if(tasks.size()>0)
			return tasks;
		return null;
	}
	public List<Task> getTasksByDate(String beginDate, String endDate) {
		//taskDao.find("from Task where )
		return null;
	}
	
	//得到所有的活动任务
	public List<Task> getActiveTasks() {
		return taskDao.find("from Task where task_stat > 0");
	}
	
	//通过任务类型得到默认的任务，从默认任务表中
	public DefaultTask getDefaultTaskByTaskType(String taskType) {
		return defaultTaskDao.get(Integer.parseInt(taskType));
	}
	
	//根据探针ID得到相关任务
	public List<Task> getTaskInfoByEquipId(String equipId) {
		List<Task> taskList = taskDao.find("from Task where task_subject = ?", equipId);
		return taskList;
	}
	
	/**
	 * 返回任务的分页数据
	 * @param currentPageNum
	 * @param pageSize
	 * @return
	 */
	public Page getAllTasksByPage(int currentPageNum, int pageSize)
	{
		return taskDao.pagedQuery("from Task", currentPageNum, pageSize);
	}
	
	/**
	 * 返回指定条件的任务数据
	 * @param taskKindTest
	 * @param taskConditionTest
	 * @return
	 */
	public List<Equip> getTasksByCondition(String taskKindTest,
			String taskConditionTest) {
		
		boolean taskConditionFlag = false, taskKindConditionFlag = false;
		String hql="from Task";
		//1.没有任务类型筛选条件
		if(taskKindTest.isEmpty())
		{
			hql+=" where task_name like '%"+taskConditionTest+"%'";
			return taskDao.find(hql);
		}else//2.任务类型筛选条件
		{
			String[] taskKindTestList = taskKindTest.split(";");//路由器、DNS服务器
			
			Integer[] taskKindTestIntList = ClassCastUtil.stringArrayToIntArray(taskKindTestList);
			
			if(!taskConditionTest.equals(""))//任务名称模糊查询
			{
				hql+=" where task_name like '%"+taskConditionTest+"%'";
				taskConditionFlag = true;
			}
			
			if (!taskKindTest.equals("")&&taskKindTestIntList.length != 0) {//选中设备类型
				if(taskKindTestIntList.length == 1){
					if (!taskConditionFlag) {
						hql+=" where task_type = ?";
					}else{
						hql+=" and task_type = ?";
					}
				}else{
					if (!taskConditionFlag) {
						hql+=" where task_type = ?";
					}else{
						hql+=" and (task_type=?";
					}
					for(int i = 1;i<taskKindTestIntList.length;i++)
						hql+=" or task_type=?";
					hql+=")";
				}
				taskKindConditionFlag = true;
			}
			
			if (taskConditionFlag) {
				if (taskKindConditionFlag) {
					return taskDao.find(hql,taskKindTestIntList);
				}else{
					return taskDao.find(hql);
				}
			}else{
				if (taskKindConditionFlag) {
					return taskDao.find(hql,taskKindTestIntList);
				}else{
					return taskDao.find(hql);
				}
				
			}
		}
		
	}
	
	/**
	 * 返回指定任务状态列表的任务数据
	 * @param taskStatString 任务状态列表0;3;4
	 */
	public Page getTasksByConditionPage_taskStatString(String taskStatString,int pageNum,int pageSize)
	{
		String hql="from Task";
		
		if(!taskStatString.isEmpty() && !taskStatString.equals(""))
		{
			String[] taskStatStringArray = taskStatString.split(";");
			Integer[] taskStatIntArray = ClassCastUtil.stringArrayToIntArray(taskStatStringArray);
			hql+=" where (";
			for(int i=0;i<taskStatIntArray.length-1;i++)
				hql += " task_stat = ? or" ;
			hql+=" task_stat = ? )";
			return taskDao.pagedQuery(hql, pageNum, pageSize, taskStatIntArray);
		}else
		{
			return taskDao.pagedQuery(hql, pageNum, pageSize);
		}
		
	}
	
	/**
	 * 返回指定任务类型列表和任务状态列表数据
	 * @param taskTypeString 任务类型列表
	 * @param taskStatString 任务状态列表
	 * @return
	 */
	public Page getTasksByConditionPage_taskTypeStringAndTaskStatString(
			String taskTypeString, String taskStatString,int pageNum,int pageSize)
	{
		String hql="from Task";
		
		Integer[] taskTypeIntArray = ClassCastUtil.stringArrayToIntArray(taskTypeString.split(";"));
		hql+=" where (";
		for(int i=0;i<taskTypeIntArray.length-1;i++)
			hql+=" task_type = ? or";
		hql+=" task_type = ? )";
		
		if(!taskStatString.isEmpty() && !taskStatString.equals(""))
		{
			Integer[] taskStatIntArray = ClassCastUtil.stringArrayToIntArray(taskStatString.split(";"));
			hql+=" and (";
			for(int i=0;i<taskStatIntArray.length-1;i++)
				hql+=" task_stat = ? or";
			hql+= " task_stat = ? )";
			
			return taskDao.pagedQuery(hql, pageNum, pageSize, (Integer[]) ArraysOperationUtil.combi(taskTypeIntArray, taskStatIntArray));
		}else
		{
			return taskDao.pagedQuery(hql, pageNum, pageSize, taskTypeIntArray);
		}
	}
	
	/**
	 * 返回指定任务名称和任务状态列表数据
	 * @param taskName 任务名称
	 * @param taskStatString 任务状态列表
	 * @return
	 */
	public Page getTasksByConditionPage_taskNameAndTaskStatString(
			String taskName, String taskStatString,int pageNum, int pageSize)
	{
		String hql = "from Task";
		hql+=" where task_name like '%"+taskName+"%'";
		if(!taskStatString.isEmpty() && !taskStatString.equals(""))
		{
			hql+=" and (";
			Integer[] taskStatIntArray = ClassCastUtil.stringArrayToIntArray(taskStatString.split(";"));
			for(int i=0;i<taskStatIntArray.length-1;i++)
				hql+=" task_stat = ? or";
			hql+=" task_stat = ? )";
			return taskDao.pagedQuery(hql, pageNum, pageSize, taskStatIntArray);
		}else
		{
			return taskDao.pagedQuery(hql, pageNum, pageSize);
		}
	}
	
	/**
	 * 返回指定任务名称、任务类型列表和任务状态列表数据
	 * @param taskName 任务名称
	 * @param taskTypeString 任务类型列表
	 * @param taskStatString 任务状态列表
	 * @return
	 */
	public Page getTasksByConditionPage(String taskName,
			String taskTypeString, String taskStatString,int pageNum,int pageSize)
	{
		String hql = "from Task";
		hql+=" where task_name like '%"+taskName+"%'";
		
		Integer[] taskTypeIntArray = ClassCastUtil.stringArrayToIntArray(taskTypeString.split(";"));
		hql+=" and (";
		for(int i=0;i<taskTypeIntArray.length-1;i++)
			hql+=" task_type = ? or";
		hql+=" task_type = ? )";
		
		if(!taskStatString.isEmpty() && !taskStatString.equals(""))
		{
			hql+=" and (";
			Integer[] taskStatIntArray = ClassCastUtil.stringArrayToIntArray(taskStatString.split(";"));
			for(int i=0;i<taskStatIntArray.length-1;i++)
				hql+=" task_stat = ? or";
			hql+=" task_stat = ? )";
			return taskDao.pagedQuery(hql, pageNum, pageSize, (Integer[]) ArraysOperationUtil.combi(taskTypeIntArray, taskStatIntArray));
		}else
		{
			return taskDao.pagedQuery(hql, pageNum, pageSize, taskTypeIntArray);
		}
	}
	
	/**
	 * 返回任务状态的key-value值
	 * @param i 任务状态值0;1;2;3;4
	 * @return
	 */
	public int getCountByTaskStat(Integer i)
	{
		List<Task> taskList = taskDao.find("from Task where task_stat = ?",i);
		return taskList.size();
	}
	

	/**
	 * 返回任务类型的key-value
	 * @param i
	 * @return
	 */
	public int getCountByTaskType(Integer i)
	{
		List<Task> taskList = taskDao.find("from Task where task_type=?",i);
		return taskList.size();
	}
}
