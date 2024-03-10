import React, {useLayoutEffect,useState} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isEqual } from "lodash";
am4core.useTheme(am4themes_animated);

const data = [
  {
    "date": "2012-10-17",
    "value": 44
  }, {
    "date": "2012-10-18",
    "value": 49
  }, {
    "date": "2012-10-19",
    "value": 53
  }, {
    "date": "2012-10-20",
    "value": 57
  }, {
    "date": "2012-10-21",
    "value": 60
  }, {
    "date": "2012-10-22",
    "value": 61
  }, {
    "date": "2012-10-23",
    "value": 69
  }, {
    "date": "2012-10-24",
    "value": 67
  }, {
    "date": "2012-10-25",
    "value": 72
  }, {
    "date": "2012-10-26",
    "value": 77
  }, {
    "date": "2012-10-27",
    "value": 75
  }, {
    "date": "2012-10-28",
    "value": 70
  }, {
    "date": "2012-10-29",
    "value": 72
  }, {
    "date": "2012-10-30",
    "value": 70
  }, {
    "date": "2012-10-31",
    "value": 72
  }, {
    "date": "2012-11-01",
    "value": 73
  }, {
    "date": "2012-11-02",
    "value": 67
  }, {
    "date": "2012-11-03",
    "value": 68
  }, {
    "date": "2012-11-04",
    "value": 65
  }, {
    "date": "2012-11-05",
    "value": 71
  }, {
    "date": "2012-11-06",
    "value": 75
  }, {
    "date": "2012-11-07",
    "value": 74
  }, {
    "date": "2012-11-08",
    "value": 71
  }, {
    "date": "2012-11-09",
    "value": 76
  }, {
    "date": "2012-11-10",
    "value": 77
  }, {
    "date": "2012-11-11",
    "value": 81
  }, {
    "date": "2012-11-12",
    "value": 83
  }, {
    "date": "2012-11-13",
    "value": 80
  }, {
    "date": "2012-11-14",
    "value": 81
  }, {
    "date": "2012-11-15",
    "value": 87
  }, {
    "date": "2012-11-16",
    "value": 82
  }, {
    "date": "2012-11-17",
    "value": 86
  }, {
    "date": "2012-11-18",
    "value": 80
  }, {
    "date": "2012-11-19",
    "value": 87
  }, {
    "date": "2012-11-20",
    "value": 83
  }, {
    "date": "2012-11-21",
    "value": 85
  }, {
    "date": "2012-11-22",
    "value": 84
  }, {
    "date": "2012-11-23",
    "value": 82
  }, {
    "date": "2012-11-24",
    "value": 73
  }, {
    "date": "2012-11-25",
    "value": 71
  }, {
    "date": "2012-11-26",
    "value": 75
  }, {
    "date": "2012-11-27",
    "value": 79
  }, {
    "date": "2012-11-28",
    "value": 70
  }, {
    "date": "2012-11-29",
    "value": 73
  }, {
    "date": "2012-11-30",
    "value": 61
  }, {
    "date": "2012-12-01",
    "value": 62
  }, {
    "date": "2012-12-02",
    "value": 66
  }, {
    "date": "2012-12-03",
    "value": 65
  }, {
    "date": "2012-12-04",
    "value": 73
  }, {
    "date": "2012-12-05",
    "value": 79
  }, {
    "date": "2012-12-06",
    "value": 78
  }, {
    "date": "2012-12-07",
    "value": 78
  }, {
    "date": "2012-12-08",
    "value": 78
  }, {
    "date": "2012-12-09",
    "value": 74
  }, {
    "date": "2012-12-10",
    "value": 73
  }, {
    "date": "2012-12-11",
    "value": 75
  }, {
    "date": "2012-12-12",
    "value": 70
  }, {
    "date": "2012-12-13",
    "value": 77
  }, {
    "date": "2012-12-14",
    "value": 67
  }, {
    "date": "2012-12-15",
    "value": 62
  }, {
    "date": "2012-12-16",
    "value": 64
  }, {
    "date": "2012-12-17",
    "value": 61
  }, {
    "date": "2012-12-18",
    "value": 59
  }, {
    "date": "2012-12-19",
    "value": 53
  }, {
    "date": "2012-12-20",
    "value": 54
  }, {
    "date": "2012-12-21",
    "value": 56
  }, {
    "date": "2012-12-22",
    "value": 59
  }, {
    "date": "2012-12-23",
    "value": 58
  }, {
    "date": "2012-12-24",
    "value": 55
  }, {
    "date": "2012-12-25",
    "value": 52
  }, {
    "date": "2012-12-26",
    "value": 54
  }, {
    "date": "2012-12-27",
    "value": 50
  }, {
    "date": "2012-12-28",
    "value": 50
  }, {
    "date": "2012-12-29",
    "value": 51
  }, {
    "date": "2012-12-30",
    "value": 52
  }, {
    "date": "2012-12-31",
    "value": 58
  }, {
    "date": "2013-01-01",
    "value": 60
  }, {
    "date": "2013-01-02",
    "value": 67
  }, {
    "date": "2013-01-03",
    "value": 64
  }, {
    "date": "2013-01-04",
    "value": 66
  }, {
    "date": "2013-01-05",
    "value": 60
  }, {
    "date": "2013-01-06",
    "value": 63
  }, {
    "date": "2013-01-07",
    "value": 61
  }, {
    "date": "2013-01-08",
    "value": 60
  }, {
    "date": "2013-01-09",
    "value": 65
  }, {
    "date": "2013-01-10",
    "value": 75
  }, {
    "date": "2013-01-11",
    "value": 77
  }, {
    "date": "2013-01-12",
    "value": 78
  }, {
    "date": "2013-01-13",
    "value": 70
  }, {
    "date": "2013-01-14",
    "value": 70
  }, {
    "date": "2013-01-15",
    "value": 73
  }, {
    "date": "2013-01-16",
    "value": 71
  }, {
    "date": "2013-01-17",
    "value": 74
  }, {
    "date": "2013-01-18",
    "value": 78
  }, {
    "date": "2013-01-19",
    "value": 85
  }, {
    "date": "2013-01-20",
    "value": 82
  }, {
    "date": "2013-01-21",
    "value": 83
  }, {
    "date": "2013-01-22",
    "value": 88
  }, {
    "date": "2013-01-23",
    "value": 85
  }, {
    "date": "2013-01-24",
    "value": 85
  }, {
    "date": "2013-01-25",
    "value": 80
  }, {
    "date": "2013-01-26",
    "value": 87
  }, {
    "date": "2013-01-27",
    "value": 84
  }, {
    "date": "2013-01-28",
    "value": 83
  }, {
    "date": "2013-01-29",
    "value": 84
  }, {
    "date": "2013-01-30",
    "value": 81
  }];

