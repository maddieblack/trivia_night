export const Button = ({ children, className, style = {}, ...rest }) => {
  return (
    <button
      className={`rounded text-black font-korinna bg-amber-400 cursor-pointer screen disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 tv:px-14 tv:py-8 text-lg tv:text-5xl tv:rounded-xl  ${className}`}
      {...rest}
    >
      <span className="pt-0.5">{children}</span>
    </button>
  );
};
