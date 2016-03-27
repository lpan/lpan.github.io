import React from 'react';
import ContactPill from './ContactPill';

function ContactInfo() {
  return (
    <div>
      <h2>Lawrence Pan</h2>
      <ContactPill name="phone" />
      <ContactPill name="location" />
      <ContactPill name="school" />
      <ContactPill name="email" />
      <ContactPill name="github" />
    </div>
  );
}

export default ContactInfo;
