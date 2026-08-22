import type { ResumeDocument } from '../types/resume';

export const sampleResume: ResumeDocument = {
  schemaVersion: 1,
  document: {
    fileName: 'Samar_Anand_Zeta_4yrExp',
  },
  personal: {
    name: 'Samar Anand',
    location: 'Bengaluru, India',
    email: 'samarss2015@gmail.com',
    phone: '+91 6204225883',
    linkedin: 'linkedin.com/in/samaranand',
    github: 'github.com/samaranand',
  },
  summary:
    '**Backend Software Engineer** with 4+ years building fintech and banking platforms across financial transactions, reconciliation, compliance, authentication, and secure data transfer. Experienced in **Java, Spring Boot, Kafka,** event-driven architecture, fault-tolerant processing, and reliability engineering.',
  experience: [
    {
      id: 'company-zeta',
      company: 'Zeta',
      location: 'Bengaluru, India',
      roles: [
        {
          id: 'role-northstar-sde2',
          title: 'Software Engineer 2',
          startDate: 'Apr 2025',
          endDate: 'Present',
          highlights: [
            'Architected **Credit Balance Refund (CBR)** automation for HDFC Pixel cards, eliminating **100% of manual refund operations** through a fault-tolerant Credit Balance → Bank Account workflow; processing ~200 **refunds/day within the first week of rollout**, with asynchronous reconciliation capable of recovering 400+ **transactions/hour**.',
            'Built a reusable **job-processing platform** integrating Seclore DRM encryption, SFTP orchestration, retries, and secure file-transfer workflows; adopted across **4 internal use cases within 3 months** and enabled HDFC InfoSec compliance.',
            'Implemented **RBI-mandated UPI transaction restrictions** across **70,000+ accounts** using event-driven workflows, rule engines, and batch-processing infrastructure.',
            'Designed and launched an extensible **email-verification platform** supporting Magic Link and Google SSO, enabling secure onboarding for **50,000+ users** with zero post-launch issues.',
            'Eliminated a recurring production bottleneck behind **50+ downstream incidents** by diagnosing Elasticsearch CPU saturation and driving cross-team remediation.',
            'Hardened platform security through inter-service authentication, audit-data integrity controls, secrets remediation, and production security fixes.',
          ],
        },
      ],
    },
    {
      id: 'company-bizongo',
      company: 'Bizongo',
      location: 'Bengaluru, India',
      roles: [
        {
          id: 'role-finedge-sde2',
          title: 'Software Engineer 2',
          startDate: 'Apr 2024',
          endDate: 'Mar 2025',
          highlights: [
            'Designed invoice-based lending workflows for disbursement and repayment across multiple credit lines, using AWS API Gateway to standardize environment-agnostic lender callbacks.',
            'Built a secure lender-borrower onboarding platform integrating KYC providers, document management, API-key security, XML-to-JSON pipelines, and automated PDF generation.',
            'Partnered with ONDC and Beckn ecosystem teams to define unsecured working-capital credit protocols and implement ecosystem-level lending integrations.',
          ],
        },
        {
          id: 'role-finedge-sde1',
          title: 'Software Engineer 1',
          startDate: 'Jun 2022',
          endDate: 'Mar 2024',
          highlights: [
            'Built fraud-detection and risk-scoring pipelines with Spring Batch to automate pre-disbursement borrower risk assessment and suspicious-activity detection.',
            'Led migration of core finance services from Ruby to Java 17, modernizing the lending platform for improved maintainability, scalability, and reliability.',
            'Owned end-to-end delivery of invoice-processing capabilities including international invoices, bulk workflows, asynchronous processing, and automated notifications, from design through production deployment.',
          ],
        },
      ],
    },
  ],
  education: [
    {
      id: 'education-1',
      institution: 'JIS College of Engineering',
      degree: 'B.Tech in Computer Science Engineering',
      startDate: 'Aug 2018',
      endDate: 'May 2022',
      gpa: 'GPA: 8.88/10.0',
    },
  ],
  skills: [
    { id: 'skill-languages', name: 'Languages', value: 'Java, SQL, Python, C++, JavaScript' },
    {
      id: 'skill-backend',
      name: 'Backend',
      value: 'Spring Boot, Microservices, REST APIs, Kafka, Hibernate/JPA, Spring Batch',
    },
    {
      id: 'skill-distributed',
      name: 'Distributed Systems',
      value: 'Event-Driven Architecture, Async Processing, Fault Tolerance, Reconciliation, Batch Processing',
    },
    { id: 'skill-databases', name: 'Databases', value: 'PostgreSQL, Redis, MongoDB, Elasticsearch' },
    { id: 'skill-devops', name: 'Cloud/DevOps', value: 'AWS, Docker, Kubernetes, Jenkins' },
    { id: 'skill-security', name: 'Security', value: 'OAuth2, JWT, Google SSO, DRM Encryption, SFTP' },
  ],
  achievements: [
    {
      id: 'achievement-1',
      value: '**Outstanding Performer of the Year & consecutive Shining Star Awards (Zeta)** for high-impact performance, ownership, reliability, and tech initiatives.',
    },
    {
      id: 'achievement-2',
      value: '**Star of the Quarter & Star of the Month (Bizongo)** for project delivery and engineering excellence.',
    },
    { id: 'achievement-3', value: '**Hackathon Winner (Bizongo)** among engineering teams.' },
    {
      id: 'achievement-4',
      value: '**Competitive Programming:** AIR 17/24,000 (Scaler Edge Apex), Global Rank 1143 (Google Kick Start 2021), Top 5% in NPTEL examinations.',
    },
  ],
};
