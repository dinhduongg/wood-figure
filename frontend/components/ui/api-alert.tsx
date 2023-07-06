import { Server, Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { toast } from 'react-hot-toast'

interface ApiAlertProps {
  title: string
  description: string
  variant: 'admin' | 'public'
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
}

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
}

const methodTextMap: Record<ApiAlertProps['method'], string> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
}

const methodtMap: Record<ApiAlertProps['method'], BadgeProps['variant']> = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
}

export const ApiAlert: React.FC<ApiAlertProps> = ({
  description,
  title,
  variant = 'public',
  method,
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast.success('Api route copied to the clipboard')
  }

  return (
    <Alert>
      <div className="flex items-center space-x-2">
        <Server className="w-4 h-4" />
        <AlertTitle className="flex items-center gap-x-2 m-0">
          {title}
          <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
          <Badge variant={methodtMap[method]}>{methodTextMap[method]}</Badge>
        </AlertTitle>
      </div>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
