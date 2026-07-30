import { useState, useEffect, useRef } from "react";

// ─── DATOS DE MUESTRA ────────────────────────────────────────────────────────

const DAILY_VERSES = [
  {
    id: 1,
    date: "2024-01-15",
    reference: "Filipenses 4:13",
    text: "Todo lo puedo en Cristo que me fortalece.",
    kjv: "I can do all things through Christ which strengtheneth me.",
    theme: "Fortaleza",
    morning_prayer:
      "Señor, gracias por este nuevo día. Dame fuerzas para enfrentar cada desafío con fe y confianza en Ti. Que tu presencia guíe cada paso que dé hoy.",
    evening_prayer:
      "Padre celestial, gracias por tu protección durante este día. Mientras desciendo al descanso, llena mi corazón de paz y gratitud.",
  },
  {
    id: 2,
    date: "2024-01-16",
    reference: "Jeremías 29:11",
    text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
    kjv: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
    theme: "Esperanza",
    morning_prayer:
      "Dios de esperanza, confío en tus planes para mi vida. Ayúdame a caminar con fe aunque no vea el camino completo.",
    evening_prayer:
      "Señor, descanso en la certeza de que tus planes son buenos. Gracias por cada promesa cumplida hoy.",
  },
  {
    id: 3,
    date: "2024-01-17",
    reference: "Proverbios 31:25",
    text: "Fuerza y honor son su vestidura; y se ríe de lo por venir.",
    kjv: "Strength and honour are her clothing; and she shall rejoice in time to come.",
    theme: "Mujer de Dios",
    morning_prayer:
      "Señor, vísteme hoy de tu fortaleza y dignidad. Que mis acciones reflejen tu gracia y amor.",
    evening_prayer:
      "Padre, gracias por recordarme hoy quién soy en Ti. Mujer amada, fortalecida y llena de tu gracia.",
  },
  {
    id: 4,
    date: "2024-01-18",
    reference: "Salmos 46:5",
    text: "Dios está en medio de ella; no será conmovida. Dios la ayudará al clarear la mañana.",
    kjv: "God is in the midst of her; she shall not be moved: God shall help her, and that right early.",
    theme: "Presencia de Dios",
    morning_prayer:
      "Señor, que tu presencia sea real en mi vida hoy. Sé mi guía, mi fortaleza y mi paz.",
    evening_prayer:
      "Gracias Dios porque estuviste conmigo en cada momento de este día. Tu fidelidad nunca falla.",
  },
  {
    id: 5,
    date: "2024-01-19",
    reference: "Isaías 41:10",
    text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.",
    kjv: "Fear thou not; for I am with thee: be not dismayed; for I am thy God.",
    theme: "No temas",
    morning_prayer:
      "Padre, alejo el miedo y abrazo tu amor perfecto. Eres mi Dios y estás conmigo.",
    evening_prayer:
      "Señor, gracias por tu compañía constante. No hay nada que temer contigo a mi lado.",
  },
  {
    id: 6,
    date: "2024-01-20",
    reference: "Mateo 11:28",
    text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
    kjv: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
    theme: "Descanso",
    morning_prayer:
      "Jesús, deposito mis cargas a tus pies. Dame el descanso que solo Tú puedes dar.",
    evening_prayer:
      "Señor, descanso en tus brazos esta noche. Toma mis preocupaciones y dame tu paz.",
  },
  {
    id: 7,
    date: "2024-01-21",
    reference: "Romanos 8:28",
    text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.",
    kjv: "And we know that all things work together for good to them that love God.",
    theme: "Confianza",
    morning_prayer:
      "Dios, confío que cada circunstancia de hoy está en tus manos. Trabaja todo para bien.",
    evening_prayer:
      "Gracias Señor por convertir incluso las dificultades de hoy en bendiciones. Tu amor es fiel.",
  },
];

const READING_PLANS = [
  {
    id: 1,
    name: "Plan 30 días — Mujer de Fe",
    description: "Versículos especialmente seleccionados para mujeres creyentes",
    days: 30,
    completed: 7,
    color: "#E8A0BF",
    books: ["Salmos", "Proverbios", "Rut", "Ester"],
  },
  {
    id: 2,
    name: "Salmos y Oraciones",
    description: "Un recorrido profundo por los Salmos",
    days: 21,
    completed: 3,
    color: "#A8D8EA",
    books: ["Salmos"],
  },
  {
    id: 3,
    name: "Proverbios para la Mujer",
    description: "Sabiduría práctica para cada día",
    days: 31,
    completed: 0,
    color: "#C8E6C9",
    books: ["Proverbios"],
  },
  {
    id: 4,
    name: "Nuevo Testamento en 90 días",
    description: "Recorre el NT con enfoque en la vida de Jesús",
    days: 90,
    completed: 0,
    color: "#FFE0B2",
    books: ["Mateo", "Marcos", "Lucas", "Juan", "Hechos"],
  },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "¿Quién escribió el libro de Proverbios principalmente?",
    options: ["David", "Salomón", "Moisés", "Pablo"],
    correct: 1,
    verse: "Proverbios 1:1",
  },
  {
    id: 2,
    question: "¿Cuántos libros tiene la Biblia?",
    options: ["60", "64", "66", "68"],
    correct: 2,
    verse: "2 Timoteo 3:16",
  },
  {
    id: 3,
    question: "¿Qué mujer fue llamada 'bienaventurada entre todas las mujeres'?",
    options: ["Sara", "Raquel", "Débora", "María"],
    correct: 3,
    verse: "Lucas 1:42",
  },
  {
    id: 4,
    question: "¿En qué libro está el versículo 'Todo lo puedo en Cristo'?",
    options: ["Romanos", "Filipenses", "Gálatas", "Colosenses"],
    correct: 1,
    verse: "Filipenses 4:13",
  },
  {
    id: 5,
    question: "¿Cuántos Salmos tiene la Biblia?",
    options: ["100", "120", "150", "180"],
    correct: 2,
    verse: "Salmos 150:6",
  },
];

const DEVOTIONALS = [
  {
    id: 1,
    title: "Gracia que sostiene",
    subtitle: "Cuando la vida se pone difícil",
    date: "Hoy",
    duration: "5 min",
    verse: "2 Corintios 12:9",
    verseText:
      "Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad.",
    content:
      "Hay momentos en que sentimos que no podemos más. El cansancio, las preocupaciones, las pruebas... todo parece demasiado. Pero en esos momentos, Dios nos recuerda algo poderoso: Su gracia es suficiente.\n\nNo necesitas tenerlo todo resuelto. No necesitas ser perfecta. Solo necesitas abrir tu corazón y dejar que la gracia de Dios fluya en tu debilidad. Porque es exactamente allí, en nuestra fragilidad, donde Su poder se manifiesta más claramente.\n\nHoy, en lugar de luchar con tus propias fuerzas, descansa en Su gracia. Él es tu fortaleza.",
    category: "Gracia",
  },
  {
    id: 2,
    title: "La mujer que tocó el manto",
    subtitle: "Fe que alcanza lo imposible",
    date: "Ayer",
    duration: "7 min",
    verse: "Marcos 5:34",
    verseText:
      "Pero él le dijo: Hija, tu fe te ha hecho salva; ve en paz, y queda sana de tu azote.",
    content:
      "Durante doce años esta mujer sufrió. Gastó todo lo que tenía buscando una cura. Nadie podía ayudarla. Pero un día escuchó acerca de Jesús y decidió que solo necesitaba tocar Su manto.\n\nEsa fe pequeña pero firme fue suficiente. Jesús se detuvo entre toda la multitud para atenderla, para llamarla 'hija', para declarar su sanidad y enviarla en paz.\n\nTú también puedes acercarte a Él hoy. Con fe, aunque sea pequeña. Con esperanza, aunque parezca difícil. Él te ve, te conoce y puede sanar lo que nadie más puede.",
    category: "Fe",
  },
  {
    id: 3,
    title: "Manos que sirven, corazón que ama",
    subtitle: "El servicio como expresión de fe",
    date: "Hace 2 días",
    duration: "6 min",
    verse: "Proverbios 31:20",
    verseText:
      "Alarga su mano al pobre, y extiende sus manos al menesteroso.",
    content:
      "La mujer virtuosa de Proverbios 31 no era perfecta. Era una mujer real, con responsabilidades reales. Pero algo la distinguía: su corazón estaba volcado hacia los demás.\n\nServir no significa agotarse. Significa ver a los que te rodean con los ojos de Dios y responder con amor. A veces es una palabra de aliento. Otras veces es presencia silenciosa. Y a veces son manos extendidas hacia quien lo necesita.\n\nHoy busca una oportunidad de servir. No tiene que ser grande. Solo tiene que nacer del amor.",
    category: "Servicio",
  },
];

