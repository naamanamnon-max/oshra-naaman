import { type FormEvent, useCallback, useEffect, useState } from 'react'
import {
  Activity,
  ArrowLeft,
  Award,
  Bone,
  BookOpen,
  ChevronDown,
  ClipboardList,
  Compass,
  Droplet,
  Droplets,
  Footprints,
  Heart,
  HeartHandshake,
  HelpCircle,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  PhoneCall,
  Plus,
  Quote,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Sunrise,
  X,
} from 'lucide-react'

/* ============================================================
   Site config & shared helpers
   ============================================================ */

const SITE = {
  name: 'אושרה נעמן',
  tagline: 'חיבור גוף, תודעה ותנועה',
  phoneDisplay: '050-811-1514',
  phoneE164: '972508111514',
  whatsappMessage: 'שלום אושרה, אשמח לתאם פגישת אבחון וייעוץ',
  floatingWhatsappMessage: 'היי אושרה, הגעתי מהאתר ואשמח לפרטים נוספים...',
  email: 'osnaaman@gmail.com',
  areaServed: 'מרכז הארץ (וגם באונליין)',
} as const

const whatsappUrl = (message: string = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.phoneE164}?text=${encodeURIComponent(message)}`

const telUrl = () => `tel:+${SITE.phoneE164}`
const mailUrl = () => `mailto:${SITE.email}`

const HEADER_NAV_LINKS = [
  { id: 'about', label: 'אודות' },
  { id: 'emotsiology', label: 'אמוציולוגיה' },
  { id: 'seniors', label: 'הגיל השלישי ושיקום' },
  { id: 'coaching', label: 'אימון אישי' },
  { id: 'testimonials', label: 'המלצות' },
  { id: 'contact', label: 'צור קשר' },
] as const

const FOOTER_NAV_LINKS = [
  { id: 'about', label: 'אודות' },
  { id: 'emotsiology', label: 'אמוציולוגיה' },
  { id: 'seniors', label: 'הגיל השלישי ושיקום' },
  { id: 'coaching', label: 'אימון אישי' },
  { id: 'tips', label: 'טיפים וידע' },
  { id: 'testimonials', label: 'המלצות' },
  { id: 'faq', label: 'שאלות נפוצות' },
  { id: 'contact', label: 'צור קשר' },
] as const

const SUBJECTS = [
  'אמוציולוגיה ואבחון דם',
  'שיקום ואימון לגיל השלישי',
  'אימון אישי',
  'אחר',
] as const

type ContactSubject = (typeof SUBJECTS)[number]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ============================================================
   Accessibility hook (font-size A- / A / A+)
   ============================================================ */

type FontScale = 'base' | 'lg' | 'xl'

const FS_STORAGE_KEY = 'oshra-font-scale'
const FS_SCALES: FontScale[] = ['base', 'lg', 'xl']

function applyFontScale(scale: FontScale) {
  if (scale === 'base') {
    document.documentElement.removeAttribute('data-fs')
  } else {
    document.documentElement.setAttribute('data-fs', scale)
  }
}

function useAccessibility() {
  const [scale, setScale] = useState<FontScale>('base')

  useEffect(() => {
    const stored = window.localStorage.getItem(FS_STORAGE_KEY) as FontScale | null
    const initial = stored && FS_SCALES.includes(stored) ? stored : 'base'
    setScale(initial)
    applyFontScale(initial)
  }, [])

  const increase = useCallback(() => {
    setScale((current) => {
      const next = FS_SCALES[Math.min(FS_SCALES.indexOf(current) + 1, FS_SCALES.length - 1)]
      applyFontScale(next)
      window.localStorage.setItem(FS_STORAGE_KEY, next)
      return next
    })
  }, [])

  const decrease = useCallback(() => {
    setScale((current) => {
      const next = FS_SCALES[Math.max(FS_SCALES.indexOf(current) - 1, 0)]
      applyFontScale(next)
      window.localStorage.setItem(FS_STORAGE_KEY, next)
      return next
    })
  }, [])

  return { scale, increase, decrease }
}

/* ============================================================
   Header
   ============================================================ */

type HeaderProps = {
  scale: FontScale
  onIncrease: () => void
  onDecrease: () => void
}

function Header({ scale, onIncrease, onDecrease }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id: string) => {
    setMenuOpen(false)
    scrollToId(id)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-shadow ${
        scrolled
          ? 'border-purple-100 bg-cream-50/95 shadow-md backdrop-blur'
          : 'border-transparent bg-cream-50/80 backdrop-blur'
      }`}
    >
      {/* Accessibility bar */}
      <div className="hidden items-center justify-between border-b border-purple-900 bg-purple-950 px-4 text-cream-100 sm:flex lg:px-10">
        <div className="flex items-center gap-2 text-sm">
          <a
            href={telUrl()}
            className="flex min-h-12 items-center gap-2 rounded-lg px-2 transition-colors hover:bg-white/5 hover:text-violet-200"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>
          <a
            href={mailUrl()}
            className="hidden min-h-12 items-center gap-2 rounded-lg px-2 transition-colors hover:bg-white/5 hover:text-violet-200 xl:flex"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {SITE.email}
          </a>
        </div>
        <div className="flex items-center gap-2" role="group" aria-label="הגדלת והקטנת גודל טקסט">
          <span className="text-sm text-cream-200">גודל טקסט:</span>
          <button
            type="button"
            onClick={onDecrease}
            disabled={scale === 'base'}
            aria-label="הקטן גודל טקסט"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cream-200/40 text-sm font-bold transition-colors hover:bg-cream-50 hover:text-purple-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-6 text-center text-sm font-bold" aria-live="polite">
            {scale === 'base' ? 'א' : scale === 'lg' ? 'א+' : 'א++'}
          </span>
          <button
            type="button"
            onClick={onIncrease}
            disabled={scale === 'xl'}
            aria-label="הגדל גודל טקסט"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cream-200/40 text-sm font-bold transition-colors hover:bg-cream-50 hover:text-purple-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-10">
        <button
          type="button"
          onClick={() => scrollToId('top')}
          className="flex min-h-12 items-center gap-3 text-right"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-900 text-lg font-bold text-cream-50 font-display">
            א.נ
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold text-purple-950 sm:text-xl">
              אושרה נעמן
            </span>
            <span className="block text-xs text-purple-700 sm:text-sm">חיבור גוף, תודעה ותנועה</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="ניווט ראשי">
          {HEADER_NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className="flex min-h-12 items-center rounded-full px-3 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-50 hover:text-purple-950 xl:text-base"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center gap-2 rounded-full bg-sage-700 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-sage-800"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            וואטסאפ
          </a>
          <button
            type="button"
            onClick={() => scrollToId('contact')}
            className="flex min-h-12 items-center rounded-full bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-violet-700"
          >
            תיאום פגישה
          </button>
        </div>

        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-200 text-purple-800 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'סגור תפריט' : 'פתח תפריט'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-purple-100 bg-cream-50 px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="ניווט ראשי - נייד">
            {HEADER_NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="flex min-h-12 items-center rounded-xl px-3 py-3 text-right text-base font-medium text-purple-800 hover:bg-purple-50"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="mt-3 flex flex-col gap-1 rounded-xl bg-purple-50 px-2 py-1">
            <a
              href={telUrl()}
              className="flex min-h-12 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-purple-800"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
            <a
              href={mailUrl()}
              className="flex min-h-12 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-purple-800"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {SITE.email}
            </a>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-purple-50 px-3 py-2">
            <span className="text-sm font-semibold text-purple-800">גודל טקסט:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onDecrease}
                disabled={scale === 'base'}
                aria-label="הקטן גודל טקסט"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-300 text-purple-800 disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-purple-800">
                {scale === 'base' ? 'א' : scale === 'lg' ? 'א+' : 'א++'}
              </span>
              <button
                type="button"
                onClick={onIncrease}
                disabled={scale === 'xl'}
                aria-label="הגדל גודל טקסט"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-300 text-purple-800 disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-sage-700 px-4 py-3 text-base font-bold text-white shadow-md"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              דברו איתי בוואטסאפ
            </a>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="flex min-h-12 items-center justify-center rounded-full bg-violet-600 px-4 py-3 text-base font-bold text-white shadow-md"
            >
              תיאום פגישת אבחון וייעוץ
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

/* ============================================================
   Hero
   ============================================================ */

const HERO_BADGES = [
  { icon: Droplet, label: 'אבחון דם תודעתי' },
  { icon: ShieldCheck, label: 'מומחית לגיל השלישי' },
  { icon: HeartHandshake, label: 'שיקום לאחר אירועים וטראומות' },
]

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream-100">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-violet-200/50 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-purple-100/60 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-10 lg:py-28">
        <div className="animate-fade-in-up text-center lg:text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-900/5 px-4 py-1.5 text-sm font-semibold text-purple-700 ring-1 ring-purple-900/10">
            <Sparkles className="h-4 w-4 text-violet-500" aria-hidden="true" />
            אמוציולוגיה • שיקום לגיל השלישי • אימון אישי
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.15] text-purple-950 sm:text-5xl lg:text-6xl">
            להבין את הגוף, לרפא את התודעה,
            <br className="hidden sm:block" /> להחזיר את הביטחון לחיים
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-purple-800 lg:mx-0 lg:text-xl">
            אבחון אישיות ורגש לפי בדיקות דם (אמוציולוגיה) • שיקום ואימון ייעודי לגיל השלישי •
            אימון אישי לחיים מלאים ומשמעותיים.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="w-full rounded-full bg-violet-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-violet-600/30 transition-all hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl sm:w-auto"
            >
              לתיאום פגישת אבחון וייעוץ
            </button>
            <button
              type="button"
              onClick={() => scrollToId('emotsiology')}
              className="w-full rounded-full border-2 border-purple-900 px-8 py-4 text-lg font-bold text-purple-900 transition-all hover:-translate-y-0.5 hover:bg-purple-900 hover:text-white sm:w-auto"
            >
              איך עובד אבחון לפי בדיקות דם?
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            {HERO_BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-purple-900 shadow-md ring-1 ring-purple-100"
              >
                <Icon className="h-5 w-5 text-violet-600" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-in lg:max-w-none">
          <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-800 to-purple-950 shadow-2xl">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-10 text-center text-cream-50">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 animate-float">
                <Activity className="h-12 w-12 text-violet-300" aria-hidden="true" />
              </div>
              <p className="font-display text-2xl font-bold">גוף. תודעה. תנועה.</p>
              <p className="text-cream-100/80">
                שלושה מוקדים, נתיב אחד: לחזור להרגיש בטוחים בגוף ובחיים.
              </p>
            </div>
            <div className="absolute inset-x-6 bottom-6 grid grid-cols-3 gap-3 text-center">
              {[
                { n: '+15', l: 'שנות ניסיון' },
                { n: '100%', l: 'ליווי אישי' },
                { n: '3', l: 'תחומי מומחיות' },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/10 py-3 backdrop-blur">
                  <p className="font-display text-xl font-bold">{s.n}</p>
                  <p className="text-xs text-cream-100/80">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-6 -right-4 hidden max-w-[220px] rounded-2xl bg-white p-4 shadow-xl ring-1 ring-purple-100 sm:block">
            <p className="text-sm font-bold text-purple-950">"קיבלתי בחזרה את הביטחון ללכת לבד"</p>
            <p className="mt-1 text-xs text-purple-700">— מתוך סיפורי ההצלחה</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   ServiceFinderQuiz
   ============================================================ */

type QuizOption = {
  prompt: string
  subject: ContactSubject
  icon: typeof Droplet
  title: string
  description: string
}

const QUIZ_OPTIONS: QuizOption[] = [
  {
    prompt: 'להבין את המקור הרגשי לכאב או למחלה דרך בדיקות דם.',
    subject: 'אמוציולוגיה ואבחון דם',
    icon: Droplet,
    title: 'אמוציולוגיה - אבחון דרך בדיקות דם',
    description:
      'נשמע כמו שהגוף שלכם מנסה לספר לכם משהו שהמילים לא תמיד מצליחות לבטא. במפגש אבחון אמוציולוגי נפענח יחד את הקשר בין בדיקות הדם שלכם לבין המצב הרגשי והתודעתי - ונבין מה עומד מאחורי הכאב.',
  },
  {
    prompt: 'חיזוק העצמות, שיקום מנפילה או אירוע רפואי בגיל השלישי.',
    subject: 'שיקום ואימון לגיל השלישי',
    icon: Bone,
    title: 'שיקום ואימון לגיל השלישי (בניית עצם)',
    description:
      'הגוף יודע להתחזק שוב - גם אחרי נפילה, שבר או אירוע רפואי. נבנה יחד תוכנית שיקום ואימון בטוחה ומדויקת, שתחזיר לכם בהדרגה את החוזק, שיווי המשקל והביטחון ללכת בעולם.',
  },
  {
    prompt: 'ליווי ואימון אישי לחיזוק החוסן המנטלי והביטחון.',
    subject: 'אימון אישי',
    icon: Compass,
    title: 'אימון אישי והעצמה',
    description:
      'לפעמים הצעד הראשון הוא פשוט להחליט שמגיע לכם יותר. בליווי אישי וממוקד נעבוד על פריצת חסמים, חיזוק הביטחון העצמי והתמודדות עם רגעי מעבר - כדי שתחיו מהמקום החזק ביותר שלכם.',
  },
]

type ServiceFinderQuizProps = {
  onSelectSubject: (subject: ContactSubject) => void
}

function ServiceFinderQuiz({ onSelectSubject }: ServiceFinderQuizProps) {
  const [selected, setSelected] = useState<QuizOption | null>(null)

  const handleCta = () => {
    if (!selected) return
    onSelectSubject(selected.subject)
    scrollToId('contact')
  }

  return (
    <section id="quiz" className="bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm font-bold text-violet-700 ring-1 ring-violet-200">
            מדריך מהיר
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-purple-950 sm:text-4xl">
            איזה שירות נכון עבורי?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-purple-800">
            שתי שאלות קצרות שיעזרו לכם - או לילדים שלכם המחפשים עבורכם - למצוא בדיוק את נקודת ההתחלה
            הנכונה.
          </p>
        </div>

        {!selected ? (
          <div className="mt-12">
            <p className="text-center font-display text-xl font-bold text-purple-950">
              מה המטרה העיקרית שלכם כרגע?
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {QUIZ_OPTIONS.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.subject}
                    type="button"
                    onClick={() => setSelected(option)}
                    className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-purple-100 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-violet-300"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <span className="text-base font-semibold leading-relaxed text-purple-900">
                      {option.prompt}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-2xl animate-fade-in-up rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-violet-200 sm:p-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-white">
              <selected.icon className="h-8 w-8" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold text-purple-950">{selected.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-purple-700">{selected.description}</p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleCta}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-violet-600/30 transition-transform hover:-translate-y-0.5 hover:bg-violet-700 sm:w-auto"
              >
                לתיאום פגישה בנושא זה
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex min-h-12 items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-purple-600 transition-colors hover:bg-purple-50"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                בחרו תשובה אחרת
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ============================================================
   Emotsiology
   ============================================================ */

const EMOTSIOLOGY_STEPS = [
  {
    icon: Droplets,
    title: 'הבדיקה',
    description:
      'מביאים בדיקות דם שגרתיות ועדכניות שכבר יש לכם - לא נדרשות בדיקות מיוחדות או פולשניות נוספות.',
  },
  {
    icon: Compass,
    title: 'האבחון',
    description:
      'פענוח עומק של הקשר בין המדדים בדם לבין המצב התודעתי והרגשי - מה הגוף מנסה לספר על האישיות, הפחדים והדפוסים.',
  },
  {
    icon: Sparkles,
    title: 'הריפוי',
    description:
      'התאמת נתיב מדויק אישית עבורכם - לשחרור כאבים כרוניים, צמיחה אישית ואיזון מחודש בין הגוף לנפש.',
  },
]

function Emotsiology() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="emotsiology" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm font-bold text-violet-700 ring-1 ring-violet-200">
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
            תחום מומחיות
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-purple-950 sm:text-4xl">
            אמוציולוגיה - הסוד שבבדיקות הדם שלך
          </h2>
          <p className="mx-auto mt-6 max-w-2xl rounded-2xl bg-violet-50 px-5 py-4 font-display text-lg font-bold leading-relaxed text-purple-900">
            אמוציולוגיה - אבחון אישיות ורגש לפי בדיקות דם, וחקר התודעה העומדת מאחורי כל כאב ומחלה.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-purple-800">
            בדיקות הדם שלנו הן הרבה יותר ממספרים על נייר. הן מספרות סיפור שלם על מי שאנחנו - האישיות
            שלנו, החסמים הרגשיים שאנחנו נושאים, והתודעה שעומדת מאחורי כל כאב או מחלה. אמוציולוגיה היא
            הגשר המרתק בין הרפואה המודרנית לבין עולם הרגש והתודעה, ומאפשרת לכם להבין לעומק את הגוף
            שלכם - ולתת לו בדיוק את מה שהוא צריך כדי להירפא.
          </p>
        </div>

        {/* 3-step interactive workflow */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {EMOTSIOLOGY_STEPS.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === index
            return (
              <button
                key={step.title}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`group relative rounded-2xl border-2 p-6 text-right shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                  isActive
                    ? 'border-violet-500 bg-violet-50/60 shadow-lg'
                    : 'border-purple-100 bg-cream-50'
                }`}
                aria-pressed={isActive}
              >
                <span
                  className={`absolute -top-4 right-6 flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-bold ${
                    isActive ? 'bg-violet-600 text-white' : 'bg-purple-200 text-purple-800'
                  }`}
                >
                  {index + 1}
                </span>
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
                    isActive ? 'bg-violet-600 text-white' : 'bg-purple-900/5 text-purple-700'
                  }`}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-purple-950">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-purple-700">{step.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   SeniorRehab
   ============================================================ */

const SENIOR_PILLARS = [
  {
    icon: Bone,
    title: 'אימון לבניית עצם',
    description:
      'תוכניות אימון בטוחות ומדויקות למניעת אוסטיאופורוזיס וחיזוק המבנה השלדי, בהתאמה אישית מלאה ליכולות ולמגבלות של כל מתאמנת ומתאמן.',
  },
  {
    icon: HeartHandshake,
    title: 'שיקום לאחר אירועים מוחיים וטראומות',
    description:
      'ליווי סבלני, ידע פיזיולוגי מדויק ותמיכה רגשית אמיתית - כדי לחזור צעד אחר צעד לתנועה, לעצמאות ולתפקוד היומיומי.',
  },
  {
    icon: Footprints,
    title: 'החזרת הביטחון אחרי נפילות',
    description:
      'עבודה ממוקדת על הפחד מנפילה חוזרת, שיקום שיווי המשקל, ובניית ביטחון עצמי מחודש בתנועה ובחיי היומיום.',
  },
]

function SeniorRehab() {
  return (
    <section id="seniors" className="relative overflow-hidden bg-purple-950 py-20 text-cream-50 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-violet-200 ring-1 ring-white/20">
            תחום מומחיות
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-4xl">
            מומחיות בגיל השלישי - שיקום, ביטחון ובניית עצם
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-cream-100/85">
            הגוף שלנו יודע להשתקם בכל גיל - כשמלווים אותו נכון. אושרה מביאה שילוב נדיר של ידע פיזיולוגי
            מעמיק, ניסיון רב שנים בעבודה עם אוכלוסייה מבוגרת, ורגישות אנושית שמכבדת את הקצב, הפחד
            והכבוד העצמי של כל אדם בתהליך.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SENIOR_PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="rounded-2xl bg-white/5 p-7 shadow-lg ring-1 ring-white/10 transition-transform hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-200">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{pillar.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-cream-100/80">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Reassurance note for adult children */}
        <div className="mx-auto mt-14 flex max-w-4xl flex-col items-center gap-6 rounded-3xl bg-violet-500/10 p-8 text-center ring-1 ring-violet-400/30 sm:flex-row sm:text-right">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white">
            <HeartHandshake className="h-8 w-8" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl font-bold text-cream-50">
              הורים שלכם ראויים לליווי מקצועי שאפשר לסמוך עליו
            </h3>
            <p className="mt-2 text-base leading-relaxed text-cream-100/85">
              אם אתם מחפשים מטפלת מנוסה ואמינה עבור אבא, אמא או בן משפחה יקר - אתם במקום הנכון.
              אושרה מלווה משפחות שלמות בתהליך, מעדכנת ומשתפת, ורואה בכל מתאמן/ת אדם שלם - לא רק
              אבחנה.
            </p>
          </div>
          <a
            href={telUrl()}
            className="flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-bold text-purple-900 shadow-md transition-transform hover:scale-105"
          >
            <PhoneCall className="h-5 w-5" aria-hidden="true" />
            לשיחת ייעוץ למשפחה
          </a>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   PersonalCoaching
   ============================================================ */

const COACHING_POINTS = [
  {
    icon: Compass,
    title: 'פריצת חסמים',
    description: 'זיהוי הדפוסים שמעכבים אתכם, ובניית דרך פעולה ברורה קדימה.',
  },
  {
    icon: Sunrise,
    title: 'מעברי חיים',
    description: 'ליווי אישי בתקופות של שינוי - פרישה, מחלה, אובדן או התחלה חדשה.',
  },
  {
    icon: Sparkles,
    title: 'חוסן מנטלי',
    description: 'כלים מעשיים לבניית ביטחון עצמי ועמידות רגשית לטווח הארוך.',
  },
]

function PersonalCoaching() {
  return (
    <section id="coaching" className="bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {COACHING_POINTS.map((point) => {
              const Icon = point.icon
              return (
                <div
                  key={point.title}
                  className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-md ring-1 ring-purple-100"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-900/5 text-purple-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-purple-950">{point.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-purple-700">
                      {point.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="order-1 text-center lg:order-2 lg:text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm font-bold text-violet-700 ring-1 ring-violet-200">
            תחום מומחיות
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-purple-950 sm:text-4xl">
            אימון אישי והעצמה
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-purple-800">
            לפעמים הצעד הראשון לשינוי הוא פשוט להחליט שמגיע לכם יותר. בליווי אישי וממוקד, נעבוד יחד
            על פריצת מחסומים פנימיים, חיזוק הביטחון העצמי, והתמודדות עם רגעי מעבר ואתגר בחיים - כדי
            שתוכלו לחיות חיים מלאים, נוכחים ומשמעותיים יותר, מהמקום החזק ביותר שלכם.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   About
   ============================================================ */

const ABOUT_CREDENTIALS = [
  { icon: BookOpen, text: 'מוסמכת באמוציולוגיה ואבחון גוף-נפש' },
  { icon: Award, text: 'מאמנת מוסמכת לשיקום ואימון בגיל השלישי' },
  { icon: Heart, text: 'מאמנת אישית ומלווה תהליכי העצמה' },
]

function About() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-200 via-cream-200 to-purple-100 shadow-xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-900 font-display text-3xl font-bold text-white shadow-lg">
                  א.נ
                </span>
                <p className="mt-2 font-display text-xl font-bold text-purple-950">אושרה נעמן</p>
                <p className="text-sm text-purple-600">מאמנת אמוציולוגיה • שיקום • אימון אישי</p>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-right">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm font-bold text-violet-700 ring-1 ring-violet-200">
              אודות
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold text-purple-950 sm:text-4xl">
              להכיר את אושרה נעמן
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-purple-800">
              במשך שנים רבות אני מלווה אנשים במסע שמחבר בין הגוף לתודעה - החל מפענוח מעמיק של בדיקות
              דם ועד ליווי פיזי ורגשי בתהליכי שיקום. האמונה שמנחה אותי היא שהגוף והנפש הם מערכת אחת:
              כל כאב, כל מגבלה וכל פחד נושאים בתוכם גם מסר וגם הזדמנות לצמיחה.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-purple-800">
              אני משלבת ידע מדעי מדויק בתחום הפיזיולוגיה ובדיקות הדם, יחד עם רגישות אנושית עמוקה
              וניסיון מעשי בעבודה עם מתבגרים, מבוגרים וקשישים כאחד. המטרה שלי בכל מפגש היא אחת: שתצאו
              עם הבנה אמיתית של עצמכם, וכלים מעשיים שיחזירו לכם שליטה, ביטחון ותקווה.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              {ABOUT_CREDENTIALS.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-2 rounded-xl bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-900"
                >
                  <Icon className="h-5 w-5 text-violet-600" aria-hidden="true" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   TipsGrid
   ============================================================ */

const TIPS = [
  {
    icon: Footprints,
    title: '3 עקרונות פשוטים למניעת נפילות וחיזוק הביטחון בהליכה בבית',
    teaser: 'שינויים קטנים בבית ובהרגלי ההליכה יכולים לצמצם משמעותית את הסיכון לנפילה.',
    body: [
      'סדר ותאורה: לוודא שהבית מואר היטב, לפנות שטיחים חלקים וחוטים מהמעבר, ולהשאיר את נתיבי ההליכה פנויים לגמרי.',
      'חיזוק שרירי הליבה והרגליים: תרגילי איזון ותנועה קצרים וקבועים משפרים משמעותית את היציבות ומפחיתים את הסיכון לנפילה.',
      'הליכה מודעת ובטוחה: נעליים יציבות עם סוליה מחזיקה, ותרגול הליכה איטית ומודעת בעת מעבר בין חדרים או משטחים שונים.',
    ],
  },
  {
    icon: Droplets,
    title: 'מה מדדי הברזל והוויטמינים בדם מספרים על העייפות הרגשית שלנו?',
    teaser: 'עייפות שלא חולפת עם מנוחה יכולה להצביע על חוסר איזון עמוק יותר.',
    body: [
      'רמות ברזל נמוכות, חוסר בוויטמין D או בוויטמין B12 לא משפיעים רק על האנרגיה הפיזית - הם קשורים ישירות גם למצב הרוח, לריכוז ולתחושת המוטיבציה.',
      'עייפות מתמשכת שלא משתפרת עם מנוחה יכולה להצביע על חוסר איזון שמשפיע גם על העולם הרגשי, לא רק על הגוף.',
      'בבדיקה אמוציולוגית בוחנים את הקשר הזה לעומק, ומבינים אילו דפוסים רגשיים מסתתרים מאחורי התשישות.',
    ],
  },
  {
    icon: Bone,
    title: 'למה אימון לבניית עצם הוא הביטוח הכי טוב לגיל השלישי?',
    teaser: 'ההשקעה הפשוטה ביותר בעצמאות, בניידות ובאיכות החיים לשנים קדימה.',
    body: [
      'צפיפות העצם פוחתת עם הגיל באופן טבעי, אך אימון מותאם ומדויק יכול להאט את התהליך ואף לשפר אותו.',
      'שרירים חזקים תומכים בעצמות ובמפרקים, משפרים את שיווי המשקל, ומפחיתים משמעותית את הסיכון לשברים.',
      'זו למעשה ההשקעה הבטוחה ביותר בעצמאות, בניידות ובאיכות החיים לשנים ארוכות קדימה.',
    ],
  },
]

function TipsGrid() {
  const [openTip, setOpenTip] = useState<number | null>(null)

  useEffect(() => {
    if (openTip === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenTip(null)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [openTip])

  const activeTip = openTip !== null ? TIPS[openTip] : null

  return (
    <section id="tips" className="bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm font-bold text-violet-700 ring-1 ring-violet-200">
            <Lightbulb className="h-4 w-4" aria-hidden="true" />
            פינת הידע והטיפים
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-purple-950 sm:text-4xl">
            טיפים מהניסיון של אושרה
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TIPS.map((tip, index) => {
            const Icon = tip.icon
            return (
              <div
                key={tip.title}
                className="flex flex-col rounded-2xl bg-white p-7 shadow-md ring-1 ring-purple-100 transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-900/5 text-purple-700">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold leading-snug text-purple-950">
                  {tip.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-purple-700">{tip.teaser}</p>
                <button
                  type="button"
                  onClick={() => setOpenTip(index)}
                  className="mt-5 flex min-h-12 items-center self-start rounded-full bg-violet-50 px-5 text-sm font-bold text-violet-700 transition-colors hover:bg-violet-100"
                >
                  לקריאה נוספת
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {activeTip && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-purple-950/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tip-modal-title"
          onClick={() => setOpenTip(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <activeTip.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <button
                type="button"
                onClick={() => setOpenTip(null)}
                aria-label="סגירה"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-purple-700 hover:bg-purple-50"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <h3 id="tip-modal-title" className="mt-4 font-display text-2xl font-bold text-purple-950">
              {activeTip.title}
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {activeTip.body.map((paragraph) => (
                <li key={paragraph} className="flex gap-3 text-base leading-relaxed text-purple-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden="true" />
                  {paragraph}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpenTip(null)}
              className="mt-7 min-h-12 w-full rounded-full bg-violet-600 px-5 py-3 text-base font-bold text-white transition-colors hover:bg-violet-700"
            >
              הבנתי, תודה
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

/* ============================================================
   Testimonials
   ============================================================ */

const TESTIMONIALS = [
  {
    name: 'רבקה, 78',
    topic: 'שיקום אחרי נפילה',
    quote:
      'אחרי שנפלתי בבית פחדתי לזוז לבד אפילו בסלון. אושרה עבדה איתי בסבלנות אין קץ, צעד אחר צעד, עד שחזרתי ללכת ברחוב בביטחון מלא. היא לא רק אימנה את הגוף שלי - היא החזירה לי את החיים.',
    rating: 5,
  },
  {
    name: 'מיכל, 45',
    topic: 'אבחון אמוציולוגי',
    quote:
      'שנים סבלתי מכאבי גב כרוניים בלי שום הסבר רפואי. באבחון עם אושרה הבנתי פתאום את הקשר בין הכאב לבין דברים שהדחקתי רגשית. זו הייתה תחושת הקלה שאין לה מילים - סוף סוף הבנתי את עצמי.',
    rating: 5,
  },
  {
    name: 'יוסי, 62',
    topic: 'אימון אישי',
    quote:
      'הגעתי לאושרה בתקופה קשה של פרישה ותחושת חוסר כיוון. תוך כמה חודשים של ליווי מצאתי מחדש משמעות ומטרה. היא מקשיבה באמת, ונותנת כלים שעובדים גם אחרי שהמפגש נגמר.',
    rating: 5,
  },
]

function Testimonials() {
  return (
    <section id="testimonials" className="bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm font-bold text-violet-700 ring-1 ring-violet-200">
            סיפורי הצלחה
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-purple-950 sm:text-4xl">
            מה אומרים מי שליוותה
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-md ring-1 ring-purple-100 transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote className="h-8 w-8 text-violet-300" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-purple-800">
                "{t.quote}"
              </blockquote>
              <div className="mt-5 flex items-center gap-0.5" aria-label={`${t.rating} מתוך 5 כוכבים`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-violet-400 text-violet-400" aria-hidden="true" />
                ))}
              </div>
              <figcaption className="mt-3 border-t border-purple-100 pt-3">
                <p className="font-display font-bold text-purple-950">{t.name}</p>
                <p className="text-sm text-purple-700">{t.topic}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FAQ
   ============================================================ */

const FAQS = [
  {
    q: 'מה זה בעצם אמוציולוגיה ואיך בדיקת דם קשורה לרגש?',
    a: 'אמוציולוגיה היא שיטה ייחודית המחברת בין מדדי בדיקות הדם השגרתיות שלנו לבין הפרופיל האישיותי, הרגשי והתודעתי שלנו. כל מדד בדם - רמות ברזל, סידן, תפקודי כבד וכליות ועוד - משקף לא רק תפקוד פיזי, אלא גם דפוס מחשבתי ורגשי עמוק שמתבטא דרך הגוף. כשמבינים את השפה הזו, אפשר לזהות מה עומד מאחורי כאב, מחלה או תחושת חוסר איזון - ולטפל בשורש, לא רק בתסמין.',
  },
  {
    q: 'האם אימון לבניית עצם מתאים גם למי שחווה שבר או נפילה לאחרונה?',
    a: 'בהחלט - וזו בדיוק ההתמחות שלי. כל תוכנית אימון נבנית בהתאמה אישית מלאה למצב הרפואי, לקצב ההחלמה וליכולות האישיות שלכם, תוך ליווי סבלני וזהיר בכל שלב. העבודה מתחילה תמיד מהמקום הבטוח ביותר ומתקדמת בהדרגה, כדי לחזק את העצם ואת הביטחון העצמי גם אחרי שבר או נפילה - ולא למרותם.',
  },
  {
    q: 'האם הטיפול והאימון מתאימים גם לאנשים אחרי אירוע מוחי או טראומה?',
    a: 'כן. יש לי ניסיון רב-שנים בליווי אנשים בתהליכי שיקום לאחר אירועים מוחיים וטראומות פיזיות. השילוב של ידע פיזיולוגי מדויק, סבלנות אמיתית ותמיכה רגשית מאפשר להתקדם צעד אחר צעד - לא רק בתפקוד הפיזי, אלא גם בהחזרת תחושת השליטה, העצמאות והביטחון העצמי בחיי היומיום.',
  },
] as const

const FAQ_BOOKING_INDEX = FAQS.length

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm font-bold text-violet-700 ring-1 ring-violet-200">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            שאלות נפוצות
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-purple-950 sm:text-4xl">
            שאלות ותשובות נפוצות
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-purple-100 bg-cream-50 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-4 text-right"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-bold text-purple-950">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-purple-700 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <p className="border-t border-purple-100 px-5 pb-5 pt-4 text-base leading-relaxed text-purple-700">
                    {faq.a}
                  </p>
                )}
              </div>
            )
          })}

          {/* Booking FAQ item with live links, kept distinct since it drives action */}
          <div className="overflow-hidden rounded-2xl border-2 border-violet-200 bg-violet-50/50 shadow-sm">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === FAQ_BOOKING_INDEX ? null : FAQ_BOOKING_INDEX)}
              className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-4 text-right"
              aria-expanded={openIndex === FAQ_BOOKING_INDEX}
            >
              <span className="font-display text-lg font-bold text-purple-950">
                איך אפשר לקבוע פגישת אבחון או אימון?
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-violet-600 transition-transform ${
                  openIndex === FAQ_BOOKING_INDEX ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {openIndex === FAQ_BOOKING_INDEX && (
              <div className="border-t border-violet-200 px-5 pb-5 pt-4">
                <p className="text-base leading-relaxed text-purple-700">
                  הכי פשוט - התקשרו או שלחו הודעה למספר{' '}
                  <a href={telUrl()} className="font-bold text-violet-700 underline underline-offset-2">
                    {SITE.phoneDisplay}
                  </a>
                  , או מלאו את הטופס הקצר בהמשך העמוד ואחזור אליכם בהקדם האפשרי לתיאום המפגש הראשון.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  className="mt-4 flex min-h-12 items-center rounded-full bg-violet-600 px-5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-violet-700"
                >
                  מעבר לטופס יצירת קשר
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   ContactForm
   ============================================================ */

type SubjectPreset = {
  value: ContactSubject
  nonce: number
}

type ContactFormProps = {
  presetSubject?: SubjectPreset | null
}

function ContactForm({ presetSubject }: ContactFormProps) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState<ContactSubject>(SUBJECTS[0])
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (presetSubject) {
      setSubject(presetSubject.value)
      setSubmitted(false)
    }
    // presetSubject.nonce changes on every quiz CTA click, even if the value repeats.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetSubject?.nonce])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!fullName.trim() || !phone.trim()) {
      setError('נא למלא שם מלא ומספר טלפון כדי שנוכל לחזור אליכם.')
      return
    }
    setError('')

    const composedMessage = [
      'פנייה חדשה מהאתר:',
      `שם מלא: ${fullName}`,
      `טלפון: ${phone}`,
      `נושא הפנייה: ${subject}`,
      message.trim() ? `הודעה: ${message}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(whatsappUrl(composedMessage), '_blank', 'noopener,noreferrer')
    setSubmittedName(fullName.trim().split(' ')[0])
    setSubmitted(true)
    setFullName('')
    setPhone('')
    setMessage('')
    setSubject(SUBJECTS[0])
  }

  return (
    <section id="contact" className="bg-purple-950 py-20 text-cream-50 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-violet-200 ring-1 ring-white/20">
            צור קשר
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-4xl">
            בואו נדבר על הצעד הבא שלכם
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream-100/80">
            מלאו את הפרטים ואחזור אליכם בהקדם, או פנו ישירות בוואטסאפ ובטלפון.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Direct contact info */}
          <div className="flex flex-col gap-4">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-sage-700 p-5 shadow-lg transition-transform hover:scale-[1.02]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold">דברו איתי בוואטסאפ</span>
                <span className="block text-sm text-cream-50/85">מענה אישי ומהיר</span>
              </span>
            </a>

            <a
              href={telUrl()}
              className="flex items-center gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/15 transition-transform hover:scale-[1.02]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Phone className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold">{SITE.phoneDisplay}</span>
                <span className="block text-sm text-cream-100/70">זמינה לשיחה</span>
              </span>
            </a>

            <a
              href={mailUrl()}
              className="flex items-center gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/15 transition-transform hover:scale-[1.02]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Mail className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold break-all">{SITE.email}</span>
                <span className="block text-sm text-cream-100/70">למכתבים ופניות מפורטות</span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/15">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold">{SITE.areaServed}</span>
                <span className="block text-sm text-cream-100/70">אפשרות למפגשי בית ואונליין</span>
              </span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-cream-50 p-6 text-purple-950 shadow-2xl sm:p-8"
            noValidate
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                  <Send className="h-8 w-8" aria-hidden="true" />
                </span>
                <h3 className="font-display text-2xl font-bold text-purple-950">
                  תודה, {submittedName}!
                </h3>
                <p className="max-w-sm text-base text-purple-700">
                  הפנייה נפתחה בוואטסאפ - רק לשלוח את ההודעה ואחזור אליכם בהקדם האפשרי.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 flex min-h-12 items-center px-2 text-sm font-bold text-purple-800 underline underline-offset-4"
                >
                  שליחת פנייה נוספת
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-base font-bold text-purple-900">
                    שם מלא
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="לדוגמה: רות כהן"
                    className="w-full rounded-xl border-2 border-purple-200 bg-white px-4 py-3.5 text-base text-purple-950 placeholder:text-purple-300 focus:border-violet-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-base font-bold text-purple-900">
                    טלפון
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="050-811-1514"
                    className="w-full rounded-xl border-2 border-purple-200 bg-white px-4 py-3.5 text-base text-purple-950 placeholder:text-purple-300 focus:border-violet-500"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-base font-bold text-purple-900">
                    נושא הפנייה
                  </label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as ContactSubject)}
                    className="w-full rounded-xl border-2 border-purple-200 bg-white px-4 py-3.5 text-base text-purple-950 focus:border-violet-500"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-base font-bold text-purple-900">
                    הודעה
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="ספרו לי קצת על מה שמעניין אתכם..."
                    className="w-full resize-none rounded-xl border-2 border-purple-200 bg-white px-4 py-3.5 text-base text-purple-950 placeholder:text-purple-300 focus:border-violet-500"
                  />
                </div>

                {error && (
                  <p role="alert" className="rounded-xl bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-violet-600/30 transition-transform hover:-translate-y-0.5 hover:bg-violet-700"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  שליחת פנייה
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FloatingWhatsApp
   ============================================================ */

function FloatingWhatsApp() {
  return (
    <div className="group fixed bottom-6 left-6 z-50 flex items-center">
      <span
        role="tooltip"
        className="pointer-events-none me-3 origin-left scale-95 whitespace-nowrap rounded-xl bg-purple-950 px-3 py-2 text-sm font-bold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        דברו איתי בוואטסאפ
      </span>
      <a
        href={whatsappUrl(SITE.floatingWhatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="פתיחת שיחת וואטסאפ"
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sage-500 text-white shadow-2xl shadow-sage-900/30 transition-transform hover:scale-110 animate-pulse-soft"
      >
        <MessageCircle className="h-8 w-8" aria-hidden="true" />
      </a>
    </div>
  )
}

/* ============================================================
   Footer
   ============================================================ */

function Footer() {
  return (
    <footer className="bg-purple-950 py-10 text-cream-100/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center lg:flex-row lg:justify-between lg:px-10 lg:text-right">
        <div>
          <p className="font-display text-lg font-bold text-cream-50">{SITE.name}</p>
          <p className="text-sm">{SITE.tagline}</p>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm"
          aria-label="ניווט תחתון"
        >
          {FOOTER_NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToId(link.id)}
              className="flex min-h-12 items-center rounded-lg px-3 hover:bg-white/5 hover:text-violet-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-1 text-sm lg:items-end">
          <a
            href={telUrl()}
            className="flex min-h-12 items-center gap-2 rounded-lg px-3 hover:bg-white/5 hover:text-violet-200"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>
          <a
            href={mailUrl()}
            className="flex min-h-12 items-center gap-2 rounded-lg px-3 hover:bg-white/5 hover:text-violet-200"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {SITE.email}
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center rounded-lg px-3 hover:bg-white/5 hover:text-violet-200"
          >
            וואטסאפ
          </a>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-cream-100/50">
        © {new Date().getFullYear()} {SITE.name}. כל הזכויות שמורות.
      </p>
    </footer>
  )
}

/* ============================================================
   App (root component)
   ============================================================ */

export default function App() {
  const { scale, increase, decrease } = useAccessibility()
  const [subjectPreset, setSubjectPreset] = useState<SubjectPreset | null>(null)

  const handleQuizSelect = (subject: ContactSubject) => {
    setSubjectPreset((prev) => ({ value: subject, nonce: (prev?.nonce ?? 0) + 1 }))
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-[100] focus:rounded-xl focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-white"
      >
        דלג לתוכן הראשי
      </a>
      <Header scale={scale} onIncrease={increase} onDecrease={decrease} />
      <main>
        <Hero />
        <ServiceFinderQuiz onSelectSubject={handleQuizSelect} />
        <Emotsiology />
        <SeniorRehab />
        <PersonalCoaching />
        <About />
        <TipsGrid />
        <Testimonials />
        <FAQ />
        <ContactForm presetSubject={subjectPreset} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
