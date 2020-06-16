import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus component', () => {
    test('status in props should be in the state', () => {
        const component = create(<ProfileStatus status='there is status'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('there is status');
    });

    test('span should be displayed', () => {
        const component = create(<ProfileStatus status='there is status' />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test('input should"nt be displayed', () => {
        const component = create(<ProfileStatus status='there is status' />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });

    test('span contains correct status', () => {
        const component = create(<ProfileStatus status='there is status' />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe('there is status');
    });
});