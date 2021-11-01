import React from 'react'
import { cleanup, render, RenderResult, screen } from '@testing-library/react'
import Event from '@/components/events/EventsList/Event/index';

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
			endsAt: "2020-09-06T13:00:00.000Z",
		}
	]
};

describe('Event Item', () => {

    let component:RenderResult<typeof import("node_modules/@testing-library/dom/types/queries"),HTMLElement>;
    beforeEach(() => {
        component = render(<table><tbody ><Event {...dummyList.items[0]} /></tbody></table>);
    })

	afterEach(cleanup);

    it("Event item has column value Position name", () => {
      expect(component.getByTestId('itemPositionName')).toHaveTextContent('Computers');
    });

    it("Event item has column value Start Date", () => {
        expect(component.getByTestId('itemStartDate')).toHaveTextContent('2020-09-05 (14:30 pm)');
    });
    
    it("Event item has column value End Date", () => {
        expect(component.getByTestId('itemEndDate')).toHaveTextContent('2020-09-06 (18:30 pm)');
    });

    it("Event item has column value link", () => {
        expect(component.getByTestId('itemEndDate')).toHaveTextContent('2020-09-06 (18:30 pm)');
    });

    it("Event item has column value link text", () => {
        expect(component.getByTestId('itemLink')).toHaveTextContent('View Details');
    });
   
})