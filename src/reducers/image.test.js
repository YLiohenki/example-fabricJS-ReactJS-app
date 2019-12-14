import image from './image.js';
import expect from 'expect';
import { IMAGE_UPLOAD } from '../constants/actionTypes.js';

describe('photo reducer', () => {
    it('should save photo in state on PHOTO_UPLOAD', () => {
        var result = image({}, { type: IMAGE_UPLOAD, payload: { file: 'binaryData' } });
        expect(result.file).toEqual('binaryData');
    });
});