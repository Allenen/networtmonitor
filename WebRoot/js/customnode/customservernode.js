

function formatNumber(number, decimal, unit){
    return number.toFixed(decimal) + unit;
}

function CustomServerNode(x, y, name, id, image, data){
    Q.doSuperConstructor(this, CustomServerNode);
	this.x = x;
	this.y = y;
	
    this.init(name, id, image);
	this.set("device_ip", data.device_ip);

    this.set("cpu", formatNumber(data.cpu, 0, "%"));
    this.set("memory", formatNumber(data.memory, 0, "%"));
	this.set("network_card", formatNumber(data.network_card, 2, "%"));
	
}

var w = 250, h = 100, r = 10;
var textsize = 10;
var textcolor = "#6B238E";
CustomServerNode.prototype = 
{
    _showDetail: false,
    iconSize: {width: 23},
    shape: Q.Shapes.getRect(-w/2, -h/2, w, h, r, r),
    init: function(name, id, image){
        this.set("image", image);
        this.set("id", id);
        this.set("name", name);
		this.name = name;

        this.image = image;
        var gradient = new Q.Gradient(Q.Consts.GRADIENT_TYPE_LINEAR, ["#F4F4F4", "#FFFFFF", "#DFDFDF", "#E9E9E9"]);
        gradient.angle = Math.PI / 2;
        this.setStyle(Q.Styles.SHAPE_FILL_GRADIENT, gradient);
        this.setStyle(Q.Styles.SHAPE_STROKE, 0);
        this.setStyle(Q.Styles.SHAPE_OUTLINE, 1);
        this.setStyle(Q.Styles.SHAPE_OUTLINE_STYLE, "#C9C9C9");
        this.setStyle(Q.Styles.LAYOUT_BY_PATH, false);

        function addUIAt(node, ui, x, y, bindingProperty, value){
            ui.syncSelection = false;
            ui.zIndex = 1;
            ui.position = {x: x, y: y};
            ui.anchorPosition = Q.Position.LEFT_TOP;
            ui.fontSize = textsize;
            var binding;
            if(bindingProperty){
                binding = {
                    property : bindingProperty,
                    propertyType : Q.Consts.PROPERTY_TYPE_CLIENT,
                    bindingProperty : "data"
                };
            }
            node.addUI(ui, binding);
            return ui;
        }


        addUIAt(this, new Q.LabelUI("设备名:"), 5, 10).fontSize = textsize;
		addUIAt(this, new Q.LabelUI(name), 55, 10).color = textcolor;
        addUIAt(this, new Q.LabelUI("设备ID:"), 5, 30).fontSize = textsize;
		addUIAt(this, new Q.LabelUI(id), 55, 30).color = textcolor;
        addUIAt(this, new Q.LabelUI("管理IP:"), 120, 30).fontSize = textsize;
		addUIAt(this, new Q.LabelUI(), 165, 30, "device_ip").color = textcolor;
		
		addUIAt(this, new Q.LabelUI("CPU:"), 5, 50).fontSize = textsize;
		addUIAt(this, new Q.LabelUI(), 35, 50, "cpu").color = textcolor;
        addUIAt(this, new Q.LabelUI("MEM:"), 75, 50).fontSize = textsize;
		addUIAt(this, new Q.LabelUI(), 110, 50, "memory").color = textcolor;
		addUIAt(this, new Q.LabelUI("网卡:"), 155, 50).fontSize = textsize;
		addUIAt(this, new Q.LabelUI(), 190, 50, "network_card").color = textcolor;
		
		var button = new Q.LabelUI("更多信息");
		button.border = 1;
		button.padding = new Q.Insets(2, 5);
		button.backgroundColor = "#FFFFFF";
		button.color = "#000000";
		button.fontSize = textsize;
		addUIAt(this, button, 180, 70);
		
		var tableUI = new TableUI();
		tableUI.backgroundColor = '#EAEDF4';
		addUIAt(this, tableUI, 5, 90, "tableData");
		
		
		
		var uis = this.bindingUIs;
        if(uis){
            uis.forEach(function(ui){
                ui.ui.visible = false;
				//ui.ui.fontsize = textsize;
            });
        }
    }
};
Q.extend(CustomServerNode, Q.Node);

Object.defineProperties(CustomServerNode.prototype, {
    showDetail: {
        get: function(){
            return this._showDetail;
        },
        set: function(show){
		
            if(this._showDetail == show){
                return;
            }
            this._showDetail = show;

            this.image = show ? this.shape : this.get("image");
			this.name = show ? "" : this.get("name");
            var uis = this.bindingUIs;
            if(uis){
                uis.forEach(function(ui){
                    ui.ui.visible = show;
                });
                this.invalidate();
            }
        }
    }
});

function createServer(x, y, name, id, icon){
    var server = new CustomServerNode(x, y, name, id, icon, {device_ip: "10.0.0.2",cpu: Math.random() * 100,
			memory: Math.random() * 100, network_card: Math.random() * 100});
    return server;
}