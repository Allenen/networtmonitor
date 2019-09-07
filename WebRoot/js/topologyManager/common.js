

///drag and drop
var DRAGINFO_PREFIX = "draginfo";

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();


}

function ondrag(evt) {
	var dataTransfer = evt.dataTransfer;
    var img = evt.target;
    var attributes = img.attributes;
	var info = {};
    for(var i= 0,l=attributes.length; i<l; i++){
        var attribute = attributes[i];
        var name = attribute.name;
        var value = attribute.value;
		info[name] = value;
    }
	dataTransfer.setData("text", JSON.stringify(info));
	dataTransfer.setData("deviceType", info.devicetype);
}


function createDNDImage(parent, src, imgtype, devicename, devicetype){
    var img = document.createElement("img");
    img.src = src;
    img.setAttribute("draggable", "true");
    img.setAttribute("title", devicetype);
    img.setAttribute("image", src);
    img.setAttribute("type", imgtype);
    img.setAttribute("label", devicetype);
    img.setAttribute("devicetype", devicetype);
    img.ondragstart = ondrag;
    
    parent.appendChild(img);
    return img;
}


function createToolBar(buttons, toolbar, scope, vertical, togglable){
    for(var n in buttons){
        var info = buttons[n];
        if(Q.isArray(info)){
            var buttonGroup = document.createElement("div");
            buttonGroup.className = vertical ? "btn-group-vertical" : "btn-group";
            if(togglable !== false){
                buttonGroup.setAttribute("data-toggle", "buttons");
            }
            for(var i= 0,l=info.length;i<l;i++){
                if(!info[i].type && togglable !== false){
                    info[i].type = 'radio';
                }
                buttonGroup.appendChild(createGraphButton(info[i], scope));
            }
            toolbar.appendChild(buttonGroup);
            continue;
        }
        toolbar.appendChild(createGraphButton(info, scope));
    }
}

function createGraphButton(info, scope){
	if(info.type == "combox"){
		var div = document.createElement("div");
		div.style.display = "inline-flex";
        div.innerHTML = '<div style="width: 200px;">\
            <input id="topologyImageType" name="topologyImageType" style="width:200px;" value="请选择上传的图片类型">\
            </div>';
		return div;
	}
	
	if(info.type == 'pic_scan'){
		var div = document.createElement("div");
        div.style.display = "inline-flex";
        div.innerHTML = '<div class="input-group input-group-sm">\
            <input type="file" id="openfile" style="display:none">\
            <button class="btn btn-default" type="button" onclick="openfile.click()">图片浏览</button>\
			<button class="btn btn-default" id="pic" type="button" style="height:34px;width:50px"></button>\
            </div>';
		info.btn = div.getElementsByTagName("button")[1];
		
		var input = div.getElementsByTagName("input")[0];
		if (info.action) {
            input.onchange = function (evt) {
                var input = $(this), files = input.get(0).files;
						
                if (files.length) {
					info.files = files;
                    info.action.call(scope || window.graph, evt, info);
				}
            };
        }  
		return div;
	}

	if (info.type == 'file') {
		var div = document.createElement("div");
        div.style.display = "inline-flex";
        div.innerHTML = '<div class="input-group input-group-sm">\
            <input type="file" id="openfile" style="display:none">\
            <button class="btn btn-default" type="button" onclick="openfile.click()"></button>\
            </div>';
        var input = div.getElementsByTagName("input")[0];
        var button = div.getElementsByTagName("button")[0];
        button.title = info.name;
		if(info.icon){
			var icon = document.createElement('img');
			icon.src = info.icon;
			button.appendChild(icon);
		}
		
        if (info.action) {
            input.onchange = function (evt) {
                var input = $(this), files = input.get(0).files;
						
                if (files.length) {
					info.files = files;
                    info.action.call(scope || window.graph, evt, info);
				}
            };
        }  
        return div;
    }
	
    if(info.type == "input"){
        var div = document.createElement("div");
        div.style.display = "inline-flex";
        div.innerHTML = '<div class="input-group input-group-sm" style="width: 150px;">\
            <input type="text" class="form-control">\
                <span class="input-group-btn">\
                    <button class="btn btn-default" type="button"></button>\
                </span>\
            </div>';
        var input = div.getElementsByTagName("input")[0];
        var button = div.getElementsByTagName("button")[0];
        button.innerHTML = info.name;
        info.input = input;
        if(info.action){
            button.onclick = function(evt){
                info.action.call(scope || window.graph, evt, info);
            };
        }
        return div;
    }

    if(!info.type){
        var label = document.createElement("button");
    }else{
        var label = document.createElement("label");
        var button = document.createElement("input");
        info.input = button;
        button.setAttribute('type', info.type);
        label.appendChild(button);
        if (info.selected) {
            button.setAttribute('checked', 'checked');
            if(info.type == 'radio'){
                label.className += "active";
            }
        }
    }
    label.className += " btn btn-default btn-sm";
    if(info.icon){
        var icon = document.createElement('img');
        icon.src = info.icon;
        label.appendChild(icon);
    }
	else if(info.name){
        label.appendChild(document.createTextNode(" " + info.name));
    }
    if(info.name){
        label.setAttribute("title", info.name);
    }
    if(info.action){
		
        label.onclick = function(evt){
            info.action.call(scope || window.graph, evt, info);
        };
    }
    return label;
}