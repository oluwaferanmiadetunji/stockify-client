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
}

export interface Data {
  calories: number
  carbs: number
  dessert: string
  fat: number
  id: number
  protein: number
}
export type Sample = [string, number, number, number, number]
