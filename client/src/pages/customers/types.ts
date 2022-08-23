import { NavigateFunction } from 'react-router-dom'
export interface ColumnData {
  dataKey: string
  label: string
  numeric?: boolean
  width: number
}

export interface Row {
  index: number
}

export interface MuiVirtualizedTableProps {
  columns: readonly ColumnData[]
  headerHeight?: number
  onRowClick?: () => void
  rowCount: number
  rowGetter: (row: Row) => Data
  rowHeight?: number
  navigate: NavigateFunction
}

export interface Data {
  name: string
  phone: string
  email: string
  createdAt: string
  id: string
}
