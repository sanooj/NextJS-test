import { act, cleanup, render, RenderResult } from "@testing-library/react";
import axios from "axios";
import Details, { fetchEventDetails } from "../pages/details/[id]";
import mockAxios from "axios";

const details = {
	id: 740,
	startsAt: "2020-09-05T09:00:00.000Z",
	endsAt: "2020-09-05T13:00:00.000Z",
	position: {
		name: "Computers",
		color: "yellow",
		id: 153,
	},
	employees: [
		{
			firstName: "Nicolette",
			lastName: "Hansen",
			image: "https://cdn.fakercloud.com/avatars/smenov_128.jpg",
			id: 266,
		},
		{
			firstName: "Stella",
			lastName: "Wuckert",
			image: "https://cdn.fakercloud.com/avatars/caspergrl_128.jpg",
			id: 60,
		},
		{
			firstName: "August",
			lastName: "Feil",
			image: "https://cdn.fakercloud.com/avatars/juaumlol_128.jpg",
			id: 218,
		},
	],
};

jest.mock("axios");

describe("Event Details page", () => {
	let component: RenderResult<
		typeof import("node_modules/@testing-library/dom/types/queries"),
		HTMLElement
	>;

	beforeEach(() => {
		const useRouter = jest.spyOn(require("next/router"), "useRouter");
		useRouter.mockImplementationOnce(() => ({
			query: { startAt: "2000-10-31T01:30:00.000-05:00" },
		}));
		act(() => {
			component = render(<Details />);
		  });
		
	});

	afterEach(cleanup);

	it("should render my component", () => {
		// then
		expect(component).toMatchSnapshot();
	});

	it("back button should be defined", () => {
		expect(component.getByTestId("backButton")).toBeDefined();
		expect(component.getByTestId("backButton")).toHaveTextContent(
			"Back to list"
		);
	});

	describe("fetch Events details", () => {
		describe("when API call is successful", () => {
			it("should return event details", async () => {
				const token = Buffer.from(
					"frontend@shyftplan.com:api_test_auth_token",
					"utf8"
				).toString("base64");

				mockAxios.get.mockImplementationOnce(() =>
					Promise.resolve({
						data: details,
					})
				);
				const events = await fetchEventDetails("740");
				expect(events).toEqual(details);
				expect(mockAxios.get).toHaveBeenCalledTimes(4);
				expect(mockAxios.get).toHaveBeenCalledWith(
					"https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod/events/undefined",
					{
						headers: {
							Authorization:
								"Basic ZnJvbnRlbmRAc2h5ZnRwbGFuLmNvbTphcGlfdGVzdF9hdXRoX3Rva2Vu",
						},
					}
				);
			});
		});


		describe("when API call fails", () => {
			it("should return empty events details", async () => {
			  // given
			  const message = "Network Error";
			  axios.get.mockRejectedValueOnce(new Error(message));
		
			  // when
			  const result = await fetchEventDetails('740');
		
			  // then
			  expect(mockAxios.get).toHaveBeenCalledWith(
				"https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod/events/740",
				{
					headers: {
						Authorization:
							"Basic ZnJvbnRlbmRAc2h5ZnRwbGFuLmNvbTphcGlfdGVzdF9hdXRoX3Rva2Vu",
					},
				}
				);
			  expect(result).toEqual(undefined);
			});
		  });
	});
});
