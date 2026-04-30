import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/f4bdbc2b-be61-4b5e-986f-c1fca67d4601/files/1fe664d6-c153-4fab-9811-91339634e052.jpg";

const NAV_LINKS = [
  { label: "О нас", href: "#about" },
  { label: "Программы", href: "#programs" },
  { label: "Преподаватели", href: "#teachers" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Галерея", href: "#gallery" },
  { label: "Контакты", href: "#contacts" },
];

const PROGRAMS = [
  {
    icon: "🎤",
    title: "Вокал",
    subtitle: "Классика & Современность",
    desc: "Постановка голоса, сценическое мастерство, работа с микрофоном. Программы для детей от 5 лет и взрослых без ограничений по возрасту.",
    price: "от 3 500 ₽/мес",
    tags: ["Академический вокал", "Эстрада", "Джаз", "Поп"],
  },
  {
    icon: "🎨",
    title: "Живопись",
    subtitle: "Масло, акварель, графика",
    desc: "Рисунок с натуры, портрет, пейзаж, натюрморт. Авторские техники наших мастеров и классические европейские школы.",
    price: "от 4 000 ₽/мес",
    tags: ["Масло", "Акварель", "Пастель", "Графика"],
  },
  {
    icon: "✨",
    title: "Арт-Терапия",
    subtitle: "Творчество как исцеление",
    desc: "Специальный курс для тех, кто ищет гармонию. Рисование и пение как инструменты самопознания и восстановления.",
    price: "от 4 500 ₽/мес",
    tags: ["Медитативное рисование", "Звукотерапия", "Мастермайнд"],
  },
];

const TEACHERS = [
  {
    name: "Анна Белова",
    role: "Педагог по вокалу",
    exp: "18 лет преподавания",
    desc: "Лауреат международных конкурсов. Выпускница Московской консерватории. Работала с ведущими театрами страны.",
    students: "200+",
    avatar: "🎤",
    color: "#C9A86C",
  },
  {
    name: "Михаил Озеров",
    role: "Художник, преподаватель живописи",
    exp: "22 года в искусстве",
    desc: "Член Союза художников России. Работы хранятся в частных коллекциях 12 стран. Автор уникальной методики обучения.",
    students: "350+",
    avatar: "🎨",
    color: "#C4614A",
  },
  {
    name: "Елена Тихонова",
    role: "Педагог по эстрадному вокалу",
    exp: "14 лет на сцене",
    desc: "Победитель всероссийских вокальных конкурсов. Работает с детьми с 4 лет. Автор методики раннего вокального развития.",
    students: "180+",
    avatar: "🌟",
    color: "#8B9E7E",
  },
];

const REVIEWS = [
  {
    text: "Моя дочь пришла в студию в 7 лет, абсолютно замкнутой. Через полгода она выступала на сцене с такой уверенностью — я плакала от счастья.",
    author: "Марина К.",
    role: "Мама студентки",
    rating: 5,
  },
  {
    text: "Никогда не думал, что смогу рисовать. В 45 лет взял кисть и понял — это моё. Михаил — настоящий волшебник, находит талант в каждом.",
    author: "Сергей В.",
    role: "Студент курса живописи",
    rating: 5,
  },
  {
    text: "Три года в студии изменили мою жизнь. Сейчас учусь в музыкальном колледже. Анна вложила в меня всё — технику, душу, любовь к музыке.",
    author: "Алиса М.",
    role: "Выпускница вокального курса",
    rating: 5,
  },
  {
    text: "Атмосфера здесь особенная. Чувствуешь, что ты не просто учишься — ты часть чего-то большого и живого. Рекомендую всем без исключения.",
    author: "Ольга Р.",
    role: "Студентка арт-терапии",
    rating: 5,
  },
];

const GALLERY_ITEMS = [
  { label: "Зимний пейзаж", type: "painting", emoji: "🖼️" },
  { label: "Студенческий концерт", type: "photo", emoji: "🎵" },
  { label: "Портрет маслом", type: "painting", emoji: "🎨" },
  { label: "Весенний этюд", type: "painting", emoji: "🌸" },
  { label: "Выпускной вечер", type: "photo", emoji: "✨" },
  { label: "Акварельная серия", type: "painting", emoji: "💧" },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProgram, setActiveProgram] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  useReveal();

  return (
    <div className="min-h-screen" style={{ background: "#120F0B", color: "#F5EFE0" }}>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: "rgba(18,15,11,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,168,108,0.12)" }}
      >
        <a href="#hero" className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-sm" style={{ border: "1px solid #C9A86C" }}>
            <span style={{ fontFamily: "'Caveat', cursive", color: "#C9A86C", fontSize: "1.1rem", lineHeight: 1 }}>А</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 600, letterSpacing: "0.04em", color: "#F5EFE0" }}>
              Арт-Студия
            </div>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: "0.7rem", color: "#C9A86C", letterSpacing: "0.06em", marginTop: "-2px" }}>
              Вокал & Живопись
            </div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" style={{ fontFamily: "'Montserrat'", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {l.label}
            </a>
          ))}
        </div>

        <button className="btn-gold hidden lg:block" style={{ fontSize: "0.68rem" }}>
          Записаться
        </button>

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#C9A86C" }}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col pt-20 px-8 pb-8 gap-6"
          style={{ background: "rgba(18,15,11,0.97)", backdropFilter: "blur(20px)" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, color: "#F5EFE0", letterSpacing: "0.02em" }}>
              {l.label}
            </a>
          ))}
          <button className="btn-gold mt-4" style={{ width: "fit-content" }}>Записаться</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="hero" className="w-full h-full object-cover" style={{ opacity: 0.25, transform: "scale(1.05)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(18,15,11,0.95) 0%, rgba(18,15,11,0.6) 50%, rgba(18,15,11,0.85) 100%)" }} />
        </div>

        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #C9A86C 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8" style={{ background: "radial-gradient(circle, #C4614A 0%, transparent 70%)", transform: "translate(-40%, 40%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 pt-24 pb-16 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8" style={{ animation: "fade-up 0.8s ease-out forwards" }}>
              <div className="decorative-line" />
              <span style={{ fontFamily: "'Caveat', cursive", color: "#C9A86C", fontSize: "1.1rem", letterSpacing: "0.06em" }}>
                Творческая студия Москвы
              </span>
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.02em", animation: "fade-up 0.8s 0.2s ease-out both" }}>
              Где рождается
              <br />
              <em style={{ fontStyle: "italic", color: "#C9A86C" }}>настоящее</em>
              <br />
              искусство
            </h1>

            <p style={{ fontFamily: "'Montserrat'", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "rgba(245,239,224,0.7)", maxWidth: "480px", marginTop: "2rem", marginBottom: "2.5rem", animation: "fade-up 0.8s 0.4s ease-out both" }}>
              Студия вокала и живописи для детей и взрослых. Здесь каждый открывает своё призвание — под руководством мастеров с мировым именем.
            </p>

            <div className="flex flex-wrap gap-4" style={{ animation: "fade-up 0.8s 0.6s ease-out both" }}>
              <button className="btn-gold">Записаться на занятие</button>
              <button className="btn-outline">Смотреть программы</button>
            </div>

            <div className="flex gap-12 mt-14" style={{ animation: "fade-up 0.8s 0.8s ease-out both" }}>
              {[["15+", "лет на сцене"], ["700+", "выпускников"], ["3", "направления"], ["98%", "рекомендуют"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 600, color: "#C9A86C", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: "0.7rem", color: "rgba(245,239,224,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "4px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, transparent, #C9A86C, transparent)", animation: "float 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="section-reveal">
              <div className="flex items-center gap-4 mb-6">
                <div className="decorative-line" />
                <span style={{ fontFamily: "'Caveat', cursive", color: "#C4614A", fontSize: "1rem" }}>Наша история</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>
                Пятнадцать лет
                <br />
                <em style={{ fontStyle: "italic", color: "#C9A86C" }}>живого творчества</em>
              </h2>
              <p style={{ fontFamily: "'Montserrat'", fontWeight: 300, lineHeight: 1.9, color: "rgba(245,239,224,0.7)", marginBottom: "1.2rem" }}>
                Студия основана в 2009 году двумя художниками, влюблёнными в красоту. Мы верим: творческий дар есть в каждом человеке — его нужно лишь разбудить.
              </p>
              <p style={{ fontFamily: "'Montserrat'", fontWeight: 300, lineHeight: 1.9, color: "rgba(245,239,224,0.7)" }}>
                Наша философия — не воспроизводить чужие техники, а помочь каждому найти собственный голос, собственный мазок, собственный стиль. Искусство — это разговор с миром на языке, который понятен без слов.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                {["Индивидуальный подход", "Малые группы", "Концерты и выставки", "Конкурсная подготовка"].map((tag) => (
                  <span key={tag} style={{ fontFamily: "'Montserrat'", fontSize: "0.72rem", letterSpacing: "0.06em", color: "#C9A86C", border: "1px solid rgba(201,168,108,0.3)", padding: "6px 14px", borderRadius: "2px", textTransform: "uppercase" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="section-reveal relative">
              <div className="portrait-frame">
                <div className="aspect-[4/5] overflow-hidden" style={{ background: "rgba(201,168,108,0.06)", border: "1px solid rgba(201,168,108,0.2)" }}>
                  <div className="w-full h-full flex items-center justify-center relative" style={{ background: "linear-gradient(135deg, rgba(201,168,108,0.08) 0%, rgba(196,97,74,0.08) 100%)" }}>
                    <span style={{ fontSize: "8rem", filter: "grayscale(0.3)" }}>🎨</span>
                    <div className="absolute bottom-6 left-6 right-6">
                      <p style={{ fontFamily: "'Caveat', cursive", fontSize: "1.4rem", color: "#C9A86C", lineHeight: 1.4 }}>
                        "Каждый человек — художник.<br />Нужно лишь дать ему кисть."
                      </p>
                      <p style={{ fontFamily: "'Montserrat'", fontSize: "0.7rem", color: "rgba(245,239,224,0.5)", marginTop: "8px", letterSpacing: "0.06em" }}>— Михаил Озеров, сооснователь</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 flex items-center justify-center rounded-full" style={{ background: "#C9A86C", color: "#1A1612" }}>
                <div className="text-center">
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>15</div>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>лет</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section id="programs" className="py-28 px-8" style={{ background: "rgba(201,168,108,0.03)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 section-reveal">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="decorative-line" />
              <span style={{ fontFamily: "'Caveat', cursive", color: "#C9A86C", fontSize: "1rem" }}>Чему мы учим</span>
              <div className="decorative-line" />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.01em" }}>
              Наши программы
            </h2>
          </div>

          <div className="flex gap-2 justify-center mb-12 section-reveal flex-wrap">
            {PROGRAMS.map((p, i) => (
              <button key={i} onClick={() => setActiveProgram(i)}
                style={{
                  fontFamily: "'Montserrat'", fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "10px 24px",
                  background: activeProgram === i ? "#C9A86C" : "transparent",
                  color: activeProgram === i ? "#1A1612" : "rgba(245,239,224,0.55)",
                  border: `1px solid ${activeProgram === i ? "#C9A86C" : "rgba(201,168,108,0.2)"}`,
                  transition: "all 0.3s ease", cursor: "pointer"
                }}>
                {p.icon} {p.title}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {PROGRAMS.map((p, i) => (
              <div key={i}
                className="art-card p-8 section-reveal"
                style={{ transition: "all 0.4s ease", opacity: activeProgram === i ? 1 : 0.65, cursor: "pointer", borderColor: activeProgram === i ? "rgba(201,168,108,0.5)" : undefined }}
                onClick={() => setActiveProgram(i)}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{p.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 400, marginBottom: "0.25rem" }}>{p.title}</h3>
                <p style={{ fontFamily: "'Caveat', cursive", color: "#C9A86C", fontSize: "0.95rem", marginBottom: "1rem" }}>{p.subtitle}</p>
                <p style={{ fontFamily: "'Montserrat'", fontWeight: 300, fontSize: "0.87rem", lineHeight: 1.8, color: "rgba(245,239,224,0.65)", marginBottom: "1.5rem" }}>{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontFamily: "'Montserrat'", fontSize: "0.65rem", color: "rgba(201,168,108,0.7)", border: "1px solid rgba(201,168,108,0.2)", padding: "3px 10px", borderRadius: "1px" }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#C9A86C", fontWeight: 600 }}>{p.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEACHERS ── */}
      <section id="teachers" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 section-reveal">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="decorative-line" />
              <span style={{ fontFamily: "'Caveat', cursive", color: "#C4614A", fontSize: "1rem" }}>Команда мастеров</span>
              <div className="decorative-line" />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.01em" }}>
              Преподаватели
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {TEACHERS.map((t, i) => (
              <div key={i} className="art-card section-reveal overflow-hidden group" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="aspect-[3/2] flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, rgba(${t.color === "#C9A86C" ? "201,168,108" : t.color === "#C4614A" ? "196,97,74" : "139,158,126"},0.12) 0%, rgba(18,15,11,0.5) 100%)` }}>
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-500">{t.avatar}</span>
                  <div className="absolute top-4 right-4">
                    <div style={{ fontFamily: "'Caveat', cursive", fontSize: "0.85rem", color: t.color, background: "rgba(18,15,11,0.7)", padding: "4px 10px", borderRadius: "2px" }}>
                      {t.students} студентов
                    </div>
                  </div>
                </div>
                <div className="p-7">
                  <div style={{ fontFamily: "'Caveat', cursive", fontSize: "0.8rem", color: t.color, letterSpacing: "0.06em", marginBottom: "4px" }}>{t.role}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 500, marginBottom: "0.25rem" }}>{t.name}</h3>
                  <p style={{ fontFamily: "'Montserrat'", fontSize: "0.72rem", color: "rgba(245,239,224,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>{t.exp}</p>
                  <p style={{ fontFamily: "'Montserrat'", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(245,239,224,0.6)" }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-28 px-8" style={{ background: "rgba(196,97,74,0.04)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 section-reveal">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="decorative-line" />
              <span style={{ fontFamily: "'Caveat', cursive", color: "#C9A86C", fontSize: "1rem" }}>Работы студентов</span>
              <div className="decorative-line" />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.01em" }}>
              Портфолио
            </h2>
            <p style={{ fontFamily: "'Montserrat'", fontWeight: 300, color: "rgba(245,239,224,0.55)", marginTop: "1rem", fontSize: "0.9rem" }}>
              Созданное руками и голосами наших учеников
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 section-reveal">
            {[
              { size: "lg:col-span-2 lg:row-span-2", h: "aspect-square lg:min-h-[400px]", emoji: "🖼️", label: "Зимний пейзаж", style: "Масло, холст" },
              { size: "", h: "aspect-square", emoji: "🎵", label: "Весенний концерт", style: "Хоровая постановка" },
              { size: "", h: "aspect-square", emoji: "🌸", label: "Акварель", style: "Акварель, бумага" },
              { size: "", h: "aspect-square", emoji: "👤", label: "Портрет", style: "Уголь, пастель" },
              { size: "", h: "aspect-square", emoji: "🎤", label: "Сольный концерт", style: "Эстрадный вокал" },
            ].map((item, i) => (
              <div key={i} className={`group overflow-hidden relative cursor-pointer ${item.size} ${item.h}`}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,108,0.1)" }}>
                <div className="w-full h-full flex items-center justify-center min-h-[160px]"
                  style={{ background: `linear-gradient(135deg, rgba(201,168,108,${0.04 + i * 0.01}) 0%, rgba(196,97,74,${0.03 + i * 0.01}) 100%)` }}>
                  <span style={{ fontSize: i === 0 ? "7rem" : "5rem", transition: "transform 0.5s ease" }} className="group-hover:scale-110">{item.emoji}</span>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-5"
                  style={{ background: "linear-gradient(to top, rgba(18,15,11,0.85) 0%, transparent 60%)", opacity: 0, transition: "opacity 0.4s ease" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0")}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#F5EFE0" }}>{item.label}</p>
                  <p style={{ fontFamily: "'Montserrat'", fontSize: "0.7rem", color: "#C9A86C", letterSpacing: "0.06em" }}>{item.style}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 section-reveal">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="decorative-line" />
              <span style={{ fontFamily: "'Caveat', cursive", color: "#C4614A", fontSize: "1rem" }}>Голоса наших учеников</span>
              <div className="decorative-line" />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.01em" }}>
              Отзывы
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="art-card p-8 section-reveal relative" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", color: "#C9A86C", lineHeight: 0.8, opacity: 0.25, position: "absolute", top: "1.5rem", left: "2rem" }}>"</div>
                <div className="flex gap-1 mb-4 ml-1">
                  {Array(r.rating).fill(0).map((_, j) => (
                    <span key={j} style={{ color: "#C9A86C", fontSize: "0.85rem" }}>★</span>
                  ))}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontStyle: "italic", lineHeight: 1.8, color: "rgba(245,239,224,0.85)", marginBottom: "1.5rem", paddingTop: "0.5rem" }}>
                  {r.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: "rgba(201,168,108,0.15)", border: "1px solid rgba(201,168,108,0.3)", color: "#C9A86C", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1rem" }}>
                    {r.author[0]}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Montserrat'", fontSize: "0.8rem", fontWeight: 500, color: "#F5EFE0" }}>{r.author}</p>
                    <p style={{ fontFamily: "'Montserrat'", fontSize: "0.7rem", color: "rgba(245,239,224,0.4)" }}>{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-28 px-8" style={{ background: "rgba(201,168,108,0.03)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 section-reveal">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="decorative-line" />
              <span style={{ fontFamily: "'Caveat', cursive", color: "#C9A86C", fontSize: "1rem" }}>Жизнь студии</span>
              <div className="decorative-line" />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.01em" }}>
              Фотогалерея
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 section-reveal">
            {GALLERY_ITEMS.map((g, i) => (
              <div key={i} className="group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: i % 3 === 0 ? "3/2" : "1/1", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,108,0.1)", transition: "all 0.4s ease" }}>
                <div className="w-full h-full flex items-center justify-center min-h-[140px]"
                  style={{ background: `linear-gradient(${135 + i * 20}deg, rgba(201,168,108,0.08) 0%, rgba(196,97,74,0.05) 100%)` }}>
                  <span className="group-hover:scale-110 transition-transform duration-500" style={{ fontSize: "3.5rem" }}>{g.emoji}</span>
                </div>
                <div className="absolute inset-0 flex items-end p-4"
                  style={{ background: "linear-gradient(to top, rgba(18,15,11,0.8) 0%, transparent 60%)", opacity: 0, transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0")}>
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#F5EFE0" }}>{g.label}</p>
                    <p style={{ fontFamily: "'Montserrat'", fontSize: "0.65rem", color: "#C9A86C", letterSpacing: "0.05em" }}>{g.type === "painting" ? "Живопись" : "Фото"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-8" style={{ background: "linear-gradient(135deg, rgba(201,168,108,0.12) 0%, rgba(196,97,74,0.08) 100%)", borderTop: "1px solid rgba(201,168,108,0.15)", borderBottom: "1px solid rgba(201,168,108,0.15)" }}>
        <div className="max-w-4xl mx-auto text-center section-reveal">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, letterSpacing: "-0.01em", marginBottom: "1rem" }}>
            Начни своё <em style={{ fontStyle: "italic", color: "#C9A86C" }}>творческое путешествие</em> сегодня
          </h2>
          <p style={{ fontFamily: "'Montserrat'", fontWeight: 300, color: "rgba(245,239,224,0.6)", marginBottom: "2rem", fontSize: "0.95rem" }}>
            Первое занятие — бесплатно. Просто приходи и почувствуй.
          </p>
          <button className="btn-gold" style={{ fontSize: "0.78rem", padding: "16px 48px" }}>
            Записаться на пробное занятие
          </button>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 section-reveal">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="decorative-line" />
              <span style={{ fontFamily: "'Caveat', cursive", color: "#C4614A", fontSize: "1rem" }}>Мы ждём тебя</span>
              <div className="decorative-line" />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.01em" }}>
              Контакты
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="section-reveal space-y-8">
              {[
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Арбат, 12, 3 этаж", sub: "Метро Арбатская, 3 минуты пешком" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67", sub: "Пн–Пт: 10:00 – 20:00" },
                { icon: "Mail", label: "Email", value: "hello@art-studio.ru", sub: "Ответим в течение часа" },
                { icon: "Clock", label: "Расписание", value: "Пн–Вс: 9:00 – 21:00", sub: "Занятия без выходных" },
              ].map((c) => (
                <div key={c.label} className="flex gap-5 items-start">
                  <div className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                    style={{ border: "1px solid rgba(201,168,108,0.3)", background: "rgba(201,168,108,0.06)" }}>
                    <Icon name={c.icon} fallback="MapPin" size={18} style={{ color: "#C9A86C" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Montserrat'", fontSize: "0.68rem", color: "#C9A86C", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>{c.label}</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#F5EFE0", fontWeight: 400 }}>{c.value}</p>
                    <p style={{ fontFamily: "'Montserrat'", fontSize: "0.78rem", color: "rgba(245,239,224,0.45)", marginTop: "2px" }}>{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-reveal">
              <div className="art-card p-8">
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, marginBottom: "1.5rem" }}>
                  Написать нам
                </h3>
                <div className="space-y-4">
                  {[
                    { field: "name", placeholder: "Ваше имя", type: "text" },
                    { field: "phone", placeholder: "Телефон", type: "tel" },
                  ].map((f) => (
                    <input key={f.field} type={f.type} placeholder={f.placeholder}
                      value={formData[f.field as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [f.field]: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,108,0.2)", color: "#F5EFE0", padding: "13px 16px", fontFamily: "'Montserrat'", fontSize: "0.87rem", outline: "none", transition: "border-color 0.3s", borderRadius: "2px" }}
                      onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(201,168,108,0.6)")}
                      onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(201,168,108,0.2)")}
                    />
                  ))}
                  <textarea placeholder="Расскажите о себе и своих целях" rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,108,0.2)", color: "#F5EFE0", padding: "13px 16px", fontFamily: "'Montserrat'", fontSize: "0.87rem", outline: "none", resize: "none", transition: "border-color 0.3s", borderRadius: "2px" }}
                    onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(201,168,108,0.6)")}
                    onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(201,168,108,0.2)")}
                  />
                  <button className="btn-gold w-full" style={{ fontSize: "0.75rem" }}>
                    Отправить заявку
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-8" style={{ borderTop: "1px solid rgba(201,168,108,0.12)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center" style={{ border: "1px solid rgba(201,168,108,0.4)" }}>
              <span style={{ fontFamily: "'Caveat', cursive", color: "#C9A86C", fontSize: "1rem" }}>А</span>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(245,239,224,0.6)" }}>
              Арт-Студия © 2024
            </span>
          </div>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: "1rem", color: "rgba(201,168,108,0.5)" }}>
            Искусство живёт в каждом из нас
          </p>
          <div className="flex gap-4">
            {["Instagram", "VK", "Telegram"].map((s) => (
              <button key={s}
                style={{ fontFamily: "'Montserrat'", fontSize: "0.68rem", color: "rgba(245,239,224,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.3s", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#C9A86C")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(245,239,224,0.4)")}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}