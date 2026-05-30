import type { Metadata } from 'next'
import { ReservationsPageContent } from '@/components/sections/ReservationsPageContent'
export const metadata: Metadata = { title: 'Reservations — Gangnam Kitchen' }
export default function ReservationsPage() { return <ReservationsPageContent /> }