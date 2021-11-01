import React from 'react'
import { cleanup, render, RenderResult, screen } from '@testing-library/react'
import EventsList from '@/components/events/EventsList/index';

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
		}
	],
	pagination: {
		offset: 15,
		limit: 1,
		count: 27,
	},
};

describe('Event List', () => {
	
	let component:RenderResult<typeof import("node_modules/@testing-library/dom/types/queries"),HTMLElement>;

	beforeEach(() => {
		component = render(<EventsList {...dummyList} filterValue={true} disableButton={() => {}} />);
	})

	afterEach(cleanup);

    it("Event list has column Position name", () => {		
      expect(component.getByTestId('positionName')).toHaveTextContent('Position name');
    });
    it("Event list has column Start time", () => {
      expect(component.getByTestId('startTime')).toHaveTextContent('Start time');
    });
    it("Event list has column End time", () => {
      expect(component.getByTestId('endTime')).toHaveTextContent('End time');
    });
})