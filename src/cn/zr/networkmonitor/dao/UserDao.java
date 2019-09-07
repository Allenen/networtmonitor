package cn.zr.networkmonitor.dao;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import cn.zr.networkmonitor.domain.User;

@Repository
public class UserDao extends BaseDao<User>
{
	//根据用户名查询用户
	public User findUserById(String id)
	{
		Session session=this.getHibernateTemplate().getSessionFactory().getCurrentSession();
		User user= (User) session.get(User.class, id);
		//session.close();
		return user;
	}

	//更新用户密码
	public void updateResetPassword(User userOld) {
		//Session session=this.getHibernateTemplate().getSessionFactory().getCurrentSession();
		//session.update(userOld);
	}
	
}
