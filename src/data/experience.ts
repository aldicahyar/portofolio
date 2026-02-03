export interface Experience {
  id: string;
  role: {
    en: string;
    id: string;
  };
  company: string;
  period: {
    en: string;
    id: string;
  };
  type: "work" | "education";
  description: {
    en: string;
    id: string;
  }[];
  tech?: string[];
}

export const experiences: Experience[] = [
  {
    id: "nutech",
    role: {
      en: "Backend Developer",
      id: "Backend Developer"
    },
    company: "PT. Nutech Integrasi",
    period: {
      en: "2023 - Present",
      id: "2023 - Sekarang"
    },
    type: "work",
    description: [
      {
        en: "Developed RESTful APIs using Java Spring Boot (v8, 11, 17) for CEISA Project modules (PPBT, Narcotics DB, Smart PCC).",
        id: "Mengembangkan RESTful API menggunakan Java Spring Boot (v8, 11, 17) untuk modul Proyek CEISA (PPBT, DB Narkotika, Smart PCC)."
      },
      {
        en: "Implemented Scheduler for data synchronization via API-to-API communication.",
        id: "Mengimplementasikan Scheduler untuk sinkronisasi data melalui komunikasi API-ke-API."
      },
      {
        en: "Built middleware service integrating User and Tax APIs using NestJS for DIGITAX Project.",
        id: "Membangun layanan middleware yang mengintegrasikan API Pengguna dan Pajak menggunakan NestJS untuk Proyek DIGITAX."
      },
      {
        en: "Managed PostgreSQL and Oracle databases with JWT authentication security.",
        id: "Mengelola database PostgreSQL dan Oracle dengan keamanan autentikasi JWT."
      },
      {
        en: "Optimized backend services for high-volume transactions and data monitoring.",
        id: "Mengoptimalkan layanan backend untuk transaksi volume tinggi dan pemantauan data."
      }
    ],
    tech: ["Java Spring Boot", "NestJS", "PostgreSQL", "Oracle", "Microservices"]
  },
  {
    id: "juara-coding",
    role: {
      en: "Bootcamp Student",
      id: "Peserta Bootcamp"
    },
    company: "PT. Danamas Insan Kreasi Andalan",
    period: {
      en: "2023",
      id: "2023"
    },
    type: "education",
    description: [
      {
        en: "Mastered Java Basic Concepts and OOP.",
        id: "Menguasai Konsep Dasar Java dan OOP."
      },
      {
        en: "Developed Web Applications with SQL Server Database.",
        id: "Mengembangkan Aplikasi Web dengan Database SQL Server."
      },
      {
        en: "Built REST APIs using Java Spring Boot and SQL Server.",
        id: "Membangun REST API menggunakan Java Spring Boot dan SQL Server."
      }
    ],
    tech: ["Java", "Spring Boot", "SQL Server", "OOP"]
  },
  {
    id: "kemendikbud-2",
    role: {
      en: "Intern Staff",
      id: "Staf Magang"
    },
    company: "Kementerian Pendidikan & Kebudayaan",
    period: {
      en: "2021",
      id: "2021"
    },
    type: "work",
    description: [
      {
        en: "Managed employee data input and validation for salary disbursement.",
        id: "Mengelola input dan validasi data karyawan untuk pencairan gaji."
      },
      {
        en: "Confirmed employee attendance records for payroll processing.",
        id: "Mengonfirmasi catatan kehadiran karyawan untuk pemrosesan penggajian."
      },
      {
        en: "Handled administrative tasks in the General Affairs & Payroll Treasury division.",
        id: "Menangani tugas administrasi di divisi Umum & Perbendaharaan Gaji."
      }
    ]
  },
  {
    id: "pusdatin",
    role: {
      en: "IT Support Intern",
      id: "Magang IT Support"
    },
    company: "Pusdatin Kemendikbud",
    period: {
      en: "2020",
      id: "2020"
    },
    type: "work",
    description: [
      {
        en: "Processed and managed employee data.",
        id: "Memproses dan mengelola data karyawan."
      },
      {
        en: "Validated attendance machine data and registered employee fingerprints.",
        id: "Memvalidasi data mesin absensi dan mendaftarkan sidik jari karyawan."
      },
      {
        en: "Provided technical support for attendance systems.",
        id: "Memberikan dukungan teknis untuk sistem absensi."
      }
    ]
  },
  {
    id: "ubsi",
    role: {
      en: "Diploma III, Information Systems",
      id: "Diploma III, Sistem Informasi"
    },
    company: "Universitas Bina Sarana Informatika",
    period: {
      en: "2021",
      id: "2021"
    },
    type: "education",
    description: [
      {
        en: "Graduated with IPK 3.4/4.0",
        id: "Lulus dengan IPK 3.4/4.0"
      },
      {
        en: "Focus on Information Systems and Software Development.",
        id: "Fokus pada Sistem Informasi dan Pengembangan Perangkat Lunak."
      }
    ]
  }
];
