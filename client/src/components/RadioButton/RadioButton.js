import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";

export const RadioButton = ({
  className = "",
  label = "",
  checked,
  ...rest
}) => {
  return (
    <label className="p-5 bg-white rounded flex justify-between gap-5 font-korinna text-2xl w-96 border-2 border-transparent hover:border-amber-500 ">
      {label}
      <input
        className={`appearance-none ${className}`}
        type="radio"
        {...rest}
      />
      <div>
        {checked && (
          <FontAwesomeIcon className="text-amber-500" icon={faGavel} />
        )}
      </div>
    </label>
  );
};
