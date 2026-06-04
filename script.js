const ELEMENTS = {
  H: { name: "Hydrogen", note: "Atomic #1", color: "#ffe4b5" },
  O: { name: "Oxygen", note: "Atomic #8", color: "#c7f0ff" },
  Na: { name: "Sodium", note: "Atomic #11", color: "#ffd8d8" },
  Cl: { name: "Chlorine", note: "Atomic #17", color: "#d6f5d6" },
  C: { name: "Carbon", note: "Atomic #6", color: "#e8def8" },
  N: { name: "Nitrogen", note: "Atomic #7", color: "#d9ebff" },
  Ca: { name: "Calcium", note: "Atomic #20", color: "#ffe6c7" },
  Mg: { name: "Magnesium", note: "Atomic #12", color: "#fce7ff" },
  S: { name: "Sulfur", note: "Atomic #16", color: "#fff0a8" },
  K: { name: "Potassium", note: "Atomic #19", color: "#f7d7ff" },
  F: { name: "Fluorine", note: "Atomic #9", color: "#d7fff1" },
};

const FORMULA_SYMBOLS = Object.keys(ELEMENTS).sort(
  (left, right) => right.length - left.length,
);

const LEADERBOARD_STORAGE_KEY = "reaction-reactor-leaderboard-v1";

