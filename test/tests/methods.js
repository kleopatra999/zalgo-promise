/* @flow */

import { ZalgoPromise } from 'src/promise';

describe('promise method cases', () => {

    it('should work with a set of resolved promises in promise.all', () => {

        return Promise.resolve(ZalgoPromise.all([
            ZalgoPromise.resolve(1),
            ZalgoPromise.resolve(2),
            ZalgoPromise.resolve(3)
        ]).then(([ one, two, three ]) => {
            if (one !== 1) {
                throw new Error(`Expected 1, got ${one}`);
            }
            if (two !== 2) {
                throw new Error(`Expected 2, got ${two}`);
            }
            if (three !== 3) {
                throw new Error(`Expected 3, got ${three}`);
            }
        }));
    });

    it('should work with a set of resolved values or promises in promise.all', () => {

        return ZalgoPromise.all([
            1,
            ZalgoPromise.resolve(2),
            3
        ]).then(([ one, two, three ]) => {
            if (one !== 1) {
                throw new Error(`Expected 1, got ${one}`);
            }
            if (two !== 2) {
                throw new Error(`Expected 2, got ${two}`);
            }
            if (three !== 3) {
                throw new Error(`Expected 3, got ${three}`);
            }
        }).toPromise();
    });

    it('should reject with any rejected promise from promise.all', () => {

        let error = 'SERIOUS_ERROR';

        return ZalgoPromise.all([
            ZalgoPromise.resolve(1),
            ZalgoPromise.reject(new Error(error)),
            ZalgoPromise.resolve(3)
        ]).then(() => {
            throw new Error(`Expected then to not be called`);
        }).catch(err => {
            if (!(err instanceof Error)) {
                throw new Error(`Expected err to be Error type, got ${typeof err}`);
            }
            if (err.message !== error) {
                throw new Error(`Expected ${err.message} to be ${error}`);
            }
        }).toPromise();
    });

    it('should reject with the first rejected promise from promise.all', () => {

        let error = 'SERIOUS_ERROR';
        let error2 = 'SERIOUS_ERROR2';

        return ZalgoPromise.all([
            ZalgoPromise.resolve(1),
            ZalgoPromise.reject(new Error(error)),
            ZalgoPromise.reject(new Error(error2))
        ]).then(() => {
            throw new Error(`Expected then to not be called`);
        }).catch(err => {
            if (!(err instanceof Error)) {
                throw new Error(`Expected err to be Error type, got ${typeof err}`);
            }
            if (err.message !== error) {
                throw new Error(`Expected ${err.message} to be ${error}`);
            }
        }).toPromise();
    });

    it('should call promise.delay and wait some time', () => {

        let timeoutCalled = false;

        let timeout = setTimeout(() => {
            timeoutCalled = true;
        }, 100);

        return ZalgoPromise.delay(10).then(() => {
            clearTimeout(timeout);
            if (timeoutCalled) {
                throw new Error(`Expected timeout to not be called`);
            }
        }).toPromise();
    });

    it('should work with a set of resolved promises in promise.hash', () => {

        return ZalgoPromise.hash({
            one: ZalgoPromise.resolve(1),
            two: ZalgoPromise.resolve(2),
            three: ZalgoPromise.resolve(3)
        }).then(({ one, two, three }) => {
            if (one !== 1) {
                throw new Error(`Expected 1, got ${one}`);
            }
            if (two !== 2) {
                throw new Error(`Expected 2, got ${two}`);
            }
            if (three !== 3) {
                throw new Error(`Expected 3, got ${three}`);
            }
        }).toPromise();
    });

    it('should work with a set of resolved values or promises in promise.hash', () => {

        return ZalgoPromise.hash({
            one: 1,
            two: ZalgoPromise.resolve(2),
            three: 3
        }).then(({ one, two, three }) => {
            if (one !== 1) {
                throw new Error(`Expected 1, got ${one}`);
            }
            if (two !== 2) {
                throw new Error(`Expected 2, got ${two}`);
            }
            if (three !== 3) {
                throw new Error(`Expected 3, got ${three}`);
            }
        }).toPromise();
    });

    it('should reject with any rejected promise from promise.hash', () => {

        let error = 'SERIOUS_ERROR';

        return ZalgoPromise.hash({
            one: ZalgoPromise.resolve(1),
            two: ZalgoPromise.reject(new Error(error)),
            three: ZalgoPromise.resolve(3)
        }).then(() => {
            throw new Error(`Expected then to not be called`);
        }).catch(err => {
            if (!(err instanceof Error)) {
                throw new Error(`Expected err to be Error type, got ${typeof err}`);
            }
            if (err.message !== error) {
                throw new Error(`Expected ${err.message} to be ${error}`);
            }
        }).toPromise();
    });

    it('should reject with the first rejected promise from promise.hash', () => {

        let error = 'SERIOUS_ERROR';
        let error2 = 'SERIOUS_ERROR2';

        return ZalgoPromise.hash({
            one: ZalgoPromise.resolve(1),
            two: ZalgoPromise.reject(new Error(error)),
            three: ZalgoPromise.reject(new Error(error2))
        }).then(() => {
            throw new Error(`Expected then to not be called`);
        }).catch(err => {
            if (!(err instanceof Error)) {
                throw new Error(`Expected err to be Error type, got ${typeof err}`);
            }
            if (err.message !== error) {
                throw new Error(`Expected ${err.message} to be ${error}`);
            }
        }).toPromise();
    });
});
