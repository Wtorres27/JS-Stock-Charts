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

  new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: stocks[0].values.reverse().map((value) => value.datetime),
      datasets: stocks.map((stock) => ({
        label: stock.meta.symbol,
        data: stock.values.map((value) => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      })),
    },
  });

  new Chart(highestPriceChartCanvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: stocks[0].values.map((value) => value.mockData),
      datasets: stocks.map((stock) => ({
        label: stock.meta.symbol,
        data: stock.values.map((value) => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      })),
    },
  });

  console.log(stocks[0].values.map);
}

main();
