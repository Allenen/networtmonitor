var TableUI = function (data) {
    Q.doSuperConstructor(this, TableUI, arguments);
};

var table_rect_width = 80;
var table_rect_height = 25;

TableUI.prototype = {
    cellWidth: table_rect_width,
    cellHeight: table_rect_height,

    measure: function () {
        if (!this.data) {
            this.setMeasuredBounds(0, 0);
            return;
        }
        var width = 0, height = 0;
        if (this.data.header) {
            height += this.cellHeight;
            width = this.data.header.length * this.cellWidth;
        }
        if (this.data.data && this.data.data.length) {
            var rows = this.data.data.length;
            height += rows * this.cellHeight;
            if (!width) {
                width = this.data.data[0].length * this.cellWidth;
            }
        }
        this.setMeasuredBounds(width, height);
    },
    drawCell: function (g, x, y, width, background, align, color, content) {
        var text;
        if (content instanceof Object && !Q.isString(content)) {
            text = '' + content.text;
            color = content.color || color;
            align = content.align || align;
        } else {
            text = '' + content;
        }
		var height = this.cellHeight;
        if (background) {
            g.fillStyle = background;
            g.fillRect(x, y, width, height);
            g.strokeStyle = '#FFF';
            g.strokeRect(x, y, width, height);
        }
        if (align) {
            if(align == 'center'){
                x += width / 2;
            }else if(align == 'right'){
                x += width;
            }
            g.textAlign = align;
        }
        g.textBaseline = 'middle';
        g.fillStyle = color;
        g.fillText(text, x, y + height / 2);
    },
    draw: function (g, scale, selected) {
        if (!this.data) {
            return;
        }
        g.fillStyle = '#EEE';
        //g.fillRect(0, 0, this.originalBounds.width, this.originalBounds.height);

        this.data.header = ["任务号", "任务名称", "目标数"];
		
		var header = this.data.header;
        var data = this.data.data;
        var x = 0, y = 0, i = 0, width = 50;
        var cellWidth = this.cellWidth, cellHeight = this.cellHeight;
        if (header) {
            header.forEach(function (name) {
				width = 50;
				if(i == 1)
					width = 230;
                this.drawCell(g, x, y, width, '#597EB5', 'center', '#FFF', name);
                x += width;
				i ++;
            }.bind(this));
            y+= cellHeight;
        }
        if(data){
            data.forEach(function(row, index){
                x = 0, i = 0;
                var background = index % 2 ? '#EAEDF4' : '#CAD0DF';
				
                row.forEach(function (name) {
					width = 50;
					if(i == 1)
						width = 230;
                    this.drawCell(g, x, y, width, background, 'center', '#555', name);
                    x += width;
					i ++;
                }.bind(this));
                y+= cellHeight;
            }.bind(this));
        }
    }
};
Q.extend(TableUI, Q.BaseUI);