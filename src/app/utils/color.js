export const colorsMatrix = [
    ['indigo', '#6610f2'],
    ['purple', '#6f42c1'],
    ['pink', '#d63384'],
    ['orange', '#fd7e14'],
    ['teal', '#20c997'],
    ['white', '#fff'],
    ['primary', '#0d6efd'],
    ['secondary', '#6c757d'],
    ['success', '#198754'],
    ['info', '#0dcaf0'],
    ['warning', '#ffc107'],
    ['danger', '#dc3545'],
    ['light', '#f8f9fa'],
    ['dark', '#212529']
];

export const color = (color) => {
    const findIndex = color[0] === '#' ? 1 : 0;
    return colorsMatrix.find((colorRow) => colorRow[findIndex] === color)[
        color[0] === '#' ? 0 : 1
    ];
};
