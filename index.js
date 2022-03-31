import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Toolbar,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject
} from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { SampleBase } from './sample-base';

export class ContextMenuSample extends SampleBase {
  constructor() {
    super(...arguments);
    this.groupOptions = { showGroupedColumn: true };
    this.selectedIndex = -1;
    this.toolbarOptions = ['Add', 'Delete', 'Update', 'Cancel'];
    this.contextMenuItems = [
      'AutoFit',
      'AutoFitAll',
      'SortAscending',
      'SortDescending',
      'Copy',
      'Edit',
      'Delete',
      'PdfExport',
      'ExcelExport',
      'CsvExport',
      'FirstPage',
      'PrevPage',
      'LastPage',
      'NextPage',
      { text: 'Add Record', target: '.e-content', id: 'addrecord' }
    ];
    this.editing = {
      allowDeleting: true,
      allowAdding: true,
      allowEditing: true
    };
  }
  actionComplete(args) {
    debugger;
    if (args.requestType === 'add') {
      var addedRow = this.gridInstance
        .getContentTable()
        .querySelector('.e-addedrow');
      var tbody = this.gridInstance.getContentTable().querySelector('tbody');
      tbody.insertBefore(addedRow, tbody.children[this.selectedIndex + 2]);
    }
    if (args.requestType === 'save' && args.action === 'add') {
      this.selectedIndex = -1;
    }
  }
  contextMenuClick(args) {
    debugger;
    if (this.gridInstance && args.item.id === 'addrecord') {
      this.gridInstance.addRecord();
    }
  }

  actionBegin(args) {
    debugger;
    if (args.requestType === 'save' && args.action === 'add') {
      args.index = this.selectedIndex + 1;
    }
  }

  contextMenuOpen(args) {
    debugger;
    if (args.rowInfo.rowIndex) {
      this.selectedIndex = args.rowInfo.rowIndex;
    }
  }
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <GridComponent
            id="gridcomp"
            dataSource={orderDetails}
            allowPaging={true}
            allowSorting={true}
            allowExcelExport={true}
            contextMenuClick={this.contextMenuClick.bind(this)}
            ref={grid => (this.gridInstance = grid)}
            actionBegin={this.actionBegin.bind(this)}
            actionComplete={this.actionComplete.bind(this)}
            allowPdfExport={true}
            toolbar={this.toolbarOptions}
            contextMenuItems={this.contextMenuItems}
            editSettings={this.editing}
            contextMenuOpen={this.contextMenuOpen.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="OrderID"
                headerText="Order ID"
                width="120"
                textAlign="Right"
                isPrimaryKey={true}
              />
              <ColumnDirective
                field="CustomerName"
                headerText="Customer Name"
              />
              <ColumnDirective
                field="Freight"
                headerText="Freight"
                format="C2"
                textAlign="Right"
                editType="numericedit"
              />
              <ColumnDirective
                field="ShipName"
                headerText="Ship Name"
                width="200"
              />
              <ColumnDirective
                field="ShipCountry"
                headerText="Ship Country"
                width="150"
                editType="dropdownedit"
              />
              <ColumnDirective
                field="ShipCity"
                headerText="Ship City"
                width="150"
              />
            </ColumnsDirective>
            <Inject
              services={[
                Resize,
                Toolbar,
                Sort,
                ContextMenu,
                Filter,
                Page,
                ExcelExport,
                Edit,
                PdfExport
              ]}
            />
          </GridComponent>
        </div>
      </div>
    );
  }
}

render(<ContextMenuSample />, document.getElementById('sample'));
