export const PROJECT_COST_BREAKDOWN = {
  webinar: [
    { role: "Project SME", hours: 5, rate: 100 },
    { role: "PM", hours: 3, rate: 50 },
    { role: "Culture SME", hours: 7, rate: 75 },
    { role: "Graphic Design", hours: 4, rate: 50 }
  ],
  course: [
    { role: "SME", hours: 2, rate: 100 },
    { role: "PM", hours: 4, rate: 35 },
    { role: "Research & LO", hours: 3, rate: 35 },
    { role: "Course Writing", hours: 4, rate: 40 },
    { role: "Script Writing", hours: 3, rate: 40 },
    { role: "Graphic Design", hours: 2, rate: 70},
    
  ],
  video: [
    { role: "Scriptwriter", hours: 2, rate: 80 },
    { role: "Producer", hours: 3, rate: 120 },
    { role: "Editor", hours: 5, rate: 75 }
  ],
  translation: [
    { role: "Translator", hours: 10, rate: 50 },
  ]
};

export function getInternalCost(projectType) {
  const breakdown = PROJECT_COST_BREAKDOWN[projectType] || [];
  return breakdown.reduce((sum, item) => sum + item.hours * item.rate, 0);
}
