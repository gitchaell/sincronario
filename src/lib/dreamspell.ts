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
}

// Reference Date: July 26, 2013 was Kin 164
const REF_DATE = new Date(2013, 6, 26); // Month is 0-indexed (6 = July)
const REF_KIN = 164;

export function getDreamspellDate(date: Date): DreamspellDate {
  // Normalize dates to midnight UTC to avoid timezone issues or just use local midnight?
  // Let's stick to local date components passed in, treating them as the day to calculate for.

  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // 1. Calculate 13 Moon Date (Moon, Day, Plasma)
  // New Year starts on July 26.
  let yearStart = new Date(targetDate.getFullYear(), 6, 26);
  if (targetDate < new Date(targetDate.getFullYear(), 6, 25)) {
    // If before July 25, we are in the previous "Dreamspell Year"
    yearStart = new Date(targetDate.getFullYear() - 1, 6, 26);
  } else if (targetDate.getTime() === new Date(targetDate.getFullYear(), 6, 25).getTime()) {
     // Day Out of Time
     // This needs special handling for Kin calculation? No, Kin counts normally (except leap days).
     // But for Moon/Day it is special.
  }

  // Check if Day Out of Time (July 25)
  const isDayOutOfTime = (targetDate.getMonth() === 6 && targetDate.getDate() === 25);

  let moonIndex = 0;
  let dayOfMoon = 0;
  let plasmaIndex = 0;

  if (isDayOutOfTime) {
    moonIndex = 0; // Special
    dayOfMoon = 0; // Special
    plasmaIndex = -1; // Special handling? usually it's still assigned a plasma?
    // Actually Day Out of Time is not part of any Moon or Week.
    // But it has a Kin.
  } else {
    // Days since Year Start (July 26)
    // We need to account for Feb 29 if it occurred between YearStart and TargetDate
    // But for the structure of Moons (28 days * 13), we ignore Gregorian irregularities?
    // The 13 Moon calendar is 13 * 28 = 364 days + 1 Day Out of Time = 365 days.
    // It aligns with Gregorian 365 days.
    // What happens on Leap Years (Gregorian)?
    // In Dreamspell, Feb 29 is "0.0 Hunab Ku". It is NOT counted in the Moon/Day count usually?
    // Wait, if Feb 29 is skipped in Kin count, is it skipped in Moon count?
    // Yes, usually.
    // So if today is Feb 29, it is "0.0 Hunab Ku".

    // Let's implement the logic:
    // If today is Feb 29, return special "Leap Day" object.
    const isLeapDay = (targetDate.getMonth() === 1 && targetDate.getDate() === 29);

    if (isLeapDay) {
        // Return a special object or just handle it
        // For now, let's treat it as a special moment
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
            isDayOutOfTime: false, // It is not the Day Out of Time (July 25), it is the Leap Day.
            color: "Green" // Hunab Ku color?
        };
    }

    // Calculate days elapsed since year start, SKIPPING Feb 29s.
    // Since yearStart is July 26, the only Feb 29 that could intervene is the one in the NEXT year (if target is after Feb)
    // or current year?
    // Example: Year Start July 26, 2023. Target March 1, 2024.
    // 2024 is leap. Feb 29 exists.
    // Days elapsed in Gregorian: July 26 to March 1.
    // If we skip Feb 29, then March 1 is 1 day "earlier" in the 13-moon count than the Gregorian count would suggest if we just subtracted timestamps?
    // Actually, simpler:
    // Just map the date to the permanent 13-moon structure.
    // July 26 = Moon 1, Day 1.
    // ...
    // Feb 28 = Moon 8, Day 22. (Always?)
    // Feb 29 = 0.0 Hunab Ku.
    // March 1 = Moon 9, Day 9. (Always?)
    // Let's check:
    // July (5), Aug(31), Sep(30), Oct(31), Nov(30), Dec(31), Jan(31), Feb(28) -> Total days from July 26 to Feb 28.
    // 5 + 31 + 30 + 31 + 30 + 31 + 31 + 28 = 217 days.
    // 217 / 28 = 7.75 -> 7 full moons. 217 % 28 = 21.
    // So Feb 28 is Moon 8, Day 21?
    // Wait.
    // July 26 (Day 1).
    // Days in Moons:
    // Moon 1: July 26 - Aug 22 (28 days)
    // Moon 2: Aug 23 - Sep 19
    // Moon 3: Sep 20 - Oct 17
    // Moon 4: Oct 18 - Nov 14
    // Moon 5: Nov 15 - Dec 12
    // Moon 6: Dec 13 - Jan 9
    // Moon 7: Jan 10 - Feb 6
    // Moon 8: Feb 7 - Mar 6 (This is where it gets tricky with Feb 28/29)

    // In a standard year (365 days):
    // Feb is 28 days.
    // Moon 8 covers Feb 7 to Mar 6.
    // Feb 28 is the 22nd day of Moon 8. (Feb 7 is Day 1. 28 - 7 + 1 = 22).
    // March 1 is the 23rd day of Moon 8.

    // In a Leap Year:
    // Feb 29 is inserted.
    // Dreamspell says: Feb 29 is skipped.
    // So March 1 should STILL be the 23rd day of Moon 8?
    // Yes. That maintains the perpetual calendar.
    // So for the purpose of finding Moon/Day, we should map the Month/Day directly to the Moon/Day, ignoring the year (except to identify Feb 29).

    const month = targetDate.getMonth(); // 0-11
    const day = targetDate.getDate(); // 1-31

    // Table of offsets (days before start of month in a 365 day year starting Jan 1)
    // Jan: 0
    // Feb: 31
    // Mar: 59 (Ignoring leap day)
    // Apr: 90
    // May: 120
    // Jun: 151
    // Jul: 181
    // Aug: 212
    // Sep: 243
    // Oct: 273
    // Nov: 304
    // Dec: 334

    const monthOffsets = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let dayOfYear = monthOffsets[month] + day; // 1-based day of year (1 = Jan 1)

    // Shift so July 26 is Day 1.
    // July 26 is day 181 + 26 = 207.
    // If dayOfYear >= 207 (July 26 onwards)
    //   dreamspellDay = dayOfYear - 206
    // If dayOfYear < 207
    //   dreamspellDay = dayOfYear + (365 - 206) = dayOfYear + 159

    let dreamspellDayOfYear = 0;
    if (dayOfYear >= 207) {
        dreamspellDayOfYear = dayOfYear - 206;
    } else {
        dreamspellDayOfYear = dayOfYear + 159;
    }

    // Now calculate Moon and Day
    // Moons 1-13
    // dreamspellDayOfYear 1..364 (Day out of Time is 365, handled separately?)

    // Wait, July 25 is Day Out of Time.
    // July 25 is day 181 + 25 = 206.
    // If dayOfYear == 206, it's Day Out of Time. (Handled above by isDayOutOfTime check).
    // But verify:
    // If I use the formula above for July 25 (day 206):
    // It would fall into "else" branch? No, 206 < 207.
    // dreamspellDay = 206 + 159 = 365.
    // So Day 365 is Day Out of Time. Correct.

    moonIndex = Math.ceil(dreamspellDayOfYear / 28);
    dayOfMoon = dreamspellDayOfYear % 28;
    if (dayOfMoon === 0) dayOfMoon = 28;

    // Plasma
    // Week 1: 1-7 (Dali..Silio)
    // Week 2: 8-14
    // Week 3: 15-21
    // Week 4: 22-28
    // So (dayOfMoon - 1) % 7
    plasmaIndex = (dayOfMoon - 1) % 7;
  }

  // 2. Calculate Kin
  // Count total days from Ref Date (July 26, 2013) to Target Date, SKIPPING Feb 29s.

  // Helper to count leap days between two dates
  function countLeapDays(d1: Date, d2: Date) {
      let count = 0;
      let start = new Date(d1);
      const end = new Date(d2);
      // Ensure start < end
      if (start > end) return 0; // Or handle reverse? Assume forward for now

      while (start < end) {
          // Check if start is Feb 29
          // Or simpler: Iterate years
          // Only years 2016, 2020, 2024 have Feb 29.
          // Check if Feb 29 of that year is between start and end.
          start.setDate(start.getDate() + 1);
          if (start.getMonth() === 1 && start.getDate() === 29) {
              count++;
          }
      }
      return count;
  }

  // Better approach:
  // Calculate raw difference in days.
  // Subtract number of leap days in that interval.

  const oneDay = 24 * 60 * 60 * 1000;
  const rawDiff = Math.round((targetDate.getTime() - REF_DATE.getTime()) / oneDay);

  // Count leap days between REF_DATE (July 26, 2013) and Target
  let leapDays = 0;
  // Years with leap days after July 26 2013:
  // 2016 (Feb 29)
  // 2020 (Feb 29)
  // 2024 (Feb 29)
  // 2028 ...

  const startYear = REF_DATE.getFullYear();
  const endYear = targetDate.getFullYear();

  for (let y = startYear; y <= endYear; y++) {
      const leapDay = new Date(y, 1, 29); // Feb 29
      if (leapDay.getMonth() === 1) { // It is a leap year
          if (leapDay > REF_DATE && leapDay < targetDate) {
              leapDays++;
          }
      }
  }

  const kinDaysElapsed = rawDiff - leapDays;
  const kin = ((REF_KIN - 1 + kinDaysElapsed) % 260) + 1;
  // Handle negative modulo if target is before Ref? We assume forward or use utility
  // ((x % n) + n) % n

  const normalizedKin = ((kin - 1) % 260) + 1;

  const sealIndex = ((normalizedKin - 1) % 20); // 0-19
  const toneIndex = ((normalizedKin - 1) % 13); // 0-12
  const seal = KIN_NAMES[sealIndex];
  const tone = TONE_NAMES[toneIndex];
  const color = SEAL_COLORS[sealIndex % 4];

  // Moon Name
  let moonName = "";
  if (isDayOutOfTime) {
      moonName = "Fuera del Tiempo";
  } else {
      moonName = MOON_NAMES[moonIndex - 1];
  }

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
    color
  };
}
