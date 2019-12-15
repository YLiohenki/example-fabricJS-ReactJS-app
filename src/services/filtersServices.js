import { fabric } from 'fabric';
import { FILTER_TYPES } from '../constants/filterTypes';

function applyFilterToCanvasObject(object, index, filter, property, value) {
    if (!object) {
        return;
    }
    object.filters[index] = filter;
    if (object.filters[index] && property != null) {
        object.filters[index][property] = value;
    }
    object.applyFilters();
}

export function applyAllFiltersToCanvas(canvas, filters) {
    if (filters != null) {
        FILTER_TYPES.forEach(filterType => {
            var fabricFilters = fabric.Image.filters;
            var objects = canvas.getObjects();
            var obj = objects[0];
            applyFilterToCanvasObject(obj, filterType.index, filters[filterType.key].isOn && new fabricFilters[filterType.fabricJSName](), filterType.hasIntensity ? filterType.intensityProperty : null, filters[filterType.key].intensity);
        });
        canvas.renderAll();
    }
}
