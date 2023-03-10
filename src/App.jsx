import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const METRICS = ['TTFB', 'LCP', 'FID', 'FCP', 'CLS'];

import './App.css';

const App = () => {
  const [data, dataSet] = React.useState({});

  React.useEffect(() => {
    chrome.runtime.sendMessage(
      {
        type: 'performance:metric:request',
      },
      (d) => {
        dataSet(d);
        // console.log(d);
      }
    );
  }, []);

  return (
    <div>
      <h1>Page Metrics</h1>
      <table>
        <thead>
          <tr>
            <th widht="20%"></th>
            {METRICS.map((metric) => (
              <th key={metric} width="16%">
                {metric}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((url) => (
            <tr key={url}>
              <td>
                <strong>{url.slice(0, 30)}</strong>
              </td>
              {METRICS.map((metric) => (
                <td key={[url, metric].join('')} width="16%">
                  {Math.round((data[url][metric] || { average: 0 }).average)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