const MISSIONS = [
  {
    name: "Water",
    formula: "H2O",
    clue: "This compound covers most of Earth's surface and forms when hydrogen burns in oxygen.",
    difficulty: "Warm-Up",
    points: 120,
    timer: 16,
    pool: ["H", "O", "Na", "Cl", "C"],
    recipe: { H: 2, O: 1 },
  },
  {
    name: "Sodium Chloride",
    formula: "NaCl",
    clue: "This ionic compound is the main ingredient in table salt.",
    difficulty: "Warm-Up",
    points: 125,
    timer: 15,
    pool: ["Na", "Cl", "K", "O", "H"],
    recipe: { Na: 1, Cl: 1 },
  },
  {
    name: "Carbon Dioxide",
    formula: "CO2",
    clue: "Plants use this gas during photosynthesis, and people exhale it.",
    difficulty: "Warm-Up",
    points: 130,
    timer: 15,
    pool: ["C", "O", "N", "H", "S"],
    recipe: { C: 1, O: 2 },
  },
  {
    name: "Ammonia",
    formula: "NH3",
    clue: "This pungent compound contains one nitrogen atom bonded to three hydrogens.",
    difficulty: "Warm-Up",
    points: 140,
    timer: 15,
    pool: ["N", "H", "O", "Cl", "C"],
    recipe: { N: 1, H: 3 },
  },
  {
    name: "Methane",
    formula: "CH4",
    clue: "This simple hydrocarbon is the main part of natural gas.",
    difficulty: "Core",
    points: 145,
    timer: 14,
    pool: ["C", "H", "O", "N", "F"],
    recipe: { C: 1, H: 4 },
  },
  {
    name: "Hydrochloric Acid",
    formula: "HCl",
    clue: "This strong acid is a major part of stomach acid.",
    difficulty: "Core",
    points: 145,
    timer: 14,
    pool: ["H", "Cl", "O", "Na", "F"],
    recipe: { H: 1, Cl: 1 },
  },
  {
    name: "Sodium Hydroxide",
    formula: "NaOH",
    clue: "This strong base is also called lye.",
    difficulty: "Core",
    points: 150,
    timer: 14,
    pool: ["Na", "O", "H", "Cl", "K"],
    recipe: { Na: 1, O: 1, H: 1 },
  },
  {
    name: "Magnesium Oxide",
    formula: "MgO",
    clue: "This ionic compound combines magnesium with oxygen in a 1-to-1 ratio.",
    difficulty: "Core",
    points: 150,
    timer: 14,
    pool: ["Mg", "O", "Ca", "Na", "S"],
    recipe: { Mg: 1, O: 1 },
  },
  {
    name: "Calcium Oxide",
    formula: "CaO",
    clue: "This ionic compound is made from calcium and oxygen in equal amounts.",
    difficulty: "Core",
    points: 155,
    timer: 14,
    pool: ["Ca", "O", "Mg", "Na", "Cl"],
    recipe: { Ca: 1, O: 1 },
  },
  {
    name: "Hydrogen Peroxide",
    formula: "H2O2",
    clue: "This bubbling disinfectant has the same number of hydrogen and oxygen atoms.",
    difficulty: "Core",
    points: 160,
    timer: 13,
    pool: ["H", "O", "N", "C", "Cl"],
    recipe: { H: 2, O: 2 },
  },
  {
    name: "Carbon Monoxide",
    formula: "CO",
    clue: "This dangerous gas has one carbon atom and one oxygen atom.",
    difficulty: "Core",
    points: 160,
    timer: 13,
    pool: ["C", "O", "N", "H", "S"],
    recipe: { C: 1, O: 1 },
  },
  {
    name: "Nitric Oxide",
    formula: "NO",
    clue: "This compound contains one nitrogen atom and one oxygen atom.",
    difficulty: "Core",
    points: 165,
    timer: 13,
    pool: ["N", "O", "C", "S", "H"],
    recipe: { N: 1, O: 1 },
  },
  {
    name: "Sulfur Dioxide",
    formula: "SO2",
    clue: "This air pollutant contains sulfur and twice as many oxygen atoms.",
    difficulty: "Challenge",
    points: 170,
    timer: 13,
    pool: ["S", "O", "N", "C", "F"],
    recipe: { S: 1, O: 2 },
  },
  {
    name: "Sulfur Trioxide",
    formula: "SO3",
    clue: "This oxide contains one sulfur atom and three oxygen atoms.",
    difficulty: "Challenge",
    points: 175,
    timer: 12,
    pool: ["S", "O", "C", "N", "F"],
    recipe: { S: 1, O: 3 },
  },
  {
    name: "Nitrogen Dioxide",
    formula: "NO2",
    clue: "This brown gas has one nitrogen atom and two oxygen atoms.",
    difficulty: "Challenge",
    points: 175,
    timer: 13,
    pool: ["N", "O", "C", "S", "H"],
    recipe: { N: 1, O: 2 },
  },
  {
    name: "Potassium Chloride",
    formula: "KCl",
    clue: "This salt forms when potassium bonds with chlorine in a 1-to-1 ratio.",
    difficulty: "Challenge",
    points: 180,
    timer: 13,
    pool: ["K", "Cl", "Na", "O", "F"],
    recipe: { K: 1, Cl: 1 },
  },
  {
    name: "Potassium Fluoride",
    formula: "KF",
    clue: "This ionic compound joins potassium and fluorine in equal amounts.",
    difficulty: "Challenge",
    points: 180,
    timer: 12,
    pool: ["K", "F", "Cl", "Na", "O"],
    recipe: { K: 1, F: 1 },
  },
  {
    name: "Sodium Fluoride",
    formula: "NaF",
    clue: "This salt is often mentioned in discussions of toothpaste.",
    difficulty: "Challenge",
    points: 180,
    timer: 12,
    pool: ["Na", "F", "Cl", "K", "O"],
    recipe: { Na: 1, F: 1 },
  },
  {
    name: "Calcium Chloride",
    formula: "CaCl2",
    clue: "This compound pairs one calcium atom with two chlorine atoms.",
    difficulty: "Challenge",
    points: 190,
    timer: 12,
    pool: ["Ca", "Cl", "O", "Na", "Mg"],
    recipe: { Ca: 1, Cl: 2 },
  },
  {
    name: "Magnesium Chloride",
    formula: "MgCl2",
    clue: "This compound pairs one magnesium atom with two chlorine atoms.",
    difficulty: "Challenge",
    points: 190,
    timer: 12,
    pool: ["Mg", "Cl", "O", "Na", "S"],
    recipe: { Mg: 1, Cl: 2 },
  },
  {
    name: "Calcium Carbonate",
    formula: "CaCO3",
    clue: "Chalk, limestone, and many seashells are made largely of this compound.",
    difficulty: "Challenge",
    points: 200,
    timer: 12,
    pool: ["Ca", "C", "O", "Na", "Mg"],
    recipe: { Ca: 1, C: 1, O: 3 },
  },
  {
    name: "Hydrogen Sulfide",
    formula: "H2S",
    clue: "This gas smells like rotten eggs and has two hydrogens bonded to sulfur.",
    difficulty: "Challenge",
    points: 200,
    timer: 12,
    pool: ["H", "S", "O", "N", "C"],
    recipe: { H: 2, S: 1 },
  },
  {
    name: "Ozone",
    formula: "O3",
    clue: "This form of oxygen contains three oxygen atoms.",
    difficulty: "Challenge",
    points: 200,
    timer: 11,
    pool: ["O", "N", "C", "S", "F"],
    recipe: { O: 3 },
  },
  {
    name: "Sodium Bicarbonate",
    formula: "NaHCO3",
    clue: "This baking ingredient is also called baking soda.",
    difficulty: "Lab Final",
    points: 210,
    timer: 12,
    pool: ["Na", "H", "C", "O", "Cl"],
    recipe: { Na: 1, H: 1, C: 1, O: 3 },
  },
  {
    name: "Nitric Acid",
    formula: "HNO3",
    clue: "This strong acid contains hydrogen, nitrogen, and three oxygens.",
    difficulty: "Lab Final",
    points: 215,
    timer: 12,
    pool: ["H", "N", "O", "C", "S"],
    recipe: { H: 1, N: 1, O: 3 },
  },
  {
    name: "Sulfuric Acid",
    formula: "H2SO4",
    clue: "This acid appears in car battery discussions and contains four oxygen atoms.",
    difficulty: "Lab Final",
    points: 225,
    timer: 13,
    pool: ["H", "S", "O", "N", "C"],
    recipe: { H: 2, S: 1, O: 4 },
  },
  {
    name: "Potassium Nitrate",
    formula: "KNO3",
    clue: "This nitrate salt is sometimes called saltpeter.",
    difficulty: "Lab Final",
    points: 220,
    timer: 12,
    pool: ["K", "N", "O", "Na", "S"],
    recipe: { K: 1, N: 1, O: 3 },
  },
  {
    name: "Sodium Nitrate",
    formula: "NaNO3",
    clue: "This nitrate salt contains sodium, nitrogen, and three oxygen atoms.",
    difficulty: "Lab Final",
    points: 220,
    timer: 12,
    pool: ["Na", "N", "O", "K", "C"],
    recipe: { Na: 1, N: 1, O: 3 },
  },
  {
    name: "Sodium Oxide",
    formula: "Na2O",
    clue: "This oxide needs two sodium atoms for every oxygen atom.",
    difficulty: "Lab Final",
    points: 210,
    timer: 12,
    pool: ["Na", "O", "K", "Ca", "H"],
    recipe: { Na: 2, O: 1 },
  },
  {
    name: "Magnesium Sulfide",
    formula: "MgS",
    clue: "This ionic compound combines magnesium and sulfur in a 1-to-1 ratio.",
    difficulty: "Lab Final",
    points: 210,
    timer: 12,
    pool: ["Mg", "S", "O", "Ca", "Na"],
    recipe: { Mg: 1, S: 1 },
  },
];

