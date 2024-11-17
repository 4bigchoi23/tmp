import { useEffect, useState } from 'react';
import styles from './Youtube.module.css';

// moment.locale('kr');

const Youtube = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=48&regionCode=KR&key=${props.token}`, {
            method : "GET"
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res.items);
            setData(res.items);
        });
    }, []);

    return (
      <div className={"grid gap-3 " + styles.grid}>
        {data.map((item) => (
          <div className={"g-col-12 g-col-sm-6 g-col-md-4 g-col-lg-3 " + styles.gcol} key={item.id}>
            <div className={"card h-100 " + styles.card}>
              <img src={item.snippet.thumbnails.standard.url} alt="" className="card-img-top w-100" />
              <div className="card-body">
                <h3 className={"card-title h6 " + styles.title}>
                  <a href={'https://www.youtube.com/watch?v=' + item.id} target="_blank">{item.snippet.title}</a>
                </h3>
                <p className={"card-desc lh-sm text-muted mb-2 " + styles.desc}>
                  <small>{item.snippet.description}</small>
                </p>
                <div className="card-text">
                  <div>{new Date(item.snippet.publishedAt).toLocaleString()}</div>
                  <div><a href={"https://www.youtube.com/channel/" + item.snippet.channelId} target="_blank">{item.snippet.channelTitle}</a></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default Youtube;
