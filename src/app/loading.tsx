import AlbumCardSkeleton from "@/components/feeds/AlbumCardSkeleton"
import SongCardSkeleton from "@/components/feeds/SongCardSkeleton"
import LoadingAnimation from "@/components/Loader/Loader"

export default function Loading(){
    return <LoadingAnimation />
}

export function SongCardLoading(){
    return <SongCardSkeleton />
}

export function AlbumCardLoading(){
    return <AlbumCardSkeleton />
}