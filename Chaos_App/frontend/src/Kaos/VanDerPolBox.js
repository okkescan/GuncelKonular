import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const VanDerPolBox = () => {
  const [mu, setMu] = useState(1);
  const [iterations, setIterations] = useState(10000);
  const [dt, setDt] = useState(0.01);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const updateChart = () => {
    vanDerPolSystem(1, 0, mu, iterations, dt)
      .then(data => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstanceRef.current = new Chart(ctx, {
          type: 'scatter',
          data: {
            datasets: [{
              label: `Van der Pol Haritası (mu=${mu}, dt=${dt})`,
              data: data.map(point => ({ x: point[0], y: point[1] })),
              pointRadius: 1,
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
            }]
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'X'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Y'
                }
              }
            }
          }
        });
      })
      .catch(error => console.log(error));
  };

  const vanDerPolSystem = async (x0, y0, mu, iterations, dt) => {
    const reqBody = JSON.stringify({ x0, y0, mu, iterations, dt });

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/vanderpol`, reqBody, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      return res.data;
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    updateChart();
  }, [iterations, mu, dt]);

  return (
    <div>
      <div>
        <label htmlFor="mu">Mu:</label>
        <input
          type="number"
          id="mu"
          value={mu}
          onChange={(e) => setMu(parseFloat(e.target.value))}
          step="any"
        />
      </div>
      <div>
        <label htmlFor="iterations">İterasyon Sayısı:</label>
        <input
          type="number"
          id="iterations"
          value={iterations}
          onChange={(e) => setIterations(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="dt">Zaman Adımı (dt):</label>
        <input
          type="number"
          id="dt"
          value={dt}
          onChange={(e) => setDt(parseFloat(e.target.value))}
          step="any"
        />
      </div>
      <button onClick={updateChart}>Grafiği Güncelle</button>
      <canvas ref={chartRef} id="myChart" style={{ height: "100px" }}></canvas>
    </div>
  );
};

export default VanDerPolBox;
