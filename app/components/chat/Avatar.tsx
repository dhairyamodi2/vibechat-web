import Image from "next/image"

export const Avatar = function({src, width, height} : {src: string, width?: number, height?: number}) {
    return (
        <div>
            <Image alt="avatar" src={src} width={width ? width : 45} height={height ? height :45} className="rounded-3xl
            "/>
        </div>
    )
}