import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const productSales = [
  {
    name: 'Jan',
    product1: 4000,
    product2: 2400,
  },
  {
    name: 'Feb',
    product1: 3000,
    product2: 2210,
  },
  {
    name: 'Mar',
    product1: 2000,
    product2: 2290,
  },
  {
    name: 'Apr',
    product1: 2780,
    product2: 2000,
  },
  {
    name: 'May',
    product1: 1890,
    product2: 2181,
  },
  {
    name: 'June',
    product1: 1790,
    product2: 2581,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ padding: '7px', backgroundColor: '#fff', border: '1px solid #ccc' }}>
        <p className="label" style={{ marginBottom: '5px' }}>{label}</p>
        <p style={{ color: '#2A7534' }}>Product 1: <span>${payload[0].value}</span></p>
        <p style={{ color: '#25674F' }}>Product 2: <span>${payload[1].value}</span></p>
      </div>
    );
  }
  return null;
};


CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,  
    })
  ),
  label: PropTypes.string,
};

const AreaChartComponent = () => {
  return (
    <ResponsiveContainer width={1200} height={270}>

      <AreaChart width={50} height={50} data={productSales}>
        <YAxis />
        <XAxis dataKey="name" />
        <Tooltip content={<CustomTooltip />} />

        <Legend />


        <Area
          type="monotone"
          dataKey="product1"
          stroke="#482F0B"
          fill="#27A673"
          stackId="1"
        />

        <Area
          type="monotone"
          dataKey="product2"
          stroke="#482F0B"
          fill="#9ECAA3"
          stackId="1"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
