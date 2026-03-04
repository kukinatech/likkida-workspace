
import LogoSvg from '../assets/likkida-logo.svg'
export default function Logo({ width, height }: { width?: number, height?: number }) {
    return (
        <div className="flex h-auto">
            <img src={LogoSvg} alt="Likkida Logo" width={width ?? 36} height={height ?? 36} />
            <span className="self-end font-bold">Likkida</span>
        </div>
    )
} 