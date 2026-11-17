export function HarmoniaLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="harmoniaGold" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6C15A" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      {/* 5-petal Harmonia floral emblem */}
      <path
        d="M32 8C27.5 14.5 27.5 22.5 32 28C36.5 22.5 36.5 14.5 32 8Z"
        stroke="url(#harmoniaGold)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M54.8 24.6C47.2 22.5 39.6 25.1 35.8 30.8C42.6 32.8 49.8 30.2 54.8 24.6Z"
        stroke="url(#harmoniaGold)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M46.1 51.4C45.8 43.5 41.2 37.2 34.5 35.4C35 42.4 39.6 48.8 46.1 51.4Z"
        stroke="url(#harmoniaGold)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M17.9 51.4C24.4 48.8 29 42.4 29.5 35.4C22.8 37.2 18.2 43.5 17.9 51.4Z"
        stroke="url(#harmoniaGold)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 24.6C14.2 30.2 21.4 32.8 28.2 30.8C24.4 25.1 16.8 22.5 9.2 24.6Z"
        stroke="url(#harmoniaGold)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
