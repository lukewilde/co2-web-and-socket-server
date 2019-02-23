function timestampToDayRatio(timestamp) {
  const date = new Date(timestamp)
  return date.getHours() + (date.getMinutes() / 60)
}

function toTime(timestamp) {
  return new Date(timestamp)
}

let xScale = null
let yScale = null

function setScales (co2Data) {
  const minDate = d3.min(co2Data.map((reading) => toTime(reading.timestamp)))
  const maxDate = d3.max(co2Data.map((reading) => toTime(reading.timestamp)))
  xScale = d3.scaleTime().domain([minDate, maxDate]).range([0, width])

  const minCo2 = d3.min(co2Data.map((reading) => +reading.co2))
  const maxCo2 = d3.max(co2Data.map((reading) => +reading.co2))
  yScale = d3.scaleLinear().domain([minCo2 - 60, maxCo2]).range([height, 0])
}

let line = null

const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
}
const width = (window.innerWidth - 100) - margin.left - margin.right
const height = (window.innerHeight - 200) - margin.top - margin.bottom

const d3 = window.d3

window.graph = {
  init: (co2Data) => {
    setScales(co2Data)

    line = d3.line()
      .x((d, i) => xScale(toTime(d.timestamp)))
      .y((d) => yScale(d.co2))

    const svg = d3.select('body')
      .append('svg')
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
  },

  update: (co2Data) => {
    const svg = d3.select('svg')

    const minDate = d3.min(co2Data.map((reading) => toTime(reading.timestamp)))
    const maxDate = d3.max(co2Data.map((reading) => toTime(reading.timestamp)))
    xScale.domain([minDate, maxDate]).range([0, width])

    const minCo2 = d3.min(co2Data.map((reading) => +reading.co2))
    const maxCo2 = d3.max(co2Data.map((reading) => +reading.co2))
    yScale.domain([minCo2 - 60, maxCo2]).range([height, 0])

    svg.select('.line')
      .attr('d', (d) => line(co2Data))

    svg.select('.x.axis')
      .call(xScale)

    svg.select('.y.axis')
      .call(yScale)
  }
}
