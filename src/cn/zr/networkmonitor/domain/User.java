package cn.zr.networkmonitor.domain;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="nspms_user")
public class User
{
	@Id
	@Column(name="userId",unique=true,nullable=false,length=20)
	private  String userId;					//用户名
	
	@Column(name="userRealName",nullable=false,length=10)
	private String userRealName;				//真实姓名
	
	@Column(name="userPassword",nullable=false,length=20)
	private String userPassword;				//登录密码
	
	@Column(name="userUnit",length=30)
	private String userUnit;					//单位
	
	@Column(name="userPhone",length=11)
	private String userPhone;				//联系电话
	
	@Column(name="userVisible",length=6,nullable=false)
	private int userVisible;					//是否启用
	
	@Column(name="userMemo",length=100)
	private String userMemo;					//备注
	
	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name="nspms_user_equip",joinColumns=@JoinColumn(name="userId"),inverseJoinColumns=@JoinColumn(name="equipId"))
	private List<Equip> equipList = new ArrayList<Equip>();			//用户可访问的设备

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserRealName() {
		return userRealName;
	}

	public void setUserRealName(String userRealName) {
		this.userRealName = userRealName;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getUserUnit() {
		return userUnit;
	}

	public void setUserUnit(String userUnit) {
		this.userUnit = userUnit;
	}

	public String getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	public int getUserVisible() {
		return userVisible;
	}

	public void setUserVisible(int userVisible) {
		this.userVisible = userVisible;
	}

	public String getUserMemo() {
		return userMemo;
	}

	public void setUserMemo(String userMemo) {
		this.userMemo = userMemo;
	}

	public List<Equip> getEquipList() {
		return equipList;
	}

	public void setEquipList(List<Equip> equipList) {
		this.equipList = equipList;
	}
	
	/*@Transient				//数据库表格中不会生成相应的列
	private List<Domain> domainList;			//用户可访问的监测域
*/	/*
	 * 	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid")
	private String id;
	
	private String username;//用户名或者账号
	private String password;
	private String email;
	private int authority;//2表示管理员，1表示VIP用户，0表示普通用户
	
	@Transient				//数据库表格中不会生成相应的列
	private String repassword;
	 * @OneToMany(mappedBy="user",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	private List<Article> articles=new ArrayList<Article>();//用户所发的帖子
	
	@OneToMany(mappedBy="user",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	private List<Blog> blogs=new ArrayList<Blog>();//用户所发的博客
	
	@OneToMany(mappedBy="user",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	private List<Comment> comments=new ArrayList<Comment>();//用户发表的评论
*/
	
	
}
