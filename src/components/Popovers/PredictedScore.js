import React from "react";
import Popover from "react-bootstrap/Popover";
const PredictedScorePopover = (
  <Popover id="PredictedScorePopover">
    <Popover.Title as="h3">Best Odds</Popover.Title>
    <Popover.Content>
      Based on our predictive model based on 7 years of player data
    </Popover.Content>
  </Popover>
);

export default PredictedScorePopover;
