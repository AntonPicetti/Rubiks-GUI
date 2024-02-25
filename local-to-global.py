colors = ["green", "yellow", "blue", "white", "red", "orange"]

# Offsets to add when going from local to global.
# {(a, b): c}, where a is the color up, b is color front and c is offset.
offsets_U = {
    ("green", "yellow"): 4,
    ("green", "white"): 0,
    ("green", "red"): 2,
    ("green", "orange"): 6,

    ("yellow", "green"): 0,
    ("yellow", "blue"): 4,
    ("yellow", "red"): 2,
    ("yellow", "orange"): 6,

    ("blue", "yellow"): 0,
    ("blue", "white"): 4,
    ("blue", "red"): 2,
    ("blue", "orange"): 6,

    ("white", "green"): 4,
    ("white", "blue"): 0,
    ("white", "red"): 2,
    ("white", "orange"): 6,

    ("red", "green"): 0,
    ("red", "yellow"): 6,
    ("red", "blue"): 4,
    ("red", "white"): 2,

    ("orange", "green"): 0,
    ("orange", "yellow"): 2,
    ("orange", "blue"): 4,
    ("orange", "white"): 6,
}

offsets_F = {
    ("yellow", "green"): 0,
    ("white", "green"): 4,
    ("red", "green"): 6,
    ("orange", "green"): 2,

    ("green", "yellow"): 0,
    ("blue", "yellow"): 4,
    ("red", "yellow"): 2,
    ("orange", "yellow"): 6,

    ("yellow", "blue"): 4,
    ("white", "blue"): 0,
    ("red", "blue"): 6,
    ("orange", "blue"): 2,

    ("green", "white"): 0,
    ("blue", "white"): 4,
    ("red", "white"): 6,
    ("orange", "white"): 2,

    ("green", "red"): 4,
    ("yellow", "red"): 2,
    ("blue", "red"): 0,
    ("white", "red"): 6,

    ("green", "orange"): 4,
    ("yellow", "orange"): 6,
    ("blue", "orange"): 0,
    ("white", "orange"): 2
}

offsets_L = {
    # green
    ("yellow", "orange"): 0,
    ("orange", "white"): 2,
    ("white", "red"): 4,
    ("red", "yellow"): 6,

    # yellow
    ("blue", "orange"): 0,
    ("orange", "green"): 2,
    ("green", "red"): 4,
    ("red", "blue"): 6,

    # blue
    ("white", "orange"): 0,
    ("orange", "yellow"): 2,
    ("yellow", "red"): 4,
    ("red", "white"): 6,

    # white
    ("green", "orange"): 0,
    ("orange", "blue"): 2,
    ("blue", "red"): 4,
    ("red", "green"): 6,

    # red
    ("blue", "yellow"): 0,
    ("yellow", "green"): 2,
    ("green", "white"): 4,
    ("white", "blue"): 6,

    # orange
    ("blue", "white"): 0,
    ("white", "green"): 2,
    ("green", "yellow"): 4,
    ("yellow", "blue"): 6,
}