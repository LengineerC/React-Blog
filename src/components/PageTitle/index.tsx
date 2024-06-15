import "./index.scss"

type Props = {
  title: string
}

export default function PageTitle({ title }: Props) {
  return (
    <>
      <div className='page-title'>
        {title}
      </div>
    </>
  )
}