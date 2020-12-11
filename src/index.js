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
  const defaultContent = {
    color: "",
    title: "",
    value: "",
    label: "",
  };
  const [content, setContent] = useState(defaultContent);
  return (
    <div style={{ width: "30%" }}>
      <ReactTooltip className="px-2 rounded-lg" type="dark">
        <div className="inline-flex items-center">
          <div
            style={{ backgroundColor: content.color }}
            className="w-3 h-3 inline-block rounded-full"
          ></div>
          <span className="ml-2">{content.label}</span>
        </div>
        <div>Total Count - 250</div>
      </ReactTooltip>
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
                      setContent({
                        ...defaultContent,
                        label: NAME_1,
                        color: COLORS[NAME_1].default,
                      });
                    }}
                    onMouseLeave={() => {
                      setContent(defaultContent);
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
