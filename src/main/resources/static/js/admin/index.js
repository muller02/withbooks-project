
//=======================================================================
// 회원 현황
Highcharts.chart('guest-container', {

    title: {
        text: '월 별 회원 현황',
        align: 'center'
    },

    yAxis: {
        title: {
            text: '회원수'
        }
    },

    xAxis: {
       type: 'datetime',
       dateTimeLabelFormats: {
        month: '%b %Y' // 표시 형식을 월과 연도로 설정 (예: Jan 2023)
    }},

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },
    series: [
        {
            name: '방문자',
            color: "#E9C46A",
            data: [
                [Date.UTC(2023, 6, 1), 44], 
                [Date.UTC(2023, 7, 1), 123], 
                [Date.UTC(2023, 8, 1), 56], 
                [Date.UTC(2023, 9, 1), 345], 
                [Date.UTC(2023, 10, 1), 234], 
                [Date.UTC(2023, 11, 1), 123], 
                [Date.UTC(2023, 12, 1), 233], 
                [Date.UTC(2024, 1, 1), 233], 
                [Date.UTC(2024, 2, 1), 124], 
                [Date.UTC(2024, 3, 1), 444], 
                [Date.UTC(2024, 4, 1), 332], 
                [Date.UTC(2024, 5, 1), 234]  
            ]
        },
        {
            name: '신규 회원',
            color: "#264653",
            data: [
                [Date.UTC(2023, 6, 1), 29], 
                [Date.UTC(2023, 7, 1), 71], 
                [Date.UTC(2023, 8, 1), 104], 
                [Date.UTC(2023, 9, 1), 122], 
                [Date.UTC(2023, 10, 1), 140], 
                [Date.UTC(2023, 11, 1), 170], 
                [Date.UTC(2023, 12, 1), 136], 
                [Date.UTC(2024, 1, 1), 145], 
                [Date.UTC(2024, 2, 1), 216], 
                [Date.UTC(2024, 3, 1), 194], 
                [Date.UTC(2024, 4, 1), 95], 
                [Date.UTC(2024, 5, 1), 123]  
            ]
        },
        {
            name: '탈퇴 회원',
            color: "#E76F51",
            data: [
                [Date.UTC(2023, 6, 1), 3], 
                [Date.UTC(2023, 7, 1), 2], 
                [Date.UTC(2023, 8, 1), 3], 
                [Date.UTC(2023, 9, 1), 12], 
                [Date.UTC(2023, 10, 1), 34],
                [Date.UTC(2023, 11, 1), 12],
                [Date.UTC(2023, 12, 1), 32],
                [Date.UTC(2024, 1, 1), 8], 
                [Date.UTC(2024, 2, 1), 3], 
                [Date.UTC(2024, 3, 1), 43], 
                [Date.UTC(2024, 4, 1), 1],
                [Date.UTC(2024, 5, 1), 3]  
            ]
        },
    ],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});

// ===================================================================================








// ===================================================================================
// 북쇼츠, 위드 게시글

Highcharts.chart('content-container', {
    chart: {
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            viewDistance: 25,
            depth: 40
        }
    },

    title: {
        text: '월 별 컨텐츠 현황',
        align: 'center'
    },

    // subtitle: {
    //     text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
    //     align: 'left'
    // },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: '컨텐츠 수',
            skew3d: true,
            style: {
                fontSize: '16px'
            }
        }
    },

    xAxis: {
       type: 'datetime',
       dateTimeLabelFormats: {
        month: '%b %Y' // 표시 형식을 월과 연도로 설정 (예: Jan 2023)
    }},

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },
    series: [
        {
            name: '북쇼츠',
            color: "#38b000",
            data: [
                [Date.UTC(2023, 6, 1), 122], 
                [Date.UTC(2023, 7, 1), 345], 
                [Date.UTC(2023, 8, 1), 53], 
                [Date.UTC(2023, 9, 1), 465], 
                [Date.UTC(2023, 10, 1), 512], 
                [Date.UTC(2023, 11, 1), 232], 
                [Date.UTC(2023, 12, 1), 231], 
                [Date.UTC(2024, 1, 1), 234], 
                [Date.UTC(2024, 2, 1), 543], 
                [Date.UTC(2024, 3, 1), 133], 
                [Date.UTC(2024, 4, 1), 133], 
                [Date.UTC(2024, 5, 1), 234]  
            ]
        },
        {
            name: '위드 컨텐츠',
            color: "#004b23",
            data: [
                [Date.UTC(2023, 6, 1), 44], 
                [Date.UTC(2023, 7, 1), 34], 
                [Date.UTC(2023, 8, 1), 123], 
                [Date.UTC(2023, 9, 1), 122], 
                [Date.UTC(2023, 10, 1), 345], 
                [Date.UTC(2023, 11, 1), 323], 
                [Date.UTC(2023, 12, 1), 543], 
                [Date.UTC(2024, 1, 1), 231], 
                [Date.UTC(2024, 2, 1), 654], 
                [Date.UTC(2024, 3, 1), 232], 
                [Date.UTC(2024, 4, 1), 234], 
                [Date.UTC(2024, 5, 1), 566]  
            ]
        },
    ],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});
