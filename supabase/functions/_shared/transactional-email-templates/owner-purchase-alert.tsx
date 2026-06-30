import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface OwnerAlertProps {
  customerName?: string
  customerEmail?: string
  orderNumber?: string
  total_cents?: number
  currency?: string
  itemSummary?: string
  shippingMethod?: string
  shippingAddress?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
  } | null
  placedAt?: string
}

const money = (cents = 0, currency = 'usd') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format((cents || 0) / 100)

export const OwnerPurchaseAlertEmail: React.FC<OwnerAlertProps> = ({
  customerName = 'A customer',
  customerEmail = '',
  orderNumber = '—',
  total_cents = 0,
  currency = 'usd',
  itemSummary = '',
  shippingMethod = '',
  shippingAddress = null,
  placedAt = '',
}) => (
  <Html>
    <Head />
    <Preview>New order — {money(total_cents, currency)}</Preview>
    <Body style={{ backgroundColor: '#f6efe6', fontFamily: 'Georgia, serif', margin: 0, padding: '32px 0', color: '#3d2a1f' }}>
      <Container style={{ backgroundColor: '#fbf6ee', maxWidth: 540, margin: '0 auto', padding: '36px 32px', borderRadius: 6, border: '1px solid #e8d9c4' }}>
        <Text style={{ letterSpacing: 4, fontSize: 11, color: '#8a6a4c', margin: 0, textTransform: 'uppercase' }}>Leola Nichelle · Owner Alert</Text>
        <Heading style={{ fontWeight: 400, fontSize: 24, margin: '12px 0 4px' }}>🌸 New order received</Heading>
        <Text style={{ fontSize: 15, color: '#5a4434', margin: '0 0 18px' }}>
          {customerName} just placed an order.
        </Text>
        <Hr style={{ borderColor: '#e8d9c4' }} />
        <Section>
          <Text style={{ margin: '12px 0 4px', fontSize: 14 }}><strong>Order:</strong> #{orderNumber.slice(0, 8).toUpperCase()}</Text>
          <Text style={{ margin: '0 0 4px', fontSize: 14 }}><strong>Customer:</strong> {customerName}{customerEmail ? ` (${customerEmail})` : ''}</Text>
          {placedAt && <Text style={{ margin: '0 0 4px', fontSize: 14 }}><strong>Placed:</strong> {placedAt}</Text>}
          <Text style={{ margin: '0 0 4px', fontSize: 14 }}><strong>Total:</strong> {money(total_cents, currency)}</Text>
          {shippingMethod && <Text style={{ margin: '0 0 4px', fontSize: 14 }}><strong>Shipping:</strong> {shippingMethod}</Text>}
          {shippingAddress && (
            <Text style={{ margin: '8px 0 0', fontSize: 14, whiteSpace: 'pre-line' }}>
              <strong>Ship to:</strong>{'\n'}
              {[shippingAddress.line1, shippingAddress.line2].filter(Boolean).join('\n')}
              {(shippingAddress.line1 || shippingAddress.line2) ? '\n' : ''}
              {[shippingAddress.city, shippingAddress.state, shippingAddress.postal_code].filter(Boolean).join(', ')}
              {shippingAddress.country ? `\n${shippingAddress.country}` : ''}
            </Text>
          )}
          {itemSummary && <Text style={{ margin: '8px 0 0', fontSize: 14, whiteSpace: 'pre-line' }}>{itemSummary}</Text>}
        </Section>
        <Hr style={{ borderColor: '#e8d9c4', margin: '24px 0 16px' }} />
        <Text style={{ fontSize: 12, color: '#7a5a44' }}>
          View, fulfill, and add tracking in your admin dashboard.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OwnerPurchaseAlertEmail,
  subject: (d: Record<string, any>) =>
    `🌸 New order ${money(d.total_cents, d.currency)} — ${d.customerName || 'Customer'}`,
  displayName: 'Owner Purchase Alert',
  to: 'leolalynn8277@gmail.com',
  previewData: {
    customerName: 'Jane Doe',
    customerEmail: 'jane@example.com',
    orderNumber: 'abcd1234',
    total_cents: 6800,
    currency: 'usd',
    itemSummary: '• Luxury Body Oil Soufflé — Velvet (4 oz) × 1\n• Perfume Oil Roller — Hush (10 ml) × 1',
    shippingMethod: 'Standard Shipping',
    shippingAddress: { line1: '123 Cocoa Ln', city: 'Atlanta', state: 'GA', postal_code: '30301', country: 'US' },
    placedAt: new Date().toLocaleString('en-US'),
  },
} satisfies TemplateEntry