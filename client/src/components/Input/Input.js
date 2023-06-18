export const Input = ({ className, label, ...rest }) => (
  <label className="flex flex-col text-white font-korinna mt-1">
    {label}
    <input className={`p-3 rounded-md text-black ${className}`} {...rest} />
  </label>
);
