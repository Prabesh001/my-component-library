const Spinner = ({ className = "w-8", color = "green" }) => {
  return (
    <div
      style={{
        borderBottomColor: color,
        borderRightColor: color,
      }}
      className={`${className} aspect-square border-l-[#0000008c] border-t-[#0000008c] rounded-full border-4 animate-spin`}
    ></div>
  );
};

export default Spinner;
