import { count } from "console";
import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import Event from "./Event";


/**
 * interfaces
 */
interface Items {
    id: number;
    position: {
        name: string;
        color: string;
        id: number;
    };
    startsAt: string;
    endsAt: string;
};

interface Pagination {
	offset: number;
	limit: number;
	count: number;
}

interface propsInterface {
	items: Items[];
    pagination: Pagination;
	disableButton: (state:boolean) => void;
	filterValue: boolean;
}

/**
 * Event list page
 * @param props - Events items : disableButton function declaired
 * @returns 
 */

const EventsList: NextPage<propsInterface> = ({items, pagination, disableButton, filterValue}:propsInterface) : JSX.Element => {

	const [eventsItem, setEventsItem] = useState<Items[]>([]);
	const [filterState, setFilterState] = useState<boolean>(filterValue);

	useEffect(() => {
		setFilterState(filterValue)
	}, [filterValue])
	useEffect(() => {
		if(items && !!items.length && filterState) {
			setEventsItem(state => [...state, ...items ]);
		} else {
			setEventsItem([...items ]);
		}
	}, [items])

	useEffect(() => {
		
		const limitExceeded:boolean = eventsItem.length >= pagination.count;
		disableButton(limitExceeded);
	}, [eventsItem])

	return (
		<table className="min-w-full divide-y divide-gray-200">
			<thead className="bg-gray-50">
				<tr>
					<th
						scope="col"
						className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						data-testid="positionName"
					>
						Position name
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						data-testid="startTime"
					>
						Start time
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						data-testid="endTime"
					>
						End time
					</th>
                    <th scope="col"></th>
				</tr>
			</thead>
            <tbody className="bg-white divide-y divide-gray-200 list">
                {eventsItem && eventsItem.map((item:Items, index) => (
                    <Event {...item} key={index}/>
                ))}
                </tbody>  
		</table>
	);
};

export default EventsList;
