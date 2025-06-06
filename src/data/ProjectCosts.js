export const PROJECT_COST_BREAKDOWN = {
  webinar: [
    { role: "Project SME", hours: 5, rate: 100 },
    { role: "PM", hours: 3, rate: 50 },
    { role: "Culture SME", hours: 7, rate: 75 },
    { role: "Graphic Design", hours: 4, rate: 50 }
  ],
  course: [
    { role: "Instructional Designer", hours: 8, rate: 90 },
    { role: "SME", hours: 4, rate: 100 }
  ],
  video: [
    { role: "Scriptwriter", hours: 2, rate: 80 },
    { role: "Producer", hours: 3, rate: 120 },
    { role: "Editor", hours: 5, rate: 75 }
  ]
};

export function getInternalCost(projectType) {
  const breakdown = PROJECT_COST_BREAKDOWN[projectType] || [];
  return breakdown.reduce((sum, item) => sum + item.hours * item.rate, 0);
}
