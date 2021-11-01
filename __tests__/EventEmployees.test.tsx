import React from "react";
import { cleanup, render, RenderResult } from "@testing-library/react";
import EventEmployees from "@/components/events/EventDetails/EventEmployees";

const listDetails = {
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
describe("Event Details Employess", () => {
	let component:RenderResult<typeof import("node_modules/@testing-library/dom/types/queries"),HTMLElement>;

	beforeEach(() => {
		component = render(<EventEmployees {...listDetails.employees[0]} />);
	});

	afterEach(cleanup);

	it("Should have employee image", () => {
		expect(component.getByTestId("employeeImage")).toBeDefined();
		expect(component.getByTestId("employeeImage")).toHaveAttribute("src");
		expect(component.getByTestId("employeeImage")).toMatchInlineSnapshot(`
<img
  alt=""
  data-testid="employeeImage"
  src="https://cdn.fakercloud.com/avatars/smenov_128.jpg"
/>
`);
	});

	it("Should have employee Full Name", () => {
		expect(component.getByTestId("employeeFullName")).toHaveTextContent('Nicolette Hansen');
    });
});
