package cn.zr.networkmonitor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zr.networkmonitor.dao.EquipInteDao;
import cn.zr.networkmonitor.domain.EquipInte;

@Service
@Transactional
public class EquipInteService {
	
	@Autowired
	private EquipInteDao equipInteDao;

	//添加设备接口信息
	public void addEquipInte(EquipInte equipInte) {
		equipInteDao.save(equipInte);
	}

	//得到所有的设备接口信息
	public List<EquipInte> getAllEquipIntes() {
		return equipInteDao.loadAll();
	}
	
	//根据设备接口Id得到设备接口信息
	@SuppressWarnings("unchecked")
	public EquipInte getEquipInteByInteId(String inteId)
	{
		List<EquipInte> equipInteList = equipInteDao.find("from EquipInte where equipInteUnionKey.inteId = ?", Integer.parseInt(inteId));
		if(equipInteList.size() == 0)
			return null;
		return equipInteList.get(0);
	}

	//删除设备接口信息
	public void deleteEquipIntes(String equipIntes) {
		equipInteDao.remove(getEquipInteByInteId(equipIntes));
	}

	//根据设备编号获取设备接口
	public List<EquipInte> getEquipIntesByEquipId(String equipId) {
		return equipInteDao.find("from EquipInte where equipInteUnionKey.equipId=?", equipId);
	}

	/**
	 * 返回指定的设备标识和接口编号的设备接口实体 by zxgm 2016-12-6
	 * @param equipId
	 * @param inteId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public EquipInte getEquipInteByEquipIdAndInteId(String equipId, int inteId)
	{
		List<EquipInte> equipInteList = equipInteDao.find("from EquipInte where equipInteUnionKey.equipId=? and equipInteUnionKey.inteId=?",equipId, inteId);
		if (equipInteList.size() != 0)
		{
			return equipInteList.get(0);
		}else {
			return null;
		}
		
	}

	/**
	 * 删除指定设备标识和接口编号的设备接口信息
	 * @param inteId 接口编号
	 * @param equipId 设备标识
	 */
	public void deleteEquipInteByInteIdAndEquipId(String inteId, String equipId)
	{
		EquipInte equipInte=getEquipInteByEquipIdAndInteId(equipId, Integer.parseInt(inteId));
		equipInteDao.remove(equipInte);
	}

}
