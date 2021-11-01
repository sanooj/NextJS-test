import { NextPage } from "next";

/**
 * interface
 */
interface Employees {
	firstName: string;
	lastName: string;
	image: string;
	id: number;
}

/**
 * 
 * Event Employee pages
 * @param props - employee details
 * @returns 
 */
const EventEmployees: NextPage<Employees> = ({firstName, lastName, image, id}: Employees) => {
	return (
		<li
			className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
		>
			<div className="w-0 flex-1 flex items-center">
				<div className="flex-shrink-0 h-5 w-5 text-gray-400" >
					<img src={image} alt="" data-testid="employeeImage"/>
				</div>
				<span className="ml-2 flex-1 w-0 truncate" data-testid="employeeFullName">
					{`${firstName} ${lastName}`}
				</span>
			</div>
		</li>
	);
};

export default EventEmployees;
