import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { Code } from 'react-feather';
import { useThemeSwitcher } from 'react-css-theme-switcher';

const Transition = ({ data, chainId }) => {
  const { currentTheme } = useThemeSwitcher();
  const isDarkMode = currentTheme === 'dark';
  return (
    <TransitionGroup className="todo-list">
      {data?.length > 0 ? (
        data.map((item, index) => (
          <CSSTransition key={index} timeout={500} classNames="item">
            <div className="transactions-list mb-4">
              <div className="tr-item">
                <div className="tr-company-name">
                  <div className="tr-icon tr-card-icon text-primary tr-card-bg-primary">
                    <Code />
                  </div>
                  <div className="tr-text overflow-hidden text-muted">
                    {chainId === 1 || chainId === 56 ? (
                      <a
                        href={
                          chainId === 1
                            ? `https://etherscan.io/tx/${item.tx_hash}`
                            : `https://bscscan.com/tx/${item.tx_hash}`
                        }
                        target="_blank"
                        rel="noreferrer nofollow"
                      >
                        <div className="d-flex justify-space-between">
                          <p
                            style={{
                              color: isDarkMode ? 'rgba(251,251,251)' : 'blue',
                              marginRight: '12px',
                            }}
                          >
                            {item.tx_hash.slice(0, 15)}...
                          </p>
                          <p style={{ width: '100%' }}>
                            {new Date(item.block_signed_at).toDateString()}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="d-flex justify-space-between">
                        <p
                          style={{
                            color: isDarkMode ? 'rgba(251,251,251)' : 'blue',
                            marginRight: '12px',
                          }}
                        >
                          {item.tx_hash.slice(0, 15)}...
                        </p>
                        <p style={{ width: '100%' }}>
                          {new Date(item.block_signed_at).toDateString()}
                        </p>
                      </div>
                    )}

                    <p className="text-truncate">
                      <b>From: </b>
                      {chainId === 1 || chainId === 56 ? (
                        <a
                          href={
                            chainId === 1
                              ? `https://etherscan.io/address/${item.from_address}`
                              : `https://bscscan.com/address/${item.from_address}`
                          }
                          target="_blank"
                          rel="noreferrer nofollow"
                          style={{ color: 'blue' }}
                        >
                          {item.from_address}
                        </a>
                      ) : (
                        <p> {item.from_address}</p>
                      )}
                    </p>
                    <p className="text-truncate">
                      <b>To: </b>
                      {chainId === 1 || chainId === 56 ? (
                        <a
                          href={
                            chainId === 1
                              ? `https://etherscan.io/address/${item.to_address}`
                              : `https://bscscan.com/address/${item.to_address}`
                          }
                          target="_blank"
                          rel="noreferrer nofollow"
                          style={{ color: 'blue' }}
                        >
                          {item.to_address}
                        </a>
                      ) : (
                        <p>{item.to_address}</p>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
        ))
      ) : (
        <p></p>
      )}
      {/* <p>You don't have any transactions</p> */}
    </TransitionGroup>
  );
};

const mapStateToProps = (state) => ({
  chainId: state.auth.chainId,
});

export default connect(mapStateToProps)(Transition);
