package cn.zr.networkmonitor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.zr.networkmonitor.dao.DictDao;
import cn.zr.networkmonitor.domain.Dict;

//用于维护字典表的service
@Service
public class DictService {
	@Autowired
	private DictDao dictDao;

	//得到字典表所有数据信息
	public List<Dict> getAllDicts()
	{
		return dictDao.loadAll();
	}
	
	//得到字典表中所有的分类
	@SuppressWarnings("unchecked")
	public List<Dict> getDeviceCategorys(String dict_type)
	{
		return dictDao.find("from Dict where dict_type = ?", dict_type);
	}

	////通过字典表中的字典类型和字典编号得到字典实体
	public Dict getDictByDictTypeAndDictNumb(String dictType, String dictNumb)
	{
		return (Dict) dictDao.find("from Dict where dict_type = ? and dict_numb = ?", dictType, Integer.parseInt(dictNumb)).get(0);
	}
	
	//通过自定义的字符串进行筛选 by TX 2016.11.09
	@SuppressWarnings("unchecked")
	public List<Dict> getDeviceCategorys2(String[] checkbox1){

		String hql="from Dict";
		boolean Flag = false;
		if (checkbox1.length!=0) {//选中设备类型
			if(checkbox1.length == 1){
				if (!Flag) {
					hql+=" where dict_cont = ?";
				}else{
					hql+=" or dict_cont = ?";
				}
			}else{
				if (!Flag) {
					hql+=" where dict_cont = ?";
				}else{
					hql+=" and (dict_cont=?";
				}
				for(int i = 1;i<checkbox1.length;i++)
					hql+=" or dict_cont=?";
			}
			Flag = true;
		}
		return dictDao.find(hql,checkbox1);
	
	}
	
}
