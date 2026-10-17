const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Icon = ({ name, size = 24, ...rest }) => {
  const p = { ...base, width: size, height: size, ...rest }
  switch (name) {
    case 'code':
      return (
        <svg {...p}>
          <path d="m8 7-5 5 5 5" />
          <path d="m16 7 5 5-5 5" />
          <path d="m14 4-4 16" />
        </svg>
      )
    case 'bars':
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <rect x="4" y="12" width="4.2" height="8" rx="1.2" />
          <rect x="9.9" y="4" width="4.2" height="16" rx="1.2" />
          <rect x="15.8" y="9" width="4.2" height="11" rx="1.2" />
        </svg>
      )
    case 'trophy':
      return (
        <svg {...p}>
          <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
          <path d="M8 6H4.5v1.5A3 3 0 0 0 8 10.5" />
          <path d="M16 6h3.5v1.5A3 3 0 0 1 16 10.5" />
          <path d="M12 13v4" />
          <path d="M8.5 20h7" />
          <path d="M9.5 17h5v3h-5z" />
        </svg>
      )
    case 'book':
      return (
        <svg {...p}>
          <path d="M3 5.5C5.5 4.5 9 4.5 12 6.5c3-2 6.5-2 9-1V19c-2.5-1-6-1-9 1-3-2-6.5-2-9-1V5.5Z" />
          <path d="M12 6.5V20" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...p}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      )
    case 'arrow-up-right':
      return (
        <svg {...p}>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      )
    case 'chat':
      return (
        <svg {...p}>
          <path d="M20.5 11.5a8 8 0 0 1-11.8 7L3.5 20l1.6-4.4A8 8 0 1 1 20.5 11.5Z" />
        </svg>
      )
    case 'folder':
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" opacity=".35" />
          <path d="M3 10h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7Z" />
        </svg>
      )
    case 'database':
      return (
        <svg {...p}>
          <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
          <path d="M5 5.5v13c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-13" />
          <path d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
        </svg>
      )
    case 'sun':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </svg>
      )
    case 'moon':
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
        </svg>
      )
    case 'github':
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.4 2.7 5 6 5c2 0 3.4 1.1 4.2 2.4h.1C11.1 6.1 12.5 5 14.5 5c3.3 0 5.1 3.4 3.6 6.7C16 16.4 12 21 12 21Z" />
        </svg>
      )
    case 'star':
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8L12 2.8Z" />
        </svg>
      )
    case 'cat':
      return (
        <svg {...p}>
          <path d="M5 4.5 8.4 7a8.5 8.5 0 0 1 7.2 0L19 4.5v7.2a7 7 0 0 1-14 0V4.5Z" fill="#ffb066" stroke="#2a2f45" />
          <circle cx="9.2" cy="12.2" r="1" fill="#2a2f45" stroke="none" />
          <circle cx="14.8" cy="12.2" r="1" fill="#2a2f45" stroke="none" />
          <path d="M11 14.6h2l-1 1.1-1-1.1Z" fill="#ff7aa2" stroke="#ff7aa2" strokeWidth="1" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.85h-4v-5.19c0-1.24-.02-2.83-1.73-2.83-1.73 0-2 1.35-2 2.74v5.28h-4V9.75Z" />
        </svg>
      )
    case 'x':
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...p}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m4 8 8 6 8-6" />
        </svg>
      )
    case 'link':
      return (
        <svg {...p}>
          <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
          <path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1" />
        </svg>
      )
    case 'flower':
      return (
        <svg {...p} fill="currentColor" stroke="none">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="12" cy="7" rx="3.2" ry="4.6" transform={`rotate(${a} 12 12)`} />
          ))}
          <circle cx="12" cy="12" r="2.6" fill="#ffe27a" />
        </svg>
      )
    default:
      return null
  }
}

export const Sparkle = ({ color = '#b886e0', size = 22, style }) => (
  <svg
    className="sparkle"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={style}
    aria-hidden="true"
  >
    <path
      d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5C11.3 16.9 7.1 12.7 1.5 12 7.1 11.3 11.3 7.1 12 1.5Z"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
)

export const Flower = ({ petal = '#f58fd0', centre = '#ffe27a', style }) => (
  <svg className="flower" width="44" height="62" viewBox="0 0 44 62" style={style} aria-hidden="true">
    <path d="M22 62V30" stroke="#6fb66a" strokeWidth="3" strokeLinecap="round" />
    <path d="M22 50c-7 0-11-4-12-9 7 0 11 3 12 9Z" fill="#7cc576" />
    <path d="M22 44c6-1 10-5 11-10-6 1-10 4-11 10Z" fill="#7cc576" />
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx="22" cy="12" rx="6" ry="8.5" fill={petal} transform={`rotate(${a} 22 22)`} />
    ))}
    <circle cx="22" cy="22" r="5" fill={centre} />
  </svg>
)

/* Small logos for the coding-profile tiles */
export const PlatformLogo = ({ name, size = 22 }) => {
  switch (name) {
    case 'codeforces':
      return <Icon name="bars" size={size} />
    case 'github':
      return <Icon name="github" size={size + 12} />
    case 'codechef':
      return (
        <svg width={size + 2} height={size + 2} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10a3.2 3.2 0 0 1 1.4-6 3.6 3.6 0 0 1 7.2 0A3.2 3.2 0 0 1 17 10v1H7v-1Z" fill="#fff" stroke="#6b4a2f" strokeWidth="1.4" />
          <path d="M8 11h8l-.7 9H8.7L8 11Z" fill="#c98a55" stroke="#6b4a2f" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      )
    case 'leetcode':
      return (
        <svg width={size + 10} height={size + 10} viewBox="0 0 24 24" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 4.5 5.8 13.2a3.2 3.2 0 0 0 0 4.5l2 2a3.2 3.2 0 0 0 4.5 0l2.4-2.4" stroke="#f5a524" strokeWidth="2.2" />
          <path d="M10.5 13.2h9" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      )
    case 'cses':
      return <b className="logo-letter">C</b>
    case 'atcoder':
      return <b className="logo-letter">A</b>
    default:
      return <Icon name="link" size={size} />
  }
}