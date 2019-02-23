function timestampToDayRatio (timestamp) {
  const date = new Date(timestamp)
  return date.getHours() + (date.getMinutes() / 60)
}

function toTime (timestamp) {
  return new Date(timestamp)
}

window.drawGraph = (co2Data) => {
  const d3 = window.d3

  const margin = { top: 50, right: 50, bottom: 50, left: 50 }
  const width = (window.innerWidth - 100) - margin.left - margin.right
  const height = (window.innerHeight - 200) - margin.top - margin.bottom

  const minDate = d3.min(co2Data.map((reading) => toTime(reading.timestamp)))
  const maxDate = d3.max(co2Data.map((reading) => toTime(reading.timestamp)))
  const xScale = d3.scaleTime().domain([minDate, maxDate]).range([0, width])

  const minCo2 = d3.min(co2Data.map((reading) => +reading.co2))
  const maxCo2 = d3.max(co2Data.map((reading) => +reading.co2))
  const yScale = d3.scaleLinear().domain([minCo2, maxCo2]).range([height, 0])

  const line = d3.line()
    .x((d, i) => xScale(toTime(d.timestamp)))
    .y((d) => yScale(d.co2))
    .curve(d3.curveMonotoneX)

  const svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xScale))

  const labelPosition = {
    x: width / 2,
    y: height + margin.top
  }

  svg.append('text')
    .attr('transform', `translate(${labelPosition.x}, ${labelPosition.y})`)
    .style('text-anchor', 'middle')
    .text('Date')

  svg.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(yScale))

  // text label for the y axis
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Co2 PPM')

  svg.append('path')
    .datum(co2Data)
    .attr('class', 'line')
    .attr('d', line)
}
