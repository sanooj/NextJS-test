import moment from "moment";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from 'next/link';

/**
 * interfaces
 */
interface Event {
    id: number;
    position:Position,
    startsAt: string, 
    endsAt: string;
}
interface Position {
    name: string;
    color: string;
    id: number;
};

/**
 * Event item page
 * @param props - Event items
 * @returns 
 */
const Event: NextPage<Event> = ({position,startsAt,endsAt,id}:Event) => {
    const router = useRouter();
    const dateFormat = 'YYYY-MM-DD (HH:mm a)';
    const startDate = moment(startsAt).format(dateFormat);
    const endDate = moment(endsAt).format(dateFormat);

	return (
		<tr>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-500">
					<div className="text-sm font-medium text-gray-900" data-testid="itemPositionName">{position.name}</div>
				</div>
                
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-500" data-testid="itemStartDate">{startDate}</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-testid="itemEndDate">
				{endDate}
			</td>
            <td>
                <Link href="/details/[id]" as={`/details/${id}`} >
                    <span className="text-xs cursor-pointer bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" data-testid="itemLink">
                        View Details
                    </span>
                </Link>
            </td>
		</tr>
	);
};

export default Event;
