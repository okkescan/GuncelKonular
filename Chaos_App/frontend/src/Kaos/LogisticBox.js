import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const LogisticBox = () => {
  const [params, setParams] = useState({ rMin: 2.8, rMax: 4, accuracy: 0.005, reps: 400, numtoplot: 100 });
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const updateChart = () => {

    const { rMin, rMax, accuracy, reps, numtoplot } = params;

    logisticSystem(rMin, rMax, accuracy, reps, numtoplot)
      .then(data => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');

        chartInstanceRef.current = new Chart(ctx, {
          type: 'scatter',
          data: {
            datasets: [{
              label: `Lojistik Haritası`,
              data: data,
              pointRadius: 0.5,
              backgroundColor: 'rgb(0, 0, 255)',
            }]
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'r'
                },
                type: 'linear',
                position: 'bottom'
              },
              y: {
                title: {
                  display: true,
                  text: 'x'
                }
              }
            }
          }
        });
      })
      .catch(error=>console.log(error));

  };

  const logisticSystem = async (rMin, rMax, accuracy, reps, numtoplot) => {
    const reqBody = JSON.stringify({ rMin, rMax, accuracy, reps, numtoplot });

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/logistic`, reqBody, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      return res.data;
    } catch (error) {
      console.log("error:", error);
    }

  };

  useEffect(updateChart, [params]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setParams(prev => ({ ...prev, [id]: parseFloat(value) }));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        {['rMin', 'rMax', 'accuracy', 'reps', 'numtoplot'].map(param => (
          <div key={param} style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
            <label htmlFor={param} style={{ marginRight: '10px', minWidth: '180px' }}>
              {param === 'rMin' ? 'Min Büyüme Oranı (rMin)' :
                param === 'rMax' ? 'Max Büyüme Oranı (rMax)' :
                  param === 'accuracy' ? 'Hassasiyet' :
                    param === 'reps' ? 'Tekrar Sayısı (reps)' :
                      'Çizilecek Nokta Sayısı (numtoplot)'}:
            </label>
            <input
              type="number"
              id={param}
              value={params[param]}
              onChange={handleChange}
              step="any"
              style={{ width: '80px' }}
            />
          </div>
        ))}
        <button onClick={updateChart} style={{ marginBottom: '20px' }}>Grafiği Güncelle</button>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ width: '80%', maxWidth: '600px' }}>
          <canvas ref={chartRef} id="myChart" style={{ height: '400px' }}></canvas>
        </div>
      </div>
    </div>
  );
};

export default LogisticBox;
