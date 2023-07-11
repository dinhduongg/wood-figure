'use client'

import { ApiAlert } from './api-alert'

interface ApiListProps {
  entityName: string
  entityIdName?: string
}

export default function ApiList({ entityIdName, entityName }: ApiListProps) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  return (
    <>
      <ApiAlert
        method="GET"
        variant="public"
        title="Get list"
        description={`${backendUrl}/${entityName}/get`}
      />
      {entityIdName && (
        <ApiAlert
          method="GET"
          variant="public"
          title="Get one"
          description={`${backendUrl}/${entityName}/get/:${entityIdName}`}
        />
      )}
      <ApiAlert
        method="POST"
        variant="admin"
        title="Create"
        description={`${backendUrl}/${entityName}/create`}
      />
      {entityIdName && (
        <ApiAlert
          method="PATCH"
          variant="admin"
          title="Update"
          description={`${backendUrl}/${entityName}/update/:${entityIdName}`}
        />
      )}
      {entityIdName && (
        <ApiAlert
          method="DELETE"
          variant="admin"
          title="Delete"
          description={`${backendUrl}/${entityName}/delete/:${entityIdName}`}
        />
      )}
    </>
  )
}
