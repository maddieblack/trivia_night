export const Button = ({ children, className, ...rest }) => {
  return (
    <button
      className={`p-3 rounded text-black font-korinna bg-amber-400 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
