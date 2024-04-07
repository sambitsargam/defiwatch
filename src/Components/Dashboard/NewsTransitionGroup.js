import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import DefaultCoin from '../../assets/default_coin.png';

const NewsTransition = ({ data }) => {
  const { currentTheme } = useThemeSwitcher();
  return (
    <TransitionGroup className="todo-list">
      {data.length > 0 ? (
        data.map((item, index) => (
          <CSSTransition key={index} timeout={500} classNames="item">
            <div className="transactions-list box-shadow">
              <div className="tr-item">
                <div className="tr-company-name">
                  <div
                    className="tr-icon tr-card-icon d-flex align-items-center justify-content-center tr-card-bg-primary p-0 overflow-hidden"
                    style={{ borderRadius: '0', width: '55px' }}
                  >
                    <NewsIcon image={item?.image_url} />
                  </div>
                  <a
                    className="tr-text"
                    href={`${item?.link}`}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <h6
                      style={{ fontWeight: '400' }}
                      className={
                        currentTheme === 'dark' ? 'text-white' : 'text-dark'
                      }
                    >
                      {item?.title.length > 50
                        ? `${item?.title?.slice(0, 50)}...`
                        : item?.title}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="text-muted">
                        {new Date(item?.pubDate)
                          .toDateString()
                          .split(' ')
                          .slice(1)
                          .join(' ')}
                      </p>
                      <p
                        style={{
                          color: currentTheme === 'dark' ? '#fff' : '#1a1a1a',
                          fontWeight: 600,
                        }}
                      >
                        {item?.source_id}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </CSSTransition>
        ))
      ) : (
        <p>No data to display</p>
      )}
    </TransitionGroup>
  );
};

const NewsIcon = ({ image }) => {
  const [src, setSrc] = useState(image || DefaultCoin);
  const onError = () => {
    setSrc(DefaultCoin);
  };
  return (
    <img
      src={src}
      alt=""
      onError={onError}
      width="45px"
      height="45px"
      style={{ objectFit: 'contain' }}
    />
  );
};

export default NewsTransition;
