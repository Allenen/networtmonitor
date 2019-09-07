package cn.zr.networkmonitor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zr.networkmonitor.dao.EquipDao;
import cn.zr.networkmonitor.domain.Equip;
import cn.zr.networkmonitor.domain.Page;

@Service
@Transactional
@SuppressWarnings("unchecked")
public class EquipService {

	@Autowired
	private EquipDao equipDao;
	
	//得到所有的设备
	public List<Equip> getAllEquips()
	{
		 return equipDao.loadAll();
	}
	
	//更新设备信息
	public void updateEquip(Equip equip){
		equipDao.update(equip);
	}
	
	//根据ID获取设备
	public Equip getEquipById(String equipId)
	{
		List<Equip> equips = equipDao.find("from Equip where equip_id = ?",equipId);
		if(equips.size()>0)
			return equips.get(0);
		return null;
	}
	
	//探针类型获取设备
	
	public List<Equip> getEquipBykind(String tanZhenEquipList)
	{
		String[] tanZhenEquipArray = tanZhenEquipList.split(";");
		List<Equip> equips = equipDao.find("from Equip where equip_kind = ? or equip_kind=? or equip_kind=?",tanZhenEquipArray[0],tanZhenEquipArray[1],tanZhenEquipArray[2]);
		if(equips.size()>0)
			return equips;
		return null;
	}
	
	//根据ID获取设备
	public Equip getEquipByEquipNum(String equipNum)
	{
		long equipnum = Long.parseLong(equipNum);
		List<Equip> equips = equipDao.find("from Equip where equip_num = ?",equipnum);
		if(equips.size()>0)
			return equips.get(0);
		return null;
	}
	
	/* by zxgm 2016-11-10
	 * 根据设备信息表的设备标识获取设备信息
	 * equipId:设备标识
	 * */
	public Equip getEquipByEquipId(String equipId)
	{
		List<Equip> equips = equipDao.find("from Equip where equipId = ?",equipId);
		if(equips.size()>0)
			return equips.get(0);
		return null;
	}
	
	public Equip get(int equipNum)
	{
		return equipDao.get(equipNum);
	}
	
	//删除指定ID的设备
	public void deleteEquips(String equipId)
	{
		Equip equip = getEquipById(equipId);
		equipDao.remove(equip);
	}
		//删除指定ID的设备
	public void deleteEquip(String equipId)
	{
		Equip equip = new Equip();
		equip.setEquipId(equipId);
		equipDao.remove(equip);
	}
	//删除指定Num的设备
	public void deleteEquipsByNum(String equipNum)
	{
		Equip equip = getEquipByEquipNum(equipNum);
		equipDao.remove(equip);
	}
	//添加设备
	public void addEquip(Equip equip) {
		equipDao.save(equip);
	}
	
	//根据管理IP地址查找数据
	public Equip getEquipsByManageIP(String equipConditionTest) {
		return equipDao.getEquipsByManageIP(equipConditionTest);
	}

	//根据条件查询数据
	public List<Equip> getEquipsByCondition(String equipKindTest,
			String equipConditionTest) {
		
		boolean equipConditionFlag = false,equipKindConditionFlag = false;
		String[] equipKindTestList = equipKindTest.split(";");//路由器、DNS服务器
		
		String hql="from Equip";
		if(!equipConditionTest.equals(""))//选中设备名或者管理IP
		{
			//管理IP
			if (equipConditionTest.matches("((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))")) {
				hql+=" where manage_ip = '"+equipConditionTest+"'";
			}else{//设备名称
				hql+=" where equip_name like '%"+equipConditionTest+"%'";
			}
			equipConditionFlag = true;
		}
		
		if (!equipKindTest.equals("")&&equipKindTestList.length != 0) {//选中设备类型
			if(equipKindTestList.length == 1){
				if (!equipConditionFlag) {
					hql+=" where equip_kind = ?";
				}else{
					hql+=" and equip_kind = ?";
				}
			}else{
				if (!equipConditionFlag) {
					hql+=" where equip_kind = ?";
				}else{
					hql+=" and (equip_kind=?";
				}
				for(int i = 1;i<equipKindTestList.length;i++)
					hql+=" or equip_kind=?";
				hql+=")";
			}
			equipKindConditionFlag = true;
		}
		
		if (equipConditionFlag) {
			if (equipKindConditionFlag) {
				return equipDao.find(hql,equipKindTestList);
			}else{
				return equipDao.find(hql);
			}
		}else{
			if (equipKindConditionFlag) {
				return equipDao.find(hql,equipKindTestList);
			}else{
				return equipDao.find(hql);
			}
			
		}
	}
	//根据设备名获取设备
	public Equip getEquipByEquipname(String equipname)
	{
		List<Equip> equips = equipDao.find("from Equip where equip_name = ?",equipname);
		if(equips.size()>0)
			return equips.get(0);
		return null;
	}
	
	//根据任务类型得到相应的任务主体设备
	public List<Equip> getSubjectEquipsByTasktype(String tanZhenEquipList){
		return getEquipBykind(tanZhenEquipList);
	}
	
	//根据任务类型得到相应的任务目标设备
	public List<Equip> getTargetEquipsByTasktype(){
		return null;
	}
	
	//分页显示设备列表
	public Page getAllEquipsByPage(int pageNum, int pageSize)
	{
		return equipDao.pagedQuery("from Equip", pageNum, pageSize);
	}
	
	//根据设备Id得到探针设备和任务信息
	public Equip getEquipAndTaskByAjax(String equipNum) {
		return equipDao.get(Integer.parseInt(equipNum));
	}

	//根据设备类型获取设备
	public List<Equip> getDevicesByEquipKind(String equipKind) {
		return equipDao.find("from Equip where equipKind=?", equipKind);
	}

	/**
	 * 返回指定归属单位所拥有的设备数
	 * by zxgm 2017-01-05
	 * @param dictCont
	 * @return
	 */
	public int getCountByAreaUnit(String dictCont)
	{
		return equipDao.getCountByAreaUnit(dictCont);
	}

	/**
	 * 返回指定设备类型所拥有的设备数
	 * by zxgm 2017-01-05
	 * @param dictCont
	 * @return
	 */
	public int getCountByEquipKind(String dictCont)
	{
		return equipDao.getCountByEquipKind(dictCont);
	}

	/**
	 * 返回指定设备类型的设备
	 * @param equipKind
	 * @return
	 */
	public List<Equip> getEquipsByEquipkind(String equipKind)
	{
		return equipDao.find("from Equip where equipKind like ?","%"+equipKind+"%");
	}

}
