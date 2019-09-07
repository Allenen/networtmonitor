package cn.zr.networkmonitor.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name="nspms_dict")
@IdClass(IPMapKey.class)//用于复合主键
public class Dict {

	@Id
	@Column(name="DICT_TYPE")
	private String dict_type;		//字典类型	DICT_TYPE	VARCHAR(6)
	@Id
	@Column(name="DICT_NUMB")
	private int dict_numb;			//字典编号	DICT_NUMB	INT
	@Column(name="DICT_CONT")
	private String dict_cont;		//字典内容	DICT_CONT	VARCHAR(100)
	
	public String getDict_type() {
		return dict_type;
	}
	public void setDict_type(String dict_type) {
		this.dict_type = dict_type;
	}
	public int getDict_numb() {
		return dict_numb;
	}
	public void setDict_numb(int dict_numb) {
		this.dict_numb = dict_numb;
	}
	public String getDict_cont() {
		return dict_cont;
	}
	public void setDict_cont(String dict_cont) {
		this.dict_cont = dict_cont;
	}
	
	
}
