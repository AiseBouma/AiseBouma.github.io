
function add_svg_helper_methods(chart)
{
  chart.svg.add_rect = function(x, y, width, height, stroke = '#000000', strokewidth = 1, fill = '#ffffff')
  {
    let rect = document.createElementNS(chart.svgns, 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('stroke', stroke);
    rect.setAttribute('stroke-width', strokewidth);
    rect.setAttribute('fill', fill);
    this.appendChild(rect);
    return rect;
  } 
  
  chart.svg.add_text = function(x, y, pos, text, stroke = '#000000', fontsize = 14, fontfamily = 'Arial,Helvetica', strokewidth = 0)
  {
    let svgtext = document.createElementNS(chart.svgns, 'text');
    svgtext.setAttribute('x', x);
    svgtext.setAttribute('y', y);
    svgtext.setAttribute('text-anchor', pos);
    svgtext.innerHTML = text;
    svgtext.setAttribute('stroke', stroke);
    svgtext.setAttribute('stroke-width', strokewidth);
    svgtext.setAttribute('fill', stroke);
    svgtext.setAttribute('font-size', fontsize);
    svgtext.setAttribute('font-family', fontfamily);
    this.appendChild(svgtext);
    return svgtext;
  }
  
  chart.svg.add_line = function(x1, y1, x2, y2, stroke = '#000000', strokewidth = 1)
  {
    let line = document.createElementNS(chart.svgns, 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', stroke);
    line.setAttribute('stroke-width', strokewidth);
    this.appendChild(line);
    return line;
  }
  
  chart.svg.add_polyline = function(points, stroke = '#000000', strokewidth = 1, fill = 'none')
  {
    let polyline = document.createElementNS(chart.svgns, 'polyline');
    polyline.setAttribute('points', points);
    polyline.setAttribute('stroke', stroke);
    polyline.setAttribute('stroke-width', strokewidth);
    polyline.setAttribute('fill', fill);
    this.appendChild(polyline);
    return polyline;
  }

  chart.svg.add_path = function(d, stroke = '#000000', strokewidth = 1, fill = 'none')
  {
    let path = document.createElementNS(chart.svgns, 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', strokewidth);
    path.setAttribute('fill', fill);
    this.appendChild(path);
    return path;
  }
  
  chart.svg.add_point = function(x, y, r, color)
  {
    let circle = document.createElementNS(chart.svgns, 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', color);
    this.appendChild(circle);
    return circle;
  }
}  



function createMultiseriesLineChart(svg, inputfile = null, callback = null)
{
  const svgns = "http://www.w3.org/2000/svg";
  var i,j;
  
  // create object with default values
  let chart = 
  {
    debug: false,
    svg: svg,
    svgns: svgns,
    data: null,
    calculated: {},
    chart_x: 0,
    chart_y: 0,
    chart_width: 1000,
    chart_height: 600,
    chart_background_color: '#ffffff',
    chart_right_inside_margin: 10,
    title_text: '',
    title_position: 'middle',
    title_top_margin: 3,
    title_horizontal_margin: 3,
    title_color: '#000000',
    title_font_size: 20,
    title_font_family: 'Arial, Helvetica, sans-serif',
    title_font_weight: 0,    
    axisl_title_text: '',
    axisl_title_position: 'middle',
    axisl_title_left_margin: 3,
    axisl_title_vertical_margin: 3,
    axisl_title_color: '#000000',
    axisl_title_font_size: 14,
    axisl_title_font_weight: 0,
    axisl_title_font_family: 'Arial, Helvetica, sans-serif',    
    axisb_title_text: '',
    axisb_title_position: 'middle',
    axisb_title_bottom_margin: 8,
    axisb_title_horizontal_margin: 3,
    axisb_title_color: '#000000',
    axisb_title_font_size: 14,
    axisb_title_font_weight: 0,
    axisb_title_font_family: 'Arial, Helvetica, sans-serif',
    legend_position: 'top',
    legend_bg_color: '#ffffff',
    legend_vertical_margin: 10,   
    legend_left_margin: 'a',
    legend_align: 'center',
    legend_line_length: 25,
    legend_line_right_margin: 5,
    legend_vertical_inside_margin: 15,
    legend_horizontal_inside_margin: 15,
    legend_font: 'Arial, Helvetica, sans-serif',
    legend_font_size: 14,
    legend_font_color: '#000000',
    axisl_top_margin: 5,
    axisl_color: '#000000',
    axisl_thickness: 1,
    axisl_minimum: 'a',
    axisl_maximum: 'a',
    axisl_ticks_interval: 'a',
    axisl_ticks_color: '#000000',
    axisl_ticks_thickness: 1,
    axisl_ticks_length: 5,
    axisl_ticks_left_margin: 5,
    axisl_ticks_position: 'left',
    axisl_tick_labels_font: 'Arial, Helvetica, sans-serif',
    axisl_tick_labels_font_size: 14,
    axisl_tick_labels_font_color: '#000000',
    axisl_tick_labels_position: 'end',
    axisl_tick_labels_left_margin: 15,
    axisb_color: '#000000',
    axisb_data_type: 'number',
    axisb_thickness: 1,
    axisb_minimum: 'a',
    axisb_maximum: 'a',
    axisb_ticks_interval: 'a',
    axisb_ticks_color: '#000000',
    axisb_ticks_thickness: 1,
    axisb_ticks_length: 5,
    axisb_ticks_units: 'y',
    axisb_ticks_bottom_margin: 5,
    axisb_ticks_position: 'bottom',
    axisb_tick_labels_format: '',
    axisb_tick_labels_locale: 'en',
    axisb_tick_labels_font: 'Arial, Helvetica, sans-serif',
    axisb_tick_labels_font_size: 14,
    axisb_tick_labels_font_color: '#000000',
    axisb_tick_labels_position: 'middle',
    axisb_tick_labels_bottom_margin: 15,
    series_colors: '#ff0000;#00ff00;#0000ff;#ffff00;#ff00ff;#00ffff;#808080;#ff8000;#008040;#b9b9ff;#804000;#ff80c0;#808000;#800080;#ff8080;#408080;#0000a0;#ffffbf;#400080;#0080ff',
    series_line_thickness: 2,
    series_line_smoothing: 0.2,
    series_point_size: 0,
    area_bg_color: '#ffffff',
    support_line_thickness: 0,
    support_line_thickness_units: 'pixels',
    support_line_color: '#000000',
        
    set_attribute(attribute_name, attribute_value)
    {
      this[attribute_name] = attribute_value;
      this.redraw();
    },  
  
    redraw()
    {
      this.log("method redraw called");
      // remove previous graph, if any
      while(this.svg.childNodes.length > 0)
      {  
        this.svg.removeChild(svg.firstChild);
      }
      
      this.svg.setAttribute('width', this.chart_width);
      this.svg.setAttribute('height', this.chart_height);
      
      this.svg_chart_rect = this.svg.add_rect(this.chart_x, 
                                              this.chart_y,
                                              this.chart_width,
                                              this.chart_height,
                                              this.chart_background_color,
                                              0,
                                              this.chart_background_color);
                                          
      if (this.title_text == "")
      {
        this.calculated.ypos_bottom_title = 0;
      }
      else
      {
        let xpos = Math.round(this.chart_width / 2);
        if (this.title_position == 'start')
        {
          xpos = this.title_horizontal_margin;
        }          
        else if (this.title_position == 'end')
        {
          xpos = this.chart_width - this.title_horizontal_margin;
        }
        this.svg_title = this.svg.add_text(xpos,
                                           this.chart_height - (this.title_top_margin + this.title_font_size),
                                           this.title_position,
                                           this.title_text,
                                           this.title_color,
                                           this.title_font_size,
                                           this.title_font_family,
                                           this.title_font_weight);
        let bbox = this.svg_title.getBBox();
        this.calculated.ypos_bottom_title = Math.round(bbox.height + Number(this.title_top_margin));
        
        // position title relative to its real height
        this.svg_title.setAttribute('y', this.calculated.ypos_bottom_title);  
      }
      
      if (this.axisl_title_text == "")
      {
        this.calculated.xpos_right_axisl_title = 0;
      }
      else
      {
        let ypos = Math.round(this.chart_height / 2);
        if (this.axisl_title_position == 'start')
        {
          ypos = this.chart_height - this.axisl_title_vertical_margin;
        }          
        else if (this.axisl_title_position == 'end')
        {
          ypos = this.axisl_title_vertical_margin;
        }
        this.svg_axisl_title = this.svg.add_text(Number(this.axisl_title_left_margin) + this.axisl_title_font_size,
                                                 ypos,
                                                 this.axisl_title_position,
                                                 this.axisl_title_text,
                                                 this.axisl_title_color,
                                                 this.axisl_title_font_size,
                                                 this.axisl_title_font_family,
                                                 this.axisl_title_font_weight);
        
        let bbox = this.svg_axisl_title.getBBox();
        this.calculated.xpos_right_axisl_title = Math.round(bbox.height + Number(this.axisl_title_left_margin));
        
        // position title relative to its real height
        this.svg_axisl_title.setAttribute('x', this.calculated.xpos_right_axisl_title);  
        
        this.svg_axisl_title.setAttribute('transform', 'rotate(270, ' + this.calculated.xpos_right_axisl_title + ',' + ypos + ')');
      }
      
      if (this.axisb_title_text == "")
      {
        this.calculated.ypos_top_axisb_title = this.chart_height;
      }
      else
      {
        let xpos = Math.round(this.chart_width / 2);
        if (this.axisb_title_position == 'start')
        {
          xpos = this.axisb_title_horizontal_margin;
        }          
        else if (this.axisb_title_position == 'end')
        {
          xpos = this.chart_width - this.axisb_title_horizontal_margin;
        }
        this.svg_axisb_title = this.svg.add_text(xpos,
                                                 this.chart_height - Number(this.axisb_title_bottom_margin),
                                                 this.axisb_title_position,
                                                 this.axisb_title_text,
                                                 this.axisb_title_color,
                                                 this.axisb_title_font_size,
                                                 this.axisb_title_font_family,
                                                 this.axisb_title_font_weight);
        
        let bbox = this.svg_axisb_title.getBBox();
        this.calculated.ypos_top_axisb_title = this.chart_height - (Math.round(bbox.height + Number(this.axisb_title_bottom_margin)));
      }  


      if (this.data)
      {  
        this.log("process data");
        // unformat the data
        this.calculated.data = [];
        for (i = 0; i < this.data.length; i++)
        {
          this.calculated.data[i] = [];
          for (j = 0; j < this.data[i].length; j++)
          {
            if ((i > 0) && (j == 0) && (this.axisb_data_type == 'datetime'))
            {
              let dt = moment(this.data[i][j], this.data[0][0]);
              if (!dt.isValid())
              {  
                let dt = moment(this.data[i][j]);
                if (!dt.isValid())
                {  
                  this.calculated.data[i][j] = null;
                }
                else
                {
                  this.calculated.data[i][j] = Number(dt.format('x'));
                }
              }
              else
              {
                this.calculated.data[i][j] = Number(dt.format('x'));
              }                
            }
            else
            {
              this.calculated.data[i][j] = this.data[i][j];
            }              
          }
        }

        this.log("determine mins and maxs");
        // first determine bottom axis start and end
        if (this.axisb_minimum != 'a')
        {
          this.calculated.start = this.axisb_minimum;
        }
        else
        {          
          this.calculated.start = null;
          for (i = 1; i < this.calculated.data.length; i++)
          {
            let row = this.calculated.data[i];
            if (this.calculated.start === null)
            {
              this.calculated.start = row[0];
            }        
            else
            {
              this.calculated.start = Math.min(this.calculated.start, row[0]);
            }
          }
        }  

        if (this.axisb_maximum != 'a')
        {
          this.calculated.end = this.axisb_maximum;
        }
        else
        {        
          this.calculated.end = null;    
          for (i = 1; i < this.calculated.data.length; i++)
          {
            let row = this.calculated.data[i];
            if (this.calculated.end === null)
            {
              this.calculated.end = row[0];
            }        
            else
            {
              this.calculated.end = Math.max(this.calculated.end, row[0]);          
            }
          }  
        } 
        
        if (this.calculated.end < this.calculated.start)
        {
          let temp = this.calculated.end;
          this.calculated.end = this.calculated.start;
          this.calculated.start = temp;
        }          
        
        // determine left axis minimum and maximum
        // in case of automatic only take into account points that are within the bottom axis range
        if (this.axisl_minimum != 'a')
        {
          this.calculated.minimum = this.axisl_minimum;
        }  
        else
        {
          let row = null;
          this.calculated.minimum = null;

          for (i = 1; i < this.calculated.data.length; i++)
          {
            row = this.calculated.data[i];
            if ((row[0] >= this.calculated.start) && (row[0] <= this.calculated.end))
            {  
              for (j = 1; j < row.length; j++)
              {  
                if (this.calculated.minimum === null)
                {
                  this.calculated.minimum = row[j];
                }        
                else
                {
                  this.calculated.minimum = Math.min(this.calculated.minimum, row[j]);
                }
              }
            }  
          }
        }  
        if (this.axisl_maximum != 'a')
        {
          this.calculated.maximum = this.axisl_maximum;
        }  
        else
        {
          let row = null;
          this.calculated.maximum = null;

          for (i = 1; i < this.calculated.data.length; i++)
          {
            row = this.calculated.data[i];
            if ((row[0] >= this.calculated.start) && (row[0] <= this.calculated.end))
            {
              for (j = 1; j < row.length; j++)
              {  
                if (this.calculated.maximum === null)
                {
                  this.calculated.maximum = row[j];
                }        
                else
                {
                  this.calculated.maximum = Math.max(this.calculated.maximum, row[j]);
                }
              }
            }  
          }
        }          

        if (this.calculated.maximum < this.calculated.minimum)
        {
          let temp = this.calculated.maximum;
          this.calculated.maximum = this.calculated.minimum;
          this.calculated.minimum = temp;
        }  
        
        // test maximum tick label length with 100 labels
        
        this.log("test size of labels left axis");
        let Y_range_per_tick = this.find_nice_tick_range((this.calculated.maximum - this.calculated.minimum) / 100);
        
        let minimum_tick = Math.floor(this.calculated.minimum / Y_range_per_tick) * Y_range_per_tick;
        let y_ticks = [];
        y_ticks[0] = minimum_tick;
        var tick = minimum_tick;
        while (tick < this.calculated.maximum)
        {
          tick = tick + Y_range_per_tick;
          y_ticks.push(tick);
        }
        let precision = 0;
        // calculate precision 
        if (Math.abs(Y_range_per_tick) < 1)
        {
          let factor = Math.round(1 / Math.abs(Y_range_per_tick)) - 1; // 0.01 -> 99
          let factorstr = "" + factor;
          precision = factorstr.length;
        }

        this.calculated.max_width_axisl_tick_labels = 0;
        this.calculated.max_height_axisl_tick_labels = 0;
        
        for (i = 0; i < y_ticks.length; i++)
        {
          // write out the labels to measure their length
          let temp_label = this.svg.add_text(0,
                                             20,
                                             'start',
                                             y_ticks[i].toFixed(precision),
                                             this.chart_background_color,
                                             this.axisl_tick_labels_font_size,
                                             this.axisl_tick_labels_font);
      
          let bbox = temp_label.getBBox();
          this.calculated.max_width_axisl_tick_labels = Math.max(this.calculated.max_width_axisl_tick_labels, bbox.width);
          this.calculated.max_height_axisl_tick_labels = Math.max(this.calculated.max_height_axisl_tick_labels, bbox.height);
          temp_label.remove();
        }
        let tick_space_left_of_axis = 0;
        if (this.axisl_ticks_position == 'left')
        {
          tick_space_left_of_axis = this.axisl_ticks_length;
        }  
        if (this.axisl_ticks_position == 'center')
        {
          tick_space_left_of_axis = (this.axisl_ticks_length - this.axisl_thickness)  / 2;
        }  
        this.calculated.legend_left_margin = Math.ceil(this.calculated.xpos_right_axisl_title + 
                                                       this.axisl_tick_labels_left_margin +
                                                       this.calculated.max_width_axisl_tick_labels + 
                                                       this.axisl_ticks_left_margin +
                                                       tick_space_left_of_axis +
                                                       this.axisl_thickness);
        this.calculated.axisl_xpos =  this.calculated.legend_left_margin - Math.round(this.axisl_thickness / 2);                                              

        if (this.legend_left_margin != 'a')
        { 
          this.calculated.legend_left_margin = Number(this.legend_left_margin);      
        }
        // calculate maximum legend width   
        let max_legend_width = this.chart_width - (this.chart_right_inside_margin + this.calculated.legend_left_margin);

        // draw legend box
        this.log("draw legend box");
        let top_legend_box = this.calculated.ypos_bottom_title + this.legend_vertical_margin;
        this.svg_legend_rect = this.svg.add_rect(this.calculated.legend_left_margin, 
                                                 top_legend_box,
                                                 max_legend_width,
                                                 100,
                                                 this.legend_bg_color,
                                                 0,
                                                 this.legend_bg_color);

        
        // draw serie labels to get their actual height
        let serielabels = [];
        let max_label_height = 0;
        for (i = 1; i < this.calculated.data[0].length; i++)
        {
          let svg_serielabel = this.svg.add_text(50*i,
                                                 100,
                                                 'start',
                                                 this.calculated.data[0][i],
                                                 this.legend_font_color,
                                                 this.legend_font_size,
                                                 this.legend_font);
          let bbox = svg_serielabel.getBBox();
          let serielabel_obj = {svg_serielabel: svg_serielabel, serielabel_bbox: bbox};
          if (bbox.height > max_label_height)
          {
            max_label_height = bbox.height;
          }            
          serielabels.push(serielabel_obj);        
        }
        max_label_height = Math.round(max_label_height);
        
        let nr_of_serielabel_rows = 1;
        let nr_of_rows_found = false;
        let max_col_widths = [];
        let total_width = 0;
        let max_nr_of_labels_per_row = 0;
        
        while (!nr_of_rows_found)
        {
          // increase number of rows until the maximum row width is smaller then the available space
          
          max_nr_of_labels_per_row = Math.ceil(serielabels.length / nr_of_serielabel_rows);
          max_col_widths = [];

          for (i = 0; i < max_nr_of_labels_per_row; i++)
          {
            max_col_widths[i] = 0;
          }            
          
          // determine maximum width per column
          for (i = 0; i < serielabels.length; i++)
          {  
            let col_width = Math.ceil(serielabels[i].serielabel_bbox.width) + this.legend_line_length + this.legend_line_right_margin + this.legend_horizontal_inside_margin;
            let col_index = i % max_nr_of_labels_per_row;
            if (col_width > max_col_widths[col_index])
            {
              max_col_widths[col_index] = col_width;
            }
          }
          total_width = 0;
          if (this.legend_align == 'center')
          {
            total_width = this.legend_horizontal_inside_margin;
          }  
          for (i = 0; i < max_nr_of_labels_per_row; i++)
          {
            total_width = total_width + max_col_widths[i];
          }
          if ((total_width <= max_legend_width) || (nr_of_serielabel_rows == serielabels.length))
          {
            nr_of_rows_found = true;
          }            
          else
          {
            nr_of_serielabel_rows++;
          }            
        }
        
        // calculate the y pos of the legend box
        if (this.legend_position == 'top')
        {
          this.calculated.top_legend_box = this.calculated.ypos_bottom_title + this.legend_vertical_margin;
        }          
        else
        {
          // legend at bottom
          this.calculated.top_legend_box = this.chart_height - (this.legend_vertical_margin + this.legend_vertical_inside_margin + nr_of_serielabel_rows * (max_label_height + this.legend_vertical_inside_margin));
          this.svg_legend_rect.setAttribute('y', Math.round(this.calculated.top_legend_box));
          if (this.axisb_title_text == "")
          { 
            this.calculated.ypos_top_axisb_title = this.calculated.top_legend_box;
          }
          else
          {  
            this.svg_axisb_title.setAttribute('y', Math.round(this.calculated.top_legend_box - Number(this.axisb_title_bottom_margin)));
            let bbox = this.svg_axisb_title.getBBox();
            this.calculated.ypos_top_axisb_title = Math.round(this.calculated.top_legend_box - (Number(this.axisb_title_bottom_margin) + bbox.height));
          }  
        }
        
        // reposition the series labels in the legend
        let startpos = this.calculated.legend_left_margin + this.legend_horizontal_inside_margin;
        if (this.legend_align == 'center')
        {
          startpos = this.calculated.legend_left_margin +  Math.round((max_legend_width - total_width) / 2) + this.legend_horizontal_inside_margin;
        }          
        if (this.legend_align == 'right')
        {
          startpos = this.calculated.legend_left_margin + (max_legend_width - total_width);
        }
        let xpos = startpos;

        let ypos = this.calculated.top_legend_box + this.legend_vertical_inside_margin + max_label_height; 
        let series_colors = this.series_colors.split(';');
        for (i = 0; i < serielabels.length; i++)
        { 
 
          serielabels[i].svg_serielabel.setAttribute('x', xpos + this.legend_line_length + this.legend_line_right_margin);
          serielabels[i].svg_serielabel.setAttribute('y', ypos);
          serielabels[i].serielabel_bbox = serielabels[i].svg_serielabel.getBBox();
          
          // draw series line in legend
          this.svg.add_line(xpos, 
                            serielabels[i].serielabel_bbox.y + Math.round(max_label_height / 2),
                            xpos + this.legend_line_length,
                            serielabels[i].serielabel_bbox.y + Math.round(max_label_height / 2),
                            series_colors[i],
                            this.series_line_thickness);
          // add point?
          if (this.series_point_size > 0)
          {
            this.svg.add_point(xpos + Math.round(this.legend_line_length / 2), 
                               serielabels[i].serielabel_bbox.y + Math.round(max_label_height / 2),
                               this.series_point_size,
                               series_colors[i]);
          }            
          
          if (((i+1) % max_nr_of_labels_per_row) == 0)
          {
            xpos = startpos;
            ypos = ypos + max_label_height + this.legend_vertical_inside_margin;
          }   
          else
          {            
            xpos = xpos + max_col_widths[i % max_nr_of_labels_per_row];
          }
        } 
        
        // adjust height of legend rectangle
        let bottom_serielabels_text = serielabels[serielabels.length - 1].serielabel_bbox.y + serielabels[serielabels.length - 1].serielabel_bbox.height;
        let bottom_y_serielabel_rect = bottom_serielabels_text + this.legend_vertical_inside_margin;
        this.svg_legend_rect.setAttribute('height', Math.round(bottom_y_serielabel_rect) - this.calculated.top_legend_box);

        // calculate the y pos of the bottom axis
        
        this.log("calculate the y pos of the bottom axis");
        // write out a label to measure it's height
        let temp_label = this.svg.add_text(0,
                                           20,
                                           'start',
                                           'WyMg',
                                           this.chart_background_color,
                                           this.axisb_tick_labels_font_size,
                                           this.axisb_tick_labels_font);
      
        let bbox = temp_label.getBBox();
        this.calculated.max_height_axisb_tick_labels = bbox.height;
        temp_label.remove();
        
        let bottom_tick_to_center_of_axis = this.axisb_thickness / 2;
        if (this.axisb_ticks_position == 'bottom')
        {
          bottom_tick_to_center_of_axis = this.axisb_ticks_length + (this.axisb_thickness / 2);          
        }
        if (this.axisb_ticks_position == 'center')
        {
          bottom_tick_to_center_of_axis = Math.max(this.axisb_ticks_length / 2, this.axisb_thickness / 2);          
        }

        this.calculated.ypos_axisb = Math.round(this.calculated.ypos_top_axisb_title - (this.axisb_tick_labels_bottom_margin + this.calculated.max_height_axisb_tick_labels + this.axisb_ticks_bottom_margin + bottom_tick_to_center_of_axis));
        this.calculated.right_axisb = this.chart_width - this.chart_right_inside_margin;
        
        if (this.legend_position == 'top')
        {
          this.calculated.top_axisl = bottom_y_serielabel_rect + this.axisl_top_margin;
        }          
        else
        {
          // legend at bottom
          this.calculated.top_axisl = this.calculated.ypos_bottom_title + this.axisl_top_margin;
        }
        
        // background color graph area_bg_color
        this.svg.add_rect(this.calculated.axisl_xpos, 
                          this.calculated.top_axisl,
                          this.calculated.right_axisb - this.calculated.axisl_xpos,
                          this.calculated.ypos_axisb - this.calculated.top_axisl,
                          this.area_bg_color,
                          1,
                          this.area_bg_color);  

        this.log("draw axis's");                  
        
        // draw bottom axis
        this.svg_bottom_axis = this.svg.add_line(this.calculated.axisl_xpos, 
                                                 this.calculated.ypos_axisb,
                                                 this.calculated.right_axisb,
                                                 this.calculated.ypos_axisb,
                                                 this.axisb_color,
                                                 this.axisb_thickness);

        // draw left axis
        this.svg_left_axis = this.svg.add_line(this.calculated.axisl_xpos, 
                                               this.calculated.top_axisl,
                                               this.calculated.axisl_xpos,
                                               this.calculated.ypos_axisb,
                                               this.axisl_color,
                                               this.axisl_thickness);
        
        // reposition axis labels
        if ((this.axisl_title_text != "") && (this.axisl_title_position == 'middle'))
        {
          //let xpos = this.svg_axisl_title.getAttribute('x');
          let ypos = Math.round((this.calculated.ypos_axisb + this.calculated.top_axisl) / 2);
          //this.svg_axisl_title.setAttribute('transform', '');
          this.svg_axisl_title.setAttribute('y', ypos);
          this.svg_axisl_title.setAttribute('transform', 'rotate(270, ' + this.calculated.xpos_right_axisl_title + ',' + ypos + ')');
        }
        if ((this.axisb_title_text != "") && (this.axisb_title_position == 'middle'))
        {
          let xpos = Math.round((this.calculated.right_axisb + this.calculated.axisl_xpos) / 2);
          this.log("xpos bottom axis title: " + xpos);
          this.svg_axisb_title.setAttribute('x', xpos);
        }      
        

        
        this.log("calculate ticks left axis");  
        this.log("this.calculated.ypos_axisb: " + this.calculated.ypos_axisb);
        this.log("this.calculated.top_axisl: " + this.calculated.top_axisl);        
        max_nr_of_ticks = Math.max(1, Math.floor((this.calculated.ypos_axisb - this.calculated.top_axisl) / this.calculated.max_height_axisl_tick_labels) - 1);
        min_y_range_per_tick = (this.calculated.maximum - this.calculated.minimum) / max_nr_of_ticks;
        this.log("min_y_range_per_tick: " + min_y_range_per_tick);
        
        if (this.axisl_ticks_interval == 'a')
        {  
          Y_range_per_tick = this.find_nice_tick_range(min_y_range_per_tick);
        }
        else
        {  
          Y_range_per_tick = this.axisl_ticks_interval;
        }
        this.log("Y_range_per_tick: " + Y_range_per_tick);
        
        minimum_tick = Math.floor(this.calculated.minimum / Y_range_per_tick) * Y_range_per_tick;
        y_ticks = [];
        y_ticks[0] = minimum_tick;
        tick = minimum_tick;
        while (tick < this.calculated.maximum)
        {
          tick = tick + Y_range_per_tick;
          y_ticks.push(tick);
        }
        let maximum_tick = tick;
        
        if (Math.abs(Y_range_per_tick) < 1)
        {
          let factor = Math.round(1 / Math.abs(Y_range_per_tick)) - 1; // 0.01 -> 99
          let factorstr = "" + factor;
          precision = factorstr.length;
        }
        else
        {
          precision = 0;
        }
        
        let count_ticks = 0;
        let ypos_bottom_support = -2;
        
        let y_pixels_between_ticks = (this.calculated.ypos_axisb - this.calculated.top_axisl) / (y_ticks.length - 1);
        this.log("draw labels and ticks of left axis");
        for (i = 0; i < y_ticks.length; i++)
        {
          let x_pos_correction = this.calculated.max_width_axisl_tick_labels;
          if (this.axisl_tick_labels_position == 'middle')
          {
            x_pos_correction = Math.round(this.calculated.max_width_axisl_tick_labels / 2);
          }  
          if (this.axisl_tick_labels_position == 'start')
          {
            x_pos_correction = 0;
          }  
          let tick_label = this.svg.add_text(this.calculated.xpos_right_axisl_title + this.axisl_tick_labels_left_margin + x_pos_correction,
                                             Math.round(this.calculated.ypos_axisb - (i * y_pixels_between_ticks)),
                                             this.axisl_tick_labels_position,
                                             y_ticks[i].toFixed(precision),
                                             this.axisl_tick_labels_font_color,
                                             this.axisl_tick_labels_font_size,
                                             this.axisl_tick_labels_font);
          tick_label.setAttribute("alignment-baseline", "middle");                                    

          let tick_start_pos = this.calculated.axisl_xpos - Math.floor(this.axisl_ticks_length / 2);
          let tick_end_pos = tick_start_pos + this.axisl_ticks_length;
          if (this.axisl_ticks_position == 'left')
          {
            tick_start_pos = this.calculated.axisl_xpos - (this.axisl_ticks_length + Math.floor(this.axisl_thickness / 2));
            tick_end_pos = this.calculated.axisl_xpos;
          }  
          if (this.axisl_ticks_position == 'right')
          {
            tick_start_pos = this.calculated.axisl_xpos;
            tick_end_pos = this.calculated.axisl_xpos + (this.axisl_ticks_length + Math.floor(this.axisl_thickness / 2));
          }  
          this.svg.add_line(tick_start_pos,
                            Math.round(this.calculated.ypos_axisb - (i * y_pixels_between_ticks)),
                            tick_end_pos,
                            Math.round(this.calculated.ypos_axisb - (i * y_pixels_between_ticks)),
                            this.axisl_ticks_color,
                            this.axisl_ticks_thickness);
                            
          if (this.support_line_thickness > 0)
          {
            if (this.support_line_thickness_units == 'pixels')
            {
              this.svg.add_line(this.calculated.axisl_xpos + Math.round(this.axisl_thickness / 2),
                                Math.round(this.calculated.ypos_axisb - (i * y_pixels_between_ticks)),
                                this.calculated.right_axisb,
                                Math.round(this.calculated.ypos_axisb - (i * y_pixels_between_ticks)),
                                this.support_line_color,
                                this.support_line_thickness);
            }
            else
            {
              if (count_ticks % this.support_line_thickness == 0)
              {
                if (ypos_bottom_support == -2) // first time do nothing
                {
                  ypos_bottom_support = -1;
                }                  
                else
                {  
                  if (ypos_bottom_support > -1)
                  {
                    // draw support rectangle
                    this.svg.add_rect(this.calculated.axisl_xpos + Math.round(this.axisl_thickness / 2), 
                                      Math.round(this.calculated.ypos_axisb - (i * y_pixels_between_ticks)),
                                      this.calculated.right_axisb - (this.calculated.axisl_xpos + Math.round(this.axisl_thickness / 2)),
                                      ypos_bottom_support - Math.round(this.calculated.ypos_axisb - (i * y_pixels_between_ticks)),
                                      this.support_line_color,
                                      1,
                                      this.support_line_color);
                    ypos_bottom_support = -1;
                  }    
                  else
                  {
                    ypos_bottom_support = Math.round(this.calculated.ypos_axisb - (i * y_pixels_between_ticks));
                  }
                }  
                count_ticks = 0;                
              }
              count_ticks++;              
            }  
          }            
        }        
        

   //     this.calculated.max_width_axisb_tick_labels = 0;
   //     this.calculated.max_height_axisb_tick_labels = 0;
        
// wrong. write 100 test labels instead        
 //       for (i = 1; i < this.calculated.data.length; i++)
 //       {
 //         // write out the labels to measure their length
 //         let temp_label = this.svg.add_text(0,
 //                                            20,
//                                             'start',
//                                             this.calculated.data[i][0],
//                                             this.chart_background_color,
//                                             this.axisb_tick_labels_font_size,
//                                             this.axisb_tick_labels_font);
//          
 //         let bbox = temp_label.getBBox();
//          this.calculated.max_width_axisb_tick_labels = Math.max(this.calculated.max_width_axisb_tick_labels, bbox.width);
 //         this.calculated.max_height_axisb_tick_labels = Math.max(this.calculated.max_height_axisb_tick_labels, bbox.height);
//          temp_label.remove();
 //       }

 
 
 
 
        this.log("calculate ticks bottom axis");
        let X_range_per_tick = this.axisb_ticks_interval;
        if (this.axisb_data_type == 'datetime')
        {
          moment.locale(this.axisb_tick_labels_locale);

               // write out the labels to measure their length
              let label_text = moment(this.calculated.start).format(this.axisb_tick_labels_format);  
              let temp_label = this.svg.add_text(0,
                                                 20,
                                                 'start',
                                                 label_text,
                                                 this.chart_background_color,
                                                 this.axisb_tick_labels_font_size,
                                                 this.axisb_tick_labels_font);
          
              let bbox1 = temp_label.getBBox();
                
              label_text = moment(this.calculated.end).format(this.axisb_tick_labels_format);  
              temp_label = this.svg.add_text(0,
                                                 20,
                                                 'start',
                                                 label_text,
                                                 this.chart_background_color,
                                                 this.axisb_tick_labels_font_size,
                                                 this.axisb_tick_labels_font);
          
              let bbox2 = temp_label.getBBox();
              this.calculated.max_width_axisb_tick_labels = Math.max(bbox1.width, bbox2.width);
              
              temp_label.remove(); 

              let max_nr_of_ticks = Math.max(1, Math.floor((this.calculated.right_axisb - this.calculated.axisl_xpos) / this.calculated.max_width_axisb_tick_labels) - 1); 
              let min_x_range_per_tick = (this.calculated.end - this.calculated.start) / max_nr_of_ticks;
           
              this.calculated.axisb_ticks_interval = this.axisb_ticks_interval;
              this.calculated.axisb_ticks_units = this.axisb_ticks_units;
              if (this.axisb_ticks_interval == 'a')
              {
                X_range_per_tick = this.find_datetime_tick_range(min_x_range_per_tick);
                let range_parts = X_range_per_tick.split(";");
                this.calculated.axisb_ticks_interval = range_parts[0];
                this.calculated.axisb_ticks_units = range_parts[1];
              }  

              if (this.calculated.axisb_ticks_units == 'ms')
              {  
                minimum_tick = Math.floor(this.calculated.start / this.calculated.axisb_ticks_interval) * this.calculated.axisb_ticks_interval;
              }
              if (this.calculated.axisb_ticks_units == 's')
              {  
                minimum_tick = Math.floor(this.calculated.start / (this.calculated.axisb_ticks_interval * 1000)) * this.calculated.axisb_ticks_interval * 1000;
              }                            
              if (this.calculated.axisb_ticks_units == 'm')
              {  
                minimum_tick = Math.floor(this.calculated.start / (this.calculated.axisb_ticks_interval * 60000)) * this.calculated.axisb_ticks_interval * 60000;
              }
              if (this.calculated.axisb_ticks_units == 'h')
              {  
                minimum_tick = Math.floor(this.calculated.start / (this.calculated.axisb_ticks_interval * 3600000)) * this.calculated.axisb_ticks_interval * 3600000;
              }
              if (this.calculated.axisb_ticks_units == 'd')
              {  
                minimum_tick = Math.floor(this.calculated.start / (this.calculated.axisb_ticks_interval * 86400000)) * this.calculated.axisb_ticks_interval * 86400000;
              }
              if (this.calculated.axisb_ticks_units == 'w')
              {  
                let mnt = moment(this.calculated.start);
                mnt.millisecond(0);
                mnt.second(0);
                mnt.minute(0);
                mnt.hour(0);
                mnt.weekday(0);
                minimum_tick = Number(mnt.format('x'));
              }
              if (this.calculated.axisb_ticks_units == 'M')
              {  
                let mnt = moment(this.calculated.start);
                mnt.millisecond(0);
                mnt.second(0);
                mnt.minute(0);
                mnt.hour(0);
                mnt.date(1);
                minimum_tick = Number(mnt.format('x'));
              }              
              if (this.calculated.axisb_ticks_units == 'y')
              {  
                let mnt = moment(this.calculated.start);
                mnt.millisecond(0);
                mnt.second(0);
                mnt.minute(0);
                mnt.hour(0);
                mnt.date(1);
                mnt.month(0);
                mnt.year(Math.floor(mnt.year() / this.calculated.axisb_ticks_interval) * this.calculated.axisb_ticks_interval);
                minimum_tick = Number(mnt.format('x'));
              }    

              x_ticks = [];
              x_ticks[0] = minimum_tick;
              tick = minimum_tick;
              while (tick < this.calculated.end)
              {
                let mnt = moment(tick);
                mnt.add(this.calculated.axisb_ticks_interval, this.calculated.axisb_ticks_units);
                tick = Number(mnt.format('x'));

                x_ticks.push(tick);
              }
              maximum_tick = tick;

              X_range_per_tick = (maximum_tick - minimum_tick) / (x_ticks.length - 1);
              
              // if minimum tick much smaller then start value then increase minimum tick
              if ((minimum_tick + 0.45 * X_range_per_tick) < this.calculated.start)
              {
                x_ticks.shift();
              }                
              
              // if maximum tick is much larger then end then decrease maximum
              if ((maximum_tick - 0.45 * X_range_per_tick) > this.calculated.end)
              {
                x_ticks.pop();
              }               
              minimum_tick = x_ticks[0];
              maximum_tick = x_ticks[x_ticks.length - 1];
              X_range_per_tick = (maximum_tick - minimum_tick) / (x_ticks.length - 1);             
        }
        else
        {  
 
          
          if (this.axisb_ticks_interval == 'a')
          {  
            // test maximum tick label length with 100 labels
            
            X_range_per_tick = this.find_nice_tick_range((this.calculated.end - this.calculated.start) / 100);
            
            minimum_tick = Math.floor(this.calculated.start / X_range_per_tick) * X_range_per_tick;
            let x_ticks = [];
            x_ticks[0] = minimum_tick;
            var tick = minimum_tick;
            while (tick < this.calculated.end)
            {
              tick = tick + X_range_per_tick;
              x_ticks.push(tick);
            }
            precision = 0;
            // calculate precision 
            if (Math.abs(X_range_per_tick) < 1)
            {
              let factor = Math.round(1 / Math.abs(X_range_per_tick)) - 1; // 0.01 -> 99
              let factorstr = "" + factor;
              precision = factorstr.length;
            }

            this.calculated.max_width_axisb_tick_labels = 0;
            this.calculated.max_height_axisb_tick_labels = 0;
            
            for (i = 0; i < x_ticks.length; i++)
            {
              // write out the labels to measure their length
              let label_text = x_ticks[i].toFixed(precision);  
              let temp_label = this.svg.add_text(0,
                                                 20,
                                                 'start',
                                                 label_text,
                                                 this.chart_background_color,
                                                 this.axisb_tick_labels_font_size,
                                                 this.axisb_tick_labels_font);
          
              let bbox = temp_label.getBBox();
              this.calculated.max_width_axisb_tick_labels = Math.max(this.calculated.max_width_axisb_tick_labels, bbox.width);
              this.calculated.max_height_axisb_tick_labels = Math.max(this.calculated.max_height_axisb_tick_labels, bbox.height);
              temp_label.remove();
            } 
            
   
            // now test with optimistic small tick range
            max_nr_of_ticks = Math.floor((this.calculated.right_axisb - this.calculated.axisl_xpos) / this.calculated.max_width_axisb_tick_labels) - 1;
            min_x_range_per_tick = (this.calculated.end - this.calculated.start) / max_nr_of_ticks;
            
            X_test_range_per_tick = this.find_small_tick_range(min_x_range_per_tick);
                      
            minimum_tick = Math.floor(this.calculated.start / X_test_range_per_tick) * X_test_range_per_tick;
            x_ticks = [];
            x_ticks[0] = minimum_tick;
            var tick = minimum_tick;
            while (tick < this.calculated.end)
            {
              tick = tick + X_test_range_per_tick;
              x_ticks.push(tick);
            }
            precision = 0;
            // calculate precision 
            if (Math.abs(X_test_range_per_tick) < 1)
            {
              let factor = Math.round(1 / Math.abs(X_test_range_per_tick)) - 1; // 0.01 -> 99
              let factorstr = "" + factor;
              precision = factorstr.length;
            }

            let max_width_axisb_tick_labels = 0;

            
            for (i = 0; i < x_ticks.length; i++)
            {
              // write out the labels to measure their length
              let label_text = x_ticks[i].toFixed(precision);
              let temp_label = this.svg.add_text(0,
                                                 20,
                                                 'start',
                                                 label_text,
                                                 this.chart_background_color,
                                                 this.axisb_tick_labels_font_size,
                                                 this.axisb_tick_labels_font);
          
              let bbox = temp_label.getBBox();
              max_width_axisb_tick_labels = Math.max(max_width_axisb_tick_labels, bbox.width);
              temp_label.remove();
            } 
   
            let nr_of_ticks = Math.ceil((this.calculated.end - this.calculated.start) / X_test_range_per_tick);
            // Does it fit?
            if ((nr_of_ticks * (max_width_axisb_tick_labels + 3)) < (this.calculated.right_axisb - this.calculated.axisl_xpos)) // minimum 3 pixels between labels
            {
              X_range_per_tick = X_test_range_per_tick;
              this.calculated.max_width_axisb_tick_labels = max_width_axisb_tick_labels;

            }            
            else
            {
              max_nr_of_ticks = Math.floor((this.calculated.right_axisb - this.calculated.axisl_xpos) / this.calculated.max_width_axisb_tick_labels) - 1;
              min_x_range_per_tick = (this.calculated.end - this.calculated.start) / max_nr_of_ticks;
              X_range_per_tick = this.find_nice_tick_range(min_x_range_per_tick);

            }            
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   


          

          }
        
          minimum_tick = Math.floor(this.calculated.start / X_range_per_tick) * X_range_per_tick;
          x_ticks = [];
          x_ticks[0] = minimum_tick;
          tick = minimum_tick;
          while (tick < this.calculated.end)
          {
            tick = tick + X_range_per_tick;
            x_ticks.push(tick);
          }
          maximum_tick = tick;
                
          if (Math.abs(X_range_per_tick) < 1)
          {
            let factor = Math.round(1 / Math.abs(X_range_per_tick)) - 1; // 0.01 -> 99
            let factorstr = "" + factor;
            precision = factorstr.length;
          }
          else
          {
            precision = 0;
          }
        }
        x_pixels_between_ticks = (this.calculated.right_axisb - this.calculated.axisl_xpos) / x_ticks.length;
        for (i = 0; i < x_ticks.length; i++)
        {
          let tick_start_pos = this.calculated.ypos_axisb - Math.floor(this.axisb_ticks_length / 2);
          let tick_end_pos = tick_start_pos + this.axisb_ticks_length;
          if (this.axisb_ticks_position == 'top')
          {
            tick_start_pos = this.calculated.ypos_axisb - (this.axisb_ticks_length + Math.floor(this.axisb_thickness / 2));
            tick_end_pos = this.calculated.ypos_axisb;
          }  
          if (this.axisb_ticks_position == 'bottom')
          {
            tick_start_pos = this.calculated.ypos_axisb;
            tick_end_pos = this.calculated.ypos_axisb + (this.axisb_ticks_length + Math.floor(this.axisb_thickness / 2));
          }  
          let xpos_tick = this.calculated.axisl_xpos + Math.round(x_pixels_between_ticks / 2) + i * x_pixels_between_ticks;
          //let xpos_tick = this.calculated.axisl_xpos + i * x_pixels_between_ticks;
          this.svg.add_line(xpos_tick,
                            tick_start_pos,
                            xpos_tick,
                            tick_end_pos,
                            this.axisb_ticks_color,
                            this.axisb_ticks_thickness);
                            
          let label_text = x_ticks[i].toFixed(precision);
          if (this.axisb_data_type == 'datetime')
          {
            label_text = moment(x_ticks[i]).format(this.axisb_tick_labels_format);               
          }
          this.svg.add_text(xpos_tick, 
                            tick_end_pos + this.axisb_ticks_bottom_margin + this.calculated.max_height_axisb_tick_labels,
                            this.axisb_tick_labels_position,
                            label_text,
                            this.axisb_tick_labels_font_color,
                            this.axisb_tick_labels_font_size,
                            this.axisb_tick_labels_font);
        }

        
        this.log("draw series lines");
        let x_pixel_pervalue = x_pixels_between_ticks / X_range_per_tick; 
        let y_pixel_pervalue = -1 * (y_pixels_between_ticks / Y_range_per_tick); 
        
        for (j = 1; j < serielabels.length + 1; j++)
        {
          let points_str = "";
          let points = [];
          for (i = 1; i < this.calculated.data.length; i++)
          {
            row = this.calculated.data[i];
            if ((row[0] >= this.calculated.start) && (row[0] <= this.calculated.end) && (row[j] >= this.calculated.minimum) && (row[j] <= this.calculated.maximum))
            {  
            let newx = Math.round(this.graph_pos(x_ticks[0], row[0], this.calculated.axisl_xpos + Math.round(x_pixels_between_ticks / 2), x_pixel_pervalue));
            let newy = Math.round(this.graph_pos(y_ticks[0], row[j], this.calculated.ypos_axisb, y_pixel_pervalue));

          //  if ((newx >= this.calculated.axisl_xpos) && (newx <= this.calculated.right_axisb) && (newy <= this.calculated.ypos_axisb) && (newy >= this.calculated.top_axisl))
            
          //  {  
              let newpoint = {x: newx, y: newy};
              points.push(newpoint);
              points_str = points_str + " " + newx + "," + newy;
              // add point?
              if (this.series_point_size > 0)
              {
                this.svg.add_point(newx, 
                                   newy,
                                   this.series_point_size,
                                   series_colors[j-1]);
              }
            }  
          }

          if (this.series_line_smoothing == 0)
          {  
            svg.add_polyline(points_str, series_colors[j-1], this.series_line_thickness);
          }
          else          
          {
            svg.add_path(this.cubicbezier(points, this.series_line_smoothing), series_colors[j-1], this.series_line_thickness); 
          } 
                    
        }


                                               
        
      }        
    }
  }
  
  add_svg_helper_methods(chart);
  
  chart.graph_pos = function(baseval, newval, offset, slope)
  {
    return offset + (newval - baseval) * slope;
  }

  chart.line = function(startpoint, endpoint)
  {
    const lengthX = endpoint.x - startpoint.x;
    const lengthY = endpoint.y - startpoint.y;
  
    return {length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)), angle: Math.atan2(lengthY, lengthX)};
  }
  
  chart.cubicbezier = function(points, smoothing)
  {
    if (points.length < 2)
    {
      return "";
    }
    let command = "M " + points[0].x + "," + points[0].y;
    for (var i = 1; i < points.length; i++)
    {
      if (i == 1)
      {
        var beforeprevious = points[0];
      }
      else
      {
        var beforeprevious = points[i - 2];
      }
      
      // first control point
      
      // opposed-line
      let opposed = this.line(beforeprevious, points[i])
      
      // The control point position is relative to the current point
      let cx = points[i - 1].x + Math.cos(opposed.angle) * opposed.length * smoothing;
      let cy = points[i - 1].y + Math.sin(opposed.angle) * opposed.length * smoothing;
      
      command = command + " C " + cx + "," + cy;
      
      if (i == points.length - 1) // last point
      {
        var next = points[i];
      }
      else
      {
        var next = points[i + 1];
      }
      
      // second control point
      
      // opposed-line
      opposed = this.line(points[i - 1], next)
      
      // The control point position is relative to the current point
      cx = points[i].x + Math.cos(opposed.angle + Math.PI) * opposed.length * smoothing;
      cy = points[i].y + Math.sin(opposed.angle + Math.PI) * opposed.length * smoothing;
      
      command = command + " " + cx + "," + cy + " " + points[i].x + "," + points[i].y;
    }
    return command;
  }
  
  chart.find_datetime_tick_range = function(min_range_per_tick)
  {
    if (min_range_per_tick < 1000)
    {
      return this.find_nice_tick_range(min_range_per_tick) + ";ms";
    }        
    let min_range_seconds = min_range_per_tick / 1000;    
    if (min_range_seconds < 50)
    {
      return this.find_nice_tick_range(min_range_seconds) + ";s";
    }        
    let min_range_minutes = min_range_seconds / 60;    
    if (min_range_minutes < 50)
    {
      return this.find_nice_tick_range(min_range_minutes) + ";m";
    }        
    let min_range_hours = min_range_minutes / 60;    
    if (min_range_hours < 1)
    {
      return "1;h";
    }        
    if (min_range_hours < 2)
    {
      return "2;h";
    }        
    if (min_range_hours < 4)
    {
      return "4;h";
    }
    if (min_range_hours < 12)
    {
      return "12;h";
    }
    let min_range_days = min_range_hours / 24;
    if (min_range_days < 1)
    {
      return "1;d";
    }
    let min_range_weeks = min_range_days / 7;    
    if (min_range_weeks < 3)
    {
      return this.find_nice_tick_range(min_range_weeks) + ";w";
    }
    let min_range_months = min_range_days / 30.5;
    if (min_range_months < 1)
    {
      return "1;M";
    }
    if (min_range_months < 2)
    {
      return "2;M";
    }
    if (min_range_months < 6)
    {
      return "6;M";
    }
    return this.find_nice_tick_range(min_range_days / 365.25) + ";y";
  }
  
  chart.find_nice_tick_range = function(min_range_per_tick)
  {    
    let testval = Math.abs(min_range_per_tick);
    
    // multiply or divide by 10 until value is between 1 and 10
    while (testval < 1 || testval >= 10.001)
    {
      if (testval < 1)
      {
        testval = testval * 10;
      }
      else
      {
        testval = testval / 10;
      }
    }
    let factor = min_range_per_tick / testval;
    // add precision
    if (factor > 1)
    {
      factor = Math.round(factor);
    }
    else
    {
      factor = 1 / Math.round(1 / factor);
    }
    if (testval <= 2)   
    {
      return 2 * factor;
    }
    if (testval <= 5)   
    {
      return 5 * factor;
    }    
    return 10 * factor;
  }
  
  chart.find_small_tick_range = function(min_range_per_tick)
  {
    let testval = Math.abs(min_range_per_tick);
    
    // multiply or divide by 10 until value is between 1 and 10
    while (testval < 1 || testval >= 10.001)
    {
      if (testval < 1)
      {
        testval = testval * 10;
      }
      else
      {
        testval = testval / 10;
      }
    }
    let factor = min_range_per_tick / testval;
    // add precision
    if (factor > 1)
    {
      factor = Math.round(factor);
    }
    else
    {
      factor = 1 / Math.round(1 / factor);
    }
    if (testval <= 2)   
    {
      return factor;
    }
    if (testval <= 5)   
    {
      return 2 * factor;
    }    
    return 5 * factor;
  }
  
  chart.log = function(debugtext)
  {
    if (chart.debug)
    {
      console.log(debugtext);
    }
  }  
  
  if (inputfile)
  {
    $.getJSON(inputfile, function(data)
    {
      // now copy the properties of the input object
      chart = Object.assign(chart, data);
      callback(chart);
    });
    return null;
  }
  
  return chart;  
}  

