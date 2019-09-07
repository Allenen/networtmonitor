package cn.zr.networkmonitor.test;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

import com.sun.org.apache.bcel.internal.generic.NEW;

import cn.zr.networkmonitor.domain.AlarmRec;
import cn.zr.networkmonitor.domain.Equip;
import cn.zr.networkmonitor.domain.Task;
import cn.zr.networkmonitor.service.AlarmCfgService;
import cn.zr.networkmonitor.service.AlarmRecService;
import cn.zr.networkmonitor.service.EquipService;
import cn.zr.networkmonitor.service.PolicyService;
import cn.zr.networkmonitor.service.TaskService;

@ContextConfiguration(locations={"classpath*:spring.xml","classpath*:spring-persistence.xml","classpath*:spring-service.xml","classpath*:spring-action.xml"})
public class JunitTest extends AbstractJUnit4SpringContextTests{
	@Autowired
	private TaskService taskService;
	@Autowired
	private PolicyService policyService;
	@Autowired
	private AlarmCfgService alarmCfgService;
	@Autowired
	private AlarmRecService alarmRecService;
	
	
	@Test
	public void testTaskService(){
		List<Task> tasks = taskService.getTaskByTaskType(false, "1;2");
		System.out.println(tasks.size());
		
	}
	@Test
	public void testTasksave(){
		Task task = new Task();
		Date date = new Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		task.setTask_type(1);
		task.setTask_subject("南京探针231");
		task.setTask_name("双向时延任务"+dateFormat.format(date));
		task.setTask_target("南京节点1;南京节点2;南京节点3");
		task.setPolicy_para(policyService.getPolicyByTasktype(1).get(0).getPolicy_para());
		task.setIs_cycle(0);
		task.setTask_interval(1);
		task.setInterval_unit("m");
		task.setSend_ip("192.168.110.2");
		task.setStart_time(date);
		task.setEnd_time(null);
		task.setTask_stat(0);
		task.setLevel(1);
		task.setResend_interval(0);
		task.setResend_count(0);
		task.setTask_over_time(null);
		task.setPolicy_name(policyService.getPolicyByTasktype(1).get(0).getPolicy_name());
		task.setSend_notice(0);
		taskService.saveTask(task);
		System.out.print("存储成功");
		
	}
	@Test
	public void testActiveTask(){
		String taskname= "双向时延任务2016-08-02 14:25:11";
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date start_time =null;
		Date end_time =null;
		try {
		    start_time = dateFormat.parse("2016-08-01 00:00:00");
		    end_time = dateFormat.parse("2016-12-01 00:00:00");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		taskService.activeTask(taskname, start_time, end_time);
		
		
	}
	@Test
	public void testAlarmCfgService(){
		
		System.out.println(alarmCfgService.getAllAlarmCfgs().size());
		
	}
	@Test
	public void testAlarmRecsave() throws ParseException{
		AlarmRec alarmRec = new AlarmRec();
		String ip = "89.23.25.10";
		alarmRec.setAlarm_ip(ip);
		//Equip equip = equipService.getEquipsByManageIP(ip);
		alarmRec.setAlarm_mainkind("双向时延");
		alarmRec.setAlarm_subkind("目标阻断");
		alarmRec.setAlarm_code("108");
		alarmRec.setAlarm_level("严重告警");
		Date date = new Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		alarmRec.setAlarm_first(dateFormat.parse(dateFormat.format(date)));
		Date date2 = new Date(date.getTime()+10*60*1000);
		alarmRec.setAlarm_newest(dateFormat.parse(dateFormat.format(date2)));
		alarmRec.setProc_flag(0);
		alarmRecService.saveAlarmRec(alarmRec);
		
	}
	@Test
	public void testAlarmRecs(){
		List<AlarmRec> alarmRecs = alarmRecService.getAllAlarmRecsOrderByAlarmNewest();
		//DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		for(AlarmRec alarmRec : alarmRecs){
			System.out.println(alarmRec.getAlarm_code());
		}
	}
	@Test
	public void testAlarmRecsBykeeptime(){
		List<AlarmRec> alarmRecs = alarmRecService.getAlarmRecsByAlarmKeepMinute(11);
		for(AlarmRec alarmRec : alarmRecs){
			System.out.println((alarmRec.getAlarm_newest().getTime()-alarmRec.getAlarm_first().getTime())/60000);
		}
	}
	@Test
	public void testAlarmRecsByEquipname(){
		List<AlarmRec> alarmRecs = alarmRecService.getAlarmRecsByEquipName("服务器1");
		for(AlarmRec alarmRec : alarmRecs){
			System.out.println(alarmRec.getAlarm_ip()+alarmRec.getAlarm_code());
		}
	}
	@Test
	public void testAlarmRecsgroupBy(){
		List list = alarmRecService.getAlarmRecsByGroupByAlarmMainkind();
		Object[] objects = (Object[]) list.get(0);
		System.out.println(objects[0]);
		System.out.println(objects[1]);
	}
	@Test
	public void testAlarmRecsgroupByserwq(){
		List list = alarmRecService.getAlarmRecsByGroupByAlarmSubkind();
		Object[] objects = (Object[]) list.get(0);
		System.out.println(objects[0]);
		System.out.println(objects[1]);
	}


}
