import React from "react";
const SectionTitle = ({
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  return (
    <div
      className={`w-full space-y-2.5 mb-6 md:mb-8 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="text-sm text-gray-700">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;