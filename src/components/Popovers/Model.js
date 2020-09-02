import React from "react";
import Popover from "react-bootstrap/Popover";
const ModelPopover = (
  <Popover id="ModelPopover">
    <Popover.Title as="h3">Best Odds</Popover.Title>
    <Popover.Content>
      Simple way to assess how the odds compare to what our model thinks the
      player's odds should be. 100% = priced accurately. Yellow = 100-124%, Red
      = 125% and above.
    </Popover.Content>
  </Popover>
);

export default ModelPopover;
