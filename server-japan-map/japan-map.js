console.log("hello japan map");
var width = 960,
    height = 1160;

var color = d3.scale.category20();

var projection = d3.geo.mercator()
   .center([135, 35])
   .scale(2400)
   .translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("jp.json", function(error, jp) {

    console.log(jp);
     // 国を表示
     svg.selectAll(".subunit")
        .data(topojson.object(jp, jp.objects.subunits_jp).geometries)
    .enter()
    .append("path")
    .attr("class", function(d){ console.log(d.id);return "subunit "+ d.id; } )
    .attr("d", path)
    .attr("fill", function(d,i){ return color(i);});

    // 都市名の○を表示
    svg.append("path")
        .datum(topojson.object(jp, jp.objects.places_jp))
        .attr("d", path)
        .attr("class", "place");

    // 都市名を表示
    svg.selectAll(".place-label")
        .data(topojson.object(jp, jp.objects.places_jp).geometries)
      .enter().append("text")
        .attr("class", "place-label")
        .attr("transform", function(d) { return "translate(" + projection(d.coordinates) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.properties.NAME; });

    // 都市名を左側と右側で外に向かうようにする
    svg.selectAll(".place-label")
        .attr("x", function(d) { return d.coordinates[0] > 135 ? 6 : -6; })
        .style("text-anchor", function(d) { return d.coordinates[0] > 135 ? "start" : "end"; });

    // ラベル表示
    svg.selectAll(".subunit-label")
        .data(topojson.object(jp, jp.objects.subunits_jp).geometries)
      .enter().append("text")
        .attr("class", function(d) { return "subunit-label " + d.id; })
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.properties.NAME; });
});

