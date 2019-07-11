import React, { Component } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: auto;
  border: 1px solid gray;
`;

// This is the editing component
export class Table extends Component {
  render() {
    return (
      <table className={this.props.classNameWrapper}>
        <thead>
          <tr>
            <th>Home</th>
            <th>Score</th>
            <th>Away</th>
            <th>Score</th>
            <th>Date/Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Input placeholder="Home" />
            </td>
            <td>
              <Input placeholder="Score" type="number" />
            </td>
            <td>
              <Input placeholder="Away" />
            </td>
            <td>
              <Input placeholder="Score" type="number" />
            </td>
            <td>
              <Input placeholder="Date" type="date" />
            </td>
            <td>
              <Input placeholder="Location" />
            </td>
          </tr>
          <tr>
            <td>
              <Input placeholder="Home" />
            </td>
            <td>
              <Input placeholder="Score" type="number" />
            </td>
            <td>
              <Input placeholder="Away" />
            </td>
            <td>
              <Input placeholder="Score" type="number" />
            </td>
            <td>
              <Input placeholder="Date" type="date" />
            </td>
            <td>
              <Input placeholder="Location" />
            </td>
          </tr>
          <tr>
            <td>
              <Input placeholder="Home" />
            </td>
            <td>
              <Input placeholder="Score" type="number" />
            </td>
            <td>
              <Input placeholder="Away" />
            </td>
            <td>
              <Input placeholder="Score" type="number" />
            </td>
            <td>
              <Input placeholder="Date" type="date" />
            </td>
            <td>
              <Input placeholder="Location" />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export class TablePreview extends Component {
  render() {
    return <div>Table Preview</div>;
  }
}
