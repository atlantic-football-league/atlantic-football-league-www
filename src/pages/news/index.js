import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import NewsRoll from "../../components/NewsRoll";
import { H1 } from "../../components/styles/Text";

const Main = styled.main`
  display: grid;
`;

export default class NewsIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Main>
          <H1>Latest Stories</H1>
          <section className="section">
            <div className="container">
              <div className="content">
                <NewsRoll />
              </div>
            </div>
          </section>
        </Main>
      </Layout>
    );
  }
}
