import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import EventDetails from "@/components/events/EventDetails";
import Link from "next/link";
import CommonLayout from "@/layout/common";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";

/**
 * interfaces
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

// creating token
const token = Buffer.from(
	"frontend@shyftplan.com:api_test_auth_token",
	"utf8"
).toString("base64");

// URL
const url =
	"https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod/events";

// fetch details
export const fetchEventDetails = (id: string | string[] | undefined):Promise<any> => {
	return axios
		.get(`${url}/${id}`, {
			headers: {
				Authorization: `Basic ${token}`,
			},
		})
		.then(({ data }) => data)
		.catch((err) => {
			console.error(err);
		});
};

/**
 * Details main page
 * @returns
 */
const Details: NextPage = () => {

	let isSubscribed = true;
	// router
	const router = useRouter();

	// Event details data
	const [eventsDetails, setEventsDetails] = useState<ListDetails>();

	/**
	 * Triggering api call on load
	 */
	useEffect(():any => {
		getEventDetails();
		return () => (isSubscribed = false)
	}, []);

	/**
	 * Getting specific events data
	 */
	const getEventDetails = (): void => {
		// getting id from url
		const { id } = router.query;

		// api call
		fetchEventDetails(id)
			.then((data: ListDetails) => {
				if(isSubscribed) {
					setEventsDetails(data);
				}
			}).catch((err) => console.error(err));
	};
	return (
		<CommonLayout>
			<div className="sm:rounded-lg pb-6">
				<Link href="/">
					<span
						className="text-xs cursor-pointer bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
						data-testid="backButton"
					>
						Back to list
					</span>
				</Link>
			</div>
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						Events Information
					</h3>
					<p className="mt-1 max-w-2xl text-sm text-gray-500">
						Events details and Employess.
					</p>
				</div>
				<div className="border-t border-gray-200">
					{eventsDetails ? <EventDetails {...eventsDetails} /> : <Loader />}
				</div>
			</div>
		</CommonLayout>
	);
};
export default Details;
