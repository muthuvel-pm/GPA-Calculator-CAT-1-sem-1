const fieldsEl = document.getElementById('fields');
const form = document.getElementById('gpa-form');
const resultEl = document.getElementById('result');
const gpaValueEl = document.getElementById('gpa-value');
const meterFill = document.getElementById('meter-fill');
const errorEl = document.getElementById('error');

// Build inputs from the subject list
GPA.SUBJECTS.forEach(({ id, label }) => {
  const wrap = document.createElement('label');
  wrap.className = 'field';
  wrap.innerHTML = `
    <span>${label}</span>
    <input type="number" id="${id}" inputmode="decimal" min="0" max="${GPA.MAX_MARK}" step="any" placeholder="0 – ${GPA.MAX_MARK}">`;
  fieldsEl.appendChild(wrap);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const marks = {};
  let bad = null;

  GPA.SUBJECTS.forEach(({ id, label }) => {
    const input = document.getElementById(id);
    const value = parseFloat(input.value);
    const invalid = isNaN(value) || value < 0 || value > GPA.MAX_MARK;
    input.classList.toggle('invalid', invalid);
    if (invalid && !bad) bad = label;
    marks[id] = value;
  });

  if (bad) {
    resultEl.hidden = true;
    errorEl.textContent = `Enter a mark between 0 and ${GPA.MAX_MARK} for ${bad}.`;
    errorEl.hidden = false;
    return;
  }

  errorEl.hidden = true;
  const gpa = GPA.calculate(marks);
  gpaValueEl.textContent = gpa.toFixed(2);
  meterFill.style.width = Math.min(gpa / 10, 1) * 100 + '%';
  resultEl.hidden = false;
});

form.addEventListener('reset', () => {
  resultEl.hidden = true;
  errorEl.hidden = true;
  document.querySelectorAll('.invalid').forEach((el) => el.classList.remove('invalid'));
});