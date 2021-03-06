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
import { COLORS, DATA } from "./constants";

const App = () => {
  const [content, setContent] = useState({
    open: false,
    label: "",
  });
  return (
    <div style={{ width: "30%" }}>
      <ReactTooltip className="px-2 rounded-lg" type="dark">
        {content.open && (
          <>
            <div className="inline-flex items-center">
              <div
                style={{ backgroundColor: COLORS[content.label].default }}
                className="w-3 h-3 inline-block rounded-full"
              ></div>
              <span className="ml-2">{content.label}</span>
            </div>
            <p>Male Count - {DATA[content.label].male}</p>
            <p>Female Count - {DATA[content.label].female}</p>
          </>
        )}
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
                        ...content,
                        open: true,
                        label: NAME_1,
                        maleCount: COLORS[NAME_1].male,
                        femaleCount: COLORS[NAME_1].female,
                      });
                    }}
                    onMouseLeave={() => {
                      setContent({
                        ...content,
                        open: false,
                      });
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
