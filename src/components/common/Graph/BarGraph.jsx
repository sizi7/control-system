import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './BarGraph.module.css';

export default function BarChart({ data, width = 600, height = 400 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg
      .selectAll('*')
      .remove()
      .append('defs')
      .append('linearGradient')
      .attr('id', 'barGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%')
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#4a90e2' },
        { offset: '100%', color: '#6fb9f2' },
      ])
      .enter()
      .append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color);

    const margin = { top: 40, right: 20, bottom: 50, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, chartWidth])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([chartHeight, 0]);

    const svgContent = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svgContent
      .append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text');
    //   .attr('transform', 'rotate(-20)')
    //   .style('text-anchor', 'end');

    svgContent.append('g').call(
      d3
        .axisLeft(y)
        .ticks(5)
        .tickFormat((d) => d + '%')
    );

    const tooltip = d3.select('#tooltip');
    if (tooltip.empty()) {
      d3.select('body')
        .append('div')
        .attr('id', 'tooltip')
        .style('position', 'absolute')
        .style('background', 'rgba(0,0,0,0.7)')
        .style('color', '#fff')
        .style('padding', '6px 10px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .style('opacity', 0);
    }

    const bars = svgContent
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.label))
      .attr('width', x.bandwidth())
      .attr('y', chartHeight)
      .attr('height', 0)
      .attr('fill', '#4a90e2')
      .on('mouseover', (event, d) => {
        d3.select('#tooltip')
          .style('opacity', 1)
          .html(`<strong>${d.label}</strong><br/>${d.value}%`);
      })
      .on('mousemove', (event) => {
        d3.select('#tooltip')
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
        d3.select('#tooltip').style('opacity', 0);
      });

    bars
      .transition()
      .duration(800)
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => chartHeight - y(d.value));
  }, [data, width, height]);

  return (
    <svg ref={svgRef} width={width} height={height} className="bar-chart" />
  );
}
