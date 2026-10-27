// Internal calculation logic. UI code never touches the weights directly.
const GPA = (() => {
  const SUBJECTS = [
    { id: 'phy',   label: 'Physics',                                         weight: 4 },
    { id: 'ai',    label: 'Foundations of Generative AI',                    weight: 3 },
    { id: 'front', label: 'Front-end Web Development',                       weight: 5 },
    { id: 'sys',   label: 'System Design Basics',                            weight: 4 },
    { id: 'psup',  label: 'Problem Solving Using Programming',               weight: 4 },
    { id: 'comp',  label: 'Computing Systems and Development Tools',         weight: 2 },
    { id: 'coi',   label: 'Constitution of India',                           weight: 0 },
    { id: 'comm',  label: 'Professional Communication and AI Collaboration', weight: 4 },
  ];
  const DIVISOR = 130;
  const MAX_MARK = 50;

  function calculate(marks) {
    const total = SUBJECTS.reduce((sum, s) => sum + marks[s.id] * s.weight, 0);
    return total / DIVISOR;
  }

  return { SUBJECTS, MAX_MARK, calculate };
})();