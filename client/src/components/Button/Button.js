export const Button = ({ children, className, ...rest }) => {
  return (
    <button
      className={`p-3 rounded text-black font-korinna bg-amber-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
