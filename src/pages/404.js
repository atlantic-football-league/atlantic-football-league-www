import React from "react";
import Layout from "../components/Layout";
import { H1 } from "../components/styles/Text";
import { Link } from "gatsby";

const NotFoundPage = () => (
  <Layout>
    <div>
      <H1>Not Found</H1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/">Go to homepage</Link>
    </div>
  </Layout>
);

export default NotFoundPage;