const MAX_MISTAKES = 3;
const STARTING_HINTS = 3;

const state = {
  queue: [],
  currentMission: null,
  round: 0,
  score: 0,
  highScore: 0,
  mistakes: 0,
  streak: 0,
  hints: STARTING_HINTS,
  timeLeft: 0,
  timerId: null,
  transitionId: null,
  typedAnswer: "",
  leaderboard: [],
  runRecorded: false,
  currentScreen: "home",
  gameActive: false,
  hintUsedThisRound: false,
  locked: false,
};

const homeScreenEl = document.getElementById("home-screen");
const gameScreenEl = document.getElementById("game-screen");
const homeStartButtonEl = document.getElementById("home-start-button");
const homeLeaderboardButtonEl = document.getElementById("home-leaderboard-button");
const homeRulesButtonEl = document.getElementById("home-rules-button");
const homeHighScoreEl = document.getElementById("home-high-score");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const roundEl = document.getElementById("round");
const livesEl = document.getElementById("lives");
const streakEl = document.getElementById("streak");
const hintsEl = document.getElementById("hints");
const compoundNameEl = document.getElementById("compound-name");
const compoundClueEl = document.getElementById("compound-clue");
const difficultyBadgeEl = document.getElementById("difficulty-badge");
const atomsNeededEl = document.getElementById("atoms-needed");
const timerTextEl = document.getElementById("timer-text");
const timerFillEl = document.getElementById("timer-fill");
const formulaPreviewEl = document.getElementById("formula-preview");
const formulaInputEl = document.getElementById("formula-input");
const feedbackEl = document.getElementById("feedback");
const missionLogEl = document.getElementById("mission-log");
const missionLogTabEl = document.getElementById("mission-log-tab");
const leaderboardTabEl = document.getElementById("leaderboard-tab");
const missionLogPanelEl = document.getElementById("mission-log-panel");
const leaderboardPanelEl = document.getElementById("leaderboard-panel");
const leaderboardListEl = document.getElementById("leaderboard-list");
const leaderboardEmptyEl = document.getElementById("leaderboard-empty");
const leaderboardHighScoreEl = document.getElementById("leaderboard-high-score");
const startButton = document.getElementById("start-button");
const leaderboardOpenButtonEl = document.getElementById("leaderboard-open-button");
const homeButtonEl = document.getElementById("home-button");
const rulesButton = document.getElementById("rules-button");
const closeRulesButton = document.getElementById("close-rules");
const rulesModal = document.getElementById("rules-modal");
const submitButton = document.getElementById("submit-button");
const hintButton = document.getElementById("hint-button");
const clearButton = document.getElementById("clear-button");

