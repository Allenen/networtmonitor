
 	/*
 	 * 第一个全选复选框 by TX 2016.11.1
 	 */ 	
	//选择大单位的全选方法
		var flag=1;
	     function checkAll(){
	    	if(flag == 1){
	       		$('table td label input[type=checkbox]').prop("checked",true);
	       		flag=0;
	    	}else{
	      			$('table td label input[type=checkbox]').prop("checked",false);
	      			flag=1;
	    		}

	  }
	  
	  //（大单位）与全选对应的单选方法  by TX 2016.11.1
	  function getallselect(){
	      if(flag==0){
	         $('#checkall').prop("checked",false);
	      }
	      var selectvalue= [],selectvalueContent=[];
	      $('table td label input[type=checkbox]:checked').each(function(){
	            selectvalue.push($(this).val());
	            selectvalueContent.push(this.nextSibling.nodeValue);
	        }
	      );
	      arr = document.getElementsByName("gsdw");
	      for(var i=0;i<selectvalue.length;i++){
	    	  console.log(selectvalueContent[i]);
	      }
	      if(selectvalue.length==arr.length){
		    	$('#checkall').prop("checked",true);
		         flag = false;
		      }
	      
	  }
	 