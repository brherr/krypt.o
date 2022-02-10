import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcryptocurrency&psig=AOvVaw064BdlQgXc7kvJJDlD0RGc&ust=1644604402452000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPjDiPvi9fUCFQAAAAAdAAAAABAD'

const News = ({ simplified }) => {
  const [newsCategory, setnewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12  });
  const { data } = useGetCryptosQuery(100);
  
  if(!cryptoNews?.value) return 'Loading...';

  return (
    // check img style
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='selectNews'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => console.log(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value='Crytocurrency'>Crytocurrency</Option>

          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href= {news.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{news.name}</Title>
                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage } alt='news'></img>
              </div>
              <p>
                {news.description > 100 ? `${news.description.substring(0, 100)}...`
                 : news.description 
              }
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage } alt='' />
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
};



export default News;