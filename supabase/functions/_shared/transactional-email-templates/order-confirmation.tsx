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

interface OrderItem {
  product_name: string
  scent?: string | null
  size_label?: string | null
  quantity: number
  line_total_cents: number
}

interface OrderConfirmationProps {
  customerName?: string
  orderNumber?: string
  items?: OrderItem[]
  subtotal_cents?: number
  shipping_cents?: number
  tax_cents?: number
  discount_cents?: number
  total_cents?: number
  currency?: string
  shippingAddress?: {
    line1?: string
    line2?: string | null
    city?: string
    state?: string
    postal_code?: string
    country?: string
  } | null
}

const money = (cents = 0, currency = 'usd') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format((cents || 0) / 100)

export const OrderConfirmationEmail: React.FC<OrderConfirmationProps> = ({
  customerName = 'lovely',
  orderNumber = '—',
  items = [],
  subtotal_cents = 0,
  shipping_cents = 0,
  tax_cents = 0,
  discount_cents = 0,
  total_cents = 0,
  currency = 'usd',
  shippingAddress,
}) => (
  <Html>
    <Head />
    <Preview>Your Leola Nichelle ritual is on the way</Preview>
    <Body style={{
      backgroundColor: '#f6efe6',
      fontFamily: 'Georgia, "Cormorant Garamond", serif',
      margin: 0,
      padding: '32px 0',
      color: '#3d2a1f',
    }}>
      <Container style={{
        backgroundColor: '#fbf6ee',
        maxWidth: 560,
        margin: '0 auto',
        padding: '40px 36px',
        borderRadius: 6,
        border: '1px solid #e8d9c4',
      }}>
        <Text style={{
          letterSpacing: 4,
          fontSize: 11,
          color: '#8a6a4c',
          margin: 0,
          textTransform: 'uppercase',
        }}>Leola Nichelle</Text>
        <Heading style={{
          fontFamily: 'Georgia, serif',
          fontWeight: 400,
          fontSize: 28,
          margin: '12px 0 4px',
          color: '#3d2a1f',
        }}>Thank you, {customerName}.</Heading>
        <Text style={{ fontSize: 15, lineHeight: '24px', color: '#5a4434', margin: '0 0 24px' }}>
          Your ritual is being lovingly prepared. We'll send tracking the moment it leaves our atelier.
        </Text>

        <Section>
          <Text style={{ fontSize: 12, color: '#8a6a4c', letterSpacing: 2, margin: '0 0 4px', textTransform: 'uppercase' }}>
            Order
          </Text>
          <Text style={{ fontSize: 14, margin: 0, fontFamily: 'monospace', color: '#3d2a1f' }}>
            #{orderNumber.slice(0, 8).toUpperCase()}
          </Text>
        </Section>

        <Hr style={{ borderColor: '#e8d9c4', margin: '24px 0' }} />

        {items.map((it, i) => (
          <Section key={i} style={{ marginBottom: 14 }}>
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td style={{ fontSize: 15, color: '#3d2a1f' }}>
                    {it.product_name}
                    {it.scent ? ` — ${it.scent}` : ''}
                    {it.size_label ? ` (${it.size_label})` : ''}
                    {it.quantity > 1 ? ` × ${it.quantity}` : ''}
                  </td>
                  <td align="right" style={{ fontSize: 15, color: '#3d2a1f' }}>
                    {money(it.line_total_cents, currency)}
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>
        ))}

        <Hr style={{ borderColor: '#e8d9c4', margin: '20px 0' }} />

        <Row label="Subtotal" value={money(subtotal_cents, currency)} />
        {discount_cents > 0 && (
          <Row label="Bundle love" value={`− ${money(discount_cents, currency)}`} />
        )}
        <Row label="Shipping" value={shipping_cents ? money(shipping_cents, currency) : 'Calculated'} />
        {tax_cents > 0 && <Row label="Tax" value={money(tax_cents, currency)} />}

        <Hr style={{ borderColor: '#caa97a', margin: '16px 0' }} />
        <Row label="Total" value={money(total_cents, currency)} bold />

        {shippingAddress && (
          <>
            <Hr style={{ borderColor: '#e8d9c4', margin: '28px 0 16px' }} />
            <Text style={{ fontSize: 12, color: '#8a6a4c', letterSpacing: 2, margin: '0 0 8px', textTransform: 'uppercase' }}>
              Shipping to
            </Text>
            <Text style={{ fontSize: 14, margin: 0, lineHeight: '22px', color: '#3d2a1f' }}>
              {shippingAddress.line1}
              {shippingAddress.line2 ? `, ${shippingAddress.line2}` : ''}<br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code}<br />
              {shippingAddress.country}
            </Text>
          </>
        )}

        <Hr style={{ borderColor: '#e8d9c4', margin: '32px 0 20px' }} />
        <Text style={{ fontSize: 13, color: '#7a5a44', lineHeight: '20px', margin: 0 }}>
          With love,<br />
          <em>Leola Nichelle — Fragrance & Skin Rituals</em>
        </Text>
      </Container>
    </Body>
  </Html>
)

const Row: React.FC<{ label: string; value: string; bold?: boolean }> = ({ label, value, bold }) => (
  <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 6 }}>
    <tbody>
      <tr>
        <td style={{ fontSize: bold ? 16 : 14, color: '#3d2a1f', fontWeight: bold ? 600 : 400 }}>{label}</td>
        <td align="right" style={{ fontSize: bold ? 16 : 14, color: '#3d2a1f', fontWeight: bold ? 600 : 400 }}>{value}</td>
      </tr>
    </tbody>
  </table>
)

export const template = {
  component: OrderConfirmationEmail,
  subject: (d: Record<string, any>) =>
    `Your Leola Nichelle ritual is on its way ✨ #${(d.orderNumber || '').slice(0, 8).toUpperCase()}`,
  displayName: 'Order Confirmation',
  previewData: {
    customerName: 'Leola',
    orderNumber: 'abcd1234-ef',
    currency: 'usd',
    subtotal_cents: 5400,
    shipping_cents: 800,
    tax_cents: 432,
    total_cents: 6632,
    items: [
      { product_name: 'Luxury Body Oil Soufflé', scent: 'Velvet', size_label: '4 oz', quantity: 1, line_total_cents: 3400 },
      { product_name: 'Perfume Oil Roller', scent: 'Hush', size_label: '10 ml', quantity: 1, line_total_cents: 2000 },
    ],
    shippingAddress: {
      line1: '123 Champagne Ln', city: 'Atlanta', state: 'GA', postal_code: '30303', country: 'US',
    },
  },
} satisfies TemplateEntry