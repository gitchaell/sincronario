
import { getDreamspellDate } from '../src/lib/dreamspell';

// Test Cases
const testCases = [
    {
        date: new Date(2013, 6, 26), // July 26, 2013
        expectedKin: 164, // Yellow Galactic Seed
        desc: "Anchor Date (July 26, 2013)"
    },
    {
        date: new Date(2014, 6, 26), // July 26, 2014
        expectedKin: 9, // Red Solar Moon (164 + 105 = 269 -> 9)
        desc: "One year later (July 26, 2014)"
    },
    {
        date: new Date(2024, 6, 26), // July 26, 2024 (After leap years 2016, 2020, 2024)
        // 11 years passed.
        // Kin adds 105 per year.
        // 11 * 105 = 1155.
        // 164 + 1155 = 1319.
        // 1319 % 260 = 19.
        expectedKin: 19, // Blue Rhythmic Storm
        desc: "Current Year Start (July 26, 2024)"
    },
    {
        date: new Date(2016, 1, 28), // Feb 28, 2016
        // 2016 is Leap. Feb 28 is normal.
        // July 26 2015 start.
        // 2015 Kin start:
        // 2013 -> 164
        // 2014 -> 9
        // 2015 -> (9+105)%260 = 114 (White Planetary Wizard).
        // Feb 28 is in Moon 8, Day 22.
        // Days elapsed: 217 (from July 26).
        // Kin = 114 + 217 = 331 -> 71.
        expectedKin: 71, // Blue Rhythmic Monkey
        desc: "Feb 28 of Leap Year (2016)"
    },
    {
        date: new Date(2016, 2, 1), // March 1, 2016
        // Leap day Feb 29 was skipped in Kin count.
        // So this should be Kin 72?
        // Let's verify.
        // Gregorian days elapsed: 217 + 2 = 219.
        // Leap days elapsed: 1 (Feb 29).
        // Kin days elapsed: 218.
        // Kin = 114 + 218 = 332 -> 72.
        expectedKin: 72, // Yellow Resonant Human
        desc: "March 1 of Leap Year (2016)"
    }
];

let failed = false;

console.log("Running Verification...");

testCases.forEach(tc => {
    const result = getDreamspellDate(tc.date);
    if (result.kin !== tc.expectedKin) {
        console.error(`FAILED: ${tc.desc}`);
        console.error(`  Date: ${tc.date.toDateString()}`);
        console.error(`  Expected Kin: ${tc.expectedKin}`);
        console.error(`  Got Kin: ${result.kin}`);
        console.error(`  Details: ${JSON.stringify(result, null, 2)}`);
        failed = true;
    } else {
        console.log(`PASS: ${tc.desc} (Kin ${result.kin} ${result.seal} ${result.tone})`);
    }
});

// Test Leap Day explicitly
const leapDay = new Date(2024, 1, 29);
const leapResult = getDreamspellDate(leapDay);
if (leapResult.kin === 0 && leapResult.seal === "Hunab Ku") {
    console.log("PASS: Leap Day (Feb 29, 2024) handled as Hunab Ku");
} else {
    console.error("FAILED: Leap Day (Feb 29, 2024)");
    console.error(`  Got: ${JSON.stringify(leapResult, null, 2)}`);
    failed = true;
}

// Test Day Out of Time
const doot = new Date(2024, 6, 25);
const dootResult = getDreamspellDate(doot);
if (dootResult.isDayOutOfTime && dootResult.moon === "Fuera del Tiempo") {
    console.log("PASS: Day Out of Time (July 25, 2024)");
} else {
    console.error("FAILED: Day Out of Time (July 25, 2024)");
    console.error(`  Got: ${JSON.stringify(dootResult, null, 2)}`);
    failed = true;
}

if (failed) process.exit(1);
console.log("All verifications passed.");
