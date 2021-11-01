import React from 'react'
import { cleanup, render, RenderResult, screen } from '@testing-library/react'
import EventDetails from '@/components/events/EventDetails';

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
describe('Event Details', () => {

    let component:RenderResult<typeof import("node_modules/@testing-library/dom/types/queries"),HTMLElement>;
    
    beforeEach(() => {
        component = render(<EventDetails {...listDetails} />);
    })


	afterEach(cleanup);

    it("Should have column value Position", () => {   
      expect(component.getByTestId('detailsPositionHeading')).toHaveTextContent('Position name');
      expect(component.getByTestId('detailsPositionValue')).toHaveTextContent('Computers');
    });

    it("Should have column value Start time", () => {
        expect(component.getByTestId('detailsSatrtTimeHeading')).toHaveTextContent('Start time');
        expect(component.getByTestId('detailsSatrtTimeValue')).toHaveTextContent('2020-09-05 (14:30 pm)');
      });

    it("Should have column value End time", () => {
        expect(component.getByTestId('detailsEndTimeHeading')).toHaveTextContent('End time');
        expect(component.getByTestId('detailsEndTimeValue')).toHaveTextContent('2020-09-05 (18:30 pm)');
    });
    
    it("Should have column Employess heading and list", () => {
        expect(component.getByTestId('detailsEmployessHeading')).toHaveTextContent('Employees');
        expect(component.getByTestId('detailsEmployessValue')).toHaveTextContent('Nicolette HansenStella WuckertAugust Feil');
    });
   
})