import React, { Component } from 'react';

class Table extends Component {

  buildTable = (columns, data, key) => {
    let headerRow = [];
    let dataRows = [];

    //Build the table header
    columns.forEach (col => {
      headerRow.push(
        <th key={`header-${col.heading}`}>{col.heading}</th>
      );
    });

    //Build the rows
    data.forEach(item => {
      let dataCells = [];

      //Build cells for this row
      columns.forEach (col => {
        dataCells.push(
          <td key={`${item[key]}-${col.property}`}>{item[col.property]}</td>
        );
      });

      //Push out row
      dataRows.push(
        <tr key={`${item[key]}-row`}>{dataCells}</tr>
      )
    });

    return(
      <>
        <thead>
          <tr>{headerRow}</tr>
        </thead>
        <tbody>
          {dataRows}
        </tbody>
      </>
    );
  };

  render() {
    const {
      columns,
      data,
      propertyAsKey
    } = this.props;

    return (
      <table className='table'>
        {this.buildTable(columns, data, propertyAsKey)}
      </table>
    );
  }
}

export default Table;