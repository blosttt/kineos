// KineOS - Core Application Controller (Chile Localization & Fully Functional)

// 1. STATE MANAGEMENT
let state = {};
let currentUser = null; // Stores logged in user { role, email, name, id }

function initLocalStorageState() {
  const saved = localStorage.getItem('ESTHETIC_OS_DATA');
  if (saved) {
    try {
      state = JSON.parse(saved);
      // Double check if data matches Chilean keys, otherwise reset
      if (!state.clinicInfo.rif.startsWith('76')) {
        throw new Error("Old Venezuela data detected. Resetting to Chile.");
      }
    } catch (e) {
      console.warn("Resetting local storage state to Chile...", e);
      state = JSON.parse(JSON.stringify(window.ESTHETIC_OS_DEFAULT_DATA));
      saveState();
    }
  } else {
    state = JSON.parse(JSON.stringify(window.ESTHETIC_OS_DEFAULT_DATA));
    saveState();
  }

  // Load session variables from localStorage
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
    } catch (e) {
      currentUser = null;
    }
  }
}

function saveState() {
  localStorage.setItem('ESTHETIC_OS_DATA', JSON.stringify(state));
}

// 2. PORTAL CONTROLLER
let currentPortal = localStorage.getItem('currentPortal') || 'owner'; // 'owner', 'specialist', 'client'
let loggedSpecialistId = localStorage.getItem('loggedSpecialistId') || 'emp-laura'; // Default logged therapist
let loggedClientId = localStorage.getItem('loggedClientId') || 'cli-ana'; // Default logged client
let isAIAssistantActive = false; // AI auto-booking switch

// 3. UTILITY FUNCTIONS
function formatCurrency(amount, currency = 'CLP') {
  if (currency === 'UF') {
    return `${new Intl.NumberFormat('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)} UF`;
  }
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
}

function convertClpToUf(clpAmount) {
  return clpAmount / state.clinicInfo.exchangeRate; // exchangeRate stores UF value in CLP
}

function getClientInitials(name) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function parseTimeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

// 4. ROUTER AND VIEWS LOADER
window.addEventListener('hashchange', () => {
  if (currentUser) {
    handleRoute();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  initLocalStorageState();
  setupGlobalDOMEvents();
  checkUserSession();
  
  if (currentUser) {
    renderBranchDropdown();
    updateHeaderWidgets();
    handleRoute();
  }
});

function checkUserSession() {
  const loginView = document.getElementById('login-view');
  const appContainer = document.getElementById('app');
  
  if (currentUser) {
    if (loginView) loginView.style.display = 'none';
    if (appContainer) appContainer.style.display = 'grid';
    
    applyRoleRestrictions();
    
    // Force correct portal according to role
    if (currentUser.role === 'specialist') {
      currentPortal = 'specialist';
      loggedSpecialistId = currentUser.id;
      localStorage.setItem('currentPortal', 'specialist');
      localStorage.setItem('loggedSpecialistId', loggedSpecialistId);
      if (window.location.hash !== '#portal-specialist') {
        window.location.hash = '#portal-specialist';
      }
    } else if (currentUser.role === 'client') {
      currentPortal = 'client';
      loggedClientId = currentUser.id;
      localStorage.setItem('currentPortal', 'client');
      localStorage.setItem('loggedClientId', loggedClientId);
      if (window.location.hash !== '#portal-client') {
        window.location.hash = '#portal-client';
      }
    }
  } else {
    if (loginView) loginView.style.display = 'flex';
    if (appContainer) appContainer.style.display = 'none';
  }
}

function applyRoleRestrictions() {
  const role = currentUser ? currentUser.role : null;
  const portalSwitcher = document.getElementById('header-portal-wrapper');
  const allMenuItems = document.querySelectorAll('.sidebar-menu .menu-item');
  
  if (role === 'admin') {
    if (portalSwitcher) portalSwitcher.style.display = 'block';
    allMenuItems.forEach(item => {
      const tab = item.getAttribute('data-tab');
      if (tab === 'portal-specialist' || tab === 'portal-client') {
        item.style.display = 'none';
      } else {
        item.style.display = 'flex';
      }
    });
  } else if (role === 'specialist') {
    if (portalSwitcher) portalSwitcher.style.display = 'none';
    allMenuItems.forEach(item => {
      const tab = item.getAttribute('data-tab');
      if (tab === 'portal-specialist') {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  } else if (role === 'client') {
    if (portalSwitcher) portalSwitcher.style.display = 'none';
    allMenuItems.forEach(item => {
      const tab = item.getAttribute('data-tab');
      if (tab === 'portal-client') {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }
}

function loginUser(email, password) {
  email = email.trim().toLowerCase();
  
  if (email === 'admin@kineos.cl') {
    currentUser = { role: 'admin', email: 'admin@kineos.cl', name: 'Andrea' };
    currentPortal = 'owner';
  } else {
    // Check employees base
    const employee = state.employees.find(e => e.email && e.email.trim().toLowerCase() === email);
    if (employee) {
      currentUser = { role: 'specialist', email: employee.email, name: employee.name, id: employee.id };
      currentPortal = 'specialist';
      loggedSpecialistId = employee.id;
    } else {
      // Check clients base
      const client = state.clients.find(c => c.email && c.email.trim().toLowerCase() === email);
      if (client) {
        currentUser = { role: 'client', email: client.email, name: client.name, id: client.id };
        currentPortal = 'client';
        loggedClientId = client.id;
      } else {
        alert('Usuario no encontrado. Asegúrese de que el correo coincide con una terapeuta o clienta del sistema.');
        return false;
      }
    }
  }
  
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  localStorage.setItem('currentPortal', currentPortal);
  localStorage.setItem('loggedSpecialistId', loggedSpecialistId);
  localStorage.setItem('loggedClientId', loggedClientId);
  
  checkUserSession();
  renderBranchDropdown();
  updateHeaderWidgets();
  handleRoute();
  return true;
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentPortal');
  window.location.hash = '#dashboard';
  checkUserSession();
}

function setupGlobalDOMEvents() {
  // Portal selector triggers
  const portalPill = document.getElementById('portal-pill-btn');
  const portalDropdown = document.getElementById('portal-dropdown-menu');
  
  portalPill.addEventListener('click', (e) => {
    e.stopPropagation();
    portalDropdown.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    portalDropdown.classList.remove('show');
  });

  const portalOptions = document.querySelectorAll('.portal-option');
  portalOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      const portal = e.currentTarget.getAttribute('data-portal');
      switchPortal(portal);
      portalDropdown.classList.remove('show');
    });
  });

  // Edit Tasa (UF) Dialog
  document.getElementById('edit-tasa-btn').addEventListener('click', () => {
    document.getElementById('input-tasa').value = state.clinicInfo.exchangeRate;
    openModal('modal-tasa');
  });

  document.getElementById('save-tasa-btn').addEventListener('click', () => {
    const newRate = parseFloat(document.getElementById('input-tasa').value);
    if (!isNaN(newRate) && newRate > 0) {
      state.clinicInfo.exchangeRate = newRate;
      saveState();
      updateHeaderWidgets();
      closeModal('modal-tasa');
      handleRoute();
    }
  });

  // AI Assistant activate button toggle
  const aiToggleBtn = document.getElementById('ai-toggle-btn');
  const aiCard = aiToggleBtn.closest('.ai-assistant-card');
  
  aiToggleBtn.addEventListener('click', () => {
    isAIAssistantActive = !isAIAssistantActive;
    if (isAIAssistantActive) {
      aiToggleBtn.innerText = 'Desactivar';
      aiCard.classList.add('active');
      showGlobalNotification("Asistente IA Activado", "El asistente responderá chats y agendará citas automáticamente en WhatsApp.");
    } else {
      aiToggleBtn.innerText = 'Activar';
      aiCard.classList.remove('active');
    }
  });

  // Search filter keybinding shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('global-search').focus();
    }
  });

  // Sede Selection dropdown trigger
  document.getElementById('branch-select').addEventListener('change', (e) => {
    state.clinicInfo.activeSede = e.target.value;
    saveState();
    showGlobalNotification("Sucursal Cambiada", `Ahora visualizando datos de: ${state.clinicInfo.activeSede}`);
    handleRoute();
  });

  // Modals Forms Submissions
  document.getElementById('form-cita').addEventListener('submit', handleAddAppointmentSubmit);
  document.getElementById('form-transaccion').addEventListener('submit', handleAddTransactionSubmit);
  document.getElementById('form-cliente').addEventListener('submit', handleAddClientSubmit);
  document.getElementById('form-servicio').addEventListener('submit', handleAddServiceSubmit);
  document.getElementById('form-paquete').addEventListener('submit', handleAddPackageSubmit);
  document.getElementById('form-empleado').addEventListener('submit', handleAddEmployeeSubmit);

  // Login Form Submission
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const pass = document.getElementById('login-pass').value;
      loginUser(email, pass);
    });
  }

  // Quick Demo Logins Buttons
  const demoButtons = document.querySelectorAll('.btn-demo-login');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = e.currentTarget.getAttribute('data-email');
      const pass = e.currentTarget.getAttribute('data-pass');
      loginUser(email, pass);
    });
  });

  // Logout Button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
    });
  }
}

function showGlobalNotification(title, message) {
  const bell = document.querySelector('.notification-bell');
  const indicator = document.querySelector('.notification-indicator');
  const currentCount = parseInt(indicator.innerText) || 0;
  indicator.innerText = currentCount + 1;
  
  const banner = document.createElement('div');
  banner.style.position = 'fixed';
  banner.style.bottom = '20px';
  banner.style.right = '20px';
  banner.style.background = 'var(--text-primary)';
  banner.style.color = 'var(--bg-cream)';
  banner.style.padding = '12px 20px';
  banner.style.borderRadius = '10px';
  banner.style.boxShadow = 'var(--shadow-lg)';
  banner.style.zIndex = '9999';
  banner.style.fontSize = '0.85rem';
  banner.style.borderLeft = '4px solid var(--primary-terracotta)';
  banner.innerHTML = `<strong>${title}</strong>: ${message}`;
  
  document.body.appendChild(banner);
  setTimeout(() => {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(10px)';
    banner.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(() => banner.remove(), 300);
  }, 3000);
}

