package cn.zr.networkmonitor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zr.networkmonitor.dao.UserDao;
import cn.zr.networkmonitor.domain.Page;
import cn.zr.networkmonitor.domain.User;

@Service
@Transactional
public class UserService
{
	@Autowired
	private UserDao userDao;

	//根据用户名查询用户
	@SuppressWarnings("unchecked")
	public User getByUsername(String username)
	{
		List<User> users = userDao.find("from User where username = ?",username);
		if(users.size()>0)
			return users.get(0);
		return null;
	}
	
	//根据用户ID和密码查询用户
	@SuppressWarnings("unchecked")
	public User getUserByUserIdAndUserPassword(String userId, String userPassword)
	{
		List<User> users = userDao.find("from User where userId = ? and userPassword = ?", userId, userPassword);
		return  (users.size() > 0 ? users.get(0) : null);
	}

	//添加用户
	public void add(User user)
	{
		userDao.save(user);
	}
	
	/*
	 * 删除选用户  
	 * */
	public void remove(User user){
		userDao.remove(user);
	}
	
	//根据用户名和Email查询用户
	public User findPassword(String username,String email)
	{
		return null;
	}

	/*
	 * 根据用户ID查找用户
	 **/
	public User findUserById(String loginUserId) {
		return userDao.findUserById(loginUserId);
	}

	//更新用户密码
	public void updateResetPassword(User userOld) {
		userDao.updateResetPassword(userOld);
	}
	
	/*
	 * 更新单个用户所有信息  by TX 2016.10.31
	 * */
	public void update(User user){
		userDao.update(user);
	}
	
	//分页得到用户信息
	public List<User> getAllUsers()
	{
		Page page = userDao.pagedQuery("from User", 2, 5);
		List<User> users = page.getResult();
		return users;
	}
	
	/*
	 * 得到所有用户数据  by TX2016.10.31
	 * */
	public List<User> getAllUsersNotByPage()
	{
		return userDao.loadAll();
	}

}
