export const MOCK_IPHONES = [
  {
    id: "1",
    model: "iPhone 15 Pro",
    capacity: "256GB",
    color: "Natural Titanium",
    condition: "Neuf",
    batteryLevel: 100,
    faceId: "OK",
    imei: "354678129034567",
    purchasePrice: 1200,
    sellingPrice: 1500,
    status: "Disponible",
    createdAt: "2024-01-10T10:00:00Z",
    defects: []
  },
  {
    id: "2",
    model: "iPhone 13",
    capacity: "128GB",
    color: "Midnight",
    condition: "Occasion",
    batteryLevel: 88,
    faceId: "OK",
    imei: "359988129034111",
    purchasePrice: 450,
    sellingPrice: 600,
    status: "Disponible",
    createdAt: "2024-01-12T14:30:00Z",
    defects: ["rayure_legere_ecran"]
  },
  {
    id: "3",
    model: "iPhone 11",
    capacity: "64GB",
    color: "White",
    condition: "Reconditionné",
    batteryLevel: 92,
    faceId: "Non",
    imei: "351122129034222",
    purchasePrice: 280,
    sellingPrice: 400,
    status: "Vendu",
    createdAt: "2024-01-05T09:15:00Z",
    defects: ["fissure_arriere"]
  }
];

export const MOCK_CUSTOMERS = [
  {
    id: "c1",
    name: "Moussa Diop",
    phone: "+221770000000",
    purchases: ["3"],
    notes: "Client régulier"
  },
  {
    id: "c2",
    name: "Fatou Kane",
    phone: "+221781112233",
    purchases: [],
    notes: ""
  }
];

export const MOCK_SALES = [
  {
    id: "s1",
    iphoneId: "3",
    customerId: "c1",
    totalAmount: 400,
    paidAmount: 400,
    paymentType: "Cash",
    date: "2024-01-15T16:00:00Z",
    status: "Payé"
  },
  {
    id: "s2",
    iphoneId: "2",
    customerId: "c2",
    totalAmount: 600,
    paidAmount: 200,
    paymentType: "Crédit",
    remainingAmount: 400,
    dueDate: "2024-02-15T00:00:00Z",
    date: "2024-01-16T11:00:00Z",
    status: "En cours"
  }
];

export const MOCK_STATS = {
  totalStock: 2,
  totalSalesMonth: 1000,
  pendingCredits: 400,
  recentSales: [
    { date: "2024-01-10", amount: 1500 },
    { date: "2024-01-11", amount: 1200 },
    { date: "2024-01-12", amount: 1800 },
    { date: "2024-01-13", amount: 1400 },
    { date: "2024-01-14", amount: 1600 },
    { date: "2024-01-15", amount: 400 },
    { date: "2024-01-16", amount: 200 }
  ]
};
