// TallerOS - Seed Data (Automotive Dent & Paint Workshop Localization)
window.AUTOCENTER_DEFAULT_DATA = {
  clinicInfo: { // Keeping the clinicInfo key internally to prevent app.js breaking, but rebranding labels
    name: "AutoCenter",
    tagline: "AutoCenter · Pro Chile",
    rif: "76.402.154-3", // Workshop RUT
    phone: "+56 9 1234 5678",
    email: "contacto@autocenter.cl",
    address: "Av. Alemania 0890 - Temuco",
    description: "Taller boutique especializado en desabolladura, pintura de alta gama y detailing automotriz con tecnología de secado premium.",
    exchangeRate: 37940, // Value of 1 UF in Chilean Pesos (CLP)
    activeSede: "Sede Temuco - General",
    sedes: [
      { id: "sede-1", name: "Sede Temuco - General", address: "Av. Alemania 0890 - Temuco" },
      { id: "sede-2", name: "Sede Temuco - Autos de Carrera", address: "Camino Aeródromo s/n - Temuco" }
    ],
    operatingHours: {
      weekday: "08:30 - 18:30",
      saturday: "09:00 - 14:00",
      sunday: "Cerrado"
    }
  },

  employees: [
    {
      id: "emp-laura",
      name: "Laura Méndez",
      email: "laura@autocenter.cl", // Login email
      role: "Pintora Senior",
      avatar: "laura",
      paymentType: "Comisión 35%",
      commissionRate: 0.35,
      loadPercent: 75,
      sessionsCount: 12,
      commissionEarned: 1701000,
      totalEarnings: 4860000
    },
    {
      id: "emp-sofia",
      name: "Sofia Reyes",
      email: "sofia@autocenter.cl", // Login email
      role: "Desabolladora Senior",
      avatar: "sofia",
      paymentType: "Comisión 30%",
      commissionRate: 0.30,
      loadPercent: 58,
      sessionsCount: 9,
      commissionEarned: 882000,
      totalEarnings: 2940000
    },
    {
      id: "emp-daniela",
      name: "Daniela Ruiz",
      email: "daniela@autocenter.cl",
      role: "Pintora / Preparadora",
      avatar: "daniela",
      paymentType: "Mixto - 20%",
      commissionRate: 0.20,
      loadPercent: 68,
      sessionsCount: 11,
      commissionEarned: 972000,
      totalEarnings: 3360000
    },
    {
      id: "emp-carmen",
      name: "Carmen Vega",
      email: "carmen@autocenter.cl",
      role: "Técnica Detailing",
      avatar: "carmen",
      paymentType: "Salario fijo",
      commissionRate: 0.00,
      loadPercent: 38,
      sessionsCount: 6,
      commissionEarned: 488000,
      totalEarnings: 1820000
    },
    {
      id: "emp-valeria",
      name: "Valeria Soto",
      email: "valeria@autocenter.cl",
      role: "Desabolladora Junior",
      avatar: "valeria",
      paymentType: "Comisión 25%",
      commissionRate: 0.25,
      loadPercent: 45,
      sessionsCount: 8,
      commissionEarned: 405000,
      totalEarnings: 1620000
    }
  ],

  clients: [
    {
      id: "cli-ana",
      name: "Ana Martinez",
      email: "ana@autocenter.cl", // Login email
      cedula: "12.345.678-9",
      phone: "+56 9 8765 4321",
      activePackage: "Mazda 3 (KRPW-24)", // Stores vehicle details
      visits: 4,
      lastVisit: "Hoy",
      status: "Al día",
      debt: 0,
      progressPhotos: ["car_progress_1.jpg", "car_progress_2.jpg", "car_progress_3.jpg"],
      progressNotes: "Desabolladura de tapabarro delantero y puerta completada. Aplicada base y primera mano de color. Secando laca en horno."
    },
    {
      id: "cli-gabriela",
      name: "Gabriela Torres",
      email: "gaby@autocenter.cl", // Login email
      cedula: "15.667.122-3",
      phone: "+56 9 7654 3210",
      activePackage: "Toyota RAV4 (HGTT-12)",
      visits: 2,
      lastVisit: "Hoy",
      status: "Debe $120.000",
      debt: 120000,
      progressPhotos: ["car_gaby_1.jpg", "car_gaby_2.jpg"],
      progressNotes: "Parachoques trasero desmontado para soldadura de fisura. Pintado en cabina finalizado. Pendiente pulido de integración."
    },
    {
      id: "cli-fernanda",
      name: "Fernanda Diaz",
      email: "fer.diaz@out.com",
      cedula: "18.221.776-K",
      phone: "+56 9 6543 2109",
      activePackage: "Subaru XV (PPLD-88)",
      visits: 6,
      lastVisit: "Hoy",
      status: "Al día",
      debt: 0,
      progressPhotos: ["car_fer_1.jpg"],
      progressNotes: "Tratamiento cerámico de pintura de 3 capas completado. Curado UV en curso para sellado de brillo."
    },
    {
      id: "cli-valentina",
      name: "Valentina Cruz",
      email: "vcruz@gmail.com",
      cedula: "20.114.998-2",
      phone: "+56 9 5432 1098",
      activePackage: "Chevrolet Sail (LDDS-55)",
      visits: 1,
      lastVisit: "Hoy",
      status: "Debe $40.000",
      debt: 40000,
      progressPhotos: [],
      progressNotes: "Inspección de daños para presupuesto de aseguradora Liberty completada. Esperando orden de trabajo emitida."
    },
    {
      id: "cli-isabella",
      name: "Isabella Núñez",
      email: "inunez@gmail.com",
      cedula: "19.776.123-5",
      phone: "+56 9 4321 0987",
      activePackage: "Ford Ranger (WTFF-99)",
      visits: 3,
      lastVisit: "Hoy",
      status: "Al día",
      debt: 0,
      progressPhotos: [],
      progressNotes: "Pintado de portalón trasero completado. Desengrasado, lijado e imprimación listos. Entregado a control de calidad."
    },
    {
      id: "cli-andrea",
      name: "Andrea Silva",
      email: "asilva@gmail.com",
      cedula: "16.554.221-K",
      phone: "+56 9 3210 9876",
      activePackage: "Suzuki Swift (JSDF-32)",
      visits: 3,
      lastVisit: "Hoy",
      status: "Al día",
      debt: 0,
      progressPhotos: [],
      progressNotes: "Pulido de carrocería en 3 pasos finalizado. Eliminados micro-rayones y hologramas. Lavado e hidrofugado listos."
    },
    {
      id: "cli-sandra",
      name: "Sandra Ortega",
      email: "sortega@gmail.com",
      cedula: "14.998.776-7",
      phone: "+56 9 2109 8765",
      activePackage: "Jeep Cherokee (LKDS-77)",
      visits: 1,
      lastVisit: "Hoy",
      status: "Debe $80.000",
      debt: 80000,
      progressPhotos: [],
      progressNotes: "Presupuesto por golpe lateral derecho aprobado. Esperando ingreso del vehículo al taller el próximo lunes."
    }
  ],

  transactions: [
    {
      id: "tx-1",
      date: "2026-04-30T10:24:00",
      concept: "Pintura Parachoques Delantero",
      client: "Gabriela Torres",
      method: "Transferencia",
      type: "Ingreso",
      amount: 120000
    },
    {
      id: "tx-2",
      date: "2026-04-30T09:50:00",
      concept: "Convenio Pintura Lateral (4 pz)",
      client: "Andrea Silva",
      method: "Transferencia",
      type: "Ingreso",
      amount: 450000
    },
    {
      id: "tx-3",
      date: "2026-04-30T09:12:00",
      concept: "Compra Pintura Sherwin-Williams",
      client: "Sherwin Auto Chile",
      method: "Webpay",
      type: "Egreso",
      amount: 420000
    },
    {
      id: "tx-4",
      date: "2026-04-29T18:30:00",
      concept: "Desabolladura Guardabarros",
      client: "Isabella Núñez",
      method: "Efectivo",
      type: "Ingreso",
      amount: 110000
    },
    {
      id: "tx-5",
      date: "2026-04-29T16:00:00",
      concept: "Cuenta de Luz Enel Taller",
      client: "Enel Distribución",
      method: "Transferencia",
      type: "Egreso",
      amount: 88000
    },
    {
      id: "tx-6",
      date: "2026-04-29T14:45:00",
      concept: "Pintura Completa Horno (Siniestro)",
      client: "Fernanda Diaz",
      method: "Transferencia",
      type: "Ingreso",
      amount: 1400000
    },
    { id: "tx-7", date: "2026-04-28T11:00:00", concept: "Abono Desabolladura Capó", client: "Ana Martinez", method: "Webpay", type: "Ingreso", amount: 350000 },
    { id: "tx-8", date: "2026-04-28T15:20:00", concept: "Tratamiento Cerámico Completo", client: "Valentina Cruz", method: "MACH", type: "Ingreso", amount: 280000 },
    { id: "tx-9", date: "2026-04-27T10:00:00", concept: "Lijadora Orbital e Insumos", client: "Piston Herramientas", method: "Transferencia", type: "Egreso", amount: 1200000 },
    { id: "tx-10", date: "2026-04-27T12:00:00", concept: "Pintura Piezas Suzuki Fintoc", client: "Sandra Ortega", method: "Fintoc", type: "Ingreso", amount: 150000 },
    { id: "tx-11", date: "2026-04-26T16:40:00", concept: "Abono Prepago Reparación", client: "Fernanda Diaz", method: "Chek", type: "Ingreso", amount: 540000 },
    { id: "tx-12", date: "2026-04-26T14:00:00", concept: "Pulido 3 Pasos Redcompra", client: "Isabella Núñez", method: "Redcompra", type: "Ingreso", amount: 180000 },
    { id: "tx-13", date: "2026-04-25T11:30:00", concept: "Arriendo Galpón Comercial", client: "Inmobiliaria Andes", method: "Transferencia", type: "Egreso", amount: 1472000 },
    { id: "tx-14", date: "2026-04-25T15:00:00", concept: "Reparación Completa Flota", client: "Andrea Silva", method: "Redcompra", type: "Ingreso", amount: 2000000 },
    { id: "tx-15", date: "2026-04-24T10:15:00", concept: "Abono Presupuesto Detailing", client: "Gabriela Torres", method: "MACH", type: "Ingreso", amount: 200000 },
    { id: "tx-16", date: "2026-04-24T12:00:00", concept: "Pago Reparación Siniestro", client: "Valentina Cruz", method: "Webpay", type: "Ingreso", amount: 970000 },
    { id: "tx-17", date: "2026-04-23T11:00:00", concept: "Abono Pintura Puerta Jeep", client: "Sandra Ortega", method: "Mercado Pago", type: "Ingreso", amount: 980000 },
    { id: "tx-18", date: "2026-04-23T14:30:00", concept: "Compra Insumos (Lijas, Cinta)", client: "Sodimac Constructor", method: "MACH", type: "Egreso", amount: 52000 },
    { id: "tx-19", date: "2026-04-22T09:00:00", concept: "Pago Reparación Particular", client: "Ana Martinez", method: "Efectivo", type: "Ingreso", amount: 165000 },
    { id: "tx-20", date: "2026-04-22T16:00:00", concept: "Abono Pulido Cerámico", client: "Isabella Núñez", method: "MACH", type: "Ingreso", amount: 400000 },
    { id: "tx-21", date: "2026-04-21T11:30:00", concept: "Pago Internet Fibra Gtd", client: "GTD Manquehue", method: "Transferencia", type: "Egreso", amount: 45000 },
    { id: "tx-22", date: "2026-04-21T15:00:00", concept: "Pintura Parachoques Fintoc", client: "Gabriela Torres", method: "Fintoc", type: "Ingreso", amount: 170000 },
    { id: "tx-23", date: "2026-04-20T10:00:00", concept: "Desabolladura Puerta", client: "Andrea Silva", method: "Redcompra", type: "Ingreso", amount: 150000 },
    { id: "tx-24", date: "2026-04-20T15:00:00", concept: "Calibración Pistolas y Filtros", client: "ServiHorno Chile", method: "Efectivo", type: "Egreso", amount: 150000 },
    { id: "tx-25", date: "2026-04-19T11:00:00", concept: "Efectivo Caja Chica Taller", client: "Fernanda Diaz", method: "Efectivo", type: "Ingreso", amount: 55000 },
    { id: "tx-26", date: "2026-04-19T13:00:00", concept: "Artículos Aseo Galpón", client: "Líder Mayorista", method: "MACH", type: "Egreso", amount: 25000 },
    { id: "tx-27", date: "2026-04-18T16:00:00", concept: "Pago Comisiones Quincena Staff", client: "Técnicos AutoCenter", method: "Transferencia", type: "Egreso", amount: 200000 }
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

  appointments: [ // scheduled jobs in bays
    // Laura Méndez (Pintora Senior - Bay 1)
    {
      id: "appt-1",
      clientName: "Ana Martinez",
      specialistId: "emp-laura",
      service: "Pintura de Parachoques",
      date: "2026-04-30",
      time: "08:30",
      duration: 90,
      type: "Convenio Seguro"
    },
    {
      id: "appt-2",
      clientName: "Valentina Cruz",
      specialistId: "emp-laura",
      service: "Pintura de Puerta",
      date: "2026-04-30",
      time: "10:30",
      duration: 90,
      type: "Convenio Seguro"
    },
    {
      id: "appt-3",
      clientName: "María López",
      specialistId: "emp-laura",
      service: "Pintura de Guardabarros",
      date: "2026-04-30",
      time: "12:30",
      duration: 60,
      type: "Servicio Particular"
    },
    {
      id: "appt-4",
      clientName: "Patricia Mora",
      specialistId: "emp-laura",
      service: "Presupuesto y Daños",
      date: "2026-04-30",
      time: "14:00",
      duration: 90,
      type: "Presupuesto Daños"
    },
    {
      id: "appt-5",
      clientName: "Luisa Herrera",
      specialistId: "emp-laura",
      service: "Pintura de Parachoques",
      date: "2026-04-30",
      time: "16:00",
      duration: 60,
      type: "Convenio Seguro"
    },

    // Sofia Reyes (Desabolladora Senior - Bay 2)
    {
      id: "appt-6",
      clientName: "Gabriela Torres",
      specialistId: "emp-sofia",
      service: "Desabolladura de Puerta",
      date: "2026-04-30",
      time: "08:30",
      duration: 60,
      type: "Servicio Particular"
    },
    {
      id: "appt-7",
      clientName: "Isabella Núñez",
      specialistId: "emp-sofia",
      service: "Desabolladura de Guardabarros",
      date: "2026-04-30",
      time: "10:00",
      duration: 60,
      type: "Servicio Particular"
    },
    {
      id: "appt-8",
      clientName: "Camila Pérez",
      specialistId: "emp-sofia",
      service: "Desabolladura de Capó",
      date: "2026-04-30",
      time: "11:30",
      duration: 60,
      type: "Servicio Particular"
    },
    {
      id: "appt-9",
      clientName: "Natalia Gómez",
      specialistId: "emp-sofia",
      service: "Presupuesto y Daños",
      date: "2026-04-30",
      time: "13:30",
      duration: 90,
      type: "Presupuesto Daños"
    },

    // Daniela Ruiz (Preparadora / Pintora - Bay 3)
    {
      id: "appt-10",
      clientName: "Fernanda Diaz",
      specialistId: "emp-daniela",
      service: "Pintura de Puerta",
      date: "2026-04-30",
      time: "08:30",
      duration: 90,
      type: "Convenio Seguro"
    },
    {
      id: "appt-11",
      clientName: "Andrea Silva",
      specialistId: "emp-daniela",
      service: "Pintura de Parachoques",
      date: "2026-04-30",
      time: "10:30",
      duration: 90,
      type: "Servicio Particular"
    },
    {
      id: "appt-12",
      clientName: "Mónica Soto",
      specialistId: "emp-daniela",
      service: "Pintura de Guardabarros",
      date: "2026-04-30",
      time: "12:30",
      duration: 60,
      type: "Servicio Particular"
    },
    {
      id: "appt-13",
      clientName: "Carolina Rios",
      specialistId: "emp-daniela",
      service: "Pintura de Capó",
      date: "2026-04-30",
      time: "14:00",
      duration: 60,
      type: "Servicio Particular"
    },
    {
      id: "appt-14",
      clientName: "Paola Vargas",
      specialistId: "emp-daniela",
      service: "Pintura de Puerta",
      date: "2026-04-30",
      time: "15:30",
      duration: 90,
      type: "Servicio Particular"
    },

    // Carmen Vega (Detailing - Bay 4)
    {
      id: "appt-15",
      clientName: "Sandra Ortega",
      specialistId: "emp-carmen",
      service: "Pulido Completo",
      date: "2026-04-30",
      time: "08:30",
      duration: 90,
      type: "Servicio Particular"
    },
    {
      id: "appt-16",
      clientName: "Viviana Castro",
      specialistId: "emp-carmen",
      service: "Tratamiento Cerámico",
      date: "2026-04-30",
      time: "10:30",
      duration: 60,
      type: "Servicio Particular"
    },
    {
      id: "appt-17",
      clientName: "Rebeca Fuentes",
      specialistId: "emp-carmen",
      service: "Pulido Completo",
      date: "2026-04-30",
      time: "12:00",
      duration: 90,
      type: "Servicio Particular"
    },
    {
      id: "appt-18",
      clientName: "Lorena Aguilar",
      specialistId: "emp-carmen",
      service: "Tratamiento Cerámico",
      date: "2026-04-30",
      time: "14:00",
      duration: 60,
      type: "Servicio Particular"
    },
    {
      id: "appt-19",
      clientName: "Teresa Blanco",
      specialistId: "emp-carmen",
      service: "Presupuesto y Daños",
      date: "2026-04-30",
      time: "15:30",
      duration: 60,
      type: "Presupuesto Daños"
    }
  ],

  services: [
    { name: "Pintura de Parachoques", price: 120000, duration: 60 },
    { name: "Desabolladura de Puerta", price: 150000, duration: 90 },
    { name: "Pintura de Puerta", price: 140000, duration: 60 },
    { name: "Pulido Completo", price: 180000, duration: 60 },
    { name: "Desabolladura de Guardabarros", price: 110000, duration: 60 },
    { name: "Pintura de Guardabarros", price: 100000, duration: 90 },
    { name: "Tratamiento Cerámico", price: 280000, duration: 90 },
    { name: "Desabolladura de Capó", price: 160000, duration: 90 },
    { name: "Pintura de Capó", price: 180000, duration: 90 },
    { name: "Presupuesto y Daños", price: 0, duration: 30 }
  ],

  packages: [
    { name: "Pintura Lateral Completa", sessions: 4, price: 450000 },
    { name: "Desabolladura y Pintura Frontal", sessions: 3, price: 380000 },
    { name: "Detalle y Cerámico Pro", sessions: 2, price: 350000 },
    { name: "Pack Express Parachoques", sessions: 2, price: 200000 }
  ],

  messages: [
    {
      id: "msg-1",
      customerName: "Gabriela Torres",
      platform: "WhatsApp",
      avatar: "G",
      unread: true,
      history: [
        { sender: "customer", text: "Hola! Quisiera agendar un presupuesto para pintar el parachoques delantero de mi auto para mañana porfa", time: "08:15" }
      ]
    },
    {
      id: "msg-2",
      customerName: "Valentina Cruz",
      platform: "Instagram",
      avatar: "V",
      unread: true,
      history: [
        { sender: "customer", text: "Buenas, a qué hora tienen disponible para ingresar un auto por desabolladura de puerta hoy?", time: "07:30" }
      ]
    },
    {
      id: "msg-3",
      customerName: "Sandra Ortega",
      platform: "WhatsApp",
      avatar: "S",
      unread: false,
      history: [
        { sender: "customer", text: "Hola, ¿aceptan pago con Redcompra o Webpay para el deducible del seguro?", time: "Ayer" },
        { sender: "staff", text: "Hola Sandra! Sí, aceptamos Redcompra directo en taller, Webpay online, transferencia electrónica, y MACH/Chek.", time: "Ayer" }
      ]
    },
    {
      id: "msg-4",
      customerName: "Isabella Núñez",
      platform: "WhatsApp",
      avatar: "I",
      unread: false,
      history: [
        { sender: "customer", text: "Me encantó el acabado de pintura del capó, quedó idéntico al color original!", time: "Ayer" },
        { sender: "staff", text: "Qué alegría leer eso Isabella! Trabajamos con códigos de color de fábrica. Nos vemos en tu próxima mantención.", time: "Ayer" }
      ]
    }
  ]
};
