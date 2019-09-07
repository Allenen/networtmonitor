
/**
 * 用于任务添加UI
 */

/**
 * 双向时延、丢包率、时延抖动测量UI
 */
function showDLatencyTaskAddUI()
{
	$('#showTaskUI').dialog({    
	    title: '双向时延、丢包率、时延抖动测量任务',    
	    width: 723,    
	    height: 650,    
	    closed: false,    
	    cache: false,    
	    href: 'getDLatencyTaskAddUI.html',    
	    modal: true
	});    
}


/**
 * 单向时延、丢包率、时延抖动测量UI
 */
function showSLatencyTaskAddUI()
{
	$('#showTaskUI').dialog({    
	    title: '单向时延、丢包率、时延抖动测量任务',    
	    width: 800,    
	    height: 720,    
	    closed: false,    
	    cache: false,    
	    href: 'getSLatencyTaskAddUI.html',    
	    modal: true,
	    resizable:true
	});
}


/**
 * 阻断测量UI
 */
function showBlockTaskAddUI()
{
	$('#showTaskUI').dialog({    
	    title: '阻断测量任务',    
	    width: 723,    
	    height: 680,    
	    closed: false,    
	    cache: false,    
	    href: 'getBlockTaskAddUI.html',    
	    modal: true   
	});
}


/**
 * TE隧道测量UI
 */
function showTETestTaskAddUI()
{
	$('#showTaskUI').dialog({    
	    title: 'TE隧道测量任务',    
	    width: 860,    
	    height: 780,    
	    closed: false,    
	    cache: false, 
	    resizable:true,
	    href: 'getTETestTaskAddUI.html',    
	    modal: true   
	});
}


/**
 * 链路性能测量UI
 */
function showPathPerformanceTaskAddUI()
{
	$('#showTaskUI').dialog({    
	    title: '链路性能测量任务',    
	    width: 723,    
	    height: 700,    
	    closed: false,    
	    cache: false,    
	    href: 'getPathPerformanceTaskAddUI.html',    
	    modal: true   
	});
}


/**
 * 链路变化监测UI
 */
function showPathChangeTaskAddUI()
{
	$('#showTaskUI').dialog({    
	    title: '链路变化监测任务',    
	    width: 800,    
	    height: 700,    
	    closed: false,    
	    cache: false,    
	    href: 'getPathChangeTaskAddUI.html',    
	    modal: true   
	});
}


/**
 * 多媒体业务性能测量UI
 */
function showMultiMediaTaskAddUI()
{
	$('#showTaskUI').dialog({    
	    title: '多媒体业务性能测量任务',    
	    width: 950,    
	    height: 750,    
	    closed: false,    
	    cache: false,    
	    href: 'getMultiMediaTaskAddUI.html',    
	    modal: true   
	});
}


/**
 * 通用业务性能测量UI
 */
function showCommonServiceTaskAddUI()
{
	$('#showTaskUI').dialog({    
	    title: '通用业务性能测量任务',    
	    width: 723,    
	    height: 700,    
	    closed: false,    
	    cache: false,    
	    href: 'getCommonServiceTaskAddUI.html',    
	    modal: true   
	});
}






