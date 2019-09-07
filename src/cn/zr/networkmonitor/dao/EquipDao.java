package cn.zr.networkmonitor.dao;

import java.math.BigInteger;
import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import cn.zr.networkmonitor.domain.Equip;
import cn.zr.networkmonitor.domain.Page;

@Repository
public class EquipDao extends BaseDao<Equip> {

	//根据管理IP查找设备集合
	@SuppressWarnings("unchecked")
	public Equip getEquipsByManageIP(String equipConditionTest) {
		List<Equip> equipList = this.find("from Equip where manage_ip = ?", equipConditionTest);
		if(equipList.size() == 0)
			return null;
		return equipList.get(0);
	}
	//根据设备名获取设备
	public Equip getEquipByEquipname(String equipname)
	{
		List<Equip> equips = this.find("from Equip where equip_name = ?",equipname);
		if(equips.size()>0)
			return equips.get(0);
		return null;
	}
	
	/**
	 * 返回指定归属单位所拥有的设备数
	 * @param dictCont
	 * @return
	 */
	public int getCountByAreaUnit(String dictCont)
	{
		List<Equip> equips=this.find("FROM Equip WHERE area_unit = ?",dictCont);
		return equips.size();
	}
	
	/**
	 * 返回指定设备类型所拥有的设备数
	 * @param dictCont
	 * @return
	 */
	public int getCountByEquipKind(String dictCont)
	{
		List<Equip> equips=this.find("FROM Equip WHERE equipKind = ?",dictCont);
		return equips.size();
	}
	
}
