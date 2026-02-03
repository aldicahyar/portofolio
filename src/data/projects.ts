export type ProjectCategory = "All" | "Government" | "Logistics" | "Fintech" | "Internal" | "Education";

export interface Project {
  title: string;
  description: {
    en: string;
    id: string;
  };
  tags: string[];
  category: ProjectCategory;
  status: "Live" | "In Development" | "Completed" | "Prototype";
  github?: string;
  demo?: string;
  featured?: boolean;
  highlights?: { en: string; id: string }[];
}

export const projects: Project[] = [
  {
    title: "Pos Indonesia Logistics Ecosystem",
    description: {
      en: "Architected a scalable microservices ecosystem for national logistics. Orchestrating core logistics operations, retail transactions, and partner integrations. Features high-performance data processing with MongoDB and Redis caching.",
      id: "Merancang ekosistem microservices yang scalable untuk logistik nasional. Mengelola operasi logistik inti, transaksi ritel, dan integrasi mitra. Fitur pemrosesan data berkinerja tinggi dengan MongoDB dan Redis caching."
    },
    tags: ["NestJS", "Microservices", "PostgreSQL", "MongoDB", "Kafka", "Docker"],
    category: "Logistics",
    status: "In Development",
    featured: true,
    highlights: [
      { en: "Event-driven architecture with Kafka", id: "Arsitektur event-driven dengan Kafka" },
      { en: "Multi-tenant system supporting partner integrations", id: "Sistem multi-tenant mendukung integrasi mitra" },
      { en: "Redis caching for high-performance operations", id: "Redis caching untuk operasi berkinerja tinggi" },
    ],
  },
  {
    title: "CEISA 4.0 (Bea Cukai)",
    description: {
      en: "High-scale customs and excise information system. Developed RESTful APIs for licensing, production, and trade modules supporting thousands of daily transactions.",
      id: "Sistem informasi kepabeanan dan cukai berskala besar. Mengembangkan RESTful API untuk modul perizinan, produksi, dan perdagangan yang mendukung ribuan transaksi harian."
    },
    tags: ["Java Spring Boot", "Oracle", "Microservices", "Redis", "High Availability"],
    category: "Government",
    status: "Live",
    featured: true,
    highlights: [
      { en: "Processing thousands of transactions daily", id: "Memproses ribuan transaksi harian" },
      { en: "High availability with 99.9% uptime SLA", id: "High availability dengan SLA uptime 99.9%" },
      { en: "Integrated with national customs systems", id: "Terintegrasi dengan sistem kepabeanan nasional" },
    ],
  },
  {
    title: "Digitax System",
    description: {
      en: "Tax integration middleware connecting user systems with government tax APIs. Implemented secure data bridging, user authentication, and transaction logging.",
      id: "Middleware integrasi pajak yang menghubungkan sistem pengguna dengan API pajak pemerintah. Mengimplementasikan bridging data aman, autentikasi pengguna, dan pencatatan transaksi."
    },
    tags: ["NestJS", "TypeScript", "PostgreSQL", "JWT", "Secure API"],
    category: "Fintech",
    status: "Completed",
    featured: true,
    highlights: [
      { en: "Secure OAuth2 and JWT authentication", id: "Autentikasi OAuth2 dan JWT yang aman" },
      { en: "Real-time tax document validation", id: "Validasi dokumen pajak real-time" },
      { en: "Comprehensive audit logging", id: "Pencatatan audit yang komprehensif" },
    ],
  },
  {
    title: "HR Information System",
    description: {
      en: "Comprehensive employee management system featuring attendance tracking, payroll processing, and secure token-based verification for sensitive operations.",
      id: "Sistem manajemen karyawan komprehensif yang menampilkan pelacakan kehadiran, pemrosesan penggajian, dan verifikasi berbasis token aman untuk operasi sensitif."
    },
    tags: ["Java Spring Boot", "Thymeleaf", "SQL Server", "JWT", "Bootstrap"],
    category: "Internal",
    status: "Completed",
    featured: false,
    github: "https://github.com/aldicahyar"
  },
  {
    title: "Learning Management API",
    description: {
      en: "Educational platform backend supporting course management, student progress tracking, and quiz systems with real-time scoring.",
      id: "Backend platform pendidikan yang mendukung manajemen kursus, pelacakan kemajuan siswa, dan sistem kuis dengan penilaian real-time."
    },
    tags: ["Express", "MongoDB", "Node.js", "REST API"],
    category: "Education",
    status: "Prototype",
    featured: false,
    github: "https://github.com/aldicahyar"
  }
];

export const projectCategories: ProjectCategory[] = ["All", "Government", "Logistics", "Fintech", "Internal"];
