const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
const h = 500;
const w = 800;
const r = 7;
const padding = 70;
let dataset = [];
const dopColor = "rgb(198, 40, 22)";
const noDopColor = "rgb(20, 132, 94)";
const getData = async () => {
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    responseData.forEach((value) => {
      const parsedTime = value.Time.split(":");
      value.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
    });
    return responseData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const createTooltip = () => {
  return d3.select("body").append("div").attr("id", "tooltip");
};
const createSvg = () => {
  return d3.select("body").append("svg").attr("width", w).attr("height", h);
};
const createScales = () => {
  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, (d) => d.Year) - 1,
      d3.max(dataset, (d) => d.Year) + 1,
    ])
    .range([padding, w - padding]);
  const yScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, (d) => d.Time))
    .range([padding, h - padding]);
  return { xScale, yScale };
};
const createCircles = (svg, xScale, yScale, tooltip) => {
  svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d) => yScale(d.Time))
    .attr("data-xvalue", (d) => d.Year)
    .attr("data-yvalue", (d) => d.Time)
    .attr("r", r)
    .on("mouseover", (d) => {
      const event = d3.event;
      tooltip
        .style("opacity", "1")
        .style("display", "block")
        .attr("data-year", d.Year)
        .html(
          `${d.Name}: ${d.Nationality}</br>
      Year: ${d.Year}, Time: ${d.Time.getMinutes()}:${d.Time.getSeconds()}</br>
      ${d.Doping}`
        )
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY + 10 + "px")
        .style("position", "absolute");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", "0");
    })
    .classed("dot", true)
    .classed("no-doping", (d) => d.Doping === "")
    .classed("doping", (d) => d.Doping !== "");
};
const createAxis = (svg, xScale, yScale) => {
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${h - padding})`)
    .call(xAxis);
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));
  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);

  //label
  svg
    .append("text")
    .text("Time in minutes")
    .attr("transform", "rotate(-90)")
    .attr("x", -h / 2) // Adjust the positioning to center it
    .attr("y", padding / 3); // Adjust the vertical positioning
};
const createLegend = (svg) => {
  legendContainer = svg
    .append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${w - w / 3}, ${h / 2})`);
  legendContainer
    .append("rect")
    .attr("fill", noDopColor)
    .attr("width", "15px")
    .attr("height", "15px")
    .attr("class", "legend-rect");
  legendContainer
    .append("text")
    .text("No doping Allegations")
    .attr("x", 20)
    .attr("y", 12)
    .attr("class", "legend-text");
  legendContainer
    .append("rect")
    .attr("fill", dopColor)
    .attr("width", "15px")
    .attr("height", "15px")
    .attr("class", "legend-rect")
    .attr("y", 20);
  legendContainer
    .append("text")
    .text("Doping Allegations")
    .attr("x", 20)
    .attr("y", 32)
    .attr("class", "legend-text");
};
const init = async () => {
  dataset = await getData();
  console.log("Cyclists info", dataset);
  const { xScale, yScale } = createScales();
  const svg = createSvg();
  const tooltip = createTooltip();
  createCircles(svg, xScale, yScale, tooltip);
  createAxis(svg, xScale, yScale);
  createLegend();
};
init();
