export const Input = ({ className, label, type, name, value }) => {
  return (
    <input
      className={className}
      type={type}
      name={name}
      defaultValue={value}
      required
      placeholder={label}
    />
  );
};
