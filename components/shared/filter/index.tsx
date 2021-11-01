import { NextPage } from "next";

/**
 * Filter block
 * @returns 
 */
const Filter: NextPage = (): JSX.Element => {
	return (
		<div className="bg-indigo-600">
			<div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between flex-wrap">
					<div className="w-0 flex-1 flex items-center">
						<input
							type="datetime-local"
							name="startAt"
							id="startAt"
							className="w-full focus:ring-indigo-500 focus:border-indigo-500 block pl-7 pr-12 sm:text-sm border-b border-gray-300 rounded-md mx-10"
							placeholder="Start Time"
						/>
					</div>
					<div className="w-0 flex-1 flex items-center">
						<input
							type="datetime-local"
							name="endsAt"
							id="endsAt"
							className="w-full focus:ring-indigo-500 focus:border-indigo-500 block pl-7 pr-12 sm:text-sm border-b border-gray-300 rounded-md mx-10"
							placeholder="End Time"
						/>
					</div>
					<div className=" flex-shrink-0  sm:ml-3">
						<button
							type="submit"
							className="bg-transparent text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-white rounded"
						>
							Search
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Filter;
