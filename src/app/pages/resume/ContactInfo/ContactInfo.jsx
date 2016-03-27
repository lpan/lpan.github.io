import React from 'react';
import ContactPill from './ContactPill';

function ContactInfo() {
  return (
    <div>
      <h1>Lawrence Pan</h1>
      <ContactPill name="phone" />
      <ContactPill name="location" />
      <ContactPill name="school" />
      <ContactPill name="email" />
      <ContactPill name="github" />
    </div>
  );
}

export default ContactInfo;
