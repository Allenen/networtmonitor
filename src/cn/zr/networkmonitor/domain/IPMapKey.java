package cn.zr.networkmonitor.domain;

import java.io.Serializable;

public class IPMapKey implements Serializable {

	/**
	 * private String dict_type;		//字典类型	DICT_TYPE	VARCHAR(6)
	private int dict_numb;			//字典编号	DICT_NUMB	INT
	 */
	private static final long serialVersionUID = 1L;
	
	private String dict_type;
	private int dict_numb;
	
	public IPMapKey(){}

	public IPMapKey(String dict_type, int dict_numb) {
		super();
		this.dict_type = dict_type;
		this.dict_numb = dict_numb;
	}

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
	
	public static long getSerialVersionUID(){
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + dict_numb;
		result = prime * result
				+ ((dict_type == null) ? 0 : dict_type.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		IPMapKey other = (IPMapKey) obj;
		if (dict_numb != other.dict_numb)
			return false;
		if (dict_type == null) {
			if (other.dict_type != null)
				return false;
		} else if (!dict_type.equals(other.dict_type))
			return false;
		return true;
	}
	
	

}
