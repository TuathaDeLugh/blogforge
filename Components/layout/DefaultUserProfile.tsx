import React from "react";

interface ProfileAvatarProps {
  username: string | null | undefined;
  size?: "sm" | "md" | number;
  className?: string;
  random?: boolean;
}

export default function DefaultUserProfile({
  username,
  size = "sm",
  className = "",
  random = false,
}: ProfileAvatarProps) {
  const initial = username?.charAt(0)?.toUpperCase() || "?";

  const sizeClasses = {
    sm: "w-[30px] h-[30px] text-md",
    md: "w-24 h-24 text-2xl",
  };

  const generateRandomGradient = () => {
    const colors = [
      // Main oranges / warm shades
      "#FF7F00",
      "#FF6B00",
      "#FF4500",
      "#E25822",
      "#FF8C00",

      // Reddish / fiery accents
      "#FF6347",
      "#E34234",

      // Yellows (deeper, golden side)
      "#FFA500", 
      "#FFD700",
      "#E39B02",

      // Sky blues (richer side)
      "#00BFFF",
      "#1E90FF",

      // Greens (stronger, not pastel)
      "#32CD32",
      "#228B22",
    ];

    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(to bottom right, ${randomColor()}, ${randomColor()}, ${randomColor()})`;
  };

  const backgroundStyle = random
    ? { background: generateRandomGradient() }
    : undefined;

  const customSizeStyle =
    typeof size === "number"
      ? {
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size / 1.75}px`,
        }
      : {};

  const sizeClass = typeof size === "string" ? sizeClasses[size] : "";

  return (
    <div
      className={`rounded-full shadow-text flex items-center justify-center text-white font-semibold 
      bg-gradient-to-br from-[#eb8939] via-[#ffa237] to-[#fa5f51] ${sizeClass} ${className}`}
      style={{ ...backgroundStyle, ...customSizeStyle }}
    >
      {initial}
    </div>
  );
}
