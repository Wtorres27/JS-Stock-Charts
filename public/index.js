// const { Chart } = require("chart.js")
async function main() {
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );

  // let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=30min&outputsize=24&apikey=b2b0e11651294ee9a789558a1625b754');
  // let results = await response.json();
  // console.log(results)

  const { GME, MSFT, DIS, BNTX } = mockData;

  const stocks = [GME, MSFT, DIS, BNTX];

  function getColor(stock) {
    if (stock === "GME") {
      return "rgba(61, 161, 61, 0.7)";
    }
    if (stock === "MSFT") {
      return "rgba(209, 4, 25, 0.7)";
    }
    if (stock === "DIS") {
      return "rgba(18, 4, 209, 0.7)";
    }
    if (stock === "BNTX") {
      return "rgba(166, 43, 158, 0.7)";
    }
  }
// switching the stock values to be the opposite layout 
  stocks.forEach((stock) => stock.values.reverse());

  new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: stocks[0].values.map((value) => value.datetime),
      datasets: stocks.map((stock) => ({
        label: stock.meta.symbol,
        data: stock.values.map((value) => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      })),
    },
  });
// this function is creating a loop to get the highest values for each stock 
  function findHighestValue(values) {
    let highest = values[0].high;
    for (let i = 1; i < values.length; i++) {
      if (highest < values[i].high) {
        highest = values[i].high;
      }
    }
    return highest;
  }

  new Chart(highestPriceChartCanvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: stocks.map((stock) => stock.meta.symbol),
      datasets: [
        {
          label: "highest",
          data: stocks.map((stock) => findHighestValue(stock.values)),
          backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
        },
      ],
    },
  });

  console.log(stocks[0].values);
  stocks[0].values.map((value) => value._);
  // in this function i am making the the high values be adressed and changed from strings to numbers

  function findAverage(values) {
    let total = 0;

    values.forEach((value) => {
        total += parseFloat(value.high);
    });
    return total / values.length;
}

new Chart(averagePriceChartCanvas.getContext('2d'), {
    type: 'pie',
    data: {
        labels: stocks.map(stock => stock.meta.symbol),
        datasets: [{
            label: 'average',
            data: stocks.map((stock) => findAverage(stock.values)),
            backgroundColor:  stocks.map((stock) => getColor(stock.meta.symbol)),
            borderColor: stocks.map((stock) => getColor(stock.meta.values)),
        }]
    }
})

}

main();
