const Skeleton = ({ className = "w-80 aspect-video" }) => {
  return (
    <div className={`${className} bg-gray-600 animate-pulse rounded-md `} />
  );
};
export default Skeleton;
