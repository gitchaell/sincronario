import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, l as renderScript, n as renderHead } from '../chunks/astro/server_BSgAke_f.mjs';
import 'piccolore';
/* empty css                                 */
import 'clsx';
export { renderers } from '../renderers.mjs';

const KIN_NAMES = [
  "Dragón",
  "Viento",
  "Noche",
  "Semilla",
  "Serpiente",
  "Enlazador de Mundos",
  "Mano",
  "Estrella",
  "Luna",
  "Perro",
  "Mono",
  "Humano",
  "Caminante del Cielo",
  "Mago",
  "Águila",
  "Guerrero",
  "Tierra",
  "Espejo",
  "Tormenta",
  "Sol"
];
const TONE_NAMES = [
  "Magnético",
  "Lunar",
  "Eléctrico",
  "Auto-existente",
  "Entonado",
  "Rítmico",
  "Resonante",
  "Galáctico",
  "Solar",
  "Planetario",
  "Espectral",
  "Cristal",
  "Cósmico"
];
const MOON_NAMES = [
  "Magnética",
  "Lunar",
  "Eléctrica",
  "Auto-existente",
  "Entonada",
  "Rítmica",
  "Resonante",
  "Galáctica",
  "Solar",
  "Planetaria",
  "Espectral",
  "Cristal",
  "Cósmica"
];
const PLASMA_NAMES = [
  "Dali",
  "Seli",
  "Gamma",
  "Kali",
  "Alpha",
  "Limi",
  "Silio"
];
const SEAL_COLORS = [
  "Red",
  "White",
  "Blue",
  "Yellow"
];
const MOON_QUESTIONS = [
  "¿Cuál es mi propósito?",
  // Magnética
  "¿Cuáles son los obstáculos?",
  // Lunar
  "¿Cómo puedo servir mejor?",
  // Eléctrica
  "¿Cuál es la forma de la acción?",
  // Auto-existente
  "¿Cómo tomo el mando?",
  // Entonada
  "¿Cómo organizo mis recursos?",
  // Rítmica
  "¿Cómo me sintonizo?",
  // Resonante
  "¿Vivo lo que creo?",
  // Galáctica
  "¿Cómo logro mi propósito?",
  // Solar
  "¿Cómo perfecciono lo que hago?",
  // Planetaria
  "¿Cómo libero y suelto?",
  // Espectral
  "¿Cómo me dedico a todo lo que vive?",
  // Cristal
  "¿Cómo trasciendo?"
  // Cósmica
];
const MOON_TOTEMS = [
  "Murciélago",
  "Escorpión",
  "Venado",
  "Búho",
  "Pavo Real",
  "Lagarto",
  "Mono",
  "Halcón",
  "Jaguar",
  "Perro",
  "Serpiente",
  "Conejo",
  "Tortuga"
];
const PLASMA_AFFIRMATIONS = [
  "Dali: Da en el blanco. Chakra Corona.",
  "Seli: Fluye. Chakra Raíz.",
  "Gamma: Pacifica. Chakra Tercer Ojo.",
  "Kali: Cataliza. Chakra Sacro.",
  "Alpha: Libera. Chakra Garganta.",
  "Limi: Purifica. Plexo Solar.",
  "Silio: Descarga. Chakra Corazón."
];
const REF_DATE = new Date(2013, 6, 26);
const REF_KIN = 164;
function getDreamspellDate(date) {
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  new Date(targetDate.getFullYear(), 6, 26);
  if (targetDate < new Date(targetDate.getFullYear(), 6, 25)) {
    new Date(targetDate.getFullYear() - 1, 6, 26);
  }
  const isDayOutOfTime = targetDate.getMonth() === 6 && targetDate.getDate() === 25;
  let moonIndex = 0;
  let dayOfMoon = 0;
  let plasmaIndex = 0;
  if (isDayOutOfTime) {
    moonIndex = 0;
    dayOfMoon = 0;
    plasmaIndex = -1;
  } else {
    const isLeapDay = targetDate.getMonth() === 1 && targetDate.getDate() === 29;
    if (isLeapDay) {
      return {
        gregorianDate: targetDate,
        kin: 0,
        seal: "Hunab Ku",
        sealIndex: 0,
        tone: "",
        toneIndex: 0,
        moon: "Hunab Ku",
        moonIndex: 0,
        dayOfMoon: 0,
        plasma: "",
        isDayOutOfTime: false,
        color: "Green",
        moonQuestion: "",
        moonTotem: "",
        plasmaAffirmation: ""
      };
    }
    const month = targetDate.getMonth();
    const day = targetDate.getDate();
    const monthOffsets = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let dayOfYear = monthOffsets[month] + day;
    let dreamspellDayOfYear = 0;
    if (dayOfYear >= 207) {
      dreamspellDayOfYear = dayOfYear - 206;
    } else {
      dreamspellDayOfYear = dayOfYear + 159;
    }
    moonIndex = Math.ceil(dreamspellDayOfYear / 28);
    dayOfMoon = dreamspellDayOfYear % 28;
    if (dayOfMoon === 0) dayOfMoon = 28;
    plasmaIndex = (dayOfMoon - 1) % 7;
  }
  const oneDay = 24 * 60 * 60 * 1e3;
  const rawDiff = Math.round((targetDate.getTime() - REF_DATE.getTime()) / oneDay);
  let leapDays = 0;
  const startYear = REF_DATE.getFullYear();
  const endYear = targetDate.getFullYear();
  for (let y = startYear; y <= endYear; y++) {
    const leapDay = new Date(y, 1, 29);
    if (leapDay.getMonth() === 1) {
      if (leapDay > REF_DATE && leapDay < targetDate) {
        leapDays++;
      }
    }
  }
  const kinDaysElapsed = rawDiff - leapDays;
  const kin = (REF_KIN - 1 + kinDaysElapsed) % 260 + 1;
  const normalizedKin = (kin - 1) % 260 + 1;
  const sealIndex = (normalizedKin - 1) % 20;
  const toneIndex = (normalizedKin - 1) % 13;
  const seal = KIN_NAMES[sealIndex];
  const tone = TONE_NAMES[toneIndex];
  const color = SEAL_COLORS[sealIndex % 4];
  let moonName = "";
  if (isDayOutOfTime) {
    moonName = "Fuera del Tiempo";
  } else {
    moonName = MOON_NAMES[moonIndex - 1];
  }
  const moonQuestion = isDayOutOfTime ? "" : MOON_QUESTIONS[moonIndex - 1];
  const moonTotem = isDayOutOfTime ? "" : MOON_TOTEMS[moonIndex - 1];
  const plasmaAffirmation = isDayOutOfTime ? "Día para celebrar el Tiempo es Arte." : PLASMA_NAMES[plasmaIndex] + ": " + PLASMA_AFFIRMATIONS[plasmaIndex].split(": ")[1];
  return {
    gregorianDate: targetDate,
    kin: normalizedKin,
    seal,
    sealIndex: sealIndex + 1,
    tone,
    toneIndex: toneIndex + 1,
    moon: moonName,
    moonIndex,
    dayOfMoon,
    plasma: isDayOutOfTime ? "Fuera del Tiempo" : PLASMA_NAMES[plasmaIndex],
    isDayOutOfTime,
    color,
    moonQuestion,
    moonTotem,
    plasmaAffirmation
  };
}

