import React from 'react';
import { Col, Row, Typography, Avatar, Collapse } from 'antd';

import { useGetCryptoExchangeQuery } from '../services/cryptoApi';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';

import Loader from './Loader';

const { Panel } = Collapse;
const { Text } = Typography;

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangeQuery();
  const exchangeList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <div>
      <Row>
        <Col span={6}>Exchange</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangeList.map((exchange) => (
          <Col span="24">
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}</strong>
                      </Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl}>
                        <strong>{exchange.name}</strong>
                      </Avatar>
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(
                  exchange.description || 'no description provided'
                )}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Exchanges;