function LineChart(props) {
    var previousValue = 0;

    useLayoutEffect(() => {
        var chart = am4core.create('LineChart', am4charts.XYChart);
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
        
        var newData = [];
        for(let i=0; i< data.length; i++){
          if(i > 0){
            if(data[i].value > previousValue){
              console.log(`${data[i].value} > ${previousValue}`)
              data[i-1].color = chart.colors.getIndex(0);
            }else if(data[i].value == previousValue){
              console.log(`${data[i].value} > ${previousValue}`)
              data[i-1].color = chart.colors.getIndex(10);
            }else{
              console.log(`${data[i].value} < ${previousValue}`)
              data[i-1].color = chart.colors.getIndex(5);
            }
          }
          
          // newData.push(data[i])
          previousValue = data[i].value;
        }
        chart.data =  data;

                // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.min = 0;

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}"
        series.strokeWidth = 4;
        series.minBulletDistance = 10;
        series.propertyFields.stroke = "color";

        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";

        // Make bullets grow on hover
        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        let bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;

        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();

        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        dateAxis.start = 0.79;
        dateAxis.keepSelection = true;

        // chart.height = 350;
        chart.current = chart;

        chart.preloader.disabled = true;
        if(chart.logo) {
          chart.logo.disabled = true;
        }
        return () => {
        chart.dispose();
        };
      }, []);

  return (
    <div id={'LineChart'} style={{ width: "100%", height: "30vw" }}></div>
  );
}

const customComparator = (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
};
export default React.memo(LineChart, customComparator);