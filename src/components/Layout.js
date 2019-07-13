import React from "react";
import Helmet from "react-helmet";
import styled, { ThemeProvider } from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./all.css";
import useSiteMetadata from "./SiteMetadata";
import theme from "../theme";

const SiteContainer = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto auto 1fr auto;
`;

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr ${({ noSidebar }) =>
      noSidebar ? "" : "minmax(320px, 30%)"};

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const TemplateWrapper = ({ children, noSidebar }) => {
  const { title, description } = useSiteMetadata();
  return (
    <SiteContainer>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          <Container noSidebar={noSidebar}>
            <main>{children}</main>
            {noSidebar || <Sidebar />}
          </Container>
          <Footer />
        </>
      </ThemeProvider>
    </SiteContainer>
  );
};

export default TemplateWrapper;
