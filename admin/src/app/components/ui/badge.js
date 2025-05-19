export function Badge({ children, variant = "default", className = "" }) {
  const baseStyle = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold";
  
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800"
  };

  return (
    <span className={`${baseStyle} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
