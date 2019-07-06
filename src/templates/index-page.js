import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { H2 } from "../components/styles/Text";
import Layout from "../components/Layout";
import NewsRoll from "../components/NewsRoll";

export const IndexPageTemplate = ({}) => (
  <div>
    <div className="column is-12">
      <H2>Latest stories</H2>
      <NewsRoll limit={5} />
      <div className="column is-12 has-text-centered">
        <Link className="btn" to="/news">
          More News
        </Link>
      </div>
    </div>
  </div>
);

const IndexPage = () => {
  return (
    <Layout>
      <IndexPageTemplate />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;
