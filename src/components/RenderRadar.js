import React from "react";

import { ResponsiveRadar } from "@nivo/radar";
import Col from "react-bootstrap/Col";

class RenderRadar extends React.Component {
  render() {
    const data = [
      {
        stat: "all_run_metres",
        player1: 51,
        player2: 80,
      },
      {
        stat: "errors",
        player1: 99,
        player2: 75,
      },
      {
        stat: "line_breaks",
        player1: 99,
        player2: 75,
      },
      {
        stat: "tries",
        player1: 99,
        player2: 75,
      },
      {
        stat: "tackle_breaks",
        player1: 99,
        player2: 75,
      },
      {
        stat: "try_assists",
        player1: 99,
        player2: 75,
      },
    ];
    return (
      <Col sm={12} lg={8} md={8} xl={8}>
        <div className="graph-container">
          <ResponsiveRadar
            id="radarGraph"
            data={data}
            keys={["player1", "player2"]}
            indexBy="stat"
            maxValue="99"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: "color" }}
            gridLevels={5}
            gridShape="linear"
            gridLabelOffset={16}
            enableDots={true}
            dotSize={6}
            dotColor={{ theme: "background" }}
            dotBorderWidth={1.5}
            dotBorderColor={{ from: "color" }}
            enableDotLabel={false}
            dotLabel="value"
            dotLabelYOffset={10}
            colors={{ scheme: "set1" }}
            fillOpacity={0.6}
            blendMode="multiply"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={true}
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: "#999",
                symbolSize: 12,
                symbolShape: "circle",
              },
            ]}
          />
        </div>
      </Col>
    );
  }
}

export default RenderRadar;