function shuffle(array) {
  const copy = [...array];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function getCurrentMission() {
  return state.currentMission;
}

function getRecipeSymbols(recipe) {
  return Object.keys(recipe);
}

function getTotalAtoms(recipe) {
  return Object.values(recipe).reduce((sum, value) => sum + value, 0);
}

function parseFormula(input) {
  const condensed = input.replace(/\s+/g, "");

  if (!condensed) {
    return null;
  }

  const counts = {};
  const tokens = [];
  let cursor = 0;

  while (cursor < condensed.length) {
    const symbol = FORMULA_SYMBOLS.find(
      (candidate) =>
        condensed.slice(cursor, cursor + candidate.length).toLowerCase() ===
        candidate.toLowerCase(),
    );

    if (!symbol) {
      return null;
    }

    cursor += symbol.length;

    let amountText = "";

    while (cursor < condensed.length && /[0-9]/.test(condensed[cursor])) {
      amountText += condensed[cursor];
      cursor += 1;
    }

    const amount = amountText ? Number(amountText) : 1;

    if (!Number.isInteger(amount) || amount <= 0) {
      return null;
    }

    counts[symbol] = (counts[symbol] || 0) + amount;
    tokens.push(`${symbol}${amount > 1 ? amount : ""}`);
  }

  return {
    counts,
    normalized: tokens.join(""),
  };
}

function updateDashboard() {
  scoreEl.textContent = state.score;
  highScoreEl.textContent = state.highScore;
  homeHighScoreEl.textContent = state.highScore;
  roundEl.textContent = state.round;
  livesEl.textContent = Math.max(MAX_MISTAKES - state.mistakes, 0);
  streakEl.textContent = state.streak;
  hintsEl.textContent = state.hints;
}

function showScreen(screenName) {
  state.currentScreen = screenName;
  const showHome = screenName === "home";

  homeScreenEl.classList.toggle("hidden", !showHome);
  gameScreenEl.classList.toggle("hidden", showHome);
}

function getSortedLeaderboard(entries) {
  return [...entries].sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }

    if (right.round !== left.round) {
      return right.round - left.round;
    }

    return new Date(right.recordedAt).getTime() - new Date(left.recordedAt).getTime();
  });
}

function loadLeaderboard() {
  try {
    const raw = window.localStorage.getItem(LEADERBOARD_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (entry) =>
          entry &&
          Number.isFinite(entry.score) &&
          Number.isFinite(entry.round) &&
          typeof entry.recordedAt === "string",
      )
      .map((entry) => ({
        score: entry.score,
        round: entry.round,
        recordedAt: entry.recordedAt,
      }));
  } catch (error) {
    return [];
  }
}

function saveLeaderboard() {
  try {
    window.localStorage.setItem(
      LEADERBOARD_STORAGE_KEY,
      JSON.stringify(state.leaderboard),
    );
  } catch (error) {
    return;
  }
}

function formatLeaderboardDate(isoString) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return "Recent run";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function syncLeaderboardState() {
  state.leaderboard = getSortedLeaderboard(state.leaderboard).slice(0, 10);
  state.highScore = state.leaderboard.length > 0 ? state.leaderboard[0].score : 0;
  leaderboardHighScoreEl.textContent = state.highScore;
  renderLeaderboard();
  updateDashboard();
}

