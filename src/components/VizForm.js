import React from 'react'
import * as d3 from 'd3';
import { useD3 } from './useD3';

const colorScale = d3.scaleOrdinal()
.domain(["outside","device","space"])
.range(['#fbb4ae','#b3cde3','#ccebc5']);

export default function VizForm(props) {
    const {data} = props;
    console.log("viz",data);
    const ref = useD3(
        (svg) => {
          const height = 700;
          const width = 700;
          const margin = { top: 20, right: 20, bottom: 30, left: 40 };
          const links_spaces = data.edges.map(d => Object.create(d));
          const links_output = data.links.map(d => Object.create(d));
          
          const simulation = d3.forceSimulation(data.vertices)
                .force("spring", d3.forceLink(data.edges.concat(data.links))
                       .id(v => v.name)
                       .distance(v => v.distance*10) // scaling the distance by a factor of 4 to cover the svg
          
                      )
                // .force("charge", d3.forceManyBody().strength(-100))
                .force("center", d3.forceCenter(width/2, height/2))
                .force("collide", d3.forceCollide(40));
            
            
            // invalidation.then(() => sim.stop()); //Terminates old simulation before this cell is re-run.


          const drag = simulation => {
            function dragstarted(event) {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              event.subject.fx = event.subject.x;
              event.subject.fy = event.subject.y;
            }
            function dragged(event) {
              event.subject.fx = event.x;
              event.subject.fy = event.y;
            }
            function dragended(event) {
              if (!event.active) simulation.alphaTarget(0);
              event.subject.fx = null;
              event.subject.fy = null;
            }
            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
          }
          function linkArc(d) {
            const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
            return `
              M${d.source.x},${d.source.y}
              A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
            `;
          }
          const types = [1,2,3,4]
         // Per-type markers, as they don't inherit styles.
         svg.append('defs').append('marker')
         .attr("id",'arrowhead')
         .attr('viewBox','-0 -5 10 10') //the bound of the SVG viewport for the current SVG fragment. defines a coordinate system 10 wide and 10 high starting on (0,-5)
          .attr('refX',15) // x coordinate for the reference point of the marker. If circle is bigger, this need to be bigger.
          .attr('refY',-0.5)
          .attr('orient','auto')
             .attr('markerWidth',6)
             .attr('markerHeight',6)
             .attr('xoverflow','visible')
         .append('svg:path')
         .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
         .attr('fill', 'black')
         .style('stroke','black');
          
          // Map nodes to circles
          var node = svg.selectAll(".node")
            .data(data.vertices)
            .enter().append("g")
            .attr("class", function (d) {
                if (d.group === "space") {
                   return "space node";
                } else {
                   return "device node";
                }
            })
            .call(drag(simulation));
          
            node.filter(function(d){
                if (d.group==='space'){return d}
                }).append("rect")
              .attr("width", 40)
              .attr("height", 40)
              .attr('fill',  d => colorScale(d.group))
              .style('stroke',d=> d.attacked == true ? 'red' : 'black')
              .attr("class", function (d) {
              return "node type" + d.group
          });
            node.filter(function(d){
                if (d.group==='device' || d.group ==='outside'){return d}
                }).append("circle")
              .attr("class", function (d) {
              return "node type" + d.group
          })
              .attr("r", 25)
              .attr("fill", d => colorScale(d.group))
              .style('stroke',d=> d.attacked == true ? 'red' : 'black')

         const link_output = svg.append("g")
              .attr("fill", "none")
              .attr("stroke-width", 2)
            .selectAll("path")
            .data(links_output)
            .join("path")
              .attr("stroke", "black")
              .attr("marker-end", 'url(#arrowhead)');
          
          let link = svg.append("g")
              .attr("stroke", "#999")
              .attr("stroke-opacity", 1)
            .selectAll("line")
            .data(links_spaces)
            .join("line")
            // .style("stroke",d=> d.group == 3? "green":"grey")
            .style("stroke","grey")
            .style("stroke-dasharray", d => d.group == 2 ? 4 : 0)
              .attr("stroke-width", d=>d.group===3 ? 0.5:1.5)
            .style("pointer-events", "none");
          
            link.filter((function(d){
                if (d.group == 3){return d}
              })).attr("marker-end", 'url(#arrowhead)');
          
            const edgepaths = svg.selectAll(".edgepath") //make path go along with the link provide position for link labels
                    .data(data.links)
                    .enter()
                    .append('path')
                    .attr('class', 'edgepath')
                    .attr('fill-opacity', 0)
                    .attr('stroke-opacity', 0)
                    .attr('id', function (d, i) {return 'edgepath' + i})
                    .style("pointer-events", "none");
            
            const edgelabels = svg.selectAll(".edgelabel")
                    .data(data.links)
                    .enter()
                    .append('text')
                    .style("pointer-events", "none")
                    .attr('class', 'edgelabel')
                    .attr('id', function (d, i) {return 'edgelabel' + i})
                    .attr('font-size', 14)
                    .attr('fill', '#aaa');
            
            edgelabels.append('textPath') //To render text along the shape of a <path>, enclose the text in a <textPath> element that has an href attribute with a reference to the <path> element.
                .attr('xlink:href', function (d, i) {return '#edgepath' + i})
                .style("text-anchor", "middle")
                .style("pointer-events", "none")
                .attr("startOffset", "50%")
                .text(d => d.attack);
            
            
            const texts_widgets = svg
                .selectAll(".id")
                .data(data.vertices)
                .enter()
                .append("text")
                .attr("class", "labels")
                .attr("font-family", "bebas neue")
                .attr("font-size", 13)
                .attr("text-anchor", "middle")
                .attr("dy", "0.35em")
                .style('fill', 'black')
                .attr("id", d => d.id)
                .text(d => d.name)
                .call(drag(simulation));

            // Callback after every iteration of the simulation
            simulation.on("tick", () => {
                // Use D3 here to modify DOM objects based on the updated graph vertices' x,y from the simulation...
                // node.attr('cx', v => v.x).attr('cy', v => v.y);
                node.attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });
                texts_widgets.attr("x", d => d.x).attr("y", d => d.y);
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);
                link_output.attr("d", linkArc);  
                
                edgepaths.attr('d', d => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y);
                
                
            });
            simulation.on('tick')() 
        }//end
      );
    
      return (
        <svg
          ref={ref}
          style={{
            height: 700,
            width: "100%",
            marginRight: "0px",
            marginLeft: "0px",
          }}
        >
          <g className="plot-area" />
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      );
    }
    

