import React from "react";
import styled from "styled-components";

export const TableElement = styled.table`
  border-collapse: collapse;
  min-width: 100%;
  font-size: 0.9rem;
`;

export const Row = styled.tr`
  vertical-align: center;

  &:nth-child(even) td {
    background: ${({ theme }) => theme.grayscale(0.05)};
  }
`;

export const Cell = styled.td`
  padding: 0.5rem 0.5rem;
  white-space: nowrap;
`;
export const Team = styled.div`
  display: grid;
  align-items: center;
  justify-content: start;
  grid-auto-flow: column;
  grid-gap: 0.25rem;
`;

export const Logo = styled.img.attrs({ alt: "" })`
  max-height: 1.25rem;
`;

export const THead = styled.thead``;

export const TBody = styled.tbody``;
export const Heading = styled.th`
  white-space: nowrap;
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.grayscale(0.2)};
  padding: 0.25rem;
`;

export const Table = ({ children, ...props }) => (
  <div style={{ "overflow-x": "auto", display: "grid" }}>
    <TableElement {...props}>{children}</TableElement>
  </div>
);
