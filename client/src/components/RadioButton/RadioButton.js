import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";

export const RadioButton = ({
  className = "",
  label = "",
  checked,
  ...rest
}) => {
  return (
    <label className="p-5 bg-white rounded flex justify-between items-center gap-5 font-korinna text-2xl min-w-96 border-2 border-transparent hover:border-amber-500 tv:text-7xl tv:p-12 tv:min-w-[900px] tv:rounded-2xl ">
      {label}
      <input
        className={`appearance-none ${className}`}
        type="radio"
        {...rest}
      />
      <div>
        {checked && (
          <FontAwesomeIcon
            className="text-amber-500 text-2xl tv:text-6xl"
            icon={faGavel}
          />
        )}
      </div>
    </label>
  );
};
