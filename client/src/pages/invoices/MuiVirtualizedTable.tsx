import React from 'react'
import { MuiVirtualizedTableProps, Row } from './types'
import { classes, MuiStyles } from './styles'
import clsx from 'clsx'
import {
  AutoSizer,
  Column,
  Table,
  TableCellRenderer,
  TableHeaderProps,
} from 'react-virtualized'
import TableCell from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import { ROUTES } from 'utils/constants'
import WithRouter from 'components/withRouter'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { renderPriceWithCommas } from 'utils/helpers'

class MuiVirtualizedTable extends React.PureComponent<
  MuiVirtualizedTableProps
> {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  }

  getRowClassName = ({ index }: Row) => {
    const { onRowClick } = this.props

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    })
  }

  getPrice = (items: any[]) => {
    let sum = 0
    for (let i = 0; i < items.length; i++) {
      sum += items[i].sellingPrice * items[i].qty
    }

    return `${renderPriceWithCommas(sum)}`
  }

  renderColumnData = (key: string, cellData: any, isPrice = false) => {
    switch (key) {
      case 'createdAt':
        return dayjs(cellData).format('MMM D, YYYY HH:mm')
      case 'due_date':
        return dayjs(cellData).format('MMM D, YYYY HH:mm')
      case 'items':
        return isPrice ? this.getPrice(cellData) : cellData.length
      case 'isPaid':
        return cellData ? 'Paid' : 'Unpaid'
      case 'customer':
        //@ts-ignore
        const customer = this.props.customers.find(
          (customer: any) => customer.id === cellData,
        )

        return `${customer?.firstname} ${customer?.lastname}`
      default:
        return cellData
    }
  }

  cellRenderer: TableCellRenderer = ({ cellData, columnIndex }: any) => {
    const { columns, rowHeight, onRowClick } = this.props

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{
          height: rowHeight,
          color:
            columns[columnIndex].dataKey === 'isPaid'
              ? cellData === true
                ? 'lightgreen'
                : 'red'
              : 'rgb(151, 161, 186)',
          cursor: 'pointer',
        }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {this.renderColumnData(
          columns[columnIndex].dataKey,
          cellData,
          columns[columnIndex].isPrice,
        )}
      </TableCell>
    )
  }

  headerRenderer = ({
    label,
    columnIndex,
  }: TableHeaderProps | (any & { columnIndex: number })) => {
    const { headerHeight, columns } = this.props

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick,
        )}
        variant="head"
        style={{
          height: headerHeight,
          color: 'white',
          background: 'rgb(105, 65, 198)',
        }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    )
  }

  render() {
    const { columns, rowHeight, headerHeight, ...tableProps } = this.props

    return (
      //@ts-ignore
      <AutoSizer>
        {({ height, width }: any) => (
          //@ts-ignore
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight!}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight!}
            {...tableProps}
            rowClassName={this.getRowClassName}
            onRowClick={({ rowData }) => {
              const { id } = rowData

              this.props.navigate(`${ROUTES.INVOICE_DETAILS}?id=${id}`)
            }}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                //@ts-ignore
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps: any) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              )
            })}
          </Table>
        )}
      </AutoSizer>
    )
  }
}

const mapStateToProps = (state: any) => ({
  customers: state.customers.customers,
})

const VirtualizedTable = connect(
  mapStateToProps,
  null,
)(styled(WithRouter(MuiVirtualizedTable))(MuiStyles))

export default VirtualizedTable
