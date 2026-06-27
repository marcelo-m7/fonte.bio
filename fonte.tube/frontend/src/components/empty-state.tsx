import { CircleDashedIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type EmptyStateProps = {
  title: string
  description: string
  ctaLabel?: string
}

export function EmptyState({ title, description, ctaLabel = "Criar agora" }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardHeader className="items-center text-center">
        <div className="mb-2 rounded-full bg-muted p-3">
          <CircleDashedIcon className="size-5 text-muted-foreground" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center text-sm text-muted-foreground">
        Este modulo ainda nao possui dados conectados ao backend.
      </CardContent>
      <CardFooter className="justify-center">
        <Button>{ctaLabel}</Button>
      </CardFooter>
    </Card>
  )
}
