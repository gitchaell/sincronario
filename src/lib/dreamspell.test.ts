
import { getDreamspellDate } from './dreamspell';

// Simple test runner
function runTests() {
    let passed = 0;
    let failed = 0;

    function assert(condition: boolean, message: string) {
        if (condition) {
            console.log(`✅ PASS: ${message}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${message}`);
            failed++;
        }
    }

    console.log("Running Unit Tests for getDreamspellDate...");

    // 1. Anchor Date
    const anchor = getDreamspellDate(new Date(2013, 6, 26));
    assert(anchor.kin === 164, "Anchor date Kin is 164");
    assert(anchor.seal === "Semilla", "Anchor date Seal is Semilla");
    assert(anchor.tone === "Galáctico", "Anchor date Tone is Galáctico");

    // 2. Day Out of Time
    const doot = getDreamspellDate(new Date(2023, 6, 25));
    assert(doot.isDayOutOfTime === true, "July 25 is Day Out of Time");
    assert(doot.moon === "Fuera del Tiempo", "Moon is Fuera del Tiempo");
    // Kin continues counting
    // July 26 2022 was Red Self-Existing Moon (Kin 69).
    // July 25 2023 is Kin 69 + 364 = 433 -> 173.
    // Kin 173 = Red Self-Existing Skywalker?
    // Let's check: 69 + 364 = 433. 433 % 260 = 173.
    // 173 % 20 = 13 (Skywalker). 173 % 13 = 4 (Self-Existing).
    assert(doot.kin === 173, "Day Out of Time 2023 Kin is 173");

    // 3. Leap Day
    const leap = getDreamspellDate(new Date(2024, 1, 29));
    assert(leap.kin === 0, "Leap Day Kin is 0");
    assert(leap.seal === "Hunab Ku", "Leap Day Seal is Hunab Ku");

    // 4. Crossing Year Boundary
    // July 24, 2014 -> End of 2013-2014 year.
    // July 26, 2014 -> Start of 2014-2015 year.
    const endOfYear = getDreamspellDate(new Date(2014, 6, 24));
    const startOfNext = getDreamspellDate(new Date(2014, 6, 26));

    // End of Year (Moon 13, Day 28)
    assert(endOfYear.moonIndex === 13, "July 24 is Moon 13");
    assert(endOfYear.dayOfMoon === 28, "July 24 is Day 28");

    // Start of Next (Moon 1, Day 1)
    assert(startOfNext.moonIndex === 1, "July 26 is Moon 1");
    assert(startOfNext.dayOfMoon === 1, "July 26 is Day 1");

    console.log(`\nResults: ${passed} Passed, ${failed} Failed.`);
    if (failed > 0) process.exit(1);
}

runTests();
