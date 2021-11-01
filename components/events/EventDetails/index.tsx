import moment from "moment";
import { NextPage } from "next";
import EventEmployees from "./EventEmployees";

/**
 * interface
 */
interface ListDetails {
	id: number;
	startsAt: string;
	endsAt: string;
	position: Position;
	employees: Employees[];
}

interface Position {
	name: string;
	color: string;
	id: number;
}

interface Employees {
	firstName: string;
	lastName: string;
	image: string;
	id: number;
}

/**
 * Event Details page
 * @param props - Event details
 * @returns 
 */
const EventDetails: NextPage<ListDetails> = ({
	startsAt,
	endsAt,
	position,
	employees,
}: ListDetails) => {
	const dateFormat = "YYYY-MM-DD (HH:mm a)";
	const startDate = moment(startsAt).format(dateFormat);
	const endDate = moment(endsAt).format(dateFormat);
	return (
		<dl>
			<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm font-medium text-gray-500" data-testid="detailsPositionHeading">Position name</dt>
				<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" data-testid="detailsPositionValue">
					{position.name}
				</dd>
			</div>
			<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm font-medium text-gray-500" data-testid="detailsSatrtTimeHeading">Start time</dt>
				<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" data-testid="detailsSatrtTimeValue">
					{startDate}
				</dd>
			</div>

			<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm font-medium text-gray-500" data-testid="detailsEndTimeHeading">End time</dt>
				<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" data-testid="detailsEndTimeValue">
					{endDate}
				</dd>
			</div>
			<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm font-medium text-gray-500" data-testid="detailsEmployessHeading">Employees</dt>
				<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
					<ul
						role="list"
						className="border border-gray-200 rounded-md divide-y divide-gray-200"
						data-testid="detailsEmployessValue"
					>
						{employees && !!employees.length ? employees.map((employee:Employees, index) => (
							<EventEmployees {...employee} key={index}/>
						)): <div className="py-6 px-6">Employess not available</div>}
					</ul>
				</dd>
			</div>
		</dl>
	);
};
export default EventDetails;
