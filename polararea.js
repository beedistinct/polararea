var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};
var csvdata = d3.csv("final_dataset_101520.csv")
    .then(data => {
        data.forEach(d => {
            d.total = +d.year;
            d.value_50k_less	= +d.value_50k_less
            d.value_50000to99999	= +d.value_50000to99999
            d.value_100000to149999	= +d.value_100000to149999
            d.value_150000to199999 = +d.value_150000to199999	
            d.value_200000to299999	= +d.value_200000to299999
            d.value_300000to499999	= +d.value_300000to499999
            d.value_500000to999999 = +d.value_500000to999999	
            d.value_1M_more = +d.value_1M_more
        });   

        var allYears = new Set(data.map(d => +d.year));
        // add the options to the year drop-down button
        d3.select("#yearDropdown")
            .selectAll('myOptions')
                .data(allYears)
            .enter()
            .append('option')
            .text(function (d) { return d; }) // text showed in the menu
            .attr("value", function (d) { return d; }); // corresponding value returned by the button

        var allStates = new Set(data.map(d => d.state));
        // add the options to the year drop-down button
        d3.select("#stateDropdown")
            .selectAll('myOptions')
                .data(allStates)
            .enter()
            .append('option')
            .text(function (d) { return d; }) // text showed in the menu
            .attr("value", function (d) { return d; }); // corresponding value returned by the button

        var selectedYear = "2019";                 // Initialize with year 2019 so this is the chart default year
        var selectedState = "Alabama";  // Initialize with Iowa state so this is the chart default state
        var yearData = getFilteredData(data, selectedYear, selectedState);

        // When the year dropdown's value is changed, run the updateChart function
        document.getElementById('yearDropdown').addEventListener('change', function() { 
        var selectedYear = d3.select(this).property("value");     // recover the option that has been chosen
        console.log("selected year", selectedYear);
        var selectElement =  document.querySelector('#stateDropdown');              
        selectedState = selectElement.value; 
        console.log("read from dropdown", selectedState);
        var filteredData = getFilteredData(data, selectedYear, selectedState);
        console.log("selected year changed", filteredData);
       
        myPolarArea.data.datasets[0].data = TXdata;    //temp only replace TXdata with filtered data
        // run the updateChart function with this selected option
        // extract the data for the year selected by user  
        window.myPolarArea.update();
      });
      // When the state dropdown's value is changed, run the updateChart function
      document.getElementById('stateDropdown').addEventListener('change', function() { 
        var selectedState = d3.select(this).property("value");     // recover the option that has been chosen
        var selectElement =  document.querySelector('#yearDropdown');              
        selectedYear = selectElement.value;
        console.log("read from year dropdown", selectedYear);
        console.log(selectedState);
        var filteredData = getFilteredData(data, selectedYear, selectedState);
        console.log("selected state changed",filteredData);
       
        myPolarArea.data.datasets[0].data = CAdata;    //temp only replace CAdata with filtered data
        // run the updateChart function with this selected option
        // extract the data for the year selected by user  
        window.myPolarArea.update();
      });
});

var labels = jsonfile.ALarray.map(function(e) {
  return e.name;
});
var data = jsonfile.ALarray.map(function(e) {
  return e.value;
});

window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  brown: 'rgb(123, 56, 55)',
  grey: 'rgb(201, 203, 207)'
};

var chartColors = window.chartColors;
var color = Chart.helpers.color;
var config = {
  type: 'polarArea',
  data: {
    datasets: [{
      data: data,
      backgroundColor: [
        color(chartColors.red).alpha(0.5).rgbString(),
        color(chartColors.orange).alpha(0.5).rgbString(),
        color(chartColors.blue).alpha(0.5).rgbString(),
        color(chartColors.green).alpha(0.5).rgbString(),
        color(chartColors.purple).alpha(0.5).rgbString(),
        color(chartColors.grey).alpha(0.5).rgbString(),
        color(chartColors.yellow).alpha(0.5).rgbString()
      ],
      label: 'Value' // for legend
    }],
    labels: labels
  },
  options: {
    responsive: true,
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Housing Value by Year and State'   //need to change this dynamically
    },
    scale: {
      ticks: {
        beginAtZero: true
      },
      reverse: false
    },
    animation: {
      animateRotate: true,
      animateScale: true
    }
  }
};

window.onload = function() {
  var ctx = document.getElementById('chart-area');
  window.myPolarArea = new Chart(ctx, config);
};

// Get a subset of the data based on the group
function getFilteredData(data, year, state) {
  return data.filter(function(d){return d.year == year;})
};