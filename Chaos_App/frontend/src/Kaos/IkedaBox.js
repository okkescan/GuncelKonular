import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const IkedaBox = () => {
  const [u, setU] = useState(0.9);
  const [a, setA] = useState(0.5);
  const [iterations, setIterations] = useState(10000);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const updateChart = () => {
    ikedaSystem(0, 0, u, a, iterations)
      .then(data => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstanceRef.current = new Chart(ctx, {
          type: 'scatter',
          data: {
            datasets: [{
              label: `İkeda Haritası (u=${u}, a=${a})`,
              data: data.map(point => ({ x: point[0], y: point[1] })),
              pointRadius: 3,
              pointBackgroundColor: 'rgb(255, 99, 132)',
              borderWidth: 0,
            }]
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'X',
                  fontSize: 16
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Y',
                  fontSize: 16
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  fontSize: 14
                }
              }
            }
          }
        });
      })
      .catch(error => console.log(error));
  };

  const ikedaSystem = async (x0, y0, u, a, iterations) => {
    const reqBody = JSON.stringify({ x0, y0, u, a, iterations });

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/ikeda`, reqBody, {
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
  }, []);

  return (
    <div>
      <div>
        <label htmlFor="u">u:</label>
        <input
          type="number"
          id="u"
          value={u}
          onChange={(e) => setU(parseFloat(e.target.value))}
          step="any"
        />
      </div>
      <div>
        <label htmlFor="a">a:</label>
        <input
          type="number"
          id="a"
          value={a}
          onChange={(e) => setA(parseFloat(e.target.value))}
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
      <button onClick={updateChart}>Grafiği Güncelle</button>
      <canvas ref={chartRef} id="myChart" style={{ height: "100px" }}></canvas>
    </div>
  );
};

export default IkedaBox;
