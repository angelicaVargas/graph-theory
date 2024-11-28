// Initialize SVG
var svg = d3.select("svg");
var width = svg.attr("width");
var height = svg.attr("height");

// Initialize data
var graph = {
nodes: [
    { name: "Node 1" },
    { name: "Node 2" },
    { name: "Node 3" },
    { name: "Node 4" },
    { name: "Node 5" },
    { name: "Node 6" },
    { name: "Node 7" },
    { name: "Node 8" },
],
links: [
    { source: "Node 1", target: "Node 2" },
    { source: "Node 2", target: "Node 4" },
    { source: "Node 3", target: "Node 4" },
    { source: "Node 4", target: "Node 5" },
    { source: "Node 5", target: "Node 3" },
    { source: "Node 6", target: "Node 7" },
    { source: "Node 7", target: "Node 8" },
    { source: "Node 8", target: "Node 6" },
],
};

// Create simulation
var simulation = d3
    .forceSimulation(graph.nodes)
    .force(
        "link",
        d3
        .forceLink()
        .id(function (d) {
            return d.name;
        })
        .links(graph.links)
    )
    .force("charge", d3.forceManyBody().strength(10))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked);

// Create links
var link = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("stroke-width", function (d) {
        return 3;
    });

// Create nodes
var node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", "red")
    .call(
        d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

// Update positions on each tick
function ticked() {
link
    .attr("x1", function (d) {
    return d.source.x;
    })
    .attr("y1", function (d) {
    return d.source.y;
    })
    .attr("x2", function (d) {
    return d.target.x;
    })
    .attr("y2", function (d) {
    return d.target.y;
    });

node
    .attr("cx", function (d) {
    return d.x;
    })
    .attr("cy", function (d) {
    return d.y;
    });
}

// Drag events
function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
