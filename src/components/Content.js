import React from "react";
import PropTypes from "prop-types";

export const HTMLContent = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);

const Content = ({ content }) => <div>{content}</div>;

Content.propTypes = {
  content: PropTypes.node
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