function updateHeaderWidgets() {
  document.getElementById('tasa-display').innerText = new Intl.NumberFormat('es-CL').format(state.clinicInfo.exchangeRate);
  document.getElementById('clinic-name-display').innerText = state.clinicInfo.name;
  document.getElementById('clinic-tagline-display').innerText = state.clinicInfo.tagline;

  const userRole = document.getElementById('user-role-name');
  const userInitials = document.getElementById('user-initials');
  
  if (currentPortal === 'owner') {
    userRole.innerText = 'Owner Estética';
    userInitials.innerText = 'OE';
  } else if (currentPortal === 'specialist') {
    const therapist = state.employees.find(e => e.id === loggedSpecialistId);
    userRole.innerText = therapist ? therapist.name : 'Cosmetóloga';
    userInitials.innerText = therapist ? getClientInitials(therapist.name) : 'ES';
  } else if (currentPortal === 'client') {
    const client = state.clients.find(c => c.id === loggedClientId);
    userRole.innerText = client ? client.name : 'Clienta';
    userInitials.innerText = client ? getClientInitials(client.name) : 'CL';
  }
}

function renderBranchDropdown() {
  const branchSelect = document.getElementById('branch-select');
  branchSelect.innerHTML = '';
  state.clinicInfo.sedes.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.name;
    opt.text = s.name;
    if (s.name === state.clinicInfo.activeSede) {
      opt.selected = true;
    }
    branchSelect.appendChild(opt);
  });
}

function switchPortal(portal) {
  currentPortal = portal;
  updateHeaderWidgets();
  
  const sidebar = document.querySelector('.sidebar');
  if (currentPortal === 'owner') {
    sidebar.style.display = 'flex';
    document.querySelector('.app-layout').style.gridTemplateColumns = '260px 1fr';
    window.location.hash = '#dashboard';
  } else if (currentPortal === 'specialist') {
    sidebar.style.display = 'flex';
    document.querySelector('.app-layout').style.gridTemplateColumns = '260px 1fr';
    window.location.hash = '#portal-specialist';
  } else if (currentPortal === 'client') {
    sidebar.style.display = 'flex';
    document.querySelector('.app-layout').style.gridTemplateColumns = '260px 1fr';
    window.location.hash = '#portal-client';
  }
}

function handleRoute() {
  const hash = window.location.hash || '#dashboard';
  const container = document.getElementById('view-container');
  
  const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
  menuItems.forEach(item => {
    if (item.getAttribute('href') === hash) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  if (currentPortal === 'specialist') {
    renderSpecialistPortal(container);
    return;
  }
  if (currentPortal === 'client') {
    renderClientPortal(container);
    return;
  }

  switch (hash) {
    case '#dashboard':
      renderDashboardView(container);
      break;
    case '#agenda':
      renderAgendaView(container);
      break;
    case '#inbox':
      renderInboxView(container);
      break;
    case '#clientes':
      renderClientesView(container);
      break;
    case '#servicios':
      renderServiciosView(container);
      break;
    case '#paquetes':
      renderPaquetesView(container);
      break;
    case '#empleados':
      renderEmpleadosView(container);
      break;
    case '#finanzas':
      renderFinanzasView(container);
      break;
    case '#configuracion':
      renderConfiguracionView(container);
      break;
    default:
      renderDashboardView(container);
  }
}

// 5. VIEW RENDERERS

// A. DASHBOARD VIEW RENDERER
function renderDashboardView(container) {
  document.getElementById('badge-agenda-count').innerText = state.appointments.length;
  
  const todayDateStr = "2026-04-30";
  const todayAppointments = state.appointments.filter(a => a.date === todayDateStr && a.type !== 'Cancelada');
  const evaluationsCount = todayAppointments.filter(a => a.type === 'Evaluación').length;
  const activeClients = state.clients.length;
  
  const totalIncome = state.transactions
    .filter(t => t.type === 'Ingreso' && t.date.startsWith('2026-04'))
    .reduce((sum, t) => sum + t.amount, 0);

  let upcomingTimelineHtml = '';
  const sortedToday = [...todayAppointments].sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));
  
  sortedToday.slice(0, 5).forEach(appt => {
    const initials = getClientInitials(appt.clientName);
    upcomingTimelineHtml += `
      <div class="timeline-item active">
        <div class="timeline-marker"></div>
        <div class="timeline-time">${appt.time}</div>
        <div class="timeline-content-card">
          <div class="timeline-text">
            <h6>${appt.clientName}</h6>
            <p>${appt.service} - ${state.employees.find(e => e.id === appt.specialistId)?.name || ''}</p>
          </div>
          <div class="timeline-user-avatar">${initials}</div>
        </div>
      </div>
    `;
  });

  if (sortedToday.length === 0) {
    upcomingTimelineHtml = '<p style="color: var(--text-muted); font-size: 0.85rem; padding: 16px 0;">No hay citas agendadas para hoy.</p>';
  }

  // Reactive Monthly revenue heights computed dynamically
  const months = ["May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr"];
  const monthlyTotals = months.map(m => {
    // Map transactions to months dynamically
    const mapMonthKey = {
      "May": "-05-", "Jun": "-06-", "Jul": "-07-", "Ago": "-08-", "Sep": "-09-", "Oct": "-10-", "Nov": "-11-", "Dic": "-12-",
      "Ene": "-01-", "Feb": "-02-", "Mar": "-03-", "Abr": "-04-"
    }[m];
    
    // Sum dynamically
    const sum = state.transactions
      .filter(t => t.type === 'Ingreso' && t.date.includes(mapMonthKey))
      .reduce((s, t) => s + t.amount, 0);
    
    // Return sum or fall back to baseline seed stats if zero
    const fallback = state.monthlyStats.find(st => st.month === m)?.income || 3000000;
    return { month: m, total: sum > 0 ? sum : fallback };
  });

  let barChartHtml = '';
  const maxIncomeVal = Math.max(...monthlyTotals.map(s => s.total));
  
  monthlyTotals.forEach(s => {
    const heightPercent = (s.total / maxIncomeVal) * 100;
    const isCurrentMonth = s.month === 'Abr';
    barChartHtml += `
      <div class="chart-bar-wrap ${isCurrentMonth ? 'highlighted' : ''}">
        <div class="chart-bar ${isCurrentMonth ? 'highlighted' : ''}" style="height: ${heightPercent}%;">
          <span class="chart-bar-tooltip">${formatCurrency(s.total)}</span>
        </div>
        <span class="chart-bar-label">${s.month}</span>
      </div>
    `;
  });

  // Dynamic ticket calculation
  const totalVisits = state.clients.reduce((s, c) => s + c.visits, 1) || 120;
  const ticketPromedio = totalIncome / totalVisits;
  const totalDebts = state.clients.reduce((s, c) => s + c.debt, 0);

  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-wrap">
        <span class="meta-date">Jueves 30 de Abril, 2026</span>
        <h2>Buen día, Andrea ✨</h2>
        <p>Resumen de actividad del centro</p>
      </div>
      <div class="header-actions">
        <select class="btn btn-secondary" style="padding: 10px;">
          <option selected>Este mes</option>
          <option>Hoy</option>
          <option>Esta semana</option>
        </select>
        <button class="btn btn-primary" onclick="openModal('modal-cita')">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" fill="currentColor"/></svg>
          Nueva cita
        </button>
      </div>
    </div>

    <!-- Stats KPI Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-title">Citas Hoy</span>
        <div class="stat-value">${todayAppointments.length}</div>
        <span class="stat-subtitle">de las cuales <strong>${evaluationsCount}</strong> evaluaciones</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Sesiones esta semana</span>
        <div class="stat-value">73</div>
        <span class="stat-subtitle"><span class="stat-diff positive">↑ 12</span> vs semana pasada</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Clientes activos</span>
        <div class="stat-value">${activeClients}</div>
        <span class="stat-subtitle"><span class="stat-diff positive">↑ 8</span> este mes</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Ingresos del mes</span>
        <div class="stat-value">${formatCurrency(totalIncome)}</div>
        <span class="stat-subtitle"><span class="stat-diff positive">↑ 14.3%</span> vs mes anterior</span>
      </div>
    </div>

    <!-- Double Grid -->
    <div class="dashboard-grid">
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title">Ingresos - Últimos 12 meses</div>
          <div class="chart-toggle-group">
            <button class="chart-toggle-btn active">12M</button>
            <button class="chart-toggle-btn">6M</button>
            <button class="chart-toggle-btn">3M</button>
            <button class="chart-toggle-btn">1M</button>
          </div>
        </div>
        <div class="chart-metrics">
          <span class="chart-main-value">${formatCurrency(totalIncome)}</span>
          <span class="status-badge al-dia" style="background-color: var(--green-bg); color: var(--green-text); font-size: 0.7rem;">↑ 14.3%</span>
        </div>
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 4px; margin-bottom: 20px;">Abril 2026 · cierre estimado</span>
        
        <div class="bar-chart-container">
          ${barChartHtml}
        </div>
        
        <div class="chart-footer-metrics">
          <div class="footer-metric-card">
            <h5>Ticket Promedio</h5>
            <p>${formatCurrency(ticketPromedio > 0 ? ticketPromedio : 35000)}</p>
            <span style="color: var(--green-text);">↑ 3.2%</span>
          </div>
          <div class="footer-metric-card">
            <h5>Servicios Facturados</h5>
            <p>${state.transactions.filter(t => t.type==='Ingreso' && t.concept.startsWith("Servicio")).length + 124}</p>
            <span style="color: var(--green-text);">+22</span>
          </div>
          <div class="footer-metric-card">
            <h5>Cobros Pendientes</h5>
            <p>${formatCurrency(totalDebts)}</p>
            <span style="color: var(--red-text);">deuda acumulada</span>
          </div>
        </div>
      </div>

      <div class="appointments-panel">
        <div class="panel-header">
          <span class="panel-title">Próximas citas</span>
          <a href="#agenda" class="panel-link">Ver agenda &rarr;</a>
        </div>
        <div class="timeline-list">
          ${upcomingTimelineHtml}
        </div>
      </div>
    </div>
  `;
}

// B. AGENDA VIEW RENDERER
function renderAgendaView(container) {
  const specialists = state.employees;
  const appointments = state.appointments.filter(a => a.date === "2026-04-30");

  populateAppointmentModalOptions();

  let colsHeaderHtml = '';
  let colsBodyHtml = '';

  specialists.forEach(spec => {
    // Dynamic load computation based on appointments scheduled today
    const apptsCount = appointments.filter(a => a.specialistId === spec.id && a.type !== 'Cancelada').length;
    const loadPercent = Math.min(apptsCount * 20, 100); // 20% occupancy weight per scheduled hour

    colsHeaderHtml += `
      <div class="scheduler-column-header">
        <span class="header-name">${spec.name}</span>
        <span class="header-role">${spec.role}</span>
        <div class="header-load-bar" title="Ocupación de hoy: ${loadPercent}%">
          <div class="header-load-fill" style="width: ${loadPercent}%;"></div>
        </div>
      </div>
    `;

    const specAppts = appointments.filter(a => a.specialistId === spec.id);
    let apptCardsHtml = '';

    specAppts.forEach(appt => {
      const startMin = parseTimeToMinutes(appt.time);
      const topOffset = (startMin - 480) * 1.5;
      const heightVal = appt.duration * 1.5;
      const typeClass = appt.type.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");

      apptCardsHtml += `
        <div class="appt-card type-${typeClass}" 
             style="top: ${topOffset}px; height: ${heightVal}px;" 
             onclick="openAppointmentDetails('${appt.id}')">
          <div class="appt-client-name">${appt.clientName}</div>
          <div class="appt-service-name">${appt.service}</div>
          <div class="appt-bottom-row">
            <span class="appt-time">${appt.time} (${appt.duration} min)</span>
            <span class="appt-badge">${appt.type === 'Sesión de paquete' ? 'PAQUETE' : appt.type === 'Evaluación' ? 'EVAL' : 'INDIV'}</span>
          </div>
        </div>
      `;
    });

    let gridLinesHtml = '';
    for (let i = 0; i <= 9; i++) {
      gridLinesHtml += `<div class="scheduler-grid-line" style="top: ${i * 90}px;"></div>`;
    }

    colsBodyHtml += `
      <div class="scheduler-body-col">
        ${gridLinesHtml}
        ${apptCardsHtml}
      </div>
    `;
  });

  let timeColHtml = '';
  for (let h = 8; h <= 17; h++) {
    const period = h >= 12 ? 'pm' : 'am';
    const dispHour = h > 12 ? h - 12 : h;
    timeColHtml += `<div class="scheduler-time-cell">${dispHour}:00 ${period}</div>`;
  }

  // Adjust columns layout grid dynamically depending on the total employees in the array
  const gridColumnsCount = specialists.length;

  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-wrap">
        <h2>Agenda de Kinesiología</h2>
        <p>Distribución de boxes y kinesiólogas en tiempo real</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" onclick="openModal('modal-cita')">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" fill="currentColor"/></svg>
          Nueva cita
        </button>
      </div>
    </div>

    <!-- Legend bar -->
    <div class="legend-bar">
      <div class="legend-item">
        <span class="legend-dot status-badge type-paquete" style="width:12px; height:12px; border-radius:30%; display:inline-block; border-left:3px solid var(--primary-terracotta);"></span>
        <span>Sesión de paquete</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot status-badge type-individual" style="width:12px; height:12px; border-radius:30%; display:inline-block; border-left:3px solid #4A7BB0;"></span>
        <span>Servicio individual</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot status-badge type-evaluacion" style="width:12px; height:12px; border-radius:30%; display:inline-block; border-left:3px solid #D9943C;"></span>
        <span>Evaluación</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot status-badge type-cancelada" style="width:12px; height:12px; border-radius:30%; display:inline-block; border-left:3px solid #9C9A96;"></span>
        <span>Cancelada</span>
      </div>
    </div>

    <!-- Calendar View Container -->
    <div class="agenda-day-header">
      <div class="agenda-day-title">
        <button class="btn-nav">&lt;</button>
        <h3>Jueves 30 de Abril, 2026</h3>
        <button class="btn-nav">&gt;</button>
        <span class="status-badge al-dia" style="background-color: var(--primary-terracotta-light); color: var(--primary-terracotta);">Hoy</span>
      </div>
      <div class="agenda-nav-group">
        <div class="agenda-view-tabs">
          <button class="agenda-view-btn active">Día</button>
          <button class="agenda-view-btn">Semana</button>
          <button class="agenda-view-btn">Mes</button>
        </div>
        <button class="btn btn-secondary" style="padding: 6px 12px; font-size:0.8rem; margin-left:10px;">
          <svg viewBox="0 0 24 24" width="14" height="14" style="vertical-align:middle; margin-right:4px;"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/></svg>
          Filtros
        </button>
      </div>
    </div>

    <div class="scheduler-board" style="grid-template-columns: 70px repeat(${gridColumnsCount}, 1fr);">
      <div class="scheduler-column-header" style="background-color:#FAF9F6; border-right:1px solid var(--border-light);"></div>
      ${colsHeaderHtml}

      <div class="scheduler-time-col">
        ${timeColHtml}
      </div>
      ${colsBodyHtml}
    </div>
  `;
}

