import React from "react";
import { ResponsiveBar } from "@nivo/bar";
const BarChart = () => {
  const data = [
    {
      country: "AD",
      "hot dog": 163,
      "hot dogColor": "hsl(203, 70%, 50%)",
      burger: 33,
      burgerColor: "hsl(138, 70%, 50%)",
      sandwich: 42,
      sandwichColor: "hsl(332, 70%, 50%)",
      kebab: 55,
      kebabColor: "hsl(51, 70%, 50%)",
      fries: 91,
      friesColor: "hsl(13, 70%, 50%)",
      donut: 180,
      donutColor: "hsl(47, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 163,
      "hot dogColor": "hsl(46, 70%, 50%)",
      burger: 109,
      burgerColor: "hsl(46, 70%, 50%)",
      sandwich: 179,
      sandwichColor: "hsl(354, 70%, 50%)",
      kebab: 46,
      kebabColor: "hsl(53, 70%, 50%)",
      fries: 126,
      friesColor: "hsl(47, 70%, 50%)",
      donut: 12,
      donutColor: "hsl(79, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 170,
      "hot dogColor": "hsl(49, 70%, 50%)",
      burger: 79,
      burgerColor: "hsl(84, 70%, 50%)",
      sandwich: 97,
      sandwichColor: "hsl(193, 70%, 50%)",
      kebab: 126,
      kebabColor: "hsl(15, 70%, 50%)",
      fries: 50,
      friesColor: "hsl(183, 70%, 50%)",
      donut: 65,
      donutColor: "hsl(292, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 29,
      "hot dogColor": "hsl(81, 70%, 50%)",
      burger: 139,
      burgerColor: "hsl(132, 70%, 50%)",
      sandwich: 80,
      sandwichColor: "hsl(242, 70%, 50%)",
      kebab: 62,
      kebabColor: "hsl(11, 70%, 50%)",
      fries: 7,
      friesColor: "hsl(183, 70%, 50%)",
      donut: 96,
      donutColor: "hsl(287, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 42,
      "hot dogColor": "hsl(107, 70%, 50%)",
      burger: 92,
      burgerColor: "hsl(187, 70%, 50%)",
      sandwich: 181,
      sandwichColor: "hsl(267, 70%, 50%)",
      kebab: 195,
      kebabColor: "hsl(3, 70%, 50%)",
      fries: 90,
      friesColor: "hsl(335, 70%, 50%)",
      donut: 81,
      donutColor: "hsl(4, 70%, 50%)",
    },
    {
      country: "AL",
      "hot dog": 199,
      "hot dogColor": "hsl(292, 70%, 50%)",
      burger: 9,
      burgerColor: "hsl(116, 70%, 50%)",
      sandwich: 9,
      sandwichColor: "hsl(222, 70%, 50%)",
      kebab: 165,
      kebabColor: "hsl(258, 70%, 50%)",
      fries: 41,
      friesColor: "hsl(338, 70%, 50%)",
      donut: 39,
      donutColor: "hsl(106, 70%, 50%)",
    },
    {
      country: "AM",
      "hot dog": 72,
      "hot dogColor": "hsl(353, 70%, 50%)",
      burger: 11,
      burgerColor: "hsl(352, 70%, 50%)",
      sandwich: 184,
      sandwichColor: "hsl(312, 70%, 50%)",
      kebab: 107,
      kebabColor: "hsl(120, 70%, 50%)",
      fries: 8,
      friesColor: "hsl(283, 70%, 50%)",
      donut: 60,
      donutColor: "hsl(284, 70%, 50%)",
    },
  ];
  return (
    <ResponsiveBar
      data={data}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: [this.state.barStat1],
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default BarChart;
