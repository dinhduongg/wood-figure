interface HeadingProps {
  title: string
  desctiption: string
}

export default function Heading({ title, desctiption }: HeadingProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{desctiption}</p>
    </div>
  )
}
