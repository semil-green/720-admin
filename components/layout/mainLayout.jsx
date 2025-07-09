
import Header from "./header"
import Sidebar from "./sidebar"

export default function MainLayout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto bg-gray-50 p-8">{children}</main>
            </div>
        </div>
    )
}
