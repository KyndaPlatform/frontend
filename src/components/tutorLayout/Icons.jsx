
let dashboard = "/icons/dashboard.svg"
let sections = "/icons/sections.svg"
let courses = "/icons/courses.svg"
let resources = "/icons/resources.svg"
let earnings = "/icons/earnings.svg"
let report = "/icons/report.svg"
let message = "/icons/message.svg"
let premiumCrown = "/icons/premium-crown.png"
let verified = "/icons/verified.svg"
let arrowDown = "/icons/chevron-down.svg"
let invite = "/icons/invite.svg"
let logOut = "/icons/log-out.svg"
let notification = "/icons/notification.svg"
let profile = "/icons/profile.svg"
let settings = "/icons/settings.svg"
let aiLogo = "/icons/ai-logo.svg"
let topbarBell = "/icons/bell.svg"
let topbarMessage = "/icons/message-comment.svg"
let search = "/icons/search.svg"
let bookOpen = "/icons/book-open.svg"
let downwardTrend = "/icons/downward-trend.svg"
let info = "/icons/info.svg"
let pending = "/icons/pending.svg"
let upwardTrendGreen = "/icons/upward-trend-green.svg"
let upwardTrendYellow = "/icons/upward-trend-yellow.svg"
let upwardTrendGrey = "/icons/upward-trend-grey.svg"
let calendarClock = "/icons/calendar-clock.svg"
let coinStack = "/icons/coin-stack.svg"
let graduationCap = "/icons/graduation-cap.svg"
let circleCheck = "/icons/circle-check.svg"
let redDot = "/icons/red-dot.svg"
let redBell = "/icons/red-bell.svg"
let settingsPurple = "/icons/settings-purple.svg"
let users = "/icons/users.svg"
let horizontalDots = "/icons/horizontal-dots.svg"
let questionMark = "/icons/question.svg"
let closeIcon = "/icons/close-icon.svg"
let bookOpenText = "/icons/book-open-text.svg"
let files = "/icons/files.svg"


const icons = {
  dashboard,
  sections,
  courses,
  resources,
  earnings,
  report,
  message,
  premiumCrown,
  verified,
  arrowDown,
  invite,
  logOut,
  notification,
  profile,
  settings,
  aiLogo,
  topbarBell,
  topbarMessage,
  search,
  bookOpen,
  downwardTrend,
  info,
  pending,
  upwardTrendGreen,
  upwardTrendYellow,
  upwardTrendGrey,
  calendarClock,
  coinStack,
  graduationCap,
  circleCheck,
  redDot,
  redBell,
  settingsPurple,
  users,
  horizontalDots,
  questionMark,
  closeIcon,
  bookOpenText,
  files,
};

export default function Icon({ icon, size = 20 }) {
  const IconSrc = icons[icon];

  if (!IconSrc) {
    return (
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: "#ddd",
          borderRadius: 4,
        }}
      />
    );
  }

  return <img src={IconSrc} alt={icon} width={size} height={size} />;
}