function renderLeaderboard() {
  leaderboardListEl.replaceChildren();

  if (state.leaderboard.length === 0) {
    leaderboardEmptyEl.classList.remove("hidden");
    return;
  }

  leaderboardEmptyEl.classList.add("hidden");

  state.leaderboard.forEach((entry, index) => {
    const item = document.createElement("li");
    const title = document.createElement("strong");
    const meta = document.createElement("span");

    item.className = `leaderboard-row${index === 0 ? " leaderboard-row-top" : ""}`;
    title.textContent = `#${index + 1}  ${entry.score} pts`;
    meta.textContent = `${entry.round} rounds  |  ${formatLeaderboardDate(entry.recordedAt)}`;

    item.append(title, meta);
    leaderboardListEl.appendChild(item);
  });
}

function switchHistoryTab(tabName) {
  const showLeaderboard = tabName === "leaderboard";

  missionLogTabEl.classList.toggle("active", !showLeaderboard);
  missionLogTabEl.setAttribute("aria-selected", String(!showLeaderboard));
  leaderboardTabEl.classList.toggle("active", showLeaderboard);
  leaderboardTabEl.setAttribute("aria-selected", String(showLeaderboard));
  missionLogPanelEl.classList.toggle("hidden", showLeaderboard);
  leaderboardPanelEl.classList.toggle("hidden", !showLeaderboard);
}

function recordRun() {
  if (state.runRecorded || state.round === 0) {
    return;
  }

  state.leaderboard.push({
    score: state.score,
    round: state.round,
    recordedAt: new Date().toISOString(),
  });
  state.runRecorded = true;
  syncLeaderboardState();
  saveLeaderboard();
}

function openGameScreen(defaultTab = "log") {
  showScreen("game");
  switchHistoryTab(defaultTab);
}

function resetRunDisplay() {
  state.currentMission = null;
  state.round = 0;
  state.score = 0;
  state.mistakes = 0;
  state.streak = 0;
  state.hints = STARTING_HINTS;
  state.typedAnswer = "";
  state.hintUsedThisRound = false;
  state.runRecorded = false;

  compoundNameEl.textContent = "Press Start";
  compoundClueEl.textContent =
    "Each mission describes a compound and you type its formula before time runs out.";
  difficultyBadgeEl.textContent = "Waiting";
  atomsNeededEl.textContent = "0";
  timerTextEl.textContent = "0s";
  timerFillEl.style.width = "0%";
  clearAnswer();
  updateDashboard();
}

function openHomeScreen() {
  if (state.gameActive) {
    clearTimer();
    clearTransition();
    state.gameActive = false;
    state.locked = true;
    setInputState(true);
    resetRunDisplay();
    setFeedback("Run exited. Start a new endless run when you're ready.", "neutral");
  }

  showScreen("home");
}

function setFeedback(message, tone = "neutral") {
  feedbackEl.textContent = message;
  feedbackEl.className = `feedback ${tone}`;
}

function addLog(title, text, tone) {
  const item = document.createElement("li");
  const heading = document.createElement("strong");
  const body = document.createElement("span");

  heading.className = `log-${tone}`;
  heading.textContent = title;
  body.textContent = text;

  item.append(heading, body);
  missionLogEl.prepend(item);

  while (missionLogEl.children.length > 6) {
    missionLogEl.removeChild(missionLogEl.lastChild);
  }
}

function updateFormulaPreview() {
  const trimmedAnswer = state.typedAnswer.trim();

  if (!trimmedAnswer) {
    formulaPreviewEl.textContent = "Empty";
    formulaInputEl.classList.remove("invalid");
    return;
  }

  const parsed = parseFormula(state.typedAnswer);

  if (!parsed) {
    formulaPreviewEl.textContent = "Check format";
    formulaInputEl.classList.add("invalid");
    return;
  }

  formulaPreviewEl.textContent = parsed.normalized;
  formulaInputEl.classList.remove("invalid");
}

function clearAnswer() {
  state.typedAnswer = "";
  formulaInputEl.value = "";
  updateFormulaPreview();
}