// ─── COLORES Y ESTILOS GLOBALES ───────────────────────────────────────────────

const COLORS = {
  primary: "#8B4B7A",
  primaryLight: "#C47BAA",
  primaryDark: "#5C2E52",
  secondary: "#E8A0BF",
  accent: "#F7C5DC",
  accentLight: "#FDF0F5",
  gold: "#D4A843",
  goldLight: "#F5E6C8",
  text: "#2D1B2E",
  textSecondary: "#6B4C6E",
  textLight: "#9B7B9E",
  bg: "#FDF8FC",
  bgCard: "#FFFFFF",
  bgSection: "#F5EEF8",
  border: "#E8D5F0",
  success: "#4CAF50",
  white: "#FFFFFF",
  overlay: "rgba(45, 27, 46, 0.6)",
};

const BASE_FONT = "'Georgia', 'Times New Roman', serif";
const UI_FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

// ─── UTILIDADES ───────────────────────────────────────────────────────────────

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.error(e);
    }
  };
  return [storedValue, setValue];
}

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function getWeekDays() {
  const today = new Date();
  const days = [];
  for (let i = -3; i <= 3; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d.toISOString().split("T")[0],
      day: d.toLocaleDateString("es-ES", { weekday: "short" }),
      num: d.getDate(),
      isToday: i === 0,
    });
  }
  return days;
}

// ─── COMPONENTES PEQUEÑOS ─────────────────────────────────────────────────────

function FlowerDivider() {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: 18,
        color: COLORS.primaryLight,
        margin: "12px 0",
        letterSpacing: 6,
      }}
    >
      🌸 ✦ 🌸
    </div>
  );
}

function Badge({ text, color = COLORS.primary }) {
  return (
    <span
      style={{
        background: color + "22",
        color: color,
        borderRadius: 20,
        padding: "3px 10px",
        fontSize: 11,
        fontWeight: 700,
        fontFamily: UI_FONT,
        letterSpacing: 0.5,
      }}
    >
      {text}
    </span>
  );
}

function AmenButton({ onAmen }) {
  const [pressed, setPressed] = useState(false);
  const [showText, setShowText] = useState(false);
  const timerRef = useRef(null);

  const handleAmen = () => {
    setPressed(true);
    setShowText(true);
    onAmen && onAmen();
    // Mantiene el efecto 3 segundos para leer con sentimiento (sugerencia del usuario)
    timerRef.current = setTimeout(() => {
      setPressed(false);
      setShowText(false);
    }, 3000);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div style={{ textAlign: "center", margin: "16px 0" }}>
      <button
        onClick={handleAmen}
        style={{
          background: pressed
            ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.primary})`
            : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          color: COLORS.white,
          border: "none",
          borderRadius: 30,
          padding: "12px 36px",
          fontSize: 16,
          fontFamily: BASE_FONT,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: pressed
            ? `0 4px 20px ${COLORS.gold}66`
            : `0 4px 15px ${COLORS.primary}44`,
          transform: pressed ? "scale(1.06)" : "scale(1)",
          transition: "all 0.3s ease",
          letterSpacing: 1,
        }}
      >
        🙏 Amén
      </button>
      {showText && (
        <p
          style={{
            color: COLORS.gold,
            fontFamily: BASE_FONT,
            fontStyle: "italic",
            fontSize: 14,
            marginTop: 8,
            animation: "fadeInUp 0.4s ease",
          }}
        >
          "Que así sea en tu vida" 🌸
        </p>
      )}
    </div>
  );
}

function ProgressBar({ value, max, color = COLORS.primary }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div
      style={{
        background: COLORS.border,
        borderRadius: 10,
        height: 8,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${color}, ${COLORS.primaryLight})`,
          borderRadius: 10,
          transition: "width 0.5s ease",
        }}
      />
    </div>
  );
}

// ─── PANTALLA: INICIO ─────────────────────────────────────────────────────────