const $$Astro$2 = createAstro();
const $$MayanTone = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MayanTone;
  const { value } = Astro2.props;
  const numBars = Math.floor(value / 5);
  const numDots = value % 5;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col items-center gap-1 ${Astro2.props.className || ""}`, "class")}${addAttribute(`Tono ${value}`, "title")}> <!-- Dots Row --> ${numDots > 0 && renderTemplate`<div class="flex gap-2 mb-1"> ${Array.from({ length: numDots }).map(() => renderTemplate`<div class="w-4 h-4 rounded-full bg-current"></div>`)} </div>`} <!-- Bars Stack --> ${numBars > 0 && renderTemplate`<div class="flex flex-col gap-1"> ${Array.from({ length: numBars }).map(() => renderTemplate`<div class="w-20 h-2 bg-current rounded-full"></div>`)} </div>`} </div>`;
}, "/app/src/components/MayanTone.astro", void 0);

const $$Astro$1 = createAstro();
const $$Index$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "/app/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/app/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const today = /* @__PURE__ */ new Date();
  const dreamspell = getDreamspellDate(today);
  const colorClasses = {
    Red: "text-red-700 border-red-500 bg-red-50",
    White: "text-stone-600 border-stone-400 bg-stone-50",
    Blue: "text-blue-700 border-blue-500 bg-blue-50",
    Yellow: "text-yellow-600 border-yellow-500 bg-yellow-50",
    Green: "text-green-700 border-green-500 bg-green-50"
  };
  const borderColor = colorClasses[dreamspell.color] || "text-gray-800";
  const sealDescriptions = {
    "Drag\xF3n": "Nutre el nacimiento, el ser y la existencia.",
    "Viento": "Comunica el esp\xEDritu y el aliento.",
    "Noche": "Sue\xF1a la abundancia y la intuici\xF3n.",
    "Semilla": "Atina el florecimiento y la consciencia.",
    "Serpiente": "Sobrevive la fuerza vital y el instinto.",
    "Enlazador de Mundos": "Iguala la muerte y la oportunidad.",
    "Mano": "Conoce la realizaci\xF3n y la curaci\xF3n.",
    "Estrella": "Embellece el arte y la elegancia.",
    "Luna": "Purifica el agua universal y el flujo.",
    "Perro": "Ama el coraz\xF3n y la lealtad.",
    "Mono": "Juega la magia y la ilusi\xF3n.",
    "Humano": "Influencia la libre voluntad y la sabidur\xEDa.",
    "Caminante del Cielo": "Explora el espacio y la vigilancia.",
    "Mago": "Encanta la atemporalidad y la receptividad.",
    "\xC1guila": "Crea la visi\xF3n y la mente.",
    "Guerrero": "Cuestiona la inteligencia y la intrepidez.",
    "Tierra": "Evoluciona la navegaci\xF3n y la sincron\xEDa.",
    "Espejo": "Refleja el sinf\xEDn y el orden.",
    "Tormenta": "Cataliza la energ\xEDa y la autogeneraci\xF3n.",
    "Sol": "Ilumina el fuego universal y la vida."
  };
  const toneDescriptions = {
    "Magn\xE9tico": "Unifica el prop\xF3sito. \xBFCu\xE1l es mi meta?",
    "Lunar": "Polariza el desaf\xEDo. \xBFCu\xE1les son los obst\xE1culos?",
    "El\xE9ctrico": "Activa el servicio. \xBFC\xF3mo puedo servir mejor?",
    "Auto-existente": "Define la forma. \xBFCu\xE1l es la forma de la acci\xF3n?",
    "Entonado": "Confiere poder. \xBFC\xF3mo tomo el mando?",
    "R\xEDtmico": "Organiza la igualdad. \xBFC\xF3mo organizo mis recursos?",
    "Resonante": "Canaliza la sintonizaci\xF3n. \xBFC\xF3mo me sintonizo?",
    "Gal\xE1ctico": "Armoniza la integridad. \xBFVivo lo que creo?",
    "Solar": "Pulsa la intenci\xF3n. \xBFC\xF3mo logro mi prop\xF3sito?",
    "Planetario": "Perfecciona la manifestaci\xF3n. \xBFC\xF3mo perfecciono lo que hago?",
    "Espectral": "Divulga la liberaci\xF3n. \xBFC\xF3mo libero y suelto?",
    "Cristal": "Dedica la cooperaci\xF3n. \xBFC\xF3mo me dedico a todo lo que vive?",
    "C\xF3smico": "Perdura la presencia. \xBFC\xF3mo trasciendo?"
  };
  const sealDesc = sealDescriptions[dreamspell.seal] || "";
  const toneDesc = toneDescriptions[dreamspell.tone] || "";
  function buildAffirmation() {
    const actionTone = toneDesc.split(".")[0];
    const actionSeal = sealDesc.split(".")[0];
    return `Yo ${actionTone.toLowerCase()} para ${actionSeal.toLowerCase()}.`;
  }
  const affirmation = buildAffirmation();
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Sincronario 13 Lunas</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="description" content="Sincronario de 13 Lunas. Descubre tu Kin y la energía del día."><meta name="theme-color" content="#ffffff">${renderHead()}</head> <body class="bg-stone-100 text-stone-800 font-sans min-h-screen flex flex-col items-center p-4 md:p-8"> ${renderComponent($$result, "Analytics", $$Index$1, {})} <main class="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden mt-4 md:mt-8"> <!-- Header / Gregorian Date --> <header class="bg-stone-900 text-stone-100 p-6 text-center"> <h1 class="text-xs md:text-sm uppercase tracking-[0.2em] mb-2 opacity-75">Calendario Gregoriano</h1> <p class="text-2xl md:text-4xl font-light capitalize"> ${today.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} </p> </header> <!-- Main Content --> <div class="p-6 md:p-10"> <!-- Date Info --> <div class="text-center mb-8 md:mb-12"> <h2 class="text-lg md:text-xl font-bold text-stone-500 uppercase tracking-wide mb-4">Energía del Día</h2> ${dreamspell.isDayOutOfTime ? renderTemplate`<div class="p-4 bg-green-100 text-green-800 rounded-lg"> <div class="text-2xl md:text-3xl font-bold mb-2">¡Día Fuera del Tiempo!</div> <p>Un día para el perdón, la celebración y el arte. "El Tiempo es Arte".</p> </div>` : dreamspell.seal === "Hunab Ku" ? renderTemplate`<div class="text-2xl font-bold text-green-600">0.0 Hunab Ku (Día Bisiesto)</div>` : renderTemplate`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left sm:text-center max-w-lg mx-auto"> <div class="bg-stone-50 p-4 rounded-lg"> <span class="block text-xs uppercase text-stone-400 font-bold">Luna ${dreamspell.moonIndex}</span> <span class="text-lg md:text-xl font-medium text-stone-700">${dreamspell.moon}</span> <p class="text-xs text-stone-500 mt-1 italic">"${dreamspell.moonQuestion}"</p> <p class="text-xs text-stone-400 mt-1">Totem: ${dreamspell.moonTotem}</p> </div> <div class="bg-stone-50 p-4 rounded-lg"> <span class="block text-xs uppercase text-stone-400 font-bold">Día ${dreamspell.dayOfMoon}</span> <span class="text-lg md:text-xl font-medium text-stone-700">Plasma ${dreamspell.plasma}</span> <p class="text-xs text-stone-500 mt-1 italic">${dreamspell.plasmaAffirmation.split(": ")[1]}</p> </div> </div>`} </div> <hr class="border-stone-100 my-8"> <!-- Kin Info --> ${dreamspell.seal === "Hunab Ku" ? renderTemplate`<div class="text-center p-8 bg-green-50 rounded-lg border border-green-200"> <p>Hoy es un día para sintonizar con la fuente pura. Sin Kin, sin tiempo.</p> </div>` : renderTemplate`<div${addAttribute(`relative border-4 rounded-xl p-6 md:p-10 text-center ${borderColor} bg-opacity-5 transition-all hover:shadow-md`, "class")}> <div class="absolute top-4 right-4 opacity-20"> <!-- Maybe a subtle background icon here later --> </div> <h3 class="text-sm uppercase tracking-widest mb-4 opacity-75 font-semibold">Kin ${dreamspell.kin}</h3> <div class="flex flex-col items-center justify-center mb-6"> <div class="mb-4 text-current opacity-80 scale-125"> ${renderComponent($$result, "MayanTone", $$MayanTone, { "value": dreamspell.toneIndex })} </div> <h2 class="text-3xl md:text-5xl font-bold mb-2 leading-tight"> ${dreamspell.seal} ${dreamspell.tone} </h2> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 text-left"> <div class="bg-white bg-opacity-50 p-4 rounded-lg"> <h4 class="font-bold text-lg mb-2 flex items-center gap-2"> <span class="w-2 h-2 rounded-full bg-current opacity-50"></span>
Sello Solar
</h4> <p class="text-sm md:text-base opacity-90 leading-relaxed">${sealDesc}</p> </div> <div class="bg-white bg-opacity-50 p-4 rounded-lg"> <h4 class="font-bold text-lg mb-2 flex items-center gap-2"> <span class="w-2 h-2 rounded-full bg-current opacity-50"></span>
Tono Galáctico
</h4> <p class="text-sm md:text-base opacity-90 leading-relaxed">${toneDesc}</p> </div> </div> <div class="mt-8 pt-8 border-t border-current border-opacity-20 text-center"> <p class="font-serif italic text-lg md:text-xl opacity-90">
"${affirmation}"
</p> </div> </div>`} </div> <!-- Explanation Section --> <div class="bg-stone-50 p-6 md:p-10 border-t border-stone-200"> <h3 class="font-bold text-xl mb-4 text-stone-700">¿Qué hace especial este día?</h3> <div class="prose prose-stone text-stone-600 space-y-4 text-sm md:text-base max-w-none"> ${!dreamspell.isDayOutOfTime && dreamspell.seal !== "Hunab Ku" && renderTemplate`<p>
La energía del <strong>${dreamspell.seal}</strong> nos invita a <em>${sealDesc.split(".")[0].toLowerCase()}</em>,
                        mientras que el tono <strong>${dreamspell.tone}</strong> nos pregunta: <em>"${dreamspell.moonQuestion}"</em>
(o más específicamente: <em>${toneDesc.split("?")[1] || toneDesc}</em>).
</p>`} <p>
El <strong>Plasma ${dreamspell.plasma}</strong> activa un centro de energía específico en el cuerpo.
                    Hoy estamos en la <strong>Luna ${dreamspell.moon}</strong>, que trabaja con el poder del animal <strong>${dreamspell.moonTotem}</strong>.
