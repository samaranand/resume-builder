import type { PersonalInfo } from '../../types/resume';

interface HeaderProps {
  personal: PersonalInfo;
}

function externalHref(value: string): string {
  if (!value) {
    return '#';
  }
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function ContactIcon({ name }: { name: 'location' | 'email' | 'phone' | 'linkedin' | 'github' }) {
  if (name === 'linkedin') {
    return (
      <span className="contact-icon contact-icon--linkedin" aria-hidden="true">
        in
      </span>
    );
  }

  const paths = {
    location: 'M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z',
    email: 'M3 5h18v14H3V5Zm2.2 2 6.8 5.1L18.8 7H5.2Zm13.8 10V9.4l-7 5.2-7-5.2V17h14Z',
    phone: 'M6.6 2.8 10 6.2 7.8 8.4c1.2 2.3 3.1 4.2 5.4 5.4l2.2-2.2 3.4 3.4-1.6 3.6c-.3.7-1 1.1-1.8 1C8.4 18.9 3.1 13.6 2.4 6.6c-.1-.8.3-1.5 1-1.8l3.2-2Z',
    github:
      'M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 6.6 9c-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.1 9.1 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1.1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2Z',
  };

  return (
    <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

export function Header({ personal }: HeaderProps) {
  return (
    <header className="resume-header">
      <h1>{personal.name}</h1>
      <div className="resume-contact">
        <span className="contact-item">
          <ContactIcon name="location" />
          {personal.location}
        </span>
        <span className="contact-item">
          <ContactIcon name="email" />
          {personal.email}
        </span>
        <span className="contact-item">
          <ContactIcon name="phone" />
          {personal.phone}
        </span>
      </div>
      <div className="resume-contact">
        <a className="contact-item" href={externalHref(personal.linkedin)}>
          <ContactIcon name="linkedin" />
          {personal.linkedin}
        </a>
        <a className="contact-item" href={externalHref(personal.github)}>
          <ContactIcon name="github" />
          {personal.github}
        </a>
      </div>
    </header>
  );
}
