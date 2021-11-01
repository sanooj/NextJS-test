import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import Home, { fetchData } from "../pages/index";
import axios from "axios";
import mockAxios from "axios";

const dummyList = {
	items: [
		{
			id: 740,
			position: {
				name: "Computers",
				color: "yellow",
				id: 153,
			},
			startsAt: "2020-09-05T09:00:00.000Z",
			endsAt: "2020-09-05T13:00:00.000Z",
		},
		{
			id: 740,
			position: {
				name: "Computers",
				color: "yellow",
				id: 153,
			},
			startsAt: "2020-09-05T09:00:00.000Z",
			endsAt: "2020-09-05T13:00:00.000Z",
		},
	],
	pagination: {
		offset: 15,
		limit: 1,
		count: 27,
	},
};

jest.mock("axios");

describe("Home", () => {
	afterEach(cleanup);

	it("should render my component", () => {
		const component = render(<Home {...dummyList} />);
		// then
		expect(component).toMatchSnapshot();
	});

	describe("fetch events list", () => {
		describe("when API call is successful", () => {
			it("should return event list", async () => {
				const token = Buffer.from(
					"frontend@shyftplan.com:api_test_auth_token",
					"utf8"
				).toString("base64");

				mockAxios.get.mockImplementationOnce(() =>
					Promise.resolve({
						data: dummyList,
					})
				);
				const events = await fetchData(10, 0);
				expect(events).toEqual(dummyList);
				expect(mockAxios.get).toHaveBeenCalledTimes(2);
				expect(mockAxios.get).toHaveBeenCalledWith(
					"https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod/events?limit=10&offset=0",
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
			it("should return empty events list", async () => {
			  // given
			  const message = "Network Error";
			  axios.get.mockRejectedValueOnce(new Error(message));
		
			  // when
			  const result = await fetchData(10,0);
		
			  // then
			  expect(mockAxios.get).toHaveBeenCalledWith(
				"https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod/events?limit=10&offset=0",
				{
					headers: {
						Authorization:
							"Basic ZnJvbnRlbmRAc2h5ZnRwbGFuLmNvbTphcGlfdGVzdF9hdXRoX3Rva2Vu",
					},
				}
			);
			  expect(result).toEqual([]);
			});
		  });
	});
});
