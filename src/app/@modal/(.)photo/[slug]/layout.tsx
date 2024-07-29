import { ModalWrapper } from '@/components/wrapper'

export default function ModalPhotoDetailsLayout({ children, related_photo }: { children: React.ReactNode; related_photo: React.ReactNode }) {
  return (
    <ModalWrapper>
      {children}
      {related_photo}
    </ModalWrapper>
  )
}
