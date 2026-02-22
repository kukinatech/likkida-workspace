import Logo from "./Logo"

type TProps = {
  height?: number,
  width?: number,
  texto?: string
}

export default function Brand({ height, width, texto }: TProps) {
  return (
    <div className="flex flex-col items-center gap-y-4.5 ">
      <Logo height={height} width={width} />
      {texto && <span className="text-xl">{texto}</span>}
    </div>
  )
}