import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import offlineExporting from 'highcharts/modules/offline-exporting';
import * as HighchartsExportData from 'highcharts/modules/export-data';

import { CircularProgress } from '@mui/material';

exporting(Highcharts);
offlineExporting(Highcharts);
HighchartsExportData(Highcharts);

const CustomAnimatedPieChart = ({ chartData }) => {
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        (function (H) {
            H.seriesTypes.pie.prototype.animate = function (init) {
                const series = this,
                    chart = series.chart,
                    points = series.points,
                    { animation } = series.options,
                    { startAngleRad } = series;

                function fanAnimate(point, startAngleRad) {
                    const graphic = point.graphic,
                        args = point.shapeArgs;

                    if (graphic && args) {
                        graphic
                            .attr({
                                start: startAngleRad,
                                end: startAngleRad,
                                opacity: 1
                            })
                            .animate(
                                {
                                    start: args.start,
                                    end: args.end
                                },
                                {
                                    duration: animation.duration / points.length
                                },
                                function () {
                                    if (points[point.index + 1]) {
                                        fanAnimate(points[point.index + 1], args.end);
                                    }

                                    if (point.index === series.points.length - 1) {
                                        series.dataLabelsGroup.animate(
                                            {
                                                opacity: 1
                                            },
                                            void 0,
                                            function () {
                                                points.forEach((point) => {
                                                    point.opacity = 1;
                                                });
                                                series.update(
                                                    {
                                                        enableMouseTracking: true
                                                    },
                                                    false
                                                );
                                                chart.update({
                                                    plotOptions: {
                                                        pie: {
                                                            innerSize: '40%',
                                                            borderRadius: 8
                                                        }
                                                    }
                                                });
                                            }
                                        );
                                    }
                                }
                            );
                    }
                }

                if (init) {
                    points.forEach((point) => {
                        point.opacity = 0;
                    });
                } else {
                    fanAnimate(points[0], startAngleRad);
                }
            };
        })(Highcharts);
        // setTimeout(() => {
            setFlag(true)
        // }, 500);
    }, [chartData]); // Empty dependency array to run the effect only once


    const chartOptions = {
        chart: {
            type: 'pie'
        },
        title: {
            text: chartData?.title || 'Today',
            align: 'center'
        },
        // subtitle: {
        //     text: 'Custom animation of pie series',
        //     align: 'left'
        // },
        tooltip: {
            pointFormat: ' <b>{point.totalTime} - {point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                borderWidth: 2,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f}% {point.totalTime}',
                    distance: 20
                }
            }
        },
        series: [
            {
                enableMouseTracking: false,
                animation: {
                    duration: 1000
                },
                colorByPoint: true,
                data: chartData?.percentage.map((value, index) => ({
                    name: chartData?.categoryName[index] || `Category ${index + 1}`,
                    y: value,
                    totalTime: chartData.totalTime[index],
                    color: chartData?.categoryColor && chartData?.categoryColor[index] ? chartData?.categoryColor[index] : null
                }))
            }
        ]
    };

    return (
        <>
            {
                flag &&
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions} />
            }
        </>
    );
};

export default CustomAnimatedPieChart;
