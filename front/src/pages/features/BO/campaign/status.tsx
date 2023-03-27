import { Select } from 'antd';


const { Option } = Select;

interface StatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ value, onChange }) => {
  const statusOptions = ['active', 'paused', 'completed'];

  return (
    <Select value={value} onChange={onChange}>
      {statusOptions.map((status) => (
        <Option key={status} value={status}>
          {status}
        </Option>
      ))}
    </Select>
  );
};

export default StatusDropdown;
