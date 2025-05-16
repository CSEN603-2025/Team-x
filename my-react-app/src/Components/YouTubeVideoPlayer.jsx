import React from 'react';
import styles from './YouTubeVideoPlayer.module.css';

const YouTubeVideoPlayer = ({ videoId, title }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.videoWrapper}>
        <iframe
          className={styles.iframe}
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeVideoPlayer;