function setInputState(isDisabled) {
  formulaInputEl.disabled = isDisabled;
}

function updateTimerDisplay() {
  const mission = getCurrentMission();
  const maxTime = mission ? mission.timer : 1;
  const ratio = maxTime ? Math.max(state.timeLeft, 0) / maxTime : 0;

  timerTextEl.textContent = `${Math.max(state.timeLeft, 0)}s`;
  timerFillEl.style.width = `${ratio * 100}%`;
}

function clearTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function clearTransition() {
  if (state.transitionId) {
    window.clearTimeout(state.transitionId);
    state.transitionId = null;
  }
}

function startTimer() {
  clearTimer();
  state.timerId = window.setInterval(() => {
    if (!state.gameActive || state.locked) {
      return;
    }

    state.timeLeft -= 1;
    updateTimerDisplay();

    if (state.timeLeft <= 0) {
      handleTimeout();
    }
  }, 1000);
}

function refillQueue() {
  state.queue = shuffle(MISSIONS);
}

function renderMission() {
  const mission = getCurrentMission();

  if (!mission) {
    return;
  }

  clearAnswer();
  state.hintUsedThisRound = false;
  state.locked = false;
  state.timeLeft = mission.timer;

  compoundNameEl.textContent = mission.name;
  compoundClueEl.textContent = mission.clue;
  difficultyBadgeEl.textContent = mission.difficulty;
  atomsNeededEl.textContent = getTotalAtoms(mission.recipe);
  updateTimerDisplay();
  setInputState(false);
  updateDashboard();
  startTimer();
  formulaInputEl.focus();
}

function advanceMission() {
  clearTransition();

  if (state.queue.length === 0) {
    refillQueue();
  }

  state.currentMission = state.queue.pop();
  state.round += 1;
  renderMission();
}

function startGame() {
  clearTimer();
  clearTransition();
  refillQueue();
  state.currentMission = null;
  state.round = 0;
  state.score = 0;
  state.mistakes = 0;
  state.streak = 0;
  state.hints = STARTING_HINTS;
  state.typedAnswer = "";
  state.runRecorded = false;
  state.gameActive = true;
  state.locked = false;
  missionLogEl.replaceChildren();
  addLog("Endless Lab Online", "The reactor will keep serving compounds until you make 3 mistakes.", "success");
  setFeedback("Endless mode loaded. Short timers are active, so build quickly.", "neutral");
  openGameScreen("log");
  advanceMission();
  startButton.textContent = "Restart Endless Run";
}

function clearSelection() {
  if (!state.gameActive || state.locked) {
    return;
  }

  clearAnswer();
  setFeedback("Answer cleared. Try typing a new formula.", "neutral");
}

function registerMistake(message, logTitle) {
  const tone = state.mistakes + 1 >= MAX_MISTAKES ? "danger" : "warning";

  state.mistakes += 1;
  state.streak = 0;
  updateDashboard();
  setFeedback(`${message} Mistakes left: ${Math.max(MAX_MISTAKES - state.mistakes, 0)}.`, tone);
  addLog(
    logTitle,
    `${message} ${state.mistakes >= MAX_MISTAKES ? "That was the third mistake." : `${MAX_MISTAKES - state.mistakes} mistakes remain.`}`,
    tone,
  );

  if (state.mistakes >= MAX_MISTAKES) {
    endGame();
    return true;
  }

  return false;
}

function submitReaction() {
  const mission = getCurrentMission();

  if (!state.gameActive || state.locked || !mission) {
    return;
  }

  if (!state.typedAnswer.trim()) {
    setFeedback("Type a formula before launching the reaction.", "warning");
    return;
  }

  const parsedAnswer = parseFormula(state.typedAnswer);

  if (!parsedAnswer) {
    setFeedback("Use valid element symbols and numbers, like H2O or CaCO3.", "warning");
    formulaInputEl.classList.add("invalid");
    return;
  }

  if (parsedAnswer.normalized !== mission.formula) {
    state.locked = true;
    setInputState(true);
    const didLose = registerMistake(
      `${mission.name} needs a different formula. The correct answer was ${mission.formula}.`,
      "Reaction Failed",
    );

    if (!didLose) {
      clearTransition();
      state.transitionId = window.setTimeout(() => {
        state.transitionId = null;
        advanceMission();
      }, 1100);
    }

    return;
  }

  state.locked = true;
  setInputState(true);
  state.streak += 1;

  const roundPoints = mission.points + state.timeLeft * 5 + (state.streak - 1) * 25;
  state.score += roundPoints;
  updateDashboard();

  setFeedback(`Success. ${mission.name} formed as ${mission.formula} for ${roundPoints} points.`, "success");
  addLog("Reaction Stable", `${mission.name} formed correctly as ${mission.formula}.`, "success");

  clearTransition();
  state.transitionId = window.setTimeout(() => {
    state.transitionId = null;
    advanceMission();
  }, 1100);
}

