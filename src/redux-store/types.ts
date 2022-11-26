export interface AnalyticsInterface {
  salesGraph: {
    type: {
      label: string
      value: string
    }
    data: any
    month: string
    year: number
    loading: boolean
  }
}
