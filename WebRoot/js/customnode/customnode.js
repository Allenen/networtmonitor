
function customnode(x, y, name, id, image, data){
    Q.doSuperConstructor(this, customnode);
	this.x = x;
	this.y = y;
	
    this.init(name, id, image);
	this.set("managerIp", data.managerIp);
	this.set("equip_type", data.equip_type);
    this.set("area_unit", data.area_unit);
    this.set("keep_unit", data.keep_unit);
	
}

var node_w = 200, node_h = 140, node_r = 10;
var node_textsize = 10;
var node_textcolor = "#6B238E";
var node_table_x = 130;
var node_table_y = 120;
customnode.prototype = 
{
    _showDetail: false,
    iconSize: {width: 23},
    shape: Q.Shapes.getRect(-node_w/2, -node_h/2, node_w, node_h, node_r, node_r),
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
            ui.fontSize = node_textsize;
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

		var s = 10, l = 55, r = 5;
        addUIAt(this, new Q.LabelUI("设备名:"), r, s).fontSize = node_textsize;
		addUIAt(this, new Q.LabelUI(name), l, s).color = node_textcolor;
		s += 20;
        addUIAt(this, new Q.LabelUI("设备ID:"), r, s).fontSize = node_textsize;
		addUIAt(this, new Q.LabelUI(id), l, s).color = node_textcolor;
		s += 20;
        addUIAt(this, new Q.LabelUI("管理IP:"), r, s).fontSize = node_textsize;
		addUIAt(this, new Q.LabelUI(), l, s, "managerIp").color = node_textcolor;
		s += 20;
		l += 10;
		addUIAt(this, new Q.LabelUI("设备类型:"),r, s).fontSize = node_textsize;
		addUIAt(this, new Q.LabelUI(), l, s, "equip_type").color = node_textcolor;
		s += 20;
		addUIAt(this, new Q.LabelUI("归属单位:"), r, s).fontSize = node_textsize;
		addUIAt(this, new Q.LabelUI(), l, s, "area_unit").color = node_textcolor;
		s += 20;
		addUIAt(this, new Q.LabelUI("维护单位:"), r, s).fontSize = node_textsize;
		addUIAt(this, new Q.LabelUI(), l, s, "keep_unit").color = node_textcolor;
		
		
		var button = new Q.LabelUI("更多信息");
		button.border = 1;
		button.padding = new Q.Insets(2, 5);
		button.backgroundColor = "#FFFFFF";
		button.color = "#000000";
		button.fontSize = node_textsize;
		addUIAt(this, button, node_table_x, node_table_y);
		
		
		var uis = this.bindingUIs;
        if(uis){
            uis.forEach(function(ui){
                ui.ui.visible = false;
				//ui.ui.fontsize = node_textsize;
            });
        }
    }
};
Q.extend(customnode, Q.Node);

Object.defineProperties(customnode.prototype, {
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

function createCustomNode(x, y, icon, equip_type, name, id, managerIp, area_unit, keep_unit){
    var server = new customnode(x, y, name, id, icon, {"managerIp": managerIp, "equip_type": equip_type, "area_unit": area_unit, "keep_unit": keep_unit});
    return server;
}