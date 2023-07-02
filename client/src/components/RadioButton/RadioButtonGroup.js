import { RadioButton } from "@/components/RadioButton";

export const RadioButtonGroup = ({
  options,
  className = "",
  onChange,
  value,
  ...rest
}) => {
  return (
    <div className={`flex flex-col gap-4 tv:gap-8 ${className}`} {...rest}>
      {options.map(({ value: v, label }) => (
        <RadioButton
          label={label}
          key={v}
          id={v}
          checked={value === v}
          onClick={() => onChange(v)}
        />
      ))}
    </div>
  );
};