//============================================================================================

//============================================================================================
// 가입자 현황
{
    // Age categories
    const categories = [
        '10대', '20대', '30대', '40대', '50대', '60대', '70대'
    ];

    Highcharts.chart('users-gender-container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: '연령대 별 성별 현황',
            align: 'left'
        },
        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                step: 1
            },
            accessibility: {
                description: 'Age (male)'
            }
        }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1
            },
            accessibility: {
                description: 'Age (female)'
            }
        }],
        yAxis: {
            title: {
                text: '인구 비율 (%)'
            },
            labels: {
                format: '{value}%'
            },
            accessibility: {
                description: 'Percentage population',
                rangeDescription: 'Range: 0 to 100%'
            }
        },

        plotOptions: {
            series: {
                stacking: 'normal',
                borderRadius: '50%'
            }
        },

        tooltip: {
            formatter: function () {
                return `<b>${this.series.name}, ${this.point.category}</b><br/>` +
                    `인구 비율: ${Math.abs(this.point.y)}%`;
            }
        },

        series: [{
            name: '남자',
            data: [
                -8.0, -7.5, -6.5, -5.5, -4.5, -3.5, -2.5
            ],
            color: '#1982c4'
        }, {
            name: '여자',
            data: [
                7.5, 6.5, 5.5, 4.5, 3.5, 2.5, 1.5
            ],
            color: '#ff595e'
        }]
    });
}

// ===============================================================================================

//================================================================================================
// 나잇대 별 활동

{
    
    const colors = Highcharts.getOptions().colors,
    categories = [
        '10대', '20대', '30대', '40대', '50대', '60대', '70대'
    ],
    data = [
        {
            y: 20.00,
            color: colors[0],
            drilldown: {
                name: '10대',
                categories: [
                    '북쇼츠',
                    '위드',
                    '북로그'
                ],
                data: [
                    10.00,
                    6.00,
                    4.00
                ]
            }
        },
        {
            y: 25.00,
            color: colors[1],
            drilldown: {
                name: '20대',
                categories: [
                    '북쇼츠',
                    '위드',
                    '북로그'
                ],
                data: [
                    12.00,
                    8.00,
                    5.00
                ]
            }
        },
        {
            y: 15.00,
            color: colors[2],
            drilldown: {
                name: '30대',
                categories: [
                    '북쇼츠',
                    '위드',
                    '북로그'
                ],
                data: [
                    7.00,
                    5.00,
                    3.00
                ]
            }
        },
        {
            y: 10.00,
            color: colors[3],
            drilldown: {
                name: '40대',
                categories: [
                    '북쇼츠',
                    '위드',
                    '북로그'
                ],
                data: [
                    4.00,
                    3.00,
                    3.00
                ]
            }
        },
        {
            y: 10.00,
            color: colors[4],
            drilldown: {
                name: '50대',
                categories: [
                    '북쇼츠',
                    '위드',
                    '북로그'
                ],
                data: [
                    5.00,
                    3.00,
                    2.00
                ]
            }
        },
        {
            y: 10.00,
            color: colors[5],
            drilldown: {
                name: '60대',
                categories: [
                    '북쇼츠',
                    '위드',
                    '북로그'
                ],
                data: [
                    5.00,
                    3.00,
                    2.00
                ]
            }
        },
        {
            y: 10.00,
            color: colors[6],
            drilldown: {
                name: '70대',
                categories: [
                    '북쇼츠',
                    '위드',
                    '북로그'
                ],
                data: [
                    5.00,
                    3.00,
                    2.00
                ]
            }
        }
    ],
    ageData = [],
    activityData = [],
    dataLen = data.length;

    let i, j, drillDataLen, brightness;

    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add age data
        ageData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        // add activity data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            const name = data[i].drilldown.categories[j];
            brightness = 0.2 - (j / drillDataLen) / 5;
            activityData.push({
                name: `${categories[i]} ${name}`,
                y: data[i].drilldown.data[j],
                color: Highcharts.color(data[i].color).brighten(brightness).get()
            });
        }
    }

    // Create the chart
    Highcharts.chart('users-act-container', {
        chart: {
            type: 'pie'
        },
        title: {
            text: '연령대 별 컨텐츠 활동 현황',
            align: 'left'
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: '연령대',
            data: ageData,
            size: '45%',
            dataLabels: {
                color: '#ffffff',
                distance: -30
            }
        }, {
            name: '활동',
            data: activityData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                format: '<b>{point.name}:</b> <span style="opacity: 0.5">{y}%</span>',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 1
                },
                style: {
                    fontWeight: 'normal'
                }
            },
            id: 'versions'
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 400
                },
                chartOptions: {
                    series: [{
                    }, {
                        id: 'versions',
                        dataLabels: {
                            distance: 10,
                            format: '{point.name}',
                            filter: {
                                property: 'percentage',
                                operator: '>',
                                value: 2
                            }
                        }
                    }]
                }
            }]
        }
    });
}