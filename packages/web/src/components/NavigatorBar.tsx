import type { HTMLAttributes, ReactNode } from "react"

type TProps = HTMLAttributes<HTMLDivElement> & { children?: ReactNode }

export default function NavigatorBar({ className, ...props }: TProps) {
  return (
    <div {...props} className={`${className} p-[15px]`}>NavigatorBar</div>
  )
}
