import Checkbox from './Checkbox';

const CheckboxGroup = ({ options, values, onChange }) => {
  return (
    <div>
      {options.map(({ id, label, disabled }) => (
        <Checkbox
          key={id}
          id={id}
          label={label}
          checked={values.includes(id)}
          onChange={(e) => onChange(id, e.target.checked)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup;
