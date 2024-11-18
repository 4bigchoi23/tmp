import { useEffect, useState, useRef } from 'react';
import './Youtube.css';

function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Youtube() {
  const [data, setData] = useState([]);
  const [time, setTime] = useState('');

  const fetchData = () => {
    fetch("/api/youtube.json?" + new Date().getTime(), {
        method : "GET"
    })
    .then(res => res.json())
    .then(res => {
        setData(res.items);
        setTime(new Date().toString());
    });
  };

  useEffect(fetchData, []);
  useInterval(fetchData, 1000 * 60 * 5);

  return (
    <div className="youtube">
      <div className="text-center mb-4">
        <span>{time}</span>
      </div>
      <div className="grid gap-3">
        {data?.map((item: {
          id: string,
          snippet: {
            title: string;
            description: string;
            thumbnails: {
              standard: {
                url: string;
              };
            };
            publishedAt: string;
            channelTitle: string;
            channelId: string;
          };
        }) => (
          <div className="g-col-12 g-col-sm-6 g-col-md-4 g-col-lg-3" key={item.id}>
            <div className="card h-100">
              <div className="card-img-top" style={{backgroundImage: 'url(' + item.snippet.thumbnails.standard.url + ')'}}>
                <img src={item.snippet.thumbnails.standard.url} alt="" className="card-img w-100" />
              </div>
              <div className="card-body">
                <h3 className="card-title h6">
                  <a href={'https://www.youtube.com/watch?v=' + item.id} target="_blank">{item.snippet.title}</a>
                </h3>
                <p className="card-desc lh-sm text-muted mb-2">
                  <small>{item.snippet.description}</small>
                </p>
                <div className="card-info">
                  <div><small>{new Date(item.snippet.publishedAt).toLocaleString()}</small></div>
                  <div><a href={"https://www.youtube.com/channel/" + item.snippet.channelId} target="_blank">{item.snippet.channelTitle}</a></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
