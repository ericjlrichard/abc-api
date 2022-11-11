module.exports = [
  {
    name: "Just Do It",
    description: "Complete your first workout",
    tiers_array: "",
    variable: "workouts"
  },
  {
    name: "Southpaws Kingdom",
    description: "Complete %next-tier% workouts (20 minutes or more) as a southpaw",
    tiers_array: "2,10,50,100",
    variable: "southpaw_workouts"
  },
  {
    name: "Church of the Righteous",
    description: "Complete %next-tier% workouts (20 minutes or more) as an orthodox",
    tiers_array: "2,10,50,100",
    variable: "orthodox_workouts"
  },
  {
    name: "Switch Master",
    description: "Complete %next-tier% workouts in both orthodox and southpaw",
    tiers_array: "2,10,30,60",
    variable: "southpaw_workouts,orthodox_workouts"
  },
  {
    name: "Beast Mode",
    description: "Complete %next-tier% minutes of workout",
    tiers_array: "80,200,500,1000",
    variable: "workout_minutes"
  },
  {
    name: "Intro to the sweet science",
    description: "Complete %next-tier% workouts with entirely signature combos (no random, no classic)",
    tiers_array: "2,5,20,100",
    variable: "signature_workouts"
  },
  {
    name: "Is This Randy?",
    description: "Complete %next-tier% rounds of completely random combos",
    tiers_array: "5,25,50,100",
    variable: "random_rounds"
  },
  {
    name: "Classic FM",
    description: "Complete %next-tier% rounds comprised of entirely classic combos",
    tiers_array: "5,25,50,100",
    variable: "classic_rounds"
  }
  // { These are too complex to implement for me now.
  //   name: "Super Sayan",
  //   description: "Workout %next-tier% days in a row",
  //   tiers_array: "7,28,100,365",
  //   variable: "workouts_dates"
  // },
  // {
  //   name: "Pressure Fighter",
  //   description: "Complete %next-tier% workouts within 24h",
  //   tiers_array: "2,3,6,10",
  //   variable: "workouts_dates"
  // }
]