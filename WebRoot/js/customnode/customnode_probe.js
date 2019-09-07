
function formatNumber(number, decimal, unit){
    return number.toFixed(decimal) + unit;
}

function customnode_probe(x, y, name, id, image, data){
    Q.doSuperConstructor(this, customnode_probe);
	this.x = x;
	this.y = y;
	
    this.init(name, id, image);
	this.set("managerIp", data.managerIp);
	this.set("equip_type", data.equip_type);
	this.set("probe_type", data.probe_type);
    this.set("cpu", formatNumber(data.cpu, 0, "%"));
    this.set("memory", formatNumber(data.memory, 0, "%"));
	this.set("network_card", formatNumber(data.network_card, 2, "%"));
	
}

var probe_w = 340, probe_h = 160, probe_r = 10;
var probe_textsize = 10;
var probe_textcolor = "#6B238E";
var probe_table_x = 270;
var probe_table_y = 130;

customnode_probe.prototype = 
{
    _showDetail: false,
    iconSize: {width: 23},
    shape: Q.Shapes.getRect(-probe_w/2, -probe_h/2, probe_w, probe_h, probe_r, probe_r),
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
            ui.fontSize = probe_textsize;
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

		
        addUIAt(this, new Q.LabelUI("设备名:"), 5, 10).fontSize = probe_textsize;
		addUIAt(this, new Q.LabelUI(name), 55, 10).color = probe_textcolor;
		
		addUIAt(this, new Q.LabelUI("设备ID:"), 5, 30).fontSize = probe_textsize;
		addUIAt(this, new Q.LabelUI(id), 55, 30).color = probe_textcolor;
		
        addUIAt(this, new Q.LabelUI("管理IP:"), 5, 50).fontSize = probe_textsize;
		addUIAt(this, new Q.LabelUI(), 55, 50, "managerIp").color = probe_textcolor;
		
		addUIAt(this, new Q.LabelUI("设备类型:"), 5, 70).fontSize = probe_textsize;
		addUIAt(this, new Q.LabelUI(), 65, 70, "equip_type").color = probe_textcolor;
		
		addUIAt(this, new Q.LabelUI("探针类型:"), 5, 90).fontSize = probe_textsize;
		addUIAt(this, new Q.LabelUI(), 65, 90, "probe_type").color = probe_textcolor;
        
		
		
		addUIAt(this, new Q.LabelUI("CPU:"), 5, 110).fontSize = probe_textsize;
		addUIAt(this, new Q.LabelUI(), 40, 110, "cpu").color = probe_textcolor;
        addUIAt(this, new Q.LabelUI("MEM:"), 95, 110).fontSize = probe_textsize;
		addUIAt(this, new Q.LabelUI(), 130, 110, "memory").color = probe_textcolor;
		addUIAt(this, new Q.LabelUI("网卡:"), 185, 110).fontSize = probe_textsize;
		addUIAt(this, new Q.LabelUI(), 220, 110, "network_card").color = probe_textcolor;
		
		
		
		var button = new Q.LabelUI("更多信息");
		button.border = 1;
		button.padding = new Q.Insets(2, 5);
		button.backgroundColor = "#FFFFFF";
		button.color = "#000000";
		button.fontSize = probe_textsize;
		addUIAt(this, button, probe_table_x, probe_table_y);
		
		var tableUI = new TableUI();
		tableUI.backgroundColor = '#EAEDF4';
		addUIAt(this, tableUI, 5, 150, "tableData");
		
		
		
		var uis = this.bindingUIs;
        if(uis){
            uis.forEach(function(ui){
                ui.ui.visible = false;
				//ui.ui.fontsize = probe_textsize;
            });
        }
    }
};
Q.extend(customnode_probe, Q.Node);

Object.defineProperties(customnode_probe.prototype, {
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

function createCustomNode_probe(x, y, icon, equip_type, name, id, managerIp, probe_type, cpu, memory, network_card){
    var node = new customnode_probe(x, y, name, id, icon, {"managerIp": managerIp, "equip_type": equip_type, "probe_type": probe_type, "cpu": cpu * 100, "memory": memory * 100, "network_card": network_card * 100});
    return node;
}