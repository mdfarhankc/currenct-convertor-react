const Skeleton = ({
  width,
  height,
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    className={`bg-gray-200 animate-pulse ${className}`}
    style={{ width: width || "100%", height: height || "20px" }}
  ></div>
);

export default Skeleton;