function handleTimeout() {
  clearTimer();

  if (!state.gameActive || state.locked) {
    return;
  }

  const mission = getCurrentMission();

  state.locked = true;
  setInputState(true);
  const didLose = registerMistake(
    `Time ran out. ${mission.name} was ${mission.formula}.`,
    "Mission Lost",
  );

  if (!didLose) {
    clearTransition();
    state.transitionId = window.setTimeout(() => {
      state.transitionId = null;
      advanceMission();
    }, 1200);
  }
}

function useHint() {
  const mission = getCurrentMission();

  if (!state.gameActive || state.locked || !mission) {
    return;
  }

  if (state.hints <= 0) {
    setFeedback("No catalyst hints remain. Trust your chemistry review.", "warning");
    return;
  }

  if (state.hintUsedThisRound) {
    setFeedback("You already used a hint on this mission.", "warning");
    return;
  }

  const symbols = getRecipeSymbols(mission.recipe);
  const firstSymbol = symbols[0];
  const lastSymbol = symbols[symbols.length - 1];
  const totalAtoms = getTotalAtoms(mission.recipe);

  state.hints -= 1;
  state.hintUsedThisRound = true;
  updateDashboard();
  setFeedback(
    `Hint: the formula starts with ${firstSymbol}, ends with ${lastSymbol}, and has ${totalAtoms} atoms total.`,
    "neutral",
  );
}

function endGame() {
  clearTimer();
  clearTransition();
  state.gameActive = false;
  state.locked = true;
  setInputState(true);
  recordRun();
  openGameScreen("leaderboard");

  compoundNameEl.textContent = "Lab Shutdown";
  compoundClueEl.textContent = `The endless run ended after round ${state.round}. Try to last longer next time.`;
  difficultyBadgeEl.textContent = "Game Over";
  atomsNeededEl.textContent = "-";
  formulaPreviewEl.textContent = "Reboot Needed";
  timerTextEl.textContent = "0s";
  timerFillEl.style.width = "0%";
  setFeedback(`Three mistakes reached. Final score: ${state.score}. You survived ${state.round} rounds.`, "danger");
  addLog("Run Ended", `You survived ${state.round} rounds and scored ${state.score} points.`, "danger");
}

function openRules() {
  rulesModal.classList.remove("hidden");
}

function closeRules() {
  rulesModal.classList.add("hidden");
}

startButton.addEventListener("click", startGame);
homeStartButtonEl.addEventListener("click", startGame);
homeLeaderboardButtonEl.addEventListener("click", () => openGameScreen("leaderboard"));
homeRulesButtonEl.addEventListener("click", openRules);
leaderboardOpenButtonEl.addEventListener("click", () => openGameScreen("leaderboard"));
homeButtonEl.addEventListener("click", openHomeScreen);
rulesButton.addEventListener("click", openRules);
closeRulesButton.addEventListener("click", closeRules);
submitButton.addEventListener("click", submitReaction);
hintButton.addEventListener("click", useHint);
clearButton.addEventListener("click", clearSelection);
missionLogTabEl.addEventListener("click", () => switchHistoryTab("log"));
leaderboardTabEl.addEventListener("click", () => switchHistoryTab("leaderboard"));
formulaInputEl.addEventListener("input", (event) => {
  state.typedAnswer = event.target.value;
  updateFormulaPreview();
});
formulaInputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitReaction();
  }
});

rulesModal.addEventListener("click", (event) => {
  if (event.target === rulesModal) {
    closeRules();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeRules();
  }
});

state.leaderboard = loadLeaderboard();
syncLeaderboardState();
showScreen("home");
switchHistoryTab("log");
setInputState(true);
updateFormulaPreview();
updateDashboard();
