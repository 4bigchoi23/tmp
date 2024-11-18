import { useEffect, useState } from 'react';
import './Youtube.css';

export default function Youtube() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/youtube.json?" + new Date().getTime(), {
            method : "GET"
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res.items);
            setData(res.items);
        });
    }, []);

    return (
      <div className="youtube">
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
