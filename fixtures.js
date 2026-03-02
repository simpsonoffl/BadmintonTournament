// data/fixtures.js
// MASTER TOURNAMENT FIXTURES

const FIXTURES = [
  /* =========================
   9:00 AM
========================= */
{ time:"9:00 AM", teamA:"Storm Breakers", teamB:"Smash Masters", category:"MD", stage:"League" },
{ time:"9:00 AM", teamA:"Shuttle Smashers", teamB:"Blue Stars", category:"MD", stage:"League" },
{ time:"9:00 AM", teamA:"Shuttle Smashers", teamB:"Chennai CITI Gangsters", category:"WD", stage:"League" },

/* =========================
   9:15 AM
========================= */
{ time:"9:15 AM", teamA:"Storm Breakers", teamB:"Shuttle Smashers", category:"XD", stage:"League" },
{ time:"9:15 AM", teamA:"Blue Stars", teamB:"Smash Masters", category:"MD", stage:"League" },
{ time:"9:15 AM", teamA:"Smash Masters", teamB:"Chennai CITI Gangsters", category:"XD", stage:"League" },

/* =========================
   9:30 AM
========================= */
{ time:"9:30 AM", teamA:"Storm Breakers", teamB:"Chennai CITI Gangsters", category:"MD", stage:"League" },
{ time:"9:30 AM", teamA:"Shuttle Smashers", teamB:"Chennai CITI Gangsters", category:"XD", stage:"League" },
{ time:"9:30 AM", teamA:"Blue Stars", teamB:"Smash Masters", category:"WD", stage:"League" },

/* =========================
   9:45 AM
========================= */
{ time:"9:45 AM", teamA:"Storm Breakers", teamB:"Blue Stars", category:"MD", stage:"League" },
{ time:"9:45 AM", teamA:"Storm Breakers", teamB:"Blue Stars", category:"XD", stage:"League" },
{ time:"9:45 AM", teamA:"Shuttle Smashers", teamB:"Chennai CITI Gangsters", category:"MD", stage:"League" },

/* =========================
   10:00 AM
========================= */
{ time:"10:00 AM", teamA:"Storm Breakers", teamB:"Chennai CITI Gangsters", category:"WD", stage:"League" },
{ time:"10:00 AM", teamA:"Smash Masters", teamB:"Shuttle Smashers", category:"MD", stage:"League" },
{ time:"10:00 AM", teamA:"Smash Masters", teamB:"Shuttle Smashers", category:"XD", stage:"League" },

/* =========================
   10:15 AM
========================= */
{ time:"10:15 AM", teamA:"Blue Stars", teamB:"Chennai CITI Gangsters", category:"XD", stage:"League" },
{ time:"10:15 AM", teamA:"Storm Breakers", teamB:"Smash Masters", category:"XD", stage:"League" },
{ time:"10:15 AM", teamA:"Shuttle Smashers", teamB:"Blue Stars", category:"WD", stage:"League" },

/* =========================
   10:30 AM
========================= */
{ time:"10:30 AM", teamA:"Smash Masters", teamB:"Chennai CITI Gangsters", category:"MD", stage:"League" },
{ time:"10:30 AM", teamA:"Storm Breakers", teamB:"Smash Masters", category:"WD", stage:"League" },
{ time:"10:30 AM", teamA:"Shuttle Smashers", teamB:"Blue Stars", category:"XD", stage:"League" },

/* =========================
   10:45 AM
========================= */
{ time:"10:45 AM", teamA:"Storm Breakers", teamB:"Shuttle Smashers", category:"MD", stage:"League" },
{ time:"10:45 AM", teamA:"Storm Breakers", teamB:"Chennai CITI Gangsters", category:"XD", stage:"League" },
{ time:"10:45 AM", teamA:"Blue Stars", teamB:"Smash Masters", category:"XD", stage:"League" },

/* =========================
   11:00 AM
========================= */
{ time:"11:00 AM", teamA:"Storm Breakers", teamB:"Shuttle Smashers", category:"XD", stage:"League" },
{ time:"11:00 AM", teamA:"Blue Stars", teamB:"Chennai CITI Gangsters", category:"MD", stage:"League" },
{ time:"11:00 AM", teamA:"Smash Masters", teamB:"Chennai CITI Gangsters", category:"WD", stage:"League" },

/* =========================
   11:15 AM
========================= */
{ time:"11:15 AM", teamA:"Storm Breakers", teamB:"Chennai CITI Gangsters", category:"MD", stage:"League" },
{ time:"11:15 AM", teamA:"Smash Masters", teamB:"Shuttle Smashers", category:"MD", stage:"League" },
{ time:"11:15 AM", teamA:"Shuttle Smashers", teamB:"Storm Breakers", category:"WD", stage:"League" },

/* =========================
   11:30 AM
========================= */
{ time:"11:30 AM", teamA:"Smash Masters", teamB:"Chennai CITI Gangsters", category:"XD", stage:"League" },
{ time:"11:30 AM", teamA:"Shuttle Smashers", teamB:"Blue Stars", category:"MD", stage:"League" },
{ time:"11:30 AM", teamA:"Blue Stars", teamB:"Chennai CITI Gangsters", category:"WD", stage:"League" },

/* =========================
   11:45 AM
========================= */
{ time:"11:45 AM", teamA:"Blue Stars", teamB:"Chennai CITI Gangsters", category:"MD", stage:"League" },
{ time:"11:45 AM", teamA:"Blue Stars", teamB:"Storm Breakers", category:"XD", stage:"League" }, // ✅ FIXED
{ time:"11:45 AM", teamA:"Smash Masters", teamB:"Shuttle Smashers", category:"XD", stage:"League" },

/* =========================
   12:00 PM
========================= */
{ time:"12:00 PM", teamA:"Storm Breakers", teamB:"Smash Masters", category:"MD", stage:"League" },
{ time:"12:00 PM", teamA:"Storm Breakers", teamB:"Blue Stars", category:"WD", stage:"League" },
{ time:"12:00 PM", teamA:"Smash Masters", teamB:"Shuttle Smashers", category:"WD", stage:"League" },

/* =========================
   12:15 PM
========================= */
{ time:"12:15 PM", teamA:"Storm Breakers", teamB:"Smash Masters", category:"XD", stage:"League" },
{ time:"12:15 PM", teamA:"Shuttle Smashers", teamB:"Chennai CITI Gangsters", category:"MD", stage:"League" },
{ time:"12:15 PM", teamA:"Blue Stars", teamB:"Chennai CITI Gangsters", category:"XD", stage:"League" },

/* =========================
   12:30 PM
========================= */
{ time:"12:30 PM", teamA:"Storm Breakers", teamB:"Chennai CITI Gangsters", category:"MD", stage:"League" },
{ time:"12:30 PM", teamA:"Blue Stars", teamB:"Smash Masters", category:"MD", stage:"League" },
{ time:"12:30 PM", teamA:"Blue Stars", teamB:"Shuttle Smashers", category:"XD", stage:"League" },

/* =========================
   12:45 PM
========================= */
{ time:"12:45 PM", teamA:"Storm Breakers", teamB:"Shuttle Smashers", category:"MD", stage:"League" },
{ time:"12:45 PM", teamA:"Shuttle Smashers", teamB:"Chennai CITI Gangsters", category:"XD", stage:"League" },
{ time:"12:45 PM", teamA:"Blue Stars", teamB:"Smash Masters", category:"XD", stage:"League" },

/* =========================
   1:00 PM
========================= */
{ time:"1:00 PM", teamA:"Storm Breakers", teamB:"Blue Stars", category:"MD", stage:"League" },
{ time:"1:00 PM", teamA:"Smash Masters", teamB:"Chennai CITI Gangsters", category:"MD", stage:"League" },

/* =========================
   KNOCKOUTS
========================= */
{ time:"1:30 PM", teamA:"TBD", teamB:"TBD", category:"MD", stage:"Knockout" },
{ time:"2:30 PM", teamA:"TBD", teamB:"TBD", category:"MD", stage:"Knockout" },
{ time:"3:30 PM", teamA:"TBD", teamB:"TBD", category:"MD", stage:"Knockout" }

];