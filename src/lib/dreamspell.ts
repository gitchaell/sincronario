export const KIN_NAMES = [
  "Dragón", "Viento", "Noche", "Semilla", "Serpiente",
  "Enlazador de Mundos", "Mano", "Estrella", "Luna", "Perro",
  "Mono", "Humano", "Caminante del Cielo", "Mago", "Águila",
  "Guerrero", "Tierra", "Espejo", "Tormenta", "Sol"
];

export const TONE_NAMES = [
  "Magnético", "Lunar", "Eléctrico", "Auto-existente", "Entonado",
  "Rítmico", "Resonante", "Galáctico", "Solar", "Planetario",
  "Espectral", "Cristal", "Cósmico"
];

export const MOON_NAMES = [
  "Magnética", "Lunar", "Eléctrica", "Auto-existente", "Entonada",
  "Rítmica", "Resonante", "Galáctica", "Solar", "Planetaria",
  "Espectral", "Cristal", "Cósmica"
];

export const PLASMA_NAMES = [
  "Dali", "Seli", "Gamma", "Kali", "Alpha", "Limi", "Silio"
];

export const SEAL_COLORS = [
  "Red", "White", "Blue", "Yellow"
];

export const MOON_QUESTIONS = [
  "¿Cuál es mi propósito?", // Magnética
  "¿Cuáles son los obstáculos?", // Lunar
  "¿Cómo puedo servir mejor?", // Eléctrica
  "¿Cuál es la forma de la acción?", // Auto-existente
  "¿Cómo tomo el mando?", // Entonada
  "¿Cómo organizo mis recursos?", // Rítmica
  "¿Cómo me sintonizo?", // Resonante
  "¿Vivo lo que creo?", // Galáctica
  "¿Cómo logro mi propósito?", // Solar
  "¿Cómo perfecciono lo que hago?", // Planetaria
  "¿Cómo libero y suelto?", // Espectral
  "¿Cómo me dedico a todo lo que vive?", // Cristal
  "¿Cómo trasciendo?" // Cósmica
];

export const MOON_TOTEMS = [
  "Murciélago", "Escorpión", "Venado", "Búho", "Pavo Real",
  "Lagarto", "Mono", "Halcón", "Jaguar", "Perro",
  "Serpiente", "Conejo", "Tortuga"
];

export const PLASMA_AFFIRMATIONS = [
  "Dali: Da en el blanco. Chakra Corona.",
  "Seli: Fluye. Chakra Raíz.",
  "Gamma: Pacifica. Chakra Tercer Ojo.",
  "Kali: Cataliza. Chakra Sacro.",
  "Alpha: Libera. Chakra Garganta.",
  "Limi: Purifica. Plexo Solar.",
  "Silio: Descarga. Chakra Corazón."
];

export interface DreamspellDate {
  gregorianDate: Date;
  kin: number;
  seal: string;
  sealIndex: number; // 1-20
  tone: string;
  toneIndex: number; // 1-13
  moon: string;
  moonIndex: number; // 1-13
  dayOfMoon: number; // 1-28
  plasma: string;
  isDayOutOfTime: boolean;
  color: string;
  moonQuestion: string;
  moonTotem: string;
  plasmaAffirmation: string;
}

// Reference Date: July 26, 2013 was Kin 164
const REF_DATE = new Date(2013, 6, 26); // Month is 0-indexed (6 = July)
const REF_KIN = 164;

export function getDreamspellDate(date: Date): DreamspellDate {
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // 1. Calculate 13 Moon Date
  let yearStart = new Date(targetDate.getFullYear(), 6, 26);
  if (targetDate < new Date(targetDate.getFullYear(), 6, 25)) {
    yearStart = new Date(targetDate.getFullYear() - 1, 6, 26);
  }

  const isDayOutOfTime = (targetDate.getMonth() === 6 && targetDate.getDate() === 25);

  let moonIndex = 0;
  let dayOfMoon = 0;
  let plasmaIndex = 0;

  if (isDayOutOfTime) {
    moonIndex = 0;
    dayOfMoon = 0;
    plasmaIndex = -1;
  } else {
    // Check Leap Day
    const isLeapDay = (targetDate.getMonth() === 1 && targetDate.getDate() === 29);

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

  // 2. Calculate Kin
  const oneDay = 24 * 60 * 60 * 1000;
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
  const kin = ((REF_KIN - 1 + kinDaysElapsed) % 260) + 1;
  const normalizedKin = ((kin - 1) % 260) + 1;

  const sealIndex = ((normalizedKin - 1) % 20);
  const toneIndex = ((normalizedKin - 1) % 13);
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
