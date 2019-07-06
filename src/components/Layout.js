import React from "react";
import Helmet from "react-helmet";
import styled, { ThemeProvider } from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./all.css";
import useSiteMetadata from "./SiteMetadata";
import theme from "../theme";

const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-areas: "main aside";
`;

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/img/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/img/favicon-16x16.png"
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href="/img/safari-pinned-tab.svg"
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/img/og-image.jpg" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <>
          <Navbar />
          <Container>{children}</Container>
          <Footer />
        </>
      </ThemeProvider>
    </div>
  );
};

export default TemplateWrapper;