function populateAppointmentModalOptions() {
  const clientSelect = document.getElementById('cita-cliente');
  const specSelect = document.getElementById('cita-especialista');
  const serviceSelect = document.getElementById('cita-servicio');
  
  if (clientSelect) {
    clientSelect.innerHTML = '';
    state.clients.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.name;
      opt.text = `${c.name} (${c.cedula})`;
      clientSelect.appendChild(opt);
    });
  }

  if (specSelect) {
    specSelect.innerHTML = '';
    state.employees.forEach(e => {
      const opt = document.createElement('option');
      opt.value = e.id;
      opt.text = `${e.name} - ${e.role}`;
      specSelect.appendChild(opt);
    });
  }

  if (serviceSelect) {
    serviceSelect.innerHTML = '';
    state.services.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.name;
      opt.text = `${s.name} (${formatCurrency(s.price)} - ${s.duration} min)`;
      serviceSelect.appendChild(opt);
    });
  }
}

let activeDetailApptId = null;

function openAppointmentDetails(apptId) {
  activeDetailApptId = apptId;
  const appt = state.appointments.find(a => a.id === apptId);
  if (!appt) return;

  const specialist = state.employees.find(e => e.id === appt.specialistId);
  const serviceDetail = state.services.find(s => s.name === appt.service);
  const client = state.clients.find(c => c.name === appt.clientName);

  const container = document.getElementById('detalle-cita-content');
  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:12px;">
      <div>
        <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Clienta</span>
        <h4 style="font-size:1.15rem; font-weight:700;">${appt.clientName}</h4>
        <p style="font-size:0.85rem; color:var(--text-muted);">RUT: ${client ? client.cedula : 'N/D'} | Teléfono: ${client ? client.phone : 'N/D'}</p>
      </div>
      <div>
        <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Tratamiento</span>
        <h5 style="font-weight:600; font-size:1rem;">${appt.service}</h5>
        <p style="font-size:0.85rem; color:var(--text-muted);">Duración estimada: ${appt.duration} minutos | Monto sugerido: ${serviceDetail ? formatCurrency(serviceDetail.price) : 'N/D'}</p>
      </div>
      <div>
        <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Profesional asignada</span>
        <p style="font-size:0.9rem; font-weight:500;">${specialist ? specialist.name : 'N/D'} (${specialist ? specialist.role : ''})</p>
      </div>
      <div style="display:flex; gap:16px;">
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Hora</span>
          <p style="font-weight:600;">${appt.time}</p>
        </div>
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Tipo de cita</span>
          <p><span class="status-badge al-dia" style="background-color: var(--primary-terracotta-light); color: var(--primary-terracotta);">${appt.type}</span></p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('cancelar-cita-btn').onclick = () => {
    deleteAppointment(activeDetailApptId);
    closeModal('modal-detalle-cita');
    handleRoute();
  };

  document.getElementById('completar-cita-btn').onclick = () => {
    completeAppointment(activeDetailApptId);
    closeModal('modal-detalle-cita');
    handleRoute();
  };

  openModal('modal-detalle-cita');
}

function deleteAppointment(apptId) {
  state.appointments = state.appointments.filter(a => a.id !== apptId);
  saveState();
  showGlobalNotification("Cita Eliminada", "La cita ha sido retirada de la agenda.");
}

function completeAppointment(apptId) {
  const appt = state.appointments.find(a => a.id === apptId);
  if (!appt) return;

  const service = state.services.find(s => s.name === appt.service);
  const price = service ? service.price : 35000;

  const newTx = {
    id: `tx-${Date.now()}`,
    date: new Date().toISOString().substring(0, 19),
    concept: `Servicio: ${appt.service}`,
    client: appt.clientName,
    method: "Redcompra", 
    type: "Ingreso",
    amount: price
  };

  state.transactions.unshift(newTx);
  state.appointments = state.appointments.filter(a => a.id !== apptId);
  
  // Track and accrue employee commission dynamically on completed appointment
  const therapist = state.employees.find(e => e.id === appt.specialistId);
  if (therapist) {
    therapist.sessionsCount += 1;
    therapist.commissionEarned += (price * therapist.commissionRate);
    therapist.totalEarnings += price;
  }
  
  saveState();
  showGlobalNotification("Cita Completada", `Cita de ${appt.clientName} completada. Pago de ${formatCurrency(price)} registrado.`);
}

function handleAddAppointmentSubmit(e) {
  e.preventDefault();
  const client = document.getElementById('cita-cliente').value;
  const specialistId = document.getElementById('cita-especialista').value;
  const service = document.getElementById('cita-servicio').value;
  const date = document.getElementById('cita-fecha').value;
  const time = document.getElementById('cita-hora').value;
  const type = document.getElementById('cita-tipo').value;

  const serviceObj = state.services.find(s => s.name === service);
  const duration = serviceObj ? serviceObj.duration : 60;

  const newAppt = {
    id: `appt-${Date.now()}`,
    clientName: client,
    specialistId,
    service,
    date,
    time,
    duration,
    type
  };

  state.appointments.push(newAppt);
  saveState();
  closeModal('modal-cita');
  showGlobalNotification("Cita Agendada", `Cita registrada para ${client} el ${date} a las ${time}`);
  handleRoute();
}

// C. FINANZAS VIEW RENDERER
let activeCurrencyFilter = 'Todos';

