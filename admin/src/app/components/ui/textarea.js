export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      rows={4}
      {...props}
    />
  );
}
