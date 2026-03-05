
import { Activity } from 'react'
import LogoSvg from '../assets/likkida-logo.svg'
export default function Logo({ width, height, labelVisible = true }: { width?: number, height?: number, labelVisible?: boolean }) {
    return (
        <div className="flex h-auto">
            <img src={LogoSvg} alt="Likkida Logo" width={width ?? 36} height={height ?? 36} />
            <Activity mode={labelVisible ? 'visible' : 'hidden'}>
                <span className="self-end font-bold">Likkida</span>
            </Activity>
        </div>
    )
} 