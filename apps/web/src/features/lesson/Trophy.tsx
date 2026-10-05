/** Ilustrasi piala — diport dari repo desain (Illustrations.tsx). */
export function Trophy({ size = 140 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ilustrasi Piala Keberhasilan"
    >
      <circle cx="70" cy="70" r="60" fill="#E1F4FD" />
      <circle cx="70" cy="70" r="46" fill="#89CFF0" fillOpacity="0.28" />
      <circle cx="26" cy="40" r="5" fill="#FFC53D" />
      <circle cx="114" cy="36" r="4.5" fill="#1E6FB8" />
      <circle cx="22" cy="88" r="4" fill="#22C55E" />
      <circle cx="116" cy="84" r="5.5" fill="#FFC53D" />
      <path d="M70 12L73 20L81 23L73 26L70 34L67 26L59 23L67 20L70 12Z" fill="#FFC53D" />
      <path
        d="M44 48H32C27 48 24 52 24 57C24 66 32 73 44 74"
        stroke="#F59E0B"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M96 48H108C113 48 116 52 116 57C116 66 108 73 96 74"
        stroke="#F59E0B"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M42 38H98V64C98 80 85 92 70 92C55 92 42 80 42 64V38Z"
        fill="#FFC53D"
        stroke="#1E6FB8"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M52 46V62C52 70 56 76 62 79" stroke="#FFFBEB" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M70 49L73.5 56.5L81.5 57.5L75.5 63L77 71L70 67L63 71L64.5 63L58.5 57.5L66.5 56.5L70 49Z"
        fill="#FFFFFF"
        stroke="#1E6FB8"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="63" y="92" width="14" height="16" fill="#F59E0B" stroke="#1E6FB8" strokeWidth="3" />
      <rect x="46" y="108" width="48" height="12" rx="6" fill="#1E6FB8" />
      <rect x="54" y="112" width="32" height="4" rx="2" fill="#89CFF0" />
    </svg>
  )
}
