import React from 'react';

export const FooterLink: React.FC<{ label: string }> = ({ label }) => {
  return (
      <React.Fragment>
          {label}
          <span aria-hidden="true"> &rarr;</span>
      </React.Fragment>
  )
}