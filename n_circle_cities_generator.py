#!/usr/bin/python

import random
import math

N_CIRCLES = 2
CIRCLES_CONCENTRIC = True;
CIRCLE_CENTER_MAX_DEVIATION = 30   #max deviation of x or y from center of coordinates
N_POINTS = 30
OUTPUT_FILE_NAME = "test_data/" + str(N_CIRCLES) + "_circles_data.txt"
MIN_COORD_X = 0
MIN_COORD_Y = 0
MAX_COORD_X = 600
MAX_COORD_Y = 600
MAX_DEVIATION_FROM_CIRCLE = 10

MAX_RADIUS_KOEF = 0.8 # min range of coordinates is multiplied by this koef thus radius is not too big

MIN_RADIUS = 10

def generatePoint(circle_center, circle_radius, max_deviation):
	angle = random.uniform(0.0, 2 * math.pi)
	getDeviation = lambda: random.uniform(-max_deviation, max_deviation)
	point_x = circle_center["x"] + math.cos(angle) * circle_radius + getDeviation()
	point_y = circle_center["y"] + math.sin(angle) * circle_radius + getDeviation()
	return {"x": point_x, "y": point_y}

def main():
	out = open(OUTPUT_FILE_NAME, "w")

	centres = []
	coord_center_point = {"x": (MAX_COORD_X - MIN_COORD_X) / 2.0,"y": (MAX_COORD_Y - MIN_COORD_Y) / 2.0}
	if CIRCLES_CONCENTRIC:
		centres = [coord_center_point] * N_CIRCLES
	else:
		for i in range(N_CIRCLES):
			getDeviation = lambda: random.uniform(-CIRCLE_CENTER_MAX_DEVIATION, CIRCLE_CENTER_MAX_DEVIATION)
			circle_center_x = coord_center_point["x"] + getDeviation()
			circle_center_y = coord_center_point["y"] + getDeviation()
			centres.append({"x": circle_center_x, "y": circle_center_y})
	
	radiuses = []
	max_radius = (min(MAX_COORD_X - MIN_COORD_X, MAX_COORD_Y - MIN_COORD_Y) / 2) * MAX_RADIUS_KOEF
	for i in range(N_CIRCLES):
		radius = random.uniform(MIN_RADIUS, max_radius)
		radiuses.append(radius)


	points = []
	for i in range(N_POINTS):
		circle_index = random.randint(0, N_CIRCLES - 1)
		point = generatePoint(centres[circle_index], radiuses[circle_index], MAX_DEVIATION_FROM_CIRCLE)
		points.append(point)

	#write to file	
	for i in range(N_POINTS):
		x = str(points[i]["x"])
		y = str(points[i]["y"])
		out.write("(" + x + ", " + y + ")" +"\n")

	print "circles:"
	for i in range(N_CIRCLES):
		line = str(i + 1) + ".  center: "
		line += str(centres[i]["x"]) + ", " + str(centres[i]["y"])
		line += "    radius: " + str(radiuses[i])
		print line
	out.close()

if __name__ == '__main__':
	main()