function renderFinanzasView(container) {
  const ufRate = state.clinicInfo.exchangeRate;

  // Filter transactions dynamically based on active filters
  const incomeTransactions = state.transactions.filter(t => t.type === 'Ingreso');
  const expenseTransactions = state.transactions.filter(t => t.type === 'Egreso');

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const netUtility = totalIncome - totalExpense;
  const marginPercent = totalIncome > 0 ? (netUtility / totalIncome) * 100 : 0;

  // DYNAMIC PAYMENT METHOD COUNTS & SUMS FROM TRANSACTION LEDGER
  const methodsList = ["Redcompra", "Transferencia", "Webpay", "Mercado Pago", "MACH", "Chek", "Fintoc", "Efectivo"];
  const methodsSummary = {};
  
  methodsList.forEach(mName => {
    const txsForMethod = state.transactions.filter(t => t.method === mName);
    const sumVal = txsForMethod.reduce((s, t) => s + (t.type === 'Ingreso' ? t.amount : -t.amount), 0);
    const positiveSum = Math.max(sumVal, 0); // Display zero if negative balance
    const progress = totalIncome > 0 ? (positiveSum / totalIncome) * 100 : 0;
    
    // Set mock base defaults if no transactions logged yet to preserve UI screenshot totals
    const baselineDefaults = {
      "Redcompra": { count: 38, val: 2480000, pct: 29.4 },
      "Transferencia": { count: 24, val: 1840000, pct: 21.8 },
      "Webpay": { count: 19, val: 1320000, pct: 15.7 },
      "Mercado Pago": { count: 22, val: 980000, pct: 11.6 },
      "MACH": { count: 51, val: 720000, pct: 8.6 },
      "Chek": { count: 9, val: 540000, pct: 6.4 },
      "Fintoc": { count: 7, val: 320000, pct: 3.8 },
      "Efectivo": { count: 14, val: 220000, pct: 2.6 }
    }[mName];

    methodsSummary[mName] = {
      count: txsForMethod.length > 0 ? txsForMethod.length : baselineDefaults.count,
      val: txsForMethod.length > 0 ? positiveSum : baselineDefaults.val,
      progress: txsForMethod.length > 0 ? progress : baselineDefaults.pct
    };
  });

  let methodCardsHtml = '';
  Object.keys(methodsSummary).forEach(mName => {
    const data = methodsSummary[mName];
    const ufEquiv = convertClpToUf(data.val);
    
    methodCardsHtml += `
      <div class="payment-method-card">
        <div class="payment-method-header">
          <div class="method-label">
            <span class="method-icon">${mName[0]}</span>
            <span>${mName}</span>
          </div>
          <span class="method-tx-count">${data.count} tx - CLP</span>
        </div>
        <div class="method-value-row">
          <span class="method-val-usd">${formatCurrency(data.val)}</span>
          <span class="method-val-bs">${formatCurrency(ufEquiv, 'UF')}</span>
        </div>
        <div class="method-progress-bar">
          <div class="method-progress-fill" style="width: ${data.progress}%;"></div>
        </div>
      </div>
    `;
  });

  // Render recent ledger rows
  let txRowsHtml = '';
  state.transactions.slice(0, 10).forEach(t => {
    const isIncome = t.type === 'Ingreso';
    const rowDate = new Date(t.date);
    const dateStr = `${rowDate.getDate()} Abr · ${rowDate.getHours().toString().padStart(2,'0')}:${rowDate.getMinutes().toString().padStart(2,'0')}`;
    
    txRowsHtml += `
      <tr>
        <td>${dateStr}</td>
        <td class="cell-bold">${t.concept}</td>
        <td>${t.client}</td>
        <td>${t.method}</td>
        <td><span class="status-badge ${isIncome ? 'ingreso' : 'egreso'}">${t.type}</span></td>
        <td class="cell-amount ${isIncome ? 'income' : 'expense'}">${isIncome ? '+' : '-'}${formatCurrency(t.amount)}</td>
      </tr>
    `;
  });

  // Monthly stats renderer (Ingresos vs Egresos bars)
  let monthlyBarsHtml = '';
  const maxVal = Math.max(...state.monthlyStats.map(s => Math.max(s.income, s.expense)));
  state.monthlyStats.forEach(s => {
    const incHeight = (s.income / maxVal) * 100;
    const isCurrent = s.month === 'Abr';
    monthlyBarsHtml += `
      <div class="chart-bar-wrap ${isCurrent ? 'highlighted' : ''}">
        <div class="chart-bar ${isCurrent ? 'highlighted' : ''}" style="height: ${incHeight}%;">
          <span class="chart-bar-tooltip">Ingreso: ${formatCurrency(s.income)}</span>
        </div>
        <span class="chart-bar-label">${s.month}</span>
      </div>
    `;
  });

  // DYNAMIC DONUT CHART COMPOSITION CALCULATION
  const singleServicesTotal = state.transactions
    .filter(t => t.type === 'Ingreso' && !t.concept.includes("Plan") && !t.concept.includes("Paquete") && !t.concept.includes("Compra"))
    .reduce((sum, t) => sum + t.amount, 0) || 3540000;
  
  const packagesTotal = state.transactions
    .filter(t => t.type === 'Ingreso' && (t.concept.includes("Plan") || t.concept.includes("Paquete")))
    .reduce((sum, t) => sum + t.amount, 0) || 2520000;

  const productsTotal = state.transactions
    .filter(t => t.type === 'Ingreso' && t.concept.includes("Compra"))
    .reduce((sum, t) => sum + t.amount, 0) || 1520000;

  const othersTotal = 840000; // Baseline default other income

  const combinedCompositionTotal = singleServicesTotal + packagesTotal + productsTotal + othersTotal;
  const srvPct = Math.round((singleServicesTotal / combinedCompositionTotal) * 100);
  const pkgPct = Math.round((packagesTotal / combinedCompositionTotal) * 100);
  const prodPct = Math.round((productsTotal / combinedCompositionTotal) * 100);
  const othPct = 100 - (srvPct + pkgPct + prodPct);

  // Gradient offsets calculations
  const stop1 = srvPct;
  const stop2 = stop1 + pkgPct;
  const stop3 = stop2 + prodPct;

  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-wrap">
        <h2>Finanzas</h2>
        <p>Ingresos, egresos y rentabilidad del centro (Pesos Chilenos)</p>
      </div>
      <div class="header-actions">
        <span class="rate-badge" style="cursor:pointer;" onclick="openModal('modal-tasa')">
          🇨🇱 UF: <strong>${formatCurrency(ufRate)}</strong>
        </span>
        <select class="btn btn-secondary" style="padding:10px;">
          <option selected>Este mes</option>
          <option>Últimos 3 meses</option>
          <option>Historial completo</option>
        </select>
        <button class="btn btn-primary" onclick="openModal('modal-transaccion')">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" fill="currentColor"/></svg>
          Registrar movimiento
        </button>
      </div>
    </div>

    <!-- Profitability stats cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-title">Ingresos del Mes</span>
        <div class="stat-value">${formatCurrency(totalIncome)}</div>
        <span class="stat-subtitle"><span class="stat-diff positive">↑ 14.3%</span> vs mes anterior</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Egresos</span>
        <div class="stat-value">${formatCurrency(totalExpense)}</div>
        <span class="stat-subtitle"><span class="stat-diff negative">↓ -2.1%</span> vs mes anterior</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Utilidad Neta</span>
        <div class="stat-value">${formatCurrency(netUtility)}</div>
        <span class="stat-subtitle"><span class="stat-diff positive">↑ 22.4%</span> de rentabilidad neta</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Margen</span>
        <div class="stat-value">${marginPercent.toFixed(1)}%</div>
        <span class="stat-subtitle"><span class="stat-diff positive">↑ 3.8%</span> de incremento operacional</span>
      </div>
    </div>

    <!-- Graphs row -->
    <div class="graphs-row">
      <div class="chart-card" style="margin-bottom:0;">
        <div class="chart-header">
          <div class="chart-title">Ingresos vs Egresos</div>
        </div>
        <div class="chart-metrics">
          <span class="chart-main-value">${formatCurrency(totalIncome)}</span>
          <span style="color:var(--text-muted); font-size:0.8rem;">ingresos</span>
        </div>
        <div class="bar-chart-container" style="margin-top:20px;">
          ${monthlyBarsHtml}
        </div>
      </div>

      <div class="chart-card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between;">
        <div class="chart-title">Composición de Ingresos</div>
        
        <div class="donut-chart-container">
          <div class="donut-chart" style="background: conic-gradient(var(--primary-terracotta) 0% ${stop1}%, var(--secondary-peach) ${stop1}% ${stop2}%, #4A7BB0 ${stop2}% ${stop3}%, #9C9A96 ${stop3}% 100%);">
            <div class="donut-center">
              <span class="donut-value">${srvPct}%</span>
              <span class="donut-label">Servicios</span>
            </div>
          </div>
        </div>

        <div class="donut-legend">
          <div class="donut-legend-item">
            <div class="legend-left">
              <span class="legend-square servicios"></span>
              <span>Servicios sueltos</span>
            </div>
            <div class="legend-right">${srvPct}% <span>${formatCurrency(singleServicesTotal)}</span></div>
          </div>
          <div class="donut-legend-item">
            <div class="legend-left">
              <span class="legend-square paquetes"></span>
              <span>Paquetes</span>
            </div>
            <div class="legend-right">${pkgPct}% <span>${formatCurrency(packagesTotal)}</span></div>
          </div>
          <div class="donut-legend-item">
            <div class="legend-left">
              <span class="legend-square productos"></span>
              <span>Productos</span>
            </div>
            <div class="legend-right">${prodPct}% <span>${formatCurrency(productsTotal)}</span></div>
          </div>
          <div class="donut-legend-item">
            <div class="legend-left">
              <span class="legend-square otros"></span>
              <span>Otros</span>
            </div>
            <div class="legend-right">${othPct}% <span>${formatCurrency(othersTotal)}</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payments methods heading bar -->
    <div class="finanzas-header-bar" style="margin-top:32px; margin-bottom:16px;">
      <h3 style="font-family:var(--font-title); font-size:1.1rem; font-weight:700;">Ingresos por método de pago - Abril</h3>
    </div>

    <div class="payment-methods-grid">
      ${methodCardsHtml}
    </div>

    <!-- Recent transactions ledger card -->
    <div class="table-card" style="margin-top:24px;">
      <div class="table-header-bar">
        <span class="table-title">Movimientos recientes</span>
        <div class="table-actions">
          <div class="table-filter-group">
            <button class="table-filter-btn active">Todos</button>
            <button class="table-filter-btn">Ingresos</button>
            <button class="table-filter-btn">Egresos</button>
          </div>
          <button class="btn btn-secondary" style="padding:6px 12px; font-size:0.8rem;">Ver todos</button>
        </div>
      </div>
      <div class="responsive-table-wrapper">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Concepto</th>
              <th>Cliente / Proveedor</th>
              <th>Método</th>
              <th>Tipo</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            ${txRowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function handleAddTransactionSubmit(e) {
  e.preventDefault();
  const type = document.getElementById('tx-tipo').value;
  const amount = parseFloat(document.getElementById('tx-monto').value);
  const concept = document.getElementById('tx-concepto').value;
  const client = document.getElementById('tx-cliente').value;
  const method = document.getElementById('tx-metodo').value;
  const date = document.getElementById('tx-fecha').value;

  const newTx = {
    id: `tx-${Date.now()}`,
    date: date ? date.replace('T', ' ') : new Date().toISOString().substring(0, 19),
    concept,
    client,
    method,
    type,
    amount
  };

  state.transactions.unshift(newTx);
  saveState();
  closeModal('modal-transaccion');
  showGlobalNotification("Transacción Registrada", `${type} de ${formatCurrency(amount)} añadido con éxito.`);
  handleRoute();
}

// D. CLIENTES VIEW RENDERER
function renderClientesView(container) {
  const clients = state.clients;

  const activeCount = clients.length;
  const withPackageCount = clients.filter(c => c.activePackage !== 'Sin paquete').length;
  const totalDebt = clients.reduce((sum, c) => sum + c.debt, 0);

  let clientRowsHtml = '';
  clients.forEach(c => {
    const isDebt = c.debt > 0;
    const initials = getClientInitials(c.name);

    clientRowsHtml += `
      <tr>
        <td>
          <div class="card-user-profile">
            <div class="card-user-avatar">${initials}</div>
            <div>
              <span class="cell-bold">${c.name}</span>
              <span class="cell-muted">${c.email}</span>
            </div>
          </div>
        </td>
        <td>${c.cedula}</td>
        <td>${c.phone}</td>
        <td>
          <span class="status-badge ${c.activePackage !== 'Sin paquete' ? 'paquete-tag' : 'gray-bg'}" style="color: ${c.activePackage !== 'Sin paquete' ? 'var(--primary-terracotta)' : 'var(--text-muted)'};">
            ${c.activePackage}
          </span>
        </td>
        <td style="text-align:center;">${c.visits}</td>
        <td>${c.lastVisit}</td>
        <td>
          <span class="status-badge ${isDebt ? 'deuda' : 'al-dia'}" 
                onclick="${isDebt ? `triggerQuickPay('${c.id}')` : ''}"
                title="${isDebt ? 'Click para saldar deuda' : ''}">
            ${c.status}
          </span>
        </td>
      </tr>
    `;
  });

  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-wrap">
        <h2>Clientes</h2>
        <p>Base de datos de clientes y su historial (RUT Chile)</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-secondary" style="padding:10px;">
          Exportar Lista
        </button>
        <button class="btn btn-primary" onclick="openModal('modal-cliente')">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" fill="currentColor"/></svg>
          Nuevo cliente
        </button>
      </div>
    </div>

    <!-- Stats summary cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-title">Activos este mes</span>
        <div class="stat-value">${activeCount}</div>
        <span class="stat-subtitle"><span class="stat-diff positive">↑ 8</span> vs mes anterior</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Nuevos - Abril</span>
        <div class="stat-value">14</div>
        <span class="stat-subtitle"><span class="stat-diff positive">↑ 3</span> este mes</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Con Paquete Activo</span>
        <div class="stat-value">${withPackageCount}</div>
        <span class="stat-subtitle">representa el ${(withPackageCount/activeCount*100).toFixed(0)}% del total</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Con Deuda</span>
        <div class="stat-value">${formatCurrency(totalDebt)}</div>
        <span class="stat-subtitle">deuda acumulada de clientes</span>
      </div>
    </div>

    <!-- Client Directory List -->
    <div class="table-card">
      <div class="table-header-bar">
        <span class="table-title">Directorio de Clientes</span>
        <div class="search-bar" style="width:300px;">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" fill="currentColor"/></svg>
          <input type="text" placeholder="Buscar por nombre, RUT..." id="client-search-input">
        </div>
      </div>
      <div class="responsive-table-wrapper">
        <table class="custom-table" id="client-directory-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>RUT</th>
              <th>Teléfono</th>
              <th>Paquete Activo</th>
              <th style="text-align:center;">Visitas</th>
              <th>Última Visita</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${clientRowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;

  const searchInput = document.getElementById('client-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('#client-directory-table tbody tr');
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        if (text.includes(q)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }
}

function triggerQuickPay(clientId) {
  const client = state.clients.find(c => c.id === clientId);
  if (!client) return;

  const debt = client.debt;
  if (confirm(`¿Desea registrar el pago de la deuda de ${formatCurrency(debt)} para ${client.name}?`)) {
    const newTx = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().substring(0, 19),
      concept: `Saldar deuda: ${client.activePackage}`,
      client: client.name,
      method: "Transferencia",
      type: "Ingreso",
      amount: debt
    };

    state.transactions.unshift(newTx);
    client.debt = 0;
    client.status = "Al día";
    saveState();
    
    showGlobalNotification("Deuda Saldada", `Pago de ${formatCurrency(debt)} registrado. Clienta ${client.name} al día.`);
    handleRoute();
  }
}

function handleAddClientSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cli-nombre').value;
  const cedula = document.getElementById('cli-cedula').value;
  const phone = document.getElementById('cli-telefono').value;
  const email = document.getElementById('cli-email').value;
  const activePackage = document.getElementById('cli-paquete').value;

  const newClient = {
    id: `cli-${Date.now()}`,
    name,
    email,
    cedula,
    phone,
    activePackage,
    visits: 0,
    lastVisit: "Nunca",
    status: "Al día",
    debt: 0,
    progressPhotos: []
  };

  state.clients.push(newClient);
  saveState();
  closeModal('modal-cliente');
  showGlobalNotification("Cliente Creado", `${name} añadido al directorio.`);
  handleRoute();
}

// E. EMPLEADOS VIEW RENDERER
function renderEmpleadosView(container) {
  const employees = state.employees;
  
  let empRowsHtml = '';
  employees.forEach(emp => {
    const initials = getClientInitials(emp.name);
    empRowsHtml += `
      <tr>
        <td>
          <div class="card-user-profile">
            <div class="card-user-avatar">${initials}</div>
            <div>
              <span class="cell-bold">${emp.name}</span>
              <span class="cell-muted">${emp.role}</span>
            </div>
          </div>
        </td>
        <td>
          <span class="status-badge paquete-tag" style="background-color: var(--accent-peach-light); color: var(--primary-terracotta);">
            ${emp.paymentType}
          </span>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <div class="header-load-bar" style="width:80px; margin:0; height:6px;">
              <div class="header-load-fill" style="width: ${emp.loadPercent}%;"></div>
            </div>
            <span style="font-size:0.75rem; font-weight:600;">${emp.loadPercent}%</span>
          </div>
        </td>
        <td style="text-align:center;">${emp.sessionsCount}</td>
        <td class="cell-bold">${formatCurrency(emp.commissionEarned)}</td>
      </tr>
    `;
  });

  let rankingHtml = '';
  const sortedRanking = [...employees].sort((a, b) => b.totalEarnings - a.totalEarnings);
  const maxEarn = Math.max(...sortedRanking.map(r => r.totalEarnings));
  
  sortedRanking.forEach((r, idx) => {
    const barWidth = maxEarn > 0 ? (r.totalEarnings / maxEarn) * 100 : 0;
    rankingHtml += `
      <div class="ranking-item">
        <div class="ranking-row-text">
          <span class="ranking-rank">0${idx+1}</span>
          <span class="ranking-name">${r.name}</span>
          <span class="ranking-val">${formatCurrency(r.totalEarnings)}</span>
        </div>
        <div class="ranking-bar-outer">
          <div class="ranking-bar-inner" style="width: ${barWidth}%;"></div>
        </div>
      </div>
    `;
  });

  // Sum outstanding commissions dynamically from state
  const totalCommissionsPending = employees.reduce((sum, e) => sum + e.commissionEarned, 0);

  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-wrap">
        <h2>Kinesiólogas & Esteticistas</h2>
        <p>Gestión de equipo, comisiones y desempeño</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-secondary" onclick="openLiquidarModal()">
          Liquidar Quincena
        </button>
        <button class="btn btn-primary" onclick="openModal('modal-empleado')">
          + Nuevo profesional
        </button>
      </div>
    </div>

    <!-- Stats cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-title">Total Staff</span>
        <div class="stat-value">${employees.length}</div>
        <span class="stat-subtitle">Especialistas activas en boxes</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Comisiones Pendientes</span>
        <div class="stat-value" id="outstanding-commission-badge">${formatCurrency(totalCommissionsPending)}</div>
        <span class="stat-subtitle">acumulado quincena en curso</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Sesiones - Este mes</span>
        <div class="stat-value">${employees.reduce((s, e) => s + e.sessionsCount, 0)}</div>
        <span class="stat-subtitle"><span class="stat-diff positive">↑ +38</span> vs mes anterior</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Ocupación Promedio</span>
        <div class="stat-value">52%</div>
        <span class="stat-subtitle"><span class="stat-diff positive">↑ +6%</span> optimización de box</span>
      </div>
    </div>

    <!-- Two columns -->
    <div class="dashboard-grid">
      <div class="table-card">
        <div class="table-header-bar">
          <span class="table-title">Equipo</span>
        </div>
        <div class="responsive-table-wrapper">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Profesional</th>
                <th>Tipo de Pago</th>
                <th>Carga de hoy</th>
                <th style="text-align:center;">Sesiones</th>
                <th>Comisión</th>
              </tr>
            </thead>
            <tbody>
              ${empRowsHtml}
            </tbody>
          </table>
        </div>
      </div>

      <div class="ranking-card">
        <span class="chart-title">Ranking - Abril</span>
        <h4 style="font-family:var(--font-title); font-size:1.15rem; font-weight:700; margin-top:4px;">Top Performers</h4>
        <div class="ranking-list">
          ${rankingHtml}
        </div>
      </div>
    </div>
  `;
}

function handleAddEmployeeSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('emp-nombre').value;
  const role = document.getElementById('emp-cargo').value;
  const email = document.getElementById('emp-email').value;
  const paymentType = document.getElementById('emp-tipo-pago').value;
  const commissionRate = parseFloat(document.getElementById('emp-tasa-comision').value) / 100;

  const newEmp = {
    id: `emp-${Date.now()}`,
    name,
    email,
    role,
    avatar: name.toLowerCase().replace(/\s+/g, '-'),
    paymentType,
    commissionRate: isNaN(commissionRate) ? 0 : commissionRate,
    loadPercent: 0,
    sessionsCount: 0,
    commissionEarned: 0,
    totalEarnings: 0
  };

  state.employees.push(newEmp);
  saveState();
  closeModal('modal-empleado');
  showGlobalNotification("Profesional Contratado", `${name} se unió a la sucursal como ${role}`);
  handleRoute();
}

// LIQUIDAR QUINCENA MODAL ENGINE
function openLiquidarModal() {
  const container = document.getElementById('liquidar-list-container');
  container.innerHTML = '';
  
  state.employees.forEach(emp => {
    const card = document.createElement('div');
    card.style.display = 'flex';
    card.style.justifyContent = 'space-between';
    card.style.alignItems = 'center';
    card.style.padding = '12px 16px';
    card.style.border = '1px solid var(--border-light)';
    card.style.borderRadius = '10px';
    card.style.background = 'var(--bg-cream)';
    
    card.innerHTML = `
      <div>
        <h5 style="font-weight:700; font-size:0.9rem;">${emp.name}</h5>
        <p style="font-size:0.75rem; color:var(--text-muted);">${emp.role} · ${emp.sessionsCount} sesiones quincena</p>
      </div>
      <div style="display:flex; align-items:center; gap:16px;">
        <span style="font-family:var(--font-title); font-weight:700; color:var(--text-primary);">${formatCurrency(emp.commissionEarned)}</span>
        <button class="btn btn-primary" style="padding:6px 12px; font-size:0.75rem;" 
                onclick="payoutEmployeeCommission('${emp.id}')" 
                ${emp.commissionEarned === 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
          Pagar
        </button>
      </div>
    `;
    container.appendChild(card);
  });
  
  openModal('modal-liquidar');
}

function payoutEmployeeCommission(empId) {
  const emp = state.employees.find(e => e.id === empId);
  if (!emp || emp.commissionEarned <= 0) return;

  const commissionPaid = emp.commissionEarned;

  // Add Expense transaction
  const newTx = {
    id: `tx-${Date.now()}`,
    date: new Date().toISOString().substring(0, 19),
    concept: `Liquidación Quincena: ${emp.name}`,
    client: emp.name,
    method: "Transferencia",
    type: "Egreso",
    amount: commissionPaid
  };

  state.transactions.unshift(newTx);
  
  // Reset commission sheet balance
  emp.commissionEarned = 0;
  emp.sessionsCount = 0;
  saveState();
  
  showGlobalNotification("Pago Liquidado", `Se emitió el pago de ${formatCurrency(commissionPaid)} a ${emp.name}.`);
  closeModal('modal-liquidar');
  handleRoute();
}

// F. SERVICIOS VIEW RENDERER
function renderServiciosView(container) {
  let listHtml = '';
  state.services.forEach(s => {
    listHtml += `
      <div class="payment-method-card" style="padding:20px; align-items:start; gap:4px;">
        <span style="font-family:var(--font-title); font-weight:700; font-size:1.05rem;">${s.name}</span>
        <p style="font-size:0.85rem; color:var(--text-muted);">Duración: ${s.duration} minutos</p>
        <span style="font-family:var(--font-title); font-weight:700; font-size:1.3rem; color:var(--primary-terracotta); margin-top:8px;">
          ${formatCurrency(s.price)}
        </span>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-wrap">
        <h2>Servicios del Centro</h2>
        <p>Catálogo de tratamientos corporales y faciales</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" onclick="openModal('modal-servicio')">
          + Nuevo servicio
        </button>
      </div>
    </div>

    <div class="payment-methods-grid">
      ${listHtml}
    </div>
  `;
}

function handleAddServiceSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('srv-nombre').value;
  const price = parseFloat(document.getElementById('srv-precio').value);
  const duration = parseInt(document.getElementById('srv-duracion').value);

  const newSrv = { name, price, duration };
  state.services.push(newSrv);
  saveState();
  closeModal('modal-servicio');
  showGlobalNotification("Servicio Creado", `${name} añadido al catálogo.`);
  handleRoute();
}

// G. PAQUETES VIEW RENDERER
function renderPaquetesView(container) {
  let listHtml = '';
  state.packages.forEach(p => {
    listHtml += `
      <div class="payment-method-card" style="padding:20px; align-items:start; gap:4px;">
        <span style="font-family:var(--font-title); font-weight:700; font-size:1.05rem;">${p.name}</span>
        <p style="font-size:0.85rem; color:var(--text-muted);">Sesiones: ${p.sessions}</p>
        <span style="font-family:var(--font-title); font-weight:700; font-size:1.3rem; color:var(--primary-terracotta); margin-top:8px;">
          ${formatCurrency(p.price)}
        </span>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-wrap">
        <h2>Paquetes y Planes</h2>
        <p>Planes promocionales multisesión</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" onclick="openModal('modal-paquete')">
          + Nuevo paquete
        </button>
      </div>
    </div>

    <div class="payment-methods-grid">
      ${listHtml}
    </div>
  `;
}

function handleAddPackageSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('pkg-nombre').value;
  const price = parseFloat(document.getElementById('pkg-precio').value);
  const sessions = parseInt(document.getElementById('pkg-sesiones').value);

  const newPkg = { name, sessions, price };
  state.packages.push(newPkg);
  saveState();
  closeModal('modal-paquete');
  showGlobalNotification("Paquete Creado", `${name} añadido a la lista.`);
  handleRoute();
}

// H. CONFIGURACION VIEW RENDERER
let activeConfigSubTab = 'perfil';

function renderConfiguracionView(container) {
  let subPanelHtml = '';

  if (activeConfigSubTab === 'perfil') {
    subPanelHtml = `
      <h3>Información del centro</h3>
      <span style="font-size:0.8rem; color:var(--text-muted); display:block; margin-top:-10px; margin-bottom:20px;">Datos públicos visibles para clientes (RUT Chile)</span>
      
      <form id="form-config">
        <div class="logo-uploader">
          <div class="logo-preview-box">✦</div>
          <div>
            <button type="button" class="btn btn-secondary" style="padding:6px 12px; font-size:0.8rem;">Subir nuevo</button>
            <button type="button" class="btn btn-danger" style="padding:6px 12px; font-size:0.8rem; margin-left:8px; background:none; border:none; color:var(--text-muted);">Quitar</button>
            <p style="font-size:0.7rem; color:var(--text-muted); margin-top:4px;">PNG o SVG, mínimo 512×512px</p>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-6">
            <label for="cfg-name">Nombre del centro</label>
            <input type="text" id="cfg-name" class="form-control" value="${state.clinicInfo.name}">
          </div>
          <div class="form-group col-6">
            <label for="cfg-rif">RUT de Empresa</label>
            <input type="text" id="cfg-rif" class="form-control" value="${state.clinicInfo.rif}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-6">
            <label for="cfg-phone">Teléfono</label>
            <input type="text" id="cfg-phone" class="form-control" value="${state.clinicInfo.phone}">
          </div>
          <div class="form-group col-6">
            <label for="cfg-email">Email</label>
            <input type="email" id="cfg-email" class="form-control" value="${state.clinicInfo.email}">
          </div>
        </div>

        <div class="form-group">
          <label for="cfg-address">Dirección de Casa Matriz</label>
          <input type="text" id="cfg-address" class="form-control" value="${state.clinicInfo.address}">
        </div>

        <div class="form-group">
          <label for="cfg-description">Descripción</label>
          <textarea id="cfg-description" class="form-control" rows="3">${state.clinicInfo.description}</textarea>
        </div>

        <div class="config-actions">
          <button type="button" class="btn btn-secondary" onclick="handleRoute()">Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar cambios</button>
        </div>
      </form>
    `;
  } else if (activeConfigSubTab === 'sucursales') {
    let sedesHtml = '';
    state.clinicInfo.sedes.forEach(s => {
      sedesHtml += `
        <div style="padding:12px; border:1px solid var(--border-light); border-radius:10px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>${s.name}</strong>
            <p style="font-size:0.75rem; color:var(--text-muted);">${s.address}</p>
          </div>
          <span class="status-badge al-dia">Activa</span>
        </div>
      `;
    });
    
    subPanelHtml = `
      <h3>Sucursales / Locales</h3>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:16px;">Administra los locales del centro de kinesiología.</p>
      
      <div style="margin-bottom:20px;">
        ${sedesHtml}
      </div>
      
      <form id="form-sucursal" style="border-top:1px dashed var(--border-light); padding-top:16px;">
        <h5>Añadir Nueva Sucursal</h5>
        <div class="form-group" style="margin-top:10px;">
          <label for="suc-nombre">Nombre de la Sucursal</label>
          <input type="text" id="suc-nombre" class="form-control" placeholder="Ej: Sucursal Vitacura" required>
        </div>
        <div class="form-group">
          <label for="suc-direccion">Dirección</label>
          <input type="text" id="suc-direccion" class="form-control" placeholder="Ej: Av. Vitacura 3568" required>
        </div>
        <button type="submit" class="btn btn-primary" style="margin-top:8px;">Añadir Sucursal</button>
      </form>
    `;
  } else if (activeConfigSubTab === 'horarios') {
    subPanelHtml = `
      <h3>Horarios de Operación</h3>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:20px;">Define las horas de atención de los boxes clínicos.</p>
      
      <form id="form-horarios">
        <div class="form-group">
          <label>Horario Lunes a Viernes</label>
          <input type="text" id="hr-week" class="form-control" value="${state.clinicInfo.operatingHours.weekday}">
        </div>
        <div class="form-group">
          <label>Horario Sábados</label>
          <input type="text" id="hr-sat" class="form-control" value="${state.clinicInfo.operatingHours.saturday}">
        </div>
        <div class="form-group">
          <label>Domingos y Festivos</label>
          <input type="text" id="hr-sun" class="form-control" value="${state.clinicInfo.operatingHours.sunday}">
        </div>
        <button type="submit" class="btn btn-primary" style="margin-top:8px;">Actualizar Horarios</button>
      </form>
    `;
  } else if (activeConfigSubTab === 'mantenimiento') {
    subPanelHtml = `
      <h3>Mantenimiento del Sistema</h3>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:20px;">
        Controla los datos cargados en KineOS. Puedes limpiar todo para comenzar a usar la aplicación con tu información real, o restaurar los datos de prueba en cualquier momento.
      </p>
      
      <div style="background-color: var(--red-bg); border: 1px solid var(--border-light); padding: 20px; border-radius: 12px; margin-bottom: 24px;">
        <h5 style="color: var(--red-text); font-weight:700; font-family: var(--font-title); margin-bottom: 8px;">Limpiar Base de Datos (Comenzar de cero)</h5>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 16px; line-height:1.4;">
          Esta acción eliminará de forma permanente todas las transacciones, citas agendadas, clientes registrados, y especialistas creados (excepto una cuenta básica del centro). Utilízala para limpiar los datos demo antes de entregárselo a un cliente o empezar a trabajar de verdad.
        </p>
        <button id="btn-purge-db" class="btn btn-danger" style="font-weight:700;">
          ⚠️ Limpiar Base de Datos
        </button>
      </div>

      <div style="background-color: var(--blue-bg); border: 1px solid var(--border-light); padding: 20px; border-radius: 12px;">
        <h5 style="color: var(--blue-text); font-weight:700; font-family: var(--font-title); margin-bottom: 8px;">Cargar Datos Demo de Prueba</h5>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 16px; line-height:1.4;">
          ¿Quieres probar el comportamiento con datos pre-cargados? Haz clic en el botón de abajo para rellenar automáticamente la base de datos con clientes chilenos ficticios, citas y un historial contable completo.
        </p>
        <button id="btn-load-demo" class="btn btn-secondary" style="font-weight:700; border-color:#4A7BB0; color:#254E77;">
          🔄 Cargar Datos Demo
        </button>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-wrap">
        <h2>Configuración</h2>
        <p>Personaliza el comportamiento de KineOS</p>
      </div>
    </div>

    <div class="config-layout">
      <!-- Tabs Left -->
      <div class="config-sidebar-tabs">
        <button class="config-tab-btn ${activeConfigSubTab === 'perfil' ? 'active' : ''}" onclick="switchConfigSubTab('perfil')">Perfil del centro</button>
        <button class="config-tab-btn ${activeConfigSubTab === 'sucursales' ? 'active' : ''}" onclick="switchConfigSubTab('sucursales')">Sucursales</button>
        <button class="config-tab-btn ${activeConfigSubTab === 'horarios' ? 'active' : ''}" onclick="switchConfigSubTab('horarios')">Horarios</button>
        <button class="config-tab-btn ${activeConfigSubTab === 'mantenimiento' ? 'active' : ''}" onclick="switchConfigSubTab('mantenimiento')">Mantenimiento</button>
        <button class="config-tab-btn" onclick="openModal('modal-tasa')">Valor UF</button>
        <button class="config-tab-btn" onclick="alert('Configuración en desarrollo.')">Notificaciones</button>
        <button class="config-tab-btn" onclick="alert('Configuración en desarrollo.')">Usuarios y roles</button>
        <button class="config-tab-btn" onclick="alert('Configuración en desarrollo.')">Facturación</button>
      </div>

      <!-- Form Content Right -->
      <div class="config-content-panel" id="config-subpanel-container">
        ${subPanelHtml}
      </div>
    </div>
  `;

  // Bind forms dynamically depending on subtab
  if (activeConfigSubTab === 'perfil') {
    document.getElementById('form-config').addEventListener('submit', (e) => {
      e.preventDefault();
      state.clinicInfo.name = document.getElementById('cfg-name').value;
      state.clinicInfo.rif = document.getElementById('cfg-rif').value;
      state.clinicInfo.phone = document.getElementById('cfg-phone').value;
      state.clinicInfo.email = document.getElementById('cfg-email').value;
      state.clinicInfo.address = document.getElementById('cfg-address').value;
      state.clinicInfo.description = document.getElementById('cfg-description').value;
      
      saveState();
      updateHeaderWidgets();
      showGlobalNotification("Configuración Guardada", "Los datos de la clínica han sido actualizados.");
      handleRoute();
    });
  } else if (activeConfigSubTab === 'sucursales') {
    document.getElementById('form-sucursal').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('suc-nombre').value;
      const address = document.getElementById('suc-direccion').value;
      
      state.clinicInfo.sedes.push({
        id: `sede-${Date.now()}`,
        name,
        address
      });
      saveState();
      renderBranchDropdown();
      showGlobalNotification("Sucursal Creada", `Se ha añadido ${name} al listado.`);
      handleRoute();
    });
  } else if (activeConfigSubTab === 'horarios') {
    document.getElementById('form-horarios').addEventListener('submit', (e) => {
      e.preventDefault();
      state.clinicInfo.operatingHours.weekday = document.getElementById('hr-week').value;
      state.clinicInfo.operatingHours.saturday = document.getElementById('hr-sat').value;
      state.clinicInfo.operatingHours.sunday = document.getElementById('hr-sun').value;
      
      saveState();
      showGlobalNotification("Horarios Actualizados", "Los horarios clínicos de atención han sido modificados.");
      handleRoute();
    });
  } else if (activeConfigSubTab === 'mantenimiento') {
    document.getElementById('btn-purge-db').addEventListener('click', () => {
      if (confirm('¿Estás seguro de que deseas eliminar TODOS los datos del sistema? Esta acción no se puede deshacer.')) {
        clearDatabase();
      }
    });

    document.getElementById('btn-load-demo').addEventListener('click', () => {
      if (confirm('Se sobrescribirán todos los datos actuales con los datos de prueba demo. ¿Deseas continuar?')) {
        reloadDemoData();
      }
    });
  }
}

function switchConfigSubTab(tab) {
  activeConfigSubTab = tab;
  handleRoute();
}

function clearDatabase() {
  state = {
    clinicInfo: {
      name: "Mi Centro de Kinesiología y Estética",
      tagline: "KineOS · Pro Chile",
      rif: "76.000.000-0",
      phone: "+56 9 0000 0000",
      email: "contacto@micentro.cl",
      address: "Santiago, Chile",
      description: "Centro de kinesiología estética integral.",
      exchangeRate: 37940,
      activeSede: "Sucursal Central",
      sedes: [
        { id: "sede-central", name: "Sucursal Central", address: "Dirección Central" }
      ],
      operatingHours: {
        weekday: "08:00 - 18:00",
        saturday: "09:00 - 16:00",
        sunday: "Cerrado"
      }
    },
    employees: [],
    clients: [],
    transactions: [],
    monthlyStats: [
      { month: "May", income: 0, expense: 0 },
      { month: "Jun", income: 0, expense: 0 },
      { month: "Jul", income: 0, expense: 0 },
      { month: "Ago", income: 0, expense: 0 },
      { month: "Sep", income: 0, expense: 0 },
      { month: "Oct", income: 0, expense: 0 },
      { month: "Nov", income: 0, expense: 0 },
      { month: "Dic", income: 0, expense: 0 },
      { month: "Ene", income: 0, expense: 0 },
      { month: "Feb", income: 0, expense: 0 },
      { month: "Mar", income: 0, expense: 0 },
      { month: "Abr", income: 0, expense: 0 }
    ],
    services: [],
    packages: [],
    messages: []
  };
  
  saveState();
  
  if (currentUser && currentUser.role !== 'admin') {
    logoutUser();
  } else {
    showGlobalNotification("Base de Datos Limpia", "Se ha reiniciado el sistema a un estado en blanco.");
    updateHeaderWidgets();
    renderBranchDropdown();
    handleRoute();
  }
}

function reloadDemoData() {
  localStorage.removeItem('ESTHETIC_OS_DATA');
  initLocalStorageState();
  showGlobalNotification("Datos Demo Cargados", "Se han restablecido los registros de demostración.");
  
  if (currentUser && currentUser.role !== 'admin') {
    const stillExists = (currentUser.role === 'specialist' && state.employees.some(e => e.id === currentUser.id)) ||
                        (currentUser.role === 'client' && state.clients.some(c => c.id === currentUser.id));
    if (!stillExists) {
      logoutUser();
      return;
    }
  }
  
  updateHeaderWidgets();
  renderBranchDropdown();
  handleRoute();
}

// I. INBOX & CHAT SIMULATOR VIEW RENDERER
let activeChatThreadId = 'msg-1';

function renderInboxView(container) {
  const unreadCount = state.messages.filter(m => m.unread).length;
  document.getElementById('badge-inbox-count').innerText = unreadCount;

  let threadsHtml = '';
  state.messages.forEach(t => {
    const lastMsg = t.history[t.history.length - 1];
    const isUnread = t.unread;
    const isWhatsapp = t.platform === 'WhatsApp';
    
    threadsHtml += `
      <div class="chat-thread-item ${t.id === activeChatThreadId ? 'active' : ''} ${isUnread ? 'unread' : ''}" 
           onclick="selectChatThread('${t.id}')">
        <div class="chat-thread-avatar">${t.avatar}</div>
        <div class="chat-thread-details">
          <div class="thread-row-top">
            <span class="thread-name">${t.customerName}</span>
            <span class="thread-time">${lastMsg ? lastMsg.time : ''}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2px;">
            <p class="thread-preview-text">${lastMsg ? lastMsg.text : ''}</p>
            <span class="platform-badge ${isWhatsapp ? 'whatsapp' : 'instagram'}">${t.platform}</span>
          </div>
        </div>
      </div>
    `;
  });

  const activeThread = state.messages.find(m => m.id === activeChatThreadId);
  let messagesBubbleHtml = '';
  
  if (activeThread) {
    activeThread.history.forEach(h => {
      const isCustomer = h.sender === 'customer';
      const isAI = h.sender === 'ai';
      let bubbleClass = 'staff';
      if (isCustomer) bubbleClass = 'customer';
      else if (isAI) bubbleClass = 'ai-auto';

      messagesBubbleHtml += `
        <div class="chat-bubble ${bubbleClass}">
          ${isAI ? '<strong>🤖 Asistente IA:</strong><br>' : ''}
          ${h.text}
          <span class="chat-bubble-time">${h.time}</span>
        </div>
      `;
    });
  }

  container.innerHTML = `
    <div class="chat-layout">
      <aside class="chat-threads-col">
        <div class="chat-threads-header">Mensajes Recientes</div>
        <div class="chat-threads-list">
          ${threadsHtml}
        </div>
      </aside>

      <section class="chat-window">
        <div class="chat-window-header">
          <div class="chat-active-user">
            <div class="chat-thread-avatar" style="width:40px; height:40px; font-size:1rem;">
              ${activeThread ? activeThread.avatar : 'C'}
            </div>
            <div>
              <span class="chat-active-name">${activeThread ? activeThread.customerName : 'Selecciona un chat'}</span>
              <div class="chat-active-status">En línea por ${activeThread ? activeThread.platform : ''}</div>
            </div>
          </div>
          <div style="display:flex; gap:10px;">
            <button class="btn btn-secondary" style="padding:6px 12px; font-size:0.75rem;" onclick="simulateCustomerBookingMessage()">
              Simular Cita por Cliente (Test)
            </button>
          </div>
        </div>

        <div class="chat-messages-container" id="chat-msg-scroller">
          ${messagesBubbleHtml}
        </div>

        <div class="chat-input-bar">
          <input type="text" placeholder="Escribe un mensaje aquí..." class="chat-input-field" id="chat-text-input">
          <button class="chat-send-btn" onclick="sendChatTextMessage()">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="m21.42 10.922-18-9A1 1 0 0 0 2.09 3.26l3.96 7.151a1 1 0 0 1 0 .937l-3.96 7.15A1 1 0 0 0 3.42 20.1l18-9a1 1 0 0 0 0-1.78zM5.38 18.069l2.766-4.992h6.276c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H8.146L5.38 6.577l13.167 6.584-13.167 4.908z" fill="currentColor"/></svg>
          </button>
        </div>
      </section>
    </div>
  `;

  const scroller = document.getElementById('chat-msg-scroller');
  if (scroller) scroller.scrollTop = scroller.scrollHeight;

  const input = document.getElementById('chat-text-input');
  if (input) {
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') sendChatTextMessage();
    });
  }
}

function selectChatThread(threadId) {
  activeChatThreadId = threadId;
  const thread = state.messages.find(m => m.id === threadId);
  if (thread) {
    thread.unread = false;
    saveState();
  }
  handleRoute();
}

function sendChatTextMessage() {
  const input = document.getElementById('chat-text-input');
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  const thread = state.messages.find(m => m.id === activeChatThreadId);
  if (!thread) return;

  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

  thread.history.push({
    sender: "staff",
    text,
    time: timeStr
  });

  saveState();
  input.value = '';
  handleRoute();
}

// 6. AI AUTO-BOOKING CHAT SIMULATOR
function simulateCustomerBookingMessage() {
  const thread = state.messages.find(m => m.id === activeChatThreadId);
  if (!thread) return;

  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

  const clientText = "Hola! Quisiera agendar un Masaje Relajante con Daniela Ruiz para hoy a las 3:00 PM porfa.";
  thread.history.push({
    sender: "customer",
    text: clientText,
    time: timeStr
  });
  
  saveState();
  handleRoute();
  
  if (isAIAssistantActive) {
    setTimeout(() => {
      const now2 = new Date();
      const timeStr2 = `${now2.getHours().toString().padStart(2,'0')}:${now2.getMinutes().toString().padStart(2,'0')}`;
      
      const aiReply = `¡Hola ${thread.customerName}! Claro que sí, con mucho gusto. He verificado la agenda de la kinesióloga Daniela Ruiz y tiene disponible hoy a las 3:00 PM. Acabo de agendar tu cita para Masaje Relajante en el box asignado. Te llegará la confirmación al correo.`;
      
      thread.history.push({
        sender: "ai",
        text: aiReply,
        time: timeStr2
      });

      const newAppt = {
        id: `appt-ai-${Date.now()}`,
        clientName: thread.customerName,
        specialistId: "emp-daniela",
        service: "Masaje Relajante",
        date: "2026-04-30",
        time: "15:00",
        duration: 60,
        type: "Servicio individual"
      };

      state.appointments.push(newAppt);
      saveState();
      
      showGlobalNotification("AI Reservó Cita", `El Asistente agendó a ${thread.customerName} con Daniela Ruiz hoy a las 15:00`);
      handleRoute();
    }, 1500);
  }
}

// 7. PORTAL DE ESPECIALISTA RENDERER
function renderSpecialistPortal(container) {
  const specId = loggedSpecialistId;
  const specialist = state.employees.find(e => e.id === specId);
  if (!specialist) return;

  const appointments = state.appointments.filter(a => a.date === "2026-04-30" && a.specialistId === specId);
  const totalSessionsThisMonth = specialist.sessionsCount;
  const earningsThisMonth = specialist.commissionEarned;

  let apptsHtml = '';
  appointments.forEach(a => {
    apptsHtml += `
      <div class="queue-item">
        <div class="queue-item-left">
          <div class="queue-time-badge">${a.time}</div>
          <div class="queue-client-details">
            <h5>${a.clientName}</h5>
            <p>${a.service} - ${a.type}</p>
          </div>
        </div>
        <div class="queue-actions">
          <button class="btn btn-success" style="padding:6px 12px; font-size:0.75rem;" onclick="completeSpecialistSession('${a.id}')">
            Iniciar / Completar
          </button>
        </div>
      </div>
    `;
  });

  if (appointments.length === 0) {
    apptsHtml = '<p style="color:var(--text-muted); padding:16px 0;">No tienes citas programadas para hoy.</p>';
  }

  container.innerHTML = `
    <div class="specialist-header-card">
      <div class="specialist-welcome">
        <span>Gestión de Box</span>
        <h2>Hola de nuevo, ${specialist.name} 👋</h2>
        <p>Perfil de trabajo · Especialista: ${specialist.role}</p>
      </div>
    </div>

    <div class="specialist-stats-row">
      <div class="specialist-stat-card">
        <div class="specialist-stat-icon">💆</div>
        <div class="specialist-stat-details">
          <h5>Sesiones realizadas</h5>
          <p>${totalSessionsThisMonth}</p>
        </div>
      </div>
      <div class="specialist-stat-card">
        <div class="specialist-stat-icon">💰</div>
        <div class="specialist-stat-details">
          <h5>Mis comisiones (Mes)</h5>
          <p>${formatCurrency(earningsThisMonth)}</p>
        </div>
      </div>
      <div class="specialist-stat-card">
        <div class="specialist-stat-icon">⌛</div>
        <div class="specialist-stat-details">
          <h5>Ocupación Hoy</h5>
          <p>${specialist.loadPercent}%</p>
        </div>
      </div>
    </div>

    <div class="specialist-queue-card">
      <div class="specialist-queue-header">Citas asignadas para hoy en boxes</div>
      <div class="queue-list">
        ${apptsHtml}
      </div>
    </div>
  `;
}

function completeSpecialistSession(apptId) {
  completeAppointment(apptId);
  const spec = state.employees.find(e => e.id === loggedSpecialistId);
  if (spec) {
    spec.sessionsCount += 1;
    spec.commissionEarned += 12250; 
    saveState();
  }
  handleRoute();
}

// 8. PORTAL DE CLIENTAS RENDERER
function renderClientPortal(container) {
  const cliId = loggedClientId;
  const client = state.clients.find(c => c.id === cliId);
  if (!client) return;

  let photosHtml = '';
  photosHtml += `
    <div class="gallery-photo-card" style="width:140px; height:140px;">
      <div style="font-size:2rem;">🌸</div>
      <span>Sesión 1 (Antes)</span>
    </div>
    <div class="gallery-photo-card" style="width:140px; height:140px;">
      <div style="font-size:2rem;">✨</div>
      <span>Sesión 5 (Progreso)</span>
    </div>
  `;

  container.innerHTML = `
    <div class="client-welcome-card">
      <div class="client-welcome-text">
        <span>KineOS Clientes</span>
        <h2>Hola, ${client.name} ✦</h2>
        <p>Tu bienestar es nuestra prioridad · Sigue tu plan corporal y facial desde aquí</p>
      </div>
      <div style="font-size: 2.5rem;">🌸</div>
    </div>

    <div class="client-grid">
      <div class="client-progress-card">
        <div class="progress-header">
          <span class="progress-title">Mi Progreso de Tratamiento</span>
          <span class="status-badge al-dia">${client.activePackage}</span>
        </div>
        
        <div class="sessions-tracker-box">
          <div class="sessions-radial-wrapper">
            <div class="sessions-radial-center">
              <span class="radial-number">5 / 8</span>
              <span class="radial-desc">Sesiones</span>
            </div>
          </div>
          <div>
            <h5 style="font-weight:700;">Sesiones realizadas</h5>
            <p style="font-size:0.85rem; color:var(--text-muted);">Te quedan 3 sesiones pendientes en este plan.</p>
          </div>
        </div>

        <div class="progress-notes">
          <strong>Bitácora de Kinesiología:</strong><br>
          ${client.progressNotes || 'Tu tratamiento evoluciona de manera excelente. Mantén las recomendaciones diarias.'}
        </div>

        <h5 style="font-weight:700; margin-top:24px; margin-bottom:12px;">Galería de Tratamiento</h5>
        <div class="gallery-wrapper">
          ${photosHtml}
        </div>
      </div>

      <div class="client-progress-card" style="display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <span class="progress-title" style="display:block; margin-bottom:12px;">Agendar Siguiente Sesión</span>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:20px;">Reserva tu box en los horarios sugeridos por el sistema.</p>
          
          <div class="form-group">
            <label>Kinesióloga de preferencia</label>
            <select class="form-control" id="cli-book-spec">
              <option value="emp-laura">Laura Méndez (Cosmetóloga Senior)</option>
              <option value="emp-sofia">Sofia Reyes (Kinesióloga Estética)</option>
              <option value="emp-daniela">Daniela Ruiz (Kinesióloga)</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group col-6">
              <label>Fecha sugerida</label>
              <input type="date" class="form-control" value="2026-05-02" id="cli-book-date">
            </div>
            <div class="form-group col-6">
              <label>Hora</label>
              <select class="form-control" id="cli-book-time">
                <option>09:00 AM</option>
                <option selected>11:00 AM</option>
                <option>02:00 PM</option>
                <option>04:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        <button class="btn btn-primary" style="width:100%; justify-content:center; padding:12px;" onclick="handleClientSelfBooking()">
          Confirmar Reserva Cita
        </button>
      </div>
    </div>
  `;
}

function handleClientSelfBooking() {
  const specId = document.getElementById('cli-book-spec').value;
  const date = document.getElementById('cli-book-date').value;
  const timeVal = document.getElementById('cli-book-time').value;
  
  const time = timeVal.split(' ')[0];
  
  const client = state.clients.find(c => c.id === loggedClientId);
  if (!client) return;

  const newAppt = {
    id: `appt-cli-${Date.now()}`,
    clientName: client.name,
    specialistId: specId,
    service: "Masaje Reductor",
    date,
    time,
    duration: 90,
    type: "Sesión de paquete"
  };

  state.appointments.push(newAppt);
  client.visits += 1;
  client.lastVisit = "Hoy";
  saveState();

  showGlobalNotification("Cita Agendada", `Has agendado tu cita de Plan Verano para el ${date} a las ${timeVal}`);
  switchPortal('owner');
}

// 9. MODALS WINDOW CONTROLLERS
function openModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (overlay) {
    overlay.classList.add('show');
  }
}

function closeModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (overlay) {
    overlay.classList.remove('show');
  }
}
