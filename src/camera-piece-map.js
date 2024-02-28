// The structures in this file are used to map a visualization index to a mesh.
// It can then be used to iterate over visualization indices and set debug materials
// on corresponding meshes.

// The values represents indices in the edges, corners and fixed arrays in
// src/Rubiks/Rubiks.jsx, from which the meshes can be accessed.

// The visualization indices, like ("U", 4), starts on the top left corner and goes clockwise
// on each side.
// The classifier indices are indentical for the top side, the front side has offset 9
// and the left side has offset 18.
// For example ("U", 4) corresponds to the classifier index 8. ("F", 4) corresponds to 13.
// Note that fixed pieces are included in the classification indices, but they are not
// used in colab visualization indices. Here though, the visualization indices have been
// extended to include the fixed pieces. The fixed piece will always have index 8 in the
// visualization indices.

// Also note that all of this assumes the the cube is not scrambled, which might be a limitation
// but its faster to implement and should be good enough for now.

// Assuming yellow up.
// Classifier index to mesh info.
export const green_front_class_map = [
    {classifier_index: 0, type: "corner", model_index: 1, color: "yellow"},
    {classifier_index: 1, type: "edge", model_index: 1, color: "yellow"},
    {classifier_index: 2, type: "corner", model_index: 0, color: "yellow"},
    {classifier_index: 3, type: "edge", model_index: 0, color: "yellow"},
    {classifier_index: 4, type: "corner", model_index: 3, color: "yellow"},
    {classifier_index: 5, type: "edge", model_index: 3, color: "yellow"},
    {classifier_index: 6, type: "corner", model_index: 2, color: "yellow"},
    {classifier_index: 7, type: "edge", model_index: 2, color: "yellow"},
    {classifier_index: 8, type: "fixed", model_index: 0, color: "yellow"},

    {classifier_index: 9, type: "corner", model_index: 2, color: "green"},
    {classifier_index: 10, type: "edge", model_index: 3, color: "green"},
    {classifier_index: 11, type: "corner", model_index: 3, color: "green"},
    {classifier_index: 12, type: "edge", model_index: 7, color: "green"},
    {classifier_index: 13, type: "corner", model_index: 7, color: "green"},
    {classifier_index: 14, type: "edge", model_index: 11, color: "green"},
    {classifier_index: 15, type: "corner", model_index: 6, color: "green"},
    {classifier_index: 16, type: "edge", model_index: 6, color: "green"},
    {classifier_index: 17, type: "fixed", model_index: 4, color: "green"},

    {classifier_index: 18, type: "corner", model_index: 1, color: "red"},
    {classifier_index: 19, type: "edge", model_index: 2, color: "red"},
    {classifier_index: 20, type: "corner", model_index: 2, color: "red"},
    {classifier_index: 21, type: "edge", model_index: 6, color: "red"},
    {classifier_index: 22, type: "corner", model_index: 6, color: "red"},
    {classifier_index: 23, type: "edge", model_index: 10, color: "red"},
    {classifier_index: 24, type: "corner", model_index: 5, color: "red"},
    {classifier_index: 25, type: "edge", model_index: 5, color: "red"},
    {classifier_index: 26, type: "fixed", model_index: 3, color: "red"},
]

// let red_front_class_map
// let blue_front_class_map
// let orange_front_class_map