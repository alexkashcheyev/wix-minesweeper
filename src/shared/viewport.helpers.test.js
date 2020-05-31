import { createViewport, createGameInfo } from './testutil';
import { validViewportChange } from './viewport.helpers';


describe('validViewportChange', () => {

    it('valid if no change was requested', () => {
        const viewport = createViewport();
        const gameInfo = createGameInfo(12, 9);

        expect(
            validViewportChange(viewport, gameInfo, 0, 0)
        ).toBeTruthy();
    });

    describe('horizontal movement', () => {
        it('invalid if horizontal change requested while game fits into the viewport horizontally', () => {
            const viewport = createViewport();
            const gameInfo = createGameInfo(10, 20);

            expect(
                validViewportChange(viewport, gameInfo, 1, 0)
            ).toBeFalsy();

            expect(
                validViewportChange(viewport, gameInfo, -1, 0)
            ).toBeFalsy();
        });

        it('invalid if trying to step over the left edge', () => {
            const viewport = createViewport();
            const gameInfo = createGameInfo(11, 9);

            expect(
                validViewportChange(viewport, gameInfo, -1, 0)
            ).toBeFalsy();
        });

        it('invalid if trying to step over the right edge', () => {
            const viewport = createViewport(1, 0);
            const gameInfo = createGameInfo(11, 9);

            expect(
                validViewportChange(viewport, gameInfo, 1, 0)
            ).toBeFalsy();
        });

        it('valid if legit move to left requested', () => {
            const viewport = createViewport(1, 0);
            const gameInfo = createGameInfo(11, 9);

            expect(
                validViewportChange(viewport, createGameInfo, -1, 0)
            ).toBeTruthy();
        });

        it('valid if legit move to right requested', () => {
            const viewport = createViewport(1, 0);
            const gameInfo = createGameInfo(11, 9);

            expect(
                validViewportChange(viewport, createGameInfo, 1, 0)
            ).toBeTruthy();
        });  
    })
    
    describe('vertical movement', () => {
        it('invalid if vertical change requested while game fits into the viewport vertically', () => {
            const viewport = createViewport();
            const gameInfo = createGameInfo(11, 7);

            expect(
                validViewportChange(viewport, gameInfo, 0, 1)
            ).toBeFalsy();

            expect(
                validViewportChange(viewport, gameInfo, 0, -1)
            ).toBeFalsy();
        });

        it('invalid if trying to step over the top edge', () => {
            const viewport = createViewport();
            const gameInfo = createGameInfo(11, 9);

            expect(
                validViewportChange(viewport, gameInfo, 0, -1)
            ).toBeFalsy();
        });

        it('invalid if trying to step over the bottm edge', () => {
            const viewport = createViewport(1, 2);
            const gameInfo = createGameInfo(11, 9);

            expect(
                validViewportChange(viewport, gameInfo, 0, 1)
            ).toBeFalsy();
        });

        it('valid if legit move up requested', () => {
            const viewport = createViewport(1, 1);
            const gameInfo = createGameInfo(11, 9);

            expect(
                validViewportChange(viewport, createGameInfo, 0, -1)
            ).toBeTruthy();
        });

        it('valid if legit move down requested', () => {
            const viewport = createViewport(1, 1);
            const gameInfo = createGameInfo(11, 9);

            expect(
                validViewportChange(viewport, createGameInfo, 0, 1)
            ).toBeTruthy();
        });
    })
    
})