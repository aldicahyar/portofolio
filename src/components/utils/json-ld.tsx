export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aldi Cahya Ramadhan",
    "url": "https://aldicahyar.dev",
    "jobTitle": "Backend Developer",
    "sameAs": [
      "https://github.com/aldicahyar",
      "https://linkedin.com/in/aldicahyar"
    ],
    "description": "Backend Developer specializing in NestJS, ExpressJS, Node.js & Java. Building scalable and robust server-side applications.",
    "knowsAbout": [
      "Backend Development",
      "Microservices",
      "NestJS",
      "Spring Boot",
      "Database Optimization",
      "API Security"
    ],
    "image": "https://aldicahyar.dev/icon.svg"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
