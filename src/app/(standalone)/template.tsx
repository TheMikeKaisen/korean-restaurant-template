import { PageTransition } from '@/components/animations/PageTransition'

export default function StandaloneTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}