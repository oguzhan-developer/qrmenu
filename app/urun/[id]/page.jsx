import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx"
export default async function UrunPage({ params }) {
    const {id} = await params;
    return (
        <>
            <TopNavbar pathname={`/urun/${id}`} />
            <div className="grid grid-cols-2 justify-center gap-4 max-w-md m-auto my-3">
                <p>{id}</p>
            </div>
        </>
    )
}