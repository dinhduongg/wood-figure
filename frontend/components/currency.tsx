import { formatCurrency } from '@/lib/utils'

interface CurrencyProps {
  currency: number | string
}

export default function FormatCurrency({ currency }: CurrencyProps) {
  return <p>{formatCurrency(currency)}</p>
}
