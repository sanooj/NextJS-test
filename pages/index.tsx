import { Dispatch, useEffect, useState } from "react";
import type { NextPage, NextPageContext } from "next";
import axios from "axios";
import EventsList from "@/components/events/EventsList";
import CommonLayout from "@/layout/common";
import Loader from "@/components/shared/Loader";
import Filter from "@/components/shared/filter";

/**
 * interfaces
 */
interface ListGroup {
	items: Items[];
	pagination: Pagination;
}
interface Items {
	id: number;
	position: {
		name: string;
		color: string;
		id: number;
	};
	startsAt: string;
	endsAt: string;
}

interface Pagination {
	offset: number;
	limit: number;
	count: number;
}

// creating token using base 64
const token = Buffer.from(
	"frontend@shyftplan.com:api_test_auth_token",
	"utf8"
).toString("base64");

// URL
const url =
	"https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod/events";

const pageItemLimit = 10;

export const fetchData = (
	limit: number,
	offsetValue?: number,
	startsAt?: string,
	endsAt?: string
): Promise<any> => {
	return axios
		.get(
			`${url}?limit=${limit}&offset=${offsetValue}${
				startsAt && endsAt
					? "&startsAt=" + startsAt + "&startsAt=" + endsAt
					: ""
			}`,
			{
				headers: {
					Authorization: `Basic ${token}`,
				},
			}
		)
		.then(({ data }) => data)
		.catch((err) =>  [] );
};
/**
 * Home page
 * @returns
 */
const Home: NextPage<ListGroup> = (): JSX.Element => {

	let isSubscribed = true;
	//Events data
	const [events, setEvents] = useState<ListGroup>();

	//Events limit
	const [limit, setLimit] = useState<number>(pageItemLimit);

	//Events offset
	const [offset, setOffset] = useState<number>(0);

	//load button status
	const [isButtonHidden, setIsButtonHidden] = useState<boolean>(false);

	//Filter Start time
	const [startsAt, setStartsAt] = useState<string>();

	//Filter End time
	const [endsAt, setEndsAt] = useState<string>();

	//Filter status
	const [filterValue, setFilterValue] = useState<boolean>(true);

	/**
	 * onload event
	 */
	useEffect(():any => {
		getEvents(offset);
		return () => (isSubscribed = false)
	}, []);

	/**
	 * Getting event list
	 * @param offsetValue : paramer for api load
	 * @param startsAt : paramer for filter - start time
	 * @param endsAt : paramer for filter - end time
	 */
	const getEvents = (
		offsetValue?: number,
		startsAt?: string,
		endsAt?: string
	) => {
		offsetValue && setOffset(offsetValue);
		fetchData(limit, offsetValue, startsAt, endsAt)
			.then((data: ListGroup) => {
				if(isSubscribed) {
					setEvents(data);
					setFilterValue(true);
				}
			})
			.catch(() => {
				if(isSubscribed) {
					setFilterValue(true);
				}
			});
	};

	// button status action function
	const disableButton = (status: boolean): void => {
		setIsButtonHidden(status);
	};

	// Filter Submit
	const filterSubmit = (event: any) => {
		event.preventDefault();
		setStartsAt(event.target.startAt.value);
		setEndsAt(event.target.endsAt.value);
		getEvents(0, event.target.startAt.value, event.target.endsAt.value);
		setFilterValue(false);
	};
	return (
		<CommonLayout>
			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<form onSubmit={filterSubmit} className="mb-6">
							<Filter />
						</form>
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg min-h-full">
							{events ? (
								<EventsList
									{...events}
									disableButton={disableButton}
									filterValue={filterValue}
								/>
							) : (
								<Loader />
							)}
						</div>
					</div>
					{!isButtonHidden && (
						<div className="flex justify-center align-center pt-6">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
								onClick={() => getEvents(offset + limit, startsAt, endsAt)}
							>
								Load More
							</button>
						</div>
					)}
				</div>
			</div>
		</CommonLayout>
	);
};

export default Home;
