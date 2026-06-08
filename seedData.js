// KineOS - Seed Data (Chile Localization with Auth support)
window.ESTHETIC_OS_DEFAULT_DATA = {
  clinicInfo: {
    name: "KineEstética Cordillera",
    tagline: "KineOS · Pro Chile",
    rif: "76.402.154-3",
    phone: "+56 9 1234 5678",
    email: "contacto@kinecordillera.cl",
    address: "Av. Vitacura 3568, Piso 4 - Vitacura, Santiago",
    description: "Centro de kinesiología estética integral especializado en tratamientos corporales y faciales con tecnología avanzada.",
    exchangeRate: 37940, // Value of 1 UF in Chilean Pesos (CLP)
    activeSede: "Sucursal Vitacura",
    sedes: [
      { id: "sede-1", name: "Sucursal Vitacura", address: "Av. Vitacura 3568 - Vitacura" },
      { id: "sede-2", name: "Sucursal Las Condes", address: "Av. Manquehue Sur 520 - Las Condes" }
    ],
    operatingHours: {
      weekday: "08:00 - 18:00",
      saturday: "09:00 - 16:00",
      sunday: "Cerrado"
    }
  },

  employees: [
    {
      id: "emp-laura",
      name: "Laura Méndez",
      email: "laura@kineos.cl", // Login email
      role: "Cosmetóloga Senior",
      avatar: "laura",
      paymentType: "Comisión 35%",
      commissionRate: 0.35,
      loadPercent: 75,
      sessionsCount: 124,
      commissionEarned: 1701000,
      totalEarnings: 4860000
    },
    {
      id: "emp-sofia",
      name: "Sofia Reyes",
      email: "sofia@kineos.cl", // Login email
      role: "Kinesióloga Estética",
      avatar: "sofia",
      paymentType: "Comisión 30%",
      commissionRate: 0.30,
      loadPercent: 58,
      sessionsCount: 78,
      commissionEarned: 882000,
      totalEarnings: 2940000
    },
    {
      id: "emp-daniela",
      name: "Daniela Ruiz",
      email: "daniela@kineos.cl",
      role: "Kinesióloga",
      avatar: "daniela",
      paymentType: "Mixto - 20%",
      commissionRate: 0.20,
      loadPercent: 68,
      sessionsCount: 96,
      commissionEarned: 972000,
      totalEarnings: 3360000
    },
    {
      id: "emp-carmen",
      name: "Carmen Vega",
      email: "carmen@kineos.cl",
      role: "Kinesióloga",
      avatar: "carmen",
      paymentType: "Salario fijo",
      commissionRate: 0.00,
      loadPercent: 38,
      sessionsCount: 52,
      commissionEarned: 488000,
      totalEarnings: 1820000
    },
    {
      id: "emp-valeria",
      name: "Valeria Soto",
      email: "valeria@kineos.cl",
      role: "Masoterapeuta",
      avatar: "valeria",
      paymentType: "Comisión 25%",
      commissionRate: 0.25,
      loadPercent: 45,
      sessionsCount: 71,
      commissionEarned: 405000,
      totalEarnings: 1620000
    }
  ],

  clients: [
    {
      id: "cli-ana",
      name: "Ana Martinez",
      email: "ana@kineos.cl", // Login email
      cedula: "12.345.678-9",
      phone: "+56 9 8765 4321",
      activePackage: "Plan Verano",
      visits: 14,
      lastVisit: "Hoy",
      status: "Al día",
      debt: 0,
      progressPhotos: ["progress_ana_1.jpg", "progress_ana_2.jpg", "progress_ana_3.jpg"],
      progressNotes: "Drenaje en abdomen muestra excelente respuesta. Reducción de 3cm de circunferencia desde la sesión 1."
    },
    {
      id: "cli-gabriela",
      name: "Gabriela Torres",
      email: "gaby@kineos.cl", // Login email
      cedula: "15.667.122-3",
      phone: "+56 9 7654 3210",
      activePackage: "Reducción Total",
      visits: 8,
      lastVisit: "Hoy",
      status: "Debe $120.000",
      debt: 120000,
      progressPhotos: ["progress_gaby_1.jpg", "progress_gaby_2.jpg"],
      progressNotes: "Radiofrecuencia facial. Piel visiblemente más tensa en contorno mandibular. Pendiente pago de cuota final."
    },
    {
      id: "cli-fernanda",
      name: "Fernanda Diaz",
      email: "fer.diaz@out.com",
      cedula: "18.221.776-K",
      phone: "+56 9 6543 2109",
      activePackage: "Paquete Cordillera Beauty",
      visits: 22,
      lastVisit: "Hoy",
      status: "Al día",
      debt: 0,
      progressPhotos: ["progress_fer_1.jpg"],
      progressNotes: "Depilación y masajes relajantes. Evolución de elasticidad muscular positiva. Sesiones al día."
    },
    {
      id: "cli-valentina",
      name: "Valentina Cruz",
      email: "vcruz@gmail.com",
      cedula: "20.114.998-2",
      phone: "+56 9 5432 1098",
      activePackage: "Plan Verano",
      visits: 6,
      lastVisit: "Hoy",
      status: "Debe $40.000",
      debt: 40000,
      progressPhotos: [],
      progressNotes: "Tratamiento de drenaje post-operatorio. Reducción progresiva de edema."
    },
    {
      id: "cli-isabella",
      name: "Isabella Núñez",
      email: "inunez@gmail.com",
      cedula: "19.776.123-5",
      phone: "+56 9 4321 0987",
      activePackage: "Facial Glow x4",
      visits: 11,
      lastVisit: "Hoy",
      status: "Al día",
      debt: 0,
      progressPhotos: [],
      progressNotes: "Microdermoabrasión facial. Piel revitalizada, poros reducidos. Recomendar hidratación intensa."
    },
    {
      id: "cli-andrea",
      name: "Andrea Silva",
      email: "asilva@gmail.com",
      cedula: "16.554.221-K",
      phone: "+56 9 3210 9876",
      activePackage: "Plan Verano",
      visits: 9,
      lastVisit: "Hoy",
      status: "Al día",
      debt: 0,
      progressPhotos: [],
      progressNotes: "Tratamientos de tonificación. Mayor definición en cuádriceps y abdomen."
    },
    {
      id: "cli-sandra",
      name: "Sandra Ortega",
      email: "sortega@gmail.com",
      cedula: "14.998.776-7",
      phone: "+56 9 2109 8765",
      activePackage: "Sin paquete",
      visits: 3,
      lastVisit: "Hoy",
      status: "Debe $80.000",
      debt: 80000,
      progressPhotos: [],
      progressNotes: "Evaluación corporal inicial completada. Recomendado paquete de 8 sesiones."
    }
  ],

  transactions: [
    {
      id: "tx-1",
      date: "2026-04-30T10:24:00",
      concept: "Drenaje Linfático",
      client: "Gabriela Torres",
      method: "Transferencia",
      type: "Ingreso",
      amount: 45000
    },
    {
      id: "tx-2",
      date: "2026-04-30T09:50:00",
      concept: "Plan Verano (8 ses.)",
      client: "Andrea Silva",
      method: "Transferencia",
      type: "Ingreso",
      amount: 280000
    },
    {
      id: "tx-3",
      date: "2026-04-30T09:12:00",
      concept: "Compra de insumos",
      client: "KineSupply Chile",
      method: "Webpay",
      type: "Egreso",
      amount: 420000
    },
    {
      id: "tx-4",
      date: "2026-04-29T18:30:00",
      concept: "Microdermoabrasión",
      client: "Isabella Núñez",
      method: "Efectivo",
      type: "Ingreso",
      amount: 55000
    },
    {
      id: "tx-5",
      date: "2026-04-29T16:00:00",
      concept: "Cuenta de Luz Enel",
      client: "Enel Distribución",
      method: "Transferencia",
      type: "Egreso",
      amount: 88000
    },
    {
      id: "tx-6",
      date: "2026-04-29T14:45:00",
      concept: "Paquete Cordillera Beauty",
      client: "Fernanda Diaz",
      method: "Transferencia",
      type: "Ingreso",
      amount: 1400000
    },
    { id: "tx-7", date: "2026-04-28T11:00:00", concept: "Abono Plan Reductor", client: "Ana Martinez", method: "Webpay", type: "Ingreso", amount: 350000 },
    { id: "tx-8", date: "2026-04-28T15:20:00", concept: "Servicios Varios", client: "Valentina Cruz", method: "MACH", type: "Ingreso", amount: 120000 },
    { id: "tx-9", date: "2026-04-27T10:00:00", concept: "Compra Insumos Médicos", client: "Dermik Chile", method: "Transferencia", type: "Egreso", amount: 1200000 },
    { id: "tx-10", date: "2026-04-27T12:00:00", concept: "Pago Sesión Fintoc", client: "Sandra Ortega", method: "Fintoc", type: "Ingreso", amount: 150000 },
    { id: "tx-11", date: "2026-04-26T16:40:00", concept: "Chek Pago Abono", client: "Fernanda Diaz", method: "Chek", type: "Ingreso", amount: 540000 },
    { id: "tx-12", date: "2026-04-26T14:00:00", concept: "Pago Débito Redcompra", client: "Isabella Núñez", method: "Redcompra", type: "Ingreso", amount: 480000 },
    { id: "tx-13", date: "2026-04-25T11:30:00", concept: "Pago Arriendo Local", client: "Inmobiliaria Andes", method: "Transferencia", type: "Egreso", amount: 1472000 },
    { id: "tx-14", date: "2026-04-25T15:00:00", concept: "Servicio Redcompra", client: "Andrea Silva", method: "Redcompra", type: "Ingreso", amount: 2000000 },
    { id: "tx-15", date: "2026-04-24T10:15:00", concept: "Abono MACH Cita", client: "Gabriela Torres", method: "MACH", type: "Ingreso", amount: 200000 },
    { id: "tx-16", date: "2026-04-24T12:00:00", concept: "Webpay Pago", client: "Valentina Cruz", method: "Webpay", type: "Ingreso", amount: 970000 },
    { id: "tx-17", date: "2026-04-23T11:00:00", concept: "Mercado Pago Abono", client: "Sandra Ortega", method: "Mercado Pago", type: "Ingreso", amount: 980000 },
    { id: "tx-18", date: "2026-04-23T14:30:00", concept: "Gastos Útiles Aseo", client: "Líder Supermercado", method: "MACH", type: "Egreso", amount: 52000 },
    { id: "tx-19", date: "2026-04-22T09:00:00", concept: "Pago Efectivo Clínico", client: "Ana Martinez", method: "Efectivo", type: "Ingreso", amount: 165000 },
    { id: "tx-20", date: "2026-04-22T16:00:00", concept: "MACH Abono", client: "Isabella Núñez", method: "MACH", type: "Ingreso", amount: 400000 },
    { id: "tx-21", date: "2026-04-21T11:30:00", concept: "Pago Internet Fibra Gtd", client: "GTD Manquehue", method: "Transferencia", type: "Egreso", amount: 45000 },
    { id: "tx-22", date: "2026-04-21T15:00:00", concept: "Fintoc Pago", client: "Gabriela Torres", method: "Fintoc", type: "Ingreso", amount: 170000 },
    { id: "tx-23", date: "2026-04-20T10:00:00", concept: "Servicios Redcompra", client: "Andrea Silva", method: "Redcompra", type: "Ingreso", amount: 20000 },
    { id: "tx-24", date: "2026-04-20T15:00:00", concept: "Mantención Calefactor", client: "Servicio Técnico Clima", method: "Efectivo", type: "Egreso", amount: 150000 },
    { id: "tx-25", date: "2026-04-19T11:00:00", concept: "Efectivo Caja Chica", client: "Fernanda Diaz", method: "Efectivo", type: "Ingreso", amount: 55000 },
    { id: "tx-26", date: "2026-04-19T13:00:00", concept: "Artículos Oficina", client: "Lápiz López", method: "MACH", type: "Egreso", amount: 25000 },
    { id: "tx-27", date: "2026-04-18T16:00:00", concept: "Pago Comisiones Quincena", client: "Staff KineOS", method: "Transferencia", type: "Egreso", amount: 200000 }
  ],

  monthlyStats: [
    { month: "May", income: 3200000, expense: 1200000 },
    { month: "Jun", income: 3500000, expense: 1300000 },
    { month: "Jul", income: 3800000, expense: 1500000 },
    { month: "Ago", income: 4000000, expense: 1650000 },
    { month: "Sep", income: 4200000, expense: 1800000 },
    { month: "Oct", income: 4800000, expense: 1900000 },
    { month: "Nov", income: 5100000, expense: 2100000 },
    { month: "Dic", income: 6500000, expense: 2500000 },
    { month: "Ene", income: 5800000, expense: 2200000 },
    { month: "Feb", income: 6200000, expense: 2350000 },
    { month: "Mar", income: 7400000, expense: 2800000 },
    { month: "Abr", income: 8420000, expense: 3180000 }
  ],

  appointments: [
    // Laura Méndez
    {
      id: "appt-1",
      clientName: "Ana Martinez",
      specialistId: "emp-laura",
      service: "Masaje Reductor",
      date: "2026-04-30",
      time: "08:00",
      duration: 90,
      type: "Sesión de paquete"
    },
    {
      id: "appt-2",
      clientName: "Valentina Cruz",
      specialistId: "emp-laura",
      service: "Drenaje Linfático",
      date: "2026-04-30",
      time: "09:30",
      duration: 90,
      type: "Sesión de paquete"
    },
    {
      id: "appt-3",
      clientName: "María López",
      specialistId: "emp-laura",
      service: "Microdermoabrasión",
      date: "2026-04-30",
      time: "11:30",
      duration: 60,
      type: "Servicio individual"
    },
    {
      id: "appt-4",
      clientName: "Patricia Mora",
      specialistId: "emp-laura",
      service: "Evaluación Corporal",
      date: "2026-04-30",
      time: "13:30",
      duration: 90,
      type: "Evaluación"
    },
    {
      id: "appt-5",
      clientName: "Luisa Herrera",
      specialistId: "emp-laura",
      service: "Masaje Reductor",
      date: "2026-04-30",
      time: "15:00",
      duration: 60,
      type: "Sesión de paquete"
    },

    // Sofia Reyes
    {
      id: "appt-6",
      clientName: "Gabriela Torres",
      specialistId: "emp-sofia",
      service: "Radiofrecuencia",
      date: "2026-04-30",
      time: "08:30",
      duration: 60,
      type: "Servicio individual"
    },
    {
      id: "appt-7",
      clientName: "Isabella Núñez",
      specialistId: "emp-sofia",
      service: "Microdermoabrasión",
      date: "2026-04-30",
      time: "09:30",
      duration: 60,
      type: "Servicio individual"
    },
    {
      id: "appt-8",
      clientName: "Camila Pérez",
      specialistId: "emp-sofia",
      service: "Facial Glow",
      date: "2026-04-30",
      time: "13:00",
      duration: 60,
      type: "Servicio individual"
    },
    {
      id: "appt-9",
      clientName: "Natalia Gómez",
      specialistId: "emp-sofia",
      service: "Evaluación Facial",
      date: "2026-04-30",
      time: "14:00",
      duration: 90,
      type: "Evaluación"
    },

    // Daniela Ruiz
    {
      id: "appt-10",
      clientName: "Fernanda Diaz",
      specialistId: "emp-daniela",
      service: "Masaje Anticelulítico",
      date: "2026-04-30",
      time: "08:00",
      duration: 90,
      type: "Sesión de paquete"
    },
    {
      id: "appt-11",
      clientName: "Andrea Silva",
      specialistId: "emp-daniela",
      service: "Velos Fríos",
      date: "2026-04-30",
      time: "09:30",
      duration: 90,
      type: "Servicio individual"
    },
    {
      id: "appt-12",
      clientName: "Mónica Soto",
      specialistId: "emp-daniela",
      service: "Masaje Relajante",
      date: "2026-04-30",
      time: "12:00",
      duration: 60,
      type: "Servicio individual"
    },
    {
      id: "appt-13",
      clientName: "Carolina Rios",
      specialistId: "emp-daniela",
      service: "Drenaje Linfático",
      date: "2026-04-30",
      time: "14:00",
      duration: 60,
      type: "Servicio individual"
    },
    {
      id: "appt-14",
      clientName: "Paola Vargas",
      specialistId: "emp-daniela",
      service: "Ultrasonido Cavit.",
      date: "2026-04-30",
      time: "16:30",
      duration: 90,
      type: "Servicio individual"
    },

    // Carmen Vega
    {
      id: "appt-15",
      clientName: "Sandra Ortega",
      specialistId: "emp-carmen",
      service: "Depilación Piernas",
      date: "2026-04-30",
      time: "08:30",
      duration: 90,
      type: "Servicio individual"
    },
    {
      id: "appt-16",
      clientName: "Viviana Castro",
      specialistId: "emp-carmen",
      service: "Depilación Axilas",
      date: "2026-04-30",
      time: "10:00",
      duration: 60,
      type: "Servicio individual"
    },
    {
      id: "appt-17",
      clientName: "Rebeca Fuentes",
      specialistId: "emp-carmen",
      service: "Depilación Full",
      date: "2026-04-30",
      time: "11:30",
      duration: 90,
      type: "Servicio individual"
    },
    {
      id: "appt-18",
      clientName: "Lorena Aguilar",
      specialistId: "emp-carmen",
      service: "Depilación Cejas",
      date: "2026-04-30",
      time: "13:30",
      duration: 60,
      type: "Servicio individual"
    },
    {
      id: "appt-19",
      clientName: "Teresa Blanco",
      specialistId: "emp-carmen",
      service: "Evaluación Piel",
      date: "2026-04-30",
      time: "14:30",
      duration: 60,
      type: "Evaluación"
    }
  ],

  services: [
    { name: "Drenaje Linfático", price: 35000, duration: 60 },
    { name: "Microdermoabrasión", price: 45000, duration: 60 },
    { name: "Radiofrecuencia", price: 50000, duration: 60 },
    { name: "Facial Glow", price: 40000, duration: 60 },
    { name: "Masaje Relajante", price: 30000, duration: 60 },
    { name: "Masaje Reductor", price: 40000, duration: 90 },
    { name: "Masaje Anticelulítico", price: 45000, duration: 90 },
    { name: "Velos Fríos", price: 35000, duration: 90 },
    { name: "Ultrasonido Cavit.", price: 50000, duration: 90 },
    { name: "Depilación Piernas", price: 25000, duration: 90 },
    { name: "Depilación Axilas", price: 12000, duration: 60 },
    { name: "Depilación Full", price: 60000, duration: 90 },
    { name: "Depilación Cejas", price: 8000, duration: 60 }
  ],

  packages: [
    { name: "Plan Verano", sessions: 8, price: 220000 },
    { name: "Reducción Total", sessions: 10, price: 280000 },
    { name: "Paquete Cordillera Beauty", sessions: 12, price: 350000 },
    { name: "Facial Glow x4", sessions: 4, price: 130000 }
  ],

  messages: [
    {
      id: "msg-1",
      customerName: "Gabriela Torres",
      platform: "WhatsApp",
      avatar: "G",
      unread: true,
      history: [
        { sender: "customer", text: "Hola! Quisiera agendar una cita de radiofrecuencia para mañana en la mañana porfa", time: "08:15" }
      ]
    },
    {
      id: "msg-2",
      customerName: "Valentina Cruz",
      platform: "Instagram",
      avatar: "V",
      unread: true,
      history: [
        { sender: "customer", text: "Buenas, a qué hora tienen disponible para drenaje linfático hoy?", time: "07:30" }
      ]
    },
    {
      id: "msg-3",
      customerName: "Sandra Ortega",
      platform: "WhatsApp",
      avatar: "S",
      unread: false,
      history: [
        { sender: "customer", text: "Hola, ¿aceptan transferencia electrónica o tarjeta de débito Redcompra?", time: "Ayer" },
        { sender: "staff", text: "Hola Sandra! Sí, aceptamos Redcompra directo en caja, Webpay online, transferencia electrónica, y MACH/Chek.", time: "Ayer" }
      ]
    },
    {
      id: "msg-4",
      customerName: "Isabella Núñez",
      platform: "WhatsApp",
      avatar: "I",
      unread: false,
      history: [
        { sender: "customer", text: "Me encantó la sesión de hoy, las kinesiólogas son super atentas!", time: "Ayer" },
        { sender: "staff", text: "Qué alegría leer eso Isabella! Nos vemos en tu próxima sesión.", time: "Ayer" }
      ]
    }
  ]
};