</p> <div class="mt-6 pt-6 border-t border-stone-200"> <details class="group"> <summary class="cursor-pointer font-semibold text-stone-700 list-none flex items-center gap-2"> <span class="transition-transform group-open:rotate-90">▶</span> <span>Detalles Técnicos (Para entendidos)</span> </summary> <div class="mt-4 pl-6 border-l-2 border-stone-300"> <ul class="list-disc pl-4 space-y-1"> <li><strong>Fecha Gregoriana:</strong> ${today.toISOString().split("T")[0]}</li> <li><strong>Kin Destino:</strong> ${dreamspell.kin}</li> <li><strong>Luna:</strong> ${dreamspell.moonIndex} (${dreamspell.moon})</li> <li><strong>Día de la Luna:</strong> ${dreamspell.dayOfMoon} / 28</li> <li><strong>Plasma Radial:</strong> ${dreamspell.plasma}</li> <li><strong>Castillo, Onda Encantada:</strong> (Cálculo pendiente)</li> </ul> </div> </details> </div> </div> </div> </main> <footer class="mt-12 mb-8 text-stone-400 text-sm text-center"> <p>Sincronario de 13 Lunas</p> <p class="text-xs mt-2 opacity-50">Hecho con Astro y la Ley del Tiempo</p> </footer> </body></html>`;
}, "/app/src/pages/index.astro", void 0);

const $$file = "/app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
