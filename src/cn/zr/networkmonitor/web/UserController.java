package cn.zr.networkmonitor.web;


import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.zr.networkmonitor.domain.User;
import cn.zr.networkmonitor.service.UserService;

/**
 * 用于用户相关的控制器  
 * */
@Controller
public class UserController
{
	@Autowired
	private UserService userService;
	
	/**
	 * 转发到用户列表
	 * @return
	 */
	@RequestMapping("usermanager.html")
	public ModelAndView userManager(){
		ModelAndView modelAndView = new ModelAndView();
		List<User> users = userService.getAllUsersNotByPage();
		modelAndView.addObject("userlist", users);
		modelAndView.setViewName("/WEB-INF/jsp/userManager/usermanager.jsp");
		return modelAndView;
	}
	
	
	/**
	 * easyui获取所有用户信息并显示 
	 */
	@RequestMapping("getUsers.html")
	@ResponseBody
	public List<User> getUsersForEasyUI()
	{
		List<User> users = userService.getAllUsersNotByPage();
		return users;
	}
	
	/**
	 * 批量删除 
	 */
	@RequestMapping("deleteUsers.html")
	@ResponseBody  
	public Map<String, Object> deleteEquips(String userIdList)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		String[] userIds = userIdList.split(";");
		for(String userId:userIds){
			if (userId != null && !userId.equals("")) {
				userService.remove(userService.findUserById(userId));
			}
		}
		
		return map;
	}
	
	
	/**
	 * 添加单个用户至数据库 
	 */
	@RequestMapping("append.html")
	public ModelAndView append(User user)
	{
		ModelAndView modelAndView = new ModelAndView();
		User u = user;
		if(u!=null)
		{
			userService.add(u);
			List<User> users = userService.getAllUsersNotByPage();
			modelAndView.addObject("userlist", users);
			modelAndView.setViewName("/WEB-INF/jsp/userManager/usermanager.jsp");
		
		}else{
			modelAndView.addObject("messageInfo","添加失败");
			modelAndView.setViewName("/WEB-INF/jsp/userManager/404.jsp");
		}
		return modelAndView;
	}
	
	@RequestMapping("adduser.html")
	public void adduser(HttpServletResponse response,String userId,String userMemo,String userPassword,String userPhone,String userRealName,String userUnit,int userVisible)
	{	
		User user = userService.findUserById(userId);
		if(user != null){
			try {
				response.getWriter().write("exist"); //用户id已经存在
			} catch (IOException e) {
				e.printStackTrace();
			}
			return ;
		}
		User u = new User();
		u.setUserId(userId);
		u.setUserMemo(userMemo);
		u.setUserPassword(userPassword);
		u.setUserPhone(userPhone);
		u.setUserRealName(userRealName);
		u.setUserUnit(userUnit);
		u.setUserVisible(userVisible);

		userService.add(u);
		try {
			response.getWriter().write("success");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 删除选中用户
	 */	
	@RequestMapping("remove.html")
	public ModelAndView remove(String userId){
		ModelAndView modelAndView = new ModelAndView();
		//System.out.println("remove执行");
		//System.out.println(userId);
		User user = userService.findUserById(userId);
		if(user!=null){
			userService.remove(user);
			modelAndView.addObject("user",user);
			modelAndView.setViewName("/WEB-INF/jsp/userManager/userManage.jsp");
		}else{
			modelAndView.addObject("messageInfo","删除失败");
			modelAndView.setViewName("/WEB-INF/jsp/userManager/404.jsp");
		}
		return modelAndView;
	}
	
	/**
	 * 保存修改的单个的用户
	 */
	@RequestMapping("update.html")
	public void Update_userinfo(HttpServletResponse response,String userId,String userMemo,String userPassword,String userPhone,String userRealName,String userUnit,int userVisible){
		
		User user = userService.findUserById(userId);
		user.setUserMemo(userMemo);
		user.setUserPassword(userPassword);
		user.setUserPhone(userPhone);
		user.setUserRealName(userRealName);
		user.setUserUnit(userUnit);
		user.setUserVisible(userVisible);
		userService.update(user);
		try {
			response.getWriter().write("success");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	
	//使用用户ID和密码登陆
	@RequestMapping("clientlogin.html")
	public ModelAndView login(User user)
	{
		ModelAndView modelAndView = new ModelAndView();
		User userLogin = userService.getUserByUserIdAndUserPassword(user.getUserId(), user.getUserPassword());
		if(userLogin != null)		//用户名密码正确
		{
			modelAndView.addObject("user", userLogin);
			modelAndView.setViewName("/WEB-INF/jsp/client3/main.jsp");			//跳转到系统主界面
		}else{						//用户名密码错误
			modelAndView.addObject("messageInfo","用户名或密码不正确");
			modelAndView.setViewName("/WEB-INF/jsp/client3/index.jsp");			//跳转到登陆界面
		}
		
		return modelAndView;
	}
	
	@RequestMapping("signout.html")
	public String signout(HttpSession session){
		session.invalidate();
		return "forward:/WEB-INF/jsp/userManager/login.jsp";
	}

	//使用用户ID和密码登陆
	@RequestMapping("clientlogin1.html")
	public void login1(@RequestParam("userid") String userid,@RequestParam("password") String password,HttpSession session,HttpServletResponse response)
	{
		User userLogin = userService.getUserByUserIdAndUserPassword(userid, password);
		if(userLogin != null)		//用户名密码正确
		{
			try {
				session.setAttribute("userid", userid);
				response.getWriter().write("success");
			} catch (IOException e) {
				e.printStackTrace();
			}
			
		}else{	
			try {
				response.getWriter().write("error");
			} catch (IOException e) {
				e.printStackTrace();
			}
		
		}
	}
	
	@RequestMapping("404.html")//重置密码
	public String notFound()
	{
	   return "forward:/WEB-INF/jsp/userManager/404.jsp";
	}
	//项目首页
	@RequestMapping("index.html")
	public String index()
	{
		return "forward:/WEB-INF/jsp/userManager/index.jsp";
	}
	
	//客户端登陆
	@RequestMapping("login.html")
	public String login()
	{
		return "forward:/WEB-INF/jsp/userManager/login.jsp";
	}
	

	@RequestMapping("exit.html")
	public void exit(HttpServletResponse response)
	{
		try {
			response.getWriter().write("success");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
