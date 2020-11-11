import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

function TempGraph(props) {
  let data = [];

  console.log(props);
  props.detailedWeather.hourly.slice(0, 12).map((hour) => {
    data.push({
      name:
        new Date(hour.dt * 1000).getHours() +
        ":" +
        new Date(hour.dt * 1000).getMinutes() +
        "0",
      temp: Math.floor(hour.temp - 273),
    });
  });

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="card-text col-12 mb-3">
          <small className="text-muted">
            <div className={`card ${props.theme}`}>
              <div className={`card-body ${props.theme}`}>
                <div style={{ width: "100%", height: "30vh" }}>
                  <ResponsiveContainer>
                    <AreaChart
                      data={data}
                      margin={{
                        top: 0,
                        right: 0,
                        left: -40,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="temp"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </small>
        </div>
      </div>
    </div>
  );
}

export default TempGraph;
