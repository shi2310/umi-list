import React, { FC } from 'react';
import { connect, HeroModelState, ConnectProps, Dispatch } from 'umi';
import styles from './index.less';
import { Row, Col, Radio, Card } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
const RadioGroup = Radio.Group;
const heroType = [
  { key: 0, value: '全部' },
  { key: 1, value: '战士' },
  { key: 2, value: '法师' },
  { key: 3, value: '坦克' },
  { key: 4, value: '刺客' },
  { key: 5, value: '射手' },
  { key: 6, value: '辅助' },
];

interface PageProps extends ConnectProps {
  hero: HeroModelState;
  dispatch: Dispatch;
}

const Hero: FC<PageProps> = (props) => {
  const { heros = [], filterKey = 0 } = props.hero;

  const onChange = (e: RadioChangeEvent) => {
    props.dispatch({
      type: 'hero/save',
      payload: {
        filterKey: e.target.value,
      },
    });
  };

  return (
    <div>
      <Card className={styles.radioPanel}>
        <RadioGroup onChange={onChange} value={filterKey}>
          {heroType.map((data) => (
            <Radio value={data.key} key={`hero-rodio-${data.key}`}>
              {data.value}
            </Radio>
          ))}
        </RadioGroup>
      </Card>
      <Row>
        {heros
          .filter((item) => filterKey === 0 || item.hero_type === filterKey)
          .reverse()
          .map((item) => (
            <Col key={item.ename} span={3} className={styles.heroitem}>
              <img
                src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`}
              />
              <p>{item.cname}</p>
            </Col>
          ))}
      </Row>
    </div>
  );
};
export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(
  Hero,
);
