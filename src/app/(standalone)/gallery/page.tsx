import type { Metadata } from 'next'
import { GalleryPageContent } from '@/components/sections/GalleryPageContent'
export const metadata: Metadata = { title: 'Gallery — Gangnam Kitchen' }
export default function GalleryPage() { return <GalleryPageContent /> }
