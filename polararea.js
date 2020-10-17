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

        var year = 2019;                 // Initialize with year 2019 so this is the chart default year
        var state = "IA";                 // Initialize with Iowa state so this is the chart default state
        var yearData = getFilteredData(data, year, state);

        // When the year dropdown's value is changed, run the updateChart function
        document.getElementById('yearDropdown').addEventListener('change', function() { 
        var selectedYear = d3.select(this).property("value");     // recover the option that has been chosen
        console.log(selectedYear);
        var filteredData = getFilteredData(data, selectedYear, state);
        console.log("selected year changed",filteredData);
       
        myPolarArea.data.datasets[0].data = TXdata;    //temp only replace TXdata with filtered data
        // run the updateChart function with this selected option
        // extract the data for the year selected by user  
        window.myPolarArea.update();
      });
      // When the state dropdown's value is changed, run the updateChart function
      document.getElementById('stateDropdown').addEventListener('change', function() { 
        var selectedState = d3.select(this).property("value");     // recover the option that has been chosen
        console.log(selectedState);
        var filteredData = getFilteredData(data, year, selectedState);
        console.log("selected state changed",filteredData);
       
        myPolarArea.data.datasets[0].data = CAdata;    //temp only replace CAdata with filtered data
        // run the updateChart function with this selected option
        // extract the data for the year selected by user  
        window.myPolarArea.update();
      });
});

// below is test data..can be deleted once code is tested with final json file
var jsonfile = {
  "ALarray": [{
    "name": "less than 50,000",
    "value": 390929
  }, 
  {
    "name": "50,000 to 99,999",
    "value": 98865
  },
  {
    "name": "100,000 to 149,000",
    "value": 64209
  },
  {
    "name": "150,000 to 199,999",
    "value": 38151
  },
  {
    "name": "200,000 to 299,999",
    "value": 172900
  },
  {
    "name": "500,000 to 499,999",
    "value": 272900
  },
  {
    "name": "500,000 to 999,999",
    "value": 442900
  },
  {
    "name": "> 1M",
    "value": 4942
  }],
  "CAarray": [{
    "name": "less than 50,000",
    "value": 334929
  }, 
  {
    "name": "50,000 to 99,999",
    "value": 674655
  },
  {
    "name": "100,000 to 149,000",
    "value": 984209
  },
  {
    "name": "150,000 to 199,999",
    "value": 59251
  },
  {
    "name": "200,000 to 299,999",
    "value": 175555
  },
  {
    "name": "500,000 to 499,999",
    "value": 555550
  },
  {
    "name": "500,000 to 999,999",
    "value": 333900
  },
  {
    "name": "> 1M",
    "value": 857560
  }],
  "TXarray": [{
    "name": "less than 50,000",
    "value": 459292
  }, 
  {
    "name": "50,000 to 99,999",
    "value": 564656
  },
  {
    "name": "100,000 to 149,000",
    "value": 74209
  },
  {
    "name": "150,000 to 199,999",
    "value": 58151
  },
  {
    "name": "200,000 to 299,999",
    "value": 376666
  },
  {
    "name": "500,000 to 499,999",
    "value": 512900
  },
  {
    "name": "500,000 to 999,999",
    "value": 372900
  },
  {
    "name": "> 1M",
    "value": 657560
  }]
};

var labels = jsonfile.ALarray.map(function(e) {
  return e.name;
});
var data = jsonfile.ALarray.map(function(e) {
  return e.value;
});

// below is test data..can be deleted once code is tested with final json file
var TXdata = jsonfile.TXarray.map(function(e) {
  return e.value;
});

var CAdata = jsonfile.TXarray.map(function(e) {
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