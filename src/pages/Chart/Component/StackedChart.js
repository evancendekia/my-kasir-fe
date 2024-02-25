import React, {useLayoutEffect,useState} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isEqual } from "lodash";
// import {colorPalette, colorPalette2} from "../../../constant/general";
am4core.useTheme(am4themes_animated);

function StackedChart(props) {
    const {
        // ChartName,
        // ChartData,
        // ValueName,
        // Value2Name,
        // HideXLabels,
        // type,
        // highlightedMaleFemale,
        // highlightedTopPatient,
        // DonutSliceClicked
    } = props;

    useLayoutEffect(() => {
        var chart = am4core.create('StackedChart', am4charts.XYChart);
        chart.data = [{
          "year": "2018",
          "month": "Jan",
          "makanan": 10535000,
          "minuman": 3723000
        },{
          "year": "2018",
          "month": "Feb",
          "makanan": 11535000,
          "minuman": 4823000
        },{
          "year": "2018",
          "month": "Mar",
          "makanan": 9453000,
          "minuman": 4225000
        },{
          "year": "2018",
          "month": "Apr",
          "makanan": 10735000,
          "minuman": 3927000
        },{
          "year": "2018",
          "month": "May",
          "makanan": 10288000,
          "minuman": 5113000
        },{
          "year": "2018",
          "month": "Jun",
          "makanan": 9216000,
          "minuman": 7191000
        }];

        
        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "month";
        categoryAxis.renderer.grid.template.location = 0;


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.renderer.inside = true;
        valueAxis.numberFormatter.numberFormat = "'Rp. '#,###.00";
        // valueAxis.renderer.labels.text = "Rp {valueY}";
        valueAxis.min = 0;

        // Create series
        function createSeries(field, name) {
          
          // Set up series
          let series = chart.series.push(new am4charts.ColumnSeries());
          series.name = name;
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "month";
          series.sequencedInterpolation = true;
          // series.columns.template.adapter.add("fill", function(fill, target) {
          //   var pattern = new am4core.LinePattern();
          //   pattern.width = 10;
          //   pattern.height = 10;
          //   // pattern.strokeWidth = 1;
          //   // pattern.stroke = target.dataItem.dataContext.color;
          //   pattern.rotation = 45;
          //   return pattern;
          // });

          
          // series.columns.template.background.adapter.add("fill", function(fill, target) {
          //   return target.dataItem ? target.dataItem.dataContext.color : fill;
          // });
          
          // Make it stacked
          series.stacked = true;
          
          // Configure columns
          series.columns.template.width = am4core.percent(60);
          series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: Rp {valueY}";
          
          // Add label
          let labelBullet = series.bullets.push(new am4charts.LabelBullet());
          // labelBullet.label.text = "{valueY}";
          // labelBullet.label.text = "{valueX}";

          labelBullet.locationY = 0.5;
          labelBullet.label.hideOversized = true;
          
          return series;
        }

        createSeries("makanan", "Makanan");
        createSeries("minuman", "Minuman");

        // Legend
        chart.legend = new am4charts.Legend();
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
    <div id={'StackedChart'} style={{ width: "100%", height: "30vw" }}></div>
  );
}

const customComparator = (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
};
export default React.memo(StackedChart, customComparator);