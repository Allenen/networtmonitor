<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html >
  <head>
    <base href="<%=basePath%>">
  	<title>网络监控</title>

	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css">
 	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css">
 	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/demo.css">


    <script src="jquery/jquery-1.11.3.min.js"></script>
    <script src="jquery/jquery.json-2.2.min.js"></script>
    <script src="jqueryEasyUI/jquery.easyui.min.js"></script>
    <script src="qunee/qunee-min.js" ></script>
    
    <script src="js/topologyManager/JSONSerializer.js"></script>
    

  </head>

  <body style="overflow:hidden; height:100%">
	<div id="canvas" style="height:100%"></div>
  
  <script>

    var graph = new Q.Graph("canvas");
    graph.interactionMode = Q.Consts.INTERACTION_MODE_VIEW;//设置查看模式

	graph.navigationType = Q.Consts.NAVIGATION_NONE;
	
    graph.enableTooltip = false;
    graph.tooltipDelay = 10;
    graph.tooltipDuration = 100;


    $.ajax({
      type: "POST",
      url: "json/topology.json",
      dataType: "text",
      success: function(data)
      {
         graph.parseJSON(data);
         graph.moveToCenter();
      }
    });


    var dialog = document.createElement('div');



     var timer = setTimeout(function A()
     {
      graph.forEach(function(element)
      {
          if(Q.randomBool())
          {
              element.setStyle(Q.Styles.RENDER_COLOR, "#00FFFF");
              if(element.type == 'Q.Node')
              {
                element.tooltip = "alert('ddfa')";
              }
              else
              {
                //element.tooltip = element.name + "哈哈";
              }
              return;
          }
          element.setStyle(Q.Styles.RENDER_COLOR, "#FF7F00");
      });

      timer = setTimeout(A, 500);
  }, 500);


  function destroy(){
      clearTimeout(timer);
  }

  </script>

  </body>
  </html>
