export const Button = ({ children, className, ...rest }) => {
  return (
    <button
      className={`p-3 rounded text-black font-korinna ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
