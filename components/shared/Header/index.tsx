import { NextPage } from "next"

/**
 * Filter Block
 * @returns 
 */
const Header: NextPage = (): JSX.Element => {
    return (
    <nav className="bg-gray-800">
        <div className="container mx-auto">
            <div className="relative flex items-center justify-between h-16">
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                        <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
                    </div>
                </div>
            </div>
        </div>
    </nav>
    )
}

export default Header
