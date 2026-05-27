import * as React from 'npm:react@18.3.1'
import { template as orderConfirmationTemplate } from './order-confirmation.tsx'
import { template as ownerPurchaseAlertTemplate } from './owner-purchase-alert.tsx'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'order-confirmation': orderConfirmationTemplate,
  'owner-purchase-alert': ownerPurchaseAlertTemplate,
}