import styled from "styled-components";

export const Markdown = styled.div`
  p {
  }

  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
    margin: 1em 0;
    padding: 0.75em 1em;
    font-style: italic;
    font-size: 1.25em;
    color: ${({ theme }) => theme.grayscale(0.5)};

    p {
      margin: 0;
    }
  }

  /* Tables */
  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 2.5rem;
  }

  th {
    text-align: left;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: 0.5rem;
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  tr:nth-child(even) {
    background: ${({ theme }) => theme.grayscale(0.05)};
  }

  td {
    padding: 0.5rem;
  }
`;
