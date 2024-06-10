Highcharts.chart("products_graph", {
    chart: {
        type: "column",
        height: '80%',
        backgroundColor: 'rgba(0, 0, 0, 0)', 
    },
    title: {
        text: "Cantidad total de productos por tipo de Fruta/Verdura",
        style: {
            color: '#ffffff'
        },
    },
    xAxis: {
        categories: [],
        title: {
            text: "Tipo de Fruta/Verdura",
            style: {color: '#ffffff'},  
        },
        labels: {
            style: {color: '#ffffff'}
        }
    },
    yAxis: {
        title: {
            text: "Cantidad de Productos",
            style: {color: '#ffffff'},
        },
        labels: {
            style: {color: '#ffffff'}
        }
    },
    legend: {
        align: "left",
        verticalAlign: "top",
        borderWidth: 0,
        itemStyle: {color: '#ffffff'}
    },
  
    tooltip: {
        shared: true,
        crosshairs: true,
    },
  
    series: [
        {
            name: "Productos",
            data: [],
            lineWidth: 1,
            marker: {
            enabled: true,
            radius: 4,
            },
            color: "#FC2865",
        },
    ],
});
  

fetch('/get-product-data')
.then((response) => response.json())
.then((data) => {
    let parsedData = data.map((item) => item.cantidad);
    let parsedCategories = data.map((item) => item.fv);

    const chart = Highcharts.charts.find(
        (chart) => chart && chart.renderTo.id === "products_graph"
    );

    // Update the chart with new data
    chart.update({series: [{data: parsedData,},],});
    chart.update({xAxis: {categories: parsedCategories,},})
})
.catch((error) => console.error("Error:", error));

Highcharts.chart("pedidos_graph", {
    chart: {
        type: "column",
        height: '80%',
        backgroundColor: 'rgba(0, 0, 0, 0)', 
    },
    title: {
        text: "Cantidad total de pedidos por comuna",
        style: {
            color: '#ffffff'
        },
    },
    xAxis: {
        categories: [],
        title: {
            text: "Comuna",
            style: {color: '#ffffff'},  
        },
        labels: {
            style: {color: '#ffffff'}
        }
    },
    yAxis: {
        title: {
            text: "Cantidad de Pedidos",
            style: {color: '#ffffff'},
        },
        labels: {
            style: {color: '#ffffff'}
        }
    },
    legend: {
        align: "left",
        verticalAlign: "top",
        borderWidth: 0,
        itemStyle: {color: '#ffffff'}
    },
  
    tooltip: {
        shared: true,
        crosshairs: true,
    },
  
    series: [
        {
            name: "Pedidos",
            data: [],
            lineWidth: 1,
            marker: {
            enabled: true,
            radius: 4,
            },
            color: "#FC2865",
        },
    ],
});
  

fetch('/get-pedidos-data')
.then((response) => response.json())
.then((data) => {
    let parsedData = data.map((item) => item.cantidad);
    let parsedCategories = data.map((item) => item.comuna);

    const chart = Highcharts.charts.find(
        (chart) => chart && chart.renderTo.id === "pedidos_graph"
    );

    // Update the chart with new data
    chart.update({series: [{data: parsedData,},],});
    chart.update({xAxis: {categories: parsedCategories,},})
})
.catch((error) => console.error("Error:", error));