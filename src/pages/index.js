import * as React from 'react';

// styles
const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};
const headingAccentStyles = {
  color: '#663399',
};
const paragraphStyles = {
  marginBottom: 48,
};

// markup
const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        Welcome
        <span style={headingAccentStyles}> Stranger! </span>
        <span role='img' aria-label='Party popper emojis'>
          🎉🎉🎉
        </span>
      </h1>
      <p style={paragraphStyles}>
        I'm working on something amazing and it's{' '}
        <span style={headingAccentStyles}> Coming soon! </span>
        <span role='img' aria-label='Sunglasses smiley emoji'>
          😎
        </span>
      </p>
    </main>
  );
};

export default IndexPage;