function HomeScreen({ favorites, setFavorites, notes, setNotes }) {
  const todayVerse = DAILY_VERSES[0];
  const [showKJV, setShowKJV] = useState(false);
  const [reflection, setReflection] = useLocalStorage("reflection_morning_1", "");
  const [eveningReflection, setEveningReflection] = useLocalStorage("reflection_evening_1", "");
  const [activeTab, setActiveTab] = useState("morning");
  const [amenCount, setAmenCount] = useLocalStorage("amen_count", 0);
  const weekDays = getWeekDays();

  const isFav = favorites.includes(todayVerse.id);

  const toggleFav = () => {
    setFavorites((prev) =>
      prev.includes(todayVerse.id)
        ? prev.filter((id) => id !== todayVerse.id)
        : [...prev, todayVerse.id]
    );
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Buenos días"
      : hour < 18
      ? "Buenas tardes"
      : "Buenas noches";
  const greetingEmoji = hour < 12 ? "🌅" : hour < 18 ? "☀️" : "🌙";

  return (
    <div style={{ paddingBottom: 20 }}>
      {/* Header saludo */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 60%, ${COLORS.primaryLight} 100%)`,
          padding: "28px 20px 24px",
          color: COLORS.white,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            fontSize: 100,
            opacity: 0.08,
            pointerEvents: "none",
          }}
        >
          ✦
        </div>
        <p style={{ fontSize: 13, opacity: 0.8, fontFamily: UI_FONT, margin: 0 }}>
          {greetingEmoji} {greeting}
        </p>
        <h1
          style={{
            fontSize: 22,
            fontFamily: BASE_FONT,
            margin: "4px 0 0",
            fontWeight: 700,
          }}
        >
          Biblia para Mujeres
        </h1>
        <p
          style={{
            fontSize: 12,
            opacity: 0.75,
            fontFamily: UI_FONT,
            margin: "6px 0 0",
          }}
        >
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      {/* Mini calendario semanal */}
      <div
        style={{
          background: COLORS.bgCard,
          margin: "0 0 12px",
          padding: "14px 16px",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: COLORS.textLight,
            fontFamily: UI_FONT,
            margin: "0 0 10px",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Esta semana
        </p>
        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          {weekDays.map((d) => {
            const dayVerse = DAILY_VERSES.find(
              (v) => v.date === d.date || d.isToday
            );
            const dayFav =
              dayVerse && favorites.includes(dayVerse.id);
            return (
              <div
                key={d.date}
                style={{
                  minWidth: 40,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: d.isToday ? COLORS.primary : COLORS.textLight,
                    fontFamily: UI_FONT,
                    textTransform: "uppercase",
                    fontWeight: d.isToday ? 700 : 400,
                  }}
                >
                  {d.day}
                </span>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: d.isToday
                      ? COLORS.primary
                      : COLORS.bgSection,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: d.isToday
                      ? `2px solid ${COLORS.primaryLight}`
                      : "2px solid transparent",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: d.isToday ? COLORS.white : COLORS.text,
                      fontFamily: UI_FONT,
                    }}
                  >
                    {d.num}
                  </span>
                </div>
                {/* ❤️ si ese día tiene favorito */}
                <span style={{ fontSize: 12, minHeight: 16 }}>
                  {dayFav ? "❤️" : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Versículo del día */}
      <div
        style={{
          margin: "0 16px 16px",
          background: COLORS.bgCard,
          borderRadius: 18,
          boxShadow: `0 4px 24px ${COLORS.primary}18`,
          overflow: "hidden",
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.secondary})`,
            padding: "14px 18px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                fontSize: 11,
                fontFamily: UI_FONT,
                color: COLORS.primaryDark,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              🌸 Versículo del día
            </span>
            <Badge text={todayVerse.theme} color={COLORS.primaryDark} />
          </div>
          <button
            onClick={toggleFav}
            style={{
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              transition: "transform 0.2s",
              transform: isFav ? "scale(1.2)" : "scale(1)",
            }}
            title={isFav ? "Quitar favorito" : "Marcar como favorito"}
          >
            {isFav ? "❤️" : "🤍"}
          </button>
        </div>

        <div style={{ padding: "18px 18px 14px" }}>
          <FlowerDivider />
          <blockquote
            style={{
              margin: "12px 0",
              padding: 0,
              fontFamily: BASE_FONT,
              fontSize: 17,
              lineHeight: 1.7,
              color: COLORS.text,
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            "{showKJV ? todayVerse.kjv : todayVerse.text}"
          </blockquote>
          <p
            style={{
              textAlign: "center",
              fontFamily: UI_FONT,
              fontWeight: 700,
              color: COLORS.primary,
              fontSize: 14,
              margin: "8px 0 12px",
            }}
          >
            — {todayVerse.reference}
          </p>
          <button
            onClick={() => setShowKJV(!showKJV)}
            style={{
              display: "block",
              margin: "0 auto 8px",
              background: "none",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 20,
              padding: "5px 16px",
              fontSize: 12,
              color: COLORS.textSecondary,
              cursor: "pointer",
              fontFamily: UI_FONT,
            }}
          >
            {showKJV ? "Ver en español" : "Ver en KJV (inglés)"}
          </button>
        </div>

        {/* Oración del día */}
        <div
          style={{
            borderTop: `1px solid ${COLORS.border}`,
            padding: "14px 18px",
            background: COLORS.accentLight,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {["morning", "evening"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                style={{
                  flex: 1,
                  padding: "8px 4px",
                  borderRadius: 10,
                  border: "none",
                  background:
                    activeTab === t ? COLORS.primary : "transparent",
                  color:
                    activeTab === t ? COLORS.white : COLORS.textSecondary,
                  fontFamily: UI_FONT,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {t === "morning" ? "🌅 Mañana" : "🌙 Noche"}
              </button>
            ))}
          </div>

          <p
            style={{
              fontFamily: BASE_FONT,
              fontSize: 14,
              lineHeight: 1.7,
              color: COLORS.textSecondary,
              fontStyle: "italic",
              margin: "0 0 14px",
            }}
          >
            {activeTab === "morning"
              ? todayVerse.morning_prayer
              : todayVerse.evening_prayer}
          </p>

          <AmenButton onAmen={() => setAmenCount((c) => c + 1)} />

          {/* Espacio de reflexión (sugerencia del usuario) */}
          <div
            style={{
              marginTop: 12,
              background: COLORS.white,
              borderRadius: 12,
              border: `1px solid ${COLORS.border}`,
              padding: 14,
            }}
          >
            <p
              style={{
                fontFamily: UI_FONT,
                fontSize: 12,
                color: COLORS.textLight,
                margin: "0 0 8px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              ✍️ Mi reflexión de{" "}
              {activeTab === "morning" ? "la mañana" : "la noche"}
            </p>
            <textarea
              value={activeTab === "morning" ? reflection : eveningReflection}
              onChange={(e) =>
                activeTab === "morning"
                  ? setReflection(e.target.value)
                  : setEveningReflection(e.target.value)
              }
              placeholder="Escribe aquí lo que Dios puso en tu corazón hoy..."
              style={{
                width: "100%",
                minHeight: 90,
                border: "none",
                outline: "none",
                resize: "vertical",
                fontFamily: BASE_FONT,
                fontSize: 14,
                color: COLORS.text,
                lineHeight: 1.6,
                background: "transparent",
                boxSizing: "border-box",
              }}
            />
            {(activeTab === "morning" ? reflection : eveningReflection) && (
              <p
                style={{
                  fontSize: 11,
                  color: COLORS.success,
                  fontFamily: UI_FONT,
                  margin: "6px 0 0",
                }}
              >
                ✓ Guardado automáticamente
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Devocional destacado */}
      <div style={{ margin: "0 16px 16px" }}>
        <h2
          style={{
            fontFamily: BASE_FONT,
            fontSize: 16,
            color: COLORS.text,
            margin: "0 0 12px",
          }}
        >
          💗 Devocional de hoy
        </h2>
        <DevotionalCard devotional={DEVOTIONALS[0]} compact />
      </div>

      {/* Estadísticas rápidas */}
      <div
        style={{
          margin: "0 16px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        {[
          { icon: "🙏", label: "Amenes", value: amenCount },
          { icon: "❤️", label: "Favoritos", value: favorites.length },
          { icon: "✍️", label: "Notas", value: Object.keys(notes).length },
          { icon: "📅", label: "Racha (días)", value: 7 },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: COLORS.bgCard,
              borderRadius: 14,
              padding: "14px 16px",
              border: `1px solid ${COLORS.border}`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: COLORS.primary,
                fontFamily: UI_FONT,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 11,
                color: COLORS.textLight,
                fontFamily: UI_FONT,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PANTALLA: BIBLIA / VERSÍCULOS ────────────────────────────────────────────

function BibleScreen({ favorites, setFavorites, notes, setNotes }) {
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [search, setSearch] = useState("");
  const [highlight, setHighlight] = useLocalStorage("highlights", []);
  const [activeFilter, setActiveFilter] = useState("todos");

  const themes = ["todos", ...new Set(DAILY_VERSES.map((v) => v.theme))];

  const filtered = DAILY_VERSES.filter((v) => {
    const matchSearch =
      v.text.toLowerCase().includes(search.toLowerCase()) ||
      v.reference.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === "todos" || v.theme === activeFilter;
    return matchSearch && matchFilter;
  });

  const openVerse = (v) => {
    setSelectedVerse(v);
    setNoteText(notes[v.id] || "");
  };

  const saveNote = () => {
    setNotes((prev) => ({ ...prev, [selectedVerse.id]: noteText }));
  };

  const toggleFav = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleHighlight = (id) => {
    setHighlight((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (selectedVerse) {
    return (
      <div style={{ paddingBottom: 20 }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
            padding: "16px 16px 20px",
            color: COLORS.white,
          }}
        >
          <button
            onClick={() => setSelectedVerse(null)}
            style={{
              background: "none",
              border: "none",
              color: COLORS.white,
              fontSize: 22,
              cursor: "pointer",
              padding: 0,
              marginBottom: 8,
            }}
          >
            ‹ Volver
          </button>
          <h2
            style={{
              fontFamily: BASE_FONT,
              fontSize: 18,
              margin: 0,
              fontWeight: 700,
            }}
          >
            {selectedVerse.reference}
          </h2>
          <Badge text={selectedVerse.theme} color={COLORS.accent} />
        </div>

        <div
          style={{
            margin: 16,
            background: COLORS.bgCard,
            borderRadius: 18,
            overflow: "hidden",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div
            style={{
              background: highlight.includes(selectedVerse.id)
                ? COLORS.goldLight
                : COLORS.accentLight,
              padding: "20px 18px",
              transition: "background 0.3s",
            }}
          >
            <FlowerDivider />
            <blockquote
              style={{
                margin: "12px 0",
                fontFamily: BASE_FONT,
                fontSize: 18,
                lineHeight: 1.8,
                color: COLORS.text,
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              "{selectedVerse.text}"
            </blockquote>
            <p
              style={{
                textAlign: "center",
                fontFamily: UI_FONT,
                fontWeight: 700,
                color: COLORS.primary,
                fontSize: 15,
              }}
            >
              — {selectedVerse.reference}
            </p>
            <div
              style={{
                borderTop: `1px solid ${COLORS.border}`,
                marginTop: 12,
                paddingTop: 12,
                fontFamily: BASE_FONT,
                fontSize: 14,
                color: COLORS.textSecondary,
                fontStyle: "italic",
              }}
            >
              <strong style={{ fontStyle: "normal" }}>KJV:</strong>{" "}
              "{selectedVerse.kjv}"
            </div>
          </div>

          {/* Acciones */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "12px 8px",
              borderTop: `1px solid ${COLORS.border}`,
            }}
          >
            {[
              {
                icon: favorites.includes(selectedVerse.id) ? "❤️" : "🤍",
                label: "Favorito",
                action: () => toggleFav(selectedVerse.id),
              },
              {
                icon: highlight.includes(selectedVerse.id) ? "🌟" : "⭐",
                label: "Destacar",
                action: () => toggleHighlight(selectedVerse.id),
              },
              {
                icon: "📤",
                label: "Compartir",
                // TODO: Integrar Web Share API
                action: () => {
                  if (navigator.share) {
                    navigator.share({
                      title: selectedVerse.reference,
                      text: `"${selectedVerse.text}" — ${selectedVerse.reference}`,
                    });
                  }
                },
              },
              {
                icon: "🎵",
                label: "Audio",
                // TODO: Integrar API de audio de la Biblia (ej: API.Bible)
                action: () => alert("🎵 Audio próximamente disponible"),
              },
            ].map((a) => (
              <button
                key={a.label}
                onClick={a.action}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: "6px 10px",
                }}
              >
                <span style={{ fontSize: 22 }}>{a.icon}</span>
                <span
                  style={{
                    fontSize: 10,
                    color: COLORS.textLight,
                    fontFamily: UI_FONT,
                  }}
                >
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Oración */}
        <div
          style={{
            margin: "0 16px 16px",
            background: COLORS.bgCard,
            borderRadius: 16,
            padding: 16,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <h3
            style={{
              fontFamily: BASE_FONT,
              color: COLORS.primary,
              margin: "0 0 10px",
              fontSize: 15,
            }}
          >
            🙏 Oración del versículo
          </h3>
          <p
            style={{
              fontFamily: BASE_FONT,
              fontSize: 14,
              lineHeight: 1.7,
              color: COLORS.textSecondary,
              fontStyle: "italic",
              margin: "0 0 12px",
            }}
          >
            {selectedVerse.morning_prayer}
          </p>
          <AmenButton />
        </div>

        {/* Notas */}
        <div
          style={{
            margin: "0 16px",
            background: COLORS.bgCard,
            borderRadius: 16,
            padding: 16,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <h3
            style={{
              fontFamily: BASE_FONT,
              color: COLORS.primary,
              margin: "0 0 10px",
              fontSize: 15,
            }}
          >
            ✍️ Mis notas
          </h3>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Escribe tus reflexiones sobre este versículo..."
            style={{
              width: "100%",
              minHeight: 100,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: 10,
              fontFamily: BASE_FONT,
              fontSize: 14,
              color: COLORS.text,
              outline: "none",
              resize: "vertical",
              boxSizing: "border-box",
              lineHeight: 1.6,
            }}
          />
          <button
            onClick={saveNote}
            style={{
              marginTop: 10,
              background: COLORS.primary,
              color: COLORS.white,
              border: "none",
              borderRadius: 20,
              padding: "9px 24px",
              cursor: "pointer",
              fontFamily: UI_FONT,
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            💾 Guardar nota
          </button>
          {notes[selectedVerse.id] && (
            <p
              style={{
                fontSize: 11,
                color: COLORS.success,
                fontFamily: UI_FONT,
                marginTop: 6,
              }}
            >
              ✓ Nota guardada
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 20 }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
          padding: "20px 16px 24px",
          color: COLORS.white,
        }}
      >
        <h2
          style={{
            fontFamily: BASE_FONT,
            fontSize: 20,
            margin: "0 0 14px",
          }}
        >
          📖 Versículos
        </h2>
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: 25,
            display: "flex",
            alignItems: "center",
            padding: "10px 14px",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 16 }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar versículos..."
            style={{
              background: "none",
              border: "none",
              color: COLORS.white,
              outline: "none",
              fontSize: 14,
              flex: 1,
              fontFamily: UI_FONT,
            }}
          />
        </div>
      </div>

      {/* Filtros por tema */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          padding: "12px 16px",
          background: COLORS.bgCard,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => setActiveFilter(t)}
            style={{
              whiteSpace: "nowrap",
              padding: "6px 14px",
              borderRadius: 20,
              border: `1px solid ${
                activeFilter === t ? COLORS.primary : COLORS.border
              }`,
              background:
                activeFilter === t ? COLORS.primary : COLORS.bgCard,
              color:
                activeFilter === t ? COLORS.white : COLORS.textSecondary,
              fontSize: 12,
              fontFamily: UI_FONT,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista de versículos */}
      <div style={{ padding: "12px 16px" }}>
        {filtered.map((verse) => (
          <div
            key={verse.id}
            onClick={() => openVerse(verse)}
            style={{
              background: COLORS.bgCard,
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
              border: `1px solid ${
                highlight.includes(verse.id)
                  ? COLORS.gold
                  : COLORS.border
              }`,
              cursor: "pointer",
              boxShadow: `0 2px 12px ${COLORS.primary}0D`,
              transition: "transform 0.15s",
              background: highlight.includes(verse.id)
                ? COLORS.goldLight
                : COLORS.bgCard,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Badge text={verse.theme} />
              <div style={{ display: "flex", gap: 8 }}>
                {highlight.includes(verse.id) && (
                  <span style={{ fontSize: 14 }}>⭐</span>
                )}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFav(verse.id);
                  }}
                  style={{ fontSize: 18, cursor: "pointer" }}
                >
                  {favorites.includes(verse.id) ? "❤️" : "🤍"}
                </span>
              </div>
            </div>
            <p
              style={{
                fontFamily: BASE_FONT,
                fontSize: 15,
                lineHeight: 1.6,
                color: COLORS.text,
                fontStyle: "italic",
                margin: "0 0 8px",
              }}
            >
              "{verse.text}"
            </p>
            <p
              style={{
                fontFamily: UI_FONT,
                fontWeight: 700,
                color: COLORS.primary,
                fontSize: 13,
                margin: 0,
              }}
            >
              — {verse.reference}
            </p>
            {notes[verse.id] && (
              <p
                style={{
                  fontSize: 11,
                  color: COLORS.textLight,
                  fontFamily: UI_FONT,
                  margin: "6px 0 0",
                }}
              >
                ✍️ Tienes una nota guardada
              </p>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <span style={{ fontSize: 40 }}>🌸</span>
            <p
              style={{
                fontFamily: BASE_FONT,
                color: COLORS.textLight,
                fontSize: 15,
              }}
            >
              No se encontraron versículos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── COMPONENTE DEVOCIONAL CARD ────────────────────────────────────────────────

function DevotionalCard({ devotional, compact = false, onOpen }) {
  return (
    <div
      onClick={() => onOpen && onOpen(devotional)}
      style={{
        background: COLORS.bgCard,
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${COLORS.border}`,
        marginBottom: compact ? 0 : 14,
        cursor: onOpen ? "pointer" : "default",
        boxShadow: `0 2px 12px ${COLORS.primary}0D`,
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.accent})`,
          padding: "12px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Badge text={devotional.category} color={COLORS.primaryDark} />
          <span
            style={{
              marginLeft: 6,
              fontSize: 11,
              color: COLORS.primaryDark,
              fontFamily: UI_FONT,
            }}
          >
            {devotional.duration}
          </span>
        </div>
        <span
          style={{ fontSize: 11, color: COLORS.primaryDark, fontFamily: UI_FONT }}
        >
          {devotional.date}
        </span>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <h3
          style={{
            fontFamily: BASE_FONT,
            fontSize: 16,
            color: COLORS.text,
            margin: "0 0 4px",
          }}
        >
          {devotional.title}
        </h3>
        <p
          style={{
            fontFamily: UI_FONT,
            fontSize: 13,
            color: COLORS.textSecondary,
            margin: "0 0 10px",
          }}
        >
          {devotional.subtitle}
        </p>
        <div
          style={{
            background: COLORS.accentLight,
            borderLeft: `3px solid ${COLORS.primary}`,
            padding: "8px 10px",
            borderRadius: "0 8px 8px 0",
            marginBottom: 10,
          }}
        >
          <p
            style={{
              fontFamily: BASE_FONT,
              fontSize: 13,
              fontStyle: "italic",
              color: COLORS.textSecondary,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            "{devotional.verseText}"
          </p>
          <p
            style={{
              fontFamily: UI_FONT,
              fontSize: 11,
              color: COLORS.primary,
              fontWeight: 700,
              margin: "4px 0 0",
            }}
          >
            {devotional.verse}
          </p>
        </div>
        {!compact && (
          <p
            style={{
              fontFamily: BASE_FONT,
              fontSize: 13,
              color: COLORS.textSecondary,
              lineHeight: 1.6,
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {devotional.content}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── PANTALLA: DEVOCIONALES ────────────────────────────────────────────────────

function DevotionalsScreen() {
  const [selected, setSelected] = useState(null);
  const [reflexion, setReflexion] = useLocalStorage("dev_reflexion", {});

  if (selected) {
    const ref = reflexion[selected.id] || "";
    return (
      <div style={{ paddingBottom: 20 }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
            padding: "16px 16px 20px",
            color: COLORS.white,
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              background: "none",
              border: "none",
              color: COLORS.white,
              fontSize: 22,
              cursor: "pointer",
              padding: 0,
              marginBottom: 8,
            }}
          >
            ‹ Devocionales
          </button>
          <Badge text={selected.category} color={COLORS.accent} />
          <h2
            style={{
              fontFamily: BASE_FONT,
              fontSize: 20,
              margin: "6px 0 0",
            }}
          >
            {selected.title}
          </h2>
          <p
            style={{
              fontSize: 13,
              opacity: 0.8,
              fontFamily: UI_FONT,
              margin: "4px 0 0",
            }}
          >
            {selected.subtitle}
          </p>
        </div>

        <div style={{ padding: "16px 16px 0" }}>
          <div
            style={{
              background: COLORS.accentLight,
              borderRadius: 14,
              padding: 16,
              marginBottom: 16,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <p
              style={{
                fontFamily: BASE_FONT,
                fontSize: 16,
                fontStyle: "italic",
                color: COLORS.text,
                margin: "0 0 8px",
                lineHeight: 1.7,
                textAlign: "center",
              }}
            >
              "{selected.verseText}"
            </p>
            <p
              style={{
                fontFamily: UI_FONT,
                fontWeight: 700,
                color: COLORS.primary,
                fontSize: 14,
                textAlign: "center",
                margin: 0,
              }}
            >
              — {selected.verse}
            </p>
          </div>

          <FlowerDivider />

          {selected.content.split("\n\n").map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: BASE_FONT,
                fontSize: 15,
                lineHeight: 1.8,
                color: COLORS.text,
                marginBottom: 14,
              }}
            >
              {para}
            </p>
          ))}

          <FlowerDivider />
          <AmenButton />

          {/* Reflexión del devocional */}
          <div
            style={{
              background: COLORS.bgCard,
              borderRadius: 14,
              padding: 16,
              border: `1px solid ${COLORS.border}`,
              marginTop: 16,
            }}
          >
            <p
              style={{
                fontFamily: UI_FONT,
                fontSize: 12,
                color: COLORS.textLight,
                margin: "0 0 8px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              ✍️ Mi reflexión sobre este devocional
            </p>
            <textarea
              value={ref}
              onChange={(e) =>
                setReflexion((prev) => ({
                  ...prev,
                  [selected.id]: e.target.value,
                }))
              }
              placeholder="¿Qué te habló Dios a través de este devocional?"
              style={{
                width: "100%",
                minHeight: 100,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: 10,
                fontFamily: BASE_FONT,
                fontSize: 14,
                color: COLORS.text,
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
                lineHeight: 1.6,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 20 }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
          padding: "20px 16px 24px",
          color: COLORS.white,
        }}
      >
        <h2
          style={{ fontFamily: BASE_FONT, fontSize: 20, margin: "0 0 4px" }}
        >
          💗 Devocionales
        </h2>
        <p
          style={{ fontSize: 13, opacity: 0.8, fontFamily: UI_FONT, margin: 0 }}
        >
          Reflexiones espirituales para tu vida
        </p>
      </div>
      <div style={{ padding: "14px 16px" }}>
        {DEVOTIONALS.map((dev) => (
          <DevotionalCard
            key={dev.id}
            devotional={dev}
            onOpen={setSelected}
          />
        ))}
      </div>
    </div>
  );
}

// ─── PANTALLA: PLANES DE LECTURA ───────────────────────────────────────────────

function PlansScreen() {
  const [plans, setPlans] = useLocalStorage("reading_plans", READING_PLANS);
  const [selected, setSelected] = useState(null);

  const markDay = (planId) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === planId
          ? { ...p, completed: Math.min(p.completed + 1, p.days) }
          : p
      )
    );
  };

  if (selected) {
    const plan = plans.find((p) => p.id === selected);
    return (
      <div style={{ paddingBottom: 20 }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${plan.color})`,
            padding: "16px 16px 24px",
            color: COLORS.white,
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              background: "none",
              border: "none",
              color: COLORS.white,
              fontSize: 22,
              cursor: "pointer",
              padding: 0,
              marginBottom: 8,
            }}
          >
            ‹ Planes
          </button>
          <h2
            style={{ fontFamily: BASE_FONT, fontSize: 19, margin: "0 0 4px" }}
          >
            {plan.name}
          </h2>
          <p
            style={{ fontSize: 13, opacity: 0.85, fontFamily: UI_FONT, margin: 0 }}
          >
            {plan.description}
          </p>
        </div>

        <div style={{ padding: 16 }}>
          <div
            style={{
              background: COLORS.bgCard,
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  fontFamily: UI_FONT,
                  fontSize: 13,
                  color: COLORS.textSecondary,
                }}
              >
                Progreso
              </span>
              <span
                style={{
                  fontFamily: UI_FONT,
                  fontWeight: 700,
                  fontSize: 13,
                  color: COLORS.primary,
                }}
              >
                {plan.completed}/{plan.days} días
              </span>
            </div>
            <ProgressBar
              value={plan.completed}
              max={plan.days}
              color={plan.color}
            />
            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                color: COLORS.textLight,
                fontFamily: UI_FONT,
              }}
            >
              {Math.round((plan.completed / plan.days) * 100)}% completado
            </div>
          </div>

          {/* Libros del plan */}
          <h3
            style={{
              fontFamily: BASE_FONT,
              color: COLORS.text,
              fontSize: 15,
              margin: "0 0 10px",
            }}
          >
            📚 Libros incluidos
          </h3>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}
          >
            {plan.books.map((b) => (
              <Badge key={b} text={b} color={COLORS.primary} />
            ))}
          </div>

          {/* Días del plan */}
          <h3
            style={{
              fontFamily: BASE_FONT,
              color: COLORS.text,
              fontSize: 15,
              margin: "0 0 10px",
            }}
          >
            📅 Días del plan
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 6,
              marginBottom: 20,
            }}
          >
            {Array.from({ length: Math.min(plan.days, 35) }, (_, i) => {
              const dayNum = i + 1;
              const isDone = dayNum <= plan.completed;
              return (
                <div
                  key={dayNum}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 8,
                    background: isDone ? plan.color : COLORS.bgSection,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: isDone ? COLORS.white : COLORS.textLight,
                    fontFamily: UI_FONT,
                    border: dayNum === plan.completed + 1
                      ? `2px solid ${plan.color}`
                      : "2px solid transparent",
                  }}
                >
                  {isDone ? "✓" : dayNum}
                </div>
              );
            })}
          </div>

          {plan.completed < plan.days && (
            <button
              onClick={() => markDay(plan.id)}
              style={{
                width: "100%",
                padding: "14px",
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                color: COLORS.white,
                border: "none",
                borderRadius: 14,
                fontSize: 15,
                fontFamily: UI_FONT,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: `0 4px 15px ${COLORS.primary}44`,
              }}
            >
              ✅ Marcar día {plan.completed + 1} como leído
            </button>
          )}
          {plan.completed >= plan.days && (
            <div
              style={{
                textAlign: "center",
                padding: 20,
                background: COLORS.goldLight,
                borderRadius: 14,
              }}
            >
              <div style={{ fontSize: 40 }}>🏆</div>
              <p
                style={{
                  fontFamily: BASE_FONT,
                  fontSize: 16,
                  color: COLORS.gold,
                  fontWeight: 700,
                }}
              >
                ¡Plan completado!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 20 }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
          padding: "20px 16px 24px",
          color: COLORS.white,
        }}
      >
        <h2
          style={{ fontFamily: BASE_FONT, fontSize: 20, margin: "0 0 4px" }}
        >
          📅 Planes de Lectura
        </h2>
        <p
          style={{ fontSize: 13, opacity: 0.8, fontFamily: UI_FONT, margin: 0 }}
        >
          Crece en la Palabra día a día
        </p>
      </div>
      <div style={{ padding: "14px 16px" }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            style={{
              background: COLORS.bgCard,
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 14,
              border: `1px solid ${COLORS.border}`,
              cursor: "pointer",
              boxShadow: `0 2px 12px ${COLORS.primary}0D`,
            }}
          >
            <div
              style={{
                height: 6,
                background: plan.color,
                width: `${(plan.completed / plan.days) * 100}%`,
                transition: "width 0.5s",
                minWidth: plan.completed > 0 ? 20 : 0,
              }}
            />
            <div style={{ padding: "14px 16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <h3
                  style={{
                    fontFamily: BASE_FONT,
                    fontSize: 15,
                    color: COLORS.text,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {plan.name}
                </h3>
                <span
                  style={{
                    fontSize: 11,
                    color: COLORS.textLight,
                    fontFamily: UI_FONT,
                    whiteSpace: "nowrap",
                    marginLeft: 8,
                  }}
                >
                  {plan.days} días
                </span>
              </div>
              <p
                style={{
                  fontFamily: UI_FONT,
                  fontSize: 12,
                  color: COLORS.textSecondary,
                  margin: "0 0 10px",
                }}
              >
                {plan.description}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ProgressBar
                  value={plan.completed}
                  max={plan.days}
                  color={plan.color}
                />
                <span
                  style={{
                    fontSize: 12,
                    color: COLORS.textSecondary,
                    fontFamily: UI_FONT,
                    marginLeft: 10,
                    whiteSpace: "nowrap",
                  }}
                >
                  {plan.completed}/{plan.days}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PANTALLA: QUIZ ────────────────────────────────────────────────────────────

function QuizScreen() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = QUIZ_QUESTIONS[current];

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.correct;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, { correct, selected: idx }]);

    setTimeout(() => {
      if (current < QUIZ_QUESTIONS.length - 1) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  if (finished) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div style={{ paddingBottom: 20 }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
            padding: "24px 16px",
            color: COLORS.white,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 60 }}>
            {pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📖"}
          </div>
          <h2
            style={{ fontFamily: BASE_FONT, fontSize: 22, margin: "10px 0 4px" }}
          >
            {pct >= 80
              ? "¡Excelente!"
              : pct >= 60
              ? "¡Buen trabajo!"
              : "¡Sigue estudiando!"}
          </h2>
          <p
            style={{ fontSize: 14, opacity: 0.85, fontFamily: UI_FONT, margin: 0 }}
          >
            Respondiste correctamente {score} de {QUIZ_QUESTIONS.length} preguntas
          </p>
        </div>

        <div style={{ padding: 20 }}>
          <div
            style={{
              background: COLORS.bgCard,
              borderRadius: 16,
              padding: 20,
              textAlign: "center",
              marginBottom: 20,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: pct >= 80 ? COLORS.success : COLORS.primary,
                fontFamily: UI_FONT,
              }}
            >
              {pct}%
            </div>
            <ProgressBar value={score} max={QUIZ_QUESTIONS.length} />
          </div>

          {QUIZ_QUESTIONS.map((q, i) => (
            <div
              key={q.id}
              style={{
                background: answers[i]?.correct
                  ? "#E8F5E9"
                  : "#FFEBEE",
                borderRadius: 12,
                padding: 12,
                marginBottom: 10,
                border: `1px solid ${
                  answers[i]?.correct ? COLORS.success : "#E57373"
                }`,
              }}
            >
              <p
                style={{
                  fontFamily: UI_FONT,
                  fontSize: 13,
                  color: COLORS.text,
                  margin: "0 0 4px",
                }}
              >
                {answers[i]?.correct ? "✅" : "❌"} {q.question}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: COLORS.textLight,
                  fontFamily: UI_FONT,
                  margin: 0,
                }}
              >
                Respuesta correcta: {q.options[q.correct]} — {q.verse}
              </p>
            </div>
          ))}

          <button
            onClick={reset}
            style={{
              width: "100%",
              padding: 14,
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
              color: COLORS.white,
              border: "none",
              borderRadius: 14,
              fontSize: 15,
              fontFamily: UI_FONT,
              fontWeight: 700,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            🔄 Jugar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 20 }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
          padding: "20px 16px 24px",
          color: COLORS.white,
        }}
      >
        <h2
          style={{ fontFamily: BASE_FONT, fontSize: 20, margin: "0 0 4px" }}
        >
          💡 Quiz Bíblico
        </h2>
        <p
          style={{ fontSize: 13, opacity: 0.8, fontFamily: UI_FONT, margin: 0 }}
        >
          Pregunta {current + 1} de {QUIZ_QUESTIONS.length}
        </p>
        <ProgressBar
          value={current}
          max={QUIZ_QUESTIONS.length}
          color={COLORS.accent}
        />
      </div>

      <div style={{ padding: 16 }}>
        <div
          style={{
            background: COLORS.accentLight,
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
            border: `1px solid ${COLORS.border}`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: BASE_FONT,
              fontSize: 17,
              color: COLORS.text,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {q.question}
          </p>
        </div>

        {q.options.map((opt, idx) => {
          let bg = COLORS.bgCard;
          let border = COLORS.border;
          let color = COLORS.text;
          if (selected !== null) {
            if (idx === q.correct) {
              bg = "#E8F5E9";
              border = COLORS.success;
              color = COLORS.success;
            } else if (idx === selected && idx !== q.correct) {
              bg = "#FFEBEE";
              border = "#E57373";
              color = "#E57373";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selected !== null}
              style={{
                width: "100%",
                padding: "14px 16px",
                background: bg,
                border: `2px solid ${border}`,
                borderRadius: 14,
                marginBottom: 10,
                cursor: selected !== null ? "default" : "pointer",
                textAlign: "left",
                fontFamily: UI_FONT,
                fontSize: 14,
                color: color,
                fontWeight: 500,
                transition: "all 0.25s",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background:
                    selected !== null && idx === q.correct
                      ? COLORS.success
                      : selected !== null &&
                        idx === selected &&
                        idx !== q.correct
                      ? "#E57373"
                      : COLORS.border,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLORS.white,
                  flexShrink: 0,
                }}
              >
                {selected !== null && idx === q.correct
                  ? "✓"
                  : selected !== null && idx === selected
                  ? "✗"
                  : ["A", "B", "C", "D"][idx]}
              </span>
              {opt}
            </button>
          );
        })}

        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontFamily: UI_FONT,
            fontSize: 13,
            color: COLORS.textLight,
          }}
        >
          Puntuación actual: {score} ⭐
        </div>
      </div>
    </div>
  );
}

// ─── PANTALLA: FAVORITOS Y NOTAS ──────────────────────────────────────────────

function FavoritesScreen({ favorites, setFavorites, notes, setNotes }) {
  const [activeTab, setActiveTab] = useState("favorites");

  const favVerses = DAILY_VERSES.filter((v) => favorites.includes(v.id));
  const noteEntries = Object.entries(notes).filter(([, v]) => v.trim());

  const removeFav = (id) => setFavorites((prev) => prev.filter((x) => x !== id));

  return (
    <div style={{ paddingBottom: 20 }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
          padding: "20px 16px 16px",
          color: COLORS.white,
        }}
      >
        <h2
          style={{ fontFamily: BASE_FONT, fontSize: 20, margin: "0 0 14px" }}
        >
          📚 Mi Biblioteca
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { key: "favorites", label: "❤️ Favoritos" },
            { key: "notes", label: "✍️ Notas" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                flex: 1,
                padding: "9px",
                borderRadius: 20,
                border: "none",
                background:
                  activeTab === t.key
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(255,255,255,0.1)",
                color: COLORS.white,
                fontFamily: UI_FONT,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                borderBottom:
                  activeTab === t.key
                    ? `2px solid ${COLORS.accent}`
                    : "2px solid transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px 16px" }}>
        {activeTab === "favorites" && (
          <>
            {favVerses.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <span style={{ fontSize: 50 }}>🤍</span>
                <p
                  style={{
                    fontFamily: BASE_FONT,
                    color: COLORS.textLight,
                    fontSize: 15,
                    marginTop: 12,
                  }}
                >
                  Aún no tienes versículos favoritos
                </p>
                <p
                  style={{
                    fontFamily: UI_FONT,
                    color: COLORS.textLight,
                    fontSize: 13,
                  }}
                >
                  Toca el ❤️ en cualquier versículo para guardarlo aquí
                </p>
              </div>
            ) : (
              favVerses.map((v) => (
                <div
                  key={v.id}
                  style={{
                    background: COLORS.bgCard,
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 12,
                    border: `1px solid ${COLORS.border}`,
                    position: "relative",
                  }}
                >
                  <button
                    onClick={() => removeFav(v.id)}
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "none",
                      border: "none",
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                  >
                    ❤️
                  </button>
                  <Badge text={v.theme} />
                  <p
                    style={{
                      fontFamily: BASE_FONT,
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: COLORS.text,
                      fontStyle: "italic",
                      margin: "10px 0 8px",
                    }}
                  >
                    "{v.text}"
                  </p>
                  <p
                    style={{
                      fontFamily: UI_FONT,
                      fontWeight: 700,
                      color: COLORS.primary,
                      fontSize: 13,
                      margin: 0,
                    }}
                  >
                    — {v.reference}
                  </p>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === "notes" && (
          <>
            {noteEntries.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <span style={{ fontSize: 50 }}>✍️</span>
                <p
                  style={{
                    fontFamily: BASE_FONT,
                    color: COLORS.textLight,
                    fontSize: 15,
                    marginTop: 12,
                  }}
                >
                  Aún no tienes notas guardadas
                </p>
                <p
                  style={{
                    fontFamily: UI_FONT,
                    color: COLORS.textLight,
                    fontSize: 13,
                  }}
                >
                  Abre un versículo y escribe tus reflexiones
                </p>
              </div>
            ) : (
              noteEntries.map(([id, note]) => {
                const verse = DAILY_VERSES.find((v) => v.id === parseInt(id));
                return (
                  <div
                    key={id}
                    style={{
                      background: COLORS.bgCard,
                      borderRadius: 16,
                      padding: 16,
                      marginBottom: 12,
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    {verse && (
                      <p
                        style={{
                          fontFamily: UI_FONT,
                          fontWeight: 700,
                          color: COLORS.primary,
                          fontSize: 13,
                          margin: "0 0 8px",
                        }}
                      >
                        📖 {verse.reference}
                      </p>
                    )}
                    <p
                      style={{
                        fontFamily: BASE_FONT,
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: COLORS.text,
                        margin: 0,
                      }}
                    >
                      {note}
                    </p>
                    <button
                      onClick={() =>
                        setNotes((prev) => {
                          const copy = { ...prev };
                          delete copy[id];
                          return copy;
                        })
                      }
                      style={{
                        marginTop: 10,
                        background: "none",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 20,
                        padding: "4px 12px",
                        fontSize: 11,
                        color: COLORS.textLight,
                        cursor: "pointer",
                        fontFamily: UI_FONT,
                      }}
                    >
                      Eliminar nota
                    </button>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── PANTALLA: CONFIGURACIÓN / PERFIL ─────────────────────────────────────────

function SettingsScreen() {
  const [version, setVersion] = useLocalStorage("bible_version", "RVR1960");
  const [reminderTime, setReminderTime] = useLocalStorage(
    "reminder_time",
    "07:00"
  );
  const [reminderEnabled, setReminderEnabled] = useLocalStorage(
    "reminder_enabled",
    true
  );
  const [fontSize, setFontSize] = useLocalStorage("font_size", "medium");
  const [theme, setTheme] = useLocalStorage("app_theme", "light");

  const versions = [
    { key: "RVR1960", label: "Reina Valera 1960" },
    { key: "NVI", label: "Nueva Versión Internacional" },
    { key: "KJV", label: "King James Version (KJV)" },
    { key: "LBLA", label: "La Biblia de las Américas" },
  ];

  return (
    <div style={{ paddingBottom: 20 }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
          padding: "20px 16px 24px",
          color: COLORS.white,
        }}
      >
        <h2
          style={{ fontFamily: BASE_FONT, fontSize: 20, margin: "0 0 4px" }}
        >
          ⚙️ Configuración
        </h2>
        <p
          style={{ fontSize: 13, opacity: 0.8, fontFamily: UI_FONT, margin: 0 }}
        >
          Personaliza tu experiencia
        </p>
      </div>

      <div style={{ padding: "14px 16px" }}>
        {/* Versión de la Biblia */}
        <div
          style={{
            background: COLORS.bgCard,
            borderRadius: 16,
            padding: 16,
            marginBottom: 14,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <h3
            style={{
              fontFamily: BASE_FONT,
              color: COLORS.primary,
              fontSize: 15,
              margin: "0 0 12px",
            }}
          >
            📖 Versión de la Biblia
          </h3>
          {versions.map((v) => (
            <div
              key={v.key}
              onClick={() => setVersion(v.key)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 12px",
                borderRadius: 10,
                marginBottom: 6,
                background:
                  version === v.key ? COLORS.accentLight : "transparent",
                border: `1px solid ${
                  version === v.key ? COLORS.primary : COLORS.border
                }`,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontFamily: UI_FONT,
                  fontSize: 14,
                  color: version === v.key ? COLORS.primary : COLORS.text,
                  fontWeight: version === v.key ? 600 : 400,
                }}
              >
                {v.label}
              </span>
              {version === v.key && (
                <span style={{ color: COLORS.primary, fontSize: 16 }}>✓</span>
              )}
            </div>
          ))}
        </div>

        {/* Recordatorio de oración */}
        <div
          style={{
            background: COLORS.bgCard,
            borderRadius: 16,
            padding: 16,
            marginBottom: 14,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <h3
            style={{
              fontFamily: BASE_FONT,
              color: COLORS.primary,
              fontSize: 15,
              margin: "0 0 12px",
            }}
          >
            🔔 Recordatorio de Oración
          </h3>
          {/* TODO: Integrar Web Push Notifications para recordatorios reales */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontFamily: UI_FONT,
                fontSize: 14,
                color: COLORS.text,
              }}
            >
              Activar recordatorios
            </span>
            <div
              onClick={() => setReminderEnabled(!reminderEnabled)}
              style={{
                width: 48,
                height: 26,
                borderRadius: 13,
                background: reminderEnabled ? COLORS.primary : COLORS.border,
                position: "relative",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  left: reminderEnabled ? 25 : 3,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: COLORS.white,
                  transition: "left 0.3s",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </div>
          {reminderEnabled && (
            <div>
              <label
                style={{
                  fontFamily: UI_FONT,
                  fontSize: 13,
                  color: COLORS.textSecondary,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Hora del recordatorio
              </label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                style={{
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontFamily: UI_FONT,
                  fontSize: 14,
                  color: COLORS.text,
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>
          )}
        </div>

        {/* Tamaño de fuente */}
        <div
          style={{
            background: COLORS.bgCard,
            borderRadius: 16,
            padding: 16,
            marginBottom: 14,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <h3
            style={{
              fontFamily: BASE_FONT,
              color: COLORS.primary,
              fontSize: 15,
              margin: "0 0 12px",
            }}
          >
            🔤 Tamaño de texto
          </h3>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { key: "small", label: "Pequeño" },
              { key: "medium", label: "Normal" },
              { key: "large", label: "Grande" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFontSize(f.key)}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: 10,
                  border: `1px solid ${
                    fontSize === f.key ? COLORS.primary : COLORS.border
                  }`,
                  background:
                    fontSize === f.key ? COLORS.accentLight : "transparent",
                  color:
                    fontSize === f.key ? COLORS.primary : COLORS.textSecondary,
                  fontFamily: UI_FONT,
                  fontSize: 13,
                  fontWeight: fontSize === f.key ? 700 : 400,
                  cursor: "pointer",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Acceso sin conexión */}
        <div
          style={{
            background: COLORS.bgCard,
            borderRadius: 16,
            padding: 16,
            marginBottom: 14,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <h3
            style={{
              fontFamily: BASE_FONT,
              color: COLORS.primary,
              fontSize: 15,
              margin: "0 0 6px",
            }}
          >
            📥 Lectura sin conexión
          </h3>
          <p
            style={{
              fontFamily: UI_FONT,
              fontSize: 13,
              color: COLORS.textSecondary,
              margin: "0 0 12px",
            }}
          >
            Los versículos y devocionales se guardan automáticamente para
            acceso sin internet.
          </p>
          {/* TODO: Implementar Service Worker y cache offline completo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: COLORS.success,
              fontFamily: UI_FONT,
              fontSize: 13,
            }}
          >
            <span>✅</span> Versículos del día guardados localmente
          </div>
        </div>

        {/* Acerca de */}
        <div
          style={{
            background: COLORS.accentLight,
            borderRadius: 16,
            padding: 16,
            border: `1px solid ${COLORS.border}`,
            textAlign: "center",
          }}
        >
          <FlowerDivider />
          <p
            style={{
              fontFamily: BASE_FONT,
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: 700,
              margin: "8px 0 4px",
            }}
          >
            Biblia para Mujeres
          </p>
          <p
            style={{
              fontFamily: UI_FONT,
              fontSize: 12,
              color: COLORS.textLight,
              margin: "0 0 10px",
            }}
          >
            Versión 1.0 · Hecha con 💗 para mujeres de fe
          </p>
          <p
            style={{
              fontFamily: BASE_FONT,
              fontSize: 13,
              fontStyle: "italic",
              color: COLORS.textSecondary,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            "Mujer que teme a Jehová, ésa será alabada." — Proverbios 31:30
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── NAVEGACIÓN INFERIOR ───────────────────────────────────────────────────────

const NAV_ITEMS = [
  { key: "home", icon: "🏠", label: "Inicio" },
  { key: "bible", icon: "📖", label: "Biblia" },
  { key: "devotionals", icon: "💗", label: "Devociones" },
  { key: "plans", icon: "📅", label: "Planes" },
  { key: "quiz", icon: "💡", label: "Quiz" },
  { key: "favorites", icon: "📚", label: "Biblioteca" },
  { key: "settings", icon: "⚙️", label: "Ajustes" },
];

// ─── APP PRINCIPAL ─────────────────────────────────────────────────────────────

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [favorites, setFavorites] = useLocalStorage("fav_verses", []);
  const [notes, setNotes] = useLocalStorage("verse_notes", {});

  const screens = {
    home: (
      <HomeScreen
        favorites={favorites}
        setFavorites={setFavorites}
        notes={notes}
        setNotes={setNotes}
      />
    ),
    bible: (
      <BibleScreen
        favorites={favorites}
        setFavorites={setFavorites}
        notes={notes}
        setNotes={setNotes}
      />
    ),
    devotionals: <DevotionalsScreen />,
    plans: <PlansScreen />,
    quiz: <QuizScreen />,
    favorites: (
      <FavoritesScreen
        favorites={favorites}
        setFavorites={setFavorites}
        notes={notes}
        setNotes={setNotes}
      />
    ),
    settings: <SettingsScreen />,
  };

  return (
    <div
      style={{
        maxWidth: 430,
        margin: "0 auto",
        minHeight: "100vh",
        background: COLORS.bg,
        position: "relative",
        fontFamily: UI_FONT,
        boxShadow: "0 0 40px rgba(0,0,0,0.12)",
      }}
    >
      {/* Contenido principal con scroll */}
      <div
        style={{
          paddingBottom: 72,
          minHeight: "calc(100vh - 72px)",
          overflowY: "auto",
        }}
      >
        {screens[activeScreen]}
      </div>

      {/* Barra de navegación inferior */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          background: COLORS.bgCard,
          borderTop: `1px solid ${COLORS.border}`,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "6px 0 8px",
          zIndex: 100,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveScreen(item.key)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "4px 6px",
              borderRadius: 10,
              transition: "all 0.2s",
              opacity: activeScreen === item.key ? 1 : 0.55,
            }}
          >
            <span
              style={{
                fontSize: activeScreen === item.key ? 22 : 20,
                transition: "font-size 0.2s",
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                fontSize: 9,
                fontFamily: UI_FONT,
                color:
                  activeScreen === item.key
                    ? COLORS.primary
                    : COLORS.textLight,
                fontWeight: activeScreen === item.key ? 700 : 400,
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </span>
            {activeScreen === item.key && (
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: COLORS.primary,
                  marginTop: 1,
                }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 10px; }
        input::placeholder { color: rgba(255,255,255,0.6); }
        textarea:focus { border-color: ${COLORS.primary} !important; }
      `}</style>
    </div>
  );
}