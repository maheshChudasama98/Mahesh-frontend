import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import offlineExporting from 'highcharts/modules/offline-exporting';
import * as HighchartsExportData from 'highcharts/modules/export-data';

exporting(Highcharts);
offlineExporting(Highcharts);
HighchartsExportData(Highcharts);
const LineCharts = ({ chartObject }) => {
    const chartOptions = {
        xAxis: {
            categories: chartObject?.categories
        },
        title: {
            text: chartObject?.title ? chartObject?.title : ''
        },
        yAxis: {
            title: {
                text: chartObject?.titleValue ? chartObject?.titleValue : 'Total Count / Day'
            }
        },
        legend: {
            verticalAlign: 'top',
        },
        series: chartObject.series,

        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    menuItems: [
                        'printChart',
                        'viewFullscreen',
                        'separator',
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadSVG',
                        'separator',
                        'downloadCSV',
                        'downloadXLS',
                        'viewData'
                    ]
                }
            }
        },
    };


    return (
        <>
            <div style={{ marginTop: 5 }}>
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>
        </>
    )
}

export default LineCharts