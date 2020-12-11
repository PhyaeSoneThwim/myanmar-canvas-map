import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import map from "./map.json";
import { COLORS } from "./constants";

const App = () => {
  const [content, setContent] = useState("");
  return (
    <div style={{ width: "30%" }}>
      <ReactTooltip>{content}</ReactTooltip>
      <ComposableMap width={500} projection="geoMercator" data-tip="">
        <ZoomableGroup
          disablePanning
          disableZooming
          center={[96, 20]}
          zoom={10}
        >
          <Geographies geography={map}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    onMouseEnter={() => {
                      const { NAME_1 = "" } = geo.properties;
                      setContent(`${NAME_1}`);
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                    fill={COLORS[geo.properties.NAME_1].default}
                    style={{
                      default: {
                        outline: "none",
                        stroke: "#FFFFFF",
                        strokeWidth: "0.05",
                      },
                      hover: {
                        outline: "none",
                        fill: COLORS[geo.properties.NAME_1].hover,
                      },
                      pressed: {
                        outline: "none",
                      },
                    }}
                    key={geo.rsmKey}
                    geography={geo}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
